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
var http_1 = require('@angular/http');
var flowchart_component_1 = require('../../../Framework/whatever/Flowchart/flowchart.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var General_1 = require('../../../Models/Common/General');
var openworkflow_services_1 = require('../../../models/common/openworkflow.services');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var setworkflow_addedit_1 = require('../set workflow/setworkflow-addedit');
var workflowoutcomes_addedit_1 = require('../set workflow/workflowoutcomes-addedit');
var workflow_service_1 = require('../../../models/common/workflow.service');
var drawingtooltip_component_1 = require('../opendrawing/drawingtooltip.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var workflow_EscalationNotificationsList_1 = require('../Set Workflow/workflow-EscalationNotificationsList');
require("../../../../Scripts/xmlParser.js");
var OpenWorkflowComponent = (function () {
    function OpenWorkflowComponent(openWorkflowService, notificationService, workFlowServices) {
        this.openWorkflowService = openWorkflowService;
        this.notificationService = notificationService;
        this.workFlowServices = workFlowServices;
        this.outOpenWorkflowobject = new core_1.EventEmitter();
        this.drawChanged = new core_1.EventEmitter();
        this.menuData = [];
        this.totalItems = 1;
        this.enableMenu = [];
        this.position = 'top-right';
        this.showSlide = false;
        this.showSlideDeleteEditable = false;
        this.showSlideDeleteNotEditable = false;
        this.showSlideOutcomeDalete = false;
        this.saveWorkflowData = [];
        this.actionPointsDataArray = [];
        this.drawnActionPointData = [];
        this.selectedActionpointId = 0;
        this.selectedOutcomeId = 0;
        this.actionId = 0;
        this.endId = 0;
        this.outcomeId = 0;
        this.isGeneral = false;
        this.EndPointList = new Array();
        this.actionPointHandleArray = [];
        this.outcomeHandleArray = [];
        this.isDrawChange = false;
        //isFlowchartSaved: boolean = false;
        this.isTimeOutShow = true;
        //actionNo: number = 1;
        //actionIdXML: number = 0;
        //outcomeIdXML: number = 0;
        //endIdXML: number = 0;
        //mapActionPoints: Object;
        //mapEndPoints: Object;
        //mapOutcomes: Object;
        this.requesterId = undefined;
        //createdWorkflowCount
        this.positionExpand = "initial";
        this.visibilityOfMenu = "hidden";
        this.visibilityOfarrangeMenu = "hidden";
        this.arrangeMenu = [];
        this.exportMenu = [];
        this.tooltipData = [];
        this.tooltipVisibility = false;
        this.displayMaximize = "initial";
        this.displayMinimize = "none";
        this.workTypeDetails = "";
        this.exportLeftPos = "295";
        this.arrangeMenuLeftPos = "350";
        this.isEntityDisableInActionPointEdit = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.filename = "workflow";
        this.slideHeight = 0;
        this.requestOutComeName = "Create Request";
        this.cancelConnectorCreation = function (currentConnectorHandle, resCallback) {
            var contextObj = this;
            contextObj.flowchartObj.drawingObject.cancelConnector(currentConnectorHandle, function (retCode) {
                resCallback(retCode);
            });
        };
        var delimiter = new General_1.Delimeter();
        this.columnDelimiter = delimiter.ColumnDelimeter;
        this.rowDelimiter = delimiter.RowDelimeter;
        this.slideHeight = window.innerHeight - 200;
        //this.mapActionPoints = new Object();
        //this.mapEndPoints = new Object();
        //this.mapOutcomes = new Object();
    }
    OpenWorkflowComponent.prototype.ngOnChanges = function (changes) {
        if (changes['isCloseOnClick'] && changes['isCloseOnClick']['currentValue']) {
            if (changes['isCloseOnClick']['currentValue'] == true) {
                if (this.isDrawChange == true)
                    this.saveOnClick();
            }
        }
    };
    OpenWorkflowComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var revisionNo = -1;
        var workflowActionPointId = 0;
        this.filename = this.workTypeName.trim();
        var workTypeDetails = "Worktype Name" + this.workTypeName;
        this.workTypeName = "Work Type: " + "<b>" + this.workTypeName + "</b>";
        //this.openWorkflowService.getWorkflowIsEditableForWorktype(contextObj.workTypeId).subscribe(function (isEditable) {
        //    contextObj.isNotInuse = isEditable["Data"];
        //}); 
        this.exportMenu.push({ menuId: 0, menuName: "BMP" }, { menuId: 1, menuName: "DWF" }, { menuId: 2, menuName: "DXB" }, { menuId: 3, menuName: "DXF" }, { menuId: 4, menuName: "JPEG" }, { menuId: 5, menuName: "PDF" });
        this.arrangeMenu.push({ menuId: 0, menuName: "Arrange Top to Bottom" }, { menuId: 1, menuName: "Arrange Bottom to Top" }, { menuId: 2, menuName: "Arrange Left to Right" }, { menuId: 3, menuName: "Arrange Right to Left" }, { menuId: 4, menuName: "Show / Hide Timed Out" }, { menuId: 5, menuName: "Export to BMP" }, { menuId: 6, menuName: "Export to JPEG" }, { menuId: 7, menuName: "Export to PDF" });
        contextObj.openWorkflowService.checkFlowchartFileExist(contextObj.workTypeId, 0).subscribe(function (resultData) {
            if (resultData['Data'] != "") {
                contextObj.selectedXMLData = resultData['Data'];
            }
            contextObj.openWorkflowService.getActionPointAndOutcomes(contextObj.workTypeId, revisionNo, workflowActionPointId).subscribe(function (resultData) {
                if (resultData["Data"]["ActionPointData"] != null && resultData["Data"]["ActionPointData"] != undefined) {
                    contextObj.actionPointsDataArray = JSON.parse(resultData["Data"]["ActionPointData"]);
                }
                if (resultData["Data"]["OutcomeData"] != null && resultData["Data"]["OutcomeData"] != undefined) {
                    contextObj.outcomeDataArray = JSON.parse(resultData["Data"]["OutcomeData"]);
                }
                var index = contextObj.actionPointsDataArray.findIndex(function (el) { return el["Action Point Number"] === 0; });
                if (index != -1)
                    contextObj.requesterId = contextObj.actionPointsDataArray[index]['Id'];
                index = contextObj.outcomeDataArray.findIndex(function (el) { return el["OutcomeTypeId"] == 31; });
                if (index != -1)
                    contextObj.requestOutComeName = contextObj.outcomeDataArray[index]['Value'];
                if (contextObj.outcomeDataArray != undefined) {
                    contextObj.outcomeDataArray.find(function (item) {
                        switch (item.OutcomeTypeId) {
                            case 7:
                                var index = contextObj.EndPointList.findIndex(function (el) { return el["Id"] === -2; });
                                if (index == -1)
                                    contextObj.EndPointList.push({ Id: -2, Name: "Closed Work Order" });
                                break;
                            case 16:
                                if (item["EntityCategoryId"] == 3) {
                                    var index = contextObj.EndPointList.findIndex(function (el) { return el["Id"] === -3; });
                                    if (index == -1)
                                        contextObj.EndPointList.push({ Id: -3, Name: "Discarded Work Orders" });
                                }
                                break;
                        }
                    });
                }
            });
        });
        // 
        //var revisionNo = -1;
        //contextObj.openWorkflowService.getActionPointAndOutcomes(contextObj.workTypeId, revisionNo).subscribe(function (resultData) {
        //     
        //});
    };
    OpenWorkflowComponent.prototype.ngAfterViewInit = function () {
        this.enableMenu = [];
    };
    OpenWorkflowComponent.prototype.loadMenudata = function () {
        this.menuData = [
            {
                "id": 0,
                "title": "Save",
                "image": "Save",
                "path": "Save",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Maximize",
                "image": "Maximize",
                "path": "Maximize",
                "submenu": null
            },
            {
                "id": 22,
                "title": "Workflow Settings",
                "image": "Workflow Settings",
                "path": "Workflow Settings",
                "subMenu": [
                    {
                        "id": 6,
                        "title": "Arrange Top to Bottom",
                        "image": "Arrange Top to Bottom",
                        "path": "Arrange Top to Bottom",
                        "submenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 7,
                        "title": "Arrange Bottom to Top",
                        "image": "Arrange Bottom to Top",
                        "path": "Arrange Bottom to Top",
                        "submenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 8,
                        "title": "Arrange Left to Right",
                        "image": "Arrange Left to Right",
                        "path": "Arrange Left to Right",
                        "submenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 9,
                        "title": "Arrange Right to Left",
                        "image": "Arrange Right to Left",
                        "path": "Arrange Right to Left",
                        "submenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 10,
                        "title": "Show / Hide Timed Out",
                        "image": "Arrange Top to Bottom",
                        "path": "Arrange Top to Bottom",
                        "submenu": null,
                        "privilegeId": null
                    }
                ]
            },
            //                case 0: contextObj.flowchartObj.drawingObject.exportToBMP(function (returnCode) { });
            //        break;
            //    case 1: contextObj.flowchartObj.drawingObject.exportToDWF(1, function (returnCode) { });
            //break;
            //    case 2: contextObj.flowchartObj.drawingObject.exportToDXB(1, function (returnCode) { });
            //break;
            //    case 3: contextObj.flowchartObj.drawingObject.exportToDXF(1, function (returnCode) { });
            //break;
            //    case 4: contextObj.flowchartObj.drawingObject.exportToJPEG(function (returnCode) { });
            //break;
            //    case 5: contextObj.flowchartObj.drawingObject.exportToPDF(false, "", function (returnCode) { });
            //break;
            //    case 6: contextObj.flowchartObj.drawingObject.exportToSVG(function (returnCode) { });
            //break;
            //    case 14: contextObj.flowchartObj.drawingObject.exportToDXF(1, function (returnCode) { });
            {
                "id": 30,
                "title": "Export",
                "image": "Export",
                "path": "Export",
                "subMenu": [
                    {
                        "id": 31,
                        "title": "Export to BMP",
                        "image": "Export to BMP",
                        "path": "Export To BMP",
                        "submenu": null,
                        "privilegeId": null
                    },
                    //{
                    //    "id": 32,
                    //    "title": "Export To DWF",
                    //    "image": "Export To DWF",
                    //    "path": "Export To DWF",
                    //    "submenu": null,
                    //    "privilegeId": null
                    //},
                    //{
                    //    "id": 33,
                    //    "title": "Export To DXB",
                    //    "image": "Export To DXB",
                    //    "path": "Export To DXB",
                    //    "submenu": null,
                    //    "privilegeId": null
                    //},
                    //{
                    //    "id": 34,
                    //    "title": "Export To DXF",
                    //    "image": "Export To DXF",
                    //    "path": "Export To DXF",
                    //    "submenu": null,
                    //    "privilegeId": null
                    //},
                    {
                        "id": 35,
                        "title": "Export to JPEG",
                        "image": "Export to JPEG",
                        "path": "Export To JPEG",
                        "submenu": null,
                        "privilegeId": null
                    },
                    {
                        "id": 36,
                        "title": "Export to PDF",
                        "image": "Export to PDF",
                        "path": "Export To PDF",
                        "submenu": null,
                        "privilegeId": null
                    }
                ]
            },
            {
                "id": 11,
                "title": "Workflow Escalation Notifications",
                "image": "Workflow Escalation Notifications",
                "path": "Workflow Escalation Notifications",
                "submenu": null,
                "privilegeId": null
            }
        ];
    };
    OpenWorkflowComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                this.isDrawChange = false;
                this.saveOnClick();
                break;
            case 1:
                this.maximizeOnClick();
                break;
            case 2:
                this.minimizeOnClick();
                break;
            case 6:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(1, true, function (retcode) {
                    });
                }
                break;
            case 7:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(2, true, function (retcode) {
                    });
                }
                break;
            case 8:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(3, true, function (retcode) {
                    });
                }
                break;
            case 9:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(4, true, function (retcode) {
                    });
                }
                break;
            case 10:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                if (this.isTimeOutShow) {
                    contextObj.flowchartObj.drawingObject.showHideCirclesInFlowchart(false, function (retcode) {
                        contextObj.isTimeOutShow = false;
                    });
                }
                else {
                    contextObj.flowchartObj.drawingObject.showHideCirclesInFlowchart(true, function (retcode) {
                        contextObj.isTimeOutShow = true;
                    });
                }
                break;
            case 11:
                this.target = 1;
                this.workflowEscalationNotifications();
                break;
            case 31:
                contextObj.flowchartObj.drawingObject.exportToBMP(function (returnCode) { });
                break;
            case 32:
                contextObj.flowchartObj.drawingObject.exportToDWF(1, function (returnCode) { });
                break;
            case 33:
                contextObj.flowchartObj.drawingObject.exportToDXB(1, function (returnCode) { });
                break;
            case 34:
                contextObj.flowchartObj.drawingObject.exportToDXF(1, function (returnCode) { });
                break;
            case 35:
                contextObj.flowchartObj.drawingObject.exportToJPEG(function (returnCode) { });
                break;
            case 36:
                contextObj.flowchartObj.drawingObject.exportToPDF(false, "", function (returnCode) { });
                break;
            case 37:
                contextObj.flowchartObj.drawingObject.exportToDXF(1, function (returnCode) { });
                break;
        }
    };
    OpenWorkflowComponent.prototype.onDrawingObjectInitialize = function (event) {
        this.flowchartObj = event["obj"];
        this.canvasElement = event["canvas"];
        this.visibilityOfMenu = "visible";
        var contextObj = this;
        contextObj.flowchartObj.drawingObject.setApplicationMode(3);
        var result = contextObj.flowchartObj.drawingObject.initiateWorkFlow(function (returnCode) {
            if (returnCode == 0) {
                contextObj.flowchartObj.drawingObject.setDisplay(false);
                contextObj.flowchartObj.drawingObject.setTooltipPriority("14");
                contextObj.flowchartObj.drawingObject.addEvent("tooltipHandler", function (outputs) {
                    if (outputs[0] != "") {
                        // contextObj.flowchartObj.drawingObject.getItemId(outputs[0], function (retCode, id, isActionPoint) {
                        var id = outputs[3];
                        var isActionPoint = outputs[4];
                        console.log("tooltipHandler - handle : " + outputs[0] + ",id : " + id + ",isActionPoint : " + isActionPoint);
                        if (!(isActionPoint == false && id == -10)) {
                            contextObj.tooltipData = [];
                            contextObj.getTooltipData(+id, isActionPoint);
                            if (contextObj.tooltipData) {
                                //contextObj.tooltipXPosition = outputs[1];
                                //contextObj.tooltipYPosition = outputs[2];
                                //contextObj.tooltipDatas = contextObj.tooltipData;
                                var event = document.createEvent("CustomEvent");
                                event.initCustomEvent('TooltipEvent', true, true, { 'xPos': outputs[1], 'yPos': outputs[2], 'tooltipValue': contextObj.tooltipData });
                                document.dispatchEvent(event);
                                setTimeout(function () {
                                    contextObj.tooltipVisibility = true;
                                }, 50);
                            }
                            else
                                contextObj.tooltipVisibility = false;
                        }
                    }
                });
                contextObj.flowchartObj.drawingObject.setDelimiter(contextObj.rowDelimiter, contextObj.columnDelimiter, function (returnCode) {
                    if (contextObj.selectedXMLData != "" && contextObj.selectedXMLData != undefined) {
                        contextObj.flowchartObj.drawingObject.openFlowchartView(contextObj.selectedXMLData, function (retcode) {
                            contextObj.updateOpenedView();
                        });
                    }
                    else if (contextObj.selectedXMLData == "" || contextObj.selectedXMLData == undefined) {
                        contextObj.flowchartObj.drawingObject.setBoxCount(2 + contextObj.actionPointsDataArray.length, function (retCode) {
                            contextObj.CreatFlowChart();
                        });
                    }
                });
            }
        });
        this.outOpenWorkflowobject.emit({ "workflowObj": this.flowchartObj.drawingObject, "openworkflowObj:": this.drawnActionPointData });
    };
    OpenWorkflowComponent.prototype.getTooltipData = function (Id, isActionpoint) {
        var selectedData;
        if (isActionpoint) {
            selectedData = this.actionPointsDataArray.find(function (el) { return el.Id === Id; });
            this.tooltipData.push({ Key: "Action Point Number", Value: selectedData["Action Point Number"] });
            this.tooltipData.push({ Key: "Action Point Name", Value: selectedData["Action Point"] });
            if (selectedData["Users"] != null)
                this.tooltipData.push({ Key: "Users", Value: selectedData["Users"] });
            this.tooltipData.push({ Key: "Specific User", Value: selectedData["IsSpecificUser"] });
        }
        else {
            if (Id != -10) {
                selectedData = this.outcomeDataArray.find(function (el) { return el.Id === Id; });
                if (selectedData) {
                    if (selectedData["Outcome"])
                        this.tooltipData.push({ Key: "Outcome", Value: selectedData["Outcome"] });
                    this.tooltipData.push({ Key: "Next Action Point", Value: selectedData["Next Action Point"] });
                    this.tooltipData.push({ Key: "Notification", Value: selectedData["Notification"] });
                    this.tooltipData.push({ Key: "Workflow Entity", Value: selectedData["Workflow Entity"] });
                }
            }
        }
    };
    OpenWorkflowComponent.prototype.exportOnClick = function (event) {
        var contextObj = this;
        switch (event.menuId) {
            case 0:
                contextObj.flowchartObj.drawingObject.exportToBMP(function (returnCode) { });
                break;
            case 1:
                contextObj.flowchartObj.drawingObject.exportToDWF(1, function (returnCode) { });
                break;
            case 2:
                contextObj.flowchartObj.drawingObject.exportToDXB(1, function (returnCode) { });
                break;
            case 3:
                contextObj.flowchartObj.drawingObject.exportToDXF(1, function (returnCode) { });
                break;
            case 4:
                contextObj.flowchartObj.drawingObject.exportToJPEG(function (returnCode) { });
                break;
            case 5:
                contextObj.flowchartObj.drawingObject.exportToPDF(false, "", function (returnCode) { });
                break;
            case 6:
                contextObj.flowchartObj.drawingObject.exportToSVG(function (returnCode) { });
                break;
            case 14:
                contextObj.flowchartObj.drawingObject.exportToDXF(1, function (returnCode) { });
                break;
        }
    };
    OpenWorkflowComponent.prototype.maximizeOnClick = function () {
        var contextObj = this;
        contextObj.menuData[1] = { "id": 2, "title": "Minimize", "image": "Minimize", "path": "Minimize", "submenu": null };
        this.positionExpand = "fixed";
        this.displayMaximize = "none";
        this.displayMinimize = "initial";
        setTimeout(function () {
            var width, height;
            var canvas = contextObj.canvasElement;
            width = canvas.offsetWidth;
            height = canvas.offsetHeight; //window.innerHeight - 56;
            var topOffset = window.innerHeight - height;
            contextObj.flowchartObj.detailsWidth = "400";
            contextObj.flowchartObj.drawingObject.resize(width, height);
        }, 50);
        this.exportLeftPos = "105";
        this.arrangeMenuLeftPos = "170";
    };
    OpenWorkflowComponent.prototype.minimizeOnClick = function () {
        var contextObj = this;
        contextObj.menuData[1] = { "id": 1, "title": "Maximize", "image": "Maximize", "path": "Maximize", "submenu": null };
        setTimeout(function () {
            var width, height;
            var canvas = contextObj.canvasElement;
            width = canvas.offsetWidth;
            height = canvas.offsetHeight; //window.innerHeight - 56;
            var topOffset = window.innerHeight - height;
            contextObj.flowchartObj.drawingObject.resize(width, height);
        }, 50);
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE");
        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
            msie = 1;
        }
        if (msie > 0) {
            contextObj.positionExpand = "static";
        }
        else {
            contextObj.positionExpand = "initial";
        }
        contextObj.displayMaximize = "initial";
        contextObj.displayMinimize = "none";
        this.exportLeftPos = "295";
        this.arrangeMenuLeftPos = "350";
    };
    OpenWorkflowComponent.prototype.onResize = function (event) {
        console.log('resize event: ', event.target.innerWidth);
        console.log('exportLeftPos ', this.exportLeftPos);
        if (this.exportLeftPos == "")
            this.exportLeftPos = "295";
        else if (this.exportLeftPos == "295")
            this.exportLeftPos = "120";
        else if (this.exportLeftPos == "120")
            this.exportLeftPos = "295";
        var contextObj = this;
        if (contextObj.canvasElement) {
            setTimeout(function () {
                var width, height;
                var canvas = contextObj.canvasElement;
                width = canvas.offsetWidth;
                height = canvas.offsetHeight; //window.innerHeight - 56;
                var topOffset = window.innerHeight - height;
                contextObj.flowchartObj.drawingObject.resize(width, height);
            }, 50);
        }
    };
    OpenWorkflowComponent.prototype.arrangeMenuMouseOver = function () {
        this.visibilityOfarrangeMenu = "visible";
    };
    OpenWorkflowComponent.prototype.arrangeMenuMouseOut = function () {
        this.visibilityOfarrangeMenu = "hidden";
    };
    OpenWorkflowComponent.prototype.arrangeMenuOnClick = function (menuData) {
        var contextObj = this;
        this.flowchartObj.drawingObject.hideGrips();
        switch (menuData.menuId) {
            case 0:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(1, true, function (retcode) {
                    });
                }
                break;
            case 1:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(2, true, function (retcode) {
                    });
                }
                break;
            case 2:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(3, true, function (retcode) {
                    });
                }
                break;
            case 3:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(4, true, function (retcode) {
                    });
                }
                break;
            case 4:
                if (this.isDrawChange == false) {
                    this.isDrawChange = true;
                    this.drawChanged.emit(this.isDrawChange);
                }
                if (this.isTimeOutShow) {
                    contextObj.flowchartObj.drawingObject.showHideCirclesInFlowchart(false, function (retcode) {
                        contextObj.isTimeOutShow = false;
                    });
                }
                else {
                    contextObj.flowchartObj.drawingObject.showHideCirclesInFlowchart(true, function (retcode) {
                        contextObj.isTimeOutShow = true;
                    });
                }
                break;
            case 5:
                contextObj.flowchartObj.drawingObject.exportToBMP(function (returnCode) { });
                break;
            case 6:
                contextObj.flowchartObj.drawingObject.exportToJPEG(function (returnCode) { });
                break;
            case 7:
                contextObj.flowchartObj.drawingObject.exportToPDF(false, "", function (returnCode) { });
                break;
        }
    };
    OpenWorkflowComponent.prototype.onFlowchartActionpointCreate = function (event) {
        this.currentActionPointHandle = event["BoxHandle"];
        this.pageTitle = "New Action Point";
        this.btnName = "Save";
        this.action = "add";
        var contextObj = this;
        this.target = 1;
        this.workFlowServices.loadWorkFlowAddEdit(0, 1, this.workFlowCategoryId, this.moduleId, this.workTypeId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            var workflowEntity = contextObj.fieldDetailsAddEdit.find(function (el) { return el.FieldId === 1000; });
            var lookups = workflowEntity["LookupDetails"]["LookupValues"];
            if (lookups.length == 1)
                workflowEntity.MultiFieldValues = [lookups[0]["Id"].toString()];
            contextObj.isActionpoint = true;
            contextObj.showSlide = true;
        });
    };
    OpenWorkflowComponent.prototype.setActionpointData = function (data) {
        var contextObj = this;
        if (this.isDrawChange == false) {
            this.isDrawChange = true;
            this.drawChanged.emit(this.isDrawChange);
        }
        // this.setaa(this.fieldDetailsAddEdit, data['returnData']);
        var returnData = JSON.parse(data['returnData'])[0];
        var actionText = returnData['Action Point With No'];
        var actionNumber = returnData['ActionPointNo'];
        var actionId = returnData['Id'];
        var selectedActionPointEntitCategoryCount = returnData["EntityCategory Count"]; // if 1=PM only 2=SR only 3.Both
        var oldOutcomeData = this.outcomeDataArray;
        contextObj.openWorkflowService.getActionPointAndOutcomes(contextObj.workTypeId, -1, 0).subscribe(function (resultData) {
            if (resultData["Data"]["ActionPointData"] != null && resultData["Data"]["ActionPointData"] != undefined) {
                contextObj.actionPointsDataArray = JSON.parse(resultData["Data"]["ActionPointData"]);
                contextObj.outcomeDataArray = JSON.parse(resultData["Data"]["OutcomeData"]);
            }
            var outcomeIds = [];
            outcomeIds = contextObj.outcomeDataArray.filter(function (item) {
                return (item["WorkFlowActionPointId"] === actionId);
            });
            contextObj.showSlide = false;
            contextObj.isActionpoint = false;
            if (contextObj.action == "add") {
                contextObj.actionPointsDataArray.push(returnData);
                contextObj.drawnActionPointData.push(returnData);
                contextObj.actionPointHandleArray.push({ Id: actionId, Handle: contextObj.currentActionPointHandle });
                contextObj.flowchartObj.drawingObject.createBoxTextOnFlowchart(contextObj.currentActionPointHandle, actionText, actionId, actionNumber, function (retCode) {
                    if (selectedActionPointEntitCategoryCount == 1) {
                        contextObj.createTimeOut(0, outcomeIds, actionId, !contextObj.isTimeOutShow, function (ret) {
                        });
                    }
                    else {
                        contextObj.createTimeOut(0, outcomeIds, actionId, !contextObj.isTimeOutShow, function (ret) {
                            contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(2, -10, function (returnCode, IsExists) {
                                if (returnCode == 0) {
                                    if (!IsExists) {
                                        if (contextObj.requesterId != undefined) {
                                            contextObj.flowchartObj.drawingObject.createOutcome(-10, contextObj.requestOutComeName, contextObj.requesterId, actionId, "", "", 4, "", false, function (retCode) {
                                            });
                                        }
                                    }
                                }
                            });
                        });
                    }
                });
            }
            else {
                var index = contextObj.actionPointsDataArray.findIndex(function (el) { return el.Id === returnData['Id']; });
                contextObj.actionPointsDataArray[index] = returnData;
                contextObj.flowchartObj.drawingObject.updateTextOnFlowchart(contextObj.isActionpoint, actionId, actionText, function (retCode) {
                    var szOutComeIds = [];
                    if (!contextObj.isEntityDisableInActionPointEdit) {
                        for (var i = 0; i < contextObj.outcomeDataArray.length; i++) {
                            if (contextObj.outcomeDataArray[i]["NextWorkFlowActionPointId"] == actionId) {
                                if (selectedActionPointEntitCategoryCount != 3) {
                                    if (selectedActionPointEntitCategoryCount == 1) {
                                        if (contextObj.outcomeDataArray[i]["EntityCategoryId"] != 3)
                                            szOutComeIds.push(contextObj.outcomeDataArray[i]["Id"]);
                                    }
                                    else if (selectedActionPointEntitCategoryCount == 2) {
                                        if (contextObj.outcomeDataArray[i]["EntityCategoryId"] == 3)
                                            szOutComeIds.push(contextObj.outcomeDataArray[i]["Id"]);
                                    }
                                }
                            }
                        }
                        contextObj.deleteOutcomes(szOutComeIds, 0, function () {
                            var oldOutcomeids = [];
                            oldOutcomeids = oldOutcomeData.filter(function (item) {
                                return (item["WorkFlowActionPointId"] === actionId);
                            });
                            oldOutcomeids = oldOutcomeids.filter(function (item) {
                                return (item["OutcomeTypeId"] === 28);
                            });
                            contextObj.deleteTimeOut(0, oldOutcomeids, function (res) {
                                contextObj.createTimeOut(0, outcomeIds, actionId, !contextObj.isTimeOutShow, function (ret) {
                                    if (contextObj.requesterId != undefined)
                                        contextObj.rearrangeCreateRequestOutcome(contextObj.actionPointsDataArray, function () { });
                                });
                            });
                        });
                    }
                });
            }
        });
    };
    OpenWorkflowComponent.prototype.createTimeOut = function (count, outcomeIds, workFlowActionPointId, ishideTimeout, resCallback) {
        var contextObj = this;
        if (outcomeIds.length > count) {
            var outComeid = outcomeIds[count]["Id"];
            var OutcomeText = outcomeIds[count]["Outcome"];
            var nextActionpointid = outcomeIds[count]["NextWorkFlowActionPointId"];
            var endType = "";
            if (nextActionpointid == null || nextActionpointid == undefined) {
                nextActionpointid = "";
                endType = "3";
            }
            contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(2, outComeid, function (returnCode, IsExists) {
                if (returnCode == 0) {
                    if (IsExists) {
                        contextObj.flowchartObj.drawingObject.deleteOutcome(outComeid, function (rtCode) {
                            contextObj.flowchartObj.drawingObject.createOutcome(outComeid, OutcomeText, workFlowActionPointId, nextActionpointid, endType, "", 2, "", ishideTimeout, function (retCode) {
                                count++;
                                contextObj.createTimeOut(count, outcomeIds, workFlowActionPointId, ishideTimeout, resCallback);
                            });
                        });
                    }
                    else {
                        contextObj.flowchartObj.drawingObject.createOutcome(outComeid, OutcomeText, workFlowActionPointId, nextActionpointid, endType, "", 2, "", ishideTimeout, function (retCode) {
                            count++;
                            contextObj.createTimeOut(count, outcomeIds, workFlowActionPointId, ishideTimeout, resCallback);
                        });
                    }
                }
            });
        }
        else {
            resCallback();
        }
    };
    OpenWorkflowComponent.prototype.deleteTimeOut = function (count, outcomeIds, resCallback) {
        var contextObj = this;
        if (outcomeIds.length > count) {
            var outComeid = outcomeIds[count]["Id"];
            contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(2, outComeid, function (returnCode, IsExists) {
                if (returnCode == 0) {
                    if (IsExists) {
                        contextObj.flowchartObj.drawingObject.deleteOutcome(outComeid, function (rtCode) {
                            count++;
                            contextObj.deleteTimeOut(count, outcomeIds, resCallback);
                        });
                    }
                    else {
                        count++;
                        contextObj.deleteTimeOut(count, outcomeIds, resCallback);
                    }
                }
            });
        }
        else {
            resCallback();
        }
    };
    OpenWorkflowComponent.prototype.setaa = function (fieldObj, dataValues) {
        var arr1 = [];
        for (var i = 0; i < dataValues.length; i++) {
            var label = fieldObj.find(function (el) { return el["ReportFieldId"] === dataValues[i]["ReportFieldId"]; })["FieldLabel"];
            arr1.push({ Label: label, Value: dataValues[i]["Value"] });
        }
        var arr2 = [];
        arr2.push(arr1);
        return arr2;
    };
    OpenWorkflowComponent.prototype.onFlowchartOutcomeCreate = function (event) {
        var contextObj = this;
        this.currentOutcomerHandle = event["ConnectorHandle"];
        if (event["ToActionId"] == "")
            this.toActionId = -1;
        else
            this.toActionId = +event["ToActionId"];
        if (event["FromActionId"] == "")
            this.fromActionId = -1;
        else
            this.fromActionId = +event["FromActionId"];
        //if (this.toActionId == -1) {
        //} else {
        if (this.fromActionId != this.requesterId) {
            this.selectedOutcomeId = 0;
            this.action = "add";
            this.btnName = "Save";
            this.pageTitle = "New Outcome";
            var index = this.actionPointsDataArray.findIndex(function (el) { return el.Id === contextObj.fromActionId; });
            this.selectedActionpointtypeIdForOutcome = this.actionPointsDataArray[index]['ActionPointTypeId'];
            this.workFlowServices.loadWorkflowOutcomeAdd(this.workFlowCategoryId, this.moduleId, this.workTypeId, this.fromActionId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.isOutcome = true;
                contextObj.showSlide = true;
            });
        }
        else {
            this.cancelConnectorCreation(this.currentOutcomerHandle, function (rtCode) {
                contextObj.notificationService.ShowToaster("Outcomes cannot be set for static Action Point", 2);
            });
        }
        //}
    };
    OpenWorkflowComponent.prototype.setOutcomedata = function (data) {
        if (this.isDrawChange == false) {
            this.isDrawChange = true;
            this.drawChanged.emit(this.isDrawChange);
        }
        var contextObj = this;
        this.showSlide = false;
        var returnData = JSON.parse(data['returnData'])[0];
        var outcomeText = returnData['Outcome'];
        var outcomeTypeId = returnData['OutcomeTypeId'];
        var outcomeId = returnData['Id'];
        var workFlowActionPointId = returnData['WorkFlowActionPointId'];
        var nextWorkFlowActionPointId = returnData['NextWorkFlowActionPointId'];
        var connectorType;
        var outComeHandle;
        var entityCategoryId = returnData["EntityCategoryId"];
        if (this.action == "add") {
            outComeHandle = this.currentOutcomerHandle;
            this.outcomeHandleArray.push({ Id: outcomeId, Handle: this.currentOutcomerHandle });
            contextObj.openWorkflowService.getActionPointAndOutcomes(contextObj.workTypeId, -1, 0).subscribe(function (resultData) {
                if (resultData["Data"]["ActionPointData"] != null && resultData["Data"]["ActionPointData"] != undefined) {
                    contextObj.actionPointsDataArray = JSON.parse(resultData["Data"]["ActionPointData"]);
                    contextObj.outcomeDataArray = JSON.parse(resultData["Data"]["OutcomeData"]);
                }
                switch (contextObj.workFlowCategoryId) {
                    case 1:
                        switch (outcomeTypeId) {
                            case 8:
                            case 9:
                            case 11:
                                contextObj.cancelConnectorCreation(outComeHandle, function (rtCode) {
                                    contextObj.flowchartObj.drawingObject.createOutcome(outcomeId, outcomeText, workFlowActionPointId, contextObj.requesterId, "", "", 4, "", false, function (retCode) {
                                    });
                                });
                                break;
                            case 16:
                                if (entityCategoryId == 3) {
                                    if (contextObj.toActionId != -1) {
                                        contextObj.cancelConnectorCreation(outComeHandle, function (rtCode) {
                                            contextObj.flowchartObj.drawingObject.createOutcome(outcomeId, outcomeText, workFlowActionPointId, "-3", "4", "Discarded Work Orders", 4, "", false, function (retCode) {
                                            });
                                        });
                                    }
                                    else {
                                        contextObj.flowchartObj.drawingObject.createNextAction(outComeHandle, 4, "-3", "Discarded Work Orders", -3, function (retCode) {
                                            contextObj.flowchartObj.drawingObject.createConnectorTextOnFlowchart(outComeHandle, outcomeText, outcomeId, 4, function (retCode) {
                                            });
                                        });
                                    }
                                }
                                else {
                                    contextObj.cancelConnectorCreation(outComeHandle, function (rtCode) {
                                        if (contextObj.requesterId != undefined) {
                                            contextObj.flowchartObj.drawingObject.createOutcome(outcomeId, outcomeText, workFlowActionPointId, contextObj.requesterId, "", "", 4, "", false, function (retCode) {
                                            });
                                        }
                                    });
                                }
                                break;
                            case 7:
                                if (contextObj.toActionId != -1) {
                                    contextObj.cancelConnectorCreation(outComeHandle, function (rtCode) {
                                        contextObj.flowchartObj.drawingObject.createOutcome(outcomeId, outcomeText, workFlowActionPointId, "-2", "4", "Closed Work Orders", 4, "", false, function (retCode) {
                                        });
                                    });
                                }
                                else {
                                    contextObj.flowchartObj.drawingObject.createNextAction(outComeHandle, 4, "-2", "Closed Work Orders", -2, function (retCode) {
                                        contextObj.flowchartObj.drawingObject.createConnectorTextOnFlowchart(outComeHandle, outcomeText, outcomeId, 4, function (retCode) {
                                        });
                                    });
                                }
                                break;
                            case 1:
                                contextObj.defaultAndGeneralOutcomeTypeSelection(2, nextWorkFlowActionPointId, outcomeId, outcomeText, workFlowActionPointId, outComeHandle, true);
                                break;
                            default:
                                contextObj.defaultAndGeneralOutcomeTypeSelection(2, nextWorkFlowActionPointId, outcomeId, outcomeText, workFlowActionPointId, outComeHandle, true);
                        }
                        break;
                }
            });
        }
        else {
            var index;
            index = contextObj.outcomeDataArray.findIndex(function (el) { return el.Id === returnData['Id']; });
            if (index != -1) {
                var previousOutcomeData = contextObj.outcomeDataArray[index];
                contextObj.outcomeDataArray[index] = returnData;
                var currentOutcomeData = contextObj.outcomeDataArray[index];
            }
            index = contextObj.outcomeHandleArray.findIndex(function (el) { return el.Id === returnData['Id']; });
            if (index != -1)
                outComeHandle = contextObj.outcomeHandleArray[index].Handle;
            else
                outComeHandle = contextObj.currentOutcomerHandle;
            switch (this.workFlowCategoryId) {
                case 1:
                    switch (outcomeTypeId) {
                        case 8:
                        case 9:
                        case 11:
                            contextObj.flowchartObj.drawingObject.updateTextOnFlowchart(false, outcomeId, outcomeText, function (retCode) {
                            });
                            break;
                        case 16:
                            if (entityCategoryId == 3) {
                                contextObj.flowchartObj.drawingObject.updateTextOnFlowchart(false, outcomeId, outcomeText, function (retCode) {
                                });
                            }
                            else {
                                contextObj.flowchartObj.drawingObject.updateTextOnFlowchart(false, outcomeId, outcomeText, function (retCode) {
                                });
                            }
                            break;
                        case 7:
                            contextObj.flowchartObj.drawingObject.updateTextOnFlowchart(false, outcomeId, outcomeText, function (retCode) {
                            });
                            break;
                        case 1:
                            this.defaultAndGeneralOutcomeTypeSelection(4, nextWorkFlowActionPointId, outcomeId, outcomeText, workFlowActionPointId, outComeHandle, false);
                            break;
                        default:
                            this.defaultAndGeneralOutcomeTypeSelection(2, nextWorkFlowActionPointId, outcomeId, outcomeText, workFlowActionPointId, outComeHandle, false);
                    }
                    break;
            }
        }
    };
    OpenWorkflowComponent.prototype.defaultAndGeneralOutcomeTypeSelection = function (connectorType, nextWorkFlowActionPointId, outcomeId, outcomeText, workFlowActionPointId, outComeHandle, isAdd) {
        var contextObj = this;
        if (contextObj.toActionId == nextWorkFlowActionPointId) {
            if (isAdd) {
                contextObj.flowchartObj.drawingObject.createConnectorTextOnFlowchart(outComeHandle, outcomeText, outcomeId, connectorType, function (retCode) {
                });
            }
            else {
                contextObj.flowchartObj.drawingObject.updateTextOnFlowchart(false, outcomeId, outcomeText, function (retCode) {
                });
            }
        }
        else {
            if (isAdd) {
                this.cancelConnectorCreation(outComeHandle, function (rtCode) {
                    contextObj.flowchartObj.drawingObject.createOutcome(outcomeId, outcomeText, workFlowActionPointId, nextWorkFlowActionPointId, "", "", connectorType, "", false, function (retCode) {
                    });
                });
            }
            else {
                contextObj.flowchartObj.drawingObject.deleteOutcome(outcomeId, function (rtCode) {
                    contextObj.flowchartObj.drawingObject.createOutcome(outcomeId, outcomeText, workFlowActionPointId, nextWorkFlowActionPointId, "", "", connectorType, "", false, function (retCode) {
                    });
                });
            }
        }
    };
    OpenWorkflowComponent.prototype.onFlowchartActionPointDoubleClick = function (event) {
        if (this.isNotInuse == false)
            return;
        var contextObj = this;
        this.selectedActionpointId = +event['Id'];
        this.currentActionPointHandle = event["BoxHandle"];
        contextObj.isEntityDisableInActionPointEdit = false;
        contextObj.openWorkflowService.getActionPointAndOutcomes(contextObj.workTypeId, -1, 0).subscribe(function (resultData) {
            if (resultData["Data"]["ActionPointData"] != null && resultData["Data"]["ActionPointData"] != undefined) {
                contextObj.actionPointsDataArray = JSON.parse(resultData["Data"]["ActionPointData"]);
                contextObj.outcomeDataArray = JSON.parse(resultData["Data"]["OutcomeData"]);
            }
            contextObj.selectedActionpointDataForEdit = contextObj.actionPointsDataArray.find(function (el) { return el.Id === contextObj.selectedActionpointId; });
            contextObj.isGeneral = contextObj.selectedActionpointDataForEdit["IsGeneral"];
            if (contextObj.isGeneral == false) {
                contextObj.action = "edit";
                contextObj.btnName = "Save Changes";
                contextObj.pageTitle = "Edit Action Point";
                var outcomeCount = contextObj.selectedActionpointDataForEdit["Outcome Count"];
                var entityCategoryCount = contextObj.selectedActionpointDataForEdit["EntityCategory Count"];
                var incomeOutcomeCount = contextObj.selectedActionpointDataForEdit["Incomming Outcome Count"];
                contextObj.workFlowServices.loadWorkFlowAddEdit(contextObj.selectedActionpointId, 2, contextObj.workFlowCategoryId, contextObj.moduleId, contextObj.workTypeId).subscribe(function (resultData) {
                    contextObj.fieldDetailsAddEdit = resultData["Data"];
                    for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                        if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1000) {
                            if (outcomeCount > entityCategoryCount || incomeOutcomeCount > 0) {
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                contextObj.isEntityDisableInActionPointEdit = true;
                            }
                        }
                    }
                    contextObj.isActionpoint = true;
                    contextObj.showSlide = true;
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Static Action Point cannot be edited", 2);
            }
        });
    };
    OpenWorkflowComponent.prototype.onFlowchartOutcomeDoubleClick = function (event) {
        this.selectedOutcomeId = +event['Id'];
        this.toActionId = -1;
        this.fromActionId = -1;
        if (this.isNotInuse == false || this.selectedOutcomeId == -10)
            return;
        var contextObj = this;
        this.selectedOutcometDataForEdit = this.outcomeDataArray.find(function (el) { return el.Id === contextObj.selectedOutcomeId; });
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Outcome";
        var outcomeTypeId = this.selectedOutcometDataForEdit["OutcomeTypeId"];
        var EntityName = this.selectedOutcometDataForEdit["Workflow Entity"];
        var workflowEntityCategoryId = this.selectedOutcometDataForEdit["EntityCategoryId"];
        var nextWorkFlowActionPointId = this.selectedOutcometDataForEdit["NextWorkFlowActionPointId"];
        this.fromActionId = this.selectedOutcometDataForEdit['WorkFlowActionPointId'];
        this.selectedActionpointtypeIdForOutcome = this.actionPointsDataArray.find(function (el) { return el.Id === contextObj.fromActionId; })["ActionPointTypeId"];
        var fromActionpointTypeId = this.selectedOutcometDataForEdit['CurrentActionPointTypeId'];
        this.workFlowServices.loadWorkflowOutcomeEdit(contextObj.selectedOutcomeId, contextObj.selectedActionpointtypeIdForOutcome, fromActionpointTypeId, this.workFlowCategoryId, this.moduleId, contextObj.fromActionId, outcomeTypeId, workflowEntityCategoryId, this.workTypeId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            var _loop_1 = function(i) {
                if (contextObj.fieldDetailsAddEdit[i].FieldId == 1080) {
                    if (workflowEntityCategoryId == 2) {
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                    }
                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                    contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                }
                else if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1082) {
                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                    contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                }
                else if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1083) {
                    nextActionPoint = contextObj.fieldDetailsAddEdit[i];
                    if (nextActionPoint["LookupDetails"]["LookupValues"].length == 0)
                        nextActionPoint["FieldValue"] = "-1";
                    notifyRequester = contextObj.fieldDetailsAddEdit.find(function (item) {
                        return item.FieldId === 1086;
                    });
                    outcome = contextObj.fieldDetailsAddEdit.find(function (item) {
                        return item.FieldId === 1082;
                    });
                    if (EntityName == "Service Requests") {
                        if (outcomeTypeId == "2" || outcomeTypeId == "18" || outcomeTypeId == "7" || outcomeTypeId == "8" || outcomeTypeId == "9" || outcomeTypeId == "11" || outcomeTypeId == "16" || outcomeTypeId == "21" || outcomeTypeId == "23" || outcomeTypeId == "19") {
                            notifyRequester.IsEnabled = false;
                            notifyRequester.IsVisible = true;
                            if (outcomeTypeId == "18") {
                                outcome.IsEnabled = false;
                            }
                        }
                        else {
                            notifyRequester.IsEnabled = true;
                            notifyRequester.IsVisible = true;
                        }
                    }
                    else if (EntityName == "PM Work Orders") {
                        notifyRequester.IsEnabled = false;
                        notifyRequester.IsVisible = false;
                    }
                    contextObj.updateNotifyRequesterField(notifyRequester);
                    if (outcomeTypeId == "6" || outcomeTypeId == "7" || outcomeTypeId == "8" || outcomeTypeId == "9" || outcomeTypeId == "11" || outcomeTypeId == "14" || outcomeTypeId == "15" || outcomeTypeId == "16" || outcomeTypeId == "21" || outcomeTypeId == "23") {
                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                        contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                    }
                    else {
                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                        contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                    }
                    if (outcomeTypeId == "28") {
                        ddlUser = contextObj.fieldDetailsAddEdit.find(function (item) {
                            return item.FieldId === 1171;
                        });
                        arrList = new Array();
                        arrList.push({
                            ReportFieldId: 5837,
                            Value: outcomeTypeId
                        }, {
                            ReportFieldId: 5832,
                            Value: contextObj.workTypeId
                        }, {
                            ReportFieldId: 6570,
                            Value: workflowEntityCategoryId
                        });
                        contextObj.workFlowServices.loadNextActionPointDetails(50570, JSON.stringify(arrList)).subscribe(function (resultData) {
                            if (resultData["Data"] != "[]") {
                                contextObj.userLookUpDetails = JSON.parse(resultData["Data"]);
                                contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                var actionPointDetails = contextObj.userLookUpDetails.find(function (item) {
                                    return item.Id === parseInt(contextObj.fieldDetailsAddEdit[i].FieldValue);
                                });
                            }
                            if (actionPointDetails) {
                                if (actionPointDetails.IsSpecificUser == 1) {
                                    contextObj.workFlowServices.loadUser(actionPointDetails.ActionPointId, 1083, contextObj.moduleId, contextObj.selectedOutcomeId).subscribe(function (resultData) {
                                        if (resultData["Data"]["LookupValues"] != "") {
                                            ddlUser.IsMandatory = true;
                                            ddlUser.HasValidationError = true;
                                            ddlUser.IsLocallyValidated = false;
                                            ddlUser.IsEnabled = true;
                                            ddlUser.IsVisible = true;
                                            ddlUser.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                            var userLookUp = ddlUser.LookupDetails.LookupValues;
                                            for (var i = 0; i < userLookUp.length; i++) {
                                                if (userLookUp[i]["IsChecked"] == 1) {
                                                    ddlUser.FieldValue = userLookUp[i]["Id"].toString();
                                                    break;
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            };
            var nextActionPoint, notifyRequester, outcome, ddlUser, arrList;
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                _loop_1(i);
            }
            contextObj.isOutcome = true;
            contextObj.showSlide = true;
        });
    };
    OpenWorkflowComponent.prototype.updateNotifyRequesterField = function (field) {
        switch (this.workFlowCategoryId) {
            case 8:
                field.IsVisible = false;
                field.FieldValue = "";
                break;
            default:
                field.IsVisible = true;
                break;
        }
    };
    OpenWorkflowComponent.prototype.onActionPointDeleteClick = function (event) {
        var contextObj = this;
        var selectedActionpointId = +event['ActionId'];
        this.selectedActionpointDataForDelete = this.actionPointsDataArray.find(function (el) { return el.Id === selectedActionpointId; });
        this.isGeneral = this.selectedActionpointDataForDelete["IsGeneral"];
        if (this.isGeneral == false) {
            this.workFlowServices.isEditableWorkflow(contextObj.workTypeId, selectedActionpointId).subscribe(function (isEditable) {
                if (isEditable["Data"] == true) {
                    contextObj.showSlideDeleteEditable = !contextObj.showSlideDeleteEditable;
                }
                else {
                    contextObj.showSlideDeleteNotEditable = !contextObj.showSlideDeleteNotEditable;
                }
            });
        }
        else {
            this.notificationService.ShowToaster("Static Action Point cannot be deleted", 2);
        }
    };
    OpenWorkflowComponent.prototype.okEditableActionpointDelete = function () {
        if (this.isDrawChange == false) {
            this.isDrawChange = true;
            this.drawChanged.emit(this.isDrawChange);
        }
        this.deleteActionpoint();
        this.showSlideDeleteEditable = false;
    };
    OpenWorkflowComponent.prototype.okNotEditableActionpointDelete = function () {
        this.isDrawChange = true;
        this.deleteActionpoint();
        this.showSlideDeleteNotEditable = false;
    };
    OpenWorkflowComponent.prototype.deleteActionpoint = function () {
        var contextObj = this;
        var actionPointNumber = this.selectedActionpointDataForDelete["Action Point Number"];
        var selectedActionpointId = this.selectedActionpointDataForDelete["Id"];
        this.workFlowServices.postDeleteWorkFlow(this.workTypeId, actionPointNumber, selectedActionpointId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                contextObj.flowchartObj.drawingObject.deleteActionPoint(selectedActionpointId, function (retCode, deletedOutcomeIds) {
                    contextObj.openWorkflowService.getActionPointAndOutcomes(contextObj.workTypeId, -1, 0).subscribe(function (resultData) {
                        if (resultData["Data"]["ActionPointData"] != null && resultData["Data"]["ActionPointData"] != undefined) {
                            contextObj.actionPointsDataArray = JSON.parse(resultData["Data"]["ActionPointData"]);
                            contextObj.outcomeDataArray = JSON.parse(resultData["Data"]["OutcomeData"]);
                        }
                        // actionPointToAddTimeOutArray = contextObj.actionPointIdsToAddTimeOut(contextObj.outcomeDataArray, selectedActionpointId);
                        if (contextObj.actionPointsDataArray.length > 1) {
                            contextObj.reArrangeActionPointsText(contextObj.actionPointsDataArray, 0, actionPointNumber, contextObj, function () {
                                //if (actionPointToAddTimeOutArray.length > 0) {
                                contextObj.flowchartObj.drawingObject.setDisplay(false);
                                contextObj.multipleActionPointTimeoutReCreate(0, function (ret) {
                                    contextObj.flowchartObj.drawingObject.setDisplay(true);
                                    if (contextObj.requesterId != undefined)
                                        contextObj.rearrangeCreateRequestOutcome(contextObj.actionPointsDataArray, function () { });
                                });
                                //}
                                // else {
                                //    if (contextObj.requesterId != undefined)
                                //        contextObj.rearrangeCreateRequestOutcome(contextObj.actionPointsDataArray);
                                //}
                            });
                        }
                    });
                });
            }
        });
    };
    OpenWorkflowComponent.prototype.actionPointIdsToAddTimeOut = function (outComeArray, currentActionpoint) {
        var actionPointIdArray = [];
        for (var _i = 0, outComeArray_1 = outComeArray; _i < outComeArray_1.length; _i++) {
            var item = outComeArray_1[_i];
            if (item["NextWorkFlowActionPointId"] == currentActionpoint) {
                if (item["OutcomeTypeId"] == 28) {
                    var fromActionpointId = item["WorkFlowActionPointId"];
                    actionPointIdArray.push(fromActionpointId);
                }
            }
        }
        return actionPointIdArray;
    };
    OpenWorkflowComponent.prototype.multipleActionPointTimeoutReCreate = function (count, resCallback) {
        var contextObj = this;
        if (this.actionPointsDataArray.length > count) {
            var outcomeIds = [];
            var actionId = this.actionPointsDataArray[count]["Id"];
            if (actionId != this.requesterId) {
                var currentOutComeArray = contextObj.outcomeDataArray.filter(function (item) {
                    return (item["WorkFlowActionPointId"] == actionId);
                });
                currentOutComeArray = currentOutComeArray.filter(function (item) {
                    return (item["OutcomeTypeId"] == 28);
                });
                contextObj.createTimeOut(0, currentOutComeArray, actionId, false, function (ret) {
                    count++;
                    contextObj.multipleActionPointTimeoutReCreate(count, resCallback);
                });
            }
            else {
                count++;
                contextObj.multipleActionPointTimeoutReCreate(count, resCallback);
            }
        }
        else {
            if (contextObj.isTimeOutShow == false) {
                contextObj.flowchartObj.drawingObject.showHideCirclesInFlowchart(false, function (retcode) {
                    resCallback();
                });
            }
            else
                resCallback();
        }
    };
    OpenWorkflowComponent.prototype.rearrangeCreateRequestOutcome = function (actionPointArray, resCallback) {
        var contextObj = this;
        var actionPointNo;
        contextObj.flowchartObj.drawingObject.deleteOutcome(-10, function (retCode) {
            for (var i = 0; i < actionPointArray.length; i++) {
                var selectedActionpointNo = actionPointArray[i]["Action Point Number"];
                if ((actionPointArray[i]["IsServiceRequest"] == true || actionPointArray[i]["IsServiceRequest"] == 1) && contextObj.requesterId != actionPointArray[i]['Id']) {
                    if (actionPointNo == undefined) {
                        actionPointNo = selectedActionpointNo;
                    }
                    else {
                        if (selectedActionpointNo < actionPointNo) {
                            actionPointNo = selectedActionpointNo;
                        }
                    }
                }
            }
            if (actionPointNo != undefined) {
                var index = actionPointArray.findIndex(function (el) { return el["Action Point Number"] === actionPointNo; });
                var actionPointId = actionPointArray[index]["Id"];
                contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(2, -10, function (returnCode, IsExists) {
                    if (returnCode == 0) {
                        if (!IsExists) {
                            if (contextObj.requesterId != undefined) {
                                contextObj.flowchartObj.drawingObject.createOutcome(-10, contextObj.requestOutComeName, contextObj.requesterId, actionPointId, "", "", 4, "", false, function (retCode) {
                                    resCallback();
                                });
                            }
                            else
                                resCallback();
                        }
                        else
                            resCallback();
                    }
                    else
                        resCallback();
                });
            }
            else
                resCallback();
        });
    };
    OpenWorkflowComponent.prototype.getFirstServiceRequestActionPointId = function (actionPointArray) {
        var contextObj = this;
        var actionPointNo;
        var actionPointId;
        for (var i = 0; i < actionPointArray.length; i++) {
            var selectedActionpointNo = actionPointArray[i]["Action Point Number"];
            if ((actionPointArray[i]["IsServiceRequest"] == true || actionPointArray[i]["IsServiceRequest"] == 1) && contextObj.requesterId != actionPointArray[i]['Id']) {
                if (actionPointNo == undefined) {
                    actionPointNo = selectedActionpointNo;
                }
                else {
                    if (selectedActionpointNo < actionPointNo) {
                        actionPointNo = selectedActionpointNo;
                    }
                }
            }
        }
        if (actionPointNo != undefined) {
            var index = actionPointArray.findIndex(function (el) { return el["Action Point Number"] === actionPointNo; });
            actionPointId = actionPointArray[index]["Id"];
        }
        return actionPointId;
    };
    OpenWorkflowComponent.prototype.reArrangeActionPointsText = function (actionPointData, count, deletedActionPointNumber, contextObj, resCallback) {
        var updateItemArray = [];
        while (actionPointData.length > count) {
            var actionPointdataItem = actionPointData[count];
            var actionPointNum = actionPointdataItem["ActionPointNo"];
            if (actionPointNum >= deletedActionPointNumber) {
                var actPointWithName = actionPointdataItem["Action Point With No"];
                updateItemArray.push([true, actionPointdataItem["Id"], actPointWithName]);
                //contextObj.flowchartObj.drawingObject.updateTextOnFlowchart(true, actionPointdataItem["Id"], actPointWithName, function (retCode) {
                count++;
            }
            else {
                count++;
            }
        }
        contextObj.flowchartObj.drawingObject.updateTextsOnFlowchart(updateItemArray, function (retCode) {
            resCallback();
        });
    };
    OpenWorkflowComponent.prototype.onFlowchartOutcomeDeleteClick = function (event) {
        var outcomeId = +event['OutcomeId'];
        if (outcomeId != -10) {
            this.selectedOutcometDataForDelete = this.outcomeDataArray.find(function (el) { return el.Id === outcomeId; });
            var defaultOutcomeId = this.selectedOutcometDataForDelete["OutcomeTypeId"];
            if (defaultOutcomeId == 28) {
                this.notificationService.ShowToaster("Outcome Type 'Timed Out' cannot be deleted", 2);
            }
            else {
                this.showSlideOutcomeDalete = true;
            }
        }
    };
    OpenWorkflowComponent.prototype.okOutcomeDelete = function () {
        if (this.isDrawChange == false) {
            this.isDrawChange = true;
            this.drawChanged.emit(this.isDrawChange);
        }
        var contextObj = this;
        var entityName = this.selectedOutcometDataForDelete["Workflow Entity"];
        var selectedOutcomeId = this.selectedOutcometDataForDelete["Id"];
        var defaultOutcomeId = this.selectedOutcometDataForDelete["OutcomeTypeId"];
        contextObj.workFlowServices.postDeleteWorkflowOutcomes(selectedOutcomeId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                contextObj.flowchartObj.drawingObject.deleteOutcome(selectedOutcomeId, function (retCode) {
                    contextObj.openWorkflowService.getActionPointAndOutcomes(contextObj.workTypeId, -1, 0).subscribe(function (resultData) {
                        if (resultData["Data"]["ActionPointData"] != null && resultData["Data"]["ActionPointData"] != undefined) {
                            contextObj.actionPointsDataArray = JSON.parse(resultData["Data"]["ActionPointData"]);
                            contextObj.outcomeDataArray = JSON.parse(resultData["Data"]["OutcomeData"]);
                        }
                        contextObj.showSlideOutcomeDalete = false;
                    });
                });
                contextObj.notificationService.ShowToaster("Selected Outcome deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("Selected Outcome cannot be deleted", 5);
            }
        });
    };
    OpenWorkflowComponent.prototype.cancelOutcomeClick = function () {
        this.showSlideOutcomeDalete = false;
    };
    OpenWorkflowComponent.prototype.cancelDeleteEditableActionpoint = function (event) {
        this.showSlideDeleteEditable = false;
    };
    OpenWorkflowComponent.prototype.cancelDeleteNotEditableActionpoint = function (value) {
        this.showSlideDeleteNotEditable = false;
    };
    OpenWorkflowComponent.prototype.closeSlideDialog = function (event) {
        if ((!event.change) && this.currentOutcomerHandle != undefined && this.isOutcome && this.action == "add") {
            this.cancelConnectorCreation(this.currentOutcomerHandle, function (rtCode) {
            });
        }
        if ((!event.change) && this.currentActionPointHandle != undefined && this.isActionpoint) {
            this.flowchartObj.drawingObject.cancelBox(this.currentActionPointHandle, function (retCode) {
            });
        }
        this.showSlide = false;
        this.isActionpoint = false;
        this.isOutcome = false;
        this.showSlideDeleteNotEditable = false;
        this.showSlideDeleteEditable = false;
        this.showSlideOutcomeDalete = false;
    };
    OpenWorkflowComponent.prototype.onFlowchartOutcomeChange = function (event) {
        if (this.isDrawChange == false) {
            this.isDrawChange = true;
            this.drawChanged.emit(this.isDrawChange);
        }
        var contextObj = this;
        var selectedOutcomeId = +event['OutcomeId'];
        var fromActionId = +event["FromActionId"];
        var toActionId;
        if (event["ToActionId"] == "")
            toActionId = -1;
        else
            toActionId = +event["ToActionId"];
        if (selectedOutcomeId == -10) {
            if (contextObj.getFirstServiceRequestActionPointId(contextObj.actionPointsDataArray) != toActionId)
                contextObj.rearrangeCreateRequestOutcome(contextObj.actionPointsDataArray, function () { });
        }
        else {
            this.selectedOutcometDataForEdit = this.outcomeDataArray.find(function (el) { return el.Id === selectedOutcomeId; });
            var previousWorkFlowActionPointId = this.selectedOutcometDataForEdit['NextWorkFlowActionPointId'];
            var currentFromActionId = this.selectedOutcometDataForEdit['WorkFlowActionPointId'];
            if (previousWorkFlowActionPointId == null && fromActionId == currentFromActionId)
                return;
            var workFlowActionPointId = fromActionId;
            var outcomeTypeId = this.selectedOutcometDataForEdit['OutcomeTypeId'];
            var description = this.selectedOutcometDataForEdit['Description'];
            var outcomeText = this.selectedOutcometDataForEdit['Outcome'];
            var nextWorkFlowActionPointId = toActionId;
            var entityCategoryId = this.selectedOutcometDataForEdit['EntityCategoryId'];
            var isNotifyRequestor = this.selectedOutcometDataForEdit['Notify Requester'];
            var userId = this.selectedOutcometDataForEdit['UserId'];
            var selectedActionPointEntitCategoryCount;
            if (this.isNotInuse == false) {
                if (currentFromActionId != workFlowActionPointId && previousWorkFlowActionPointId != nextWorkFlowActionPointId) {
                    contextObj.flowchartObj.drawingObject.deleteOutcome(selectedOutcomeId, function (rtCode) {
                        contextObj.flowchartObj.drawingObject.createOutcome(selectedOutcomeId, outcomeText, workFlowActionPointId, previousWorkFlowActionPointId, "", "", 2, "", false, function (retCode) {
                        });
                    });
                }
            }
            else {
                var index = this.actionPointsDataArray.findIndex(function (el) { return el["Id"] === toActionId; }); // if 1=PM only 2=SR only 3.Both
                if (index != -1)
                    selectedActionPointEntitCategoryCount = this.actionPointsDataArray[index]["EntityCategory Count"];
                if (toActionId == contextObj.requesterId || toActionId == -1) {
                    if (previousWorkFlowActionPointId == null) {
                        var outcomeIds = [];
                        outcomeIds = contextObj.outcomeDataArray.filter(function (item) {
                            return (item["Id"] === selectedOutcomeId);
                        });
                        contextObj.createTimeOut(0, outcomeIds, fromActionId, !contextObj.isTimeOutShow, function (ret) {
                        });
                    }
                    else {
                        contextObj.flowchartObj.drawingObject.deleteOutcome(selectedOutcomeId, function (rtCode) {
                            contextObj.flowchartObj.drawingObject.createOutcome(selectedOutcomeId, outcomeText, workFlowActionPointId, previousWorkFlowActionPointId, "", "", 2, "", false, function (retCode) {
                            });
                        });
                    }
                }
                else if ((entityCategoryId == 1 && selectedActionPointEntitCategoryCount == 2) || (entityCategoryId == 1 && selectedActionPointEntitCategoryCount == 3) ||
                    (entityCategoryId == 2 && selectedActionPointEntitCategoryCount == 2) || (entityCategoryId == 2 && selectedActionPointEntitCategoryCount == 3) ||
                    (entityCategoryId == 3 && selectedActionPointEntitCategoryCount == 1) || (entityCategoryId == 3 && selectedActionPointEntitCategoryCount == 3)) {
                    if (userId == null)
                        userId = 0;
                    this.openWorkflowService.updateWorkFlowActionPointOutcome(this.workTypeId, selectedOutcomeId, workFlowActionPointId, outcomeText, outcomeTypeId, description, nextWorkFlowActionPointId, entityCategoryId, isNotifyRequestor, userId).subscribe(function (resultData) {
                        contextObj.openWorkflowService.getActionPointAndOutcomes(contextObj.workTypeId, -1, 0).subscribe(function (resultData) {
                            if (resultData["Data"]["ActionPointData"] != null && resultData["Data"]["ActionPointData"] != undefined) {
                                contextObj.actionPointsDataArray = JSON.parse(resultData["Data"]["ActionPointData"]);
                                contextObj.outcomeDataArray = JSON.parse(resultData["Data"]["OutcomeData"]);
                            }
                        });
                    });
                }
                else {
                    var previousWorkFlowActionPointId = this.selectedOutcometDataForEdit['NextWorkFlowActionPointId'];
                    if (previousWorkFlowActionPointId == null) {
                        var outcomeIds = [];
                        outcomeIds = contextObj.outcomeDataArray.filter(function (item) {
                            return (item["Id"] === selectedOutcomeId);
                        });
                        contextObj.createTimeOut(0, outcomeIds, fromActionId, !contextObj.isTimeOutShow, function (ret) {
                        });
                    }
                    else {
                        contextObj.flowchartObj.drawingObject.deleteOutcome(selectedOutcomeId, function (rtCode) {
                            contextObj.flowchartObj.drawingObject.createOutcome(selectedOutcomeId, outcomeText, workFlowActionPointId, previousWorkFlowActionPointId, "", "", 2, "", false, function (retCode) {
                            });
                        });
                    }
                }
            }
        }
    };
    OpenWorkflowComponent.prototype.onFlowchartInvalidOutcome = function (event) {
    };
    OpenWorkflowComponent.prototype.saveOnClick = function () {
        if (this.isDrawChange == false) {
            this.isDrawChange = true;
            this.drawChanged.emit(this.isDrawChange);
        }
        var contextObj = this;
        this.flowchartObj.drawingObject.saveFlowchartView(function (retcode, XMLData) {
            var xmlData = XMLData;
            contextObj.openWorkflowService.saveFlowchartFile(xmlData, contextObj.workTypeId, 0).subscribe(function (resultData) {
                contextObj.notificationService.ShowToaster("Workflow saved", 3);
            });
        });
    };
    OpenWorkflowComponent.prototype.cancelSaveOnClick = function () {
        var contextObj = this;
        var actionpointNos = [];
        for (var i = 0; i < this.drawnActionPointData.length; i++) {
            actionpointNos.push(this.ActionPointData[i]["Action Point Number"]);
        }
        contextObj.openWorkflowService.deleteWorkflowActionPointWithNoFromWorkflow(this.workTypeId, -1, actionpointNos).subscribe(function (resultData) {
        });
    };
    OpenWorkflowComponent.prototype.workflowEscalationNotifications = function () {
        this.pageTitle = "Workflow Escalation Notifications";
        this.splitviewInput.showSecondaryView = true;
    };
    ////////////////////////////////////////////////////////Start
    OpenWorkflowComponent.prototype.CreatFlowChart = function () {
        this.actionId = 0;
        this.endId = 0;
        this.outcomeId = 0;
        var contextObj = this;
        var szEndIds = "";
        contextObj.createActionPoints(contextObj.actionPointsDataArray.length, 0, function () {
            contextObj.createEndPoints(contextObj.EndPointList, 0, szEndIds, function (szEndIds) {
                // contextObj.flowchartObj.drawingObject.showHideEndPointsInFlowchart(szEndIds, false, function (retcode) {
                if (contextObj.outcomeDataArray != undefined) {
                    contextObj.createOutcomes(contextObj.outcomeDataArray, 0, function () {
                        contextObj.flowchartObj.drawingObject.arrangeFlowchart(1, false, function (retcode) {
                            contextObj.flowchartObj.drawingObject.showHideCirclesInFlowchart(false, function (retcode) {
                                contextObj.isTimeOutShow = false;
                                if (contextObj.actionPointsDataArray.length == 1) {
                                    contextObj.flowchartObj.drawingObject.getBoxHandle(contextObj.actionPointsDataArray[0].Id, function (retCode, handle) {
                                        contextObj.flowchartObj.drawingObject.zoomEntityByOffset(handle, 300, function (retCode) {
                                            // contextObj.flowchartObj.drawingObject.zoomExtents(function (retCode) {
                                            contextObj.flowchartObj.drawingObject.display(function (retCode) {
                                                contextObj.flowchartObj.drawingObject.updateViewport(function (retCode) {
                                                    var loading_indicator = document.getElementById('loading-indicator');
                                                    loading_indicator.style.display = "none";
                                                    // contextObj.enableMenu = [0, 1, 22]
                                                    contextObj.loadMenudata();
                                                });
                                            });
                                            // });
                                        });
                                    });
                                }
                                else {
                                    contextObj.rearrangeCreateRequestOutcome(contextObj.actionPointsDataArray, function () {
                                        contextObj.flowchartObj.drawingObject.zoomExtents(function (retCode) {
                                            contextObj.flowchartObj.drawingObject.display(function (retCode) {
                                                contextObj.flowchartObj.drawingObject.updateViewport(function (retCode) {
                                                    var loading_indicator = document.getElementById('loading-indicator');
                                                    loading_indicator.style.display = "none";
                                                    //  contextObj.enableMenu = [0, 1, 22]
                                                    contextObj.loadMenudata();
                                                });
                                            });
                                        });
                                    });
                                }
                            });
                        });
                    });
                }
                // });
            });
        });
    };
    OpenWorkflowComponent.prototype.createActionPoints = function (ActionPointlength, i, resCallback) {
        var contextObj = this;
        var ActionItems = [];
        while (i < ActionPointlength) {
            contextObj.ActionPointId = contextObj.actionPointsDataArray[i]["Id"];
            contextObj.ActionPointWithNo = contextObj.actionPointsDataArray[i]["Action Point With No"];
            contextObj.ActionPointNumber = contextObj.actionPointsDataArray[i]["Action Point Number"];
            ActionItems.push([contextObj.ActionPointId, contextObj.ActionPointWithNo, contextObj.ActionPointNumber, ""]);
            //this.flowchartObj.drawingObject.createActionPoint(contextObj.ActionPointId, contextObj.ActionPointWithNo, contextObj.ActionPointNumber, "", function (retCode) {
            if (parseInt(contextObj.ActionPointId) > contextObj.actionId)
                contextObj.actionId = parseInt(contextObj.ActionPointId);
            i++;
        }
        this.flowchartObj.drawingObject.createActionPoints(ActionItems, function (retCode) {
            resCallback();
        });
    };
    OpenWorkflowComponent.prototype.createEndPoints = function (nEndPointList, i, szEndIds, resCallback) {
        var EndItems = [];
        while (i < nEndPointList.length) {
            var szEndId = nEndPointList[i]["Id"];
            var OutcomeValue = nEndPointList[i]["Name"];
            EndItems.push([szEndId, OutcomeValue, ""]);
            var contextObj = this;
            //  this.flowchartObj.drawingObject.createEndPoint(szEndId, OutcomeValue, "", function (retCode) {
            if (parseInt(szEndId) > contextObj.endId)
                contextObj.endId = parseInt(szEndId);
            szEndIds += szEndId + contextObj.columnDelimiter;
            i++;
        }
        this.flowchartObj.drawingObject.createEndPoints(EndItems, function (retCode) {
            resCallback(szEndIds);
        });
    };
    OpenWorkflowComponent.prototype.createOutcomes = function (nOutcomesData, i, resCallback) {
        var OutcomeItems = [];
        while (i < nOutcomesData.length) {
            var szOutcomeId = nOutcomesData[i]["Id"];
            var szOutcomeText = nOutcomesData[i]["Value"];
            var szFromId = nOutcomesData[i]["WorkFlowActionPointId"];
            var szToId = nOutcomesData[i]["NextWorkFlowActionPointId"];
            var szType;
            var ConnectorType;
            var EntityCategoryId = nOutcomesData[i]["EntityCategoryId"];
            var OutcomeTypeId = nOutcomesData[i]["OutcomeTypeId"];
            var EndText = "";
            var contextObj = this;
            if (szToId != null) {
                if (szOutcomeId == 1) {
                    szType = 1;
                    ConnectorType = 4;
                }
                else {
                    szType = 1;
                    ConnectorType = 2;
                }
            }
            else {
                if (EntityCategoryId == 1) {
                    if (OutcomeTypeId == 11 || OutcomeTypeId == 16 || OutcomeTypeId == 8 || OutcomeTypeId == 9) {
                        szToId = contextObj.requesterId;
                        szType = 1;
                        ConnectorType = 4;
                        EndText = szOutcomeText;
                    }
                    else {
                        szToId = "";
                        szType = 3;
                        ConnectorType = 2;
                        EndText = "";
                    }
                }
                else if (EntityCategoryId == 2) {
                    if (OutcomeTypeId == 7) {
                        szToId = -2;
                        szType = 4;
                        ConnectorType = 4;
                        EndText = "Closed Work Order";
                    }
                    else {
                        szToId = "";
                        szType = 3;
                        ConnectorType = 2;
                        EndText = "";
                    }
                }
                else if (EntityCategoryId == 3) {
                    if (OutcomeTypeId == 7) {
                        szToId = -2;
                        szType = 4;
                        ConnectorType = 4;
                        EndText = "Closed Work Order";
                    }
                    else if (OutcomeTypeId == 16) {
                        szToId = -3;
                        szType = 4;
                        ConnectorType = 4;
                        EndText = "Discarded Work Orders";
                    }
                    else {
                        szToId = "";
                        szType = 3;
                        ConnectorType = 2;
                        EndText = "";
                    }
                }
            }
            OutcomeItems.push([szOutcomeId, szOutcomeText, szFromId, szToId, szType, EndText, ConnectorType, ""]);
            //this.flowchartObj.drawingObject.createOutcome(szOutcomeId, szOutcomeText, szFromId, szToId, szType, EndText, ConnectorType, "", function (retCode) {
            if (parseInt(szOutcomeId) > contextObj.outcomeId)
                contextObj.outcomeId = parseInt(szOutcomeId);
            i++;
        }
        this.flowchartObj.drawingObject.createOutcomes(OutcomeItems, function (retCode) {
            resCallback();
        });
    };
    //////////////////////////////////////////////////////// ENd
    //////////////////////////////////////////////////////////Start
    OpenWorkflowComponent.prototype.updateOpenedView = function () {
        var contextObj = this;
        this.updateActionPoints(0, function () {
            contextObj.updateEndPoints(contextObj.endId, function () {
                contextObj.updateOutcomes(0, function () {
                    contextObj.flowchartObj.drawingObject.getAllIdsInFlowchart(function (retCode, ActionIds, OutComeIds, EndRectIds) {
                        if (retCode == 0) {
                            var szActionIds = ActionIds.split("§");
                            var szEndRectIds = EndRectIds.split("§");
                            var szOutComeIds = OutComeIds.split("§");
                            var index;
                            //index = szOutComeIds.findIndex(function (el) { return el == "-10" });
                            //if (index != -1)
                            //    szOutComeIds.splice(index, 1);
                            contextObj.deleteActionPoints(szActionIds, 0, function () {
                                contextObj.deleteEndPoints(szEndRectIds, 0, function () {
                                    contextObj.deleteOutcomes(szOutComeIds, 0, function () {
                                        contextObj.flowchartObj.drawingObject.showHideCirclesInFlowchart(false, function (retcode) {
                                            contextObj.isTimeOutShow = false;
                                            //  contextObj.flowchartObj.drawingObject.arrangeFlowchart(1, false, function (retcode) {                                                
                                            if (contextObj.actionPointsDataArray.length == 1) {
                                                contextObj.flowchartObj.drawingObject.getBoxHandle(contextObj.actionPointsDataArray[0].Id, function (retCode, handle) {
                                                    //  contextObj.flowchartObj.drawingObject.zoomEntityByOffset(handle, 300, function (retCode) {
                                                    contextObj.flowchartObj.drawingObject.zoomExtents(function (retCode) {
                                                        contextObj.flowchartObj.drawingObject.display(function (retCode) {
                                                            contextObj.flowchartObj.drawingObject.updateViewport(function (retCode) {
                                                                var loading_indicator = document.getElementById('loading-indicator');
                                                                loading_indicator.style.display = "none";
                                                                // contextObj.enableMenu = [0, 1, 22]
                                                                contextObj.loadMenudata();
                                                            });
                                                        });
                                                        // });
                                                    });
                                                });
                                            }
                                            else {
                                                contextObj.reArrangeActionPointsText(contextObj.actionPointsDataArray, 0, 0, contextObj, function () {
                                                    contextObj.rearrangeCreateRequestOutcome(contextObj.actionPointsDataArray, function () {
                                                        contextObj.flowchartObj.drawingObject.zoomExtents(function (retCode) {
                                                            contextObj.flowchartObj.drawingObject.display(function (retCode) {
                                                                contextObj.flowchartObj.drawingObject.updateViewport(function (retCode) {
                                                                    var loading_indicator = document.getElementById('loading-indicator');
                                                                    loading_indicator.style.display = "none";
                                                                    //  contextObj.enableMenu = [0, 1, 22]
                                                                    contextObj.loadMenudata();
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            }
                                        });
                                        // });
                                    });
                                });
                            });
                        }
                    });
                });
            });
        });
    };
    OpenWorkflowComponent.prototype.deleteActionPoints = function (szActionIds, i, resCallback) {
        var contextObj = this;
        if (i < szActionIds.length) {
            if (szActionIds[i] != "") {
                var tempData = contextObj.actionPointsDataArray.find(function (item) {
                    return item.Id === parseInt(szActionIds[i]);
                });
                if (!tempData) {
                    contextObj.flowchartObj.drawingObject.deleteActionPoint(szActionIds[i], function (retCode, deletedOutcomeIds) {
                        i++;
                        contextObj.deleteActionPoints(szActionIds, i, resCallback);
                    });
                }
                else {
                    i++;
                    contextObj.deleteActionPoints(szActionIds, i, resCallback);
                }
            }
            else {
                i++;
                contextObj.deleteActionPoints(szActionIds, i, resCallback);
            }
        }
        else
            resCallback();
    };
    OpenWorkflowComponent.prototype.deleteEndPoints = function (szEndRectIds, i, resCallback) {
        var contextObj = this;
        if (i < szEndRectIds.length) {
            if (szEndRectIds[i] != "") {
                var tempData = contextObj.EndPointList.find(function (item) {
                    return item.Id === parseInt(szEndRectIds[i]);
                });
                if (!tempData) {
                    contextObj.flowchartObj.drawingObject.deleteEndRectangle(szEndRectIds[i], function (retCode) {
                        i++;
                        contextObj.deleteEndPoints(szEndRectIds, i, resCallback);
                    });
                }
                else {
                    i++;
                    contextObj.deleteEndPoints(szEndRectIds, i, resCallback);
                }
            }
            else {
                i++;
                contextObj.deleteEndPoints(szEndRectIds, i, resCallback);
            }
        }
        else
            resCallback();
    };
    OpenWorkflowComponent.prototype.deleteOutcomes = function (szOutComeIds, i, resCallback) {
        debugger;
        var contextObj = this;
        if (i < szOutComeIds.length) {
            if (szOutComeIds[i] != "" && szOutComeIds[i] != "-10") {
                var tempData = contextObj.outcomeDataArray.find(function (item) {
                    return item.Id === parseInt(szOutComeIds[i]);
                });
                if (!tempData) {
                    contextObj.flowchartObj.drawingObject.deleteOutcome(szOutComeIds[i], function (retCode) {
                        i++;
                        contextObj.deleteOutcomes(szOutComeIds, i, resCallback);
                    });
                }
                else {
                    i++;
                    contextObj.deleteOutcomes(szOutComeIds, i, resCallback);
                }
            }
            else {
                i++;
                contextObj.deleteOutcomes(szOutComeIds, i, resCallback);
            }
        }
        else {
            resCallback();
        }
    };
    OpenWorkflowComponent.prototype.updateActionPoints = function (i, resCallback) {
        var contextObj = this;
        if (i < contextObj.actionPointsDataArray.length) {
            contextObj.ActionPointId = contextObj.actionPointsDataArray[i]["Id"];
            contextObj.ActionPointWithNo = contextObj.actionPointsDataArray[i]["Action Point With No"];
            contextObj.ActionPointNumber = contextObj.actionPointsDataArray[i]["Action Point Number"];
            //if (contextObj.ActionPointId != "") {
            contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(1, contextObj.ActionPointId, function (returnCode, IsExists) {
                if (returnCode == 0) {
                    if (!IsExists) {
                        contextObj.flowchartObj.drawingObject.createActionPoint(contextObj.ActionPointId, contextObj.ActionPointWithNo, contextObj.ActionPointNumber, "", function (retCode) {
                            i++;
                            contextObj.updateActionPoints(i, resCallback);
                        });
                    }
                    else {
                        i++;
                        contextObj.updateActionPoints(i, resCallback);
                    }
                }
            });
        }
        else {
            resCallback();
        }
    };
    OpenWorkflowComponent.prototype.updateEndPoints = function (i, resCallback) {
        var contextObj = this;
        // i <= this.endId
        if (i < contextObj.EndPointList.length) {
            //var tempData = new Object;
            //tempData = this.mapEndPoints[i];
            var szEndId = contextObj.EndPointList[i]["Id"];
            var OutcomeValue = contextObj.EndPointList[i]["Name"];
            //if (szEndId) {
            contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(3, szEndId, function (returnCode, IsExists) {
                if (returnCode == 0) {
                    if (!IsExists) {
                        contextObj.flowchartObj.drawingObject.createEndPoint(szEndId, OutcomeValue, "", function (retCode) {
                            i++;
                            contextObj.updateEndPoints(i, resCallback);
                        });
                    }
                    else {
                        i++;
                        contextObj.updateEndPoints(i, resCallback);
                    }
                }
            });
        }
        else {
            resCallback();
        }
    };
    OpenWorkflowComponent.prototype.updateOutcomes = function (i, resCallback) {
        var contextObj = this;
        if (i < contextObj.outcomeDataArray.length) {
            var szOutcomeId = contextObj.outcomeDataArray[i]["Id"];
            var szOutcomeText = contextObj.outcomeDataArray[i]["Value"];
            var szFromId = contextObj.outcomeDataArray[i]["WorkFlowActionPointId"];
            var szToId = contextObj.outcomeDataArray[i]["NextWorkFlowActionPointId"];
            var szType;
            var ConnectorType;
            var EntityCategoryId = contextObj.outcomeDataArray[i]["EntityCategoryId"];
            var OutcomeTypeId = contextObj.outcomeDataArray[i]["OutcomeTypeId"];
            var EndText = "";
            var contextObj = this;
            if (szToId != null) {
                if (szOutcomeId == 1) {
                    szType = 1;
                    ConnectorType = 4;
                }
                else {
                    szType = 1;
                    ConnectorType = 2;
                }
            }
            else {
                if (EntityCategoryId == 1) {
                    if (OutcomeTypeId == 11 || OutcomeTypeId == 16 || OutcomeTypeId == 8 || OutcomeTypeId == 9) {
                        szToId = contextObj.requesterId;
                        szType = 1;
                        ConnectorType = 4;
                        EndText = szOutcomeText;
                    }
                    else {
                        szToId = "";
                        szType = 3;
                        ConnectorType = 2;
                        EndText = "";
                    }
                }
                else if (EntityCategoryId == 2) {
                    if (OutcomeTypeId == 7) {
                        szToId = -2;
                        szType = 4;
                        ConnectorType = 4;
                        EndText = "Closed Work Order";
                    }
                    else {
                        szToId = "";
                        szType = 3;
                        ConnectorType = 2;
                        EndText = "";
                    }
                }
                else if (EntityCategoryId == 3) {
                    if (OutcomeTypeId == 7) {
                        szToId = -2;
                        szType = 4;
                        ConnectorType = 4;
                        EndText = "Closed Work Order";
                    }
                    else if (OutcomeTypeId == 16) {
                        szToId = -3;
                        szType = 4;
                        ConnectorType = 4;
                        EndText = "Discarded Work Orders";
                    }
                    else {
                        szToId = "";
                        szType = 3;
                        ConnectorType = 2;
                        EndText = "";
                    }
                }
            }
            //if (szOutcomeId) {
            contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(2, szOutcomeId, function (returnCode, IsExists) {
                if (returnCode == 0) {
                    if (!IsExists) {
                        contextObj.flowchartObj.drawingObject.createOutcome(szOutcomeId, szOutcomeText, szFromId, szToId, szType, EndText, ConnectorType, "", false, function (retCode) {
                            i++;
                            contextObj.updateOutcomes(i, resCallback);
                        });
                    }
                    else {
                        i++;
                        contextObj.updateOutcomes(i, resCallback);
                    }
                }
            });
        }
        else {
            resCallback();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], OpenWorkflowComponent.prototype, "moduleId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], OpenWorkflowComponent.prototype, "workFlowCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], OpenWorkflowComponent.prototype, "workTypeId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], OpenWorkflowComponent.prototype, "workTypeName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OpenWorkflowComponent.prototype, "isCloseOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OpenWorkflowComponent.prototype, "outOpenWorkflowobject", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OpenWorkflowComponent.prototype, "drawChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], OpenWorkflowComponent.prototype, "isNotInuse", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], OpenWorkflowComponent.prototype, "onResize", null);
    OpenWorkflowComponent = __decorate([
        core_1.Component({
            selector: 'openworkflow',
            templateUrl: 'app/Views/Common/OpenWorkflow/openworkflow.component.html',
            styleUrls: ['app/Views/Common/OpenWorkflow/openworkflow.component.css'],
            directives: [slide_component_1.SlideComponent, flowchart_component_1.FlowchartComponent, submenu_component_1.SubMenu, workflow_EscalationNotificationsList_1.WorkflowEscalationsNotificationsComponent, notify_component_1.Notification, setworkflow_addedit_1.SetWorkFlowAddEditComponent, workflowoutcomes_addedit_1.WorkflowOutcomeAddEditComponent, drawingtooltip_component_1.DrawingTooltip, split_view_component_1.SplitViewComponent],
            providers: [http_1.HTTP_PROVIDERS, openworkflow_services_1.OpenWorkflowServices, notify_service_1.NotificationService, workflow_service_1.WorkFlowService],
        }), 
        __metadata('design:paramtypes', [openworkflow_services_1.OpenWorkflowServices, notify_service_1.NotificationService, workflow_service_1.WorkFlowService])
    ], OpenWorkflowComponent);
    return OpenWorkflowComponent;
}());
exports.OpenWorkflowComponent = OpenWorkflowComponent;
(function (OutComeType) {
    OutComeType[OutComeType["SourceMove"] = 1] = "SourceMove";
    OutComeType[OutComeType["DestinationMove"] = 2] = "DestinationMove";
    OutComeType[OutComeType["FullMove"] = 3] = "FullMove";
    OutComeType[OutComeType["NoMove"] = 4] = "NoMove";
})(exports.OutComeType || (exports.OutComeType = {}));
var OutComeType = exports.OutComeType;
//# sourceMappingURL=openworkflow.component.js.map
﻿//Sample for using flowchart
import {Component, Input, EventEmitter, Output} from '@angular/core'
import { FlowchartComponent } from '../../../Framework/whatever/Flowchart/flowchart.component'
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import "../../../../Scripts/xmlParser.js";

declare var XMLParser: any;

@Component({
    selector: 'workflow',
    templateUrl: 'app/Views/WorkOrder/Workflow/workflow.component.html',
    directives: [SlideComponent, FlowchartComponent, SubMenu],
    providers: [FlowchartComponent]
})


export class WorkflowComponent {
    showtstOutcomesSlide = false;
    showActionPointsSlide = false;
    showOutcomeDetSlide = false;
    showActionSlide = false;
    showOutcomeSlide = false;
    showUpdateSlide = false;
    showIdsSlide = false;
    showOpenSlide = false;
    flowchartObj: any;
    actionId: number = 0;
    actionNo: number = 1;
    outcomeNo: number = 1;
    outcomeId: number = 0;
    endId: number = -1;
    endNo: number = 1;
    actionName: any;
    outcomeName: any;
    currentBoxHandle: string = "";
    currentConnectorHandle: string = "";
    toActionId: string = "";
    currentId: string = "";
    fromActionId: string = "";
    isActionPoint: boolean = false;
    menuData = [];
    public totalItems: number = 1;
    enableMenu = [1];
    showHideCircle = false;
    showHideActionPoints = false;
    showHideOutcomes = false;
    showHideEndPoints = false;
    rowDelimiter: string = "§";
    columnDelimiter: string = "µ";
    itemtype: number = 0; // for testing purpose - 0 for ActionPoint, 1 for Outcome, 2 for EndPoint
    isFlowchartView: boolean = true;
    mapActionPoints: Object;
    mapEndPoints: Object;
    mapOutcomes: Object;

    constructor(tempObj: FlowchartComponent) {
        debugger;
        // this.flowchartObj = tempObj;
        this.mapActionPoints = new Object();
        this.mapEndPoints = new Object();
        this.mapOutcomes = new Object();
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.menuData = [{
            "id": 11,
            "title": "More",
            "image": "More",
            "path": "More",
            "subMenu": [
                {
                    "id": 1,
                    "title": "Delete EndPoint",
                    "image": "Delete EndPoint",
                    "path": "Delete EndPoint",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 2,
                    "title": "Show Hide Circles",
                    "image": "Show Hide Circles",
                    "path": "Show Hide Circles",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 3,
                    "title": "ShowHideActionPts",
                    "image": "ShowHideActionPts",
                    "path": "ShowHideActionPts",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 4,
                    "title": "ShowHideOutcomes",
                    "image": "ShowHideOutcomes",
                    "path": "ShowHideOutcomes",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 5,
                    "title": "ShowHideEndPts",
                    "image": "ShowHideEndPts",
                    "path": "ShowHideEndPts",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 14,
                    "title": "Save Flowchart View",
                    "image": "Save Flowchart View",
                    "path": "Save Flowchart View",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 15,
                    "title": "Open Flowchart View",
                    "image": "Open Flowchart View",
                    "path": "Open Flowchart View",
                    "submenu": null,
                    "privilegeId": null
                },                
                {
                    "id": 16,
                    "title": "Open Work flow",
                    "image": "Open Work flow",
                    "path": "Open Work flow",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 17,
                    "title": "Update Opened View",
                    "image": "Update Opened View",
                    "path": "Update Opened View",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 18,
                    "title": "Get Outcome Details",
                    "image": "Get Outcome Details",
                    "path": "Get Outcome Details",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 19,
                    "title": "Exit Grip Mode",
                    "image": "Exit Grip Mode",
                    "path": "Exit Grip Mode",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 20,
                    "title": "Get Selected FlowchartId",
                    "image": "Get Selected FlowchartId",
                    "path": "Get Selected FlowchartId",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 21,
                    "title": "Add/Remove ActionPoint",
                    "image": "Add/Remove ActionPoint",
                    "path": "Add/Remove ActionPoint",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 23,
                    "title": "Add/Remove Outcome",
                    "image": "Add/Remove Outcome",
                    "path": "Add/Remove Outcome",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 24,
                    "title": "GetAllIdsInFlowchart",
                    "image": "GetAllIdsInFlowchart",
                    "path": "GetAllIdsInFlowchart",
                    "submenu": null,
                    "privilegeId": null
                }

                ]
        },
        {
            "id": 22,
            "title": "More",
            "image": "More",
            "path": "More",
            "subMenu": [
                {
                    "id": 6,
                    "title": "Arg Top to Bottom",
                    "image": "Arg Top to Bottom",
                    "path": "Arg Top to Bottom",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 7,
                    "title": "Arg Bottom to Top",
                    "image": "Arg Bottom to Top",
                    "path": "Arg Bottom to Top",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 8,
                    "title": "Arg Left to Right",
                    "image": "Arg Left to Right",
                    "path": "Arg Left to Right",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 9,
                    "title": "Arg Right to Left",
                    "image": "Arg Right to Left",
                    "path": "Arg Right to Left",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 10,
                    "title": "Arg(Id) Top to Bottom",
                    "image": "Arg(Id) Top to Bottom",
                    "path": "Arg(Id) Top to Bottom",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 11,
                    "title": "Arg(Id) Bottom to Top",
                    "image": "Arg(Id) Bottom to Top",
                    "path": "Arg(Id) Bottom to Top",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 12,
                    "title": "Arg(Id) Left to Right",
                    "image": "Arg(Id) Left to Right",
                    "path": "Arg(Id) Left to Right",
                    "submenu": null,
                    "privilegeId": null
                },
                {
                    "id": 13,
                    "title": "Arg(Id) Right to Left",
                    "image": "Arg(Id) Right to Left",
                    "path": "Arg(Id) Right to Left",
                    "submenu": null,
                    "privilegeId": null
                }
                ]
        }];
        
    }

  
    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:                
                this.flowchartObj.drawingObject.deleteEndRectangle(-1, function (retcode) { });
                break;
            case 2:
                this.flowchartObj.drawingObject.showHideCirclesInFlowchart(contextObj.showHideCircle, function (retcode) {
                    contextObj.showHideCircle = !contextObj.showHideCircle;
                });
                break;
            case 3:
                this.showIdsSlide = true; 
                this.itemtype = 0;
                break;
            case 4:
                this.showIdsSlide = true;
                this.itemtype = 1;
                break;
            case 5:
                this.showIdsSlide = true;
                this.itemtype = 2;
                break;
            case 6:
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                    this.flowchartObj.drawingObject.arrangeFlowchart(1, false, function (retcode) {
                    });
                }               
                break;
            case 7:
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                this.flowchartObj.drawingObject.arrangeFlowchart(2, false, function (retcode) {
                });
                }
                break;
            case 8:
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                this.flowchartObj.drawingObject.arrangeFlowchart(3, false, function (retcode) {
                });
                }
                break;
            case 9:
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                this.flowchartObj.drawingObject.arrangeFlowchart(4, false, function (retcode) {
                });
                }
                break;
            case 10:
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                this.flowchartObj.drawingObject.arrangeFlowchart(1, true, function (retcode) {
                });
                }
                break;
            case 11:
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                this.flowchartObj.drawingObject.arrangeFlowchart(2, true, function (retcode) {
                });
                }
                break;
            case 12:
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                this.flowchartObj.drawingObject.arrangeFlowchart(3, true, function (retcode) {
                });
                }
                break;
            case 13:
                var isGripWait = [0];
                this.flowchartObj.drawingObject.isGripWaitMode(isGripWait);
                if (!isGripWait[0]) {
                this.flowchartObj.drawingObject.arrangeFlowchart(4, true, function (retcode) {
                });
                }
                break;
            case 14:
                this.flowchartObj.drawingObject.saveFlowchartView(function (retcode, XMLData) {
                    contextObj.flowchartObj.drawingObject.downloadFile(XMLData, "test.txt");
                });
                break;
            case 15:
                this.isFlowchartView = true;
                this.showOpenSlide = true;
                break;
            case 16:
                this.isFlowchartView = false;
                this.showOpenSlide = true;
                break;
            case 17:
                this.updateOpenedView();
                break;
            case 18:
                this.showOutcomeDetSlide = true;
                break;
            case 19:
                this.flowchartObj.drawingObject.exitGripMode(function (retcode) {
                });
                break;
            case 20:
                this.flowchartObj.drawingObject.getSelectedFlowchartId(function (retcode, id, isActionPoint) {
                    alert("Id:: " + id + ", Is ActionPoint :: " + isActionPoint);
                });
                break; 
            case 21:
                this.showActionPointsSlide = true;
                break; 
            case 23:
                this.showtstOutcomesSlide = true;
                break; 
            case 24:
                this.flowchartObj.drawingObject.getAllIdsInFlowchart(function (retcode, ActionIds, OutcomeIds, EndIds) {
                    alert("ActionIds: " + ActionIds + ", OutcomeIds: " + OutcomeIds + ", EndIds: " + EndIds);
                });
                break; 
        }
    }

    onDrawingObjectInitialize(event: any) {
        //this.flowchartObj.drawingObject = event;
        var contextObj = this;
        this.flowchartObj = event["obj"];    
        contextObj.flowchartObj.drawingObject.zoomExtents(function (retCode) {
            contextObj.flowchartObj.drawingObject.display(function (retCode) {
                var loading_indicator = document.getElementById('loading-indicator');
                loading_indicator.style.display = "none";
                contextObj.flowchartObj.drawingObject.setDelimiter(contextObj.rowDelimiter, contextObj.columnDelimiter, function (returnCode) { });
                contextObj.flowchartObj.drawingObject.setTooltipPriority("14");
                contextObj.flowchartObj.drawingObject.addEvent("tooltipHandler", function (outputs) {
                    if (outputs[0] != "") {
                        contextObj.flowchartObj.drawingObject.getItemId(outputs[0], function (retCode, id, isActionPoint) {
                            console.log("tooltipHandler - handle : " + outputs[0] + ",id : " + id + ",isActionPoint : " + isActionPoint);
                        });
                    }
                });
            });            
        });        
    }

    onFlowchartBoxCreate(event: any) {
        var contextObj = this;
        this.currentBoxHandle = event["BoxHandle"];
        this.actionName = "Action Point";
        var ActionText = this.actionName + contextObj.actionNo;
        (<HTMLInputElement>document.getElementById("actionNo")).value = contextObj.actionNo.toString();
        (<HTMLInputElement>document.getElementById("actionName")).value = ActionText;
        this.showActionSlide = true;        
    }

    onFlowchartConnectorCreate(event: any) {
        var contextObj = this;
        this.currentConnectorHandle = event["ConnectorHandle"];
        this.toActionId = event["ToActionId"];
        this.fromActionId = event["FromActionId"];
        this.outcomeName = "Outcome";
        var OutcomeText = this.outcomeName + contextObj.outcomeNo;
        (<HTMLInputElement>document.getElementById("outcome")).value = OutcomeText;
        this.showOutcomeSlide = true;       
    }
    onFlowchartActionPointDoubleClick(event: any) {
        this.isActionPoint = true;
        this.currentId = event["Id"];
        this.showUpdateSlide = true; 
    }

    onFlowchartConnectorDoubleClick(event: any) {
        this.isActionPoint = false;
        this.currentId = event["Id"];
        this.showUpdateSlide = true;
    }
    onFlowchartConnectorChange(event: any) {
        var tempData = new Object;
        tempData = this.mapOutcomes[event["OutcomeId"]];
        tempData["m_szFromId"] = event["FromActionId"];
        tempData["m_szToId"] = event["ToActionId"];
        this.mapOutcomes[event["OutcomeId"]] = tempData;
    }
    onFlowchartInvalidConnector(event: any) {
        alert("Source and Target on Same SnapIndex is not possible.....");
    }
    onFlowchartActionPointDeleteClick(event: any) {
        var contextObj = this;
        this.flowchartObj.drawingObject.deleteActionPoint(event["ActionId"], function (retCode, deletedOutcomeIds) {
            delete contextObj.mapActionPoints[event["ActionId"]];
            var outcomeIds = deletedOutcomeIds.Split(";");
            for (var i = 0; i < outcomeIds.length; i++) {
                delete contextObj.mapOutcomes[outcomeIds[i]];
            }

            alert(deletedOutcomeIds);
        });
    }
    onFlowchartOutcomeDeleteClick(event: any) {
        var contextObj = this;
        this.flowchartObj.drawingObject.deleteOutcome(event["OutcomeId"], function (retCode) {
            delete contextObj.mapOutcomes[event["OutcomeId"]];
        });
    } 
    okOutcomeDet(event: any) {
        var contextObj = this;
        var outcomeId = (<HTMLTextAreaElement>document.getElementById("outcomeid")).value;
        this.flowchartObj.drawingObject.getOutcomeDetails(outcomeId, function (retcode, fromActionId, toActionId, outcomeText) {
            contextObj.showOutcomeDetSlide = false;
            if (retcode == 0) {
                alert("From Action Id :: " + fromActionId + ", To Action Id:: " + toActionId + ", Outcome Text :: " + outcomeText);
            }
        });
        this.showOutcomeDetSlide = false;
    }
    cancelOutcomeDet(event: any) {
        this.showOutcomeDetSlide = false;
    }
    closeOutcomeDetSlideDialog(event: any) {
        this.showOutcomeDetSlide = false;
    }

    okOpenFlow(event: any) {
        var contextObj = this;
        var flowtext = (<HTMLTextAreaElement>document.getElementById("workflowtext")).value;
        if (this.isFlowchartView) {
            this.flowchartObj.drawingObject.openFlowchartView(flowtext, function (retcode) {
                contextObj.showOpenSlide = false;
            });
        }
        else {
            contextObj.openWorkFlow(flowtext);
        }
    }

    cancelOpenFlow(event: any) {
        this.showOpenSlide = false;
    }
    closeOpenSlideDialog(event: any) {
        this.showOpenSlide = false;
    }
    okUpdate(event: any) {
        var contextObj = this;
        var newtext = (<HTMLInputElement>document.getElementById("newtext")).value;
        this.flowchartObj.drawingObject.updateTextOnFlowchart(this.isActionPoint, this.currentId, newtext, function (retCode) {
            if (contextObj.isActionPoint) {
                var tempData = new Object;
                tempData = contextObj.mapActionPoints[contextObj.currentId];
                tempData["m_szText"] = newtext;
                contextObj.mapActionPoints[contextObj.currentId] = tempData;
            }
            else {
                var tempData = new Object;
                tempData = contextObj.mapOutcomes[contextObj.currentId];
                tempData["m_szText"] = newtext;
                contextObj.mapOutcomes[contextObj.currentId] = tempData;
            }


            contextObj.showUpdateSlide = false;
        });
    }

    cancelUpdate(event: any) {
        this.showUpdateSlide = false;
    }
    closeUpdateSlideDialog(event: any) {
        this.showUpdateSlide = false;
    }

    okIdsShowHide(event: any) {
        var contextObj = this;
        var idtext = (<HTMLInputElement>document.getElementById("idtext")).value;
        if (contextObj.itemtype == 0) {
            this.flowchartObj.drawingObject.showHideActionPointsInFlowchart(idtext, contextObj.showHideActionPoints, function (retcode) {
                contextObj.showHideActionPoints = !contextObj.showHideActionPoints;
                contextObj.showIdsSlide = false;
            });
        }
        else if (contextObj.itemtype == 1) {
            this.flowchartObj.drawingObject.showHideOutcomesInFlowchart(idtext, contextObj.showHideOutcomes, function (retcode) {
                contextObj.showHideOutcomes = !contextObj.showHideOutcomes;
                contextObj.showIdsSlide = false;
            });
        }
        else if (contextObj.itemtype == 2) {
            this.flowchartObj.drawingObject.showHideEndPointsInFlowchart(idtext, contextObj.showHideEndPoints, function (retcode) {
                contextObj.showHideEndPoints = !contextObj.showHideEndPoints;
                contextObj.showIdsSlide = false;
            });
        }
    }

    cancelIdsShowHide(event: any) {
        this.showIdsSlide = false;
    }
    closeIdsSlideDialog(event: any) {
        this.showIdsSlide = false;
    }

    okActionClick(event: any) {
        var contextObj = this;
        var ActionText = (<HTMLInputElement>document.getElementById("actionName")).value;
        var ActionNumber = (<HTMLInputElement>document.getElementById("actionNo")).value;
        contextObj.flowchartObj.drawingObject.createBoxTextOnFlowchart(this.currentBoxHandle, ActionText, contextObj.actionId, ActionNumber, function (retCode) {
            var tempData = new Object({
                m_szText: ActionText, m_szCoords: "", m_ActionNumber: ActionNumber
            });

            contextObj.mapActionPoints[contextObj.actionId] = tempData;
            ++contextObj.actionId;
            ++contextObj.actionNo;
        });    
        this.showActionSlide = false;
    }
    cancelActionClick(event: any) {
        var contextObj = this;
        contextObj.flowchartObj.drawingObject.cancelBox(this.currentBoxHandle, function (retCode) {
            contextObj.showActionSlide = false;
        });
        
    }
    closeActionSlideDialog(event: any) {
        this.showActionSlide = false;
    }
    okOutcomeClick(event: any) {
        var contextObj = this;  
        
        if (contextObj.toActionId == "") {
            var isTimeout = (<HTMLInputElement>document.getElementById("chktimeout")).checked;
            var isEndPoint = (<HTMLInputElement>document.getElementById("chkendpoint")).checked;
            var isActionPoint = (<HTMLInputElement>document.getElementById("chkactionpoint")).checked;
            if (isTimeout == true) {
                contextObj.flowchartObj.drawingObject.createNextAction(this.currentConnectorHandle, 3, "0", "", 0, function (retCode) {
                    if (retCode == 0)
                        contextObj.createConnectorText();
                    else
                        contextObj.cancelConnectorCreation();
                });
            }
            else {
                var Id = (<HTMLInputElement>document.getElementById("txtId")).value;
                var Actiontext = (<HTMLInputElement>document.getElementById("txtActPoint")).value;
                var ActionNo = (<HTMLInputElement>document.getElementById("outactionNo")).value;
                if (isEndPoint == true) {
                    contextObj.flowchartObj.drawingObject.createNextAction(this.currentConnectorHandle, 4, Id, Actiontext, ActionNo, function (retCode) {
                        if (retCode == 0) {
                            contextObj.toActionId = Id;
                            var tempData = new Object({ m_szText: Actiontext, m_szCoords: "" });
                            contextObj.mapEndPoints[Id] = tempData;

                            --contextObj.endId;
                            ++contextObj.endNo;
                            contextObj.createConnectorText();
                        }
                        else
                            contextObj.cancelConnectorCreation();
                    });
                }
                else if (isActionPoint == true) {
                    contextObj.flowchartObj.drawingObject.createNextAction(this.currentConnectorHandle, 1, Id, Actiontext, ActionNo, function (retCode) {
                        if (retCode == 0) {
                            contextObj.toActionId = Id;
                            var tempData = new Object({ m_szText: Actiontext, m_szCoords: "" });
                            contextObj.mapActionPoints[Id] = tempData;

                            ++contextObj.actionId;
                            ++contextObj.actionNo;
                            contextObj.createConnectorText();
                        }
                        else
                            contextObj.cancelConnectorCreation();
                    });
                }
                else
                    contextObj.cancelConnectorCreation();
            }
        }
        else
            contextObj.createConnectorText();
          
    }

    createConnectorText() {
        var contextObj = this;  
        var OutcomeText = (<HTMLInputElement>document.getElementById("outcome")).value;
        var connectorType = (<HTMLSelectElement>document.getElementById("actionType")).value;
        contextObj.flowchartObj.drawingObject.createConnectorTextOnFlowchart(this.currentConnectorHandle, OutcomeText, contextObj.outcomeId, connectorType, function (retCode) {
            var tempData = new Object({ m_szText: OutcomeText, m_szFromId: contextObj.fromActionId, m_szToId: contextObj.toActionId, m_nConnectorType: connectorType });
            contextObj.mapOutcomes[contextObj.outcomeId] = tempData;

            ++contextObj.outcomeId;
            ++contextObj.outcomeNo;
        });
        this.showOutcomeSlide = false;
    }

    cancelConnectorCreation() {
        var contextObj = this;
        contextObj.flowchartObj.drawingObject.cancelConnector(contextObj.currentConnectorHandle, function () {
            contextObj.showOutcomeSlide = false;
        });       
    }
    cancelOutcomeClick(event: any) {
        var contextObj = this;
        contextObj.flowchartObj.drawingObject.cancelConnector(this.currentConnectorHandle, function (retCode) {
            contextObj.showOutcomeSlide = false;
        });
    }
    closeOutcomeSlideDialog(event: any) {
        this.showOutcomeSlide = false;
    }
    chkActionClick(event: any) {
        (<HTMLInputElement>document.getElementById("txtId")).value = this.actionId.toString();
        (<HTMLInputElement>document.getElementById("txtActPoint")).value = "Action Pont" + this.actionNo.toString();
        (<HTMLInputElement>document.getElementById("outactionNo")).value = this.actionNo.toString();
    }
    chkEndClick(event: any) {
        (<HTMLInputElement>document.getElementById("txtId")).value = this.endId.toString();
        (<HTMLInputElement>document.getElementById("txtActPoint")).value = "End Pont" + this.endNo.toString();
        (<HTMLInputElement>document.getElementById("outactionNo")).value = "0";
    }

    openWorkFlow(XMLString: string)
    {
        this.mapActionPoints = {};
        this.mapOutcomes = {};
        this.mapEndPoints = {};

        this.actionId = 0;
        this.outcomeId = 0;
        this.endId = 0;
        var contextObj = this;
        contextObj.flowchartObj.drawingObject.setApplicationMode(3);
        var result = contextObj.flowchartObj.drawingObject.initiateWorkFlow(function (returnCode) {
            if (returnCode == 0) {
                var objXML = new XMLParser();
                objXML.loadXML(XMLString);

                var nReturn, nActionpointCount, nEndPointCount;
                nEndPointCount = objXML.getNodeCount("END_POINT");
                nActionpointCount = objXML.getNodeCount("ACTION_POINT");
                contextObj.flowchartObj.drawingObject.setBoxCount(nEndPointCount + nActionpointCount, function (retCode)
                {
                    var pNodeList = objXML.getNodeList("ACTION_POINT");
                    contextObj.createActionPoints(pNodeList, 0, function () {
                        var pNodeList = objXML.getNodeList("END_POINT");
                        contextObj.createEndPoints(pNodeList, 0, function () {
                            var pNodeList = objXML.getNodeList("OUTCOME");
                            contextObj.createOutcomes(pNodeList, 0, function () {
                                contextObj.flowchartObj.drawingObject.arrangeFlowchart(1, false, function (retcode) {
                                    contextObj.flowchartObj.drawingObject.zoomExtents(function (retCode)
                                    {
                                        contextObj.flowchartObj.drawingObject.display(function (retCode) {
                                            contextObj.flowchartObj.drawingObject.updateViewport(function (retCode) { });
                                        });
                                        contextObj.showOpenSlide = false;
                                    });
                                });
                            });
                        });
                    });                    
                });
            }
        });        
    }
    createActionPoints(pNodeList, i, resCallback) {
        var actionItems = [];
        while (i < pNodeList.length) {
            var tempData = new Object;

            var tempVal = pNodeList[i].getElementsByTagName("ID")[0];
            var szActionId = tempVal.childNodes[0].nodeValue;

            tempVal = pNodeList[i].getElementsByTagName("TEXT")[0];
            tempData["m_szText"] = tempVal.childNodes[0].nodeValue;

            var nActionNo;
            tempVal = pNodeList[i].getElementsByTagName("NUMBER")[0];
            if (tempVal)
                nActionNo = tempVal.childNodes[0].nodeValue;
            else
                nActionNo = ++this.actionNo;

            tempData["m_ActionNumber"] = nActionNo;

            actionItems.push([szActionId, tempData["m_szText"], nActionNo, ""]);

            this.mapActionPoints[szActionId] = tempData;

            var contextObj = this;
            // this.flowchartObj.drawingObject.createActionPoint(szActionId, tempData["m_szText"], nActionNo, "", function (retCode) {
            if (parseInt(szActionId) > contextObj.actionId)
                contextObj.actionId = parseInt(szActionId);
            i++;
            //      contextObj.createActionPoints(pNodeList, i, resCallback);
            //   });
        }
      
            this.flowchartObj.drawingObject.createActionPoints(actionItems, function (retCode) {
                resCallback();
            });
       
    }
    createEndPoints(pNodeList, i, resCallback) {
        var endItems = [];
        while (i < pNodeList.length) {
            var tempData = new Object;
            var tempVal = pNodeList[i].getElementsByTagName("ID")[0];
            var szEndId = tempVal.childNodes[0].nodeValue;
            if (i == 0)
                this.endId = szEndId;

            tempVal = pNodeList[i].getElementsByTagName("TEXT")[0];
            tempData["m_szText"] = tempVal.childNodes[0].nodeValue;

            this.mapEndPoints[szEndId] = tempData;

            endItems.push([szEndId, tempData["m_szText"], ""]);
            var contextObj = this;
          //  this.flowchartObj.drawingObject.createEndPoint(szEndId, tempData["m_szText"], "", function (retCode) {
                if (parseInt(szEndId) > contextObj.endId)
                    contextObj.endId = parseInt(szEndId);
                i++;
         //       contextObj.createEndPoints(pNodeList, i, resCallback);
         //   });
        }
        
            this.flowchartObj.drawingObject.createEndPoints(endItems, function (retCode) {
                resCallback();
            });
       
    }
    createOutcomes(pNodeList, i, resCallback) {
        var outcomeItems = [];
       while (i < pNodeList.length) {
            var tempData = new Object;

            var tempVal = pNodeList[i].getElementsByTagName("ID")[0];
            var szOutcomeId = tempVal.childNodes[0].nodeValue;

            tempVal = pNodeList[i].getElementsByTagName("TEXT")[0];
            tempData["m_szText"] = tempVal.childNodes[0].nodeValue;
            tempVal = pNodeList[i].getElementsByTagName("FROM_ID")[0];
            tempData["m_szFromId"] = tempVal.childNodes[0].nodeValue;

            if (pNodeList[i].getElementsByTagName("TO_ID")[0]) {
                tempVal = pNodeList[i].getElementsByTagName("TO_ID")[0];
                if (tempVal.childNodes[0])
                    tempData["m_szToId"] = tempVal.childNodes[0].nodeValue;
                else
                    tempData["m_szToId"] = "";
            }

            if (tempData["m_szToId"] == "")
                tempData["m_szType"] = "3";

            if (pNodeList[i].getElementsByTagName("CONNECTOR_TYPE")[0]) {
                tempVal = pNodeList[i].getElementsByTagName("CONNECTOR_TYPE")[0];
                tempData["m_nConnectorType"] = tempVal.childNodes[0].nodeValue;;
            }
            else
                tempData["m_nConnectorType"] = 3;//Full Move 

            if (pNodeList[i].getElementsByTagName("END_TYPE")[0]) {
                tempVal = pNodeList[i].getElementsByTagName("END_TYPE")[0];
                tempData["m_szType"] = tempVal.childNodes[0].nodeValue;;
            }
            else
                tempData["m_szType"] = "";

            if (pNodeList[i].getElementsByTagName("END_TEXT")[0]) {
                tempVal = pNodeList[i].getElementsByTagName("END_TEXT")[0];
                tempData["m_szEndText"] = tempVal.childNodes[0].nodeValue;;
            }
            else
                tempData["m_szEndText"] = "";

            this.mapOutcomes[szOutcomeId] = tempData;

            outcomeItems.push([szOutcomeId, tempData["m_szText"], tempData["m_szFromId"], tempData["m_szToId"], tempData["m_szType"], "", tempData["m_nConnectorType"], ""]);
            var contextObj = this;
            //this.flowchartObj.drawingObject.createOutcome(szOutcomeId, tempData["m_szText"], tempData["m_szFromId"], tempData["m_szToId"], tempData["m_szType"], "", tempData["m_nConnectorType"], "", function (retCode) {
                if (parseInt(szOutcomeId) > contextObj.outcomeId)
                    contextObj.outcomeId = parseInt(szOutcomeId);
                i++;
           //     contextObj.createOutcomes(pNodeList, i, resCallback);
          //  });
        }
        
            this.flowchartObj.drawingObject.createOutcomes(outcomeItems, function (retCode) {
                resCallback();
            });
       
    }

    updateOpenedView() {
        var contextObj = this;
        this.updateActionPoints(0, function ()
        {
            contextObj.updateEndPoints(contextObj.endId, function ()
            {
                contextObj.updateOutcomes(0, function () {
                    contextObj.flowchartObj.drawingObject.getAllIdsInFlowchart(function (retCode, ActionIds, OutComeIds, EndRectIds) {
                        if (retCode == 0) {
                            var szActionIds = ActionIds.split(";");   
                            var szEndRectIds = EndRectIds.split(";");
                            var szOutComeIds = OutComeIds.split(";");
                            contextObj.deleteActionPoints(szActionIds, 0, function () {
                                contextObj.deleteEndPoints(szEndRectIds, 0, function () {
                                    contextObj.deleteOutcomes(szOutComeIds, 0, function () {
                                        contextObj.flowchartObj.drawingObject.arrangeFlowchart(1, false, function (retcode) {
                                            contextObj.flowchartObj.drawingObject.zoomExtents(function (retCode) {                                                
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });  

                });
            });
        });      
    }

    deleteActionPoints(szActionIds,i, resCallback)
    {
        var contextObj = this;
        if (i < szActionIds.length) {
            if (szActionIds[i] != "") {
                var tempData = new Object;
                tempData = this.mapActionPoints[szActionIds[i]];
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
    }
    deleteEndPoints(szEndRectIds, i, resCallback) {
        var contextObj = this;
        if (i < szEndRectIds.length) {
            if (szEndRectIds[i] != "") {
                var tempData = new Object;
                tempData = this.mapEndPoints[szEndRectIds[i]];
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
    }
    deleteOutcomes(szOutComeIds, i, resCallback) {
        var contextObj = this;
        if (i < szOutComeIds.length) {
            if (szOutComeIds[i] != "") {
                var tempData = new Object;
                tempData = this.mapOutcomes[szOutComeIds[i]];
                if (!tempData) {
                    contextObj.flowchartObj.drawingObject.deleteOutcome(szOutComeIds[i], function (retCode) {

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
        else
            resCallback();
    }

    updateActionPoints(i, resCallback) {
        var contextObj = this;
        if (i <= this.actionId) {
            var tempData = new Object;
            tempData = this.mapActionPoints[i];
            if (tempData) {
                contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(1, i, function (returnCode, IsExists) {
                    if (returnCode == 0) {
                        if (!IsExists) {
                            contextObj.flowchartObj.drawingObject.createActionPoint(i, tempData["m_szText"], tempData["m_ActionNumber"], "", function (retCode) {
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
                i++;
                contextObj.updateActionPoints(i, resCallback);
            }
        }
        else
            resCallback();
    }
    updateEndPoints(i, resCallback) {
        var contextObj = this;
       // i <= this.endId
        if (i>=0) {
            var tempData = new Object;
            tempData = this.mapEndPoints[i];
            if (tempData) {
                contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(3, i, function (returnCode, IsExists) {
                    if (returnCode == 0) {
                        if (!IsExists) {
                            contextObj.flowchartObj.drawingObject.createEndPoint(i, tempData["m_szText"], "", function (retCode) {
                                i--;
                                contextObj.updateEndPoints(i, resCallback);
                            });
                        }
                        else {
                            i--;
                            contextObj.updateEndPoints(i, resCallback);
                        }
                    }
                });
            }
            else {
                i--;
                contextObj.updateEndPoints(i, resCallback);
            }
        }
        else
            resCallback();
    }
    updateOutcomes(i, resCallback) {
        var contextObj = this;
        if (i <= this.outcomeId) {
            var tempData = new Object;
            tempData = this.mapOutcomes[i];
            if (tempData) {
                contextObj.flowchartObj.drawingObject.isItemExistsOnFlowchart(2, i, function (returnCode, IsExists) {
                    if (returnCode == 0) {
                        if (!IsExists) {
                            contextObj.flowchartObj.drawingObject.createOutcome(i, tempData["m_szText"], tempData["m_szFromId"], tempData["m_szToId"], "", "", tempData["m_nConnectorType"], "",false, function (retCode) {
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
                i++;
                contextObj.updateOutcomes(i, resCallback);
            }
        }
        else
            resCallback();
    }

    okActionPointsClick(event: any) {
        var contextObj = this;
        var actionName = (<HTMLInputElement>document.getElementById("tstactionName")).value;
        var actionNo = (<HTMLInputElement>document.getElementById("tstactionNo")).value;
        ++contextObj.actionId;
        contextObj.actionNo = parseInt(actionNo);

        var tempData = new Object({
            m_szText: actionName, m_szCoords: "",m_ActionNumber:actionNo
        });
        contextObj.mapActionPoints[contextObj.actionId] = tempData;
        var optElement = new Option(actionName, contextObj.actionId.toString());
        var lstActions = (<HTMLSelectElement>document.getElementById("lstAP"));
        lstActions.add(optElement);
    }
    cancelActionPointsClick(event: any) {
        this.showActionPointsSlide = false;
    }
    closeActionPointsSlideDialog(event: any) {
        this.showActionPointsSlide = false;
    }
    remActionPointsClick(event: any) {
        var lstActions = (<HTMLSelectElement>document.getElementById("lstAP"));
        delete this.mapActionPoints[(<HTMLOptionElement>lstActions.children[lstActions.selectedIndex]).value];
        lstActions.remove(lstActions.selectedIndex);

    }
    loadActionPointsClick(event: any) {
        try {
            var lstActions = (<HTMLSelectElement>document.getElementById("lstAP"));
            lstActions.options.length = 0;
            for (var i = 0; i <= this.actionId; i++) {
                var tempData = new Object;
                tempData = this.mapActionPoints[i];
                if (tempData) {
                    var actionData =  tempData["m_szText"];
                    var optElement = new Option(actionData,i.toString());
                    lstActions.add(optElement);
                }
            }
        }
        catch (e)
        {
        }
    }
    closetstOutcomesSlideDialog(event: any) {
        this.showtstOutcomesSlide = false;
    }
    canceltstOutcomesClick(event: any) {
        this.showtstOutcomesSlide = false;
    }
    oktstOutcomesClick(event: any) {
        var outcomeText = (<HTMLInputElement>document.getElementById("tstoutcome")).value;
        var connectorType = (<HTMLSelectElement>document.getElementById("tstconnectorType")).value;
        var fromActionId = (<HTMLSelectElement>document.getElementById("cmbFrom")).value;
        var toActionId = (<HTMLSelectElement>document.getElementById("cmbTo")).value;
        ++this.outcomeId;
        ++this.outcomeNo;

        var tempData = new Object({ m_szText: outcomeText, m_szFromId: fromActionId, m_szToId: toActionId, m_nConnectorType: connectorType });
        this.mapOutcomes[this.outcomeId] = tempData;

        var optElement = new Option(outcomeText, this.outcomeId.toString());
        var lsOutcomes = (<HTMLSelectElement>document.getElementById("lstOut"));
        lsOutcomes.add(optElement);
    }
    remOutcomesClick(event: any) {
        var lstOutcomes = (<HTMLSelectElement>document.getElementById("lstOut"));
        delete this.mapOutcomes[(<HTMLOptionElement>lstOutcomes.children[lstOutcomes.selectedIndex]).value];
        lstOutcomes.remove(lstOutcomes.selectedIndex);

    }
    loadOutcomesClick(event: any) {        
        try {
            var lstOutcomes = (<HTMLSelectElement>document.getElementById("lstOut"));
            lstOutcomes.options.length = 0;
            for (var i = 0; i <= this.outcomeId; i++) {
                var tempData = new Object;
                tempData = this.mapOutcomes[i];
                if (tempData) {
                    var outcomeData = tempData["m_szText"];
                    var optElement = new Option(outcomeData, i.toString());
                    lstOutcomes.add(optElement);
                }
            }

            var cmbFrom = (<HTMLSelectElement>document.getElementById("cmbFrom"));
            var cmbTo = (<HTMLSelectElement>document.getElementById("cmbTo"));
            cmbFrom.options.length = 0;
            cmbTo.options.length = 0;
            for (var i = 0; i <= this.actionId; i++) {
                var tempData = new Object;
                tempData = this.mapActionPoints[i];
                if (tempData) {
                    var optElement = new Option(i.toString());
                    cmbFrom.add(optElement);
                    var optElement1 = new Option(i.toString());
                    cmbTo.add(optElement1);
                }
            }
        }
        catch (e) {
        }
    }
}
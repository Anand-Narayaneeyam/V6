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
var asbuilt_service_1 = require('../../../Models/Asbuilts/asbuilt.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var General_1 = require('../../../Models/Common/General');
require("../../../../Scripts/Drawing/iWhizApiHandler.js");
require('../../../../Scripts/WexBimDrawing/WexBim/wexBimConveter.js');
var DrawingAddEditComponent = (function () {
    function DrawingAddEditComponent(cdr, asbuiltService, notificationService, getData, administrationService) {
        this.asbuiltService = asbuiltService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.administrationService = administrationService;
        this.btnName = "Upload";
        this.dataKey = "DrawingId";
        this.rowDelimiter = "¢";
        this.columnDelimeter = "µ";
        this.submitSuccess = new core_1.EventEmitter();
        this.siteTabIndex = 999;
        this.buildingTabIndex = 0;
        this.floorTabIndex = 1;
        this.buildingDrawingAddFormId = 52;
        this.floorDrawingAddFormId = 65;
        this.buildingDrawinglistFormId = 47;
        this.floorDrawingListFormId = 48;
        this.buildingDrawingEditFormId = 80;
        this.floorDrawingEditFormId = 68;
        this.buildingDrawingReviseFormId = 92;
        this.floorDrawingEditReviseFormId = 94;
        this.buildingDrawingReplaceFormId = 93;
        this.floorDrawingEditReplaceFormId = 95;
        this.partialFloorWing = false;
        this.objiWhizXref = new iWhizAPI();
        this.wexBimConveterXef = new wexBimConveter();
        this.drawingLabel = "Drawing";
        this.getCusSubscribedFeatures();
    }
    DrawingAddEditComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.addEdit = contextObj.action;
        if (contextObj.addEdit == "add")
            contextObj.btnName = "Upload";
        else if (contextObj.addEdit == "edit")
            contextObj.btnName = "Save Changes";
        else if (contextObj.addEdit == "replace")
            contextObj.btnName = "Upload";
        else if (contextObj.addEdit == "revise")
            contextObj.btnName = "Upload";
        contextObj.checkSubscribedFeatures();
        // 
    };
    DrawingAddEditComponent.prototype.checkSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.administrationService.checkSubscribedFeature('276').subscribe(function (result) {
            debugger;
            if (result["Data"][0]["IsSubscribed"] == true) {
                contextObj.drawingLabel = result["Data"][0].Value;
            }
        });
    };
    DrawingAddEditComponent.prototype.onfileChange = function (event) {
        debugger;
    };
    DrawingAddEditComponent.prototype.onSubmitData = function (event) {
        debugger;
        var contextObj = this;
        if (contextObj.addEdit == "add") {
            if (event["filedata"]) {
                var file = "";
                var fileobject = JSON.parse(event["filedata"]);
                if (fileobject) {
                    file = fileobject.FileName;
                    if (file.substr(file.lastIndexOf('.') + 1).toUpperCase() != "DWG" && file.substr(file.lastIndexOf('.') + 1).toUpperCase() != "IFC" && file.substr(file.lastIndexOf('.') + 1).toUpperCase() != "RVT") {
                        contextObj.notificationService.ShowToaster("Select a DWG File (.dwg)", 5);
                        return false;
                    }
                }
            }
            switch (contextObj.drawingType) {
                case contextObj.buildingTabIndex:
                    contextObj.asbuiltService.postInsertBuildingDrawingAddwithFile(contextObj.buildingDrawingAddFormId, JSON.stringify(contextObj.addFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.buildingDrawinglistFormId).subscribe(function (resultData) {
                        contextObj.success = resultData["Data"];
                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        }
                        else if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing uploaded", 3);
                            debugger;
                            var temp = JSON.parse(resultData.Data.Data);
                            //var fieldobj = new Array<wexbimData>();
                            //fieldobj.push({
                            //    drawingId: temp[0].DrawingId,
                            //    fileName: temp[0]["DWG File"],
                            //    revisionNo: temp[0]["Revision No."]
                            //});
                            contextObj.administrationService.getSessionData().subscribe(function (data) {
                                var retData = data["Data"];
                                contextObj.wexBimConveterXef.convertToWexBim(temp[0].DrawingId, temp[0]["DWG File"], temp[0]["Revision No."], retData["CustomerName"], function (result) {
                                    debugger;
                                });
                            });
                            contextObj.checkXref(resultData, function () {
                                contextObj.submitSuccess.emit({ status: "success", returnDataBuilding: contextObj.success, isUpdate: false });
                            });
                        }
                        else if (contextObj.success["StatusId"] == 0)
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (contextObj.success["StatusId"] == 3) {
                            if (contextObj.success["ServerId"] == -1) {
                                contextObj.notificationService.ShowToaster("Drawing already exists. Use Revise option to add a revision", 5);
                            }
                        }
                    });
                    break;
                case contextObj.floorTabIndex:
                    contextObj.asbuiltService.postInsertFloorDrawingAddwithFile(contextObj.floorDrawingAddFormId, JSON.stringify(contextObj.addFloorFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = resultData["Data"];
                        if (contextObj.success.Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        }
                        else if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing uploaded", 3);
                            contextObj.checkXref(resultData, function () {
                                contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success, isUpdate: false });
                            });
                        }
                        else if (contextObj.success["StatusId"] == 0)
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (contextObj.success["StatusId"] == 3) {
                            if (contextObj.success["ServerId"] == -1) {
                                contextObj.notificationService.ShowToaster("Drawing already exists. Use Revise option to add a revision", 5);
                            }
                        }
                    });
                    // }
                    break;
            }
        }
        else if (contextObj.addEdit == "edit") {
            ////debugger
            switch (contextObj.drawingType) {
                case contextObj.buildingTabIndex:
                    var test = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.fieldDetailsAddEdit);
                    contextObj.asbuiltService.postDrawingEdit(contextObj.buildingDrawingEditFormId, event["fieldobject"], contextObj.selectedId[0], contextObj.buildingDrawinglistFormId).subscribe(function (resultData) {
                        //  if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = (resultData["Data"]);
                        if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing description updated", 3);
                            contextObj.submitSuccess.emit({ status: "success", returnDataBuilding: contextObj.success, isUpdate: false });
                        }
                        else if (contextObj.success["StatusId"] == 0)
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (contextObj.success["StatusId"] == 3) {
                            if (contextObj.success["ServerId"] == -1) {
                                contextObj.notificationService.ShowToaster("Title already exists", 5);
                            }
                        }
                        // }
                    });
                    break;
                case contextObj.floorTabIndex:
                    var test1 = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.fieldDetailsAddEdit);
                    contextObj.asbuiltService.postDrawingEdit(contextObj.floorDrawingEditFormId, JSON.stringify(contextObj.editFloorFileDetails(event["fieldobject"])), contextObj.selectedId[0], contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = (resultData["Data"]);
                        if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing description updated", 3);
                            contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success, isUpdate: false });
                        }
                        else if (contextObj.success["StatusId"] == 0)
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (contextObj.success["StatusId"] == 3) {
                            if (contextObj.success["ServerId"] == -1) {
                                //contextObj.notificationService.ShowToaster("Site Name already exist", 5);
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        }
                        //  }
                    });
                    break;
            }
        }
        else if (contextObj.addEdit == "revise") {
            //debugger
            if (event["filedata"]) {
                var file = "";
                var fileobject = JSON.parse(event["filedata"]);
                if (fileobject) {
                    file = fileobject.FileName;
                    if (file.substr(file.lastIndexOf('.') + 1).toUpperCase() != "DWG") {
                        contextObj.notificationService.ShowToaster("Select a DWG File (.dwg)", 5);
                        return false;
                    }
                }
            }
            switch (contextObj.drawingType) {
                case contextObj.buildingTabIndex:
                    var test2 = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.fieldDetailsAddEdit);
                    contextObj.asbuiltService.postReviseDrawingAddwithFile(contextObj.buildingDrawingReviseFormId, JSON.stringify(contextObj.reviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.buildingDrawinglistFormId, true, contextObj.selectedId[0]).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        // debugger
                        contextObj.success = (resultData["Data"]);
                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        }
                        else if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing revised", 3);
                            contextObj.submitSuccess.emit({ status: "success", returnDataBuilding: contextObj.success, isUpdate: true, isRevised: true });
                        }
                        else if (contextObj.success["StatusId"] == 0)
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (contextObj.success["StatusId"] == 3) {
                            if (contextObj.success["ServerId"] == -1) {
                                //contextObj.notificationService.ShowToaster("Site Name already exist", 5);
                                contextObj.notificationService.ShowToaster("Drawing already exists", 5);
                            }
                        }
                        //  }
                    });
                    break;
                case contextObj.floorTabIndex:
                    //////debugger
                    var test = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.fieldDetailsAddEdit);
                    contextObj.asbuiltService.postReviseDrawingAddwithFile(contextObj.floorDrawingEditReviseFormId, JSON.stringify(contextObj.floorreviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.floorDrawingListFormId, false, contextObj.selectedId[0]).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = (resultData["Data"]);
                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        }
                        else if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing revised", 3);
                            contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success, isUpdate: true, isRevised: true });
                        }
                        else if (contextObj.success["StatusId"] == 0)
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (contextObj.success["StatusId"] == 3) {
                            if (contextObj.success["ServerId"] == -1) {
                                //contextObj.notificationService.ShowToaster("Site Name already exist", 5);
                                contextObj.notificationService.ShowToaster("Drawing already exists", 5);
                            }
                        }
                        //   }
                    });
                    break;
            }
        }
        else if (this.addEdit == "replace") {
            debugger;
            if (event["filedata"]) {
                var file = "";
                var fileobject = JSON.parse(event["filedata"]);
                if (fileobject) {
                    file = fileobject.FileName;
                    if (file.substr(file.lastIndexOf('.') + 1).toUpperCase() != "DWG") {
                        contextObj.notificationService.ShowToaster("Select a DWG File (.dwg)", 5);
                        return false;
                    }
                }
            }
            switch (this.drawingType) {
                case this.buildingTabIndex:
                    //if (this.markups > 0) {
                    //    contextObj.notificationService.ShowToaster("While replacing drawing, the existing markups will be deleted.Do you want to continue?"", 5);
                    //}
                    //else {
                    var test4 = contextObj.getData.getFieldValuesAsReportFieldArray(this.fieldDetailsAddEdit);
                    this.replaceFileDetails(event["fieldobject"], event["filedata"]);
                    //  contextObj.asbuiltService.postDrawingAddwithFile(contextObj.buildingDrawingReplaceFormId, event["fieldobject"], contextObj.selectedId, contextObj.buildingDrawinglistFormId).subscribe(function (resultData) {
                    contextObj.asbuiltService.postReplaceDrawingAddwithFile(contextObj.buildingDrawingReplaceFormId, JSON.stringify(contextObj.reviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.buildingDrawinglistFormId, true, contextObj.selectedId[0]).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = (resultData["Data"]);
                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        }
                        else if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing replaced", 3);
                            contextObj.checkXref(resultData, function () {
                                contextObj.submitSuccess.emit({ status: "success", returnDataBuilding: contextObj.success, isUpdate: true });
                            });
                        }
                        else if (contextObj.success["StatusId"] == 0)
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (contextObj.success["StatusId"] == 3) {
                            if (contextObj.success["ServerId"] == -1) {
                                //contextObj.notificationService.ShowToaster("Site Name already exist", 5);
                                contextObj.notificationService.ShowToaster("Drawing already exists", 5);
                            }
                        }
                        // }
                    });
                    //}
                    break;
                case this.floorTabIndex:
                    var test5 = contextObj.getData.getFieldValuesAsReportFieldArray(this.fieldDetailsAddEdit);
                    this.replaceFileDetails(event["fieldobject"], event["filedata"]);
                    //  contextObj.asbuiltService.postDrawingAddwithFile(contextObj.buildingDrawingReplaceFormId, event["fieldobject"], contextObj.selectedId, contextObj.buildingDrawinglistFormId).subscribe(function (resultData) {
                    contextObj.asbuiltService.postReplaceDrawingAddwithFile(contextObj.floorDrawingEditReplaceFormId, JSON.stringify(contextObj.floorreviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.floorDrawingListFormId, false, contextObj.selectedId[0]).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = (resultData["Data"]);
                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        }
                        else if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing replaced", 3);
                            contextObj.checkXref(resultData, function () {
                                contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success, isUpdate: true });
                            });
                        }
                        else if (contextObj.success["StatusId"] == 0)
                            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        else if (contextObj.success["StatusId"] == 3) {
                            if (contextObj.success["ServerId"] == -1) {
                                //contextObj.notificationService.ShowToaster("Site Name already exist", 5);
                                contextObj.notificationService.ShowToaster("Drawing already exists", 5);
                            }
                        }
                        //  }
                    });
                    break;
            }
        }
        this.submitSuccess.emit("success");
    };
    DrawingAddEditComponent.prototype.ngOnChanges = function (changes) {
        var contextobj = this;
        if (changes["action"] && changes["action"]["currentValue"] == "add" && changes["action"]["currentValue"] != undefined) {
            //////debugger
            contextobj.btnName = "Upload";
            switch (contextobj.drawingType) {
                case contextobj.buildingTabIndex:
                    contextobj.asbuiltService.getAddDrawingFieldDetails(contextobj.buildingDrawingAddFormId).subscribe(function (resultData) {
                        // debugger
                        //   if (contextobj.getData.checkForUnhandledErrors(resultData)) {
                        resultData["Data"] = contextobj.setBuildingFieldDetails(resultData["Data"]);
                        contextobj.fieldDetailsAddEdit = resultData["Data"];
                        contextobj.dataKey = contextobj.fieldDetailsAddEdit[0].FieldLabel;
                        //    }
                    });
                    break;
                case contextobj.floorTabIndex:
                    this.asbuiltService.getAddDrawingFieldDetails(contextobj.floorDrawingAddFormId).subscribe(function (resultData) {
                        // if (contextobj.getData.checkForUnhandledErrors(resultData)) {
                        resultData["Data"] = contextobj.setFloorFieldDetails(resultData["Data"]);
                        contextobj.fieldDetailsAddEdit = resultData["Data"];
                        contextobj.dataKey = contextobj.fieldDetailsAddEdit[0].FieldLabel;
                        // }
                    });
                    break;
            }
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "edit" && changes["action"]["currentValue"] != undefined) {
            ////debugger
            contextobj.btnName = "Save Changes";
            switch (contextobj.drawingType) {
                case contextobj.buildingTabIndex:
                    contextobj.asbuiltService.getEditDrawingFieldDetails(contextobj.buildingDrawingEditFormId, contextobj.selectedId[0], contextobj.buildingDrawinglistFormId).subscribe(function (resultData) {
                        // if (contextobj.getData.checkForUnhandledErrors(resultData)) {
                        resultData["Data"] = contextobj.setBuildingFieldDetails(resultData["Data"]);
                        contextobj.fieldDetailsAddEdit = resultData["Data"];
                        contextobj.dataKey = contextobj.fieldDetailsAddEdit[0].FieldLabel;
                        //  }
                    });
                    break;
                case contextobj.floorTabIndex:
                    contextobj.asbuiltService.getEditDrawingFieldDetails(contextobj.floorDrawingEditFormId, contextobj.selectedId[0], contextobj.floorDrawingListFormId).subscribe(function (resultData) {
                        // if (contextobj.getData.checkForUnhandledErrors(resultData)) {
                        resultData["Data"] = contextobj.setFloorFieldDetails(resultData["Data"]);
                        contextobj.fieldDetailsAddEdit = resultData["Data"];
                        contextobj.dataKey = contextobj.fieldDetailsAddEdit[0].FieldLabel;
                        //   }
                    });
                    break;
            }
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "revise" && changes["action"]["currentValue"] != undefined) {
            contextobj.btnName = "Upload";
            switch (contextobj.drawingType) {
                case contextobj.buildingTabIndex:
                    contextobj.asbuiltService.getEditDrawingFieldDetails(contextobj.buildingDrawingReviseFormId, contextobj.selectedId[0], contextobj.buildingDrawinglistFormId).subscribe(function (resultData) {
                        //if (contextobj.getData.checkForUnhandledErrors(resultData)) {
                        resultData["Data"] = contextobj.setBuildingFieldDetails(resultData["Data"]);
                        contextobj.fieldDetailsAddEdit = resultData["Data"];
                        contextobj.dataKey = contextobj.fieldDetailsAddEdit[0].FieldLabel;
                        //  }
                    });
                    break;
                case contextobj.floorTabIndex:
                    contextobj.asbuiltService.getEditDrawingFieldDetails(contextobj.floorDrawingEditReviseFormId, contextobj.selectedId[0], contextobj.floorDrawingListFormId).subscribe(function (resultData) {
                        //if (contextobj.getData.checkForUnhandledErrors(resultData)) {
                        resultData["Data"] = contextobj.setFloorFieldDetails(resultData["Data"]);
                        contextobj.fieldDetailsAddEdit = resultData["Data"];
                        contextobj.dataKey = contextobj.fieldDetailsAddEdit[0].FieldLabel;
                        //  }
                    });
                    break;
            }
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "replace" && changes["action"]["currentValue"] != undefined) {
            contextobj.btnName = "Upload";
            switch (contextobj.drawingType) {
                case contextobj.buildingTabIndex:
                    contextobj.asbuiltService.getEditDrawingFieldDetails(contextobj.buildingDrawingReplaceFormId, contextobj.selectedId[0], contextobj.buildingDrawinglistFormId).subscribe(function (resultData) {
                        if (contextobj.getData.checkForUnhandledErrors(resultData)) {
                            resultData["Data"] = contextobj.setBuildingFieldDetails(resultData["Data"]);
                            contextobj.fieldDetailsAddEdit = resultData["Data"];
                            contextobj.dataKey = contextobj.fieldDetailsAddEdit[0].FieldLabel;
                        }
                    });
                    break;
                case contextobj.floorTabIndex:
                    contextobj.asbuiltService.getEditDrawingFieldDetails(contextobj.floorDrawingEditReplaceFormId, contextobj.selectedId[0], contextobj.floorDrawingListFormId).subscribe(function (resultData) {
                        if (contextobj.getData.checkForUnhandledErrors(resultData)) {
                            resultData["Data"] = contextobj.setFloorFieldDetails(resultData["Data"]);
                            contextobj.fieldDetailsAddEdit = resultData["Data"];
                            contextobj.dataKey = contextobj.fieldDetailsAddEdit[0].FieldLabel;
                        }
                    });
                    break;
            }
        }
    };
    DrawingAddEditComponent.prototype.getCusSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.administrationService.getCustomerSubscribedFeatures("26").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 26:
                        contextObj.partialFloorWing = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
    };
    DrawingAddEditComponent.prototype.checkXref = function (resultData, resCallback) {
        var contextObj = this;
        if (resultData.Data.Data != "") {
            var drawingId = JSON.parse(resultData.Data.Data)[0].DrawingId;
            var revisionNumber = JSON.parse(resultData.Data.Data)[0]["Revision No."];
            var drawingType = JSON.parse(resultData.Data.Data)[0].DrawingTypeId;
            var floorid = JSON.parse(resultData.Data.Data)[0].FloorID;
            this.objiWhizXref.openDrawingwithoutRender(drawingId, revisionNumber, drawingType, function (returnCode) {
                if (returnCode == 0 || returnCode == 74) {
                    contextObj.objiWhizXref.setDelimiter(contextObj.rowDelimiter, contextObj.columnDelimeter, function (returnCode) {
                        if (returnCode == 0) {
                            contextObj.objiWhizXref.getAllXrefs(function (returnCode, xreffiles) {
                                /*procedure Call*/
                                contextObj.administrationService.getStatusofXref(floorid, drawingId, revisionNumber, xreffiles).subscribe(function (resultData) {
                                    var XrefStatus = JSON.parse(resultData.FieldBinderData)[0].ReturnStatus;
                                    var XrefsExists = JSON.parse(resultData.FieldBinderData)[0].XrefsExists;
                                    var XrefsNotExists = JSON.parse(resultData.FieldBinderData)[0].XrefsNotExists;
                                    var strmsg = "";
                                    if (XrefStatus == -2) {
                                        strmsg = "Multiple drawing with same file name for this floor exist";
                                    }
                                    else {
                                        if ((XrefsExists.length > 0) || (XrefsNotExists.length > 0)) {
                                            if (XrefsExists.length > 0) {
                                                strmsg = XrefsExists + " that exist in iDrawings";
                                            }
                                            if (XrefsNotExists.length > 0) {
                                                if (strmsg.length > 0) {
                                                    strmsg = strmsg + ", ";
                                                }
                                                strmsg = XrefsNotExists + " that do not exist in iDrawings";
                                            }
                                            strmsg = "The drawing you have selected is associated with the following file " + strmsg;
                                        }
                                    }
                                    if (strmsg.length > 0) {
                                        contextObj.notificationService.ShowToaster(strmsg, 2, null, 8000);
                                    }
                                });
                                contextObj.objiWhizXref.close(function (retCode) {
                                    resCallback();
                                });
                            });
                        }
                        else
                            contextObj.objiWhizXref.close(function (retCode) {
                                resCallback();
                            });
                    });
                }
                else
                    contextObj.objiWhizXref.close(function (retCode) {
                        resCallback();
                    });
            });
        }
        else {
            resCallback(resultData.Data);
        }
    };
    //private getCusSubscribedFeatures = function (resCallback) {
    //    var contextObj = this;
    //    contextObj.partialFloorWing = false;
    //    contextObj.administrationService.getCustomerSubscribedFeatures("26").subscribe(function (rt) {
    //       // if (contextObj.generalFunctions.checkForUnhandledErrors(rt)) {
    //            var customerFeatureobj = rt["Data"];
    //            for (let i = 0; i < customerFeatureobj.length; i++) {
    //                switch (customerFeatureobj[i]["Id"]) {
    //                    case 26:
    //                        contextObj.partialFloorWing = customerFeatureobj[i]["IsSubscribed"];
    //                        break;
    //                }
    //            }
    //            resCallback();
    //       // }
    //    });
    //}
    DrawingAddEditComponent.prototype.addFileDetails = function (fieldobject, filedata) {
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 4378) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                }
                if (jsonobject[i]["ReportFieldId"] == 4379) {
                    jsonobject[i]["Value"] = fileobject.FileSize.toString();
                }
                if (jsonobject[i]["ReportFieldId"] == 4306) {
                    jsonobject[i]["Value"] = 0;
                }
            }
        }
        return jsonobject;
    };
    DrawingAddEditComponent.prototype.editFloorFileDetails = function (fieldobject) {
        //////debugger
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 511) {
                    jsonobjectnew.push(jsonobject[i]);
                }
                if (jsonobject[i]["ReportFieldId"] == 516) {
                    jsonobjectnew.push(jsonobject[i]);
                }
            }
        }
        return jsonobjectnew;
    };
    DrawingAddEditComponent.prototype.setBuildingFieldDetails = function (jsonobject) {
        //////debugger
        var contextObj = this;
        if (jsonobject) {
            switch (contextObj.action) {
                case "add":
                    for (var i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 4379) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                        }
                    }
                    break;
                case "edit":
                    for (var i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 489
                            || jsonobject[i]["ReportFieldId"] == 473
                            || jsonobject[i]["ReportFieldId"] == 4304
                            || jsonobject[i]["ReportFieldId"] == 474 || jsonobject[i]["ReportFieldId"] == 4378 || jsonobject[i]["ReportFieldId"] == 4377) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["IsMandatory"] = false;
                        }
                    }
                    break;
                case "revise":
                    for (var i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 4379) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                            jsonobject[i]["FieldValue"] = "";
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 4378) {
                            jsonobject[i]["FieldValue"] = "";
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 489
                            || jsonobject[i]["ReportFieldId"] == 473
                            || jsonobject[i]["ReportFieldId"] == 4304
                            || jsonobject[i]["ReportFieldId"] == 474
                            || jsonobject[i]["ReportFieldId"] == 4760) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["IsMandatory"] = false;
                        }
                    }
                    break;
                case "replace":
                    for (var i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 4379) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 4378) {
                            jsonobject[i]["FieldValue"] = "";
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 4377) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = true;
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["IsMandatory"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 489
                            || jsonobject[i]["ReportFieldId"] == 473
                            || jsonobject[i]["ReportFieldId"] == 4304
                            || jsonobject[i]["ReportFieldId"] == 474
                            || jsonobject[i]["ReportFieldId"] == 4760) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["IsMandatory"] = false;
                        }
                    }
                    break;
            }
            return jsonobject;
        }
    };
    DrawingAddEditComponent.prototype.setFloorFieldDetails = function (jsonobject) {
        var contextObj = this;
        // var t=  contextObj.partialFloorWing;
        if (jsonobject) {
            switch (contextObj.action) {
                case "add":
                    for (var i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 513) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 527) {
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["FieldValue"] = "Complete " + contextObj.drawingLabel;
                            jsonobject[i]["IsMandatory"] = false;
                            if (contextObj.partialFloorWing == false)
                                jsonobject[i]["IsVisible"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 526) {
                            if (contextObj.partialFloorWing == false)
                                jsonobject[i]["IsVisible"] = false;
                        }
                    }
                    break;
                case "edit":
                    //debugger
                    for (var i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 489
                            || jsonobject[i]["ReportFieldId"] == 473
                            || jsonobject[i]["ReportFieldId"] == 523
                            || jsonobject[i]["ReportFieldId"] == 524
                            || jsonobject[i]["ReportFieldId"] == 525 || jsonobject[i]["ReportFieldId"] == 511) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["IsMandatory"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 512) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["IsMandatory"] = false;
                            jsonobject[i]["DataEntryControlId"] = "1";
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 513) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 526 || jsonobject[i]["ReportFieldId"] == 527) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsMandatory"] = false;
                            jsonobject[i]["IsVisible"] = false;
                        }
                    }
                    break;
                case "revise":
                case "replace":
                    //////debugger
                    for (var i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 513) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 512) {
                            jsonobject[i]["FieldValue"] = "";
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 522) {
                            jsonobject[i]["FieldValue"] = contextObj.selectedId[0].toString();
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 489
                            || jsonobject[i]["ReportFieldId"] == 473
                            || jsonobject[i]["ReportFieldId"] == 523
                            || jsonobject[i]["ReportFieldId"] == 527
                            || jsonobject[i]["ReportFieldId"] == 524
                            || jsonobject[i]["ReportFieldId"] == 525 || jsonobject[i]["ReportFieldId"] == 511) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["IsMandatory"] = false;
                        }
                        //else if (jsonobject[i]["ReportFieldId"] == 511) {
                        //    //   jsonobject[i]["IsVisible"] = false;
                        //}
                        if (jsonobject[i]["ReportFieldId"] == 526 || jsonobject[i]["ReportFieldId"] == 527) {
                            if (contextObj.action == "replace") {
                                jsonobject[i]["IsVisible"] = false;
                            }
                            else {
                                if (jsonobject[i]["ReportFieldId"] == 526) {
                                    if (contextObj.partialFloorWing == false) {
                                        jsonobject[i]["IsVisible"] = false;
                                    }
                                    else {
                                        jsonobject[i]["Value"] = jsonobject[i]["Value"] == "1" ? "true" : "false";
                                        jsonobject[i]["IsEnabled"] = false;
                                        jsonobject[i]["ReadOnlyMode"] = true;
                                        jsonobject[i]["IsMandatory"] = false;
                                    }
                                }
                                if (jsonobject[i]["ReportFieldId"] == 527) {
                                    if (contextObj.partialFloorWing == false)
                                        jsonobject[i]["IsVisible"] = false;
                                }
                            }
                        }
                    }
                    break;
            }
        }
        return jsonobject;
    };
    DrawingAddEditComponent.prototype.addFloorFileDetails = function (fieldobject, filedata) {
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 512) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 513) {
                    jsonobject[i]["Value"] = fileobject.FileSize.toString();
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 526) {
                    jsonobject[i]["Value"] = jsonobject[i]["Value"] == "1" ? "true" : "false";
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 523 || jsonobject[i]["ReportFieldId"] == 524 || jsonobject[i]["ReportFieldId"] == 525 || jsonobject[i]["ReportFieldId"] == 516 || jsonobject[i]["ReportFieldId"] == 527) {
                    jsonobjectnew.push(jsonobject[i]);
                }
            }
        }
        return jsonobjectnew;
    };
    DrawingAddEditComponent.prototype.reviseFileDetails = function (fieldobject, filedata) {
        //////debugger
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 4378) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 4379) {
                    jsonobject[i]["Value"] = fileobject.FileSize.toString();
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 4376) {
                    jsonobject[i]["Value"] = this.selectedId[0];
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 473) {
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 4382) {
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 4377) {
                    // jsonobject[i]["Value"] = 0;
                    jsonobjectnew.push(jsonobject[i]);
                }
            }
        }
        return jsonobjectnew;
    };
    DrawingAddEditComponent.prototype.floorreviseFileDetails = function (fieldobject, filedata) {
        //////debugger
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 512) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 513) {
                    jsonobject[i]["Value"] = fileobject.FileSize.toString();
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 511) {
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 523) {
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 516) {
                    jsonobjectnew.push(jsonobject[i]);
                }
            }
        }
        return jsonobjectnew;
    };
    DrawingAddEditComponent.prototype.floorReplaceFileDetails = function (fieldobject, filedata) {
        //////debugger
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 512) {
                    jsonobject[i]["Value"] = fileobject.FileName;
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 513) {
                    jsonobject[i]["Value"] = fileobject.FileSize.toString();
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 523) {
                    jsonobjectnew.push(jsonobject[i]);
                }
                else if (jsonobject[i]["ReportFieldId"] == 516) {
                    jsonobjectnew.push(jsonobject[i]);
                }
            }
        }
        return jsonobjectnew;
    };
    DrawingAddEditComponent.prototype.replaceFileDetails = function (fieldobject, filedata) {
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 4378) {
                    this.replacefile = fileobject.FileName;
                }
                else if (jsonobject[i]["ReportFieldId"] == 4379) {
                    this.replacesize = fileobject.FileSize.toString();
                }
                else if (jsonobject[i]["ReportFieldId"] == 473) {
                    this.replacebuilding = jsonobject[i]["Value"].toString();
                }
                else if (jsonobject[i]["ReportFieldId"] == 4382) {
                    this.replacedesc = jsonobject[i]["Value"].toString();
                }
                if (jsonobject[i]["ReportFieldId"] == 4306) {
                    this.replacerevision = jsonobject[i]["Value"].toString();
                }
            }
        }
        //  return jsonobjectnew;
    };
    DrawingAddEditComponent.prototype.fieldChange = function (event) {
        //debugger
        var parentSelectedValue = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        // var siteFieldId = this.drawingType == this.buildingTabIndex ? 204:287;
        var formId = this.drawingType == this.buildingTabIndex ? this.buildingDrawingAddFormId : this.floorDrawingAddFormId;
        //var SiteReportFieldId = 1852;
        var result;
        //site - 204,221
        //building -203,222
        //floor-223
        var contextObj = this;
        if (parentSelectedValue > 0) {
            if (parentFieldId == 204 || parentFieldId == 221) {
                contextObj.sitechangeValue = parentSelectedValue;
                contextObj.asbuiltService.loadState(formId, parentSelectedValue, parentFieldId).subscribe(function (resultData) {
                    //  if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 203 || contextObj.fieldDetailsAddEdit[i]["FieldId"] == 222) {
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                            }
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 203 || contextObj.fieldDetailsAddEdit[i]["FieldId"] == 222) {
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                                break;
                            }
                            if (this.drawingType == contextObj.floorTabIndex) {
                                for (var i_1 = 0; i_1 < contextObj.fieldDetailsAddEdit.length; i_1++) {
                                    if (contextObj.fieldDetailsAddEdit[i_1]["FieldId"] == 223) {
                                        contextObj.fieldDetailsAddEdit[i_1]["LookupDetails"]["LookupValues"] = null;
                                        contextObj.fieldDetailsAddEdit[i_1]["FieldValue"] = "-1";
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    // }
                });
            }
            if (parentFieldId == 222) {
                this.buildingchangeValue = parentSelectedValue;
                this.asbuiltService.loadState(formId, parentSelectedValue, parentFieldId).subscribe(function (resultData) {
                    // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                break;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                                break;
                            }
                        }
                    }
                    //  }
                });
            }
        }
        else {
            if (parentFieldId == 204 || parentFieldId == 221) {
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 203 || contextObj.fieldDetailsAddEdit[i]["FieldId"] == 222) {
                        contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                        break;
                    }
                }
            }
            if (parentFieldId == 203 || parentFieldId == 222) {
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {
                        contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                    }
                }
            }
        }
    };
    DrawingAddEditComponent.prototype.onChkChange = function (value) {
        var contextObj = this;
        if (!value.chkBoxObject.IsChecked)
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                if (contextObj.fieldDetailsAddEdit[i].ReportFieldId == 527) {
                    contextObj.fieldDetailsAddEdit[i].FieldValue = "Complete " + contextObj.drawingLabel;
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = false;
                    break;
                }
            }
        else {
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                if (contextObj.fieldDetailsAddEdit[i].ReportFieldId == 527) {
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                    break;
                }
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DrawingAddEditComponent.prototype, "submitSuccess", void 0);
    DrawingAddEditComponent = __decorate([
        core_1.Component({
            selector: 'drawing-addEdit',
            templateUrl: 'app/Views/Common/DrawingDetails/drawing-addedit.component.html',
            directives: [fieldGeneration_component_1.FieldComponent],
            providers: [administration_service_1.AdministrationService, asbuilt_service_1.AsbuiltService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['drawingType', 'selectedId', 'action']
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, asbuilt_service_1.AsbuiltService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], DrawingAddEditComponent);
    return DrawingAddEditComponent;
}());
exports.DrawingAddEditComponent = DrawingAddEditComponent;
//# sourceMappingURL=drawing-addedit.component.js.map
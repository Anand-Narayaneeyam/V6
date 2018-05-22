import { Component, Output, OnInit, SimpleChange, OnChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgControl } from '@angular/common';
import { AsbuiltService } from '../../../Models/Asbuilts/asbuilt.service';
import { HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { GeneralFunctions} from '../../../Models/Common/General';
import "../../../../Scripts/Drawing/iWhizApiHandler.js";
declare var iWhizAPI: any;
declare var wexBimConveter: any;
import '../../../../Scripts/WexBimDrawing/WexBim/wexBimConveter.js';

@Component({
    selector: 'drawing-addEdit',
    templateUrl: 'app/Views/Common/DrawingDetails/drawing-addedit.component.html',
    directives: [FieldComponent],
    providers: [AdministrationService, AsbuiltService, NotificationService, GeneralFunctions],
    inputs: ['drawingType', 'selectedId', 'action']
})

export class DrawingAddEditComponent implements OnInit {
    public fieldDetailsAddEdit: IField[];

    btnName: string = "Upload";
    dataKey: string = "DrawingId";
    selectedId: number[];
    addEdit: string;
    action: string;
    drawingType: number;
    rowDelimiter: string = "¢";
    columnDelimeter: string = "µ";
    @Output() submitSuccess = new EventEmitter();
    siteTabIndex: number = 999;
    buildingTabIndex: number = 0;
    floorTabIndex: number = 1;
    success: any;
    sitechangeValue: number;
    buildingchangeValue: number;
    private buildingDrawingAddFormId = 52;
    private floorDrawingAddFormId = 65;
    private buildingDrawinglistFormId = 47;
    private floorDrawingListFormId = 48;

    private buildingDrawingEditFormId = 80;
    private floorDrawingEditFormId = 68;

    private buildingDrawingReviseFormId = 92;
    private floorDrawingEditReviseFormId = 94;

    private buildingDrawingReplaceFormId = 93;
    private floorDrawingEditReplaceFormId = 95;
    partialFloorWing: boolean = false;
    replacefile: string;
    replacebuilding: string;
    replacedesc: string;
    replacedwgfile: string;
    replacesize: string;
    replacerevision: string;
    cdr: any;
    objiWhizXref: any = new iWhizAPI();
    wexBimConveterXef: any = new wexBimConveter();
    drawingLabel = "Drawing";
    constructor(cdr: ChangeDetectorRef, private asbuiltService: AsbuiltService, private notificationService: NotificationService, private getData: GeneralFunctions, private administrationService: AdministrationService) {

        this.getCusSubscribedFeatures();

    }

    ngOnInit() {

        var contextObj = this;
        contextObj.addEdit = contextObj.action;
        if (contextObj.addEdit == "add")
            contextObj.btnName = "Upload"
        else if (contextObj.addEdit == "edit")
            contextObj.btnName = "Save Changes"
        else if (contextObj.addEdit == "replace")
            contextObj.btnName = "Upload";
        else if (contextObj.addEdit == "revise")
            contextObj.btnName = "Upload";
        contextObj.checkSubscribedFeatures();
     // 
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.administrationService.checkSubscribedFeature('276').subscribe(function (result) {
            debugger
            if (result["Data"][0]["IsSubscribed"] == true) {
                contextObj.drawingLabel = result["Data"][0].Value;
            }
        });
    }
    onfileChange(event) {
        debugger
    }
    onSubmitData(event) {
       debugger
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
                                debugger
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
                                        debugger
                                    });
                                });
                                 contextObj.checkXref(resultData, function () {
                                        contextObj.submitSuccess.emit({ status: "success", returnDataBuilding: contextObj.success, isUpdate: false });
                                 });
                            } else if (contextObj.success["StatusId"] == 0)
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            else if (contextObj.success["StatusId"] == 3) {
                                if (contextObj.success["ServerId"] == -1) {
                                    contextObj.notificationService.ShowToaster("Drawing already exists. Use Revise option to add a revision", 5);
                                }
                            }
                                            

                    });
                    break
                case contextObj.floorTabIndex:
                    contextObj.asbuiltService.postInsertFloorDrawingAddwithFile(contextObj.floorDrawingAddFormId, JSON.stringify(contextObj.addFloorFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = resultData["Data"];
                            if (contextObj.success.Message == "Invalid File") {
                                contextObj.notificationService.ShowToaster("Select a valid file", 2);
                            } else if (contextObj.success["StatusId"] == 1) {
                                contextObj.notificationService.ShowToaster("Drawing uploaded", 3);
                                contextObj.checkXref(resultData, function () {       
                                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success, isUpdate: false });
                                });
                            } else if (contextObj.success["StatusId"] == 0)
                                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            else if (contextObj.success["StatusId"] == 3) {
                                if (contextObj.success["ServerId"] == -1) {
                                    contextObj.notificationService.ShowToaster("Drawing already exists. Use Revise option to add a revision", 5);
                                }
                            }
                        });
                      

                       // }
                    
                    break
            }

        }
        else if (contextObj.addEdit == "edit") {

            ////debugger
            switch (contextObj.drawingType) {
                case contextObj.buildingTabIndex:
                    let test = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.fieldDetailsAddEdit);

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
                               // contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                            }
                        }
                        // }

                    });
                    break
                case contextObj.floorTabIndex:

                    let test1 = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.fieldDetailsAddEdit);

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
                    break

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

                    let test2 = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.fieldDetailsAddEdit);
                    contextObj.asbuiltService.postReviseDrawingAddwithFile(contextObj.buildingDrawingReviseFormId, JSON.stringify(contextObj.reviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.buildingDrawinglistFormId, true, contextObj.selectedId[0]).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        // debugger
                        contextObj.success = (resultData["Data"]);
                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        } else if (contextObj.success["StatusId"] == 1) {
                            contextObj.notificationService.ShowToaster("Drawing revised", 3);
                            contextObj.submitSuccess.emit({ status: "success", returnDataBuilding: contextObj.success, isUpdate: true, isRevised: true  });

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
                    break
                case contextObj.floorTabIndex:
                    //////debugger
                    let test = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.fieldDetailsAddEdit);

                    contextObj.asbuiltService.postReviseDrawingAddwithFile(contextObj.floorDrawingEditReviseFormId, JSON.stringify(contextObj.floorreviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.floorDrawingListFormId, false, contextObj.selectedId[0]).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = (resultData["Data"]);
                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        } else if (contextObj.success["StatusId"] == 1) {
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
                    break
            }

        }
        else if (this.addEdit == "replace") {
           debugger
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
                    let test4 = contextObj.getData.getFieldValuesAsReportFieldArray(this.fieldDetailsAddEdit);
                    this.replaceFileDetails(event["fieldobject"], event["filedata"]);
                    //  contextObj.asbuiltService.postDrawingAddwithFile(contextObj.buildingDrawingReplaceFormId, event["fieldobject"], contextObj.selectedId, contextObj.buildingDrawinglistFormId).subscribe(function (resultData) {
                    contextObj.asbuiltService.postReplaceDrawingAddwithFile(contextObj.buildingDrawingReplaceFormId, JSON.stringify(contextObj.reviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.buildingDrawinglistFormId, true, contextObj.selectedId[0]).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = (resultData["Data"]);

                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        } else if (contextObj.success["StatusId"] == 1) {
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
                    break
                case this.floorTabIndex:

                    let test5 = contextObj.getData.getFieldValuesAsReportFieldArray(this.fieldDetailsAddEdit);
                    this.replaceFileDetails(event["fieldobject"], event["filedata"]);
                    //  contextObj.asbuiltService.postDrawingAddwithFile(contextObj.buildingDrawingReplaceFormId, event["fieldobject"], contextObj.selectedId, contextObj.buildingDrawinglistFormId).subscribe(function (resultData) {
                    contextObj.asbuiltService.postReplaceDrawingAddwithFile(contextObj.floorDrawingEditReplaceFormId, JSON.stringify(contextObj.floorreviseFileDetails(event["fieldobject"], event["filedata"])), event["filedata"], contextObj.floorDrawingListFormId, false, contextObj.selectedId[0]).subscribe(function (resultData) {
                        // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                        contextObj.success = (resultData["Data"]);
                     


                        if (resultData["Data"].Message == "Invalid File") {
                            contextObj.notificationService.ShowToaster("Select a valid file", 2);
                        } else if (contextObj.success["StatusId"] == 1) {
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
                  
                    break
            }

        }
        this.submitSuccess.emit("success");
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
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
            contextobj.btnName = "Save Changes"
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

            contextobj.btnName = "Upload"
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
            contextobj.btnName = "Upload"
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
    }

    private getCusSubscribedFeatures() {
        var contextObj = this;
        contextObj.administrationService.getCustomerSubscribedFeatures("26").subscribe(function (rt) {

            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 26:
                        contextObj.partialFloorWing = customerFeatureobj[i]["IsSubscribed"];
                        break;

                }
            }

        });
    }

    checkXref(resultData, resCallback) {
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
                                                if (strmsg.length > 0)
                                                { strmsg = strmsg + ", "; }
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
        else
        {
            resCallback(resultData.Data);
        }
    }
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
    addFileDetails(fieldobject: any, filedata: any) {

        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
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
    }
    editFloorFileDetails(fieldobject: any) {
        //////debugger
        var jsonobjectnew = [];

        var jsonobject = JSON.parse(fieldobject);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 511) {
                    jsonobjectnew.push(jsonobject[i]);
                }
                if (jsonobject[i]["ReportFieldId"] == 516) {

                    jsonobjectnew.push(jsonobject[i]);
                }

            }
        }
        return jsonobjectnew;
    }
    setBuildingFieldDetails(jsonobject: any) {
        //////debugger
        var contextObj = this;
        if (jsonobject) {
            switch (contextObj.action) {
                case "add":
                    for (let i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 4379) {
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                        }
                    }
                    break;
                case "edit":
                    for (let i = 0; i < jsonobject.length; i++) {
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
                    for (let i = 0; i < jsonobject.length; i++) {
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
                    for (let i = 0; i < jsonobject.length; i++) {
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
    }
    setFloorFieldDetails(jsonobject: any) {


        var contextObj = this;
        // var t=  contextObj.partialFloorWing;
        if (jsonobject) {
            switch (contextObj.action) {
                case "add":
                    for (let i = 0; i < jsonobject.length; i++) {

                        if (jsonobject[i]["ReportFieldId"] == 513) {//filesize
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 527) {//floor wing
                            jsonobject[i]["ReadOnlyMode"] = true;
                            jsonobject[i]["FieldValue"] = "Complete " + contextObj.drawingLabel;
                            jsonobject[i]["IsMandatory"] = false;
                            if (contextObj.partialFloorWing == false)
                                jsonobject[i]["IsVisible"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 526) {//partialFloorWing
                            if (contextObj.partialFloorWing == false)
                                jsonobject[i]["IsVisible"] = false;
                        }
                    }
                    break;
                case "edit":
                    //debugger
                    for (let i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 489
                            || jsonobject[i]["ReportFieldId"] == 473
                            || jsonobject[i]["ReportFieldId"] == 523
                            // || jsonobject[i]["ReportFieldId"] == 527
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
                        //     if (contextObj.partialFloorWing == false)
                        //         jsonobject[i]["IsVisible"] = false;
                        //     else {
                        //     jsonobject[i]["Value"] = jsonobject[i]["Value"] == "1" ? "true" : "false";
                        //         jsonobject[i]["IsEnabled"] = true;
                        //         jsonobject[i]["IsVisible"] = false;
                        //     }
                        //}
                        // if (jsonobject[i]["ReportFieldId"] == 527) {//floor wing
                        //    if (jsonobject[i]["FieldValue"]) {
                        //        jsonobject[i]["FieldValue"] = "Complete Floor Plan";
                        //     }
                        //    if (contextObj.partialFloorWing == false)
                        //        jsonobject[i]["IsVisible"] = false;
                        //}
                    }
                    break;
                case "revise":
                case "replace":
                    //////debugger
                    for (let i = 0; i < jsonobject.length; i++) {
                        if (jsonobject[i]["ReportFieldId"] == 513) {//filesize
                            jsonobject[i]["IsEnabled"] = true;
                            jsonobject[i]["IsVisible"] = false;
                        }
                        else if (jsonobject[i]["ReportFieldId"] == 512) {//file
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
                            else {//for revise-floorwing by cystomersettings

                                if (jsonobject[i]["ReportFieldId"] == 526) {//partialFloorWing
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



                                if (jsonobject[i]["ReportFieldId"] == 527) {//customersetting-floowrwing
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
    }


    addFloorFileDetails(fieldobject: any, filedata: any) {
        var jsonobjectnew = [];
        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
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
    }
    reviseFileDetails(fieldobject: any, filedata: any) {
        //////debugger
        var jsonobjectnew = [];

        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
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
    }
    floorreviseFileDetails(fieldobject: any, filedata: any) {
        //////debugger
        var jsonobjectnew = [];

        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
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
    }
    floorReplaceFileDetails(fieldobject: any, filedata: any) {
        //////debugger
        var jsonobjectnew = [];

        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
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
    }
    replaceFileDetails(fieldobject: any, filedata: any) {

        var jsonobject = JSON.parse(fieldobject);
        var fileobject = JSON.parse(filedata);
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 4378) {//file
                    this.replacefile = fileobject.FileName;

                }
                else if (jsonobject[i]["ReportFieldId"] == 4379) {//size
                    this.replacesize = fileobject.FileSize.toString();

                }

                else if (jsonobject[i]["ReportFieldId"] == 473) {//building
                    this.replacebuilding = jsonobject[i]["Value"].toString()

                }
                else if (jsonobject[i]["ReportFieldId"] == 4382) {//des
                    this.replacedesc = jsonobject[i]["Value"].toString()

                }
                if (jsonobject[i]["ReportFieldId"] == 4306) {//revision
                    this.replacerevision = jsonobject[i]["Value"].toString()


                }
            }
        }
        //  return jsonobjectnew;
    }
    fieldChange(event: any) {
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
            if (parentFieldId == 204 || parentFieldId == 221) {//site change building drawing/floor drawing
                contextObj.sitechangeValue = parentSelectedValue;
                contextObj.asbuiltService.loadState(formId, parentSelectedValue, parentFieldId).subscribe(function (resultData) {
                    //  if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 203 || contextObj.fieldDetailsAddEdit[i]["FieldId"] == 222) {//binding building,floor
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";

                            }
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {//floor
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";

                            }
                        }
                    } else {
                        for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 203 || contextObj.fieldDetailsAddEdit[i]["FieldId"] == 222) {//binding building,floor
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                                break;
                            }
                            if (this.drawingType == contextObj.floorTabIndex) {
                                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {
                                        contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    // }
                })
            }
            if (parentFieldId == 222) {//building change in floor drawing
                this.buildingchangeValue = parentSelectedValue;
                this.asbuiltService.loadState(formId, parentSelectedValue, parentFieldId).subscribe(function (resultData) {
                    // if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["LookupValues"] != "") {
                        for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                break;
                            }
                        }
                    } else {
                        for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                            if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {
                                contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                                contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                                break;
                            }
                        }
                    }
                    //  }
                })
            }


        }
        else {
            if (parentFieldId == 204 || parentFieldId == 221) {
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {

                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 203 || contextObj.fieldDetailsAddEdit[i]["FieldId"] == 222) {
                        contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";
                        break;
                    }
                }
            }
            if (parentFieldId == 203 || parentFieldId == 222) {
                for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 223) {//floor
                        contextObj.fieldDetailsAddEdit[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "-1";

                    }
                }
            }
        }
    }
    onChkChange(value: any) {

        var contextObj = this;
        if (!value.chkBoxObject.IsChecked)
            for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                if (contextObj.fieldDetailsAddEdit[i].ReportFieldId == 527) {
                    contextObj.fieldDetailsAddEdit[i].FieldValue = "Complete " + contextObj.drawingLabel;
                    contextObj.fieldDetailsAddEdit[i].IsEnabled = false;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = false;
                    break;
                }
            }
        else {
            for (let i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                if (contextObj.fieldDetailsAddEdit[i].ReportFieldId == 527) {

                    contextObj.fieldDetailsAddEdit[i].IsEnabled = true;
                    contextObj.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                    contextObj.fieldDetailsAddEdit[i].IsMandatory = true;
                    break;
                }
            }
        }
    }

}
export interface wexbimData {
    drawingId: string;
    fileName: string;
    revisionNo: string;
}
/// <reference path="employeeopendrawing.services.ts" />
import { Injectable } from '@angular/core';
import {HttpHelpers} from '../../../Whatever/utils/HttpHelpers';
import { Http } from '@angular/http';
import {SpaceOpenDrawing} from '../../space/drawings/spaceopendrawing.services';
import {EmployeeDrawingService} from '../../../models/employee/employeedrawing.services';
import {EmployeeOpenDrawing} from '../../employee/drawings/employeeopendrawing.services';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

export class ScenarioOpenDrawing {
    objiWhiz: any;
    empDrawingService: EmployeeDrawingService;
    empOpenDrwgObj: EmployeeOpenDrawing
    notificationServices: NotificationService;
    //empData: any;
    //empCount: number = 0;
    spaceOpenDrawingObj: any;
    drawingId: number;
    moduleId: number;
    empDisplaySettingData: any;
    http: any;
    drawingDetails: any;
    isSpace: boolean = true;
    commonDwgServices: any;
    g_intEmployeeSymbolColor = 70;
    g_intScenarioSymbolColor = 31;
    movedEmployeeData = [];
    scenarioDrwgId: number = 0;
    scenarioId: number = 0;
    constructor(private iWhizObject: any, drawingId: number, moduleId: number, extDrwgDetails: any, http: Http, notificationService: NotificationService) {
        this.objiWhiz = iWhizObject;
        this.drawingId = drawingId;
        this.moduleId = moduleId;
        this.http = http;
        this.drawingDetails = extDrwgDetails;
        this.empDrawingService = new EmployeeDrawingService(this.http);
        this.notificationServices = notificationService;

    }
    initilizeObjects = function (resCallback) {
        var contextObj = this;
        this.spaceOpenDrawingObj = new SpaceOpenDrawing(this.objiWhiz, this.drawingId, this.moduleId, this.http, false);
        this.empOpenDrwgObj = new EmployeeOpenDrawing(this.objiWhiz, this.drawingId, this.moduleId, this.http, this.notificationServices);
        //contextObj.empDrawingService.getCustomerSubscribedFeatures("184,15").subscribe(function (rt) {
        //    var customerFeatureobj = rt["Data"];
        //    for (let i = 0; i < customerFeatureobj.length; i++) {
        //        switch (customerFeatureobj[i]["Id"]) {
        //            case 184://EmployeeAssignToZeroSeatingCapacity
        //                contextObj.g_blnAssignEmployeeInZeroCapacity = customerFeatureobj[i]["IsSubscribed"];
        //                break;
        //            case 15://SpaceAllocationRuleInEmployees
        //                contextObj.g_blnSpaceAllocationRuleEnabled = customerFeatureobj[i]["IsSubscribed"];
        //                break;
        //            case 190://ApprovalProcessForEmployeeMoveInDrawing
        //                contextObj.g_IsEmployeeMoveApprovalEnabled = customerFeatureobj[i]["IsSubscribed"];
        //                break;
        //        }
        //    }
        //});
        
        contextObj.getAllScenarioEmpDtls();
      
        contextObj.spaceOpenDrawingObj.initilizeObjects(function (retCode) {
            contextObj.commonDwgServices = contextObj.spaceOpenDrawingObj.commonServices;
            contextObj.empOpenDrwgObj.commonDwgServices = contextObj.commonDwgServices;
            contextObj.empOpenDrwgObj.spaceOpenDrawingObj = contextObj.spaceOpenDrawingObj;
            //contextObj.empOpenDrwgObj.categoryId = 6;
            //contextObj.empOpenDrwgObj.addtlDataFieldCategoryId = 8;
           // contextObj.isSpace = contextObj.spaceOpenDrawingObj.commonServices.isSpace;
            contextObj.empOpenDrwgObj.isSpace = contextObj.spaceOpenDrawingObj.commonServices.isSpace;
            
            contextObj.g_blnEmployeeModuleAdmin = contextObj.spaceOpenDrawingObj.commonServices.isModuleAdmin;
            contextObj.rowDelimiter = contextObj.spaceOpenDrawingObj.commonServices.rowDelimiter;
            contextObj.colDelimiter = contextObj.spaceOpenDrawingObj.commonServices.columnDelimiter;
            contextObj.empOpenDrwgObj.rowDelimiter = contextObj.rowDelimiter;
            contextObj.empOpenDrwgObj.colDelimiter = contextObj.colDelimiter;

            resCallback(0);
        });
        contextObj.empOpenDrwgObj.getEmpDisplaySettingsData();

    }
    getAllScenarioEmpDtls = function () {
        var contextObj = this;
        contextObj.scenarioDrwgId = contextObj.drawingDetails.ScenarioDrawingId;
        contextObj.scenarioId = contextObj.drawingDetails.ScenarioId;
        contextObj.empDrawingService.getScenarioEmployeeDtls(contextObj.drawingDetails.ScenarioDrawingId, false).subscribe(function (resultData) {//assigned
            var data = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.empOpenDrwgObj.empData = data;
            contextObj.empOpenDrwgObj.empCount = data.length;
            //contextObj.empData = data;
            //contextObj.empCount = data.length;
        });
    }
    // for getting all emp display settings data
    getEmpDisplaySettingsData = function () {
        var contextObj = this;
        this.empDrawingService.getEmployeeDisplaySettingsData(contextObj.categoryId, contextObj.addtlDataFieldCategoryId).subscribe(function (resultData) {
     
            contextObj.empDisplaySettingData = resultData["Data"];
            contextObj.empOpenDrwgObj.empDisplaySettingData = resultData["Data"];
        });
    }
    showDataInDrawing = function (dataChange, resCallback) {
        var contextObj = this;
        switch (dataChange) {  
            case 'spaceDispChange': contextObj.spaceOpenDrawingObj.displaySettingData = null;
                contextObj.spaceOpenDrawingObj.getDisplaySettingsData(function (retCode) { });
                contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$SpaceData", function (retCode) {
                    contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {
                        if (retCode == 0) {
                            resCallback(0);
                        }
                    });
                });
                break;        
            case 'empDispChange': contextObj.empDisplaySettingData = null;
                contextObj.getEmpDisplaySettingsData();
                contextObj.spaceOpenDrawingObj.deleteLayerAlredyExists(contextObj.g_strEmployeeTextLayer, function (retCode) {
                    contextObj.displayEmployeeDataOnDrawing(function (returnCode) {
                        if (returnCode == 0)
                            resCallback(0);
                        else
                            resCallback(1);
                    });
                });
                break;
            case 'bothData': contextObj.spaceOpenDrawingObj.showDataInDrawing(function (retCode) {
                if (retCode == 0) {
                    var empProposedYesData = [];  
                    var empProposedNoData = [];
                    var tempdataInDrawingTextHandles=[];
                    var tempempHandlesData = [];
                    var empDataCopy = contextObj.empOpenDrwgObj.empData;
                    for (var i = 0; i < contextObj.empOpenDrwgObj.empCount; i++) {
                        if (empDataCopy[i].Proposed == "Yes")
                            empProposedYesData.push(empDataCopy[i]);
                        else
                            empProposedNoData.push(empDataCopy[i]);
                    }   
                             
                   contextObj.empOpenDrwgObj.empData = empProposedNoData;
                    contextObj.empOpenDrwgObj.displayEmployeeDataOnDrawing(function (returnCode) {
                        if (returnCode == 0) {
                            tempempHandlesData = contextObj.empOpenDrwgObj.empHandlesData;
                            tempdataInDrawingTextHandles = contextObj.empOpenDrwgObj.dataInDrawingTextHandles;
                            contextObj.empOpenDrwgObj.empData = empProposedYesData;
                            contextObj.empOpenDrwgObj.displayEmployeeDataOnDrawing(function (returnCode) {
                                if (returnCode == 0) {
                                    contextObj.empOpenDrwgObj.empData = empDataCopy;
                                    contextObj.empOpenDrwgObj.empHandlesData = contextObj.empOpenDrwgObj.empHandlesData.concat(tempempHandlesData);
                                    contextObj.empOpenDrwgObj.dataInDrawingTextHandles = contextObj.empOpenDrwgObj.dataInDrawingTextHandles.concat(tempdataInDrawingTextHandles);
                                    resCallback(0);
                                }
                                else
                                    resCallback(1);
                            });
                        } else
                            resCallback(1);

                    });

                }
            });
                break;
        }
    }

    moveEmployeeInDrawingOnClick(resCallback) {
        var contextObj = this;
        contextObj.moveEmployeeInDrawing(true, function (retCode, intEmployeeId, strEmployeeName, previousXCord, previousYCord, gradeExist, selectedSymbolhandle) {
            if (retCode == 0) {
                contextObj.empOpenDrwgObj.invokeAssignEmployee(intEmployeeId, strEmployeeName, gradeExist, function (returnCode, seatingCapacity, spaceId, currentXCord, currentYCord, selectedSpaceHandle) {
                    // contextObj.insertSpaceAllotments = { "employeeId": employeeId, "spaceId": spaceId, "drawingId": contextObj.drawingId, "xPosition": xPos, "yPosition": yPos };
                   
                    switch (returnCode) {
                        case 1: var selectedEmpCurrentData;
                            var index = contextObj.empOpenDrwgObj.empData.findIndex(function (el) { return el.Id === intEmployeeId });
                            if (index != -1)
                                selectedEmpCurrentData = contextObj.empOpenDrwgObj.empData[index];
                                contextObj.moveEmployeeToSelectedSpace(intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, function (retCode) {
                                contextObj.empOpenDrwgObj.deHatchEmployee(function (retCode) {
                                    contextObj.objiWhiz.setCursor(1);
                                    // contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                    // contextObj.objiWhiz.stopMovingTrails(function (retCode) {
                                    //     contextObj.objiWhiz.regenerate();
                                    resCallback(returnCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist, selectedEmpCurrentData);
                                      });                        

                                //});
                            });
                            break;
                        case 2: resCallback(returnCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist);
                            break;
                        case 3: resCallback(returnCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist);
                            break;
                        case 4: resCallback(returnCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist);
                            break;
                        case -1:
                            resCallback(-1);
                            break;
                        case 8: //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                            contextObj.objiWhiz.stopSvgTrails();
                            contextObj.empOpenDrwgObj.deHatchEmployee(function (retCode) {
                                contextObj.objiWhiz.regenerate();
                                resCallback(-1);
                            });
                    }
                });
            } else if (retCode == 5) {
                contextObj.empOpenDrwgObj.deHatchEmployee(function (retCode) {
                    contextObj.objiWhiz.setCursor(1);
                    //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.objiWhiz.stopSvgTrails();
                    contextObj.objiWhiz.regenerate();
                    resCallback(5);

                });
            }
            else
                resCallback(6);
        });
    }
    moveEmployeeInDrawing = function (isSingleMove, resCallback) {
        var contextObj = this;
        var selectedEmpId: number;
        var employeeName: string;
        var proposed: string;
        var employeeCode: string;
        var gradeExist: boolean = false;
        var isFieldSubscribed: number;
        var selectedSpacehandle: string = "";
        var intCompareResult: boolean;//Check Edit permission For Facility User
 
        contextObj.objiWhiz.setCursor(2);
        contextObj.objiWhiz.getDWGPoint(function (retCode, xPos, yPos) {
            if (retCode == 0) {
                contextObj.objiWhiz.getSymbolWithDWGPoint(xPos, yPos, true, function (rtCode, selectedSymbolhandle) {
                    if (rtCode == 0) {                        
                        contextObj.empOpenDrwgObj.hatchSelectedEmployee(selectedSymbolhandle, function (rCode) {
                            if (rCode != 0) {
                                resCallback(6);
                                console.log("hatchSelectedEmployee failed due to ", rCode);
                            } else {
                                selectedEmpId = contextObj.empOpenDrwgObj.empHandlesData.find(function (el) { return el.SymbolHandle === selectedSymbolhandle })['EmpId'];
                                
                                contextObj.empOpenDrwgObj.empData.find(function (el) {
                                    if (el.Id == selectedEmpId) {
                                        employeeName = el["Employee Name"];
                                        employeeCode = el["Employee Code"];
                                        proposed = el["Proposed"];
                                        return true;
                                    } else return false;
                                });      
                                                   
                                if (proposed == "No") {
                                    contextObj.notificationServices.ShowToaster("Only Employees scheduled through Space Planning Project can be moved", 2);
                                        resCallback(5);
                                    }
                                    else {
                                    if (isSingleMove) {
                                        contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, xPos, yPos, function (retCode) { });
                                            //var rubx = [], ruby = [], rubz = []
                                            //rubx[0] = xPos; ruby[0] = yPos; rubz[0] = 0;
                                            //contextObj.objiWhiz.dwgToClient(rubx, ruby, rubz);
                                            //contextObj.objiWhiz.enableRubberband(rubx[0], ruby[0], 0, true);
                                        }
                                        //contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, xPos, yPos, function (retCode) {
                                        contextObj.empDrawingService.isFieldSubscribed(2, 874).subscribe(function (resultData) {//fieldSubscriptionCategoryId=2,reportFieldId=874
                                            isFieldSubscribed = JSON.parse(resultData["Data"]);
                                            if (contextObj.empOpenDrwgObj.g_blnSpaceAllocationRuleEnabled && isFieldSubscribed > 0)
                                                gradeExist = true;
                                            selectedSpacehandle = contextObj.empOpenDrwgObj.getSpaceHandleViaEmpId(selectedEmpId);
                                            contextObj.beforeMoveSpaceId = contextObj.empOpenDrwgObj.getSpaceIdFromSpaceHandle(selectedSpacehandle);
                                            var spaceId = contextObj.empOpenDrwgObj.getSpaceIdFromSpaceHandle(selectedSpacehandle);
                                            intCompareResult = contextObj.empOpenDrwgObj.checkDataExistsforSelectedHandle(selectedSpacehandle);
                                            if (intCompareResult) {
                                                if (contextObj.empOpenDrwgObj.g_blnEmployeeModuleAdmin == false) {
                                                    contextObj.empOpenDrwgObj.checkEditPermissionforTheSelectedSpace(spaceId, function (blnEditPermission) {
                                                        if (blnEditPermission) {
                                                            //if (contextObj.g_IsEmployeeMoveApprovalEnabled) {
                                                            //    contextObj.empDrawingService.getEmployeeMoveRequestStatus(selectedEmpId).subscribe(function (resultData) {
                                                            //        if (JSON.parse(resultData["Data"].FieldBinderData)[0] == 34)
                                                            //        {
                                                            //            contextObj.notificationServices.ShowToaster("Employee already Requested for a move", 2);
                                                            //            resCallback(5);
                                                            //        }
                                                            //        else
                                                            //            resCallback(0, selectedEmpId, employeeName, xPos, yPos, gradeExist, selectedSymbolhandle);
                                                            //    });
                                                            //}
                                                            //else {
                                                            //    contextObj.notificationServices.ShowToaster("Employee already Requested for a move", 5);
                                                            //    resCallback(5);
                                                            //}
                                                            resCallback(0, selectedEmpId, employeeName, xPos, yPos, gradeExist, selectedSymbolhandle);
                                                        }
                                                        else {
                                                            contextObj.notificationServices.ShowToaster("You do not have edit permission for the selected space", 5);
                                                            resCallback(5);
                                                        }
                                                    });
                                                }
                                                else {
                                                    resCallback(0, selectedEmpId, employeeName, xPos, yPos, gradeExist, selectedSymbolhandle);
                                                }
                                            }
                                            else {
                                                resCallback(5);
                                                contextObj.notificationServices.ShowToaster("You do not have edit permission for the selected space", 5);
                                            }
                                        });
                                     //  });
                                    }                              
                            }
                        });
                    }
                    else
                        resCallback(6);
                });
            }
            else
                resCallback(retCode);
        });
    }
    moveEmployeeToSelectedSpace = function (intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, resCallback) {
        var contextObj = this;
        contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
        contextObj.objiWhiz.stopSvgTrails();

        //912~@EmployeeId, 913~@DrawingId,
            //904~@ScenarioId, 2993~@SpaceId, 915~@TextX, 916~@TextY, 917~@IsScenarioEmployee
        var tempmovedEmployeeData = []
        tempmovedEmployeeData.push(
            { "ReportFieldId": 912, "Value": intEmployeeId },
            { "ReportFieldId": 913, "Value": contextObj.drawingId },
            { "ReportFieldId": 904, "Value": contextObj.scenarioId },
            { "ReportFieldId": 2993, "Value": spaceId },
            { "ReportFieldId": 915, "Value": currentXCord },
            { "ReportFieldId": 916, "Value": currentYCord },
            { "ReportFieldId": 917, "Value": true }
        )
        if (contextObj.movedEmployeeData.length == 0) {                     
            contextObj.movedEmployeeData.push(tempmovedEmployeeData);
          
        } else {
          
            contextObj.movedEmployeeData = contextObj.movedEmployeeData.filter(function (item) {
                return !(item[0].ReportFieldId == 912 && item[0].Value == intEmployeeId)
            });
            contextObj.movedEmployeeData.push(tempmovedEmployeeData);    
            
        }
        console.log("EmpDAtaarray", contextObj.movedEmployeeData);
        var midPoints = contextObj.empOpenDrwgObj.getEmployeeXYCordinates(intEmployeeId);
            contextObj.objiWhiz.moveSymbol(selectedSymbolhandle, previousXCord, previousYCord, currentXCord, currentYCord, midPoints, function (returnCode, actualPoints, rtnMidPoints) {
                if (returnCode != 0) {
                    console.log("moveSymbol faild due to ", returnCode);
                    resCallback(0);
                }
                else {                 
                    contextObj.objiWhiz.getEntityExtents(selectedSymbolhandle, function (retCode, MinX, MinY, MaxX, MaxY) {
                        if (retCode != 0) {
                            console.log("getEntityExtents faild due to ", retCode);
                            resCallback(0);
                        }
                        else {
                            contextObj.empOpenDrwgObj.moveEmployeeText(intEmployeeId, MaxX, MaxY, function (retCode) {                            
                                var index = contextObj.empOpenDrwgObj.empHandlesData.findIndex(function (el) { return el.EmpId === intEmployeeId });
                                if (index != -1)
                                    contextObj.empOpenDrwgObj.empHandlesData[index].SymbolHandle = selectedSymbolhandle;
                                contextObj.empOpenDrwgObj.beforeMoveSpaceId = undefined;
                                resCallback(0);
                            });
                        }
                    });                  
                }                                 
        });
    }
    saveEmpScenario= function(resCallback) {
        var context = this;       
        if (this.movedEmployeeData.length > 0) {           
            var empdata = JSON.stringify(this.movedEmployeeData);
            //spEMP_AddUpdateEmployeeToScenario(912~@EmployeeId, 913~@DrawingId,
            //904~@ScenarioId, 2993~@SpaceId, 915~@TextX, 916~@TextY, 917~@IsScenarioEmployee)
            context.empDrawingService.saveScenario(empdata).subscribe(function (resultData) {
                if (resultData["Data"].StatusId == 1) {
                    resCallback(1);
                } else {
                    resCallback(2);
                }
            });

        } else resCallback(1);
    }
}
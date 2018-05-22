import {Component, ChangeDetectorRef, Output, EventEmitter, Input, OnInit, AfterViewInit} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {IField, ILookupValues} from  '../../../Framework/Models/Interface/IField'
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {EmployeeService} from '../../../Models/Employee/employee.services'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'employeemoverequest',
    templateUrl: './app/Views/Employee/Request/employeemoverequest.component.html',
    directives: [PageComponent, FieldComponent],
    providers: [EmployeeService, NotificationService],
})

export class EmployeeMoveRequest implements OnInit, AfterViewInit {
    @Input() empData: any[];
    @Input() drawingDetails: number;
    @Input() IsForAssign: any[];
    @Input() SpaceDetails: any[];
    @Input() ObjectDetails: any[];
    @Input() DrawingId: any[];
    @Output() sumbitSuccess = new EventEmitter();
    requestFields: IField[];
    workFlowEntityCategoryId: number = 9;


    constructor(private EmployeeService: EmployeeService, private _notificationService: NotificationService) {
    }
    ngAfterViewInit() {
        if (this.empData.length > 1) {
            this.setEmpNameTooltip();
        }
    }
    setEmpNameTooltip() {
        var contextObj = this;
        if (!contextObj.requestFields) {
            setTimeout(function () {
                contextObj.setEmpNameTooltip();

            }, 50);
        } else {
            var index = this.requestFields.findIndex(function (el) { return el['FieldId'] == 2270 });
            if (index != -1) {
                var ele = <HTMLElement>document.getElementById('2270');
                ele['title'] = this.requestFields[index]['FieldValue'];
            }
        }
    }
    ngOnInit() {
        debugger;
        var contextObject = this;
        var employeeData = contextObject.empData;
        var wrkFlowCatId: number;

        var dwgDetails = contextObject.drawingDetails;
        if (contextObject.IsForAssign) {
            wrkFlowCatId = 9;
            contextObject.workFlowEntityCategoryId = 11;
        }
        else {
            wrkFlowCatId = 7;
            contextObject.workFlowEntityCategoryId = 9;
        }

        this.EmployeeService.getEmployeeMoveRequestFields(wrkFlowCatId).subscribe(function (resultData) {
            contextObject.requestFields = resultData["Data"];

            for (var item of contextObject.empData) {
                var EmpName = contextObject.requestFields.find(function (item) {
                    return item.ReportFieldId === 868;

                });
                EmpName.FieldValue = EmpName.FieldValue == null ? item["Employee Name"] : EmpName.FieldValue + ", " + item["Employee Name"];

                var EmpCode = contextObject.requestFields.find(function (item) {
                    return item.ReportFieldId === 871;

                });
                EmpCode.FieldValue = EmpCode.FieldValue == null ? item["Employee Code"] : EmpCode.FieldValue + ", " + item["Employee Code"];
            }



            var ToSite = contextObject.requestFields.find(function (item) {
                return item.ReportFieldId === 572;

            });
            if (contextObject.IsForAssign)
                ToSite.FieldValue = contextObject.drawingDetails.toString().split("/")[0];
            else
                ToSite.FieldValue = contextObject.empData[0]["Site"];

            var ToBuilding = contextObject.requestFields.find(function (item) {
                return item.ReportFieldId === 488;

            });
            if (contextObject.IsForAssign)
                ToBuilding.FieldValue = contextObject.drawingDetails.toString().split("/")[1];
            else
                ToBuilding.FieldValue = contextObject.empData[0]["Building"];

            var ToFloor = contextObject.requestFields.find(function (item) {
                return item.ReportFieldId === 540;

            });
            if (contextObject.IsForAssign)
                ToFloor.FieldValue = contextObject.drawingDetails.toString().split("/")[2];
            else
                ToFloor.FieldValue = contextObject.empData[0]["Floor"];


            var workType = contextObject.requestFields.find(function (item) {
                return item.ReportFieldId === 5873;


            });
            if (workType.LookupDetails.LookupValues && workType.LookupDetails.LookupValues.length == 1) {
                workType.FieldValue = workType.LookupDetails.LookupValues[0].Id.toString();
            }

            var nextActPointUser = contextObject.requestFields.find(function (item) {
                return item.ReportFieldId === 12254;

            });

            var dateToPerform = contextObject.requestFields.find(function (item) {
                return item.ReportFieldId === 7461;
            });
            dateToPerform.IsMandatory = true;
            //7461 Date To Perform
            //7405 Comments


            EmpName.IsEnabled = false;
            EmpCode.IsEnabled = false;
            ToSite.IsEnabled = false;
            ToBuilding.IsEnabled = false;
            ToFloor.IsEnabled = false;

            if (workType.FieldValue == null) {
                nextActPointUser.IsVisible = false;
            }
            else {
                contextObject.workTypeddlChange(workType);
            }

            //userAccssLvl.IsMandatory = true;
            //userAccssLvl.FieldValue = "1";

        });
        // var EmpId = contextObject.SpaceDetails[0]["employeeId"];
        //if (!contextObject.IsForAssign) {
        //    contextObject.EmployeeService.getRecourcedataforemployeemove(EmpId).subscribe(function (resultdata) {
        //        contextObject.ObjectDetails = JSON.parse(resultdata["Data"].FieldBinderData);
        //    });
        //}
    }

    private workTypeddlChange(rptFieldId) {
        var nextActionPointUser = this.requestFields.find(function (item) {
            return item.ReportFieldId === 12254;

        });

        //WorkType change 
        if (rptFieldId.ReportFieldId == 5873) {
            // this.userRole = parseInt(rptFieldId.FieldValue);
            if (rptFieldId.FieldValue >= 0) {
                //nextActionPointUser.IsVisible = true;
                // employeeService.getActionPointUserLookupValues
                this.EmployeeService.getActionPointUserLookupValues(0, rptFieldId.FieldValue, 5, this.workFlowEntityCategoryId).subscribe(function (resultdata) {
                    debugger;
                    if ((JSON.parse(resultdata.FieldBinderData)).length == 0) {
                        nextActionPointUser.IsVisible = false;
                        nextActionPointUser.IsMandatory = false;
                    }
                    else {
                        nextActionPointUser.LookupDetails.LookupValues = JSON.parse(resultdata.FieldBinderData);
                        nextActionPointUser.IsMandatory = true;
                        nextActionPointUser.IsVisible = true;
                    }
                });

            } else {
                nextActionPointUser.IsVisible = false;
            }
        }
    }

    onSubmitData(event) {
        debugger;
        var EMpSpace: any[];
        var EmpSpaceDetails: any[];
        //EmployeeId
        //SpaceId,
        //    XPosition,
        //    YPosition,
        //    TargetSpaceId,
        //    TargetXPosition,
        //    TargetYPosition,

        //drawingId
        //employeeId
        //spaceId
        //xPosition
        //yPosition

        var SpaceEmpArr: IEmployeeIdsWithDetails[] = [];
        var AssignSpaceArr: IEmpSpaceDetails[] = [];
        var EmpObjArr: IEmployeeObjects[] = [];

        // var i = 0;
        // for (var spaceitem of this.SpaceDetails) {

        // }

        var dateToPerform = JSON.parse(event.fieldobject).find(function (item) {
            return item.ReportFieldId === 7461;
        });

        var comments = JSON.parse(event.fieldobject).find(function (item) {
            return item.ReportFieldId === 7405;
        });

        //7461 Date To Perform
        //7405 Comments

        var fieldObjectArray: ReportFieldArray[] = JSON.parse(event["fieldobject"]).filter(function (item) { return item.ReportFieldId != 12254 });
        var actionUser: IField = this.requestFields.find(function (item) {
            return item.ReportFieldId === 12254
        });
        if (actionUser.MultiFieldValues != null) {
            for (var item of actionUser.MultiFieldValues) {
                fieldObjectArray.push({
                    ReportFieldId: 12254,
                    Value: item
                });
            }
        }

        var contextObj = this;
        if (this.IsForAssign) {
            // var DwgId = this.empData[0]["AssignedDrawingId"];
            //var DwgId = this.empData[0]["AssignedDrawingId"];

            //var AssignSpace: IEmpSpaceDetails = { employeeId: 0, drawingId: 0, xPosition: 0, yPosition: 0, spaceId: 0 };

            for (var cnt = 0; cnt < this.SpaceDetails.length; cnt++) {
                var AssignSpace: IEmpSpaceDetails = { employeeId: 0, drawingId: 0, xPosition: 0, yPosition: 0, spaceId: 0 };
                AssignSpace.employeeId = this.SpaceDetails[cnt]["employeeId"];
                AssignSpace.spaceId = this.SpaceDetails[cnt]["spaceId"];
                AssignSpace.xPosition = this.SpaceDetails[cnt]["xPosition"];
                AssignSpace.yPosition = this.SpaceDetails[cnt]["yPosition"];
                AssignSpace.drawingId = this.SpaceDetails[cnt]["drawingId"];

                AssignSpaceArr.push(AssignSpace);
            }



            this.EmployeeService.saveEmployeeAssignthroughWorkflow(JSON.stringify(AssignSpaceArr), this.DrawingId, dateToPerform.Value, comments.Value == null ? "" : comments.Value, JSON.stringify(fieldObjectArray)).subscribe(function (resultData) {
                debugger;
                contextObj.sumbitSuccess.emit(contextObj.IsForAssign);
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj._notificationService.ShowToaster("Employee Assign Request created", 3);
                        break;

                }
            });
        }
        else {
            var index;
            for (var cnt = 0; cnt < this.SpaceDetails.length; cnt++) {
                var SpaceEmp: IEmployeeIdsWithDetails = { EmployeeId: 0, TargetSpaceId: 0, XPosition: 0, YPosition: 0, TargetXPosition: 0, TargetYPosition: 0, SpaceId: 0 };
                SpaceEmp.EmployeeId = this.SpaceDetails[cnt]["employeeId"];
                SpaceEmp.TargetSpaceId = this.SpaceDetails[cnt]["spaceId"];
                SpaceEmp.XPosition = this.SpaceDetails[cnt]["previousXCord"];
                SpaceEmp.YPosition = this.SpaceDetails[cnt]["previousYCord"];
                SpaceEmp.TargetXPosition = this.SpaceDetails[cnt]["currentXCord"];
                SpaceEmp.TargetYPosition = this.SpaceDetails[cnt]["currentYCord"];
                index = this.empData.findIndex(function (el) { return el['Id'] == SpaceEmp.EmployeeId });
                SpaceEmp.SpaceId = this.empData[index]["AssignedSpaceId"];

                SpaceEmpArr.push(SpaceEmp);
            }

            this.EmployeeService.saveEmployeeMovethroughWorkflow(JSON.stringify(SpaceEmpArr), dateToPerform.Value, comments.Value == null ? "" : comments.Value, this.DrawingId, JSON.stringify(fieldObjectArray)).subscribe(function (resultData) {
                debugger;
                contextObj.sumbitSuccess.emit(contextObj.IsForAssign);
                switch (resultData["Data"].StatusId) {

                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 3);
                        break;
                    case 1:
                        if (contextObj.ObjectDetails && contextObj.ObjectDetails.length != 0) {
                            //********************For employee resource move request begin***********************
                            for (var cnt = 0; cnt < contextObj.ObjectDetails.length; cnt++) {
                                var EmployeeObjects: IEmployeeObjects = { EmployeeId: 0, ObjectId: 0 };
                                EmployeeObjects.EmployeeId = contextObj.ObjectDetails[cnt]["EmployeeId"];
                                EmployeeObjects.ObjectId = contextObj.ObjectDetails[cnt]["ObjectId"];
                                EmpObjArr.push(EmployeeObjects);
                            }
                            contextObj.EmployeeService.saveEmployeeResourcesthroughWorkflow(JSON.stringify(EmpObjArr)).subscribe(function (resultData) {
                                contextObj._notificationService.ShowToaster("Employee Move Request sent for approval", 3);
                            });
                            //********************For employee resource move request end***********************
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Employee Move Request sent for approval", 3);
                        }
                        break;

                }

            });
            //this.EmployeeService.saveEmployeeAssignthroughWorkflow(SpaceEmpArr,.subscribe(function (resultData) {

            //});
        }

    }

}
export interface IEmployeeIdsWithDetails  {

    EmployeeId: number;
    SpaceId: number;
    XPosition: number;
    YPosition: number;
    TargetSpaceId: number;
    TargetXPosition: number;
    TargetYPosition: number;

}
export interface IEmpSpaceDetails {
    drawingId: number;
    employeeId: number;
    spaceId: number;
    xPosition: number;
    yPosition: number;
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface IEmployeeObjects {
    EmployeeId: number;
    ObjectId: number;
}

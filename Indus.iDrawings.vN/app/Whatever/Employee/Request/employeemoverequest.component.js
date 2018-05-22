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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var EmployeeMoveRequest = (function () {
    function EmployeeMoveRequest(EmployeeService, _notificationService) {
        this.EmployeeService = EmployeeService;
        this._notificationService = _notificationService;
        this.sumbitSuccess = new core_1.EventEmitter();
        this.workFlowEntityCategoryId = 9;
    }
    EmployeeMoveRequest.prototype.ngAfterViewInit = function () {
        if (this.empData.length > 1) {
            this.setEmpNameTooltip();
        }
    };
    EmployeeMoveRequest.prototype.setEmpNameTooltip = function () {
        var contextObj = this;
        if (!contextObj.requestFields) {
            setTimeout(function () {
                contextObj.setEmpNameTooltip();
            }, 50);
        }
        else {
            var index = this.requestFields.findIndex(function (el) { return el['FieldId'] == 2270; });
            if (index != -1) {
                var ele = document.getElementById('2270');
                ele['title'] = this.requestFields[index]['FieldValue'];
            }
        }
    };
    EmployeeMoveRequest.prototype.ngOnInit = function () {
        debugger;
        var contextObject = this;
        var employeeData = contextObject.empData;
        var wrkFlowCatId;
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
            for (var _i = 0, _a = contextObject.empData; _i < _a.length; _i++) {
                var item = _a[_i];
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
    };
    EmployeeMoveRequest.prototype.workTypeddlChange = function (rptFieldId) {
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
            }
            else {
                nextActionPointUser.IsVisible = false;
            }
        }
    };
    EmployeeMoveRequest.prototype.onSubmitData = function (event) {
        debugger;
        var EMpSpace;
        var EmpSpaceDetails;
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
        var SpaceEmpArr = [];
        var AssignSpaceArr = [];
        var EmpObjArr = [];
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
        var fieldObjectArray = JSON.parse(event["fieldobject"]).filter(function (item) { return item.ReportFieldId != 12254; });
        var actionUser = this.requestFields.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (actionUser.MultiFieldValues != null) {
            for (var _i = 0, _a = actionUser.MultiFieldValues; _i < _a.length; _i++) {
                var item = _a[_i];
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
                var AssignSpace = { employeeId: 0, drawingId: 0, xPosition: 0, yPosition: 0, spaceId: 0 };
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
                var SpaceEmp = { EmployeeId: 0, TargetSpaceId: 0, XPosition: 0, YPosition: 0, TargetXPosition: 0, TargetYPosition: 0, SpaceId: 0 };
                SpaceEmp.EmployeeId = this.SpaceDetails[cnt]["employeeId"];
                SpaceEmp.TargetSpaceId = this.SpaceDetails[cnt]["spaceId"];
                SpaceEmp.XPosition = this.SpaceDetails[cnt]["previousXCord"];
                SpaceEmp.YPosition = this.SpaceDetails[cnt]["previousYCord"];
                SpaceEmp.TargetXPosition = this.SpaceDetails[cnt]["currentXCord"];
                SpaceEmp.TargetYPosition = this.SpaceDetails[cnt]["currentYCord"];
                index = this.empData.findIndex(function (el) { return el['Id'] == SpaceEmp.EmployeeId; });
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
                                var EmployeeObjects = { EmployeeId: 0, ObjectId: 0 };
                                EmployeeObjects.EmployeeId = contextObj.ObjectDetails[cnt]["EmployeeId"];
                                EmployeeObjects.ObjectId = contextObj.ObjectDetails[cnt]["ObjectId"];
                                EmpObjArr.push(EmployeeObjects);
                            }
                            contextObj.EmployeeService.saveEmployeeResourcesthroughWorkflow(JSON.stringify(EmpObjArr)).subscribe(function (resultData) {
                                contextObj._notificationService.ShowToaster("Employee Move Request sent for approval", 3);
                            });
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Employee Move Request sent for approval", 3);
                        }
                        break;
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmployeeMoveRequest.prototype, "empData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], EmployeeMoveRequest.prototype, "drawingDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmployeeMoveRequest.prototype, "IsForAssign", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmployeeMoveRequest.prototype, "SpaceDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmployeeMoveRequest.prototype, "ObjectDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmployeeMoveRequest.prototype, "DrawingId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EmployeeMoveRequest.prototype, "sumbitSuccess", void 0);
    EmployeeMoveRequest = __decorate([
        core_1.Component({
            selector: 'employeemoverequest',
            templateUrl: './app/Views/Employee/Request/employeemoverequest.component.html',
            directives: [page_component_1.PageComponent, fieldGeneration_component_1.FieldComponent],
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], EmployeeMoveRequest);
    return EmployeeMoveRequest;
}());
exports.EmployeeMoveRequest = EmployeeMoveRequest;
//# sourceMappingURL=employeemoverequest.component.js.map
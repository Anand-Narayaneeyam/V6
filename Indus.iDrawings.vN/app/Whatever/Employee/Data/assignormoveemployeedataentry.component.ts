import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import {EmployeeService} from '../../../Models/Employee/employee.services'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {EmployeeMoveRequest} from '../../employee/request/employeemoverequest.component';
import {SelectReocourceForEmployeeMove} from '../../Employee/data/selectResourcesForEmployeeMove';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
@Component({
    selector: 'assignormove-emp-dataentry',
    templateUrl: 'app/Views/Employee/Data/assignormoveemployeedataentry.component.html',
    directives: [FieldComponent, SlideComponent, SplitViewComponent, EmployeeMoveRequest, SelectReocourceForEmployeeMove],
    providers: [EmployeeService, NotificationService]

})
export class AssignOrMoveEmpDataEntry {
    @Input() action: string;
    @Input() selectedIds: any;
    @Input() selectedEmployeeData: any;
    @Output() submitSuccess = new EventEmitter();
    fieldObject: IField[];
    formId: number = 607;
    btnName: string = "Assign";
    ApprovalForEmpMoveInDrawing: boolean = false;
    ApprovalForEmpAssignInDrawing: boolean = false;
    isResoureFeatureEnabled: boolean = false;
    position = "top-right";
    showSlide = false;
    showSlideResource = false;
    splitviewObj: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    pageTitle: string = "";
    SpaceDetailsForRequest: IEmpSpaceDetails[] = [];
    employeeMoveDataInputList: SpaceAllocationForEmpDataInput[] = [];
    drawingId: number = 0;
    empDialogMessages = { "key": 0, "message": "" };
    selectedSpaceId: number = 0;
    dwgDetails: any;
    showEmployeeMoveRequestFromAssign: boolean = false; // If this is false, then aproval process for Employee move , otherwise assign
    showSecondaryViewTarget: number = 0;
    isSubmitClicked: boolean = false;
    ObjectDetailsForRequest: any;
    constructor(private empsevices: EmployeeService, private notificationservice: NotificationService, private _validateService: ValidateService) {
        var contetObj= this;
        this.empsevices.customerSubscribedFeatures("190,192,195").subscribe(function (customerSettingsData) {
            contetObj.ApprovalForEmpMoveInDrawing = customerSettingsData.Data[0]["IsSubscribed"];
            contetObj.ApprovalForEmpAssignInDrawing = customerSettingsData.Data[1]["IsSubscribed"];
            contetObj.isResoureFeatureEnabled = customerSettingsData.Data[2]["IsSubscribed"];
        });
    }
    ngOnInit() {
        var contextObj = this;
        var fieldObj = new Array<ReportFieldArray>();
        fieldObj.push({ FieldId: 221, ReportFieldId: 5090, Value: "0" });
        fieldObj.push({ FieldId: 222, ReportFieldId: 5090, Value: "0" });
        fieldObj.push({ FieldId: 223, ReportFieldId: 5090, Value: "0" });
        fieldObj.push({ FieldId: 1569, ReportFieldId: 5090, Value: "0" });
        fieldObj.push({ FieldId: 1569, ReportFieldId: 3059, Value: "0" });
        this.empsevices.getAssignOrMoveEmpFields(this.formId, fieldObj).subscribe(function (resultData) {
            contextObj.fieldObject = resultData['Data'];
        });
        if (this.action == "Move Employee")
            this.btnName = "Move";
    }
    onSubmitData(event) {     
        var contextObj = this;
        contextObj.conflictCheckAssignOrMoveBeforeSubmit(function (isSubmit) {
            contextObj.isSubmitClicked = isSubmit;
            if (contextObj.isSubmitClicked )
                contextObj.submitAfterConflictCheck();
        });
    }
    submitAfterConflictCheck() {
        if (this.action == "Assign Employee") {
            if (this.ApprovalForEmpAssignInDrawing) {
                this.empDialogMessages = { key: 1, message: "Do you want to assign employee(s) through the Approval Process?" };
                this.showSlide = true;
            } else {
                this.assignOrMoveSubmit();
            }
        } else if (this.action == "Move Employee") {
            if (this.isResoureFeatureEnabled) {
                this.checkResourceExists();
            } else {
                this.moveThroughApprovalOrNot();
            }
        }
    }
    moveThroughApprovalOrNot() {
        if (this.ApprovalForEmpMoveInDrawing) {
            this.empDialogMessages = { key: 3, message: "Do you want to execute this move through the Approval Process?" };
            this.showSlide = true;
        } else {
            this.assignOrMoveSubmit();
        }
    }
    checkResourceExists() {
        var contextObj = this;
        this.empsevices.checkResourceExistForEmployees(this.selectedEmployeeData).subscribe(function (isHasResource) {
            if (isHasResource) {
                contextObj.empDialogMessages = { key: 2, message: "Do you want to move the resources?" };
                contextObj.showSlideResource = true;
            } else {
                contextObj.moveThroughApprovalOrNot();
            }
        });
    }
    conflictCheckAssignOrMoveBeforeSubmit = function(resCallback) {
        var contextObj = this;
        var returnCode;
        var seatingCapacity;
        var returnData;
        var isSubmit: boolean = false;
        this.empsevices.checkSpaceEmployeeOccupancy(this.selectedSpaceId, this.selectedEmployeeData).subscribe(function (resultData) {
            returnData = JSON.parse(resultData["Data"].FieldBinderData)[0];
            seatingCapacity = returnData['SeatingCapacity'];
            returnCode = returnData['Return'];
            switch (returnCode) {
                case -1: contextObj.notificationServices.ShowToaster("You do not have access permission for this space.Select another Space", 5);
                    break;
                case 3: contextObj.empDialogMessages = { key: 4, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                    contextObj.showSlide = true; 
                    break;
                case 2: contextObj.notificationservice.ShowToaster("Assignable Seating Capacity of the selected Space is zero. Employee(s) cannot be placed in this Space.Select another space", 5);
                    break;
                case 4: contextObj.empDialogMessages = { key: 5, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                    contextObj.showSlide = true; 
                    break;
                case 1: isSubmit = true;
                    break;
            }
            resCallback(isSubmit);
        });
    }
    assignOrMoveSubmit() {
        var contextObj = this;
        this.showSlide = false;
        this.moveMultipleEmployeeWithOutApproval(this.selectedEmployeeData, function (updatedEmpdata) {
            if (contextObj.action == "Assign Employee")
                contextObj.notificationservice.ShowToaster("Employee(s) assigned", 3);
            else {
                contextObj.resourceMove();
                contextObj.notificationservice.ShowToaster("Employee(s) Moved", 3);
            }
            contextObj.submitSuccess.emit(updatedEmpdata);
        });
    }
    fieldChange(event: any) {

        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        var fieldValue = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var fieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        if (fieldId != 1569) {
            var ddlbuildings = contextObj.fieldObject.find(function (item) { return item.ReportFieldId == 473 })
            var ddlfloors = contextObj.fieldObject.find(function (item) { return item.ReportFieldId == 523 })
            var ddlroomno = contextObj.fieldObject.find(function (item) { return item.ReportFieldId == 888 })
            if (fieldValue != "-1") {
                var arr = new Array<ReportFieldArray>();
                arr.push({ ReportFieldId: 5090, Value: "0" });
                if (fieldLabel == "Floor") {
                    arr.push({
                        ReportFieldId: 3059,
                        Value: fieldValue
                    });
                }
                this.empsevices.loadAssignOrMoveEmpLookups(this.formId, fieldValue, fieldId, arr).subscribe(function (resultData) {
                    if (resultData["Data"]) {
                            if (fieldLabel == "Site") {
                                ddlbuildings.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                                ddlbuildings.FieldValue = "-1";
                                ddlfloors.FieldValue = "-1";
                                ddlroomno.FieldValue = "-1";
                                contextObj.setValidation(ddlbuildings);
                                contextObj.setValidation(ddlfloors);
                                contextObj.setValidation(ddlroomno);
                                ddlroomno.LookupDetails.LookupValues = [];
                                ddlfloors.LookupDetails.LookupValues = [];
                            }
                            else if (fieldLabel == "Building") {
                                ddlfloors.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                                ddlfloors.FieldValue = "-1";
                                ddlroomno.FieldValue = "-1";
                                contextObj.setValidation(ddlfloors);
                                contextObj.setValidation(ddlroomno);
                                ddlroomno.LookupDetails.LookupValues = [];
                            }
                            else if (fieldLabel == "Floor") {
                                contextObj.drawingId = fieldValue;
                                ddlroomno.LookupDetails.LookupValues = [];
                                ddlroomno.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                                ddlroomno.FieldValue = "-1";
                                contextObj.setValidation(ddlroomno);
                            }
                    }
                });
            } else {
                switch (fieldId) {
                    case 221:
                        ddlbuildings.LookupDetails.LookupValues = [];
                        ddlfloors.LookupDetails.LookupValues = [];
                        ddlroomno.LookupDetails.LookupValues = [];
                        ddlbuildings.FieldValue = "-1";
                        ddlfloors.FieldValue = "-1";
                        ddlroomno.FieldValue = "-1";
                        contextObj.setValidation(ddlbuildings);
                        contextObj.setValidation(ddlfloors);
                        contextObj.setValidation(ddlroomno);
                        break;
                    case 222:
                        ddlfloors.LookupDetails.LookupValues = [];
                        ddlroomno.LookupDetails.LookupValues = [];
                        ddlfloors.FieldValue = "-1";
                        ddlroomno.FieldValue = "-1";
                        contextObj.setValidation(ddlfloors);
                        contextObj.setValidation(ddlroomno);
                        break;
                    case 223:
                        ddlroomno.FieldValue = "-1";
                        ddlroomno.LookupDetails.LookupValues = [];
                        contextObj.setValidation(ddlroomno);
                        break;

                }
            }
        } else {
            this.selectedSpaceId = fieldValue;//contextObj.getspaceId(fieldValue);
        }
    }
    setValidation(item) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(item.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(item, contextObj, true, el);
            }, 100);
        }
    }
    getspaceId(selectedValue) {
        var LookupValues = this.fieldObject.find(function (item) { return item.ReportFieldId == 888 }).LookupDetails.LookupValues;
        return LookupValues.find(function (el) { return el.Value == selectedValue }).Id;
    }
    moveresourceListforapprovalprocess(event) {
        this.ObjectDetailsForRequest = event["Resourcedata"];
        this.splitviewObj.showSecondaryView = false;
        this.moveThroughApprovalOrNot();
    }
    sumbitSuccessSentForApprovalFromMove(event) {
        this.splitviewObj.showSecondaryView = false;
        this.submitSuccess.emit("");
    }
    okConfirm(messageKey) {
        this.showSlide = false;
        var contextObj = this;
        switch (messageKey) {
            case 1:// assign approval processs
                this.pageTitle = "Assign Request";
                this.showEmployeeMoveRequestFromAssign = true;
                this.getDrawingDetails(function (dwgdetails) {
                    contextObj.showSecondaryViewTarget = 1;
                    contextObj.getSpaceDetailsForRequest();
                    contextObj.dwgDetails = dwgdetails;
                    contextObj.splitviewObj.showSecondaryView = true;
                });
                break;
            case 3:// move approval process
                this.pageTitle = "Move Request";
                this.getDrawingDetails(function (dwgdetails) {
                    contextObj.showSecondaryViewTarget = 1;
                    contextObj.getSpaceDetailsForRequest();
                    contextObj.dwgDetails = dwgdetails;
                    contextObj.splitviewObj.showSecondaryView = true;
                });
                break;
            case 4:
            case 5: this.isSubmitClicked = true;
                this.submitAfterConflictCheck();
                break;
        }

    }
    onSplitViewClose() {
        console.log("testsplitview close")
        this.showSecondaryViewTarget = -1;
        //if (this.isSubmitClicked && this.showSecondaryViewTarget==1)
        //    this.assignOrMoveSubmit();
    }
    cancelClick(messageKey) {
        this.cancelOrCloseClick(messageKey);
    }
    closeClick(event, messageKey) {
        if (event.change == false) {
            this.cancelOrCloseClick(messageKey);
        }
    }
    cancelOrCloseClick(messageKey) {
        if (this.isSubmitClicked && this.showSlide && (messageKey == 3 || messageKey == 1)) {
                this.showSlide = false;
                this.assignOrMoveSubmit();
        }
        if (this.showSlide == true)
            this.showSlide = false;
    }
    cancelResourceClick(isChange, messageKey) {
        debugger
        if (isChange==false && messageKey == 2 && this.showSlideResource) {
            this.showSlideResource = false;
            this.moveThroughApprovalOrNot();
        } 
    }
    okResourceConfirm() {//resource employee move
        this.showSlideResource = false;
        this.showSecondaryViewTarget = 2;
        this.splitviewObj.showSecondaryView = true;
    }
    getDrawingDetails = function (resCallback) {
        var contextObj = this;
        this.empsevices.getDrawingDetails(this.drawingId, false).subscribe(function (resultData) {
            resCallback(resultData["Data"][0].SiteName + " / " + resultData["Data"][0].BuildingName + " / " + resultData["Data"][0].FloorName);
        });
    }
    getSpaceDetailsForRequest() {
        var empItem;
        for (var i = 0; i < this.selectedEmployeeData.length; i++) {
            empItem = this.selectedEmployeeData[i];
            this.SpaceDetailsForRequest.push({ drawingId: this.drawingId, employeeId: empItem["Id"], spaceId: this.selectedSpaceId,xPosition:0,yPosition:0 })
        }
    }
    moveMultipleEmployeeWithOutApproval(moveEmpDetails, resCallback) {
        this.employeeMoveDataInputList = [];
        var empItem;
        var index;
        var contextObj = this;
        for (var i = 0; i < moveEmpDetails.length; i++) {
            empItem = moveEmpDetails[i];
            this.employeeMoveDataInputList.push({ DrawingId: this.drawingId, EmployeeId: empItem['Id'], SpaceId: this.selectedSpaceId, XPosition: 0, YPosition: 0 })
        }
        this.empsevices.insertMultipleSpaceAllotmentDetails(this.employeeMoveDataInputList).subscribe(function (resultData) {
            var updatedEmpData = JSON.parse(resultData['Data']);
            resCallback(updatedEmpData);
        });

    }
    resourceMove() {
        var contextObj = this;
        if (contextObj.ObjectDetailsForRequest != undefined && contextObj.ObjectDetailsForRequest.length > 0) {
            contextObj.empsevices.submitmoveresourcedataNew(JSON.stringify(contextObj.ObjectDetailsForRequest), 0).subscribe(function (resultData) {
                if (resultData["Data"].StatusId >= 0) {
                    contextObj.notificationservice.ShowToaster("Resource for move updated", 3);
                }
            });
        }
    }
}
export interface ReportFieldArray {
    FieldId?: number;
    ReportFieldId: number;
    Value: string;
}
export interface IEmpSpaceDetails {
    drawingId: number;
    employeeId: number;
    spaceId: number;
    xPosition: number;
    yPosition: number;
}
export interface SpaceAllocationForEmpDataInput {

    DrawingId: number;
    EmployeeId: number;
    XPosition: number;
    YPosition: number;
    SpaceId: number;

}
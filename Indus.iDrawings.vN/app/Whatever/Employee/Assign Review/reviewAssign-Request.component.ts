import { Component, Output, EventEmitter, Input, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { EmployeeService } from '../../../Models/Employee/employee.services';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField } from '../../../Framework/Models//Interface/IField'
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';

@Component({
    selector: 'review-AssignRequest',
    templateUrl: 'app/Views/Employee/Assign Review/reviewAssign-Request.component.html',
    providers: [EmployeeService, NotificationService, ValidateService],
    directives: [FieldComponent, Notification, SplitViewComponent, GridComponent],
    inputs: ['inputItems', 'action', 'fieldDetailsAdd', 'btnName', 'linkArray', 'outComeData', 'employeeitemsSource', 'employeeDetailsfieldObject'],
    encapsulation: ViewEncapsulation.None
})

export class ReviewAssignRequestComponent implements OnInit, AfterViewInit {
    @Output() linkClick = new EventEmitter();
    @Output() submitClick = new EventEmitter();

    dataKey: string = "RequestId";
    inputItems: IGrid;
    linkArray: any;
    workFlowActionPointId: number = 0;
    outComeId: number = 0;
    entityCategoryId: number = 11;
    outComeData: any[];
    employeeData: any[];
    outcomeTypeId: number = 0;
    statusId: number;
    allowSubmit: boolean = true;
    btnName: string = "Save";
    action: string;
    fieldDetailsAdd: IField[];

    employeeitemsSource: any[];
    employeeDetailsinputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: '', sortCol: '' };
    employeeDetailsfieldObject: IField[];

    constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private _validateService: ValidateService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    public onSubmitData(event) {
        debugger;
        if (this.allowSubmit) {
            var contextObj = this;
            var fieldObject = JSON.parse(event["fieldobject"]);

            fieldObject = JSON.stringify(contextObj.updateFieldObject(fieldObject));
            this.submitClick.emit({
                fieldObject: fieldObject,
                action: contextObj.action,
                employeeDetails: contextObj.getEmployeeDetails()
            });
            this.allowSubmit = false;
        }
    }


    public updateFieldObject(fieldObjectArray) {
        var contextObj = this;
        var actionPoint: any;
        var prvComments: any;
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 12254: /*Action Point User*/
                    actionPoint = item;
                    break;
                case 1478:  /*Previous Review Comments*/
                    prvComments = item;
                    break;
            }
        });
        /******** deletes the action point and previous comments item*********/
        var index = fieldObjectArray.indexOf(actionPoint);
        if (index > -1) {
            fieldObjectArray.splice(index, 1);
        }
        index = fieldObjectArray.indexOf(prvComments);
        if (index > -1) {
            fieldObjectArray.splice(index, 1);
        }
        /***********************************************************************/
        var actionPointField: IField = contextObj.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 12254;
        });
        if (actionPointField.MultiFieldValues != null) {
            for (var item of actionPointField.MultiFieldValues) {
                fieldObjectArray.push({
                    ReportFieldId: 12254,
                    Value: item
                });
            }
        }

        var selectedOutCome = contextObj.outComeData.find(function (item) { return item.OutcomeTypeId === contextObj.outcomeTypeId });
        var selectedOutCome = contextObj.outComeData.find(function (item) { return item.OutcomeTypeId === contextObj.outcomeTypeId });
        var statusId = 0;
        if (contextObj.outcomeTypeId == 9) /*Reject*/
            statusId = 17;
        else if (contextObj.outcomeTypeId == 14) /*Approve*/
            statusId = 27;

        fieldObjectArray.push(
            {
                ReportFieldId: 7457,
                Value: statusId
            },
            {
                ReportFieldId: 5988,
                Value: selectedOutCome ? selectedOutCome.Value : ""
            },
            {
                ReportFieldId: 5827,
                Value: contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"]
            },
            {
                ReportFieldId: 6561,
                Value: contextObj.entityCategoryId
            },
            {
                ReportFieldId: 5859,
                Value: contextObj.inputItems.rowData["WorkFlowEntityId"]
            })

        return fieldObjectArray;
    }

    public getEmployeeDetails() {
        var employeeDetails: IEmployeeDetails[] = [];
        if (this.outcomeTypeId == 14) {
            if (this.employeeitemsSource && this.employeeitemsSource.length > 0) {
                for (var employee of this.employeeitemsSource) {
                    employeeDetails.push(
                        {
                            EmployeeId: employee["EmployeeId"],
                            TargetSpaceId: employee["TargetSpaceId"],
                            TargetDrawingId: employee["TargetDrawingId"],
                            TargetXPosition: employee["TargetXPosition"],
                            TargetYPosition: employee["TargetYPosition"],
                        }
                    )
                }
            }
        }

        return employeeDetails.length > 0 ? JSON.stringify(employeeDetails) : "";
    }

    public onDropDownChange(event: IField) {
        var contextObj = this;
        switch (event.FieldId) {
            case 1255:  /*Action*/
                var actionUser: IField = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1488
                });
                var reviewComments: IField = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.ReportFieldId === 5978
                });
                if (event.FieldValue == "-1") {
                    actionUser.IsVisible = false;
                    actionUser.IsMandatory = false;
                    actionUser.HasValidationError = false;
                    contextObj.initiateValidation(actionUser);
                    actionUser.LookupDetails.LookupValues = [];
                    actionUser.MultiFieldValues = [];
                    contextObj.outcomeTypeId = 0;
                    reviewComments.FieldValue = "";
                    contextObj.initiateValidation(reviewComments);
                    return;
                }
                var workType = contextObj.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 1870;
                })

                contextObj.outComeId = parseInt(event.FieldValue);
                contextObj.getActionPointUserLookupValues(workType.FieldValue);

                var outComeDetails = contextObj.outComeData.find(function (item) {
                    return item.Id === parseInt(event.FieldValue);
                });

                reviewComments.FieldValue = outComeDetails.Value;
                contextObj.initiateValidation(reviewComments);
                contextObj.outcomeTypeId = outComeDetails.OutcomeTypeId;
                break;
        }
    }


    public getActionPointUserLookupValues(workTypeId: any) {
        var contextObj = this;
        contextObj.employeeService.getActionPointUserLookupValues(contextObj.outComeId, parseInt(workTypeId), 5, contextObj.entityCategoryId).subscribe(function (resultData) {
            var actionUser: IField = contextObj.fieldDetailsAdd.find(function (item) {
                return item.FieldId === 1488
            });
            if (resultData["FieldBinderData"] != "[]") {
                var lookUpArray = JSON.parse(resultData["FieldBinderData"]);
                actionUser.LookupDetails.LookupValues = lookUpArray;
                actionUser.IsVisible = true;
                actionUser.IsMandatory = true;
                actionUser.FieldLabel = "Next Action Point User(s)";
            } else {
                actionUser.IsVisible = false;
                actionUser.IsMandatory = false;
                actionUser.HasValidationError = false;
                contextObj.initiateValidation(actionUser);
                actionUser.LookupDetails.LookupValues = [];
                actionUser.MultiFieldValues = [];
            }
        });
    }

    public onLinkClick() {
        this.linkClick.emit(null);
    }

    public initiateValidation(fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    }

    public onEmployeeDetailsSort() {

    }
}

interface IEmployeeDetails {
    EmployeeId: number;
    TargetSpaceId: number;
    TargetDrawingId: number;
    TargetXPosition: number;
    TargetYPosition: number;
}
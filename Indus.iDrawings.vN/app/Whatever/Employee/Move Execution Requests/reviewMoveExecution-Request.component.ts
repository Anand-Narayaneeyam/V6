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

@Component({
    selector: 'review-MoveExecution',
    templateUrl: 'app/Views/Employee/Move Execution Requests/reviewMoveExecution-Request.component.html',
    providers: [EmployeeService, NotificationService, ValidateService],
    directives: [FieldComponent, Notification, SplitViewComponent],
    inputs: ['inputItems', 'action', 'fieldDetailsAdd', 'btnName', 'linkArray', 'outComeData', 'employeeData'],
    encapsulation: ViewEncapsulation.None
})

export class ReviewMoveExecutionComponent implements OnInit, AfterViewInit {
    @Output() linkClick = new EventEmitter();
    @Output() submitClick = new EventEmitter();

    dataKey: string = "RequestId";
    inputItems: IGrid;
    linkArray: any;
    workFlowActionPointId: number = 0;
    outComeId: number = 0;
    entityCategoryId: number = 20;
    outComeData: any[];
    employeeData: any[];
    outcomeTypeId: number = 0;
    statusId: number;
    allowSubmit: boolean = true;
    btnName: string = "Save";
    action: string;
    fieldDetailsAdd: IField[];

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

            if (!contextObj.isTimeSpentValid()) {
                return;
            }

            fieldObject = JSON.stringify(contextObj.updateFieldObject(fieldObject));
            this.submitClick.emit({
                fieldObject: fieldObject,
                action: contextObj.action,
            });
            this.allowSubmit = false;
        }
    }

    public isTimeSpentValid() {
        var timeSpentField = this.fieldDetailsAdd.find(function (item) {
            return item.ReportFieldId === 7521;
        });

        if (timeSpentField.IsVisible && parseFloat(timeSpentField.FieldValue) <= 0.00) {
            this.notificationService.ShowToaster('Time spent (Hours) must be greater than zero', 2);
            return false;
        }
        return true;
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
                case 6561:  /*EntityCategoryId*/
                    item.Value = contextObj.entityCategoryId;
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
        var statusId = 0;
        if (contextObj.outcomeTypeId == 16) /*Discarded*/
            statusId = 28;
        else if (contextObj.outcomeTypeId == 30) /*Executed*/
            statusId = 29;

        var selectedOutCome = contextObj.outComeData.find(function (item) { return item.OutcomeTypeId === contextObj.outcomeTypeId });

        fieldObjectArray.push(
            {
                ReportFieldId: 12291,
                Value: statusId
            },
            {
                ReportFieldId: 12258,
                Value: contextObj.outcomeTypeId
            },
            {
                ReportFieldId: 5988,
                Value: selectedOutCome ? selectedOutCome.Value : ""
            },
            {
                ReportFieldId: 5827,
                Value: contextObj.inputItems.rowData["CurrentWorkFlowActionPointId"]
            })

        return fieldObjectArray;
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

}
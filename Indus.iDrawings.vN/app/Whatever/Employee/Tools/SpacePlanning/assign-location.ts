import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField} from  '../../../../Framework/Models/Interface/IField'
import { EmployeeService } from '../../../../Models/Employee/employee.services';

@Component({
    selector: 'assign-location',
    templateUrl: 'app/Views/Employee/Tools/SpacePlanning/assign-location.html',
    directives: [FieldComponent],
    providers: [EmployeeService, NotificationService],
    inputs: ['selectedIds', 'action', 'fieldDetailsAssign', 'btnName', 'stackplanDetailsRowData', 'dateRequested','dateToComplete']
})

export class AssignLocationComponent {
    success: any;
    dataKey: string = "Id";
    fieldDetailsAssign: IField[];
    stackplanDetailsRowData:any
    selectedIds: string;
    drawingId: any = 0;
    dateRequested: any;
    dateToComplete: any
    roomNo: number;
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();

    constructor(private employeeService: EmployeeService, private notificationService: NotificationService) {
    }

    onSubmitData(event) {
        var contextObj = this;
        switch (this.action) {
            case "edit":
                this.postSubmitUpdateLocation(contextObj, event["fieldobject"]);
                break;
            case "assign":
                this.postSubmitAssignLocation(contextObj, event["fieldobject"]);
                break;
        }
    }

    //private expiryActivationDateChange(event) {
    //    debugger
    //    var dateChangeField = event["dateChangeObject"]["FieldObject"];
    //    var dateRequestedFieldObj = this.fieldDetailsAssign.filter(function (item) { return item.ReportFieldId == 897; })
    //    var dateToCompleteFieldObj = this.fieldDetailsAssign.filter(function (item) { return item.ReportFieldId == 898; })
    //    var dateRequested = new Date(dateRequestedFieldObj[0].FieldValue);
    //    var dateToComplete = new Date(dateToCompleteFieldObj[0].FieldValue);
    //    var selectedDate = new Date(dateChangeField["FieldValue"]);

    //    if (selectedDate < dateRequested) {
    //        this.setFormInvalid(889);
    //        this.notificationService.ShowToaster("Date to Perform must be same or greater than the Date of Request", 2);
    //    }
    //    else if (selectedDate > dateToComplete) {
    //        this.setFormInvalid(889);
    //        this.notificationService.ShowToaster("Date to Perform must be same or less than the Date to Complete", 2);
    //    }
    //}

    //private setFormInvalid(rptFieldId) {
    //    this.fieldDetailsAssign.find(function (item) {
    //        if (item.ReportFieldId == rptFieldId) {
    //            item.HasValidationError = true;
    //            return true;
    //        } else
    //            return false;
    //    });
    //}


    postSubmitAssignLocation(contextObj, pageDetails: string) {
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        var dateToPerform;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 884) {
                arr[i].Value = contextObj.selectedIds[0];
            }
            else if (arr[i].ReportFieldId == 889) {
                dateToPerform = new Date(arr[i].Value);
            }
            else if (arr[i].ReportFieldId == 523) {
                this.drawingId = arr[i].Value;
            }
        }

        for (let i = 1; i < contextObj.selectedIds.length; i++) {
            arr.push({ ReportFieldId: 884, Value: contextObj.selectedIds[i] });
        }
        
        arr.push({ ReportFieldId: 3059, Value: this.drawingId });
        if (dateToPerform != null && dateToPerform != "") {
            if (dateToPerform < new Date(this.dateRequested)) {
                this.notificationService.ShowToaster("Date to Perform must be same or greater than the Date of Request", 2);
                return;
            }
            else if (dateToPerform > new Date(this.dateToComplete)) {
                this.notificationService.ShowToaster("Date to Perform must be same or less than the Date to Complete", 2);
                return;
            }
        }

        this.employeeService.postSubmitAssignLocation(JSON.stringify(arr)).subscribe(function (resultData) {

            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("Move Details failed", 5);
                    contextObj.submitSuccess.emit({ status: "Failure", returnData: contextObj.success.Data });

                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Move Details updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });

                    break;
            }
        });
    }

    postSubmitUpdateLocation(contextObj, pageDetails: string) {
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        this.drawingId = this.stackplanDetailsRowData["ScheduledDrawingId"]
        var dateToPerform;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 889) {
                dateToPerform = new Date(arr[i].Value);
            }
        }
        arr.push({ ReportFieldId: 3059, Value: this.drawingId });
        if (dateToPerform != null && dateToPerform != "") {
            if (dateToPerform < new Date(this.dateRequested)) {
                this.notificationService.ShowToaster("Date to Perform must be same or greater than the Date of Request", 2);
                return;
            }
            else if (dateToPerform > new Date(this.dateToComplete)) {
                this.notificationService.ShowToaster("Date to Perform must be same or less than the Date to Complete", 2);
                return;
            }
        }
        this.employeeService.postSubmitUpdateLocation(JSON.stringify(arr), contextObj.selectedIds[0]).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("Move Details failed", 5);
                    contextObj.submitSuccess.emit({ status: "Failure", returnData: contextObj.success.Data });

                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Move Details updated", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });

                    break;
            }
        });
    }

    fieldChange(event: any) {
        
        var contextObj = this;
        var fieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        var fieldValue = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var fieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];

        var arr = new Array<ReportFieldArray>();
        arr.push({ ReportFieldId: 5090, Value: "0" });
        if (fieldLabel == "Floor") {
            this.drawingId = fieldValue;
            arr.push({
                ReportFieldId: 3059,
                Value: fieldValue
            });
        }
    
        this.employeeService.loadAssignLocationLookups(fieldValue, fieldId, arr).subscribe(function (resultData) {
            var ddlbuildings = contextObj.fieldDetailsAssign.find(function (item) { return item.ReportFieldId == 473 })
            var ddlfloors = contextObj.fieldDetailsAssign.find(function (item) { return item.ReportFieldId == 523 })
            var ddlroomno = contextObj.fieldDetailsAssign.find(function (item) { return item.ReportFieldId == 888 })

            if (resultData["Data"]) {
                if (resultData["Data"]["LookupValues"] != "") {
                    if (fieldLabel == "Site") {
                        ddlbuildings.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                        ddlbuildings.FieldValue = "-1";
                        ddlfloors.FieldValue = "-1";
                        ddlroomno.FieldValue = "-1";
                    }
                    else if (fieldLabel == "Building") {
                        ddlfloors.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                        ddlfloors.FieldValue = "-1";
                        ddlroomno.FieldValue = "-1";
                    }
                    else if (fieldLabel == "Floor") {
                        ddlroomno.LookupDetails.LookupValues = resultData["Data"]["LookupValues"]
                        ddlroomno.FieldValue = "-1";
                    }
                }
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
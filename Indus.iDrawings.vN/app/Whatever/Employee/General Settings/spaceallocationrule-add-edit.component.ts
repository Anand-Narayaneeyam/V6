import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EmployeeService } from '../../../Models/Employee/employee.services';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField } from '../../../Framework/Models//Interface/IField'
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { ButtonComponent } from '../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component'

@Component({
    selector: 'spaceallocationrule-add-edit',
    templateUrl: 'app/Views/Employee/General Settings/spaceallocationrule-add-edt.component.html',
    providers: [EmployeeService, NotificationService],
    directives: [FieldComponent, Notification, DropDownListComponent, ButtonComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class spaceallocationruleaddeditComponent {
    dataKey: string = "Id";
    @Input() add: boolean;
    @Input() rowData: any;
    selectedId: number;
    retItem: IField;
    fieldDetailsAdd: IField[];
    fieldDetailsAdd1: IField[];
    @Output() submitSuccess = new EventEmitter();
    pagePath: string = "";

    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService) { }

    ngOnInit(): void {
        var contextObj = this;
        this.pagePath = "Employee / General Settings / Space Type";
        this.employeeService.loadSpaceAllocationruleAddEdit(0, 1).subscribe(function (result) {
            contextObj.fieldDetailsAdd1 = result["Data"];
            if (contextObj.add == false)
            {
                contextObj.fieldDetailsAdd1[0].FieldValue = contextObj.rowData["GradeId"];
                contextObj.fieldDetailsAdd1[0].IsEnabled = false;
                contextObj.fieldDetailsAdd1[1].FieldValue = contextObj.rowData["SpaceAllocationRuleId"];
            }
            contextObj.fieldDetailsAdd1[0].IsValidated = true;
            contextObj.fieldDetailsAdd1[1].IsValidated = true;
        });
    }




    submitSpaceAllocationtoGrade() {
        var contextObj = this;
        var reportfieldIdArray = new Array<ReportFieldArray>();
        if (contextObj.fieldDetailsAdd1[0].HasValidationError == true)
        {
            contextObj._notificationService.ShowToaster("Select Grade", 2);
            return;
        }
        if (contextObj.fieldDetailsAdd1[1].HasValidationError == true) {
            contextObj._notificationService.ShowToaster("Select Space Type", 2);
            return;
        }
        reportfieldIdArray.push({
            ReportFieldId: 5091,
            Value: contextObj.fieldDetailsAdd1[0].FieldValue,
        });
        reportfieldIdArray.push({
            ReportFieldId: 5090,
            Value: contextObj.fieldDetailsAdd1[1].FieldValue,
        });
        contextObj.employeeService.AddUpdateGradestospaceallocation(reportfieldIdArray, this.add).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (contextObj.add) {
                        contextObj.submitSuccess.emit({ Grade: contextObj.fieldDetailsAdd1[0].FieldValue, Space: contextObj.fieldDetailsAdd1[1].FieldValue })
                        contextObj._notificationService.ShowToaster("Space Allocation Rule added", 3);
                    }
                    else {
                        contextObj.submitSuccess.emit(contextObj.fieldDetailsAdd1[1])
                        contextObj._notificationService.ShowToaster("Space Allocation Rule updated", 3);
                    }
                    //contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Space Type for the selected Grade already exists", 5);
                        setTimeout(function () {
                            var el = <HTMLElement>document.getElementById("1012");

                            if (el != null && el != undefined) {
                                el.focus();
                            }
                        }, 100);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Unknown problem", 1);
                    }
                    break;
            }
        });
    }

    onSubmit(event: any)
    {

    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
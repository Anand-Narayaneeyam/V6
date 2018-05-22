import {Component, Output, OnInit, SimpleChange, OnChanges, EventEmitter} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../../Framework/Models//Interface/IField'
import {EmployeeService} from '../../../../Models/Employee/employee.services'


@Component({
    selector: 'spacePlanning-addedit',
    templateUrl: 'app/Views/Employee/Tools/SpacePlanning/spacePlanningAddEdit.html',
    providers: [EmployeeService, NotificationService],
    directives: [FieldComponent],
    inputs: ['addEdit','selectedId']

})

export class SpacePlanningAddEditComponent  {

    @Output() submitSuccess = new EventEmitter();
    addEdit: string;
    btnName: string;
    fieldDetailsSpacePlanning: IField[];
    selectedId: number;
    success: any;
    isSubmit = true;
    ngOnInit() {
        if (this.addEdit == "add")
            this.btnName = "Save"
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes"
    }
    onSubmitData(event: any) {
        if (this.isSubmit == true) {
            var contextObj = this;
            if (this.addEdit == "add") {
                var temp = JSON.parse(event["fieldobject"]);
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i]["ReportFieldId"] == 899)
                        temp[i]["Value"] = "1"
                    else if (temp[i]["ReportFieldId"] == 5085)
                        temp[i]["Value"] = "1"
                    else if (temp[i]["ReportFieldId"] == 893)
                        temp[i]["Value"] = "0"

                }
                // event["fieldobject"] = JSON.stringify(temp);
                this.employeeService.submitAddSpacePlanningProject(JSON.stringify(temp)).subscribe(function (resultData) {
                    contextObj.success = (resultData["Data"]);
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Space Planning Project added", 3);
                        contextObj.submitSuccess.emit({ success: "success", returnData: resultData["Data"].Data });
                    }
                    else if (contextObj.success["StatusId"] == 0) {
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        // contextObj.itemsSource.pop();
                    }
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == 0) {
                            contextObj._notificationService.ShowToaster("Project Name already exists", 5);
                        }
                    }
                })
            }
            else if (this.addEdit == "edit") {

                var temp = JSON.parse(event["fieldobject"]);
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i]["ReportFieldId"] == 899)
                        temp[i]["Value"] = "1"
                    else if (temp[i]["ReportFieldId"] == 5085)
                        temp[i]["Value"] = "1"
                    //else if (temp[i]["ReportFieldId"] == 893)
                    //    temp[i]["Value"] = this.selectedId
                }
                // event["fieldobject"] = JSON.stringify(temp);
                this.employeeService.submitEditSpacePlanningProject(JSON.stringify(temp), this.selectedId).subscribe(function (resultData) {
                    contextObj.success = (resultData["Data"]);
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Space Planning Project updated", 3);
                        contextObj.submitSuccess.emit({ success: "success", returnData: resultData["Data"].Data });
                    }
                    else if (contextObj.success["StatusId"] == 0) {
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        // contextObj.itemsSource.pop();
                    }
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == 0) {
                            contextObj._notificationService.ShowToaster("Project Name already exists", 5);
                        }
                    }
                })

            }
        }
    }
    constructor(private employeeService: EmployeeService, private _notificationService: NotificationService) {
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        var contextObj = this;
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save"
            this.employeeService.loadSpacePlanningAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {             
               resultData["Data"].find(function (item) {
                    if (item.FieldId === 759) {
                        item.IsVisible = false;
                        return true;
                    } else return false;
               });
                contextObj.fieldDetailsSpacePlanning = resultData["Data"];
                //status.IsVisible = false;
            })
                //resultData => this.fieldDetailsSpacePlanning = resultData["Data"])
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes"
            this.employeeService.loadSpacePlanningAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                resultData["Data"].find(function (item) {
                    if (item.FieldId === 759) {
                        item.IsVisible = false;
                        return true;
                    } else return false;
                });
                contextObj.fieldDetailsSpacePlanning = resultData["Data"];
            })
        }
    }


    private requestedDateChange(event) {
        //757 -- Date Requested
        //758 --- Date to complete
        var dateChangeField = event["dateChangeObject"].FieldObject;
        var reqDateFieldObj = this.fieldDetailsSpacePlanning.filter(function (item) { return item.FieldId === 757; })
        var completeDateFieldObj = this.fieldDetailsSpacePlanning.filter(function (item) { return item.FieldId === 758; })
        var reqDate = new Date(reqDateFieldObj[0].FieldValue);
        var completeDate = new Date(completeDateFieldObj[0].FieldValue);
        var selectedDate = new Date(dateChangeField["FieldValue"]);

        if ((dateChangeField["FieldId"] == 757) && (selectedDate > new Date())) {
            this.setFormInvalid([757],true);        
            this._notificationService.ShowToaster("'Date Requested' cannot be a future date", 5);
        } else if ((selectedDate < reqDate || reqDate > new Date()) && (dateChangeField["FieldId"] == 758) && reqDate > new Date()) {          
            this.setFormInvalid([758], true);      
            if (reqDate > new Date())
                this._notificationService.ShowToaster("'Date Requested' cannot be a future date", 5);
            else
            this._notificationService.ShowToaster("'Date to Complete' should be on or after 'Date Requested'", 5);
        } else
            this.setFormInvalid([758,757], false);                  
    }

    private setFormInvalid(fieldId, errorStatus) {
        var count = fieldId.length;
        this.isSubmit = !errorStatus;
        this.fieldDetailsSpacePlanning.find(function (item) {
            if (fieldId.indexOf(item.FieldId) > -1) {
                item.HasValidationError = errorStatus;   
                item.IsLocallyValidated = errorStatus;             
                count--;
            }
            if(count==0)
                return true;
            else               
                return false;
            
        });
    }

    private checkDateFieldValidation(fielddObj) {

    }
}

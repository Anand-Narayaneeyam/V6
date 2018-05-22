import {Component, Output, EventEmitter, Input, OnInit, DoCheck} from '@angular/core';
import { ProjectsService } from '../../../Models/Projects/projects.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'projects-add-edit',
    templateUrl: './app/Views/Projects/Projects Data/project-data-add-edit.html',
    providers: [ProjectsService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class ProjectsAddEditComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    setReminderFlag: boolean = false;
    startDateflag: boolean = false;


    ngOnInit(): void {

        if (this.action == "edit")
            this.startDateflag = true;

    }
    constructor(private projectsService: ProjectsService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }

    ngDoCheck() {
        if (this.fieldDetailsAdd) {
            var endDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1057 });
            var startDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1056 });
            if (endDate.FieldValue == "" || endDate.FieldValue == null) {
                startDate.IsMandatory = false;
                startDate.IsLocallyValidated = true;
                startDate.HasValidationError = false;

                if (startDate.IsMandatory == false && startDate.FieldValue == "" && this.startDateflag == true) {
                    var el = <HTMLElement>document.getElementById("1915"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                    if (el != null && el != undefined) {
                        el.focus();
                        el.blur();
                    }
                    this.startDateflag = false;
                }
            }
            else if (startDate.FieldValue != "" && startDate.FieldValue != null) {
                startDate.IsMandatory = false;
                startDate.IsLocallyValidated = true;
                startDate.HasValidationError = false;
            }
            else {
                startDate.IsMandatory = true;
                startDate.IsLocallyValidated = false;
                startDate.HasValidationError = true;            
            }
        }

    }

    onSubmitData(event) {

        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(strsubmitField: string, target: number) {
        var contextObj = this;
        var statusId;

        var newTemp: any[] = [];
        newTemp = JSON.parse(strsubmitField);
        for (let i = 0; i < newTemp.length; i++) {
            if (newTemp[i].ReportFieldId == 1053) {
                if (newTemp[i].Value == 46) {
                    newTemp[i].Value = 1;
                    statusId = newTemp[i].Value;
                }
                else if (newTemp[i].Value == 47) {
                    newTemp[i].Value = 2;
                    statusId = newTemp[i].Value;
                }
            }
        }

        for (let i = 0; i < newTemp.length; i++) {
            if (newTemp[i].ReportFieldId == 500237)
                newTemp[i].ReportFieldId = 1068;
            else if (newTemp[i].ReportFieldId == 500238)
                newTemp[i].ReportFieldId = 1070;          
        }

        newTemp.push({
            ReportFieldId: 1051,
            Value: 2
        });
        newTemp.push({
            ReportFieldId: 1059,
            Value: contextObj.setReminderFlag
        });
        newTemp.push({
            ReportFieldId: 1060,
            Value: 1
        });
        newTemp.push({
            ReportFieldId: 1067,
            Value: statusId
        });
        strsubmitField = JSON.stringify(newTemp);

        var startDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1056 })
        var endDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1057 })
        var strtDate = new Date(startDate.FieldValue);
        var edDate = new Date(endDate.FieldValue);
        if (strtDate > edDate) {
            contextObj._notificationService.ShowToaster('Project End Date should be on or after Project Start Date', 2);
            return
        }

        contextObj.projectsService.AddUpdateProjects(strsubmitField, this.selectedId[0], target).subscribe(function (resultData) {
            
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Project added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Project details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Project already exists", 5);
                    }
                    else if (resultData["Data"].ServerId == -2) {
                        contextObj._notificationService.ShowToaster("Project already exists", 5);
                    }
                    break;
            }
        });
    }

    chkChangeevent(event: any) {
        
        var reminderStartsFrom = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 500237 })
        var reminderInterval = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 500238 })
        if (event.chkBoxObject.IsChecked == true) {
            reminderStartsFrom.ReadOnlyMode = false;
            reminderStartsFrom.IsMandatory = true;
            reminderStartsFrom.IsLocallyValidated = false;
            reminderStartsFrom.HasValidationError = true;

            reminderInterval.IsEnabled = true;
            reminderInterval.IsMandatory = true;
            reminderInterval.IsLocallyValidated = false;
            reminderInterval.HasValidationError = true;

            this.setReminderFlag = true;
        }
        else if (event.chkBoxObject.IsChecked == false) {
            reminderStartsFrom.ReadOnlyMode = true;
            reminderStartsFrom.IsMandatory = false;
            reminderStartsFrom.IsLocallyValidated = true;
            reminderStartsFrom.HasValidationError = false;

            reminderInterval.IsEnabled = false;
            reminderInterval.IsMandatory = false;
            reminderInterval.IsLocallyValidated = true;
            reminderInterval.HasValidationError = false;

            this.setReminderFlag = false;
        }
    }

    dateChange(event: any) {
        
        var startDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1056 })
        var endDate = this.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 1057 });
        if (event.dateChangeObject.FieldObject.FieldId == 1916 && endDate.FieldValue.length > 0) {
            startDate.IsMandatory = true;
            startDate.IsLocallyValidated = false;
            startDate.HasValidationError = true;

            this.startDateflag = true;
            setTimeout(function () {
                var el = <HTMLElement>document.getElementById("1915"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                if (el != null && el != undefined) {
                    el.focus();
                    el.blur();
                }
            }, 20);
        }
        else {
            startDate.IsMandatory = false;
            startDate.IsLocallyValidated = true;
            startDate.HasValidationError = false;          

            setTimeout(function () {
                var el = <HTMLElement>document.getElementById("1915"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/

                if (el != null && el != undefined) {
                    el.focus();
                    el.blur();
                }
            }, 20);
        }
    }
}
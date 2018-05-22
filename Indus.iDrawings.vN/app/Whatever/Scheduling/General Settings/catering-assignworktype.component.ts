import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';

@Component({
    selector: 'catering-assignworktype',
    templateUrl: 'app/Views/Scheduling/General Settings/catering-assignworktype.component.html',
    providers: [SchedulingService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class CateringAssignWorkTypeComponent {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private schedulingservice: SchedulingService, private _notificationService: NotificationService) {

    }
    ngOnInit() { }
    onSubmitData(event) {
        this.postSubmit(event["fieldobject"]);
        this.submitSuccess.emit({
            value: event["fieldobject"]
        })
    }

    postSubmit(strsubmitField: string) {
        var contextObj = this;
        var reportfieldvalue = JSON.parse(strsubmitField);
        var rptFieldArray = new Array<ReportFieldArray>();
        rptFieldArray.push({
            ReportFieldId: 8755,
            Value: reportfieldvalue[1].Value == -1 ? 0 : reportfieldvalue[1].Value
        });
        strsubmitField = JSON.stringify(rptFieldArray);
        contextObj.schedulingservice.updateAssignWorkTypeEdit(strsubmitField).subscribe(function (resultData) { 
            if (resultData["Data"].Message == "Success") {
                contextObj._notificationService.ShowToaster("Work Type updated", 3);
            }
        });
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
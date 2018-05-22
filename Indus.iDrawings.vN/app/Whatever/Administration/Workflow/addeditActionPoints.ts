import {Component, Output, EventEmitter, OnInit, Input, AfterViewInit} from '@angular/core';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';

@Component({
    selector: 'actionpoints-add-edit',
    templateUrl: 'app/Views/Administration/Workflow/addeditActionPoints.html',
    directives: [FieldComponent, Notification],
    providers: [AdministrationService, NotificationService],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName']
})

export class ActionPointsAddEditComponent implements OnInit{
    success: any;
    dataKey: string = "Id";
    selectedId: number;
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();

    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService) {
    }

    ngOnInit() {
    }

    onSubmitData(event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(contextObj, reportFielIds: string, target: number) {
        this.administrationService.postSubmitActionPoints(reportFielIds, this.selectedId, target).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("Action Point already exists", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Action Point added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Action Point updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    }
                    break;
                case 3:
                        contextObj._notificationService.ShowToaster("Action Point already exists", 5);
                    break;
            }
        });
    }
}
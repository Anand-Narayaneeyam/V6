import {Component, Output, EventEmitter, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'messagetemplate-addedit',
    templateUrl: 'app/Views/Administration/General Settings/messagetemplate-addedit.html',
    providers: [AdministrationService, NotificationService],
    directives: [FieldComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'msgCategory','btnName'],
})

export class MessageTemplateAddEditComponent {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService) {
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

        contextObj.administrationService.postSubmitMessageTemplate(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Message Template added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Message Template updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Message Template already exists", 5);
                    }
                    break;
            }
        });
    }
}
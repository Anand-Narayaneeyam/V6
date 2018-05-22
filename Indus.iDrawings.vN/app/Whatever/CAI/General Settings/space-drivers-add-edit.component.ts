import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models/Interface/IField';
import { SpaceService } from '../../../Models/Space/space.service'
import { GeneralFunctions } from '../../../Models/Common/General';

@Component({
    selector: 'space-drivers-addedit',
    templateUrl: './app/Views/CAI/General Settings/space-drivers-add-edit.component.html',
    providers: [SpaceService, NotificationService, HTTP_PROVIDERS, GeneralFunctions],
    directives: [FieldComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName']
})

export class SpaceDriversAddEdit
{
    dataKey: string = "Id";    
    selectedId: number;
    retItem: IField;
    objCategoryId: any;
    @Input() action: string;
    isNamesNAN = true;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private spaceService: SpaceService, private _notificationService: NotificationService) { }

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
        contextObj.spaceService.AddEditSpaceDrivers(strsubmitField, this.selectedId, target).subscribe(function (resultData)
            {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("CAI Space Driver added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("CAI Space Driver updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("CAI Space Driver already exists", 5);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Unknown problem", 1);
                        }
                        break;
                }
            });
        }
  
}





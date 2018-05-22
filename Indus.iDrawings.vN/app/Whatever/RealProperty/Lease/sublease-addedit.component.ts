import {Component, Output, EventEmitter, Input} from '@angular/core';
import {RealPropertyService} from '../../../Models/RealProperty/realproperty.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'sublease-addedit',
    templateUrl: 'app/Views/RealProperty/Lease/sublease-addedit.component.html',
    providers: [RealPropertyService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAddEdit', 'btnName'],
})

export class SubLeaseAddEditComponent {
    success: any;
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAddEdit: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private realpropertyservice: RealPropertyService, private notificationService: NotificationService) { }

    onSubmitData(event) {         
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"]);
                break;
        }
    }

    onRadioButtonChange(event: any) {        
    }

    updateIsToRentOut(fieldObjectArray: any) {
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 5771) {
                if (item.Value == 1) {
                    item.Value = 0;
                } else {
                    item.Value = 0;
                }
            }
        });
        return JSON.stringify(fieldObjectArray);
    }

    postSubmit(strsubmitField: string) {
        var contextObj = this;        
        contextObj.realpropertyservice.submitAddUpdateSubLease(strsubmitField, this.selectedId).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Sublease added", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Sublease Identifier already exists", 5);
                    }
                    break;
            }
        });

    }
}
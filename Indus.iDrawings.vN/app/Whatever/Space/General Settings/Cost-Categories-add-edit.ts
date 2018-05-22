import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SpaceService } from '../../../Models/Space/space.service';

@Component({
    selector: 'cost-categories-add-edit',
    templateUrl: './app/Views/Scheduling/General Settings/resources-add-edit.html',
    providers: [SpaceService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class CostCategoriesAddEditComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    ngOnInit(): void {
    }
    constructor(private SpaceService: SpaceService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }
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
        contextObj.SpaceService.AddUpdateResources(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (contextObj.action == "add") {
                        contextObj._notificationService.ShowToaster("Cost Category added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Cost Category updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Cost Category Name already exists", 5);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Cost Category Code already exists", 5);
                    }
                    break;
            }
        });
    }
}
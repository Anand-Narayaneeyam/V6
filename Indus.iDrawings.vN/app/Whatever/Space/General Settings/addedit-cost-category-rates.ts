import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SpaceService } from '../../../Models/Space/space.service';

@Component({
    selector: 'add-edit-cost-category-rates',
    templateUrl: './app/Views/Space/General Settings/addedit-cost-category-rates.html',
    providers: [SpaceService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
})

export class AddEditCostCategoryRatesComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() ddlSelectedId: string;
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
        var reportFieldArray = new Array<ReportFieldArray>();
        if (strsubmitField != "") {
            reportFieldArray = JSON.parse(strsubmitField);
            for (var i = 0; i < reportFieldArray.length; i++) {
                if (reportFieldArray[i].ReportFieldId == 742) {
                    reportFieldArray[i].Value = this.ddlSelectedId
                }
            }
            contextObj.SpaceService.AddEditCostCategoryRts(JSON.stringify(reportFieldArray), this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Cost Category Rate added", 3);
                            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        }
                        else if (target == 2) {
                            contextObj._notificationService.ShowToaster("Cost Category Rate updated", 3);
                            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        }
                        break;
                    case 3:
                        contextObj._notificationService.ShowToaster("Cost Category Rate Code already exists", 5);
                        break;
                }
            });
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField } from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'areacost-details',
    templateUrl: 'app/Views/RealProperty/Lease/areacost-details.html',
    providers: [RealPropertyService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAreaCost', 'btnName', 'leaseRenewalCount','showButton'],
})

export class AreaCostDetailsComponent implements OnInit{
    dataKey: string = "Id";
    selectedId: number;
    leaseRenewalCount: any;
    @Input() action: string;
    @Input() fieldDetailsAreaCost: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private realpropertyservice: RealPropertyService, private notificationService: NotificationService) { }

    ngOnInit() {
    }

    onSubmitData(event) {
                this.postSubmit(event["fieldobject"]);
    }

    postSubmit(pageDetails: string) {
        var contextObj = this;
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 5757) {
                arr[i].Value = this.leaseRenewalCount;
            }
            if (arr[i].ReportFieldId == 5756) {
                arr[i].Value = this.selectedId.toString();
            }
            if (arr[i].ReportFieldId == 5760) {
                if (arr[i].Value == "29")
                {
                    arr[i].Value = "3";
                }
                else if (arr[i].Value == "31")
                {
                    arr[i].Value = "4";
                }
            }
        }
        this.realpropertyservice.submitAreaCostDetails(JSON.stringify(arr)).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Area and Cost details saved", 3);
                    contextObj.submitSuccess.emit({ status: "success"});
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
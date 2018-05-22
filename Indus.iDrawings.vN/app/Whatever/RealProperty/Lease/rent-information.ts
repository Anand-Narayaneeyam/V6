import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { IField } from '../../../Framework/Models//Interface/IField'

@Component({
    selector: 'rent-information',
    templateUrl: 'app/Views/RealProperty/Lease/rent-information.html',
    providers: [RealPropertyService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'fieldDetailsRentInfo', 'btnName', 'annualBaseRent', 'showButton', 'leaseRenewalCount','rentCommenceDate'],
})

export class RentInformationComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: number;
    @Input() fieldDetailsRentInfo: IField[];
    @Output() submitSuccess = new EventEmitter();
    leaseRenewalCount: number;
    rentCommenceDate: any;

    constructor(private realpropertyservice: RealPropertyService, private notificationService: NotificationService) { }

    ngOnInit() {      
    }

    onSubmitData(event) {
    this.postSubmit(event["fieldobject"]); 
    }

    postSubmit(submitdata) {
       
        debugger
        var contextObj = this;
        var arr = new Array<ReportFieldArray>();
        var toPay = "0"; 
        var selId: any;
        var radionBtn: any;
        var d1: any;
        var d2: any;
        var d3: any;
        var d4: any;
        var dueDate;

        var data = JSON.parse(submitdata);
        data.find(function (item) {
            switch (item.ReportFieldId) {
                case 5756: 
                    selId = item;
                    break;
                case 6240:
                    radionBtn = item;
                    if (item.Value == "44") {
                        toPay = "0"; 
                    }
                    else if (item.Value == "45") {
                        toPay = "1"; 
                    }
                    break;
                case 5770:
                    d1 = item;
                    break;
                case 5758:
                    d2 = item;
                    break;
                case 5708:
                    d3 = item;
                    break;
                case 5763:
                    d4 = item;
                    break;
                case 5762:
                    dueDate = new Date(item.Value);
                    break;

            }
        });   

        var index = data.indexOf(selId);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(radionBtn);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d1);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d2);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d3);
        if (index > -1) {
            data.splice(index, 1);
        }
        index = data.indexOf(d4);
        if (index > -1) {
            data.splice(index, 1);
        }

        data.push({
            ReportFieldId: 5757,
            Value: contextObj.leaseRenewalCount.toString()
        });
        data.push({
            ReportFieldId: 5756,
            Value: contextObj.selectedId.toString()
        });
        data.push({
            ReportFieldId: 6240,
            Value: toPay.toString()
        });

        var rentCommence = new Date(this.rentCommenceDate);

        if (dueDate > rentCommence) {
            this.realpropertyservice.submitRentInfoDetails(JSON.stringify(data)).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("Rent Informataion saved", 3);
                        contextObj.submitSuccess.emit({ status: "success" });
                }
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Due Date should be greater than Rent Commencement Date ( " + this.rentCommenceDate + " )", 2);
            return;
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
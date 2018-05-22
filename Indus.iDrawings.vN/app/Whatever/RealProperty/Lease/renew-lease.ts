import { Component, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField } from '../../../Framework/Models//Interface/IField';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'

@Component({
    selector: 'renew-lease',
    templateUrl: './app/Views/RealProperty/Lease/renew-lease.html',
    directives: [FieldComponent, Notification],
    providers: [RealPropertyService, NotificationService],
    inputs: ['action', 'fieldDetailsRenew', 'btnName', 'leaseId', 'leaseRenewalCount','leaseExpiryDate']
})

export class RenewLeaseComponent implements AfterViewInit {
    success: any;
    dataKey: string = "LeaseId";
    fieldDetailsRenew: IField[];
    leaseId: any;
    leaseRenewalCount: any;
    @Input() action: string;
    @Output() submitSuccess = new EventEmitter();
    leaseExpiryDate: any;
    renewleaseExecutionDate: any;
    renewleaseCommencementDate: any;
    renewrentCommencementDate: any;
    renewleaseExpiryDate: any;

    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService) {
    }

    ngAfterViewInit() {
    }

    onSubmitData(event) {
        var contextObj = this;
        switch (this.action) {
            case "add":               
                this.postSubmit(this.updateFieldValuesForSubmit(JSON.parse(event["fieldobject"])));
                break;
        }
    }

      updateFieldValuesForSubmit(fieldObjectArray: any) {
        var contextObj = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 5771) {   //IsToRentOut
                if (item.Value == 1) {
                    item.Value = 0;
                } else {
                    item.Value = 1;
                }
            } else if (item.ReportFieldId == 5779) {   //Can be Renewed
                if (item.Value === "true") {
                    item.Value = 1;
                } else {
                    item.Value = 0;
                }
            } else if (item.ReportFieldId == 5778) {   //Can be SubLeased
                if (item.Value === "true") {
                    item.Value = 1;
                } else {
                    item.Value = 0;
                }
                item.IsVisible = false; // temporary hidden 
            } else if (item.ReportFieldId == 5697) {
                contextObj.renewleaseExecutionDate = new Date(item.Value);
            } else if (item.ReportFieldId == 5695) {
                contextObj.renewleaseCommencementDate = new Date(item.Value);
            } else if (item.ReportFieldId == 5698) {
                contextObj.renewrentCommencementDate = new Date(item.Value);
            } else if (item.ReportFieldId == 5696) {
                contextObj.renewleaseExpiryDate = new Date(item.Value);
            }
        });
        return JSON.stringify(fieldObjectArray);
    }


      postSubmit(pageDetails: string) {
        var contextObj = this;

        if (contextObj.renewleaseExecutionDate > contextObj.renewleaseCommencementDate) {
            contextObj.notificationService.ShowToaster("Lease Commencement Date should be greater than or equal to Lease Execution Date", 2);
            return;
        }
        if (contextObj.renewleaseCommencementDate > contextObj.renewrentCommencementDate) {
            contextObj.notificationService.ShowToaster("Rent Commencement Date should be greater than or equal to Lease Commencement Date", 2);
            return;
        }

        if (new Date(contextObj.leaseExpiryDate) >= contextObj.renewleaseCommencementDate) {
            contextObj.notificationService.ShowToaster("Lease Commencement Date should be greater than '"+ contextObj.leaseExpiryDate +"'", 2);
            return;
        }

        if (contextObj.renewrentCommencementDate >= contextObj.renewleaseExpiryDate) {
            contextObj.notificationService.ShowToaster("Lease Expiry Date should be greater than Rent Commencement Date", 2);
            return;
        }
        if (contextObj.renewleaseExpiryDate <= new Date()) {
            contextObj.notificationService.ShowToaster("Lease Expiry Date should be a future date", 2);
            return;
        }
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        arr.push(
            {
                ReportFieldId: 5693,
                Value: this.leaseId
            },
            {
                ReportFieldId: 5694,
                Value: this.leaseRenewalCount
            }
        )
        this.realPropertyService.postSubmitRenewLease(JSON.stringify(arr)).subscribe(function (resultData) {
            contextObj.success = resultData["Data"];
            switch (resultData["Data"].StatusId) {
                case 1:
                    contextObj.notificationService.ShowToaster("Lease renewed", 3);
                    contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success.Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Already exists", 4);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Action Failure", 5);
                    }
                    break;
            }
        });
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
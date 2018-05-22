import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {RealPropertyService} from '../../../Models/RealProperty/realproperty.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'


@Component({
    selector: 'landloards-tenants-addedit',
    templateUrl: 'app/Views/RealProperty/GeneralSettings/landloards-tenants-addedit.component.html',
    providers: [RealPropertyService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName','categorytype'],
   // styleUrls: ['app/Views/Administration/Drawing Settings/plotstyleadd.component.css']

})

export class LandlordsTenantsAddEditComponent {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    categorytype: any = 0;
    categoryname: string = "Landlord ";

    constructor(private realpropertyservice: RealPropertyService, private _notificationService: NotificationService) {
   
    }

    ngOnInit(){
        if (this.categorytype == 1)//Landlords
        {
            //For showing messages
            this.categoryname = "Landlord";
        }
        else {//Tenants
            this.categoryname = "Tenant";
        }
    }

    onSubmitData(event) {
       
        switch (this.action) {
            case "add":
                this.postSubmit(this.updateclientcategory(event["fieldobject"]), 1);
                break;
            case "edit":
                this.postSubmit(this.updateclientcategory(event["fieldobject"]), 2);
                break;
        }
    }

    updateclientcategory(fieldobject:any)
    {
        var fieldObjectArray = JSON.parse(fieldobject);
        fieldObjectArray = this.findData(fieldObjectArray);
        return JSON.stringify(fieldObjectArray);
    }

    postSubmit(strsubmitField: string, target: number) {
        debugger;
        var contextObj = this;
        var tempData = JSON.parse(strsubmitField);
        tempData.push({
            ReportFieldId: 271,
            Value: 30
        });
        contextObj.realpropertyservice.AddUpdateClients(JSON.stringify(tempData), this.selectedId, target, this.categorytype).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster(contextObj.categoryname +" added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster(contextObj.categoryname +" details updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: contextObj.updateFieldLabel(resultData["Data"].Data) });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster(contextObj.categoryname + " already exists", 5);
                    } else if (resultData["Data"].ServerId == -5) {
                        contextObj._notificationService.ShowToaster("Email Domain not added in iDrawings", 5);
                    }
                    break;
            }


        });

    }

    updateFieldLabel(fieldObject: any) {
        var obj = JSON.parse(fieldObject)[0];
        if (this.categorytype == 1) {
            obj['Landlord Name'] = obj.Name;
        } else {
            obj['Tenant Name'] = obj.Name;
        }

        delete (obj.Name);
        return JSON.stringify([obj]);
    }

    findData(fieldObjectArray) {       
        var contextObject = this;
        fieldObjectArray.find(function (item) {
            if (item.ReportFieldId == 6140) {
                item.Value = contextObject.categorytype;
            }
           
        });
        return fieldObjectArray;
    }

}
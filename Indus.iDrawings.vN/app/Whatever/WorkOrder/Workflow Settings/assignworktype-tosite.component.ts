import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../Framework/Models//Interface/IField'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { WorkOrdereService } from '../../../models/workorder/workorder.service';

@Component({
    selector: 'assignworktype-tosite',
    templateUrl: 'app/Views/WorkOrder/Workflow Settings/assignworktype-tosite.component.html',
    providers: [NotificationService, GeneralFunctions, WorkOrdereService, HTTP_PROVIDERS],
    directives: [FieldComponent, Notification]

})

export class AssignWorkTypeToSite {

    fieldObjectAssignWorkType: IField[];
    btnName: string = "";
    lstWorkType: any;

    constructor(private notificationservice: NotificationService, private workorderservice: WorkOrdereService) { }

    ngOnInit() {
        var contextObj = this;
        contextObj.btnName = "Save";
        debugger;
        this.workorderservice.loadAssignWorkTypestoSiteDetails().subscribe(function (resultData) {
            debugger;
            contextObj.fieldObjectAssignWorkType = resultData["Data"];
            contextObj.lstWorkType = contextObj.fieldObjectAssignWorkType.find(function (item) {
                return item.FieldId === 2842;
            });
            contextObj.lstWorkType.IsVisible = false;
            if (resultData["Data"].length == 0)
            contextObj.notificationservice.ShowToaster("No Sites exist", 2);            
        });
    }

    lbSelectAllChange() {
        var contextObj = this;
        var arr = new Array();
        if (contextObj.lstWorkType.MultiFieldValues.length == 0) {
            var lookups = contextObj.lstWorkType["LookupDetails"]["LookupValues"];

            for (var i = 0; i < lookups.length; i++) {
                if (lookups[i]["IsDisabled"] == true)
                    arr.push(lookups[i]["Id"].toString())
            }
            contextObj.lstWorkType.MultiFieldValues = arr;
        }
    }

    onDropDownChange(event: any) {
        debugger;
        var contextObj = this;
        var siteFieldId = event["FieldId"];  
        var siteId = event["FieldValue"];  
        contextObj.lstWorkType.MultiFieldValues = null;
        if (siteId > -1 && siteFieldId == 2841) {
            contextObj.lstWorkType.IsVisible = true;
            var arrList = new Array();
            arrList.push(
                {
                    ReportFieldId: 12499,
                    Value: siteId.toString()
                }
            );
            contextObj.workorderservice.loadWorkTypesforSite(51209, JSON.stringify(arrList)).subscribe(function (resultData) {
                debugger;
                if (resultData["Data"] != "[]") {
                    var Values = JSON.parse(resultData["Data"]);
                    contextObj.lstWorkType.LookupDetails.LookupValues = Values;                    
                    var arrValues = Values.filter(function (item) { return (item.IsChecked == 1) });
                    if (arrValues.length > 0) {
                        contextObj.lstWorkType.MultiFieldValues = [];
                        for (var i = 0; i < arrValues.length; i++) {
                            contextObj.lstWorkType.MultiFieldValues.push(arrValues[i].Id.toString());                            
                        }
                    }
                    else {
                        contextObj.lstWorkType.MultiFieldValues = [];
                    }
                    debugger;
                    var arrDisabledValues = Values.filter(function (item) { return (item.IsDisabled == 1) });
                    if (arrDisabledValues.length > 0) {
                        for (var i = 0; i < arrDisabledValues.length; i++) {
                            if (arrDisabledValues[i]["IsDisabled"] == 1) {
                                var disablelookup = contextObj.lstWorkType.LookupDetails.LookupValues.find(function (el) { return el.Id === arrDisabledValues[i]["Id"] });
                                disablelookup.IsDisabled = true;
                            }
                        }                       
                    }
                }
            });
        }
        else {
            contextObj.lstWorkType.IsVisible = false;
            contextObj.lstWorkType.LookupDetails.LookupValues = [];
            contextObj.lstWorkType.MultiFieldValues = null;
        }
    }

    onSubmitData(event) {
        debugger;
        var contextObj = this;
        this.workorderservice.postSubmitWorkTypestoSite(event.fieldobject).subscribe(function (resultData) {
            if (resultData["Data"].ServerId == 1) {
                contextObj.notificationservice.ShowToaster("Work Type(s) assigned to the selected Site", 3);
            }
            else {
                contextObj.notificationservice.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    }
}
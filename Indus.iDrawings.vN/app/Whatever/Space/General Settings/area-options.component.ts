import { Component, OnInit} from '@angular/core';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { NgForm} from '@angular/forms';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models/Interface/IField'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SpaceService } from '../../../Models/space/space.service';

@Component({
    selector: 'area-options',
    templateUrl: './app/Views/Space/General Settings/area-options.component.html',
    directives: [FieldComponent, Notification],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, SpaceService]
})

export class AreaOptionsComponent implements OnInit {

    public fieldDetails: IField[];
    public errorMessage: string;
    btnName: string = "Save";
    fieldObject: IField[];
    totalItems: number = 0;
    itemsSource: any[];
    isNetCustomerSubscribed: boolean = false;
    ExAreaSubscribed: boolean = false;
    vertAreaSubscribed: boolean = false;
    NetAreaSubscribed: boolean = false;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private SpaceService: SpaceService) { }

    ngOnInit() {
        var contextObj = this;

        contextObj.SpaceService.getAreaOptions().subscribe(function (resultData) {

            contextObj.SpaceService.checkSubscribedFeature('31').subscribe(function (result) {
                if (result["Data"] == null || result["Data"].length == 0) return;

                if (result["Data"][0]["IsSubscribed"] && result["Data"][0].FeatureLookupId == "2") {
                    contextObj.isNetCustomerSubscribed = true;
                }
                if (contextObj.isNetCustomerSubscribed == true) {
                    
                    var exArea = resultData["Data"].find(function (item) { return item.ReportFieldId === 5353 })
                    var netArea = resultData["Data"].find(function (item) { return item.ReportFieldId === 786 })
                    exArea.IsVisible = false;
                    netArea.IsVisible = false;

                    contextObj.fieldDetails = resultData["Data"]; 
                }
                else
                    contextObj.fieldDetails = resultData["Data"];
            });

            
        });

        contextObj.SpaceService.checkSubscribedFeature('9,10,29').subscribe(function (result) {
            if (result["Data"] == null || result["Data"].length == 0) return;

            contextObj.ExAreaSubscribed = result["Data"][0]["IsSubscribed"];
            contextObj.vertAreaSubscribed = result["Data"][1]["IsSubscribed"];
            contextObj.NetAreaSubscribed = result["Data"][2]["IsSubscribed"];
            contextObj.dataLoad();
        });
    }
    public dataLoad() {
        var contextObj = this;
      
        contextObj.SpaceService.LoadAreaOptions().subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            var currentelement: any = document.activeElement;
            setTimeout(function () {
                var el = <HTMLElement>document.getElementById("1935"); /*To enable Validation message in Review Comments Field. Review this if there is any issue*/                
                if (el != null && el != undefined) {
                    el.focus();
                    el.blur();
                }
                if (currentelement)
                    currentelement.focus();
            }, 20);
            var rate = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 736 });
            var ExArea = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 5353 });
            var vertArea = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 5355 });
            var NetArea = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 786 });
            ExArea.FieldValue = contextObj.ExAreaSubscribed ? "true" : "false";
            vertArea.FieldValue = contextObj.vertAreaSubscribed ? "true" : "false";
            NetArea.FieldValue = contextObj.NetAreaSubscribed ? "true" : "false";
            if (rate) {
                if (contextObj.itemsSource && contextObj.itemsSource.length > 0) {
                    rate.FieldValue = contextObj.itemsSource[0]["Rate"];
                } else {
                    rate.FieldValue = "";
                }
            }
        });
    }
    onSubmitData(event) {
        
        var contextObj = this;
        var fieldObject = JSON.parse(event["fieldobject"]);
        var dblRate: any;
        var blnExtWalArea: boolean;
        var blnVerWalArea: boolean;
        var blnNetAreaEnabled: boolean;

        fieldObject.find(function (item) {
            switch (item.ReportFieldId) {
                case 736: /*Rate for Common Area*/
                    dblRate= item.Value;
                    break;
                case 5353: /*Include External Wall Area for chargeback*/
                    blnExtWalArea = item.Value;
                    break;
                case 5355:  /*Include Vertical Area for chargeback*/
                    blnVerWalArea=item.Value;
                    break;
                case 786:  /*Enable Net Area*/
                    blnNetAreaEnabled=item.Value;
                    break;
            }
        });

        this.SpaceService.AddAreaOptions(dblRate, blnExtWalArea, blnVerWalArea, blnNetAreaEnabled).subscribe(function (resultData) {
          
            if (resultData == 1) {
                contextObj.notificationService.ShowToaster("Area Options updated", 3);
            }
        })
    }
}
import { Component, Input, Output, OnInit, SimpleChange, ViewEncapsulation, OnChanges, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import { AsbuiltService } from '../../../Models/Asbuilts/asbuilt.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
@Component({
    selector: 'markup-description',
    templateUrl: './app/Views/Asbuilts/Drawing Settings/markup-description.component.html',
    providers: [AsbuiltService, NotificationService],
    directives: [FieldComponent, Notification],
    encapsulation: ViewEncapsulation.None
    

})

export class MarkupDescriptionComponent implements OnInit {
    public fieldDetailsAdd: IField[];
    @Input() drawingType: boolean;
    btnName: string = "Add";
  //  dataKey: string = "FloorMarkupId";
    selectedIds: number;
    addEdit: string; 
    dataKey: any;
    @Output() submitSuccess = new EventEmitter();

    constructor(private asbuiltsService: AsbuiltService, private _notificationService: NotificationService) {
  
    }


    ngOnInit() {
      
        //if (this.addEdit == "add") {
        this.btnName = "Save";
        //this.asbuiltsService.getmarkupDescription(this.selectedIds, this.addEdit).subscribe(resultData => console.log("fieldDetailsAdd", this.fieldDetailsAdd = resultData["data"]));
        var contextObj = this;
        this.asbuiltsService.getmarkupDescription(this.drawingType).subscribe(function (resultData) {
            console.log('Site list', resultData["Data"]);
            resultData["Data"] = contextObj.setBuildingFieldDetails(resultData["Data"]);
            contextObj.fieldDetailsAdd = resultData["Data"];
            contextObj.dataKey = contextObj.fieldDetailsAdd[1].FieldLabel;
        });
        //}
        //else if (this.addEdit == "edit") {
        //    this.btnName = "EDIT";
                  
        //}

    }
    setBuildingFieldDetails(jsonobject: any) {
        //////debugger
        var contextObj = this;
        if (jsonobject) {

            for (let i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 555 ) {
                    jsonobject[i]["IsEnabled"] = true;
                    break;
                }
            }
            
            return jsonobject;
        }
    }
    onSubmitData(event) {
        this.submitSuccess.emit(this.fieldDetailsAdd);
    }

}
import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../Models/Common/General';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service';

@Component({
    selector: 'renovation-add-edit',
    templateUrl: './app/Views/RealProperty/Buildings/buildings-rennovations-addedit.component.html',
    providers: [RealPropertyService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName','BuildingConstructionDate'],
})

export class RenovationAddEditComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    BuildingConstructionDate:any;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    ngOnInit(): void {
    }
    constructor(private realPropertyService: RealPropertyService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }
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
        var field = JSON.parse(strsubmitField);
        field.push({
            ReportFieldId: 271,
            Value: "30"
        });
        strsubmitField = JSON.stringify(field);

        var date = new Date(field[1].Value);
        var bcd = new Date(this.BuildingConstructionDate);
        if (bcd > date) {
            var year = bcd.getFullYear();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var mon = monthNames[bcd.getMonth()];
            var dd = (bcd.getDate() < 10 ? '0' : '') + bcd.getDate();
            var bcd1 = dd + " " + mon + " " + year;
            contextObj._notificationService.ShowToaster("Renovation Date should be greater than Building Construction Date (" + bcd1 + ")", 2);
            setTimeout(function () {
                var el = <HTMLElement>document.getElementById("1026");

                if (el != null && el != undefined) {
                    el.focus();
                }
            }, 100);
        }
        else {

            contextObj.realPropertyService.AddUpdateRenovation(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1)
                            contextObj._notificationService.ShowToaster("Renovation added", 3);
                        else
                            contextObj._notificationService.ShowToaster("Renovation updated", 3);
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        contextObj._notificationService.ShowToaster("Renovation already exists", 5);
                        setTimeout(function () {
                            var el = <HTMLElement>document.getElementById("1026");

                            if (el != null && el != undefined) {
                                el.focus();
                            }
                        }, 100);
                        break;
                }
            });
        }
    }
}
import {Component, Output, EventEmitter,OnInit,Input} from '@angular/core';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'plotstyle-add-edit',
    templateUrl: 'app/Views/Administration/Drawing Settings/plotstyleadd.component.html',
    providers: [AdministrationService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
    styleUrls: ['app/Views/Administration/Drawing Settings/plotstyleadd.component.css']

})

export class PlotStyleAddComponent  { 
    dataKey: string = "Id"; 
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService, private generFun: GeneralFunctions) {
    }
   
    onSubmitData(event) {
        var contextObj = this;    
        switch (this.action) {          
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    }

    postSubmit(contextObj, strsubmitField: string, target: number) {
    
        var temp = JSON.parse(strsubmitField);
        var colorData = temp.find(function (item) { return item.ReportFieldId === 4434 })
        if (colorData) {
            if (colorData.Value == "" || colorData.Value == null) {
                contextObj._notificationService.ShowToaster("Select a Color", 3);

            } else {
                contextObj.administrationService.AddUpdatePlotStyle(strsubmitField, this.selectedId, target).subscribe(function (resultData) {

                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                            break;
                        case 1:
                            if (target == 1) {
                                contextObj._notificationService.ShowToaster("Plot Style added", 3);
                            }
                            else {
                                contextObj._notificationService.ShowToaster("Plot Style details updated", 3);
                            }
                            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj._notificationService.ShowToaster("Style Name already exists", 5);
                            }
                            break;
                    }


                });
            }
        }

    }
    objLineWtChange(event) {                            
        this.findData(event.chkBoxObject.IsChecked);
        } 

    findData(objlinChecked) {
        //lineweight = 4442
        this.fieldDetailsAdd.find(function (item) {
            if (item.ReportFieldId == 4442) {
                if (objlinChecked) {
                    item.IsEnabled = false;
                    item.FieldValue = "0";
                } else {
                    item.IsEnabled = true;
                }
            }
            return item.ReportFieldId === 4442
        });
    }

}
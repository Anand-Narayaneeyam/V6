import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../../Models/Common/General';

@Component({
    selector: 'archive-add',
    templateUrl: './app/Views/Reports/CAI/SpaceDriver/add-archive.html',
    providers: [CommonReportService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId'],
})

export class AddArchiveComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: string;
    retItem: IField;
    fieldDetailsAdd: IField[];
    btnName: string;
    @Output() submitSuccess = new EventEmitter();
    nameFieldwithMap: string = "";
    nameFieldwithoutMap: string = "";


    ngOnInit(): void {
        var contextObj = this;
        this.btnName = "Save";       

        contextObj.commonReportService.ddlArchiveReportType().subscribe(function (resultData) {
            
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 12096) {
                    item.FieldValue = "88";
                    item.FieldLabel = null;
                }
            });
            //contextObj.fieldDetailsAdd = resultData["Data"];
            //contextObj.fieldDetailsAdd[0].LookupDetails.LookupValues.sort(function (a, b) {
            //    return a.Id - b.Id;
            //});
            contextObj.commonReportService.getArchiveName("1").subscribe(function (result) { // with maps
                
                resultData["Data"].find(function (item) {
                    if (item.ReportFieldId == 1611) {
                        item.FieldValue = result;
                    }
                });
                contextObj.fieldDetailsAdd = resultData["Data"];
                contextObj.fieldDetailsAdd[0].LookupDetails.LookupValues.sort(function (a, b) {
                    return a.Id - b.Id;
                });
                contextObj.nameFieldwithMap = result;
            });
            contextObj.commonReportService.getArchiveName("2").subscribe(function (result) {  // without maps
                
                contextObj.nameFieldwithoutMap = result;
            });
                
        });

    }
    constructor(private commonReportService: CommonReportService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }

    onSubmitData(event) {
        var contextObj = this;
        var arrayList = new Array<ReportFieldArray>();
        var tempIds = this.selectedId.split(",");
       
        arrayList = JSON.parse(event.fieldobject);
        arrayList.find(function (item) {
            if (item.ReportFieldId == 12096) {
                item.ReportFieldId = 1612;
                if (item.Value == "88")
                    item.Value = "1";
                else if (item.Value == "89")
                    item.Value = "0";
                return true;
            }
        });
        for (let i = 0; i < tempIds.length; i++) {
            arrayList.push({
                ReportFieldId: 781,
                Value: tempIds[i]
            });
        }
        
        contextObj.commonReportService.insertArchive(JSON.stringify(arrayList), tempIds).subscribe(function (resultData) {

            switch (resultData) {
                case 0:
                    //contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    contextObj._notificationService.ShowToaster("Archive Name already exists", 5);
                    break;
                case 1:
                    contextObj._notificationService.ShowToaster("CAI Space Driver Report archived", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData });
                    break;
                case -1:
                   // contextObj._notificationService.ShowToaster("Archive Name already exists", 5);
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                default:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
            }

        });
 
    }
    rbnChange(event: any) {
        
        var contextObj = this;

        if (event.rbtnObject.fieldobject.FieldValue == "88") {
            this.fieldDetailsAdd.find(function (item) {
                if (item.ReportFieldId == 1611) {
                    item.FieldValue = contextObj.nameFieldwithMap;
                    return true;
                }
            });
        }
        else if (event.rbtnObject.fieldobject.FieldValue == "89") {
            this.fieldDetailsAdd.find(function (item) {
                if (item.ReportFieldId == 1611) {
                    item.FieldValue = contextObj.nameFieldwithoutMap;
                    return true;
                }
            });
        }
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
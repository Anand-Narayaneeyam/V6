import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../../Models/Common/General';

@Component({
    selector: 'building-archive-add',
    templateUrl: './app/Views/Reports/CAI/BuildingStatus/add-archive.html',
    providers: [CommonReportService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: [],
})

export class BuildingAddArchiveComponent implements OnInit {
    dataKey: string = "Id";
    retItem: IField;
    fieldDetailsAdd: IField[];
    btnName: string;
    @Output() submitSuccess = new EventEmitter();
    nameFieldwithMap: string = "";
    nameFieldwithoutMap: string = "";


    ngOnInit(): void {
        var contextObj = this;
        this.btnName = "Save";       

        contextObj.commonReportService.getArchiveFields().subscribe(function (resultData) {
            
            contextObj.commonReportService.getArchiveName("3").subscribe(function (result) {
                
                resultData["Data"].find(function (item) {
                    if (item.ReportFieldId == 1618) {
                        item.FieldValue = result;
                    }
                });
                contextObj.fieldDetailsAdd = resultData["Data"];
            });
                
        });

    }
    constructor(private commonReportService: CommonReportService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }

    onSubmitData(event) {
        var contextObj = this;
        
        contextObj.commonReportService.insertBuildingArchive(event.fieldobject).subscribe(function (resultData) {
            
            if (resultData.Data.Message == "Success") {
                contextObj._notificationService.ShowToaster("Building Status Report archived", 3);
                contextObj.submitSuccess.emit({ returnData: resultData });
            }
            else if (resultData.Data.Message == "Already Exists")
                contextObj._notificationService.ShowToaster("Archive Name already exists", 5);   
            else if (resultData.Data.Message == "Failure")
                contextObj._notificationService.ShowToaster("Building Status report archive failed", 5);              
            else
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
 
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
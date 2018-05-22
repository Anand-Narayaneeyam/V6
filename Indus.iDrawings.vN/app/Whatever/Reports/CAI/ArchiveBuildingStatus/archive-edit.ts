import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../../Framework/Models//Interface/IField';
import { GeneralFunctions} from '../../../../Models/Common/General';

@Component({
    selector: 'archive-buildingStatus-edit',
    templateUrl: './app/Views/Reports/CAI/ArchiveBuildingStatus/archive-edit.html',
    providers: [CommonReportService, NotificationService, GeneralFunctions],
    directives: [FieldComponent, Notification],
    inputs: ['selectedId', 'fieldDetailsAdd', 'btnName', 'fromDate', 'toDate'],
})

export class ArchiveBuildingStatusEditComponent implements OnInit {
    dataKey: string = "Id";
    selectedId: number;
    retItem: IField;
    @Input() action: string;
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    @Input() fromDate: any;
    @Input() toDate: any;


    ngOnInit(): void {

    }
    constructor(private commonReportService: CommonReportService, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions) { }

    onSubmitData(event) {
        this.postSubmit(event["fieldobject"]);
    }

    postSubmit(strsubmitField: string) {
        var contextObj = this;

        contextObj.commonReportService.UpdateBuildingStatusArchive(strsubmitField, this.selectedId, 3, Number(this.selectedId), this.fromDate, this.toDate).subscribe(function (resultData) {

            
            switch (resultData.StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj._notificationService.ShowToaster("Building Status report archived", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"] });
                    break;
            }
        });
    }
}

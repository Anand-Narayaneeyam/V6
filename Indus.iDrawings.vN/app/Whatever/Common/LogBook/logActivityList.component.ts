import {Component, Output, EventEmitter, OnInit, Input, AfterViewInit} from '@angular/core';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IField} from '../../../Framework/Models//Interface/IField';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'log-activity-list',
    templateUrl: 'app/Views/Common/LogBook/logActivityList.html',
    directives: [FieldComponent, Notification, PageComponent, GridComponent],
    providers: [AdministrationService, NotificationService],
    inputs: ['selectedId', 'action', 'fieldDetails', 'btnName']
})

export class LogActivityListComponent implements AfterViewInit {
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    @Input() getlogUser: any;
    @Input() getLogEntity: any;
    @Input() RptFields: any;
    @Input() logActivity: any;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true};
    itemsSourceLogActivity: any[];
    fieldObject: IField[];
    activityIds = new Array<ActivityIdsArray>();
    @Output() sendActivityOutput = new EventEmitter();

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.administrationService.getLogActivityListColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            if (contextObj.logActivity != undefined) {
                contextObj.itemsSourceLogActivity = contextObj.logActivity;
            }
        })        
    }

    getActivitySelection(event) {
        var contextObj = this;
        var count = 0;
        var strSelectedentityIds: string = "";
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.itemsSourceLogActivity.length; i++) {
            if (contextObj.itemsSourceLogActivity[i]["Select All"]) {
                if (contextObj.itemsSourceLogActivity[i]["Select All"] == true) {
                    count = count + 1;
                    if (count == 1) {
                        strSelectedentityIds = contextObj.itemsSourceLogActivity[i].Id.toString();
                    }
                    else {
                        strSelectedentityIds = strSelectedentityIds + "," + contextObj.itemsSourceLogActivity[i].Id.toString();
                    }
                }
            }
        }
        if (strSelectedentityIds != "") {
            arrayList.push({
                ReportFieldId: 1713,
                Value: strSelectedentityIds
            });
            contextObj.sendActivityOutput.emit({
                logParamList: contextObj.RptFields,
                logUserList: contextObj.getlogUser,
                logEntityList: contextObj.getLogEntity,
                logActivityList: arrayList
            });
        }
        else {
            contextObj.notificationService.ShowToaster("Select Activity from List", 2);
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface ActivityIdsArray {
    Id: number;
}
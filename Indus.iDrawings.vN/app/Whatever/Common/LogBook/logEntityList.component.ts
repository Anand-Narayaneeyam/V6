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
    selector: 'log-entity-list',
    templateUrl: 'app/Views/Common/LogBook/logEntityList.html',
    directives: [FieldComponent, Notification, PageComponent, GridComponent],
    providers: [AdministrationService, NotificationService],
    inputs: ['selectedId', 'action', 'fieldDetails', 'btnName']
})

export class LogEntityListComponent implements OnInit {
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true};
    itemsSourceLogEntities: any[];
    fieldObject: IField[];
    @Input() getlogUser: any;
    @Input() logEntities: any;
    @Input() RptFields: any;
    entityIds = new Array<EntityIdsArray>();
    @Output() sendEntityOutput = new EventEmitter()

    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;
        this.administrationService.getLogEntityListColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            if (contextObj.logEntities != undefined) {
                contextObj.itemsSourceLogEntities = contextObj.logEntities;
            }
        })       
    }

    getEntitySelection(event) {
        var contextObj = this;
        var count = 0;
        var strSelectedentityIds: string = "";
        var arrayList = new Array<ReportFieldArray>();
        for (let i = 0; i < contextObj.itemsSourceLogEntities.length; i++) {
            if (contextObj.itemsSourceLogEntities[i]["Select All"]) {
                if (contextObj.itemsSourceLogEntities[i]["Select All"] == true) {
                    count = count + 1;
                    if (count == 1) {
                        strSelectedentityIds = contextObj.itemsSourceLogEntities[i].Id.toString();
                    }
                    else {
                        strSelectedentityIds = strSelectedentityIds + "," + contextObj.itemsSourceLogEntities[i].Id.toString();
                    }
                }
            }
        }
        if (strSelectedentityIds != "") {
            arrayList.push({
                ReportFieldId: 1707,
                Value: strSelectedentityIds
            });
            this.administrationService.postLogentitiesListFieldInsert(JSON.stringify(arrayList), contextObj.RptFields, contextObj.getlogUser).subscribe(function (resultData) {
                if (resultData["Data"].DataCount > 0) {
                    contextObj.sendEntityOutput.emit({
                        logParameterData: contextObj.RptFields,
                        logUserData: contextObj.getlogUser,
                        logEntities: JSON.stringify(arrayList),
                        logActivityInput: JSON.parse(resultData["Data"].FieldBinderData) 
                    });
                    contextObj._notificationService.ShowToaster("Select Activities", 2);
                }
                else {
                    contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                }
            })
        }
        else {
            contextObj._notificationService.ShowToaster("Select Entity from List", 2);
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface EntityIdsArray {
    Id: number;
}
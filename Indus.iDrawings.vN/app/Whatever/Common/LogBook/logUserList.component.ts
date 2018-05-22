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
    selector: 'log-user-list',
    templateUrl: 'app/Views/Common/LogBook/logUserList.html',
    directives: [FieldComponent, Notification, PageComponent, GridComponent],
    providers: [AdministrationService, NotificationService],
    inputs: ['selectedId', 'action', 'fieldDetails', 'btnName']
})

export class LogUserListComponent implements OnInit {

    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[User Name]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true}; 
    itemsSource: any[];
    fieldObject: IField[];
    logParameterListRptFields: string;
    logEntityList: string;
    sendlogUserData: string;
    @Input() logUser: any;
    @Input() RptFields: any;
    @Output() sendUserOutput = new EventEmitter()

    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;
        this.administrationService.getLogUserListColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            if (contextObj.logUser != undefined) {
                contextObj.itemsSource = contextObj.logUser;
            }
        })       
    }
    public onSort(objGrid: any) {
        var contextObj = this;
        this.administrationService.postLogBookParameterFieldInsert(contextObj.RptFields, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            if (JSON.parse(resultData["Data"].FieldBinderData).length > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            }
        })
    }   

    getUserSelection(event) {
        var contextObj = this;
        var strSelectedUserIds: string = "";
        var count = 0;
        var rptFieldArray = new Array<ReportFieldArray>();
        if (contextObj.itemsSource.length > 0) {
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"]) {
                    if (contextObj.itemsSource[i]["Select All"] == true) {
                        count = count + 1;
                        if (count == 1) {
                            strSelectedUserIds = contextObj.itemsSource[i].UserId.toString();
                        }
                        else {
                            strSelectedUserIds = strSelectedUserIds + "," + contextObj.itemsSource[i].UserId.toString();
                        }
                    }
                } 
            }
        }
        if (strSelectedUserIds != "") {
            rptFieldArray.push({
                ReportFieldId: 443,
                Value: strSelectedUserIds
            });
            this.administrationService.postLogUserListFieldInsert(JSON.stringify(rptFieldArray), contextObj.RptFields).subscribe(function (resultData) {
                if (resultData["Data"].DataCount > 0) {
                    contextObj.sendUserOutput.emit({
                        logParameterData: contextObj.RptFields,
                        logUserData: JSON.stringify(rptFieldArray),
                        logEntitiesInput: JSON.parse(resultData["Data"].FieldBinderData) 
                    });
                    contextObj._notificationService.ShowToaster("Select Entities", 2);
                }
                else {
                    contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                }
            })
        }
        else {
            contextObj._notificationService.ShowToaster("Select Users from List", 2);
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

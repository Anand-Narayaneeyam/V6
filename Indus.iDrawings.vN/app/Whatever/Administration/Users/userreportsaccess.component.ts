import {Component, Output, EventEmitter, AfterViewInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {TreeView } from '../../../Framework/Whatever/TreeView/treeview.component';
import {Directory} from '../../../Framework/Whatever/TreeView/directory.component';
@Component({
    selector: 'user-reports-access',
    templateUrl: './app/Views/Administration/Users/userreportsaccess.component.html',
    directives: [Notification, GridComponent, PagingComponent, TreeView],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedUserId"]
})


export class UserReportsAccessComponent implements AfterViewInit{
    private fields: any;
    sdsd: any;
    FieldTable: any;
    clmFieldTable: any;
    selectedIds:any[]=[];
    DataKey = "Id";
    Fields: IField[];
    objCategoryId = "0";
    dsbleSaveBtn = false;
    isChangeDetect = false;
    @Input() selectedUserId;
    labelData = ["Module:", ""];
    constructor(private administrationService: AdministrationService,private notificationService: NotificationService) {
    }

    ngOnInit() {

    }
    ngAfterViewInit() {
        var contextObj = this;
        this.administrationService.getUserReportsAccessFieldsList().subscribe(function (resultData) {

            contextObj.Fields = resultData["data"];

        });
        if (contextObj.isChangeDetect == false) {

            contextObj.loadData(contextObj);
        }
    }

    private loadData(contextObj) {
        var obj = new Array<ReportFieldArray>();
        //if (this.module != 7) {
        this.getObjCategory();
        obj.push(
            { ReportFieldId: 271, Value: contextObj.module },
            { ReportFieldId: 2156, Value: contextObj.objCategoryId }
        );
        contextObj.administrationService.getReportsAccessibleByUser(contextObj.selectedUserId).subscribe(function (resultData) {
            if (resultData["Table1"] == "[]") {
                contextObj.notificationService.ShowToaster("No Reports exist", 3);
            } else {
                var fieldobj = new Array<FieldTable>();
                fieldobj.push({
                    Table1: eval(resultData["Table1"]),
                    Table2: eval(resultData["Table2"]),
                    Table3: eval(resultData["Table3"]),
                    expanded: true
                });
                if (fieldobj[0]["Table1"].length == 0 && contextObj.selectedUserId == undefined) {
                    contextObj.dsbleSaveBtn = true;
                }
                contextObj.FieldTable = fieldobj;
                for (var item of contextObj.FieldTable[0]["Table3"]) {
                    if (item["Selected"] == "True")
                        contextObj.selectedIds.push({ "Id": item["Id"] });
                }
                //if (contextObj.selectedUserId > 0) {
                //    contextObj.selectedFieldData = JSON.parse(resultData["Table4"]);
                //} else {
                //    contextObj.spaceService.getAllocatedDrawings(contextObj.module).subscribe(function (resultData) {
                //        contextObj.selectedFieldData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                //    });
                //}
            }

        });
        var clmnfieldobj = new Array<TreeViewColumn>();
        clmnfieldobj.push({
            clmn1: ["ModuleId", "Name"],
            clmn2: ["CategoryId", "Name"],
            clmn3: ["Id", "Name"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];
    }
    getObjCategory() {

    }

    submit(value: any) {
        debugger
        var contextObj = this;
        var rptFldValues = JSON.parse(value['ReportFieldIdValues']);
        var updatedRptFldValues = '';
        var ValueTypes;
        for (var item of rptFldValues) {
            var index = contextObj.FieldTable[0]["Table3"].findIndex(function (el) { return el.Id == item['Value'] });
            if (index != -1) {
                //ValueTypes = "3914" + contextObj.co contextObj.FieldTable[0]["Table3"][index]['ReportId'] 
                updatedRptFldValues += "{\"ReportFieldId\":3914,\"Value\":\"" + contextObj.FieldTable[0]["Table3"][index]['ReportId']  + "\"},";
                updatedRptFldValues += "{\"ReportFieldId\":" + contextObj.FieldTable[0]["Table3"][index]['ReportId'] + ",\"Value\":\"" + contextObj.FieldTable[0]["Table3"][index]['ReportType'] + "\"},";
            }
        }
        this.administrationService.updateReportAccessToUser(updatedRptFldValues, contextObj.selectedUserId).subscribe(function (resultData) {
                if (resultData.StatusId == 1) {
                    contextObj.notificationService.ShowToaster("Report Access updated", 3);
                } else {
                    contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
                }
        });
    }
}

export interface FieldTable {
    Table1: any;
    Table2: any;
    Table3: any;
    expanded: boolean;
}
export interface TreeViewColumn {
    clmn1?: any[];
    clmn2?: any[];
    clmn3?: any[];
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}


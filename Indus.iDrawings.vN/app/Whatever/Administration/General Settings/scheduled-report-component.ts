import {Component, Output, EventEmitter, AfterViewInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {SpaceService} from '../../../Models/Space/space.service'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {TreeView } from '../../../Framework/Whatever/TreeView/treeview.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {Directory} from '../../../Framework/Whatever/TreeView/directory.component';
import {AdministrationService} from '../../../models/administration/administration.service'

@Component({
    selector: 'scheduledReport',
    templateUrl: './app/Views/Administration/General Settings/scheduled-report-component.html',
    directives: [GridComponent, TreeView],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['module'],
})

export class ScheduledReportComponent implements AfterViewInit {
    private fields: any;
    FieldTable: any;
    clmFieldTable: any;
    selectedFieldData: any;
    DataKey = "ReportTypeId";
    Fields: IField[];
    dsbleSaveBtn = false;
    @Input() module;
    @Input() selectedUserId;
    isChangeDetect = false;
    labelData: any[] = [];
    selectedeTempArray: any[] = [];
    table3Temp: any;
    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService) {

    }

    ngOnInit() {
        
        this.labelData[0] = "Module: ";
        this.labelData[1] = "";
        this.labelData[2] = "";
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        contextObj.isChangeDetect = false;
        if (changes["module"] && changes["module"]["currentValue"][0] && changes["module"]["currentValue"][0] != changes["module"]["previousValue"][0])
            contextObj.isChangeDetect = true;
        contextObj.loadData(contextObj);
    }
    ngAfterViewInit() {
        var contextObj = this;
        this.administrationService.getSchedulingReportFieldObject().subscribe(function (resultData) {
            
            contextObj.Fields = resultData["Data"];

        });
        if (contextObj.isChangeDetect == false) {

            contextObj.loadData(contextObj);
        }
    }

    private loadData(contextObj) {
        
        var obj = new Array<ReportFieldArray>();
        obj.push(
            {
                ReportFieldId: 149,
                Value: "0"
            });
        contextObj.administrationService.getSchedulingReportData(obj).subscribe(function (resultData) {
            
            if (resultData["Data"]["Table1"] == "[]") {
                contextObj.notificationService.ShowToaster("No Reports exist", 5);
            }
            var fieldobj = new Array<FieldTable>();
            fieldobj.push({
                Table1: eval(resultData["Data"]["Table1"]),
                Table2: eval(resultData["Data"]["Table2"]),
                Table3: eval(resultData["Data"]["Table3"]),
                expanded: true
            });
            if (fieldobj[0]["Table1"].length == 0 ) {
                contextObj.dsbleSaveBtn = true;
            }
            contextObj.FieldTable = fieldobj;
            contextObj.table3Temp = JSON.parse(resultData["Data"]["Table3"]);
            var tempArray = JSON.parse(resultData["Data"]["Table3"]);
            for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].Selected == "True" || tempArray[i].Selected == true)
                    contextObj.selectedeTempArray.push(tempArray[i]);
            }
            contextObj.selectedFieldData = contextObj.selectedeTempArray;
        });

        var clmnfieldobj = new Array<TreeViewColumn>();
        clmnfieldobj.push({
            clmn1: ["ModuleId", "ModuleName"],
            clmn2: ["CategoryId", "CategoryName"],
            clmn3: ["ReportTypeId", "ReportsName"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];
    }

    submit(value: any) {
        var contextObj = this;
        
        var temp = JSON.parse(value.ReportFieldIdValues);
        var selectedObj = new Array<ReportFieldArray1>();
        for (let i = 0; i < temp.length; i++) {
            selectedObj.push({
                ReportFieldId: temp[i].Value.split(",")[1],  //ReportId
                Value: temp[i].Value.split(",")[0]   //TypeId
            });
        }
        
        this.administrationService.updateSchedulingReportData(JSON.stringify(selectedObj)).subscribe(function (resultData) {
            
            if (resultData.Message == 'Success')
                contextObj.notificationService.ShowToaster("Scheduled Report(s) updated", 3);
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
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
export interface updateArray {
    ReportId: any;
    TypeId: any;
}
export interface ReportFieldArray1 {
    ReportFieldId: any;
    Value: any;
}

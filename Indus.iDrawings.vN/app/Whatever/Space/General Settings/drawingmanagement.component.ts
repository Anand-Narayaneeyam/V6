
import {Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {SpaceService} from '../../../Models/Space/space.service'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {TreeView } from '../../../Framework/Whatever/TreeView/treeview.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {Directory} from '../../../Framework/Whatever/TreeView/directory.component';

@Component({
    selector: 'drawingmanagement',
    templateUrl: './app/Views/Space/General Settings/drawingmanagement.component.html',
    directives: [GridComponent, SlideComponent, TreeView  ],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService, GeneralFunctions]
})

export class DrawingManagementComponent implements AfterViewInit {
    private fields: any;
    FieldTable: any;
    clmFieldTable: any;
    selectedFieldData: any;
    DataKey = "DrawingID";
    Fields: IField[];
    @Input() module;

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {

    }

    ngOnInit() {
        var contextObj = this;      
    }

    ngAfterViewInit() {
        var contextObj = this;
        var obj = new Array<ReportFieldArray>();
        obj.push({
            ReportFieldId: 271,
            Value: contextObj.module
        });
        var clmnfieldobj = new Array<TreeViewColumn>();
        clmnfieldobj.push({
            clmn1: ["SiteID", "SiteName"],
            clmn2: ["BuildingID", "BuildingName"],
            clmn3: ["DrawingID", "FloorName"]
        });
        this.clmFieldTable = clmnfieldobj[0];
        this.spaceService.getDrawingMangamentData(obj).subscribe(function (resultData) {
                
            //var mm = contextObj.convertJsonToTreeViewFormat(resultData,3);

            var fieldobj = new Array<FieldTable>();
            fieldobj.push({
                Table1: eval(resultData["Table1"]),
                Table2: eval(resultData["Table2"]),
                Table3: eval(resultData["Table3"]),
                expanded: true
            });
            contextObj.FieldTable = fieldobj;
        });
        this.spaceService.getFieldObject().subscribe(function (resultData) {
            
            contextObj.Fields = resultData["Data"];
        });
       
        this.spaceService.getAllocatedDrawings(contextObj.module).subscribe(function (resultData) {  
                
            contextObj.selectedFieldData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            if (resultData["Data"].DataCount == 0) {
                contextObj.notificationService.ShowToaster("No Drawings exist", 2);
            }
        });

    }

    submit(value: any)
    {      
        var contextObj = this;
        this.spaceService.updateDrawingsManagement(value, this.module).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                contextObj.notificationService.ShowToaster("Drawing Management updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("Update Failed", 5);
        });
    }


    convertJsonToTreeViewFormat(data: any, level: any)
    {
        var fieldObjectsTreeView=[];
        var i = 1;
            var status = 0;
            var dir = [];
            var clmFieldName = this.clmFieldTable;
            var table = eval(data["Table" + i]);
            for (var j = 0; j < table.length; j++) {
                var newTable;
                var type: any;
                newTable = eval(data["Table" + 2]).filter(function (e) {
                    if (e[clmFieldName["clmn" + i][0]] == table[j][clmFieldName["clmn" + i][0]])
                    {
                        return true;
                    }
                });
                if (newTable.length > 0) {
                    //let Type = new Directory(table[j][clmFieldName["clmn" + i][1]], this.function2(clmFieldName, data, newTable), []);
                    //type = Type;
                  
                }
                else
                {
                    //let Type = new Directory(table[j][clmFieldName["clmn" + i][1]], [], []);
                    //type = Type;
                }

                dir.push(type);
            }
            if (dir != undefined)
            fieldObjectsTreeView.push(dir);

        return fieldObjectsTreeView;
    }

    function2(clmFieldName: any, data: any, newTable: any)
    {
        var newTable2;
        var dir2 = [];
        var type: any;
        for (var j = 0; j < newTable.length; j++) {
            var newTable;
            newTable2 = eval(data["Table" + 3]).filter(function (e) {
                if (e[clmFieldName["clmn" + 2][0]] == newTable[j][clmFieldName["clmn" + 2][0]]) {
                    return true;
                }
            });
            if (newTable2.length > 0) {
                var ff = [];
                newTable2.find(function (e) {
                    ff.push(e[clmFieldName["clmn" + 3][1]]);
                });
                //let Type = new Directory(newTable[j][clmFieldName["clmn" + 2][1]], [], [ff]);
                //type = Type;
            }
            else {
                //let Type = new Directory(newTable[j][clmFieldName["clmn" + 2][1]], [], []);
                //type = Type;
            }

            dir2.push(type);
        }
        return dir2;
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



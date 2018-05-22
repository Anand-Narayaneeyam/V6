import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { SpaceService } from '../../../Models/space/space.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { ObjectsService } from '../../../Models/Objects/objects.service';
import {StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import {TreeView } from '../../../Framework/Whatever/TreeView/treeview.component';


@Component({
    selector: 'Show-Connections',
    templateUrl: './app/Views/Common/OpenDrawing/ShowConnections.html',
    directives: [FieldComponent, Notification, SubMenu, ConfirmationComponent, SlideComponent, SplitViewComponent, StringTextBoxComponent,TreeView],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, GeneralFunctions, ObjectsService],
    inputs: ['fieldDetails','drawingId','isBuildingDrawing'],

})


export class ShowConnections implements OnInit {
    fieldDetailsAdd: IField[];
    @Input() fieldDetails: any;
    labelData: any[] = [];
    clmFieldTable: any;
    selectedFieldData: any;
    FieldTable: any;
    Fields: IField[];
    DataKey = "ObjectId";
    enableFlag: boolean = false;
    @Output() ShowConnectionBlink = new EventEmitter();

    constructor(private notificationService: NotificationService, private generalFunctions: GeneralFunctions, private ObjectsService: ObjectsService, private generFun: GeneralFunctions) {
    }
    ngOnInit() {
        this.labelData[0] = "Component Type: ";
        this.labelData[1] = "";
        this.labelData[2] = "";
      

        var contextObj = this;
        var drawingclass = JSON.parse(contextObj.fieldDetails[0])[0].Class;
        var Objnumber = JSON.parse(contextObj.fieldDetails[0])[0].ObjectNumber;
        var ObjectId = contextObj.fieldDetails[1];
        var objectCategoryId = contextObj.fieldDetails[2];
        var ConnectivityStatus = contextObj.fieldDetails[3];
        var isBuildingDrawing = contextObj.fieldDetails[4];
        var DrawingId = contextObj.fieldDetails[5];
        

        contextObj.ObjectsService.getShowConectivityField().subscribe(function (result) {
            result["Data"].find(function (item) {
                if (item.ReportFieldId == 4481) {
                    item.FieldValue = drawingclass;
                    item.IsEnabled = false;
                }
                else if (item.ReportFieldId == 500108) {
                    item.FieldValue = Objnumber;
                    item.IsEnabled = false;
                }
            });
            debugger
            var temp = result["Data"].find(function (item) {
                if (item.ReportFieldId == 656)
                    return item;
            });
            contextObj.fieldDetailsAdd = result["Data"].splice(0, 2);
            contextObj.Fields = temp;

            var reportfields = new Array<ReportFieldArray>();
            reportfields.push({
                ReportFieldId: 649,
                Value: objectCategoryId,
            });
            reportfields.push({
                ReportFieldId: 4518,
                Value: ObjectId,
            });
            reportfields.push({
                ReportFieldId: 669,
                Value: DrawingId,
            });
            reportfields.push({
                ReportFieldId: 4508,
                Value: "0",
            });
            reportfields.push({
                ReportFieldId: 4509,
                Value: "0",
            });
            reportfields.push({
                ReportFieldId: 4510,
                Value: "0",
            });
            reportfields.push({
                ReportFieldId: 4769,
                Value: isBuildingDrawing,
            });
            contextObj.ObjectsService.getShowConectivityTreeView(JSON.stringify(reportfields)).subscribe(function (result) {
                debugger
                if (result["Data"]["Table2"] == "[]") {
                    contextObj.notificationService.ShowToaster("No Connection exist", 5);
                   
                }
                var fieldobj = new Array<FieldTable>();
                fieldobj.push({
                    Table1: eval(result["Data"]["Table1"]),
                    Table2: eval(result["Data"]["Table3"]),
                    Table3: eval(result["Data"]["Table2"]),
                    expanded: true
                });

                contextObj.FieldTable = fieldobj;
                var clmnfieldobj = new Array<TreeViewColumn>();
                clmnfieldobj.push({
                    clmn1: ["ConnectionHeadingId", "ConnectionHeading"],
                    clmn2: ["ObjectClassId", "ObjectClassName"],
                    clmn3: ["ObjectId", "NumberWithAssociation"]
                });
                contextObj.clmFieldTable = clmnfieldobj[0];
                //contextObj.selectedFieldData = '';
                contextObj.enableFlag = true;
            });
        });

       


    }
    ShowConnectivity() {
        
    }

    onSubmitData(event) {
        debugger

    }
    submit(value: any) {
        debugger
        var contextObj = this;
  
        var PrimaryObjectId = contextObj.fieldDetails[1];
        var SecondaryObjectId = JSON.parse(value.FieldIdValues);

        if (value.FieldIdValues == "[]") {
            contextObj.notificationService.ShowToaster("No Component(s) selected", 5);
        }
        else {
            this.ShowConnectionBlink.emit({
                "PrimaryObjectId": PrimaryObjectId,
                "SecondaryObjectId": SecondaryObjectId
            });
        }

    }

    //closeSlideDialog(value: any) {
    //    this.showSlide = value.value;
    //}
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
export interface FieldTable {
    Table1: any;
    Table2: any;
    Table3: any;
    expanded: boolean;
}

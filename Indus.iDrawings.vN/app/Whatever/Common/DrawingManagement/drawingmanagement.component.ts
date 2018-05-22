
import {Component, Output, EventEmitter, AfterViewInit, Input, OnChanges, SimpleChange } from '@angular/core';
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
import { AdministrationService } from '../../../Models/Administration/administration.service'


@Component({
    selector: 'drawingmanagement',
    templateUrl: './app/Views/Common/DrawingManagement/drawingmanagement.component.html',
    directives: [GridComponent, SlideComponent, TreeView],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['module','selectedUserId'],
})

export class DrawingManagementComponent implements AfterViewInit{
    private fields: any;
    sdsd: any;
    FieldTable: any;
    clmFieldTable: any;
    selectedFieldData: any;
    DataKey = "DrawingID";
    Fields: IField[];
    objCategoryId = "0";
    dsbleSaveBtn = false;
    @Input() module;
    @Input() selectedUserId;
    isChangeDetect = false;
    drawinglabel: string;
    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService) {

    }

    ngOnInit() {
        this.getCusSubscribedFeatures();
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
        this.spaceService.getFieldObject().subscribe(function (resultData) {
         
                contextObj.Fields = resultData["Data"];
         
        });
        if (contextObj.isChangeDetect = false) {
          
            contextObj.loadData(contextObj);
        }
    }

    private getCusSubscribedFeatures() {
        var contextObj = this;
        contextObj.administrationService.getCustomerSubscribedFeatures("276").subscribe(function (rt) {

            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 276:
                        contextObj.drawinglabel = customerFeatureobj[i]["Value"]
                        if (contextObj.drawinglabel == "" || contextObj.drawinglabel == null)
                            contextObj.drawinglabel = "Drawing";
                        break;

                }
            }

        });
    }
    private loadData(contextObj) {
      
        var obj = new Array<ReportFieldArray>();      
        //if (this.module != 7) {
        this.getObjCategory();
        obj.push(
                    { ReportFieldId: 271, Value: contextObj.module },
                    { ReportFieldId: 2156, Value: contextObj.objCategoryId }                                         
                );
            contextObj.spaceService.getDrawingMangamentData(obj, contextObj.selectedUserId).subscribe(function (resultData) {
                if (resultData["Table1"] == "[]") {
                    contextObj.emptyDataMsgSettings(contextObj);                   
                }
                var fieldobj = new Array<FieldTable>();
                fieldobj.push({
                    Table1: eval(resultData["Table1"]),
                    Table2: eval(resultData["Table2"]),
                    Table3: eval(resultData["Table3"]),
                    expanded: true
                });
                if (fieldobj[0]["Table1"].length == 0 && contextObj.selectedUserId == undefined)
                {
                    contextObj.dsbleSaveBtn = true;
                }
                contextObj.FieldTable = fieldobj;
                if (contextObj.selectedUserId > 0) {
                    contextObj.selectedFieldData = JSON.parse(resultData["Table4"]);
                } else {
                    contextObj.spaceService.getAllocatedDrawings(contextObj.module).subscribe(function (resultData) {
                        contextObj.selectedFieldData = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    });
                }

            });
        //}
        //else
        //{
        //    obj.push({
        //        ReportFieldId: 2156,
        //        Value: "1"
        //    });
        //    contextObj.spaceService.getDrawingMangamentDataObject(obj, contextObj.selectedUserId).subscribe(function (resultData) {
        //        if (resultData["Table1"] == "[]") {
        //            contextObj.emptyDataMsgSettings(contextObj);
        //            contextObj.notificationService.ShowToaster("No Drawings exist", 2);
        //        }
        //        var fieldobj = new Array<FieldTable>();
        //        fieldobj.push({
        //            Table1: eval(resultData["Table1"]),
        //            Table2: eval(resultData["Table2"]),
        //            Table3: eval(resultData["Table3"]),
        //            expanded: true
        //        });
        //        contextObj.FieldTable = fieldobj;
        //        if (contextObj.selectedUserId > 0) {
        //            contextObj.selectedFieldData = JSON.parse(resultData["Table4"]);
        //        } else {
        //            contextObj.spaceService.getAllocatedDrawings(contextObj.module).subscribe(function (resultData) {
        //                contextObj.selectedFieldData = JSON.parse(resultData["Data"]["FieldBinderData"]);
        //            });
        //        }
        //    });
        //}

        var clmnfieldobj = new Array<TreeViewColumn>();
        clmnfieldobj.push({
            clmn1: ["SiteID", "SiteName"],
            clmn2: ["BuildingID", "BuildingName"],
            clmn3: ["DrawingID", "FloorName"]
        });
        contextObj.clmFieldTable = clmnfieldobj[0];             
    }
    getObjCategory() {


        switch (this.module) {
            case 7:
                this.objCategoryId = "1";
                break;
            case 8:
                this.objCategoryId = "2";
                break;
            case 17:
                this.objCategoryId = "8";
                break;
            case 18:
                this.objCategoryId = "9";
                break;
            case 24:
                this.objCategoryId = "20";
                break;
            case 25:
                this.objCategoryId = "10";
                break;
            case 26:
                this.objCategoryId = "11";
                break;
            case 27:
                this.objCategoryId = "12";
                break;
            default:
                this.objCategoryId = "0";
                break;
        }
    }

    submit(value: any) {
        var contextObj = this;
       
        if (contextObj.selectedUserId > 0) {

            this.spaceService.updateDrawingAccessForUser(value, contextObj.module, contextObj.selectedUserId).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    if (resultData.StatusId == 1) {
                        if (contextObj.module == '14')
                            contextObj.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
                        else
                            contextObj.notificationService.ShowToaster("Module wise Drawing Access Control updated", 3);
                    } else {
                        contextObj.notificationService.ShowToaster("iDrawings encountered an error while executing your command", 5);
                    }
                }
            });
        } else {
            this.spaceService.updateDrawingsManagement(value, this.module).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    if (contextObj.module == '14')
                        contextObj.notificationService.ShowToaster(contextObj.drawinglabel+" Management updated", 3);
                    else
                        contextObj.notificationService.ShowToaster("Drawing Management updated", 3);
                }
            });
        }

    }
    private emptyDataMsgSettings(contextObj) {
        if (contextObj.selectedUserId > 0) {
            
            switch (contextObj.module) {
                case "3":
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in As Builts module. Set access to drawings in As Builts module first", 5);
                    break;
                //case "14"://commented on 21/06/2017 suggested by tkk
                //    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in Space module. Set access to drawings in Space module first", 5);

                //    break;
                case "6":
                case "7":
                case "8":
                    contextObj.notificationService.ShowToaster("No utility drawing has been added to any floor", 5);
                    break;
                case "5":
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in Space module. Set access to drawings in Space module first", 5);

                    break;
                case "12":
                    contextObj.notificationService.ShowToaster("The selected user does not have access to any drawings in Space module. Set access to drawings in Space module first", 5);

                    break;
                case "14": contextObj.notificationService.ShowToaster("No Drawings exist", 5);
                    break
                default:
                    contextObj.notificationService.ShowToaster("No Drawings exist", 5);

                    break;

            }
        } else {
            if (contextObj.module=="14")
                contextObj.notificationService.ShowToaster("No Drawings exist", 5);
            else
                contextObj.notificationService.ShowToaster("No Drawings exist", 2);
        }
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


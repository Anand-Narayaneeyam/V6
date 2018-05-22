import {Component, Output, EventEmitter, SimpleChange, DoCheck, KeyValueDiffers, Input, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {SpaceService} from '../../../Models/Space/space.service'
import {DrawingDetailsService} from '../../../Models/Common/drawingdetails.service';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {EmployeeService} from '../../../models/employee/employee.services'
import { ObjectsService } from '../../../Models/Objects/objects.service'
import { GeneralFunctions} from '../../../Models/Common/General';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { TreeView } from '../../../Framework/Whatever/TreeView/treeview.component';


@Component({
    selector: 'floor-selection',
    templateUrl: './app/Views/Space/Space Data/floor-selection.component.html',
    directives: [GridComponent, PagingComponent, searchBox, SubMenu, TreeView],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService, DrawingDetailsService, EmployeeService, ObjectsService, GeneralFunctions]

})

export class FloorSelectionComponent implements AfterViewInit {

    @Input() moduleId: number;
    @Input() targetId: number;
    @Input() selectedid: any;
    objectCategoryId: any;
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: true, allowAdd: false, isHeaderCheckBx: true, allowSort: false, isautosizecolms: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    btnName: string = "Show Data";
    @Output() btnClickOut = new EventEmitter();
    btnEnabled: boolean = true;
    menuData: any;
    iscard = true;
    enableMenu: any[];
    isChanged: boolean = undefined;
    ///////////////////////////////////////////////////
    public keyWordLookup: any[];

    FieldTable: any;
    clmFieldTable: any;
    Criteria: any = 3;  /* for selecting drawing id*/
    selectedIds: any[];
    selectedFieldData: any;
    checkedId: any[] = [];
    DataKey: string = "DrawingID";

    constructor(private employeeService: EmployeeService, private _spaceService: SpaceService, private notificationService: NotificationService, private drawingDetailsService: DrawingDetailsService, private generFun: GeneralFunctions, private objectsService: ObjectsService) {
        //this.keyWordLookup=this._spaceService.getFloorSelectionKeyWordLookUp();
    }
    ngOnInit() {
        switch (this.moduleId) {
            case 6:
                this.objectCategoryId = 3;
                break;
            case 7:
                this.objectCategoryId = 1;
                break;
            case 8:
                this.objectCategoryId = 2;
                break;
            case 17:
                this.objectCategoryId = 8;
                break;
            case 18:
                this.objectCategoryId = 9;
                break;
            case 24:
                this.objectCategoryId = 20;
                break;
            case 25:
                this.objectCategoryId = 10;
                break;
            case 26:
                this.objectCategoryId = 11;
                break;
            case 27:
                this.objectCategoryId = 12;
                break;
        }
    }

    ngAfterViewInit() {
        var contextObj = this;
        if (contextObj.moduleId != undefined && ((this.moduleId != 5 && this.targetId != 2) || (this.moduleId == 5 && this.targetId != 2))) {
            this.loadFieldandSource(contextObj);
        }
        this.menuData = [
            {
                "id": 0,
                "title": this.btnName,
                "image": "Show Data",
                "path": "Show Data",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes["selectedid"] && changes["selectedid"]["currentValue"] && changes["selectedid"]["currentValue"] != changes["selectedid"]["previousValue"])
            this.loadFieldandSource(contextObj);
    }

    public loadFieldandSource(conxtObj: this) {
        conxtObj._spaceService.getFloorSelectionField().subscribe(function (result) {
            if (conxtObj.generFun.checkForUnhandledErrors(result)) {

                result["Data"].find(function (item) {
                    if (item.ReportFieldId == 540) {
                        item.Width = "*";
                        if (conxtObj.moduleId == 5 && conxtObj.targetId == 2)
                            item.isContentHtml = "hyperlink";
                    }
                    if (item.FieldId == 626)
                        item.Width = 220;

                });
                conxtObj.fieldObject = result["Data"];
            }
        });
        switch (conxtObj.moduleId) {
            case 3: //space
            case 14:   //scheduling  
                case 12:          
                conxtObj._spaceService.getFloorSelectionData(conxtObj.moduleId).subscribe(function (result) {
                    if (conxtObj.generFun.checkForUnhandledErrors(result)) {
                        if (result["Data"].Table1 != "[]") {
                            var fieldobj = new Array<FieldTable>();
                            fieldobj.push({
                                Table1: eval(result["Data"].Table1),
                                Table2: eval(result["Data"].Table2),
                                Table3: eval(result["Data"].Table3),
                                expanded: true
                            });
                            conxtObj.FieldTable = fieldobj;
                            conxtObj.drawingDetailsService.getDrawingLockedCount(118, conxtObj.moduleId).subscribe(function (resultData) {
                                if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {
                                    if (resultData["Data"] > 0)
                                        conxtObj.notificationService.ShowToaster(resultData["Data"] + " drawing(s) to be unlocked", 2);                                
                                }
                            });

                        } else {
                            conxtObj.drawingDetailsService.getDrawingLockedCount(118, 3).subscribe(function (resultData) {
                                if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {
                                    if (resultData["Data"] == 0)
                                        conxtObj.notificationService.ShowToaster("No unlocked drawings exist", 2)
                                    else
                                        conxtObj.notificationService.ShowToaster("No Floors exist", 2);
                                    conxtObj.enableMenu = [];
                                    //conxtObj.btnEnabled = false;
                                }
                            });
                        }
                    }
                });

                break;
            case 5://employee
                switch (conxtObj.targetId) {
                    case 2:
                        //  debugger
                        conxtObj.btnName = "Save Changes";

                            conxtObj.employeeService.getAllocatedDrawingsForSpacePlanningProject(50898, conxtObj.selectedid[0]).subscribe(function (resultData) {
                                conxtObj.selectedFieldData = JSON.parse(resultData["Data"]);

                                conxtObj.employeeService.getFloorforSpacePlanning(5, conxtObj.selectedid[0]).subscribe(function (result) {
                                           
                                    if (conxtObj.generFun.checkForUnhandledErrors(result)) {
                                        if (result["Data"].Table1 == "[]") {
                                            //conxtObj.btnEnabled = false;
                                            conxtObj.notificationService.ShowToaster("No Floors exist", 2);
                                            conxtObj.enableMenu = [];
                                        }
                                        else {
                                            var fieldobj = new Array<FieldTable>();
                                            fieldobj.push({
                                                Table1: eval(result["Data"].Table1),
                                                Table2: eval(result["Data"].Table2),
                                                Table3: eval(result["Data"].Table3),
                                                expanded: true
                                            });
                                            conxtObj.FieldTable = fieldobj;
                                        }
                                    }
                            });
                        });
                        break;
                    default:
                        conxtObj.employeeService.getAssignedEmployeeMainListData(5).subscribe(function (result) {
                            if (conxtObj.generFun.checkForUnhandledErrors(result)) {
                                if (result["Data"].Table1 == "[]") {
                                    //conxtObj.btnEnabled = false;
                                    conxtObj.notificationService.ShowToaster("No Floors exist", 2);
                                    conxtObj.enableMenu = [];
                                }
                                else {
                                    var fieldobj = new Array<FieldTable>();
                                    fieldobj.push({
                                        Table1: eval(result["Data"].Table1),
                                        Table2: eval(result["Data"].Table2),
                                        Table3: eval(result["Data"].Table3),
                                        expanded: true
                                    });
                                    conxtObj.FieldTable = fieldobj;
                                }
                            }
                        });
                }
                break;

            case 6://Telecom
            case 7://Assets
            case 8://Furniture
            case 17://Electrical
            case 18://Fire and Safety
            case 24://Security Assets 
            case 25://Mechanical 
            case 26://Plumbing 
            case 27://Medical Gas
                conxtObj.objectsService.getAssignedFloorlist(50896, conxtObj.objectCategoryId).subscribe(function (resultData) {
                    if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {

                        if (resultData["Data"].Table1 == "[]") {
                            //conxtObj.btnEnabled = false;
                            conxtObj.notificationService.ShowToaster("No Floors exist", 2);
                            conxtObj.enableMenu = [];
                        }
                        else {
                            var fieldobj = new Array<FieldTable>();
                            fieldobj.push({
                                Table1: eval(resultData["Data"].Table1),
                                Table2: eval(resultData["Data"].Table2),
                                Table3: eval(resultData["Data"].Table3),
                                expanded: true
                            });
                            conxtObj.FieldTable = fieldobj;
                        }

                    }
                });
                break;

            //case 8://Furniture
            //    conxtObj.objectsService.getAssignedFloorlist(50896, 2).subscribe(function (resultData) {
            //        if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {

            //            if (resultData["Data"].Table1 == "[]") {
            //                //conxtObj.btnEnabled = false;
            //                conxtObj.notificationService.ShowToaster("No Floors exist", 2);
            //                conxtObj.enableMenu = [];
            //            }
            //            else {
            //                var fieldobj = new Array<FieldTable>();
            //                fieldobj.push({
            //                    Table1: eval(resultData["Data"].Table1),
            //                    Table2: eval(resultData["Data"].Table2),
            //                    Table3: eval(resultData["Data"].Table3),
            //                    expanded: true
            //                });
            //                conxtObj.FieldTable = fieldobj;
            //            }

            //        }
            //    });
            //    break;

            //case 14: //scheduling               
            //    conxtObj._spaceService.getFloorSelectionData(14).subscribe(function (result) {
            //        if (conxtObj.generFun.checkForUnhandledErrors(result)) {
            //            if (result["Data"].Table1 != "[]") {
            //                var fieldobj = new Array<FieldTable>();
            //                fieldobj.push({
            //                    Table1: eval(result["Data"].Table1),
            //                    Table2: eval(result["Data"].Table2),
            //                    Table3: eval(result["Data"].Table3),
            //                    expanded: true
            //                });
            //                conxtObj.FieldTable = fieldobj;
            //                conxtObj.drawingDetailsService.getDrawingLockedCount(118, 14).subscribe(function (resultData) {
            //                    if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {
            //                        if (resultData["Data"] > 0)
            //                            conxtObj.notificationService.ShowToaster(resultData["Data"] + " drawing(s) to be unlocked", 2);
            //                    }
            //                });

            //            } else {
            //                conxtObj.drawingDetailsService.getDrawingLockedCount(118, 14).subscribe(function (resultData) {
            //                    if (conxtObj.generFun.checkForUnhandledErrors(resultData)) {
            //                        if (resultData["Data"] == 0)
            //                            conxtObj.notificationService.ShowToaster("No unlocked drawings exist", 2)
            //                        else
            //                            conxtObj.notificationService.ShowToaster("No Floors exist", 2);
            //                            conxtObj.enableMenu = [];
            //                        //conxtObj.btnEnabled = false;
            //                    }
            //                });
            //            }
            //        }
            //    });

        }

        var clmnfieldobj = new Array<TreeViewColumn>();
        clmnfieldobj.push({
            clmn1: ["SiteID", "SiteName"],
            clmn2: ["BuildingID", "BuildingName"],
            clmn3: ["DrawingID", "FloorName"]
        });
        conxtObj.clmFieldTable = clmnfieldobj[0];

    }

    public onSubMenuChange(event: any) {
        this.isChanged = !this.isChanged;
    }

    btnClick() {
        this.isChanged = !this.isChanged;

    }

    onColValClick(colVal) {
       
    }
    //search
    SaveAs(event: any) {
     
    }
    Delete(event: any) {
      
    }
    onloadSearch(event: any) {
       
    }
    Clear(event: any) {
        
    }
    Submit(event: any) {
        
    }
    //end search


    submitValues(value: any) {
        debugger;
        var Ids = JSON.parse(value.FieldIdValues);
        this.selectedIds = [];
        for (let i = 0; i < Ids.length; i++) {
            this.selectedIds.push(Ids[i]["ValueId"]);
        }
        if (this.moduleId == 5 && this.targetId == 2)
            this.btnClickOut.emit({ SelectedIds: this.selectedIds })
        else {
            if (Ids.length > 0) {
                this.btnClickOut.emit({ SelectedIds: this.selectedIds })

            } else {
                this.notificationService.ShowToaster("Select Floor(s)", 2);
            }
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
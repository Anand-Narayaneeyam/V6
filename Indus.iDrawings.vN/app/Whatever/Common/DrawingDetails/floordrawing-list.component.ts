/// <reference path="../../../models/common/general.ts" />
import {Component, OnInit, Output, SimpleChange, Input,OnChanges, DoCheck, KeyValueDiffers, EventEmitter, AfterViewInit } from '@angular/core';
import {NgControl} from '@angular/common';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {AsbuiltService} from '../../../Models/Asbuilts/asbuilt.service';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../Framework/Models//Interface/IField'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {SortHelper} from '../../utils/sortHelper'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {DrawingDetailsService} from '../../../Models/Common/drawingdetails.service';
import {EmployeeService} from '../../../Models/Employee/employee.services'
import {SpaceService} from '../../../Models/Space/space.service'
import {SchedulingService} from '../../../Models/Scheduling/scheduling.service'
import {ObjectsService} from '../../../Models/Objects/objects.service'
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';

@Component({
    selector: 'floor-drawing-list',
    templateUrl: './app/Views/Common/DrawingDetails/floordrawing-list.component.html',
    providers: [SortHelper, NotificationService, GeneralFunctions, AsbuiltService, DrawingDetailsService, EmployeeService, SpaceService, SchedulingService, ObjectsService, AdministrationService],
    inputs: ['action', 'pageTarget', 'moduleId', 'returnData', 'floordrawingId', 'revisions', 'objectCategoryId', 'markups', 'connectivityListInputs','archiveId'],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, Notification, searchBox, SlideComponent, Analytics]

})
export class FloorDrawingListComponent implements AfterViewInit {
    @Input() BlinkSecondDrawings: any;
    @Input() EmployeMovedrawingId: any;
    connectivityListInputs: any;
    disable = false;
    returnData: any
    position = "top-right";
    showSlide = false;
    floordrawingId: number = 0;
    archiveId: number = 0;
    revisions: number = -1;
    markups: number = -1;
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = true;
    success: any;
    private floorDrawingListFormId = 48;
    private spaceFloorDrawingListFormId = 112;
    private employeeDrawingListFormId = 156;
    private assetDrawingListFormId = 164;
    private schedulingDrawingListFormId = 165;
    action: string;
    pageTarget: any;
    moduleId: any;
    objectname: any;
    objectCategoryId: any;
    floorId: number;
    revisionNo: number;
    //  @Output() selectedSiteIdsChange = new EventEmitter();
    @Output() updateFloorSelectedIds = new EventEmitter();
    @Output() targetTab = new EventEmitter();
    @Output() onFloorSelectionChange = new EventEmitter();
    @Output() fieldobjectsFloor = new EventEmitter();
    @Output() onNoFloorData = new EventEmitter();
    pageTitle: string = "Floor Drawing List";
    public totalItems: number;
    public itemsPerPage: number
    itemsSource: any[];
    id: any;
    inputItems: IGrid = { dataKey: "DrawingId", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '', selectioMode: 'Multiple', showContextMenu: false };

    fieldObject: IField[];
    dwgFilename: string;
    differ: any;
    dataKey: any;

    public keyWordLookup: any[];   
    pageIndex: number = 0;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    advancelookup: IField[];
    KeywordFieldObject: any;
    refreshgrid;
    partialFloorWing: boolean = false;
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;
    drawinglabel: string;

    constructor(private asbuiltService: AsbuiltService, private _sortHelper: SortHelper, private differs: KeyValueDiffers, private _notificationService: NotificationService, private generalFunctions: GeneralFunctions, private drawingDetailsService: DrawingDetailsService, private employeeService: EmployeeService, private _spaceService: SpaceService, private schedulingService: SchedulingService, private objectsService: ObjectsService, private administrationService: AdministrationService) {
        var contextObj = this;
        contextObj.differ = differs.find({}).create(null);
       // contextObj.keyWordLookup = contextObj.employeeService.getAllEmployeeSearchKeyWordLookup();
    }
    ngOnInit() {
        this.getCusSubscribedFeatures();

    }
    private getCusSubscribedFeatures() {
        var contextObj = this;
        contextObj.administrationService.getCustomerSubscribedFeatures("26,276").subscribe(function (rt) {

            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 26:
                        contextObj.partialFloorWing = customerFeatureobj[i]["IsSubscribed"];
                        break;
                    case 276:
                        contextObj.drawinglabel = customerFeatureobj[i]["Value"] == "" ? "Drawing" : customerFeatureobj[i]["Value"] ;
                      
                        break;

                }
            }

        });
    }
    ngAfterViewInit() {
        debugger
        var contextObj = this;  
        switch (contextObj.moduleId)
        {
            case 1:
                this.inputItems.showContextMenu = true;
            case 6:
                this.objectname = "Object";
                break;
            case 7:
                this.objectname = "Asset";
                break;
            case 8:
                this.objectname = "Furniture";
                break;
            case 17:
            case 18:
            case 25:
            case 26:
            case 27:
                this.objectname = "Component";
                break;
            case 24:
                this.objectname = "Equipment";
                break;
          
            default:
                break;
        }
         
        contextObj.objectCategoryId;   
        contextObj.dataKey = ["DrawingId"];
        switch (contextObj.moduleId) // related to module wise drawing list
        {
           
            case 1: switch (contextObj.pageTarget) { // As-Builts
                case 1:
                   
                    contextObj.asbuiltService.getFloorDrawingsFields(contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        }
                    });
                    contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId,contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                      //console.log('Floor list', resultData["Data"]);
                      if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                          contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                          contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                          contextObj.totalItems = resultData["Data"].DataCount;
                          if (contextObj.totalItems == 0 || contextObj.totalItems == undefined)
                          {
                              contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                              contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                              contextObj.disable = true;
                          }
                          else
                              contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                      }
                    });
                    contextObj.asbuiltService.getAllFloorDrawingKeywordField().subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                        }
                    });
                    break;
                case 2:
                    contextObj.asbuiltService.getFloorDrawingsFields(contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        }
                    });
                    contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                        //console.log('Floor list', resultData["Data"]);
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource =  JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            if (contextObj.totalItems == 0 || contextObj.totalItems == undefined)
                            {
                                contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                                contextObj.disable = true;
                            }
                            else
                                contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                        }
                    });
                    contextObj.asbuiltService.getAllFloorDrawingKeywordField().subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                        }
                    });
                    break;
                case 3://load floor data after closing view tab (view selected from revision list)
                case 4://load floor data after closing view tab (view selected from markup list)
                case 12://CAI
                  //  var contextObj = contextObj;
                    contextObj.asbuiltService.getFloorDrawingsFields(contextObj.floorDrawingListFormId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        }
                    });
                    contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                         //console.log('floorDrawingListFormId', contextObj.floorDrawingListFormId);
                        //console.log('Floor list', resultData["Data"]);
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            if (contextObj.totalItems == 0 || contextObj.totalItems == undefined) {
                                contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                            }
                            else
                                contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                        }
                    });
                    contextObj.asbuiltService.getAllFloorDrawingKeywordField().subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                        }
                    });
                    break;


            }
                break;
            case 2: switch (contextObj.pageTarget) { // projects
                case 1:// main dawing list
                   
                    break;
                case 2://unlock drawing list
                    break;
            }
                break;
            case 3:
                case 12:/*CAI*/
                switch (contextObj.pageTarget) {//Space
                case 1://drawinglist
                   // var contextObj = this;

                  //  contextObj.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: false };
                    let unlockedCount: number = 0;
                    contextObj.drawingDetailsService.getDrawingLockedCount(contextObj.spaceFloorDrawingListFormId, 3).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            unlockedCount = resultData["Data"];
                            if (unlockedCount > 0)
                                contextObj._notificationService.ShowToaster(unlockedCount.toString() + " drawing(s) to be unlocked", 2);
                        }
                    });
                    contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                                if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                                    contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                                    contextObj._spaceService.getSpaceFloorDrawingsData(contextObj.spaceFloorDrawingListFormId, contextObj.moduleId).subscribe(function (resultData) {

                                        //console.log('Floor list', resultData["Data"]);
                                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                                        contextObj.totalItems = resultData["Data"].DataCount;
                                        if (contextObj.totalItems == 0 || contextObj.totalItems == undefined) {
                                            var msg = "";
                                            if (contextObj.moduleId == 12) {
                                                msg = "No Drawings are selected for CAI Drawing Management";
                                            } else {
                                                msg = "No Drawings are selected for Space Management";
                                            }
                                            contextObj._notificationService.ShowToaster(msg, 2);
                                            contextObj.onNoFloorData.emit({});
                                        }

                                    });
                                }
                            });
                      
                
                    break;
                case 2://unlock
                  //  var contextObj = this;
                  //  contextObj.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: false };

                    contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        }
                    });
                    contextObj.drawingDetailsService.getspacelockdrawingListData(contextObj.moduleId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                            contextObj.itemsPerPage = resultData.RowsPerPage;
                            contextObj.totalItems = resultData.DataCount;
                            if (contextObj.itemsSource.length == 0) {
                                contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                contextObj.onNoFloorData.emit({});
                            }
                        }
                    });
                    break;
                case 3://lock
                   // var contextObj = this;
                 //   contextObj.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: false };

                    contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = resultData["Data"];
                        }
                        // contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                    });
                    contextObj._spaceService.unlockedDrawings(contextObj.moduleId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData.Data.FieldBinderData);
                            contextObj.itemsPerPage = resultData.Data.RowsPerPage;
                            contextObj.totalItems = resultData.Data.DataCount;
                            if (contextObj.itemsSource.length == 0)
                            {
                                contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                                contextObj.onNoFloorData.emit({});
                            }
                        }
                    });
                    break;
                case 4://delete
                   // var contextObj = this;
                  //  contextObj.inputItems = { dataKey: "DrawingId", groupBy: ["Site", "Building"], grpWithCheckBx: false, allowAdd: false, isHeaderCheckBx: false };
                    
                    contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.fieldObject = resultData["Data"];
                            //  contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        } });
                    contextObj._spaceService.unlockedDrawings(contextObj.moduleId).subscribe(function (resultData) {

                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData.Data.FieldBinderData);
                        contextObj.itemsPerPage = resultData.Data.RowsPerPage;
                        contextObj.totalItems = resultData.Data.DataCount;
                        if (contextObj.itemsSource.length == 0)
                        {
                            contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                            contextObj.onNoFloorData.emit({});
                        }
                        }
                    });
                    break;
                case 10://for archive drawing list
                        debugger
                        contextObj.asbuiltService.getFloorDrawingsFields(contextObj.spaceFloorDrawingListFormId).subscribe(function (resultData) {
                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.fieldObject = resultData["Data"];
                            }
                        });
                        contextObj._spaceService.GetArchiveDrawingDetails(contextObj.archiveId, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol).subscribe(
                        function (resultData) {

                            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                                contextObj.itemsPerPage = resultData.RowsPerPage;
                                contextObj.totalItems = resultData.DataCount;
                             }
                        });
                    break;
            }
                break;
            case 4: //Documents
                break;
            case 5: switch (contextObj.pageTarget) {//Employees
                case 1:
                  //  var contextObj = this;
                  //  contextObj.inputItems.isautosizecolms = false;
                    contextObj.employeeService.getEmployeeDrawingsFields(contextObj.employeeDrawingListFormId).subscribe(function (resultData) {
                       
                            resultData["Data"].find(function (item) {
                                if (item.ReportFieldId == 513) {
                                    item.Width = 180;
                                   
                                }
                              

                            });
                            contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                       
                    });
                    contextObj.employeeService.getEmployeerawingListData(contextObj.employeeDrawingListFormId,contextObj.moduleId).subscribe(function (resultData) {
                        //if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                            contextObj.itemsPerPage = resultData.RowsPerPage;
                            contextObj.totalItems = resultData.DataCount;
                            if (contextObj.itemsSource.length == 0)
                            {
                                contextObj._notificationService.ShowToaster("No Drawings are selected for Employee Management", 2);
                                contextObj.onNoFloorData.emit({});
                            }
                       // }
                    });
                    break;
                case 6: //Employee Move Second Drawing List  
                    contextObj.employeeService.getEmployeeDrawingsFields(contextObj.employeeDrawingListFormId).subscribe(function (resultData) {

                        resultData["Data"].find(function (item) {
                            if (item.ReportFieldId == 513) {
                                item.Width = 180;

                            }


                        });
                        contextObj.fieldObject = resultData["Data"];
                        contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })

                    });
                    contextObj.employeeService.getEmployeerawingListData(contextObj.employeeDrawingListFormId, contextObj.moduleId, contextObj.EmployeMovedrawingId).subscribe(function (resultData) {
                        //if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                        contextObj.itemsPerPage = resultData.RowsPerPage;
                        contextObj.totalItems = resultData.DataCount;
                        if (contextObj.itemsSource.length == 0) {
                            contextObj._notificationService.ShowToaster("No Drawings are selected for Employee Management", 2);
                            contextObj.onNoFloorData.emit({});
                        }
                        // }
                    });
                    break;
            }
                break;
            case 6://telecom
            case 7://assets
            case 8://furniture
            case 17://electrical
            case 18://fire and safety
            case 24://security assets
            case 25://mechanical
            case 26://plumbing
            case 27://medical gas
                debugger
                switch (contextObj.pageTarget) {
                case 1:
                   // var contextObj = this;
                    contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        }
                    });
                    contextObj.objectsService.getObjectDrawingListData(contextObj.assetDrawingListFormId, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
                        debugger
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            if (contextObj.itemsSource.length == 0) {
                                contextObj._notificationService.ShowToaster("No Drawings are selected for " + contextObj.objectname + " Management", 2);
                                contextObj.onNoFloorData.emit({});
                            }
                        }
                    });
                    break;

                case 2:
                    // var contextObj = this;
                    contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        }
                    });
                    contextObj.objectsService.getObjectDrawingListData(contextObj.assetDrawingListFormId, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            if (contextObj.itemsSource.length == 0)
                            {
                                contextObj._notificationService.ShowToaster("No Drawings are selected for " + contextObj.objectname + " Management", 2);
                                contextObj.onNoFloorData.emit({});
                            }
                        }
                    });
                    break;


                case 4:    /*Open Another Drawing*/
                        var SecondBlinkDetails = contextObj.BlinkSecondDrawings;
                        SecondBlinkDetails = SecondBlinkDetails.filter(function (item) { return item.ReportFieldId != 669 });
                        contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (result) {
                        contextObj.objectsService.getSecondDrawingList(JSON.stringify(SecondBlinkDetails)).subscribe(function (resultData) {   
                            debugger
                         //   contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
                            contextObj.itemsPerPage = JSON.parse(resultData["FieldBinderData"]).RowsPerPage;
                            contextObj.totalItems = JSON.parse(resultData["FieldBinderData"]).DataCount;
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.fieldObject = result["Data"];
                           // contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        }
                        });
                });
                    break;
            }
                break;

            //case 8: switch (contextObj.pageTarget) {//furniture
            //    case 1:
            //        // var contextObj = this;
            //        contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (resultData) {
            //            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            //                contextObj.fieldObject = resultData["Data"];
            //                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
            //            }
            //        });
            //        contextObj.objectsService.getAssetDrawingListData(contextObj.assetDrawingListFormId, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
            //            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            //                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            //                //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
            //                contextObj.itemsPerPage = resultData.RowsPerPage;
            //                contextObj.totalItems = resultData.DataCount;
            //                if (contextObj.itemsSource.length == 0) {
            //                    contextObj._notificationService.ShowToaster("No Drawings are selected for Furniture Management", 2);
            //                    contextObj.onNoFloorData.emit({});
            //                }
            //            }
            //        });
            //        break;

            //    case 2:
            //        // var contextObj = this;
            //        contextObj.objectsService.getAssetsDrawingsFields().subscribe(function (resultData) {
            //            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            //                contextObj.fieldObject = resultData["Data"];
            //                contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
            //            }
            //        });
            //        contextObj.objectsService.getAssetDrawingListData(contextObj.assetDrawingListFormId, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
            //            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
            //                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            //                //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
            //                contextObj.itemsPerPage = resultData.RowsPerPage;
            //                contextObj.totalItems = resultData.DataCount;
            //                if (contextObj.itemsSource.length == 0) {
            //                    contextObj._notificationService.ShowToaster("No Drawings are selected for Furniture Management", 2);
            //                    contextObj.onNoFloorData.emit({});
            //                }
            //            }
            //        });
            //        break;
            //}
            //    break;
            case 14: switch (contextObj.pageTarget) {//scheduling
                case 1:
                   // var contextObj = this;
                    contextObj.schedulingService.getScheduledDrawingsFields().subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.fieldObject = resultData["Data"];
                            contextObj.fieldobjectsFloor.emit({ fields: contextObj.fieldObject })
                        } });
                    contextObj.schedulingService.getSchedulingDrawingListData(contextObj.schedulingDrawingListFormId, contextObj.moduleId).subscribe(function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            if (contextObj.itemsSource.length == 0)
                            {
                              
                                contextObj._notificationService.ShowToaster("No " + contextObj.drawinglabel + "s are selected for Scheduling Management", 2);
                                contextObj.onNoFloorData.emit({});
                            }
                        }
                    });
                    break;
            }
                break;

        }

    }
    ngDoCheck() {
        var contextobje = this;
        var changes = contextobje.differ.diff(contextobje.inputItems.selectedIds);
        if (changes) {
            var scopefloordrawing = contextobje.inputItems.selectedIds;
            contextobje.floorId = contextobje.inputItems.rowData.FloorID;
            contextobje.revisionNo = contextobje.inputItems.rowData.Revisions;
            contextobje.dwgFilename = contextobje.inputItems.rowData["DWG File"];
            //console.log("roedata", contextobje.inputItems.rowData);        
            contextobje.updateFloorSelectedIds.emit({
                scopefloordrawing, rowData: contextobje.inputItems.rowData, totalItems: contextobje.totalItems
            })
        }

        //  //console.log("selected  "+ this.inputItems.selectedIds)
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        
        if (changes["returnData"] && changes["returnData"]["currentValue"] != undefined) {
            if (contextObj.action == 'add' && contextObj.itemsSource != undefined) {
               // contextObj.itemsSource.unshift(JSON.parse(changes["returnData"]["currentValue"])[0]);
               //// contextObj.itemsSource.push(JSON.parse(changes["returnData"]["currentValue"])[0]);
               // var updatedData = new Array();/*To notify the watcher about the change*/
               // updatedData = updatedData.concat(contextObj.itemsSource);
               // contextObj.itemsSource = updatedData;
               // contextObj.totalItems = contextObj.generalFunctions.updateTotalItems(contextObj.totalItems, "add");
               // debugger
                var returnData = { returnData: changes["returnData"]["currentValue"] };
                let retUpdatedSrc;
                retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "add", returnData, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });            
                contextObj.disable = false;

            }
            else if (contextObj.itemsSource != undefined && (contextObj.action == 'edit' || contextObj.action == 'replace' || contextObj.action == 'revise')) {
                //
             
                if (contextObj.inputItems.selectedIds.length == 1) {
                    var datakey = contextObj.inputItems.dataKey;
                    for (let i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i][datakey] == JSON.parse(changes["returnData"]["currentValue"])[0][datakey]) {
                            contextObj.itemsSource[i] = JSON.parse(changes["returnData"]["currentValue"])[0]
                           // var updatedData = new Array();/*To notify the watcher about the change*/
                          //  updatedData = updatedData.concat(contextObj.itemsSource);
                            //contextObj.itemsSource = updatedData;
                            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                        }
                    }
                }
            }

        }
        else if ((contextObj.action == 'deletespacedata') && contextObj.itemsSource != undefined) {

            let retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj._notificationService.ShowToaster("Space Data for the selected floor(s) deleted", 3);

        }
        else if (changes["action"] && changes["action"]["currentValue"] == "lockDrawingSuccess" && contextObj.itemsSource != undefined) {
            let retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            contextObj.totalItems = retUpdatedSrc["itemCount"];
        }
        else if (changes["action"] && changes["action"]["currentValue"] == "delete") {
            contextObj.showSlide = !contextObj.showSlide;
        }
        else if (changes["revisions"] && changes["revisions"]["currentValue"] != undefined) {//update revision count

            let revisionnumber = changes["revisions"]["currentValue"];
            let drawingId = this.floordrawingId;
            if (this.itemsSource) {
                var list = this.itemsSource.find(function (el) {
                    return el.DrawingId === drawingId
                });
                if (list) {
                    list.Revisions = revisionnumber;
                    for (let i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i][contextObj.dataKey] == drawingId) {
                            contextObj.itemsSource[i] = list;
                            var updatedData = new Array();/*To notify the watcher about the change*/
                            updatedData = updatedData.concat(contextObj.itemsSource);
                            contextObj.itemsSource = updatedData;
                            break;
                        }
                    }
                }
            }
        }
        else if (changes["markups"] && changes["markups"]["currentValue"] != undefined) {//markup count

            let markupNumber = changes["markups"]["currentValue"];
            let drawingId = this.floordrawingId;
            if (this.itemsSource) {
                var list = this.itemsSource.find(function (el) {
                    return el.DrawingId === drawingId
                });
                if (list) {
                    list.Markups = markupNumber;
                    for (let i = 0; i < contextObj.itemsSource.length; i++) {
                        if (contextObj.itemsSource[i][contextObj.dataKey] == drawingId) {
                            contextObj.itemsSource[i] = list;
                            var updatedData = new Array();/*To notify the watcher about the change*/
                            updatedData = updatedData.concat(contextObj.itemsSource);
                            contextObj.itemsSource = updatedData;
                            break;
                        }
                    }
                }
            }
        }

    }
    okFloorDelete(event: any) {
        var contextObj = this;      
        function findEntity(entity) {
            return entity.Id === contextObj.inputItems.selectedIds[0];
        }
        debugger
        contextObj.revisionNo = contextObj.inputItems.rowData.Revisions;
        if (contextObj.revisionNo == 0) {
            contextObj.asbuiltService.deleteFloorDrawing(contextObj.inputItems.selectedIds, 0, contextObj.floorId, contextObj.dwgFilename).subscribe(function (resultData) {
                if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["ServerId"] >= 0) {
                        let retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                        contextObj.totalItems = retUpdatedSrc["itemCount"];
                        contextObj._notificationService.ShowToaster("Drawing deleted", 3);

                        if (contextObj.itemsSource.length == 0) {
                            contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                            contextObj.disable = true;
                        }
                    }
                    else
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            })
        } else {
            contextObj.asbuiltService.deleteFloorDrawing(contextObj.inputItems.selectedIds, contextObj.revisionNo, 0, contextObj.dwgFilename).subscribe(function (resultData) {
                if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"]["ServerId"] >= 0) {

                        var datakey = contextObj.inputItems.dataKey;
                        for (let i = 0; i < contextObj.itemsSource.length; i++) {
                            if (contextObj.itemsSource[i][datakey] == contextObj.inputItems.selectedIds[0]) {
                                contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data)[0];
                                var updatedData = new Array();/*To notify the watcher about the change*/
                                updatedData = updatedData.concat(contextObj.itemsSource);
                                contextObj.itemsSource = updatedData;
                            }
                        }
                        contextObj._notificationService.ShowToaster("Drawing deleted", 3);


                    }
                    else
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            })
        }
      
        contextObj.showSlide = !contextObj.showSlide;    
    }
    public onSort(objGrid: any) {    
        var contextObj = this;    
        contextObj.inputItems.sortCol = objGrid.sortCol;
        contextObj.inputItems.sortDir = objGrid.sortDir;
        switch (contextObj.moduleId) // related to module wise drawing list
        {
            case 1: switch (contextObj.pageTarget) { // As-Builts
                case 1:
                    contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                       // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                      //  }
                    });
                    break;
                case 2:
                    contextObj.asbuiltService.getFloorDrawingsData(contextObj.floorDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(
                        function (resultData) {
                            //if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                           // }
                    });
                    break;
            }
                break;

            case 3:
            case 12:/*CAI*/
                switch (contextObj.pageTarget) {//Space Drawing List
                case 1: contextObj.drawingDetailsService.sortSpaceDrawing(contextObj.spaceFloorDrawingListFormId, objGrid.sortDir, objGrid.sortCol, contextObj.moduleId).subscribe(
                    function (resultData) {
                      //  if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                      //  }
                    });
                    break;
                case 2: contextObj.drawingDetailsService.sortSpaceUnlockDrawing(objGrid.sortDir, objGrid.sortCol, contextObj.moduleId).subscribe(//Space unlock
                    function (resultData) {
                    debugger
                       // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]))
                       // }
                    });
                    break;
                case 3: contextObj._spaceService.sortSpaceUnlockedData(objGrid.sortDir, objGrid.sortCol, contextObj.moduleId).subscribe(
                    function (resultData) {

                       // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                       // }
                    });
                    break;
                case 4: contextObj._spaceService.sortSpaceUnlockedData( objGrid.sortDir, objGrid.sortCol, contextObj.moduleId).subscribe(
                    function (resultData) {
                     
                       // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                       // }
                    });
                    break;
                case 10://for archive drawing list
                        contextObj._spaceService.GetArchiveDrawingDetails(contextObj.archiveId, contextObj.pageIndex, objGrid.sortDir, objGrid.sortCol).subscribe(
                            function (resultData) {

                                // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                                (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                                // }
                            });
                    break;

            }
                break;
            case 5: switch (contextObj.pageTarget) {//Employees
                case 1:
                    //  var contextObj = this;
                    contextObj.employeeService.getEmployeerawingListDataSort(contextObj.employeeDrawingListFormId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                       // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);                           
                        //}
                    });
                    break;
            }
                break;
            case 6://telecom
            case 7://assets
            case 8://furniture
            case 17://electrical
            case 18://fire and safety
            case 24://security assets
            case 25://mechanical
            case 26://plumbing
            case 27://medical gas
                switch (contextObj.pageTarget) {
                    case 1:
                        // var contextObj = this;
                        contextObj.objectsService.getObjectDrawingListDataSort(contextObj.assetDrawingListFormId, contextObj.objectCategoryId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            // }
                        });
                        break;

                    case 2:
                        // var contextObj = this;
                        contextObj.objectsService.getObjectDrawingListDataSort(contextObj.assetDrawingListFormId, contextObj.objectCategoryId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                            //if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                            contextObj.totalItems = resultData["Data"].DataCount;
                            // }
                        });
                        break;
                }
                break;
            case 14: switch (contextObj.pageTarget) {//scheduling
                case 1:
                    // var contextObj = this;
                    contextObj.schedulingService.getSchedulingDrawingListDataSort(contextObj.schedulingDrawingListFormId, contextObj.moduleId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                       // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                       // }
                    });
                    break;

                case 2:
                    // var contextObj = this;
                    contextObj.schedulingService.getSchedulingDrawingListDataSort(contextObj.schedulingDrawingListFormId, contextObj.moduleId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                       // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                       // }
                    });
                    break;
            }
        }
    }
    public pageChanged(event: any) {
        // alert("pageChanged");
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        switch (contextObj.moduleId) // related to module wise drawing list
        {
            case 1: switch (contextObj.pageTarget) { // As-Builts
                case 1:
                    contextObj.asbuiltService.FloorDrawingPaging(contextObj.floorDrawingListFormId, event.pageEvent.page, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe
                    (function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                        }
                    });
                    break;
                case 2:
                   // contextObj.asbuiltService.Paging(contextObj.floorDrawingListFormId, event.pageEvent.page).subscribe(resultData => contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
                    contextObj.asbuiltService.FloorDrawingPaging(contextObj.floorDrawingListFormId, event.pageEvent.page, this.inputItems.sortCol, this.inputItems.sortDir, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe
                   ( function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                        }
                    });
                    break;
            }
                break;
            case 3:
                case 12:/*CAI*/
                switch (contextObj.pageTarget) {//Space
                case 1: contextObj.asbuiltService.spaceDrawingPaging(contextObj.spaceFloorDrawingListFormId, event.pageEvent.page, contextObj.moduleId).subscribe
                    (function (resultData) {
                        if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                            (contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))
                        }
                    });
                    break;
            }
                break;
                case 6://telecom
                case 7://assets
                case 8://furniture
                case 17://electrical
                case 18://fire and safety
                case 24://security assets
                case 25://mechanical
                case 26://plumbing
                case 27://medical gas
                    contextObj.objectsService.getObjectDrawingListDataSort(contextObj.assetDrawingListFormId, contextObj.objectCategoryId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter, contextObj.advanceValue, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch).subscribe(function (resultData) {
                        // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.totalItems = resultData["Data"].DataCount;
                        if (contextObj.itemsSource.length == 0) {
                            contextObj._notificationService.ShowToaster("No Drawings are selected for " + contextObj.objectname + " Management", 2);
                        }
                        //contextObj.itemsSource = JSON.parse(resultData.FieldBinderData);
                        // }
                    });
                    break;

        }
    }
    RowUpdate(event: any) {
        // alert("RowUpdate");
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 1)
            contextObj.id = contextObj.inputItems.selectedIds
      
        //console.log(event);
        this.asbuiltService.postgetaction(event, contextObj.id).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.success = (resultData["Data"]);
                if (contextObj.success["Data"] != "") {
                    contextObj._notificationService.ShowToaster("Site Updated", 3);
                    contextObj.returnData = contextObj.success["Data"];

                }
            }
        });

    }
    RowDelete(event: any) {
     //   if (this.delete == true)
            this.showSlide = !this.showSlide;
        // this.confirmationService.ShowPrompt("Are you sure you want to delete the selected Site?", "Yes");       
    }
    RowAdd(event: any) {
        let test = this.generalFunctions.getFieldValuesAsReportFieldArray(event);
        //console.log("fieldConverion", test);
        // this.administrationService.submitSiteAdd(test);
        this._notificationService.ShowToaster("Site added", 3);
    }
    onColValClick(colVal) {
        this.targetTab.emit("1");
        //console.log("colName", colVal.colName)
        //console.log("colVal", colVal.colVal);
    }
    SaveAs(event: any) {
        //console.log('Entered Save As');
    }
    Delete(event: any) {

        //console.log('Entered Delete');
    }
   
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }
    floorSelectionChange(event: any) {
      
        //this.floorId = event.rowdata.FloorID;
        //this.revisionNo = event.rowdata.Revisions;  
        //this.dwgFilename = event.rowdata["DWG File Name"];    
        this.onFloorSelectionChange.emit({ event, totalcount: this.totalItems  });
    }
    //search
    onloadSearch(event: any) {
        var contextObj = this;
        contextObj.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;

        this.asbuiltService.AllFloorDrawingKeywordSeach(event.value, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
           
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.itemsSource.length == 0) {
                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                    contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                }
                else {
                    contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                }
            
        });
    }
    Clear(event: any) {
        var contextObj = this;
        this.asbuiltService.getAllFloorDrawingAdvanceSearchLookup().subscribe(function (resultData) {
            contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (el) {
                if (el.FieldId == 1291 && contextObj.partialFloorWing == false) {
                    // debugger
                    return false
                }
                else {
                    return true
                }
            });
        });
    }
    Submit(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        this.asbuiltService.AllFloorDrawingAdvanceSeachResult(event.fieldobject, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
           // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
                if (contextObj.itemsSource.length == 0) {
                    contextObj._notificationService.ShowToaster("No Drawings exist", 2);
                    contextObj.onNoFloorData.emit({ moduleId: contextObj.moduleId, pageTarget: contextObj.pageTarget });
                }
                else {

                    contextObj.onNoFloorData.emit({ total: contextObj.itemsSource });
                }
           // }

        });
    }
    advanceSearch() {
        //debugger
        var contextObj = this;
        this.asbuiltService.getAllFloorDrawingAdvanceSearchLookup().subscribe(function (resultData) {
           // if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"].filter(function (el) {
                    if (el.FieldId == 1291 && contextObj.partialFloorWing == false) {
                       // debugger
                        return false
                    }
                    else {
                        return true
                    }
                });

               // contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
           // }
        });
    }
    onContextMenuOnClick(event: any) {
        var tempID: any = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = tempID;
            this.analyticsInput.moduleId = this.moduleId;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = this.floorDrawingListFormId;
            this.analyticsInput.ParentFormId = 233;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}
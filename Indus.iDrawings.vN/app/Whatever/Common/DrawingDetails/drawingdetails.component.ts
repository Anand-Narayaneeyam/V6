import {Component, ChangeDetectorRef, EventEmitter, Output, Input, AfterViewInit,ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {IGrid} from '../../../Framework/Models/Interface/IGrid';
import {IField} from '../../../Framework/Models//Interface/IField';
import {DrawingDetailsService} from '../../../Models/Common/drawingdetails.service';
import {AsbuiltService} from '../../../Models/Asbuilts/asbuilt.service';
import {SortHelper} from '../../utils/sortHelper';
import {OpenDrawing} from '../opendrawing/opendrawing.component';
import {RevisionList} from './revisionlist.component';
import {MarkupsList} from './markuplist.component';
import {ModuleSwitchComponent} from './moduleswitch.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { DrawingAddEditComponent } from './drawing-addedit.component';
import {ReviewWorkFlowService} from '../../../models/common/reviewworkflow.service'
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import {BuildingDrawingListComponent} from './buildingdrawing-list.component';
import {FloorDrawingListComponent} from './floordrawing-list.component';
import {SiteDrawingListComponent} from './sitedrawing-list.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import '../../../../Scripts/RSA.js';
let RSAObject = require('../../../../Scripts/RSA.js');
import {SpaceService} from '../../../Models/Space/space.service'
import {MarkupDescriptionComponent} from '../../../whatever/Asbuilts/Drawing Settings/markup-description.component';
import {AdministrationService} from '../../../models/administration/administration.service'
import {ReserveRoomSchedulingOpenDrawing } from '../../scheduling/drawings/reserveroom.schedulingopendrawing.component';
import {WexBMViewerComponent} from './wexbimViewer.component';

@Component({
    selector: 'drawingdetails',
    templateUrl: './app/Views/Common/DrawingDetails/drawingdetails.component.html',
    styleUrls: ['app/Views/Common/DrawingDetails/drawingdetails.css'],
    directives: [ReserveRoomSchedulingOpenDrawing, PageComponent, TabsComponent, TabComponent, SplitViewComponent, SubMenu, SectionComponent, GridComponent, OpenDrawing, DrawingAddEditComponent, Notification, DisplaySettingsComponent, BuildingDrawingListComponent, FloorDrawingListComponent, SiteDrawingListComponent, MarkupsList, RevisionList, SlideComponent, MarkupDescriptionComponent, WexBMViewerComponent],
    encapsulation: ViewEncapsulation.None,
    providers: [DrawingDetailsService, AsbuiltService, SortHelper, NotificationService, GeneralFunctions, ReviewWorkFlowService, SpaceService, AdministrationService]
})

export class DrawingDetailsComponent {
   
    @Input() selectedRow: any[]; 
       selectedRowDetails: any[];       
    @Input() moduleId: any;
    @Input() pageTarget: any;
    @Input() isNotification: boolean;
    types:boolean = false;
    @Input() objectCategoryId: any;
    @Input() isDrawingUnlocked: boolean;
    @Input() connectivityListInputs: any;
    @Input() spaceObjInUnlock: any;
    @Output() onDrawingTabClose = new EventEmitter();
    returnData: any;
    returnDataBuilding: any;
    position = "top-right";
    positionConfirm = "top-left";
    showSlide = false;
    showSlideMarkup = false;
    showSlideDeleteSpaceData = false;
    showSlidelockDrawing = false;
    isDisplaySetting: boolean = false;
    isBuildingDrawing: boolean = undefined;
    blnIsGrid: boolean = true;
    pageTitle: string;
    dispSettingCategoryId = 14;
//let $ = require('../../../../Scripts/jquery-1.10.2.js');
    splitviewBuilding: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    splitviewFloor: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    splitviewSite: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
    splitviewMarkuplist: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 60 };

    selectedSiteIds: number[];
    selectedBuildingIds: number[];
    selectedFloorIds: number[];
    selectedBuildingDrawingRevisionNo: number;

    @Output() outDrawingobject = new EventEmitter();
    @Output() outUnlockDrawingClicked = new EventEmitter();
    @Output() unlockSpacedataClicked = new EventEmitter();
    @Output() showDrawingAfterUnlock = new EventEmitter();
    @Output() showZoomAfterUnlock = new EventEmitter();
    selectedTab: number = 0;
    pagePath: string = "";
    showSiteSecondary: boolean = false;
    action: string;
    btnName: string = "Save Changes";
    public totalItems: number = 0;

    menuClickValue: any;
    itemsSource: any[];
    drawingId: number;
    revisionNo: number;
  
    Revisions: number;
    spacelayerName: string;
    constructionLayerName: string;
    netLayername: string;
    grossLayername: string;
    viewDrawing: boolean = false;
    IsOpenDrawingComponentActive: boolean = false;
    viewMarkup: boolean = false;
    reloaddwg: boolean = false;
    drawingDetails: { key: string, value: string } = { key: "", value: "" };
    inputItems: IGrid = { dataKey: "DrawingId", grpWithCheckBx: false, allowAdd: false, allowEdit: false, selectedIds: [], rowData: [],selectioMode: 'Multiple' };
    fieldObject: IField[];
    // drawingDetails: any;
    objiWhiz: any; // for drawing object

    menuData: any[];        //  for submenu in menudata
    menuTempData: any[];
    unlockmenuData: any[];// for space drawing unlock menu
    gridcount = 6;
    enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
    enableFloorMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
    /* Drawing Add and Edit*/
    //  drawingDataField: number[];
    dataKey: any;
    drawingType: number;
    public keyWordLookup: any[];

    siteTabIndex: number = 999;
    buildingTabIndex: number = 0;
    floorTabIndex: number = 1;
    viewDrawingTabIndex: number = 2;
    private buildingDrawinglistFormId = 47;
    private floorDrawingListFormId = 48;
    cdr: any;
    flooraction: string;
    markupCount: number = 0;
    revisions: number;
    markups: number;
    markupObj: any;
    showSlideDesc: boolean = false;
    isMarkupEdit: boolean = false;
    closeTbFuns: any = undefined;
    markupEvent: any;
    deleteIndex: number;
    drawingCategoryId: number;
    isBuildingDrawingOpen: boolean = false;
    floorTabName: string = "Drawings";
    viewTabName: string = "View Drawing";
    markupSaveMessage: string = "";
    currentPageTargetForAsbuilts: number;
    isSchedulingUser: boolean = false;
    isSiteAdmin: boolean = false;
    drawingLabel = "Drawing";
    isPlotInDrawing: boolean = false;
    DWLdrawingtype: number;//1 2D, 2 3d, 3 3D Revit
    showIFC: boolean = false;
   

    constructor(private administrationService: AdministrationService, cdr: ChangeDetectorRef, private generalFunctions: GeneralFunctions, private drawingDetailsService: DrawingDetailsService, private _sortHelper: SortHelper, private asbuiltService: AsbuiltService, private notificationService: NotificationService, private reviewWorkflowservice: ReviewWorkFlowService, private spaceService: SpaceService) {

        this.cdr = cdr;

        
    }
    //previlage
    private getCusSubscribedFeatures=function(resCallback) {
        var contextObj = this;
        //contextObj.isBuildingDrawing = false;
        contextObj.administrationService.getCustomerSubscribedFeatures("117,285").subscribe(function (rt) {
            
            if (contextObj.generalFunctions.checkForUnhandledErrors(rt)) {
                var customerFeatureobj = rt["Data"];
                for (let i = 0; i < customerFeatureobj.length; i++) {
                    switch (customerFeatureobj[i]["Id"]) {
                        case 117:
                            contextObj.isBuildingDrawing = customerFeatureobj[i]["IsSubscribed"];
                            if (customerFeatureobj[i]["IsSubscribed"] == true)
                                contextObj.checkSubscribedFeatures();
                                //contextObj.floorTabName = 'Floor Drawings';
                            break;
                        case 285:
                            contextObj.isPlotInDrawing = customerFeatureobj[i]["IsSubscribed"];
                            break;
                    }
                }
                resCallback();
            }
        });
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.administrationService.checkSubscribedFeature('276').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"] == true) {
                contextObj.floorTabName = result["Data"][0].Value;
                contextObj.viewTabName = "View " + contextObj.floorTabName;
            }
            if (contextObj.moduleId != 14) {
                contextObj.floorTabName = "Floor Drawings";
                contextObj.viewTabName = "View Drawing"
            }
        });
    }
    getSelectedTab(event: any) {    

        var contextObj = this;
        contextObj.isDisplaySetting = false;
        contextObj.splitviewBuilding.showSecondaryView = false;
        contextObj.splitviewFloor.showSecondaryView = false;
     
        if (contextObj.moduleId == 1) {
            if (contextObj.isBuildingDrawing == true && event[0] == 0)
                contextObj.drawingType = 0;
            else if (contextObj.isBuildingDrawing == true && event[0] == 1)
                contextObj.drawingType = 1;
            else if (contextObj.isBuildingDrawing == false && event[0] == 0) {
                contextObj.buildingTabIndex = -1;
                contextObj.floorTabIndex = 0;
                contextObj.drawingType = 1;

            }
        } else {
            contextObj.isBuildingDrawing = false;
            contextObj.buildingTabIndex = -1;
            contextObj.floorTabIndex = 0;
            contextObj.drawingType = 1;
        }
        if (contextObj.isBuildingDrawingOpen && contextObj.viewDrawing == false)
            contextObj.selectedTab = 0;
        else
            contextObj.selectedTab = event[0];

        switch (contextObj.selectedTab) {
            case contextObj.buildingTabIndex:
                if (contextObj.menuData == null && contextObj.menuTempData != undefined)
                    contextObj.menuData = contextObj.menuTempData;
                else {
                    contextObj.changeMenu();
                }
       
                contextObj.isBuildingDrawingOpen = false;
                break;
            case contextObj.floorTabIndex:
                if (contextObj.menuData == null && contextObj.menuTempData != undefined)
                    contextObj.menuData = contextObj.menuTempData;
                else {
                    contextObj.changeMenu();
                }
              
                break;
            case contextObj.viewDrawingTabIndex:
                if (contextObj.menuData)
                    contextObj.menuData = null;
                break;

        }
    }
    changeMenu = function () {
        var contextObj = this;
        switch (contextObj.moduleId) {
            case 6:
                this.modulename = "Telecom";
                break;
            case 7:
                this.modulename = "Assets";
                break;
            case 8:
                this.modulename = "Furniture";
                break;
            case 17:
                this.modulename = "Electrical";
                break;
            case 18:
                this.modulename = "Fire and Safety";
                break;
            case 24:
                this.modulename = "Security Assets";
                break;
            case 25:
                this.modulename = "Mechanical";
                break;
            case 26:
                this.modulename = "Plumbing";
                break;
            case 27:
                this.modulename = "Medical Gas";
                break;
            default:
                break;
        }
       
        switch (contextObj.moduleId) // related to module wise drawing list
        {     
                
            case 1: if (contextObj.pageTarget == 3 || contextObj.pageTarget == 4) {
                contextObj.pageTarget = contextObj.currentPageTargetForAsbuilts;
            }
                switch (contextObj.pageTarget) { // As-Builts
                    case 1: this.pagePath = "As Builts / Drawings";
                        //Drawings
                    contextObj.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                        var callBack = function (data) {
                            contextObj.menuData = data;
                        }
                        if (contextObj.buildingTabIndex == contextObj.selectedTab)
                            contextObj.generalFunctions.GetPrivilegesOfPage(resultData["settingsbuilding"], callBack, 58, contextObj.administrationService, resultData["settingsbuilding"].length)

                        else {
                            if (contextObj.isSiteAdmin == false)
                                contextObj.generalFunctions.GetPrivilegesOfPage(resultData["settingsfloor"], callBack, 58, contextObj.administrationService, resultData["settingsfloor"].length)
                            else
                                contextObj.generalFunctions.GetPrivilegesOfPage(resultData["floordrawingsiteadmin"], callBack, 58, contextObj.administrationService, resultData["floordrawingsiteadmin"].length)
                        }

                        contextObj.menuTempData = contextObj.menuData
                    })

                    break;
                    case 2: this.pagePath = "Settings / As Builts / Drawings";
                    contextObj.dataKey = ["Id"];
                    //   this.keyWordLookup = this.asbuiltService.getDrawingListSearchKeyWordLookup();
                    contextObj.asbuiltService.getAsbuiltsMenuData().subscribe(function (resultData) {
                        var callBack = function (data) {
                            contextObj.menuData = data;
                        }
                        if (contextObj.buildingTabIndex == contextObj.selectedTab)
                            contextObj.generalFunctions.GetPrivilegesOfPage(resultData["buildingdrawing"], callBack, 58, contextObj.administrationService, resultData["buildingdrawing"].length)

                        else {
                            if (contextObj.isSiteAdmin == false)
                                contextObj.generalFunctions.GetPrivilegesOfPage(resultData["floordrawing"], callBack, 58, contextObj.administrationService, resultData["floordrawing"].length)
                            else
                                contextObj.generalFunctions.GetPrivilegesOfPage(resultData["floordrawing"], callBack, 58, contextObj.administrationService, resultData["floordrawing"].length) //80776
                               // contextObj.generalFunctions.GetPrivilegesOfPage(resultData["floordrawingsiteadmin"], callBack, 58, contextObj.administrationService, resultData["floordrawingsiteadmin"].length)
                        }
                        contextObj.menuTempData = contextObj.menuData                        
                    })

                    //    (resultData => {

                    //    //console.log(contextObj.menuData = contextObj.buildingTabIndex == contextObj.selectedTab ? resultData["buildingdrawing"] : resultData["setup"]),
                    //        contextObj.menuTempData = contextObj.menuData
                    //})

                    break;
                // Setup / Drawings

            }
                break;
            case 2: switch (contextObj.pageTarget) { // project
                case 1:

                    break;
                case 2:
                    break;
            }
                break;
            case 3:
             //   debugger;
                switch (contextObj.pageTarget) {//space
                
                    case 1: this.pagePath = "Space / Drawings"; //allocated drawing
                   //     debugger;
                    this.asbuiltService.getAsbuiltsMenuData().subscribe
                        (resultData => {
                            contextObj.menuData = resultData["space"],
                                contextObj.menuTempData = contextObj.menuData                            
                        })
                    break;
                    case 2: this.pagePath = "Settings / Space / Unlock Drawings";//unlock drawing
                    this.asbuiltService.getAsbuiltsMenuData().subscribe
                        (resultData => {
                            contextObj.menuData = resultData["space"],
                                contextObj.menuTempData = contextObj.menuData
                            
                        })
                    break;
                    case 3: this.pagePath = "Settings / Space / Lock Drawings";//lock drawing
                    this.asbuiltService.getAsbuiltsMenuData().subscribe
                        (resultData => {
                            contextObj.menuData = resultData["lockdrawing"],
                                contextObj.menuTempData = contextObj.menuData                            
                        })
                    break;
                    case 4: this.pagePath = "Settings / Space / Delete Space Data";//deletespacedata
                    this.asbuiltService.getAsbuiltsMenuData().subscribe
                        (resultData => {
                            contextObj.menuData = resultData["deletespacedata"],
                                contextObj.menuTempData = contextObj.menuData                            
                        })
                    break;
            }
                break;
            case 12:/*CAI*/
                this.pagePath = "CAI / Drawings";
                this.asbuiltService.getAsbuiltsMenuData().subscribe
                    (resultData => {
                        contextObj.menuData = resultData["space"],
                            contextObj.menuTempData = contextObj.menuData
                    })
                break;
            
            case 4: switch (contextObj.pageTarget) { //documents
                case 1:
                    break;
                }
                break;
            case 5: switch (contextObj.pageTarget) { //employee
                case 1: this.pagePath = "Employees / Drawings";//allocated drawing
                    this.asbuiltService.getAsbuiltsMenuData().subscribe
                        (resultData => {
                            contextObj.menuData = resultData["employee"],
                                contextObj.menuTempData = contextObj.menuData                            
                        })
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
                switch (contextObj.pageTarget) { //drawinglist->opendrawing       

                    case 1: this.pagePath = contextObj.modulename + " / Drawings";//allocated drawing
                    this.asbuiltService.getAsbuiltsMenuData().subscribe
                        (resultData => {
                            contextObj.menuData = resultData["assets"],
                                contextObj.menuTempData = contextObj.menuData
                        })
                    break;
                   
                case 2: //From list -> drawinglist->opendrawing
                    this.asbuiltService.getAsbuiltsMenuData().subscribe
                        (resultData => {
                            contextObj.menuData = resultData["assets"],
                                contextObj.menuTempData = contextObj.menuData
                            contextObj.selectedRowDetails = contextObj.selectedRow;
                        })
                   
                    break;
                }
                break;
            //// Module Id : 8 - Furniture*************************************************
            //case 8: switch (contextObj.pageTarget) { //furniture drawinglist->opendrawing       

            //    case 1: this.pagePath = "Furniture / Drawings";//allocated drawing
            //        this.asbuiltService.getAsbuiltsMenuData().subscribe
            //            (resultData => {
            //                contextObj.menuData = resultData["assets"],
            //                    contextObj.menuTempData = contextObj.menuData
            //            })
            //        break;

            //    case 2: //From furniture list -> drawinglist->opendrawing
            //        this.asbuiltService.getAsbuiltsMenuData().subscribe
            //            (resultData => {
            //                contextObj.menuData = resultData["assets"],
            //                    contextObj.menuTempData = contextObj.menuData
            //                contextObj.selectedRowDetails = contextObj.selectedRow;
            //            })

            //        break;
            //    //************************************************************************
            //}
            //    break;

            //// Module Id : 18 - Fire and Safety********************************************
            //case 18: switch (contextObj.pageTarget) { //Fire and Safety drawinglist->opendrawing       

            //    case 1: this.pagePath = "Fire and Safety / Drawings";//allocated drawing
            //        this.asbuiltService.getAsbuiltsMenuData().subscribe
            //            (resultData => {
            //                contextObj.menuData = resultData["assets"],
            //                    contextObj.menuTempData = contextObj.menuData
            //            })
            //        break;

            //    case 2: //From Fire and Safety list -> drawinglist->opendrawing
            //        this.asbuiltService.getAsbuiltsMenuData().subscribe
            //            (resultData => {
            //                contextObj.menuData = resultData["assets"],
            //                    contextObj.menuTempData = contextObj.menuData
            //                contextObj.selectedRowDetails = contextObj.selectedRow;
            //            })

            //        break;
            //    //************************************************************************
            //}
            //    break;
             
            case 14: switch (contextObj.pageTarget) { //scheduling               
                case 1: //allocated drawing
                    this.administrationService.checkSubscribedFeature('276').subscribe(function (result) {
                        debugger
                        if (result["Data"][0]["IsSubscribed"] == true) {
                            contextObj.drawingLabel = result["Data"][0].Value;
                        }
                        contextObj.pagePath = "Scheduling / " + contextObj.drawingLabel + "s"; 
                    });
                    this.asbuiltService.getAsbuiltsMenuData().subscribe
                        (resultData => {
                            contextObj.menuData = resultData["scheduling"],
                                contextObj.menuTempData = contextObj.menuData                            
                        })
                    break;
                    //***
                   //switch (contextObj.pageTarget) {//space
                   //     case 1: //allocated drawing
                   //         //     debugger;
                   //         this.asbuiltService.getAsbuiltsMenuData().subscribe
                   //             (resultData => {
                   //                 contextObj.menuData = resultData["space"],
                   //                     contextObj.menuTempData = contextObj.menuData
                   //             })
                   //         break;
                    //***


            }
                break;
        }}
    ngOnInit() {
        var contextObj = this;
        if (this.moduleId == 7 && this.pageTarget == 4) {
            //this.drawingId = this.connectivityListInputs.
            //this.drawingCategoryId
            //this.drawingDetails = this.connectivityListInputs;
        }
        if (this.isNotification == true || this.isNotification == undefined)
            this.isNotification = true;
        else
            this.isNotification = false;
        contextObj.getCusSubscribedFeatures(function () {
        //    debugger;
            contextObj.changeMenu();
            if (contextObj.isBuildingDrawing == false)
            {
                contextObj.drawingType = 1;
                contextObj.buildingTabIndex =-1
                contextObj.floorTabIndex=0
            }

        });

        contextObj.administrationService.CheckIsSiteLevelAdmin(1).subscribe(function (result) {
            debugger
            contextObj.isSiteAdmin = result == 1 ? true : false;
          

        });
        if (this.moduleId == 14) {
            this.floorTabName = 'Drawings';
            this.viewTabName = 'View Drawing';
        }
        //if (contextObj.moduleId == 1) {
        //    contextObj.floorTabName = "Floors";
        //}
       
        //console.log("this.moduleId", this.moduleId);
        //console.log("this.pageTarget", this.pageTarget);
        //console.log("contextObj.floorTabName", this.floorTabName);
    }
    outDrawingObject(event: any) {
        //debugger;
        //console.log("drawingdetailsoutObject", event);
        this.objiWhiz = event.dwgObject;
        this.markupObj = event.markupObj;
        this.outDrawingobject.emit({ "dwgObj": this.objiWhiz, "dwgId": this.drawingId });
    }
    public onSubMenuChange(event: any) {
     this.menuClickValue = event.value;
     this.revisionNo = this.drawingDetails["LatestRevisionNo"] != undefined ? this.drawingDetails["LatestRevisionNo"] : this.revisionNo;
     this.DWLdrawingtype = this.drawingDetails["DrawingTypeId"] != undefined ? this.drawingDetails["DrawingTypeId"] : this.DWLdrawingtype;
        switch (this.moduleId) {//asbuilt=1
            case 1:

                if (event.value == 1) // Edit
                {
                    this.editClick();
                }
                else if (event.value == 2) // Add
                {
                    this.addClick();
                }
                else if (event.value == 3) // delete
                {
                    this.DeleteClick();
                }
                else if (event.value == 4) // View
                {
                    //this.menuData = null;
                    this.viewDrawings(this.inputItems.selectedIds);
                }
                else if (event.value == 11) // Floor Drawings download
                {
                    this.downloadDrawing(this.selectedFloorIds, 0);
                }
                else if (event.value == 12) // Building Drawings download
                {
                    this.downloadDrawing(this.selectedBuildingIds, 1);
                }
                else if (event.value == 6) // Revise
                {
                    this.reviseClick();
                }
                else if (event.value == 7) // Replace
                {
                    if (this.markupCount > 0)
                        this.showSlide = true;
                    else
                        this.replaceClick();
                }
                else if (event.value == 8) // Revision List
                {
                   
                    this.onRevisionListClick();
                 
                }
                else if (event.value == 9) //Markup List
                {
                  
                    this.onMarkupListClick();
                
                }
                else if (event.value == 10) // Display Settings
                {
                    
                    this.displaySettingsClick();
                }
              

                break;
            case 2: switch (this.selectedTab) {
                case this.buildingTabIndex: if (event.value == 1) //unlock drawing List
                    // this.openDrawing();
                    break;
                case this.floorTabIndex: if (event.value == 1)// unlock
                    //  this.unlockDrawing();
                    break;
            }
                break;
            case 3:
                case 12: /*CAI*/
                switch (this.selectedTab) {
                    case this.floorTabIndex:
                        if (event.value == 4) //new drawing
                        //this.menuData = null;
                        {
                            this.viewDrawings(this.inputItems.selectedIds);
                        }
                        else if (event.value == 11) // Delete Space data
                        {
                            //console.log("Delete Space data");
                            this.deleteDrawingClick();
                        }
                        else if (event.value == 12) // lockdrawing
                        {
                            this.lockDrawingClick();
                            //console.log("lockdrawing");

                        }
                        break;
                }
                break;
            case 5://employee
                switch (this.selectedTab) {
                    case this.floorTabIndex: if (event.value == 4) //new drawing
                        //this.menuData = null;
                        this.viewDrawings(this.inputItems.selectedIds);
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
                switch (this.selectedTab) {
                    case this.floorTabIndex: if (event.value == 4) //new drawing
                        //this.menuData = null;
                        this.viewDrawings(this.inputItems.selectedIds);
                        break;

                }
                break;


            case 14://scheduling
                debugger
                switch (this.selectedTab) {
                    case this.floorTabIndex: if (event.value == 4) //new drawing
                            var contextObj = this;
                            contextObj.administrationService.getSessionData().subscribe(function (data) {
                                var retData = data["Data"];
                                var sessionUserRoleId = retData["UserRoleId"];
                                if (sessionUserRoleId > 3) {
                                    contextObj.administrationService.getAccessibleModuleForUser().subscribe(function (Data) {
                                        var accesibleModules = Data["Data"];
                                        var isSpaceEnabled = [];
                                        isSpaceEnabled = accesibleModules.filter(function (item) { return item.ModuleId === 3 });
                                        if (isSpaceEnabled.length == 0) {
                                            contextObj.isSchedulingUser = true;
                                            contextObj.viewDrawings(contextObj.inputItems.selectedIds);
                                        }
                                        else
                                            contextObj.viewDrawings(contextObj.inputItems.selectedIds);
                                    });
                                }
                                else
                                    contextObj.viewDrawings(contextObj.inputItems.selectedIds);
                            });
                        break;

                }
                break;

        }


    }
   
    okDeleteSpaceData() {
        var contextObj = this;
        contextObj.showSlide = false;
        contextObj.showSlideMarkup = false;
        contextObj.showSlideDesc = false;
        contextObj.showSlideDeleteSpaceData = false;
       // debugger
        contextObj.spaceService.DeleteSpaceData(contextObj.drawingId, contextObj.moduleId).subscribe(function (resultData) {
            if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {

                var returndata = resultData["Data"];
                contextObj.returnData = returndata.Data;
                contextObj.action = "deletespacedata";
                contextObj.cdr.detectChanges();
                contextObj.action = "";
                if (returndata.Message == "Success") {

                    contextObj.notificationService.ShowToaster("Space Data for the selected floor(s) deleted", 2);
                }
            }
        });
    }
    noDeleteSpaceData() {
        var contextObj = this;
        contextObj.showSlide = false;
        contextObj.showSlideMarkup = false;
        contextObj.showSlideDesc = false;
        contextObj.showSlideDeleteSpaceData = false;

    }
    deleteDrawingClick() {
        var contextObj = this;
        if (contextObj.selectedFloorIds) {
            if (contextObj.selectedFloorIds.length > 0) {
                if (contextObj.selectedFloorIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    contextObj.showSlideDeleteSpaceData = true;
                }
            }
        }
    

    }
    lockDrawingClick() {
        var contextObj = this;
          //   debugger
        //var contextObj = this;
        if (contextObj.selectedFloorIds) {
            if (contextObj.selectedFloorIds.length > 0) {
                if (contextObj.selectedFloorIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    contextObj.showSlidelockDrawing = true;

                }
            }
        }

    }
    okLockDrawing() {
      //  debugger
       var contextObj = this;
       contextObj.showSlide = false;
       contextObj.showSlideMarkup = false;
       contextObj.showSlideDesc = false;
       contextObj.showSlideDeleteSpaceData = false;
       contextObj.showSlidelockDrawing = false;
       contextObj.spaceService.UpdateDrawingUnLockAslocked(contextObj.drawingId, contextObj.moduleId).subscribe(function (resultData) {
           if (contextObj.generalFunctions.checkForUnhandledErrors(resultData)) {
               var returndata = resultData["Data"];
               contextObj.returnData = returndata.Data;
               contextObj.action = undefined;
               contextObj.cdr.detectChanges();
               contextObj.action = "lockDrawingSuccess";
               if (returndata.Message == "Success") {

                   contextObj.notificationService.ShowToaster("Selected drawing(s) locked", 2);
               }
           }
       });
   }
    noLockDrawing() {
       var contextObj = this;
       contextObj.showSlide = false;
       contextObj.showSlideMarkup = false;
       contextObj.showSlideDesc = false;
       contextObj.showSlideDeleteSpaceData = false;
       contextObj.showSlidelockDrawing = false;
       
   }


    //Building
    updateBuildingDrawingSelectedID(event: any) {
      
        var contextObj = this;
        contextObj.selectedBuildingIds = event.scopebuildingdrawing;
        contextObj.totalItems = event.totalItems;
        contextObj.markupCount = event.rowData.Markups;
        contextObj.drawingCategoryId = event.rowData.DrawingCategoryId;
        contextObj.drawingId = event.rowData.DrawingId;
        contextObj.revisionNo = event.rowData['Revision No.'];
        contextObj.Revisions = event.rowData['Revisions'];
        contextObj.drawingDetails = event.rowData;
       // if (contextObj.totalItems != 0)
      //      contextObj.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10,11];
        //console.log("selectedEvent", event);
        contextObj.cdr.detectChanges();
       
        contextObj.cdr.detectChanges();
    }
    //Floor
    updateFloorDrawingSelectedID(event: any) {
        console.log("updateFloorDrawingSelectedID", event);        
        var contextObj = this;
        contextObj.selectedFloorIds = event["scopefloordrawing"];
        contextObj.totalItems = event.totalItems;
        contextObj.markupCount = event.rowData.Markups;
        contextObj.drawingId = event.rowData.DrawingId;
        contextObj.drawingCategoryId = event.rowData.DrawingCategoryId;
        contextObj.revisionNo = event.rowData['Revision No.'];
        contextObj.Revisions = event.rowData['Revisions'];
        contextObj.drawingDetails = event.rowData;
        if (event.rowData['FloorID'] == null && event.rowData['FloorId'] == null && event.rowData.length != 0) {
            contextObj.drawingType = 0;
        } else {
            contextObj.drawingType = 1;
        }
      //  if (contextObj.totalItems != 0)
      //      contextObj.enableMenu = [1, 2, 3, 4, 6, 7, 8,9,10,11];
        //console.log("selectedEventFloor", event);
        //console.log("updateFloorDrawingSelectedID", this.selectedFloorIds)
        contextObj.cdr.detectChanges();
    }
    buildingSelectionChange(selectedRow: any) {
        //   debugger
        //console.log("buildingSelectionChange", event);
        //this.totalItems = selectedRow.totalcount;
        //this.markupCount = selectedRow.event.rowdata.Markups;
        //this.drawingId = selectedRow.event.rowdata.DrawingId;
        //this.revisionNo = selectedRow.event.rowdata.Revisions;
    }
    floorSelectionChange(selectedRow: any) {        
        // this.totalItems = selectedRow.totalcount;
        // this.markupCount = selectedRow.event.rowdata.Markups;    
        // this.drawingId = selectedRow.event.rowdata.DrawingId;
        //this.revisionNo = selectedRow.event.rowdata.Revisions;
    }
    onNoFloorData(event) {
        debugger
        if (event["moduleId"]) {
            this.enableFloorMenu = [2];
        }
       else if (event["total"]) {
            this.enableFloorMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
          
        }
        else {
            this.menuData = null;
        }
    }
    //onNoFloorData(event) {
    //    debugger
    //    if (event["moduleId"] && event["pageTarget"]) {
    //        switch (event["moduleId"]) {
    //            case 1:
    //                switch (event["pageTarget"]) {
    //                    case 1:
    //                        this.enableMenu = [];
    //                        break;
    //                    case 2:
    //                        this.enableMenu = [2];
    //                        break;
    //                    case 3:
    //                        this.enableMenu = [2];
    //                        break;
    //                    case 4:
    //                        this.enableMenu = [2];
    //                        break;
    //                }
    //                break;
    //            case 3:
    //                this.enableMenu = [3, 4];
    //                break;
    //            default:
    //                 this.enableMenu = [3, 4];
    //                break;
    //        }
    //    }
    //    else {
    //        this.menuData = null;
    //    }
    //}
    onNoBuildingData(event) {
        //debugger
        if (event["moduleId"]) {
            this.enableMenu = [2];
        }
        else if (event["total"]) {
            this.enableMenu = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
        }
        else {
            this.menuData = null;
        }
    }
    public unlockDrawing(event: any) {

        this.outUnlockDrawingClicked.emit({ event, drawingId: this.drawingId });
    }
    public spacedataClicked(event: any) {

        this.unlockSpacedataClicked.emit({ event, drawingId: this.drawingId });
    }
    public reviseClick() {
        this.pageTitle = "Revise Drawing";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        switch (contextObj.selectedTab) {//building-0,floor-1
            case contextObj.buildingTabIndex:

                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "revise";
                            contextObj.btnName = "Revise";
                            contextObj.splitviewBuilding.showSecondaryView = true;
                        }

                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "revise";
                            contextObj.btnName = "Revise";
                            contextObj.splitviewFloor.showSecondaryView = true;
                        }

                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
        }

    }
    okReplace(event: any) {
        var contextObj = this;
        contextObj.showSlide = !contextObj.showSlide;
        this.replaceClick();
    }
    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    public replaceClick() {
        this.pageTitle = "Replace Drawing";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        contextObj.action = "replace";
        contextObj.btnName = "Replace";
        switch (contextObj.selectedTab) {//building-0,floor-1
            case contextObj.buildingTabIndex:

                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "replace";
                            contextObj.btnName = "Replace";
                            contextObj.splitviewBuilding.showSecondaryView = true;
                        }

                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "replace";
                            contextObj.btnName = "Replace";
                            contextObj.splitviewFloor.showSecondaryView = true;
                        }

                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
        }

    }
    public editClick() {
      
        this.pageTitle = "Edit Drawing Description";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        switch (contextObj.selectedTab) {//building-0,floor-1
            case contextObj.buildingTabIndex:

                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }

                        else {
                            contextObj.action = "edit";
                            contextObj.btnName = "Save Changes";
                            contextObj.drawingType = 0;
                            contextObj.splitviewBuilding.showSecondaryView = true;
                        }

                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
                break
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        }
                        else {
                            contextObj.action = "edit";
                            contextObj.btnName = "Save Changes";
                            contextObj.drawingType = 1;
                            contextObj.splitviewFloor.showSecondaryView = true;
                        }

                    }
                    else {
                        contextObj.notificationService.ShowToaster("Select a Drawing", 2);
                    }
        }
        contextObj.cdr.detectChanges();
    }
    public addClick() {
        this.pageTitle = "Add Drawing";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        contextObj.action = "add";
        contextObj.btnName = "Add";
        // this.selectedBuildingIds = [-1];
        switch (contextObj.selectedTab) {//building-0,floor-1
            case contextObj.buildingTabIndex:
                contextObj.splitviewBuilding.showSecondaryView = true;
                break;
            case contextObj.floorTabIndex:
                contextObj.splitviewFloor.showSecondaryView = true;
                break;
        }
        contextObj.cdr.detectChanges();

    }

    public DeleteClick() {
       
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        // debugger
        switch (contextObj.selectedTab) {//building-0,floor-1
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        } else {
                            contextObj.action = "delete";
                            contextObj.btnName = "Delete";
                            contextObj.splitviewBuilding.showSecondaryView = false;
                            contextObj.cdr.detectChanges();
                            contextObj.action = "";
                        }
                    }
                    else
                    { contextObj.notificationService.ShowToaster("Select a Drawing", 2);}
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        } else {
                            contextObj.action = "delete";
                            contextObj.btnName = "Delete";
                            contextObj.splitviewFloor.showSecondaryView = false;
                            contextObj.cdr.detectChanges();
                            contextObj.action = "";
                        }
                    }
                    else
                    { contextObj.notificationService.ShowToaster("Select a Drawing", 2); }
                break;
        }


    }
    public displaySettingsClick() {
        this.pageTitle = "Display Settings";
        //console.log("displaySettings");
        var contextObj = this;
        contextObj.action = "displaySettings";
        contextObj.isDisplaySetting = true;
        contextObj.splitviewBuilding.showSecondaryView = true;
        contextObj.splitviewFloor.showSecondaryView = true;
    }
    public deleteSpaceData() {
        //console.log("deleteSpaceData");
        var contextObj = this;
        contextObj.action = "deleteSpaceData";
        contextObj.isDisplaySetting = false;
        contextObj.splitviewBuilding.showSecondaryView = false;
        contextObj.splitviewFloor.showSecondaryView = false;
    }
    public lockDrawing() {
        //console.log("lockDrawing");
        var contextObj = this;
        contextObj.action = "lockDrawing";
        contextObj.isDisplaySetting = false;
        contextObj.splitviewBuilding.showSecondaryView = false;
        contextObj.splitviewFloor.showSecondaryView = false;
    }
    OnSuccessfulSubmi(event: any,index) {
       
        var contextObj = this;
        if (event["status"] == "success") {
            if (event["returnData"]) {
                if ((event["returnData"]["Data"]) != "") {
                    contextObj.returnData = event["returnData"]["Data"];
                    contextObj.drawingDetails = JSON.parse(contextObj.returnData)[0];
                }
                if (event["isUpdate"] == true) {
                    contextObj.markupCount = 0;
                    contextObj.drawingDetails = JSON.parse(contextObj.returnData)[0];
                }
                if (event["isRevised"]) {
                    if (event["isRevised"] == true) {
                        contextObj.revisionNo = +(contextObj.revisionNo) + 1;
                        contextObj.Revisions = +(contextObj.Revisions) + 1;
                    }
                    contextObj.drawingDetails = JSON.parse(contextObj.returnData)[0];
                }
            }
            if (event["returnDataBuilding"])
            {
                if ((event["returnDataBuilding"]["Data"]) != "") {
                    contextObj.returnDataBuilding = event["returnDataBuilding"]["Data"];
                    contextObj.drawingDetails = JSON.parse(contextObj.returnDataBuilding)[0];
                }
                if (event["isUpdate"] == true) {
                    contextObj.markupCount = 0;
                    contextObj.drawingDetails = JSON.parse(contextObj.returnDataBuilding)[0];
                }
                if (event["isRevised"]) {
                    if (event["isRevised"] == true) {
                        contextObj.revisionNo = +(contextObj.revisionNo) + 1;
                        contextObj.Revisions = +(contextObj.Revisions) + 1;
                    }
                    contextObj.drawingDetails = JSON.parse(contextObj.returnDataBuilding)[0];
                }
            }
            

            contextObj.splitviewSite.showSecondaryView = false;
            contextObj.splitviewBuilding.showSecondaryView = false;
            contextObj.splitviewFloor.showSecondaryView = false;
        }
    }

    public viewDrawings(id) {
        var contextObj = this;
        console.log(contextObj.revisionNo);
        contextObj.isDisplaySetting = false;
        switch (contextObj.selectedTab) {//building-0,floor-1
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) 
                    {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        } else {
                            // this.splitviewInput.showSecondaryView = false;
                            this.menuData = null;
                            contextObj.isBuildingDrawingOpen = true;
                            if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                                contextObj.IsOpenDrawingComponentActive = false;
                                contextObj.viewDrawing = false;
                                contextObj.deleteIndex = contextObj.viewDrawingTabIndex;
                                // contextObj.selectedTab = contextObj.floorTabIndex;
                            }
                            setTimeout(function () {
                                contextObj.IsOpenDrawingComponentActive = true;
                                contextObj.viewDrawing = true;
                                if (contextObj.DWLdrawingtype == 3) {
                                    contextObj.OpenRevit3DDrawing(contextObj.drawingId, contextObj.revisionNo,true);
                                }
                                contextObj.updateCrossSession(contextObj.selectedBuildingIds[0]);
                            }, 50);
                            setTimeout(function () {
                                if (contextObj.moduleId == 1) {
                                    if (contextObj.isBuildingDrawing == false)
                                        contextObj.selectedTab = 1;
                                    else
                                        contextObj.selectedTab = 2;
                                }
                               
                                contextObj.deleteIndex = 0;
                            }, 100);

                            break;

                        }
                    }
                else
                { contextObj.notificationService.ShowToaster("Select a Drawing", 2); }
                break;
            case contextObj.floorTabIndex:

                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);

                        } else {
                            this.menuData = null;
                            contextObj.isBuildingDrawingOpen = false;
                            if (contextObj.IsOpenDrawingComponentActive && contextObj.viewDrawing) {
                                this.IsOpenDrawingComponentActive = false;
                                this.viewDrawing = false;
                                this.deleteIndex = this.viewDrawingTabIndex;
                            }
                            setTimeout(function () {                               
                                contextObj.IsOpenDrawingComponentActive = true;
                                contextObj.viewDrawing = true;
                                if (contextObj.DWLdrawingtype == 3) {
                                    contextObj.OpenRevit3DDrawing(contextObj.drawingId, contextObj.revisionNo, false);
                                }
                                contextObj.updateCrossSession(contextObj.selectedFloorIds[0]);
                            }, 50);
                            setTimeout(function () {
                                if (contextObj.moduleId == 1) {
                                    if (contextObj.isBuildingDrawing == false)
                                        contextObj.selectedTab = 1;
                                    else
                                        contextObj.selectedTab = 2;
                                }
                                else {
                                    contextObj.selectedTab = 1;
                                }
                                contextObj.deleteIndex = 0;
                            }, 100);

                            break;

                        }
                    }
                    else
                    { contextObj.notificationService.ShowToaster("Select a Drawing", 2);}
        }
    }

    OpenRevit3DDrawing(Id,RevNo,IsBuidling) {
        var contextObj = this;
        this.showIFC = true;
        //contextObj.administrationService.getRevit3DDrawingAppSetingsKey().subscribe(function (resultData) {
        //    var Url = resultData + "Default.aspx?Tgt=1&ModuleName=&ModuleId=&DId=" + Id + "&Rno=" + RevNo + "&BDwg=" + IsBuidling
        //    window.open(Url, '_blank');

        //    //var ua = window.navigator.userAgent;
        //    //var msie = ua.indexOf("MSIE");
        //    //if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
        //    //    msie = 1;
        //    //}
        //    //if (msie > 0) // If Internet Explorer, return version number
        //    //{
        //    //   // window.open(Url, '_blank');
        //    //    contextObj.plotMessage = Url;
        //    //    contextObj.showSlidePlot = true;
        //    //} else {
        //    //    window.open(Url, '_blank');
        //    //}

        //});
    }

    public downloadDrawing(id,drawingType) {
        debugger
        if (id.length > 1){
            var contextObj = this;
            var multiDownload = [];
            var filename, drawingId;
           
            for (var i = 0; contextObj.drawingDetails[i]; i++) {
                contextObj.revisionNo = contextObj.drawingDetails[i]["Revision No."]
                multiDownload.push({
                filename : contextObj.drawingDetails[i]["DWG File"],
                ReferenceId: contextObj.drawingDetails[i]["DrawingId"],
                revisionNo: contextObj.revisionNo,
                });
            }


            //if (contextObj.revisionNo == undefined)
            //    contextObj.revisionNo = contextObj.drawingDetails["LatestRevisionNo"]

            //if (contextObj.revisionNo == undefined)
            //    contextObj.revisionNo = contextObj.drawingDetails["Revision No."]

            //if (contextObj.revisionNo == undefined)
            //    contextObj.revisionNo = 0;

            contextObj.asbuiltService.multipleDownloadFile(contextObj.floorDrawingListFormId, drawingType,(JSON.stringify(multiDownload))).subscribe(function (resultData) {
                debugger
                if (resultData._body == "Data is Null")
                    contextObj.notificationService.ShowToaster("File Not found in server", 2);
                else {
                    var headers = resultData.headers;
                    var contentType = headers.get("Content-Type");
                    var linkElement = document.createElement('a');
                    var linkElement1 = document.createElement('a');
                    var data = contextObj.generalFunctions.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);
                        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

                        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                            window.navigator.msSaveOrOpenBlob(blob, "Drawings.zip");
                        }

                        else if (isSafari) {
                            contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);

                        }

                        else {

                            linkElement.setAttribute('href', url);
                            linkElement.setAttribute("download", "Drawings.zip");
                            var clickEvent = new MouseEvent("click", {
                                "view": window,
                                "bubbles": true,
                                "cancelable": false
                            });
                            linkElement.dispatchEvent(clickEvent);
                        }


                    } catch (ex) {
                        console.log(ex);
                    }
                }
            });

        }
        else if (id.length == 1) {
           
                var contextObj = this;
                var filename;             

                filename =
                    contextObj.drawingDetails["DWG File"];
                
                if (contextObj.revisionNo ==undefined)
                    contextObj.revisionNo = contextObj.drawingDetails["LatestRevisionNo"]

                if (contextObj.revisionNo == undefined)
                    contextObj.revisionNo = contextObj.drawingDetails["Revision No."]

                if (contextObj.revisionNo == undefined)
                    contextObj.revisionNo = 0;

                contextObj.asbuiltService.downloadFile(contextObj.floorDrawingListFormId, contextObj.drawingId, filename, contextObj.revisionNo, drawingType).subscribe(function (resultData) {
                    
                    if (resultData._body == "Data is Null")
                        contextObj.notificationService.ShowToaster("File Not found in server", 2);
                    else {
                        var headers = resultData.headers;
                        var contentType = headers.get("Content-Type");


                        var linkElement = document.createElement('a');
                        var linkElement1 = document.createElement('a');

                        var data = contextObj.generalFunctions.base64ToArrayBuffer(JSON.parse(JSON.stringify(resultData._body).trim()));

                     


                        try {

                            var blob = new Blob([data], { type: contentType });
                            var url = window.URL.createObjectURL(blob);

                            var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

                            if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                                window.navigator.msSaveOrOpenBlob(blob, filename);
                            }
                   
                            else if (isSafari) {
                                contextObj.notificationService.ShowToaster("Download option is not supported now in Safari browser", 2);

                            }

                            else {

                                linkElement.setAttribute('href', url);
                                linkElement.setAttribute("download", filename);
                                var clickEvent = new MouseEvent("click", {
                                    "view": window,
                                    "bubbles": true,
                                    "cancelable": false
                                });
                                linkElement.dispatchEvent(clickEvent);
                            }


                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                });
          
        }
        else if (id.length == 0){
            this.notificationService.ShowToaster("Select a Drawing", 2);
        }
    }
    public updateCrossSession(SelectedId) {

        var contextObj = this;
        switch (contextObj.moduleId) {
            case 1:/*asbuilt*/
                if (contextObj.buildingTabIndex == contextObj.selectedTab) {
                    contextObj.administrationService.ChangeCrossSessionValue(20, SelectedId).subscribe(function (resultData) {
                    });
                }
                else {      
                        contextObj.administrationService.ChangeCrossSessionValue(5, SelectedId).subscribe(function (resultData) {
                        });
                   
                }
                break;
            case 3:/*space*/
                case 12:/*CAI*/
                contextObj.administrationService.ChangeCrossSessionValue(1, SelectedId).subscribe(function (resultData) {
                });
                break;
            case 5:/*Employee*/
                contextObj.administrationService.ChangeCrossSessionValue(16, SelectedId).subscribe(function (resultData) {
                });
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
                contextObj.administrationService.ChangeCrossSessionValue(17, SelectedId).subscribe(function (resultData) {
                });
                break;
            case 14:/*Scheduling*/
                contextObj.administrationService.ChangeCrossSessionValue(18, SelectedId).subscribe(function (resultData) {
                });
                break;
            case 2:/*Scheduling*/
                contextObj.administrationService.ChangeCrossSessionValue(3, SelectedId).subscribe(function (resultData) {
                });
                break;
        }

    }
    public showDrawingDetails(items) {
        //if (items.keyvalue.length > 0) {
        //    ////console.log("selectedId", items);
        //    this.splitviewInput.showSecondaryView = true;
        //    this.drawingDetails = items.rowdata;
        //    this.drawingId = items.keyvalue;
        //}
    }

    onViewDrawingClick(tab: number) {
        //this.viewDrawing = true;
        //var contextObj = this;
        //setTimeout(function () {
        //    contextObj.selectedTab = tab;
        //}, 1);

    }

    onMarkupListClick() {
      
        this.pageTitle = "Markups";
        var contextObj = this;
        var markupFromDescription = contextObj.markups == undefined ? 0 : contextObj.markups;
        contextObj.isDisplaySetting = false;
        contextObj.action = "markuplist";
        switch (contextObj.selectedTab) {//building-0,floor-1
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        } else {
                            if (markupFromDescription == 0 && contextObj.markupCount == 0) {
                                contextObj.notificationService.ShowToaster("No Markups added", 2);
                                contextObj.splitviewFloor.showSecondaryView = false;
                                contextObj.splitviewBuilding.showSecondaryView = false;
                            }
                            else {
                                contextObj.splitviewFloor.showSecondaryView = false;
                                contextObj.splitviewBuilding.showSecondaryView = true;
                            }
                        }
                    }
                    else
                    { contextObj.notificationService.ShowToaster("Select a Drawing", 2); }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        } else {
                            if (markupFromDescription== 0 && contextObj.markupCount == 0) {
                                contextObj.notificationService.ShowToaster("No Markups added", 2);
                                contextObj.splitviewFloor.showSecondaryView = false;
                                contextObj.splitviewBuilding.showSecondaryView = false;
                            }
                            else {
                                contextObj.splitviewBuilding.showSecondaryView = false;
                                contextObj.splitviewFloor.showSecondaryView = true;
                            }
                        }
                    }
                    else
                    { contextObj.notificationService.ShowToaster("Select a Drawing", 2); }
                break;
        }
    }
    onRevisionListClick() {
        //debugger
        this.pageTitle = "Revisions";
        var contextObj = this;
        contextObj.isDisplaySetting = false;
        contextObj.action = "revisionlist";
        switch (contextObj.selectedTab) {//building-0,floor-1
            case contextObj.buildingTabIndex:
                if (contextObj.selectedBuildingIds)
                    if (contextObj.selectedBuildingIds.length > 0) {
                        if (contextObj.selectedBuildingIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        } else {
                            if (contextObj.Revisions == 0) {
                                contextObj.notificationService.ShowToaster("No Revisions added", 2);
                            }
                            else {
                                contextObj.splitviewFloor.showSecondaryView = false;
                                contextObj.splitviewBuilding.showSecondaryView = true;

                            }
                        }
                    }
                    else
                    { contextObj.notificationService.ShowToaster("Select a Drawing", 2); }
                break;
            case contextObj.floorTabIndex:
                if (contextObj.selectedFloorIds)
                    if (contextObj.selectedFloorIds.length > 0) {
                        if (contextObj.selectedFloorIds.length > 1) {
                            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                        } else {
                            if (contextObj.Revisions == 0) {
                                contextObj.notificationService.ShowToaster("No Revisions added", 2);
                            }
                            else {
                                contextObj.splitviewBuilding.showSecondaryView = false;
                                contextObj.splitviewFloor.showSecondaryView = true;

                            }
                        }
                    }
                else
                { contextObj.notificationService.ShowToaster("Select a Drawing", 2); }
                break;
        }
    }
  
    onrevisionCardClick(tab: any) {
        // //console.log("cardClick!2");
        //this.selectedTab = 1;
    }

    onmarkupCardClick(event: any) {
        ////console.log("cardClick markup");
    }

    // following are the search component functions

    SaveAs(event: any) {
        //console.log('Entered Save As');
    }
    Delete(event: any) {

        //console.log('Entered Delete');
    }
    onloadSearch(event: any) {
        //console.log('Enetered On Load Search');
    }
    Clear(event: any) {
        //console.log('Entered Clear');
    }
    Submit(event: any) {
        //console.log('Entered Search')
    }

    ShiftTab(event) {

        this.selectedTab = event;
    }

    //detailsOnClick() {
    //    this.splitviewDrawing.showSecondaryView = true;
    //}
    onTabClose() {
        this.showIFC = false;
        var callBackForCloseTab = this.closeTbFuns[1];
        var selectedTabObj = this.closeTbFuns[2];
        var tabContextObj = this.closeTbFuns[3];
        callBackForCloseTab(selectedTabObj, tabContextObj, "out");
        this.changeMenu();
        this.IsOpenDrawingComponentActive = false;
        this.viewDrawing = false;
        if (this.pageTarget == 2)
            this.onDrawingTabClose.emit({});

    }
    okMarkupSave() {
        var contextObj = this;
        let isBuildingDrawing: boolean = false;
        if (this.isMarkupEdit) {
            if (this.selectedTab == this.buildingTabIndex)
                isBuildingDrawing = true;
            contextObj.markupObj.saveMarkUp(function (xmlString) {
                //console.log("xmlString", xmlString);

                let xmlStringModified = xmlString.replace(/\\/g, "0x5c");   // replace becuase of ; not work on json (; convert to it's hex value)
                contextObj.drawingDetailsService.updateMarkupDetails(contextObj.markupObj.selectedEditmarkupData[0].markupId, contextObj.drawingType, xmlStringModified, contextObj.drawingId, contextObj.revisionNo, isBuildingDrawing).subscribe(function (resultData) {
                    if (resultData.StatusId == 1) {
                        contextObj.notificationService.ShowToaster("Markup uploaded", 3);
                    }
                    else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                });
            });
        }
        else
            this.showSlideDesc = true;
        this.showSlideMarkup = false;
    }
    noMarkupSave() {
        var contextObj = this;
        this.showSlideMarkup = false;
        if (contextObj.closeTbFuns != undefined) {
            if (contextObj.objiWhiz) {
                contextObj.objiWhiz.close(function (returnCode) {
                    contextObj.onTabClose();
                });
            }
        }
    }
    onMarkupDesciptionSubmit(event: any) {
        //console.log("onMarkupDesciptionSubmit", event);
        debugger
        var contextObj = this;
        var message: string = "";
        let isBuildingDrawing: boolean = false;
        let description = event[0].FieldValue;
        var markupFromDescription = contextObj.markups == undefined ? 0 : contextObj.markups;
        if (this.selectedTab == this.buildingTabIndex)
            isBuildingDrawing = true;
        contextObj.markupObj.saveMarkUp(function (xmlString) {
            //console.log("xmlString", xmlString);

            let xmlStringModified = xmlString.replace(/\\/g, "0x5c");   // replace becuase of ; not work on json (; convert to it's hex value)
            this.revisionNo = this.drawingDetails["LatestRevisionNo"] != undefined ? this.drawingDetails["LatestRevisionNo"] : this.revisionNo;
            contextObj.drawingDetailsService.insertMarkupDetails(contextObj.drawingType, xmlStringModified, description, contextObj.drawingId, contextObj.revisionNo, isBuildingDrawing, contextObj.moduleId,0).subscribe(function (resultData) {
                message = resultData.Message;

                if (message = "Success") {
                    //contextObj.IsOpenDrawingComponentActive = false;
                    //contextObj.viewDrawing = false;
                   
                    markupFromDescription = contextObj.markupCount + 1;
                    contextObj.markups = markupFromDescription;
                    contextObj.notificationService.ShowToaster("Markup uploaded", 3);
                    contextObj.objiWhiz.close(function (returnCode) {
                        contextObj.showSlideDesc = false;
                        if (contextObj.closeTbFuns != undefined) 
                            contextObj.onTabClose();
                    });
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
        });
    }
    onTabBeforeClose($event) {
        var contextObj = this;
        this.showIFC = false;
        contextObj.closeTbFuns = $event;
        if (contextObj.moduleId == 1) {
            if (contextObj.objiWhiz && contextObj.markupObj) {
                if (contextObj.markupObj.isMarkupSaved)
                    contextObj.onTabClose();
                else {
                    contextObj.markupObj.hasMarkups(function (retCode,isEdit) {
                        if (retCode == 0) {
                            if (isEdit) {
                                contextObj.isMarkupEdit = isEdit;
                                contextObj.markupSaveMessage = "Do you want to save the Markup?";
                            }
                            else
                                contextObj.markupSaveMessage = "Do you want to save the newly added Markup?";
                            contextObj.showSlideMarkup = true;
                        }
                        else {
                            contextObj.onTabClose();
                        }
                    });
                }
            }
            else
                contextObj.onTabClose();
        }
        else {
            contextObj.selectedTab = contextObj.floorTabIndex;
            if (contextObj.objiWhiz) {
                contextObj.objiWhiz.close(function (returnCode) {
                    contextObj.onTabClose();
                });
            }
            else
                contextObj.onTabClose();
        }
        //var callBackForCloseTab = $event[1];
        //var selectedTabObj = $event[2];
        //var tabContextObj = $event[3];
        //callBackForCloseTab(selectedTabObj, tabContextObj);
    }
    onMarkupViewOnClick(event: any) {
        this.splitviewBuilding.showSecondaryView = false;
        this.splitviewFloor.showSecondaryView = false;
        this.currentPageTargetForAsbuilts = this.pageTarget;
        this.pageTarget = 3;
        this.markupEvent = event;
        this.viewDrawings(this.inputItems.selectedIds);
        //switch (this.selectedTab) {
        //    case this.buildingTabIndex:
        //        break;
        //    case this.floorTabIndex: this.pageTarget = 3;
        //        this.markupEvent = event;
        //        break;
        //}
    }
    onDrawingView(event: any) {
        debugger
        var contextObj = this;
      //  var fieldObject = JSON.parse(event.event.fieldObject);
        this.currentPageTargetForAsbuilts = this.pageTarget;
        this.pageTarget = 4;
        contextObj.revisionNo = +(event.latestRevisionNo);
        contextObj.drawingId = event.drawingId;
        contextObj.drawingDetails = event.rowData;
        contextObj.viewDrawings(contextObj.drawingId);

    }
    onRevisionChange(event: any) {  
     
        this.revisions = event.revisions;
        this.drawingId = event.drawingId;
    }
    onMarkupChange(event: any) { 
             
        this.markups = event.markups;/*update revision count on change of floordrawinglist*/
        this.markupCount = this.markups;
        this.drawingId = event.drawingId;
       
    }
    getFieldObjectsBuilding(event: any) {
        var contextObj = this;
        contextObj.fieldObject = event.fields;
    }
    getFieldObjectsFloor(event: any) {
        var contextObj = this;
        contextObj.fieldObject = event.fields;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    closeSlideDescDialog(value: any) {
        this.showSlideDesc = value.value;
    }
    closeSlideConfirmDialog(value: any) {
        this.showSlideMarkup = value.value;
    }
    closeSlideDeleteSpaceDataDialog(value: any) {
        this.showSlideDeleteSpaceData = value.value;
    }
    closeSlideLockDrawingDialog(value: any) {
        this.showSlidelockDrawing = value.value;
    }
    public getUpdatedDisplaySettingsBuilding(event) {// didplay settings emitted data
        var contextObj = this;

        contextObj.fieldObject = contextObj.generalFunctions.updateDisplaySettingsinUI(contextObj.fieldObject, event);
    }
    public getUpdatedDisplaySettingsFloor(event) {// didplay settings emitted data
        var contextObj = this;
         var contextObj = this;
         this.fieldObject = contextObj.generalFunctions.updateDisplaySettingsinUI(contextObj.fieldObject, event["dispSettingObject"]);
        //setTimeout(function () {
        //    contextObj.splitviewFloor.showSecondaryView = false;
            
        // }, 8000);
         //contextObj.isDisplaySetting = false;
         contextObj.splitviewFloor.showSecondaryView = false;
    }
    afterassetplaceclick(event: any) {      
    }
        showDrawingAfterUnlockEvent(data: any) {
        this.showDrawingAfterUnlock.emit(data);
    }
    showZoomAfterUnlockEvent(data: any) {
        this.showZoomAfterUnlock.emit(data);
    }
}

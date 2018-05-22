import {Component, ChangeDetectorRef, EventEmitter, Output, Input, ViewEncapsulation, KeyValueDiffers, ElementRef, OnInit} from '@angular/core';
import {NgControl, DatePipe} from '@angular/common';
import {DrawingView} from '../../../Framework/Whatever/Drawing/drawingview.component';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component';
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component';
import {ContextMenu} from '../../../Framework/Whatever/contextmenu/contextmenu.component';
import {DrawingMarkups} from '../../Asbuilts/Drawings/drawing-markups.service';
import {UnlockDrawing} from '../../space/drawings/unlockdrawing.space';
import {IField, ILookupValues} from  '../../../Framework/Models/Interface/IField'
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component'
import {DrawingDetailsService} from '../../../Models/Common/drawingdetails.service';
import {MarkupsList} from '../../../whatever/common/drawingdetails/markuplist.component';
import {ModuleSwitchComponent} from '../../../whatever/common/drawingdetails/moduleswitch.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {MarkupDescriptionComponent} from '../../../whatever/Asbuilts/Drawing Settings/markup-description.component';
import {TextAreaComponent} from '../../..//Framework/Whatever/DynamicControls/DynamicFields/textareacomponent.component'
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ColorPickerComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/colorpickercomponent.component';
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import {DrawingTooltip} from './drawingtooltip.component';
import {SpaceOpenDrawing} from '../../space/drawings/spaceopendrawing.services';
import {ArchiveOpenDrawing } from '../../cai/drawings/archivedopendrawing.services';
import {EmployeeOpenDrawing} from '../../employee/drawings/employeeopendrawing.services';
import {StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import {RelinkEmployeeListComponent} from '../../employee/drawings/relinkemployeelist';
import {OrphanObjectDataListComponent} from '../../objects/data/orphanobjectdata-list.component'



import {Delimeter} from '../../../Models/Common/General';
import {SpaceAddEditComponent} from '../../space/space data/spacedata-addedit.component';
import {SpaceDataGridComponent} from '../../space/space data/spacedata-grid.component';
import {AssignSpaceStd } from '../../space/space data/assignspacestd.component';

import { ObjectDataComponentindrawing } from '../../objects/Data/objectDataindrawing.component';
import {AssignedEmployeeComponent} from '../../employee/drawings/employeelistindrawing.component';
import {AssignedEmployeeAddEditComponent} from '../../Employee/data/assignedemployee-addedit';
import { Http } from '@angular/http';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ObjectsService } from '../../../Models/Objects/objects.service'
import {FileViewer} from '../../../framework/whatever/fileviewer/fileviewer.component';
import { ObjectssOpenDrawing} from '../../objects/drawings/objectsopendrawing.services';
//import {AssetsOpenDrawing} from '../../objects/assets/drawings/assetsopendrawing.service';
import {ScenarioOpenDrawing} from '../../employee/drawings/scenarioopendrawing.services';
import { ObjectDataAddEditComponent } from '../../../whatever/Objects/Data/objectData-addedit.component'
import {SelectReocourceForEmployeeMove} from '../../Employee/data/selectResourcesForEmployeeMove';
import {DistributionMapSettingsonDrawingsComponent} from '../../Common/DistributionMapSettings/distributionmapsettingsondrawings.component';
//Scheduling : Module 14
import {SchedulingOpenDrawing} from '../../scheduling/drawings/schedulingopendrawing.service';
import {ReserveRoomFromDrawing } from '../../scheduling/drawings/reserveroomfromdrawing.component';
import { BookSeatComponent} from '../../scheduling/seat booking/bookseat.component';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import { AttachmentsComponent } from '../../Common/Attachments/attachments.component';
import {SpaceService} from '../../../Models/Space/space.service'
import {EmployeeService} from '../../../Models/Employee/employee.services'
import {schedulingdataindrawing} from '../../scheduling/drawings/schedulingdataindrawing.component';
import {EmployeeMoveRequest} from '../../employee/request/employeemoverequest.component';
import {EmployeeScale} from '../../Common/OpenDrawing/EmployeeScale';
import {ConnectComponents} from '../../Common/OpenDrawing/Connect_Components';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import {InlineSearchBox} from '../../../Framework/Whatever/Search/Inlinesearch.component';
import {ShowConnections} from '../../Common/OpenDrawing/ShowConnections'
import {ConnectComponentsView} from '../../objects/drawings/ShowConnectionToAnotherFloor'
import {EmployeMoveToAnotherFloorView} from '../../employee/drawings/MoveEmployeToAnotherFloor';
import { CreateServiceRequestComponent} from '../../workorder/create request/createrequest-root.component';
//import {WOWorkHistoryReportComponent } from '../../reports/workorder/equipmentworkhistory/wo.workhistory.report.component';
//import {ReviewServiceRequestInDrawingComponent } from '../../objects/drawings/reviewservicerequestfromdrawing.component';
@Component({

    selector: 'opendrawing',
    templateUrl: './app/Views/Common/OpenDrawing/opendrawing.component.html',
    styleUrls: ['app/Views/Common/OpenDrawing/opendrawing.css'],
    directives: [GridComponent, SplitViewComponent, DrawingView, SlideComponent, Notification, DropDownListComponent, ModuleSwitchComponent, MarkupsList,
        SectionComponent, MarkupDescriptionComponent, TextAreaComponent, FieldComponent, ColorPickerComponent, DrawingTooltip,
        DisplaySettingsComponent, TabsComponent, TabComponent, ContextMenu, ListBoxComponent, SpaceAddEditComponent, SpaceDataGridComponent,
        AssignedEmployeeComponent, AssignedEmployeeAddEditComponent, ObjectDataComponentindrawing, FileViewer, ObjectDataAddEditComponent, AttachmentsComponent,
        ReserveRoomFromDrawing, DistributionMapSettingsonDrawingsComponent, AssignSpaceStd, SelectReocourceForEmployeeMove, BookSeatComponent, schedulingdataindrawing, EmployeeMoveRequest, EmployeeScale, ConnectComponents, searchBox, InlineSearchBox,
        RelinkEmployeeListComponent, ShowConnections,/* forwardRef(() => ObjectDataListComponent),*/ ConnectComponentsView, OrphanObjectDataListComponent, EmployeMoveToAnotherFloorView, CreateServiceRequestComponent],// WOWorkHistoryReportComponent, ReviewServiceRequestInDrawingComponent
    providers: [SchedulingService, DrawingDetailsService, NotificationService, GeneralFunctions, ObjectsService, AdministrationService, SpaceService, EmployeeService, StringTextBoxComponent],
    encapsulation: ViewEncapsulation.None,
    inputs: ['BlinkSecondDrawings', 'SecondPrimaryObjectId', 'SecondAssociationId']
})

export class OpenDrawing implements OnInit {
    @Input() BlinkSecondDrawings: any;
    @Input() moveEmpDetailsForAnotherFloor: any;
    @Input() DrawingGridUpdateForMoveEmployee: any;
    @Input() moveFullEmpDataForAnotherFloor: any;
    @Input() SecondPrimaryObjectId: any;
    @Input() SecondAssociationId: any;
    @Input() SecondfieldDetails: any;
    @Input() extDrawingId: number;
    @Input() canvasIdName: string;
    @Input() loadingIndicatorIdName: string;
    @Input() extRevisionNo: number;
    @Input() extDrawingCategoryId: number;
    @Input() moduleId: number;
    @Input() pageTarget: number;
    @Input() activeModuleIds: number[];
    @Input() extDrawingType: number;
    @Input() extDrawingDetails: any;
    @Input() markupEvent: any;
    @Input() isSchedulingOnlyUser: boolean;
    @Input() extIsBuildingDrawing: boolean;
    @Input() isDrawingUnlocked: boolean;
    @Input() archiveId: number = 0;
    @Input() spaceObjInUnlock: any;
    @Input() isPlotInDrawing: boolean;
    @Output() outDrawingobject = new EventEmitter();
    @Output() outUnlockDrawingClicked = new EventEmitter();
    @Output() outSpacedataClicked = new EventEmitter();
    @Output() afterassetplace = new EventEmitter();
    @Output() outDelinkInGrid = new EventEmitter();
    @Output() outAssignedEmpIds = new EventEmitter();
    @Output() removeConnectivityDetails = new EventEmitter();
    @Output() showDrawingAfterUnlock = new EventEmitter();
    @Output() showZoomAfterUnlock = new EventEmitter();
    @Output() searchForSpaceEmit = new EventEmitter();
    @Output() DrawingMoveEmployeesDetaills = new EventEmitter();
    EmployeesDetailsSelectedForMove: any;
    isShowPrimaryDrawing: boolean = true;
    isShowSecondaryDrawing: boolean = false;
    cdr: any;
    drawingDetails: any;
    drawingId: number;
    drawingIdForDistMap: number;
    revisionNo: number;
    drawingType: number;
    drawingCategoryId: number;
    showMarkupDescription: boolean = false;
    showMarkupComment: boolean = false;
    ShowScaleFactor: boolean = false;
    ConnectAnotherDrawing: boolean = false;
    showObjectDrawingslide: boolean = false;
    ShowSearchForSpace: boolean = false;
    ShowConnectComponent: boolean = false;
    ShowConnectAgain: boolean = false;
    ShowRemoveConnection: boolean = false;
    ShowTextHeight: boolean = false;
    showModuleSwitch: boolean = false;
    markupBold: boolean;
    markupItalic: boolean;
    isMarkupSaved: boolean = false;
    isBuildingDrawing: boolean = false;
    isEditComment: boolean = false;
    showSlide: boolean = false;
    showSlideConfirm: boolean = false
    lineSizeDisable: boolean = true;
    visibilityOfMenu: string = "hidden";
    field: IField;
    markupCommentData: IField; // fieldobjects for add/edit comment
    colorFieldObj: IField; // fieldobjects for color picker
    objiWhiz: any; // for drawing object
    canvasElement: any;
    markupObj: DrawingMarkups;//for markup object
    unlockDrawingObj: UnlockDrawing;
    AssociationId: any;
    ConnectivityRemoveDatakey: any
    //markupTextStyle: IField;
    //markupTextFont: IField;
    uploadedDate: string = "";
    objectmessage = { "key": 0, "message": "" };
    errorMessage: string;
    markupFontStyle: string;
    markupFontSize: string;
    boldBackground: string = "transparent";
    italicBackground: string = "transparent";
    positionExpand: string = "initial";
    displayMaximize: string = "initial";
    displayMinimize: string = "none";
    markupColour: string;
    position: string = "top-right";
    markupDeletehandle: string;
    rotatehandle: any;
    blnIsGrid: boolean = false;
    dispSettingCategoryId = 1;
    ddlObjectClassDisplaySettings: IField;
    selectedObjectClassDisplaySettingsId: number = 0;
    detailsWidth: string = "400";
    displaySettingDdlFieldValue: any;
    strPopupText = "";
    objectarryLength: any;
    defaultLayers: any;
    markupText: any;
    markupStartX: any;
    markupStartY: any;

    hasActiveMarkups: number = 0;
    userId: number = 1;
    markupId: number;
    lineThickness: number = 1;
    lineAutocadColor: number = 1;
    fontAutocadColor: number = 1;
    siteDrawing: number = 999;
    buildingDrawing: number = 0;
    floorDrawing: number = 1;
    unassignedTxt = "Unassigned";
    defaultLayersLength: number = 0;

    markupLayerArray: MarkupLayers[] = [];// for markup layers for view/hide
    markupLayerInsertArray: MarkupLayers[] = [];// for markup layers for delete
    visibleMarkupIds: number[] = [];
    fontStyleArray = [];
    fontsizeArray = [];
    ratioValue = [0];

    inlineSecondaryView: boolean = true;

    splitviewDrawing: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    splitviewDrawinggrid: ISplitView = { showSecondaryView: true, showButton: false, secondaryArea: 33 };
    dwgDetails: string = "";
    dwgDetailsData: any;

    contextMenuXPosition: number;
    contextMenuYPosition: number;
    contextMenuVisibility: boolean = false;
    contextMenuData: IContextMenu[] = [];
    layerList: IField[] = [];
    showLayer: boolean = false;
    columnDelimiter: string;
    rowDelimiter: string;
    showSecondaryViewAsbuiltsTarget: number;
    layerNames: any;
    IsSelectAllLayerChecked: boolean;
    layerNameLength: number;
    pageTitle: string;
    editMarkupLayerName: string = "";
    selectedEditmarkupData: any;
    showSlideMarkup = false;
    showEmpMoveResources = false;
    showEmpMoveResourcesposition = "top-right";
    markupSaveMessage: string = "";
    //************ space drawing ************//
    spacedrawingdata: any;
    spacedrawingdisplaysettings: any;
    tooltipXPosition: number;
    tooltipYPosition: number;
    tooltipVisibility: boolean = false;
    tooltipData: any;
    spaceObj: SpaceOpenDrawing;
    archiveDrawingObj: ArchiveOpenDrawing;

    isHatch: boolean = false;
    isBlink: boolean = false;
    spaceDistMenuData: any;
    visibilityOfDistributionMenu: string = "hidden";
    visibilityOfDistributionImage: string = "hidden";
    visibilityOfspaceMoreMenu: string = "hidden";
    visibilityOfempMoreMenu: string = "hidden";
    visibilityOfobjectsMoreMenu: string = "hidden";
    visibilityOfToolsMenu: string = "hidden";
    showEmpMoreMenu: boolean = true;
    spaceIdForEdit: number;
    drawingIdForSpace: any[] = [];
    fieldDetailsSpace: IField[]
    fieldDetailsAssignSpaceStd: IField[];
    drawingIdForSpaceEdit: any[] = [];
    fieldDetailsSpaceEdit: IField;
    objectFieldDetailsAddEdit: IField;
    showSecondaryViewSpaceTarget: number;
    inputItems = { dataKey: "DrawingId", selectedIds: [] };
    selectedHandles: any = [];
    showSlideTotalize: boolean = false;
    totalizeData: any[];
    selectedCount: number;
    isModuleAdmin: boolean = true;
    highlightRowIds = [];
    showbtndeassign: boolean = false;
    updatedSpaceData: any;
    isArchive: boolean = false;
    //************ employee drawing ************//
    selectedTab: number = 0;
    employeeDrawingObj: EmployeeOpenDrawing;
    positionApproval: string = "top-right";
    assignedEmployeeSelectedId: number = 0;
    showSecondaryViewEmployeeTarget: number;
    isSpace: boolean = true;
    isTooltipEnable: boolean = true;
    defaultChkbxIsChecked: boolean = true;
    ShowEmployeSpaceforSearch: boolean = false;
    selAllChkbxIsChecked: boolean;
    empDialogMessages = { "key": 0, "message": "" };
    strEmpMessage: string;
    showSlideEmp: boolean = false;
    assignSpacetoEmpEventData: any;
    insertSpaceAllotments: any = undefined;
    insertSpaceAllotmentsAfterMove: any = undefined;
    employeeData: any;
    isAssignSpace: boolean = false;
    IsDeassignEmp: boolean = false;
    deAssignedEmpId: number;
    IsObjectPlaced: boolean = false;
    IsObjectMoved: boolean = false;
    ObjectDelinked: number[] = [];
    arrayCount: number = 0;
    selectedMultipleMoveEmpDetails: any[] = [];
    selectedMultipleEmpformoveDetails: empmultiplemove[] = [];
    arrayforresourcecancel: any[];
    isMultipleEmployeeAssign: boolean = false;
    IsNeedToUpdateSource: boolean = false;
    empMoreMenuRight: string = "140";
    spaceMoreMenuRight: string = "140";
    distributionMenuRight: string = "185";
    moreToolsMenuRight: string = "95";
    assignedEmpIds: number[] = [];
    assignedEmpsData: any[] = [];
    assignFromGrid: boolean = false;
    btnName: string = "";
    relinkempdata: any[];
    relinkempcount: number;
    orphanObjectData: any[];
    orphanObjectcount: number;
    isrelinkclick: boolean = false;
    nospacehandlearray = [];
    completeidspacehandlearray = [];
    notemparray = [];
    sometemparray = [];
    MoveDrawingEmployeesDetails: any[] = [];


    /*Scenario Open Drawing*/
    scenarioOpenDrawingObj: ScenarioOpenDrawing;
    //AssetDrawing //Assets : Module 7************
    showSecondaryViewObjectTarget: number;
    showSecondaryViewSpaceScheduleTarget: number;
    objectsDrawingObj: ObjectssOpenDrawing;
    @Input() selectedRow: any[];
    selectedRowDetails: any[];
    insertSpaceAllotmentsAfterMoveAsset: any;
    isOccupancydistSelected: boolean = false;
    isSpaceTotalizeLegend: boolean = false;
    isAddLegend: boolean = false;
    displaySettingAssettarget: number = 0;
    exportMenu: IContextMenu[] = [];
    saveAsMenu: IContextMenu[] = [];
    spaceMoreMenu: IContextMenu[] = [];
    empMoreMenu: IContextMenu[] = [];
    objectsMoreMenu: IContextMenu[] = [];
    toolsMenu: IContextMenu[] = [];
    visibilityOfExportMenu: string = "hidden";
    visibilityOfSaveAsMenu: string = "hidden";
    showAttachment: boolean = false;
    attachmentCategoryId: number;
    baseEntityIdForattachment: number;
    sessionUserRoleId: number;
    moveAssetsDetails: any[] = [];
    fieldDetailsAdd1: IField[] = [];
    fieldDetails: IField[] = [];
    ConnectivitydrawingDetails: IField[] = [];

    //Scheduling : Module Id:14
    schedulingDrawingObj: SchedulingOpenDrawing;
    showSearchSlide = false;
    showdelinkconfirmationSlide = false;
    spaceDataForReserveRoom: any;
    fieldsForSeatBooking: IField[] = [];
    selectedSeatId: number[];
    isRoomBookingEnabled: boolean = true;
    isSeatBookingEnabled: boolean = true;
    isShowClicked: boolean = false;
    siteTime: string;
    //asset


    editObjectSelectedId: number = 0;
    editObjectClassId: number = 0;
    editObjectSpaceId: number = 0;
    showMaxMinIcon: boolean = true;
    userrole: number;
    showMoveOutsideSpace = false;
    moveemployeeId: any;
    Isallattachmentmenuneeded: boolean = true;
    distributionMapSettongonDrawing: boolean;
    value: any;
    fieldname: any;
    itemsSource: any[];
    empresorceSource: any[];
    totalizeAssetData: any[];
    dblActualXDiff: any
    dblActualYDiff: any;
    movespaceid: any;
    movefloorid: any;
    totalizeSlidePos: string = "center";
    objectCategoryId: number;
    displaySettingCategoryId: number;
    spacedisplaySettingCategoryId: number = 1;
    additionalDataFieldCategoryId: number = 7;
    userRoleId: any;
    moduleacess: boolean;
    isObjectAssign: boolean = false;
    showMultipleHotelingSeats = false;
    dialogMessages = { "key": 0, "message": "" };
    maximusSeats: number = 0;
    assignmentTypeId: number = 0;
    selectedRoomNo: number = 0;
    selectedtabInRight: number = 0;
    isSiteAdmin: boolean = false;
    showEmployeeMoveRequest: boolean = false;
    ApprovalForEmpMoveInDrawing: boolean = false;
    ApprovalForEmpAssignInDrawing: boolean = false;
    MoverequestFields: any[] = [];
    selectedEmployeeData: any[];
    showEmployeeMoveRequestFromAssign: boolean = false; // If this is false, then aproval process for Employee move , otherwise assign
    moveassignRequestMessage: string = " Do you want to execute this move through the Approval Process?";
    selectedEmployeeDataAssign: any;
    SpaceDetailsForRequest: any[];
    ObjectDetailsForRequest: any;
    updateWorkSpaceData: any;
    isResoureFeatureEnabled: boolean = false;
    selectedEmpForAssign: any[];
    schdulingDataInDrawingTabindex = 0;
    objectname: any;
    objectmultiplename: any;
    scalefactorValue: any;
    TextHeightValue: any;
    seattxt = "Workspace";
    roomtext = "Team Room";
    /*for Objects*/
    objModuleIds: any;
    isSymbolHandle: boolean;// true symbolhandle false block handle
    updateObjectDataSource: any[] = [];
    selectedBlockRefHandle: string = '';
    objectAddOrEdit: string = '';
    showObjectMenu: boolean = false;
    objDelinkMessage: string = "";
    objectDetailsText: string = "";
    objectPlaceMsgText: string = "";
    objtoolImageTitle: string = "";
    isXrefExists: boolean = false;
    xrefedDrawing: string = undefined
    xrefedDrawingId: any = undefined;
    reserveseat;
    reserveroom;
    moveseat;
    setasseat;
    setmultipleroomsasseat;
    primaryObjectId: any;
    isConnectivityConnect: any;
    GridSecondaryObjectId: any;
    fieldObject: IField[] = [];
    showSearch: boolean = false;
    advancelookup: IField[] = [];
    toView: boolean = false;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    inputItem: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    removeGridLengthInConnectivity: any;
    IsShowStyle: boolean = false;
    removeConnectivityGrid: any;
    ConnectedArrayOfConnectivity: any[];
    BlinkWithInDrawings: any;
    BlinkOutSideDrawings: any;
    innerwidth: number = 0;
    tabTitleClassAttribute = "Class Attributes";
    SiteId: string = "";
    objectXPosition: string = "";
    objectYPosition: string = "";
    objectAngle: string = "";
    showSlidePlot: boolean = false;
    plotMessage: string = '';
    plotSettingsConfigKey: any;
    islowResolution: boolean = false;
    SecondaryComponentTypeForToaster: string = "";
    /******************************/
    // changeEvent = false;
    objectInputItems: IGrid = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'Multiple', };
    //[{ menuId: 0, menuName: "Pan" }, { menuId: 1, menuName: "Zoom In" }, { menuId: 2, menuName: "Zoom Out" }, { menuId: 3, menuName: "Zoom Window" },
    //    { menuId: 4, menuName: "Zoom Extents" }, /*{ menuId: 5, menuName: "Zoom Previous" },*/ { menuId: 6, menuName: "Layers" }];
    constructor(cdr: ChangeDetectorRef, private schedulingService: SchedulingService, private drawingDetailsService: DrawingDetailsService, private notificationService: NotificationService, private http: Http, private eleRef: ElementRef, private generalFunctions: GeneralFunctions, private objectsService: ObjectsService, private administrationService: AdministrationService, private spaceService: SpaceService, private EmployeeService: EmployeeService, private generFun: GeneralFunctions) {
        this.cdr = cdr;
        var delimiter = new Delimeter();
        this.columnDelimiter = delimiter.ColumnDelimeter;
        this.rowDelimiter = delimiter.RowDelimeter;
        var contextObj = this;
        contextObj.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            contextObj.userRoleId = retData["UserRoleId"];
            if (contextObj.userRoleId == 6) {
                contextObj.moduleacess = false;
                contextObj.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
                    var accesibleModules = resultData["Data"];
                    accesibleModules.filter(function (item) {
                        if (item.ModuleId == 123)
                            contextObj.moduleacess = true;
                        return true
                    });
                });
            }
            else
                contextObj.moduleacess = true;
        });
        this.innerwidth = window.innerWidth * .59;
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
            }
            contextObj.reserveseat = "Reserve " + contextObj.seattxt;
            contextObj.moveseat = "Move " + contextObj.seattxt;
            contextObj.setasseat = "Set as Hoteling " + contextObj.seattxt;
            contextObj.setmultipleroomsasseat = "Set multiple rooms as Hoteling " + contextObj.seattxt;
        });
        contextObj.schedulingService.checkSubscribedFeature('275').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtext = result["Data"][0].Value;
            }
            contextObj.reserveroom = "Reserve " + contextObj.roomtext;
        });
    }



    ngOnInit() {
        var contextObj = this;
        this.objectCategoryId = 0;
        this.objModuleIds = [6, 7, 8, 17, 18, 24, 25, 26, 27];
        contextObj.showObjectMenu = false;
        contextObj.objectDetailsText = "";
        contextObj.objDelinkMessage = "";
        contextObj.objectPlaceMsgText = "";
        contextObj.objtoolImageTitle = "";
        this.spacedisplaySettingCategoryId = 1;
        this.checkSubscribedFeatures();
        if (this.loadingIndicatorIdName == undefined || this.loadingIndicatorIdName == null)
            this.loadingIndicatorIdName = 'loading-indicator';
        switch (contextObj.moduleId) {
            case 6: //Telecom

                this.objectname = "Object";
                this.objectmultiplename = "Objects"
                this.displaySettingCategoryId = 5;
                this.spacedisplaySettingCategoryId = 16;
                this.objectCategoryId = 3;
                break;
            case 7: //Assets

                this.objectname = "Asset";
                this.objectmultiplename = "Assets"
                this.displaySettingCategoryId = 3;
                this.objectCategoryId = 1;
                this.spacedisplaySettingCategoryId = 13;
                break;
            case 8:// Furniture
                this.objectname = "Furniture";
                this.objectmultiplename = "Furniture"
                this.displaySettingCategoryId = 4;
                this.objectCategoryId = 2;
                this.spacedisplaySettingCategoryId = 15;
                break;
            case 17://Electrical
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.displaySettingCategoryId = 9;
                this.objectCategoryId = 8;
                this.spacedisplaySettingCategoryId = 18;
                break;
            case 18://Fire and Safety
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.displaySettingCategoryId = 10;
                this.objectCategoryId = 9;
                this.spacedisplaySettingCategoryId = 19;
                break;
            case 24://Security Assets
                this.objectname = "Equipment";
                this.objectmultiplename = "Equipment"
                this.displaySettingCategoryId = 32;
                this.spacedisplaySettingCategoryId = 33;
                this.objectCategoryId = 20;
                break;
            case 25://Mechanical
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.displaySettingCategoryId = 20;
                this.spacedisplaySettingCategoryId = 21;
                this.objectCategoryId = 10;
                break;
            case 26://Plumbing
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.displaySettingCategoryId = 22;
                this.spacedisplaySettingCategoryId = 23;
                this.objectCategoryId = 11;
                break;
            case 27://Medical Gas
                this.objectname = "Component";
                this.objectmultiplename = "Components"
                this.objectCategoryId = 12;
                this.displaySettingCategoryId = 24;
                this.spacedisplaySettingCategoryId = 25;
                this.objectCategoryId = 12;
                break;
            default:
                break;
        }
        //to get xrefeddrawing in utility drawing
        if (contextObj.drawingCategoryId != 1) {
            this.spaceService.GetXRefedArchitecturalDrawingId(contextObj.extDrawingId, contextObj.isBuildingDrawing).subscribe(function (resultdrawing) {
                console.log('resultdrawing in xref ', resultdrawing["FieldBinderData"])
                if (resultdrawing["FieldBinderData"] != "[]") {
                    contextObj.xrefedDrawing = JSON.parse(resultdrawing["FieldBinderData"])[0]["File Name"];
                    contextObj.xrefedDrawingId = JSON.parse(resultdrawing["FieldBinderData"])[0]["DrawingId"];
                }
                else {
                    contextObj.xrefedDrawing = "";
                    contextObj.xrefedDrawingId = 0;
                }

            })
        }

        if (this.objModuleIds.indexOf(this.moduleId) > -1) {
            if (this.pageTarget != 4)
                this.showObjectMenu = true;
            this.objectDetailsText = this.objectname + " Details";
            this.objtoolImageTitle = this.objectname + " Tools";
            var txtmessage = "de-link";
            if (this.objectCategoryId == 2) {
                txtmessage = "warehouse";
            } else {
                txtmessage = "de-link";
            }
            this.objDelinkMessage = "Are you sure you want to " + txtmessage + " the selected " + this.objectname + "?";
            this.objectPlaceMsgText = "Some of the " + this.objectmultiplename + " are placed outside the selected space. Do you want to proceed?";
        } else {
            if (this.moduleId != 1 && this.moduleId != 2)
                this.getSpaceMoreMenu();
        }
        if (this.extRevisionNo == undefined || this.extRevisionNo == null)
            this.extRevisionNo = -1;
        this.drawingId = +JSON.stringify(this.extDrawingId);
        this.drawingIdForDistMap = this.drawingId;
        this.revisionNo = +JSON.stringify(this.extRevisionNo);
        this.drawingType = +JSON.stringify(this.extDrawingType);
        this.drawingDetails = JSON.parse(JSON.stringify(this.extDrawingDetails));
        if (this.extDrawingCategoryId)
            this.drawingCategoryId = JSON.parse(JSON.stringify(this.extDrawingCategoryId));
        else
            this.drawingCategoryId = 1;
        this.exportMenu.push({ menuId: 0, menuName: "BMP" }, { menuId: 1, menuName: "DWF" }, { menuId: 2, menuName: "DXB" }, { menuId: 3, menuName: "DXF" },
            { menuId: 4, menuName: "JPEG" }, { menuId: 5, menuName: "PDF" }, { menuId: 6, menuName: "SVG" });
        this.saveAsMenu.push({ menuId: 0, menuName: "AutoCAD 2013" }, { menuId: 1, menuName: "AutoCAD 2010" }, { menuId: 2, menuName: "AutoCAD 2007" }, { menuId: 3, menuName: "AutoCAD 2004" },
            { menuId: 4, menuName: "AutoCAD 2000" }, { menuId: 5, menuName: "Release 14" }, { menuId: 6, menuName: "Release 13" }, { menuId: 7, menuName: "Release 12" });
        if (this.moduleId != 1 && this.moduleId != 2)
            this.getspaceDistMenuData();
        console.log("spaceMoreMenu" + this.spaceMoreMenu);
        if (this.extIsBuildingDrawing == undefined || this.extIsBuildingDrawing == null) {
            switch (this.drawingType) {
                case this.buildingDrawing: this.isBuildingDrawing = true;
                    break;
                case this.floorDrawing: this.isBuildingDrawing = false;
                    break;
                //case this.siteDrawing: 
                //    break;
            }
        }
        else
        { this.isBuildingDrawing = this.extIsBuildingDrawing; }
        if (this.moduleId != 3 && this.moduleId != 14 && this.moduleId != 12) {
            contextObj.distributionMenuRight = "230";
            contextObj.spaceMoreMenuRight = "185";
        } else if (this.moduleId == 14) {
            contextObj.distributionMenuRight = "120";
            contextObj.spaceMoreMenuRight = "75";
            contextObj.moreToolsMenuRight = "30";
            contextObj.detailsWidth = "300";
        }

        if ((this.moduleId == 7 || this.moduleId == 8 || this.moduleId == 18)) {
            contextObj.administrationService.getSessionData().subscribe(function (data) {
                var retData = data["Data"];
                contextObj.userrole = retData["UserRoleId"];
                if (contextObj.userrole == 4) {
                    contextObj.distributionMenuRight = "185";
                    contextObj.spaceMoreMenuRight = "140";
                }
            });
        }
        if (window.innerWidth <= 1024) {
            contextObj.islowResolution = true;
            contextObj.detailsWidth = "50";
            contextObj.splitviewDrawinggrid.secondaryArea = 45;
        }
        if (window.innerWidth <= 800) {
            contextObj.detailsWidth = "30";
        }
        if (window.innerHeight <= 600) {
            this.totalizeSlidePos = "top-right";
        }
        this.toolsMenu.push({ menuId: 0, menuName: "Display Settings" }, { menuId: 1, menuName: "De-Hatch" }, { menuId: 2, menuName: "Stop Blink" });
        switch (this.moduleId) {
            case 1:
            case 2:
                if (contextObj.isBuildingDrawing)
                    contextObj.dwgDetails = contextObj.drawingDetails.Site + " / " + contextObj.drawingDetails.Building;
                else
                    contextObj.dwgDetails = contextObj.drawingDetails.Site + " / " + contextObj.drawingDetails.Building + " / " + contextObj.drawingDetails.Floor;
                contextObj.inlineSecondaryView = false;
                contextObj.splitviewDrawinggrid.showSecondaryView = false;
                if (contextObj.pageTarget != 3) {
                    this.drawingDetailsService.getMarkupCommentData().subscribe(function (resultData) {
                        contextObj.markupCommentData = resultData["data"];
                        contextObj.fontStyleArray = contextObj.markupCommentData[0].LookupDetails.LookupValues;
                        contextObj.fontsizeArray = contextObj.markupCommentData[1].LookupDetails.LookupValues;
                    });
                }
                break;
            case 3:
            case 12:/*CAI*/
                if (contextObj.pageTarget == 2 || contextObj.pageTarget == 10) {
                    contextObj.inlineSecondaryView = false;
                    contextObj.splitviewDrawinggrid.showSecondaryView = false;
                }
                this.spaceDataGridOnClick();
                break;
            case 5:
                if (this.pageTarget != 5 && this.pageTarget != 6) {
                    contextObj.empMoreMenu.push({ menuId: 0, menuName: "De-Assign Employee" }, { menuId: 1, menuName: "Move Single Employee" }, { menuId: 2, menuName: "Move Multiple Employees" }, { menuId: 11, menuName: "Move Employee(s) to Another Floor" }, { menuId: 5, menuName: "Scale Employee" }, { menuId: 6, menuName: "Reset Employee Scale" }, { menuId: 7, menuName: "Set Employee Text Height" }, { menuId: 10, menuName: "Delete Employee" });
                    contextObj.showEmpMoreMenu = true;
                } else {
                    contextObj.empMoreMenuRight = "95";
                    contextObj.inlineSecondaryView = false; // for data grid hide
                    contextObj.splitviewDrawinggrid.showSecondaryView = false; // for data grid hide
                    contextObj.spaceDistMenuData = [];
                    if (contextObj.pageTarget == 5) {
                        var distMenuData = { "FieldId": -1, "FieldName": "Space Standard", "FieldNameWithId": "-1^Space Standard" }
                        //contextObj.spaceDistMenuData.push(distMenuData);
                        if (contextObj.extDrawingDetails["ScenarioStatusId"] == 1) {
                            contextObj.empMoreMenu.push({ menuId: 3, menuName: "Move Single Employee" }, { menuId: 4, menuName: "Save Scenario" });
                            contextObj.showEmpMoreMenu = true;
                        } else {
                            contextObj.showEmpMoreMenu = false;
                        }
                    } else if (contextObj.pageTarget == 6) {
                        contextObj.showEmpMoreMenu = false;
                        contextObj.isShowSecondaryDrawing = true;
                    }
                }
                break;
            //Assets Drawing : Showing assets distribution map only for archetectual drawing ---drawingCategoryId:1
            case 6://telecom
            case 7://assets
            case 8: // furniture
            case 17://electrical
            case 18://fire and safety
            case 24://security assets
            case 25://mechanical
            case 26://plumbing
            case 27://medical gas
                contextObj.getObjectsMenu();
                //this.objectsMoreMenu.push({ menuId: 2, menuName: "De-Link" }, { menuId: 0, menuName: "Move Single " + this.objectname }, { menuId: 1, menuName: "Move Multiple " + this.objectname }, { menuId: 3, menuName: "Connect Components" }, { menuId: 4, menuName: "Remove Connections" }, { menuId: 5, menuName: "Rotate " + contextObj.objectname });
                //if (contextObj.drawingCategoryId == 1) {
                //    this.drawingDetailsService.getSpaceDistributionMenuData(this.drawingId, this.moduleId).subscribe(function (resultData) {
                //        contextObj.spaceDistMenuData = JSON.parse(resultData["Data"].FieldBinderData);
                //    });
                //}
                //contextObj.administrationService.getSessionData().subscribe(function (data) {
                //    var retData = data["Data"];
                //    contextObj.userrole = retData["UserRoleId"];

                //});
                //contextObj.unassignedTxt = "Unassigned";
                if (contextObj.pageTarget == 4) { // connect to another floor
                    contextObj.inlineSecondaryView = false;
                    contextObj.splitviewDrawinggrid.showSecondaryView = false;
                    contextObj.isShowSecondaryDrawing = true;
                }
                break;
            //Scheduling Drawing 
            case 14:
                this.spaceDataGridOnClick();
                break;
        }
        contextObj.setConfigPathForPlot();
        if (window["IsMobile"] == true) {
            contextObj.inlineSecondaryView = false;
            contextObj.splitviewDrawinggrid.showSecondaryView = false;
        }

    }

    showSecondary() {
        if (window["IsMobile"] == true) {
            this.splitviewDrawinggrid.showSecondaryView = !this.splitviewDrawinggrid.showSecondaryView;
        }
    }

    setConfigPathForPlot() {
        var contextObj = this;
        contextObj.administrationService.getPlotSettingsAppSetingsKey().subscribe(function (resultData) {
            contextObj.plotSettingsConfigKey = resultData;
        });
    }

    getspaceDistMenuData() {
        var contextObj = this;
        if (this.moduleId == 3 || (this.moduleId == 12 && this.pageTarget != 10) || (this.moduleId == 14 && !contextObj.isSchedulingOnlyUser) || (this.moduleId == 5 && (this.pageTarget != 5 && this.pageTarget != 6))) {
            this.drawingDetailsService.getSpaceDistributionMenuData(this.drawingId, this.moduleId).subscribe(function (resultData) {
                contextObj.spaceDistMenuData = JSON.parse(resultData["Data"].FieldBinderData);
            });
        } else if (this.moduleId == 12 && this.pageTarget == 10) {
            contextObj.spaceDistMenuData = [{ FieldId: -4, FieldNameWithId: "-4^CAI Space Driver", FieldName: "CAI Space Driver" }];
        }
    }
    getObjectsMenu() {
        this.objectsMoreMenu.push({ menuId: 10, menuName: "Select " + this.objectname }, { menuId: 2, menuName: "De-Link" }, { menuId: 0, menuName: "Move Single " + this.objectname }, { menuId: 1, menuName: "Move Multiple " + this.objectname }, { menuId: 5, menuName: "Rotate " }, { menuId: 619, menuName: "Test Move" });//, { menuId: 11, menuName: "Align with Another " + this.objectname + "(Corner to Corner)" }, { menuId: 12, menuName: "Align with Another " + this.objectname + "(Corner to Edge)" }, { menuId: 13, menuName: "Align with Another " + this.objectname + "(Edge to Edge)"  }
        this.unassignedTxt = "Unassigned";
        switch (this.moduleId) {
            case 6://telecom
                break;
            case 7://assets
                break;
            case 8://Fruniture
                this.objectsMoreMenu[this.objectsMoreMenu.findIndex(function (el) { return el.menuId == 2 })].menuName = "Warehouse Furniture";
                this.unassignedTxt = "Warehoused";
                break;
            case 17://electrical
                this.objectsMoreMenu.push({ menuId: 3, menuName: "Connect Components" }, { menuId: 4, menuName: "Remove Connections" }, { menuId: 6, menuName: "Show Connections" });
                break;
            case 18://fire and safety
                this.objectsMoreMenu.push({ menuId: 3, menuName: "Connect Components" }, { menuId: 4, menuName: "Remove Connections" }, { menuId: 6, menuName: "Show Connections" });
                break;
            case 24://security assets
                this.objectsMoreMenu.push({ menuId: 3, menuName: "Connect Components" }, { menuId: 4, menuName: "Remove Connections" }, { menuId: 6, menuName: "Show Connections" });
                break;
            case 25://mechanical
                break;
            case 26://plumbing
                this.objectsMoreMenu.push({ menuId: 3, menuName: "Connect Components" }, { menuId: 4, menuName: "Remove Connections" }, { menuId: 6, menuName: "Show Connections" });
                break;
            case 27://medical gas
                break;
        }
    }
    getSpaceMoreMenu() {
        switch (this.moduleId) {
            case 3:
            case 12: if (this.pageTarget != 10) {
                this.spaceMoreMenu.push({ menuId: 4, menuName: "Edit Space" }, { menuId: 5, menuName: "Assign Space Standard" }, { menuId: 0, menuName: "Move Legend" }, { menuId: 11, menuName: "Select Multiple Spaces by Window" }, { menuId: 12, menuName: "Totalize" }, { menuId: 1, menuName: "Measure Distance - Point to Point" }, { menuId: 2, menuName: "Measure Distance - Wall to Wall" }, { menuId: 3, menuName: "Measure Area" }, { menuId: 6, menuName: "Move  Text" }, { menuId: 619, menuName: "Testing..." });
            } else {
                this.spaceMoreMenu.push({ menuId: 0, menuName: "Move Legend" });
            }
                break;
            case 5: if (this.pageTarget != 5 && this.pageTarget != 6)// 5 scenario drawing, 6 move emp to another floor
                this.spaceMoreMenu.push({ menuId: 4, menuName: "Edit Space" }, { menuId: 5, menuName: "Assign Space Standard" }, { menuId: 0, menuName: "Move Legend" }, { menuId: 11, menuName: "Select Multiple Spaces by Window" }, { menuId: 12, menuName: "Totalize" }, { menuId: 1, menuName: "Measure Distance - Point to Point" }, { menuId: 2, menuName: "Measure Distance - Wall to Wall" }, { menuId: 3, menuName: "Measure Area" }, { menuId: 6, menuName: "Move  Text" }, { menuId: 8, menuName: "Search for Space" });
                break;
            case 14:
                this.spaceMoreMenu.push({ menuId: 4, menuName: "Edit Space" }, { menuId: 5, menuName: "Assign Space Standard" }, { menuId: 0, menuName: "Move Legend" }, { menuId: 11, menuName: "Select Multiple Spaces by Window" }, { menuId: 12, menuName: "Totalize" }, { menuId: 6, menuName: "Move Text" });
                break;
            case 6://telecom
            case 7://assets
            case 8: // furniture
            case 17://electrical
            case 18://fire and safety
            case 24://security assets
            case 25://mechanical
            case 26://plumbing
            case 27://medical gas
                if (this.drawingCategoryId != 1 && !this.isXrefExists)
                    this.spaceMoreMenu.push({ menuId: 0, menuName: "Move Legend" }, { menuId: 1, menuName: "Measure Distance - Point to Point" }, { menuId: 3, menuName: "Measure Area" }); //sss
                else
                    this.spaceMoreMenu.push({ menuId: 4, menuName: "Edit Space" }, { menuId: 0, menuName: "Move Legend" }, { menuId: 11, menuName: "Select Multiple Spaces by Window" }, { menuId: 12, menuName: "Totalize" }, { menuId: 1, menuName: "Measure Distance - Point to Point" }, { menuId: 2, menuName: "Measure Distance - Wall to Wall" }, { menuId: 3, menuName: "Measure Area" }, { menuId: 23, menuName: "Search for Space" } ); 
                break;
        }

    }
    exportBtnMouseOver() {
        this.visibilityOfExportMenu = "visible";
    }
    exportBtnMouseOut() {
        this.visibilityOfExportMenu = "hidden";
    }
    saveAsBtnMouseOver() {
        this.visibilityOfSaveAsMenu = "visible";
    }
    saveAsBtnMouseOut() {
        this.visibilityOfSaveAsMenu = "hidden";
    }
    exportOnClick(event: any) {
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        this.visibilityOfExportMenu = "hidden";
        switch (event.menuId) {
            case 0: contextObj.objiWhiz.exportToBMP(function (returnCode) { });
                break;
            case 1: contextObj.objiWhiz.exportToDWF(1, function (returnCode) { });
                break;
            case 2: contextObj.objiWhiz.exportToDXB(1, function (returnCode) { });
                break;
            case 3:

                contextObj.objiWhiz.exportToDXF(1, function (returnCode) { });
                break;
            case 4: contextObj.objiWhiz.exportToJPEG(function (returnCode) { });
                break;
            case 5: contextObj.objiWhiz.exportToPDF(false, "", function (returnCode) { });
                break;
            case 6: contextObj.objiWhiz.exportToSVG(function (returnCode) { });
                break;
            case 14: contextObj.objiWhiz.exportToDXF(1, function (returnCode) { });
                break;
        }
    }
    saveAsOnClick(event: any) {
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        this.visibilityOfSaveAsMenu = "hidden";
        contextObj.objiWhiz.saveAs(true, event.menuId.toString(), function (returnCode) { });
    }
    getSelectedTab(event: any) {
        if (event[0] == 0 && event[1] == false || (event[0] == 0 && event[1] == true))
            this.displaySettingAssettarget = 1;
        if (event[0] == 1 && event[1] == true)
            this.displaySettingAssettarget = 2;
        if (event[0] == 2 && event[1] == true)
            this.displaySettingAssettarget = 3;
    }

    // display Settings on click
    displaySettingsOnClick() {
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        switch (contextObj.moduleId) {
            case 3:

                contextObj.showSecondaryViewEmployeeTarget = -1;
                contextObj.showSecondaryViewSpaceTarget = 0;
                break;

            case 5:
                contextObj.showSecondaryViewSpaceTarget = -1;
                contextObj.showSecondaryViewEmployeeTarget = 0;
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
                contextObj.showSecondaryViewSpaceTarget = -1;
                contextObj.showSecondaryViewObjectTarget = 0;
                contextObj.showSecondaryViewEmployeeTarget = -1;
                //contextObj.objectCategoryId = 1;
                contextObj.additionalDataFieldCategoryId = 19;
                if (contextObj.displaySettingDdlFieldValue == null || contextObj.displaySettingDdlFieldValue == undefined) {
                    contextObj.objectsService.getdropdownFields().subscribe(function (result) {
                        contextObj.ddlObjectClassDisplaySettings = result["Data"][0];
                        var objectType = "";
                        // contextObj.ddlObjectClassDisplaySettings.FieldLabel =
                        objectType = (contextObj.moduleId == 18 || contextObj.moduleId == 26 || contextObj.moduleId == 25 || contextObj.moduleId == 17 || contextObj.moduleId == 27) ? "Type" : "Class";
                        contextObj.ddlObjectClassDisplaySettings.FieldLabel = contextObj.objectname + " " + objectType;
                        contextObj.tabTitleClassAttribute = objectType + " " + "Attribute";
                        contextObj.objectsService.getObjectClassDisplaySettings(contextObj.objectCategoryId, contextObj.drawingId.toString(), 2, 1, 0).subscribe(function (resultData) {
                            contextObj.ddlObjectClassDisplaySettings.LookupDetails.LookupValues = JSON.parse(resultData["Data"].FieldBinderData);
                        });
                    });
                }
                break;
            case 12:/*CAI*/
                contextObj.showSecondaryViewEmployeeTarget = -1;
                contextObj.showSecondaryViewSpaceTarget = 0;
                if (contextObj.pageTarget == 10) {
                    contextObj.additionalDataFieldCategoryId = contextObj.archiveId;
                    contextObj.dispSettingCategoryId = contextObj.drawingId;
                    contextObj.isArchive = true;
                } else {
                    contextObj.additionalDataFieldCategoryId = 7;
                    contextObj.dispSettingCategoryId = 2;
                }
                break;

            case 14://Scheduling
                contextObj.showSecondaryViewSpaceScheduleTarget = 1;
                break;

        }
        this.pageTitle = "Display Settings";
        contextObj.splitviewDrawing.showSecondaryView = !contextObj.splitviewDrawing.showSecondaryView;
    }

    onChnageObjectClassDisplaySettings(event: any) {
        if (Number(event) != -1) {

            this.selectedObjectClassDisplaySettingsId = Number(event);
            // this.displaySettingsClick(); 
        }
        else if (Number(event) == -1) {
            this.selectedObjectClassDisplaySettingsId = 0;
        }
        this.displaySettingDdlFieldValue = event;
    }

    // space display settings
    getUpdatedSpaceDisplaySettings() {
        var contextObj = this;
        contextObj.objiWhiz.setDisplay(false);
        contextObj.objiWhiz.setCursor(0);
        if (contextObj.moduleId == 12 && contextObj.pageTarget == 10) {//Archive Disp Settings Update
            contextObj.archiveDrawingObj.deleteLayerAlredyExists("$ArchiveSpaceData", function (retCode) {
                contextObj.archiveDrawingObj.archiveDisplaySettingData = null;
                contextObj.archiveDrawingObj.getArchiveDisplaySettings(function (retCode) { });
                contextObj.archiveDrawingObj.showDataInDrawing(function (retCode) {
                    contextObj.objiWhiz.setDisplay(true);
                    contextObj.objiWhiz.regenerate();
                    contextObj.objiWhiz.setCursor(1);
                });
            });
        } else {
            contextObj.spaceObj.deleteLayerAlredyExists("$SpaceData", function (retCode) {
                contextObj.spaceObj.displaySettingData = null;
                contextObj.spaceObj.getDisplaySettingsData(function (retCode) { });
                contextObj.spaceObj.showDataInDrawing(function (retCode) {
                    contextObj.objiWhiz.setDisplay(true);
                    contextObj.objiWhiz.regenerate();
                    contextObj.objiWhiz.setCursor(1);
                });
            });
        }
    }
    //space display settings on change
    onSpaceDisplaySettingsChange() {
        var contextObj = this;
        contextObj.objiWhiz.setDisplay(false);
        contextObj.objiWhiz.setCursor(0);
        contextObj.employeeDrawingObj.showDataInDrawing("spaceDispChange", function (retCode) {
            contextObj.objiWhiz.setDisplay(true);
            contextObj.objiWhiz.regenerate();
            contextObj.objiWhiz.setCursor(1);
        });
        // contextObj.splitviewDrawing.showSecondaryView = false;
    }

    //employee display settings on change
    onEmpDisplaySettingsChange() {
        var contextObj = this;
        contextObj.objiWhiz.setDisplay(false);
        contextObj.objiWhiz.setCursor(0);
        contextObj.employeeDrawingObj.showDataInDrawing("empDispChange", function (retCode) {
            contextObj.objiWhiz.setDisplay(true);
            contextObj.objiWhiz.regenerate();
            contextObj.objiWhiz.setCursor(1);
        });
        // contextObj.splitviewDrawing.showSecondaryView = false;
    }
    //**************Assets Drawing*******************************
    //Assets display settings on change
    onAssetsDisplaySettingsChange() {
        var contextObj = this;
        contextObj.objiWhiz.setDisplay(false);
        contextObj.objiWhiz.setCursor(0);
        contextObj.objectsDrawingObj.showDataInDrawing("objectsDispChange", contextObj.isXrefExists, function (retCode) {
            // contextObj.objectsDrawingObj.showDataInDrawing("bothData", function (retCode) {            
            contextObj.objiWhiz.setDisplay(true);
            contextObj.objiWhiz.regenerate();
            contextObj.objiWhiz.setCursor(1);
        });
    }

    //space display settings in assets on change
    onSpaceDisplaySettingsinAssetsChange() {
        var contextObj = this;
        contextObj.objiWhiz.setDisplay(false);
        contextObj.objiWhiz.setCursor(0);
        contextObj.objectsDrawingObj.showDataInDrawing("spaceDispChange", contextObj.isXrefExists, function (retCode) {
            contextObj.objiWhiz.setDisplay(true);
            contextObj.objiWhiz.regenerate();
            contextObj.objiWhiz.setCursor(1);
        });
    }


    //space display settings in schedule on change
    onSpaceDisplaySettingsinScheduleChange() {
        var contextObj = this;
        contextObj.objiWhiz.setDisplay(false);
        contextObj.objiWhiz.setCursor(0);
        contextObj.schedulingDrawingObj.showDataInDrawing("spaceDispChange", function (retCode) {
            contextObj.objiWhiz.setDisplay(true);
            contextObj.objiWhiz.regenerate();
            contextObj.objiWhiz.setCursor(1);
        });
    }
    //**************************************************************


    // context menu on click 
    contextMenuOnClick(event) {
        if (event) {
            var contextObj = this;
            contextObj.isTooltipEnable = true;
            contextObj.contextMenuVisibility = false;
            var evnt = document.createEvent("CustomEvent");
            evnt.initCustomEvent('ContextMenuEvent', true, true,
                { 'xPos': 0, 'yPos': 0 });
            document.dispatchEvent(evnt); // to hide context menu

            //console.log("context menu", event);
            switch (event.menuId) {
                case 0: contextObj.objiWhiz.pan();
                    break;
                case 1: contextObj.objiWhiz.zoomIn();
                    break;
                case 2: contextObj.objiWhiz.zoomOut();
                    break;
                case 3: contextObj.objiWhiz.zoomWindow();
                    break;
                case 4: contextObj.objiWhiz.zoomExtents(function (ret) { });
                    break;
                //case 5: contextObj.objiWhiz.zoomWindow();
                //    break;
                case 6: contextObj.addLayers(function (retCode) {
                    contextObj.showLayer = true;
                });
                    break;
                case 7: contextObj.plotSettingsOnclick();
                    break;
                case 10:
                    contextObj.editSpaceData(1);
                    break;
                case 11: contextObj.selectMultipleSpaceByWindowOnClick();
                    break;
                case 12:
                    contextObj.editSpaceData(2);
                    break;
                case 20: contextObj.editEmployeeData();
                    break;
                case 21: contextObj.deAssignDeleteEmployeeOnClick(2, false);
                    break;
                case 22: contextObj.deAssignDeleteEmployeeOnClick(2, true);
                    break;
                case 50: contextObj.deHatchOnClick();
                    break;
                case 51: contextObj.stopBlinkOnClick();
                    break;
                case 23: contextObj.editAssetData();
                    break;
                case 24: contextObj.moveObjectOnClick(2);
                    break;
                case 60: contextObj.moveEmployeeFromContextmenu();
                    break;
                case 25:
                case 26:
                case 27:
                    contextObj.attachmentOnClick(event.menuId);
                    break;
                case 28: contextObj.RotateObject(2);
                    break;
                case 29: contextObj.DelinkObjectOnClick(2);
                    break;
                case 40: contextObj.copyObject();
                    break;
                case 42: contextObj.SnapObject_OnClick(2, 1);//align with another object - Corner to Corner
                    break;
                case 43: contextObj.SnapObject_OnClick(2, 2);//align with another object - Corner to Edge
                    break;
                case 44: contextObj.SnapObject_OnClick(2, 3);//align with another object - Edge to Edge
                    break;
                case 46: contextObj.SnapObject_OnClick(1, 1);//align with Wall - Corner to Corner
                    break;
                case 47: contextObj.SnapObject_OnClick(1, 2);//align with Wall- Corner to Wall
                    break;
                case 48: contextObj.SnapObject_OnClick(1, 3);//align with Wall - Edge to Wall
                    break;
                case 30: //Set Hoteling seat
                    this.singleassignHotelingClick();
                    break;
                case 31: contextObj.addHotelingSeatOnClick();
                    //Add seats
                    break;

                case 32: this.reserveRoomOnClickFromRightClick();
                    break;
                case 33: this.reserveSeatOnClickFromRightClick();
                    break;
                case 34: //Set Hoteling seat(multiple)                  
                    this.assignMultipleHotelingClick();
                    break;
                case 61: this.createServiceRequestOnClick();
                    break;
                case 62: this.equipmentWorkHistoryOnClick();
                    break;
                case 62: this.reviewServiceRequestOnClick();
                    break;
            }
        }
    }
    reviewServiceRequestOnClick() {
        this.showSecondaryViewObjectTarget = 7;
        this.splitviewDrawing.showSecondaryView = true;
    }
    equipmentWorkHistoryOnClick() {
        this.showSecondaryViewObjectTarget = 6;
        this.splitviewDrawing.showSecondaryView = true;
    }
    createServiceRequestOnClick() {
        this.showSecondaryViewObjectTarget = 5;
        this.splitviewDrawing.showSecondaryView = true;
    }
    deHatchOnClick() {
        var contextObj = this;
        var isExist = [0];
        contextObj.contextMenuVisibility = false;
        this.isSpaceTotalizeLegend = false;
        var evnt = document.createEvent("CustomEvent");
        evnt.initCustomEvent('ContextMenuEvent', true, true,
            { 'xPos': 0, 'yPos': 0 });
        document.dispatchEvent(evnt); // to hide context menu
        this.objiWhiz.layerExists("$LEGEND", isExist);//To remove the legend
        if (isExist[0]) {
            this.objiWhiz.deleteLayer("$LEGEND", function (retCode) {
            });
        };
        contextObj.deHatchVarablesClear();
        if (this.moduleId == 12 && this.pageTarget == 10) {
            this.archiveDrawingObj.deHatch(function (retCode) {
                contextObj.highlightRowIds = [];
                contextObj.selectedHandles = [];
            });
        } else {
            this.spaceObj.deHatch(function (retCode) {
                contextObj.highlightRowIds = [];
                contextObj.selectedHandles = [];
                if (contextObj.moduleId == 6 || contextObj.moduleId == 7 || contextObj.moduleId == 8 ||
                    contextObj.moduleId == 17 || contextObj.moduleId == 18 || contextObj.moduleId == 24 ||
                    contextObj.moduleId == 25 || contextObj.moduleId == 26 || contextObj.moduleId == 27) {
                    contextObj.spaceObj.deleteLayerAlredyExists(contextObj.objectsDrawingObj.hatchObjectLayer, function (returnCode) {

                    });
                }
            });
        }
    }
    deHatchVarablesClear() {
        this.isHatch = false;
        this.isBlink = false;
        this.isShowClicked = false;
    }
    stopBlinkOnClick() {
        this.isBlink = false;
        this.objiWhiz.removeBlinkers();
    }
    editEmployeeData() {
        this.pageTitle = "Edit Employee Data";
        this.showSecondaryViewSpaceTarget = -1;
        this.showSecondaryViewEmployeeTarget = 2;
        this.splitviewDrawing.showSecondaryView = true;
    }
    editAssetData() {
        var contextObj = this;
        contextObj.showSecondaryViewEmployeeTarget = -1;
        contextObj.showSecondaryViewSpaceTarget = -1;
        this.objectsDrawingObj.selectedObjectsDetails(contextObj.editObjectSelectedId,function (retCode, objectId, objectClassId, handle, isSymbolHandle, spaceId) {
            contextObj.editObjectSpaceId = spaceId;
            if (isSymbolHandle == false)
                contextObj.selectedBlockRefHandle = handle;
            if (retCode == 0) {
                contextObj.objectsDrawingObj.hatchSingleObject(handle, function (res) {
                    if (objectId != undefined && objectId != null && objectId != "") {
                        //edit object
                        contextObj.editObjectSelectedId = objectId;
                        contextObj.editObjectClassId = objectClassId;
                        contextObj.objectsDrawingObj.EditInDrawing(contextObj.editObjectSpaceId, contextObj.editObjectSelectedId, contextObj.editObjectClassId.toString(), contextObj.drawingId.toString(), isSymbolHandle, function (fieldDetailsAdd) {
                            if (fieldDetailsAdd) {
                                contextObj.objectFieldDetailsAddEdit = fieldDetailsAdd;
                                contextObj.objectAddOrEdit = 'edit'
                                contextObj.pageTitle = "Edit " + contextObj.objectname + " Data";
                                contextObj.showSecondaryViewObjectTarget = 2;
                                contextObj.splitviewDrawing.showSecondaryView = true;
                            }
                        });
                    } 
                });
            }
        });
    }
    attachmentCount(event: any) {

        var context = this;
        var attachcount = event["attachcount"];
        var selectedId = event["selectedId"];
        context.objectsDrawingObj.objectsData.find(function (item) {
            if (item["ObjectId"] == selectedId) {
                item["Attachments"] = attachcount;
                var index = context.objectsDrawingObj.objectsData.findIndex(function (el) { return el.ObjectId === selectedId });
                context.objectsDrawingObj.objectsEditReflectInDrawing(context.objectsDrawingObj.objectsData[index], function (retCode) {
                    // context.objectsDrawingObj.UpdateAttachmentCountInDrawing(selectedId, function (ret) {
                    return true;
                });
            }
            else
                return false;
        });





        //  var selId = context.editObjectSelectedId;
        //  if (selId != undefined) {
        //      context.objectsDrawingObj.objectsData.find(function (item) {
        //          if (item["ObjectId"] == selId) {
        //              var attachmentCount = item["Attachments"] == "None" ? 0 : Number(item["Attachments"]);
        //              switch (event["status"]) {
        //                  case "success":
        //                      item["Attachments"] = (attachmentCount+ 1).toString();
        //                      break;
        //                  case "delete":
        //                      item["Attachments"] = (attachmentCount- 1).toString();
        //                      break;
        //              }
        //              return true;
        //          } else
        //              return false;
        //      });

        //}
    }
    attachmentOnClick(menuId) {//25.space 26.employee,27.object
        this.pageTitle = "Attachments";
        this.showSecondaryViewSpaceTarget = 7;
        if (menuId == 27) {
            this.baseEntityIdForattachment = this.editObjectSelectedId;
            this.attachmentCategoryId = 7;
        } else if (menuId == 25) {
            this.baseEntityIdForattachment = this.spaceIdForEdit;
            this.attachmentCategoryId = 5;
        } else if (menuId == 26) {
            this.baseEntityIdForattachment = this.assignedEmployeeSelectedId;
            this.attachmentCategoryId = 9;
        }
        this.splitviewDrawing.showSecondaryView = true;
    }
    attachmentSuccess(event) {
      
        var spaceId = event.baseEntityId;
        switch (this.attachmentCategoryId) {
           
            case 5: this.spaceObj.updateAttachmentCount(event.baseEntityId, event.status);
                var spacedata = new Array();
                spacedata.push( this.spaceObj.spaceData.find(function (el) { return el.SpaceId == spaceId }));
                this.updatedSpaceData = [];
                if (this.moduleId == 3 || this.moduleId == 12) {

                    this.updatedSpaceData.push({ "event": { "returnData": JSON.stringify(spacedata) }, "isEdit": true, "fromAttchment": true });
                }
                break;
            case 7: this.objectsDrawingObj.updateAttachmentCount(event.baseEntityId);
                break;
            case 9: this.employeeDrawingObj.updateAttachmentCount(event.baseEntityId);
                break;
        }
    }
    copyObject() {
        this.objectXPosition = "";
        this.objectYPosition = "";
        this.objectAngle = "";
        this.editObjectSpaceId = 0;
        this.showObjectDrawingslide = true;
        this.objectmessage = { key: 3, message: "Selected " + this.objectname + " has been copied. Do you want to paste it?" };
    }
    copyObjectAfterConfirm() {
        var contextObj = this;
        this.objectsDrawingObj.copyObject(this.editObjectSelectedId, function (fieldDetailsAdd, dXCoord, dYCoord, spaceId, Angle) {
            if (fieldDetailsAdd) {
                // contextObj.selectedBlockRefHandle = handle;
                contextObj.objectXPosition = dXCoord;
                contextObj.objectYPosition = dYCoord;
                contextObj.objectAngle = Angle;
                contextObj.editObjectSpaceId = spaceId;
                contextObj.objectFieldDetailsAddEdit = fieldDetailsAdd;
                contextObj.objectAddOrEdit = 'add'
                contextObj.pageTitle = "Add " + contextObj.objectname + " Data";
                contextObj.showSecondaryViewObjectTarget = 2;
                contextObj.splitviewDrawing.showSecondaryView = true;
            }

        });
    }
    assetAttachments() {
        var editabledivisions = new Array();
        this.pageTitle = "Attachments";
        var contextObj = this;
        //  contextObj.tempObjectClassId = contextObj.inputItems.rowData["ObjectClassId"];contextObj.editObjectClassId.toString(),
        //  if (contextObj.userrole  == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
        // contextObj.objectsService.getUserEditableOrgUnits(contextObj.drawingId).subscribe(function (result) {
        //  editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
        //if (editabledivisions.indexOf(contextObj.inputItems.rowData["OrgUnitID"].toString()) < 0)
        //    contextObj.Isallattachmentmenuneeded = false;
        //else
        contextObj.Isallattachmentmenuneeded = true;
        //var classid = contextObj.editObjectClassId.toString();
        //var baseEntityId = contextObj.editObjectSelectedId.toString();
        contextObj.showSecondaryViewEmployeeTarget = -1;
        contextObj.showSecondaryViewSpaceTarget = -1;
        contextObj.showSecondaryViewObjectTarget = 3;
        contextObj.splitviewDrawing.showSecondaryView = true;


    }
    defaultContextMenuItems() {
        if (this.moduleId != 1 && !(this.moduleId == 3 && this.pageTarget == 2) && !(this.moduleId == 12 && this.pageTarget == 10) && (this.drawingCategoryId != 1 && this.isXrefExists))
            this.contextMenuData.push({ menuId: 11, menuName: "Select Multiple Spaces by Window" })
        this.contextMenuData.push({ menuId: 0, menuName: "Pan" }, { menuId: 1, menuName: "Zoom In" }, { menuId: 2, menuName: "Zoom Out" }, { menuId: 3, menuName: "Zoom Window" },
            { menuId: 4, menuName: "Zoom Extents" }, /*{ menuId: 5, menuName: "Zoom Previous" },*/ { menuId: 6, menuName: "Layers" });
        if (this.isPlotInDrawing)
            this.contextMenuData.push({ menuId: 7, menuName: "Plot" });
    }
    // Drawing layer dialog
    addLayers = function (resCallback) {
        var contextObj = this;
        var layerMultiFieldValues: string[] = [];
        contextObj.objiWhiz.getAllLayers(function (returnCode, layers) {
            var allLayersArray = [];
            allLayersArray = layers.split(contextObj.rowDelimiter);
            allLayersArray.pop();
            var layerLookUpArray: ILookupValues[] = [];
            contextObj.layerNameLength = allLayersArray.length;
            for (var index = 0; contextObj.layerNameLength > index; index++) {
                var isVisible = [0];
                var layerName = allLayersArray[index];
                var returnCode = contextObj.objiWhiz.getLayerVisibility(layerName, isVisible)
                if (returnCode != 0) {
                    // console.log("getLayerVisibility faild due to", returnCode);
                }
                layerLookUpArray.push({ Id: index, Value: layerName });
                if (isVisible[0]) {
                    layerMultiFieldValues.push(index.toString());
                }
            }
            if (contextObj.defaultLayersLength == 0)
                contextObj.defaultLayersLength = layerMultiFieldValues.length;
            contextObj.layerList[0] =
                {
                    FormFieldId: null, FieldId: null,
                    ReportFieldId: 1, FieldLabel: null,
                    DataEntryControlId: 7,
                    GenericDataTypeId: 6,
                    Whitelist: { Id: 3, FormatString: null, RegularExpression: "^ [a - zA - Z0 - 9!@#$ %&()/+=\s\:.,?_ -]+$" },
                    FieldValue: null, MultiFieldValues: layerMultiFieldValues, IsValidated: true, IsMultivalued: true, LookupDetails: { LookupValues: layerLookUpArray, PopupComponent: null },
                    IsMandatory: false, IsVisible: true, IsEnabled: true, ReadOnlyMode: false, NotificationType: null, Precision: null,
                    Scale: null, Height: null, IsSigned: false, RangeFrom: null, RangeTo: null, HelpText: null,
                    IsGrouped: false, HasChild: null, ParentId: null, IsSubField: null, isContentHtml: null, Width: "295"
                };
            contextObj.getDefaultChkBoxChecked(layerMultiFieldValues);
            resCallback(0);
        });
    }
    selectAllDefaultLayers(event, fieldObj) {
        var contextObj = this;
        var index;
        if (event.target.checked == true) {
            this.layerList[0].MultiFieldValues.splice(0, this.layerList[0].MultiFieldValues.length);
            this.IsSelectAllLayerChecked = false;
            this.defaultChkbxIsChecked = true;
            if (this.layerList[0].LookupDetails.LookupValues != null) {
                //if (this.isSpace) {
                //    for (var i = 0; i < 4; i++) {
                //        var iDrawingsLayes = [];
                //        contextObj.objiWhiz.getAlliDrawingsLayers(iDrawingsLayes);
                //        if (iDrawingsLayes.find(function (el) { return el === contextObj.layerList[0].LookupDetails.LookupValues[i].Value }))
                //            this.layerList[0].MultiFieldValues.push(i.toString());
                //    }
                //} else {
                //    for (var i = 0; i < 2; i++) {
                //        var isExist = [0];
                //        contextObj.objiWhiz.layerExists(this.layerList[0].LookupDetails.LookupValues[i].Value, isExist);
                //        if (isExist[0])
                //            this.layerList[0].MultiFieldValues.push(i.toString());
                //    }
                //}
                for (var i = 0; i < this.defaultLayers.length; i++) {
                    index = contextObj.layerList[0].LookupDetails.LookupValues.findIndex(function (el) { return el.Value == contextObj.defaultLayers[i]['Layer Name'] })
                    if (index != -1)
                        this.layerList[0].MultiFieldValues.push(index.toString());
                }
            }

        } else {
            this.defaultChkbxIsChecked = false;
            for (var i = 0; i < this.defaultLayers.length; i++) {
                index = contextObj.layerList[0].LookupDetails.LookupValues.findIndex(function (el) { return el.Value == contextObj.defaultLayers[i]['Layer Name'] })
                index = this.layerList[0].MultiFieldValues.findIndex(function (el) { return el == contextObj.layerList[0].LookupDetails.LookupValues[index].Id.toString() });
                if (index != -1)
                    this.layerList[0].MultiFieldValues.splice(index, 1)
            }
        }

        if (this.layerNameLength == this.layerList[0].MultiFieldValues.length)
            this.IsSelectAllLayerChecked = true;
        //else
        //    this.IsSelectAllLayerChecked = false;
    }
    layersSelectAllOnClick(event) {
        //if (event.chkevent)
        //    this.defaultChkbxIsChecked = true;
        //else
        this.defaultChkbxIsChecked = false;
    }
    singleLayerNameOnClick(event: any) {
        var isDefaultLayer: boolean;
        var layerArr = [];
        this.getDefaultChkBoxChecked(event.fieldObject.MultiFieldValues);
    }
    getDefaultChkBoxChecked(array: any) {
        var isDefaultLayer: boolean;
        // var defaultLayerLength = this.defaultLayers.length;
        //var nNumLayers = 4;
        //if (this.isSpace)
        //    nNumLayers = 4;
        //else
        //    nNumLayers = 2;

        if (array.length != this.defaultLayersLength) {
            this.defaultChkbxIsChecked = false;
            return;
        }
        var layerName;
        var index;
        for (var i = 0; i < array.length; i++) {
            layerName = this.layerList[0].LookupDetails.LookupValues.find(function (el) { return el.Id == array[i] }).Value;
            isDefaultLayer = this.defaultLayers.some(function (el) { return el['Layer Name'] == layerName });
            if (isDefaultLayer != true) {
                this.defaultChkbxIsChecked = false;
                break;
            }
            if (isDefaultLayer)
                this.defaultChkbxIsChecked = true;
        }
    }

    // Drawing layer dialog Ok click
    OkLayersVisbility() {
        let layerName;
        let isLayerEnable: boolean;
        var contextObj = this;
        var allLayersArray = [];
        //console.log("ok", this.layerList)
        var layerStatus: string = "";

        for (let item of contextObj.layerList[0].LookupDetails.LookupValues) {
            isLayerEnable = contextObj.layerList[0].MultiFieldValues.some(function (el) { return +el === item.Id });
            if (isLayerEnable) {
                layerStatus += item.Value + contextObj.columnDelimiter + "true" + contextObj.rowDelimiter;
                if (contextObj.moduleId == 3) {// for layer mapping
                    var updatingField = contextObj.spaceObj.checkLayerVisibilityAndMapping(item.Value)
                    if (updatingField != "")
                        allLayersArray.push(item.Value + contextObj.rowDelimiter + updatingField);
                }
            }
            else
                layerStatus += item.Value + contextObj.columnDelimiter + "false" + contextObj.rowDelimiter;

        }
        contextObj.objiWhiz.setCursor(0);
        contextObj.objiWhiz.setLayersVisibility(layerStatus, function () {
            contextObj.showLayer = false;
            contextObj.objiWhiz.display(function () {
                contextObj.objiWhiz.setCursor(1);
            });
        });
        //Set Layer Mapping Text to Space Data
        if (contextObj.moduleId == 3) {
            contextObj.spaceObj.setLayerMappingFunctions(allLayersArray, 0, function (retCode) {
                if (retCode == 1) {
                    //updated layer mapping data 
                }
            })
        }
    }
    // Drawing layer dialog Cancel click
    CancelLayersVisbility() {
        this.showLayer = false;
    }
    // Drawing layer dialog close click
    closeShowLayer() {
        this.showLayer = false;
    }
    onContextMenu(event: any, item: any) {
        event.preventDefault();
    }
    onResize(event: any) {
        //this.changeEvent =!this.changeEvent;
        console.log("resizeresizeresize");
        var status = [];
        if (this.objiWhiz != undefined) {
            this.objiWhiz.isWaitMode(status);
            if (status[0])
                this.objiWhiz.exitWaitMode();
            var contextObj = this;
            setTimeout(function () {
                var width, height;
                var canvas = contextObj.canvasElement;
                width = canvas.offsetWidth;
                if (contextObj.moduleId == 14) {
                    if (width < 671 && width > 590)
                        contextObj.detailsWidth = "200";
                    if (width < 590 && width > 510)
                        contextObj.detailsWidth = "150";
                    if (width < 510 && width > 450)
                        contextObj.detailsWidth = "100";
                    if (width < 450 && width > 350)
                        contextObj.detailsWidth = "20";
                    if (width < 350 && width > 250)
                        contextObj.detailsWidth = "5";
                    if (width < 250)
                        contextObj.detailsWidth = "0";
                } else {
                    contextObj.detailsWidth = "400";
                    if (width < 671 && width > 590)
                        contextObj.detailsWidth = "310";
                    if (width < 590 && width > 510)
                        contextObj.detailsWidth = "300";
                    if (width < 510 && width > 450)
                        contextObj.detailsWidth = "200";
                    if (width < 450 && width > 350)
                        contextObj.detailsWidth = "150";
                    if (width < 350 && width > 250)
                        contextObj.detailsWidth = "50";
                    if (width < 250)
                        contextObj.detailsWidth = "0";
                }
                height = canvas.offsetHeight;//window.innerHeight - 56;
                var topOffset = window.innerHeight - height;
                contextObj.objiWhiz.resize(width, height);

            }, 50);
        }
    }
    afterDrawingOpen(event) {
        var contextObj = this;
        contextObj.isXrefExists = event['IsXrefExists'];
        contextObj.defaultLayers = event['DefaultLayers'];
        if (contextObj.moduleId == 1 || contextObj.moduleId == 2) {
            contextObj.markupObj = new DrawingMarkups(contextObj.objiWhiz, contextObj.userId);
            if (contextObj.drawingDetails)
                contextObj.uploadedDate = contextObj.drawingDetails['Uploaded on'];
            contextObj.visibilityOfMenu = "visible";
            if (contextObj.pageTarget == 3) {
                contextObj.objiWhiz.setDisplay(false);
                contextObj.objiWhiz.setCursor(0);
                if (contextObj.moduleId == 1)
                    contextObj.markupViewFromList(contextObj.markupEvent);
                else
                    contextObj.viewProjectDrawingMarkup(contextObj.markupEvent)
                contextObj.objiWhiz.setDisplay(true);
                contextObj.objiWhiz.regenerate();
                contextObj.objiWhiz.setCursor(1);
            }
            contextObj.visibilityOfDistributionImage = "visible";

        } else if (contextObj.moduleId == 3 && contextObj.pageTarget == 2) {
            contextObj.displayDrawing(function (retcode) {
                contextObj.visibilityOfMenu = "visible";
                contextObj.visibilityOfDistributionImage = "visible";
            });
        } else if (contextObj.moduleId == 12 && contextObj.pageTarget == 10) {
            if (!contextObj.archiveDrawingObj || !contextObj.archiveDrawingObj.commonServices) {
                setTimeout(function () {
                    contextObj.afterDrawingOpen(event);

                }, 50);
            } else {
                contextObj.isPlotInDrawing = contextObj.archiveDrawingObj.commonServices.IsPlotInDrawing;
                contextObj.archiveDrawingObj.commonServices.getFontStyles(function (retCode) {
                    contextObj.archiveDrawingObj.commonServices.getExtentPoints(function (retCode) {
                        contextObj.archiveDrawingObj.showDataInDrawing(function (retCode) {
                            if (retCode == 0) {
                                contextObj.displayDrawing(function (retcode) {
                                    contextObj.visibilityOfMenu = "visible";
                                    contextObj.visibilityOfDistributionImage = "visible";
                                    contextObj.distibutionMapArchiveDrawings({ FieldId: -4, FieldNameWithId: "-4^CAI Space Driver", FieldName: "CAI Space Driver" });
                                });
                            }
                        });
                    });
                });
            }
        } else {
            if (!contextObj.spaceObj || !contextObj.spaceObj.commonServices) {
                setTimeout(function () {
                    contextObj.afterDrawingOpen(event);

                }, 50);
            } else {
                contextObj.isPlotInDrawing = contextObj.spaceObj.commonServices.IsPlotInDrawing;
                contextObj.spaceObj.commonServices.getFontStyles(function (retCode) {
                    contextObj.spaceObj.commonServices.getExtentPoints(function (retCode) {
                        switch (contextObj.moduleId) {
                            case 3:
                            case 12: //contextObj.outDrawingobject.emit({ "dwgObject": contextObj.objiWhiz, "markupObj": this.markupObj });
                                contextObj.spaceObj.defaultLayers = contextObj.defaultLayers;

                                if (contextObj.spaceObj.commonServices.isMoveTextEnabled == false) {
                                    contextObj.spaceMoreMenu.splice(contextObj.spaceMoreMenu.findIndex(function (el) { return el.menuId == 6 }), 1);
                                }
                                switch (contextObj.pageTarget) {
                                    case 1: contextObj.spaceObj.showDataInDrawing(function (retCode) {
                                        if (retCode == 0) {
                                            if (contextObj.spaceObj.commonServices.sessionUserRoleId <= 3 && contextObj.spaceObj.commonServices.isMoveTextEnabled) {
                                                contextObj.spaceMoreMenu.push({ menuId: 9, menuName: "Move Floor Gross Text" })
                                                if (contextObj.spaceObj.commonServices.isSpace)
                                                    contextObj.spaceMoreMenu.push({ menuId: 10, menuName: "Move External Wall Text" });
                                            }
                                            contextObj.displayDrawing(function (retcode) {
                                                contextObj.visibilityOfMenu = "visible";
                                                contextObj.visibilityOfDistributionImage = "visible";
                                            });
                                        }
                                    });
                                        break;
                                    case 3: contextObj.isHatch = true;
                                        contextObj.selectedHandles = [];

                                        contextObj.spaceObj.showDataInDrawing(function (retCode) {
                                            contextObj.spaceObj.showSelectedSpaceInDrawing(contextObj.extDrawingDetails, function (retcode, selectedHandles) {
                                                contextObj.displayDrawing(function (retcode) {
                                                    contextObj.showMaxMinIcon = false;
                                                    contextObj.selectedHandles = selectedHandles;
                                                    if (contextObj.selectedHandles.length > 0)
                                                        contextObj.highlightRowInGrid();
                                                    contextObj.visibilityOfMenu = "visible";
                                                    contextObj.visibilityOfDistributionImage = "visible";
                                                });
                                            });

                                        });
                                        break;
                                    case 4: contextObj.isHatch = true;
                                        contextObj.selectedHandles = [];
                                        contextObj.spaceObj.showDataInDrawing(function (retCode) {
                                            contextObj.displayDrawing(function (retcode) {
                                                contextObj.objiWhiz.setDisplay(false);
                                                contextObj.spaceObj.showSelectedSpaceZoomDrawing(contextObj.extDrawingDetails, function (retcode, selectedHandles) {
                                                    contextObj.showMaxMinIcon = false;
                                                    contextObj.selectedHandles = selectedHandles;
                                                    if (contextObj.selectedHandles.length > 0)
                                                        contextObj.highlightRowInGrid();
                                                    contextObj.visibilityOfMenu = "visible";
                                                    contextObj.visibilityOfDistributionImage = "visible";
                                                    contextObj.objiWhiz.setDisplay(true);
                                                });
                                            });

                                        });
                                        break;
                                }
                                break;
                            case 5:
                                if (contextObj.pageTarget != 5 && contextObj.pageTarget != 6) {
                                    contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
                                        contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                                        contextObj.isResoureFeatureEnabled = contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.isResoureFeatureEnabled;
                                        contextObj.ApprovalForEmpAssignInDrawing = contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.isApprovalForEmpAssignInDrawingEnabled;
                                        contextObj.ApprovalForEmpMoveInDrawing = contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.isApprovalForEmpMoveInDrawingEnabled;
                                        contextObj.employeeDrawingObj.showDataInDrawing("bothData", function (retCode) {
                                            if (contextObj.employeeDrawingObj.commonDwgServices.sessionUserRoleId > 3 && contextObj.employeeDrawingObj.commonDwgServices.sessionUserRoleId != 6) {
                                                contextObj.empMoreMenu.splice(contextObj.empMoreMenu.findIndex(function (el) { return el.menuId == 5 }), 1);
                                                contextObj.empMoreMenu.splice(contextObj.empMoreMenu.findIndex(function (el) { return el.menuId == 6 }), 1);
                                                contextObj.empMoreMenu.splice(contextObj.empMoreMenu.findIndex(function (el) { return el.menuId == 7 }), 1);
                                                contextObj.empMoreMenu.splice(contextObj.empMoreMenu.findIndex(function (el) { return el.menuId == 8 }), 1);
                                                contextObj.empMoreMenu.splice(contextObj.empMoreMenu.findIndex(function (el) { return el.menuId == 10 }), 1);
                                            }
                                            if (contextObj.employeeDrawingObj.commonDwgServices.isModuleAdmin && contextObj.employeeDrawingObj.commonDwgServices.sessionUserRoleId != 4) {
                                                contextObj.employeeDrawingObj.isRelinkemployeeExist(function (relinkData, count) {
                                                    if (relinkData.length > 0) {
                                                        contextObj.relinkempdata = relinkData;
                                                        contextObj.relinkempcount = count;
                                                        var index = contextObj.empMoreMenu.findIndex(function (item) { return item.menuId === 9 })
                                                        if (index == -1) {
                                                            contextObj.empMoreMenu.push({ menuId: 9, menuName: "Re-Link Employee" })
                                                        }
                                                    }
                                                })
                                            }
                                            switch (contextObj.pageTarget) {
                                                case 1:// form emp mail drawing list
                                                    contextObj.displayDrawing(function (retcode) {
                                                        contextObj.visibilityOfMenu = "visible";
                                                        contextObj.visibilityOfDistributionImage = "visible";
                                                    });
                                                    break;
                                                case 2:

                                                    // from unassigned emp data list - assign employee
                                                    contextObj.displayDrawing(function (retcode) {
                                                        contextObj.visibilityOfMenu = "visible";
                                                        contextObj.visibilityOfDistributionImage = "visible";
                                                        contextObj.assignFromGrid = true;
                                                        contextObj.assignEmployee(contextObj.drawingDetails);

                                                    });
                                                    break;
                                                case 3:// form emp data list-show in drawing
                                                    contextObj.isHatch = true;
                                                    contextObj.selectedHandles = [];
                                                    contextObj.displayDrawing(function (retcode) {
                                                        contextObj.employeeDrawingObj.showSelectedEmployeeInDrawing(contextObj.extDrawingDetails, function (retcode, selectedHandles) {
                                                            if (retcode == 1)
                                                                contextObj.notificationService.ShowToaster("Employee (s) are not properly located", 2);
                                                            contextObj.selectedHandles = selectedHandles;
                                                            contextObj.showMaxMinIcon = false;
                                                            contextObj.visibilityOfMenu = "visible";
                                                            contextObj.visibilityOfDistributionImage = "visible";
                                                        });
                                                    });
                                                    break;
                                                case 4: // form emp data list-show zoomed
                                                    contextObj.isHatch = true;
                                                    contextObj.selectedHandles = [];
                                                    contextObj.displayDrawing(function (retcode) {
                                                        contextObj.objiWhiz.setDisplay(false);
                                                        contextObj.employeeDrawingObj.showSelectedEmployeeZoomDrawing(contextObj.extDrawingDetails, function (retcode, selectedHandles) {
                                                            contextObj.showMaxMinIcon = false
                                                            contextObj.selectedHandles = selectedHandles;
                                                            contextObj.visibilityOfMenu = "visible";
                                                            contextObj.visibilityOfDistributionImage = "visible";
                                                            contextObj.objiWhiz.setDisplay(true);
                                                        });
                                                    });
                                                    break;
                                            }
                                        });
                                    });
                                } else { /*scenario drawing*/
                                    if (contextObj.pageTarget == 5) {
                                        contextObj.scenarioOpenDrawingObj.spaceOpenDrawingObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
                                            contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                                            contextObj.scenarioOpenDrawingObj.showDataInDrawing("bothData", function (retCode) {
                                                contextObj.displayDrawing(function (retcode) {
                                                    contextObj.visibilityOfMenu = "visible";
                                                    contextObj.visibilityOfDistributionImage = "visible";
                                                    contextObj.employeeDrawingObj = contextObj.scenarioOpenDrawingObj.empOpenDrwgObj;
                                                });
                                            });
                                        });
                                    } else if (contextObj.pageTarget == 6) {
                                        contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
                                            contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                                            contextObj.isResoureFeatureEnabled = contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.isResoureFeatureEnabled;
                                            contextObj.ApprovalForEmpAssignInDrawing = contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.isApprovalForEmpAssignInDrawingEnabled;
                                            contextObj.ApprovalForEmpMoveInDrawing = contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.isApprovalForEmpMoveInDrawingEnabled;
                                            contextObj.employeeDrawingObj.showDataInDrawing("bothData", function (retCode) {
                                                contextObj.displayDrawing(function (retcode) {
                                                    contextObj.visibilityOfMenu = "visible";
                                                    contextObj.visibilityOfDistributionImage = "visible";
                                                    contextObj.selectedMultipleMoveEmpDetails = contextObj.moveEmpDetailsForAnotherFloor;
                                                    var empDetails = contextObj.selectedMultipleMoveEmpDetails.slice();
                                                    // contextObj.assignMultipleEmpsOneByOne(empDetails);
                                                    contextObj.moveMultipleEmpsOneByOne(empDetails);
                                                });
                                            });
                                        });
                                    }
                                }
                                break;
                            //---------------------------------------------

                            case 6://telecom
                            case 7://assets
                            case 8://furniture
                            case 17://electrical
                            case 18://fire and safety
                            case 24://security assets
                            case 25://mechanical
                            case 26://plumbing
                            case 27://medical gas\
                                debugger
                                contextObj.SiteId = contextObj.objectsDrawingObj.siteId.toString();;
                                contextObj.getSpaceMoreMenu();
                                if (contextObj.drawingCategoryId == 1 || (contextObj.drawingCategoryId != 1 && contextObj.isXrefExists)) {
                                    var drawingId;
                                    if (contextObj.isXrefExists)
                                        drawingId = contextObj.xrefedDrawingId;
                                    else
                                        drawingId = contextObj.drawingId;
                                    contextObj.drawingDetailsService.getSpaceDistributionMenuData(contextObj.drawingId, contextObj.moduleId).subscribe(function (resultData) {
                                        contextObj.spaceDistMenuData = JSON.parse(resultData["Data"].FieldBinderData);
                                    });
                                } else {
                                    contextObj.objectsMoreMenu.splice(contextObj.objectsMoreMenu.findIndex(function (el) { return el.menuId == 1 }), 1);
                                }
                                contextObj.userrole = contextObj.spaceObj.commonServices.sessionUserRoleId;
                                //  if (contextObj.objectsDrawingObj.commonDwgServices.isModuleAdmin && contextObj.objectsDrawingObj.commonDwgServices.sessionUserRoleId != 4) {
                                contextObj.objectsDrawingObj.getOrphanRecords(function (hasPrivilage, orphandata, count) {
                                    debugger
                                    if (hasPrivilage) {
                                        if (count > 0) {
                                            contextObj.orphanObjectData = orphandata;
                                            contextObj.orphanObjectcount = count;
                                            var index = contextObj.objectsMoreMenu.findIndex(function (item) { return item.menuId === 7 })
                                            if (index == -1) {
                                                contextObj.objectsMoreMenu.push({ menuId: 7, menuName: "Orphan " + contextObj.objectname })
                                            }
                                        }
                                    }
                                })
                                // }
                                switch (contextObj.pageTarget) {
                                    //From Asset drawinglist ->opendrawing
                                    case 1:
                                        debugger
                                        contextObj.objectsDrawingObj.showDataInDrawing("bothData", contextObj.isXrefExists, function (retCode) {
                                            //if (retCode == 1)
                                            //    contextObj.notificationService.ShowToaster("No assets are assigned to this floor", 5);
                                            debugger
                                            contextObj.displayDrawing(function (retcode) {
                                                contextObj.visibilityOfMenu = "visible";
                                                //if (contextObj.drawingCategoryId == 1) {
                                                contextObj.visibilityOfDistributionImage = "visible";
                                                //}
                                                //else {
                                                //    contextObj.visibilityOfDistributionImage = "hidden";
                                                //}
                                            });
                                        });
                                        break;

                                    //From Assetslist-> Asset drawinglist ->opendrawing
                                    case 2:
                                        //var status = [];
                                        //this.objiWhiz.isWaitMode(status);
                                        //if (status[0])
                                        //    return;


                                        contextObj.objectsDrawingObj.commonDwgServices.getDrawingDetails(function (dwgDetailsData) {
                                            contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                                            contextObj.objectsDrawingObj.showDataInDrawing("bothData", contextObj.isXrefExists, function (retCode) {
                                                //if (retCode == 1)
                                                //    contextObj.notificationService.ShowToaster("No assets are assigned to this floor", 5);
                                                contextObj.displayDrawing(function (retcode) {
                                                    contextObj.visibilityOfMenu = "visible";
                                                    //if (contextObj.drawingCategoryId == 1) {
                                                    contextObj.visibilityOfDistributionImage = "visible";
                                                    //}
                                                    //else {
                                                    //    contextObj.visibilityOfDistributionImage = "hidden";
                                                    //}

                                                    contextObj.selectedRowDetails = contextObj.selectedRow["rowData"];
                                                    contextObj.assignAsset(contextObj.selectedRow, dwgDetailsData);
                                                    //var strClassname = contextObj.selectedRowDetails["Asset Class Name"];
                                                    //var strAssetNo = contextObj.selectedRowDetails["Asset No."];
                                                    //var isreturncode: boolean = false;
                                                    //contextObj.notificationService.ShowToaster("Select the point where the " + strClassname + " (" + strAssetNo + ") is to be placed", 2, null, 3000);
                                                    //contextObj.objectsDrawingObj.placeSymbolInDrawing(contextObj.selectedRowDetails, dwgDetailsData.SiteId, contextObj.spaceIdForEdit, function (retCode) {
                                                    //    if (retCode) {
                                                    //        isreturncode = true;
                                                    //        contextObj.IsObjectPlaced = true;
                                                    //    }
                                                    //    else {
                                                    //        isreturncode = false;
                                                    //    }
                                                    //    contextObj.afterassetplace.emit({ "Selecteddetails": contextObj.selectedRowDetails })
                                                    //});
                                                });
                                            });
                                        });

                                        break;
                                    case 3:
                                        contextObj.objectsDrawingObj.showDataInDrawing("bothData", contextObj.isXrefExists, function (retCode) {
                                            //if (retCode == 1)
                                            //    contextObj.notificationService.ShowToaster("No assets are assigned to this floor", 3);
                                            contextObj.displayDrawing(function (retcode) {
                                                contextObj.visibilityOfMenu = "visible";
                                                //if (contextObj.drawingCategoryId == 1) {
                                                contextObj.visibilityOfDistributionImage = "visible";
                                                //}
                                                //else {
                                                //    contextObj.visibilityOfDistributionImage = "hidden";
                                                //}
                                                contextObj.isHatch = true;
                                                contextObj.objectsDrawingObj.showSelectedObjectInDrawing(contextObj.selectedRow["selectedIds"], function (retcode, selectedHandles) {
                                                    contextObj.selectedHandles = selectedHandles;
                                                    contextObj.objiWhiz.setDisplay(true);
                                                });
                                            });
                                        });
                                        break;
                                    //CASE 4 is for new show connection for drawing open 
                                    case 4:
                                        contextObj.AssociationId = contextObj.SecondAssociationId;
                                        contextObj.primaryObjectId = contextObj.SecondPrimaryObjectId;
                                        contextObj.fieldDetails = contextObj.SecondfieldDetails;
                                        contextObj.objectsDrawingObj.showDataInDrawing("bothData", contextObj.isXrefExists, function (retCode) {
                                            //if (retCode == 1)
                                            //    contextObj.notificationService.ShowToaster("No assets are assigned to this floor", 5);
                                            contextObj.displayDrawing(function (retcode) {
                                                var loading_indicator = document.getElementById('loading-indicator_2');
                                                loading_indicator.style.display = "none";
                                                contextObj.visibilityOfMenu = "visible";
                                                contextObj.visibilityOfDistributionImage = "visible";
                                                // need to imlp new fun

                                                // contextObj.ConnectWithInCurrentDrawing();
                                                var SecondBlinkDetails = contextObj.BlinkSecondDrawings;
                                                if (index != -1) {
                                                    SecondBlinkDetails.find(function (el) {
                                                        if (el.ReportFieldId == 669) {
                                                            return el.Value = contextObj.drawingId;
                                                        }
                                                    });
                                                }
                                                contextObj.objectsService.GetObjectAssociationToHatch(JSON.stringify(contextObj.BlinkSecondDrawings)).subscribe(function (result) {

                                                    contextObj.fieldDetailsAdd1 = result.FieldBinderData == "[]" ? [] : result.FieldBinderData;
                                                    var objectarry = JSON.parse(result.FieldBinderData);
                                                    if (objectarry.length > 0) {

                                                        var objIdsarray: any = [];
                                                        for (var i = 0; i < objectarry.length; i++) {
                                                            objIdsarray.push(objectarry[i].ObjectId);
                                                        }
                                                        contextObj.ConnectedArrayOfConnectivity = objIdsarray;
                                                        contextObj.objectarryLength = objectarry.length;

                                                        contextObj.objectsDrawingObj.GetObjectAssociationToHatch(objIdsarray, function (ret) {                                                                               /*blinkDone*/
                                                            if (ret == 0) {
                                                                contextObj.splitviewDrawing.showSecondaryView = false;
                                                                contextObj.ShowConnectComponent = true;
                                                            }

                                                        });
                                                    } else {
                                                        contextObj.notificationService.ShowToaster("No components exist for setting connection", 2);
                                                        contextObj.splitviewDrawing.showSecondaryView = false;
                                                    }
                                                });
                                            });
                                        });
                                        break;


                                }
                                break;
                            case 14:
                                contextObj.isSeatBookingEnabled = contextObj.schedulingDrawingObj.commonDwgServices.isSeatBookingEnabled;
                                contextObj.isRoomBookingEnabled = contextObj.schedulingDrawingObj.commonDwgServices.isRoomBookingEnabled;
                                contextObj.sessionUserRoleId = contextObj.schedulingDrawingObj.commonDwgServices.sessionUserRoleId;
                                var index;
                                if (contextObj.schedulingDrawingObj.commonDwgServices.sessionUserRoleId == 4) {
                                    index = contextObj.spaceMoreMenu.findIndex(function (el) { return el.menuId == 4 });
                                    contextObj.spaceMoreMenu.splice(index, 1);
                                    index = contextObj.spaceMoreMenu.findIndex(function (el) { return el.menuId == 5 });
                                    contextObj.spaceMoreMenu.splice(index, 1);
                                    index = contextObj.spaceMoreMenu.findIndex(function (el) { return el.menuId == 22 });
                                    contextObj.spaceMoreMenu.splice(index, 1);
                                    contextObj.distributionMenuRight = "120";
                                    contextObj.spaceMoreMenuRight = "75";
                                }
                                if (contextObj.schedulingDrawingObj.commonDwgServices.isMoveTextEnabled == false) {
                                    index = contextObj.spaceMoreMenu.findIndex(function (el) { return el.menuId == 6 });
                                    contextObj.spaceMoreMenu.splice(index, 1);
                                }
                                //if (contextObj.isSeatBookingEnabled == false) {
                                //    index = contextObj.spaceMoreMenu.findIndex(function (el) { return el.menuId == 21 });
                                //    contextObj.spaceMoreMenu.splice(index, 1);
                                //    index = contextObj.spaceMoreMenu.findIndex(function (el) { return el.menuId == 22 });
                                //    if (index != -1)
                                //        contextObj.spaceMoreMenu.splice(index, 1);
                                //}
                                //if (contextObj.isRoomBookingEnabled== false) {
                                //    index = contextObj.spaceMoreMenu.findIndex(function (el) { return el.menuId == 20 });
                                //    contextObj.spaceMoreMenu.splice(index, 1);
                                //}
                                switch (contextObj.pageTarget) {
                                    case 1: contextObj.schedulingDrawingObj.showDataInDrawing("bothData", function (retCode) {
                                        //contextObj.spaceObj.showSelectedSpaceInDrawing(contextObj.extDrawingDetails, function (retcode) {
                                        contextObj.displayDrawing(function (retcode) {
                                            contextObj.visibilityOfMenu = "visible";
                                            contextObj.visibilityOfDistributionImage = "visible";
                                        });
                                        //});

                                    });
                                        break;
                                    case 3: contextObj.isHatch = true;
                                        contextObj.selectedHandles = [];
                                        contextObj.schedulingDrawingObj.showDataInDrawing("bothData", function (retCode) {

                                            contextObj.spaceObj.showSelectedSpaceInDrawing(contextObj.extDrawingDetails, function (retcode, selectedHandles) {
                                                contextObj.displayDrawing(function (retcode) {
                                                    contextObj.showMaxMinIcon = false;
                                                    contextObj.visibilityOfMenu = "visible";
                                                    contextObj.visibilityOfDistributionImage = "visible";
                                                });
                                            });

                                        });
                                        break;
                                    case 4: contextObj.isHatch = true;
                                        contextObj.selectedHandles = [];
                                        contextObj.schedulingDrawingObj.showDataInDrawing("bothData", function (retCode) {
                                            contextObj.displayDrawing(function (retcode) {
                                                contextObj.objiWhiz.setDisplay(false);
                                                contextObj.spaceObj.showSelectedSpaceZoomDrawing(contextObj.extDrawingDetails, function (retcode, selectedHandles) {
                                                    contextObj.showMaxMinIcon = false;
                                                    contextObj.visibilityOfMenu = "visible";
                                                    contextObj.visibilityOfDistributionImage = "visible";
                                                    contextObj.objiWhiz.setDisplay(true);
                                                });
                                            });

                                        });
                                        break;

                                }
                                break;

                            //switch (contextObj.pageTarget) {
                            //    case 1:
                            //        contextObj.schedulingDrawingObj.showDataInDrawing("spaceDispChange", function (retCode) {
                            //            if (retCode == 1)
                            //                contextObj.notificationService.ShowToaster("No details available", 3);
                            //            contextObj.displayDrawing(function (retcode) {
                            //                contextObj.visibilityOfMenu = "visible";
                            //                if (contextObj.drawingCategoryId == 1) {
                            //                    contextObj.visibilityOfDistributionImage = "visible";
                            //                }
                            //                else {
                            //                    contextObj.visibilityOfDistributionImage = "hidden";
                            //                }
                            //            });
                            //        });

                            //        break;
                            //}
                            //break;




                            //contextObj.isHatch = true;
                            //contextObj.spaceObj.showDataInDrawing(function (retCode) {
                            //    contextObj.spaceObj.showSelectedSpaceInDrawing(contextObj.extDrawingDetails, function (retcode) {
                            //        contextObj.displayDrawing(function (retcode) {
                            //            contextObj.visibilityOfMenu = "visible";
                            //            contextObj.visibilityOfDistributionImage = "visible";
                            //        });
                            //    });

                            //});
                            //break;

                        }
                    });
                });
            }
        }
        contextObj.outDrawingobject.emit({ "dwgObject": contextObj.objiWhiz, "markupObj": this.markupObj });
        var retCode = contextObj.objiWhiz.clientDWGAreaRatio(contextObj.ratioValue);
        if (retCode == 0) {
            //contextObj.lineThickness = contextObj.lineThickness * this.ratioValue[0];
            contextObj.lineSizeDisable = false;
        }
        else
            console.log("clientDWGAreaRatio failed due to", retCode);
    }
    getObject(event: any) { // getting drawing object after drawing open
        var contextObj = this;
        var handler: any;
        console.log("layerList2", contextObj.layerList);
        contextObj.objiWhiz = event["objiWhiz"];
        contextObj.canvasElement = <HTMLElement>event["canvas"];
        contextObj.layerNames = event['layers'];
        switch (this.moduleId) {
            case 3:
            case 12: if (contextObj.pageTarget != 2 && contextObj.pageTarget != 10) { // 2 unlock, 10 CAI archive Drawings
                contextObj.spaceObj = new SpaceOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.http, contextObj.isBuildingDrawing);
                contextObj.spaceObj.initilizeObjects(function (retCode) {
                    contextObj.isSpace = contextObj.spaceObj.commonServices.isSpace;
                    contextObj.spaceObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
                        contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName
                    });
                });
            } else if (contextObj.pageTarget == 10) {//10 CAI archive Drawings
                contextObj.archiveDrawingObj = new ArchiveOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.http, contextObj.archiveId);
                contextObj.archiveDrawingObj.initilizeObjects(function (retCode) {
                    contextObj.isSpace = contextObj.archiveDrawingObj.commonServices.isSpace;
                    contextObj.archiveDrawingObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
                        contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName
                    });
                });
            }
                break;
            case 5: if (this.pageTarget != 5) {
                contextObj.employeeDrawingObj = new EmployeeOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.http, contextObj.notificationService);
                contextObj.employeeDrawingObj.initilizeObjects(function (retCode) {
                    contextObj.spaceObj = contextObj.employeeDrawingObj.spaceOpenDrawingObj;
                    contextObj.isSpace = contextObj.employeeDrawingObj.spaceOpenDrawingObj.commonServices.isSpace;
                    contextObj.employeeDrawingObj.isAdminPrivilage(function (isMenuVisible) {
                        contextObj.isModuleAdmin = isMenuVisible;
                        if (isMenuVisible == false) {
                            contextObj.distributionMenuRight = "185";
                            contextObj.spaceMoreMenuRight = "140";
                        }

                    });

                });
            } else {
                contextObj.scenarioOpenDrawingObj = new ScenarioOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.extDrawingDetails, contextObj.http, contextObj.notificationService);
                contextObj.scenarioOpenDrawingObj.initilizeObjects(function (retCode) {
                    contextObj.spaceObj = contextObj.scenarioOpenDrawingObj.spaceOpenDrawingObj;
                    contextObj.isSpace = contextObj.scenarioOpenDrawingObj.spaceOpenDrawingObj.commonServices.isSpace;
                });

            }
                break;

            //---------------------------------------------
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
                    //From Asset drawinglist ->opendrawing
                    case 1:
                        contextObj.objectsDrawingObj = new ObjectssOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http, contextObj.xrefedDrawingId, contextObj.isBuildingDrawing);
                        contextObj.objectsDrawingObj.initilizeObjects(function (retCode) {
                            contextObj.spaceObj = contextObj.objectsDrawingObj.spaceOpenDrawingObj;
                            contextObj.isSpace = contextObj.objectsDrawingObj.commonDwgServices.isSpace;
                            //////debugger;
                            if (contextObj.isBuildingDrawing) {
                                contextObj.dwgDetails = contextObj.drawingDetails.Site + " / " + contextObj.drawingDetails.Building;
                            }
                            else {
                                contextObj.objectsDrawingObj.commonDwgServices.getDrawingDetails(function (dwgDetailsData) {
                                    contextObj.dwgDetailsData = dwgDetailsData;
                                    contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                                });
                            }
                        });
                        break;

                    //From Assetslist-> Asset drawinglist ->opendrawing
                    case 2:
                        // ////debugger;
                        contextObj.objectsDrawingObj = new ObjectssOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http, contextObj.xrefedDrawingId, contextObj.isBuildingDrawing);
                        contextObj.objectsDrawingObj.initilizeObjects(function (retCode) {
                            contextObj.spaceObj = contextObj.objectsDrawingObj.spaceOpenDrawingObj;
                            contextObj.isSpace = contextObj.objectsDrawingObj.commonDwgServices.isSpace;
                        });
                        break;
                    case 3:
                        // ////debugger;
                        contextObj.objectsDrawingObj = new ObjectssOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http, contextObj.xrefedDrawingId, contextObj.isBuildingDrawing);
                        contextObj.objectsDrawingObj.initilizeObjects(function (retCode) {
                            contextObj.spaceObj = contextObj.objectsDrawingObj.spaceOpenDrawingObj;
                            contextObj.isSpace = contextObj.objectsDrawingObj.commonDwgServices.isSpace;
                            //////debugger;
                            contextObj.objectsDrawingObj.commonDwgServices.getDrawingDetails(function (dwgDetailsData) {
                                // ////debugger;
                                contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                            });
                        });
                        break;
                    case 4:
                        // ////debugger;
                        contextObj.objectsDrawingObj = new ObjectssOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http, contextObj.xrefedDrawingId, contextObj.isBuildingDrawing);
                        contextObj.objectsDrawingObj.initilizeObjects(function (retCode) {
                            contextObj.spaceObj = contextObj.objectsDrawingObj.spaceOpenDrawingObj;
                            contextObj.isSpace = contextObj.objectsDrawingObj.commonDwgServices.isSpace;
                            //////debugger;
                            contextObj.objectsDrawingObj.commonDwgServices.getDrawingDetails(function (dwgDetailsData) {
                                // ////debugger;
                                contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                            });
                        });
                        break;

                }
                break;

            //case 8: //Furniture
            //    ////debugger;
            //    switch (contextObj.pageTarget) {
            //        case 1: //From Furniture drawinglist ->opendrawing
            //            contextObj.objectsDrawingObj = new ObjectssOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http);
            //            contextObj.objectsDrawingObj.initilizeObjects(function (retCode) {
            //                contextObj.spaceObj = contextObj.objectsDrawingObj.spaceOpenDrawingObj;
            //                contextObj.isSpace = contextObj.objectsDrawingObj.spaceOpenDrawingObj.commonServices.isSpace;
            //                contextObj.objectsDrawingObj.spaceOpenDrawingObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
            //                    contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
            //                    //contextObj.objectsDrawingObj.showDataInDrawing("bothData", function (retCode) {
            //                    //    if (retCode == 1)
            //                    //        contextObj.notificationService.ShowToaster("No assets are assigned to this floor", 3);
            //                    //    contextObj.displayDrawing(function (retcode) {
            //                    //        contextObj.visibilityOfMenu = "visible";
            //                    //        if (contextObj.drawingCategoryId == 1) {
            //                    //            contextObj.visibilityOfDistributionImage = "visible";
            //                    //        }
            //                    //        else {
            //                    //            contextObj.visibilityOfDistributionImage = "hidden";
            //                    //        }
            //                    //    });
            //                    //});
            //                });
            //            });
            //            break;

            //        case 2: //From Furniturelist-> Furniture drawinglist ->opendrawing
            //            contextObj.objectsDrawingObj = new ObjectssOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http);
            //            contextObj.objectsDrawingObj.initilizeObjects(function (retCode) {
            //                contextObj.spaceObj = contextObj.objectsDrawingObj.spaceOpenDrawingObj;
            //                contextObj.isSpace = contextObj.objectsDrawingObj.spaceOpenDrawingObj.commonServices.isSpace;
            //                //contextObj.objectsDrawingObj.showDataInDrawing("bothData", function (retCode) {
            //                //    if (retCode == 1)
            //                //        contextObj.notificationService.ShowToaster("No assets are assigned to this floor", 3);
            //                //    contextObj.displayDrawing(function (retcode) {
            //                //        contextObj.visibilityOfMenu = "visible";
            //                //        if (contextObj.drawingCategoryId == 1) {
            //                //            contextObj.visibilityOfDistributionImage = "visible";
            //                //        }
            //                //        else {
            //                //            contextObj.visibilityOfDistributionImage = "hidden";
            //                //        }
            //                //        //we can call the code here to place symbol &&&
            //                //        contextObj.selectedRowDetails = contextObj.selectedRow["rowData"];
            //                //        var isreturncode: boolean = false;
            //                //        //while (isreturncode == true) {
            //                //        contextObj.objectsDrawingObj.placeSymbolInDrawing(contextObj.selectedRowDetails, dwgDetailsData.SiteId, contextObj.spaceIdForEdit, function (retCode) {
            //                //            if (retCode) {
            //                //                isreturncode = true;
            //                //            }
            //                //            else {
            //                //                isreturncode = false;
            //                //            }
            //                //            contextObj.afterassetplace.emit({ "Selecteddetails": contextObj.selectedRowDetails})
            //                //        });
            //                //        // }
            //                //        //---------------------------------------------------   
            //                //    });
            //                //});
            //            });
            //            break;
            //        case 3:
            //            contextObj.objectsDrawingObj = new ObjectssOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http);
            //            contextObj.objectsDrawingObj.initilizeObjects(function (retCode) {
            //                contextObj.spaceObj = contextObj.objectsDrawingObj.spaceOpenDrawingObj;
            //                contextObj.isSpace = contextObj.objectsDrawingObj.spaceOpenDrawingObj.commonServices.isSpace;
            //                contextObj.objectsDrawingObj.spaceOpenDrawingObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
            //                    contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
            //                    //contextObj.objectsDrawingObj.showDataInDrawing("bothData", function (retCode) {
            //                    //    if (retCode == 1)
            //                    //        contextObj.notificationService.ShowToaster("No assets are assigned to this floor", 3);
            //                    //    contextObj.displayDrawing(function (retcode) {
            //                    //        contextObj.visibilityOfMenu = "visible";
            //                    //        if (contextObj.drawingCategoryId == 1) {
            //                    //            contextObj.visibilityOfDistributionImage = "visible";
            //                    //        }
            //                    //        else {
            //                    //            contextObj.visibilityOfDistributionImage = "hidden";
            //                    //        }
            //                    //    });
            //                    //    contextObj.objectsDrawingObj.showSelectedAssetInDrawing(contextObj.selectedRow["selectedIds"], contextObj.selectedRow["rowData"].BomaHandle, function (retcode) {
            //                    //    });
            //                    //});
            //                });
            //            });
            //            break;
            //    }
            //    break;

            //case 14: contextObj.spaceObj = new SpaceOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.http,new SpaceOpenDrawing);
            //    contextObj.spaceObj.initilizeObjects(function (retCode) {
            //        contextObj.isSpace = contextObj.spaceObj.commonServices.isSpace;
            //        contextObj.spaceObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
            //            contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName

            //        });
            //    });
            case 14:

                contextObj.schedulingDrawingObj = new SchedulingOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http);
                contextObj.schedulingDrawingObj.initilizeObjects(function (retCode) {
                    contextObj.spaceObj = contextObj.schedulingDrawingObj.spaceOpenDrawingObj;
                    contextObj.isSpace = contextObj.schedulingDrawingObj.spaceOpenDrawingObj.commonServices.isSpace;
                    //////debugger;
                    contextObj.schedulingDrawingObj.spaceOpenDrawingObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
                        // ////debugger;
                        contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                    });
                });
                break;



            //**********************************************************************************************************************
        }
        contextObj.objiWhiz.addEvent("touchMove", function (outputs) {
            contextObj.tooltipVisibility = false;
            contextObj.contextMenuVisibility = false;
            var evnt = document.createEvent("CustomEvent");
            evnt.initCustomEvent('ContextMenuEvent', true, true,
                { 'xPos': 0, 'yPos': 0 });
            document.dispatchEvent(evnt); // to hide context menu
        });
        contextObj.objiWhiz.addEvent("touchDown", function (outputs) {
            contextObj.tooltipVisibility = false;
            contextObj.contextMenuVisibility = false;
            contextObj.isTooltipEnable = true;
            var evnt = document.createEvent("CustomEvent");
            evnt.initCustomEvent('ContextMenuEvent', true, true,
                { 'xPos': 0, 'yPos': 0 });
            document.dispatchEvent(evnt); // to hide context menu
        });
        contextObj.objiWhiz.addEvent("tooltipHandler", handler = function (outputs) {
            var selectedHandle = outputs[0];
            contextObj.tooltipVisibility = false;
            console.log("contextObj.tooltipData", outputs);
            switch (contextObj.moduleId) {
                case 3:
                case 12:
                    if (contextObj.pageTarget == 2 && !contextObj.spaceObj) {
                        contextObj.spaceObj = contextObj.spaceObjInUnlock;
                    }
                    if (contextObj.pageTarget != 10 && contextObj.spaceObj) {
                        contextObj.spaceObj.getTooltipData(selectedHandle, contextObj.pageTarget, function (retCode, tooltiDataValues) {
                            if (retCode) {
                                var event = document.createEvent("CustomEvent");
                                event.initCustomEvent('TooltipEvent', true, true,
                                    { 'xPos': outputs[1], 'yPos': outputs[2], 'tooltipValue': tooltiDataValues });
                                document.dispatchEvent(event);
                                contextObj.tooltipVisibility = true;
                            }
                            else
                                contextObj.tooltipVisibility = false;
                        });
                    } else if (contextObj.pageTarget == 10) {
                        contextObj.archiveDrawingObj.getTooltipData(selectedHandle, contextObj.pageTarget, function (retCode, tooltiDataValues) {
                            if (retCode) {
                                var event = document.createEvent("CustomEvent");
                                event.initCustomEvent('TooltipEvent', true, true,
                                    { 'xPos': outputs[1], 'yPos': outputs[2], 'tooltipValue': tooltiDataValues });
                                document.dispatchEvent(event);
                                contextObj.tooltipVisibility = true;
                            }
                            else
                                contextObj.tooltipVisibility = false;
                        });
                    }
                    break;
                case 5:
                    contextObj.employeeDrawingObj.getTooltipData(selectedHandle, function (retCode, tooltiDataValues) {
                        if (retCode) {
                            console.log("contextObj.tooltipData", tooltiDataValues);
                            //contextObj.tooltipXPosition = outputs[1];
                            //contextObj.tooltipYPosition = outputs[2];
                            //contextObj.tooltipData = tooltiDataValues;
                            //contextObj.tooltipVisibility = true;
                            var event = document.createEvent("CustomEvent");
                            event.initCustomEvent('TooltipEvent', true, true,
                                { 'xPos': outputs[1], 'yPos': outputs[2], 'tooltipValue': tooltiDataValues });
                            document.dispatchEvent(event);
                            contextObj.tooltipVisibility = true;
                        }
                        else
                            contextObj.tooltipVisibility = false;
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

                    contextObj.objectsDrawingObj.getTooltipData(selectedHandle, function (retCode, tooltiDataValues) {
                        if (retCode) {
                            console.log("contextObj.tooltipData", tooltiDataValues);
                            //contextObj.tooltipXPosition = outputs[1];
                            //contextObj.tooltipYPosition = outputs[2];
                            //contextObj.tooltipData = tooltiDataValues;
                            //contextObj.tooltipVisibility = true;
                            var event = document.createEvent("CustomEvent");
                            event.initCustomEvent('TooltipEvent', true, true,
                                { 'xPos': outputs[1], 'yPos': outputs[2], 'tooltipValue': tooltiDataValues });
                            document.dispatchEvent(event);
                            contextObj.tooltipVisibility = true;
                            //contextObj.cdr.detectChanges();
                        }
                        else
                            contextObj.tooltipVisibility = false;
                    });
                    break;
                //Scheduling
                case 14: contextObj.schedulingDrawingObj.getTooltipData(selectedHandle, function (retCode, tooltiDataValues) {
                    if (retCode) {

                        console.log("contextObj.tooltipData", tooltiDataValues);
                        //contextObj.tooltipXPosition = outputs[1];
                        //contextObj.tooltipYPosition = outputs[2];
                        //contextObj.tooltipData = tooltiDataValues;
                        if (retCode) {
                            var event = document.createEvent("CustomEvent");
                            event.initCustomEvent('TooltipEvent', true, true,
                                { 'xPos': outputs[1], 'yPos': outputs[2], 'tooltipValue': tooltiDataValues });
                            document.dispatchEvent(event);
                            contextObj.tooltipVisibility = true;
                        }
                    }
                    else
                        contextObj.tooltipVisibility = false;
                });
                    break;

            }
            console.log("handle :", outputs[0]);

        });
        contextObj.objiWhiz.setTooltipPriority("1203");
        //var retCode = contextObj.objiWhiz.clientDWGAreaRatio(contextObj.ratioValue);
        //if (retCode == 0) {
        //    //contextObj.lineThickness = contextObj.lineThickness * this.ratioValue[0];
        //    contextObj.lineSizeDisable = false;
        //}
        //else
        //    console.log("clientDWGAreaRatio failed due to", retCode);
        //contextObj.outDrawingobject.emit({ "dwgObject": contextObj.objiWhiz, "markupObj": this.markupObj });

        contextObj.objiWhiz.addEvent("mouseDown", function (outputs) {

            console.log("<br />currentX : " + outputs[0] + "<br />currentY : " + outputs[1] + "handle :" + outputs[2]);
            if (outputs[2] == "2") {
                contextObj.isTooltipEnable = false;
                contextObj.contextMenuVisibility = false;
                contextObj.contextMenuXPosition = outputs[0];
                contextObj.contextMenuYPosition = outputs[1];
                // contextObj.contextMenuData = [];
                if (contextObj.isHatch) {
                    contextObj.contextMenuData = [];
                    contextObj.contextMenuData.push({ menuId: 50, menuName: "De-Hatch" });
                    contextObj.defaultContextMenuItems();
                    contextObj.contextMenuVisibility = true;
                    var event = document.createEvent("CustomEvent");
                    event.initCustomEvent('ContextMenuEvent', true, true,
                        { 'xPos': outputs[0], 'yPos': outputs[1] });
                    document.dispatchEvent(event);
                } else if (contextObj.isBlink) {
                    contextObj.contextMenuData = [];
                    contextObj.contextMenuData.push({ menuId: 51, menuName: "Stop Blink" });
                    contextObj.defaultContextMenuItems();
                    contextObj.contextMenuVisibility = true;
                    var event = document.createEvent("CustomEvent");
                    event.initCustomEvent('ContextMenuEvent', true, true,
                        { 'xPos': outputs[0], 'yPos': outputs[1] });
                    document.dispatchEvent(event)
                }
                else {
                    contextObj.objiWhiz.getHandleOnPoint(contextObj.contextMenuXPosition, contextObj.contextMenuYPosition, "1203", function (returnCode, selectedHandle, handleType, id, isActionPoint) {
                        if (selectedHandle != "") {
                            if (handleType == 0) //space/net handle
                            {
                                if (contextObj.spaceObj.spaceData && !(contextObj.moduleId == 3 && (contextObj.pageTarget == 2 || contextObj.pageTarget == 10)) && !(contextObj.moduleId == 5 && contextObj.pageTarget == 5)) {
                                    var space;
                                    if (contextObj.isSpace)
                                        space = contextObj.spaceObj.spaceData.find(function (el) { return el.BomaHandle === selectedHandle });
                                    else
                                        space = contextObj.spaceObj.spaceData.find(function (el) { return el.CarpetHandle === selectedHandle });
                                    if (space != undefined) {
                                        contextObj.spaceIdForEdit = space['SpaceId'];
                                        contextObj.highlightRowIds = [];
                                        contextObj.highlightRowIds = contextObj.highlightRowIds.concat(contextObj.spaceIdForEdit);
                                        contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                                            contextObj.objiWhiz.removeMaps();
                                            contextObj.spaceObj.hatchSingleEntityOnRightClick(selectedHandle, function (returnCode1) {
                                                contextObj.contextMenuData = [];

                                                if (contextObj.moduleId == 14) {
                                                    if (contextObj.isRoomBookingEnabled) {
                                                        var spaceAssignmentType = contextObj.schedulingDrawingObj.getSpaceAssignmentType(contextObj.spaceIdForEdit)
                                                        //contextObj.contextMenuData.push({ menuId: 30, menuName: "Set Hoteling Seat" }, { menuId: 31, menuName: "Add Hoteling Seats" });
                                                        if (spaceAssignmentType == 4)
                                                            contextObj.contextMenuData.push({ menuId: 32, menuName: "Book " + contextObj.roomtext });
                                                    }
                                                    //-----------------for assingning hoteling seat ----------------------------------//
                                                    if (!contextObj.isSchedulingOnlyUser && contextObj.isSeatBookingEnabled) {
                                                        if (contextObj.userRoleId <= 3) {
                                                            if (spaceAssignmentType == null || spaceAssignmentType == "")
                                                                contextObj.contextMenuData.push({
                                                                    menuId: 30, menuName: "Set as Hoteling " + contextObj.seattxt
                                                                });

                                                            contextObj.contextMenuData.push({
                                                                menuId: 34, menuName: "Set Multiple Rooms as Hoteling " + contextObj.seattxt + "s"

                                                            });
                                                        }
                                                    }

                                                }
                                                if (!contextObj.isSchedulingOnlyUser && contextObj.spaceObj.commonServices.sessionUserRoleId!=4) {
                                                    contextObj.contextMenuData.push({ menuId: 10, menuName: "Edit Space" }, { menuId: 25, menuName: "Attachment" });//
                                                    if (contextObj.moduleId != 7 && contextObj.moduleId != 8 && contextObj.moduleId != 12 && contextObj.moduleId != 17 && contextObj.moduleId != 18
                                                        && contextObj.moduleId != 24 && contextObj.moduleId != 25 && contextObj.moduleId != 26 && contextObj.moduleId != 27 && contextObj.moduleId != 29 && contextObj.moduleId != 30 && contextObj.spaceObj.commonServices.enableEmpandSched.length > 0)
                                                        contextObj.contextMenuData.push({ menuId: 12, menuName: "Assign Space Standard" });
                                                }
                                                contextObj.defaultContextMenuItems();
                                                if (contextObj.moduleId == 5) {
                                                    //contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                                                    //});
                                                }
                                                else if (contextObj.moduleId == 6 || contextObj.moduleId == 7 || contextObj.moduleId == 8 ||
                                                    contextObj.moduleId == 17 || contextObj.moduleId == 18 || contextObj.moduleId == 24 ||
                                                    contextObj.moduleId == 25 || contextObj.moduleId == 26 || contextObj.moduleId == 27) {
                                                    contextObj.objectsDrawingObj.deHatchObjects(function (retcode) {
                                                        //  //debugger
                                                        contextObj.objectsDrawingObj.showSelectedObjectInDrawing(contextObj.editObjectSelectedId, function (retcode, selectedHandles) {
                                                            contextObj.selectedHandles = selectedHandles;
                                                            contextObj.objiWhiz.setDisplay(true);
                                                        });

                                                    });
                                                }

                                            });
                                        });
                                    }
                                    else {
                                        contextObj.contextMenuData = [];
                                        contextObj.defaultContextMenuItems();
                                    }
                                }
                                else {
                                    contextObj.contextMenuData = [];
                                    contextObj.defaultContextMenuItems();
                                }
                            }
                            else if (handleType == 1 || handleType == 2) //1 symbol 2 block
                            {
                                if (contextObj.moduleId == 14 && handleType != 2) {
                                    contextObj.contextMenuData = [];
                                    if (contextObj.isSeatBookingEnabled && contextObj.schedulingDrawingObj.checkIsHotelingSeat(selectedHandle)) {
                                        contextObj.schedulingDrawingObj.hatchSeat(selectedHandle, function (retCode) {
                                            contextObj.selectedSeatId = [contextObj.schedulingDrawingObj.getSeatIdFromHandle(selectedHandle)];
                                            contextObj.contextMenuData.push({ menuId: 33, menuName: "Book " + contextObj.seattxt });
                                            contextObj.defaultContextMenuItems();
                                        });
                                    } else {
                                        contextObj.defaultContextMenuItems();
                                    }
                                }
                                if (contextObj.moduleId == 5 && contextObj.pageTarget != 5 && handleType != 2) {//Employee Edit on right click
                                    var empSymbolData = contextObj.employeeDrawingObj.empHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle });
                                    if (empSymbolData != undefined) {
                                        contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                                            contextObj.employeeDrawingObj.hatchEmployee(selectedHandle, function (retCode) {
                                                if (retCode != 0)
                                                    console.log("hatchEmployee failed due to ", retCode);
                                                else {
                                                    contextObj.assignedEmployeeSelectedId = empSymbolData['EmpId'];
                                                    contextObj.employeeData = contextObj.employeeDrawingObj.empData.find(function (el) { return el.Id === contextObj.assignedEmployeeSelectedId });
                                                    contextObj.contextMenuData = [];
                                                    contextObj.contextMenuData.push({ menuId: 20, menuName: "Edit Employee" }, { menuId: 26, menuName: "Attachment" }, { menuId: 60, menuName: "Move Employee" }, { menuId: 21, menuName: "Delete Employee" }, { menuId: 22, menuName: "De-Assign Employee" });
                                                    contextObj.defaultContextMenuItems();
                                                }
                                            });
                                        });
                                    }
                                }
                                if (contextObj.moduleId == 6 || contextObj.moduleId == 7 || contextObj.moduleId == 8 ||
                                    contextObj.moduleId == 17 || contextObj.moduleId == 18 || contextObj.moduleId == 24 ||
                                    contextObj.moduleId == 25 || contextObj.moduleId == 26 || contextObj.moduleId == 27) {
                                    ////debugger
                                    var objectId;
                                    var objectsData
                                    if (handleType == 1) {
                                        objectId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })['AssetsId'];
                                        contextObj.isSymbolHandle = true;
                                    } else {
                                        objectId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.BlockHandle === selectedHandle })['AssetsId'];
                                        contextObj.isSymbolHandle = false;
                                    }
                                    objectsData = contextObj.objectsDrawingObj.objectsData.find(function (el) { return el.ObjectId === objectId });
                                    if (objectsData != undefined) {

                                        ////debugger
                                        contextObj.spaceObj.deleteLayerAlredyExists(contextObj.objectsDrawingObj.hatchObjectLayer, function (rtn) {
                                            contextObj.objectsDrawingObj.hatchSingleObject(selectedHandle, function (returnCode1) {
                                                if (returnCode1 != 0)
                                                    console.log("hatchObject failed due to ", returnCode1);
                                                else {
                                                    contextObj.editObjectSelectedId = objectId;
                                                    contextObj.editObjectClassId = objectsData.ObjectClassId;
                                                    contextObj.editObjectSpaceId = objectsData.SpaceId;
                                                    contextObj.contextMenuData = [];
                                                    if (contextObj.objectsDrawingObj.commonDwgServices.sessionUserRoleId != 4) {
                                                        contextObj.contextMenuData.push({ menuId: 23, menuName: "Edit " + contextObj.objectname });
                                                        if (contextObj.objectsDrawingObj.commonDwgServices.isSnapEnabled) {
                                                            var secondMenu;
                                                            secondMenu = [{ menuId: 42, menuName: "Corner to Corner" }, { menuId: 43, menuName: "Corner to Edge" }, { menuId: 44, menuName: "Edge to Edge" }];
                                                            contextObj.contextMenuData.push({ menuId: 41, menuName: "Align with another " + contextObj.objectname, secondMenu: secondMenu });//  { menuId: 50, menuName: "De-Hatch" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
                                                            if (contextObj.drawingCategoryId == 1 && (contextObj.objectsDrawingObj.commonDwgServices.g_IsNetCustomer || contextObj.objectsDrawingObj.commonDwgServices.g_IsNetCustomer == false && contextObj.objectsDrawingObj.commonDwgServices.isNetAreaAllowed)) {
                                                                secondMenu = [{ menuId: 46, menuName: "Corner to Corner" }, { menuId: 47, menuName: "Corner to Wall" }, { menuId: 48, menuName: "Edge to Wall" }];
                                                                contextObj.contextMenuData.push({ menuId: 45, menuName: "Align with Wall ", secondMenu: secondMenu });
                                                            }
                                                        }
                                                        if (contextObj.objectsDrawingObj.commonDwgServices.isCopyPasteEnabled && handleType==1)
                                                            contextObj.contextMenuData.push({ menuId: 40, menuName: "Copy" });
                                                        if (handleType==1)
                                                            contextObj.contextMenuData.push({ menuId: 29, menuName: "De-link" }, { menuId: 28, menuName: "Rotate" }, { menuId: 24, menuName: "Move" });
                                                        contextObj.contextMenuData.push({ menuId: 27, menuName: "Attachment" })
                                                        if (contextObj.objectsDrawingObj.commonDwgServices.isWOModuleEnabled)
                                                            contextObj.contextMenuData.push({ menuId: 61, menuName: "Create Service Request" });//, { menuId: 63, menuName: "Review Service Request" }, { menuId: 62, menuName: "Equipment Work History" }
                                                        if (contextObj.moduleId == 8) {
                                                            contextObj.contextMenuData[contextObj.contextMenuData.findIndex(function (el) { return el.menuId == 29 })].menuName = "Warehouse";
                                                        }
                                                    }
                                                    contextObj.defaultContextMenuItems();
                                                }
                                            });
                                        });
                                    }
                                }
                            }
                            var event = document.createEvent("CustomEvent");
                            event.initCustomEvent('ContextMenuEvent', true, true,
                                { 'xPos': outputs[0], 'yPos': outputs[1] });
                            document.dispatchEvent(event)
                            contextObj.contextMenuVisibility = true;
                        }
                        else {
                            contextObj.contextMenuData = [];
                            contextObj.defaultContextMenuItems();
                            contextObj.contextMenuVisibility = true;
                            var event = document.createEvent("CustomEvent");
                            event.initCustomEvent('ContextMenuEvent', true, true,
                                { 'xPos': outputs[0], 'yPos': outputs[1] });
                            document.dispatchEvent(event)
                        }
                    });
                }

                //if (contextObj.isHatch) {
                //    contextObj.contextMenuData = [];
                //    contextObj.contextMenuData.push({ menuId: 50, menuName: "De-Hatch" });
                //    contextObj.defaultContextMenuItems();
                //    contextObj.contextMenuVisibility = true;
                //} else if (contextObj.isBlink) {
                //    contextObj.contextMenuData = [];
                //    contextObj.contextMenuData.push({ menuId: 51, menuName: "Stop Blink" });
                //    contextObj.defaultContextMenuItems();
                //    contextObj.contextMenuVisibility = true;
                //} else {
                //    contextObj.objiWhiz.getSymbolWithClientPoint(outputs[0], outputs[1], false, function (retCode, selectedHandle) {
                //        ////debugger
                //        if (retCode == 0) {
                //            if (contextObj.moduleId == 5 && contextObj.pageTarget != 5) {//Employee Edit on right click
                //                var empSymbolData = contextObj.employeeDrawingObj.empHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle });
                //                if (empSymbolData != undefined) {
                //                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                //                        contextObj.employeeDrawingObj.hatchEmployee(selectedHandle, function (retCode) {
                //                            if (retCode != 0)
                //                                console.log("hatchEmployee failed due to ", retCode);
                //                            else {
                //                                contextObj.assignedEmployeeSelectedId = empSymbolData['EmpId'];
                //                                contextObj.employeeData = contextObj.employeeDrawingObj.empData.find(function (el) { return el.Id === contextObj.assignedEmployeeSelectedId });
                //                                contextObj.contextMenuData = [];
                //                                contextObj.contextMenuData.push({ menuId: 20, menuName: "Edit Employee" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
                //                                contextObj.defaultContextMenuItems();
                //                            }
                //                        });
                //                    });
                //                }
                //            }
                //            if (contextObj.moduleId == 7) {
                //                ////debugger
                //                var assetId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })['AssetsId'];
                //                var objectsData = contextObj.objectsDrawingObj.objectsData.find(function (el) { return el.ObjectId === assetId });
                //                if (objectsData != undefined) {

                //                    ////debugger
                //                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                //                        contextObj.objectsDrawingObj.hatchObject(selectedHandle, function (returnCode1) {

                //                            if (retCode != 0)
                //                                console.log("hatchObject failed due to ", retCode);
                //                            else {
                //                                contextObj.editObjectSelectedId = assetId;
                //                                contextObj.editObjectClassId = objectsData.ObjectClassId;
                //                                contextObj.editObjectSpaceId = objectsData.SpaceId;
                //                                contextObj.contextMenuData = [];
                //                                contextObj.contextMenuData.push({ menuId: 23, menuName: "Edit Asset" });//, { menuId: 50, menuName: "De-Hatch" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
                //                                contextObj.defaultContextMenuItems();
                //                            }
                //                        });
                //                    });
                //                }
                //            } else if (contextObj.moduleId == 8) {  //Furniture
                //                ////debugger
                //                var furnitureId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })['FurnitureId'];
                //                var furnitureData = contextObj.objectsDrawingObj.objectsData.find(function (el) { return el.ObjectId === furnitureId });
                //                if (furnitureData != undefined) {
                //                    ////debugger
                //                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                //                        contextObj.objectsDrawingObj.hatchObject(selectedHandle, function (returnCode1) {

                //                            if (retCode != 0)
                //                                console.log("hatchObject failed due to ", retCode);
                //                            else {
                //                                contextObj.editObjectSelectedId = furnitureId;
                //                                contextObj.editObjectClassId = furnitureData.ObjectClassId;
                //                                contextObj.contextMenuData = [];
                //                                contextObj.contextMenuData.push({ menuId: 23, menuName: "Edit Furniture" });//, { menuId: 24, menuName: "Attachments" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
                //                                contextObj.defaultContextMenuItems();
                //                            }
                //                        });
                //                    });
                //                }
                //            }
                //        }
                //        else if (retCode == 37) {
                //            //contextObj.objiWhiz.getBlockRefWithClientPoint(outputs[0], outputs[1], contextObj.isSpace, function (returnCode, selectedHandle) {
                //            //    if (returnCode == 0) {
                //            //        contextObj.contextMenuData.push({ menuId: 20, menuName: "Edit Employee" });
                //            //        contextObj.defaultContextMenuItems();
                //            //    }
                //            //    else if (returnCode == 37) {
                //            contextObj.objiWhiz.getHandleWithClientPoint(outputs[0], outputs[1], contextObj.isSpace, function (rtCode, selectedHandle) {
                //                if (rtCode == 0) {
                //                    //  var space: any;
                //                    if (contextObj.spaceObj.spaceData && !(contextObj.moduleId == 3 && contextObj.pageTarget == 2) && !(contextObj.moduleId == 5 && contextObj.pageTarget == 5)) {
                //                        var space;
                //                        if (contextObj.isSpace)
                //                            space = contextObj.spaceObj.spaceData.find(function (el) { return el.BomaHandle === selectedHandle });
                //                        else
                //                            space = contextObj.spaceObj.spaceData.find(function (el) { return el.CarpetHandle === selectedHandle });
                //                        if (space != undefined) {
                //                            contextObj.spaceIdForEdit = space['SpaceId'];
                //                            contextObj.highlightRowIds = [];
                //                            contextObj.highlightRowIds = contextObj.highlightRowIds.concat(contextObj.spaceIdForEdit);
                //                            contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                //                                contextObj.spaceObj.hatchSingleEntityOnRightClick(selectedHandle, function (returnCode1) {
                //                                    contextObj.contextMenuData = [];
                //                                    contextObj.contextMenuData.push({ menuId: 10, menuName: "Edit Space" });
                //                                    if (contextObj.moduleId != 7 && contextObj.spaceObj.commonServices.enableEmpandSched.length > 0)
                //                                        contextObj.contextMenuData.push({ menuId: 12, menuName: "Assign Space Standard" });
                //                                    contextObj.defaultContextMenuItems();
                //                                    if (contextObj.moduleId == 7) {
                //                                        contextObj.objectsDrawingObj.deHatchObjects(function (retcode) {
                //                                            //  //debugger
                //                                            contextObj.objectsDrawingObj.showSelectedAssetInDrawing(contextObj.editObjectSelectedId, function (retcode, selectedHandles) {
                //                                                contextObj.selectedHandles = selectedHandles;
                //                                                contextObj.objiWhiz.setDisplay(true);
                //                                            });

                //                                        });
                //                                    } else if (contextObj.moduleId == 5) {
                //                                        contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                //                                        });
                //                                    }

                //                                });
                //                            });
                //                        }
                //                        else {
                //                            contextObj.contextMenuData = [];
                //                            contextObj.defaultContextMenuItems();
                //                        }
                //                    }
                //                    else {
                //                        contextObj.contextMenuData = [];
                //                        contextObj.defaultContextMenuItems();
                //                    }

                //                } else if (rtCode == 37 || rtCode == 45) {
                //                    contextObj.contextMenuData = [];
                //                    contextObj.defaultContextMenuItems();
                //                }
                //                else
                //                    console.log("getHandleWithClientPoint faild due to ", rtCode);
                //                contextObj.contextMenuVisibility = true;
                //            });
                //            //    }
                //            //    else
                //            //        alert("getBlockRefWithClientPoint faild due to " + retCode);
                //            //    contextObj.contextMenuVisibility = true;
                //            //});
                //        }
                //        else
                //            console.log("getSymbolWithClientPoint faild due to ", retCode);
                //        contextObj.contextMenuVisibility = true;
                //    });
                //}
            }
            else if (outputs[2] == "0") {
                if (contextObj.moduleId != 1 && (contextObj.moduleId != 3 || contextObj.pageTarget != 2)) {
                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (returnCode) {
                        contextObj.objiWhiz.removeMaps();
                        if (contextObj.moduleId == 6 || contextObj.moduleId == 7 || contextObj.moduleId == 8 ||
                            contextObj.moduleId == 17 || contextObj.moduleId == 18 || contextObj.moduleId == 24 ||
                            contextObj.moduleId == 25 || contextObj.moduleId == 26 || contextObj.moduleId == 27) {
                            contextObj.spaceObj.deleteLayerAlredyExists(contextObj.objectsDrawingObj.hatchObjectLayer, function (returnCode) {
                            });
                        }
                    });
                }
            }
        });
        contextObj.objiWhiz.addEvent("mouseClick", function (outputs) {
            contextObj.isTooltipEnable = true;
            contextObj.showLayer = false;
            contextObj.contextMenuVisibility = false;
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent('ContextMenuEvent', true, true,
                { 'xPos': 0, 'yPos': 0 });
            document.dispatchEvent(event); // to hide context menu
            if (contextObj.moduleId == 14 && contextObj.isShowClicked) {
                contextObj.objiWhiz.getHandleOnPoint(outputs[0], outputs[1], "1023", function (returnCode, selectedHandle, handleType, id, isActionPoint) {
                    if (selectedHandle != "") {

                        if (handleType == 0) //space/net handle
                        {
                            if (contextObj.selectedHandles.some(function (el) { return el == selectedHandle })) {
                                var space;
                                if (contextObj.isSpace)
                                    space = contextObj.spaceObj.spaceData.find(function (el) { return el.BomaHandle === selectedHandle });
                                else
                                    space = contextObj.spaceObj.spaceData.find(function (el) { return el.CarpetHandle === selectedHandle });
                                if (space != undefined) {
                                    contextObj.spaceIdForEdit = space['SpaceId'];
                                    if (contextObj.selectedtabInRight == 0) {
                                        var selectedSeatIds = contextObj.schedulingDrawingObj.getSeatIdsFromSpaceId(contextObj.spaceIdForEdit);
                                        if (selectedSeatIds.length == 1) {
                                            contextObj.selectedSeatId = selectedSeatIds;
                                            if (contextObj.schedulingDrawingObj.checkIsHotelingSeatFromSeatId(selectedSeatIds[0]))
                                                contextObj.reserveSeatOnClickFromRightClick();
                                        }
                                    } else {
                                        var assignmentTypeId = contextObj.schedulingDrawingObj.getSpaceAssignmentType(contextObj.spaceIdForEdit);
                                        if (assignmentTypeId == 4)
                                            contextObj.reserveRoomOnClickFromRightClick();
                                    }

                                }
                            }
                        }
                        if (handleType == 1) //symbolHandle
                        {
                            var spaceId = contextObj.schedulingDrawingObj.getSpaceIdsFromHandle(selectedHandle);
                            var spaceHandle = contextObj.spaceObj.getHandleFromSpaceId(spaceId);
                            contextObj.spaceIdForEdit = spaceId;
                            if (contextObj.selectedHandles.some(function (el) { return el == spaceHandle })) {
                                if (contextObj.selectedtabInRight == 0) {
                                    var selectedSeatIds = contextObj.schedulingDrawingObj.getSeatIdsFromSpaceId(spaceId);
                                    if (selectedSeatIds.length == 1) {
                                        contextObj.selectedSeatId = selectedSeatIds;
                                        if (contextObj.schedulingDrawingObj.checkIsHotelingSeatFromSeatId(selectedSeatIds[0]))
                                            contextObj.reserveSeatOnClickFromRightClick();
                                    }
                                } else {
                                    var assignmentTypeId = contextObj.schedulingDrawingObj.getSpaceAssignmentType(spaceId);
                                    if (assignmentTypeId == 4)
                                        contextObj.reserveRoomOnClickFromRightClick();
                                }
                            }
                        }
                    }

                });
            }
            if (contextObj.moduleId == 14) {
                contextObj.objiWhiz.removeMaps();
            }
            //else if (contextObj.moduleId == 5) {
            //    contextObj.employeeDrawingObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (returnCode) {
            //        contextObj.objiWhiz.removeMaps();
            //    });
            //}
            //else if (contextObj.moduleId == 7) {
            //    contextObj.objectsDrawingObj.deleteLayerAlredyExists("$HatchSingleEntity", function (returnCode) {
            //        //contextObj.objiWhiz.removeMaps();
            //    });
            //}
        });
        contextObj.objiWhiz.addEvent("longtouchHandler", function (outputs) {
            console.log("longtouchHandler: outputs[0]: " + outputs[0] + ",outputs[1]: " + outputs[1] + ",outputs[2]: " + outputs[2]);

            contextObj.isTooltipEnable = false;
            contextObj.contextMenuVisibility = false;
            contextObj.contextMenuXPosition = outputs[0];
            contextObj.contextMenuYPosition = outputs[1];
            // contextObj.contextMenuData = [];
            if (contextObj.isHatch) {
                contextObj.contextMenuData = [];
                contextObj.contextMenuData.push({ menuId: 50, menuName: "De-Hatch" });
                contextObj.defaultContextMenuItems();
                contextObj.contextMenuVisibility = true;
                var event = document.createEvent("CustomEvent");
                event.initCustomEvent('ContextMenuEvent', true, true,
                    { 'xPos': outputs[0], 'yPos': outputs[1] });
                document.dispatchEvent(event);
            } else if (contextObj.isBlink) {
                contextObj.contextMenuData = [];
                contextObj.contextMenuData.push({ menuId: 51, menuName: "Stop Blink" });
                contextObj.defaultContextMenuItems();
                contextObj.contextMenuVisibility = true;
                var event = document.createEvent("CustomEvent");
                event.initCustomEvent('ContextMenuEvent', true, true,
                    { 'xPos': outputs[0], 'yPos': outputs[1] });
                document.dispatchEvent(event);
            }
            else {
                contextObj.objiWhiz.getHandleOnPoint(contextObj.contextMenuXPosition, contextObj.contextMenuYPosition, "1023", function (returnCode, selectedHandle, handleType, id, isActionPoint) {
                    if (selectedHandle != "") {
                        if (handleType == 0) //space/net handle
                        {
                            if (contextObj.spaceObj.spaceData && !(contextObj.moduleId == 3 && (contextObj.pageTarget == 2 || contextObj.pageTarget == 10)) && !(contextObj.moduleId == 5 && contextObj.pageTarget == 5)) {
                                var space;
                                if (contextObj.isSpace)
                                    space = contextObj.spaceObj.spaceData.find(function (el) { return el.BomaHandle === selectedHandle });
                                else
                                    space = contextObj.spaceObj.spaceData.find(function (el) { return el.CarpetHandle === selectedHandle });
                                if (space != undefined) {
                                    contextObj.spaceIdForEdit = space['SpaceId'];
                                    contextObj.highlightRowIds = [];
                                    contextObj.highlightRowIds = contextObj.highlightRowIds.concat(contextObj.spaceIdForEdit);
                                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                                        contextObj.spaceObj.hatchSingleEntityOnRightClick(selectedHandle, function (returnCode1) {
                                            contextObj.contextMenuData = [];
                                            contextObj.contextMenuData.push({ menuId: 10, menuName: "Edit Space" });
                                            if (contextObj.moduleId != 7 && contextObj.spaceObj.commonServices.enableEmpandSched.length > 0)
                                                contextObj.contextMenuData.push({ menuId: 12, menuName: "Assign Space Standard" });
                                            contextObj.defaultContextMenuItems();
                                            if (contextObj.moduleId == 6 || contextObj.moduleId == 7 || contextObj.moduleId == 8 ||
                                                contextObj.moduleId == 17 || contextObj.moduleId == 18 || contextObj.moduleId == 24 ||
                                                contextObj.moduleId == 25 || contextObj.moduleId == 26 || contextObj.moduleId == 27) {
                                                contextObj.objectsDrawingObj.deHatchObjects(function (retcode) {
                                                    //  //debugger
                                                    contextObj.objectsDrawingObj.showSelectedObjectInDrawing(contextObj.editObjectSelectedId, function (retcode, selectedHandles) {
                                                        contextObj.selectedHandles = selectedHandles;
                                                        contextObj.objiWhiz.setDisplay(true);
                                                    });

                                                });
                                            } else if (contextObj.moduleId == 5) {
                                                contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                                                });
                                            }

                                        });
                                    });
                                }
                                else {
                                    contextObj.contextMenuData = [];
                                    contextObj.defaultContextMenuItems();
                                }
                            }
                            else {
                                contextObj.contextMenuData = [];
                                contextObj.defaultContextMenuItems();
                            }
                        }
                        else if (handleType == 1) //symbol
                        {
                            if (contextObj.moduleId == 5 && contextObj.pageTarget != 5) {//Employee Edit on right click
                                var empSymbolData = contextObj.employeeDrawingObj.empHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle });
                                if (empSymbolData != undefined) {
                                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                                        contextObj.employeeDrawingObj.hatchEmployee(selectedHandle, function (retCode) {
                                            if (retCode != 0)
                                                console.log("hatchEmployee failed due to ", retCode);
                                            else {
                                                contextObj.assignedEmployeeSelectedId = empSymbolData['EmpId'];
                                                contextObj.employeeData = contextObj.employeeDrawingObj.empData.find(function (el) { return el.Id === contextObj.assignedEmployeeSelectedId });
                                                contextObj.contextMenuData = [];
                                                contextObj.contextMenuData.push({ menuId: 20, menuName: "Edit Employee" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
                                                contextObj.defaultContextMenuItems();
                                            }
                                        });
                                    });
                                }
                            }
                            //if (contextObj.moduleId == 7) {
                            //    ////debugger
                            //    var assetId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })['AssetsId'];
                            //    var objectsData = contextObj.objectsDrawingObj.objectsData.find(function (el) { return el.ObjectId === assetId });
                            //    if (objectsData != undefined) {

                            //        ////debugger
                            //        contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                            //            contextObj.objectsDrawingObj.hatchObject(selectedHandle, function (returnCode1) {

                            //                if (returnCode1 != 0)
                            //                    console.log("hatchObject failed due to ", returnCode1);
                            //                else {
                            //                    contextObj.editObjectSelectedId = assetId;
                            //                    contextObj.editObjectClassId = objectsData.ObjectClassId;
                            //                    contextObj.editObjectSpaceId = objectsData.SpaceId;
                            //                    contextObj.contextMenuData = [];
                            //                    contextObj.contextMenuData.push({ menuId: 23, menuName: "Edit Asset" });//, { menuId: 50, menuName: "De-Hatch" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
                            //                    contextObj.defaultContextMenuItems();
                            //                }
                            //            });
                            //        });
                            //    }
                            //} 
                            if (contextObj.moduleId == 6 || contextObj.moduleId == 7 || contextObj.moduleId == 8 ||
                                contextObj.moduleId == 17 || contextObj.moduleId == 18 || contextObj.moduleId == 24 ||
                                contextObj.moduleId == 25 || contextObj.moduleId == 26 || contextObj.moduleId == 27) {
                                ////debugger
                                var objectId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })[contextObj.objectmultiplename + 'Id'];
                                var objectData = contextObj.objectsDrawingObj.objectsData.find(function (el) { return el.ObjectId === objectId });
                                if (objectData != undefined) {
                                    ////debugger
                                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                                        contextObj.objectsDrawingObj.hatchObject(selectedHandle, function (returnCode1) {

                                            if (returnCode1 != 0)
                                                console.log("hatchObject failed due to ", returnCode1);
                                            else {
                                                contextObj.editObjectSelectedId = objectId;
                                                contextObj.editObjectClassId = objectData.ObjectClassId;
                                                contextObj.contextMenuData = [];
                                                contextObj.contextMenuData.push({ menuId: 23, menuName: "Edit " + contextObj.objectname });
                                                contextObj.defaultContextMenuItems();
                                            }
                                        });
                                    });
                                }
                            }
                        }
                        contextObj.contextMenuVisibility = true;
                        var event = document.createEvent("CustomEvent");
                        event.initCustomEvent('ContextMenuEvent', true, true,
                            { 'xPos': outputs[0], 'yPos': outputs[1] });
                        document.dispatchEvent(event);
                    }
                    else {
                        contextObj.contextMenuData = [];
                        contextObj.defaultContextMenuItems()
                        contextObj.contextMenuVisibility = true;
                        var event = document.createEvent("CustomEvent");
                        event.initCustomEvent('ContextMenuEvent', true, true,
                            { 'xPos': outputs[0], 'yPos': outputs[1] });
                        document.dispatchEvent(event);
                    }
                });
            }
            // if (outputs[2] == "2") {
            //contextObj.tooltipVisibility = false;
            //contextObj.isTooltipEnable = false;
            //contextObj.contextMenuVisibility = false;
            //contextObj.contextMenuXPosition = outputs[0];
            //contextObj.contextMenuYPosition = outputs[1];
            //// contextObj.contextMenuData = [];
            //if (contextObj.isHatch) {
            //    contextObj.contextMenuData = [];
            //    contextObj.contextMenuData.push({ menuId: 50, menuName: "De-Hatch" });
            //    contextObj.defaultContextMenuItems();
            //    contextObj.contextMenuVisibility = true;
            //} else if (contextObj.isBlink) {
            //    contextObj.contextMenuData = [];
            //    contextObj.contextMenuData.push({ menuId: 51, menuName: "Stop Blink" });
            //    contextObj.defaultContextMenuItems();
            //    contextObj.contextMenuVisibility = true;
            //} else {
            //    contextObj.objiWhiz.getSymbolWithClientPoint(outputs[0], outputs[1], false, function (retCode, selectedHandle) {
            //        //debugger
            //        if (retCode == 0) {
            //            if (contextObj.moduleId == 5 && contextObj.pageTarget != 5) {//Employee Edit on right click
            //                var empSymbolData = contextObj.employeeDrawingObj.empHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle });
            //                if (empSymbolData != undefined) {
            //                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
            //                        contextObj.employeeDrawingObj.hatchEmployee(selectedHandle, function (retCode) {
            //                            if (retCode != 0)
            //                                console.log("hatchEmployee failed due to ", retCode);
            //                            else {
            //                                contextObj.assignedEmployeeSelectedId = empSymbolData['EmpId'];
            //                                contextObj.employeeData = contextObj.employeeDrawingObj.empData.find(function (el) { return el.Id === contextObj.assignedEmployeeSelectedId });
            //                                contextObj.contextMenuData = [];
            //                                contextObj.contextMenuData.push({ menuId: 20, menuName: "Edit Employee" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
            //                                contextObj.defaultContextMenuItems();
            //                            }
            //                        });
            //                    });
            //                }
            //            }
            //            if (contextObj.moduleId == 7) {
            //                //debugger
            //                var assetId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })['AssetsId'];
            //                var objectsData = contextObj.objectsDrawingObj.objectsData.find(function (el) { return el.ObjectId === assetId });
            //                if (objectsData != undefined) {

            //                    //debugger
            //                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
            //                        contextObj.objectsDrawingObj.hatchObject(selectedHandle, function (returnCode1) {

            //                            if (retCode != 0)
            //                                console.log("hatchObject failed due to ", retCode);
            //                            else {
            //                                contextObj.editObjectSelectedId = assetId;
            //                                contextObj.editObjectClassId = objectsData.ObjectClassId;
            //                                contextObj.editObjectSpaceId = objectsData.SpaceId;
            //                                contextObj.contextMenuData = [];
            //                                contextObj.contextMenuData.push({ menuId: 23, menuName: "Edit Asset" }, { menuId: 50, menuName: "De-Hatch" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
            //                                contextObj.defaultContextMenuItems();
            //                            }
            //                        });
            //                    });
            //                }
            //            } else if (contextObj.moduleId == 8) {  //Furniture
            //                //debugger
            //                var furnitureId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })['FurnitureId'];
            //                var furnitureData = contextObj.objectsDrawingObj.objectsData.find(function (el) { return el.ObjectId === furnitureId });
            //                if (furnitureData != undefined) {
            //                    //debugger
            //                    contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
            //                        contextObj.objectsDrawingObj.hatchObject(selectedHandle, function (returnCode1) {

            //                            if (retCode != 0)
            //                                console.log("hatchObject failed due to ", retCode);
            //                            else {
            //                                contextObj.editObjectSelectedId = furnitureId;
            //                                contextObj.editObjectClassId = furnitureData.ObjectClassId;
            //                                contextObj.contextMenuData = [];
            //                                contextObj.contextMenuData.push({ menuId: 23, menuName: "Edit Furniture" });//, { menuId: 24, menuName: "Attachments" });// { menuId: 21, menuName: "Move Employee" }, { menuId: 22, menuName: "De-Assign Employee" }
            //                                contextObj.defaultContextMenuItems();
            //                            }
            //                        });
            //                    });
            //                }
            //            }
            //        }
            //        else if (retCode == 37) {
            //            //contextObj.objiWhiz.getBlockRefWithClientPoint(outputs[0], outputs[1], contextObj.isSpace, function (returnCode, selectedHandle) {
            //            //    if (returnCode == 0) {
            //            //        contextObj.contextMenuData.push({ menuId: 20, menuName: "Edit Employee" });
            //            //        contextObj.defaultContextMenuItems();
            //            //    }
            //            //    else if (returnCode == 37) {
            //            contextObj.objiWhiz.getHandleWithClientPoint(outputs[0], outputs[1], contextObj.isSpace, function (rtCode, selectedHandle) {
            //                if (rtCode == 0) {
            //                    //  var space: any;
            //                    if (contextObj.spaceObj.spaceData && !(contextObj.moduleId == 3 && contextObj.pageTarget == 2) && !(contextObj.moduleId == 5 && contextObj.pageTarget == 5) ) {
            //                        var space;
            //                        if (contextObj.isSpace)
            //                            space = contextObj.spaceObj.spaceData.find(function (el) { return el.BomaHandle === selectedHandle });
            //                        else
            //                            space = contextObj.spaceObj.spaceData.find(function (el) { return el.CarpetHandle === selectedHandle });
            //                        if (space != undefined)
            //                        {
            //                            contextObj.spaceIdForEdit = space['SpaceId'];
            //                            contextObj.highlightRowIds = [];
            //                            contextObj.highlightRowIds = contextObj.highlightRowIds.concat(contextObj.spaceIdForEdit);
            //                            contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
            //                                contextObj.spaceObj.hatchSingleEntityOnRightClick(selectedHandle, function (returnCode1) {
            //                                    contextObj.contextMenuData = [];
            //                                    contextObj.contextMenuData.push({ menuId: 10, menuName: "Edit Space" });
            //                                    if (contextObj.moduleId != 7 && contextObj.spaceObj.commonServices.enableEmpandSched.length>0)
            //                                        contextObj.contextMenuData.push({ menuId: 12, menuName: "Assign Space Standard" });
            //                                    contextObj.defaultContextMenuItems();
            //                                    if (contextObj.moduleId == 7) {
            //                                        contextObj.objectsDrawingObj.deHatchObjects(function (retcode) {
            //                                            //  //debugger
            //                                            contextObj.objectsDrawingObj.showSelectedAssetInDrawing(contextObj.editObjectSelectedId, function (retcode, selectedHandles) {
            //                                                contextObj.selectedHandles = selectedHandles;
            //                                                contextObj.objiWhiz.setDisplay(true);
            //                                            });

            //                                        });
            //                                    } else if (contextObj.moduleId == 5) {
            //                                        contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
            //                                        });
            //                                    }

            //                                });
            //                            });
            //                        }
            //                        else {
            //                            contextObj.contextMenuData = [];
            //                            contextObj.defaultContextMenuItems();
            //                        }
            //                    }
            //                    else {
            //                        contextObj.contextMenuData = [];
            //                        contextObj.defaultContextMenuItems();
            //                    }

            //                } else if (rtCode == 37 || rtCode == 45) {
            //                    contextObj.contextMenuData = [];
            //                    contextObj.defaultContextMenuItems();
            //                }
            //                else
            //                    console.log("getHandleWithClientPoint faild due to ", rtCode);
            //                contextObj.contextMenuVisibility = true;
            //            });
            //            //    }
            //            //    else
            //            //        alert("getBlockRefWithClientPoint faild due to " + retCode);
            //            //    contextObj.contextMenuVisibility = true;
            //            //});
            //        }
            //        else
            //            console.log("getSymbolWithClientPoint faild due to ", retCode);
            //        contextObj.contextMenuVisibility = true;
            //    });
            //}
            //}
            //else {
            //    contextObj.isTooltipEnable = true;
            //    contextObj.showLayer = false;
            //    contextObj.contextMenuVisibility = false;
            //    if (contextObj.moduleId != 1) {
            //        contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (returnCode) {

            //        });
            //    }
            //else if (contextObj.moduleId == 5) {
            //    contextObj.employeeDrawingObj.spaceOpenDrawingObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (returnCode) {
            //        contextObj.objiWhiz.removeMaps();
            //    });
            //}
            //else if (contextObj.moduleId == 7) {
            //    contextObj.objectsDrawingObj.deleteLayerAlredyExists("$HatchSingleEntity", function (returnCode) {
            //        //contextObj.objiWhiz.removeMaps();
            //    });
            //}
            // }
        });
        contextObj.objiWhiz.addEvent("mouseDoubleClick", function (outputs) {
            var isAttachment: boolean = false;
            if (contextObj.moduleId == 6 || contextObj.moduleId == 7 || contextObj.moduleId == 8 ||
                contextObj.moduleId == 17 || contextObj.moduleId == 18 || contextObj.moduleId == 24 ||
                contextObj.moduleId == 25 || contextObj.moduleId == 26 || contextObj.moduleId == 27) {
                contextObj.contextMenuXPosition = outputs[0];
                contextObj.contextMenuYPosition = outputs[1];
                contextObj.objiWhiz.getHandleOnPoint(contextObj.contextMenuXPosition, contextObj.contextMenuYPosition, "1023", function (returnCode, selectedHandle, handleType, id, isActionPoint) {
                    if (selectedHandle != "") {
                        if (handleType == 0) //space/net handle
                        {
                            contextObj.objiWhiz.getHandleWithClientPoint(outputs[0], outputs[1], contextObj.isSpace, function (rtCode, selectedHandle) {
                                if (rtCode == 0) {
                                    if (contextObj.spaceObj.spaceData) {
                                        var space = contextObj.spaceObj.getSpaceDataFromHandle(selectedHandle);
                                        if (space != undefined) {
                                            var attachmentCount = space['Attachments'];
                                            var spaceId = space['SpaceId'];
                                            if (attachmentCount > 0) {
                                                contextObj.attachmentCategoryId = 5;
                                                contextObj.baseEntityIdForattachment = spaceId;
                                                contextObj.showAttachment = true;
                                                contextObj.pageTitle = "Space Attachments";
                                                contextObj.showSecondaryViewObjectTarget = -1;
                                                contextObj.showSecondaryViewEmployeeTarget = -1;
                                                contextObj.showSecondaryViewSpaceScheduleTarget = -1;
                                                contextObj.showSecondaryViewSpaceTarget = 3;
                                                isAttachment = true;
                                            }

                                        }
                                        else {
                                        }
                                    }
                                    else {

                                    }
                                } else if (rtCode == 37 || rtCode == 45) {

                                }
                                else
                                    console.log("getHandleWithClientPoint faild due to ", rtCode);
                                if (isAttachment) {
                                    setTimeout(function () {
                                        // contextObj.splitviewDrawing.secondaryArea = 79;
                                        contextObj.splitviewDrawing.showSecondaryView = true;
                                    }, 50);
                                }
                            });

                        } else {
                            var objectId;
                            var objectsData
                            if (handleType == 1) {
                                objectId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })['AssetsId'];
                                contextObj.isSymbolHandle = true;
                            } else {
                                objectId = contextObj.objectsDrawingObj.objectsHandlesData.find(function (el) { return el.BlockHandle === selectedHandle })['AssetsId'];
                                contextObj.isSymbolHandle = false;
                            }
                            var objectsData = contextObj.objectsDrawingObj.objectsData.find(function (el) { return el.ObjectId === objectId });
                            if (objectsData != undefined) {
                                var attachmentCount = objectsData['Attachments'];
                                if (attachmentCount > 0) {
                                    contextObj.editObjectClassId = objectsData['ObjectClassId'];
                                    contextObj.attachmentCategoryId = 7;
                                    contextObj.baseEntityIdForattachment = objectId;
                                    contextObj.showAttachment = true;
                                    contextObj.pageTitle = contextObj.objectname + " Attachments";
                                    contextObj.showSecondaryViewEmployeeTarget = -1;
                                    contextObj.showSecondaryViewSpaceTarget = 3;
                                    isAttachment = true;
                                }
                            }
                            if (isAttachment) {
                                setTimeout(function () {
                                    // contextObj.splitviewDrawing.secondaryArea = 79;
                                    contextObj.splitviewDrawing.showSecondaryView = true;
                                }, 50);
                            }

                        }
                    }
                });
            }
            else {
                contextObj.objiWhiz.getSymbolWithClientPoint(outputs[0], outputs[1], false, function (retCode, selectedHandle) {
                    if (retCode == 0) {
                        if (contextObj.moduleId == 5) {
                            var empId = contextObj.employeeDrawingObj.empHandlesData.find(function (el) { return el.SymbolHandle === selectedHandle })['EmpId'];
                            var empData = contextObj.employeeDrawingObj.empData.find(function (el) { return el.Id === empId });
                            if (empData != undefined) {
                                var attachmentCount = empData['Attachments'];
                                if (attachmentCount > 0) {
                                    contextObj.attachmentCategoryId = 9;
                                    contextObj.baseEntityIdForattachment = empId;
                                    contextObj.showAttachment = true;
                                    contextObj.pageTitle = "Employee Attachments";
                                    contextObj.showSecondaryViewEmployeeTarget = -1;
                                    contextObj.showSecondaryViewSpaceTarget = 3;
                                    isAttachment = true;
                                }
                            }
                        }

                    }
                    else if (retCode == 37) {
                        //contextObj.objiWhiz.getBlockRefWithClientPoint(outputs[0], outputs[1], contextObj.isSpace, function (returnCode, selectedHandle) {
                        //    if (returnCode == 0) {
                        //        contextObj.contextMenuData.push({ menuId: 20, menuName: "Edit Employee" });
                        //        contextObj.defaultContextMenuItems();
                        //    }
                        //    else if (returnCode == 37) {
                        contextObj.objiWhiz.getHandleWithClientPoint(outputs[0], outputs[1], contextObj.isSpace, function (rtCode, selectedHandle) {
                            if (rtCode == 0) {
                                if (contextObj.spaceObj.spaceData) {
                                    var space = contextObj.spaceObj.getSpaceDataFromHandle(selectedHandle);
                                    if (space != undefined) {
                                        var attachmentCount = space['Attachments'];
                                        var spaceId = space['SpaceId'];
                                        if (attachmentCount > 0) {
                                            contextObj.attachmentCategoryId = 5;
                                            contextObj.baseEntityIdForattachment = spaceId;
                                            contextObj.showAttachment = true;
                                            contextObj.pageTitle = "Space Attachments";
                                            contextObj.showSecondaryViewObjectTarget = -1;
                                            contextObj.showSecondaryViewEmployeeTarget = -1;
                                            contextObj.showSecondaryViewSpaceScheduleTarget = -1;
                                            contextObj.showSecondaryViewSpaceTarget = 3;
                                            isAttachment = true;
                                        }

                                    }
                                    else {
                                    }
                                }
                                else {

                                }
                            } else if (rtCode == 37 || rtCode == 45) {

                            }
                            else
                                console.log("getHandleWithClientPoint faild due to ", rtCode);
                            if (isAttachment) {
                                setTimeout(function () {
                                    // contextObj.splitviewDrawing.secondaryArea = 79;
                                    contextObj.splitviewDrawing.showSecondaryView = true;
                                }, 50);
                            }
                        });
                    }
                    else
                        console.log("getSymbolWithClientPoint faild due to ", retCode);
                    if (isAttachment) {
                        setTimeout(function () {
                            // contextObj.splitviewDrawing.secondaryArea = 79;
                            contextObj.splitviewDrawing.showSecondaryView = true;
                        }, 50);
                    }
                });
            }
        });

    }
    displayDrawing = function (resCallback) {
        var contextObj = this;
        contextObj.objiWhiz.zoomExtents(function (ret) {
            if (ret == 0) {
                contextObj.objiWhiz.display(function () {
                    var loading_indicator = document.getElementById(contextObj.loadingIndicatorIdName);
                    loading_indicator.style.display = "none";
                    resCallback(0);
                });
            }
            else
                resCallback(0);
        });
    }
    isWaitMode() {
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return true;
        else
            return false;
    }
    attachmentViewerClose() {
        this.showAttachment = false;
    }
    detailsOnClick() { //details to show markup list
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        var contextObj = this;
        contextObj.showSecondaryViewAsbuiltsTarget = 1;
        contextObj.pageTitle = "Drawing Details";
        contextObj.splitviewDrawing.showSecondaryView = true;
        contextObj.showModuleSwitch = true;
    }
    //************ save markup ************//
    saveOnClick() {
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            this.objiWhiz.exitWaitMode();
        var contextObj = this;
        //if (this.isMarkupSaved)
        //    this.notificationService.ShowToaster("Markup already saved", 5);
        //else {
        if (this.selectedEditmarkupData) {
            contextObj.markupObj.saveMarkUp(function (xmlString) {
                let xmlStringModified = xmlString.replace(/\\/g, "0x5c");   // replace becuase of ; not work on json (; convert to it's hex value)
                contextObj.drawingDetailsService.updateMarkupDetails(contextObj.selectedEditmarkupData[0].markupId, contextObj.drawingType, xmlStringModified, contextObj.drawingId, contextObj.revisionNo, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                    console.log("contextObj.markupId", contextObj.markupId);

                    if (resultData.StatusId == 1) {
                        var layerName = xmlString.substring(xmlString.search("<LAYERNAME>") + 11, xmlString.search("</LAYERNAME>"));
                        contextObj.markupLayerInsertArray.push({ markupId: contextObj.markupId, layerName: layerName });
                        contextObj.notificationService.ShowToaster("Markup uploaded", 3);
                        contextObj.markupObj.isMarkupEdit = false;
                        contextObj.markupObj.isChangeInEdit = false;
                        contextObj.selectedEditmarkupData = undefined;
                        contextObj.markupObj.craeateNextMarkup(layerName);
                    }
                    else
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                });
            });
        } else {
            contextObj.markupObj.hasMarkupsIndrawing(function (retCode, isEdit) {
                if (retCode != 0)
                    contextObj.notificationService.ShowToaster("No Comments or Markups to save", 3);
                else {
                    contextObj.showSlide = true;
                    //contextObj.showMarkupDescription = true;
                    //contextObj.showMarkupComment = false;
                }
            });
        }

        // }
    }
    onMarkupDesciptionSubmit(event: any) {
        console.log("onMarkupDesciptionSubmit", event);
        var contextObj = this;
        var message: string = "";
        let description = event[0].FieldValue;
        contextObj.markupObj.saveMarkUp(function (xmlString) {
            console.log("xmlString", xmlString);

            let xmlStringModified = xmlString.replace(/\\/g, "0x5c");   // replace becuase of ; not work on json (; convert to it's hex value)
            console.log("xmlStringModified", xmlStringModified);
            var projectId = 0;
            if (contextObj.moduleId == 2) {
                projectId = contextObj.drawingDetails['ProjectId'];
            }
            contextObj.drawingDetailsService.insertMarkupDetails(contextObj.drawingType, xmlStringModified, description, contextObj.drawingId, contextObj.revisionNo, contextObj.isBuildingDrawing, contextObj.moduleId, projectId).subscribe(function (resultData) {
                contextObj.markupId = resultData.ServerId;
                message = resultData.Message;
                console.log("contextObj.markupId", contextObj.markupId);
                if (message = "Success") {
                    var layerName = xmlString.substring(xmlString.search("<LAYERNAME>") + 11, xmlString.search("</LAYERNAME>"));
                    contextObj.markupLayerInsertArray.push({ markupId: contextObj.markupId, layerName: layerName });
                    contextObj.notificationService.ShowToaster("Markup uploaded", 3);
                    contextObj.markupObj.craeateNextMarkup(layerName);
                    //contextObj.isMarkupSaved = true;
                    //contextObj.markupObj.isMarkupSave();
                }
                else
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            });
        });
        contextObj.showSlide = false;
        //contextObj.showMarkupDescription = false;
        if (contextObj.markupId) {
            contextObj.markupId = null;
        }
    }
    //************ add and edit comment ************//
    addcommentsOnClick() {//add
        //if (this.showMarkupDescription)
        //    this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            var contextObj = this;
            contextObj.objiWhiz.setCursor(2);
            this.objiWhiz.getDWGPoint(function (retCode, x, y) {
                if (retCode == 0) {
                    if (contextObj.showMarkupComment == false)
                        contextObj.showMarkupComment = true;
                    contextObj.markupCommentData[0].FieldValue = "2";
                    contextObj.markupCommentData[1].FieldValue = "2";
                    contextObj.markupCommentData[2].FieldValue = "";
                    contextObj.boldBackground = "transparent";
                    contextObj.italicBackground = "transparent";
                    contextObj.markupItalic = false;
                    contextObj.markupBold = false;
                    contextObj.isEditComment = false;
                    contextObj.markupStartX = x;
                    contextObj.markupStartY = y;
                    //contextObj.showSlide = true;
                }
            });
        }
    }

    editOnClick() {//edit
        //if (this.showMarkupDescription)
        //    this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            var contextObj = this;
            contextObj.markupObj.hasText(function (isText) {
                if (isText) {
                    contextObj.markupObj.editOnClick(function (isBold, isItalic, isUnderLine, textAngle, fontName, TextSize, textContent) {
                        console.log("contextObj.fontStyleArray, contextObj.fontsizeArray", contextObj.fontStyleArray, contextObj.fontsizeArray);
                        if (isBold) {
                            contextObj.markupBold = true;
                            contextObj.boldBackground = "darkgrey";
                        }
                        else {
                            contextObj.boldBackground = "transparent";
                            contextObj.markupBold = false;
                        }
                        if (isItalic) {
                            contextObj.italicBackground = "darkgrey";
                            contextObj.markupItalic = true;
                        }
                        else {
                            contextObj.italicBackground = "transparent";
                            contextObj.markupItalic = false;
                        }
                        contextObj.markupCommentData[0].FieldValue = contextObj.fontStyleArray[contextObj.fontStyleArray.findIndex(function (el) { return el.Value == fontName })].Id;
                        contextObj.markupCommentData[1].FieldValue = contextObj.fontsizeArray[contextObj.fontsizeArray.findIndex(function (el) { return el.Value == TextSize })].Id;
                        contextObj.markupCommentData[2].FieldValue = textContent;
                        if (contextObj.showMarkupComment == false)
                            contextObj.showMarkupComment = true;
                        contextObj.isEditComment = true;
                        //contextObj.showSlide = true;
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("No Comments exist", 3);
                }
            });
        }
    }

    italicsOnClick() {
        if (this.markupItalic) {
            this.markupItalic = false;
            this.italicBackground = "transparent"
        }
        else {
            this.markupItalic = true;
            this.italicBackground = "darkgrey";
        }
    }
    boldOnClick() {
        if (this.markupBold) {
            this.boldBackground = "transparent";
            this.markupBold = false;
        }
        else {
            this.boldBackground = "darkgrey";
            this.markupBold = true;
        }
    }
    colorOnClick() {
        var contextObj = this;
        contextObj.markupColour = "#fffff";
    }
    fontColorChange(event: any) {
        console.log("Fontcolor", event);
        this.fontAutocadColor = +event.AutoCadColorId;

    }
    okComment(event: any) { //common submit for add and edit comment
        var selectedItemsArray = JSON.parse(event.fieldobject);
        var contextObj = this;
        contextObj.markupText = Text;
        //contextObj.showSlide = !this.showSlide;
        contextObj.showMarkupComment = false;
        contextObj.markupFontStyle = contextObj.markupCommentData[0].LookupDetails.LookupValues[selectedItemsArray[0].Value - 2].Value;
        contextObj.markupFontSize = contextObj.markupCommentData[1].LookupDetails.LookupValues[selectedItemsArray[1].Value - 2].Value;
        contextObj.markupText = selectedItemsArray[2].Value;
        console.log("markupFontStyle", contextObj.markupFontStyle, contextObj.markupFontSize, contextObj.markupText, contextObj.fontAutocadColor);
        contextObj.markupObj.addcommentsOnClick(contextObj.markupStartX, contextObj.markupStartY, contextObj.markupFontStyle, contextObj.markupFontSize, contextObj.markupText, contextObj.markupBold, contextObj.markupItalic, contextObj.fontAutocadColor, contextObj.isEditComment, function (retCode) {
            if (retCode == 0) {
                contextObj.hasActiveMarkups++;
                contextObj.isEditComment = false;
            }
        });
        contextObj.showMarkupComment = false;
        //if (contextObj.showMarkupDescription)
        //    contextObj.showMarkupDescription = false;
    }
    //************ delete markups ************//
    deleteOnClick() {
        if (this.showMarkupDescription)
            this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        var contextObj = this;
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            var contextObj = this;
            contextObj.markupObj.hasMarkupsIndrawing(function (retCode) {
                if (retCode != 0)
                    contextObj.notificationService.ShowToaster("No new Markups exist", 3);
                else {
                    contextObj.markupObj.deleteMarkup(function (entityHandle) {
                        if (entityHandle != "") {
                            contextObj.markupDeletehandle = entityHandle;
                            contextObj.showSlideConfirm = true;
                        }
                        else {
                        }
                    });
                }
            });
            //if (contextObj.hasActiveMarkups > 0) {
            //    this.deleteMarkupYesClick();
            //}
        }
    }
    deleteMarkupYesClick() {
        var contextObj = this;
        this.showSlideConfirm = false;
        contextObj.objiWhiz.deleteEntity(contextObj.markupDeletehandle, function (retCode) {
            if (retCode != 0)
                alert("deleteEntity returned with error code : " + retCode);
        });
    }
    deleteMarkupNoClick() {
        this.showSlideConfirm = false;
    }
    //******************Markup********************//
    rectangleOnClick() {
        //if (this.showMarkupDescription)
        //    this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            this.hasActiveMarkups++;
            this.markupObj.rectangleOnClick(this.lineThickness, this.lineAutocadColor);
        }
    }
    cloudOnClick() {
        //if (this.showMarkupDescription)
        //    this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            this.hasActiveMarkups++;
            this.markupObj.cloudOnClick(this.lineThickness, this.lineAutocadColor);
        }
    }
    ellipseOnClick() {
        //if (this.showMarkupDescription)
        //    this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            this.hasActiveMarkups++;
            this.markupObj.ellipseOnClick(this.lineThickness, this.lineAutocadColor);
        }
    }
    freehandOnClick() {
        //if (this.showMarkupDescription)
        //    this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            this.hasActiveMarkups++;
            this.markupObj.freehandOnClick(this.lineThickness, this.lineAutocadColor);
        }
    }
    lineOnClick() {
        //if (this.showMarkupDescription)
        //    this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            this.hasActiveMarkups++;
            this.markupObj.lineOnClick(this.lineThickness, this.lineAutocadColor);
        }
    }
    moveOnClick() {
        //if (this.showMarkupDescription)
        //    this.showMarkupDescription = false;
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        var contextObj = this;
        if (this.isMarkupSaved)
            this.notificationService.ShowToaster("Markup already saved, cannot be modified", 5);
        else {
            contextObj.markupObj.hasMarkupsIndrawing(function (retCode) {
                if (retCode != 0)
                    contextObj.notificationService.ShowToaster("No new Markups exist", 3);
                else {
                    contextObj.markupObj.moveOnClick();
                }
            });
        }
    }

    onChangeLineThickness(value: any) { // change line thickness
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        console.log("ttt", this.ratioValue);
        this.lineThickness = value;//* this.ratioValue[0];
    }

    lineColorChange(event: any) { //change line color
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        this.lineAutocadColor = +event.AutoCadColorId;
    }
    maximizeOnClick(event: any) {
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //    return;
        this.islowResolution = false;
        if (this.isWaitMode())
            return;
        var contextObj = this;
        this.positionExpand = "fixed";
        this.displayMaximize = "none";
        this.displayMinimize = "initial";
        setTimeout(function () {
            var width, height;
            var canvas = contextObj.canvasElement;
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;//window.innerHeight - 56;
            var topOffset = window.innerHeight - height;
            contextObj.detailsWidth = "400";
            contextObj.objiWhiz.resize(width, height);
        }, 50);

    }
    minimizeOnClick(event: any) {
        //var status = [];
        //this.objiWhiz.isWaitMode(status);
        //if (status[0])
        //this.objiWhiz.exitWaitMode();
        if (this.isWaitMode())
            return;
        var contextObj = this;
        if (window.innerWidth <= 1024)
            contextObj.islowResolution = true;
        setTimeout(function () {
            var width, height;
            var canvas = contextObj.canvasElement;
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;//window.innerHeight - 56;
            var topOffset = window.innerHeight - height;
            contextObj.objiWhiz.resize(width, height);
            if (contextObj.moduleId == 14) {
                contextObj.detailsWidth = "300";
                if (window.innerWidth <= 1024) {
                    contextObj.detailsWidth = "50";
                    contextObj.splitviewDrawinggrid.secondaryArea = 45;
                }
                if (window.innerWidth <= 800) {
                    contextObj.detailsWidth = "30";
                }
            }

        }, 50);
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE");
        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
            msie = 1;
        }

        if (msie > 0) // If Internet Explorer, return version number
        {
            contextObj.positionExpand = "static";
        }
        else {
            contextObj.positionExpand = "initial";
        }
        contextObj.displayMaximize = "initial";
        contextObj.displayMinimize = "none";
    }
    //******************View/Hide markups form markuplist********************//
    markupViewFromList(markupListData: any) {
        var contextObj = this;
        this.visibleMarkupIds = [];
        this.viewMarkup(markupListData, 0, function (retCode) {
            contextObj.showSecondaryViewAsbuiltsTarget = -1;
            contextObj.splitviewDrawing.showSecondaryView = false;
        });
    }
    viewMarkup = function (markupListData, arrayCount, resCallback) {
        var contextObj = this;
        //for (var i = 0; i < markupListData.length; i++) {
        if (markupListData.length > arrayCount) {
            var xmlStringModified: string = "";
            var isView: boolean = markupListData[arrayCount].isView;
            var selectedMarkupId = markupListData[arrayCount].markupId;
            if (isView)
                contextObj.visibleMarkupIds.push(selectedMarkupId);
            var index = contextObj.markupLayerArray.findIndex(function (el) { return el.markupId === selectedMarkupId; });
            console.log("test1234", isView, selectedMarkupId, index);

            if (isView == true && index != -1) {
                var selectedLayerName = contextObj.markupLayerArray[index].layerName;
                console.log("selectedLayerName ", selectedLayerName);
                contextObj.objiWhiz.setLayerVisibility(selectedLayerName, true, function (retCode) {
                    contextObj.editMarkupLayerName = selectedLayerName;
                    arrayCount++;
                    contextObj.viewMarkup(markupListData, arrayCount, resCallback);
                });
            } else if (isView == false && index != -1) {
                var selectedLayerName = contextObj.markupLayerArray[index].layerName;
                contextObj.objiWhiz.setLayerVisibility(selectedLayerName, false, function (retCode) {
                    arrayCount++;
                    contextObj.viewMarkup(markupListData, arrayCount, resCallback);
                });

            } else if (isView == true && index == -1) {
                contextObj.drawingDetailsService.loadMarkupXmlString(contextObj.drawingId, contextObj.revisionNo, selectedMarkupId, contextObj.isBuildingDrawing).subscribe(function (resultData) {
                    xmlStringModified = resultData["Data"];
                    if (xmlStringModified != "File not found") {
                        var layerName = xmlStringModified.substring(xmlStringModified.search("<LAYERNAME>") + 11, xmlStringModified.search("</LAYERNAME>"));
                        contextObj.editMarkupLayerName = layerName;
                        let xmlString = xmlStringModified;//.replace(/0x5c/g, "\\");
                        //xmlString=xmlString.replace("0x5c", "\\"); 
                        console.log("xmlString : ", xmlString);
                        contextObj.markupLayerArray.push({ markupId: selectedMarkupId, layerName: layerName });
                        contextObj.objiWhiz.loadXMLString(xmlString, function (retCode) {
                            if (retCode != 0) {
                                console.log("loadXMLString failed due to ", retCode)
                                arrayCount++;
                                contextObj.viewMarkup(markupListData, arrayCount, resCallback);
                            }
                            else {
                                arrayCount++;
                                contextObj.viewMarkup(markupListData, arrayCount, resCallback);
                            }
                        });
                    } else {
                        arrayCount++;
                        contextObj.viewMarkup(markupListData, arrayCount, resCallback);
                    }
                });
            } else {
                arrayCount++;
                contextObj.viewMarkup(markupListData, arrayCount, resCallback);
            }

        }
        else
            resCallback(0)


    }
    viewProjectDrawingMarkup(selectedMarkupId) {
        var contextObj = this;
        var xmlStringModified: string = "";
        var projectId = contextObj.drawingDetails['ProjectId'];
        contextObj.drawingDetailsService.loadProjectDrawingMarkupXmlString(contextObj.drawingId, contextObj.revisionNo, selectedMarkupId, projectId).subscribe(function (resultData) {
            xmlStringModified = resultData["Data"];
            if (xmlStringModified != "File not found") {
                var layerName = xmlStringModified.substring(xmlStringModified.search("<LAYERNAME>") + 11, xmlStringModified.search("</LAYERNAME>"));
                contextObj.editMarkupLayerName = layerName;
                let xmlString = xmlStringModified;//.replace(/0x5c/g, "\\");
                //xmlString=xmlString.replace("0x5c", "\\"); 
                console.log("xmlString : ", xmlString);
                contextObj.markupLayerArray.push({ markupId: selectedMarkupId, layerName: layerName });
                contextObj.objiWhiz.loadXMLString(xmlString, function (retCode) {
                    if (retCode != 0) {
                        console.log("loadXMLString failed due to ", retCode)
                    }
                });
            } else {
                contextObj.notificationService.ShowToaster("Markup File Not Found", 3)
            }
        });
    }
    editMarkupOnClick(markupListData: any) {
        var contextObj = this;
        contextObj.selectedEditmarkupData = markupListData;
        contextObj.markupObj.setEditMarkupData(markupListData);
        this.visibleMarkupIds = [];
        contextObj.markupObj.hasMarkups(function (retCode, isEdit) {
            if (retCode == 0) {
                if (isEdit)
                    contextObj.markupSaveMessage = "Do you want to save the Markup?";
                else
                    contextObj.markupSaveMessage = "Do you want to save the newly added Markup?";
                contextObj.showSlideMarkup = true;
            }
            else {

                contextObj.markupObj.isMarkupEdit = true;
                contextObj.editMarkupLayerName = "";
                contextObj.viewMarkup(markupListData, 0, function (retCode) {
                    contextObj.showSecondaryViewAsbuiltsTarget = -1;
                    contextObj.splitviewDrawing.showSecondaryView = false;
                    contextObj.markupObj.layerName = contextObj.editMarkupLayerName;
                });
            }
        });
    }
    closeSlideConfirmDialog(value: any) {
        this.showSlideMarkup = value.value;
    }
    okMarkupSave() {
        this.showSlideMarkup = false;
        this.saveOnClick();
    }
    noMarkupSave() {
        var contextObj = this;
        this.showSlideMarkup = false;
        this.objiWhiz.deleteLayer(this.markupObj.layerName, function (retCode) {
            contextObj.editMarkupOnClick(contextObj.selectedEditmarkupData);
        });
    }
    //******* delete layer on markup delete *****//
    onMarkupDeleteLayer(markupId: number) {
        let layerName;
        this.objiWhiz.deleteLayer(layerName, function (retCode) {
            if (retCode != 0)
                console.log("deletelayer faild due to", retCode);
        });
    }
    onDeletemarkupClick(selectedMarkupId: any) {
        var contextObj = this;
        console.log("contextObj.markupLayerArray", contextObj.markupLayerArray);
        console.log("contextObj.markupLayerInsertArray", contextObj.markupLayerInsertArray);
        var markupId = selectedMarkupId;
        if (this.markupId == selectedMarkupId) {
            this.isMarkupSaved = false;
            this.markupObj.isMarkupDelete();
        }
        if (contextObj.markupLayerArray.length > 0) {

            var index = contextObj.markupLayerArray.findIndex(function (el) { return el.markupId === markupId; });
            console.log("index", index);
            if (index != -1) {
                var selectedLayerName = contextObj.markupLayerArray[index].layerName;
                contextObj.objiWhiz.deleteLayer(selectedLayerName, function (retCode) {
                    if (retCode != 0)
                        console.log("deletelayer faild due to", retCode);
                });
            }
        }
        if (contextObj.markupLayerInsertArray.length > 0) {
            var index = contextObj.markupLayerInsertArray.findIndex(function (el) { return el.markupId === markupId; });
            if (index != -1) {
                var selectedLayerName = contextObj.markupLayerInsertArray[index].layerName;
                contextObj.objiWhiz.deleteLayer(selectedLayerName, function (retCode) {
                    if (retCode != 0)
                        console.log("deletelayer faild due to", retCode);
                });
            }
        }

    }

    closeSlideDialog(value: any) { //slide close click
        if (this.showMarkupComment)
            this.showMarkupComment = false;
        if (this.showSlideConfirm)
            this.showSlideConfirm = false;
        if (this.showSlide)
            this.showSlide = false;
        if (this.isMarkupSaved)
            this.isMarkupSaved = false;
        if (this.isEditComment)
            this.isEditComment = false;
        if (this.showSlideTotalize)
            this.showSlideTotalize = false;
        if (this.showSearchSlide)
            this.showSearchSlide = false;
        if (this.showSlideEmp)
            this.showSlideEmp = false;
        if (this.showdelinkconfirmationSlide)
            this.showdelinkconfirmationSlide = false;
        if (this.showMoveOutsideSpace)
            this.showMoveOutsideSpace = false;
        if (this.showMultipleHotelingSeats)
            this.showMultipleHotelingSeats = false;
        if (this.showEmployeeMoveRequest)
            this.showEmployeeMoveRequest = false;
        if (this.showEmpMoveResources)
            this.showEmpMoveResources = false;
        if (this.ShowScaleFactor)
            this.ShowScaleFactor = false;
        if (this.ShowTextHeight)
            this.ShowTextHeight = false;
        if (this.ShowConnectComponent)
            this.ShowConnectComponent = false;
        if (this.ShowConnectAgain)
            this.ShowConnectAgain = false;
        if (this.ShowRemoveConnection)
            this.ShowRemoveConnection = false;
        if (this.ShowSearchForSpace)
            this.ShowSearchForSpace = false;
        if (this.ConnectAnotherDrawing)
            this.ConnectAnotherDrawing = false;
        if (this.showObjectDrawingslide)
            this.showObjectDrawingslide = false;

    }
    onSearchInDrawing(searchData: any) {
        var contextObj = this;
        this.isBlink = true;
        switch (searchData.moduleId) {
            case 3:
            case 12:
                this.spaceObj.searchInDrawing(searchData.searchItems, function (selectedHandles) {
                    contextObj.selectedHandles = selectedHandles;
                });
                break;
            case 5: this.employeeDrawingObj.searchInDrawing(searchData.searchItems, function (selectedHandles) {
                contextObj.selectedHandles = selectedHandles;
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
                this.objectsDrawingObj.searchInDrawing(searchData.searchItems, function (selectedHandles) { });
                break;
            case 14: this.schedulingDrawingObj.searchInDrawing(searchData.searchItems, function (selectedHandles) { });
                break;

        }
    }
    //*********** Space ************//

    // edit space data
    editSpaceData(target) {
        var contextObj = this;
        var isShareSpace = true;
        var isShare = false;
        contextObj.drawingIdForSpace = [contextObj.drawingId];

        contextObj.spaceObj.getSpaceFields(contextObj.spaceIdForEdit, target, function (retCode, fieldData, userRoleId, showbtndeassign) {

            if (retCode == 0) {
                contextObj.sessionUserRoleId = userRoleId;
                contextObj.fieldDetailsSpace = fieldData;

                contextObj.administrationService.getCustomerSubscribedFeatures("156").subscribe(function (rt) {
                    if (rt["Data"][0].IsSubscribed == true && contextObj.moduleacess != false && contextObj.userRoleId != 7) {
                        contextObj.fieldDetailsSpace.filter(function (item) {
                            if (item.ReportFieldId === 783 && item.FieldValue != "4") {
                                isShareSpace = false;
                                return true;
                            }
                            if (item.FieldLabel == "IsShared" && contextObj.userRoleId != 7) {
                                if (item.FieldValue == "False") {
                                    contextObj.strPopupText = "Share Space"
                                }
                                else {
                                    contextObj.strPopupText = "View"
                                    isShare = true;
                                }
                                return true;
                            }
                        })
                        contextObj.fieldDetailsSpace.filter(function (item) {
                            if (item.FieldId == 737 && isShareSpace == true) {
                                item.LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                                if (isShare == true && contextObj.userRoleId != 7) {
                                    item.FieldLabel = item.FieldLabel + ": Shared";
                                    item.ReadOnlyMode = true;
                                    item.IsEnabled = false;
                                }
                                return true
                            }
                            if (item.ReportFieldId == 292 && isShareSpace == true && isShare == true) {
                                item.ReadOnlyMode = true;
                                item.IsEnabled = false;
                                return true
                            }
                            if (item.ReportFieldId == 294 && isShareSpace == true && isShare == true) {
                                item.ReadOnlyMode = true;
                                item.IsEnabled = false;
                                return true
                            }
                            if (item.ReportFieldId == 296 && isShareSpace == true && isShare == true) {
                                item.ReadOnlyMode = true;
                                item.IsEnabled = false;
                                return true
                            }
                            if (item.ReportFieldId == 298 && isShareSpace == true && isShare == true) {
                                item.ReadOnlyMode = true;
                                item.IsEnabled = false;
                                return true
                            }
                        });
                    }

                });


                contextObj.showSecondaryViewEmployeeTarget = -1;
                contextObj.showSecondaryViewEmployeeTarget = -1;
                contextObj.showSecondaryViewObjectTarget = -1;
                contextObj.showSecondaryViewSpaceScheduleTarget = -1;
                if (target == 1) {
                    contextObj.showSecondaryViewSpaceTarget = 2;
                    contextObj.pageTitle = "Edit Space Data";
                } else if (target == 2) {
                    contextObj.showbtndeassign = showbtndeassign;
                    contextObj.showSecondaryViewSpaceTarget = 4;
                    contextObj.pageTitle = "Assign Space Standard";
                }
                contextObj.splitviewDrawing.showSecondaryView = true;
            }
            else
                contextObj.notificationService.ShowToaster("User has no privilege to edit this Space", 2);
        });
    }
    //assign space standard
    assigneSpaceStandardOnClick() {

    }
    //update edited space data
    spaceEditReturnData(data: any, target: number, isEdit: boolean) {
        if (data && data.returnData && data.returnData.length > 0) {
            this.showSecondaryViewSpaceTarget = -1;
            var contextObj = this;
            let spaceEditReturnData = JSON.parse(data.returnData)[0];
            if (contextObj.moduleId == 3 || contextObj.moduleId == 14 || contextObj.moduleId == 12) {
                contextObj.updatedSpaceData = [];
                contextObj.updatedSpaceData.push({ "event": data, "isEdit": isEdit });
            }
            if (contextObj.moduleId == 14 && isEdit == false) {
                contextObj.updateWorkSpaceData = [];
                contextObj.updateWorkSpaceData.push({ "action": contextObj.schdulingDataInDrawingTabindex });//to update data in grid
            }
            contextObj.spaceObj.spaceEditReflectInDrawing(spaceEditReturnData, function (retCode) {
                if (target == 1) {
                    if ((isEdit == false && data["target"] != 2) || (isEdit == true))
                        contextObj.splitviewDrawing.showSecondaryView = false;
                }
                if (contextObj.moduleId == 14 && isEdit == false && (spaceEditReturnData['SeatingAssignmentTypeId'] == 1 || spaceEditReturnData['SeatingAssignmentTypeId'] == 5 || spaceEditReturnData['SeatingAssignmentTypeId'] == 6)) {
                    //debugger
                    contextObj.schedulingDrawingObj.reArrangeSeats(spaceEditReturnData['SpaceId'], function (res) {

                    });
                } else if (contextObj.moduleId == 14 && isEdit == false && (spaceEditReturnData['SeatingAssignmentTypeId'] == null || spaceEditReturnData['SeatingAssignmentTypeId'] == 2)) {
                    contextObj.schedulingDrawingObj.deleteSeatsDeassign(spaceEditReturnData['SpaceId']);
                }

            });
        }
    }
    onMultipleEditSpaceData(event) {
        this.spaceObj.onMultipleEditSpaceDataReflectInDrawing(event.data);
    }
    distributionMouseOver() {
        this.visibilityOfDistributionMenu = "visible"
    }
    distributionMouseOut() {
        this.visibilityOfDistributionMenu = "hidden";
    }
    spaceMoreMenuMouseOver() {
        this.visibilityOfspaceMoreMenu = "visible"
    }
    spaceMoreMenuMouseOut() {
        this.visibilityOfspaceMoreMenu = "hidden";
    }
    empMoreMenuMouseOver() {
        this.visibilityOfempMoreMenu = "visible"
    }
    empMoreMenuMouseOut() {
        this.visibilityOfempMoreMenu = "hidden";
    }
    toolsMenuMouseOver() {
        this.visibilityOfToolsMenu = "visible"
    }
    toolsMenuMouseOut() {
        this.visibilityOfToolsMenu = "hidden";
    }
    objectsMoreMenuMouseOver() {
        this.visibilityOfobjectsMoreMenu = "visible"
    }
    objectsMoreMenuMouseOut() {
        this.visibilityOfobjectsMoreMenu = "hidden";
    }
    spaceMoreMenuOnClick(menuData: any) {
        if (this.isWaitMode())
            return;
        var contextObj = this;
        switch (menuData.menuId) {
            case 0: var isExist = [0];
                this.objiWhiz.layerExists("$LEGEND", isExist);
                if (isExist[0]) {
                    if (this.isSpaceTotalizeLegend) {
                        this.objiWhiz.deleteLayer("$LEGEND", function (retCode) {
                            contextObj.addTotalizeLegendOnClick();
                        });
                    } else {
                        this.notificationService.ShowToaster("Select an insertion point to add legend", 2);
                        if (!this.isOccupancydistSelected) {
                            if (contextObj.moduleId == 12 && contextObj.pageTarget == 10)
                                this.archiveDrawingObj.moveLegend();
                            else
                                this.spaceObj.moveLegend();
                        } else
                            this.employeeDrawingObj.moveLegend();
                    }
                }
                else
                    this.notificationService.ShowToaster("No Legend added", 2);
                break;
            case 1: this.notificationService.ShowToaster("Select points to Measure Distance", 2);
                this.spaceObj.measurePointToPointDistance(function (retCode) {
                    if (retCode == 0)
                        contextObj.isHatch = true;
                });
                break;
            case 2: if (this.spaceObj.isLayerEnable()) {
                this.notificationService.ShowToaster("Select points to Measure Distance", 2);
                this.spaceObj.measureWallToWallDistance(function (retCode) {
                    if (retCode == 0)
                        contextObj.isHatch = true;
                });
            } else {
                if (this.isSpace)
                    this.notificationService.ShowToaster(this.spaceObj.commonServices.spacelayerName + "layer is not displayed in the drawing.Enable " + this.spaceObj.commonServices.spacelayerName + " layer in Layers for Measure Distance with Snap", 2);
                else
                    this.notificationService.ShowToaster(this.spaceObj.commonServices.netLayername + "layer is not displayed in the drawing.Enable " + this.spaceObj.commonServices.netLayername + " layer in Layers for Measure Distance with Snap", 2);
            }
                break;
            case 3: this.notificationService.ShowToaster("Click and draw to Measure Area. Right click to exit", 2);
                this.spaceObj.measureArea(function (retCode) {
                    if (retCode == 0)
                        contextObj.isHatch = true;
                });
                break;
            case 4: this.notificationService.ShowToaster("Select a Space", 2);
                this.highlightRowIds = [];             
                this.spaceEditAndAssignSpaceStandard(1);
                break;
            case 5:

                this.notificationService.ShowToaster("Select the Space for which Space Standard is to be set", 2);
                this.spaceEditAndAssignSpaceStandard(2);
                break;
            case 6: this.moveTextOnClick(1);
                break;
            //case 6: this.distibutionMapArchiveDrawings({ FieldId: -4, FieldNameWithId: "-4^CAI Space Driver", FieldName: "CAI Space Driver" });
            //    break;
            case 8: this.SearchForSpace({ event: "init" });
                break;
            case 9: this.moveTextOnClick(2);
                break;
            case 10: this.moveTextOnClick(3);
                break;
            case 11: this.selectMultipleSpaceByWindowOnClick();
                break;
            case 12: this.showTotalizeOnClick();
                break;
            case 20: this.reserveRoomOnClick();
                break;
            case 21: this.reserveSeatOnClick();
                break;
            case 22: this.moveSeatOnClick();
                break;
            case 23: this.SearchForSpace({ event: "init" });
                break;
            case 619:
                debugger
                var contextObj = this;
                var g_strEmpSymbolCords = "-1.25,3.125;-2.5,0.625;-3.75,-1.875;-5,-4.375;-6.25,-6.875;-4.25,-6.875;-2.25,-6.875;0.25,-6.875;2.25,-6.875;4.25,-6.875;6.25,-6.875;1.25,3.125;2.5,4.375;2.5,5.625;1.25,6.875;-1.25,6.875;-2.5,5.625;-2.5,4.375;-1.25,3.125;1.25,3.125;";
                g_strEmpSymbolCords = g_strEmpSymbolCords.replace(/,/g, contextObj.columnDelimiter);
                g_strEmpSymbolCords = g_strEmpSymbolCords.replace(/;/g, contextObj.rowDelimiter);
                this.objiWhiz.getOrderedSymbolPosition("A613", g_strEmpSymbolCords ,"5", function (retCode, insertPositions, ScaleFactor) {
                    debugger
                });
                //var ratio = [0];
                //this.objiWhiz.clientDWGAreaRatio(ratio);
                //var spaceDataTemp = "{ListReportFieldIdValues:[{\"ReportFieldId\":271,\"Value\":\"" + this.moduleId + "\"},{\"ReportFieldId\":781,\"Value\":\"" + this.drawingId + "\"}]}";
                //var displaystngTemp = "{ListReportFieldIdValues:[{\"ReportFieldId\":182,\"Value\":\"" + this.spaceObj.categoryId + "\"},{\"ReportFieldId\":24,\"Value\":\"" + this.spaceObj.addtlDataFieldCategoryId + "\"}]}"
                //this.objiWhiz.test(this.drawingId, this.moduleId, spaceDataTemp, displaystngTemp, ratio, function (retCode, entityHandles) {
                //    debugger    
                //});
                break;
        }
    }
    moveTextOnClick(target) {//1 space text move , 2 floor gross text move ,3 external wall text move
        var contextObj = this;
        contextObj.spaceObj.deHatch(function (retCode) {
            contextObj.deHatchVarablesClear
            if (target == 1) {
                contextObj.notificationService.ShowToaster("Select the Space for which the Text is to be moved", 2);
                contextObj.moveText();
            } else {
                if (target == 2)
                    contextObj.notificationService.ShowToaster("Select a Point for which the Floor Gross Text is to be moved", 2);
                else
                    contextObj.notificationService.ShowToaster("Select the a Point for which the External Wall Text is to be moved", 2)
                contextObj.spaceObj.moveGrossOrWallText(target, function (retCode) {
                    if (retCode == 0)
                        contextObj.notificationService.ShowToaster("Text moved", 3);
                    contextObj.objiWhiz.setCursor(1);
                });
            }
        });
    }
    moveText() {
        var contextObj = this;
        contextObj.objiWhiz.setCursor(2);
        contextObj.spaceObj.getSelectedSpaceId(function (retCode, selectedSpaceId, selectedXPos, selectedYPos) {
            if (retCode == 0) {
                contextObj.notificationService.ShowToaster("Select an insertion point", 2);
                contextObj.spaceObj.hasPrivilageExists(selectedSpaceId, function (hasPrivilage) {
                    if (hasPrivilage) {

                        contextObj.spaceObj.invokeSpaceMoveText(selectedSpaceId, selectedXPos, selectedYPos, function (res) {
                            contextObj.notificationService.ShowToaster("Text moved", 3);
                            contextObj.objiWhiz.setCursor(1);
                        });
                    } else {
                        contextObj.notificationService.ShowToaster("User has no privilege to move text from this Space", 2);
                        contextObj.moveText();
                    }
                });
            } else if (retCode == 1) {
                contextObj.notificationService.ShowToaster("Click inside the space you wish to select", 2);
                contextObj.moveText();
            } else {
                contextObj.objiWhiz.setCursor(1);
            }
        });
    }
    empMoreMenuOnClick(menuData: any) {
        if (this.isWaitMode())
            return;
        var contextObj = this;
        switch (menuData.menuId) {
            case 0: this.deAssignDeleteEmployeeOnClick(1, true);
                break;
            case 1: this.moveEmployeeOnClick();
                break;
            case 2: this.moveMultipleEmployeeOnClick();
                break;
            case 3: /*for scenario drawing move*/
                this.scenarioEmpMoveOnClick();
                break;
            case 4: /*for scenario drawing save scenario*/
                this.saveScenarioOnClick();
                break;
            case 5: this.EmployeeScaleFields();
                break;
            case 6: this.ResetEmployeeScale();
                break;
            case 7: this.EmployeeTextHeightFields();
                break;
            //case 8: this.SearchForSpace({event: "init"});
            //    break;
            case 9: this.RelinkEmployee();
                break;
            case 10: this.deAssignDeleteEmployeeOnClick(1, false);
                break;
            case 11: this.MoveEmployeeToAnotherFloor();
                break;
        }
    }
    EmployeeScaleFields() {
        var contextObj = this;
        var empcount = contextObj.employeeDrawingObj.empCount;
        if (empcount > 0) {
            contextObj.pageTitle = "Scale Employee";
            contextObj.btnName = "Save";
            contextObj.showSecondaryViewEmployeeTarget = 50;
            contextObj.splitviewDrawing.showSecondaryView = true;
        }
        else {
            contextObj.notificationService.ShowToaster("No Employees are assigned to this floor", 5);
        }
    }

    EmployeeTextHeightFields() {
        var contextObj = this;
        var empcount = contextObj.employeeDrawingObj.empCount;
        if (empcount > 0) {

            contextObj.pageTitle = "Employee Text Height";
            contextObj.btnName = "Save";
            contextObj.showSecondaryViewEmployeeTarget = 51;
            contextObj.splitviewDrawing.showSecondaryView = true;
        }
        else {
            contextObj.notificationService.ShowToaster("No Employees are assigned to this floor", 5);
        }

    }
    ResetEmployeeScale() {
        var contextObj = this;
        var empcount = contextObj.employeeDrawingObj.empCount;
        if (empcount > 0) {
            this.employeeDrawingObj.ScaleEmployeeReset(function (ret) {
                if (ret == 0) {
                    contextObj.scalefactorValue = 1;
                    var Reset = true;
                    contextObj.SaveScaleFactor(Reset);
                }
                else
                    console.log("Reset faild due to", ret);
            });
        }
        else {
            contextObj.notificationService.ShowToaster("No Employees are assigned to this floor", 5);
        }

        //contextObj.createEmployeeDataAndTooltipOnDrawing(employeeData, empDispSettingsData, ratio, function (retCode) {
        //    resCallback(retCode);
        //});  
    }

    SearchForSpace(event) {
        var contextObj = this;
        var newSource = event.newSource ? event.newSource.dataSource : "";

        if (event.event == "clear" || (event.event == "init" && contextObj.advancelookup.length <= 0)) {
            contextObj.IsShowStyle = contextObj.ShowSearchForSpace = true;

            if (contextObj.moduleId != 5) {
                contextObj.objectsService.SpaceForSearchfields().subscribe(function (resultData) {     //sss
                    debugger
                    contextObj.advancelookup = resultData["Data"].filter(function (item) {
                        item.IsVisible = true;
                        return true;
                    });
                    contextObj.toView = true;

                });
            }
            else{
            contextObj.EmployeeService.SpaceForSearchfield().subscribe(function (resultData) {
                if (newSource)
                    for (var i = 0; i < newSource.length; i++)
                        resultData["Data"].find(function (item) { return item.ReportFieldId === newSource[i].ReportFieldId }).IsVisible = false;


                resultData["Data"].find(function (item) { return item.ReportFieldId == 950 }).LookupDetails.LookupValues.sort(function (a, b) { return a.Id - b.Id; });
                resultData["Data"].find(function (item) {
                    var count3 = 0;
                    if (item.ReportFieldId == 947) {
                        item.IsEnabled = true;
                        item.FieldValue = "false";
                        count3++;
                    }
                    if (item.ReportFieldId == 945) {
                        item.IsEnabled = true;
                        item.FieldValue = "false";
                        count3++;
                    }
                    if (item.ReportFieldId == 946) {
                        item.IsEnabled = true;
                        item.FieldValue = "false";
                        count3++;
                    }
                    if (item.ReportFieldId == 948) {
                        item.IsEnabled = true;
                        item.FieldValue = "false";
                        count3++;
                    }
                    return count3 == 4;
                });

                var rfldArray = [950, 947, 945, 946, 948];
                var EmployeeControls = resultData["Data"].filter(function (item) {
                    return item.DataEntryControlId == 6 || item.ReportFieldId == 950;
                });

                for (var Id of rfldArray) {
                    var index = resultData["Data"].findIndex(function (item) { return item.ReportFieldId == Id });
                    resultData["Data"].splice(index, 1);
                }

                resultData.Data = resultData.Data.concat(EmployeeControls);

                contextObj.advancelookup = [];
                contextObj.advancelookup = resultData["Data"];
                contextObj.toView = true;
            });

           }
        }
        else
            contextObj.ShowSearchForSpace = !contextObj.ShowSearchForSpace;
    }


    SearchForSpaceSubmit(event: any) {
        var contextObj = this;
        if (contextObj.moduleId != 5) {
            var reportfieldIdArray: ReportFieldIdValues[] = [];

            contextObj.EmployeeService.GetSpaceSearchResults(JSON.stringify(reportfieldIdArray), contextObj.drawingId, JSON.stringify(event.fieldobject), false, false, false, false).subscribe(function (resultData) {
                debugger
                var SpaceIDS = [];
                contextObj.fieldObject = resultData["Data"];
                var spaceId = JSON.parse(contextObj.fieldObject["FieldBinderData"]);
                if (spaceId.length == 0) {

                    contextObj.notificationService.ShowToaster("No data exists for the search criteria", 3);
                    return;
                }

                for (var i = 0; i < spaceId.length; i++) {
                    SpaceIDS.push(spaceId[i].SpaceId);
                }
                contextObj.submitSpaceSearch(SpaceIDS);
                contextObj.ShowSearchForSpace = false;
            });

        }
        else {
            var Isvaccant, UnderOccupied, OverOccupied, NominalOccupied;

            var reportfieldIdArray: ReportFieldIdValues[] = [];

            var OccupiedValue = parseInt(event.fieldobject.find(function (item) { return item.ReportFieldId == 950 }).Value);

            reportfieldIdArray.push({
                ReportFieldId: 950,
                Value: OccupiedValue == -1 ? "" : OccupiedValue
            });


            var c = 0;
            event.fieldobject.find(function (item) {

                if (item.ReportFieldId == 950) {
                    item.Value = '';
                    c++;
                }
                if (item.ReportFieldId == 945) {
                    UnderOccupied = item.Value == 'true';
                    item.Value = '';
                    c++;
                }
                if (item.ReportFieldId == 946) {
                    OverOccupied = item.Value == 'true';
                    item.Value = '';
                    c++;
                }
                if (item.ReportFieldId == 947) {
                    Isvaccant = item.Value == 'true';
                    item.Value = '';
                    c++;
                }
                if (item.ReportFieldId == 948) {
                    NominalOccupied = item.Value == 'true';
                    item.Value = '';
                    c++;
                }
                return c == 5;
            });


            contextObj.EmployeeService.GetSpaceSearchResults(JSON.stringify(reportfieldIdArray), contextObj.drawingId, JSON.stringify(event.fieldobject), Isvaccant, UnderOccupied, OverOccupied, NominalOccupied).subscribe(function (resultData) {
                var SpaceIDS = [];
                contextObj.fieldObject = resultData["Data"];
                var spaceId = JSON.parse(contextObj.fieldObject["FieldBinderData"]);
                if (spaceId.length == 0) {

                    contextObj.notificationService.ShowToaster("No data exists for the search criteria", 3);
                    return;
                }

                for (var i = 0; i < spaceId.length; i++) {
                    SpaceIDS.push(spaceId[i].SpaceId);
                }
                contextObj.submitSpaceSearch(SpaceIDS);
                contextObj.ShowSearchForSpace = false;
            });
        }

    }

    toolsMenuOnClick(menuData: any) {
        if (this.isWaitMode())
            return;
        var contextObj = this;
        switch (menuData.menuId) {
            case 0: this.displaySettingsOnClick();
                break;
            case 1: this.deHatchOnClick();
                break;
            case 2: this.stopBlinkOnClick();
                break;
        }
    }
    plotSettingsOnclick() {
        var contextObj = this;
        this.objiWhiz.saveForPlot(false, 1, function (retCode, FilePath) {
            var hostName = window.location.hostname
            var protocol = window.location.protocol;

            //var Url = protocol + "://" + hostName + "/PlotDrawingView/DrawingView?Value=" + FilePath
            var Url = contextObj.plotSettingsConfigKey + "DrawingView?Value=" + FilePath

            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE");
            if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                msie = 1;
            }
            if (msie > 0) // If Internet Explorer, return version number
            {
                window.open(Url, '_blank');
            } else {
                contextObj.plotMessage = Url;
                contextObj.showSlidePlot = true;
            }
        });
    }
    closePlot() {
        this.showSlidePlot = false;
    }

    customisedistributionMapOnClick(menudata: any) {
        if (this.isWaitMode())
            return;
        var contextObj = this;
        if (value1 != "-4") {
            contextObj.spaceService.deleteDistributionMaponDrawing().subscribe(function (resultData) {        //deleteDistributionMaponDrawing
            });
        }
        var value1;
        var fieldobj = new Array<ReportFieldArray>();
        switch (menudata.FieldId) {
            case 290: value1 = 1;
                break;
            case 292: value1 = 2;
                break;
            case 294: value1 = 3;
                break;
            case 296: value1 = 4;
                break;
            case 298: value1 = 5;
                break;
            case -1: value1 = -2;
                break;
            case 0: value1 = 0;
                break;
            //case -2: value1 = -2;
            //    break;
            default: value1 = menudata.FieldId;
                break;
        }
        if (contextObj.objModuleIds.indexOf(contextObj.moduleId) > -1 && contextObj.isXrefExists) {
            contextObj.drawingIdForDistMap = contextObj.xrefedDrawingId;
        }
        if (value1 != -4) {
            fieldobj.push({
                ReportFieldId: 289,
                Value: value1
            });
            fieldobj.push({
                ReportFieldId: 781,
                Value: this.drawingIdForDistMap.toString()
            });
            fieldobj.push({
                ReportFieldId: 278,
                Value: this.moduleId.toString()
            });
            fieldobj.push({
                ReportFieldId: 20,
                Value: value1
            });
        }
        if (value1 > 0 && value1 < 6) {
            contextObj.spaceService.getDistributionMapSettingsnDrawingsData(fieldobj, value1, -1).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                if (contextObj.itemsSource.length == 0) {
                    contextObj.notificationService.ShowToaster("No " + menudata.FieldName + "(s) are assigned to this floor", 2);
                }
                else {
                    contextObj.splitviewDrawing.showSecondaryView = true;
                    contextObj.distributionMapSettongonDrawing = true;
                    contextObj.showSecondaryViewObjectTarget = -1;
                    contextObj.showSecondaryViewEmployeeTarget = -1;
                    contextObj.showSecondaryViewSpaceScheduleTarget = -1;
                    contextObj.showSecondaryViewSpaceTarget = 5;
                    contextObj.value = menudata.FieldId;
                    contextObj.fieldname = menudata.FieldName;
                    contextObj.pageTitle = "Customize Distribution Map Settings";//"Select " + menudata.FieldName + " & Color";
                }
            });
        }
        else if (value1 == "-4") {
            contextObj.splitviewDrawing.showSecondaryView = true;
            contextObj.distributionMapSettongonDrawing = true;
            contextObj.showSecondaryViewObjectTarget = -1;
            contextObj.showSecondaryViewEmployeeTarget = -1;
            contextObj.showSecondaryViewSpaceScheduleTarget = -1;
            contextObj.showSecondaryViewSpaceTarget = 5;
            contextObj.value = menudata.FieldId;
            contextObj.fieldname = menudata.FieldName;
            contextObj.pageTitle = "Customize Distribution Map Settings";//"Select " + menudata.FieldName + " & Color";

        }
        else {
            contextObj.spaceService.getDistributionMapSettingsnDrawingsData(fieldobj, 0, value1, menudata.FieldName).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                if (contextObj.itemsSource.length == 0) {
                    contextObj.notificationService.ShowToaster("No " + menudata.FieldName + "(s) are assigned to this floor", 2);
                }
                else {
                    contextObj.splitviewDrawing.showSecondaryView = true;
                    contextObj.distributionMapSettongonDrawing = true;
                    contextObj.showSecondaryViewObjectTarget = -1;
                    contextObj.showSecondaryViewEmployeeTarget = -1;
                    contextObj.showSecondaryViewSpaceScheduleTarget = -1;
                    contextObj.showSecondaryViewSpaceTarget = 5;
                    contextObj.value = menudata.FieldId;
                    contextObj.fieldname = menudata.FieldName;
                    contextObj.pageTitle = "Customize Distribution Map Settings";//"Select " + menudata.FieldName + " & Color";
                }
            });
        }
    }

    submitSuccessDistMap(menuData: any) {
        this.splitviewDrawing.showSecondaryView = false;
        this.distributionMapSettongonDrawing = false;
        if (this.moduleId == 12 && this.pageTarget == 10) {
            this.distibutionMapArchiveDrawings(menuData);
        } else {
            this.distributionMapOnClick(menuData);
        }
    }

    objectsMoreMenuOnClick(menuData: any) {
        debugger
        if (this.isWaitMode())
            return;
        var contextObj = this;
        contextObj.contextMenuVisibility = false;
        var evnt = document.createEvent("CustomEvent");
        evnt.initCustomEvent('ContextMenuEvent', true, true,
            { 'xPos': 0, 'yPos': 0 });
        document.dispatchEvent(evnt); // to hide context menu
        contextObj.objectsDrawingObj.deHatchObjects(function (rtn) {
            contextObj.spaceObj.deHatch(function (retCode) {
                contextObj.deHatchVarablesClear();
                switch (menuData.menuId) {
                    case 0:
                        //contextObj.moveAssetOnClick();
                        contextObj.moveObjectOnClick(1);
                        break;
                    case 1: contextObj.moveMultipleAssetOnClick();
                        break;
                    case 2: contextObj.DelinkObjectOnClick(1);
                        break;
                    case 3: contextObj.ConnectComponentInDrawing();
                        break;
                    case 4: contextObj.RemoveConnections();
                        break;
                    case 5: contextObj.RotateObject(1);
                        break;
                    case 10: contextObj.selectObjectsonClick();
                        break;
                    case 6: contextObj.ShowConnection();
                        break;
                    case 7: contextObj.OrphanObjects();
                        break;
                    case 11: contextObj.SnapObject_OnClick(2, 1);
                        break;
                    case 12: contextObj.SnapObject_OnClick(2, 2);
                        break;
                    case 13: contextObj.SnapObject_OnClick(2, 3);
                        break;
                    case 619: contextObj.testMove();
                        break;

                }
            });
        });
    }

    testMove() {
        debugger
        var contextObj = this;
        contextObj.objiWhiz.setCursor(12);
        contextObj.objiWhiz.getDWGPoint(function (retcode, xMinPos, yMinPos) {
            if (retcode == 0) {
                contextObj.objiWhiz.getEntityWithDWGPoint(contextObj.objectsDrawingObj.drawinglayerNameForSelectEntity, contextObj.objectsDrawingObj.typeIDForSelectEntity, xMinPos, yMinPos, 12, function (retCodeEntity, selectedhandle) {
                    if (retCodeEntity == 0) {
                        var handles = [];
                        handles = selectedhandle.split('§')
                        handles.pop();
                        contextObj.objectsDrawingObj.isBlockOrSymbolHandle(handles, function (handletype, selectedSymbolhandle) {
                            if (handletype == 1) {
                                contextObj.objectsDrawingObj.hatchObject(selectedSymbolhandle, function (retCode) {
                                    contextObj.objiWhiz.startSvgTrails(selectedSymbolhandle, xMinPos, yMinPos, function (retCode) { });
                                    contextObj.objiWhiz.getDWGPoint(function (retcode, NewxPos, NewyPos) {
                                        if (retCodeEntity == 0) {
                                            var objectId = contextObj.objectsDrawingObj.getObjectIdFromSymbolHandle(selectedSymbolhandle);
                                            var midPoints = contextObj.objectsDrawingObj.getAssetXYCordinates(objectId);
                                            debugger
                                            contextObj.objiWhiz.moveSymbolTest(selectedSymbolhandle, "E364", "E363", xMinPos, yMinPos, NewxPos, NewyPos, midPoints, function (returnCode, actualPoints, rtnMidPoints) {
                                                debugger
                                                contextObj.objiWhiz.setCursor(1);
                                                contextObj.objiWhiz.regenerate();
                                                contextObj.objectsDrawingObj.deHatchObjects(function (retCode) {
                                                    contextObj.objiWhiz.stopSvgTrails();
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
                // contextObj.objiWhiz.setCursor(1);
                // contextObj.objiWhiz.regenerate();
            }
        });
    }

    selectObjectsonClick() {
        var contextObj = this;
        contextObj.editObjectSelectedId = 0;
        contextObj.editObjectClassId = 0;
        contextObj.editObjectSpaceId = 0;
        contextObj.selectedBlockRefHandle = '';
        contextObj.updateObjectDataSource = [];
        contextObj.objectXPosition = "";
        contextObj.objectYPosition = "";
        contextObj.objectAngle = "";
        this.objectsDrawingObj.selectObjectsonClick(function (retCode, objectId, objectClassId, handle, isSymbolHandle, spaceId) {
            contextObj.editObjectSpaceId = spaceId;
            if (isSymbolHandle == false)
                contextObj.selectedBlockRefHandle = handle;
            if (retCode == 0) {
                contextObj.objectsDrawingObj.hatchSingleObject(handle, function (res) {
                    if (objectId != undefined && objectId != null && objectId != "") {
                        //edit object
                        contextObj.editObjectSelectedId = objectId;
                        contextObj.editObjectClassId = objectClassId;
                        contextObj.objectsDrawingObj.EditInDrawing(contextObj.editObjectSpaceId, contextObj.editObjectSelectedId, contextObj.editObjectClassId.toString(), contextObj.drawingId.toString(), isSymbolHandle, function (fieldDetailsAdd) {
                            if (fieldDetailsAdd) {
                                contextObj.objectFieldDetailsAddEdit = fieldDetailsAdd;
                                contextObj.objectAddOrEdit = 'edit'
                                contextObj.pageTitle = "Edit " + contextObj.objectname + " Data";
                                contextObj.showSecondaryViewObjectTarget = 2;
                                contextObj.splitviewDrawing.showSecondaryView = true;
                            }
                        });
                    } else {
                        contextObj.objectsDrawingObj.getAddObjectsFields(function (fieldDetailsAdd) {
                            if (fieldDetailsAdd) {
                                contextObj.objectFieldDetailsAddEdit = fieldDetailsAdd;
                                contextObj.objectAddOrEdit = 'add'
                                contextObj.pageTitle = "Add " + contextObj.objectname + " Data";
                                contextObj.showSecondaryViewObjectTarget = 2;
                                contextObj.splitviewDrawing.showSecondaryView = true;
                            }
                        });
                    }
                });
            }
        });
    }

    ConnectComponentInDrawing() {
        var contextObj = this;
        if (contextObj.objectsDrawingObj.objectsData.length > 0) {
            contextObj.objectsService.getConnectivityRulesList(0, this.inputItem.sortCol, this.inputItem.sortDir, contextObj.objectCategoryId).subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    var ConnectivityStatus = 1;                   // 1 for connect 0 for remove
                    contextObj.notificationService.ShowToaster("Select the Component to set connectivity", 2);

                    contextObj.objectsDrawingObj.ConnectComponents(function (ret, ObjectId, classId) {
                        if (ret == 0) {
                            if (classId != undefined) {
                                contextObj.objectsService.getComponentConectivity(classId).subscribe(function (result) {
                                    var Connectivitycount = result["Data"][3].LookupDetails.LookupValues.length;
                                    if (Connectivitycount > 0) {
                                        contextObj.primaryObjectId = ObjectId;
                                        var reportfieldIdArray: ReportFieldIdValues[] = [];
                                        reportfieldIdArray.push({
                                            ReportFieldId: 4481,
                                            Value: ObjectId,
                                        });
                                        contextObj.objectsService.GetAssociationTypeForConnectivity(ObjectId).subscribe(function (result) {
                                            var controls = JSON.parse(result.FieldBinderData);
                                            if (controls.length > 0) {
                                                var objectCategoryId = contextObj.objectCategoryId;
                                                contextObj.fieldDetailsAdd1 = [];
                                                contextObj.fieldDetails = contextObj.fieldDetailsAdd1.concat(result.FieldBinderData, classId, objectCategoryId, ConnectivityStatus)
                                                contextObj.pageTitle = "Connect Components";
                                                contextObj.btnName = "Save";
                                                contextObj.showSecondaryViewObjectTarget = 53;
                                                contextObj.splitviewDrawing.showSecondaryView = true;
                                            }
                                            else { }
                                        });
                                    } else {
                                        contextObj.notificationService.ShowToaster("No Connectivity Rules defined to this Component Type", 2);
                                        return;
                                    }
                                });
                            }
                        }
                    });
                } else {
                    contextObj.notificationService.ShowToaster("No Connectivity Rules defined", 2);
                }
            });
        } else {
            contextObj.notificationService.ShowToaster("No component are assigned to this floor", 2);
        }
    }


    RemoveConnections() {
        var contextObj = this;
        if (contextObj.objectsDrawingObj.objectsData.length > 0) {
            contextObj.objectsService.getConnectivityRulesList(0, this.inputItem.sortCol, this.inputItem.sortDir, contextObj.objectCategoryId).subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0) {

                    var ConnectivityStatus = 0;// 1 for connect 0 for remove
                    var test: any = contextObj.fieldDetailsAdd1;
                    contextObj.fieldDetailsAdd1 = contextObj.fieldDetailsAdd1 == test ? [] : contextObj.fieldDetailsAdd1;
                    contextObj.notificationService.ShowToaster("Select the Component for which Connection is to be removed", 2);
                    contextObj.objectsDrawingObj.RemoveComponent(function (returnCode, ObjectId, classId) {
                        if (returnCode == 0) {
                            if (classId != undefined) {
                                contextObj.objectsService.getComponentConectivity(classId).subscribe(function (result) {
                                    var Connectivitycount = result["Data"][3].LookupDetails.LookupValues.length;
                                    if (Connectivitycount > 0) {
                                        contextObj.objectsService.GetAssociationTypeForConnectivity(ObjectId).subscribe(function (result) {
                                            var ClassName = JSON.parse(result.FieldBinderData)[0].Class;
                                            var ObjectName = JSON.parse(result.FieldBinderData)[0].ObjectNumber;
                                            contextObj.primaryObjectId = "";
                                            contextObj.primaryObjectId = ObjectId;
                                            contextObj.fieldDetailsAdd1 = [];
                                            contextObj.fieldDetails = contextObj.fieldDetailsAdd1.concat(result.FieldBinderData, classId, contextObj.objectCategoryId, ConnectivityStatus)
                                            contextObj.pageTitle = "Remove Component Connections";
                                            contextObj.btnName = "Save";
                                            contextObj.showSecondaryViewObjectTarget = 53;

                                            var reportfieldIdArray: ReportFieldIdValues[] = [];
                                            reportfieldIdArray.push({
                                                ReportFieldId: 649,
                                                Value: contextObj.objectCategoryId,
                                            });
                                            reportfieldIdArray.push({
                                                ReportFieldId: 4518,
                                                Value: ObjectId,
                                            });
                                            reportfieldIdArray.push({
                                                ReportFieldId: 669,
                                                Value: contextObj.drawingId,
                                            });
                                            reportfieldIdArray.push({
                                                ReportFieldId: 4508,
                                                Value: "0",
                                            });
                                            reportfieldIdArray.push({
                                                ReportFieldId: 4509,
                                                Value: "0",
                                            });
                                            reportfieldIdArray.push({
                                                ReportFieldId: 4510,
                                                Value: "0",
                                            });
                                            reportfieldIdArray.push({
                                                ReportFieldId: 4769,
                                                Value: contextObj.isBuildingDrawing,
                                            });
                                            contextObj.objectsService.getShowConectivityTreeView(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {
                                                if (result["Data"]["Table2"] == "[]") {
                                                    contextObj.notificationService.ShowToaster("No Connection established for " + ClassName + " \'" + ObjectName + "\'", 5);
                                                    contextObj.splitviewDrawing.showSecondaryView = false;
                                                } else
                                                    contextObj.splitviewDrawing.showSecondaryView = true;
                                            });
                                        });
                                    } else {
                                        contextObj.notificationService.ShowToaster("No Connectivity Rules defined to this Component Type", 2);
                                        return;
                                    }

                                });
                            }
                        }
                    });
                } else {
                    contextObj.notificationService.ShowToaster("No Connectivity Rules defined", 2);
                }

            });
        } else {
            contextObj.notificationService.ShowToaster("No component are assigned to this floor", 2);
        }
    }


    ShowConnection() {
        var contextObj = this;
        var ConnectivityStatus = 2;
        contextObj.objectsService.getConnectivityRulesList(0, this.inputItem.sortCol, this.inputItem.sortDir, contextObj.objectCategoryId).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.notificationService.ShowToaster("Select the Component to show connection", 2);
                contextObj.objectsDrawingObj.ConnectComponents(function (ret, ObjectId, classId) {
                    if (ret == 0) {
                        if (classId != undefined) {
                            contextObj.objectsService.getComponentConectivity(classId).subscribe(function (result) {
                                var Connectivitycount = result["Data"][3].LookupDetails.LookupValues.length;
                                if (Connectivitycount > 0) {
                                    contextObj.objectsService.GetAssociationTypeForConnectivity(ObjectId).subscribe(function (result) {
                                        var ClassName = JSON.parse(result.FieldBinderData)[0].Class;
                                        var ObjectName = JSON.parse(result.FieldBinderData)[0].ObjectNumber;
                                        contextObj.fieldDetailsAdd1 = [];
                                        contextObj.fieldDetails = contextObj.fieldDetailsAdd1.concat(result.FieldBinderData, ObjectId, contextObj.objectCategoryId, ConnectivityStatus, contextObj.isBuildingDrawing, contextObj.drawingId);
                                        contextObj.pageTitle = "Show Connections";
                                        contextObj.btnName = "Save";
                                        contextObj.showSecondaryViewObjectTarget = 54;


                                        var reportfieldIdArray: ReportFieldIdValues[] = [];
                                        reportfieldIdArray.push({
                                            ReportFieldId: 649,
                                            Value: contextObj.objectCategoryId,
                                        });
                                        reportfieldIdArray.push({
                                            ReportFieldId: 4518,
                                            Value: ObjectId,
                                        });
                                        reportfieldIdArray.push({
                                            ReportFieldId: 669,
                                            Value: contextObj.drawingId,
                                        });
                                        reportfieldIdArray.push({
                                            ReportFieldId: 4508,
                                            Value: "0",
                                        });
                                        reportfieldIdArray.push({
                                            ReportFieldId: 4509,
                                            Value: "0",
                                        });
                                        reportfieldIdArray.push({
                                            ReportFieldId: 4510,
                                            Value: "0",
                                        });
                                        reportfieldIdArray.push({
                                            ReportFieldId: 4769,
                                            Value: contextObj.isBuildingDrawing,
                                        });
                                        contextObj.objectsService.getShowConectivityTreeView(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {
                                            if (result["Data"]["Table2"] == "[]") {
                                                contextObj.notificationService.ShowToaster("No Connection established for " + ClassName + " " + " \'" + ObjectName + "\'", 5);
                                                contextObj.splitviewDrawing.showSecondaryView = false;
                                            }
                                            else
                                                contextObj.splitviewDrawing.showSecondaryView = true;
                                        });
                                    });
                                }
                                else {
                                    contextObj.notificationService.ShowToaster("No Connectivity Rules defined to this Component Type", 2);
                                    return;
                                }
                            });
                        }
                    }
                });
            } else
                contextObj.notificationService.ShowToaster("No Connectivity Rules defined", 2);
        });
    }
    ShowConnectionBlink(event) {

        var SecondaryObjectIdArray = [];
        var SecondaryObjectIDS = [];
        var PrimaryObjectId = event.PrimaryObjectId;
        SecondaryObjectIdArray = event.SecondaryObjectId;

        for (var i = 0; i < SecondaryObjectIdArray.length; i++) {
            SecondaryObjectIDS.push(+SecondaryObjectIdArray[i].ValueId);
        }

        var contextObj = this;
        contextObj.objectsDrawingObj.ShowConnectionBlink(PrimaryObjectId, SecondaryObjectIDS, function (ret) {
            contextObj.isHatch = true;
            contextObj.isBlink = true;
            if (ret == 0) {

                contextObj.splitviewDrawing.showSecondaryView = false;
            }
        });



    }

    //ddlComponenType(event) {
    //    debugger                               /*Connectivity Type Dropdown Change*/
    //    var contextObj = this;
    //    var secondaryClassId = parseInt(event.details.find(function (item) { return item.ReportFieldId == 4482 }).FieldValue);
    //    var associationId = parseInt(event.associationId);

    //    contextObj.objectsService.GetAssociationTypeForConnectivity(contextObj.primaryObjectId).subscribe(function (result) {
    //        var PrimaryComponentNoId = JSON.parse(result.FieldBinderData)[0].Id;

    //        contextObj.removeConnectivityDetails.emit(contextObj.assignedEmpIds);


    //        contextObj.objectsService.RemoveConnectivity(contextObj.objectCategoryId, contextObj.drawingId, contextObj.isBuildingDrawing, secondaryClassId, associationId, 0, PrimaryComponentNoId).subscribe(function (result) {
    //           debugger
    //            contextObj.fieldDetailsConnectivity = event.details;
    //            contextObj.connectivityFields = JSON.parse(result['FieldBinderData']);


    //        });
    //    });
    //}

    ComponentConnectivity(event) {

        this.removeConnectivityGrid = event.grid;
        this.isConnectivityConnect = event.connectivityStatus;
        this.GridSecondaryObjectId = event.GridObjectId;
        this.AssociationId = event.associationId;
        this.ConnectivityRemoveDatakey = event.gridDataKey;
        this.removeGridLengthInConnectivity = event.gridLength;
        if (this.isConnectivityConnect == 1) {
            var secondaryClassId = parseInt(event.details.find(function (item) { return item.ReportFieldId == 4482 }).FieldValue);
            var tempForToaster = event.details.find(function (item) {return item.FieldId == 2664; }).LookupDetails.LookupValues;
            this.SecondaryComponentTypeForToaster = tempForToaster.find(function (item){return item.Id == secondaryClassId }).Value;
            var contextObj = this;
            var reportfieldIdArray: ReportFieldIdValues[] = [];
            reportfieldIdArray.push({
                ReportFieldId: 649,
                Value: contextObj.objectCategoryId,
            });
            reportfieldIdArray.push({
                ReportFieldId: 669,
                Value: contextObj.drawingId,
            });
            reportfieldIdArray.push({
                ReportFieldId: 657,
                Value: secondaryClassId,
            });
            reportfieldIdArray.push({
                ReportFieldId: 4520,
                Value: contextObj.AssociationId,
            });
            reportfieldIdArray.push({
                ReportFieldId: 4769,
                Value: contextObj.isBuildingDrawing,
            });
            reportfieldIdArray.push({
                ReportFieldId: 656,
                Value: event.NewprimaryObjectId,
            });
            var tempDrawingId = [];
            var ShowConnectAnotherDrawing;
            contextObj.BlinkWithInDrawings = reportfieldIdArray;
            contextObj.BlinkOutSideDrawings = reportfieldIdArray;
            //    contextObj.objectsService.GetObjectAssociationToHatch(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {

            contextObj.objectsService.GetConnectToAnotherDrawing(JSON.stringify(reportfieldIdArray)).subscribe(function (Returnresult) {
                var tempDrawingIdTotalCount = JSON.parse(Returnresult.FieldBinderData).length;
                for (var i = 0; i < tempDrawingIdTotalCount; i++) {
                    tempDrawingId.push(JSON.parse(Returnresult.FieldBinderData)[i].DrawingId);
                }


                var tempDrawingIdCount = tempDrawingId.filter(function (item) { return item != contextObj.drawingId })
                if (tempDrawingIdCount.length > 0) { contextObj.ConnectAnotherDrawing = true }
                else
                    contextObj.ConnectWithInCurrentDrawing();





            });
        }
        else {
            this.ShowRemoveConnection = false;
            this.splitviewDrawing.showSecondaryView = false;
        }
    }
    ConnectOutsideCurrentDrawing() {

        var contextObj = this;
        contextObj.ConnectAnotherDrawing = false;
        contextObj.ConnectivitydrawingDetails = contextObj.BlinkWithInDrawings;
        var objectCategoryId = contextObj.objectCategoryId;
        var BlinkOutSideDrawings = contextObj.BlinkOutSideDrawings;
        var PrimaryObjectId = contextObj.primaryObjectId;
        var AssociationId = contextObj.AssociationId;
        contextObj.pageTitle = "Connectivity";
        contextObj.btnName = "Save";
        contextObj.isShowPrimaryDrawing = false;
        contextObj.showSecondaryViewObjectTarget = 55;
        contextObj.splitviewDrawing.showSecondaryView = true;

        // contextObj.objiWhiz.backupLib();

    }
    ConnectWithInCurrentDrawing() {
        var contextObj = this;
        var tempDrawingId = [];
        var ShowConnectAnotherDrawing;
        contextObj.ConnectAnotherDrawing = false;
        contextObj.objectsService.GetObjectAssociationToHatch(JSON.stringify(contextObj.BlinkWithInDrawings)).subscribe(function (result) {

            contextObj.fieldDetailsAdd1 = result.FieldBinderData == "[]" ? [] : result.FieldBinderData;
            var objectarry = JSON.parse(result.FieldBinderData);
            if (objectarry.length > 0) {

                var objIdsarray: any = [];
                for (var i = 0; i < objectarry.length; i++) {
                    objIdsarray.push(objectarry[i].ObjectId);
                }
                contextObj.ConnectedArrayOfConnectivity = objIdsarray;
                contextObj.objectarryLength = objectarry.length;

                contextObj.objectsDrawingObj.GetObjectAssociationToHatch(objIdsarray, function (ret) {
                    if (ret == 0) {
                        contextObj.splitviewDrawing.showSecondaryView = false;
                        contextObj.ShowConnectComponent = true;
                    }

                });
            } else {
                contextObj.notificationService.ShowToaster("No components exist for setting connection", 2);
                contextObj.splitviewDrawing.showSecondaryView = false;
            }
        });
    }

    spaceEditAndAssignSpaceStandard(target: number) {
        var contextObj = this;
        contextObj.objiWhiz.setCursor(2);
        contextObj.spaceObj.deHatch(function (retCode) {
            contextObj.deHatchVarablesClear();
            contextObj.spaceObj.getSelectedSpaceId(function (retCode, selectedSpaceId) {
                if (retCode == 0) {
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.spaceIdForEdit = selectedSpaceId;
                    if (target == 1)
                        contextObj.editSpaceData(1);
                    else
                        contextObj.editSpaceData(2);
                } else if (retCode == 1) {
                    contextObj.notificationService.ShowToaster("Click inside the space you wish to select", 2);
                    contextObj.spaceEditAndAssignSpaceStandard(target);
                } else {
                    contextObj.objiWhiz.setCursor(1);
                }
            });
        });
    }
    distributionMapOnClick(menuData: any) {
        
        if (this.moduleId == 12 && this.pageTarget == 10) {
            this.distibutionMapArchiveDrawings(menuData);
            return;
        }
        console.log("retCode", menuData);
        console.log("spaceObjspaceObj", this.spaceObj);
        if (this.isWaitMode())
            return;
        this.visibilityOfDistributionMenu = "hidden";
        this.visibilityOfDistributionImage = "hidden";
        this.isSpaceTotalizeLegend = false;
        var contextObj = this;
        contextObj.isHatch = false;
        //if (this.moduleId == 5 && this.spaceObj == undefined) {
        //    this.spaceObj = new SpaceOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.http,new SpaceOpenDrawing);
        //}
        contextObj.objiWhiz.setDisplay(false);
        contextObj.objiWhiz.setCursor(0);
        contextObj.selectedHandles = [];
        if (menuData.FieldId >= 290 && menuData.FieldId < 300) {//OrganisationLevel
            contextObj.isOccupancydistSelected = false;
            let LevelName: string;
            let OrgLevelNo: number;
            switch (menuData.FieldId) {
                case 290: LevelName = "L1Name";
                    OrgLevelNo = 1;
                    break;
                case 292: LevelName = "L2Name";
                    OrgLevelNo = 2;
                    //  this.notificationService.ShowToaster("No Department(s) are assigned to this floor", 3);
                    break;
                case 294: LevelName = "L3Name";
                    OrgLevelNo = 3;
                    //this.notificationService.ShowToaster("No Class(s) are assigned to this floor", 3);
                    break;
                case 296: LevelName = "L4Name";
                    OrgLevelNo = 4;
                    //this.notificationService.ShowToaster("No Class(s) are assigned to this floor", 3);
                    break;
                case 298: LevelName = "L5Name";
                    OrgLevelNo = 5;
                    //this.notificationService.ShowToaster("No Class(s) are assigned to this floor", 3);
                    break;
            }


            //contextObj.spaceObj.deleteLayerAlredyExists("$Hatch", function (retCode) {
            //    if (retCode == 0) {
            contextObj.spaceObj.deHatch(function (retCode) {
                if (retCode == 0) {
                    contextObj.deHatchVarablesClear();
                    contextObj.spaceObj.invokeDistributionMap(LevelName, OrgLevelNo, menuData.FieldName, function (retCode, hatchHandles) {
                        if (retCode == 1)
                            contextObj.notificationService.ShowToaster("No " + menuData.FieldName + "(s) are assigned to this floor", 3);
                        else
                            contextObj.isHatch = true;
                        contextObj.selectedHandles = hatchHandles;
                        contextObj.highlightRowInGrid();
                        contextObj.objiWhiz.display(function () {
                            contextObj.objiWhiz.regenerate();
                            contextObj.objiWhiz.setCursor(1);
                            contextObj.visibilityOfDistributionImage = "visible";
                            console.log("retCode", retCode);
                        });
                        contextObj.spaceService.deleteDistributionMaponDrawing().subscribe(function (resultData) {        //deleteDistributionMaponDrawing
                        });
                    });
                }
                else
                    console.log("deHatch faild due to", retCode);
            });
            //    }
            //    else
            //        console.log("deleteLayerAlredyExists faild due to", retCode);
            //});
        }
        else if (menuData.FieldId == -2) {
            //contextObj.spaceObj.deleteLayerAlredyExists("$Hatch", function (retCode) {
            //    if (retCode == 0) {+
            contextObj.isOccupancydistSelected = true;
            contextObj.spaceObj.deHatch(function (retCode) {
                if (retCode == 0) {
                    contextObj.deHatchVarablesClear();
                    contextObj.employeeDrawingObj.invokeDistributionMapOccupancy(1, function (retCode, hatchHandles) {
                        if (retCode == 1)
                            contextObj.notificationService.ShowToaster("No " + menuData.FieldName + "(s) details exist", 3);
                        else
                            contextObj.isHatch = true;
                        contextObj.selectedHandles = hatchHandles;
                        contextObj.highlightRowInGrid();
                        contextObj.objiWhiz.display(function () {
                            contextObj.objiWhiz.regenerate();
                            contextObj.objiWhiz.setCursor(1);
                            contextObj.visibilityOfDistributionImage = "visible";
                            console.log("retCode", retCode);
                        });
                        contextObj.spaceService.deleteDistributionMaponDrawing().subscribe(function (resultData) {       //deleteDistributionMaponDrawing
                        });
                    });
                }
                else
                    console.log("deleteLayerAlredyExists faild due to", retCode);
            });
            //    }
            //    else
            //        console.log("deleteLayerAlredyExists faild due to", retCode);
            //});
        }
        else {
            contextObj.isOccupancydistSelected = false;
            //  this.notificationService.ShowToaster("No Validated Field values are assigned to this floor", 3);
            //contextObj.spaceObj.deleteLayerAlredyExists("$Hatch", function (retCode) {
            //    if (retCode == 0) {
            contextObj.spaceObj.deHatch(function (retCode) {
                if (retCode == 0) {
                    contextObj.deHatchVarablesClear();
                    contextObj.spaceObj.invokeDistributionMapValidatedFields(contextObj.archiveId, menuData.FieldId, menuData.FieldName, function (retCode, hatchHandles) {
                        if (retCode == 1)
                            contextObj.notificationService.ShowToaster("No " + menuData.FieldName + "(s) are assigned to this floor", 3);
                        else
                            contextObj.isHatch = true;
                        contextObj.selectedHandles = hatchHandles;
                        contextObj.highlightRowInGrid();
                        contextObj.objiWhiz.display(function () {
                            contextObj.objiWhiz.regenerate();
                            contextObj.objiWhiz.setCursor(1);
                            contextObj.visibilityOfDistributionImage = "visible";
                            console.log("retCode", retCode);
                        });
                        contextObj.spaceService.deleteDistributionMaponDrawing().subscribe(function (resultData) {       //deleteDistributionMaponDrawing
                        });
                    });
                }
                else
                    console.log("deleteLayerAlredyExists faild due to", retCode);
            });
            //    }
            //    else
            //        console.log("deleteLayerAlredyExists faild due to", retCode);
            //});
        }

    }
    distibutionMapArchiveDrawings(menuData: any) {
        var contextObj = this;
        contextObj.archiveDrawingObj.deHatch(function (retCode) {
            if (retCode == 0) {
                contextObj.deHatchVarablesClear();
                contextObj.archiveDrawingObj.invokeDistributionMapValidatedFields(contextObj.archiveId, menuData.FieldId, menuData.FieldName, function (retCode, hatchHandles) {
                    if (retCode == 1)
                        contextObj.notificationService.ShowToaster("No " + menuData.FieldName + "(s) are assigned to this floor", 3);
                    else
                        contextObj.isHatch = true;
                    contextObj.objiWhiz.display(function () {
                        contextObj.objiWhiz.regenerate();
                        contextObj.objiWhiz.setCursor(1);
                        contextObj.visibilityOfDistributionImage = "visible";
                        contextObj.spaceService.deleteDistributionMaponDrawing().subscribe(function (resultData) {       //deleteDistributionMaponDrawing
                        });
                    });
                });
            }
        });
    }
    spaceDataGridOnClick() {
        this.inputItems.selectedIds = [];
        this.inputItems.selectedIds.push(this.drawingId);
    }
    spShowInDrawingOnClick(event: any) {
        if (this.showSecondaryViewSpaceTarget == 6) {
            this.showDrawingAfterUnlock.emit(event);
            this.splitviewDrawing.showSecondaryView = false;
            this.showSecondaryViewSpaceTarget = -1;
        } else {
            if (this.isWaitMode())
                return;
            var contextObj = this;
            this.isHatch = true;
            contextObj.isShowClicked = true;
            if (this.moduleId == 14) {
                this.selectedtabInRight = event['selectedTab'];
            }
            this.objiWhiz.setDisplay(false);
            contextObj.selectedHandles = [];
            console.log('selectedIds', event["selectedIds"]);
            this.spaceObj.showSelectedSpaceInDrawing(event["selectedIds"], function (retcode, selectedHandles) {
                contextObj.objiWhiz.setDisplay(true);
                contextObj.selectedHandles = selectedHandles;
                contextObj.splitviewDrawing.showSecondaryView = false;
            });
        }
    }
    spShowZoomOnClick(event: any) {
        if (this.showSecondaryViewSpaceTarget == 6) {
            this.showZoomAfterUnlock.emit(event);
            this.splitviewDrawing.showSecondaryView = false;
            this.showSecondaryViewSpaceTarget = -1;
        } else {
            if (this.isWaitMode())
                return;
            var contextObj = this;
            contextObj.isShowClicked = true;
            if (this.moduleId == 14) {
                this.selectedtabInRight = event['selectedTab'];
            }
            this.objiWhiz.setDisplay(false);
            //if (event["selectedIds"].length > 1)
            this.isHatch = true;
            contextObj.selectedHandles = [];
            this.spaceObj.showSelectedSpaceZoomDrawing(event["selectedIds"], function (retcode, selectedHandles) {
                contextObj.objiWhiz.setDisplay(true);
                contextObj.selectedHandles = selectedHandles;
                contextObj.splitviewDrawing.showSecondaryView = false;
            });
        }
    }
    selectMultipleSpaceByWindowOnClick() {
        if (this.isWaitMode())
            return;
        var contextObj = this;
        contextObj.selectedHandles = [];
        this.notificationService.ShowToaster("Select a window, click to select/deselect Space. Right click to exit", 2);
        contextObj.spaceObj.deHatch(function (retCode) {
            contextObj.deHatchVarablesClear();
            contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                if (retCode == 0) {
                    contextObj.spaceObj.selectMultipleSpace(contextObj.isSpace, function (retCode, selectedHandles) {
                        contextObj.selectedHandles = selectedHandles;
                        if (selectedHandles.length > 0)
                            contextObj.isHatch = true;
                        contextObj.highlightRowInGrid();
                        contextObj.cdr.detectChanges();
                    });
                }
            });
        });
    }
    showTotalizeOnClick() {
        if (this.isWaitMode())
            return;
        var contextObj = this;
        if (contextObj.selectedHandles.length > 0) {

            switch (contextObj.moduleId) {
                case 3:
                case 14:
                case 12:
                    contextObj.spaceObj.getTotalizeData(contextObj.selectedHandles, contextObj.isSpace, function (totalizeData, totalCount) {
                        contextObj.totalizeData = totalizeData;
                        contextObj.selectedCount = totalCount;
                        contextObj.showSlideTotalize = true;
                    });
                    break;
                case 5: contextObj.employeeDrawingObj.getTotalizeData(contextObj.selectedHandles, function (empTotalizeData, spaceCount) {
                    contextObj.totalizeData = empTotalizeData;
                    contextObj.selectedCount = spaceCount;
                    contextObj.showSlideTotalize = true;
                });
                    break;
                case 6://telecom
                case 7://assets
                case 8: //Furniture
                case 17://electrical
                case 18://fire and safety
                case 24://security assets
                case 25://mechanical
                case 26://plumbing
                case 27://medical gas
                    contextObj.objectsDrawingObj.getTotalizeData(contextObj.selectedHandles, function (spaceTotalizeData, assettotalizeData, spaceCount) {
                        contextObj.totalizeData = spaceTotalizeData;
                        contextObj.totalizeAssetData = assettotalizeData;
                        contextObj.selectedCount = spaceCount;
                        contextObj.showSlideTotalize = true;

                    });
                    break;
            }
        }
        else
            this.notificationService.ShowToaster("No Space selected", 2);
    }
    highlightRowInGrid() {
        var contextObj = this;
        contextObj.highlightRowIds = [];
        if (contextObj.selectedHandles) {
            if (contextObj.moduleId == 3 || contextObj.moduleId == 14 || contextObj.moduleId == 12)
                contextObj.highlightRowIds = contextObj.highlightRowIds.concat(contextObj.spaceObj.getSpcaceIdsArray(contextObj.isSpace, contextObj.selectedHandles));
            else if (contextObj.moduleId == 5) {
                var empIds: any[] = contextObj.employeeDrawingObj.getEmpIdsArray(contextObj.spaceObj.getSpcaceIdsArray(contextObj.isSpace, contextObj.selectedHandles));
                if (empIds.length > 0)
                    contextObj.highlightRowIds = contextObj.highlightRowIds.concat(empIds);
                else
                    contextObj.notificationService.ShowToaster("No Employees are assigned to the selected space(s)", 2);
            }
            //else if (contextObj.moduleId == 7 || contextObj.moduleId == 8) {
            else {
                var objectIds: any[] = contextObj.objectsDrawingObj.getAssetIdsArray(contextObj.spaceObj.getSpcaceIdsArray(contextObj.isSpace, contextObj.selectedHandles));
                if (objectIds.length > 0)
                    contextObj.extDrawingDetails = contextObj.highlightRowIds.concat(objectIds)
                else {
                    contextObj.notificationService.ShowToaster("No " + contextObj.objectmultiplename + " are assigned to the selected space(s)", 2);

                    //if (contextObj.moduleId == 7) {
                    //    contextObj.notificationService.ShowToaster("No Assets are assigned to the selected space(s)", 2);
                    //} else if (contextObj.moduleId == 8) {
                    //    contextObj.notificationService.ShowToaster("No Furniture are assigned to the selected space(s)", 2);
                    //}
                }
            }
        }
    }
    addTotalizeLegendOnClick() {
        this.isSpaceTotalizeLegend = true;
        var contextObj = this;
        this.showSlideTotalize = false;
        contextObj.objiWhiz.setCursor(2);
        this.notificationService.ShowToaster("Select an insertion point to add legend", 2)
        switch (this.moduleId) {
            case 3:
            case 14:
            case 12:
                this.spaceObj.addTotalizeLegend(this.totalizeData, this.selectedCount, function (retCode) {
                    contextObj.isAddLegend = true;
                    contextObj.objiWhiz.setCursor(1);
                });
                break;
            case 5: this.employeeDrawingObj.addTotalizeLegend(this.selectedCount, function (retCode) {
                contextObj.isAddLegend = true;
                contextObj.objiWhiz.setCursor(1);
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
                this.objectsDrawingObj.addTotalizeLegend(this.selectedCount, function (retCode) {
                    contextObj.isAddLegend = true;
                    contextObj.objiWhiz.setCursor(1);
                });
                break;
        }
    }
    setAttachmentCount(data: any) {
        this.spaceObj.spaceData.find(function (el) { return el.SpaceId === data.spaceId })['Attachments'] = data.Attachments;

    }


    closeTotalize() {
        this.showSlideTotalize = false;
    }
    employeeDataGridOnClick() {
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        this.showSecondaryViewSpaceTarget = -1;
        this.showSecondaryViewEmployeeTarget = 1;
        this.pageTitle = "Employee Data";
        this.splitviewDrawing.showSecondaryView = true;
    }
    AssetDataGridOnClick() {
        this.showSecondaryViewSpaceTarget = -1;
        this.showSecondaryViewObjectTarget = 1;
        this.pageTitle = "Asset Data";
        this.splitviewDrawing.showSecondaryView = true;
    }
    empShowInDrawingOnClick(event: any) {
        var contextObj = this;
        if (event["SelectedId"].length > 1)
            this.isHatch = true;
        this.objiWhiz.setDisplay(false);
        this.isHatch = true;
        this.spaceObj.deHatch(function (retcode) {
            contextObj.deHatchVarablesClear();
            contextObj.employeeDrawingObj.showSelectedEmployeeInDrawing(event['SelectedId'], function (retcode, selectedHandles) {
                if (retcode == 1)
                    contextObj.notificationService.ShowToaster("Employee (s) are not properly located", 2);
                contextObj.selectedHandles = selectedHandles;
                contextObj.objiWhiz.setDisplay(true);
            });
        });
    }


    empShowZoomOnClick(event: any) {
        var contextObj = this;
        this.objiWhiz.setDisplay(false);
        this.isHatch = true;
        var handle;
        if (event['SelectedId'].length > 1)
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        else {
            this.spaceObj.deHatch(function (retcode) {
                contextObj.employeeDrawingObj.showSelectedEmployeeZoomDrawing(event['SelectedId'][0], function (retcode, selectedHandles) {
                    contextObj.selectedHandles = selectedHandles;
                    contextObj.objiWhiz.setDisplay(true);
                });
            });
        }
    }

    /* Objects : Show in Drawing  */
    objectShowInDrawingOnClick(event: any) {

        var contextObj = this;
        var handle;
        contextObj.spaceObj.deHatch(function (retcode) {
            contextObj.isHatch = true;
            contextObj.objectsDrawingObj.deHatchObjects(function (retcode) {

                contextObj.objectsDrawingObj.showSelectedObjectInDrawing(event["selectedIds"], function (retcode, selectedHandles) {
                    contextObj.selectedHandles = selectedHandles;
                    contextObj.objiWhiz.setDisplay(true);
                });
            });
        });
        // }

    }

    PlaceassetonDrawing(event: any) {
        var contextObj = this;
        var status = [];
        contextObj.objiWhiz.isWaitMode(status);
        if (status[0]) {
            contextObj.objiWhiz.exitWaitMode();
        } else {

            contextObj.spaceObj.deHatch(function (retcode) {
                contextObj.deHatchVarablesClear();
                contextObj.objectsDrawingObj.deHatchObjects(function (retcode) {
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.objiWhiz.regenerate();
                    //return;


                    var handler: any;
                    contextObj.IsObjectPlaced = false;
                    //contextObj.objectsDrawingObj = new ObjectssOpenDrawing(contextObj.objiWhiz, contextObj.drawingId, contextObj.moduleId, contextObj.drawingCategoryId, contextObj.pageTarget, contextObj.notificationService, contextObj.http);
                    //contextObj.objectsDrawingObj.initilizeObjects(function (retCode) {
                    //    contextObj.spaceObj = contextObj.objectsDrawingObj.spaceOpenDrawingObj;
                    //    contextObj.isSpace = contextObj.objectsDrawingObj.spaceOpenDrawingObj.commonServices.isSpace;
                    contextObj.objectsDrawingObj.commonDwgServices.getDrawingDetails(function (dwgDetailsData) {
                        //contextObj.dwgDetails = dwgDetailsData.SiteName + " / " + dwgDetailsData.BuildingName + " / " + dwgDetailsData.FloorName;
                        //contextObj.objectsDrawingObj.showDataInDrawing("bothData", function (retCode) {
                        //    if (retCode == 1)
                        //        contextObj.notificationService.ShowToaster("No assets are assigned to this floor", 3);
                        //    contextObj.displayDrawing(function (retcode) {
                        //        contextObj.visibilityOfMenu = "visible";
                        //        if (contextObj.drawingCategoryId == 1) {
                        //            contextObj.visibilityOfDistributionImage = "visible";
                        //        }
                        //        else {
                        //            contextObj.visibilityOfDistributionImage = "hidden";
                        //        }
                        //we can call the code here to place symbol &&&
                        // ////debugger;
                        contextObj.selectedRowDetails = null;
                        contextObj.selectedRowDetails = event["rowData"];
                        contextObj.assignAsset(event, dwgDetailsData);
                        /*
                                 var strClassname;
                                 var strAssetNo;
                                 switch (contextObj.moduleId) {
                                     case 7:
                                         strClassname = contextObj.selectedRowDetails["Asset Class Name"];
                                         strAssetNo = contextObj.selectedRowDetails["Asset No."];
                                         break;
                                     case 8:
                                         strClassname = contextObj.selectedRowDetails["Furniture Class Name"];
                                         strAssetNo = contextObj.selectedRowDetails["Furniture No."];
                                         break;
                                 }
                                 //var strClassname = contextObj.selectedRowDetails["Asset Class Name"];
                                 //var strAssetNo = contextObj.selectedRowDetails["Asset No."];
                                 var isreturncode: boolean = false;
                                 
                                 //while (isreturncode == true) {
                                 //contextObj.splitviewDrawing.showSecondaryView = !contextObj.splitviewDrawing.showSecondaryView;
                                 //contextObj.notificationService.ClearAllToasts();
                                 contextObj.notificationService.ClearAllToasts();
                                 contextObj.notificationService.ShowToaster("Select the point where the " + strClassname + " (" + strAssetNo + ") is to be placed", 2, null, 3000);
                                 contextObj.objectsDrawingObj.placeSymbolInDrawing(contextObj.selectedRowDetails, dwgDetailsData.SiteId, contextObj.spaceIdForEdit, function (retCode) {
                                     //////debugger;
                                     if (retCode) {
                                         isreturncode = true;
                                         contextObj.IsObjectPlaced = true;
                                     }
                                     else {
                                         isreturncode = false;
                                     }
                                 });*/
                        // }

                        //---------------------------------------------------   
                        //});
                        //});
                    });
                });
            });
        }
        //});
    }
    deleteObjectsOnDrawingFromGrid(event: any) {

        var contextObj = this;
        if (event["selectedIds"].length > 1)
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        else {
            contextObj.spaceObj.deHatch(function (retCode) {
                contextObj.deHatchVarablesClear();
                contextObj.objectsDrawingObj.DelinkSelectedassetonDrawing(event["selectedIds"][0], event['selectedObjectDetails'], "", function (retcode) {
                });
            });
        }
    }


    UpdatedSuccessOnClick(event: any) {
        var contextObj = this;
        if (event["updatedData"].length > 1) {
            //console.log('got the data');
            let updatedRecord = JSON.parse(event["updatedData"])[0];
            contextObj.objectsDrawingObj.objectsEditReflectInDrawing(updatedRecord, function (retCode) {
                contextObj.splitviewDrawing.showSecondaryView = false;
            });
        }
    }

    /* Show zoomed */
    objectShowZoomOnClick(event: any) {
        var contextObj = this;
        if (event["selectedIds"].length > 1)
            contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        else {
            var handle;
            if (contextObj.isSpace)
                handle = event['selectedObjectDetails'].BomaHandle;
            else
                handle = event['selectedObjectDetails'].CarpetHandle;
            contextObj.spaceObj.deHatch(function (retcode) {
                contextObj.objectsDrawingObj.deHatchObjects(function (retcode) {
                    contextObj.isHatch = true;
                    contextObj.objectsDrawingObj.showSelectedObjectZoomDrawing(event["selectedIds"], event['selectedObjectDetails'].SpaceId, function (retcode) {
                    });
                });
            });
        }
    }
    employeeEditReturnData(event: any) {
        var contextObj = this;
        console.log("employee edit", event);
        let employeeEditReturnData = JSON.parse(event.returnData['Data'])[0];
        this.employeeDrawingObj.employeeEditReflectInDrawing(employeeEditReturnData, function (retCode) {
            contextObj.splitviewDrawing.showSecondaryView = false;
        });

    }
    objectsAddEditSubmitReturn(event: any) {
        this.showSecondaryViewObjectTarget = -1;
        var contextObj = this;
        let objectAddEditReturnData = JSON.parse(event.returnData);
        var newobjArry = [];
        newobjArry.push({ "Action": this.objectAddOrEdit, "returnData": event.returnData });
        this.updateObjectDataSource = null;
        this.updateObjectDataSource = newobjArry;
        //this.updateObjectDataSource.push({ "Action": this.objectAddOrEdit, "returnData": event.returnData });
        console.log("this.updateObjectDataSource.push", { "Action": this.objectAddOrEdit, "returnData": event.returnData });
        this.cdr.detectChanges();
        if (this.objectAddOrEdit == 'edit') {
            this.objectsDrawingObj.objectsEditReflectInDrawing(objectAddEditReturnData, function (retCode) {
                contextObj.splitviewDrawing.showSecondaryView = false;
            });
        } else {
            this.objectsDrawingObj.objectsAddReflectInDrawing(objectAddEditReturnData, function (retCode) {
                contextObj.splitviewDrawing.showSecondaryView = false;
            });
        }

    }
    onDeleteEmployee(empId: number) {
        var contextObj = this;
        var empld = empId;
        this.spaceObj.deHatch(function (re) {
            contextObj.deHatchVarablesClear();
            contextObj.employeeDrawingObj.clearobjMoveRequestEmpDetails(empld, function (res) {
                contextObj.employeeDrawingObj.empCount--;
            });
        });
    }
    assignEmployee(event: any) {
        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        this.assignSpacetoEmpEventData = event;
        this.isAssignSpace = false;
        this.assignedEmpIds = [];
        var contextObj = this;
        contextObj.employeeDrawingObj.beforeMoveSpaceId = undefined;
        var selectedIds = event['SelectedId'];
        contextObj.SpaceDetailsForRequest = [];
        contextObj.selectedEmpForAssign = [];
        contextObj.spaceObj.deHatch(function (retcode) {
            contextObj.deHatchVarablesClear();
            contextObj.selectedEmpForAssign = event['RowData'];
            if (selectedIds.length > 1) {
                contextObj.isMultipleEmployeeAssign = true;
                contextObj.assignMultipleEmpsOneByOne(event['RowData']);
            } else {
                var employeeId = event['SelectedId'][0];
                var employeeName: string = event['RowData']['Employee Name'];
                var gradeExist: boolean = false;// not implemented yet
                //contextObj.employeeDrawingObj.getEmployeeAssignRequestStatus(employeeId, function (retCode, gradeExist) {
                //if (retCode != 0)
                //    contextObj.notificationService.ShowToaster("Selected Employee(s) already requested for Space assigning", 5);
                //else 
                contextObj.selectedEmployeeDataAssign = event['RowData'];
                contextObj.notificationService.ClearAllToasts();
                contextObj.notificationService.ShowToaster("Select a point inside the space where the employee '" + employeeName + "' is to be located", 2);
                contextObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, false, function (returnCode) {

                });
                //    }
                //});
            }
        });

    }
    invokeAssignEmployee = function (employeeId, employeeName, gradeExist, isMove, resCallBack) {
        var contextObj = this;
        contextObj.insertSpaceAllotments = undefined;
        contextObj.employeeDrawingObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, function (returnCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle) {
            contextObj.insertSpaceAllotments = { "employeeId": employeeId, "spaceId": spaceId, "drawingId": contextObj.drawingId, "xPosition": xPos, "yPosition": yPos, "GradeExist": gradeExist, "EmployeeName": employeeName, };
            switch (returnCode) {
                case 1:
                    if (isMove) {
                        //contextObj.objiWhiz.setCursor(1);
                        //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                        ////contextObj.objiWhiz.stopMovingTrails(function (retCode) {
                        //contextObj.objiWhiz.regenerate();
                        //var selectedEmpCurrentData;
                        //var index = contextObj.employeeDrawingObj.empData.findIndex(function (el) { return el.Id === employeeId });
                        //if (index != -1)
                        //    selectedEmpCurrentData = contextObj.employeeDrawingObj.empData[index];
                        //    contextObj.employeeDrawingObj.moveEmployeeToSelectedSpace(employeeId, contextObj.insertSpaceAllotmentsAfterMove['previousXCord'], contextObj.insertSpaceAllotmentsAfterMove['previousYCord'], xPos, yPos, contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'], spaceId, function (retCode) {
                        //        contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                        //            contextObj.notificationService.ClearAllToasts();
                        //            contextObj.moveemployeeId = employeeId;
                        //            //contextObj.notificationService.ShowToaster("Employee moved", 3);
                        //contextObj.showEmpMoveResources = true;  
                        contextObj.recourcedata(contextObj.moveemployeeId);
                        resCallBack(0);
                        //        });
                        //    });
                        ////});
                    }
                    else {
                        //approval 
                        if (contextObj.ApprovalForEmpAssignInDrawing) {
                            contextObj.notificationService.ClearAllToasts();
                            // contextObj.empDialogMessages = { key: 5, message: "Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                            // contextObj.moveemployeeId = intEmployeeId;
                            contextObj.showEmployeeMoveRequestFromAssign = true;
                            contextObj.moveassignRequestMessage = "Do you want to assign this employee through the Approval Process?";
                            contextObj.showEmployeeMoveRequest = true;
                        }
                        else {
                            contextObj.employeeDrawingObj.insertSpaceAllotments(employeeId, spaceId, contextObj.drawingId, xPos, yPos, function (retCode) {
                                contextObj.notificationService.ClearAllToasts();
                                contextObj.notificationService.ShowToaster("Employee assigned", 3);
                                contextObj.isAssignSpace = true;
                                contextObj.assignedEmpIds.push(employeeId);
                                if (contextObj.assignFromGrid) {
                                    contextObj.assignedEmpsData.push(contextObj.employeeDrawingObj.getEmpData(employeeId));
                                    contextObj.outAssignedEmpIds.emit(contextObj.assignedEmpIds);
                                }
                                contextObj.employeeDrawingObj.empCount++;
                                resCallBack(0);
                            });
                        }
                    }

                    break;
                case 2: //contextObj.notificationService.ShowToaster("Select another point inside the space where the Employee " + employeeName + "is to be located", 3);
                    contextObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, isMove, resCallBack);
                    break;
                case 3: contextObj.notificationService.ClearAllToasts();
                    if (isMove)
                        contextObj.empDialogMessages = {key: 4, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                    else
                        contextObj.empDialogMessages = { key: 1, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                    contextObj.showSlideEmp = true;
                    resCallBack(0);
                    break;
                case 4: contextObj.notificationService.ClearAllToasts();
                    if (isMove)
                        contextObj.empDialogMessages = { key: 5, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                    else
                        contextObj.empDialogMessages = { key: 2, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                    contextObj.showSlideEmp = true;
                    resCallBack(0);
                    break;
                case 8: if (isMove) {
                    //contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.objiWhiz.stopSvgTrails();
                    contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                        contextObj.objiWhiz.regenerate();
                        resCallBack(8);
                    });
                }
                    break;
            }

        });
    }
    empMessageYesClick(messageId) {
        var contextObj = this;

        this.showSlideEmp = false;
        switch (messageId) {
            case 1:
            case 2:
                if (contextObj.isMultipleEmployeeAssign) {
                    contextObj.SpaceDetailsForRequest.push(contextObj.insertSpaceAllotments);
                    contextObj.arrayCount++;
                    contextObj.assignMultipleEmpsOneByOne(contextObj.assignSpacetoEmpEventData['RowData']);
                } else {
                    contextObj.assignedEmpIds.push(contextObj.insertSpaceAllotments['employeeId']);
                    contextObj.employeeDrawingObj.empCount++;
                    if (contextObj.ApprovalForEmpAssignInDrawing) {
                        contextObj.notificationService.ClearAllToasts();
                        contextObj.moveassignRequestMessage = "Do you want to assign this employee through the Approval Process?";
                        contextObj.showEmployeeMoveRequestFromAssign = true;
                        contextObj.showEmployeeMoveRequest = true;
                    }
                    else {
                        this.employeeDrawingObj.insertSpaceAllotments(contextObj.insertSpaceAllotments['employeeId'], contextObj.insertSpaceAllotments['spaceId'], contextObj.insertSpaceAllotments['drawingId'], contextObj.insertSpaceAllotments['xPosition'], contextObj.insertSpaceAllotments['yPosition'], function (retCode) {
                            contextObj.notificationService.ClearAllToasts();
                            contextObj.notificationService.ShowToaster("Employee assigned", 3);
                            contextObj.isAssignSpace = true;
                            if (contextObj.assignFromGrid) {
                                contextObj.assignedEmpsData.push(contextObj.employeeDrawingObj.getEmpData(contextObj.insertSpaceAllotments['employeeId']));
                                contextObj.outAssignedEmpIds.emit(contextObj.assignedEmpIds);
                            }
                        });
                    }
                }
                //}
                break;
            case 3: this.employeeDrawingObj.deAssignAfterConfirm(contextObj.insertSpaceAllotments['employeeId'], function (retcode) {
                contextObj.notificationService.ClearAllToasts();
                contextObj.notificationService.ShowToaster("Employee de- assigned from the space", 3);
                contextObj.deAssignedEmpId = contextObj.insertSpaceAllotments['employeeId'];
                contextObj.IsDeassignEmp = true;
                contextObj.employeeDrawingObj.empCount--;
            });
                break;
            case 4:
            case 5:
                if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
                    if (contextObj.moveEmpDetailsForAnotherFloor != undefined) {
                        contextObj.arrayCount++;
                        contextObj.moveMultipleEmpsOneByOne(contextObj.selectedMultipleMoveEmpDetails);
                    } else {
                        var empSingleData = contextObj.selectedMultipleEmpformoveDetails[contextObj.selectedMultipleEmpformoveDetails.length - 1];
                        contextObj.employeeDrawingObj.multipleMoveEmployeeToSelectedSpace(empSingleData["employeeId"], empSingleData["previousXCord"], empSingleData["previousYCord"],
                            empSingleData['currentXCord'], empSingleData['currentYCord'], empSingleData["selectedSymbolhandle"], spaceId, function (retCode) {
                                contextObj.arrayCount++;
                                contextObj.moveMultipleEmpsOneByOne(contextObj.selectedMultipleMoveEmpDetails);
                            });
                    }
                } else {
                    contextObj.recourcedata(contextObj.moveemployeeId);
                }
                break;
            case 10:
            case 11://2.Save
                var empId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId;
                if (contextObj.insertSpaceAllotments == undefined) {
                    empId = contextObj.insertSpaceAllotmentsAfterMove['employeeId'];
                    previousXCord = contextObj.insertSpaceAllotmentsAfterMove['previousXCord'];
                    previousYCord = contextObj.insertSpaceAllotmentsAfterMove['previousYCord'];
                    currentXCord = contextObj.insertSpaceAllotmentsAfterMove['currentXCord'];
                    currentYCord = contextObj.insertSpaceAllotmentsAfterMove['currentYCord'];
                    selectedSymbolhandle = contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'];
                    spaceId = contextObj.insertSpaceAllotmentsAfterMove['spaceId'];
                } else {
                    empId = contextObj.insertSpaceAllotmentsAfterMove['employeeId'];
                    previousXCord = contextObj.insertSpaceAllotmentsAfterMove['previousXCord'];
                    previousYCord = contextObj.insertSpaceAllotmentsAfterMove['previousYCord'];
                    currentXCord = contextObj.insertSpaceAllotments['xPosition'];
                    currentYCord = contextObj.insertSpaceAllotments['yPosition'];
                    selectedSymbolhandle = contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'];
                    spaceId = contextObj.insertSpaceAllotmentsAfterMove['spaceId'];
                }
                var selectedEmpCurrentData;
                var index = contextObj.employeeDrawingObj.empData.findIndex(function (el) { return el.Id === empId });
                if (index != -1)
                    selectedEmpCurrentData = contextObj.employeeDrawingObj.empData[index];
                contextObj.scenarioOpenDrawingObj.moveEmployeeToSelectedSpace(empId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, function (retCode) {
                    contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                        contextObj.objiWhiz.setCursor(1);
                        //resCallBack(returnCode, seatingCapacity, employeeId, contextObj.insertSpaceAllotmentsAfterMove['previousXCord'], contextObj.insertSpaceAllotmentsAfterMove['previousYCord'], xPos, yPos, contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'], spaceId, employeeName, gradeExist, selectedEmpCurrentData);
                    });
                });
                break;
            //case 20:
            //    contextObj.arrayCount = 0;
            //    contextObj.assignSpacetoEmpEventData = contextObj.nospacehandlearray[0];
            //    contextObj.assignMultipleEmpsOneByOne(contextObj.notemparray);
            //    break;
            case 21:
                contextObj.spaceObj.deHatch(function (retcode) { });
                contextObj.invokeRelinkEmployee(contextObj.sometemparray[contextObj.arrayCount], function (retcode) {
                })
                break;
            case 22:
                contextObj.invokeRelinkAssign(contextObj.sometemparray[contextObj.arrayCount], function (retcode) { });
                break;
            case 30:
                this.okDelete(contextObj.insertSpaceAllotments["employeeId"]);
                break;
            case 31:
                this.DeleteEmployee(1);
                break;



        }
    }
    empMessageNoClick(messageId) {
        var contextObj = this;
        this.showSlideEmp = false;
        switch (messageId) {
            case 1:
            case 2: contextObj.notificationService.ShowToaster("Select another Space", 2);
                if (this.isMultipleEmployeeAssign)
                contextObj.assignMultipleEmpsOneByOne(contextObj.assignSpacetoEmpEventData['RowData']);
            else
                contextObj.invokeAssignEmployee(contextObj.insertSpaceAllotmentsAfterMove['employeeId'], contextObj.insertSpaceAllotmentsAfterMove['EmployeeName'], contextObj.insertSpaceAllotmentsAfterMove['GradeExist'], false, function (returnCode) { });//contextObj.assignEmployee(contextObj.assignSpacetoEmpEventData['RowData']);
                break;
            case 4:
            case 5: contextObj.notificationService.ShowToaster("Select another Space", 2);
                if (contextObj.selectedMultipleMoveEmpDetails.length > 0)
                    contextObj.moveMultipleEmpsOneByOne(contextObj.selectedMultipleMoveEmpDetails);
                else
                    contextObj.invokeAssignEmployee(contextObj.insertSpaceAllotmentsAfterMove['employeeId'], contextObj.insertSpaceAllotmentsAfterMove['EmployeeName'], contextObj.insertSpaceAllotmentsAfterMove['GradeExist'], true, function (returnCode) { });
                break;
            case 10:
            case 11: contextObj.invokeAssignScenarioEmployee(contextObj.insertSpaceAllotmentsAfterMove['employeeId'], contextObj.insertSpaceAllotmentsAfterMove['EmployeeName'], contextObj.insertSpaceAllotmentsAfterMove['GradeExist'], function (returnCode) { });
                break;
            case 21:
                contextObj.spaceObj.deHatch(function (retcode) { });
                contextObj.showSlideEmp = true;
                contextObj.empDialogMessages = { key: 22, message: "Do you want to link the employee to another space?" }
                break;
            case 22:
                this.arrayCount++;
                contextObj.recursiveRelinkSomeTemp(contextObj.completeidspacehandlearray)
                break;
            case 30:
                contextObj.spaceObj.deHatch(function (retcode) { });
                break;
            case 31:
                contextObj.spaceObj.deHatch(function (retcode) { });
                break;

        }
    }
    empMessageCloseClick(event, messageId) {
        if (!event.change)
            this.empMessageNoClick(messageId);

    }
    YesEmpMoveResources(event: any) {
        this.showEmpMoveResources = false;
        this.IsNeedToUpdateSource = false;
        this.pageTitle = "Select Resources";
        this.showSecondaryViewEmployeeTarget = 3;
        this.showSecondaryViewSpaceTarget = -1;
        this.showSecondaryViewObjectTarget = -1;
        this.showEmployeeMoveRequest = false;
        this.splitviewDrawing.showSecondaryView = true;
    }
    NoEmpMoveResources(event: any) {
        var arraycount1 = 0;
        var contextObj = this;
        this.showEmpMoveResources = false;
        if (contextObj.selectedMultipleMoveEmpDetails.length == 0) {
            if (contextObj.ApprovalForEmpMoveInDrawing) {
                contextObj.notificationService.ClearAllToasts();
                contextObj.showEmployeeMoveRequestFromAssign = false;
                contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
                contextObj.showEmployeeMoveRequest = true;
            }
            else {
                contextObj.moveSingleEmployee();
            }
        }
        else
            if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
                contextObj.moveMultipleEmpThroughApproval();
                //    if (contextObj.ApprovalForEmpMoveInDrawing) {
                //        contextObj.notificationService.ClearAllToasts();
                //        // contextObj.empDialogMessages = { key: 5, message: "Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                //        // contextObj.moveemployeeId = intEmployeeId;
                //        contextObj.showEmployeeMoveRequest = true;
                //    }
                //    else {
                //if (contextObj.ApprovalForEmpMoveInDrawing) {
                //    contextObj.notificationService.ClearAllToasts();
                //    // contextObj.empDialogMessages = { key: 5, message: "Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                //    // contextObj.moveemployeeId = intEmployeeId;
                //    contextObj.showEmployeeMoveRequestFromAssign = false;
                //    contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
                //    contextObj.showEmployeeMoveRequest = true;
                //}
                //else {
                //    for (let i = 0; i < contextObj.selectedMultipleEmpformoveDetails.length; i++) {
                //        contextObj.employeeDrawingObj.multipleMoveEmployeeToSelectedSpace(contextObj.selectedMultipleEmpformoveDetails[i]["employeeId"], contextObj.selectedMultipleEmpformoveDetails[i]["previousXCord"], contextObj.selectedMultipleEmpformoveDetails[i]["previousYCord"],
                //            contextObj.selectedMultipleEmpformoveDetails[i]["currentXCord"], contextObj.selectedMultipleEmpformoveDetails[i]["currentYCord"], contextObj.selectedMultipleEmpformoveDetails[i]["selectedSymbolhandle"], contextObj.selectedMultipleEmpformoveDetails[i]["spaceId"], function (retCode) {
                //                arraycount1++;
                //                if (contextObj.selectedMultipleMoveEmpDetails.length == arraycount1) {
                //                    contextObj.employeeDrawingObj.afterMultipleEmpMove(contextObj.selectedMultipleMoveEmpDetails, contextObj.arrayCount, function (retCoce) {
                //                        contextObj.arrayCount = 0;
                //                        contextObj.selectedMultipleEmpformoveDetails = [];
                //                        //contextObj.showEmpMoveResources = true;
                //                        //contextObj.notificationService.ShowToaster("Employees Moved", 3);
                //                    });
                //                }
                //            });
                //    }
                //    //}
                //}
            }
    }

    assignMultipleEmpsOneByOne(selectedMultipleEmpDetails) {
        var contextObj = this;
        var gradeExist: boolean = false;// not implemented yet
        if (selectedMultipleEmpDetails.length > this.arrayCount) {
            var employeeDataItem = selectedMultipleEmpDetails[this.arrayCount];
            var employeeName = employeeDataItem['Employee Name'];
            var empId = employeeDataItem['Id'];
            //contextObj.employeeDrawingObj.getEmployeeAssignRequestStatus(empId, function (retCode, gradeExist) {
            //    if (retCode != 0) {
            //        contextObj.notificationService.ShowToaster("Selected Employee(s) already requested for Space assigning", 5);
            //        contextObj.arrayCount++;
            //        contextObj.assignMultipleEmpsOneByOne(selectedMultipleEmpDetails);
            //    }
            //    else {
            contextObj.notificationService.ShowToaster("Select a point inside the space where the employee '" + employeeName + "' is to be located", 2);
            contextObj.employeeDrawingObj.invokeAssignEmployee(empId, employeeName, gradeExist, function (returnCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle) {
                contextObj.insertSpaceAllotments = { "employeeId": empId, "spaceId": spaceId, "drawingId": contextObj.drawingId, "xPosition": xPos, "yPosition": yPos };
                switch (returnCode) {
                    case 1:
                        //contextObj.employeeDrawingObj.insertSpaceAllotments(contextObj.insertSpaceAllotments['employeeId'], contextObj.insertSpaceAllotments['spaceId'], contextObj.insertSpaceAllotments['drawingId'], contextObj.insertSpaceAllotments['xPosition'], contextObj.insertSpaceAllotments['yPosition'], function (retCode) {
                        //    contextObj.assignedEmpIds.push(contextObj.insertSpaceAllotments['employeeId']);
                        //    contextObj.employeeDrawingObj.empCount++;
                        //    contextObj.assignedEmpsData.push(contextObj.employeeDrawingObj.getEmpData(empId));
                        //    if (contextObj.assignFromGrid)
                        //        contextObj.outAssignedEmpIds.emit(contextObj.assignedEmpIds);
                        contextObj.SpaceDetailsForRequest.push(contextObj.insertSpaceAllotments);
                        contextObj.arrayCount++;
                        contextObj.assignMultipleEmpsOneByOne(contextObj.assignSpacetoEmpEventData['RowData']);
                        //  });
                        break;
                    case 2: //contextObj.notificationService.ShowToaster("Select another point inside the space where the Employee " + employeeName + "is to be located", 3);
                        contextObj.assignMultipleEmpsOneByOne(selectedMultipleEmpDetails);
                        break;
                    case 3: contextObj.notificationService.ClearAllToasts();
                        contextObj.empDialogMessages = { key: 1, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                        contextObj.showSlideEmp = true;
                        break;
                    case 4: contextObj.notificationService.ClearAllToasts();
                        contextObj.empDialogMessages = { key: 2, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                        contextObj.showSlideEmp = true;
                        break;
                    case 8:
                        contextObj.assignMultipleEmployeesThroughApprovalOrNot(true);
                        break;
                }

            });
            //    }
            //});
        } else {
            contextObj.assignMultipleEmployeesThroughApprovalOrNot(true);
        }
    }
    assignMultipleEmployeesThroughApprovalOrNot(beforeApprovalMsg: boolean) {
        var contextObj = this;
        contextObj.arrayCount = 0;
        if (contextObj.ApprovalForEmpAssignInDrawing && beforeApprovalMsg && (contextObj.isrelinkclick == false)) {
            contextObj.notificationService.ClearAllToasts();
            contextObj.moveassignRequestMessage = "Do you want to assign these employees through the Approval Process?";
            contextObj.showEmployeeMoveRequestFromAssign = true;
            contextObj.showEmployeeMoveRequest = true;
        } else {
            contextObj.isMultipleEmployeeAssign = false;
            if (contextObj.SpaceDetailsForRequest.length > 0) {
                contextObj.employeeDrawingObj.insertMutlipeEmployees(contextObj.SpaceDetailsForRequest, 0, function (res) {
                    contextObj.notificationService.ClearAllToasts();
                    contextObj.notificationService.ShowToaster("Employee(s) assigned", 3);
                    contextObj.employeeDrawingObj.empCount++;
                    if (contextObj.isrelinkclick) { //to update the itemsource for relink, count, and to negate the click attribute
                        contextObj.updateitemsourceafterrelink();// to update the itemsource for relink                  
                        contextObj.relinkempcount -= contextObj.SpaceDetailsForRequest.length;
                        contextObj.isrelinkclick = false;
                        contextObj.notemparray = [];
                    }
                    for (var empItem of contextObj.SpaceDetailsForRequest) {
                        contextObj.assignedEmpIds.push(empItem['employeeId']);
                        contextObj.assignedEmpsData.push(contextObj.employeeDrawingObj.getEmpData(empItem['employeeId']));
                    }
                    contextObj.isAssignSpace = true;
                    if (contextObj.assignFromGrid)
                        contextObj.outAssignedEmpIds.emit(contextObj.assignedEmpIds);
                    contextObj.SpaceDetailsForRequest = [];
                });
            }
        }
    }
    updateitemsourceafterrelink() {
        var contextObj = this;
        //var temparray = [];
        for (var i = 0; i < this.SpaceDetailsForRequest.length; i++) {
            //  temparray = this.relinkempdata;
            var index = this.relinkempdata.findIndex(function (item) { return item.Id === contextObj.SpaceDetailsForRequest[i]["employeeId"] })
            if (index > -1)
                contextObj.relinkempdata.splice(index, 1)
        }
    }
    moveEmployeeOnClick() {
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        var contextObj = this;
        contextObj.SpaceDetailsForRequest = [];
        contextObj.selectedMultipleMoveEmpDetails = [];
        contextObj.ObjectDetailsForRequest = [];
        contextObj.employeeDrawingObj.beforeMoveSpaceId = undefined;
        if (this.employeeDrawingObj.empCount > 0) {
            this.spaceObj.deHatch(function (retcode) {
                contextObj.deHatchVarablesClear();
                contextObj.notificationService.ShowToaster("Select the Employee to be moved", 2);
                contextObj.insertSpaceAllotmentsAfterMove = undefined;
                contextObj.insertSpaceAllotments = undefined;
                contextObj.employeeDrawingObj.moveEmployeeInDrawingOnClick(function (retCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist) {
                    contextObj.moveSingleEmployeeAfterSelection(retCode, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist, seatingCapacity);
                });
            });
        }
        else
            this.notificationService.ShowToaster("No Employees are assigned to this floor", 5);
    }
    moveSingleEmployeeAfterSelection(retCode, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist, seatingCapacity) {

        var contextObj = this;
        contextObj.insertSpaceAllotmentsAfterMove = { "employeeId": intEmployeeId, "previousXCord": previousXCord, "previousYCord": previousYCord, "currentXCord": currentXCord, "currentYCord": currentYCord, "selectedSymbolhandle": selectedSymbolhandle, "spaceId": spaceId, "EmployeeName": strEmployeeName, "GradeExist": gradeExist };
        contextObj.moveemployeeId = intEmployeeId;
        switch (retCode) {
            case 0:
                contextObj.notificationService.ClearAllToasts();
                //contextObj.notificationService.ShowToaster("Employee moved", 3);
                //contextObj.showEmpMoveResources = true;  
                contextObj.recourcedata(contextObj.moveemployeeId);
                break;
            case 1:
                contextObj.notificationService.ClearAllToasts();
                //contextObj.notificationService.ShowToaster("Employee moved", 3);
                //contextObj.showEmpMoveResources = true;
                contextObj.recourcedata(contextObj.moveemployeeId);
                break;
            case 2: contextObj.invokeAssignEmployee(intEmployeeId, strEmployeeName, gradeExist, true, function (returnCode) { });
                break;
            case 3: contextObj.notificationService.ClearAllToasts();
                contextObj.empDialogMessages = { key: 4, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                contextObj.showSlideEmp = true;
                break;
            case 4: contextObj.notificationService.ClearAllToasts();
                contextObj.empDialogMessages = { key: 5, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                contextObj.showSlideEmp = true;
                break;
        }
    }

    // Multiple Employee Move
    moveMultipleEmployeeOnClick() {
        var contextObj = this;
        contextObj.arrayCount = 0;
        contextObj.selectedMultipleEmpformoveDetails = [];
        contextObj.insertSpaceAllotmentsAfterMove = undefined;
        contextObj.employeeDrawingObj.beforeMoveSpaceId = undefined;
        contextObj.selectedMultipleMoveEmpDetails = [];
        contextObj.ObjectDetailsForRequest = [];
        contextObj.SpaceDetailsForRequest = [];
        if (this.employeeDrawingObj.empCount > 0) {
            this.spaceObj.deHatch(function (retcode) {
                contextObj.deHatchVarablesClear();
                contextObj.notificationService.ShowToaster("Click to select/deselect Employee. Right click to Exit", 2);
                contextObj.insertSpaceAllotmentsAfterMove = undefined;
                contextObj.insertSpaceAllotments = undefined;
                contextObj.employeeDrawingObj.moveMultipleEmployeeInDrawingOnClick(function (selectedMultipleEmpDetails) {
                    contextObj.selectedMultipleMoveEmpDetails = selectedMultipleEmpDetails;
                    if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
                        contextObj.moveMultipleEmpsOneByOne(contextObj.selectedMultipleMoveEmpDetails);
                    }
                });
            });
        }
        else
            this.notificationService.ShowToaster("No Employees are assigned to this floor", 5);
    }
    moveMultipleEmpsOneByOne(selectedMultipleEmpDetails) {
        debugger
        var contextObj = this;
        contextObj.insertSpaceAllotments = undefined;
        if (selectedMultipleEmpDetails.length > this.arrayCount) {
            var empSingleData = selectedMultipleEmpDetails[this.arrayCount];
            contextObj.notificationService.ShowToaster("Select a point inside the space where the employee '" + empSingleData["Name"] + "' is to be located", 2);
            contextObj.employeeDrawingObj.invokeAssignEmployee(empSingleData["Id"], empSingleData["Name"], empSingleData["gradeExist"], function (returnCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle) {
                //contextObj.insertSpaceAllotmentsAfterMove = { "employeeId": empSingleData["Id"], "spaceId": spaceId, "drawingId": contextObj.drawingId, "xPosition": xPos, "yPosition": yPos };
                contextObj.insertSpaceAllotmentsAfterMove = { "employeeId": empSingleData["Id"], "previousXCord": empSingleData["previousXCord"], "previousYCord": empSingleData["previousYCord"], "currentXCord": xPos, "currentYCord": yPos, "selectedSymbolhandle": empSingleData["symbolhandle"], "spaceId": spaceId, "EmployeeName": empSingleData["Name"], "GradeExist": empSingleData["gradeExist "] };
                if (returnCode != 2 && returnCode != 8) {
                    contextObj.selectedMultipleEmpformoveDetails.push({
                        employeeId: empSingleData["Id"],
                        previousXCord: empSingleData["previousXCord"],
                        previousYCord: empSingleData["previousYCord"],
                        currentXCord: xPos,
                        currentYCord: yPos,
                        selectedSymbolhandle: empSingleData["symbolhandle"],
                        spaceId: spaceId,
                    })
                }
                switch (returnCode) {
                    case 1:
                        if (contextObj.moveEmpDetailsForAnotherFloor != undefined) {
                            contextObj.arrayCount++;
                            contextObj.moveMultipleEmpsOneByOne(contextObj.selectedMultipleMoveEmpDetails);
                        } else {
                            contextObj.employeeDrawingObj.multipleMoveEmployeeToSelectedSpace(empSingleData["Id"], empSingleData["previousXCord"], empSingleData["previousYCord"],
                                xPos, yPos, empSingleData["symbolhandle"], spaceId, function (retCode) {
                                    contextObj.arrayCount++;
                                    contextObj.moveMultipleEmpsOneByOne(contextObj.selectedMultipleMoveEmpDetails);
                                });
                        }
                        break;
                    case 2: //contextObj.notificationService.ShowToaster("Select another point inside the space where the Employee " + employeeName + "is to be located", 3);
                        contextObj.moveMultipleEmpsOneByOne(selectedMultipleEmpDetails);
                        break;
                    case 3: contextObj.notificationService.ClearAllToasts();
                        contextObj.empDialogMessages = { key: 4, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                        contextObj.showSlideEmp = true;
                        break;
                    case 4: contextObj.notificationService.ClearAllToasts();
                        contextObj.empDialogMessages = { key: 5, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                        contextObj.showSlideEmp = true;
                        break;
                    case 8: if (contextObj.arrayCount > 0) {
                        if (contextObj.isResoureFeatureEnabled == true)
                            contextObj.recourcedata(0);
                        else
                            contextObj.moveMultipleEmpThroughApproval();
                    } else
                        contextObj.objiWhiz.removeMaps();
                        break;
                }

            });
        } else {
            if (contextObj.isResoureFeatureEnabled == true)
                contextObj.recourcedata(0);
            else
                contextObj.moveMultipleEmpThroughApproval();
        }
    }
    moveMultipleEmpThroughApproval() {
        if (this.ApprovalForEmpMoveInDrawing) {
            this.showEmployeeMoveRequestFromAssign = false;
            this.positionApproval = 'center-right';
            this.moveassignRequestMessage = " Do you want to execute these move through the Approval Process?";
            this.showEmployeeMoveRequest = true;

        } else {
            this.moveMultipleEmployeeWithOutApproval();
        }
    }
    moveMultipleEmployeeWithOutApproval() {
        var contextObj = this;
        this.employeeDrawingObj.moveMultipleEmployeeWithOutApproval(contextObj.selectedMultipleEmpformoveDetails, function (empDetails) {
            if (contextObj.moveEmpDetailsForAnotherFloor != undefined) {
                contextObj.employeeDrawingObj.assignToAnotherFloor(empDetails, function (res) {
                    contextObj.UpdateDrawingGridMoveEmployee(empDetails);
                    contextObj.notificationService.ShowToaster("Employee (s) moved", 3);
                });
            } else {
                contextObj.employeeDrawingObj.afterMultipleEmpMove(contextObj.selectedMultipleEmpformoveDetails, function (ret) {
                    contextObj.resourceMove();
                    //contextObj.selectedMultipleMoveEmpDetails = [];
                    //contextObj.selectedMultipleEmpformoveDetails = [];
                    contextObj.notificationService.ShowToaster("Employee (s) moved", 3);
                });
            }

        });
    }
    UpdateDrawingGridMoveEmployee(selectedEmpmovesDetails) {
        this.DrawingMoveEmployeesDetaills.emit({
            EmployeesDetailsSelectedForMove: selectedEmpmovesDetails
        })
    }

    resourceMove() {
        var contextObj = this;
        if (contextObj.ObjectDetailsForRequest != undefined && contextObj.ObjectDetailsForRequest.length > 0) {
            contextObj.EmployeeService.submitmoveresourcedataNew(JSON.stringify(contextObj.ObjectDetailsForRequest), 0).subscribe(function (resultData) {
                if (resultData["Data"].StatusId >= 0) {
                    contextObj.notificationService.ShowToaster("Resource for move updated", 3);
                }
            });
        }
    }
    closeSlideEmpMoveResourceDialog(value: any) {
        if (value.change == false) {
            var arraycount1 = 0;
            var contextObj = this;
            this.showEmpMoveResources = false;
            if (contextObj.selectedMultipleMoveEmpDetails.length == 0) {
                if (contextObj.ApprovalForEmpMoveInDrawing) {
                    contextObj.notificationService.ClearAllToasts();
                    // contextObj.empDialogMessages = { key: 5, message: "Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                    // contextObj.moveemployeeId = intEmployeeId;
                    contextObj.showEmployeeMoveRequestFromAssign = false;
                    contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
                    contextObj.showEmployeeMoveRequest = true;
                }
                else {
                    contextObj.moveSingleEmployee();
                }
            }
            else {
                contextObj.moveMultipleEmpThroughApproval();
            }
        }
        this.showEmpMoveResources = value.value;
    }
    resourcemovestatus(event: any) {
        var arraycount1 = 0;
        var contextObj = this;
        contextObj.IsNeedToUpdateSource = false;
        if (event["status"] == "success") {
            contextObj.splitviewDrawing.showSecondaryView = false;
            contextObj.notificationService.ShowToaster("Employee moved", 3);
        }
        else if (event["status"] == "Fail") {
            setTimeout(function () {
                contextObj.splitviewDrawing.showSecondaryView = false;
            }, 200);
            contextObj.notificationService.ShowToaster("No Resources exist", 3);
            contextObj.notificationService.ShowToaster("Employee moved", 3);
        }
        if (event["status"] == "Fail" || event["status"] == "Multimove") {
            //if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
            //    for (let i = 0; i < contextObj.selectedMultipleEmpformoveDetails.length; i++) {
            //        contextObj.employeeDrawingObj.multipleMoveEmployeeToSelectedSpace(contextObj.selectedMultipleEmpformoveDetails[i]["employeeId"], contextObj.selectedMultipleEmpformoveDetails[i]["previousXCord"], contextObj.selectedMultipleEmpformoveDetails[i]["previousYCord"],
            //            contextObj.selectedMultipleEmpformoveDetails[i]["currentXCord"], contextObj.selectedMultipleEmpformoveDetails[i]["currentYCord"], contextObj.selectedMultipleEmpformoveDetails[i]["selectedSymbolhandle"], contextObj.selectedMultipleEmpformoveDetails[i]["spaceId"], function (retCode) {
            //                arraycount1++;
            //                if (contextObj.selectedMultipleMoveEmpDetails.length == arraycount1) {
            //                    contextObj.employeeDrawingObj.afterMultipleEmpMove(contextObj.selectedMultipleMoveEmpDetails, contextObj.arrayCount, function (retCoce) {
            //                        contextObj.arrayCount = 0;
            //                        contextObj.selectedMultipleEmpformoveDetails = [];
            //                        contextObj.IsNeedToUpdateSource = true;
            //                        //contextObj.notificationService.ShowToaster("Employees Moved", 3);
            //                    });
            //                }
            //            });
            //    }
            //    //setTimeout(function () {  
            //    //contextObj.IsNeedToUpdateSource = true;     
            //    //}, 6000);               
            //}
        }

    }
    IsResourceOpened(event: any) {
        var contextObj = this;
        if (event["status"] == "1" && contextObj.ApprovalForEmpMoveInDrawing != true) {
            // contextObj.moveSingleEmployee();
        }
        //else if (event["status"] == "2") {
        //     for (let i = 0; i < contextObj.selectedMultipleEmpDetails.length; i++) {
        //         contextObj.employeeDrawingObj.multipleMoveEmployeeToSelectedSpace(contextObj.selectedMultipleEmpDetails[i]["employeeId"], contextObj.selectedMultipleEmpDetails[i]["previousXCord"], contextObj.selectedMultipleEmpDetails[i]["previousYCord"],
        //             contextObj.selectedMultipleEmpDetails[i]["currentXCord"], contextObj.selectedMultipleEmpDetails[i]["currentYCord"], contextObj.selectedMultipleEmpDetails[i]["selectedSymbolhandle"], contextObj.selectedMultipleEmpDetails[i]["spaceId"], function (retCode) {
        //             });
        //     }
        // }
    }
    moveselectedresourceforemployee() {
    }
    moveresourceListforapprovalprocess(event: any) {
        var contextObj = this;
        contextObj.IsNeedToUpdateSource = false;
        contextObj.splitviewDrawing.showSecondaryView = false;
        contextObj.ObjectDetailsForRequest = event["Resourcedata"];
        if (contextObj.selectedMultipleMoveEmpDetails.length == 0) {
            if (contextObj.ApprovalForEmpMoveInDrawing) {
                contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
                contextObj.showEmployeeMoveRequest = true;
            }
            else {
                contextObj.moveSingleEmployee();
            }

        }
        else
            contextObj.moveMultipleEmpThroughApproval();
        //if (contextObj.ApprovalForEmpMoveInDrawing) {
        //    contextObj.notificationService.ClearAllToasts();
        //    debugger
        //    contextObj.showEmployeeMoveRequest = true;
        //}
        //else {
        //    contextObj.notificationService.ShowToaster("Employee moved", 3);
        //}        
    }
    private recourcedata(EmployeeId) {
        var contextObj = this;
        contextObj.showEmpMoveResourcesposition = "top-right";
        var resourcecount = 0;
        var arryhavedatacount = 0;
        var arraycount1 = 0;
        if (contextObj.selectedMultipleMoveEmpDetails.length == 0 || contextObj.selectedMultipleMoveEmpDetails == undefined) {
            contextObj.EmployeeService.getRecourcedataforemployeemove(EmployeeId).subscribe(function (resultdata) {
                contextObj.empresorceSource = JSON.parse(resultdata["Data"].FieldBinderData);
                if (contextObj.empresorceSource.length > 0 && contextObj.isResoureFeatureEnabled)
                    contextObj.showEmpMoveResources = true;
                else {
                    if (contextObj.ApprovalForEmpMoveInDrawing) {
                        contextObj.notificationService.ClearAllToasts();
                        // contextObj.empDialogMessages = { key: 5, message: "Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                        // contextObj.moveemployeeId = intEmployeeId;
                        contextObj.showEmployeeMoveRequestFromAssign = false;
                        contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
                        contextObj.showEmployeeMoveRequest = true;
                    }
                    //Do you want to execute this move through the Approval Process? (single employee move without resourde - work flow)
                    else {
                        var empId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId;
                        if (contextObj.insertSpaceAllotments == undefined) {
                            empId = contextObj.insertSpaceAllotmentsAfterMove['employeeId'];
                            previousXCord = contextObj.insertSpaceAllotmentsAfterMove['previousXCord'];
                            previousYCord = contextObj.insertSpaceAllotmentsAfterMove['previousYCord'];
                            currentXCord = contextObj.insertSpaceAllotmentsAfterMove['currentXCord'];
                            currentYCord = contextObj.insertSpaceAllotmentsAfterMove['currentYCord'];
                            selectedSymbolhandle = contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'];
                            spaceId = contextObj.insertSpaceAllotmentsAfterMove['spaceId'];
                        } else {
                            empId = contextObj.insertSpaceAllotmentsAfterMove['employeeId'];
                            previousXCord = contextObj.insertSpaceAllotmentsAfterMove['previousXCord'];
                            previousYCord = contextObj.insertSpaceAllotmentsAfterMove['previousYCord'];
                            currentXCord = contextObj.insertSpaceAllotments['xPosition'];
                            currentYCord = contextObj.insertSpaceAllotments['yPosition'];
                            selectedSymbolhandle = contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'];
                            spaceId = contextObj.insertSpaceAllotmentsAfterMove['spaceId'];
                        }
                        contextObj.employeeDrawingObj.moveEmployeeToSelectedSpace(empId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, function (retCode) {
                            contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                                contextObj.employeeDrawingObj.objiWhiz.setCursor(1);
                                contextObj.employeeDrawingObj.objiWhiz.enableRubberband(0, 0, 0, false);
                                contextObj.employeeDrawingObj.objiWhiz.regenerate();
                                contextObj.notificationService.ShowToaster("Employee moved", 3);
                            });
                        });
                    }
                }
            });
        }
        else if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
            contextObj.employeeDrawingObj.checkEmpHasResource(contextObj.selectedMultipleMoveEmpDetails, function (isHasResource) {
                if (isHasResource) {
                    contextObj.showEmpMoveResources = true;
                    contextObj.showEmpMoveResourcesposition = "center-right";
                } else {
                    contextObj.moveMultipleEmpThroughApproval();
                }
            });
            // if (contextObj.ApprovalForEmpMoveInDrawing != true) {

            //for (let i = 0; i < contextObj.selectedMultipleMoveEmpDetails.length; i++) {
            //    contextObj.EmployeeService.getRecourcedataforemployeemove(contextObj.selectedMultipleMoveEmpDetails[i].Id).subscribe(function (resultdata) {
            //        contextObj.empresorceSource = JSON.parse(resultdata["Data"].FieldBinderData);
            //        resourcecount++;
            //        if (contextObj.empresorceSource.length > 0)
            //            arryhavedatacount++;
            //        if (contextObj.selectedMultipleMoveEmpDetails.length == resourcecount) {
            //            if (arryhavedatacount == 0) {
            //                contextObj.moveMultipleEmployeeWithOutApproval();
            //               // if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
            //                    //for (let i = 0; i < contextObj.selectedMultipleEmpformoveDetails.length; i++) {
            //                    //    contextObj.employeeDrawingObj.multipleMoveEmployeeToSelectedSpace(contextObj.selectedMultipleEmpformoveDetails[i]["employeeId"], contextObj.selectedMultipleEmpformoveDetails[i]["previousXCord"], contextObj.selectedMultipleEmpformoveDetails[i]["previousYCord"],
            //                    //        contextObj.selectedMultipleEmpformoveDetails[i]["currentXCord"], contextObj.selectedMultipleEmpformoveDetails[i]["currentYCord"], contextObj.selectedMultipleEmpformoveDetails[i]["selectedSymbolhandle"], contextObj.selectedMultipleEmpformoveDetails[i]["spaceId"], function (retCode) {
            //                    //            arraycount1++;
            //                    //            if (contextObj.selectedMultipleMoveEmpDetails.length == arraycount1) {
            //                    //                contextObj.employeeDrawingObj.afterMultipleEmpMove(contextObj.selectedMultipleMoveEmpDetails, contextObj.arrayCount, function (retCoce) {
            //                    //                    contextObj.arrayCount = 0;
            //                    //                    contextObj.selectedMultipleEmpformoveDetails = [];
            //                    //                    contextObj.IsNeedToUpdateSource = true;
            //                    //                    //contextObj.notificationService.ShowToaster("Employees Moved", 3);
            //                    //                });
            //                    //            }
            //                    //        });
            //                    //}
            //                    //setTimeout(function () {  
            //                    //contextObj.IsNeedToUpdateSource = true;     
            //                    //}, 6000);               
            //               // }
            //              //  contextObj.notificationService.ShowToaster("Employee moved", 3);
            //            }
            //            else {
            //                if (contextObj.isResoureFeatureEnabled) {
            //                    contextObj.showEmpMoveResources = true;
            //                    contextObj.showEmpMoveResourcesposition = "center-right";
            //                }
            //            }
            //        }
            //    });
            //}
            //}
            //else {
            //    for (let i = 0; i < contextObj.selectedMultipleMoveEmpDetails.length; i++) {
            //        contextObj.EmployeeService.getRecourcedataforemployeemove(contextObj.selectedMultipleMoveEmpDetails[i].Id).subscribe(function (resultdata) {
            //            contextObj.empresorceSource = JSON.parse(resultdata["Data"].FieldBinderData);
            //            resourcecount++;
            //            if (contextObj.empresorceSource.length > 0)
            //                arryhavedatacount++;
            //            if (contextObj.selectedMultipleMoveEmpDetails.length == resourcecount) {                           
            //                if (contextObj.isResoureFeatureEnabled) {
            //                    contextObj.showEmpMoveResources = true;
            //                    contextObj.IsNeedToUpdateSource = true;
            //                    contextObj.showEmpMoveResourcesposition = "center-right";
            //                }
            //                else {
            //                    contextObj.notificationService.ClearAllToasts();
            //                    // contextObj.empDialogMessages = { key: 5, message: "Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
            //                    // contextObj.moveemployeeId = intEmployeeId;
            //                    contextObj.showEmployeeMoveRequestFromAssign = false;
            //                    contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
            //                    contextObj.showEmployeeMoveRequest = true;
            //                }                     
            //            }
            //        });
            //    }
            //}
        }
    }
    assignAsset(event: any, dwgDetailsData) {

        if (this.isWaitMode())
            this.objiWhiz.exitWaitMode();
        //this.assignSpacetoEmpEventData = event;
        this.isAssignSpace = false;

        var contextObj = this;
        var selectedIds = event['selectedIds'];
        if (selectedIds.length > 1) {
            this.isObjectAssign = true;
            if (event['rowData']['rowData'])
                this.assignObjectOneByOne(event['rowData']['rowData'], dwgDetailsData);
            else if (event['rowData'])
                this.assignObjectOneByOne(event['rowData'], dwgDetailsData);
        } else {

            contextObj.selectedRowDetails = event['rowData'];
            var strClassname;
            var strAssetNo;

            switch (contextObj.moduleId) {
                case 6:
                    strClassname = contextObj.selectedRowDetails["Object Class"];
                    strAssetNo = contextObj.selectedRowDetails["Object No."];
                    break;
                case 7:
                    strClassname = contextObj.selectedRowDetails["Asset Class"];
                    strAssetNo = contextObj.selectedRowDetails["Asset No."];
                    break;
                case 8:
                    strClassname = contextObj.selectedRowDetails["Furniture Class"];
                    strAssetNo = contextObj.selectedRowDetails["Furniture No."];
                    break;
                case 17:
                case 18:
                case 25:
                case 26:
                case 27:
                    strClassname = contextObj.selectedRowDetails["Component Type"];
                    strAssetNo = contextObj.selectedRowDetails["Component No."];
                    break;
                case 24:
                    strClassname = contextObj.selectedRowDetails["Equipment Type"];
                    strAssetNo = contextObj.selectedRowDetails["Equipment No."];
                    break;
            }
            var isreturncode: boolean = false;
            contextObj.spaceObj.deHatch(function (retcode) {
                contextObj.deHatchVarablesClear();
                contextObj.notificationService.ShowToaster("Select the point where the " + strClassname + " (" + strAssetNo + ") is to be placed", 2, null, 3000);
                contextObj.objectsDrawingObj.placeSymbolInDrawing(contextObj.selectedRowDetails, dwgDetailsData.SiteId, contextObj.spaceIdForEdit, function (retCode) {
                    if (retCode) {
                        isreturncode = true;
                        contextObj.IsObjectPlaced = true;
                    }
                    else {
                        isreturncode = false;
                    }
                    contextObj.afterassetplace.emit({ "Selecteddetails": contextObj.selectedRowDetails })
                });
            });
        }


    }
    assignObjectOneByOne(selectedMultipleObjectDetails, dwgDetailsData) {
        var contextObj = this;
        contextObj.IsObjectPlaced = false;
        let i = 0;
        var unAssignedcount = 0;
        for (i = contextObj.arrayCount; i < selectedMultipleObjectDetails.length; i++) {
            contextObj.arrayCount = i;
            if (selectedMultipleObjectDetails[i].Status == contextObj.unassignedTxt && selectedMultipleObjectDetails[i].SymbolId != null) {
                unAssignedcount = i;
                break;
            }

        }
        if ((selectedMultipleObjectDetails.length > contextObj.arrayCount) && (contextObj.arrayCount == unAssignedcount)) {
            // contextObj.selectedRowDetails = contextObj.selectedRow["rowData"];
            var strClassname = "";
            var strAssetNo = "";


            //if (index != -1)
            // if (selectedMultipleObjectDetails[contextObj.arrayCount].Status != "Unassigned" || selectedMultipleObjectDetails[contextObj.arrayCount].SymbolId == null)

            switch (contextObj.moduleId) {
                case 6:
                    strClassname = selectedMultipleObjectDetails[contextObj.arrayCount]["Object Class"];
                    strAssetNo = selectedMultipleObjectDetails[contextObj.arrayCount]["Object No."];
                case 7:
                    strClassname = selectedMultipleObjectDetails[contextObj.arrayCount]["Asset Class"];
                    strAssetNo = selectedMultipleObjectDetails[contextObj.arrayCount]["Asset No."];
                    break;
                case 8:
                    strClassname = selectedMultipleObjectDetails[contextObj.arrayCount]["Furniture Class"];
                    strAssetNo = selectedMultipleObjectDetails[contextObj.arrayCount]["Furniture No."];
                    break;
                case 17:
                case 18:
                case 25:
                case 26:
                case 27:
                    strClassname = selectedMultipleObjectDetails[contextObj.arrayCount]["Component Type"];
                    strAssetNo = selectedMultipleObjectDetails[contextObj.arrayCount]["Component No."];
                    break;
                case 24:
                    strClassname = selectedMultipleObjectDetails[contextObj.arrayCount]["Equipment Type"];
                    strAssetNo = selectedMultipleObjectDetails[contextObj.arrayCount]["Equipment No."];
                    break;
            }

            var isreturncode: boolean = false;
            contextObj.spaceObj.deHatch(function (retcode) {
                contextObj.deHatchVarablesClear();
                contextObj.notificationService.ShowToaster("Select the point where the " + strClassname + " (" + strAssetNo + ") is to be placed", 2, null, 3000);
                contextObj.objectsDrawingObj.placeSymbolInDrawing(selectedMultipleObjectDetails[contextObj.arrayCount], dwgDetailsData.SiteId, contextObj.spaceIdForEdit, function (retCode) {
                    if (retCode) {
                        isreturncode = true;
                        contextObj.IsObjectPlaced = true;
                        contextObj.cdr.detectChanges();
                        contextObj.afterassetplace.emit({ "Selecteddetails": contextObj.selectedRowDetails })
                        contextObj.updateObjectdataafterrelink(selectedMultipleObjectDetails[contextObj.arrayCount]);
                        contextObj.arrayCount++;
                        if (selectedMultipleObjectDetails.length > contextObj.arrayCount) {
                            if (selectedMultipleObjectDetails[contextObj.arrayCount].Status != contextObj.unassignedTxt || selectedMultipleObjectDetails[contextObj.arrayCount].SymbolId == null)
                                contextObj.arrayCount++;
                        }
                        contextObj.assignObjectOneByOne(selectedMultipleObjectDetails, dwgDetailsData);


                    }
                    else {
                        isreturncode = false;
                    }
                    //contextObj.afterassetplace.emit({ "Selecteddetails": selectedMultipleObjectDetails })
                });
            });
        }
        else {

            //   contextObj.IsObjectPlaced = true;
            contextObj.arrayCount = 0;
            isreturncode = true;
            contextObj.objiWhiz.setCursor(1);

            // contextObj.afterassetplace.emit({ "Selecteddetails": contextObj.selectedRowDetails })
            return true;
        }
    }
    deAssignDeleteEmployeeOnClick(target, isDeassign) {//1 from mainmenu 2 from contextmenu 
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        var contextObj = this;
        contextObj.IsDeassignEmp = false;
        if (this.employeeDrawingObj.empCount > 0) {
            contextObj.spaceObj.deHatch(function (retcode) {
                contextObj.deHatchVarablesClear();
                if (target == 1) {
                    if (isDeassign)
                        contextObj.notificationService.ShowToaster("Select the Employee to be de-assigned", 2);
                    else
                        contextObj.notificationService.ShowToaster("Select the Employee to be deleted", 2);
                    contextObj.employeeDrawingObj.deAssignEmployeeFromDrawing(isDeassign, function (retCode, selectedEmpId) {
                        if (retCode == 0) {
                            if (isDeassign)
                                contextObj.empDialogMessages = { key: 3, message: "Are you sure you want to de-assign the Employee from the space?" };
                            else
                                contextObj.empDialogMessages = { key: 30, message: "Are you sure you want to delete the Employee?" };
                            contextObj.insertSpaceAllotments = { "employeeId": selectedEmpId };
                            contextObj.showSlideEmp = true;
                        }
                    });
                } else {
                    if (isDeassign)
                        contextObj.empDialogMessages = { key: 3, message: "Are you sure you want to de-assign the Employee from the space?" };
                    else
                        contextObj.empDialogMessages = { key: 30, message: "Are you sure you want to delete the Employee?" };
                    contextObj.insertSpaceAllotments = { "employeeId": contextObj.assignedEmployeeSelectedId };
                    contextObj.showSlideEmp = true;
                }
            });
        }
        else
            this.notificationService.ShowToaster("No Employees are assigned to this floor", 5);
    }
    Aftercancelresource(event: any) {
        this.arrayforresourcecancel = event["data"];
    }
    onDeletedAssignedEmployee(event: any) {
        var contextObj = this;
        this.employeeDrawingObj.clearobjMoveRequestEmpDetails(event['empId'], function (retCode) {
            contextObj.employeeDrawingObj.empCount--;
        });
    }
    //Single move in asset
    moveAssetOnClick() {
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        contextObj.IsObjectMoved = false;
        if (this.objectsDrawingObj.totalObjects > 0) {
            this.notificationService.ShowToaster("Select the " + this.objectname + " to be moved", 2);
            //switch (contextObj.moduleId) {
            //    case 7:
            //        this.notificationService.ShowToaster("Select the Asset to be moved", 2);
            //        break;
            //    case 8:
            //        this.notificationService.ShowToaster("Select the Furniture to be moved", 2);
            //        break;
            //}
            contextObj.objectsDrawingObj.moveAssetInDrawingOnClick(function (retCode, assetsId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId) {
                if (retCode != 0) {
                    if (retCode == 2)
                        contextObj.notificationService.ShowToaster('Selected ' + contextObj.objectname + ' is a block. Only symbols can be moved', 2)
                    console.log('-');
                }
                else {
                    contextObj.moveAssetsDetails.push(assetsId);
                    contextObj.IsObjectMoved = true;
                }
            });
        }
        else {
            this.notificationService.ShowToaster("No " + this.objectmultiplename + " are assigned to this floor", 2);
            //switch (contextObj.moduleId) {
            //    case 7:
            //        this.notificationService.ShowToaster("No Assets are assigned to this floor", 2);
            //        break;
            //    case 8:
            //        this.notificationService.ShowToaster("No Furniture assigned to this floor", 2);
            //        break;
            //}
        }
    }

    //New single Move 
    moveObjectOnClick(target) {//1 from menu 2 from contextmenu
        var contextObj = this;
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        contextObj.IsObjectMoved = false;
        var selectedObjectId = 0;
        if (target == 1) {
            if (this.objectsDrawingObj.totalObjects > 0) {
                this.notificationService.ShowToaster("Select the " + this.objectname + " to be moved", 2);
                contextObj.objectsDrawingObj.moveObjectInDrawingOnClick(selectedObjectId, function (retCode, assetsId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId) {
                    if (retCode != 0) {
                        if (retCode == 2)
                            contextObj.notificationService.ShowToaster('Selected ' + contextObj.objectname + ' is a block. Only symbols can be moved', 2)
                    }
                    else {
                        contextObj.moveAssetsDetails.push(assetsId);
                        contextObj.IsObjectMoved = true;
                    }
                });
            }
            else {
                this.notificationService.ShowToaster("No " + this.objectmultiplename + " are assigned to this floor", 2);
            }
        } else {
            selectedObjectId = this.editObjectSelectedId;
                contextObj.objectsDrawingObj.moveObjectInDrawingOnClick(selectedObjectId, function (retCode, assetsId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId) {
                    contextObj.moveAssetsDetails.push(contextObj.editObjectSelectedId);
                    contextObj.IsObjectMoved = true;

                });
        }
    }

    //Multiple move in asset
    moveMultipleAssetOnClick() {
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        var contextObj = this;
        if (this.objectsDrawingObj.totalObjects > 0) {
            contextObj.objectsDrawingObj.commonDwgServices.getDrawingDetails(function (dwgDetailsData) {
                contextObj.objectsDrawingObj.moveMultipleAssetInDrawingOnClick(dwgDetailsData.FloorId, function (retCode, spaceid, floorid, dblActualXDifference, dblActualYDifference) {
                    if (retCode == -5) {
                        contextObj.showMoveOutsideSpace = true;
                        contextObj.dblActualXDiff = dblActualXDifference;
                        contextObj.dblActualYDiff = dblActualYDifference;
                        contextObj.movespaceid = spaceid;
                        contextObj.movefloorid = floorid;
                    }

                    else if (retCode != 0) {
                        console.log('-');
                        // FloorId

                    }
                    else { contextObj.IsObjectMoved = true; }
                });
            });
        }
        else {
            this.notificationService.ShowToaster("No " + this.objectmultiplename + " assigned to this floor", 2);

            //switch (contextObj.moduleId) {
            //    case 7:
            //        this.notificationService.ShowToaster("No Assets are assigned to this floor", 2);
            //        break;
            //    case 8:
            //        this.notificationService.ShowToaster("No Furniture assigned to this floor", 2);
            //        break;
            //}
        }
    }
    /* Delink Asset */
    DelinkObjectOnClick(target) {// 1 from menu 2 from context menu
        if (target == 1) {
            var status = [];
            var contextObj = this;
            if (this.objectsDrawingObj.totalObjects > 0) {
                switch (contextObj.moduleId) {
                    case 8:
                        this.notificationService.ShowToaster("Select the Furniture to warehouse", 2);
                        break;
                    default:
                        this.notificationService.ShowToaster("Select the " + this.objectname + " to be de-linked", 2);

                        break;
                }


                contextObj.objectsDrawingObj.delinkObject(function (returnCode, objectId, classId, handle, isSymbolHandle) {
                    if (handle == "" || handle == undefined || handle == null) {
                        console.log('-');
                    }
                    else {
                        if (isSymbolHandle) {
                            contextObj.objectsDrawingObj.hasPermissionForSelectedObjectId(objectId, function (hasSpacePermission) {
                                if (hasSpacePermission) {
                                    contextObj.objectsDrawingObj.hatchSingleObject(handle, function (ret) {
                                        contextObj.showdelinkconfirmationSlide = true;
                                    });
                                } else
                                    contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                            });
                        }
                        else
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.objectname + " is a block, cannot be de-linked", 5)
                    }
                });
            }
            else {
                this.notificationService.ShowToaster("No " + this.objectmultiplename + " are assigned to this floor", 2);

                //switch (contextObj.moduleId) {

                //    case 7:
                //        this.notificationService.ShowToaster("No Assets are assigned to this floor", 2);
                //        break;
                //    case 8:
                //        this.notificationService.ShowToaster("No Furniture are assigned to this floor", 2);
                //        break;
                //}
            }
        } else {
            this.objectsDrawingObj.setDelinkObject(this.editObjectSelectedId, this.editObjectClassId);
            this.showdelinkconfirmationSlide = true;

        }
    }
    //Do you want to proceed delink : Yes
    delinkAssetProgress() {
        var contextObj = this;
        contextObj.ObjectDelinked = [];
        contextObj.showdelinkconfirmationSlide = false;
        contextObj.spaceObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
            contextObj.objectsDrawingObj.delinkProgress(contextObj.drawingId, function (ObjectId) {
                contextObj.outDelinkInGrid.emit({ "status": "success" });
                contextObj.ObjectDelinked = [ObjectId];
            });
        });
    }
    //Do you want to proceed delink : No
    YesMoveOutsideSpace() {
        //////debugger;
        var contextObj = this;
        contextObj.objectsDrawingObj.moveOutsideSpaceInProgress(contextObj.movespaceid, contextObj.movefloorid, contextObj.dblActualXDiff, contextObj.dblActualYDiff, function (retCode) {
            contextObj.showMoveOutsideSpace = false;
            //contextObj.IsObjectMoved = true;
            if (retCode == 0) {
                contextObj.IsObjectMoved = true;
            }
        });
    }
    //Do you want to proceed delink : Yes
    NoMoveOutsideSpace() {
        var contextObj = this;
        contextObj.showMoveOutsideSpace = false;
        contextObj.spaceObj.deHatch(function (retcode) {
            contextObj.deHatchVarablesClear();
            contextObj.objectsDrawingObj.deHatchObjects(function (retcode) {
                contextObj.objiWhiz.setCursor(1);
                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                contextObj.objiWhiz.regenerate();
                //return;
                contextObj.objiWhiz.exitWaitMode();
            });
        });
        //contextObj.spaceObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
        //    contextObj.objectsDrawingObj.moveInsideSpaceInProgress(contextObj.drawingId, function (retCode) {
        //    });
        //});
    }
    //Do you want to proceed delink : No
    delinkAssetCancel() {
        //////debugger;
        var contextObj = this;
        contextObj.objectsDrawingObj.delinkCancel(function (retCode) {
            contextObj.showdelinkconfirmationSlide = false;
        });
    }

    //Delink Asset : End

    //Rotate Asset: Start
    RotateObject(target) {// 1 from menu 2 from context menu
        debugger
        var contextObj = this;
        this.pageTitle = "Rotate " + contextObj.objectname;
        if (this.objectsDrawingObj.objectsData.length == 0)
            this.notificationService.ShowToaster("No " + contextObj.objectname + " data exists", 2)
        else {
            if (target == 1) {
                this.notificationService.ShowToaster('Select the ' + contextObj.objectname + ' to be rotated', 2)
                this.objectsDrawingObj.RotateObject(function (retcode, objectId, classId, selectedhandle, isSymbolHandle) {
                    if (retcode == 0 && isSymbolHandle) {
                        contextObj.rotatehandle = selectedhandle;
                        contextObj.splitviewDrawing.showSecondaryView = true;
                        contextObj.showSecondaryViewEmployeeTarget = 52;
                    }
                    else if (!isSymbolHandle && selectedhandle)
                        contextObj.notificationService.ShowToaster('Selected ' + contextObj.objectname + ' is a block. Only symbols can be rotated', 2)
                });
            }
            else if (target == 2) {
                var handle = this.objectsDrawingObj.getSymbolHandleFromObjectId(this.editObjectSelectedId);
                if (handle != undefined) {
                    contextObj.rotatehandle = this.objectsDrawingObj.getSymbolHandleFromObjectId(this.editObjectSelectedId);
                    contextObj.splitviewDrawing.showSecondaryView = true;
                    contextObj.showSecondaryViewEmployeeTarget = 52;
                    contextObj.spaceObj.deleteLayerAlredyExists(contextObj.objectsDrawingObj.hatchObjectLayer, function (rtn) { });
                } else {
                    if (contextObj.objectsDrawingObj.isBlockRefhandleExists(contextObj.objectsDrawingObj.getBlockHandleFromObjectId(contextObj.editObjectSelectedId)))
                        contextObj.notificationService.ShowToaster('Selected ' + contextObj.objectname + ' is a block. Only symbols can be rotated', 2)
                }
            }
        }
    }

    //event where we get the angle to be rotated
    RotateAngle(event) {
        var contextObj = this;
        this.splitviewDrawing.showSecondaryView = false;
        this.objectsDrawingObj.RotateObjectSave(this.rotatehandle, event, function (retcode) {
            if (retcode == 0) {
                contextObj.notificationService.ShowToaster(contextObj.objectname + ' rotated', 3)
            }
            else if (retcode == 1)
                contextObj.notificationService.ShowToaster('iDrawings encountered error', 2)
        })
    }
    //Rotate Asset:End
    /* Reserve a Room-- Scheduling : Module Id:17 */
    reserveRoomOnClick() {
        if (this.isWaitMode())
            return;
        var contextObj = this;
        var isSearch = false;
        if (this.schedulingDrawingObj.isSchedulingSpaceExist()) {
            contextObj.spaceObj.deHatch(function (ret) {
                contextObj.deHatchVarablesClear();
                contextObj.notificationService.ShowToaster("Select a " + contextObj.roomtext, 2)
                contextObj.schedulingDrawingObj.ReserveRoomInDrawing(contextObj.drawingId, function (retCode) {
                    if (retCode == 0)
                        contextObj.scheduleWithoutSearch();
                    //if (retCode) {
                    //    if (retCode == 2) /*Show search confirmation message */ {
                    //        contextObj.showSearchSlide = true;
                    //        isSearch = true;
                    //    }
                    //    else {//If no search
                    //        isSearch = false;
                    //    }
                    //}
                    //else {

                    //}
                });
            });
        }
        else
            contextObj.notificationService.ShowToaster("No Scheduling Spaces exist", 2);
    }


    scheduleWithoutSearch() {
        var contextObj = this;
        contextObj.showSearchSlide = false;
        // contextObj.spaceObj.commonServices.getDrawingDetails(function (dwgDetailsData) {
        contextObj.schedulingDrawingObj.reserveRoomWithoutSearch(function (retCode, spaceDataItem) {
            if (retCode == 0) {
                contextObj.objiWhiz.setCursor(1);
                contextObj.pageTitle = contextObj.roomtext + " Booking";
                contextObj.spaceDataForReserveRoom = spaceDataItem;
                contextObj.splitviewDrawing.secondaryArea = 79;
                contextObj.showSecondaryViewSpaceScheduleTarget = 2;
                contextObj.splitviewDrawing.showSecondaryView = true;
            }
        });
        //   });

    }
    reserveSeatOnClick() {
        var contextObj = this;
        if (this.isWaitMode())
            return;
        contextObj.spaceObj.deHatch(function (retCode) {
            contextObj.deHatchVarablesClear();
            if (contextObj.schedulingDrawingObj.seatsData.length > 0) {
                contextObj.schedulingDrawingObj.blinkSeats(function (cc) {
                    if (cc == 0) {
                        contextObj.notificationService.ShowToaster("Select a Hoteling " + contextObj.seattxt, 2);
                        contextObj.getFieldsForSeatBooking(contextObj);
                    }
                    else
                        contextObj.notificationService.ShowToaster("No Hoteling " + contextObj.seattxt + " exist", 2);
                });
            }
            else
                contextObj.notificationService.ShowToaster("No Hoteling " + contextObj.seattxt + " exist", 2);
        });
    }
    getFieldsForSeatBooking(contextObj) {
        contextObj.objiWhiz.setCursor(2);
        contextObj.schedulingDrawingObj.getDetailsForSeatBooking(function (rtCode, fieldsForSeatBooking, selectedSeatId, spaceTime) {
            switch (rtCode) {
                case 0:
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.pageTitle = "Reserve " + contextObj.seattxt;
                    contextObj.fieldsForSeatBooking = fieldsForSeatBooking;
                    contextObj.selectedSeatId = [selectedSeatId];
                    contextObj.splitviewDrawing.secondaryArea = 30;
                    contextObj.siteTime = spaceTime;
                    contextObj.showSecondaryViewSpaceScheduleTarget = 3;
                    contextObj.splitviewDrawing.showSecondaryView = true;
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster("Reservation exists", 2);
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.objiWhiz.removeBlinkers();
                    break;
                case 2: contextObj.notificationService.ShowToaster("Select a Hoteling " + contextObj.seattxt, 2);
                    contextObj.getFieldsForSeatBooking(contextObj);
                    break;
                case 3:
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.objiWhiz.removeBlinkers();
                    break;
                case 4: contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.objiWhiz.removeBlinkers();
                    break;

            }

        });
    }
    reserveSeatOnClickFromRightClick() {
        var contextObj = this;
        contextObj.schedulingDrawingObj.getDatasForSeatBooking(function (ret) {
            contextObj.schedulingDrawingObj.bookHotellingSeat(contextObj.selectedSeatId[0], function (retCode, fieldsForseatBooking, spaceTime) {
                contextObj.pageTitle = "Reserve " + contextObj.seattxt;
                contextObj.fieldsForSeatBooking = fieldsForseatBooking;
                contextObj.siteTime = spaceTime;
                contextObj.splitviewDrawing.secondaryArea = 30;
                contextObj.showSecondaryViewSpaceScheduleTarget = 3;
                contextObj.splitviewDrawing.showSecondaryView = true;
            });
        });
    }
    reserveRoomOnClickFromRightClick() {
        var contextObj = this;
        var spaceDataItem = this.schedulingDrawingObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === contextObj.spaceIdForEdit });
        if (spaceDataItem['Room No.'] == undefined || spaceDataItem['Room No.'] == "" || spaceDataItem['Room No.'] == null) {
            contextObj.notificationService.ShowToaster("Selected Space has no Room Number", 2);
        } else {
            this.pageTitle = contextObj.roomtext + " Booking";
            this.spaceDataForReserveRoom = spaceDataItem;
            this.splitviewDrawing.secondaryArea = 79;
            this.showSecondaryViewSpaceScheduleTarget = 2;
            this.splitviewDrawing.showSecondaryView = true;
        }

    }
    addHotelingSeatOnClick() {
        var contextObj = this;
        contextObj.schedulingDrawingObj.checkAddSeatPossible(contextObj.spaceIdForEdit, function (retCode, assignmentTypeId, roomNo, maxSeats) {
            if (retCode == 0) {
                if (roomNo == "" || roomNo == null || roomNo == undefined)
                    contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Hoteling " + contextObj.seattxt + "s", 2);
                else {
                    if (maxSeats <= 0 || isNaN(maxSeats) == true)
                        contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than zero", 2);
                    else {
                        contextObj.maximusSeats = maxSeats;
                        contextObj.assignmentTypeId = assignmentTypeId;
                        contextObj.selectedRoomNo = assignmentTypeId;
                        contextObj.pageTitle = contextObj.seattxt + "s List";
                        contextObj.splitviewDrawing.secondaryArea = 30;
                        contextObj.showSecondaryViewSpaceScheduleTarget = 4;
                        contextObj.splitviewDrawing.showSecondaryView = true;
                    }
                }
            } else if (retCode == 1) {
                contextObj.notificationService.ShowToaster("Selected Space is Scheduling Space", 2);
            } else if (retCode == 2) {
                contextObj.notificationService.ShowToaster("Selected Space is Unassignable", 2);
            }
            //contextObj.pageTitle = "Reserve a Seat";
            //contextObj.fieldsForSeatBooking = fieldsForseatBooking;
            //contextObj.splitviewDrawing.secondaryArea = 30;
            //contextObj.showSecondaryViewSpaceScheduleTarget = 3;
            //contextObj.splitviewDrawing.showSecondaryView = true;
        });
    }
    reserveSeatSubmitRet(event) {
        this.splitviewDrawing.showSecondaryView = false;
        this.objiWhiz.removeBlinkers();
    }
    moveSeatOnClick() {
        if (this.isWaitMode())
            return;
        var contextObj = this;
        contextObj.spaceObj.deHatch(function (retCode) {
            contextObj.deHatchVarablesClear();
            contextObj.notificationService.ShowToaster("Select a " + contextObj.seattxt, 2);
            if (contextObj.schedulingDrawingObj.seatsData.length > 0) {
                contextObj.schedulingDrawingObj.moveSeatOnClick(function (Code) {
                    if (Code == 0)
                        contextObj.notificationService.ShowToaster(contextObj.seattxt + " moved", 3);
                });
            }
            else
                contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s exist", 2);
        });
    }
    onSplitViewClose() {
        var contextObj = this;
        var arraycount1 = 0;
        if (contextObj.showSecondaryViewEmployeeTarget == 55 || contextObj.showSecondaryViewEmployeeTarget == 56) {
            contextObj.isShowPrimaryDrawing = true;
            contextObj.selectedEmployeeData = [];
            //contextObj.objiWhiz.restoreLib();
            //setTimeout(function () {
            //    var width, height;
            //    var canvas = contextObj.canvasElement;
            //    width = canvas.offsetWidth;
            //    height = canvas.offsetHeight;//window.innerHeight - 56;
            //    contextObj.objiWhiz.resize(width, height);
            //}, 50);
        }

        var resources = new Array<Deleteresources>();
        if (this.moduleId == 14 && this.showSecondaryViewSpaceScheduleTarget == 2) {
            this.schedulingDrawingObj.deHatchSchedulingArea(function () {

            });
        }
        if (this.moduleId == 5 && this.showSecondaryViewEmployeeTarget == 3) {
            if (contextObj.ApprovalForEmpMoveInDrawing != true) {
                if (contextObj.selectedMultipleMoveEmpDetails.length == 0) {
                    if (contextObj.arrayforresourcecancel != undefined) {
                        for (let i = 0; i < contextObj.arrayforresourcecancel.length; i++) {
                            if (contextObj.arrayforresourcecancel[i]["Select All"] == false && contextObj.arrayforresourcecancel[i]["ForEmployeeId"] != "Null") {
                                resources.push({
                                    ReportFieldId: 865,
                                    Value: contextObj.arrayforresourcecancel[i].ObjectId.toString()
                                });
                            }
                        }
                    }
                    if (resources != undefined && resources.length > 0) {
                        contextObj.EmployeeService.postResourcesDelete(JSON.stringify(resources), contextObj.arrayforresourcecancel[0]["EmployeeId"]).subscribe(function (resultData) {
                            contextObj.notificationService.ShowToaster("Employee moved", 3);
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("Employee moved", 3);
                }
                else
                    if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
                        contextObj.moveMultipleEmpThroughApproval();
                    }
            }
            else {
                if (contextObj.selectedMultipleMoveEmpDetails.length == 0) {
                    if (contextObj.arrayforresourcecancel != undefined) {
                        for (let i = 0; i < contextObj.arrayforresourcecancel.length; i++) {
                            if (contextObj.arrayforresourcecancel[i]["Select All"] == false && contextObj.arrayforresourcecancel[i]["ForEmployeeId"] != "Null") {
                                resources.push({
                                    ReportFieldId: 865,
                                    Value: contextObj.arrayforresourcecancel[i].ObjectId.toString()
                                });
                            }
                        }
                    }
                    if (resources != undefined && resources.length > 0) {
                        contextObj.EmployeeService.postResourcesDelete(JSON.stringify(resources), contextObj.arrayforresourcecancel[0]["EmployeeId"]).subscribe(function (resultData) {
                            contextObj.notificationService.ClearAllToasts();
                            contextObj.showEmployeeMoveRequestFromAssign = false;
                            contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
                            contextObj.showEmployeeMoveRequest = true;
                        });
                    }
                    else {
                        contextObj.notificationService.ClearAllToasts();
                        contextObj.showEmployeeMoveRequestFromAssign = false;
                        contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
                        contextObj.showEmployeeMoveRequest = true;
                    }
                }
                else {
                    contextObj.moveMultipleEmpThroughApproval();
                }
            }
        }
        if (this.moduleId == 5 && this.showSecondaryViewEmployeeTarget == 4) {
            if (contextObj.showEmployeeMoveRequestFromAssign) {

            } else {
                if (contextObj.selectedMultipleMoveEmpDetails.length == 0) {
                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                        contextObj.objiWhiz.regenerate();
                        contextObj.objiWhiz.stopSvgTrails();
                    });
                } else {
                    contextObj.moveMultipleEmployeeWithOutApproval();
                }
            }
        }
        this.pageTitle = "";
        this.showSecondaryViewObjectTarget = -1;
        this.showSecondaryViewEmployeeTarget = -1;
        this.showSecondaryViewSpaceScheduleTarget = -1;
        this.showSecondaryViewSpaceTarget = -1;
        this.splitviewDrawing.secondaryArea = 30;
        if (this.showEmployeeMoveRequestFromAssign) {
            this.showEmployeeMoveRequestFromAssign = false;
            this.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
        }
        this.objiWhiz.removeBlinkers();
    }

    //-----------------------unlock drawing---------------------------------------------------------------------
    unlockDrawingOnClick() {
        var contextObj = this;
        contextObj.outUnlockDrawingClicked.emit(contextObj.objiWhiz);
    }
    spacedataClick() {
        var contextObj = this;
        if (contextObj.isDrawingUnlocked) {
            contextObj.pageTitle = 'Space Data';
            contextObj.splitviewDrawing.showSecondaryView = true;
            contextObj.showSecondaryViewSpaceTarget = 6;
            contextObj.outSpacedataClicked.emit(contextObj.objiWhiz);
        }
        else {
            contextObj.notificationService.ShowToaster("Drawing is not unlocked", 5);
        }
    }
    //---------------------Asset-------------------------------------------------------------------------------------
    assetEditReturnData(event: any) {
        var contextObj = this;
        console.log("Asset edit", event);
        let editReturnData = JSON.parse(event.returnData['Data'])[0];
        contextObj.objectsDrawingObj.objectsEditReflectInDrawing(editReturnData, function (retCode) {
            contextObj.splitviewDrawing.showSecondaryView = false;
        });

    }
    /*-----Scenario drawing----------*/
    scenarioEmpMoveOnClick() {
        var status = [];
        this.objiWhiz.isWaitMode(status);
        if (status[0])
            return;
        var contextObj = this;
        if (this.employeeDrawingObj.empCount > 0) {
            this.spaceObj.deHatch(function (retcode) {
                contextObj.deHatchVarablesClear();
                contextObj.notificationService.ShowToaster("Select the Employee to be moved", 2);
                contextObj.insertSpaceAllotmentsAfterMove = undefined;
                contextObj.insertSpaceAllotments = undefined;

                contextObj.scenarioOpenDrawingObj.moveEmployeeInDrawingOnClick(function (retCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist) {
                    contextObj.insertSpaceAllotmentsAfterMove = { "employeeId": intEmployeeId, "previousXCord": previousXCord, "previousYCord": previousYCord, "currentXCord": currentXCord, "currentYCord": currentYCord, "selectedSymbolhandle": selectedSymbolhandle, "spaceId": spaceId, "EmployeeName": strEmployeeName, "GradeExist": gradeExist };

                    switch (retCode) {
                        case 1:
                            contextObj.notificationService.ClearAllToasts();
                            contextObj.notificationService.ShowToaster("Employee moved", 3);
                            break;
                        case 2: contextObj.invokeAssignScenarioEmployee(intEmployeeId, strEmployeeName, gradeExist, function (returnCode) { });
                            break;
                        case 3: contextObj.notificationService.ClearAllToasts();
                            contextObj.empDialogMessages = { key: 10, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                            contextObj.showSlideEmp = true;
                            break;
                        case 4: contextObj.notificationService.ClearAllToasts();
                            contextObj.empDialogMessages = { key: 11, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                            contextObj.showSlideEmp = true;
                            break;
                    }
                    //if (retCode == 0) {
                    //    contextObj.notificationService.ShowToaster("Employee moved.", 3);
                    //}
                });
            });
        }
        else
            this.notificationService.ShowToaster("No Employees are assigned to this floor", 5);
    }
    invokeAssignScenarioEmployee = function (employeeId, employeeName, gradeExist, resCallBack) {
        var contextObj = this;

        contextObj.insertSpaceAllotments = undefined;
        contextObj.employeeDrawingObj.invokeAssignEmployee(employeeId, employeeName, gradeExist, function (returnCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle) {
            contextObj.insertSpaceAllotments = { "employeeId": employeeId, "spaceId": spaceId, "drawingId": contextObj.drawingId, "xPosition": xPos, "yPosition": yPos };

            switch (returnCode) {
                case 1://1.Save
                    var selectedEmpCurrentData;
                    var index = contextObj.employeeDrawingObj.empData.findIndex(function (el) { return el.Id === employeeId });
                    if (index != -1)
                        selectedEmpCurrentData = contextObj.employeeDrawingObj.empData[index];
                    contextObj.scenarioOpenDrawingObj.moveEmployeeToSelectedSpace(employeeId, contextObj.insertSpaceAllotmentsAfterMove['previousXCord'], contextObj.insertSpaceAllotmentsAfterMove['previousYCord'], xPos, yPos, contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'], spaceId, function (retCode) {
                        contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                            contextObj.objiWhiz.setCursor(1);
                            resCallBack(returnCode, seatingCapacity, employeeId, contextObj.insertSpaceAllotmentsAfterMove['previousXCord'], contextObj.insertSpaceAllotmentsAfterMove['previousYCord'], xPos, yPos, contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'], spaceId, employeeName, gradeExist, selectedEmpCurrentData);
                        });
                    });
                    break;
                case 2: //contextObj.notificationService.ShowToaster("Select another point inside the space where the Employee " + employeeName + "is to be located", 3);
                    contextObj.invokeAssignScenarioEmployee(employeeId, employeeName, gradeExist, resCallBack);
                    break;
                case 3: contextObj.notificationService.ClearAllToasts();

                    contextObj.empDialogMessages = { key: 10, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                    contextObj.showSlideEmp = true;
                    resCallBack(0);
                    break;
                case 4: contextObj.notificationService.ClearAllToasts();
                    contextObj.empDialogMessages = { key: 11, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                    contextObj.showSlideEmp = true;
                    resCallBack(0);
                    break;
                case 8:
                    contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                    contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                        contextObj.objiWhiz.regenerate();
                        resCallBack(8);
                    });

                    break;
            }

        });
    }
    saveScenarioOnClick() {
        var contextObj = this;
        contextObj.scenarioOpenDrawingObj.saveEmpScenario(function (retCode) {

            if (retCode == 1) {
                contextObj.notificationService.ShowToaster("Scenario saved", 3);
            } else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });

    }
    singleassignHotelingClick(SpaceId?: any) {

        var contextObj = this;
        var spaceId = SpaceId != undefined ? SpaceId : contextObj.spaceIdForEdit;
        var spaceDataItem = this.schedulingDrawingObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === spaceId });
        contextObj.schedulingDrawingObj.assignHotelingSeat(spaceDataItem, contextObj.drawingId, contextObj.moduleId, function (retCode, returndata) {
            if (retCode == 0) {

                spaceDataItem = JSON.parse(returndata["Data"])[0];
                //    spaceDataItem["SeatingAssignmentTypeId"] = 5;
                //spaceDataItem["Space Assignment Type"] = "Hoteling";
                //spaceDataItem["Seating Capacity"] = "1";
                //spaceDataItem["Hoteling Seating Capacity"] = "1";
                contextObj.spaceObj.spaceEditReflectInDrawing(spaceDataItem, function (retCode) {

                    contextObj.schedulingDrawingObj.reArrangeSeats(spaceDataItem['SpaceId'], function (res) {

                    });

                });

                contextObj.updateWorkSpaceData = [];
                contextObj.updateWorkSpaceData.push({ "action": 1 });//to update data in grid                
                contextObj.notificationService.ShowToaster("Hoteling " + contextObj.seattxt + " assigned", 3);

            } else {
                if (retCode == -1) {
                    contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Hoteling " + contextObj.seattxt + "s", 5);
                }
                else if (retCode == -2)
                    contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than zero", 2);
                else contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });

    }
    assignSingleHotelingClickFromMenu() {

        if (this.isWaitMode())
            return;
        var contextObj = this;
        contextObj.objiWhiz.setCursor(2);
        contextObj.notificationService.ShowToaster("Select a space to set as Hoteling " + contextObj.seattxt, 2);
        contextObj.spaceObj.deHatch(function (retCode) {
            contextObj.deHatchVarablesClear();
            contextObj.setAsWorkspace();
        });
    }
    setAsWorkspace() {
        var contextObj = this;
        contextObj.spaceObj.getSelectedSpaceId(function (retCode, selectedSpaceId) {
            if (retCode == 0) {
                var spaceAssignmentType = contextObj.schedulingDrawingObj.getSpaceAssignmentType(selectedSpaceId);
                if (spaceAssignmentType == null || spaceAssignmentType == "") {
                    contextObj.objiWhiz.setCursor(1);
                    contextObj.singleassignHotelingClick(selectedSpaceId);
                } else
                    contextObj.notificationService.ShowToaster("Space Assignment Type is already assigned in the selected space", 2);
            } else if (retCode == 1) {
                contextObj.notificationService.ShowToaster("Click inside the space you wish to select", 2);
                contextObj.setAsWorkspace();
            } else {
                contextObj.objiWhiz.setCursor(1);
            }
        });
    }
    assignMultipleHotelingClick() {

        //Select multiple spaces
        if (this.isWaitMode())
            return;
        var contextObj = this;
        contextObj.selectedHandles = [];
        this.notificationService.ShowToaster("Select a window, click to select/deselect Space. Right click to exit", 2);
        contextObj.spaceObj.deHatch(function (retCode) {
            contextObj.deHatchVarablesClear();
            contextObj.spaceObj.deleteLayerAlredyExists("$HatchSingleEntityOnRightClick", function (rtn) {
                if (retCode == 0) {
                    contextObj.spaceObj.selectMultipleSpace(contextObj.isSpace, function (retCode, selectedHandles) {
                        if (retCode == 0) {
                            contextObj.selectedHandles = selectedHandles;
                            if (selectedHandles.length > 0)
                                contextObj.isHatch = true;
                            var spaceIds = contextObj.schedulingDrawingObj.spaceOpenDrawingObj.getSpcaceIdsArray(contextObj.isSpace, contextObj.selectedHandles);

                            var strSpaceIds = "";
                            var spaceCount = spaceIds.length;
                            var isSetAsWorkspace = false;
                            var isValid = true;
                            var caseIndex = 0;

                            for (var i = 0; i < spaceCount; i++) {
                                contextObj.schedulingDrawingObj.spaceOpenDrawingObj.spaceData.find(function (item) {
                                    if (item.SpaceId == spaceIds[i]) {

                                        var roomNumber = item['Room No.'];
                                        var roomCapacity = item['MaximumSeats'];
                                        var seatingAssignmentTypeId = item['SeatingAssignmentTypeId'];
                                        if ((roomNumber == "" || roomNumber == null) && (seatingAssignmentTypeId == null)) {//no assignened type and no room number

                                            //contextObj.dialogMessages.message = "Room No. is not assigned to some of the selected spaces. Do you want to proceed?";
                                            //contextObj.dialogMessages.key = 1;
                                            caseIndex = 1;

                                            isValid = false;


                                        }
                                        else if (seatingAssignmentTypeId == null && roomNumber != null) {//Set As Workspace
                                            isSetAsWorkspace = true;
                                        }
                                        else if (seatingAssignmentTypeId == 4 && roomNumber != null && caseIndex != 1) {//scheduling spaces and room number
                                            caseIndex = 2;
                                            isValid = false;
                                        }
                                        else if (seatingAssignmentTypeId == 1 && roomNumber != null && caseIndex != 1) {//assignable spaces and room number
                                            caseIndex = 3;
                                            isValid = false;
                                        }
                                        else if (seatingAssignmentTypeId == 5 && roomNumber != null && caseIndex != 1) {//hoteling and has  room number//already assigned
                                            caseIndex = 4;
                                            isValid = false;
                                        }
                                        else if (seatingAssignmentTypeId == 2 && roomNumber != null && caseIndex != 1) {//unassingable and no room number
                                            caseIndex = 5;
                                            isValid = false;
                                        }
                                        else {//other types

                                            if (caseIndex != 1) {
                                                caseIndex = 6;
                                                isValid = false;
                                            }
                                        }

                                    }

                                });
                                if (isValid == false && isSetAsWorkspace == true)
                                    break;
                                //contextObj.assignHotelingClick(spaceIds[i]);
                            }
                            if (isSetAsWorkspace == true) {
                                if (isValid == false) {

                                    switch (caseIndex) {
                                        case 1:
                                            contextObj.dialogMessages.message = "Room No. is not assigned to some of the selected spaces. Do you want to proceed?";
                                            contextObj.dialogMessages.key = 1;
                                            contextObj.showMultipleHotelingSeats = true;
                                            break;
                                        case 2:
                                            contextObj.dialogMessages.message = "Some of the selected spaces are Scheduling spaces. Do you want to proceed? ";
                                            contextObj.dialogMessages.key = 2;
                                            contextObj.showMultipleHotelingSeats = true;
                                            break;
                                        case 3:
                                            contextObj.dialogMessages.message = "Some of the selected spaces are Assignable spaces. Do you want to proceed? ";
                                            contextObj.dialogMessages.key = 3;
                                            contextObj.showMultipleHotelingSeats = true;
                                            break;
                                        case 4:
                                            contextObj.dialogMessages.message = "Some of the selected spaces are already assigned Hoteling. Do you want to proceed? ";
                                            contextObj.showMultipleHotelingSeats = true;
                                            contextObj.dialogMessages.key = 4;
                                            break;
                                        case 5:
                                            contextObj.dialogMessages.message = "Some of the selected spaces are UnAssignable spaces. Do you want to proceed? ";
                                            contextObj.showMultipleHotelingSeats = true;
                                            contextObj.dialogMessages.key = 5;
                                            break;
                                        case 6:
                                            contextObj.notificationService.ShowToaster("Space Assignment Type is already assigned in selected spaces", 3);
                                            //contextObj.dialogMessages.key = 6;
                                            break;

                                    }

                                }
                                else {
                                    contextObj.showMultipleHotelingSeats = false;

                                    if (contextObj.selectedHandles.length > 0) {
                                        var spaceIds = contextObj.schedulingDrawingObj.spaceOpenDrawingObj.getSpcaceIdsArray(contextObj.isSpace, contextObj.selectedHandles);
                                        contextObj.assignHotelingSeatOneByOne(spaceIds, function (retCode) {

                                            if (retCode == 1) {
                                                contextObj.notificationService.ShowToaster("Hoteling " + contextObj.seattxt + " assigned", 3);

                                            }
                                            contextObj.updateWorkSpaceData = [];
                                            contextObj.updateWorkSpaceData.push({ "action": 1 });//to update data in grid

                                        });


                                    }
                                }

                            }
                            else {
                                if (caseIndex == 1)
                                    contextObj.notificationService.ShowToaster("Room No. is not assigned to some of the selected spaces", 3);
                                else contextObj.notificationService.ShowToaster("Space Assignment Type is already assigned in selected spaces", 3);
                            }
                        }
                    });
                }
            });
        });




    }
    assignHotelingSeatOneByOne = function (spaceIds, resCallBack) {
        var contextObj = this;
        var isCompleted = false;
        //  var spaceIds = contextObj.schedulingDrawingObj.spaceOpenDrawingObj.getSpcaceIdsArray(contextObj.isSpace, contextObj.selectedHandles);
        var spaceId = spaceIds[contextObj.arrayCount];
        if (contextObj.arrayCount < spaceIds.length) {
            var spaceDataItem = contextObj.schedulingDrawingObj.spaceOpenDrawingObj.spaceData.find(function (el) { return el.SpaceId === spaceId });
            contextObj.schedulingDrawingObj.assignHotelingSeat(spaceDataItem, contextObj.drawingId, contextObj.moduleId, function (retCode, returndata) {
                if (retCode == 0) {
                    //spaceDataItem["SeatingAssignmentTypeId"] = 5;
                    //spaceDataItem["Space Assignment Type"] = "Hoteling";
                    //spaceDataItem["Seating Capacity"] = "1";
                    //spaceDataItem["Hoteling Seating Capacity"] = "1";
                    spaceDataItem = JSON.parse(returndata["Data"])[0];
                    contextObj.spaceObj.spaceEditReflectInDrawing(spaceDataItem, function (retCode) {

                        contextObj.schedulingDrawingObj.reArrangeSeats(spaceDataItem['SpaceId'], function (res) {
                            if (retCode == 0) {
                                isCompleted = true;
                                contextObj.arrayCount++;
                                contextObj.assignHotelingSeatOneByOne(spaceIds, resCallBack)
                            }
                        });

                    });
                    isCompleted = true;
                    contextObj.arrayCount++;
                    contextObj.assignHotelingSeatOneByOne(spaceIds, resCallBack)

                }
                else {
                    contextObj.arrayCount++;
                    contextObj.assignHotelingSeatOneByOne(spaceIds, resCallBack)

                }

            });
        }
        else {
            contextObj.arrayCount = 0;
            resCallBack(isCompleted);
        }
    }
    YesMultipleHotelingSeats(event: any, index) {

        if (this.isWaitMode())
            return;
        var contextObj = this;
        contextObj.showMultipleHotelingSeats = false;

        if (contextObj.selectedHandles.length > 0) {
            var spaceIds = contextObj.schedulingDrawingObj.spaceOpenDrawingObj.getSpcaceIdsArray(contextObj.isSpace, contextObj.selectedHandles);
            contextObj.assignHotelingSeatOneByOne(spaceIds, function (retCode) {
                if (retCode == 1) {
                    contextObj.notificationService.ShowToaster("Hoteling " + contextObj.seattxt + " assigned", 3);

                }
            });


        }
    }
    NoMultipleHotelingSeats(event: any) {

        this.showMultipleHotelingSeats = false;
    }


    public ShowEmpMoveRequestYesClick(event: Event) {
        var contextObj = this;
        this.showSecondaryViewSpaceTarget = -1;
        this.showSecondaryViewObjectTarget = -1;
        this.showEmployeeMoveRequest = !this.showEmployeeMoveRequest;  //!this.showEmpMoveResources;
        //  contextObj.EmployeeService.getEmployeeMoveRequestFields().subscribe(function (resultData) {
        contextObj.selectedEmployeeData = [];
        //this.ObjectDetailsForRequest
        if (contextObj.showEmployeeMoveRequestFromAssign) {
            this.pageTitle = "Assign Request";
            if (this.isMultipleEmployeeAssign == false) {
                this.SpaceDetailsForRequest.push(contextObj.insertSpaceAllotments);
                contextObj.selectedEmployeeData.push(contextObj.selectedEmpForAssign);
            } else
                contextObj.selectedEmployeeData = contextObj.selectedEmpForAssign;
        } else {
            this.pageTitle = "Move Request";
            if (contextObj.selectedMultipleMoveEmpDetails.length == 0) {
                this.SpaceDetailsForRequest.push(contextObj.insertSpaceAllotmentsAfterMove);
                contextObj.selectedEmployeeData.push(contextObj.employeeDrawingObj.getEmpData(contextObj.insertSpaceAllotmentsAfterMove['employeeId']));
            } else if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
                this.SpaceDetailsForRequest = contextObj.selectedMultipleEmpformoveDetails;
                if (this.moveEmpDetailsForAnotherFloor != undefined) {
                    for (let i = 0; i < contextObj.selectedMultipleEmpformoveDetails.length; i++) {
                        contextObj.selectedEmployeeData.push(contextObj.employeeDrawingObj.getEmpDataSecondFloor(contextObj.moveFullEmpDataForAnotherFloor, contextObj.selectedMultipleEmpformoveDetails[i]["employeeId"]));
                    }
                } else {
                    for (let i = 0; i < contextObj.selectedMultipleEmpformoveDetails.length; i++) {
                        contextObj.selectedEmployeeData.push(contextObj.employeeDrawingObj.getEmpData(contextObj.selectedMultipleEmpformoveDetails[i]["employeeId"]));
                    }
                }
            }

        }
        //contextObj.executeFlowFields = resultData["Data"];
        // contextObj.MoverequestFields = resultData["Data"];
        contextObj.showSecondaryViewEmployeeTarget = 4;
        contextObj.splitviewDrawing.showSecondaryView = !contextObj.splitviewDrawing.showSecondaryView;
        //  });
    }
    sumbitSuccessSentForApprovalFromMove(isAssign) {
        var contextObj = this;
        this.splitviewDrawing.showSecondaryView = false;
        this.showSecondaryViewEmployeeTarget = -1;
        this.showSecondaryViewSpaceTarget = -1;
        if (isAssign == false) {
            if (this.selectedMultipleMoveEmpDetails.length == 0) {
                contextObj.objiWhiz.enableRubberband(0, 0, 0, false);
                contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                    contextObj.objiWhiz.regenerate();
                    contextObj.objiWhiz.stopSvgTrails();
                });
            }
            else {
                if (contextObj.moveEmpDetailsForAnotherFloor == undefined) {
                    contextObj.positionApproval = 'top-right';
                    contextObj.employeeDrawingObj.afterMoveReverse();
                }
            }
        }
    }
    ShowEmpMoveRequestCancel(value: any) {
        if (value.change == false) {
            this.ShowEmpMoveRequestNoClick();
        }
    }
    public ShowEmpMoveRequestNoClick() {
        var contextObj = this;
        var arraycount1 = 0;
        this.showEmployeeMoveRequest = !this.showEmployeeMoveRequest;
        if (contextObj.selectedMultipleMoveEmpDetails.length == 0) {
            if (contextObj.showEmployeeMoveRequestFromAssign) {
                if (contextObj.isMultipleEmployeeAssign) {
                    contextObj.assignMultipleEmployeesThroughApprovalOrNot(false);
                } else {
                    var empId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId;
                    empId = contextObj.insertSpaceAllotments['employeeId'];
                    currentXCord = contextObj.insertSpaceAllotments['xPosition'];
                    currentYCord = contextObj.insertSpaceAllotments['yPosition'];
                    spaceId = contextObj.insertSpaceAllotments['spaceId'];
                    contextObj.employeeDrawingObj.insertSpaceAllotments(empId, spaceId, contextObj.drawingId, currentXCord, currentYCord, function (retCode) {
                        contextObj.notificationService.ClearAllToasts();
                        contextObj.notificationService.ShowToaster("Employee assigned", 3);
                        contextObj.isAssignSpace = true;
                        contextObj.assignedEmpIds.push(empId);
                        if (contextObj.assignFromGrid) {
                            contextObj.assignedEmpsData.push(contextObj.employeeDrawingObj.getEmpData(empId));
                            contextObj.outAssignedEmpIds.emit(contextObj.assignedEmpIds);
                        }
                        contextObj.employeeDrawingObj.empCount++;
                        contextObj.showEmployeeMoveRequestFromAssign = false;
                        contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
                    });
                }
            } else {
                contextObj.moveSingleEmployee();
            }
        }
        else if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
            contextObj.positionApproval = 'top-right';
            contextObj.moveMultipleEmployeeWithOutApproval();
            //if (contextObj.ApprovalForEmpMoveInDrawing) {
            //    contextObj.notificationService.ClearAllToasts();
            //    // contextObj.empDialogMessages = { key: 5, message: "Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
            //    // contextObj.moveemployeeId = intEmployeeId;
            //    contextObj.showEmployeeMoveRequestFromAssign = false;
            //    contextObj.moveassignRequestMessage = " Do you want to execute this move through the Approval Process?";
            //    contextObj.showEmployeeMoveRequest = true;
            //}
            //else {
            //    for (let i = 0; i < contextObj.selectedMultipleEmpformoveDetails.length; i++) {
            //        contextObj.employeeDrawingObj.multipleMoveEmployeeToSelectedSpace(contextObj.selectedMultipleEmpformoveDetails[i]["employeeId"], contextObj.selectedMultipleEmpformoveDetails[i]["previousXCord"], contextObj.selectedMultipleEmpformoveDetails[i]["previousYCord"],
            //            contextObj.selectedMultipleEmpformoveDetails[i]["currentXCord"], contextObj.selectedMultipleEmpformoveDetails[i]["currentYCord"], contextObj.selectedMultipleEmpformoveDetails[i]["selectedSymbolhandle"], contextObj.selectedMultipleEmpformoveDetails[i]["spaceId"], function (retCode) {
            //                arraycount1++;
            //                if (contextObj.selectedMultipleMoveEmpDetails.length == arraycount1) {
            //                    contextObj.employeeDrawingObj.afterMultipleEmpMove(contextObj.selectedMultipleMoveEmpDetails, contextObj.arrayCount, function (retCoce) {
            //                        contextObj.arrayCount = 0;
            //                        contextObj.selectedMultipleEmpformoveDetails = [];
            //                        //contextObj.showEmpMoveResources = true;
            //                        //contextObj.notificationService.ShowToaster("Employees Moved", 3);
            //                    });
            //                }
            //            });
            //    }
            //}
        }
        // !this.showEmpMoveResources;
        //contextObj.employeeDrawingObj.moveEmployeeToSelectedSpace(empId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, function (retCode) {
        //    contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
        //        contextObj.employeeDrawingObj.objiWhiz.setCursor(1);
        //        contextObj.employeeDrawingObj.objiWhiz.enableRubberband(0, 0, 0, false);
        //        contextObj.employeeDrawingObj.objiWhiz.regenerate();
        //    });
        //});
    }
    moveSingleEmployee() {
        var contextObj = this;
        var empId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId;
        if (contextObj.insertSpaceAllotments == undefined) {
            empId = contextObj.insertSpaceAllotmentsAfterMove['employeeId'];
            previousXCord = contextObj.insertSpaceAllotmentsAfterMove['previousXCord'];
            previousYCord = contextObj.insertSpaceAllotmentsAfterMove['previousYCord'];
            currentXCord = contextObj.insertSpaceAllotmentsAfterMove['currentXCord'];
            currentYCord = contextObj.insertSpaceAllotmentsAfterMove['currentYCord'];
            selectedSymbolhandle = contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'];
            spaceId = contextObj.insertSpaceAllotmentsAfterMove['spaceId'];
        } else {
            empId = contextObj.insertSpaceAllotmentsAfterMove['employeeId'];
            previousXCord = contextObj.insertSpaceAllotmentsAfterMove['previousXCord'];
            previousYCord = contextObj.insertSpaceAllotmentsAfterMove['previousYCord'];
            currentXCord = contextObj.insertSpaceAllotments['xPosition'];
            currentYCord = contextObj.insertSpaceAllotments['yPosition'];
            selectedSymbolhandle = contextObj.insertSpaceAllotmentsAfterMove['selectedSymbolhandle'];
            spaceId = contextObj.insertSpaceAllotmentsAfterMove['spaceId'];
        }
        contextObj.employeeDrawingObj.moveEmployeeToSelectedSpace(empId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, function (retCode) {
            contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                contextObj.employeeDrawingObj.objiWhiz.setCursor(1);
                contextObj.employeeDrawingObj.objiWhiz.enableRubberband(0, 0, 0, false);
                contextObj.objiWhiz.stopSvgTrails();
                contextObj.employeeDrawingObj.objiWhiz.regenerate();
                contextObj.resourceMove();
                contextObj.notificationService.ShowToaster("Employee moved", 3);
            });
        });
    }
    onSchedulingTabChanged(event) {
        var context = this;
        context.schdulingDataInDrawingTabindex = event['selectedTab'];
    }
    //closeMultipleHotelingSeatsDialog(value: any) {

    //    this.showMultipleHotelingSeats = value;

    //}
    //getUpdatedDisplaySettings(event) {
    //}
    ScaleEmployee(scalefactor) {
        (this.scalefactorValue) = parseFloat((scalefactor / 100).toString());
        var contextObj = this;

        this.employeeDrawingObj.scaleAllEmployees(scalefactor, function (ret) {
            contextObj.splitviewDrawing.showSecondaryView = !contextObj.splitviewDrawing.showSecondaryView;
            contextObj.ShowScaleFactor = true;
        });
    }
    ScaleEmployeeText(TextHeight) {
        // (this.TextHeightValue) = parseFloat((TextHeight / 100).toString());
        var contextObj = this;
        this.employeeDrawingObj.ScaleEmployeesTextHeight(TextHeight, function (ret) {

            contextObj.splitviewDrawing.showSecondaryView = !contextObj.splitviewDrawing.showSecondaryView;
            contextObj.ShowTextHeight = true;                                                /*procedure call*/

        });
    }
    SaveScaleFactor(Reset) {
        var contextObj = this;

        //  this.NewScaleFactor = this.employeeDrawingObj.g_dblScaleFactor * contextObj.scalefactorValue / 100;
        if (Reset == true)
            var newScalevalue: any = 1;
        else
            newScalevalue = this.employeeDrawingObj.NewScaleFactor;
        contextObj.employeeDrawingObj.g_dblScaleFactor = contextObj.employeeDrawingObj.NewScaleFactor;
        var reportfieldIdArray: ReportFieldIdValues[] = [];
        reportfieldIdArray.push({
            ReportFieldId: 615,
            Value: contextObj.drawingId,
        });
        reportfieldIdArray.push({
            ReportFieldId: 616,
            Value: contextObj.moduleId,
        });
        reportfieldIdArray.push({
            ReportFieldId: 618,
            Value: parseFloat(newScalevalue == undefined ? 1 : newScalevalue),
        });
        contextObj.EmployeeService.UpdateEmployeeScaleFactor(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {
            contextObj.employeeDrawingObj.g_dblScaleFactor = contextObj.employeeDrawingObj.NewScaleFactor;
            if (result.Data.ServerId > 0) {
                if (Reset != true) {
                    contextObj.notificationService.ShowToaster("Employee Symbol scaled", 3);
                    contextObj.ShowScaleFactor = false;
                }
                else {
                    contextObj.notificationService.ShowToaster("Default Employee scale restored", 3);
                }
            }
        });
    }
    EmployeeTextHeight() {
        var contextObj = this;
        var TextHeightValue = this.employeeDrawingObj.NewTextHeight;
        var reportfieldIdArray: ReportFieldIdValues[] = [];
        reportfieldIdArray.push({
            ReportFieldId: 615,
            Value: contextObj.drawingId,
        });
        reportfieldIdArray.push({
            ReportFieldId: 616,
            Value: contextObj.moduleId,
        });
        reportfieldIdArray.push({
            ReportFieldId: 617,
            Value: TextHeightValue == undefined ? 1 : TextHeightValue,
        });
        contextObj.EmployeeService.UpdateEmployeeScaleFactor(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {
            if (result.Data.ServerId > 0) {
                contextObj.notificationService.ShowToaster("Text Height set as default", 3);
                contextObj.ShowTextHeight = false;
            }
        });
    }

    SelectConnectComponent() {
        var contextObj = this;
        var connectionAvailable;
        contextObj.objectsDrawingObj.SelectFromBlinkConnectComponents(function (ret, SecondaryObjectid) {
            if (ret == 0) {
                //contextObj.isHatch = true;
                //contextObj.isBlink = true;
                var reportfieldIdArray: ReportFieldIdValues[] = [];
                var IsInsert = 1;
                //  var PrimaryObjectId = contextObj.primaryObjectId;
                if (contextObj.ConnectedArrayOfConnectivity.some(function (item) { return item == SecondaryObjectid })) {
                    connectionAvailable = 1;
                }

                if (connectionAvailable == 1) {
                    contextObj.objectsService.SelectConnectivity(1, contextObj.primaryObjectId, SecondaryObjectid, contextObj.AssociationId, 0, 0, 0, 0, 0).subscribe(function (result) {
                        if (result.StatusId == 1) {
                            var FindObjectNumber: any = contextObj.fieldDetails[0];
                             var PrimaryComponentNo = JSON.parse(FindObjectNumber)[0].ObjectNumber; //contextObj.fieldDetails[0][0].ObjectNumber;

                            contextObj.objectsService.GetAssociationTypeForConnectivity(SecondaryObjectid).subscribe(function (result) {
                                var controls = JSON.parse(result.FieldBinderData);
                                var SecondaryComponentNo = controls[0].ObjectNumber;

                                contextObj.notificationService.ShowToaster("Connectivity set between " + PrimaryComponentNo + " and " + SecondaryComponentNo, 3);
                                if (contextObj.objectarryLength > 1) {
                                    contextObj.ShowConnectAgain = true;
                                    contextObj.objectarryLength--;
                                }
                            });
                        }
                    });
                } else
                    contextObj.objectsService.GetAssociationTypeForConnectivity(SecondaryObjectid).subscribe(function (result) {
                        debugger
                        var selectedObjectClassId = JSON.parse(result.FieldBinderData)[0].ObjectClassId;
                        var componentTypeValue = contextObj.BlinkWithInDrawings[2].Value;
                        var FindObjectNumber: any = contextObj.fieldDetails[0];
                        var PrimaryComponentNo = JSON.parse(FindObjectNumber)[0].ObjectNumber;


                        var selectedObjectnumber=JSON.parse(result.FieldBinderData)[0].ObjectNumber;
                        // var ClassName = JSON.parse(result.FieldBinderData)[0].Class;
                        //var ObjectName = JSON.parse(result.FieldBinderData)[0].ObjectNumber;

                        if (selectedObjectClassId == componentTypeValue) {
                            contextObj.notificationService.ShowToaster("Connectivity already exists between " + "'" + PrimaryComponentNo + "'" + " and " + "'" + selectedObjectnumber +"'", 2);
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Selected Component is not of Component Type " + "'" + contextObj.SecondaryComponentTypeForToaster + "'", 2);
                            contextObj.ShowConnectAgain = true;
                        }
                    });
            }
        });
    }

    RemoveConnectionfromConnection() {

        var contextObj = this;
        var PrimaryObjectId = contextObj.primaryObjectId;
        contextObj.objectsService.RemoveConnectivityFromGrid(0, PrimaryObjectId, contextObj.GridSecondaryObjectId, contextObj.AssociationId, 0, 0, 0, 0, 0).subscribe(function (result) {
            if (result.StatusId == 1) {
                // var index = contextObj.removeConnectivityGrid.findIndex(function (item) { return item.ObjectId == contextObj.GridSecondaryObjectId });
                // contextObj.removeConnectivityGrid.splice(index, 1);
                contextObj.notificationService.ShowToaster("Connection Removed", 3);
            }
        });
    }

    submitSpaceSearch(spaceIds) {
        var contextObj = this;
        this.spaceObj.showSelectedSpaceInDrawing(spaceIds, function (retCode, SearchForSpaceSelectedHandles) {

            if (retCode == 0) {
                if (SearchForSpaceSelectedHandles.length > 0) {
                    contextObj.selectedHandles = SearchForSpaceSelectedHandles;
                }
                contextObj.isBlink = false;
                contextObj.isHatch = true;
                contextObj.isBlink = true;
            }

        });
    }

    searchForSpaceClear(dataSource) {
        // this.toView = false;
        this.deHatchOnClick();

        this.SearchForSpace({
            event: "clear",
            newSource: dataSource
        });

    }

    SearchForSpaceClose() {
        this.SearchForSpace({ event: "close" });
    }

    Submit(event: any) { }
    onloadSearch(event: any) { }

    okClick(event: Event) {
        this.SaveScaleFactor(false);
    }

    cancelClick(event: Event) {
        this.ShowScaleFactor = false;
    }
    okClickConnectComponent(event: Event) {
        this.ShowConnectComponent = false;
        this.SelectConnectComponent();

    }
    cancelClickConnectComponent(event: Event) {
        this.ShowConnectComponent = false;
        this.objiWhiz.removeBlinkers();
    }
    okClickConnectAgain(event: Event) {
        this.ShowConnectAgain = false;
        this.SelectConnectComponent();
        this.splitviewDrawing.showSecondaryView = false;
    }
    cancelClickConnectAgain(event: Event) {
        this.ShowConnectAgain = false;
        this.stopBlinkOnClick();
    }

    okTextHeightClick(event: Event) {
        this.EmployeeTextHeight();
    }
    cancelTextHeightClick(event: Event) {
        this.ShowTextHeight = false;
    }
    okClickAnotherDrawing(event: Event) {
        this.ConnectOutsideCurrentDrawing();
    }
    cancelClickAnotherDrawing(event: Event) {
        this.ConnectWithInCurrentDrawing();
    }

    //Re link Employee
    RelinkEmployee() {
        var contextObj = this;
        this.employeeDrawingObj.relinkempdata = undefined;
        this.showSecondaryViewEmployeeTarget = 6
        this.splitviewDrawing.showSecondaryView = true;
        this.pageTitle = "Re-Link Employees";

        if (contextObj.relinkempcount == 0) {
            contextObj.notificationService.ShowToaster('No Employees to be relinked', 2);
            this.splitviewDrawing.showSecondaryView = false;
            /* var index = contextObj.empMoreMenu.findIndex(function (el) { return el.menuId == 9 })
             if (index > -1)
                 contextObj.empMoreMenu.splice(index, 1);*/
        }


    }
    relinkSubmit(event) {
        var contextObj = this;
        contextObj.nospacehandlearray = [];
        contextObj.notemparray = [];
        contextObj.sometemparray = [];
        contextObj.isrelinkclick = true;
        console.log('relink submit return in open drawing', event)
        this.employeeDrawingObj.getSpaceHandleforRelink(event, function (spacehandlearray) {
            console.log('spacehandle array', spacehandlearray);
            contextObj.splitviewDrawing.showSecondaryView = false;
            this.showSecondaryViewEmployeeTarget = -1;
            for (var i = 0; i < spacehandlearray.length; i++) {
                var empobj = event.find(function (item) { return item.Id == spacehandlearray[i].Key })
                if (spacehandlearray[i].Value == "") {
                    contextObj.notemparray.push(empobj)
                } else
                    contextObj.sometemparray.push(empobj)

            }
            contextObj.nospacehandlearray.push({ "RowData": contextObj.notemparray })
            contextObj.completeidspacehandlearray = spacehandlearray;
            contextObj.SpaceDetailsForRequest = [];
            if (contextObj.notemparray.length > 0 && contextObj.sometemparray.length == 0) {
                //select space and assign as there are no space handle assigned to the position of employee
                //contextObj.showSlideEmp = true;
                contextObj.isMultipleEmployeeAssign = true;
                //contextObj.empDialogMessages = { key: 20, message: "Do you want to link the employee to another space?" }
                contextObj.arrayCount = 0;
                contextObj.assignSpacetoEmpEventData = contextObj.nospacehandlearray[0];
                contextObj.assignMultipleEmpsOneByOne(contextObj.notemparray);
            }
            else if ((contextObj.notemparray.length == 0 && contextObj.sometemparray.length > 0) || (contextObj.notemparray.length > 0 && contextObj.sometemparray.length > 0)) {
                //hatching required for sometemparray
                contextObj.recursiveRelinkSomeTemp(contextObj.completeidspacehandlearray);


            }
        });
    }
    recursiveRelinkSomeTemp(idspacehandlearray) {
        var contextObj = this;
        if (contextObj.sometemparray.length > this.arrayCount) {
            var employeeDataItem = contextObj.sometemparray[this.arrayCount];
            var employeeName = employeeDataItem['Employee Name'];
            var empId = employeeDataItem['Id'];
            var spacehandle = idspacehandlearray.find(function (item) { return item.Key === empId })
            contextObj.spaceObj.hatchSingleEntity(spacehandle.Value, function (retCode) {
                if (retCode == 0) {
                    contextObj.showSlideEmp = true;
                    contextObj.empDialogMessages = { key: 21, message: "Do you want to link the employee " + employeeName + "to the hatched space?" };
                }
            });
        }
        else {
            contextObj.assignMultipleEmployeesThroughApprovalOrNot(true);
            contextObj.sometemparray = [];
            if (contextObj.notemparray.length != 0) {
                contextObj.showSlideEmp = false;
                contextObj.isMultipleEmployeeAssign = true;
                //contextObj.empDialogMessages = { key: 20, message: "Do you want to link the employee to another space?" }
                contextObj.arrayCount = 0;
                contextObj.assignSpacetoEmpEventData = contextObj.nospacehandlearray[0];
                contextObj.assignMultipleEmpsOneByOne(contextObj.notemparray);
            }

        }

    }
    invokeRelinkEmployee = function (sometemparray, rescallback) {
        var contextObj = this;
        var empId = sometemparray["Id"];
        var employeeName = sometemparray["Employee Name"];
        var spacehandle = contextObj.completeidspacehandlearray.find(function (item) { return item.Key === empId })
        var spaceid = contextObj.spaceObj.getSpaceDataFromHandle(spacehandle.Value)["SpaceId"]
        contextObj.employeeDrawingObj.insertSpaceAllotments(empId, spaceid, contextObj.drawingId, sometemparray["XPosition"], sometemparray["YPosition"], function (rescallback) {
            if (rescallback == 0) {
                contextObj.notificationService.ShowToaster(employeeName + " assigned", 3);
                contextObj.employeeDrawingObj.empCount++;
                contextObj.assignedEmpsData.push(contextObj.employeeDrawingObj.getEmpData(empId));
                contextObj.isAssignSpace = true;
                contextObj.arrayCount++;
                if (contextObj.isrelinkclick) { //to update the itemsource for relink, count, and to negate the click attribute
                    contextObj.relinkempcount--;
                    var index = contextObj.relinkempdata.findIndex(function (item) { return item.Id === sometemparray.Id })
                    if (index > -1)
                        contextObj.relinkempdata.splice(index, 1)
                }
                contextObj.recursiveRelinkSomeTemp(contextObj.completeidspacehandlearray);
            }
        })

    }
    invokeRelinkAssign = function (sometemparray, callback) {
        var contextObj = this;
        var empId = sometemparray["Id"];
        var employeeName = sometemparray["Employee Name"];
        var spacehandle = contextObj.completeidspacehandlearray.find(function (item) { return item.Key === empId })
        //var spaceid = contextObj.spaceObj.getSpaceDataFromHandle(spacehandle.Value)["SpaceId"];
        var gradeExist: boolean = false;// not implemented yet
        contextObj.isMultipleEmployeeAssign = true;
        contextObj.employeeDrawingObj.invokeAssignEmployee(empId, employeeName, gradeExist, function (returnCode, seatingCapacity, spaceId, xPos, yPos, strSpaceHandle) {
            contextObj.insertSpaceAllotments = { "employeeId": empId, "spaceId": spaceId, "drawingId": contextObj.drawingId, "xPosition": xPos, "yPosition": yPos };
            switch (returnCode) {
                case 1:
                    contextObj.SpaceDetailsForRequest.push(contextObj.insertSpaceAllotments);
                    contextObj.arrayCount++;
                    contextObj.recursiveRelinkSomeTemp(contextObj.completeidspacehandlearray);
                    break;
                case 2: //contextObj.notificationService.ShowToaster("Select another point inside the space where the Employee " + employeeName + "is to be located", 3);
                    contextObj.recursiveRelinkSomeTemp(contextObj.completeidspacehandlearray);
                    break;
                case 3: contextObj.notificationService.ClearAllToasts();
                    contextObj.empDialogMessages = { key: 1, message: "Assignable Seating Capacity of the selected Space is zero, do you still want to assign?" };
                    contextObj.showSlideEmp = true;
                    break;
                case 4: contextObj.notificationService.ClearAllToasts();
                    contextObj.empDialogMessages = { key: 2, message: "Assignable Seating Capacity is only " + seatingCapacity + ", do you still want to assign?" };
                    contextObj.showSlideEmp = true;
                    break;
                case 8:
                    contextObj.isrelinkclick = true;
                    contextObj.assignMultipleEmployeesThroughApprovalOrNot(true);
                    break;
            }

        });

    }

    //delete Employee
    okDelete(empid) {
        var contextObj = this;
        this.showSlideEmp = false;
        this.employeeDrawingObj.CheckEmployeeStatus(empid, function (returncode) {
            if (returncode == 1) {//supervisor slide
                contextObj.showSlideEmp = true;
                contextObj.empDialogMessages = { key: 31, message: " Selected Employee is a supervisor for other employees. Do you want to continue with the deletion?" };
            }
            else if (returncode == 0)
                contextObj.DeleteEmployee(returncode);
        })


    }
    DeleteEmployee(target) {
        var contextObj = this;
        contextObj.employeeDrawingObj.deleteAfterconfirm(contextObj.insertSpaceAllotments['employeeId'], function (retcode) {
            //if (target == 1)//supervisor related delete--related to 80513 to be uncommented when the bug is completed
            //{
            //    contextObj.employeeDrawingObj.getAllEmployeeDetails(); 
            //}
            contextObj.notificationService.ClearAllToasts();
            contextObj.notificationService.ShowToaster("Employee deleted", 3);
            contextObj.deAssignedEmpId = contextObj.insertSpaceAllotments['employeeId'];
            contextObj.IsDeassignEmp = false;
            contextObj.employeeDrawingObj.empCount--;
            if (contextObj.employeeDrawingObj.empCount == 0)
                contextObj.notificationService.ShowToaster("No Employees exist", 2);
        });
    }

    //Orphan record handling in Objects
    OrphanObjects() {
        console.log('orphan record handling click')
        this.showSecondaryViewObjectTarget = 4;
        this.splitviewDrawing.showSecondaryView = true;
        this.pageTitle = "Orphan";

        if (this.orphanObjectcount == 0) {
            this.notificationService.ShowToaster("No " + this.objectname + " to be relinked", 2);
            this.splitviewDrawing.showSecondaryView = false;
        }
    }
    orphanHandleOut(event) {
        var contextObj = this;
        contextObj.nospacehandlearray = [];
        contextObj.notemparray = [];
        contextObj.sometemparray = [];
        contextObj.isrelinkclick = true;
        this.arrayCount = 0;
        console.log('relink object rowdata', event);
        this.objectsDrawingObj.getSpaceHandleforRelink(event, function (spacehandlearray) {
            console.log('spacehandle array', spacehandlearray);
            if (event.length > 0) {
                contextObj.splitviewDrawing.showSecondaryView = false;
                contextObj.showSecondaryViewObjectTarget = -1;
            }
            for (var i = 0; i < spacehandlearray.length; i++) {
                var objectObj = event.find(function (item) { return item.ObjectId == spacehandlearray[i].Key })
                if (spacehandlearray[i].Value == "") {
                    contextObj.notemparray.push(objectObj)
                } else
                    contextObj.sometemparray.push(objectObj)
            }
            contextObj.nospacehandlearray.push({ "RowData": contextObj.notemparray })
            contextObj.completeidspacehandlearray = spacehandlearray;
            if (contextObj.notemparray.length > 0 && contextObj.sometemparray.length == 0) {
                contextObj.arrayCount = 0;
                contextObj.assignObjectOneByOne(event, contextObj.dwgDetailsData);
            }
            else if ((contextObj.notemparray.length == 0 && contextObj.sometemparray.length > 0) || (contextObj.notemparray.length > 0 && contextObj.sometemparray.length > 0)) {
                contextObj.recursiveRelinkSomeObjects(contextObj.completeidspacehandlearray)
            }
        })


    }
    recursiveRelinkSomeObjects(idspacehandlearray) {

        var contextObj = this;
        contextObj.isrelinkclick = true;
        if (contextObj.sometemparray.length > contextObj.arrayCount) {
            var objectDataItem = contextObj.sometemparray[this.arrayCount];
            console.log('some temp case', objectDataItem);
            var objectId = objectDataItem["ObjectId"]
            var objectType = (contextObj.moduleId == 18 || contextObj.moduleId == 26 || contextObj.moduleId == 25 || contextObj.moduleId == 17 || contextObj.moduleId == 27) ? "Type" : "Class";
            var object = contextObj.objectname + " " + objectType;
            var assetclass = objectDataItem[object];
            var assetno = objectDataItem[contextObj.objectname + " No."];
            var NumberWithClassName = objectDataItem["NumberWithClassName"];


            var spacehandle = idspacehandlearray.find(function (item) { return item.Key === objectId })
            contextObj.spaceObj.hatchSingleEntity(spacehandle.Value, function (retCode) {
                if (retCode == 0) {
                    contextObj.showObjectDrawingslide = true;
                    if (assetno = "" || assetno == null) {
                        contextObj.objectmessage = { key: 1, message: "Do you want to relink the  " + assetclass + " to the hatched space?" };
                    } else {
                        contextObj.objectmessage = { key: 1, message: "Do you want to relink the  " + NumberWithClassName + " to the hatched space?" };
                    }
                }
            });
        }
        else {
            contextObj.sometemparray = [];
            if (contextObj.notemparray.length != 0) {
                contextObj.showObjectDrawingslide = false;
                contextObj.arrayCount = 0;
                contextObj.assignObjectOneByOne(contextObj.notemparray, contextObj.dwgDetailsData);
            }
        }
    }
    invokeRelinkObject = function (sometemparray, resCallback) {
        var contextObj = this;
        var xpos = sometemparray["Xposition"];
        var ypos = sometemparray["Yposition"];
        var spaceId = sometemparray["SpaceId"];
        var isreturncode: boolean = false;
        this.objectsDrawingObj.PlaceCoreSymbol(xpos, ypos, spaceId, sometemparray, this.dwgDetailsData.SiteId, function (resplacecallback) {
            if (resplacecallback != 0) {
                isreturncode = true;
                contextObj.IsObjectPlaced = true;
                contextObj.cdr.detectChanges();
                contextObj.afterassetplace.emit({ "Selecteddetails": sometemparray })
                contextObj.updateObjectdataafterrelink(sometemparray);
                contextObj.arrayCount++;
                contextObj.recursiveRelinkSomeObjects(contextObj.completeidspacehandlearray);

            }
            else {
                isreturncode = false;
            }
        })
    }
    invokeRelinkAssignObject = function (sometemparray, callbak) {
        var contextObj = this;
        this.objectsDrawingObj.placeSymbolInDrawing(sometemparray, contextObj.dwgDetailsData.SiteId, contextObj.spaceIdForEdit, function (retCode) {
            if (retCode) {
                //isreturncode = true;
                contextObj.IsObjectPlaced = true;
                contextObj.updateObjectdataafterrelink(sometemparray);
                contextObj.arrayCount++;
                contextObj.recursiveRelinkSomeObjects(contextObj.completeidspacehandlearray);
            }
            else {
                // isreturncode = false;
            }
            contextObj.afterassetplace.emit({ "Selecteddetails": sometemparray })
        });
    }
    updateObjectdataafterrelink(sometemparray) {
        var contextObj = this;
        if (contextObj.orphanObjectcount > 0 && contextObj.isrelinkclick) {
            contextObj.isrelinkclick = false;
            contextObj.orphanObjectcount--;
            var index = contextObj.orphanObjectData.findIndex(function (item) { return item.ObjectId === sometemparray.ObjectId })
            if (index > -1)
                contextObj.orphanObjectData.splice(index, 1)
        }
    }

    okObjectDraw(messageId) {
        var contextObj = this;
        this.showObjectDrawingslide = false;
        switch (messageId) {
            case 1:
                contextObj.spaceObj.deHatch(function (retcode) { });
                contextObj.invokeRelinkObject(contextObj.sometemparray[contextObj.arrayCount], function (retcode) {
                })
                break;
            case 2:
                contextObj.invokeRelinkAssignObject(contextObj.sometemparray[contextObj.arrayCount], function (retcode) { });
                break;
            case 3:
                contextObj.copyObjectAfterConfirm();
                break;
        }

    }
    cancelObjectDraw(messageId) {
        var contextObj = this;
        this.showObjectDrawingslide = false;
        switch (messageId) {
            case 1:
                contextObj.spaceObj.deHatch(function (retcode) { });
                contextObj.showObjectDrawingslide = true;
                contextObj.objectmessage = { key: 2, message: "Do you want to relink the asset to another space?" }
                break;
            case 2:
                this.arrayCount++;
                contextObj.recursiveRelinkSomeObjects(contextObj.completeidspacehandlearray)
                break;
        }
    }

    MoveEmployeeToAnotherFloor() {
        var contextObj = this;
        contextObj.arrayCount = 0;
        contextObj.selectedMultipleEmpformoveDetails = [];
        contextObj.insertSpaceAllotmentsAfterMove = undefined;
        contextObj.selectedMultipleMoveEmpDetails = [];
        contextObj.ObjectDetailsForRequest = [];
        contextObj.SpaceDetailsForRequest = [];
        contextObj.selectedEmployeeData = [];
        if (this.employeeDrawingObj.empCount > 0) {
            this.spaceObj.deHatch(function (retcode) {
                contextObj.deHatchVarablesClear();
                contextObj.notificationService.ShowToaster("Click to select/deselect Employee. Right click to Exit", 2);
                contextObj.insertSpaceAllotmentsAfterMove = undefined;
                contextObj.insertSpaceAllotments = undefined;
                contextObj.employeeDrawingObj.moveMultipleEmployeeInDrawingOnClick(function (selectedMultipleEmpDetails) {
                    contextObj.selectedMultipleMoveEmpDetails = selectedMultipleEmpDetails;
                    if (contextObj.selectedMultipleMoveEmpDetails.length > 0) {
                        contextObj.pageTitle = "Move Employee(s) to Another Floor";
                        contextObj.btnName = "Save";
                        contextObj.isShowPrimaryDrawing = false;
                        contextObj.showSecondaryViewEmployeeTarget = 56;
                        contextObj.splitviewDrawing.showSecondaryView = true;

                        for (let i = 0; i < contextObj.selectedMultipleMoveEmpDetails.length; i++) {
                            contextObj.selectedEmployeeData.push(contextObj.employeeDrawingObj.getEmpData(contextObj.selectedMultipleMoveEmpDetails[i]["Id"]));
                        }
                        // contextObj.moveMultipleEmpsOneByOne(contextObj.selectedMultipleMoveEmpDetails);
                    }
                });
            });
        }
        else
            this.notificationService.ShowToaster("No Employees are assigned to this floor", 5);
    }
    EmployeesDetailsSelectedForAfterMove(empData) {         /*AfterMove*/
        this.MoveDrawingEmployeesDetails = empData.EmployeesDetailsSelectedForMove.EmployeesDetailsSelectedForMove;




    }
    SnapObject_OnClick(mainTarget, target) {
        var contextObj = this;
        contextObj.IsObjectMoved = false;
        if (target == 1) {
            this.notificationService.ShowToaster("Click near desired corner of " + this.objectname + " to be moved", 2);
        } else if (target == 2) {
            this.notificationService.ShowToaster("Click near desired corner of " + this.objectname + " to be moved", 2);
        } else if (target == 3) {
            this.notificationService.ShowToaster("Click near desired edge of " + this.objectname + " to be moved", 2);
        }
        this.objectsDrawingObj.deHatchSingleObject(function (retC) {
            contextObj.objectsDrawingObj.selectFirstObjectToSnap(mainTarget, target, function (ret, objectId) {
                if (ret == 0) {
                    contextObj.moveAssetsDetails.push(objectId);
                    contextObj.IsObjectMoved = true;
                    contextObj.notificationService.ShowToaster(contextObj.objectname + " aligned", 3);
                }
            });
        });
    }
    moveEmployeeFromContextmenu() {

        var contextObj = this;
        contextObj.SpaceDetailsForRequest = [];
        contextObj.selectedMultipleMoveEmpDetails = [];
        contextObj.ObjectDetailsForRequest = [];
        contextObj.insertSpaceAllotmentsAfterMove = undefined;
        contextObj.insertSpaceAllotments = undefined;
        contextObj.employeeDrawingObj.beforeMoveSpaceId = undefined;
        var gradeExist: boolean = false;
        var isFieldSubscribed: number;
        var selectedEmpHandle = this.employeeDrawingObj.empHandlesData.find(function (el) { return el.EmpId === contextObj.assignedEmployeeSelectedId }).SymbolHandle;
        var empData = this.employeeDrawingObj.getEmpData(contextObj.assignedEmployeeSelectedId);
        contextObj.objiWhiz.startSvgTrails(selectedEmpHandle, 0, 0, function (retCode) { });
        contextObj.employeeDrawingObj.empDrawingService.isFieldSubscribed(2, 874).subscribe(function (resultData) {//fieldSubscriptionCategoryId=2,reportFieldId=874
            isFieldSubscribed = JSON.parse(resultData["Data"]);
            if (contextObj.employeeDrawingObj.g_blnSpaceAllocationRuleEnabled && isFieldSubscribed > 0)
                gradeExist = true;

            contextObj.employeeDrawingObj.moveEmployeeCheckFromContextMenu(empData['Id'], function (retcode) {
                if (retcode == 1) {
                    contextObj.employeeDrawingObj.invokeSelectedEmpDetails(contextObj.assignedEmployeeSelectedId, empData['Employee Name'], gradeExist, empData["XPosition"], empData["YPosition"], selectedEmpHandle, function (retCode, seatingCapacity, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist) {
                        contextObj.moveSingleEmployeeAfterSelection(retCode, intEmployeeId, previousXCord, previousYCord, currentXCord, currentYCord, selectedSymbolhandle, spaceId, strEmployeeName, gradeExist, seatingCapacity);
                    });
                } else {
                    contextObj.employeeDrawingObj.deHatchEmployee(function (retCode) {
                        contextObj.objiWhiz.stopSvgTrails();
                    });
                }
            });
        });

    }

    objectsSearchForSpace() {
        debugger

    }

}



export interface MarkupLayers {
    markupId: number;
    layerName: string;
}
export interface IContextMenu {
    menuId: number;
    menuName: string;
    secondMenu?: IContextMenu[];
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
export interface empmultiplemove {
    employeeId: any;
    previousXCord: any;
    previousYCord: any;
    currentXCord: any;
    currentYCord: any;
    selectedSymbolhandle: any;
    spaceId: any;
}
export interface Deleteresources {
    ReportFieldId: number;
    Value: string;
}
interface ReportFieldIdValues {
    ReportFieldId: number,
    Value: any
}


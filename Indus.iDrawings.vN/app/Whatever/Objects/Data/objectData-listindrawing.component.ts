import {Component, EventEmitter, AfterViewInit, Output, Input, OnInit, ViewEncapsulation, SimpleChange, OnChanges, ChangeDetectorRef} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { ObjectsService } from '../../../Models/Objects/objects.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { AttachmentsComponent } from '../../Common/Attachments/attachments.component';
import { ObjectDataAddEditComponent } from './objectData-addedit.component'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {DrawingDetailsComponent} from '../../common/drawingdetails/drawingdetails.component';
//import {AssetsOpenDrawing} from '../../objects/assets/drawings/assetsopendrawing.service';
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import {WarrantyListComponent} from '../../Objects/Data/warranty-list.component';
import { CommonService } from '../../../models/common/common.service';
import { MultipleEdit, IMultipleSubmitOutput } from '../../../framework/whatever/multipleedit/multiple-edit.component';
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';

@Component({
    selector: 'objectData-listindrawing',
    templateUrl: './app/Views/Objects/Data/objectData-listindrawing.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, TabsComponent, TabComponent, DisplaySettingsComponent, DropDownListComponent, AttachmentsComponent,
        ListBoxComponent, ObjectDataAddEditComponent, searchBox, WarrantyListComponent, MultipleEdit, Analytics],
    providers: [ObjectsService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ExportToExcel, CommonService],
    inputs: ["objectCategoryId", "dataOption", "drawingIds", "moduleId", "SiteId", "isBuildingDrawing"],
    encapsulation: ViewEncapsulation.None
})

export class ObjectDataListinDrawingComponent implements AfterViewInit, OnChanges {
    @Input() updateObjectsDetails: any;
    @Input() updateDataSource: any;
    fieldObjectGrid: IField[];
    fieldDetailsAdd1: IField[];
    ddlObjectClassDisplaySettings: IField;
    fieldDetailsAdd: IField[];
    fieldDetailsCheckBox: IField;
    gridHeight: any = "100%";
    itemsSource: any[];
    parentLeaseDetails: any[];
    advancelookup: IField[];
    inputItems: IGrid = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: true, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'Multiple', showContextMenu: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    secondaryTarget: number = 100;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 100 };
    action: string;
    filter = "";
    btnName: string;
    objectCategoryId: number;
    moduleId: number;
    KeywordFieldObject: any;
    allObjectAction: string;
    message;
    PageTarget = 0;
    objiWhiz: any;
    varsort: string = "DESC";
    spaceIdForEdit: number;
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    blnIsGrid: boolean = true;
    IsSearchmenuNeeded: boolean = false;
    dispSettingCategoryId = 6;
    dispTab: number = 0;
    MultiFieldValues: any[];
    //objectsDrawingObj: AssetsOpenDrawing;
    commonDisplaySettingCategoryId: number;
    spaceDisplaySettingCategoryId: number;
    MultiFieldValuesforassigned: any[];
    MultiFieldValuesforunassigned: any[];
    assigneddrawingids: any[];
    arrHighlightRowIds = [];
    selectedDrawingId: number;
    selectedSpaceid: number;
    haseditprivilage: any = 1;
    commonAdditionalDataFieldCategoryId: number;
    spaceAdditionalDataFieldCategoryId: number;
    selectedObjectClassDisplaySettingsId: number = 0;
    @Input() Targetforstyle: any;
    @Input() IsObjectPlaced: boolean;
    @Input() IsObjectMoved: boolean;
    @Input() ObjectDelinked: any;
    @Input() selectedRow: any;
    @Output() submitSuccess = new EventEmitter();
    @Output() UpdatedSuccess = new EventEmitter();
    @Output() showZoomOnClick = new EventEmitter();
    @Output() showInDrawingOnClick = new EventEmitter();
    @Output() PlaceObjectOnClick = new EventEmitter();
    @Output() DelinkOnClick = new EventEmitter();
    @Output() Attachmentcount = new EventEmitter();
    @Output() onSearchInDrawing = new EventEmitter();
    Stylename: string;
    dataOption: any;
    SelectedclassIds: any;
    attributeoption: number = 2;
    drawingIds: any;
    isSiteAdmin: boolean = false;
    isdelinked: boolean = false;
    secondaryViewTarget: number = 0;
    sessionUserCatId = 0;
    sessionUserRoleId = 0;
    sessionUserId = 0;
    pageTitle: string;
    displaySettingDdlFieldValue: any;
    Isallattachmentmenuneeded: boolean = true;
    tempObjectClassId: number = 0;
    exportDataSource: any;
    objectCategoryName: string;
    unassignedTxt = "Unassigned";
    messages: any[];
    objectmultiplename: any;
    classname: any;
    attributetitle: any;
    enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null,
            "privilegeId": 993
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "subMenu": null,
            "privilegeId": 994
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null,
            "privilegeId": 995
        },
        {
            "id": 5,
            "title": "Tools",
            "image": "Settings",
            "path": "Settings",
            "subMenu": [
                {
                    "id": 6,
                    "title": "Class Selection",
                    "image": "Class Selection",
                    "path": "Class Selection",
                    "subMenu": null
                },
                {
                    "id": 7,
                    "title": "Place",
                    "image": "Place",
                    "path": "Place",
                    "subMenu": null,
                    "privilegeId": 996
                },
                {
                    "id": 8,
                    "title": "De-Link",
                    "image": "De-Link",
                    "path": "De-Link",
                    "subMenu": null,
                    "privilegeId": 997
                }
            ]
        },
        {
            "id": 20,
            "title": "More",
            "image": "More",
            "path": "More",
            "subMenu": [
                {
                    "id": 10,
                    "title": "Show Drawing",
                    "image": "Show Drawing",
                    "path": "Show Drawing",
                    "submenu": null
                },
                {
                    "id": 11,
                    "title": "Show Zoomed",
                    "image": "Show Zoomed",
                    "path": "Show Zoomed",
                    "submenu": null
                },
                {
                    "id": 4,
                    "title": "Display Settings",
                    "image": "DisplaySettings",
                    "path": "DisplaySettings",
                    "subMenu": null
                },
                {
                    "id": 9,
                    "title": "Attachments",
                    "image": "Attachments",
                    "path": "Attachments",
                    "subMenu": null
                }
                ,
                {
                    "id": 15,
                    "title": "Export",
                    "image": "Export",
                    "path": "Export",
                    "subMenu": null
                }
                , {
                    "id": 16,
                    "title": "Warranty Details",
                    "image": "Warranty",
                    "path": "Warranty",
                    "subMenu": null,
                    "privilegeId": null
                }
            ]
        },

    ];
    modulename: any;
    position = "top-right";
    showSlide = false;
    showSlidedelink = false;
    slidewidth = 250;
    public keyWordLookup: any;
    refreshgrid;
    IsBarcodeSubscribed: boolean = false;
    searchindex = 0;
    IsAutoNumbering: boolean = false;
    showMultipleAssign = false;
    multipleEditFieldDetails: any;
    exportSearchIndex: number = 0;
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;
    SiteId: string;
    isBuildingDrawing: boolean;

    constructor(private cdr: ChangeDetectorRef, private objectsService: ObjectsService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions, private http: Http, private exportObject: ExportToExcel, private commonService: CommonService) { }
    ngOnInit() {
        console.log('isBuildingDrawing', this.isBuildingDrawing)
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        if (changes['IsObjectPlaced'] && changes['IsObjectPlaced']['currentValue']) {
            if (changes['IsObjectPlaced']['currentValue'] == true) {
                this.afterplaceandmove();
            }
        }
        else if (changes['IsObjectMoved'] && changes['IsObjectMoved']['currentValue']) {
            if (changes['IsObjectMoved']['currentValue'] == true) {
                this.afterplaceandmove();
            }

        }
        else if (changes['ObjectDelinked'] && changes['ObjectDelinked']['currentValue']) {
            if (changes['ObjectDelinked']['currentValue'].length > 0) {
                this.deleteFromGrid();
            }

        }
        if (changes['updateDataSource'] && changes['updateDataSource']['currentValue']) {

            if (this.updateDataSource != null && this.updateDataSource.length > 0)
                this.updatedDataSourceFromDrawing();
            this.changeEnableMenu(true);
        }
        if (changes['updateObjectsDetails'] && changes['updateObjectsDetails']['currentValue']) {
            if (this.updateObjectsDetails.length > 0)
                console.log("this.moveAssetsDetails", this.updateObjectsDetails);
        }
        var contextObj = this;
        if (changes["selectedRow"] && changes["selectedRow"]["currentValue"]) {
            if (this.selectedRow.length > 0) {
                if (this.itemsSource) {
                    this.rearrangeItemSource(this.selectedRow.slice(), function (retcode) {
                        contextObj.arrHighlightRowIds = [];
                        setTimeout(function () {
                            contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(contextObj.selectedRow);
                        }, 100);
                    });
                }
            }
            else
                contextObj.arrHighlightRowIds = [];
        }


    }
    updatedDataSourceFromDrawing() {
        this.refreshgrid = [];
        var retUpdatedSrc;
        if (this.updateDataSource[0]['Action'] == 'add') {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", this.updateDataSource[0], this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemsSource = retUpdatedSrc["itemSrc"]
        } else if (this.updateDataSource[0]['Action'] == 'edit') {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", this.updateDataSource[0], this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        }
        this.refreshgrid = this.refreshgrid.concat([true]);

    }
    deleteFromGrid() {
        for (var item of this.ObjectDelinked) {
            let retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "delete", '', [item], this.inputItems.dataKey, this.totalItems);
            this.itemsSource = retUpdatedSrc["itemSrc"];
            this.totalItems = retUpdatedSrc["itemCount"];
            if (this.totalItems < 1) {
                this.enableMenu = [1];
            }
        }
    }
    rearrangeItemSource = function (selectedRows, resCallback) {
        var itemSourcedata = this.itemsSource.slice();
        var selectedSpaceIds = selectedRows;
        var selectedRowDatas: any[] = [];
        for (var i = 0; i < selectedSpaceIds.length; i++) {
            var index = itemSourcedata.findIndex(function (el) { return el.ObjectId == selectedSpaceIds[i] });
            if (index != -1) {
                selectedRowDatas.push(itemSourcedata[index]);
                itemSourcedata.splice(index, 1);
            }
        }
        var data = selectedRowDatas.concat(itemSourcedata);
        this.itemsSource = data;
        resCallback(0);
    }
    ngAfterViewInit() {
        var contextObj = this;
        var featureid = "";
        switch (contextObj.objectCategoryId) {
            case 1:
                featureid = "105,72";
                this.classname = "Asset Class";
                this.objectmultiplename = "Assets";
                this.modulename = "Assets";
                this.attributetitle = "Class Attributes";
                this.commonDisplaySettingCategoryId = 3;
                this.spaceDisplaySettingCategoryId = 13;
                break;

            case 2:
                featureid = "107,73";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[2].title = "Warehouse"
                this.unassignedTxt = "Warehoused";
                this.classname = "Furniture Class";
                this.objectmultiplename = "Furniture"
                this.modulename = "Furniture";
                this.attributetitle = "Class Attributes";
                this.commonDisplaySettingCategoryId = 4;
                this.spaceDisplaySettingCategoryId = 15;
                break;

            case 3:
                featureid = "109,71";
                this.classname = "Object Class";
                this.objectmultiplename = "Objects"
                this.modulename = "Telecom";
                this.attributetitle = "Class Attributes";
                this.commonDisplaySettingCategoryId = 5;
                this.spaceDisplaySettingCategoryId = 16;
                break;

            case 8:
                featureid = "113,92";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection"
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Electrical";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 9;
                this.spaceDisplaySettingCategoryId = 18;
                break;

            case 9:
                featureid = "115,100";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection"
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Fire and Safety";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 10;
                this.spaceDisplaySettingCategoryId = 19;
                break;

            case 10:
                featureid = "229,130";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection"
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Mechanical";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 20;
                this.spaceDisplaySettingCategoryId = 21;
                break;

            case 11:
                featureid = "131,140";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection"
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Plumbing";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 22;
                this.spaceDisplaySettingCategoryId = 23;
                break;

            case 12:
                featureid = "141,150";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection"
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Medical Gas";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 24;
                this.spaceDisplaySettingCategoryId = 25;
                break;

            case 20:
                featureid = "151,228";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection"
                this.classname = "Equipment Type";
                this.objectmultiplename = "Equipment"
                this.modulename = "Security Assets";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 32;
                this.spaceDisplaySettingCategoryId = 33;
                break;
        }
        contextObj.IsKeyWordSearch = 0;
        contextObj.IsAdvanceSearch = 0;
        //var featureid = "105";
        //switch (contextObj.objectCategoryId) {
        //    case 1:
        //        featureid = "105";
        //        this.unassignedTxt = "Unassigned";
        //        break;
        //    case 2:
        //        featureid = "107";
        //        if (contextObj.menuData[3].title == "Tools")
        //            contextObj.menuData[3].subMenu[2].title = "Warehouse"
        //        this.unassignedTxt = "Warehoused";
        //        break;
        //}
        //featureid = featureid + ",72,73";

        contextObj.objectsService.getCustomerSubscribedFeaturesBarcode(featureid).subscribe(function (rt) {
            rt["Data"].find(function (item) {

                switch (item.Id) {
                    case 71:
                    case 72:
                    case 73:
                    case 92:
                    case 100:
                    case 130:
                    case 140:
                    case 150:
                    case 228:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsAutoNumbering = true;
                        }
                        break;
                    case 105:
                    case 107:
                    case 109:
                    case 113:
                    case 115:
                    case 229:
                    case 131:
                    case 141:
                    case 151:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsBarcodeSubscribed = true;
                        }
                        break;
                }

                //switch (item.Id) {
                //    case 72:
                //        if (item["IsSubscribed"] == true && item["Id"] == 72) {
                //            if (contextObj.objectCategoryId == 1)
                //                contextObj.IsAutoNumbering = true;
                //        }
                //        break;
                //    case 73:
                //        if (item["IsSubscribed"] == true && item["Id"] == 73) {
                //            if (contextObj.objectCategoryId == 2)
                //                contextObj.IsAutoNumbering = true;
                //        }
                //        break;
                //    case 105:
                //        if (item["IsSubscribed"] == true && item["Id"] == 105) {
                //            contextObj.IsBarcodeSubscribed = true;
                //        }
                //        break;
                //    case 107:
                //        if (item["IsSubscribed"] == true && item["Id"] == 107) {
                //            contextObj.IsBarcodeSubscribed = true;
                //        }
                //        break;
                //}
                //if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["Id"] == 72) {
                //    contextObj.IsAutoNumbering = true;
                //}

            });


        });
        switch (contextObj.Targetforstyle) {
            case 1:
                contextObj.Stylename = "search-containerInline";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 220;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
            case 2:
                contextObj.Stylename = "search-containerInlineforplace";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 320;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
            case 3:
                contextObj.Stylename = "search-containerInlinefromgrid";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 320;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
        }
        if (contextObj.dataOption == "2")
            contextObj.menuData = contextObj.menuData.filter(function (item) { return (item.id != 1) })
        //else
        //    contextObj.menuData.splice(3, 2);
        //else
        //    contextObj.menuData = contextObj.menuData.slice(1, 8);
        if (contextObj.drawingIds == undefined) {
            contextObj.drawingIds = '';
        }
        this.objectsService.getObjectDataFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObjectGrid = (result["Data"]);
            contextObj.fieldObjectGrid.find(function (item: IField) {
                switch (item.ReportFieldId) {
                    case 4303:   /*Barcode */
                        if (contextObj.IsBarcodeSubscribed == true) {
                            item.IsVisible = true;
                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;
                        }
                        break;
                }
                return item.ReportFieldId === 4303;
            });
            contextObj.dataLoad('', 1);
        });
        this.getSessionUserData(contextObj);
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
    }

    public afterplaceandmove() {
        var contextObj = this;
        switch (contextObj.Targetforstyle) {
            case 1:
                contextObj.Stylename = "search-containerInline";
                break;
            case 2:
                contextObj.Stylename = "search-containerInlineforplace";
                break;
            case 3:
                contextObj.Stylename = "search-containerInlinefromgrid";
                break;
        }
        if (contextObj.objectCategoryId == 2) {
            if (contextObj.menuData[3].title == "Tools")
                contextObj.menuData[3].subMenu[2].title = "Warehouse"
        }
        if (contextObj.drawingIds == undefined) {
            contextObj.drawingIds = '';
        }
        if (contextObj.dataOption == "2")
            contextObj.menuData = contextObj.menuData.filter(function (item) { return (item.id != 1) })

        this.objectsService.getObjectDataFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObjectGrid = (result["Data"]);
            contextObj.dataLoad('', 1);
        });
        this.getSessionUserData(contextObj);
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
    }
    public dataLoad(classIds: string, target?: number) {
        var contextObj = this;
        var filter;
        if (contextObj.IsKeyWordSearch == 1)
            filter = contextObj.filter;
        else if (contextObj.IsAdvanceSearch == 1)
            filter = contextObj.advanceValue;
        else
            filter = "";
        contextObj.IsSearchmenuNeeded = false;
        contextObj.IsObjectMoved['currentValue'] = false;
        contextObj.SelectedclassIds = classIds;
        var SortColumn = contextObj.inputItems.sortCol;
        //contextObj.changeEnableMenu(true);
        if (contextObj.dataOption == "2")
            contextObj.PageTarget = 1;
        //if (contextObj.inputItems.sortCol == "[Asset No.]")
        //    SortColumn = "[ObjectNo]"
        //else if (contextObj.inputItems.sortCol == "[Asset Class Name]")
        //    SortColumn = "[ObjectClassName]"
        //if (this.inputItems.sortDir == "DESC")
        //    contextObj.varsort = "ASC";
        //else
        //    contextObj.varsort = "DESC";
        //if (classIds != "")
        //    contextObj.pageIndex = 0;
        contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, classIds, contextObj.drawingIds, '', false, 0, true, 1, contextObj.pageIndex, SortColumn, contextObj.inputItems.sortDir, filter, false, contextObj.isBuildingDrawing).subscribe(function (result) {
            //debugger
            contextObj.totalItems = result.DataCount;
            contextObj.messages = result.ReturnMessages;
            contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
            if (contextObj.totalItems > 0) {
                contextObj.IsSearchmenuNeeded = true;
                contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                if (contextObj.selectedRow["selectedIds"] != undefined && contextObj.dataOption == 2) {
                    if (contextObj.selectedRow.selectedIds.length > 0) {
                        if (contextObj.itemsSource) {
                            contextObj.rearrangeItemSource(contextObj.selectedRow.selectedIds.slice(), function (retcode) {
                                contextObj.arrHighlightRowIds = [];
                                setTimeout(function () {
                                    contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(contextObj.selectedRow.selectedIds);
                                }, 200);
                            });
                        }
                    }
                    else
                        contextObj.arrHighlightRowIds = [];
                }
                contextObj.rearrangeItemSource = function (selectedRows, resCallback) {
                    var itemSourcedata = contextObj.itemsSource.slice();
                    var selectedSpaceIds = selectedRows;
                    var selectedRowDatas: any[] = [];
                    for (var i = 0; i < selectedSpaceIds.length; i++) {
                        var index = itemSourcedata.findIndex(function (el) { return el.ObjectId == selectedSpaceIds[i] });
                        if (index != -1) {
                            selectedRowDatas.push(itemSourcedata[index]);
                            itemSourcedata.splice(index, 1);
                        }
                    }
                    //var data = selectedRowDatas.concat(itemSourcedata);
                    //  var data = itemSourcedata.unshift(selectedRowDatas);
                    //  this.itemsSource = data;
                    resCallback(0);
                }
                if (target == 1) {
                    contextObj.itemsPerPage = result.RowsPerPage;
                }
                contextObj.changeEnableMenu(true);
            }
            else {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.IsSearchmenuNeeded = false;
                contextObj.notificationService.ShowToaster("No " + contextObj.objectCategoryName + " data exists  ", 2);
                contextObj.changeEnableMenu(false);
                if (classIds != "") {
                    contextObj.enableMenu = [1, 5, 6];
                    contextObj.isdelinked = false;
                }
            }
        });
        //debugger
        contextObj.objectsService.getObjectDataKeywordField(contextObj.objectCategoryId).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            }
        });
    }

    advanceSearch() {
        var contextObj = this;
        this.objectsService.getAdvnceSearchLookup(contextObj.objectCategoryId).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                //contextObj.advancelookup[0].FieldLabel = "Asset No.";
                //contextObj.advancelookup[1].FieldLabel = "Asset Class Name";
            }
        });
    }
    public changeEnableMenu(haveData: boolean) {
        if (haveData) {
            switch (this.dataOption) {
                case 2:
                    this.enableMenu = [2, 3, 4, 5, 6, 8, 9, 10, 11, 20, 15, 16];
                    break;
                case 3:
                    this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 9, 20, 15, 16];
                    break;
            }
        } else {
            this.enableMenu = [1];
        }

    }

    onClassSelected(event) {
        var contextObj = this;
        var selectedClassIds: string = ''
        if (this.fieldDetailsCheckBox.MultiFieldValues == null || this.fieldDetailsCheckBox.MultiFieldValues.length == 0) {
            contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);

            //if (this.objectCategoryId == 1) {
            //    this.notificationService.ShowToaster("Select an " + this.objectCategoryName + " Class", 2)
            //} else {
            //    this.notificationService.ShowToaster("Select a " + this.objectCategoryName + " Class", 2)
            //}
        } else {
            contextObj.MultiFieldValues = this.fieldDetailsCheckBox.MultiFieldValues;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
            for (var count = 0; count < this.fieldDetailsCheckBox.MultiFieldValues.length; count++) {
                selectedClassIds = selectedClassIds + this.fieldDetailsCheckBox.MultiFieldValues[count] + ',';
            }
            selectedClassIds = selectedClassIds.slice(0, -1);
            if (this.fieldDetailsCheckBox.MultiFieldValues.length == 1) {
                this.objectsService.getObjectDataFieldsListforclass(this.objectCategoryId, selectedClassIds).subscribe(function (result) {
                    contextObj.attributeoption = 2;
                    contextObj.fieldObjectGrid = (result["Data"]);
                    contextObj.dataLoad(selectedClassIds, 1);
                })
            }
            else {
                contextObj.attributeoption = 1;
                this.objectsService.getObjectDataFieldsList(this.objectCategoryId).subscribe(function (result) {
                    for (var i = 0; i < result["Data"].length; i++) {
                        if (result.Data[i].FieldLabel.length > 13)
                            result.Data[i]["Width"] = 200;
                        if (result.Data[i].FieldLabel.length > 28)
                            result.Data[i]["Width"] = 250;
                    }
                    contextObj.fieldObjectGrid = (result["Data"]);
                    contextObj.fieldObjectGrid.find(function (item: IField) {
                        switch (item.ReportFieldId) {
                            case 4303:   /*Barcode */
                                if (contextObj.IsBarcodeSubscribed == true) {
                                    item.IsVisible = true;
                                }
                                else if (contextObj.IsBarcodeSubscribed == false) {
                                    item.IsVisible = false;
                                }
                                break;
                        }
                        return item.ReportFieldId === 4303;
                    });
                    contextObj.IsKeyWordSearch = 0;
                    contextObj.IsAdvanceSearch = 0;
                    contextObj.dataLoad(selectedClassIds, 1);
                });
                //contextObj.dataLoad(selectedClassIds, 1);
            }
        }

        /*console.log(this.fieldDetailsCheckBox);*/
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.pageTitle = this.objectCategoryName + " Data";
                this.addClick();
                break;
            case 2:
                this.pageTitle = this.objectCategoryName + " Data";
                this.editClick();
                break;
            case 3:
                //this.pageTitle = "Delete";
                this.deleteClick();
                break;
            case 4:
                this.pageTitle = "Display Settings";
                this.displaySettingsClick();
                break;
            case 6:
                this.pageTitle = this.classname + " Selection";
                this.classSelectionClick();
                break;
            case 7:
                this.pageTitle = "Place";
                this.placeonclick();
                break;
            case 8:
                this.pageTitle = null;
                this.DelinkClick();
                break;
            case 9:
                this.pageTitle = "Attachments";
                this.attachmentClick();
                break;
            case 10:
                this.checkDrawingIds(1);
                break;
            case 11:
                this.checkDrawingIds(2);
                break;
            case 15:
                this.Export();
                break;
            case 16:
                this.pageTitle = "Warranty Details";
                this.Warranty();
                break;
        }
    }

    public Warranty() {
        this.secondaryTarget = 16;
        //if (this.inputItems.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //}
        //else if (this.inputItems.selectedIds.length == 1) {
        //    this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        //}
        //else {
        //    this.notificationService.ShowToaster("Select an Asset", 2);
        //}
        var contextObj = this;
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            } else {
                contextObj.tempObjectClassId = contextObj.inputItems.rowData["ObjectClassId"];
                if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined) {
                    contextObj.Isallattachmentmenuneeded = false;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                } else {
                    if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"] })
                            if (orgidexists == undefined)
                                contextObj.Isallattachmentmenuneeded = false;
                            else
                                contextObj.Isallattachmentmenuneeded = true;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else
                        //  this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            }
        }
    }
    outDrawingObject(event: any) {
        //debugger;
        //console.log("drawingdetailsoutObject", event);
        this.objiWhiz = event.dwgObject;
        // this.markupObj = event.markupObj;
        //  this.outDrawingobject.emit({ "dwgObj": this.objiWhiz });
    }
    Export() {

        var contextObj = this;
        var selectedClassIds: string = ''
        var fileName = this.dataOption == 1 ? "All" + this.objectmultiplename : this.dataOption == 2 ? "Operational" + this.objectmultiplename : "Warehoused" + this.objectmultiplename;
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.exportDataSource = JSON.stringify(contextObj.inputItems.rowData.slice());
            contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObjectGrid, fileName, function (retCode) {
                if (retCode == 0) {
                    contextObj.notificationService.ShowToaster(contextObj.objectCategoryName + " data exported", 3);
                }
            });
        }
        else {
            var searchkey = contextObj.IsKeyWordSearch == 1 ? contextObj.filter : contextObj.advanceValue;
            if (contextObj.SelectedclassIds != "") {
                contextObj.pageIndex = 0;
            }
            var searchkey = contextObj.exportSearchIndex == 1 ? contextObj.filter : contextObj.exportSearchIndex == 2 ? contextObj.advanceValue : ""; //contextObj.g_selectedClassIds
            if (searchkey != "" && searchkey != "[]")
                contextObj.SelectedclassIds = "";


            var input = contextObj.objectsService.getObjectSpaceDataExport(contextObj.PageTarget, contextObj.exportSearchIndex == 1 ? 1 : 0, contextObj.exportSearchIndex == 2 ? 1 : 0, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, contextObj.SelectedclassIds, contextObj.drawingIds, '', false, 0, true, 1, contextObj.fieldObjectGrid, fileName, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, searchkey, true);
            //contextObj.exportDataSource = result["Data"]["FieldBinderData"];


            contextObj.exportObject.ExportDataFromServer(input, 2, fileName, function (retCode) {
                if (retCode == 0) {
                    contextObj.notificationService.ShowToaster(contextObj.objectCategoryName + " data exported", 3);
                }
                else { contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
            });


        }
    }
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        if (this.searchindex == 0) {
            if (this.SelectedclassIds != "") {
                this.dataLoad(this.SelectedclassIds, 0);
            } else {
                this.dataLoad('', 0);
            }
        }
        //this.dataLoad('', 0);
        else if (this.searchindex == 1)
            this.keywordSearchdata();
        else if (this.searchindex == 2)
            this.AdvancedSearchdata();
    };
    public onSort(objGrid: any) {
        //if (objGrid.sortCol == "[Asset No.]" || objGrid.sortCol == "[Asset Class Name]") {
        //    var sortDir = this.inputItems.sortDir;
        //    this.inputItems.sortDir = (sortDir == "ASC") ? "DESC" : "ASC"
        //    if (this.varsort == "ASC")
        //        this.inputItems.sortDir = sortDir;
        //    else
        //        this.inputItems.sortDir;
        //}
        if (this.searchindex == 0)
            if (this.SelectedclassIds != "") {
                this.dataLoad(this.SelectedclassIds, 0);
            } else {
                this.dataLoad('', 0);
            }
        //this.dataLoad('', 0);
        else if (this.searchindex == 1)
            this.keywordSearchdata();
        else if (this.searchindex == 2)
            this.AdvancedSearchdata();
    }
    checkDrawingIds(target) {

        var contextObj = this;
        var spaceIdsInput: string = "";
        var drawingId: number;

        if (target == 1) {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
                //if (contextObj.objectCategoryId == 1) {
                //    contextObj.notificationService.ShowToaster("Select an " + contextObj.objectCategoryName + " Class", 2)
                //} else {
                //    contextObj.notificationService.ShowToaster("Select a " + contextObj.objectCategoryName + " Class", 2)
                //}
            }
            else
                contextObj.showInDrawingOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedObjectDetails": contextObj.inputItems.rowData });
        }
        else {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
                //if (contextObj.objectCategoryId == 1) {
                //    contextObj.notificationService.ShowToaster("Select an " + contextObj.objectCategoryName + " Class", 2)
                //} else {
                //    contextObj.notificationService.ShowToaster("Select a " + contextObj.objectCategoryName + " Class", 2)
                //}
            }
            else if (this.inputItems.selectedIds.length > 1)
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            else
                contextObj.showZoomOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedObjectDetails": contextObj.inputItems.rowData });
        }
    }
    public addClick() {
        var contextObj = this;
        contextObj.getCusSubscribedFeatures();
        this.action = "add";
        this.btnName = "Save";
        var Tagno = "";

        this.objectsService.getObjectDataAddEditFieldsList(this.objectCategoryId, 0, "add").subscribe(function (resultData) {
            contextObj.fieldDetailsAdd = resultData["Data"];
            var count = 0;

            contextObj.fieldDetailsAdd.find(function (item: IField) {
                switch (item.ReportFieldId) {
                    case 4303:   /*Barcode*/
                        if (contextObj.IsBarcodeSubscribed == true) {
                            item.IsVisible = true;

                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;

                        }
                        count++;
                        break;
                    case 651:
                        if (item.FieldId == 1985) {//asset number without prefix
                            if (contextObj.IsAutoNumbering == false) {
                                item.IsVisible = true;
                            } else {
                                item.IsVisible = false;
                            }
                        }
                        else if (item.FieldId == 1605) {//asset number without prefix                           
                            Tagno = item.FieldLabel;
                            item.IsVisible = false;//for autonumber true /false asset no. field is invisible
                     
                        }
                        var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661 })
                            
                        if (tagNoItem != undefined) {
                            //if (contextObj.IsAutoNumbering == false)
                            //    tagNoItem.IsMandatory = true;
                            //else
                            if (contextObj.IsAutoNumbering == true)
                                tagNoItem.IsVisible = false;

                            tagNoItem.FieldLabel = Tagno;
                            tagNoItem.IsMandatory = true;
                        }
                        count++;
                        break;
                    case 657:   /*class*/
                        contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
                            item.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);   //class                     
                            contextObj.secondaryTarget = 0;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                        break;
                    case 7411:   /*site*/                        
                            item.IsMandatory = true;
                        break;

                }
                if (count == 5) { return true; }
                else return false;
            });


        })
    }

    public editClick() {
        //debugger
        if (this.itemSelected) {
            this.action = "edit";
            this.btnName = "Save Changes";
            var contextObj = this;
            var haseditprivilage;
            var Tagno;
            var editabledivisions = new Array();
            contextObj.getCusSubscribedFeatures();
            if (this.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
                //if (this.objectCategoryId == 1) {
                //    this.notificationService.ShowToaster("Select an " + this.objectCategoryName + " Class", 2)
                //} else {
                //    this.notificationService.ShowToaster("Select a " + this.objectCategoryName + " Class", 2)
                //}
            } else if (this.inputItems.selectedIds.length > 1) {
                this.onMultipleEditClick();
            } else {
                if (this.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined)
                    contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected " + contextObj.objectCategoryName, 5);
                else {
                    if (this.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        //if (contextObj.inputItems.rowData["SpaceId"] != undefined)
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            //contextObj.objectsService.checkEditPrivilageExist(contextObj.inputItems.rowData["SpaceId"]).subscribe(function (result) {
                            //haseditprivilage = contextObj.usereditprivilageforspace(contextObj.inputItems.rowData["SpaceId"]);
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"] })
                            if (orgidexists == undefined)
                                contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected " + contextObj.objectCategoryName, 5);
                            else {
                                var withPrefix = false;
                                var withoutPrefix = false;
                                //debugger
                                contextObj.objectsService.getObjectDataEditFieldsList(contextObj.objectCategoryId, contextObj.inputItems.selectedIds[0], "edit", contextObj.dataOption, contextObj.attributeoption, contextObj.inputItems.rowData.ObjectClassId.toString(), contextObj.drawingIds, '', 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (result) {
                                    contextObj.fieldDetailsAdd = result["Data"];
                                    var count = 0;
                                    contextObj.fieldDetailsAdd.find(function (item: IField) {
                                        switch (item.ReportFieldId) {
                                            case 4303:   /*Barcode*/
                                                if (contextObj.IsBarcodeSubscribed == true) {
                                                    item.IsVisible = true;
                                                }
                                                else if (contextObj.IsBarcodeSubscribed == false) {
                                                    item.IsVisible = false;
                                                }
                                                count++;
                                                break;
                                            case 651:

                                                if (item.FieldId == 1985) {//asset numner without prefix if autonumber subscription false
                                                    if (contextObj.IsAutoNumbering == false) {
                                                        item.IsVisible = true;

                                                        withoutPrefix = true;
                                                        if (withPrefix == true)
                                                            item.FieldValue = "";
                                                    }
                                                    else {
                                                        item.IsVisible = false;
                                                    }

                                                }
                                                else if (item.FieldId == 1605) {//asset numner with prefix
                                                    item.IsEnabled = false;

                                                    if (contextObj.IsAutoNumbering == false) {
                                                        withPrefix = true;
                                                        item.IsVisible = false;
                                                        if (withoutPrefix == true)
                                                            item.FieldValue = "";
                                                    } else {
                                                        item.IsVisible = true;

                                                    }
                                                    var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661 })
                                                    if (tagNoItem != undefined) {
                                                        if (contextObj.IsAutoNumbering == false)
                                                            tagNoItem.IsMandatory = true;
                                                        else
                                                            tagNoItem.IsVisible = false;
                                                        tagNoItem.FieldLabel = item.FieldLabel;
                                                    }
                                                }
                                                count++;//2 times execution
                                                break;
                                            case 657:   /*class*/
                                                item.IsEnabled = false;
                                                item.IsMandatory = true;
                                                contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
                                                    item.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                                                })
                                                count++;
                                                break;
                                            case 7411:   /*site*/                                                
                                                    item.IsMandatory = true;
                                                if (contextObj.inputItems.rowData.Status == "Assigned")
                                                    item.IsEnabled = false;
                                                count++;
                                                break;

                                        }
                                        if (count == 5) { return true; }
                                        else
                                            return false;
                                    });
                                    contextObj.secondaryTarget = 0;
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                });
                            }
                        });
                    }
                    else {
                        //debugger
                        var count = 0;
                        var withPrefix = false;
                        var withoutPrefix = false;
                        contextObj.objectsService.getObjectDataEditFieldsList(contextObj.objectCategoryId, contextObj.inputItems.selectedIds[0], "edit", contextObj.dataOption, contextObj.attributeoption, contextObj.inputItems.rowData.ObjectClassId.toString(), contextObj.drawingIds, '', 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (result) {
                            contextObj.fieldDetailsAdd = result["Data"];
                            contextObj.fieldDetailsAdd.find(function (item: IField) {
                                switch (item.ReportFieldId) {
                                    case 4303:   /*Barcode*/
                                        if (contextObj.IsBarcodeSubscribed == true) {
                                            item.IsVisible = true;
                                        }
                                        else if (contextObj.IsBarcodeSubscribed == false) {
                                            item.IsVisible = false;
                                        }
                                        count++;
                                        break;
                                    case 651:
                                        if (item.FieldId == 1985) {//asset numner without prefix if autonumber subscription false
                                            if (contextObj.IsAutoNumbering == false) {
                                                item.IsVisible = true;

                                                withoutPrefix = true;
                                                if (withPrefix == true)
                                                    item.FieldValue = "";
                                            } else {
                                                item.IsVisible = false;

                                            }
                                            count++;
                                        }
                                        if (item.FieldId == 1605) {//asset numner with prefix
                                            item.IsEnabled = false;
                                            if (contextObj.IsAutoNumbering == false) {

                                                item.IsVisible = false;
                                                if (withoutPrefix == true)
                                                    item.FieldValue = "";
                                            } else {
                                                withPrefix = true;
                                                item.IsVisible = true;


                                            }

                                            var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661 })
                                            if (tagNoItem != undefined) {
                                                if (contextObj.IsAutoNumbering == false)
                                                    tagNoItem.IsMandatory = true;
                                                else
                                                    tagNoItem.IsVisible = false;
                                                tagNoItem.FieldLabel = item.FieldLabel;
                                            }
                                            count++;
                                        }
                                        break;
                                    case 657:   /*class*/


                                        item.IsEnabled = false;
                                        item.IsMandatory = true;
                                        contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
                                            item.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                                        })
                                        count++;
                                        break;
                                    case 7411:   /*site*/
                                       
                                            item.IsMandatory = true;

                                        if (contextObj.inputItems.rowData.Status == "Assigned")
                                            item.IsEnabled = false;

                                        else if (contextObj.inputItems.rowData.ObjectSiteId != undefined)
                                            item.FieldValue = contextObj.inputItems.rowData.ObjectSiteId.toString();
                                        count++;
                                        break;
                                }
                                if (count == 5) return true;
                            });

                            contextObj.secondaryTarget = 0;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                }
            }
        }

    }
    //multipleAssign() {
    //  debugger
    //    var contextObj = this;
    //    let isPlaced: boolean = true;
    //    contextObj.inputItems.rowData.find(function (item) {
    //        if (item.Status == "Assigned")
    //        {
    //            isPlaced = false;
    //            contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + "s are already placed", 2);
    //            return true;
    //        }
    //       else if (item.SymbolId == null) {
    //            isPlaced = false;
    //            contextObj.notificationService.ShowToaster("Some of the "+contextObj.objectCategoryName + " have no Symbol assigned", 2);
    //            return true;
    //        }
    //        else
    //            return false;
    //    });
    //    if (isPlaced == true) {
    //        contextObj.PlaceAssetOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "rowData": contextObj.inputItems});
    //       // contextObj.secondaryTarget = 10;
    //      //  contextObj.wanttoreload = false;
    //       // contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    //    }
    //}
    multipleAssign() {

        var contextObj = this;
        // debugger
        let isPlaced: boolean = true;
        let isAssigned: boolean = true;
        let isunAssigned: boolean = false;
        let isSymbol: boolean = true;
        var count = 0;
        contextObj.inputItems.rowData.find(function (item) {
            if (item.Status == "Assigned") {
                isPlaced = false;
                isAssigned = false;
                // contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + "s are already placed", 2);
                count++;
            }
            else if (item.Status == contextObj.unassignedTxt && item.SymbolId != null) {

                isunAssigned = true;
                // contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + "s are already placed", 2);
                count++;
            }
            else if (item.SymbolId == null) {
                isPlaced = false;
                isSymbol = false;
                //contextObj.notificationService.ShowToaster("Some of the " + contextObj.objectCategoryName + " have no Symbol assigned", 2);
                count++;
            }

            if (count == contextObj.inputItems.selectedIds.length)
                return true;
            else
                return false;
        });
        if (isAssigned == false && isunAssigned == true) {
            contextObj.message = "Some of the selected " + contextObj.objectmultiplename + " is already placed. Do you want to continue?";
            contextObj.showMultipleAssign = !contextObj.showMultipleAssign;

        }
        else if (isSymbol == false && isunAssigned == true) {
            contextObj.message = "Some of the selected " + contextObj.objectmultiplename + " have no Symbol assigned. Do you want to continue?";
            contextObj.showMultipleAssign = !contextObj.showMultipleAssign;

        }
        else if (isPlaced == true) {
            contextObj.PlaceObjectOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "rowData": contextObj.inputItems });
        }
        else {
            if (isSymbol == false)
                this.notificationService.ShowToaster("Selected " + contextObj.objectmultiplename + " have no Symbol assigned", 2);
            else this.notificationService.ShowToaster("Selected " + contextObj.objectmultiplename + " is already placed", 2);
        }
    }

    public displaySettingsClick() {
        //  this.action = "displaySettings";
        // this.btnName = "Save Changes";
        var contextObj = this;
        var dataoption = contextObj.dataOption;
        if (contextObj.displaySettingDdlFieldValue == null || contextObj.displaySettingDdlFieldValue == undefined) {
            contextObj.objectsService.getdropdownFields().subscribe(function (result) {
                contextObj.ddlObjectClassDisplaySettings = result["Data"][0];
                contextObj.ddlObjectClassDisplaySettings.FieldLabel = contextObj.classname;
                if (contextObj.dataOption == "3")
                    dataoption = "1";
                contextObj.objectsService.getObjectClassDisplaySettings(contextObj.objectCategoryId, contextObj.drawingIds, dataoption, 1, 0).subscribe(function (resultData) {
                    contextObj.ddlObjectClassDisplaySettings.LookupDetails.LookupValues = JSON.parse(resultData["Data"].FieldBinderData);
                });
            });
        }

        contextObj.allObjectAction = "displaySettings";
        contextObj.commonAdditionalDataFieldCategoryId = 19;
        contextObj.spaceAdditionalDataFieldCategoryId = 7;
        //switch (contextObj.objectCategoryId) {
        //    case 1: // Assets
        //        contextObj.commonDisplaySettingCategoryId = 3;
        //        contextObj.spaceDisplaySettingCategoryId = 13;
        //        break;
        //    case 2: // Furniture
        //        contextObj.commonDisplaySettingCategoryId = 4;
        //        contextObj.spaceDisplaySettingCategoryId = 15;
        //        break;
        //}
        contextObj.secondaryTarget = 3;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        // contextObj.splitviewInput.showSecondaryView = true;
    }

    onChnageObjectClassDisplaySettings(event: any) {

        if (Number(event) != -1) {

            this.selectedObjectClassDisplaySettingsId = Number(event);
            // this.displaySettingsClick(); 

        }
        else if (Number(event) == -1) {
            this.selectedObjectClassDisplaySettingsId = 0;
        }
        //else
        //    this.enableMenu = [];
        this.displaySettingDdlFieldValue = event;
    }

    attachmentSuccess(event: any) {
        var context = this;
        context.refreshgrid = [];
        var selId = context.inputItems.selectedIds[0];
        if (selId != undefined) {
            context.itemsSource.find(function (item) {
                if (item["ObjectId"] == selId) {
                    switch (event["status"]) {
                        case "success":
                            item["Attachments"] = (Number(item["Attachments"]) + 1).toString();
                            context.Attachmentcount.emit({ "attachcount": item["Attachments"], "selectedId": context.inputItems.selectedIds[0] });
                            break;
                        case "delete":
                            item["Attachments"] = (Number(item["Attachments"]) - 1).toString();
                            context.Attachmentcount.emit({ "attachcount": item["Attachments"], "selectedId": context.inputItems.selectedIds[0] });
                            break;
                    }
                    return true;
                } else
                    return false;
            });
            //var updatedData = new Array();/*To notify the watcher about the change*/
            //updatedData = updatedData.concat(context.itemsSource);
            //context.itemsSource = updatedData; 
            context.refreshgrid = context.refreshgrid.concat([true]);
        }
    }
    public deleteClick() {
        var contextObj = this;
        var deletecount;
        this.objectsService.IsObjectInuse(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId).subscribe(function (result) {
            deletecount = result["Data"];
            if (contextObj.itemSelected) {
                if (contextObj.inputItems.selectedIds.length == 0) {
                    contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
                    //if (contextObj.objectCategoryId == 1) {
                    //    contextObj.notificationService.ShowToaster("Select an " + contextObj.objectCategoryName + " Class", 2)
                    //} else {
                    //    contextObj.notificationService.ShowToaster("Select a " + contextObj.objectCategoryName + " Class", 2)
                    //}
                } else if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else {
                    if (deletecount == 0) {
                        contextObj.message = "Are you sure you want to delete the selected " + contextObj.objectCategoryName + "? ";
                    } else {
                        contextObj.message = "Selected " + contextObj.objectCategoryName + " is used in Work Order module. Are you sure you want to delete from " + contextObj.modulename + " Module?"
                    }
                    contextObj.showSlide = !contextObj.showSlide;
                }
            }
        });
    }

    public classSelectionClick() {
        var contextObj = this;
        var temp = new Array();
        var tempcombine = new Array();
        var drawingIdsforassigned = new Array();
        var dataoption = contextObj.dataOption;
        var tempdrawingids = "";
        //if (contextObj.fieldDetailsCheckBox != undefined) {
        //    contextObj.secondaryTarget = 6;
        //    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        //}
        //else {
        this.objectsService.getObjectClassSelectionFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldDetailsCheckBox = (result["Data"][0]);
            //contextObj.objectsService.getAssignedFloorlist(50833, 1).subscribe(function (resultData) {
            //    contextObj.assigneddrawingids = JSON.parse(resultData["Data"]["Table3"]);
            //    for (let i = 0; i < contextObj.assigneddrawingids.length; i++) {
            //        drawingIdsforassigned = contextObj.assigneddrawingids[i]["DrawingId"].toString();
            //        tempdrawingids = tempdrawingids + drawingIdsforassigned + ",";
            //    }
            //    tempdrawingids = tempdrawingids;
            //    tempdrawingids = tempdrawingids.slice(0, -1);

            if (dataoption == "3")
                dataoption = "1";
            if (contextObj.dataOption != "2") {
                //contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, tempdrawingids, 2, 1, 0).subscribe(function (resultData) {
                //    contextObj.MultiFieldValuesforassigned = JSON.parse(resultData.Data["FieldBinderData"]);
                //})
                contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, contextObj.drawingIds, 3, 1, 0).subscribe(function (resultData) {
                    contextObj.MultiFieldValuesforunassigned = JSON.parse(resultData.Data["FieldBinderData"]);
                })
            }
            contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, contextObj.drawingIds, dataoption, 1, 0).subscribe(function (resultData) {
                contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                if (contextObj.MultiFieldValues != undefined) {
                    if (contextObj.MultiFieldValues.length > 0)
                        contextObj.fieldDetailsCheckBox.MultiFieldValues = contextObj.MultiFieldValues;
                }
                else {
                    if (contextObj.dataOption == "2") {
                        for (let i = 0; i < contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues.length; i++) {
                            temp[i] = contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues[i]["Id"].toString();
                        }
                        contextObj.fieldDetailsCheckBox.MultiFieldValues = temp;
                    }
                    else if (contextObj.dataOption == "3") {
                        for (let i = 0; i < contextObj.MultiFieldValuesforunassigned.length; i++) {
                            temp[i] = contextObj.MultiFieldValuesforunassigned[i]["Id"].toString();
                        }
                        contextObj.fieldDetailsCheckBox.MultiFieldValues = temp;
                    }
                }
                contextObj.secondaryTarget = 6;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
            contextObj.fieldDetailsCheckBox.FieldLabel = "";
        });
        //});
        //}
    }

    public attachmentClick() {
        this.secondaryTarget = 9;
        var contextObj = this;
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
                //if (contextObj.objectCategoryId == 1) {
                //    contextObj.notificationService.ShowToaster("Select an " + contextObj.objectCategoryName + " Class", 2)
                //} else {
                //    contextObj.notificationService.ShowToaster("Select a " + contextObj.objectCategoryName + " Class", 2)
                //}
            } else if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            } else {
                contextObj.tempObjectClassId = contextObj.inputItems.rowData["ObjectClassId"];
                if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined) {
                    contextObj.Isallattachmentmenuneeded = false;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                } else {
                    if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"] })
                            if (orgidexists == undefined)
                                contextObj.Isallattachmentmenuneeded = false;
                            else
                                contextObj.Isallattachmentmenuneeded = true;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else

                        //  this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            }
        }
    }

    public DelinkClick() {
        var contextObj = this;
        var haseditprivilage;
        var delink = "";
        switch (contextObj.objectCategoryId) {
            case 2:
                delink = "warehouse";
                break;
            default:
                delink = "de-link";
                break;
        }
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
                //if (contextObj.objectCategoryId == 1) {
                //    contextObj.notificationService.ShowToaster("Select an " + contextObj.objectCategoryName + " Class", 2)
                //} else {
                //    contextObj.notificationService.ShowToaster("Select a " + contextObj.objectCategoryName + " Class", 2)
                //}
            } else if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            } else if (this.inputItems.rowData.Status == "Assigned") {
                if (contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined)
                    contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                else {
                    if (contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            //contextObj.objectsService.checkEditPrivilageExist(contextObj.inputItems.rowData["SpaceId"]).subscribe(function (result) {
                            //haseditprivilage = contextObj.usereditprivilageforspace(contextObj.inputItems.rowData["SpaceId"]);
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"] })
                            if (orgidexists == undefined)
                                contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                            else {
                                contextObj.message = "Are you sure you want to " + delink + " the selected " + contextObj.objectCategoryName + "? ";
                                contextObj.showSlidedelink = !contextObj.showSlidedelink;
                            }
                        });
                    }
                    else {
                        contextObj.message = "Are you sure you want to " + delink + " the selected " + contextObj.objectCategoryName + "? ";
                        contextObj.showSlidedelink = !contextObj.showSlidedelink;
                    }
                }
            }
            else {
                contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " is not assigned to any space", 2);
            }
        }
    }
    Delinkobject() {
        //debugger
        var contextObj = this;
        let retUpdatedSrc;
        var selectedClassIds: string = ''
        var delinked = "", updatestatus = "";
        switch (contextObj.objectCategoryId) {
            case 2:
                delinked = "warehoused";
                updatestatus = "14";
                break;
            default:
                delinked = "de-linked";
                updatestatus = "10";
                break;
        }
        if (this.fieldDetailsCheckBox != undefined) {
            if (this.fieldDetailsCheckBox.MultiFieldValues.length == 1) {
                selectedClassIds = this.fieldDetailsCheckBox.MultiFieldValues[0]
            }
        }
        var arr = new Array<ReportFieldArray>();
        //arr = JSON.parse(strsubmitField);
        arr.push({ ReportFieldId: 658, Value: contextObj.objectCategoryId.toString() });
        arr.push({ ReportFieldId: 659, Value: updatestatus });
        arr.push({ ReportFieldId: 665, Value: "" });
        arr.push({ ReportFieldId: 666, Value: "" });
        arr.push({ ReportFieldId: 667, Value: "" });
        arr.push({ ReportFieldId: 668, Value: "" });
        arr.push({ ReportFieldId: 669, Value: "" });
        if (contextObj.inputItems.rowData.SiteId != null) {
            arr.push({ ReportFieldId: 7411, Value: contextObj.inputItems.rowData.SiteId.toString() });
        }
        // //debugger
        contextObj.objectsService.DelinkObjectSpaceData(JSON.stringify(arr), contextObj.inputItems.selectedIds[0], 0, contextObj.objectCategoryId, contextObj.dataOption, 1, selectedClassIds, this.drawingIds, '', 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    var datakey = contextObj.inputItems.dataKey;
                    //for (let i = 0; i < contextObj.itemsSource.length; i++) {
                    //    if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData["Data"].Data)[0][datakey]) {
                    //        contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data)[0]
                    //        contextObj.itemsSource[i]["Asset Class Name"] = contextObj.itemsSource[i].ObjectClassName;
                    //        contextObj.itemsSource[i]["Asset No."] = contextObj.itemsSource[i].ObjectNo;
                    //        var updatedData = new Array();/*To notify the watcher about the change*/
                    //        updatedData = updatedData.concat(contextObj.itemsSource);
                    //        contextObj.itemsSource = updatedData;
                    contextObj.DelinkOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedObjectDetails": contextObj.inputItems.rowData });
                    //contextObj.dataLoad(selectedClassIds, 1);
                    let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1)
                        contextObj.enableMenu = [1]
                    if (selectedClassIds != '')
                        contextObj.isdelinked = true;
                    contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " has been " + delinked, 3);
                    //    }
                    //}
                    //contextObj.notificationService.ShowToaster("Selected Asset has been de-linked", 3);                        
                    //contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    //retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", resultData["Data"].Data, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Object already exists", 5);
                    }
                    break;
            }
        });
    }
    public placeonclick() {
        //debugger
        var contextObj = this;
        if (this.itemSelected) {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
                //if (contextObj.objectCategoryId == 1) {
                //    contextObj.notificationService.ShowToaster("Select an " + contextObj.objectCategoryName + " Class", 2)
                //} else {
                //    contextObj.notificationService.ShowToaster("Select a " + contextObj.objectCategoryName + " Class", 2)
                //}
            } else if (this.inputItems.selectedIds.length > 1) {
                contextObj.multipleAssign();// this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            } else {
                if (this.inputItems.selectedIds.length == 1 && this.inputItems.rowData.Status == "Assigned") {
                    this.notificationService.ShowToaster("Selected " + this.objectCategoryName + " is already placed", 2);
                } else if (this.inputItems.selectedIds.length > 1) {
                    //contextObj.message = "Are you sure you want to de-link the selected Asset? ";
                    //this.showSlidedelink = !this.showSlidedelink;
                }
                else if (this.inputItems.selectedIds.length == 1 && this.inputItems.rowData.Status == contextObj.unassignedTxt) {
                    if (contextObj.inputItems.rowData.SymbolId > 0) {
                        contextObj.PlaceObjectOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "rowData": contextObj.inputItems.rowData });
                    }
                    else {
                        this.notificationService.ShowToaster("Selected " + this.objectCategoryName + " has no Symbol", 2);
                    }

                    //contextObj.assetsDrawingObj = new AssetsOpenDrawing(contextObj.objiWhiz, contextObj.drawingIds, 1, 2, 1, contextObj.notificationService, contextObj.http);              
                    //contextObj.assetsDrawingObj.placeSymbolInDrawing(contextObj.inputItems.rowData, 185, contextObj.spaceIdForEdit, function (retCode) {
                    //        });                    
                }
                else {
                    this.notificationService.ShowToaster("Selected " + this.objectCategoryName + " is already placed", 2);
                }
            }
        }
    }
    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        this.refreshgrid = [];
        var addedclassid = JSON.parse(event["returnData"])[0]["ObjectClassId"].toString();
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            contextObj.UpdatedSuccess.emit({ "updatedData": event["returnData"] });
        }

        if (contextObj.MultiFieldValues != undefined) {
            if (contextObj.MultiFieldValues.indexOf(addedclassid) != -1)
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        if (this.action == "add" && this.totalItems > 0) {
            if (this.dataOption == 3)
                this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 9, 20, 15, 16];
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    deleteObjec() {
        var contextObj = this;
        contextObj.objectsService.deleteObject(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId, contextObj.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.IsSearchmenuNeeded = false;
                }
                contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " deleted", 3);
                contextObj.DelinkOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedObjectDetails": contextObj.inputItems.rowData });

            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Object cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }

    //slide events/////
    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteObjec();
    }

    okDelink(event: Event) {
        this.showSlidedelink = !this.showSlidedelink;
        this.Delinkobject();
    }
    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }
    cancelDelinClick(event: Event) {
        this.showSlidedelink = !this.showSlidedelink;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    closeSlideDialogdelink(value: any) {
        this.showSlidedelink = value.value;
    }
    getUpdatedDisplaySettings(event) {
        var contextObj = this;
        var SpaceDisplayFields = this.generFun.updateSpacePrefixInDisplaySettings(event["dispSettingObject"]);
        this.fieldObjectGrid = this.generFun.updateDisplaySettingsinUI(this.fieldObjectGrid, SpaceDisplayFields);
        //  this.fieldObjectGrid = this.generFun.updateDisplaySettingsinUI(this.fieldObjectGrid, event["dispSettingObject"]);
        //this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    private getSessionUserData(contextObj) {
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];

        });


    }
    private usereditprivilageforspace(selectedSpaceid) {
        var contextObj = this;
        contextObj.objectsService.checkEditPrivilageExist(contextObj.inputItems.rowData["SpaceId"]).subscribe(function (result) {
            contextObj.haseditprivilage = result.ServerId;
            return contextObj.haseditprivilage;
        });
    }
    itemSelected() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a row", 2);
            return false;
        }
        return true;
    }
    onloadSearch(event: any) {
        var contextObj = this;
        contextObj.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.searchindex = 1;
        this.exportSearchIndex = 1;
        contextObj.keywordSearchdata();
    }
    public keywordSearchdata() {
        var contextObj = this;
        var dataoptionno = contextObj.dataOption;
        contextObj.IsSearchmenuNeeded = true;
        var SortColumn = contextObj.inputItems.sortCol;
        var totalitems = contextObj.totalItems;
        //if (contextObj.inputItems.sortCol == "[Asset No.]")
        //    SortColumn = "[ObjectNo]"
        //else if (contextObj.inputItems.sortCol == "[Asset Class Name]")
        //    SortColumn = "[ObjectClassName]"
        if (contextObj.filter == "Assigned")
            dataoptionno = "2"
        else if (contextObj.filter == contextObj.unassignedTxt)
            dataoptionno = "3"
        if (contextObj.filter == "Assigned" && contextObj.dataOption == "3") {
            contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
            contextObj.itemsSource = [];
            contextObj.totalItems = 0;
            contextObj.changeEnableMenu(false);
        }
        else if (contextObj.filter == contextObj.unassignedTxt && contextObj.dataOption == "2") {
            contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
            contextObj.itemsSource = [];
            contextObj.totalItems = 0;
            contextObj.changeEnableMenu(false);
        }
        else {
            contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataoptionno, 1, '', this.drawingIds, '', false, 0, true, 1, 0, SortColumn, contextObj.inputItems.sortDir, contextObj.filter, false, contextObj.isBuildingDrawing).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    contextObj.totalItems = JSON.parse(result["DataCount"]);
                    contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        //contextObj.totalItems = totalitems;
                        contextObj.changeEnableMenu(false);
                    }
                    else {
                        if (contextObj.dataOption == 2 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: contextObj.moduleId });
                        contextObj.changeEnableMenu(true);
                    }
                    //contextObj.IsKeyWordSearch = 0;
                    contextObj.searchindex = 0;
                    //contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                }
            });
        }
    }
    Submit(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.searchindex = 2;
        this.IsAdvanceSearch = 1;
        this.exportSearchIndex = 2;
        contextObj.AdvancedSearchdata();
    }
    public AdvancedSearchdata() {
        var contextObj = this;
        var dataoptionno = contextObj.dataOption;
        contextObj.IsSearchmenuNeeded = true;
        contextObj.filter = "";
        var SortColumn = contextObj.inputItems.sortCol;
        var totalitems = contextObj.totalItems;
        //if (contextObj.inputItems.sortCol == "[Asset No.]")
        //    SortColumn = "[ObjectNo]"
        //else if (contextObj.inputItems.sortCol == "[Asset Class Name]")
        //    SortColumn = "[ObjectClassName]"
        if (contextObj.advanceValue.indexOf("Assigned") > 0)
            dataoptionno = "2"
        else if (contextObj.advanceValue.indexOf(contextObj.unassignedTxt) > 0)
            dataoptionno = "3"
        if (contextObj.advanceValue.indexOf("Assigned") > 0 && contextObj.dataOption == "3") {
            contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
            contextObj.itemsSource = [];
            contextObj.totalItems = 0;
            contextObj.changeEnableMenu(false);
        }
        else if (contextObj.advanceValue.indexOf(contextObj.unassignedTxt) > 0 && contextObj.dataOption == "2") {
            contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
            contextObj.itemsSource = [];
            contextObj.totalItems = 0;
            contextObj.changeEnableMenu(false);
        }
        else {
            contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataoptionno, 1, '', this.drawingIds, '', false, 0, true, 1, 0, SortColumn, contextObj.inputItems.sortDir, contextObj.advanceValue, false, contextObj.isBuildingDrawing).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {

                    contextObj.totalItems = JSON.parse(result["DataCount"]);
                    contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        //contextObj.totalItems = totalitems;
                        contextObj.changeEnableMenu(false);
                    }
                    else {
                        contextObj.changeEnableMenu(true);
                        if (contextObj.dataOption == 2 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: contextObj.moduleId });
                    }
                    //contextObj.IsAdvanceSearch = 0;
                    contextObj.searchindex = 0;
                    //contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                }
            });
        }

    }
    //updateAssetClass(fieldObjectArray) {

    //    var contextObject = this;
    //    fieldObjectArray.find(function (item: IField) {
    //        switch (item.ReportFieldId) {
    //            case 648:
    //                item.FieldValue = contextObject.inputItems.rowData[""];
    //                break;
    //            case 647:
    //                item.FieldValue = contextObject.inputItems.rowData[""];
    //                break;
    //        }
    //    });
    //    return fieldObjectArray;
    //}
    getSelectedTab(event: any) {
        this.dispTab = event[0];
    }
    private getCusSubscribedFeatures() {
        var contextObj = this;
        contextObj.AdministrationService.getCustomerSubscribedFeatures("189").subscribe(function (rt) {

            var customerFeatureobj = rt["Data"];
            for (let i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 189:
                        contextObj.isSiteAdmin = customerFeatureobj[i]["IsSubscribed"];
                        break;

                }
            }

        });
    }
    closeMultipleAssign(value: any) {
        this.showMultipleAssign = value.value;
    }
    cancelMultipleAssign(event: Event) {
        this.showMultipleAssign = !this.showMultipleAssign;
    }
    okMultipleAssign(event: Event) {

        var contextObj = this;
        contextObj.showMultipleAssign = !contextObj.showMultipleAssign;
        contextObj.PlaceObjectOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "rowData": contextObj.inputItems });
    }

    public onSplitViewClose(event) {
        if (this.secondaryTarget == 17) {
            if (this.searchindex == 0) {
                if (this.SelectedclassIds != "") {
                    this.dataLoad(this.SelectedclassIds, 0);
                } else {
                    this.dataLoad('', 0);
                }
            }
            else if (this.searchindex == 1)
                this.keywordSearchdata();
            else if (this.searchindex == 2)
                this.AdvancedSearchdata();
        }
    }

    public onMultipleEditClick() {
        var contextObj = this;
        contextObj.commonService.getFieldsForMultipleEdit(contextObj.objectsService.objectDataAddEditFormId, contextObj.getReportFieldIdValuesForMultipleEdit()).subscribe(function (resultData) {
            contextObj.multipleEditFieldDetails = JSON.parse(resultData);
            contextObj.secondaryTarget = 17;
            contextObj.pageTitle = "Multiple Update";
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public getReportFieldIdValuesForMultipleEdit() {
        var reportFieldValueAraay: ReportFieldArray[] = [{ ReportFieldId: 67, Value: this.objectCategoryId.toString() }];
        var objectClassId = this.inputItems.rowData[0]["ObjectClassId"];
        for (var item of this.inputItems.rowData) {
            if (objectClassId != item["ObjectClassId"]) {
                objectClassId = 0;
                break;
            }
        }
        reportFieldValueAraay.push({ ReportFieldId: 657, Value: objectClassId.toString() });

        return JSON.stringify(reportFieldValueAraay);
    }

    public onMultipleEditUpdate(event: IMultipleSubmitOutput) {
        for (var item of this.inputItems.selectedIds) {
            event.ReportFieldIdValuesArray.push({ ReportFieldId: 656, Value: item });
        }
        var contextObj = this;
        contextObj.objectsService.updateMultipleobjectData(JSON.stringify(event.ReportFieldIdValuesArray), event.ReportFieldId, event.NewValue).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster(contextObj.objectCategoryName + " details updated", 2);
                    break;
                default:
                    break;

            }
        });

    }

    public showSelectMessage(objectCategoryId, contextObj) {
        switch (objectCategoryId) {
            case 1:
            case 3:
            case 20:
                contextObj.notificationService.ShowToaster("Select an " + contextObj.classname, 2);
                break;
            case 2:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                contextObj.notificationService.ShowToaster("Select a " + contextObj.classname, 2);
                break;

        }
    }
    onContextMenuOnClick(event: any) {
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObjectGrid;
            this.analyticsInput.selectedIds = this.drawingIds;
            this.analyticsInput.moduleId = this.moduleId;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = 207;
            this.analyticsInput.ParentFormId = 273;
            this.analyticsInput.objectCategoryId = this.objectCategoryId
            this.analyticsInput.dataOption = this.dataOption;
            this.analyticsInput.attributeOption = this.attributeoption;
            this.analyticsInput.objectClassIds = this.SelectedclassIds; //classId
            this.analyticsInput.searchCondition = '';
            this.analyticsInput.isOrphan = false;
            this.analyticsInput.objectId = 0;
            this.analyticsInput.isDataBasedOnUserAccess = true
            this.analyticsInput.objectComponentType = 1;
            this.showAnalytics = true;
        }
    }
    closeAnalytics() {
        this.showAnalytics = false;
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
import {Component, EventEmitter, AfterViewInit, Output, Input, OnInit, AfterViewChecked} from '@angular/core';
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
import { ObjectDrawingList } from '../../Objects/Drawings/object-drawing-list';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import {OpenDrawing} from '../../common/opendrawing/opendrawing.component';
import {WarrantyListComponent} from '../../Objects/Data/warranty-list.component';
import { CommonService } from '../../../models/common/common.service';
import { MultipleEdit, IMultipleSubmitOutput } from '../../../framework/whatever/multipleedit/multiple-edit.component';
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';

@Component({
    selector: 'objectData-list',
    templateUrl: './app/Views/Objects/Data/objectData-list.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, TabsComponent, TabComponent, DisplaySettingsComponent, DropDownListComponent, AttachmentsComponent,
        ListBoxComponent, ObjectDataAddEditComponent, ObjectDrawingList, searchBox, OpenDrawing, WarrantyListComponent, MultipleEdit, Analytics],
    providers: [ObjectsService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ExportToExcel, CommonService],
    inputs: ["objectCategoryId", "dataOption", "drawingIds", "moduleId"],
})

export class ObjectDataListComponent implements AfterViewInit, AfterViewChecked {
    @Input() isQuerybuilder: boolean = false;
    @Input() buildarray: any;
    @Input() qResult: any;
    @Input() QueryCategryId: any;
    objectCategoryId: number;
    @Input() selectedClassIds: any;
    @Input()  attributeId: number;
    moduleId: number;
    fieldObjectGrid: IField[];
    fieldDetailsAdd1: IField[];
    ddlObjectClassDisplaySettings: IField;
    fieldDetailsAdd: IField[];
    fieldDetailsCheckBox: IField;
    itemsSource: any[];
    itemsSourceforalldata: any[];
    Drawingsource: any[];
    parentLeaseDetails: any[];
    advancelookup: IField[];
    inputItems: IGrid = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: false, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'Multiple', showContextMenu: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    secondaryTarget: number = 100;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 100 };
    action: string;
    filter = "";
    btnName: string;

    KeywordFieldObject: any;
    allObjectAction: string;
    message;
    varsort: string = "DESC";
    wanttoreload: boolean;
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    blnIsGrid: boolean = true;
    PageTarget = 0;
    dispSettingCategoryId = 6;
    classname: any;
    objectmultiplename: any;
    dispTab: number = 0;
    arrHighlightRowIds = [];
    Isallattachmentmenuneeded: boolean = true;
    IsSearchmenuNeeded: boolean = false;
    MultiFieldValues: any[];
    MultiFieldValuesforassigned: any[];
    MultiFieldValuesforunassigned: any[];
    assigneddrawingids: any[];
    commonDisplaySettingCategoryId: number;
    spaceDisplaySettingCategoryId: number;
    commonAdditionalDataFieldCategoryId: number;
    spaceAdditionalDataFieldCategoryId: number;
    selectedObjectClassDisplaySettingsId: number = 0;
    @Output() submitSuccess = new EventEmitter();
    @Output() ChangePagepath = new EventEmitter();
    @Output() onSearchInDrawing = new EventEmitter();
    dataOption: any;
    attributeoption: number = 2;
    drawingIds: any;
    selectedDrawingId: number;
    selectDrawingCategoryId: number;
    IsBuildingDrawing:boolean = false;
    selectedSpaceid: number;
    haseditprivilage: any = 1;
    IsOpenDrawingComponentActive: boolean = false;
    drawingType: number = 1;
    isSiteAdmin: boolean = false;
    secondaryViewTarget: number = 0;
    pageTitle: string;
    pagePath: string = "";
    displaySettingDdlFieldValue: any;
    sessionUserCatId = 0;
    sessionUserRoleId = 0;
    sessionUserId = 0;
    IsModuleAdmin: boolean = false;
    tempObjectClassId: number = 0;
    g_selectedClassIds: string = "";
    exportDataSource: any;
    objectCategoryName: string;
    unassignedTxt = "Unassigned";
    messages: any[];
    enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    searchindex = 0;
    menuData: any;

    modulename: any;
    attributetitle: any;
    position = "top-right";
    showSlide = false;
    showSlidedelink = false;
    showMultipleAssign = false;
    slidewidth = 250;
    public keyWordLookup: any;
    refreshgrid;
    IsBarcodeSubscribed: boolean = false;
    IsAutoNumbering: boolean = false;
    multipleEditFieldDetails: any;
    exportSearchIndex: number = 0;
    analyticsInput: IAnalytics = { menuId: 0 };
    showAnalytics: boolean = false;
    innerwidth: number;
    constructor(private objectsService: ObjectsService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel, private commonService: CommonService) {       
        this.innerwidth = window.innerWidth - 50;
    }

    ngOnInit() {
        if (this.moduleId == 9)
        {
            this.menuData = [
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
                    "id": 4,
                    "title": "Display Settings",
                    "image": "DisplaySettings",
                    "path": "DisplaySettings",
                    "subMenu": null
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
                            "subMenu": null,
                            "privilegeId": null
                        }
                    ]
                },
            ];
        }
        else {
            this.menuData = [
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
                    "id": 4,
                    "title": "Display Settings",
                    "image": "DisplaySettings",
                    "path": "DisplaySettings",
                    "subMenu": null
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
                            "subMenu": null,
                            "privilegeId": null
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
                    "id": 9,
                    "title": "Attachments",
                    "image": "Attachments",
                    "path": "Attachments",
                    "subMenu": null,
                    "privilegeId": null
                },
                {
                    "id": 10,
                    "title": "Show Drawing",
                    "image": "Show Drawing",
                    "path": "Show Drawing",
                    "subMenu": null,
                    "privilegeId": null
                }
                ,
                {
                    "id": 11,
                    "title": "Export",
                    "image": "Export",
                    "path": "Export",
                    "subMenu": null,
                    "privilegeId": null
                }
                , {
                    "id": 12,
                    "title": "Warranty Details",
                    "image": "Warranty",
                    "path": "Warranty",
                    "subMenu": null,
                    "privilegeId": null
                }
            ];
        }
        var contextObj = this;
        this.enableMenu = [];
        var featureid = "";
        this.unassignedTxt = "Unassigned";

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
                this.menuData[4].subMenu[2].title = "Warehouse";
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
                this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Electrical";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 9;
                this.spaceDisplaySettingCategoryId = 18;
                break;

            case 9:
                featureid = "115,100";
                this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Fire and Safety";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 10;
                this.spaceDisplaySettingCategoryId = 19;
                break;

            case 10:
                featureid = "229,130";
                this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Mechanical";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 20;
                this.spaceDisplaySettingCategoryId = 21;
                break;

            case 11:
                featureid = "131,140";
                this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Plumbing";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 22;
                this.spaceDisplaySettingCategoryId = 23;
                break;

            case 12:
                featureid = "141,150";
                this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Medical Gas";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 24;
                this.spaceDisplaySettingCategoryId = 25;
                break;

            case 20:
                featureid = "151,228";
                this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Equipment Type";
                this.objectmultiplename = "Equipment"
                this.modulename = "Security Assets";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 32;
                this.spaceDisplaySettingCategoryId = 33;
                break;
        }

        //featureid = featureid+",72,73";
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
                //            contextObj.IsAutoNumbering = true;
                //        }
                //        break;
                //    case 73:
                //        if (item["IsSubscribed"] == true && item["Id"] == 73) {
                //            if (contextObj.objectCategoryId == 2)
                //            contextObj.IsAutoNumbering = true;
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
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            if (contextObj.sessionUserRoleId == 6) {
                contextObj.objectsService.getIsModuleAdmin(contextObj.moduleId).subscribe(function (resultData) {
                    if (resultData["Data"] == true) { /*1 or 0*/
                        var callBack = function (data) {
                            contextObj.menuData = data;
                        };
                        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
                    } else {
                        contextObj.enableMenu = [4, 5, 6, 9, 10, 11, 12];
                    }
                });
            } else {
                var callBack = function (data) {
                    contextObj.menuData = data;
                };
                contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
            }
        });
    }
    outDrawingObject(event: any) {

    }

    SetEnableMenuData() {
        var contextObj = this;
        //contextObj.AdministrationService.getSessionData().subscribe(function (data) {
        //    var retData = data["Data"];
        //    contextObj.sessionUserId = retData["UserId"];
        //    contextObj.sessionUserCatId = retData["UserCategoryId"];
        //    contextObj.sessionUserRoleId = retData["UserRoleId"];
        debugger;
        if (contextObj.sessionUserRoleId == 6) {
            contextObj.objectsService.getIsModuleAdmin(contextObj.moduleId).subscribe(function (resultData) {
                if (resultData["Data"] == true) { /*1 or 0*/
                    var callBack = function (data) {
                        contextObj.menuData = data;
                    };
                    contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
                } else {
                    contextObj.enableMenu = [4, 5, 6, 9, 10, 11, 12];
                }
            });
        } else {
            var callBack = function (data) {
                contextObj.menuData = data;
            };
            contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
        }
        //});
    }

    ngAfterViewInit() {
        var contextObj = this;
        if (contextObj.dataOption == "2")
            contextObj.menuData = contextObj.menuData.slice(1, 9);

        if (contextObj.drawingIds == undefined) {
            contextObj.drawingIds = '';
        }
        var count = 0;
        this.objectsService.getObjectDataFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObjectGrid = (result["Data"]);
            contextObj.fieldObjectGrid.find(function (item: IField) {
                switch (item.ReportFieldId) {
                    case 4303:   /*Barcode */
                        if (contextObj.IsBarcodeSubscribed == true) {
                            if (item.IsVisible == true)
                            { item.IsVisible = true; }
                            else
                            { item.IsVisible = false; }

                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;
                        }
                        count++;
                        break;
                    case 651:
                        if (contextObj.IsAutoNumbering == false && item.FieldId == 1985) {
                            item.IsVisible = true;
                            count++;
                        }
                        if (contextObj.IsAutoNumbering == false && item.FieldId == 1605) {
                            item.IsVisible = false;
                            count++;
                        }
                }
                if (count == 3) { return true; }
                else return false;
            });
            if (contextObj.moduleId==9)
                contextObj.removeSpaceFields(1);
            contextObj.dataLoad('', 1);

        });

    }

    removeSpaceFields(target)
    {
        var reportFieldValueList: any = new Array<ReportFieldArray>(),
            contextObj: any = this;
        reportFieldValueList = [];

        reportFieldValueList.push({
            ReportFieldId: 182,
            Value: this.spaceDisplaySettingCategoryId.toString()
        });
        reportFieldValueList.push({
            ReportFieldId: 24,
            Value: 7 /*this.spaceAdditionalDataFieldCategoryId.toString()*/
        });
        
        var reportFieldIdlist: number[] = [];
        reportFieldIdlist = [488, 540, 782, 793, 777, 811, 787, 786, 817, 6730, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 665, 791, 783, 775];
            contextObj.AdministrationService.getDisplaySettingData(JSON.stringify(reportFieldValueList)).subscribe(function (result) {            
            var data: any = result["Data"];
            for (let i = 0; i < data.length; i++)
            {
                if (data[0]["ReportFieldId"] > 1000000)
                    reportFieldIdlist.push(data[0]["ReportFieldId"]); 
            }

            var fieldObject1: IField[]=[],
                ispush: boolean,
                fieldObjectGrid1: IField[] = [];
            if (target == 1)
                fieldObjectGrid1 = contextObj.fieldObjectGrid;
            else 
                fieldObjectGrid1 = contextObj.advancelookup;

            for (let j = 0; j < fieldObjectGrid1.length; j++)
            {
                ispush = false;                
                reportFieldIdlist.find(function (item) {
                    if (item == fieldObjectGrid1[j]["ReportFieldId"]) {
                        ispush = true;
                        return true;
                    }
                    else
                        return false;

                });
                if (!ispush)                
                    fieldObject1.push(fieldObjectGrid1[j]);   
                             
            }
            if (target == 1)
                contextObj.fieldObjectGrid = fieldObject1;  
            else
                contextObj.advancelookup = fieldObject1;    
        });
    }

    public dataLoad(classIds: string, target?: number) {        
        var contextObj = this;
        var contextObj = this;
        contextObj.IsSearchmenuNeeded = false;
        var SortColumn = contextObj.inputItems.sortCol;
        contextObj.wanttoreload = true;
        //contextObj.changeEnableMenu(true);
        if (classIds != "") {
            //contextObj.pageIndex = 0;
            contextObj.g_selectedClassIds = classIds;
        }
        if (contextObj.qResult) {            
            contextObj.g_selectedClassIds = contextObj.selectedClassIds;
            contextObj.enableMenu = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            if (target == 1) {
                contextObj.IsSearchmenuNeeded = true;
                contextObj.itemsSource = JSON.parse(contextObj.qResult.FieldBinderData);
                contextObj.itemsPerPage = contextObj.qResult.RowsPerPage;
                contextObj.totalItems = contextObj.qResult.DataCount;
                contextObj.objectCategoryName = contextObj.qResult.ReturnMessages["ObjectCategoryName"];
            }
            else {
                this.commonService.QueryBuilderSearchResultsForObjects(516, contextObj.buildarray, contextObj.QueryCategryId, this.drawingIds, contextObj.objectCategoryId, 0, contextObj.attributeId, contextObj.g_selectedClassIds, contextObj.pageIndex, contextObj.inputItems.sortDir, SortColumn).subscribe(function (result) {
                
                    contextObj.totalItems = result.DataCount;
                    contextObj.messages = result.ReturnMessages;
                    contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
                    if (contextObj.totalItems > 0) {
                        contextObj.IsSearchmenuNeeded = true;
                        contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                        if (target == 1) {
                            contextObj.itemsPerPage = result.RowsPerPage;
                        }
                        contextObj.changeEnableMenu(true);
                    } else {
                        contextObj.notificationService.ShowToaster("No Data exists", 2);
                        contextObj.IsSearchmenuNeeded = false;
                        contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                        contextObj.changeEnableMenu(false);
                        if (classIds != "")
                            contextObj.enableMenu = [1, 5, 6];
                    }

                });
                setTimeout(function () {
                    contextObj.objectsService.getObjectDataKeywordField(contextObj.objectCategoryId).subscribe(function (resultData) {
                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                            contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                        }
                    });
                }, 3000);
            }
        }
        else {
            if (contextObj.g_selectedClassIds != "") {
                contextObj.IsAdvanceSearch = 0;
                contextObj.IsKeyWordSearch = 0;
            }
            contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, classIds, this.drawingIds, '', false, 0, true, 1, contextObj.pageIndex, SortColumn, contextObj.inputItems.sortDir, contextObj.filter, false, contextObj.IsBuildingDrawing).subscribe(function (result) {
                contextObj.totalItems = result.DataCount;
                contextObj.messages = result.ReturnMessages;
                contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
                if (contextObj.totalItems > 0) {
                    contextObj.IsSearchmenuNeeded = true;
                    contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                    if (target == 1) {
                        contextObj.itemsPerPage = result.RowsPerPage;
                    }
                    contextObj.changeEnableMenu(true);
                } else {
                    contextObj.notificationService.ShowToaster("No Data exists", 2);
                    contextObj.IsSearchmenuNeeded = false;
                    contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                    contextObj.changeEnableMenu(false);
                    if (classIds != "")
                        contextObj.enableMenu = [1, 5, 6];
                }
            });
            setTimeout(function () {
                contextObj.objectsService.getObjectDataKeywordField(contextObj.objectCategoryId).subscribe(function (resultData) {

                    contextObj.KeywordFieldObject = resultData["FieldBinderList"];

                });
            }, 3000);
        }

    }
    advanceSearch() {
        var contextObj = this;
        this.objectsService.getAdvnceSearchLookup(contextObj.objectCategoryId).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                contextObj.advancelookup.find(function (item: IField) {
                    if (item.ReportFieldId == 4303) {
                        if (contextObj.IsBarcodeSubscribed == true) {
                            item.IsVisible = true;

                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;

                        }
                        return true;
                    }
                    else
                        return false;
                });

                if (contextObj.moduleId == 9)
                    contextObj.removeSpaceFields(2);
            }
        });

    }
    public changeEnableMenu(haveData: boolean) {
        if (haveData) {
            switch (this.dataOption) {
                case 1:
                    this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                    break;
                case 2:
                    this.enableMenu = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
                    break;
                case 3:
                    this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 9, 11, 12];
                    break;
            }
        } else {
            this.enableMenu = [1];
        }

    }

    private usereditprivilageforspace(selectedSpaceid) {
        var contextObj = this;
        contextObj.objectsService.checkEditPrivilageExist(contextObj.inputItems.rowData["SpaceId"]).subscribe(function (result) {
            contextObj.haseditprivilage = result.ServerId;
            return contextObj.haseditprivilage;
        });
    }

    onClassSelected(event) {
        var contextObj = this;
        contextObj.g_selectedClassIds = "";
        var selectedClassIds: string = ''
        if (this.fieldDetailsCheckBox.MultiFieldValues == null || this.fieldDetailsCheckBox.MultiFieldValues.length == 0) {
            this.showSelectaMessage(contextObj);
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
                    contextObj.g_selectedClassIds = selectedClassIds;
                    contextObj.dynamicDataLoad(1);
                    //contextObj.dataLoad(selectedClassIds, 1);
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
                    contextObj.g_selectedClassIds = selectedClassIds;
                    contextObj.dynamicDataLoad(1);
                    //contextObj.dataLoad(selectedClassIds, 1);
                });
                //contextObj.dataLoad(selectedClassIds, 1);
            }
        }
      
      
        if (contextObj.attributeoption) {
            contextObj.attributeId = contextObj.attributeoption;
        }
        console.log(this.fieldDetailsCheckBox);
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
                this.pageTitle = null;
                this.placeonclick();
                break;
            case 8:
                //this.pageTitle = "Delink";
                this.DelinkClick();
                break;
            case 9:
                this.pageTitle = "Attachments";
                this.attachmentClick();
                break;
            case 10:
                this.pageTitle = null;
                this.Opendrawingonclick();
                break;
            case 11:
                this.pageTitle = null;
                this.Export();
                break;
            case 12:
                this.pageTitle = "Warranty Details";
                this.warranty();
                break;
        }
    }

    public warranty() {
        this.secondaryTarget = 12;
        var contextObj = this;
        //if (this.inputItems.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //}
        //else if (this.inputItems.selectedIds.length == 1) {
        //    this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        //}
        //else {
        //    this.notificationService.ShowToaster("Select an " + this.objectCategoryName, 2);
        //}
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            } else if (this.inputItems.selectedIds.length == 1) {
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
            else {
                this.showSelectaMessage(contextObj);
            }
        }
    }

    Export() {
        var contextObj = this;
        var modname = this.modulename.replace(/\s/g, '');
        var fileName = "";
        if (this.objectCategoryId == 1 || this.objectCategoryId == 2)
            fileName = this.dataOption == 1 ? "All" + this.objectmultiplename : this.dataOption == 2 ? "Operational" + this.objectmultiplename : "Warehoused" + this.objectmultiplename;
        else
            fileName = this.dataOption == 1 ? "All" + modname + this.objectmultiplename : this.dataOption == 2 ? "Operational" + modname + this.objectmultiplename : "Warehoused" + modname + this.objectmultiplename;

        if (contextObj.inputItems.selectedIds.length > 1) {//export highlighted
            contextObj.exportDataSource = JSON.stringify(contextObj.inputItems.rowData.slice());
            contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObjectGrid, fileName, function (retCode) {
                if (retCode == 0) {
                    contextObj.notificationService.ShowToaster(contextObj.objectCategoryName + " data exported", 3);
                } else {
                    contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                }
            });
        } else {
            if (contextObj.g_selectedClassIds != "") {
                contextObj.pageIndex = 0;
            }
            var searchkey = contextObj.exportSearchIndex == 1 ? contextObj.filter : contextObj.exportSearchIndex == 2 ? contextObj.advanceValue : ""; //contextObj.g_selectedClassIds
            if (searchkey != "" && searchkey != "[]")
                contextObj.g_selectedClassIds = "";

            var input = {};
            var target = 2;
            if (contextObj.qResult) {
                input = contextObj.commonService.QueryBuilderSearchResultsForObjectsExport(516, contextObj.buildarray, contextObj.QueryCategryId, "", contextObj.fieldObjectGrid, fileName, contextObj.objectCategoryId, 0, contextObj.attributeId, contextObj.g_selectedClassIds, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol);
                target = 7;
            } else {
                input = contextObj.objectsService.getObjectSpaceDataExport(contextObj.PageTarget, contextObj.exportSearchIndex == 1 ? 1 : 0, contextObj.exportSearchIndex == 2 ? 1 : 0, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, contextObj.g_selectedClassIds, contextObj.drawingIds, '', false, 0, true, 1, contextObj.fieldObjectGrid, fileName, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, searchkey, true);
            }

           // var input = contextObj.objectsService.getObjectSpaceDataExport(contextObj.PageTarget, contextObj.exportSearchIndex == 1 ? 1 : 0, contextObj.exportSearchIndex == 2 ? 1 : 0, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, contextObj.g_selectedClassIds, contextObj.drawingIds, '', false, 0, true, 1, contextObj.fieldObjectGrid, fileName, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, searchkey, true);
            contextObj.exportObject.ExportDataFromServer(input, target, fileName, function (retCode) {
                if (retCode == 0) {
                    contextObj.notificationService.ShowToaster(contextObj.objectCategoryName + " data exported", 3);
                }
                else { contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
            });
            //});
        }
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dynamicDataLoad(0);
    };

    public onSort(objGrid: any) {
        this.dynamicDataLoad(0);
    }

    public dynamicDataLoad(target?: number)
    {
        if (this.searchindex == 0 || this.filter == "" || this.advanceValue == "")
        {
            if (this.g_selectedClassIds != "")
            {
                this.dataLoad(this.g_selectedClassIds, target);
            }
            else
            {
                if (this.searchindex == 2)
                    this.AdvancedSearchdata();
                else
                    this.dataLoad('', target);
            }

            if (this.filter == "" || this.advanceValue == "")
            {
                this.IsAdvanceSearch = 0;
                this.IsKeyWordSearch = 0;
            }
        }       
        else if (this.searchindex == 1)
            this.keywordSearchdata();
        else if (this.searchindex == 2)
            this.AdvancedSearchdata();
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
                        else if (item.FieldId == 1605) {//asset number with prefix                           
                            Tagno = item.FieldLabel;
                            item.IsVisible = false;//for autonumber true /false asset no. field is invisible

                        }
                        var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661 })
                        if (tagNoItem != undefined) {

                            if (contextObj.IsAutoNumbering == true)
                                tagNoItem.IsVisible = false;
                            else
                                tagNoItem.IsMandatory = true;

                            tagNoItem.FieldLabel = Tagno;
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
        if (this.itemSelected) {
            this.action = "edit";
            this.btnName = "Save Changes";
            var contextObj = this;
            var haseditprivilage;
            var Tagno;
            var editabledivisions = new Array();
            contextObj.getCusSubscribedFeatures();
            if (this.inputItems.selectedIds.length == 0) {
                this.showSelectaMessage(contextObj);
            } else if (this.inputItems.selectedIds.length > 1) {
                this.onMultipleEditClick();
            } else {
                if (this.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined)
                    contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected " + contextObj.objectCategoryName, 2);
                else {
                    if (this.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"] })
                            if (orgidexists == undefined)
                                contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected " + contextObj.objectCategoryName, 2);
                            else {
                                var withPrefix = false;
                                var withoutPrefix = false;
                                contextObj.objectsService.getObjectDataEditFieldsList(contextObj.objectCategoryId, contextObj.inputItems.selectedIds[0], "edit", contextObj.dataOption, contextObj.attributeoption, contextObj.inputItems.rowData.ObjectClassId.toString(), contextObj.drawingIds, '', 0, 0, 1, 1, contextObj.IsBuildingDrawing).subscribe(function (result) {
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
                                                if (contextObj.inputItems.rowData.Status == "Assigned" || contextObj.inputItems.rowData.Status == "Archived")
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

                        contextObj.objectsService.getObjectDataEditFieldsList(contextObj.objectCategoryId, contextObj.inputItems.selectedIds[0], "edit", contextObj.dataOption, contextObj.attributeoption, contextObj.inputItems.rowData.ObjectClassId.toString(), contextObj.drawingIds, '', 0, 0, 1, 1, contextObj.IsBuildingDrawing).subscribe(function (result) {
                            contextObj.fieldDetailsAdd = result["Data"];
                            var count = 0;
                            var withPrefix = false;
                            var withoutPrefix = false;
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
                                                item.IsVisible = true;
                                                withPrefix = true;

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

                                            if (contextObj.inputItems.rowData.Status == "Assigned" || contextObj.inputItems.rowData.Status == "Archived")
                                            item.IsEnabled = false;

                                        else if (contextObj.inputItems.rowData.ObjectSiteId != undefined)
                                            item.FieldValue = contextObj.inputItems.rowData.ObjectSiteId.toString();
                                        count++;
                                        break;
                                }
                                if (count == 5) return true;
                            });

                            // contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
                            //    contextObj.fieldDetailsAdd[2].LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                            //})

                            contextObj.secondaryTarget = 0;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                }


            }
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
                    if (contextObj.inputItems.selectedIds.length >= 0) 
                        contextObj.ddlObjectClassDisplaySettings.FieldValue = "-1";                                                   
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
        } else if (Number(event) == -1) {
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
                            break;
                        case "delete":
                            item["Attachments"] = (Number(item["Attachments"]) - 1).toString();
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
        if (this.inputItems.selectedIds.length == 0) {
            this.showSelectaMessage(contextObj);
        } else {
            this.objectsService.IsObjectInuse(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId).subscribe(function (result) {
                deletecount = result["Data"];
                if (contextObj.itemSelected) {
                    if (contextObj.inputItems.selectedIds.length == 0) {
                        this.showSelectaMessage(contextObj);
                    }
                    else if (contextObj.inputItems.selectedIds.length > 1) {
                        contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                    } else {
                        if (deletecount == 0) {
                            contextObj.message = "Are you sure you want to delete the selected " + contextObj.objectCategoryName + "? ";
                        } else {
                            if (contextObj.moduleId == 9) 
                                contextObj.message = "Selected Asset is in use.Are you sure you want to delete the selected Asset ?";
                           else
                            contextObj.message = "Selected " + contextObj.objectCategoryName + " is used in Work Order module. Are you sure you want to delete from " + contextObj.modulename + " Module?"
                        }
                        contextObj.showSlide = !contextObj.showSlide;
                    }
                }
            });
        }
    }

    public classSelectionClick() {
        var contextObj = this;
        var temp = new Array();
        var tempcombine = new Array();
        var tempalldata = new Array();
        var drawingIdsforassigned = new Array();
        var dataoption = contextObj.dataOption;
        var tempdrawingids = "";
        //if (contextObj.fieldDetailsCheckBox != undefined) {
        //    contextObj.secondaryTarget = 6;
        //    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        //} else {
        this.objectsService.getObjectClassSelectionFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldDetailsCheckBox = (result["Data"][0]);
            contextObj.objectsService.getObjectDataListForClassSelection(1, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, 1, contextObj.attributeoption, '', '', '', false, 0, true, 1, contextObj.pageIndex, '', contextObj.inputItems.sortDir, '', false, contextObj.IsBuildingDrawing).subscribe(function (result) {
                contextObj.itemsSourceforalldata = JSON.parse(result["FieldBinderData"]);
                contextObj.objectsService.getAssignedFloorlist(50833, contextObj.objectCategoryId).subscribe(function (resultData) {
                    contextObj.assigneddrawingids = JSON.parse(resultData["Data"]["Table3"]);
                    for (let i = 0; i < contextObj.assigneddrawingids.length; i++) {
                        drawingIdsforassigned = contextObj.assigneddrawingids[i]["DrawingId"].toString();
                        tempdrawingids = tempdrawingids + drawingIdsforassigned + ",";
                    }
                    tempdrawingids = tempdrawingids;
                    tempdrawingids = tempdrawingids.slice(0, -1);

                    if (dataoption == "3")
                        dataoption = "1";
                    if (contextObj.dataOption != "2") {
                        contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, tempdrawingids, 2, 1, 0).subscribe(function (resultData) {
                            contextObj.MultiFieldValuesforassigned = JSON.parse(resultData.Data["FieldBinderData"]);

                            contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, contextObj.drawingIds, 3, 1, 0).subscribe(function (resultData) {
                                contextObj.MultiFieldValuesforunassigned = JSON.parse(resultData.Data["FieldBinderData"]);

                                contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, contextObj.drawingIds, dataoption, 1, 0).subscribe(function (resultData) {
                                    contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                                    if (contextObj.MultiFieldValues != undefined) {
                                        if (contextObj.MultiFieldValues.length > 0)
                                            contextObj.fieldDetailsCheckBox.MultiFieldValues = contextObj.MultiFieldValues;
                                    }
                                    else {
                                        if (contextObj.dataOption == "3") {
                                            for (let i = 0; i < contextObj.MultiFieldValuesforunassigned.length; i++) {
                                                temp[i] = contextObj.MultiFieldValuesforunassigned[i]["Id"].toString();
                                            }
                                            contextObj.fieldDetailsCheckBox.MultiFieldValues = temp;
                                        }
                                        else {
                                            if (contextObj.MultiFieldValuesforunassigned != undefined && contextObj.MultiFieldValuesforassigned != undefined) {
                                                for (let i = 0; i < contextObj.MultiFieldValuesforunassigned.length; i++) {
                                                    temp[i] = contextObj.MultiFieldValuesforunassigned[i]["Id"].toString();
                                                }
                                                for (let i = 0; i < contextObj.MultiFieldValuesforassigned.length; i++) {
                                                    tempcombine[i] = contextObj.MultiFieldValuesforassigned[i]["Id"].toString();
                                                }
                                                for (let i = 0; i < contextObj.itemsSourceforalldata.length; i++) {
                                                    tempalldata[i] = contextObj.itemsSourceforalldata[i]["ObjectClassId"].toString();
                                                }
                                                contextObj.fieldDetailsCheckBox.MultiFieldValues = tempalldata;
                                                //contextObj.fieldDetailsCheckBox.MultiFieldValues = temp.concat(tempcombine);
                                                contextObj.fieldDetailsCheckBox.MultiFieldValues = contextObj.fieldDetailsCheckBox.MultiFieldValues.filter(function (item, index, inputArray) {
                                                    return inputArray.indexOf(item) == index;
                                                });
                                            }
                                        }
                                    }
                                    contextObj.secondaryTarget = 6;
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                });
                                contextObj.fieldDetailsCheckBox.FieldLabel = "";
                            });
                        });
                    }
                    else {
                        contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, contextObj.drawingIds, contextObj.dataOption, 1, 0).subscribe(function (resultData) {
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
                                //else if (dataoption == "3") {
                                //    for (let i = 0; i < contextObj.MultiFieldValuesforunassigned.length; i++) {
                                //        temp[i] = contextObj.MultiFieldValuesforunassigned[i]["Id"].toString();
                                //    }
                                //    contextObj.fieldDetailsCheckBox.MultiFieldValues = temp;
                                //}
                                //else {
                                //    if (contextObj.MultiFieldValuesforunassigned != undefined && contextObj.MultiFieldValuesforassigned != undefined) {
                                //        for (let i = 0; i < contextObj.MultiFieldValuesforunassigned.length; i++) {
                                //            temp[i] = contextObj.MultiFieldValuesforunassigned[i]["Id"].toString();
                                //        }
                                //        for (let i = 0; i < contextObj.MultiFieldValuesforassigned.length; i++) {
                                //            tempcombine[i] = contextObj.MultiFieldValuesforassigned[i]["Id"].toString();
                                //        }
                                //        contextObj.fieldDetailsCheckBox.MultiFieldValues = temp.concat(tempcombine);
                                //    }

                                //}
                            }
                            contextObj.secondaryTarget = 6;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                        contextObj.fieldDetailsCheckBox.FieldLabel = "";
                    }
                });
            });
        });
        //}
    }

    public attachmentClick() {
        this.secondaryTarget = 9;
        var contextObj = this;
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (this.inputItems.selectedIds.length == 0) {
                this.showSelectaMessage(contextObj);
            }
            else if (this.inputItems.selectedIds.length > 1) {
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
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            }
        }
    }

    public Opendrawingonclick() {
        var contextObj = this;
        var totalItems = 0;
        if (contextObj.itemSelected) {
            let drawingid = [contextObj.selectedDrawingId];
            contextObj.objectsService.getObjectDrawingListData(164, Number(contextObj.objectCategoryId)).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.Drawingsource = JSON.parse(resultData["Data"].FieldBinderData);
                    totalItems = resultData.DataCount;
                    if (contextObj.inputItems.selectedIds.length == 0)
                        contextObj.showSelectaMessage(contextObj);
                    else if (contextObj.inputItems.selectedIds.length > 1) {
                        if (contextObj.isDifferentFloor()) {
                            if (contextObj.objectCategoryId == 1) {
                                contextObj.notificationService.ShowToaster("This option is available only if the selected " + contextObj.objectCategoryName + "(s) are placed in the same drawing", 2);
                            } else {
                                contextObj.notificationService.ShowToaster("This option is available only if the selected " + contextObj.objectCategoryName + " are placed in the same drawing", 2);
                            }
                        } else {
                            contextObj.selectedDrawingId = contextObj.inputItems.rowData[0]["DrawingId"];
                            contextObj.selectDrawingCategoryId = contextObj.inputItems.rowData[0]["DrawingCategoryId"];
                            contextObj.IsBuildingDrawing = contextObj.inputItems.rowData[0]["IsBuildingDrawing"];
                            if (contextObj.Drawingsource.length == 0) {
                                contextObj.IsOpenDrawingComponentActive = true;
                                contextObj.secondaryTarget = 11;
                                contextObj.wanttoreload = false;
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            } else {
                                var tempdrid = contextObj.Drawingsource.find(function (item) { return item.DrawingId === contextObj.selectedDrawingId });
                                if (tempdrid != undefined) {
                                    contextObj.IsOpenDrawingComponentActive = true;
                                    contextObj.secondaryTarget = 11;
                                    contextObj.wanttoreload = false;
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                }
                                else
                                    contextObj.notificationService.ShowToaster("Drawing may be locked or not selected for " + contextObj.objectCategoryName + "/Space Management", 2);
                            }
                        }
                    } else if (contextObj.inputItems.rowData.Status == "Assigned") {
                        contextObj.selectedDrawingId = contextObj.inputItems.rowData.DrawingId;
                        contextObj.selectDrawingCategoryId = contextObj.inputItems.rowData.DrawingCategoryId;
                        contextObj.IsBuildingDrawing = Boolean(contextObj.inputItems.rowData.IsBuildingDrawing);
                        if (contextObj.Drawingsource.length == 0) {
                            contextObj.IsOpenDrawingComponentActive = true;
                            contextObj.secondaryTarget = 11;
                            contextObj.wanttoreload = false;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        } else {
                            var tempdrid = contextObj.Drawingsource.find(function (item) { return item.DrawingId === contextObj.selectedDrawingId });
                            if (tempdrid != undefined) {
                                contextObj.IsOpenDrawingComponentActive = true;
                                contextObj.secondaryTarget = 11;
                                contextObj.wanttoreload = false;
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            }
                            else
                                contextObj.notificationService.ShowToaster("Drawing may be locked or not selected for " + contextObj.objectCategoryName + "/Space Management", 2);
                        }
                    }
                    else if (contextObj.inputItems.selectedIds.length == 1 && contextObj.inputItems.rowData.Status == "Archived") {
                        contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " is backed up for re- linking", 2);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " is not assigned to any Floor", 2);
                    }
                }
            });
        }
    }

    isDifferentFloor() {
        var contextObj = this;
        var isCheck: boolean = false;
        for (var i = 0; contextObj.inputItems.selectedIds.length > i; i++) {
            var previousdrawingid = contextObj.inputItems.rowData[i]["DrawingId"];
            if (previousdrawingid == null)
                isCheck = true;
            if (i > 0) {
                if (previousdrawingid != contextObj.inputItems.rowData[i - 1]["DrawingId"])
                    isCheck = true;
            }
        }
        return isCheck
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
            if (this.inputItems.selectedIds.length == 0) {
                this.showSelectaMessage(contextObj);
            }
            else if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            } else if (this.inputItems.rowData.Status == "Assigned") {
                if (contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined)
                    contextObj.notificationService.ShowToaster("You do not have edit permission for the selected space", 2);
                else {
                    if (contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            //contextObj.objectsService.checkEditPrivilageExist(contextObj.inputItems.rowData["SpaceId"]).subscribe(function (result) {
                            //haseditprivilage = contextObj.usereditprivilageforspace(contextObj.inputItems.rowData["SpaceId"]);
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"] })
                            if (orgidexists == undefined)
                                contextObj.notificationService.ShowToaster("You do not have edit permission for the selected space", 2);
                            else {
                                contextObj.message = "Are you sure you want to " + delink + " the selected " + contextObj.objectCategoryName + "? ";
                                contextObj.showSlidedelink = !contextObj.showSlidedelink;
                            }
                        });
                    } else {
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
        var contextObj = this;
        let retUpdatedSrc;
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
        contextObj.objectsService.DelinkObjectSpaceData(JSON.stringify(arr), contextObj.inputItems.selectedIds[0], 0, contextObj.objectCategoryId, contextObj.dataOption, 1, '', this.drawingIds, '', 0, 0, 1, 1, contextObj.IsBuildingDrawing).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);

                    break;
                case 1:
                    if (contextObj.dataOption == "1") {
                        var datakey = contextObj.inputItems.dataKey;
                        for (let i = 0; i < contextObj.itemsSource.length; i++) {
                            if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData["Data"].Data)[0][datakey]) {
                                contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data)[0]

                                var updatedData = new Array();/*To notify the watcher about the change*/
                                updatedData = updatedData.concat(contextObj.itemsSource);
                                contextObj.itemsSource = updatedData;
                                contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " has been " + delinked, 3);
                            }
                        }
                    } else {
                        contextObj.dataLoad(contextObj.g_selectedClassIds, 1);
                        contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " has been " + delinked, 3);
                    }
                    /*contextObj.notificationService.ShowToaster("Selected Asset has been de-linked", 3);                        
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", resultData["Data"].Data, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];*/
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
        var contextObj = this;
        //contextObj.selectedDrawingId = this.inputItems.rowData.DrawingId;     
        if (this.itemSelected) {
            if (this.inputItems.selectedIds.length > 1) {
                contextObj.multipleAssign();
                // this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectaMessage(contextObj);
            }
            else {
                if (this.inputItems.selectedIds.length == 1 && this.inputItems.rowData.Status == "Assigned") {
                    this.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " is already placed", 2);
                } else if (this.inputItems.selectedIds.length > 1) {
                    //contextObj.message = "Are you sure you want to de-link the selected Asset? ";
                    //this.showSlidedelink = !this.showSlidedelink;
                }
                else if (this.inputItems.selectedIds.length == 1 && this.inputItems.rowData.Status == contextObj.unassignedTxt) {
                    //contextObj.objectsService.getUserEditableOrgUnits(contextObj.selectedDrawingId).subscribe(function (resultData) {
                    //    resultData;
                    //});
                    if (this.inputItems.rowData.SymbolId > 0) {
                        this.secondaryTarget = 10;
                        contextObj.wanttoreload = false;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        //contextObj.dataLoad('', 1);
                    }
                    else {
                        this.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " has no Symbol", 2);
                    }
                }
                else if (this.inputItems.selectedIds.length == 1 && this.inputItems.rowData.Status == "Archived") {
                    this.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " is backed up for re- linking", 2);
                }
                else {
                    this.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " is already placed", 2);
                }
            }
        }
    }
    //multipleAssign() {

    //    var contextObj = this;
    //    let isPlaced: boolean = true;
    //    contextObj.inputItems.rowData.find(function (item) {
    //        if (item.Status == "Assigned") {
    //            isPlaced = false;
    //            contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " is already placed", 2);
    //            return true;
    //        }
    //        else if (item.SymbolId == null) {
    //            isPlaced = false;
    //            contextObj.notificationService.ShowToaster("Some of the " + contextObj.objectCategoryName + " have no Symbol assigned", 2);
    //            return true;
    //        }
    //        else
    //            return false;
    //    });
    //    if (isPlaced == true) {
    //        contextObj.secondaryTarget = 10;
    //        contextObj.wanttoreload = false;
    //        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    //    }
    //}
    multipleAssign() {

        var contextObj = this;
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
            contextObj.message = "Some of the selected " + contextObj.objectCategoryName + " is already placed. Do you want to continue?";
            contextObj.showMultipleAssign = !contextObj.showMultipleAssign;

        }
        else if (isSymbol == false && isunAssigned == true) {
            contextObj.message = "Some of the selected " + contextObj.objectCategoryName + "s have no Symbol assigned. Do you want to continue?";
            contextObj.showMultipleAssign = !contextObj.showMultipleAssign;

        }
        else if (isPlaced == true) {
            contextObj.secondaryTarget = 10;
            contextObj.wanttoreload = false;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }
        else {
            if (isSymbol == false)
                this.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + "s have no Symbol assigned", 2);
            else this.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + "s are already placed", 2);
        }
    }

    submitReturn(event) {
        let retUpdatedSrc;
        this.refreshgrid = [];
        var contextObj = this;
        var addedclassid = JSON.parse(event["returnData"])[0]["ObjectClassId"].toString();
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            if (contextObj.MultiFieldValues != undefined) {
                if (contextObj.MultiFieldValues.indexOf(addedclassid) != -1)
                    this.itemsSource = retUpdatedSrc["itemSrc"];
            }
            else
                this.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            if (contextObj.MultiFieldValues != undefined) {
                if (contextObj.MultiFieldValues.indexOf(addedclassid) != -1)
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                //this.itemsSource = retUpdatedSrc["itemSrc"];
            }
            else
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            //this.itemsSource = retUpdatedSrc["itemSrc"];
        }
        //if (contextObj.MultiFieldValues != undefined) {
        //    if (contextObj.MultiFieldValues.indexOf(addedclassid) != -1)
        //        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //        //this.itemsSource = retUpdatedSrc["itemSrc"];
        //}
        //else
        //    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        //    //this.itemsSource = retUpdatedSrc["itemSrc"];
        if (this.action == "add" && this.totalItems > 0) {
            switch (this.dataOption) {
                case 1:
                    this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                    break;
                case 2:
                    this.enableMenu = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];
                    break;
                case 3:
                    this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 9, 11, 12];
                    break;
            }
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
        if (event["dispSettingObject"] != undefined) {
            if (event["dispSettingObject"].length == 0) {
                contextObj.notificationService.ShowToaster("No Class Attributes exist", 2);
            }
            else {
                if (this.dispTab == 2)
                { var SpaceDisplayFields = this.generFun.updateSpacePrefixInDisplaySettings(event["dispSettingObject"]); }
                else
                { var SpaceDisplayFields = event["dispSettingObject"]; }
                // this.fieldObjectGrid = this.generFun.updateDisplaySettingsinUI(this.fieldObjectGrid, event["dispSettingObject"]);
                this.fieldObjectGrid = this.generFun.updateDisplaySettingsinUI(this.fieldObjectGrid, SpaceDisplayFields);
                setTimeout(function () {
                    //contextObj.ngOnInit();
                    //contextObj.ngAfterViewInit();
                    //contextObj.dataLoad('', 0);
                    contextObj.splitviewInput.showSecondaryView = false;
                }, 2000);
            }
        }
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
        this.searchindex = 1;
        this.exportSearchIndex = 1;
        this.IsAdvanceSearch = 0;
        contextObj.keywordSearchdata();
        contextObj.SetEnableMenuData();
    }
    public keywordSearchdata() {
        var contextObj = this;
        var dataoptionno = contextObj.dataOption;
        contextObj.IsSearchmenuNeeded = true;
        var SortColumn = contextObj.inputItems.sortCol;
        var totalitems = contextObj.totalItems;
        var classIds: string = "";
        if (this.g_selectedClassIds && this.g_selectedClassIds != "") {
            classIds = this.g_selectedClassIds;
        }
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
            contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataoptionno, 1, classIds, this.drawingIds, '', false, 0, true, 1, 0, SortColumn, contextObj.inputItems.sortDir, contextObj.filter, false, contextObj.IsBuildingDrawing).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    contextObj.totalItems = JSON.parse(result["DataCount"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        //contextObj.totalItems = totalitems;
                        contextObj.changeEnableMenu(false);
                    }
                    else {
                        contextObj.changeEnableMenu(true);
                        contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: contextObj.moduleId });
                    }
                    contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                    //contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                    //contextObj.IsKeyWordSearch = 0;
                    //contextObj.searchindex = 0;
                }
            });
        }
    }

    Submit(event: any) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.searchindex = 2;
        this.exportSearchIndex = 2;
        this.IsAdvanceSearch = 1;
        contextObj.AdvancedSearchdata();
        contextObj.SetEnableMenuData();
    }

    public AdvancedSearchdata() {
        var contextObj = this;
        var dataoptionno = contextObj.dataOption;
        contextObj.IsSearchmenuNeeded = true;
        var SortColumn = contextObj.inputItems.sortCol;
        var totalitems = contextObj.totalItems;
        var classIds: string = "";
        if (this.g_selectedClassIds && this.g_selectedClassIds != "") {
            classIds = this.g_selectedClassIds;
        }
        //if (contextObj.inputItems.sortCol == "[Asset No.]")
        //    SortColumn= "[ObjectNo]"
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
            contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataoptionno, 1, classIds, this.drawingIds, '', false, 0, true, 1, 0, SortColumn, contextObj.inputItems.sortDir, contextObj.advanceValue, false, contextObj.IsBuildingDrawing).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    contextObj.totalItems = JSON.parse(result["DataCount"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        //contextObj.totalItems = totalitems;
                        contextObj.changeEnableMenu(false);
                    } else {
                        contextObj.changeEnableMenu(true);
                        contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: contextObj.moduleId });
                    }
                    contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                    //contextObj.emitMenu.emit({ TotalItems: contextObj.totalItems });
                    //contextObj.IsAdvanceSearch = 0;
                    //contextObj.searchindex = 0;
                }
            });
        }
    }
    Clear(event) {
        var keywordelement: any;
        keywordelement = document.getElementsByClassName("validate filter-input")
        if (keywordelement && keywordelement.length > 0)
            keywordelement[0].value = "";
        this.IsAdvanceSearch = 0;
        this.IsKeyWordSearch = 0;
        this.SetEnableMenuData();
        this.dataLoad('', 0);
    }

    private getCusSubscribedFeatures() {
        var contextObj = this;
        contextObj.AdministrationService.getCustomerSubscribedFeatures("189,72").subscribe(function (rt) {
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

    ngAfterViewChecked() {
        if ((this.secondaryTarget == 10 || this.secondaryTarget == 11) && (this.splitviewInput.showSecondaryView == false)) {
            if (this.wanttoreload == false) {
                this.dataLoad(this.g_selectedClassIds, 1);
                this.ChangePagepath.emit({ "Pagepath": 1 });
            }
        }
    }

    getSelectedTab(event: any) {

        this.dispTab = event[0];
    }

    public onSplitViewClose(event) {
        if (this.secondaryTarget == 13) {
            this.dynamicDataLoad(0);            
        }
        if (this.allObjectAction == 'displaySettings' && this.secondaryTarget == 3) {
            this.dispTab = 0;
        }
    }

    public onMultipleEditClick() {
        var contextObj = this;
        contextObj.commonService.getFieldsForMultipleEdit(contextObj.objectsService.objectDataAddEditFormId, contextObj.getReportFieldIdValuesForMultipleEdit()).subscribe(function (resultData) {
            contextObj.multipleEditFieldDetails = JSON.parse(resultData);
            contextObj.secondaryTarget = 13;
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
    closeMultipleAssign(value: any) {
        this.showMultipleAssign = value.value;
    }
    cancelMultipleAssign(event: Event) {
        this.showMultipleAssign = !this.showMultipleAssign;
    }
    okMultipleAssign(event: Event) {

        var contextObj = this;
        contextObj.secondaryTarget = 10;
        contextObj.showMultipleAssign = !contextObj.showMultipleAssign;
        contextObj.wanttoreload = false;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    showSelectaMessage(contextObj) {
        switch (contextObj.objectCategoryId) {
            case 1:
            case 3:
            case 20:
                contextObj.notificationService.ShowToaster("Select an " + contextObj.objectCategoryName, 2);
                break;
            case 2:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                contextObj.notificationService.ShowToaster("Select a " + contextObj.objectCategoryName, 2);
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
            if (this.moduleId == 9) /* Assets in Workorder*/
                this.analyticsInput.moduleId = 7;
            else
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
            this.analyticsInput.objectClassIds = this.g_selectedClassIds; //classId
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
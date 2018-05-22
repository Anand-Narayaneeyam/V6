import {Component, EventEmitter, AfterViewInit, Output, Input, OnInit, AfterViewChecked} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { ObjectsService } from '../../../Models/Objects/objects.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { AttachmentsComponent } from '../../Common/Attachments/attachments.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import {WarrantyListComponent} from '../../Objects/Data/warranty-list.component';
import { CommonService } from '../../../models/common/common.service';

@Component({
    selector: 'orphanobjectData-list',
    templateUrl: './app/Views/Objects/Data/orphanObjectData-List.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent,
        Notification, SlideComponent, AttachmentsComponent,
        searchBox, WarrantyListComponent],
    providers: [ObjectsService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ExportToExcel, CommonService],
    inputs: ["objectCategoryId", "dataOption", "drawingIds", "moduleId","orphanObjectData", "orphanObjectcount"],
})

export class OrphanObjectDataListComponent {

    @Input() isQuerybuilder: boolean = false;
    @Input() buildarray: any;
    @Input() qResult: any;
    @Input() QueryCategryId: any;
    objectCategoryId: number;
    @Input() selectedClassIds: any;
    orphanObjectData: any[]
    orphanObjectcount: number;
    attributeId: number;
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
    commonAdditionalDataFieldCategoryId: number;
    spaceAdditionalDataFieldCategoryId: number;
    selectedObjectClassDisplaySettingsId: number = 0;
    @Output() submitSuccess = new EventEmitter();
    @Output() ChangePagepath = new EventEmitter();
    @Output() onSearchInDrawing = new EventEmitter();
    @Output() orphanHandleOut = new EventEmitter();
    dataOption: any;
    attributeoption: number = 2;
    drawingIds: any;
    selectedDrawingId: number;
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
    objectCategoryName: string;
    messages: any[];
    enableMenu = [ 3,  5,  9, 13, 12];
    searchindex = 0;
    menuData = [

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
                    "id": 13,
                    "title": "Re-Link",
                    "image": "Re-Link",
                    "path": "Re-Link",
                    "subMenu": null,
                    "privilegeId": null
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
            "id": 12,
            "title": "Warranty Details",
            "image": "Warranty",
            "path": "Warranty",
            "subMenu": null,
            "privilegeId": null
        }
    ];
    modulename: any;
    attributetitle: any;
    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    public keyWordLookup: any;
    refreshgrid;
    IsBarcodeSubscribed: boolean = false;
    IsAutoNumbering: boolean = false;

    constructor(private objectsService: ObjectsService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel, private commonService: CommonService) { }
    ngOnInit() {
        var contextObj = this;
        this.enableMenu = [];
        var featureid = "";

        switch (contextObj.objectCategoryId) {
            case 1:
                featureid = "105,72";
                this.classname = "Asset Class";
                this.objectmultiplename = "Assets";
                this.modulename = "Assets";
                this.attributetitle = "Class Attributes";
                break;

            case 2:
                featureid = "107,73";
               // this.menuData[4].subMenu[2].title = "Warehouse";
                this.classname = "Furniture Class";
                this.objectmultiplename = "Furniture"
                this.modulename = "Furniture";
                this.attributetitle = "Class Attributes";
                break;

            case 3:
                featureid = "109,71";
                this.classname = "Object Class";
                this.objectmultiplename = "Objects"
                this.modulename = "Telecom";
                this.attributetitle = "Class Attributes";
                break;

            case 8:
                featureid = "113,92";
               // this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Electrical";
                this.attributetitle = "Type Attributes";
                break;

            case 9:
                featureid = "115,100";
                //this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Fire and Safety";
                this.attributetitle = "Type Attributes";
                break;

            case 10:
                featureid = "229,130";
               // this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Mechanical";
                this.attributetitle = "Type Attributes";
                break;

            case 11:
                featureid = "131,140";
              //  this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Plumbing";
                this.attributetitle = "Type Attributes";
                break;

            case 12:
                featureid = "141,150";
               // this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components"
                this.modulename = "Medical Gas";
                this.attributetitle = "Type Attributes";
                break;

            case 20:
                featureid = "151,228";
                //this.menuData[4].subMenu[0].title = "Type Selection";
                this.classname = "Equipment Type";
                this.objectmultiplename = "Equipment"
                this.modulename = "Security Assets";
                this.attributetitle = "Type Attributes";
                break;
        }

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
                        contextObj.enableMenu = [ 5, 9,13, 12];
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
    ngAfterViewInit() {
        var contextObj = this;       
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
            contextObj.dataLoad('', 1);

        });

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
            }
        });
    }
    public dataLoad(classIds: string, target?: number) {
        debugger
        var contextObj = this;
        if (this.orphanObjectcount) {
            if (this.orphanObjectcount > 0) {
                this.itemsSource = this.orphanObjectData;
                this.totalItems = this.orphanObjectcount;
                this.itemsPerPage = this.totalItems + 1;
                contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, classIds, this.drawingIds, '', true, 0, true, 1, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.filter).subscribe(function (result) {
                    console.log('objectdata', result)
                    contextObj.messages = result.ReturnMessages;
                    contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
                });
                this.changeEnableMenu(true);
            }
        }

    }
    public changeEnableMenu(haveData: boolean) {
        if (haveData) {
            switch (this.dataOption) {
                case 1:
                    this.enableMenu = [ 3,5,9,13,12];
                    break;
            }
        } else {
            this.enableMenu = [];
        }

    }
    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 3:
                //this.pageTitle = "Delete";
                this.deleteClick();
                break;
            case 9:
                this.pageTitle = "Attachments";
                this.attachmentClick();
                break;  
            case 12:
                this.pageTitle = "Warranty Details";
                this.warranty();
                break;
            case 13:
                this.relinkObject();
                break;
        }
    }
    itemSelected() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a row", 2);
            return false;
        }
        return true;
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
    public warranty() {
        this.secondaryTarget = 12;
        var contextObj = this;
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
                            contextObj.message = "Selected " + contextObj.objectCategoryName + " is used in Work Order module. Are you sure you want to delete from " + contextObj.modulename + " Module?"
                        }
                        contextObj.showSlide = !contextObj.showSlide;
                    }
                }
            });
        }
    }
    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteObjec();
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
    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
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
    relinkObject() {
        var rowdata = [];
        if (this.inputItems.selectedIds.length == 0) {
            this.showSelectaMessage(this);
        }
        else if (this.inputItems.selectedIds.length == 1)
            rowdata.push(this.inputItems.rowData)
        else if (this.inputItems.selectedIds.length > 1)
            rowdata = this.inputItems.rowData;
        this.orphanHandleOut.emit(rowdata);
    }
}



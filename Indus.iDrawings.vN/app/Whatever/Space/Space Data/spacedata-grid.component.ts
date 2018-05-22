/// <reference path="../../../models/common/common.service.ts" />
import {Component, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChange, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {SpaceService} from '../../../Models/Space/space.service'
import {SpaceAddEditComponent} from './spacedata-addedit.component'
import {AssignSpaceStd } from './assignspacestd.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {AttachmentsComponent} from '../../Common/Attachments/attachments.component';
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import {SpaceResourceListComponent} from './spaceResourceList'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import {DrawingService } from '../../../framework/models/drawings/drawing.service';
import { SchedulingService } from '../../../models/scheduling/scheduling.service';
import { CommonService } from '../../../models/common/common.service';
import { MultipleEdit, IMultipleSubmitOutput } from '../../../framework/whatever/multipleedit/multiple-edit.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import {SeatsGridComponent} from '../../Scheduling/Seat Booking/seatlist.component';
import { Analytics} from '../../common/analytics/analytics.component';
import { IAnalytics} from '../../../models/common/analytics/ianalytics';
@Component({
    selector: 'spaceDataGrid',
    templateUrl: './app/Views/Space/Space Data/spacedata-grid.component.html',
    directives: [Analytics, SubMenu, GridComponent, PagingComponent, searchBox, SplitViewComponent, SpaceAddEditComponent, AssignSpaceStd, SlideComponent, AttachmentsComponent, DisplaySettingsComponent, SpaceResourceListComponent, MultipleEdit, ConfirmationComponent, SeatsGridComponent],
    providers: [SpaceService, AdministrationService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, ExportToExcel, DrawingService, SchedulingService, CommonService],
    inputs: ['selectedDrwgIds', 'pageTarget', 'highlightRows', 'moduleId'],
    encapsulation: ViewEncapsulation.None
})

export class SpaceDataGridComponent implements AfterViewInit {
    @Input() changeEvent;
    @Input() Targetforstyle;
    @Input() UpdateData;
    @Input() qResult: any;
    @Input() buildarray: any;
    @Input() QueryCategryId: string;
    g_IsNetCustomer: boolean;

    handleField = new Array<IField>();
    gridHeight: any = "100%";
    disable = false;
    selectedDrwgIds: any[];
    pageTarget: number;
    moduleId: number=3;
    highlightRows: any[];
    arrHighlightRowIds = [];
    fieldObject: IField[];
    fieldDetailsAdd: IField[];
    displaySettingfieldObject: IField[];
    totalizeData: any[];
    selectedCount: number;
    fieldDetailsAssignSpaceStd: IField[];
    fldForAssignOnAddSeat: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "SpaceId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC", showContextMenu: true, sortCol: "Site" };
    analyticsInput: IAnalytics = { menuId: 0 };
    public totalItems: number = 0;
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    isAddEdit: boolean = false;
    isAttachment: boolean = false;
    isResource: boolean = false;
    blnIsGrid: boolean = true;
    dispSettingCategoryId = 1;
    additionalDataField = 7;
    pageTitle: string = "";
    Target: number = 0;
    action: string;
    btnName: string;
    strPopupText = "";
    multipleEditFieldDetails: any;
    DrawingId: any;
    qDrawingId: any;
    blnDispSettingClick: boolean = false;

    hiddenFields: string[];
    advancelookup: IField[];
    advancelookupDefault: IField[];
    KeywordFieldObject: any;
    loadSearch: any;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    enableMenu = [];
    menuData = [];
    position = "center";
    showSlide = false;
    slidewidth = 250;
    isSmartSearch: boolean = false;
    sessionUserRoleId: number = 0;
    showbtndeassign: boolean = false;
    height: string = "calc(100% - 50px)";
    //gridResize = false;

    @Output() showZoomOnClick = new EventEmitter();
    @Output() showInDrawingOnClick = new EventEmitter();
    @Output() editedSpaceDataInDrawing = new EventEmitter();
    @Output() setAttachmentCount = new EventEmitter();
    @Output() getSelectedSpaceGridID = new EventEmitter();
    @Output() onSearchInDrawing = new EventEmitter();
    @Output() onMultipleEditUpdateData = new EventEmitter();
    totalRowData: number;
    userRoleId: any;
    public keyWordLookup: any;
    refreshgrid;
    exportDataSource: any;
    showSlideExport: boolean = false;
    currentModuleId: number = 3;
    Stylename = "";
    isSeatBookingFeture: boolean = false;
    hyperLinkText: string = "";
    totalizfocuseread: any;
    multipledata;
    showAnalytics: boolean = false;
    enableAminity: boolean = false;


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (changes["highlightRows"] && changes["highlightRows"]["currentValue"]) {

            if (this.highlightRows.length > 0) {
                this.rearrangeItemSource(this.highlightRows.slice(), function (retcode) {
                    contextObj.arrHighlightRowIds = [];
                    setTimeout(function () {
                        contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(contextObj.highlightRows);
                    }, 100);
                });
            }
            else
                contextObj.arrHighlightRowIds = [];
        }
        if (changes["UpdateData"] && changes["UpdateData"]["currentValue"]) {
            if (this.UpdateData.length > 0 && this.UpdateData[0]['isEdit'] != undefined) {
                if (this.UpdateData[0]['isEdit']) {
                    if (this.UpdateData[0]['fromAttchment']) {
                        this.action = 'attachment';
                    } else {
                        this.action = 'edit';
                    }
                    this.submitReturn(this.UpdateData[0]['event'])
                } else {
                    this.asignDeassignReturn(this.UpdateData[0]['event']);
                }
            }
        }
    }
    rearrangeItemSource = function (selectedRows, resCallback) {
        var itemSourcedata = this.itemsSource.slice();
        var selectedSpaceIds = selectedRows;
        var selectedRowDatas: any[] = [];
        for (var i = 0; i < selectedSpaceIds.length; i++) {
            var index = itemSourcedata.findIndex(function (el) { return el.SpaceId == selectedSpaceIds[i] });
            if (index != -1) {
                selectedRowDatas.push(itemSourcedata[index]);
                itemSourcedata.splice(index, 1);
            }
        }
        var data = selectedRowDatas.concat(itemSourcedata);
        this.itemsSource = data;
        resCallback(0);
    }
    constructor(private dwgServices: DrawingService, private spaceService: SpaceService, private AdministrationService: AdministrationService, private SchedulingService: SchedulingService, private notificationService: NotificationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel, private commonService: CommonService) {
        var contextObj = this;

        contextObj.dwgServices.getCustomerSettings().subscribe
            (resultData => {
                for (let i = 0; i < resultData["Data"].length; i++) {
                    switch (resultData["Data"][i]["Id"]) {
                        case 31:
                            contextObj.g_IsNetCustomer = resultData["Data"][i]["FeatureLookupId"] == "1" ? false : true;
                            break;
                    }
                }
            });

        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            contextObj.userRoleId = retData["UserRoleId"];
        });
        contextObj.spaceService.checkSubscribedFeature('187').subscribe(function (result) {
            contextObj.isSeatBookingFeture = result["Data"][0]["IsSubscribed"];
        });
        contextObj.SchedulingService.checkSubscribedFeature('282').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.enableAminity = result["Data"][0]["IsSubscribed"];
            }
        });


    }


    ngAfterViewInit() {
        var contextObj = this;

        if (this.moduleId == 14) {
            this.dispSettingCategoryId = 29;
            this.additionalDataField = 7;
            this.currentModuleId = 14;
        }
        if (this.moduleId == 12) {
            this.dispSettingCategoryId = 2;
            this.additionalDataField = 7;
            this.currentModuleId = 12;
        }
        switch (contextObj.pageTarget) {
            case 1:
            case 5:
                contextObj.menuData = [{
                    "id": 2,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "submenu": null,
                    "privilegeId": 413
                },
                    {
                        "id": 3,
                        "title": "Assign Space Standard",
                        "image": "Assign Space Standard",
                        "path": "Assign Space Standard",
                        "submenu": null,
                        "privilegeId": 413
                    },
                    //{
                    //    "id": 12,
                    //    "title": "Seats",
                    //    "image": "Seats",
                    //    "path": "Seats",
                    //    "submenu": null

                    //},

                    {
                        "id": 4,
                        "title": "Totalize",
                        "image": "Totalize",
                        "path": "Totalize",
                        "submenu": null,
                        "privilegeId": 423
                    },
                    {
                        "id": 6,
                        "title": "Attachments",
                        "image": "Attachments",
                        "path": "Attachments",
                        "subMenu": null,
                        "privilegeId": 424
                    },
                    {
                        "id": 5,
                        "title": "Display Settings",
                        "image": "DisplaySettings",
                        "path": "DisplaySettings",
                        "subMenu": null,
                        "privilegeId": 425
                    },
                    //{
                    //    "id": 7,
                    //    "title": "Resources",
                    //    "image": "Resources",

                    //    "subMenu": null,
                    //    "privilegeId": 1528
                    //},
                    {
                        "id": 8,
                        "title": "Show Drawing",
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null,
                        "privilegeId": 512
                    },
                    {
                        "id": 9,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null,
                        "privilegeId": 513
                    },
                    {
                        "id": 10,
                        "title": "Export",
                        "image": "Export",
                        "path": "Export",
                        "subMenu": null,
                        "privilegeId": 424
                    }
                ];
                break;
            case 2:
                contextObj.menuData = [

                    {
                        "id": 8,
                        "title": "Show Drawing",
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null,
                        "privilegeId": 512
                    },
                    {
                        "id": 9,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null,
                        "privilegeId": 513
                    },
                    {
                        "id": 10,
                        "title": "Export",
                        "image": "Export",
                        "path": "Export",
                        "subMenu": null,
                        "privilegeId": 424
                    }
                ];
                break;
            case 3: contextObj.isSmartSearch = true;
                contextObj.height = "100%";
                contextObj.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
                contextObj.position = 'top-right'
                contextObj.menuData = [{
                    "id": 2,
                    "title": "Edit",
                    "image": "Edit",
                    "path": "Edit",
                    "submenu": null,
                    "privilegeId": 413
                },
                    {
                        "id": 8,
                        "title": "Show Drawing",
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null,
                        "privilegeId": 512
                    },
                    {
                        "id": 9,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null,
                        "privilegeId": 513
                    },
                    {
                        "id": 11,
                        "title": "More",
                        "image": "More",
                        "path": "More",
                        "subMenu": [
                            {
                                "id": 4,
                                "title": "Totalize",
                                "image": "Totalize",
                                "path": "Totalize",
                                "submenu": null,
                                "privilegeId": 423
                            },
                            {
                                "id": 3,
                                "title": "Assign Space Standard",
                                "image": "Assign Space Standard",
                                "path": "Assign Space Standard",
                                "submenu": null,
                                "privilegeId": 413
                            },
                            {
                                "id": 5,
                                "title": "Display Settings",
                                "image": "DisplaySettings",
                                "path": "DisplaySettings",
                                "subMenu": null,
                                "privilegeId": 424
                            },
                            {
                                "id": 6,
                                "title": "Attachments",
                                "image": "Attachments",
                                "path": "Attachments",
                                "subMenu": null,
                                "privilegeId": 424
                            },
                            //{
                            //    "id": 7,
                            //    "title": "Resources",
                            //    "image": "Resources",

                            //    "subMenu": null,
                            //    "privilegeId": 1528
                            //},
                            {
                                "id": 10,
                                "title": "Export",
                                "image": "Export",
                                "path": "Export",
                                "subMenu": null,
                                "privilegeId": 424
                            }
                        ]
                    }
                ];
                break;
        }

        /*Assignspacestd menu filtering based on Emp /Sched module subscription*/


        contextObj.AdministrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var enableEmpandSched = [];
            enableEmpandSched = resultData["Data"].filter(function (item) {
                return (item.ModuleId == 5 || item.ModuleId == 14);
            });

            if (((enableEmpandSched.length == 0 || contextObj.moduleId == 12) && (contextObj.pageTarget == 1 || contextObj.pageTarget == 5))) {
                contextObj.menuData = contextObj.menuData.filter(function (ite) { return ite.id != 3 });
            }

            if (contextObj.pageTarget == 3 && (enableEmpandSched.length == 0 || contextObj.moduleId == 12)) {
                var itemArry = [];
                contextObj.menuData.find(function (ite) {
                    if (ite.id == 11) {
                        itemArry = ite["subMenu"].filter(function (item) {
                            return item.id != 3;
                        });
                        ite.subMenu = itemArry;
                        return true;
                    } else return false;
                });
            }

            var callBack = function (data) {
                contextObj.menuData = data;
            };
            contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 116, contextObj.AdministrationService, contextObj.menuData.length);

        });
        contextObj.spaceService.getSpaceGridField(contextObj.moduleId).subscribe(function (result) {
            //if (contextObj.generFun.checkForUnhandledErrors(result)) {
            if (contextObj.pageTarget == 2 || contextObj.pageTarget == 3) {

                let rptField = [1772, 488, 523];

                let count = rptField.length;
                result["Data"].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) >= 0) {
                        item.IsVisible = false;
                        count--;
                        if (count == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                });
            }
            let rptField = [];
            let count = 0;
            if (contextObj.moduleId == 14 || contextObj.moduleId == 3) {
                let rptField = [6729, 6731];
               
            }
            else if (contextObj.moduleId == 12) {
                rptField = [1629, 817, 6730];
                count = rptField.length;
            }
            //result["Data"].find(function (item) {
            //    if (rptField.indexOf(item.ReportFieldId) != -1) {
            //        if (item.ReportFieldId == 817 || item.ReportFieldId == 6730) { //80002
            //            item.IsVisible = false;
            //        } else {
            //            item.IsVisible = true;
            //        }
            //        count--;
            //    } if (count == 0) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //});
            contextObj.fieldObject = result["Data"]
            // }
        });

        contextObj.dataLoad(1, contextObj, 1);



        contextObj.getSessionUserData(contextObj);
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
                    contextObj.gridHeight = window.innerHeight - 250;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
            case 3:
            case 4:
                contextObj.Stylename = "search-containerInlinefromgrid";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 240;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
            default:
                contextObj.Stylename = "search-container";
        }
        if (this.pageTarget != 5) {
            setTimeout(function () {
               
                contextObj.spaceService.getSpaceKeywordField(contextObj.currentModuleId, contextObj.selectedDrwgIds).subscribe(function (resultData) {
                   
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                    }
                });
                contextObj.spaceService.getSpaceGridDataKeyWordLookUp(contextObj.currentModuleId, contextObj.selectedDrwgIds).subscribe(function (resultData) {
                  
                    contextObj.keyWordLookup = resultData["FieldBinderList"];
                });
            }, 3000);
        }
    }
    private getSessionUserData(contextObj) {
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];

        });


    }
    advanceSearch() {
       
        var contextObj = this;
        if (contextObj.advancelookup == undefined)
            this.spaceService.getAdvnceSearchLookup(this.currentModuleId, this.selectedDrwgIds).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    if (contextObj.pageTarget == 3 || contextObj.pageTarget == 5 || contextObj.pageTarget == 2) {
                        if (contextObj.pageTarget == 2) {
                            let rptField = [786, 787, 782];
                            let count = rptField.length;
                            var fldData = resultData["Data"]["FieldBinderList"].filter(function (item) {
                                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                        } else {
                            debugger 
                            let rptField = [1772, 488, 523];
                            if (contextObj.currentModuleId != 12) {
                                rptField.push(1629);
                            }
                            let count = rptField.length;
                           
                            var fldData = resultData["Data"]["FieldBinderList"].filter(function (item) {
                                return rptField.indexOf(item.ReportFieldId) == -1;
                                 
                            });
                            if (contextObj.moduleId == 12) {//to remove space std and seating capacity from drawing grid advance search
                                var remArr = [817, 6730, 6729, 6731];
                                fldData = fldData.filter(function (el) { return remArr.indexOf(el.ReportFieldId) == -1; });
                               
                            }
                        }

                        //if (contextObj.currentModuleId == 3) {
                        //    fldData = fldData.filter(function (item) {
                        //        return (item.ReportFieldId != 1629);
                        //    });
                        //}
                        console.log(fldData, "dsfs");
                        contextObj.advancelookup = fldData;
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    }
                    else {
                        if (contextObj.currentModuleId == 14 || contextObj.currentModuleId==3) {
                            resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el['ReportFieldId'] !== 1629; });
                            var index = resultData["Data"]["FieldBinderList"].findIndex(function (el) { return el['FieldId'] == 2295 });
                            resultData["Data"]["FieldBinderList"][index]['IsVisible'] = true;
                            var index1 = resultData["Data"]["FieldBinderList"].findIndex(function (el) { return el['FieldId'] == 2297 });
                            if (contextObj.isSeatBookingFeture == true)
                                resultData["Data"]["FieldBinderList"][index1]['IsVisible'] = true;
                        }
                        //else if (contextObj.currentModuleId ==3) {
                        //    resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el['ReportFieldId'] !== 1629; });
                        //    var index = resultData["Data"]["FieldBinderList"].findIndex(function (el) { return el['FieldId'] == 2295 });
                        //    resultData["Data"]["FieldBinderList"][index]['IsVisible'] = true;
                        
                        //}
                        else if (contextObj.currentModuleId == 12) {
                            var index = resultData["Data"]["FieldBinderList"].findIndex(function (el) { return el['ReportFieldId'] == 1629 });
                            resultData["Data"]["FieldBinderList"][index]['IsVisible'] = true;
                            var removearray = [6729, 6730, 6731,817];
                           
                            resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el,i)
                            {                       
                                return (removearray.indexOf(el.ReportFieldId) == -1);
                            });
                            //resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el.ReportFieldId != 6731 });
                        }
                        if (contextObj.isSeatBookingFeture == false) {
                            resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el['ReportFieldId'] !== 6731; });
                        }
                        //if (contextObj.currentModuleId == 3) {
                        //    resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el.ReportFieldId != 1629 });
                        //    resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el.ReportFieldId != 6731 });
                        //}
                        contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    }
                }
            });
    }

    public pageChanged(event: any) {
        
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    public onSort(objGrid: any) {
        
        var contextObj = this;
        this.dataLoad(0, contextObj);
    }
    public dataLoad(target?: number, context?: any, onLoad?: any, id?: any) {
        
        if (context.selectedDrwgIds && this.selectedDrwgIds[0] != "0") {
            context.spaceService.getSpaceGridData(this.currentModuleId, this.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, id).subscribe(function (result) {
                if (context.generFun.checkForUnhandledErrors(result)) {
                    context.totalItems = result["Data"].DataCount;
                    if (context.totalItems > 0) {
                        context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                        if (target == 1) {
                            context.itemsPerPage = result["Data"].RowsPerPage;
                            context.totalRowData = context.totalItems;
                        }

                        if (context.IsKeyWordSearch == 1 && context.IsAdvanceSearch == 0 && context.filter != "")
                            context.onSearchInDrawing.emit({ searchType: 1, searchItems: context.itemsSource, moduleId: 3 });
                        else if (context.IsKeyWordSearch == 0 && context.IsAdvanceSearch == 1 && context.totalRowData != context.totalItems)
                            context.onSearchInDrawing.emit({ searchType: 2, searchItems: context.itemsSource, moduleId: 3 });

                    } else {
                        if (onLoad == 1) {
                            context.disable = true;
                        }
                        context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                        if (context.currentModuleId == 14) {
                            context.notificationService.ShowToaster("No Scheduling data exists", 2);
                        }
                        else {
                            context.notificationService.ShowToaster("No Space data exists", 2);
                        }

                    }
                }
            });
        }
        else if (context.qResult) {


            if (onLoad == 1) {
                context.itemsSource = JSON.parse(context.qResult.FieldBinderData);
                context.itemsPerPage = context.qResult.RowsPerPage;
                context.totalRowData = context.qResult.DataCount;
                context.totalItems = context.qResult.DataCount;
            }
            else {
                context.commonService.QueryBuilderSeachResult(516, context.buildarray, context.QueryCategryId, 0, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol).subscribe(function (result) {
                    
                    // context.spaceService.getSpaceGridData(this.currentModuleId, this.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, id).subscribe(function (result) {

                    context.totalItems = result.DataCount;
                    if (context.totalItems > 0) {
                        context.itemsSource = JSON.parse(result.FieldBinderData);
                        if (target == 1) {
                            context.itemsPerPage = result.RowsPerPage;
                            context.totalRowData = context.totalItems;
                        }

                        if (context.IsKeyWordSearch == 1 && context.IsAdvanceSearch == 0 && context.filter != "")
                            context.onSearchInDrawing.emit({ searchType: 1, searchItems: context.itemsSource, moduleId: 3 });
                        else if (context.IsKeyWordSearch == 0 && context.IsAdvanceSearch == 1 && context.totalRowData != context.totalItems)
                            context.onSearchInDrawing.emit({ searchType: 2, searchItems: context.itemsSource, moduleId: 3 });

                    } else {
                        if (onLoad == 1) {
                            context.disable = true;
                        }
                        context.itemsSource = JSON.parse(result.FieldBinderData);
                        if (context.currentModuleId == 14) {
                            context.notificationService.ShowToaster("No Scheduling data exists", 2);
                        }
                        else {
                            context.notificationService.ShowToaster("No Space data exists", 2);
                        }

                    }

                });
            }
        }
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.Target = 1;
                this.isAttachment = false;
                this.addClick();
                break;
            case 2:
                contextObj.Target = 2;
                this.isAttachment = false;
                var title;
                if (contextObj.currentModuleId == 14) {
                    title = "Edit Scheduling Data";
                }
                else {
                    title = "Edit Space Data";
                }
                contextObj.pageTitle = title;
                this.editClick();
                break;
            case 3:
                contextObj.Target = 3;
                this.isAttachment = false;
                contextObj.pageTitle = "Assign Space Standard";
                this.assignSpaceStdClick();
                break;
            case 4:
                contextObj.Target = 4;
                this.isAttachment = false;
                this.totalizeClick();
                break;
            case 5:
                contextObj.Target = 5;
                contextObj.pageTitle = "Display Settings";
                this.displaySettingsClick();
                break
            case 6:
                contextObj.Target = 6;
                contextObj.pageTitle = "Attachments";
                this.attachmentClick();
                break;
            case 7:
                contextObj.Target = 7;
                contextObj.pageTitle = "";
                this.spaceResource();
                this.isAttachment = false;
                break;
            case 8: contextObj.checkDrawingIds(1);
                break;
            case 9: contextObj.checkDrawingIds(2);
                break;
            case 10:
                contextObj.Target = 10;//export
                contextObj.Export();
                break;
            case 12:
                contextObj.Target = 11;//export
                contextObj.hotellingSeats();
                break;

        }
    }

    checkDrawingIds(target) {
        var contextObj = this;
        var spaceIdsInput: string = "";
        var drawingId: number;
        if (contextObj.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else {
            if (contextObj.pageTarget == 2) {
                if (target == 1)
                    contextObj.showInDrawingOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds });
                else
                    contextObj.showZoomOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds });
            } else {
                this.spaceService.checkSpaceForDrawing(this.inputItems.selectedIds).subscribe(function (result) {
                    drawingId = JSON.parse(result["Data"].FieldBinderData)[0].DrawingId;
                    if (drawingId > 0) {
                        if (target == 1)
                            contextObj.showInDrawingOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "drawingId": drawingId });
                        else
                            contextObj.showZoomOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "drawingId": drawingId });
                    }
                    else
                        contextObj.notificationService.ShowToaster("The selected records are of different floors", 2);
                });
            }
        }
    }
    public addClick() {
        this.action = "add";
        this.btnName = "Add";
        var contextObj = this;
        this.spaceService.loadSpaceAddEdit(this.inputItems.selectedIds[0], 1).subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                this.fieldDetailsAdd = result["Data"];
            }
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    public editClick() {
        this.action = "edit";
        var isShareSpace = true;
        var assignementtype = "";
        var roomnumber = "";
        var isShare = false;
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else if (this.inputItems.selectedIds.length > 1) {
            //bug 76283
            if (this.sessionUserRoleId == 7)
                this.notificationService.ShowToaster('This operation can be performed only one row at a time', 3);
            else
                this.onMultipleEditClick();
        } else {

            var ret = this.chkSelectedSpaceKey(this.inputItems.selectedIds[0], 1);
            if (this.selectedDrwgIds[0].toString() == "0") {
                this.selectedDrwgIds[0] = this.inputItems.rowData.DrawingId;
            }
            if (ret) {
                contextObj.spaceService.checkEditPrivilageExist(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData.ServerId > 0) {
                        contextObj.spaceService.loadSpaceAddEdit(contextObj.inputItems.selectedIds[0], 2).subscribe(function (result) {
                            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                                contextObj.fieldDetailsAdd = contextObj.setDisableField(result["Data"], contextObj);
                                contextObj.AdministrationService.getCustomerSubscribedFeatures("156").subscribe(function (rt) {
                                    if (contextObj.generFun.checkForUnhandledErrors(rt)) {
                                        if (rt["Data"][0].IsSubscribed == true && contextObj.userRoleId != 7) {

                                            var count = 0;
                                            contextObj.fieldDetailsAdd.find(function (item) {
                                                switch (item.ReportFieldId) {

                                                    case 6729:
                                                        assignementtype = item.FieldValue;
                                                        count++
                                                        break;
                                                    case 793:
                                                        roomnumber = item.FieldValue;
                                                        count++
                                                        break;
                                                }
                                                if (count == 2)
                                                    return true;
                                            });

                                            contextObj.fieldDetailsAdd.filter(function (item) {
                                                if (item.ReportFieldId === 783 && item.FieldValue != "4") {
                                                    isShareSpace = false;
                                                    return true;
                                                }
                                                if (item.FieldLabel == "IsShared") {
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
                                            contextObj.fieldDetailsAdd.filter(function (item) {
                                                if (item.ReportFieldId == 793) {
                                                    if ((assignementtype != "" && assignementtype != "2")) {

                                                        item.IsMandatory = true;

                                                    }
                                                    else {
                                                        item.IsMandatory = false;

                                                    }

                                                }
                                                if (item.FieldId == 737 && isShareSpace == true) {
                                                    item.LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                                                    if (isShare == true) {
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
                                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    }
                                });
                            }
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 2);
                });
            }
        }

    }

    public attachmentClick() {
        var contextObj = this;
        this.isAttachment = false;
        this.splitviewInput.showSecondaryView = false;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            this.isAttachment = false;
            this.splitviewInput.showSecondaryView = false;

        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Space", 2);
        } else {
            var ret = this.chkSelectedSpaceKey(this.inputItems.selectedIds[0], 2);
            if (ret) {
                this.splitviewInput.showSecondaryView = true;
                this.isAttachment = true;
                this.Target = 6;
            } else
                this.splitviewInput.showSecondaryView = false;
        }

    }

    public spaceResource() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Space", 2);
        } else {
            var ret = this.chkSelectedSpaceKey(this.inputItems.selectedIds[0], 3);
            if (ret) {
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            }
        }
    }

    private chkSelectedSpaceKey(selectedId, target) {
        var selectObj = this.itemsSource.find(function (item) {
            return item.SpaceId === selectedId;
        })
        if ((selectObj["Space Key"] == "8000") || (selectObj["Space Key"] == "9000")) {
            var type = selectObj["Space Key"] == "8000" ? "External Wall" : "Floor Gross";
            var msg = "";
            switch (target) {
                case 1:
                    msg = type + " cannot be edited";
                    break;
                case 2:
                    msg = "Attachment cannot be linked to " + type;
                    break;
                case 3:
                    msg = "Resources cannot be linked to " + type;
                    break;
            }
            this.notificationService.ShowToaster(msg, 2);
            return false;
        }
        else
            return true;

    }

    private setDisableField(data, context) {
        let retSpaceKey = data.find(function (item) {
            return item.ReportFieldId === 782;
        });

        if (retSpaceKey.FieldValue == "8000" || retSpaceKey.FieldValue == "9000") {
            let fieldObjLen = data.length;
            for (let i = 0; i < fieldObjLen; i++) {
                let rptFieldId = data[i].ReportFieldId;
                if (rptFieldId != 793) {
                    data[i].IsEnabled = false;
                    data[i].ReadOnlyMode = true;
                }
            }
        }
        else {
            let retItem = data.find(function (item) {
                return item.ReportFieldId === 783;
            });

            if (retItem.LookupDetails && retItem.LookupDetails.LookupValues.length > 0) {
                retItem.LookupDetails.LookupValues = retItem.LookupDetails.LookupValues.filter(function (el) {
                    return el["Id"] < 6;
                });
            }
            /*division admin ---7*/
            if (retItem.FieldValue != "4") {
                let fieldObjLen = data.length;
                for (let i = 0; i < fieldObjLen; i++) {
                    let rptFieldId = data[i].ReportFieldId;
                    if ((rptFieldId >= 290 && rptFieldId <= 298) || (rptFieldId == 779)) {
                        data[i].IsEnabled = false;
                        data[i].ReadOnlyMode = true;
                    }
                }
            } else {
                if (context.sessionUserRoleId == 7) {
                    let fieldObjLen = data.length;
                    for (let i = 0; i < fieldObjLen; i++) {
                        let rptFieldId = data[i].ReportFieldId;
                        if ((rptFieldId == 290) || (rptFieldId == 779)) {
                            data[i].IsEnabled = false;
                            data[i].ReadOnlyMode = true;
                        }
                    }

                }
            }
        }
        return data;

    }
    public submitReturn(event) {

        if (event.shareSubmit != true) {
            this.refreshgrid = [];
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
            } else {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            //this.refreshgrid = this.refreshgrid.concat([true]);
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            if (this.action != "attachment") {
                this.splitviewInput.showSecondaryView = false;
                this.editedSpaceDataInDrawing.emit(event);
            } 

               
            
        }
        else {
            var context = this;
            var sltdId;
            if (event.id[0] == undefined)
                sltdId = event.id;
            else
                sltdId = event.id[0];
            let retUpdatedSrc;
            context.refreshgrid = [];
            context.spaceService.getSpaceGridData(this.currentModuleId, this.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, false, sltdId).subscribe(function (result) {
                var jsonVariable = {};
                jsonVariable["returnData"] = result["Data"]["FieldBinderData"];
                retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "edit", jsonVariable, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                context.refreshgrid = context.refreshgrid.concat([true]);
            });
        }
    }
    public assignSpaceStdClick() {

        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else if (this.inputItems.selectedIds.length > 1) {
            this.multipleassignStandard();
        } else {
            this.multipledata = undefined;
            this.DrawingId = this.inputItems.rowData.DrawingId;
            let selectedItem = this.itemsSource.find(function (item) {
                return item["SpaceId"] === contextObj.inputItems.selectedIds[0]
            });
            if (selectedItem["Space Key"] == "8000") {
                this.notificationService.ShowToaster("Space Standard cannot be assigned to External Wall", 2);
            } else if (selectedItem["Space Key"] == "9000") {
                this.notificationService.ShowToaster("Space Standard cannot be assigned to Floor Gross", 2);
            } else {
                contextObj.spaceService.checkEditPrivilageExist(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData.ServerId > 0) {
                        contextObj.spaceService.loadAssignDeAssignSpacesStd(contextObj.inputItems.selectedIds[0]).subscribe(function (result) {
                            // if (contextObj.generFun.checkForUnhandledErrors(result)) {
                            //result["Data"].find(function (item) {
                            //    if (item.ReportFieldId == 793) {
                            //        item.IsEnabled =false; 
                            //        return true;
                            //    }
                            //    else
                            //        return false;
                            
                            var arrfld = [793, 6729, 6730, 791, 6731];
                            var cnt = arrfld.length;
                            var spaceAsignmentTypeVal = "";

                            result["Data"].find(function (item) {
                                switch (item.ReportFieldId) {
                                    case 793:  /*roomno*/
                                        item.IsEnabled = false;
                                        cnt--;
                                        break;
                                    case 791:  /*space function*/
                                        item.IsEnabled = false;
                                        cnt--;
                                        break;
                                    case 6729: /*Spaceassignmenttype*/

                                        spaceAsignmentTypeVal = item.FieldValue;
                                        if (item.FieldValue == "4") {
                                            contextObj.SchedulingService.getAmenitiesData(0, "", "", '').subscribe(function (resultData) {
                                                if (resultData["Data"].DataCount > 0 && contextObj.enableAminity == true) {
                                                    item.LookupDetails.PopupComponent = { Name: "Amenities", showImage: false };
                                                    contextObj.hyperLinkText = "Amenities";
                                                }

                                            });
                                        }
                                        //if (item.FieldValue == "1" && contextObj.isSeatBookingFeture) {
                                        //    /*seat booking feature*/                                            
                                        //            item.LookupDetails.PopupComponentName = "Seats";
                                        //            contextObj.hyperLinkText = "Seats";
                                        //}                                                                                                                                        
                                        cnt--;
                                        break;
                                    case 6730:/*Seating Capacity*/

                                        if (spaceAsignmentTypeVal == "5") {
                                            item.FieldLabel = "Hoteling Seating Capactiy"

                                        }
                                        else {
                                            item.FieldLabel = "Room Seating Capacity"
                                        }
                                        if (spaceAsignmentTypeVal == "")
                                            contextObj.showbtndeassign = false;
                                        else {
                                            contextObj.showbtndeassign = true;
                                            if (spaceAsignmentTypeVal == "1" || spaceAsignmentTypeVal == "4" || spaceAsignmentTypeVal == "5" || spaceAsignmentTypeVal == "6") {
                                                item.IsMandatory = true;
                                                item.FieldValue = item.FieldValue == null ? "1" : item.FieldValue;
                                            }
                                            else {
                                                item.IsMandatory = false;
                                                item.IsEnabled = false;
                                            }
                                            if ((spaceAsignmentTypeVal == "1" || spaceAsignmentTypeVal == "5" || spaceAsignmentTypeVal == "6") && contextObj.isSeatBookingFeture) {
                                                /*seat booking feature*/
                                                item.LookupDetails.PopupComponent = { Name: "Seats", showImage: false };
                                                contextObj.hyperLinkText = "Seats";
                                            }
                                        }
                                        cnt--;
                                        break;
                                    case 6731:
                                        if (contextObj.isSeatBookingFeture && (spaceAsignmentTypeVal == "1"))
                                            item.IsVisible = true;

                                        else if (contextObj.isSeatBookingFeture && (spaceAsignmentTypeVal == "2")) {
                                            item.FieldValue = "0";
                                            item.IsVisible = false;
                                        }
                                        else {
                                            item.IsVisible = false;
                                        }
                                        cnt--;
                                        break;
                                    default:
                                        break;
                                }

                                if (cnt == 0)
                                    return true;
                                else
                                    return false;

                            })
                            contextObj.fieldDetailsAssignSpaceStd = result["Data"];
                            contextObj.Target = 3;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            // }
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 2);
                });
            }
        }
    }
    onSecondaryClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }
    multipleassignStandard() {
        var contextObj = this;
        var reportFieldIdArray: ReportFieldArray[] = [];
        var assignedcount = 0;
        for (var i = 0; i < this.inputItems.rowData.length; i++) {
            if (this.inputItems.rowData[i].SeatingAssignmentTypeId != null)
                assignedcount++;
            this.DrawingId = this.inputItems.rowData[i].DrawingId;
            let selectedItem = this.itemsSource.find(function (item) {
                return item["SpaceId"] === contextObj.inputItems.selectedIds[i]
            });
            if (selectedItem["Space Key"] == "8000") {
                this.notificationService.ShowToaster("Space Standard cannot be assigned to Floor Gross or External Wall", 2);
                return
            } else if (selectedItem["Space Key"] == "9000") {
                this.notificationService.ShowToaster("Space Standard cannot be assigned to Floor Gross or External Wall", 2);
                return
            }
            else {
                reportFieldIdArray.push({ ReportFieldId: 780, Value: contextObj.inputItems.selectedIds[i] });
            }
        }
        if (assignedcount == this.inputItems.selectedIds.length)
            this.showbtndeassign = true;
        else
            this.showbtndeassign = false;
        if (reportFieldIdArray.length == this.inputItems.selectedIds.length) {
            contextObj.spaceService.checkEditPrivilegeExistsForMultipleSpace(JSON.stringify(reportFieldIdArray)).subscribe(function (hasEditPrivilege) {
                if (hasEditPrivilege.ServerId == 1) {
                    contextObj.spaceService.loadMultipleAssignStd().subscribe(function (resultFields) {
                        console.log('assign fields', resultFields)
                        var array = [793, 791, 6730];
                        var cnt = array.length;
                        resultFields["Data"].find(function (item) {
                            switch (item.ReportFieldId) {
                                case 793:
                                    item.IsVisible = false;
                                    cnt--;
                                    break;
                                case 791:
                                    item.IsVisible = false;
                                    cnt--;
                                    break;
                                //case 6730:
                                //    item.IsVisible = true;
                                //    cnt--;
                                //    break;
                            }
                            if (cnt == 0)
                                return true;
                            else
                                return false;
                        })
                        contextObj.fieldDetailsAssignSpaceStd = resultFields["Data"];
                        contextObj.multipledata = contextObj.inputItems.rowData;
                        // contextObj.inputItems.selectedIds = [];
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    })
                } else {
                    contextObj.notificationService.ShowToaster("You do not have edit permission in one of the selected space(s)", 2);
                    return
                }
            });
        }

    }
    public asignDeassignReturn(event) {
        this.refreshgrid = [];
        var retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        //this.itemsSource = retUpdatedSrc["itemSrc"];
        this.refreshgrid = this.refreshgrid.concat([true]);
        if (event["target"] != 2) {
            this.splitviewInput.showSecondaryView = false;
        }
        if (this.pageTarget == 2 || this.pageTarget == 3)
            this.editedSpaceDataInDrawing.emit(event);
    }

    public totalizeClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else {
            contextObj.selectedCount = this.inputItems.selectedIds.length;
            this.spaceService.getTotalizeSpace(this.inputItems.selectedIds).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    contextObj.totalizeData = JSON.parse(result.FieldBinderData)[0].Column1;
                    contextObj.totalizfocuseread = contextObj.totalizeData;
                    contextObj.totalizfocuseread = contextObj.totalizfocuseread.replace(/<(?:.|\n)*?>/gm, '');
                    contextObj.showSlide = true;
                }
            });
        }
    }



    public displaySettingsClick() {
        var contextObj = this;
        contextObj.hiddenFields = ["Id"];
        contextObj.blnDispSettingClick = true;
        contextObj.isAddEdit = false;
        contextObj.splitviewInput.showSecondaryView = true;
    }

    public getUpdatedDisplaySettings(event) {
        var contextObj = this;
        this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, event["dispSettingObject"]);

        // setTimeout(function () {
        contextObj.splitviewInput.showSecondaryView = false;
        // }, 8000);
    }

    onQueryBuilderSearchClick(event) {
        var context = this;
        if (event) {
            context.qResult = event;
            context.itemsSource = JSON.parse(context.qResult.Data.FieldBinderData);
            context.itemsPerPage = context.qResult.Data.RowsPerPage;
            context.totalRowData = context.qResult.totalItems;
        }
    }

    closeSlideDialog(value: any, index) {
        if (index == 1)
            this.showSlide = value.value;
        else {

            this.showSlideExport = value.value;


        }
    }

    closeTotalize(event) {

        this.showSlide = false;
    }


    SaveAs(event: any) {

    }
    Delete(event: any) {

    }
    onloadSearch(event: any) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        this.pageIndex = 0;
        this.dataLoad(0, contextObj);
    }
    Clear(event: any) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
    }
    Submit(event: any) {
        this.filter = "";
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        var contextObj = this;
        this.pageIndex = 0;
        this.dataLoad(0, contextObj);
    }

    /* attachmentSuccess(event: any) {
         
         var context = this;
         var selId = context.inputItems.selectedIds[0];
         var selObj = context.itemsSource.find(function (item) {
             return item["SpaceId"] === selId;
         })
 
         switch (event["status"]) {
             case "success":
                 if (selObj["Attachments"] == "None")
                     selObj["Attachments"] = "0";
                 selObj["Attachments"] = (Number(selObj["Attachments"]) + 1).toString();
                 break;
             case "delete":
                 selObj["Attachments"] = (Number(selObj["Attachments"]) - 1).toString();
                 if (selObj["Attachments"] == "0")
                     selObj["Attachments"] = "None";
                 break;
         } 
 
       
     } */

    attachmentSuccess(event: any) {
    
        var context = this;
        context.refreshgrid = [];
        var selId = context.inputItems.selectedIds[0];
        var selObj = context.itemsSource.find(function (item) {
            return item["SpaceId"] === selId;
        })

        switch (event["status"]) {
            case "success":
                var attNum = selObj["Attachments"] == "None" ? 0 : selObj["Attachments"];
                selObj["Attachments"] = (Number(attNum) + 1).toString();
                break;
            case "delete":
                var  attNo = (Number(selObj["Attachments"]) - 1).toString();
                selObj["Attachments"] = attNo == "0" ? "None" : attNo;
                break;
        }
        //var updatedData = new Array();/*To notify the watcher about the change*/
        //updatedData = updatedData.concat(context.itemsSource);
        //context.itemsSource = updatedData;
        context.refreshgrid = context.refreshgrid.concat([true]);
        if (this.pageTarget != 1) {
            var attachmentCount = context.itemsSource.find(function (item) { return item["SpaceId"] === selId; })["Attachments"];
            this.setAttachmentCount.emit({ 'spaceId': selId, 'Attachments': attachmentCount });
        }

        setTimeout(function () {
            context.arrHighlightRowIds = [];
            context.arrHighlightRowIds = context.arrHighlightRowIds.concat([selId])
        }, 1);
    }
    //Export Grid
    okExportClick(event: any) {
        var context = this;
        context.handleField.push({ /*fieldobject for spacehandle*/
            FormFieldId: 1,
            FieldId: 0,
            ReportFieldId: 0,
            FieldLabel: context.g_IsNetCustomer == true ? "CarpetHandle" : "BomaHandle",
            DataEntryControlId: 11,
            GenericDataTypeId: 6,
            Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[a-zA-Z0-9!@#$%&*()+=\\s\\:.,/?[\\]_-]+$" },
            FieldValue: "",
            IsMandatory: false,
            IsVisible: true,
            IsEnabled: true,
            isContentHtml: "",
            Precision: 0,
            Scale: 0,
            Height: 0,
            IsSigned: false,
            RangeFrom: "",
            RangeTo: "",
            HelpText: "",
            IsGrouped: false,
            HasChild: false,
            ParentId: 0,
            IsSubField: false,
        });
        var filterFieldObjects = context.fieldObject.slice();//copy of field object
        filterFieldObjects.push(context.handleField[0])
        var fileName;
        switch (context.currentModuleId) {
            case 14:
                fileName = "SchedulingData";
                break;
            case 12:
                fileName = "CAIData";
                break;
            default:
                fileName = "SpaceData";
                break;
        }

        // debugger
        if (context.inputItems.selectedIds.length > 1) {
            context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
            context.exportObject.ExportData(context.exportDataSource, filterFieldObjects, fileName, function (retCode) {
                if (retCode == 0) {
                    var msg = "";
                    switch (context.currentModuleId) {
                        case 14:
                            msg = "Scheduling data exported";
                            break;
                        case 12:
                            msg = "CAI Data exported ";
                            break;
                        default:
                            msg = "Space data exported";
                            break;
                    }

                    context.notificationService.ShowToaster(msg, 3);

                }
                else {
                    if (context.currentModuleId == 14) {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                    else {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                    //context.notificationService.ShowToaster("Space data cannot be exported", 3);
                }
            });
        }
        else {            // Bug 81803 - When exporting the Search result grid, the export details for the resultant data.
            var input = {};
            var target = 4;
            if (context.qResult) {
                input = context.commonService.QueryBuilderSeachResultExport(516, context.buildarray, 5, 0, filterFieldObjects, fileName, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol);
                target = 6;
            } else {
                input = context.spaceService.getSpaceGridDataExport(context.currentModuleId, filterFieldObjects, fileName, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, true);//.subscribe(function (result) {
            }
            context.exportObject.ExportDataFromServer(input, target, fileName, function (retCode) {
                if (retCode == 0) {
                    var msg = "";
                    switch (context.currentModuleId) {
                        case 14:
                            msg = "Scheduling data exported";
                            break;
                        case 12:
                            msg = "CAI Data exported ";
                            break;
                        default:
                            msg = "Space data exported";
                            break;
                    }

                    context.notificationService.ShowToaster(msg, 3);

                }
                else {
                    if (context.currentModuleId == 14) {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                    else {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                }
                // });
            });
        }

        context.showSlideExport = false;
    }
    cancelExportClick(value: any) {
        var context = this;
        context.showSlideExport = value.value;
        var fileName;
        if (context.currentModuleId == 14) {
            fileName = "SchedulingData";
        }
        else {
            fileName = "SpaceData";
        }
        var fileName;
        switch (context.currentModuleId) {
            case 14:
                fileName = "SchedulingData";
                break;
            case 12:
                fileName = "CAIData";
                break;
            default:
                fileName = "SpaceData";
                break;
        }

        // debugger
        if (context.inputItems.selectedIds.length > 1) {
            context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
            context.exportObject.ExportData(context.exportDataSource, context.fieldObject, fileName, function (retCode) {
                if (retCode == 0) {
                    var msg = "";
                    switch (context.currentModuleId) {
                        case 14:
                            msg = "Scheduling data exported";
                            break;
                        case 12:
                            msg = "CAI Data exported ";
                            break;
                        default:
                            msg = "Space data exported";
                            break;
                    }

                    context.notificationService.ShowToaster(msg, 3);

                }
                else {
                    if (context.currentModuleId == 14) {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                    else {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                    //context.notificationService.ShowToaster("Space data cannot be exported", 3);
                }
            });
        }
        else {            // Bug 81803 - When exporting the Search result grid, the export details for the resultant data.
            var input = {};
            var target = 4;
            if (context.qResult) {
                input = context.commonService.QueryBuilderSeachResultExport(516, context.buildarray, 5, 0, context.fieldObject, fileName, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol);
                target = 6;
            } else {
                input = context.spaceService.getSpaceGridDataExport(context.currentModuleId, context.fieldObject, fileName, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, true);//.subscribe(function (result) {
            }
            context.exportObject.ExportDataFromServer(input, target, fileName, function (retCode) {
                if (retCode == 0) {
                    if (context.currentModuleId == 14) {
                        context.notificationService.ShowToaster("Scheduling data exported", 3);
                    }
                    else {
                        context.notificationService.ShowToaster("Space data exported", 3);
                    }
                }

                // });

            });
        }
    }
    Export() {
        this.showSlideExport = true;
    }

    public onSplitViewClose(event) {
        if (this.Target == 8) { /*Multiple Edit*/
            this.dataLoad(0, this);
        }
        this.Target = -1;
        this.action = '';
        this.splitviewInput.showSecondaryView = false;
    }

    public onMultipleEditClick() {
        var contextObj = this;
        var editable = true;
        var reportFieldIdArray: ReportFieldArray[] = [];
        for (var item of contextObj.inputItems.selectedIds) {
            reportFieldIdArray.push({ ReportFieldId: 780, Value: item });
        }
        for (var i = 0; i < contextObj.inputItems.selectedIds.length; i++) {
            var selectObj = this.itemsSource.find(function (item) {
                return item.SpaceId === contextObj.inputItems.selectedIds[i];
            })
            if ((selectObj["Space Key"] == "8000") || (selectObj["Space Key"] == "9000")) {
                editable = false;
            }
        }
        if (editable) {
            contextObj.spaceService.checkEditPrivilegeExistsForMultipleSpace(JSON.stringify(reportFieldIdArray)).subscribe(function (hasEditPrivilege) {
                if (hasEditPrivilege.ServerId == 1) {
                    contextObj.commonService.getFieldsForMultipleEdit(contextObj.spaceService.spaceAddEditFrmId).subscribe(function (resultData) {
                        if (contextObj.sessionUserRoleId == 7) {
                            var orgArray = [290, 292, 294, 296, 298]
                            contextObj.multipleEditFieldDetails = JSON.parse(resultData).filter(function (item) { return orgArray.indexOf(item.ReportFieldId) == -1 })
                        } else {
                            if (contextObj.currentModuleId != 12) {
                                /*removing CAI Space Driver field */
                                contextObj.multipleEditFieldDetails = JSON.parse(resultData).filter(function (item) { return item.ReportFieldId != 1629 })
                            } else {
                                contextObj.multipleEditFieldDetails = JSON.parse(resultData);
                            }
                        }
                        contextObj.Target = 8;
                        contextObj.pageTitle = "Multiple Update";
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                } else {
                    contextObj.notificationService.ShowToaster("You do not have edit permission in one of the selected space(s)", 2);
                }
            });
        }
        else
            contextObj.notificationService.ShowToaster("Floor Gross or External Wall cannot be edited", 2)


    }

    public onMultipleEditUpdate(event: IMultipleSubmitOutput) {
        for (var item of this.inputItems.selectedIds) {
            event.ReportFieldIdValuesArray.push({ ReportFieldId: 780, Value: item });
        }
        event.ReportFieldIdValuesArray.push({ ReportFieldId: 271, Value: this.moduleId })
        var contextObj = this;
        contextObj.spaceService.updateMultipleSpaceData(JSON.stringify(event.ReportFieldIdValuesArray), event.ReportFieldId, event.NewValue, event.ParentUnitId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.onMultipleEditUpdateData.emit({ data: JSON.parse(resultData["Data"]["Data"]) })
                    contextObj.notificationService.ShowToaster("Space details updated", 2);
                    break;
                default:
                    break;

            }
        });

    }
    private hotellingSeats() {
        var contextObj = this;

        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {

            let selectedItem = this.itemsSource.find(function (item) {
                return item["SpaceId"] === contextObj.inputItems.selectedIds[0]
            });
            if (selectedItem["Space Key"] == "8000") {
                this.notificationService.ShowToaster("Seat cannot be assigned to External Wall", 2);
            } else if (selectedItem["Space Key"] == "9000") {
                this.notificationService.ShowToaster("Seat cannot be assigned to Floor Gross", 2);
            } else {
                contextObj.spaceService.checkEditPrivilageExist(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData.ServerId > 0) {
                        contextObj.spaceService.loadAssignDeAssignSpacesStd(contextObj.inputItems.selectedIds[0]).subscribe(function (result) {
                            var cnt = 3;  /*spaceassignment ,seatingCapacity*/
                            var spaceAssignment = "";
                            var seatingCapacity = 0;
                            var romNo = "";
                            contextObj.fldForAssignOnAddSeat = result["Data"];
                            result["Data"].find(function (item) {
                                switch (item.ReportFieldId) {
                                    case 793:
                                        romNo = item.FieldValue;
                                        break;
                                    case 6729:
                                        spaceAssignment = item.FieldValue;
                                        cnt--;
                                        break;
                                    case 6730:
                                        seatingCapacity = Number(item.FieldValue);
                                        cnt--;
                                        break;
                                }

                                if (cnt == 0)
                                    return true;
                                else
                                    return false;
                            })
                            if (spaceAssignment != "1") {
                                contextObj.notificationService.ShowToaster("Seats can be added  for assignable space", 2);
                            } else if (romNo == "") {
                                contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Hoteling Seat(s)", 2);
                            } else if (seatingCapacity <= 0 || isNaN(seatingCapacity) == true) {
                                contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than zero", 2);
                            } else {
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            }
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 2);
                });
            }
        }
    }

    private seatSuccessout(event) {
        //var context = this;
        //var rptFldArray;
        //if (event["action"] == "UpdateSeat") {
        //    this.fieldDetails.find(function (el) {
        //        if (el.FieldId == 2020) {
        //            el.FieldValue = event["hotellingSeatCount"];
        //            return true;
        //        } else
        //            return false;
        //    });
        //}
        //rptFldArray = context.generFun.getFieldValuesAsReportFieldArray(context.fieldDetails)
        //context.assign(2, context, rptFldArray);

    }
    onContextMenuOnClick(event: any) {
        var tempID: any = "";
        if (event != undefined && event != null) {
            if (this.qResult != undefined) {
                var rowCount = this.inputItems.selectedIds.length;
                this.analyticsInput.selectedRowCount = rowCount;
                this.analyticsInput.menuId = event['menuId'];
                this.analyticsInput.fieldObject = this.fieldObject;
                this.analyticsInput.selectedIds = tempID;
                this.analyticsInput.moduleId = 3;
                this.analyticsInput.pageTarget = 2;
                this.analyticsInput.IsAdvanceSearch = 0;
                this.analyticsInput.IsKeywordSearch = 0
                this.analyticsInput.KeywordFilterValue = "";
                this.analyticsInput.AdvanceFilterValue = "[]";
                this.analyticsInput.FormId = 516;
                this.analyticsInput.ParentFormId = 0;
                this.analyticsInput.QueryCategryId = Number(this.QueryCategryId);
                this.analyticsInput.buildarray = this.buildarray;
                this.showAnalytics = true;
            }
            else {
                var rowCount = this.inputItems.selectedIds.length;
                this.analyticsInput.selectedRowCount = rowCount;
                this.analyticsInput.menuId = event['menuId'];
                this.analyticsInput.fieldObject = this.fieldObject;
                this.analyticsInput.selectedIds = this.selectedDrwgIds;
                this.analyticsInput.moduleId = 3;
                this.analyticsInput.pageTarget = 1;
                this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
                this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch
                this.analyticsInput.KeywordFilterValue = this.filter;
                this.analyticsInput.AdvanceFilterValue = this.advanceValue;
                this.analyticsInput.FormId = 103;
                this.analyticsInput.ParentFormId = 116;
                this.showAnalytics = true;
            }
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

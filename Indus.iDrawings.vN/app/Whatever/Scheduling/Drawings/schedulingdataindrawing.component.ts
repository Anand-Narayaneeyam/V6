import {Component, ChangeDetectorRef, Output, AfterViewInit, Input, SimpleChange, OnChanges, OnInit, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import {IField} from '../../../Framework/Models/Interface/Ifield'
import {GeneralFunctions} from '../../../models/common/general';
import {TabsComponent} from '../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../Framework/Whatever/Tab/tab.component'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {AdministrationService} from '../../../models/administration/administration.service'
import {ExportToExcel} from '../../../Framework/Models/Export/exporttoexcel.service';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { CommonService } from '../../../models/common/common.service';
import {SpaceService} from '../../../models/space/space.service'
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { searchBox } from '../../../Framework/Whatever/Search/search.component';
import { Searchforschedule } from '../seat booking/customsearchforscheduling.component';
@Component({
    selector: 'sheduling-workspace-data',
    templateUrl: './app/Views/Scheduling/Drawings/schedulingdataindrawing.html',
    directives: [Searchforschedule, SplitViewComponent, searchBox,
        PageComponent, SubMenu, DisplaySettingsComponent, TabsComponent, TabComponent, Notification, GridComponent],
    providers: [NotificationService, GeneralFunctions, AdministrationService, ExportToExcel, CommonService, SchedulingService, SpaceService],
    encapsulation: ViewEncapsulation.None
})

export class schedulingdataindrawing implements OnInit, OnChanges, AfterViewInit {
    @Input() DrawingId: number;
    @Input() Target: any;
    @Input() UpdateData;
    userRoleId: number = 0;
    isModuleAdmin: boolean = false;
    splitViewTitle: string;
    selectedTab: number = 0;
    isAutoClose: boolean = false;
    fieldObject: IField[];
    teamRoomSearchFieldObject: IField[];
    workSpaceSearchFieldObject: IField[];
    specialRoomSearchFieldObject: IField[];
    public totalItems: number = 0;
    itemsSource: any[];
    public itemsPerPage: number = 0;
    pageIndex: number = 0;
    cdr: any;
    moduleId: number;
    menuData = [];
    enableMenu: any[];
    inputItems: IGrid = { dataKey: "SpaceId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC", sortCol: "", isautosizecolms: false };
    @Output() showZoomOnClick = new EventEmitter();
    @Output() onSchedulingTabChangedClick = new EventEmitter();
    @Output() showInDrawingOnClick = new EventEmitter();
    //splitviewAssignedHoteling = { showSecondaryView: false, showButton: false, secondaryArea: 30 }
    //splitviewTeamRooms: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 }

    isSeatBookingEnabled = undefined;
    isRoomBookingEnabled = undefined;
    Stylename = "search-containerInline";
    disable: boolean = false;
    public workSpaceKeyWordLookup: any;
    public teamRoomKeyWordLookup: any;
    public specialRoomKeyWordLookup: any;
    advancelookup: IField[];
    workSpaceAdvancelookupDefault: IField[];
    teamRoomAdvancelookupDefault: IField[];
    specialRoomAdvancelookupDefault: IField[];
    KeywordFieldObject: any;
    filter = "";
    advanceValue = "[]";
    IsKeyWordSearch = 0;
    IsAdvanceSearch = 0;
    isSmartSearch: boolean = true;
    gridHeight: any = "100%";
    @Output() onSearchInDrawing = new EventEmitter();
    @Output() onSearchInDrawingClear = new EventEmitter();
    @Output() onSearchClick = new EventEmitter();
    workSpaceSearchFormId = 411;
    teamRoomSearchFormId = 412;
    specialRoomSearchFormId = 438;
    workspaceTotalItems: number = 0;
    teamRoomTotalItems: number = 0;
    specialRoomTotalItems: number = 0;
    isSpecialUseRoom = undefined;
    formHeight: any;
    searchdate: any;
    showSearchFilter;
    isWorkspaceSearch: boolean = false;
    isTeamRoomSearch: boolean = false;
    isSpecialRoomSearch: boolean = false;
    seattxt = "Workspace";
    searchSeatTitle = "Search Workspace";
    roomtext = "Team Room";
    searchRoomTitle = "Search Team Room";
    drawingLabel = "Drawing";
    IsProxyReservationEnabled: boolean = false;
    constructor(private spaceService: SpaceService, private AdministrationService: AdministrationService, private schedulingService: SchedulingService, cdr: ChangeDetectorRef, private notificationService: NotificationService, private generFun: GeneralFunctions, private administrationService: AdministrationService, private commonService: CommonService) {
        //  debugger
        this.formHeight = window.innerHeight - 250;
        this.formHeight = this.formHeight + "px";
        var contextObj = this;
        this.cdr = cdr;
        var contextObj = this;
        contextObj.spaceService.getSpaceGridField(14).subscribe(function (result) {
         // debugger
          let rptField = [6729, 6731];
          let rptFieldhide = [1772, 488, 523];
          let count = +(rptField.length + rptFieldhide.length);
                result["Data"].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) != -1) {
                        item.IsVisible = true;
                        count--;
                    } if (rptFieldhide.indexOf(item.ReportFieldId) != -1) {
                        item.IsVisible = false;
                        count--;
                    }

                if (count == 0) {
                    return true;
                } else {
                    return false;
                }
            });

            contextObj.fieldObject = contextObj.arrangeFields(result["Data"]);
        });
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            contextObj.userRoleId = retData["UserRoleId"];
            contextObj.schedulingService.GetUserRolebasedSettingsRowData(contextObj.userRoleId).subscribe(function (result) {
                if (result.Data.DataCount == 1) {
                    contextObj.IsProxyReservationEnabled = JSON.parse(result.Data.FieldBinderData)[0]["Is Proxy Reservation Enabled?"];
                }
                if (contextObj.IsProxyReservationEnabled == true || contextObj.userRoleId == 3 || contextObj.userRoleId == 1)//81854 related checks
                    contextObj.isSpecialUseRoom = true;
                else { contextObj.isSpecialUseRoom = false; }
            });
        });
    }
    ngOnInit() {

        var contextObj = this;
        contextObj.spaceService.checkSubscribedFeature('186,187').subscribe(resultData => {
            var jsonobject = resultData["Data"];
            if (jsonobject) {
                for (let i = 0; i < jsonobject.length; i++) {
                    switch (resultData["Data"][i]["Id"]) {
                        case 186:
                            contextObj.isRoomBookingEnabled = jsonobject[i]["IsSubscribed"];
                            break;
                        case 187: contextObj.isSeatBookingEnabled = jsonobject[i]["IsSubscribed"];
                            break;
                    }
                }
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            contextObj.dataLoad(1);
        });
        this.checkSubscribedFeatures();
    }
    checkSubscribedFeatures() {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('274').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.seattxt = result["Data"][0].Value;
                contextObj.searchSeatTitle = "Search " + contextObj.seattxt;
            }
        });
        contextObj.schedulingService.checkSubscribedFeature('275').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.roomtext = result["Data"][0].Value;
                contextObj.searchRoomTitle = "Search " + contextObj.roomtext;
            }
        });
    }
    checkSubscribedFeaturesDrawingLabel() {
        var contextObj = this;
        contextObj.schedulingService.checkSubscribedFeature('276').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.drawingLabel = result["Data"][0].Value;
                contextObj.menuData = [
                    {
                        "id": 1,
                        "title": "Show in " + contextObj.drawingLabel,
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null,
                        "privilegeId": 512
                    },
                    {
                        "id": 2,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null,
                        "privilegeId": 513
                    }
                ];
            }
        });
    }
    getKeywordLookups(selectedTarget: number) {
        var contextObj = this;
        if (this.workSpaceKeyWordLookup == undefined && selectedTarget == 1) {
            contextObj.schedulingService.getWorkSpaceDataKeyWordLookUp(contextObj.DrawingId).subscribe(function (resultData) {
                contextObj.workSpaceKeyWordLookup = resultData["FieldBinderList"];
            });
        }
        if (this.teamRoomKeyWordLookup == undefined && selectedTarget == 2) {
            contextObj.schedulingService.getteamRommDataKeyWordLookUp(contextObj.DrawingId).subscribe(function (resultData) {
                contextObj.teamRoomKeyWordLookup = resultData["FieldBinderList"];
            });
        }
        if (this.specialRoomKeyWordLookup == undefined && selectedTarget == 3) {
            contextObj.schedulingService.getspecialRoomDataKeyWordLookUp(contextObj.DrawingId).subscribe(function (resultData) {
                contextObj.specialRoomKeyWordLookup = resultData["FieldBinderList"];
            });
        }
    }
    checkDrawingIds(target) {
        //   debugger
        var contextObj = this;
        var spaceIdsInput: string = "";
        var drawingId: number;
        if (contextObj.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else {

            if (target == 1)
                contextObj.showInDrawingOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });
            else
                contextObj.showZoomOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });

        }
    }
    public pageChanged(event: any) {
        var contextObj = this;
    };
    public onSort(objGrid: any) {
        var contextObj = this;
        contextObj.dataLoad(2);
    }
    onSubMenuChange(event: any) {

        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.checkDrawingIds(event.value);
                break;
            case 2:
                contextObj.checkDrawingIds(event.value);
                break;

        }

    }
    public arrangeFields(fieldsdata) {

        var contextObj = this;
        var fields = [];

        var count = -1
        var splicecount = -1;
        var rowData = "";
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 793) {
                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }


        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 791) {
                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }

        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 290) {
                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }


        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 291) {
                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }

        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 292) {

                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }


        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 293) {

                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }



        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 294) {

                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }


        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 295) {
                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }


        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 296) {
                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }


        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 297) {

                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }

        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 298) {

                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }

        count = -1;
        splicecount = -1;
        rowData = fieldsdata.find(function (el) {
            if (el.ReportFieldId == 299) {

                splicecount = count;
                return el
            }
            count++;
        });
        if (rowData) {
            fields.push(rowData);
            fieldsdata.splice(splicecount + 1, 1);
        }

        count = -1;
        splicecount = -1;

        fieldsdata.filter(function (el) {

            fields.push(el);
        });
        return fields;
    }
    public dataLoad(target: number) {

        debugger
        var contextObj = this;
        var gridListTarget: number;
        if (this.selectedTab == 0) {
            if (this.isSeatBookingEnabled) {
                this.isWorkspaceSearch = true;
                gridListTarget = 1;
            } else if (this.isRoomBookingEnabled) {
                this.isTeamRoomSearch = true;
                gridListTarget = 2;
            } else {
                this.isSpecialRoomSearch = true;
                gridListTarget = 3;
            }
        } else if (this.selectedTab == 1) {
            if (this.isSeatBookingEnabled && this.isRoomBookingEnabled) {
                this.isTeamRoomSearch = true;
                gridListTarget = 2;
            } else {
                this.isSpecialRoomSearch = true;
                gridListTarget = 3;
            }
        } else if (this.selectedTab == 2) {
            this.isSpecialRoomSearch = true;
            gridListTarget = 3;
        }
        contextObj.schedulingService.getAllWorkSpaceDetails(14, contextObj.DrawingId, gridListTarget, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch).subscribe(function (result) {
            contextObj.itemsSource = JSON.parse(result.FieldBinderData);
            contextObj.totalItems = contextObj.itemsSource.length;
            contextObj.disable = false;
            if (contextObj.itemsSource.length == 0) {
                contextObj.enableMenu = [];
                if (target == 1) {
                    contextObj.disable = true;
                }
                if (gridListTarget == 1)
                { contextObj.notificationService.ShowToaster("No " + contextObj.seattxt + "s exist", 2); }
                if (gridListTarget == 2)
                    contextObj.notificationService.ShowToaster("No " + contextObj.roomtext + "s exist", 2);
                if (gridListTarget == 3)
                    contextObj.notificationService.ShowToaster("No Special Use Rooms exist", 2);
                //if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter != "") {
                contextObj.onSearchInDrawingClear.emit({ "filter": 1 });
                //  }
            } else {
                contextObj.enableMenu = [1, 2];
                if (target == 1) {
                    if (gridListTarget == 1) {
                        contextObj.workspaceTotalItems = contextObj.totalItems;
                        contextObj.onSearchInDrawingClear.emit({ "filter": 0 });
                    }
                    if (gridListTarget == 2) {
                        contextObj.teamRoomTotalItems = contextObj.totalItems;
                        contextObj.onSearchInDrawingClear.emit({ "filter": 0 });
                    }
                    if (gridListTarget == 3)
                        contextObj.specialRoomTotalItems = contextObj.totalItems;
                } else {
                    if (gridListTarget == 1) {
                        if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: 14 });
                        else if (contextObj.IsKeyWordSearch == 0 && contextObj.IsAdvanceSearch == 1) {
                            contextObj.onSearchClick.emit({ searchdate: contextObj.searchdate });
                            // if (contextObj.workspaceTotalItems != contextObj.totalItems)
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: 14, searchdate: contextObj.searchdate });
                        }
                    } else if (gridListTarget == 2) {
                        if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: 14 });
                        else if (contextObj.IsKeyWordSearch == 0 && contextObj.IsAdvanceSearch == 1) {
                            contextObj.onSearchClick.emit({ searchdate: contextObj.searchdate });
                            //if (contextObj.teamRoomTotalItems != contextObj.totalItems)
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: 14, searchdate: contextObj.searchdate });
                        }
                    } else if (gridListTarget == 3) {
                        if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: 14 });
                        else if (contextObj.IsKeyWordSearch == 0 && contextObj.IsAdvanceSearch == 1) // contextObj.specialRoomTotalItems != contextObj.totalItems
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: 14 });
                    }
                    if (contextObj.IsKeyWordSearch == 1 && contextObj.IsAdvanceSearch == 0 && contextObj.filter == "") {
                        contextObj.onSearchInDrawingClear.emit({ "filter": 1 });
                    }
                }
                contextObj.getKeywordLookups(gridListTarget);
            }


        });

    }
    ngAfterViewInit() {
         debugger
        var drawingid = this.DrawingId;
        var contextObj = this;
        contextObj.checkSubscribedFeaturesDrawingLabel();
        contextObj.menuData = [
            {
                "id": 1,
                "title": "Show in " + contextObj.drawingLabel,
                "image": "Show Drawing",
                "path": "Show Drawing",
                "submenu": null,
                "privilegeId": 512
            },
            {
                "id": 2,
                "title": "Show Zoomed",
                "image": "Show Zoomed",
                "path": "Show Zoomed",
                "submenu": null,
                "privilegeId": 513
            }
        ];
        if (contextObj.Target == 3 || contextObj.Target == 4) {
            contextObj.Stylename = "search-containerInlinefromgrid";
            if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                contextObj.gridHeight = window.innerHeight - 240;
                contextObj.gridHeight = contextObj.gridHeight + "px";
            }
        }
    }
    getSelectedTab(event: any) {
        // debugger
        var contextObj = this;
        contextObj.selectedTab = event[0];
        contextObj.showSearchFilter = [];
        contextObj.ClearSearchValues("");
        contextObj.isWorkspaceSearch = false;
        contextObj.isTeamRoomSearch = false;
        contextObj.isSpecialRoomSearch = false;
        if (event[0] == 0 && event[1] == false) {
            contextObj.onSchedulingTabChangedClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });;
        }
        else if (event[0] == 1 && event[1] == true) {
            contextObj.onSchedulingTabChangedClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });
            contextObj.dataLoad(1);
        }
        else if (event[0] == 2 && event[1] == true) {
            contextObj.onSchedulingTabChangedClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedTab": contextObj.selectedTab });
            contextObj.dataLoad(1);
        }
        if (event[0] == 0)
            contextObj.dataLoad(1);
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["UpdateData"] && changes["UpdateData"]["currentValue"]) {

            if (this.UpdateData[0]['action'] == "0" || this.UpdateData[0]['action'] == "1" || this.UpdateData[0]['action'] == "2") {
                //this.selectedTab = this.UpdateData[0]['action'];
                this.dataLoad(1);
            }
        }
    }
    keywordSearchSubmit(event: any) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        this.dataLoad(2);
    }
    Clear(event: any, target) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        if (target == 1)
            contextObj.workSpaceSearchFieldObject = JSON.parse(JSON.stringify(contextObj.workSpaceAdvancelookupDefault));
        else if (target == 2)
            contextObj.teamRoomSearchFieldObject = JSON.parse(JSON.stringify(contextObj.teamRoomAdvancelookupDefault));
        else if (target == 3)
            contextObj.specialRoomSearchFieldObject = JSON.parse(JSON.stringify(contextObj.specialRoomAdvancelookupDefault));
        this.dataLoad(1);
    }
    ClearSearchValues(event: any) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
    }
    advanceSearchSubmit(event: any) {
        //comment due to partial check in
        var filterObj = JSON.parse(event.fieldobject);
        var isLoadSearch: boolean = false;
        this.showSearchFilter = [];
        var dateValue = filterObj.find(function (el) { return el['ReportFieldId'] == 6714 })['Value'];

        var rbtnIndex = filterObj.findIndex(function (el) { return el['ReportFieldId'] == 6716 });
        if (dateValue != "" && rbtnIndex != -1) {
            var checkBetween = dateValue.indexOf('ÿ');
            if (checkBetween > -1) {
                var dateArray = dateValue.split('ô');
                var fromDate = dateArray[1];
                var toDate = dateArray[3];
                if (fromDate.indexOf("PM") > 0)
                    fromDate = fromDate.replace("PM", ":00 PM")
                else if (fromDate.indexOf("AM") > 0)
                    fromDate = fromDate.replace("AM", ":00 AM")
                if (toDate.indexOf("PM") > 0)
                    toDate = toDate.replace("PM", ":00 PM")
                else if (toDate.indexOf("AM") > 0)
                    toDate = toDate.replace("AM", ":00 AM")
                this.searchdate = fromDate + "ô" + toDate;
                if (new Date(fromDate) >= new Date(toDate)) {
                    this.showSearchFilter = this.showSearchFilter.concat(true);
                    this.notificationService.ShowToaster("To Time should be greater than From Time", 2);
                    this.isAutoClose = false;
                }
                else
                    isLoadSearch = true;
            }
            else
                isLoadSearch = true;
        } else {
            this.isAutoClose = false;
            this.showSearchFilter = this.showSearchFilter.concat(true);
            this.notificationService.ShowToaster("Select Date and Status", 2);
            filterObj.splice(filterObj.findIndex(function (el) { return el['ReportFieldId'] == 6714 }), 1);
            if (rbtnIndex != -1)
                filterObj.splice(rbtnIndex, 1);
        }

        this.filter = "";
        this.advanceValue = JSON.stringify(filterObj);
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        if (isLoadSearch) {
            this.isAutoClose = true;
            this.dataLoad(2);
        }
    }
    teamRoomAdvanceSearch() {
        if (this.isAutoClose)
            this.isAutoClose = false;
        var contextObj = this;
        if (contextObj.teamRoomSearchFieldObject == undefined) {
            contextObj.schedulingService.getAdvanceSearchFields(contextObj.teamRoomSearchFormId, contextObj.DrawingId).subscribe(function (result) {
                let rptField = [6716];
                result["Data"]['FieldBinderList'].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) != -1) {
                        item.DataEntryControlId = 20;
                        item.FieldValue = "0";
                    }
                });
                contextObj.teamRoomSearchFieldObject = result["Data"]['FieldBinderList'];
                contextObj.teamRoomAdvancelookupDefault = JSON.parse(JSON.stringify(contextObj.teamRoomSearchFieldObject));
            });
        }
    }
    workSpaceAdvanceSearch() {
        if (this.isAutoClose)
            this.isAutoClose = false;
        var contextObj = this;
        if (contextObj.workSpaceSearchFieldObject == undefined) {
            contextObj.schedulingService.getAdvanceSearchFields(contextObj.workSpaceSearchFormId, contextObj.DrawingId).subscribe(function (result) {
                let rptField = [6716];
                result["Data"]['FieldBinderList'].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) != -1) {
                        item.DataEntryControlId = 20;
                        item.FieldValue = "0";

                    }
                });
                contextObj.workSpaceSearchFieldObject = result["Data"]['FieldBinderList'];
                contextObj.workSpaceAdvancelookupDefault = JSON.parse(JSON.stringify(contextObj.workSpaceSearchFieldObject));
            });
        }
    }
    specialRommAdvanceSearch() {
        if (this.isAutoClose)
            this.isAutoClose = false;
        var contextObj = this;
        if (contextObj.specialRoomSearchFieldObject == undefined) {
            contextObj.schedulingService.getAdvanceSearchFields(contextObj.specialRoomSearchFormId, contextObj.DrawingId).subscribe(function (result) {
                let rptField = [6716];
                result["Data"]['FieldBinderList'].find(function (item) {
                    if (rptField.indexOf(item.ReportFieldId) != -1) {
                        item.DataEntryControlId = 20;
                        item.FieldValue = "0";

                    }
                });
                contextObj.specialRoomSearchFieldObject = result["Data"]['FieldBinderList'];
                contextObj.specialRoomAdvancelookupDefault = JSON.parse(JSON.stringify(contextObj.specialRoomSearchFieldObject));
            });
        }

    }
    getKeywordAndAdvSearchLookups() {

    }
}
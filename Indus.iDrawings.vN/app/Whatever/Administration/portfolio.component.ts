import {Component, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {SiteListComponent} from './Site/site-list.component';
import {BuildingListComponent} from './Building/building-list.component';
import {FloorListComponent} from './Floor/floor-list.component';
import {TabsComponent} from '../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../Framework/Whatever/Tab/tab.component'
import { SplitViewComponent } from '../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../Framework/Models/Interface/ISplit-view'
import {SiteAddEditComponent} from './Site/site-addedit.component'
import {PageComponent} from '../../Framework/Whatever/Page/page.component'
import {SubMenu} from '../../Framework/Whatever/Submenu/submenu.component'
import {BuildingAddEditComponent} from './Building/building-addedit.component'
import {FloorAddEditComponent} from './Floor/floor-addedit.component'
import {DisplaySettingsComponent} from '../../Framework/Whatever/Display Settings/displaysettings.component'
import {IField} from '../../Framework/Models/Interface/Ifield'
import {AdministrationService} from '../../Models/Administration/administration.service'
import { NotificationService } from '../../Framework/Models/Notification/notify.service';
import {AttachmentsComponent} from '../Common/Attachments/attachments.component';
import {GeneralFunctions} from '../../models/common/general'

@Component({
    selector: 'portfolio',
    templateUrl: './app/Views/Administration/portfolio.component.html',
    directives: [SiteListComponent, BuildingListComponent, BuildingAddEditComponent, FloorListComponent, FloorAddEditComponent, TabsComponent, TabComponent, SplitViewComponent, SiteAddEditComponent, PageComponent, SubMenu, DisplaySettingsComponent, AttachmentsComponent],
    providers: [NotificationService, GeneralFunctions]
})

export class PortfolioComponent {

    returnData: any;
    pageTitle: string = "Administration / Portfolio List";
    pagePath: string;
    selectedTab: number = 0;
    splitviewSite: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    fieldObject: IField[];
    dataKey: string[];
    isTabclick: boolean;
    moduleId = 0;
    blockAdd = false;
    blockEdit = false;
    siteAttachmentSuccess: any;

    ngOnInit() {
        this.pagePath = "Administration / Portfolio List";

    }
    //Site
    siteaction: string;
    // showSiteSecondary: boolean = false;
    selectedSiteIds: number[];
    siteMenu;
    enableSiteMenu = [0, 1, 2, 3, 4, 5,6,7]
    siteTotalItems = 8;

    //Building
    buildingaction: string;
    splitviewBuilding: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    selectedBuildingIds: number[];


    //floor
    flooraction: string;
    splitviewFloor: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    selectedFloorIds: number[];
    getSelectedTab(event: any) {
        var contextObj = this;
        this.selectedTab = event[0];
        if (event[0] == "1") {
            if (event[1] == true)
                this.selectedSiteIds = undefined;
        } else if (event[0] == "2") {
            if (event[1] == true)
                this.selectedBuildingIds = undefined;
        }
        this.splitviewSite.showSecondaryView = false;
        this.splitviewBuilding.showSecondaryView = false;
        this.splitviewFloor.showSecondaryView = false;
        if (this.selectedTab == 0)

            this.administrationService.getPortfolioMenu().subscribe(
                function (resultData) {
                   // if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                        var callBack = function (data) {
                            contextObj.siteMenu = data;
                        };
                        contextObj.genFun.GetPrivilegesOfPage(resultData["portfolio"], callBack, 31, contextObj.administrationService, resultData["portfolio"].length);
                  //  }
                })
        else if ((this.selectedTab == 1) || (this.selectedTab == 2))
            this.administrationService.getPortfolioMenu().subscribe(
                function (resultData) {
                    if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                        //contextObj.siteMenu
                        var callBack = function (data) {
                            contextObj.siteMenu = data;
                        };
                        contextObj.genFun.GetPrivilegesOfPage(resultData["buildingFloor"], callBack, 34, contextObj.administrationService, resultData["buildingFloor"].length);
                    }
                })
        //this.administrationService.getPortfolioMenu().subscribe(resultData => this.siteMenu = resultData["buildingFloor"])
    }



    cdr: any;
    constructor(cdr: ChangeDetectorRef, private administrationService: AdministrationService, private _notificationService: NotificationService, private genFun: GeneralFunctions) {
        this.cdr = cdr;

    }
    updateSiteMenu(event: any) {
        switch (this.selectedTab) {
            case 0: {
                if (event.value == 0) {
                    this.Add(this.splitviewSite);
                }
                else if (event.value == 1) {
                    this.Edit(this.splitviewSite);
                }
                else if (event.value == 2) {
                    this.Delete(this.splitviewSite);
                }
                else if (event.value == 3) {
                    this.Close(this.splitviewSite);
                }
                else if (event.value == 4) {
                    this.Reopen(this.splitviewSite);
                }
                else if (event.value == 5) {
                    this.displaySettings(this.splitviewSite);
                }
                else if (event.value == 6) {
                    this.Attachments(this.splitviewSite);
                }
                else if (event.value == 7) {
                    this.Export(this.splitviewSite);
                }
            } break;
            case 1: {
                if (event.value == 0) {
                    if (!this.blockAdd)
                        this.Add(this.splitviewBuilding);
                    else
                        this._notificationService.ShowToaster("Site is not active, Building cannot be added", 2)
                }
                else if (event.value == 1) {
                    if (!this.blockEdit)
                        this.Edit(this.splitviewBuilding);
                    else
                        this._notificationService.ShowToaster("Site is not active, Building cannot be edited", 2)
                }
                else if (event.value == 2) {
                    this.Delete(this.splitviewBuilding);
                }
                else if (event.value == 3) {
                    this.Close(this.splitviewBuilding);
                }
                else if (event.value == 4) {
                    this.Reopen(this.splitviewBuilding);
                }
                else if (event.value == 5) {
                    this.displaySettings(this.splitviewBuilding);
                }
                else if (event.value == 6) {
                    this.Attachments(this.splitviewBuilding);
                }
                else if (event.value == 7) {
                   this.Export(this.splitviewSite);
                }
            } break;
            case 2: {
                if (event.value == 0) {
                    if (!this.blockAdd)
                        this.Add(this.splitviewFloor);
                    else
                        this._notificationService.ShowToaster("Site is not active, Floor cannot be added", 2)
                }
                else if (event.value == 1) {
                    if (!this.blockEdit)
                        this.Edit(this.splitviewFloor);
                    else
                        this._notificationService.ShowToaster("Site is not active, Floor cannot be edited", 2)
                }
                else if (event.value == 2) {
                    this.Delete(this.splitviewFloor);
                }
                else if (event.value == 3) {
                    this.Close(this.splitviewFloor);
                }
                else if (event.value == 4) {
                    this.Reopen(this.splitviewFloor);
                }
                else if (event.value == 5) {
                    this.displaySettings(this.splitviewFloor);
                }
                else if (event.value == 6) {
                    this.Attachments(this.splitviewFloor);
                }
                else if (event.value == 7) {
                //  this._notificationService.ShowToaster("This feature will be available soon", 2)
                 this.Export(this.splitviewSite);
                }
            } break;
        }


    }
    Add(SplitView: ISplitView) {
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0: this.siteaction = "add";
                this.pageTitle = "New Site";
                break;
            case 1: this.buildingaction = "add";
                this.pageTitle = "New Building";
                break;
            case 2: this.flooraction = "add";
                this.pageTitle = "New Floor";
                break;
        }
        this.cdr.detectChanges();
    }
    Edit(SplitView: ISplitView) {
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0: this.siteaction = "edit";
                this.pageTitle = "Edit Site";
                break;
            case 1: this.buildingaction = "edit";
                this.pageTitle = "Edit Building";
                break;
            case 2: this.flooraction = "edit";
                this.pageTitle = "Edit Floor";
                break;
        }
        this.cdr.detectChanges();
    }
    Delete(SplitView: ISplitView) {
        SplitView.showSecondaryView = false;
        switch (this.selectedTab) {
            case 0: { this.siteaction = "delete"; this.cdr.detectChanges(); this.siteaction = ""; }
                break;
            case 1: { this.buildingaction = "delete"; this.cdr.detectChanges(); this.buildingaction = ""; }
                break;
            case 2: { this.flooraction = "delete"; this.cdr.detectChanges(); this.flooraction = ""; }
                break;
        }
    }
    Close(SplitView: ISplitView) {
        SplitView.showSecondaryView = false;
        switch (this.selectedTab) {
            case 0: { this.siteaction = "close"; this.cdr.detectChanges(); this.siteaction = ""; }
                break;
            case 1: { this.buildingaction = "close"; this.cdr.detectChanges(); this.buildingaction = ""; }
                break;
            case 2: { this.flooraction = "close"; this.cdr.detectChanges(); this.flooraction = ""; }
                break;
        }
    }
    Reopen(SplitView: ISplitView) {
        SplitView.showSecondaryView = false;
        switch (this.selectedTab) {
            case 0: { this.siteaction = "reopen"; this.cdr.detectChanges(); this.siteaction = ""; }
                break;
            case 1: { this.buildingaction = "reopen"; this.cdr.detectChanges(); this.buildingaction = ""; }
                break;
            case 2: { this.flooraction = "reopen"; this.cdr.detectChanges(); this.flooraction = ""; }
                break;
        }
    }
    displaySettings(SplitView: ISplitView) {
        this.pageTitle = undefined;
        SplitView.showSecondaryView = true;
        var contextObj = this;
        switch (this.selectedTab) {
            case 0: {
                this.siteaction = "displaySettings";
                this.administrationService.getSiteColumnData().subscribe(
                    function (resultData) {
                        if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                            this.fieldObject = resultData["data"];
                        }

                    });
                this.cdr.detectChanges();
                this.dataKey = ["Id"];


            } break;
            case 1: {
                this.buildingaction = "displaySettings"
                this.administrationService.getBuildingColumnData().subscribe(
                    function (resultData) {
                        if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                            this.fieldObject = resultData["data"];
                        }

                    });
                this.dataKey = ["Site FieldId", "Building FieldId"];
                this.cdr.detectChanges();
            } break;
            case 2: {
                this.flooraction = "displaySettings"
                this.administrationService.getFloorColumnData().subscribe(
                    function (resultData) {
                        if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                            this.fieldObject = resultData["data"];
                        }

                    });
                this.dataKey = ["Site FieldId", "Building FieldId", "Floor FieldID"];
                this.cdr.detectChanges();
            }
        }
    }
    Attachments(SplitView: ISplitView) {
        this.pageTitle = "Attachments";
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0: {
                this.siteaction = "attachment";
                this.cdr.detectChanges();
            }
                break;
            case 1: {
                this.buildingaction = "attachment";
                this.cdr.detectChanges();
            }
                break;
            case 2: {
                this.flooraction = "attachment";
                this.cdr.detectChanges();
            } break;
        }        
    }
    Export(SplitView: ISplitView) {
      
       
        switch (this.selectedTab) {
            case 0: {
                this.siteaction = "siteexport";
                this.cdr.detectChanges();
                this.siteaction = "";
            }
                break;
            case 1: {
                this.buildingaction = "buildingexport";
                this.cdr.detectChanges();
                this.buildingaction = "";
            }
                break;
            case 2: {
                this.flooraction = "floorexport";
                this.cdr.detectChanges();
                this.flooraction = "";
            } break;
        }
 
    }

    //Site
    updateSiteSelectedID(event: any) {
        this.pageTitle = "Edit Site";
        this.selectedSiteIds = event["scopesite"];
        this.cdr.detectChanges();
    }
    displaySettingSite(event: any) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Site updated", 3)
        }
        this.splitviewSite.showSecondaryView = false;
    }
    //Building
    updateBuildingSelectedID(event: any) {
        this.pageTitle = "Edit Building";
        this.selectedBuildingIds = event["scopebuilding"];
        if (event["sitestatus"] == "Active") {
            //if (event["siteId"] == undefined){
            //    this.blockAdd = false;
            //}
            //else
            //    this.blockAdd = true;
            this.blockAdd = false;
            this.blockEdit = false;
        }
        else {
            if (event["siteId"] != undefined) {
                this.blockAdd = true;
            }
            else
                this.blockAdd = false;
            this.blockEdit = true;
        }
        this.cdr.detectChanges();
    }
    displaySettingBuilding(event: any) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Building updated", 3)

        }
        this.splitviewBuilding.showSecondaryView = false;
    }
    //floor
    updateFloorSelectedID(event: any) {
        this.pageTitle = "Edit Floor";
        this.selectedFloorIds = event["scopefloor"];
        if (event["sitestatus"] == "Active") {
            //if (event["buildingId"] != undefined) {
            //    this.blockAdd = false;
            //}
            //else
            //    this.blockAdd = true;
            this.blockAdd = false;
            this.blockEdit = false;
        }
        else {
            if (event["buildingId"] != undefined) {
                this.blockAdd = true;
            }
            else
                this.blockAdd = false;
            this.blockEdit = true;
        }
        this.cdr.detectChanges();
    }
    displaySettingFloor(event: any) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Floor updated", 3)

        }
        this.splitviewFloor.showSecondaryView = false;
    }

    ShiftTab(event) {

        this.selectedTab = event;
    }
    OnSuccessfulSubmi(event: any) {
        if (event["status"] == "success") {
            if ((event["returnData"]["Data"]) != "") {
                this.returnData = event["returnData"]["Data"];
                //if (event["action"]) {
                //    switch (this.selectedTab) {
                //        case 0:
                //            this.siteaction = event["action"]
                //            break;
                //        case 1:
                //            this.buildingaction = event["action"]
                //            break;
                //        case 2:
                //           // this.flooraction = "";
                //            this.flooraction = event["action"]
                //            break;
                //    }
                //    this.cdr.detectChanges();
                //}

            }
            this.splitviewSite.showSecondaryView = false;
            this.splitviewBuilding.showSecondaryView = false;
            this.splitviewFloor.showSecondaryView = false;
        }
    }
    emitMenu(event: any) {

        if (event["TotalItems"] == 0)
            this.enableSiteMenu = [0];
        else
            this.enableSiteMenu = [0, 1, 2, 3, 4, 5, 6,7];
    }

    attachmentSuccess(event: any) {
        console.log("attachment", event["status"]);
        this.siteAttachmentSuccess = event;
    }
}
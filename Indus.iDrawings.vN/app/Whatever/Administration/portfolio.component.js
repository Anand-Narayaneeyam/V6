var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var site_list_component_1 = require('./Site/site-list.component');
var building_list_component_1 = require('./Building/building-list.component');
var floor_list_component_1 = require('./Floor/floor-list.component');
var tabs_component_1 = require('../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../Framework/Whatever/Tab/tab.component');
var split_view_component_1 = require('../../Framework/Whatever/Split-View/split-view.component');
var site_addedit_component_1 = require('./Site/site-addedit.component');
var page_component_1 = require('../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../Framework/Whatever/Submenu/submenu.component');
var building_addedit_component_1 = require('./Building/building-addedit.component');
var floor_addedit_component_1 = require('./Floor/floor-addedit.component');
var displaysettings_component_1 = require('../../Framework/Whatever/Display Settings/displaysettings.component');
var administration_service_1 = require('../../Models/Administration/administration.service');
var notify_service_1 = require('../../Framework/Models/Notification/notify.service');
var attachments_component_1 = require('../Common/Attachments/attachments.component');
var general_1 = require('../../models/common/general');
var PortfolioComponent = (function () {
    function PortfolioComponent(cdr, administrationService, _notificationService, genFun) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.genFun = genFun;
        this.pageTitle = "Administration / Portfolio List";
        this.selectedTab = 0;
        this.splitviewSite = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.moduleId = 0;
        this.blockAdd = false;
        this.blockEdit = false;
        this.enableSiteMenu = [0, 1, 2, 3, 4, 5, 6, 7];
        this.siteTotalItems = 8;
        this.splitviewBuilding = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.splitviewFloor = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.cdr = cdr;
    }
    PortfolioComponent.prototype.ngOnInit = function () {
        this.pagePath = "Administration / Portfolio List";
    };
    PortfolioComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        this.selectedTab = event[0];
        if (event[0] == "1") {
            if (event[1] == true)
                this.selectedSiteIds = undefined;
        }
        else if (event[0] == "2") {
            if (event[1] == true)
                this.selectedBuildingIds = undefined;
        }
        this.splitviewSite.showSecondaryView = false;
        this.splitviewBuilding.showSecondaryView = false;
        this.splitviewFloor.showSecondaryView = false;
        if (this.selectedTab == 0)
            this.administrationService.getPortfolioMenu().subscribe(function (resultData) {
                // if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                var callBack = function (data) {
                    contextObj.siteMenu = data;
                };
                contextObj.genFun.GetPrivilegesOfPage(resultData["portfolio"], callBack, 31, contextObj.administrationService, resultData["portfolio"].length);
                //  }
            });
        else if ((this.selectedTab == 1) || (this.selectedTab == 2))
            this.administrationService.getPortfolioMenu().subscribe(function (resultData) {
                if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                    //contextObj.siteMenu
                    var callBack = function (data) {
                        contextObj.siteMenu = data;
                    };
                    contextObj.genFun.GetPrivilegesOfPage(resultData["buildingFloor"], callBack, 34, contextObj.administrationService, resultData["buildingFloor"].length);
                }
            });
        //this.administrationService.getPortfolioMenu().subscribe(resultData => this.siteMenu = resultData["buildingFloor"])
    };
    PortfolioComponent.prototype.updateSiteMenu = function (event) {
        switch (this.selectedTab) {
            case 0:
                {
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
                }
                break;
            case 1:
                {
                    if (event.value == 0) {
                        if (!this.blockAdd)
                            this.Add(this.splitviewBuilding);
                        else
                            this._notificationService.ShowToaster("Site is not active, Building cannot be added", 2);
                    }
                    else if (event.value == 1) {
                        if (!this.blockEdit)
                            this.Edit(this.splitviewBuilding);
                        else
                            this._notificationService.ShowToaster("Site is not active, Building cannot be edited", 2);
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
                }
                break;
            case 2:
                {
                    if (event.value == 0) {
                        if (!this.blockAdd)
                            this.Add(this.splitviewFloor);
                        else
                            this._notificationService.ShowToaster("Site is not active, Floor cannot be added", 2);
                    }
                    else if (event.value == 1) {
                        if (!this.blockEdit)
                            this.Edit(this.splitviewFloor);
                        else
                            this._notificationService.ShowToaster("Site is not active, Floor cannot be edited", 2);
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
                }
                break;
        }
    };
    PortfolioComponent.prototype.Add = function (SplitView) {
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0:
                this.siteaction = "add";
                this.pageTitle = "New Site";
                break;
            case 1:
                this.buildingaction = "add";
                this.pageTitle = "New Building";
                break;
            case 2:
                this.flooraction = "add";
                this.pageTitle = "New Floor";
                break;
        }
        this.cdr.detectChanges();
    };
    PortfolioComponent.prototype.Edit = function (SplitView) {
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0:
                this.siteaction = "edit";
                this.pageTitle = "Edit Site";
                break;
            case 1:
                this.buildingaction = "edit";
                this.pageTitle = "Edit Building";
                break;
            case 2:
                this.flooraction = "edit";
                this.pageTitle = "Edit Floor";
                break;
        }
        this.cdr.detectChanges();
    };
    PortfolioComponent.prototype.Delete = function (SplitView) {
        SplitView.showSecondaryView = false;
        switch (this.selectedTab) {
            case 0:
                {
                    this.siteaction = "delete";
                    this.cdr.detectChanges();
                    this.siteaction = "";
                }
                break;
            case 1:
                {
                    this.buildingaction = "delete";
                    this.cdr.detectChanges();
                    this.buildingaction = "";
                }
                break;
            case 2:
                {
                    this.flooraction = "delete";
                    this.cdr.detectChanges();
                    this.flooraction = "";
                }
                break;
        }
    };
    PortfolioComponent.prototype.Close = function (SplitView) {
        SplitView.showSecondaryView = false;
        switch (this.selectedTab) {
            case 0:
                {
                    this.siteaction = "close";
                    this.cdr.detectChanges();
                    this.siteaction = "";
                }
                break;
            case 1:
                {
                    this.buildingaction = "close";
                    this.cdr.detectChanges();
                    this.buildingaction = "";
                }
                break;
            case 2:
                {
                    this.flooraction = "close";
                    this.cdr.detectChanges();
                    this.flooraction = "";
                }
                break;
        }
    };
    PortfolioComponent.prototype.Reopen = function (SplitView) {
        SplitView.showSecondaryView = false;
        switch (this.selectedTab) {
            case 0:
                {
                    this.siteaction = "reopen";
                    this.cdr.detectChanges();
                    this.siteaction = "";
                }
                break;
            case 1:
                {
                    this.buildingaction = "reopen";
                    this.cdr.detectChanges();
                    this.buildingaction = "";
                }
                break;
            case 2:
                {
                    this.flooraction = "reopen";
                    this.cdr.detectChanges();
                    this.flooraction = "";
                }
                break;
        }
    };
    PortfolioComponent.prototype.displaySettings = function (SplitView) {
        this.pageTitle = undefined;
        SplitView.showSecondaryView = true;
        var contextObj = this;
        switch (this.selectedTab) {
            case 0:
                {
                    this.siteaction = "displaySettings";
                    this.administrationService.getSiteColumnData().subscribe(function (resultData) {
                        if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                            this.fieldObject = resultData["data"];
                        }
                    });
                    this.cdr.detectChanges();
                    this.dataKey = ["Id"];
                }
                break;
            case 1:
                {
                    this.buildingaction = "displaySettings";
                    this.administrationService.getBuildingColumnData().subscribe(function (resultData) {
                        if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                            this.fieldObject = resultData["data"];
                        }
                    });
                    this.dataKey = ["Site FieldId", "Building FieldId"];
                    this.cdr.detectChanges();
                }
                break;
            case 2: {
                this.flooraction = "displaySettings";
                this.administrationService.getFloorColumnData().subscribe(function (resultData) {
                    if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                        this.fieldObject = resultData["data"];
                    }
                });
                this.dataKey = ["Site FieldId", "Building FieldId", "Floor FieldID"];
                this.cdr.detectChanges();
            }
        }
    };
    PortfolioComponent.prototype.Attachments = function (SplitView) {
        this.pageTitle = "Attachments";
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0:
                {
                    this.siteaction = "attachment";
                    this.cdr.detectChanges();
                }
                break;
            case 1:
                {
                    this.buildingaction = "attachment";
                    this.cdr.detectChanges();
                }
                break;
            case 2:
                {
                    this.flooraction = "attachment";
                    this.cdr.detectChanges();
                }
                break;
        }
    };
    PortfolioComponent.prototype.Export = function (SplitView) {
        switch (this.selectedTab) {
            case 0:
                {
                    this.siteaction = "siteexport";
                    this.cdr.detectChanges();
                    this.siteaction = "";
                }
                break;
            case 1:
                {
                    this.buildingaction = "buildingexport";
                    this.cdr.detectChanges();
                    this.buildingaction = "";
                }
                break;
            case 2:
                {
                    this.flooraction = "floorexport";
                    this.cdr.detectChanges();
                    this.flooraction = "";
                }
                break;
        }
    };
    //Site
    PortfolioComponent.prototype.updateSiteSelectedID = function (event) {
        this.pageTitle = "Edit Site";
        this.selectedSiteIds = event["scopesite"];
        this.cdr.detectChanges();
    };
    PortfolioComponent.prototype.displaySettingSite = function (event) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Site updated", 3);
        }
        this.splitviewSite.showSecondaryView = false;
    };
    //Building
    PortfolioComponent.prototype.updateBuildingSelectedID = function (event) {
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
    };
    PortfolioComponent.prototype.displaySettingBuilding = function (event) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Building updated", 3);
        }
        this.splitviewBuilding.showSecondaryView = false;
    };
    //floor
    PortfolioComponent.prototype.updateFloorSelectedID = function (event) {
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
    };
    PortfolioComponent.prototype.displaySettingFloor = function (event) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Floor updated", 3);
        }
        this.splitviewFloor.showSecondaryView = false;
    };
    PortfolioComponent.prototype.ShiftTab = function (event) {
        this.selectedTab = event;
    };
    PortfolioComponent.prototype.OnSuccessfulSubmi = function (event) {
        if (event["status"] == "success") {
            if ((event["returnData"]["Data"]) != "") {
                this.returnData = event["returnData"]["Data"];
            }
            this.splitviewSite.showSecondaryView = false;
            this.splitviewBuilding.showSecondaryView = false;
            this.splitviewFloor.showSecondaryView = false;
        }
    };
    PortfolioComponent.prototype.emitMenu = function (event) {
        if (event["TotalItems"] == 0)
            this.enableSiteMenu = [0];
        else
            this.enableSiteMenu = [0, 1, 2, 3, 4, 5, 6, 7];
    };
    PortfolioComponent.prototype.attachmentSuccess = function (event) {
        console.log("attachment", event["status"]);
        this.siteAttachmentSuccess = event;
    };
    PortfolioComponent = __decorate([
        core_1.Component({
            selector: 'portfolio',
            templateUrl: './app/Views/Administration/portfolio.component.html',
            directives: [site_list_component_1.SiteListComponent, building_list_component_1.BuildingListComponent, building_addedit_component_1.BuildingAddEditComponent, floor_list_component_1.FloorListComponent, floor_addedit_component_1.FloorAddEditComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, split_view_component_1.SplitViewComponent, site_addedit_component_1.SiteAddEditComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, displaysettings_component_1.DisplaySettingsComponent, attachments_component_1.AttachmentsComponent],
            providers: [notify_service_1.NotificationService, general_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, administration_service_1.AdministrationService, notify_service_1.NotificationService, general_1.GeneralFunctions])
    ], PortfolioComponent);
    return PortfolioComponent;
}());
exports.PortfolioComponent = PortfolioComponent;
//# sourceMappingURL=portfolio.component.js.map
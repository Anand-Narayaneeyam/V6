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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var site_list_component_1 = require('../../Administration/Site/site-list.component');
var building_list_component_1 = require('../../Administration/Building/building-list.component');
var floor_list_component_1 = require('../../Administration/Floor/floor-list.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var site_addedit_component_1 = require('../../Administration/Site/site-addedit.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var building_addedit_component_1 = require('../../Administration/Building/building-addedit.component');
var floor_addedit_component_1 = require('../../Administration/Floor/floor-addedit.component');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var general_1 = require('../../../models/common/general');
var AsbuiltsDataComponent = (function () {
    function AsbuiltsDataComponent(cdr, administrationService, _notificationService, genFun) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.genFun = genFun;
        this.pageTitle = "As Builts / Data";
        this.selectedTab = 0;
        this.splitviewSite = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.moduleId = 1;
        this.blockAdd = false;
        this.blockEdit = false;
        this.siteMenumock = [
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": null,
                "subMenu": null,
                "privilegeId": 256
            },
            {
                "id": 6,
                "title": "Attachments",
                "image": "Attachments",
                "path": null,
                "subMenu": null,
                "privilegeId": 257
            },
        ];
        this.enableSiteMenu = [0, 1, 2, 3, 4, 5, 6];
        this.siteTotalItems = 8;
        this.splitviewBuilding = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.splitviewFloor = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.cdr = cdr;
    }
    AsbuiltsDataComponent.prototype.ngOnInit = function () {
        this.pagePath = "As Builts / Data";
    };
    AsbuiltsDataComponent.prototype.getSelectedTab = function (event) {
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
        var callBack = function (data) {
            contextObj.siteMenu = data;
        };
        contextObj.genFun.GetPrivilegesOfPage(contextObj.siteMenumock, callBack, 34, contextObj.administrationService, contextObj.siteMenumock.length);
        this.splitviewSite.showSecondaryView = false;
        this.splitviewBuilding.showSecondaryView = false;
        this.splitviewFloor.showSecondaryView = false;
    };
    AsbuiltsDataComponent.prototype.updateSiteMenu = function (event) {
        switch (this.selectedTab) {
            case 0:
                {
                    if (event.value == 0) {
                        this.Add(this.splitviewSite);
                    }
                    else if (event.value == 1) {
                        this.Edit(this.splitviewSite);
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
                }
                break;
        }
    };
    AsbuiltsDataComponent.prototype.Add = function (SplitView) {
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0:
                this.siteaction = "add";
                this.pageTitle = "Add Site";
                break;
            case 1:
                this.buildingaction = "add";
                this.pageTitle = "Add Building";
                break;
            case 2:
                this.flooraction = "add";
                this.pageTitle = "Add Floor";
                break;
        }
        this.cdr.detectChanges();
    };
    AsbuiltsDataComponent.prototype.Edit = function (SplitView) {
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
    AsbuiltsDataComponent.prototype.Close = function (SplitView) {
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
    AsbuiltsDataComponent.prototype.Reopen = function (SplitView) {
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
    AsbuiltsDataComponent.prototype.displaySettings = function (SplitView) {
        var _this = this;
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0:
                {
                    this.siteaction = "displaySettings";
                    this.administrationService.getSiteColumnData().subscribe(function (resultData) { return _this.fieldObject = resultData["data"]; });
                    this.cdr.detectChanges();
                    this.dataKey = ["FieldId"];
                }
                break;
            case 1:
                {
                    this.buildingaction = "displaySettings";
                    this.administrationService.getBuildingColumnData().subscribe(function (resultData) { return _this.fieldObject = resultData["data"]; });
                    this.dataKey = ["Site FieldId", "Building FieldId"];
                    this.cdr.detectChanges();
                }
                break;
            case 2: {
                this.flooraction = "displaySettings";
                this.administrationService.getFloorColumnData().subscribe(function (resultData) { return _this.fieldObject = resultData["data"]; });
                this.dataKey = ["Site FieldId", "Building FieldId", "Floor FieldID"];
                this.cdr.detectChanges();
            }
        }
    };
    AsbuiltsDataComponent.prototype.Attachments = function (SplitView) {
        this.pageTitle = undefined;
        SplitView.showSecondaryView = true;
        switch (this.selectedTab) {
            case 0:
                {
                    this.siteaction = "attachment";
                    this.pageTitle = "Attachments";
                    this.cdr.detectChanges();
                }
                break;
            case 1:
                {
                    this.buildingaction = "attachment";
                    this.pageTitle = "Attachments";
                    this.cdr.detectChanges();
                }
                break;
            case 2:
                {
                    this.flooraction = "attachment";
                    this.pageTitle = "Attachments";
                    this.cdr.detectChanges();
                }
                break;
        }
    };
    //Site
    AsbuiltsDataComponent.prototype.updateSiteSelectedID = function (event) {
        this.selectedSiteIds = event["scopesite"];
        this.cdr.detectChanges();
    };
    AsbuiltsDataComponent.prototype.displaySettingSite = function (event) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Site updated", 3);
        }
        //this.splitviewSite.showSecondaryView = false;
    };
    //Building
    AsbuiltsDataComponent.prototype.updateBuildingSelectedID = function (event) {
        this.selectedBuildingIds = event["scopebuilding"];
        if (event["sitestatus"] == "Active") {
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
    AsbuiltsDataComponent.prototype.displaySettingBuilding = function (event) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Building updated", 3);
        }
        //this.splitviewBuilding.showSecondaryView = false;
    };
    //floor
    AsbuiltsDataComponent.prototype.updateFloorSelectedID = function (event) {
        this.selectedFloorIds = event["scopefloor"];
        if (event["sitestatus"] == "Active") {
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
    AsbuiltsDataComponent.prototype.displaySettingFloor = function (event) {
        if (event != "cancel") {
            //server call to update
            this._notificationService.ShowToaster("Field Order for Floor updated", 3);
        }
        //this.splitviewFloor.showSecondaryView = false;
    };
    AsbuiltsDataComponent.prototype.ShiftTab = function (event) {
        this.selectedTab = event;
    };
    AsbuiltsDataComponent.prototype.OnSuccessfulSubmi = function (event) {
        if (event["status"] == "success") {
            if ((event["returnData"]["Data"]) != "") {
                this.returnData = event["returnData"]["Data"];
            }
            this.splitviewSite.showSecondaryView = false;
            this.splitviewBuilding.showSecondaryView = false;
            this.splitviewFloor.showSecondaryView = false;
        }
    };
    AsbuiltsDataComponent.prototype.emitMenu = function (event) {
        if (event["TotalItems"] == 0)
            this.enableSiteMenu = [];
        else
            this.enableSiteMenu = [1, 6];
    };
    AsbuiltsDataComponent.prototype.attachmentSuccess = function (event) {
        console.log("attachment", event["status"]);
        this.siteAttachmentSuccess = event;
    };
    AsbuiltsDataComponent = __decorate([
        core_1.Component({
            selector: 'Asbuilt-data',
            templateUrl: './app/Views/Asbuilts/Data/data.component.html',
            directives: [site_list_component_1.SiteListComponent, building_list_component_1.BuildingListComponent, building_addedit_component_1.BuildingAddEditComponent, floor_list_component_1.FloorListComponent, floor_addedit_component_1.FloorAddEditComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, split_view_component_1.SplitViewComponent, site_addedit_component_1.SiteAddEditComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, displaysettings_component_1.DisplaySettingsComponent, attachments_component_1.AttachmentsComponent],
            providers: [notify_service_1.NotificationService, general_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, administration_service_1.AdministrationService, notify_service_1.NotificationService, general_1.GeneralFunctions])
    ], AsbuiltsDataComponent);
    return AsbuiltsDataComponent;
}());
exports.AsbuiltsDataComponent = AsbuiltsDataComponent;
//# sourceMappingURL=data.component.js.map
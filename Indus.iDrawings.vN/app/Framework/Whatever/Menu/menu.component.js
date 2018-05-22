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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var menu_service_1 = require('../../Models/Menu/menu.service');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var MenuComponent = (function () {
    function MenuComponent(_menuService, administrationService) {
        this._menuService = _menuService;
        this.administrationService = administrationService;
        this.hideMenu = new core_1.EventEmitter();
        this.opened = false;
        this.thirdLevelMenuExpansion = true;
        this.expandIcon = "Content/Images/arrows_right.png";
        this.hideIcon = "Content/Images/arrows_left.png";
    }
    MenuComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["currentModule"] || changes["generalmenu"] || changes["isHelpFlag"] || changes["isReportFlag"]) {
            var loadDefaultURL = "";
            contextObj.isExpandedArray = [];
            switch (this.currentModule) {
                case 0:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/portfolio";
                    //else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/administartion/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/general-settings";
                    break;
                case 1:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/asbuilts-drawings";
                    // else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/AsBuilts/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/setup-drawings";
                    break;
                case 2:
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/projects/Data";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    break;
                case 3:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/space/drawings";
                    //else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/space/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/space-general-settings";
                    break;
                case 4:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/space/drawings";
                    //else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/documents/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/documents-generalsettings";
                    break;
                case 5:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/EmployeeDrawings";
                    //else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/employees/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/GeneralSettings";
                    break;
                case 7:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/assets/drawings";
                    //else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/assets/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/assets-general-settings";
                    break;
                case 8:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/assets/drawings";
                    //else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/furniture/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/furniture-general-settings";
                    break;
                case 9:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/workorder-review";
                    //else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/workorder/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/workorder/GeneralSettings";
                    break;
                case 14:
                    if (this.generalmenu == false) {
                        var blnSeatEnabled = false;
                        var blnRoomEnabled = false;
                        contextObj.administrationService.getCustomerSubscribedFeatures("187,186").subscribe(function (resultData1) {
                            var customerFeatureobj = resultData1["Data"];
                            for (var i = 0; i < customerFeatureobj.length; i++) {
                                switch (customerFeatureobj[i]["Id"]) {
                                    case 187:
                                        blnSeatEnabled = customerFeatureobj[i]["IsSubscribed"];
                                        break;
                                    case 186:
                                        blnRoomEnabled = customerFeatureobj[i]["IsSubscribed"];
                                        break;
                                }
                            }
                            if (blnSeatEnabled) {
                                loadDefaultURL = "/reserveseats";
                            }
                            else if (blnRoomEnabled) {
                                loadDefaultURL = "/reserveroom";
                            }
                            else {
                                loadDefaultURL = "/scheduling/drawings";
                            }
                            if (contextObj.menusource != undefined) {
                                contextObj.menusource.filter(function (el) {
                                    if (el["subMenu"].length != 0) {
                                        el["subMenu"].filter(function (el2) {
                                            if (el2["path"] == loadDefaultURL) {
                                                contextObj.submenuItem = el2;
                                            }
                                            return true;
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        if (this.isHelpFlag == true && this.isReportFlag == false)
                            loadDefaultURL = "/help/scheduling/GeneralSettings";
                        else if (this.isHelpFlag == false && this.isReportFlag == true)
                            loadDefaultURL = this.reportLoadDefaultURL;
                        else
                            loadDefaultURL = "/scheduling-general-settings";
                    }
                    break;
                case 30:
                    //if (this.generalmenu == false)
                    //    loadDefaultURL = "/realproperty-lease";
                    //else
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/rp/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/realproperty-generalsettings";
                //break;
                case 2:
                    if (this.generalmenu == false)
                        loadDefaultURL = "/projects-dataList";
                    break;
                case 17:
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/furniture/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/electrical-general-settings";
                    break;
                case 6:
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/telecom/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/telecom-general-settings";
                    break;
                case 18:
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/telecom/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/fireandsafety-general-settings";
                    break;
                case 24:
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/securityassets/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/securityassets-general-settings";
                    break;
                case 25:
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/mechanical/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/mechanical-general-settings";
                    break;
                case 26:
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/plumbing/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/plumbing-general-settings";
                    break;
                case 27:
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/medicalgas/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/medicalgas-general-settings";
                    break;
                default:
                    break;
            }
            this.defaultUrl = loadDefaultURL;
        }
        if (this.menusource != undefined && this.isExpandedArray.length == 0) {
            this.menusource.filter(function (el) {
                if (el["subMenu"].length != 0) {
                    el["subMenu"].filter(function (el2) {
                        if (el2["path"] == contextObj.defaultUrl) {
                            contextObj.submenuItem = el2;
                        }
                        return true;
                    });
                }
            });
        }
        if (changes["menusource"]) {
            var isExpanded = new Array();
            var isDefaultMenuOpened = false;
            if (this.menusource != undefined) {
                this.menusource.filter(function (el) {
                    var status = false;
                    el["subMenu"].filter(function (el2) {
                        if (el2["path"] == contextObj.defaultUrl) {
                            if (contextObj.generalmenu) {
                                status = true;
                                isDefaultMenuOpened = true;
                            }
                        }
                    });
                    isExpanded.push({
                        id: el["id"],
                        isExpanded: status
                    });
                    return true;
                });
            }
            this.isExpandedArray = isExpanded;
            this.isExpandedArray = JSON.parse(JSON.stringify(this.isExpandedArray));
            if (!isDefaultMenuOpened) {
                if (this.isExpandedArray.length > 0) {
                    this.isExpandedArray[0].isExpanded = true;
                }
            }
        }
        this.menusource = this.menusource;
        this.menuName = this.menuName;
    };
    MenuComponent.prototype.onMenuClick = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var elemHide = open;
        if (target.nextElementSibling.style.display == 'none')
            target.nextElementSibling.style.display = 'block';
        else
            target.nextElementSibling.style.display = 'none';
    };
    MenuComponent.prototype.closeVerticalMenu = function (event) {
        this.ishideMenu = !this.ishideMenu;
        this.hideMenu.emit({
            value: this.ishideMenu
        });
    };
    MenuComponent.prototype.onMainMenuClick = function (event) {
        //this.closeVerticalMenu(true);
        this.menuName = event.title;
        /*if (event=="Drawings")
        this.ishideMenu = !this.ishideMenu;*/
        this.hideMenu.emit({
            value: this.ishideMenu,
            menuName: event.title
        });
        if (event.subMenu != null) {
            if (this.thirdLevelMenuItems == null) {
                this.thirdLevelMenuCaption = event.title;
                this.thirdLevelMenuItems = event.subMenu;
            }
            else {
                if (this.thirdLevelMenuCaption == event.title) {
                    this.thirdLevelMenuCaption = "";
                    this.thirdLevelMenuItems = null;
                }
                else {
                    this.thirdLevelMenuCaption = event.title;
                    this.thirdLevelMenuItems = event.subMenu;
                }
            }
        }
        else {
            //if (this.thirdLevelMenuCaption == event.title) { //bugid 80793
            this.thirdLevelMenuCaption = "";
            this.thirdLevelMenuItems = null;
        }
    };
    MenuComponent.prototype.onThirdMenuClick = function (event) {
        this.onMainMenuClick(event);
        this.thirdLevelMenuCaption = "";
        this.thirdLevelMenuItems = null;
    };
    MenuComponent.prototype.onSelect = function (hero) {
        this.submenuItem = hero;
    };
    MenuComponent.prototype.onSectionExpandChange = function (id) {
        var isExpanded = new Array();
        this.isExpandedArray.filter(function (el) {
            if (el["id"] == id) {
                isExpanded.push({
                    id: el["id"],
                    isExpanded: true
                });
            }
            else {
                isExpanded.push({
                    id: el["id"],
                    isExpanded: false
                });
            }
            return true;
        });
        this.isExpandedArray = isExpanded;
    };
    MenuComponent.prototype.thirdLevelOverlayClick = function () {
        this.thirdLevelMenuItems = null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "generalmenu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "currentModule", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "menusource", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "hideMenu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "ishideMenu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "isReportFlag", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "isHelpFlag", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "reportLoadDefaultURL", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenuComponent.prototype, "menuName", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'main-menu',
            directives: [router_1.ROUTER_DIRECTIVES, section_component_1.SectionComponent],
            templateUrl: 'app/Framework/Views/Menu/menutemplate.html',
            providers: [http_1.HTTP_PROVIDERS, menu_service_1.MenuService, administration_service_1.AdministrationService],
            styleUrls: ['app/Framework/Views/Menu/menustyle.css'],
            inputs: ["menusource", "type"]
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, administration_service_1.AdministrationService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map
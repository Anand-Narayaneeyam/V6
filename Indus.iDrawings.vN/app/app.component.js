var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var testservice_1 = require('./whatever/test2/testservice');
var menu_component_1 = require('./Framework/Whatever/Menu/menu.component');
var menu_service_1 = require('./Framework/Models/Menu/menu.service');
var page_component_1 = require('./Framework/Whatever/Page/page.component');
var administration_service_1 = require('./Models/Administration/administration.service');
require('rxjs/Rx'); /*( Load all features*/
var slide_component_1 = require('./Framework/Whatever/Slide/slide.component');
var General_1 = require('./Models/Common/General');
var fieldgeneration_component_1 = require('./Framework/Whatever/DynamicControls/DynamicFields/fieldgeneration.component');
var userlist_report_component_1 = require('./Whatever/Administration/UserListReport/userlist.report.component');
var notify_service_1 = require('./Framework/Models/Notification/notify.service');
var component_administration_routes_1 = require('./component.administration.routes');
var component_asbuilts_routes_1 = require('./component.asbuilts.routes');
var component_space_routes_1 = require('./component.space.routes');
var component_projects_routes_1 = require('./component.projects.routes');
var component_employees_routes_1 = require('./component.employees.routes');
var component_assets_routes_1 = require('./component.assets.routes');
var component_furniture_routes_1 = require('./component.furniture.routes');
var component_workorder_routes_1 = require('./component.workorder.routes');
var component_rpm_routes_1 = require('./component.rpm.routes');
var component_scheduling_routes_1 = require('./component.scheduling.routes');
var component_settings_route_1 = require('./component.settings.route');
var component_reports_routes_1 = require('./component.reports.routes');
var component_help_routes_1 = require('./component.help.routes');
var component_documents_route_1 = require('./component.documents.route');
var component_CAI_routes_1 = require('./component.CAI.routes');
var component_electrical_routes_1 = require('./component.electrical.routes');
var component_fireandsafety_routes_1 = require('./component.fireandsafety.routes');
var component_mechanical_routes_1 = require('./component.mechanical.routes');
var component_plumbing_routes_1 = require('./component.plumbing.routes');
var component_medicalgas_routes_1 = require('./component.medicalgas.routes');
var component_securityassets_routes_1 = require('./component.securityassets.routes');
var component_telecom_routes_1 = require('./component.telecom.routes');
var validation_service_1 = require('./Framework/Models/Validation/validation.service');
var component_exesummary_routes_1 = require('./component.exesummary.routes');
var releasenotes_component_1 = require('./Whatever/Administration/ReleaseNotes/releasenotes.component');
var AppComponent = (function () {
    function AppComponent(_menuService, administrationService, _validateService, _notificationService, getData, router) {
        var _this = this;
        this._menuService = _menuService;
        this.administrationService = administrationService;
        this._validateService = _validateService;
        this._notificationService = _notificationService;
        this.getData = getData;
        this.router = router;
        this.menuwidth = 0;
        this.currentModule = 0;
        this.edited = true;
        this.IE11Staus = false;
        this.generalmenu = true;
        this.isReportFlag = false;
        this.isHelpFlag = false;
        this.reportLoadDefaultURL = "";
        this.myVar = true;
        this.userName = "Stefano";
        this.customerName = "";
        this.Position = "top-right";
        this.width = 300;
        this.change = false;
        this.changeVersion = false;
        this.showSlide = false;
        this.showSlideVersionDetails = false;
        this.btnName = "Select";
        this.loading = false;
        this.reqloading = false;
        this.mainMenuVisibility = false;
        this.overlayEnabled = false;
        this.ishideMenu = false;
        this.mainMenuWidth = "175px";
        this.contentWidth = '';
        this.minorVersion = "V6.0.0 (23 Feb 2018)";
        this.islogout = false;
        this.showUpdateEmailSlide = false;
        this.isMobile = true;
        this.releasenoteswidth = 350;
        this.allModules = [
            {
                "id": 0,
                "title": "Administration",
                "image": "admin",
                "path": "admin",
            },
            {
                "id": 11,
                "title": "Executive Summary",
                "image": "admin",
                "path": "admin",
            },
            {
                "id": 1,
                "image": "asbuilts",
                "title": "As Builts",
                "path": "asbuilts"
            },
            {
                "id": 3,
                "image": "space",
                "title": "Space",
                "path": "space"
            },
            {
                "id": 14,
                "image": "scheduling",
                "title": "Scheduling",
                "path": "scheduling"
            },
            {
                "id": 4,
                "image": "documents",
                "title": "Documents",
                "path": "documents"
            },
            {
                "id": 5,
                "image": "employee",
                "title": "Employees",
                "path": "employee"
            },
            {
                "id": 6,
                "image": "telecom",
                "title": "Telecom",
                "path": "telecom"
            },
            {
                "id": 7,
                "image": "assets",
                "title": "Assets",
                "path": "assets"
            },
            {
                "id": 8,
                "image": "furniture",
                "title": "Furniture",
                "path": "furniture"
            },
            {
                "id": 9,
                "image": "workorder",
                "title": "Work Order",
                "path": "workorder"
            },
            {
                "id": 2,
                "image": "projects",
                "title": "Projects",
                "path": "projects"
            },
            {
                "id": 12,
                "image": "CAI",
                "title": "CAI",
                "path": "CAI"
            },
            {
                "id": 17,
                "image": "electrical",
                "title": "Electrical",
                "path": "electrical"
            },
            {
                "id": 18,
                "image": "fireandsafety",
                "title": "Fire and Safety",
                "path": "fireandsafety"
            },
            {
                "id": 25,
                "image": "mechanical",
                "title": "Mechanical",
                "path": "mechanical"
            },
            {
                "id": 26,
                "image": "plumbing",
                "title": "Plumbing",
                "path": "plumbing"
            },
            {
                "id": 27,
                "image": "medicalgas",
                "title": "Medical Gas",
                "path": "medicalgas"
            },
            {
                "id": 24,
                "image": "securityassets",
                "title": "Security Assets",
                "path": "securityassets"
            },
            {
                "id": 30,
                "image": "realproperty",
                "title": "Real Property",
                "path": "realproperty"
            }
        ];
        this.liveRequestsCount = 0;
        this.currentModuleName = this.allModules.find(function (t) { return t.id == _this.currentModule; }).title;
        this.overlayClick = function () {
            this.overlayEnabled = false;
            this.mainMenuVisibility = false;
        };
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
        this._menuService.getAllDatasource()
            .subscribe(function (allmenusource) { return _this.allmenusource = allmenusource; }, function (error) { return _this.errorMessage = error; });
        var contextObj = this;
        contextObj.administrationService.getSSOEnabled().subscribe(function (resultData) {
            contextObj.ssoEnable = resultData["Data"];
        });
        contextObj.identifyBrowser();
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.loggedInUserDetails = {};
            contextObj.loggedInUserDetails["username"] = retData["UserName"];
            contextObj.loggedInUserDetails["email"] = retData["Email"].trim();
            /*this.loggedInUserDetails["userrole"] = retData["UserRoleName"];*/
            contextObj.loggedInUserDetails["customername"] = retData["CustomerName"];
            contextObj.loggedInUserDetails["userroleid"] = retData["UserRoleId"];
            var UserRoleId = retData["UserRoleId"];
            contextObj.userRoleId = retData["UserRoleId"];
            contextObj.UserAccessLevelId = retData["UserAccountLevelId"];
            //Update Email For V5 Users
            if (contextObj.loggedInUserDetails["email"] == "" || contextObj.loggedInUserDetails["email"] == null || contextObj.loggedInUserDetails["email"].length == 0) {
                contextObj.administrationService.getChangeEmailForUser().subscribe(function (data) {
                    contextObj.emailFieldObject = data["Data"];
                    contextObj.showUpdateEmailSlide = !contextObj.showUpdateEmailSlide;
                });
            }
            var IsLogBookReq = 0;
            var IsReportReq = 0;
            contextObj.administrationService.getCustomerSubscribedFeatures("25").subscribe(function (data) {
                if (data.Data[0]["IsSubscribed"] == true && data.Data[0]["Id"] == 25) {
                    IsLogBookReq = 1;
                    if (contextObj.UserAccessLevelId == 1) {
                        IsLogBookReq = 0;
                    }
                }
                contextObj._menuService.getgeneralsettingssource(11).subscribe(function (resultData) {
                    if ((resultData["Data"]).length > 0) {
                        IsReportReq = 1;
                    }
                    if (IsLogBookReq == 1 && IsReportReq == 1) {
                        if (UserRoleId == "1" || UserRoleId == "3" || UserRoleId == "6") {
                            if (contextObj.checkMobileBrowser() != 1) {
                                contextObj.generalMenu = [
                                    {
                                        "id": 0,
                                        "title": "Settings",
                                        "path": ""
                                    },
                                    {
                                        "id": 11,
                                        "title": "Reports",
                                        "path": "/common-list-report",
                                    },
                                    {
                                        "id": 2,
                                        "title": "Logbook",
                                        "path": "/logbook",
                                    }
                                ];
                            }
                            else {
                                contextObj.generalMenu = [
                                    {
                                        "id": 11,
                                        "title": "Reports",
                                        "path": "/common-list-report",
                                    },
                                    {
                                        "id": 2,
                                        "title": "Logbook",
                                        "path": "/logbook",
                                    }
                                ];
                            }
                        }
                        else if (UserRoleId == "4" || UserRoleId == "7") {
                            if (contextObj.checkMobileBrowser() != 1) {
                                contextObj.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
                                    var accesibleModules = resultData["Data"];
                                    //contextObj.modulesource = contextObj.allModules.filter(checkModuleAccess);
                                    if (accesibleModules.find(function (t) { return t.ModuleId == 3; }) != undefined) {
                                        contextObj.generalMenu = [
                                            {
                                                "id": 0,
                                                "title": "Settings",
                                                "path": ""
                                            },
                                            {
                                                "id": 11,
                                                "title": "Reports",
                                                "path": "/common-list-report",
                                            }
                                        ];
                                    }
                                    else {
                                        contextObj.generalMenu = [
                                            {
                                                "id": 11,
                                                "title": "Reports",
                                                "path": "/common-list-report",
                                            }
                                        ];
                                    }
                                });
                            }
                        }
                        else if (UserRoleId != "8") {
                            contextObj.generalMenu = [
                                {
                                    "id": 11,
                                    "title": "Reports",
                                    "path": "/common-list-report",
                                }
                            ];
                        }
                    }
                    else if (IsLogBookReq == 0 && IsReportReq == 1) {
                        if (UserRoleId == "1" || UserRoleId == "3" || UserRoleId == "6") {
                            if (contextObj.checkMobileBrowser() != 1) {
                                contextObj.generalMenu = [
                                    {
                                        "id": 0,
                                        "title": "Settings",
                                        "path": ""
                                    },
                                    {
                                        "id": 11,
                                        "title": "Reports",
                                        "path": "/common-list-report",
                                    }
                                ];
                            }
                            else {
                                contextObj.generalMenu = [
                                    {
                                        "id": 11,
                                        "title": "Reports",
                                        "path": "/common-list-report",
                                    }
                                ];
                            }
                        }
                        else if (UserRoleId == "4" || UserRoleId == "7") {
                            if (contextObj.checkMobileBrowser() != 1) {
                                //contextObj.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
                                //    debugger;
                                //    var accesibleModules = resultData["Data"];
                                //    function checkModuleAccess(module) {
                                //        return (accesibleModules.find(t => t.ModuleId == module.id) != undefined);
                                //    }
                                //    contextObj.modulesource = contextObj.allModules.filter(checkModuleAccess);
                                //});
                                contextObj.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
                                    var accesibleModules = resultData["Data"];
                                    //contextObj.modulesource = contextObj.allModules.filter(checkModuleAccess);
                                    if (accesibleModules.find(function (t) { return t.ModuleId == 3; }) != undefined) {
                                        contextObj.generalMenu = [
                                            {
                                                "id": 0,
                                                "title": "Settings",
                                                "path": ""
                                            },
                                            {
                                                "id": 11,
                                                "title": "Reports",
                                                "path": "/common-list-report",
                                            }
                                        ];
                                    }
                                    else {
                                        contextObj.generalMenu = [
                                            {
                                                "id": 11,
                                                "title": "Reports",
                                                "path": "/common-list-report",
                                            }
                                        ];
                                    }
                                });
                            }
                        }
                        else if (UserRoleId != "8") {
                            contextObj.generalMenu = [
                                {
                                    "id": 11,
                                    "title": "Reports",
                                    "path": "/common-list-report",
                                }
                            ];
                        }
                    }
                    else if (IsLogBookReq == 1 && IsReportReq == 0) {
                        if (UserRoleId == "1" || UserRoleId == "3" || UserRoleId == "6") {
                            if (contextObj.checkMobileBrowser() != 1) {
                                contextObj.generalMenu = [
                                    {
                                        "id": 0,
                                        "title": "Settings",
                                        "path": ""
                                    },
                                    {
                                        "id": 2,
                                        "title": "Logbook",
                                        "path": "/logbook",
                                    }
                                ];
                            }
                            else {
                                contextObj.generalMenu = [
                                    {
                                        "id": 2,
                                        "title": "Logbook",
                                        "path": "/logbook",
                                    }
                                ];
                            }
                        }
                        else if (UserRoleId == "4" || UserRoleId == "7") {
                            if (contextObj.checkMobileBrowser() != 1) {
                                contextObj.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
                                    var accesibleModules = resultData["Data"];
                                    //contextObj.modulesource = contextObj.allModules.filter(checkModuleAccess);
                                    if (accesibleModules.find(function (t) { return t.ModuleId == 3; }) != undefined) {
                                        contextObj.generalMenu = [
                                            {
                                                "id": 0,
                                                "title": "Settings",
                                                "path": ""
                                            }
                                        ];
                                    }
                                    else {
                                        contextObj.generalMenu = [];
                                    }
                                });
                            }
                        }
                    }
                    else if (IsLogBookReq == 0 && IsReportReq == 0) {
                        if (UserRoleId == "1" || UserRoleId == "3" || UserRoleId == "6") {
                            if (contextObj.checkMobileBrowser() != 1) {
                                contextObj.generalMenu = [
                                    {
                                        "id": 0,
                                        "title": "Settings",
                                        "path": ""
                                    }
                                ];
                            }
                        }
                        else if (UserRoleId == "4" || UserRoleId == "7") {
                            if (contextObj.checkMobileBrowser() != 1) {
                                contextObj.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
                                    var accesibleModules = resultData["Data"];
                                    //contextObj.modulesource = contextObj.allModules.filter(checkModuleAccess);
                                    if (accesibleModules.find(function (t) { return t.ModuleId == 3; }) != undefined) {
                                        contextObj.generalMenu = [
                                            {
                                                "id": 0,
                                                "title": "Settings",
                                                "path": ""
                                            }
                                        ];
                                    }
                                    else {
                                        contextObj.generalMenu = [];
                                    }
                                });
                            }
                        }
                    }
                });
            });
        });
    }
    AppComponent.prototype.onRequestStartListener = function (event) {
        this.liveRequestsCount++;
        if (this.liveRequestsCount == 1) {
            this.reqloading = true;
        }
    };
    AppComponent.prototype.onRequestEndListener = function (event) {
        this.liveRequestsCount--;
        if (this.liveRequestsCount <= 0) {
            this.liveRequestsCount = 0;
            this.reqloading = false;
        }
    };
    AppComponent.prototype.beforeunloadHandler = function (event) {
        //event.preventDefault();
        if (this.administrationService && !this.islogout) {
            this.administrationService.LogOff().subscribe(function (resultData) {
            });
        }
    };
    AppComponent.prototype.handleKeyboardEvents = function (event) {
        if (event && event.keyCode == 112) {
            this.isHelpFlag = true;
            this.isReportFlag = false;
            var isIE = /msie|Trident/.test(navigator.userAgent);
            if (isIE == true) {
                this.generalmenu = true;
                this.menusource = this.helpMenuSource;
                this.loadHelpView(this.currentModule, this);
                if ("onhelp" in window) {
                    window["onhelp"] = function () {
                        event.cancelBubble = true;
                        return false;
                    };
                }
            }
            else {
                event.stopPropagation();
                event.preventDefault();
                event.keyCode = 0;
                this.generalmenu = true;
                this.menusource = this.helpMenuSource;
                this.loadHelpView(this.currentModule, this);
                return false;
            }
        }
        else if (event && event.keyCode == 27) {
            if (this.mainMenuVisibility) {
                this.mainMenuVisibility = !this.mainMenuVisibility;
                this.overlayEnabled = false;
            }
            var RootClass = document.getElementsByClassName("dropdown-content");
            if (RootClass && RootClass.length > 0) {
                if (RootClass[0].style.display == "block") {
                    RootClass[0].style.display = "none";
                }
            }
        }
    };
    ;
    AppComponent.prototype.toggleMenu = function () {
        this.mainMenuVisibility = !this.mainMenuVisibility;
        if (this.mainMenuVisibility) {
            this.edited = true;
            this.overlayEnabled = true;
        }
        else {
            this.overlayEnabled = false;
        }
    };
    AppComponent.prototype.toggleListMenu = function ($event) {
        /*$event.stopPropagation();
        this.edited = !this.edited;*/
    };
    AppComponent.prototype.imagePath = function (value) {
        if (value == "admin") {
            return "Content/Icons/administration.png";
        }
        else if (value == "asbuilts") {
            return "Content/Layout/asbuilts_mainmenu_button.png";
        }
        else if (value == "employee") {
            return "Content/Layout/employees.png";
        }
        else if (value == "workorder") {
            return "Content/Images/workOrder.png";
        }
        else if (value == "space") {
            return "Content/Layout/space-icon.png";
        }
        else if (value == "documents") {
            return "Content/Layout/documentS.png";
        }
        else if (value == "assets") {
            return "Content/Images/asset.png";
        }
        else if (value == "scheduling") {
            return "Content/Images/scheduling.png";
        }
        else if (value == "realproperty") {
            return "Content/Images/realProperty.png";
        }
        else if (value == "furniture") {
            return "Content/Images/furniture.png";
        }
        else if (value == "projects") {
            return "Content/Images/projects.png";
        }
        else if (value == "electrical") {
            return "Content/Images/electricaL.png";
        }
        else if (value == "CAI") {
            return "Content/Images/caI.png";
        }
        else if (value == "fireandsafety") {
            return "Content/Images/fire_n_safetY.png";
        }
        else if (value == "mechanical") {
            return "Content/Images/mechanicaL.png";
        }
        else if (value == "plumbing") {
            return "Content/Images/plumbinG.png";
        }
        else if (value == "medicalgas") {
            return "Content/Images/medical_gaS.png";
        }
        else if (value == "securityassets") {
            return "Content/Images/security_assetS.png";
        }
        else if (value == "telecom") {
            return "Content/Images/telecoM.png";
        }
    };
    AppComponent.prototype.generalImagePath = function (value) {
        if (value == "Settings") {
            return "Content/Layout/settings_icon.png";
        }
        else if (value == "Logbook") {
            return "Content/Layout/logbook.png";
        }
        else if (value == "Reports") {
            return "Content/Layout/report_icon.png";
        }
        else if (value == "Import Data") {
            return "Content/Layout/import_data_icon.png";
        }
    };
    AppComponent.prototype.getDatasource = function (value) {
        var _this = this;
        if (value == "2")
            this._menuService.getChangemenu(value)
                .subscribe(function (menusource) { return _this.menusource = menusource; }, function (error) { return _this.errorMessage = error; });
        else if (value == "4")
            this._menuService.getChangemenu(value)
                .subscribe(function (menusource) { return _this.menusource = menusource; }, function (error) { return _this.errorMessage = error; });
        else
            this._menuService.getmenu(this.currentModule)
                .subscribe(function (menusource) { return _this.menusource = menusource; }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof router_1.NavigationStart) {
            /*this.loading = true;*/
            var contextObj = this;
            if (event != null) {
                if (event.url != null) {
                    if (event.url == "/personalsettingscancelled") {
                        contextObj._menuService.getmenu(contextObj.currentModule).subscribe(function (resultData) {
                            contextObj.loadDashboardView(contextObj.currentModule, contextObj);
                            contextObj.menusource = resultData["Data"];
                            contextObj.generalmenu = false;
                        });
                    }
                }
            }
        }
        if (event instanceof router_1.NavigationEnd) {
            /*this.loading = false;*/
            var contextObj = this;
            setTimeout(function () {
                //console.log("loginpageinside", $(".pageContent").find(".loginBody").length);
                if ($(".pageContent").find(".loginBody").length > 0) {
                    contextObj.onLogoutClick();
                }
            }, 2500);
        }
        /* Additionally there's NavigationCancel and NavigationError*/
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
        this.menuwidth = 0;
        this.populateModules();
        this.settingsMenuPreFetch();
        this.helpMenuPreFetch();
        this.isMobile = !window["IsMobile"];
        console.log("mobile flag", this.isMobile);
        //this.reportsMenuPreFetch();
        this.onfocusfunction();
        if (window["Pace"] != undefined && window["Pace"] != null) {
            if (window["Pace"]["options"] != undefined && window["Pace"]["options"] != null) {
                if (window["Pace"]["options"]["target"] != undefined && window["Pace"]["options"]["target"] != null) {
                    window["Pace"]["options"]["target"] = "base";
                    window["Pace"]["options"] = {
                        ajax: false,
                        restartOnRequestAfter: false
                    };
                }
            }
        }
    };
    AppComponent.prototype.populateModules = function () {
        var contextObj = this;
        if (this.checkMobileBrowser() == 1) {
            if (contextObj.allModules != null && contextObj.allModules.length > 0) {
                for (var i = 0; i < contextObj.allModules.length; i++) {
                    if (contextObj.allModules[i].id == 0) {
                        contextObj.allModules.splice(i, 1);
                        break;
                    }
                }
            }
        }
        this.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var accesibleModules = resultData["Data"];
            function checkModuleAccess(module) {
                return (accesibleModules.find(function (t) { return t.ModuleId == module.id; }) != undefined);
            }
            contextObj.modulesource = contextObj.allModules.filter(checkModuleAccess);
            if (accesibleModules.length != 0) {
                if (contextObj.modulesource.length > 0) {
                    contextObj.currentModule = contextObj.modulesource[0].id;
                    contextObj.currentModuleName = contextObj.modulesource[0].title;
                    contextObj.menusource = undefined;
                    contextObj.LoadModuleRoutes(contextObj.currentModule, 1).subscribe(function (t) {
                        contextObj._menuService.getmenu(contextObj.currentModule).subscribe(function (resultData) {
                            contextObj.loadDashboardView(contextObj.currentModule, contextObj);
                            contextObj.menusource = resultData["Data"];
                        });
                    });
                    contextObj.getReportMenuDetailsModuleWise();
                }
            }
        });
    };
    AppComponent.prototype.settingsMenuPreFetch = function () {
        var contextObj = this;
        this._menuService.getgeneralsettingssource(12).subscribe(function (resultData) {
            contextObj.settingsMenuSource = resultData["Data"];
        });
    };
    AppComponent.prototype.helpMenuPreFetch = function () {
        var contextObj = this;
        this.administrationService.getHelpMenuUrl().subscribe(function (resultData) {
            contextObj.helpMenuSource = resultData["Data"];
        });
    };
    AppComponent.prototype.reportsMenuPreFetch = function () {
        var contextObj = this;
        this._menuService.getgeneralsettingssource(11).subscribe(function (resultData) {
            if (contextObj.checkMobileBrowser() != 0 && resultData["Data"] != null && resultData["Data"].length > 0) {
                for (var k = 0; k < (resultData["Data"]).length; k++) {
                    if (resultData["Data"][k].id == 0) {
                        resultData["Data"].splice(k, 1);
                        break;
                    }
                }
            }
            contextObj.reportsMenuSource = resultData["Data"];
        });
    };
    AppComponent.prototype.LoadModuleRoutes = function (moduleId, menuType) {
        if (menuType == 1) {
            switch (moduleId) {
                case 0:
                    var adminroutes = new component_administration_routes_1.ComponentAdminRoute();
                    return adminroutes.configRoute();
                case 1:
                    var asbuiltsroutes = new component_asbuilts_routes_1.ComponentAsbuiltsRoute();
                    return asbuiltsroutes.configRoute();
                case 2:
                    var projectsroutes = new component_projects_routes_1.ComponentProjectsRoute();
                    return projectsroutes.configRoute();
                case 3:
                    var spaceroutes = new component_space_routes_1.ComponentSpaceRoute();
                    return spaceroutes.configRoute();
                case 4:
                    var documentroute = new component_documents_route_1.ComponentDocumentsRoute();
                    return documentroute.configRoute();
                case 5:
                    var employeeroutes = new component_employees_routes_1.ComponentEmployeeRoute();
                    return employeeroutes.configRoute();
                case 6:
                    var telecomroutes = new component_telecom_routes_1.ComponentTelecomRoute();
                    return telecomroutes.configRoute();
                case 7:
                    var assetroutes = new component_assets_routes_1.ComponentAssetsRoute();
                    return assetroutes.configRoute();
                case 8:
                    var furnitureroutes = new component_furniture_routes_1.ComponentFurnitureRoute();
                    return furnitureroutes.configRoute();
                case 9:
                    var woroutes = new component_workorder_routes_1.ComponentWorkorderRoute();
                    return woroutes.configRoute();
                case 11:
                    var exesummryroutes = new component_exesummary_routes_1.ComponentExecSummaryRoute();
                    return exesummryroutes.configRoute();
                case 12:
                    var CAIroutes = new component_CAI_routes_1.ComponentCAIRoute();
                    return CAIroutes.configRoute();
                case 14:
                    var schedulingroutes = new component_scheduling_routes_1.ComponentSchedulingRoute();
                    return schedulingroutes.configRoute();
                case 17:
                    var electricalroutes = new component_electrical_routes_1.ComponentElectricalRoute();
                    return electricalroutes.configRoute();
                case 18:
                    var firensafetyroutes = new component_fireandsafety_routes_1.ComponentFireandSafetyRoute();
                    return firensafetyroutes.configRoute();
                case 24:
                    var securityassetsroutes = new component_securityassets_routes_1.ComponentSecurityAssetsRoute();
                    return securityassetsroutes.configRoute();
                case 25:
                    var mechanicalroutes = new component_mechanical_routes_1.ComponentMechanicalRoute();
                    return mechanicalroutes.configRoute();
                case 26:
                    var plumbingroutes = new component_plumbing_routes_1.ComponentPlumbingRoute();
                    return plumbingroutes.configRoute();
                case 27:
                    var medicalgasroutes = new component_medicalgas_routes_1.ComponentMedicalGasRoute();
                    return medicalgasroutes.configRoute();
                case 30:
                    var rpmroutes = new component_rpm_routes_1.ComponentRPMRoute();
                    return rpmroutes.configRoute();
                default:
                    break;
            }
        }
        else if (menuType == 2) {
            var settingsroutes = new component_settings_route_1.ComponentSettingsRoute();
            return settingsroutes.configRoute();
        }
        else if (menuType == 3) {
            var reportsroutes = new component_reports_routes_1.ComponentReportsRoute();
            return reportsroutes.configRoute();
        }
        else if (menuType == 4) {
            var helpsroutes = new component_help_routes_1.ComponentHelpRoute();
            return helpsroutes.configRoute();
        }
    };
    AppComponent.prototype.onModuleClick = function (value, evt) {
        var _this = this;
        this.menuName = undefined;
        this.isReportFlag = false;
        this.isHelpFlag = false;
        var contextObj = this;
        this.generalmenu = true;
        this.currentModule = value;
        this.currentModuleName = this.allModules.find(function (t) { return t.id == _this.currentModule; }).title;
        this.pagepath = undefined;
        contextObj.menusource = undefined;
        this._menuService.getChangemenu(value).subscribe(function (resultData) {
            /*START --To hide query builder menu in mobile devices*/
            if (resultData["Data"] != null && window["IsMobile"] == true) {
                for (var i = 0; i < (resultData["Data"].length); i++) {
                    if (resultData["Data"][i].id == 126 ||
                        resultData["Data"][i].id == 127 ||
                        resultData["Data"][i].id == 133 ||
                        resultData["Data"][i].id == 130 ||
                        resultData["Data"][i].id == 128 ||
                        resultData["Data"][i].id == 129 ||
                        resultData["Data"][i].id == 132 ||
                        resultData["Data"][i].id == 131) {
                        resultData["Data"].splice(i, 1);
                        break;
                    }
                }
            }
            /*END ---To hide query builder menu in mobile devices*/
            if (contextObj.checkMobileBrowser() != 0 && value == 9 && resultData["Data"] != null) {
                for (var i = 0; i < (resultData["Data"][0]["subMenu"]).length; i++) {
                    if (resultData["Data"][0]["subMenu"][i].id = 24) {
                        resultData["Data"][0]["subMenu"].splice(i, 1);
                        break;
                    }
                }
            }
            contextObj.LoadModuleRoutes(contextObj.currentModule, 1).subscribe(function (t) {
                contextObj.loadDashboardView(contextObj.currentModule, contextObj);
                contextObj.menusource = resultData["Data"];
                contextObj.getReportMenuDetailsModuleWise();
            });
        });
        evt.preventDefault();
        this.overlayEnabled = false;
        this.onClickHideMenu(false);
    };
    AppComponent.prototype.loadDashboardView = function (currentModule, contextObj) {
        var loadDefaultURL = "";
        switch (currentModule) {
            case 0:
                loadDefaultURL = "/AdminDashboard";
                break;
            case 1:
                contextObj.administrationService.getIsModuleAdmin(1).subscribe(function (data) {
                    if (data["Data"] == true) {
                        loadDefaultURL = "/AsBuiltsDashboard";
                    }
                    else {
                        loadDefaultURL = "/asbuilts-drawings";
                    }
                    if (loadDefaultURL.length > 0) {
                        contextObj.router.navigateByUrl(loadDefaultURL);
                    }
                });
                break;
            case 2:
                loadDefaultURL = "/projects-dataList";
                break;
            case 3:
                contextObj.administrationService.getIsModuleAdmin(3).subscribe(function (data) {
                    if (data["Data"] == true) {
                        loadDefaultURL = "/SpaceDashboard";
                    }
                    else {
                        loadDefaultURL = "/space/drawings";
                    }
                    if (loadDefaultURL.length > 0) {
                        contextObj.router.navigateByUrl(loadDefaultURL);
                    }
                });
                //loadDefaultURL = "/Space/Drawings";
                break;
            case 4:
                contextObj.administrationService.getIsModuleAdmin(4).subscribe(function (data) {
                    if (data["Data"] == true) {
                        loadDefaultURL = "/DocumentDashBoard";
                        if (loadDefaultURL.length > 0) {
                            contextObj.router.navigateByUrl(loadDefaultURL);
                        }
                    }
                });
                break;
            case 5:
                contextObj.administrationService.getIsModuleAdmin(5).subscribe(function (data) {
                    if (data["Data"] == true) {
                        loadDefaultURL = "/EmpDashboard";
                    }
                    else {
                        loadDefaultURL = "/EmployeeDrawings";
                    }
                    if (loadDefaultURL.length > 0) {
                        contextObj.router.navigateByUrl(loadDefaultURL);
                    }
                });
                break;
            case 6:
                loadDefaultURL = "/telecom/drawings";
                break;
            case 7:
                contextObj.administrationService.getIsModuleAdmin(7).subscribe(function (data) {
                    if (data["Data"] == true) {
                        loadDefaultURL = "/AssetDashboard";
                    }
                    else {
                        loadDefaultURL = "/assets/drawings";
                    }
                    if (loadDefaultURL.length > 0) {
                        contextObj.router.navigateByUrl(loadDefaultURL);
                    }
                });
                break;
            case 8:
                contextObj.administrationService.getIsModuleAdmin(8).subscribe(function (data) {
                    if (data["Data"] == true) {
                        loadDefaultURL = "/FurnitureDashboard";
                    }
                    else {
                        loadDefaultURL = "/furniture/drawings";
                    }
                    if (loadDefaultURL.length > 0) {
                        contextObj.router.navigateByUrl(loadDefaultURL);
                    }
                });
                break;
            case 9:
                contextObj.administrationService.getIsModuleAdmin(9).subscribe(function (data) {
                    if (data["Data"] == true) {
                        loadDefaultURL = "/WorkOrderDashboard";
                        if (loadDefaultURL.length > 0) {
                            contextObj.router.navigateByUrl(loadDefaultURL);
                        }
                    }
                    else {
                        contextObj.administrationService.getSessionData().subscribe(function (data) {
                            var UsrRoleId = data["Data"]["UserRoleId"];
                            if (UsrRoleId == 8) {
                                loadDefaultURL = "/workorder-createrequest";
                            }
                            else {
                                loadDefaultURL = "/workorder-review";
                            }
                            if (loadDefaultURL.length > 0) {
                                contextObj.router.navigateByUrl(loadDefaultURL);
                            }
                        });
                    }
                });
                //WorkOrderDashboard
                //if (contextObj.userRoleId == 8) {
                //    loadDefaultURL = "/workorder-createrequest";
                //}
                //else {
                //    loadDefaultURL = "/workorder-review";
                //}
                break;
            case 12:
                loadDefaultURL = "/CAI/drawings";
                break;
            case 14:
                contextObj.administrationService.getIsModuleAdmin(14).subscribe(function (data) {
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
                        if (data["Data"] == true) {
                            //loadDefaultURL = "/SchedulingDashboard";
                            if (blnSeatEnabled) {
                                loadDefaultURL = "/reserveseats";
                            }
                            else if (blnRoomEnabled) {
                                loadDefaultURL = "/reserveroom";
                            }
                            else {
                                loadDefaultURL = "/scheduling/drawings";
                            }
                        }
                        else {
                            if (blnSeatEnabled) {
                                loadDefaultURL = "/reserveseats";
                            }
                            else if (blnRoomEnabled) {
                                loadDefaultURL = "/reserveroom";
                            }
                            else {
                                loadDefaultURL = "/scheduling/drawings";
                            }
                        }
                        if (loadDefaultURL.length > 0) {
                            contextObj.router.navigateByUrl(loadDefaultURL);
                        }
                    });
                });
                break;
            case 17:
                loadDefaultURL = "/electrical/drawings";
                break;
            case 18:
                loadDefaultURL = "/fireandsafety/drawings";
                break;
            case 24:
                loadDefaultURL = "/securityassets/drawings";
                break;
            case 25:
                loadDefaultURL = "/mechanical/drawings";
                break;
            case 26:
                loadDefaultURL = "/plumbing/drawings";
                break;
            case 27:
                loadDefaultURL = "/medicalgas/drawings";
                break;
            case 30:
                contextObj.administrationService.getIsModuleAdmin(30).subscribe(function (data) {
                    //debugger
                    if (data["Data"] == true) {
                        loadDefaultURL = "/RealPropertyDashBoard";
                    }
                    else {
                        loadDefaultURL = "/realproperty-lease";
                    }
                    if (loadDefaultURL.length > 0) {
                        contextObj.router.navigateByUrl(loadDefaultURL);
                    }
                });
                // loadDefaultURL = "/realproperty-lease";
                break;
            case 4:
                loadDefaultURL = "/Documents";
                if (loadDefaultURL.length > 0) {
                    contextObj.router.navigateByUrl(loadDefaultURL);
                }
                break;
            case 11:
                // contextObj.administrationService.getIsModuleAdmin(11).subscribe(function (data) {
                //if (data["Data"] == true) {
                //    loadDefaultURL = "/FurnitureDashboard";
                //}
                //else {
                //    loadDefaultURL = "/furniture/drawings";
                //}
                loadDefaultURL = "/ExecutiveSummaryDashBoard";
                if (loadDefaultURL.length > 0) {
                    contextObj.router.navigateByUrl(loadDefaultURL);
                }
                // });
                break;
            default:
                break;
        }
        if (loadDefaultURL.length > 0) {
            contextObj.router.navigateByUrl(loadDefaultURL);
        }
    };
    AppComponent.prototype.checkMobileBrowser = function () {
        var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
        var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
        var isWebOS = /webos/i.test(navigator.userAgent.toLowerCase());
        var isBlackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
        var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
        var isiPod = /ipod/i.test(navigator.userAgent.toLowerCase());
        var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
        var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
        if (isAndroid || isWindowsPhone || isWebOS || isBlackBerry || isiDevice || isiPod || isiPhone || isiPad) {
            window.IsMobile = true;
            this.releasenoteswidth = 350;
            return 1;
        }
        else {
            window.IsMobile = false;
            this.releasenoteswidth = 600;
            return 0;
        }
    };
    AppComponent.prototype.identifyBrowser = function () {
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        if (isSafari == true) {
            window.BrowserName = "Safari";
        }
        var isEdge = /Edge/.test(navigator.userAgent);
        if (isEdge == true) {
            window.BrowserName = "Edge";
        }
        var isIE = /msie|Trident/.test(navigator.userAgent);
        if (isIE == true) {
            window.BrowserName = "IE11";
            this.IE11Staus = true;
        }
        var isChrome = /Chrome/.test(navigator.userAgent);
        if (isChrome == true) {
            window.BrowserName = "Chrome";
        }
        var isFirefox = /Firefox/.test(navigator.userAgent);
        if (isFirefox == true) {
            window.BrowserName = "Firefox";
        }
    };
    AppComponent.prototype.onMenuClick = function () {
        this.menuwidth = 210;
    };
    AppComponent.prototype.closeNav = function () {
        this.menuwidth = 0;
    };
    AppComponent.prototype.onGeneralMenuClick = function (value, evt) {
        var _this = this;
        this.menuName = undefined;
        if (value == 2) {
            /*this.onClickHideMenu(true);*/
            this.menusource = [];
        }
        /*this.currentModule = 1;*/
        if (value == 0) {
            /*this.currentModule = 1;*/
            this.currentModuleName = this.allModules.find(function (t) { return t.id == _this.currentModule; }).title;
            var contextObj = this;
            contextObj.menusource = undefined;
            contextObj.LoadModuleRoutes(contextObj.currentModule, 2).subscribe(function (t) {
                if (contextObj.settingsMenuSource == undefined) {
                    var objRepeater = setInterval(function () {
                        if (contextObj.settingsMenuSource != undefined) {
                            contextObj.menusource = contextObj.settingsMenuSource;
                            clearInterval(objRepeater);
                        }
                    }, 200);
                }
                else {
                    contextObj.menusource = contextObj.settingsMenuSource;
                }
                /*this._menuService.getgeneralsettingssource(12).subscribe(function (resultData) {
                    contextObj.menusource = resultData["Data"];
                });*/
                contextObj.onClickHideMenu(false);
                contextObj.isReportFlag = false;
                contextObj.isHelpFlag = false;
                contextObj.loadGeneralSettingView(contextObj.currentModule, contextObj);
            });
        }
        else if (value == 11) {
            this.currentModuleName = this.allModules.find(function (t) { return t.id == _this.currentModule; }).title;
            var contextObj = this;
            contextObj.reportsMenuSource = undefined;
            contextObj.LoadModuleRoutes(contextObj.currentModule, 3).subscribe(function (t) {
                contextObj.reportsMenuPreFetch();
                contextObj.menusource = undefined;
                if (contextObj.reportsMenuSource == undefined) {
                    var objRepeater = setInterval(function () {
                        if (contextObj.reportsMenuSource != undefined) {
                            contextObj.menusource = contextObj.reportsMenuSource;
                            clearInterval(objRepeater);
                        }
                    }, 200);
                }
                else {
                    contextObj.menusource = contextObj.reportsMenuSource;
                }
                contextObj.onClickHideMenu(false);
                contextObj.isReportFlag = true;
                contextObj.isHelpFlag = false;
                if (contextObj.currentModule != 2)
                    contextObj.navigateDefaultReportUrl(contextObj);
            });
        }
        this.generalmenu = true;
        evt.preventDefault();
    };
    AppComponent.prototype.loadGeneralSettingView = function (currentModule, contextObj) {
        contextObj.administrationService.getIsModuleAdmin(this.currentModule).subscribe(function (data) {
            var loadDefaultURL = "";
            switch (currentModule) {
                case 0:
                    loadDefaultURL = "/general-settings";
                    break;
                case 1:
                    if ((contextObj.userRoleId != 6 && contextObj.userRoleId != 4 && contextObj.userRoleId != 7) || data["Data"] == true)
                        loadDefaultURL = "/setup-drawings";
                    break;
                case 2:
                    if (contextObj.userRoleId != 6 || data["Data"] == true) {
                        contextObj.currentModuleName = undefined;
                        contextObj.pagepath = undefined;
                        contextObj.lastpagepath = "Settings";
                        loadDefaultURL = "/projects-general-settings";
                    }
                    break;
                case 3:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/space-general-settings";
                    break;
                case 4:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/documents-generalsettings";
                    break;
                case 5:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/GeneralSettings";
                    break;
                case 6:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/telecom-general-settings";
                    break;
                case 7:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/assets-general-settings";
                    break;
                case 8:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/furniture-general-settings";
                    break;
                case 9:
                    if ((contextObj.userRoleId != 6 && contextObj.userRoleId != 4 && contextObj.userRoleId != 7) || data["Data"] == true)
                        loadDefaultURL = "/workorder/GeneralSettings";
                    break;
                case 11:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/exsummary-general-settings";
                    break;
                case 12:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/CAI-general-settings";
                    break;
                case 14:
                    if ((contextObj.userRoleId != 6 && contextObj.userRoleId != 4 && contextObj.userRoleId != 7) || data["Data"] == true)
                        loadDefaultURL = "/scheduling-general-settings";
                    else {
                        contextObj.currentModuleName = undefined;
                        contextObj.pagepath = undefined;
                        contextObj.lastpagepath = "Settings";
                    }
                    break;
                case 17:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/electrical-general-settings";
                    break;
                case 18:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/fireandsafety-general-settings";
                    break;
                case 24:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/securityassets-general-settings";
                    break;
                case 25:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/mechanical-general-settings";
                    break;
                case 26:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/plumbing-general-settings";
                    break;
                case 27:
                    if (contextObj.userRoleId != 6 || data["Data"] == true)
                        loadDefaultURL = "/medicalgas-general-settings";
                    break;
                case 30:
                    if ((contextObj.userRoleId != 6 && contextObj.userRoleId != 4 && contextObj.userRoleId != 7) || data["Data"] == true)
                        loadDefaultURL = "/realproperty-generalsettings";
                    break;
                default:
                    break;
            }
            if (loadDefaultURL.length > 0) {
                setTimeout(function () {
                    contextObj.router.navigateByUrl(loadDefaultURL);
                }, 100);
            }
        });
    };
    AppComponent.prototype.onChangeClick = function (obj) {
        var contextObj = this;
        this.administrationService.getcustomerlist().subscribe(function (resultData1) {
            contextObj.fieldDetails = resultData1["Data"];
        });
        this.width = 300;
        this.change = !this.change;
        this.showSlide = !this.showSlide;
    };
    AppComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
        this.showSlideVersionDetails = value.value;
    };
    AppComponent.prototype.versionDetailsOnClick = function () {
        this.width = 300;
        this.changeVersion = !this.changeVersion;
        this.showSlideVersionDetails = !this.showSlideVersionDetails;
    };
    AppComponent.prototype.onSubmitData = function (value) {
        var contextObj = this;
        var selectedId = JSON.parse(value.fieldobject)[0].Value;
        var list = contextObj.fieldDetails[0].LookupDetails.LookupValues.find(function (el) {
            return el.Id.toString() === selectedId;
        });
        if (list) {
            //active customer=2
            contextObj.administrationService.ChangeCrossSessionValue(2, JSON.parse(value.fieldobject)[0].Value).subscribe(function (resultData) {
                contextObj._notificationService.ShowToaster("Customer (" + list.Value + ") selected. Re-login after session expiry", 3);
                contextObj.showSlide = !contextObj.showSlide;
                setTimeout(function () {
                    if (this.IE11Staus == false) {
                        var baseUrl = window.document.baseURI;
                    }
                    else {
                        var baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
                    }
                    if (baseUrl.includes("undefined/")) {
                        baseUrl.replace("undefined/", "");
                    }
                    var logoutUrl = baseUrl + "/Account/LogOff";
                    window.location.href = logoutUrl;
                }, 2000);
            });
        }
    };
    AppComponent.prototype.onLogoutClick = function () {
        this.islogout = true;
        if (this.IE11Staus == false) {
            var baseUrl = window.document.baseURI;
        }
        else {
            var baseUrl = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/';
        }
        if (baseUrl.includes("undefined/")) {
            baseUrl.replace("undefined/", "");
        }
        var logoutUrl = baseUrl + "/Account/LogOff";
        window.location.href = logoutUrl;
    };
    AppComponent.prototype.onProfileClick = function () {
        var loadDefaultURL = "/administration-personalSettings";
        var contextObj = this;
        setTimeout(function () {
            contextObj.router.navigateByUrl(loadDefaultURL);
            //contextObj.settingsMenuSource = [];
            contextObj.menusource = [];
        }, 100);
    };
    AppComponent.prototype.onFeedbackClick = function () {
        // this._notificationService.ShowToaster("This feature will be available soon", 2);
        var loadDefaultURL = "/administration-feedback";
        var contextObj = this;
        setTimeout(function () {
            contextObj.router.navigateByUrl(loadDefaultURL);
            //contextObj.settingsMenuSource = [];
            contextObj.menusource = [];
        }, 100);
    };
    AppComponent.prototype.onHelpClick = function () {
        this.generalmenu = true;
        this.menusource = this.helpMenuSource;
        this.isHelpFlag = true;
        this.isReportFlag = false;
        this.loadHelpView(this.currentModule, this);
    };
    AppComponent.prototype.loadHelpView = function (currentModule, contextObj) {
        var _this = this;
        contextObj.LoadModuleRoutes(contextObj.currentModule, 4).subscribe(function (t) {
            contextObj.administrationService.getIsModuleAdmin(_this.currentModule).subscribe(function (data) {
                var loadDefaultURL = "";
                switch (currentModule) {
                    case 0:
                        loadDefaultURL = "/help/administartion/Dashboard";
                        break;
                    case 1:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/AsBuilts/Dashboard";
                        break;
                    case 2:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/projects/Data";
                        break;
                    case 3:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/space/Dashboard";
                        break;
                    case 5:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/employees/Dashboard";
                        break;
                    case 6:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/telecom/Dashboard";
                        break;
                    case 7:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/assets/Dashboard";
                        break;
                    case 8:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/furniture/Dashboard";
                        break;
                    case 9:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/workorder/Dashboard";
                        break;
                    case 12:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/scheduling/GeneralSettings";
                        break;
                    case 14:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/scheduling/GeneralSettings";
                        break;
                    case 17:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/furniture/Dashboard";
                        break;
                    case 18:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/furniture/Dashboard";
                        break;
                    case 24:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/securityassets/Dashboard";
                        break;
                    case 25:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/mechanical/Dashboard";
                        break;
                    case 26:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/plumbing/Dashboard";
                        break;
                    case 27:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/medicalgas/Dashboard";
                        break;
                    case 30:
                        if (contextObj.userRoleId != 6 || data["Data"] == true)
                            loadDefaultURL = "/help/rp/Dashboard";
                        break;
                    default:
                        break;
                }
                if (loadDefaultURL.length > 0) {
                    setTimeout(function () {
                        contextObj.router.navigateByUrl(loadDefaultURL);
                        console.log("loadDefaultURL", loadDefaultURL);
                    }, 100);
                }
            });
        });
    };
    AppComponent.prototype.onClickHideMenu = function (value, title) {
        if (value == true) {
            this.ishideMenu = true;
            this.mainMenuWidth = "0px";
            this.contentWidth = "100%";
            /*if (title == "Drawings") {
                this.Styles = { 'position': 'absolute', 'background': 'white', 'z-index': '100' }
                this.contentWidth = "100%";
                this.menuName = title;
            }
            else {
                if (this.menuName == "Drawings") {
                    this.Styles = { 'position': 'absolute', 'background': 'white', 'z-index': '100' };
                    this.contentWidth = "100%";
                }
                else {*/
            this.menuName = "";
            this.Styles = {};
        }
        else {
            this.ishideMenu = false;
            this.mainMenuWidth = '175px';
            this.contentWidth = '';
            /*if (title == "Drawings") {
                this.Styles = { 'position': 'absolute', 'background': 'white', 'z-index': '100' };
                this.contentWidth = "100%";
                this.menuName = title;
            }
            else {
                if (this.menuName == "Drawings" && title == undefined) {
                    this.Styles = { 'position': 'absolute', 'background': 'white', 'z-index': '100' };
                    this.contentWidth = "100%";
                }
                else {*/
            this.menuName = "";
            this.Styles = {};
        }
        setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
        }, 500);
    };
    AppComponent.prototype.onfocusfunction = function () {
        var RootClass = document.getElementById("modulemenu");
        RootClass.focus();
    };
    AppComponent.prototype.onmoduleiconKeyPress = function (Moduleid, Keyevent) {
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            this.onModuleClick(Moduleid, Keyevent);
        }
    };
    AppComponent.prototype.onfocusOutLogOut = function () {
        this.HideDropDown();
    };
    AppComponent.prototype.onmodulemenufocus = function (event) {
        this.HideDropDown();
    };
    AppComponent.prototype.onDropdownMouseout = function () {
        this.HideDropDown();
    };
    AppComponent.prototype.onDropdownMouseover = function () {
        var RootClass = document.getElementsByClassName("dropdown-content");
        if (RootClass && RootClass.length > 0) {
            if (RootClass[0].style.display == "none") {
                RootClass[0].style.display = "block";
            }
        }
    };
    AppComponent.prototype.HideDropDown = function () {
        var RootClass = document.getElementsByClassName("dropdown-content");
        if (RootClass && RootClass.length > 0) {
            if (RootClass[0].style.display == "block") {
                RootClass[0].style.display = "none";
            }
        }
    };
    AppComponent.prototype.onKeyPressEvent = function (Keyevent, target) {
        var key = Keyevent.keyCode || Keyevent.which;
        switch (target) {
            case 1:
                if (key == 13 || key == 32) {
                    this.toggleMenu();
                }
                break;
            case 2:
                var RootClass = document.getElementsByClassName("dropdown-content");
                if (key == 13) {
                    RootClass[0].style.display = "block";
                }
                break;
            case 3:
                if (key != 27 && key != 9) {
                    this.onProfileClick();
                }
                break;
            case 4:
                if (key != 27 && key != 9) {
                    this.onFeedbackClick();
                }
                break;
            case 5:
                if (key != 27 && key != 9) {
                    this.onHelpClick();
                }
                break;
        }
    };
    AppComponent.prototype.onKeyPressGeneralMenu = function (Keyevent, gmenu) {
        Keyevent.preventDefault();
        var key = Keyevent.keyCode || Keyevent.which;
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            if (gmenu.id == 2) {
                this.menusource = [];
                this.router.navigateByUrl(gmenu.path);
            }
            else {
                this.onGeneralMenuClick(gmenu.id, Keyevent);
            }
        }
    };
    AppComponent.prototype.getReportMenuDetailsModuleWise = function () {
        var contextObj = this;
        this.administrationService.getReportMenusbyModelwise(this.currentModule).subscribe(function (resultData) {
            if (resultData != undefined && resultData != null && resultData != "") {
                var temp = JSON.parse(resultData);
                contextObj.reportLoadDefaultURL = temp[0]["path"];
                this.isReportFlag = true;
                this.isHelpFlag = false;
            }
        });
    };
    AppComponent.prototype.navigateDefaultReportUrl = function (contextObj) {
        var loadDefaultURL = this.reportLoadDefaultURL;
        if (loadDefaultURL.length > 0) {
            setTimeout(function () {
                contextObj.router.navigateByUrl(loadDefaultURL);
            }, 100);
        }
    };
    //Update Email id for V5 users
    AppComponent.prototype.onSubmitEmailData = function (event) {
        var contextObj = this;
        this.administrationService.checkMailDomain(JSON.parse(event.fieldobject)[0].Value).subscribe(function (result) {
            if (result.Data) {
                contextObj.administrationService.UpdateEmailForUser((event.fieldobject)).subscribe(function (resultData) {
                    contextObj._notificationService.ShowToaster("Email Updated", 3);
                    contextObj.showUpdateEmailSlide = !contextObj.showUpdateEmailSlide;
                });
            }
            else {
                contextObj._notificationService.ShowToaster("Sender Email Domain is not added in iDrawings", 2);
            }
        });
    };
    AppComponent.prototype.closeEmailSlideDialog = function (value) {
        this.showUpdateEmailSlide = value.value;
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        this.onfocusfunction();
    };
    __decorate([
        core_1.HostListener('window:onRequestStart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "onRequestStartListener", null);
    __decorate([
        core_1.HostListener('window:onRequestEnd', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "onRequestEndListener", null);
    __decorate([
        core_1.HostListener('window:beforeunload', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "beforeunloadHandler", null);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'iDrawings',
            templateUrl: 'app/Views/Shared/_layout.html',
            styleUrls: ['app/Views/Shared/layout.css'],
            directives: [router_1.ROUTER_DIRECTIVES, menu_component_1.MenuComponent, page_component_1.PageComponent, slide_component_1.SlideComponent, fieldgeneration_component_1.FieldComponent, userlist_report_component_1.UserListComponent, releasenotes_component_1.ReleaseNotesComponent],
            providers: [http_1.HTTP_PROVIDERS, testservice_1.TestService, menu_service_1.MenuService, administration_service_1.AdministrationService, General_1.GeneralFunctions, notify_service_1.NotificationService, validation_service_1.ValidateService],
            host: {
                '(document:keydown)': 'handleKeyboardEvents($event)'
            }
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, administration_service_1.AdministrationService, validation_service_1.ValidateService, notify_service_1.NotificationService, General_1.GeneralFunctions, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
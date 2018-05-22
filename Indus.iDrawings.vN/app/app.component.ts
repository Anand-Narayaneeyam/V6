import { ROUTER_DIRECTIVES, Event as RouterEvent, Router, NavigationStart, NavigationEnd }  from '@angular/router';
import { Component, Inject, HostListener, AfterViewInit} from '@angular/core';
import {TestComponent} from './whatever/test/test.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {NgControl} from '@angular/common';
import {TestService} from './whatever/test2/testservice';
import { Http, Response} from '@angular/http';
import { MenuComponent } from './Framework/Whatever/Menu/menu.component';
import { MenuService} from './Framework/Models/Menu/menu.service';
import {PageComponent} from './Framework/Whatever/Page/page.component'
import { AdministrationService } from './Models/Administration/administration.service'
import 'rxjs/Rx';   /*( Load all features*/
import { SlideComponent} from './Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from './Models/Common/General';
import { FieldComponent } from './Framework/Whatever/DynamicControls/DynamicFields/fieldgeneration.component';
import {UserListComponent} from './Whatever/Administration/UserListReport/userlist.report.component';
import { NotificationService } from './Framework/Models/Notification/notify.service';
import {ComponentAdminRoute} from './component.administration.routes';
import {ComponentAsbuiltsRoute} from './component.asbuilts.routes';
import {ComponentSpaceRoute} from './component.space.routes';
import {ComponentProjectsRoute} from './component.projects.routes';
import {ComponentEmployeeRoute} from './component.employees.routes';
import {ComponentAssetsRoute} from './component.assets.routes';
import {ComponentFurnitureRoute} from './component.furniture.routes';
import {ComponentWorkorderRoute} from './component.workorder.routes';
import {ComponentRPMRoute} from './component.rpm.routes';
import {ComponentSchedulingRoute} from './component.scheduling.routes';
import {ComponentSettingsRoute} from './component.settings.route';
import {ComponentReportsRoute} from './component.reports.routes';
import {ComponentHelpRoute} from './component.help.routes';
import {ComponentDocumentsRoute} from './component.documents.route'
import {ComponentCAIRoute} from './component.CAI.routes';
import {ComponentElectricalRoute} from './component.electrical.routes'
import {ComponentFireandSafetyRoute} from './component.fireandsafety.routes';

import {ComponentMechanicalRoute} from './component.mechanical.routes';
import {ComponentPlumbingRoute} from './component.plumbing.routes';
import {ComponentMedicalGasRoute} from './component.medicalgas.routes';
import {ComponentSecurityAssetsRoute} from './component.securityassets.routes';
import {ComponentTelecomRoute} from './component.telecom.routes';
import { ValidateService } from './Framework/Models/Validation/validation.service';
import {ComponentExecSummaryRoute} from './component.exesummary.routes';
import {IField} from './Framework/Models//Interface/IField';
import {ReleaseNotesComponent} from './Whatever/Administration/ReleaseNotes/releasenotes.component';

@Component({
    selector: 'iDrawings',
    templateUrl: 'app/Views/Shared/_layout.html',
    styleUrls: ['app/Views/Shared/layout.css'],
    directives: [ROUTER_DIRECTIVES, MenuComponent, PageComponent, SlideComponent, FieldComponent, UserListComponent, ReleaseNotesComponent],
    providers: [HTTP_PROVIDERS, TestService, MenuService, AdministrationService, GeneralFunctions, NotificationService, ValidateService],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})

export class AppComponent implements AfterViewInit {
    errorMessage: string;
    menuwidth = 0;
    currentModule = 0;
    edited = true;
    IE11Staus = false;
    menusource: any;
    generalmenu = true;
    isReportFlag = false;
    isHelpFlag = false;
    reportLoadDefaultURL = "";
    pagepath: any;
    lastpagepath: any;
    generalMenu: any[];
    modulesource: any[];
    allmenusource: any[];
    myVar: boolean = true;
    public userName: string = "Stefano";
    public customerName: string = "";
    fieldDetails: any;
    Position = "top-right";
    width = 300;
    change = false;
    changeVersion = false;
    showSlide = false;
    showSlideVersionDetails = false;
    btnName = "Select";
    loading: boolean = false;
    reqloading: boolean = false;
    mainMenuVisibility: boolean = false;
    overlayEnabled: boolean = false;
    loggedInUserDetails: any;
    settingsMenuSource: any;
    helpMenuSource: any;
    reportsMenuSource: any;
    ishideMenu = false;
    mainMenuWidth = "175px"
    contentWidth = '';
    Styles: any;
    menuName: any;
    ssoEnable: any;
    userRoleId: any;
    UserAccessLevelId: any;
    minorVersion: string = "V6.0.0 (23 Feb 2018)";
    islogout: boolean = false;
    emailFieldObject: IField;
    public validationData;
    showUpdateEmailSlide = false;
    isMobile: boolean = true;
    releasenoteswidth = 350;
    allModules = [
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
    liveRequestsCount: number = 0;
    @HostListener('window:onRequestStart', ['$event'])
    onRequestStartListener(event) {
        this.liveRequestsCount++;
        if (this.liveRequestsCount == 1) {
            this.reqloading = true;
        }
    }
    @HostListener('window:onRequestEnd', ['$event'])
    onRequestEndListener(event) {
        this.liveRequestsCount--;
        if (this.liveRequestsCount <= 0) {
            this.liveRequestsCount = 0;
            this.reqloading = false;
        }
    }

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        //event.preventDefault();
        if (this.administrationService && !this.islogout) {
            this.administrationService.LogOff().subscribe(function (resultData) {
            });
        }
    }

    handleKeyboardEvents(event: KeyboardEvent) {

        if (event && event.keyCode == 112) { //F1
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
        else if (event && event.keyCode == 27) {//esc
            if (this.mainMenuVisibility) {
                this.mainMenuVisibility = !this.mainMenuVisibility;
                this.overlayEnabled = false;
            }
            var RootClass: any = document.getElementsByClassName("dropdown-content");
            if (RootClass && RootClass.length > 0) {
                if (RootClass[0].style.display == "block") {
                    RootClass[0].style.display = "none";
                }
            }
        }
    }

    currentModuleName: string = this.allModules.find(t => t.id == this.currentModule).title;;
    toggleMenu() {

        this.mainMenuVisibility = !this.mainMenuVisibility;
        if (this.mainMenuVisibility) {
            this.edited = true;
            this.overlayEnabled = true;
        } else {
            this.overlayEnabled = false;
        }
    }
    toggleListMenu($event) {
        /*$event.stopPropagation();
        this.edited = !this.edited;*/
    }
    overlayClick = function () {
        this.overlayEnabled = false;
        this.mainMenuVisibility = false;
    }
    imagePath(value: any) {
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

    }
    generalImagePath(value: any) {
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
    }

    constructor(private _menuService: MenuService, private administrationService: AdministrationService, private _validateService: ValidateService, private _notificationService: NotificationService, private getData: GeneralFunctions, public router: Router) {
        this._validateService.getBlacklist().subscribe(resultData => this.validationData = resultData);
        this._menuService.getAllDatasource()
            .subscribe(
            allmenusource => this.allmenusource = allmenusource,
            error => this.errorMessage = <any>error);
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
                                    if (accesibleModules.find(t => t.ModuleId == 3) != undefined) {
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
                                    if (accesibleModules.find(t => t.ModuleId == 3) != undefined) {
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
                                    if (accesibleModules.find(t => t.ModuleId == 3) != undefined) {
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
                                    if (accesibleModules.find(t => t.ModuleId == 3) != undefined) {
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

    getDatasource(value: string) {
        if (value == "2")
            this._menuService.getChangemenu(value)
                .subscribe(
                menusource => this.menusource = menusource,
                error => this.errorMessage = <any>error);
        else if (value == "4")
            this._menuService.getChangemenu(value)
                .subscribe(
                menusource => this.menusource = menusource,
                error => this.errorMessage = <any>error);
        else
            this._menuService.getmenu(this.currentModule)
                .subscribe(
                menusource => this.menusource = menusource,
                error => this.errorMessage = <any>error);

    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
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
        if (event instanceof NavigationEnd) {
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
    }
    ngOnInit() {
        this.router.events.subscribe((event: RouterEvent): void => {
            this.navigationInterceptor(event);
        });
        this.menuwidth = 0;
        this.populateModules();
        this.settingsMenuPreFetch();
        this.helpMenuPreFetch();
        this.isMobile = !window["IsMobile"]
        console.log("mobile flag", this.isMobile)

        //this.reportsMenuPreFetch();
        this.onfocusfunction();
        if (window["Pace"] != undefined && window["Pace"] != null) {
            if (window["Pace"]["options"] != undefined && window["Pace"]["options"] != null) {
                if (window["Pace"]["options"]["target"] != undefined && window["Pace"]["options"]["target"] != null) {
                    window["Pace"]["options"]["target"] = "base";
                    window["Pace"]["options"] = {
                        ajax: false,
                        restartOnRequestAfter: false
                    }
                }
            }
        }

    }
    populateModules() {
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
                return (accesibleModules.find(t => t.ModuleId == module.id) != undefined);
            }
            contextObj.modulesource = contextObj.allModules.filter(checkModuleAccess);
            if (accesibleModules.length != 0) {
                if (contextObj.modulesource.length > 0) {
                    contextObj.currentModule = contextObj.modulesource[0].id;
                    contextObj.currentModuleName = contextObj.modulesource[0].title;
                    contextObj.menusource = undefined;
                    contextObj.LoadModuleRoutes(contextObj.currentModule, 1).subscribe(t => {
                        contextObj._menuService.getmenu(contextObj.currentModule).subscribe(function (resultData) {
                            contextObj.loadDashboardView(contextObj.currentModule, contextObj);
                            contextObj.menusource = resultData["Data"];
                        });
                    });
                    contextObj.getReportMenuDetailsModuleWise();

                }
            }
        });
    }
    settingsMenuPreFetch() {
        var contextObj = this;
        this._menuService.getgeneralsettingssource(12).subscribe(function (resultData) {
            contextObj.settingsMenuSource = resultData["Data"];
        });
    }
    helpMenuPreFetch() {
        var contextObj = this;
        this.administrationService.getHelpMenuUrl().subscribe(function (resultData) {
            contextObj.helpMenuSource = resultData["Data"];
        });
    }
    reportsMenuPreFetch() {

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
    }
    LoadModuleRoutes(moduleId: number, menuType: number) {/*1:Main Module Menu, 2: Settings Menu,3:Reports Menu,4:Help Menu*/

        if (menuType == 1) {
            switch (moduleId) {
                case 0:
                    let adminroutes = new ComponentAdminRoute();
                    return adminroutes.configRoute();
                case 1:
                    let asbuiltsroutes = new ComponentAsbuiltsRoute();
                    return asbuiltsroutes.configRoute();
                case 2:
                    let projectsroutes = new ComponentProjectsRoute();
                    return projectsroutes.configRoute();
                case 3:
                    let spaceroutes = new ComponentSpaceRoute();
                    return spaceroutes.configRoute();
                case 4:
                    let documentroute = new ComponentDocumentsRoute();
                    return documentroute.configRoute();
                case 5:
                    let employeeroutes = new ComponentEmployeeRoute();
                    return employeeroutes.configRoute();
                case 6:
                    let telecomroutes = new ComponentTelecomRoute();
                    return telecomroutes.configRoute();
                case 7:
                    let assetroutes = new ComponentAssetsRoute();
                    return assetroutes.configRoute();
                case 8:
                    let furnitureroutes = new ComponentFurnitureRoute();
                    return furnitureroutes.configRoute();
                case 9:
                    let woroutes = new ComponentWorkorderRoute();
                    return woroutes.configRoute();
                case 11:
                    let exesummryroutes = new ComponentExecSummaryRoute();
                    return exesummryroutes.configRoute();
                case 12:
                    let CAIroutes = new ComponentCAIRoute();
                    return CAIroutes.configRoute();
                case 14:
                    let schedulingroutes = new ComponentSchedulingRoute();
                    return schedulingroutes.configRoute();
                case 17:
                    let electricalroutes = new ComponentElectricalRoute();
                    return electricalroutes.configRoute();
                case 18:
                    let firensafetyroutes = new ComponentFireandSafetyRoute();
                    return firensafetyroutes.configRoute();
                case 24:
                    let securityassetsroutes = new ComponentSecurityAssetsRoute();
                    return securityassetsroutes.configRoute();
                case 25:
                    let mechanicalroutes = new ComponentMechanicalRoute();
                    return mechanicalroutes.configRoute();
                case 26:
                    let plumbingroutes = new ComponentPlumbingRoute();
                    return plumbingroutes.configRoute();
                case 27:
                    let medicalgasroutes = new ComponentMedicalGasRoute();
                    return medicalgasroutes.configRoute();
                case 30:
                    let rpmroutes = new ComponentRPMRoute();
                    return rpmroutes.configRoute();
                default:
                    break;
            }
        } else if (menuType == 2) {
            let settingsroutes = new ComponentSettingsRoute();
            return settingsroutes.configRoute();
        }
        else if (menuType == 3) {
            let reportsroutes = new ComponentReportsRoute();
            return reportsroutes.configRoute();
        }
        else if (menuType == 4) {
            let helpsroutes = new ComponentHelpRoute();
            return helpsroutes.configRoute();
        }

    }
    onModuleClick(value: any, evt: any) {
        this.menuName = undefined;
        this.isReportFlag = false;
        this.isHelpFlag = false;
        var contextObj = this;
        this.generalmenu = true;
        this.currentModule = value;
        this.currentModuleName = this.allModules.find(t => t.id == this.currentModule).title;
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
            contextObj.LoadModuleRoutes(contextObj.currentModule, 1).subscribe(t => {
                contextObj.loadDashboardView(contextObj.currentModule, contextObj);
                contextObj.menusource = resultData["Data"];
                contextObj.getReportMenuDetailsModuleWise();
            });

        });
        evt.preventDefault();
        this.overlayEnabled = false;
        this.onClickHideMenu(false);
    }
    loadDashboardView(currentModule: number, contextObj: any) {
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
                        for (let i = 0; i < customerFeatureobj.length; i++) {
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
    }

    checkMobileBrowser() { /*Check for Mobile Devices*/

        var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
        var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
        var isWebOS = /webos/i.test(navigator.userAgent.toLowerCase());
        var isBlackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
        var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
        var isiPod = /ipod/i.test(navigator.userAgent.toLowerCase());
        var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
        var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());

        if (isAndroid || isWindowsPhone || isWebOS || isBlackBerry || isiDevice || isiPod || isiPhone || isiPad) {
            (<any>window).IsMobile = true;
            this.releasenoteswidth = 350;
            return 1;
        }
        else {
            (<any>window).IsMobile = false;
            this.releasenoteswidth = 600;
            return 0;
        }


    }

    identifyBrowser() { /*To identity browser*/
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        if (isSafari == true) {
            (<any>window).BrowserName = "Safari";
        }
        var isEdge = /Edge/.test(navigator.userAgent);
        if (isEdge == true) {
            (<any>window).BrowserName = "Edge";
        }
        var isIE = /msie|Trident/.test(navigator.userAgent);
        if (isIE == true) {
            (<any>window).BrowserName = "IE11";
            this.IE11Staus = true;
        }
        var isChrome = /Chrome/.test(navigator.userAgent);
        if (isChrome == true) {
            (<any>window).BrowserName = "Chrome";
        }
        var isFirefox = /Firefox/.test(navigator.userAgent);
        if (isFirefox == true) {
            (<any>window).BrowserName = "Firefox";
        }
    }

    onMenuClick() {
        this.menuwidth = 210;

    }
    closeNav() {
        this.menuwidth = 0;
    }

    onGeneralMenuClick(value: any, evt: any) {
        this.menuName = undefined;
        if (value == 2) {
            /*this.onClickHideMenu(true);*/
            this.menusource = [];
        }
        /*this.currentModule = 1;*/
        if (value == 0) {
            /*this.currentModule = 1;*/
            this.currentModuleName = this.allModules.find(t => t.id == this.currentModule).title;
            var contextObj = this;
            contextObj.menusource = undefined;
            contextObj.LoadModuleRoutes(contextObj.currentModule, 2).subscribe(t => {
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
                contextObj.loadGeneralSettingView(contextObj.currentModule, contextObj)
            });
        }
        else if (value == 11) {
            this.currentModuleName = this.allModules.find(t => t.id == this.currentModule).title;
            var contextObj = this;
            contextObj.reportsMenuSource = undefined;
            contextObj.LoadModuleRoutes(contextObj.currentModule, 3).subscribe(t => {
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
    }

    loadGeneralSettingView(currentModule: number, contextObj: any) {/*This is a temporary work around instead of dashboard*/
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
    }

    onChangeClick(obj: any) {
        var contextObj = this;
        this.administrationService.getcustomerlist().subscribe(function (resultData1) {
            contextObj.fieldDetails = resultData1["Data"];
        });
        this.width = 300;
        this.change = !this.change;
        this.showSlide = !this.showSlide;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
        this.showSlideVersionDetails = value.value;
    }
    versionDetailsOnClick() {
        this.width = 300;
        this.changeVersion = !this.changeVersion;
        this.showSlideVersionDetails = !this.showSlideVersionDetails;
    }

    onSubmitData(value: any) {

        var contextObj = this;
        var selectedId = JSON.parse(value.fieldobject)[0].Value;
        var list = contextObj.fieldDetails[0].LookupDetails.LookupValues.find(function (el) {
            return el.Id.toString() === selectedId
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
    }
    onLogoutClick() {
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
    }

    onProfileClick() {
        var loadDefaultURL = "/administration-personalSettings";
        var contextObj = this;
        setTimeout(function () {
            contextObj.router.navigateByUrl(loadDefaultURL);
            //contextObj.settingsMenuSource = [];
            contextObj.menusource = [];
        }, 100);
    }

    onFeedbackClick() {
        // this._notificationService.ShowToaster("This feature will be available soon", 2);
        var loadDefaultURL = "/administration-feedback";
        var contextObj = this;
        setTimeout(function () {
            contextObj.router.navigateByUrl(loadDefaultURL);
            //contextObj.settingsMenuSource = [];
            contextObj.menusource = [];
        }, 100);
    }

    onHelpClick() {

        this.generalmenu = true;
        this.menusource = this.helpMenuSource;
        this.isHelpFlag = true;
        this.isReportFlag = false;
        this.loadHelpView(this.currentModule, this)
    }
    loadHelpView(currentModule: number, contextObj: any) {/*This is a temporary work around instead of dashboard*/
        contextObj.LoadModuleRoutes(contextObj.currentModule, 4).subscribe(t => {
            contextObj.administrationService.getIsModuleAdmin(this.currentModule).subscribe(function (data) {
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
                    case 12://Change CAI
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
    }

    onClickHideMenu(value: any, title?: any) {
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
            /* }
         }*/
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
            /*}
        }*/
        }
        setTimeout(function () {
            window.dispatchEvent(new Event("resize"));
        }, 500);
    }
    onfocusfunction() { /*508 Compliance*/
        var RootClass: any = document.getElementById("modulemenu");
        RootClass.focus();
    }

    onmoduleiconKeyPress(Moduleid: any, Keyevent: any) { /*508 Compliance*/
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            this.onModuleClick(Moduleid, Keyevent);
        }
    }

    onfocusOutLogOut() { /*508 Compliance*/
        this.HideDropDown();
    }

    onmodulemenufocus(event) { /*508 Compliance*/
        this.HideDropDown();
    }
    onDropdownMouseout() {
        this.HideDropDown();
    }
    onDropdownMouseover() {
        var RootClass: any = document.getElementsByClassName("dropdown-content");
        if (RootClass && RootClass.length > 0) {
            if (RootClass[0].style.display == "none") {
                RootClass[0].style.display = "block";
            }
        }
    }

    HideDropDown() {
        var RootClass: any = document.getElementsByClassName("dropdown-content");
        if (RootClass && RootClass.length > 0) {
            if (RootClass[0].style.display == "block") {
                RootClass[0].style.display = "none";
            }
        }
    }



    onKeyPressEvent(Keyevent, target) { /*508 Compliance*/
        var key = Keyevent.keyCode || Keyevent.which;
        switch (target) {
            case 1:
                if (key == 13 || key == 32) {
                    this.toggleMenu();
                }
                break;
            case 2:
                var RootClass: any = document.getElementsByClassName("dropdown-content");
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
    }

    onKeyPressGeneralMenu(Keyevent, gmenu) {/*508 Compliance*/
        Keyevent.preventDefault();
        var key = Keyevent.keyCode || Keyevent.which;
        if (Keyevent.keyCode == 13 || Keyevent.keyCode == 32) {
            if (gmenu.id == 2) {
                this.menusource = [];
                this.router.navigateByUrl(gmenu.path);
            } else {
                this.onGeneralMenuClick(gmenu.id, Keyevent);
            }
        }
    }
    getReportMenuDetailsModuleWise() {
        var contextObj = this;
        this.administrationService.getReportMenusbyModelwise(this.currentModule).subscribe(function (resultData) {
            if (resultData != undefined && resultData != null && resultData != "") {
                var temp = JSON.parse(resultData);
                contextObj.reportLoadDefaultURL = temp[0]["path"];
                this.isReportFlag = true;
                this.isHelpFlag = false;
                // contextObj.defaultUrl = temp[0]["path"];
                // contextObj.submenuItem = temp[0];
            }
        });

    }
    navigateDefaultReportUrl(contextObj) {
        var loadDefaultURL = this.reportLoadDefaultURL;
        if (loadDefaultURL.length > 0) {
            setTimeout(function () {
                contextObj.router.navigateByUrl(loadDefaultURL);
            }, 100);
        }
    }
    //Update Email id for V5 users
    onSubmitEmailData(event: any) {
        var contextObj = this;
        this.administrationService.checkMailDomain(JSON.parse(event.fieldobject)[0].Value).subscribe(function (result) {

            if (result.Data) {
                contextObj.administrationService.UpdateEmailForUser((event.fieldobject)).subscribe(function (resultData) {
                    contextObj._notificationService.ShowToaster("Email Updated", 3);
                    contextObj.showUpdateEmailSlide = !contextObj.showUpdateEmailSlide;
                });

            } else {
                contextObj._notificationService.ShowToaster("Sender Email Domain is not added in iDrawings", 2);
            }
        });
    }
    closeEmailSlideDialog(value: any) {
        this.showUpdateEmailSlide = value.value;

    }
    ngAfterViewInit() {/*508 Compliance*/
        this.onfocusfunction();
    }
}
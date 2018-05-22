import { Component, Input, OnChanges, OnInit, SimpleChange, ViewChild, Output, EventEmitter} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MenuService} from '../../Models/Menu/menu.service';
import {IField} from '../../Models/Interface/IField';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import { AdministrationService } from '../../../Models/Administration/administration.service'

@Component({
    selector: 'main-menu',
    directives: [ROUTER_DIRECTIVES, SectionComponent],
    templateUrl: 'app/Framework/Views/Menu/menutemplate.html',
    providers: [HTTP_PROVIDERS, MenuService, AdministrationService],
    styleUrls: ['app/Framework/Views/Menu/menustyle.css'],
    inputs: ["menusource", "type"]
})

export class MenuComponent {
    @Input() generalmenu;
    @Input() currentModule;
    @Input() menusource;
    @Output() hideMenu = new EventEmitter();
    @Input() ishideMenu;
    @Input() isReportFlag;
    @Input() isHelpFlag; 
    @Input() reportLoadDefaultURL;
    errorMessage: string;
    opened: Boolean = false;
    @Input() menuName;
    submenuItem: IField;
    defaultUrl: any;
    isExpandedArray: any[];
    thirdLevelMenuItems: any[];
    thirdLevelMenuCaption: string;
    thirdLevelMenuExpansion: boolean = true;
    expandIcon: string = "Content/Images/arrows_right.png";
    hideIcon: string = "Content/Images/arrows_left.png";
    constructor(private _menuService: MenuService, private administrationService: AdministrationService) {

    }

    ngOnChanges(changes: SimpleChange) {
        
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
                                            return true
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
                case 6://telecom
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/telecom/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/telecom-general-settings";
                    break; 
                case 18://fire and safety
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/telecom/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/fireandsafety-general-settings";
                    break; 
                case 24://security assets
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/securityassets/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/securityassets-general-settings";
                    break; 
                case 25://mechanical
                    if (this.isHelpFlag == true && this.isReportFlag == false)
                        loadDefaultURL = "/help/mechanical/Dashboard";
                    else if (this.isHelpFlag == false && this.isReportFlag == true)
                        loadDefaultURL = this.reportLoadDefaultURL;
                    else
                        loadDefaultURL = "/mechanical-general-settings";
                    break; 
                case 26://plumbing   
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

        if (this.menusource != undefined && this.isExpandedArray.length == 0)
        {
            this.menusource.filter(function (el) {
                if (el["subMenu"].length != 0) {
                    el["subMenu"].filter(function (el2) {
                        if (el2["path"] == contextObj.defaultUrl)
                        {
                            contextObj.submenuItem = el2;
                        }
                        return true
                    });
                }
            });
        }
        if (changes["menusource"]) {
            var isExpanded = new Array<isExpandedArray>();
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
                    return true
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
        }
    onMenuClick(event: any) {
        let target = event.target || event.srcElement || event.currentTarget;
        let elemHide = open;
        if (target.nextElementSibling.style.display == 'none')
            target.nextElementSibling.style.display = 'block';
        else target.nextElementSibling.style.display = 'none';

    }

    closeVerticalMenu(event: any)
    {
        this.ishideMenu = !this.ishideMenu;
        this.hideMenu.emit({
            value: this.ishideMenu
        })  
    }

    onMainMenuClick(event: any)
    {
        //this.closeVerticalMenu(true);
        this.menuName = event.title;
        /*if (event=="Drawings")
        this.ishideMenu = !this.ishideMenu;*/
        this.hideMenu.emit({
                value: this.ishideMenu,
                menuName: event.title
            })
        if (event.subMenu != null) {
            if (this.thirdLevelMenuItems == null) {
                this.thirdLevelMenuCaption = event.title;
                this.thirdLevelMenuItems = event.subMenu;
            } else {
                if (this.thirdLevelMenuCaption == event.title) {
                    this.thirdLevelMenuCaption = "";
                    this.thirdLevelMenuItems = null;
                } else {
                    this.thirdLevelMenuCaption = event.title;
                    this.thirdLevelMenuItems = event.subMenu;
                }
            }
        } else {
            //if (this.thirdLevelMenuCaption == event.title) { //bugid 80793
                this.thirdLevelMenuCaption = "";
                this.thirdLevelMenuItems = null;
            //}
           
        }
    }
    onThirdMenuClick(event: any) {
        this.onMainMenuClick(event);
        this.thirdLevelMenuCaption = "";
        this.thirdLevelMenuItems = null;
    }

    onSelect(hero: IField): void {
        this.submenuItem = hero;
    }

    onSectionExpandChange(id: any)
    {
        var isExpanded = new Array<isExpandedArray>();
        this.isExpandedArray.filter(function (el) {
            if (el["id"] == id) {
                isExpanded.push({
                    id: el["id"],
                    isExpanded: true

                });
            }
            else
            {
                isExpanded.push({
                    id: el["id"],
                    isExpanded: false

                });
            }
            return true
        });
        this.isExpandedArray = isExpanded;
    }
    thirdLevelOverlayClick() {
        this.thirdLevelMenuItems = null;
    }
}

export interface isExpandedArray {
    id: number;
    isExpanded: any;
}



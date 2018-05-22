
import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {AddOrganizationalComponent} from './addorganizational-units.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {Directory} from '../../../Framework/Whatever/TreeView/directory.component';
import {TreeView } from '../../../Framework/Whatever/TreeView/treeview.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AccessToManyUsersComponent } from './../general settings/accestomanyusers.component';

@Component({
    selector: 'organizational-units',
    templateUrl: './app/Views/Administration/General Settings/organizational-units.component.html',
    directives: [AccessToManyUsersComponent, SlideComponent, SubMenu, GridComponent, PagingComponent, Notification, PageComponent, TreeView, ConfirmationComponent, AddOrganizationalComponent, SplitViewComponent, SectionComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService, ConfirmationService, GeneralFunctions]

})

export class OrganizationalUnitsComponent {
    Level: number;
    submenuSource = null;
    levelTitle: string;
    level1: string;
    selectedlvl: any;
    selectedIds: any;
    btnName: string = "Save Changes";
    action: string = "Add";
    showSecondaryView: boolean = false;
    fieldObject: IField[];
    pagePath = "Administration / Organizational Units";
    pageTitle: string;
    itemsSource: any[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    enableMenu: any[];
    width: any;
    types = false;
    change = false;
    showSlide = false;
    menuData: any;
    position = "top-right";
    levelNames: any[];
    deleteTtile = "";
    iscard = false;
    splitViewTarget: number = 0;
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private getData: GeneralFunctions) {
        var contextObj = this;
        contextObj.splitViewTarget = 0;
        this.administrationService.getOrganizationNamesForMenu().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                var fieldobj = new Array<subMenu>();
                contextObj.levelNames = [];
                JSON.parse(resultData["Data"].FieldBinderData).filter(function (el) {
                    contextObj.levelNames.push(el.Value);
                    fieldobj.push({
                        id: el.Id,
                        path: el.Value,
                        image: el.Value,
                        title: el.Value
                    });
                });
                contextObj.levelNames;
              
                contextObj.submenuSource = fieldobj;

                contextObj.menuData = [
                    {
                        "id": 0,
                        "title": "Add",
                        "image": "Add",
                        "path": "Add",
                        "subMenu": contextObj.submenuSource
                    },
                    {
                        "id": 6,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                    },
                    {
                        "id": 7,
                        "title": "Delete",
                        "image": "Delete",
                        "path": "Delete",
                    },
                    {
                        "id": 8,
                        "title": "Access Organizational Unit to Many Users",
                        "image": "Access",
                        "path": "Access",
                    }
                ];
            }
        });

        this.administrationService.getOrganizationalUnitsData().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.itemsSource = contextObj.convertJsonToTreeViewFormat(resultData, false);
                contextObj.itemsSource = contextObj.itemsSource[0];
                if (contextObj.itemsSource.length <= 0) {
                    contextObj.iscard = true;
                    if (contextObj.levelNames.length == 0) {
                        contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
                        contextObj.enableMenu = [];
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No Organizational Units exist", 2);
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5];
                    
                    }
                }
                else {
                    contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                    contextObj.iscard = true;
                    //contextObj.enableMenu = [0,6,7];
                }
            }
        });

    }

    ngOnInit() {
        this.selectedIds = [];

    }

    OnSuccessfulSubmi(event: any) {
        var contextObj = this;
        if (event.type == "add") {
            this.administrationService.addOrganizationalUnitsFields(event.fieldobject).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"].Message == "Success") {
                        contextObj.administrationService.getOrganizationalUnitsData().subscribe(function (resultData1) {
                            if (contextObj.getData.checkForUnhandledErrors(resultData1)) {
                                contextObj.itemsSource = contextObj.convertJsonToTreeViewFormat(resultData1, false);
                                contextObj.itemsSource = contextObj.itemsSource[0];
                                contextObj.notificationService.ShowToaster(contextObj.levelTitle + " added", 3);
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                contextObj.showSecondaryView = contextObj.splitviewInput.showSecondaryView;
                                contextObj.selectedIds = [];
                                contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                                contextObj.iscard = true;
                            }
                        });
                    }
                    else {
                        contextObj.notificationService.ShowToaster(contextObj.levelTitle + " already exists", 5);
                    }
                }
            });
            //contextObj.enableMenu = [0,6,7];
        }
        else {

            this.administrationService.updateOrganizationalUnitsFields(this.selectedIds, event.fieldobject).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    if (resultData["Data"].Message == "Success") {
                        contextObj.administrationService.getOrganizationalUnitsData().subscribe(function (resultData1) {
                            contextObj.itemsSource = contextObj.convertJsonToTreeViewFormat(resultData1, false);
                            contextObj.itemsSource = contextObj.itemsSource[0];
                            contextObj.notificationService.ShowToaster(contextObj.levelNames[contextObj.selectedlvl - 1] + " updated", 3);
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            contextObj.showSecondaryView = contextObj.splitviewInput.showSecondaryView;
                            contextObj.selectedIds = [];
                        });
                    }
                    else {
                        if (resultData["Data"].ServerId == -1)
                            contextObj.notificationService.ShowToaster(contextObj.levelNames[contextObj.selectedlvl - 1] + " already exists", 5);
                        else
                            contextObj.notificationService.ShowToaster(contextObj.levelNames[contextObj.selectedlvl - 1] + " Code already exists", 5);
                    }
                }
            });

        }
    }

    onSelectedIds(event: any) {
        var contextObj = this;
        contextObj.selectedIds = [];
        contextObj.selectedlvl = [];
        contextObj.selectedIds.push(event.Id);
        if (contextObj.selectedIds.length > 0) {
            contextObj.selectedIds = event.Id;
            contextObj.selectedlvl = event.lvl;
        }
        else {
            this.selectedIds = 0;
            this.selectedlvl = 0;
        }
    }

    okDelete(event: any) {
        var contextObj = this;
        this.administrationService.deleteOrganizationalUnits(this.selectedIds).subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                contextObj.change = !contextObj.change;
                contextObj.showSlide = !contextObj.showSlide;
                if (resultData["Data"].ServerId != 0) {
                    switch (resultData["Data"].ServerId) {
                        case 6:
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Document'", 2);
                            break;
                        case 7:
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Employee'", 2);;
                            break;
                        case 8:
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Administration'", 2);
                            break;
                        case 9:
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Space'", 2);;
                            break;
                        case 10:
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Work Order'", 2);;
                            break;
                        default:
                            contextObj.notificationService.ShowToaster(" Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted since " + contextObj.levelNames[contextObj.selectedlvl] + " defined under it", 2);
                    }
                }
                else {
                    contextObj.administrationService.getOrganizationalUnitsData().subscribe(function (resultData1) {
                        if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                            contextObj.itemsSource = contextObj.convertJsonToTreeViewFormat(resultData1, false);
                            contextObj.itemsSource = contextObj.itemsSource[0];
                            if (contextObj.itemsSource.length <= 0) {
                                contextObj.enableMenu = [0, 1, 2, 3, 4, 5];
                                contextObj.iscard = true;
                            }
                            contextObj.notificationService.ShowToaster(contextObj.levelNames[contextObj.selectedlvl - 1] + " deleted", 3);
                            contextObj.selectedIds = [];
                        }
                    });
                }
            }
        });
    }

    public onSubMenuChange(event: any) {

        if (event.value == 0) {
        }
        else if (event.value == 6) {
            if (this.selectedIds.length != 0) {
                this.editClick(event);
            }
            else {
                this.notificationService.ShowToaster("Select an Organizational Unit", 2);
            }
        }
        else if (event.value == 7) {
            if (this.selectedIds.length == 0) {
                this.notificationService.ShowToaster("Select an Organizational Unit", 2);
            }
            else {
                this.deleteTtile = this.levelNames[this.selectedlvl - 1];
                this.width = 300;
                this.change = !this.change;
                this.showSlide = !this.showSlide;
            }
        }
        else if (event.value == 8) {

            if (this.selectedIds.length == 0) {
                this.notificationService.ShowToaster("Select an Organizational Unit", 2);
            } else if (this.selectedlvl - 1 != 0)
                this.notificationService.ShowToaster(this.levelNames[0] + " Access can be set to the first level only. Select " + this.checkVowel(this.levelNames)+" "+ this.levelNames[0] + " Name", 2);

            else {
                this.level1 = this.levelNames[0]
                this.action = "Access";
                this.btnName = "Access";
                this.pageTitle = "Access to "+this.checkVowel(this.levelNames) + " " + this.level1 + " by Many Users";

                this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
                this.showSecondaryView = this.splitviewInput.showSecondaryView;
                this.splitViewTarget = 1;
            }
        }
        else {
            this.addClick(event);
        }
    }
    checkVowel(levelNames)
    {
        var x = this.levelNames[0].substr(0, 1).toUpperCase();
        if (x == "A" || x == "E" || x == "I" || x == "O" || x == "U") {
            return "an"
        }
        else  return "a"

    }
    public addClick(event: any) {
        this.splitViewTarget = 0;
        this.action = "add";
        this.btnName = "Add";       
        this.Level = event.value;
        this.levelTitle = event.name;
        this.pageTitle = "New " + this.levelTitle;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.showSecondaryView = this.splitviewInput.showSecondaryView;
    }

    public editClick(event: any) {
        this.splitViewTarget = 0;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.Level = this.selectedlvl;
        this.levelTitle = this.selectedlvl;
        this.pageTitle = "Edit " + this.levelNames[this.selectedlvl - 1];
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.showSecondaryView = this.splitviewInput.showSecondaryView;
    }

    public deleteClick() {
        this.administrationService.deleteOrganizationalUnits(this.selectedIds).subscribe(function (resultData) {

        });
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    cancelClick(value: any) {
        this.showSlide = value.value;
    }


    convertJsonToTreeViewFormat(data: any, type: any) {
        var fieldObjectsTreeView = [];
        var DataKey = "ID";
        var column = ["ID", "Level2Id", "Level3Id", "Level4Id", "Level5Id"];
        var Value = ["Value", "L2Name", "L3Name", "L4Name", "L5Name"];
        var dir = [];
        var level = 1;

        var table = eval(data["Table1"]);
        for (var j = 0; j < table.length; j++) {
            var newTable = [];
            var type: any;
            if (data["Table2"] != null) {
                newTable = eval(data["Table2"]).filter(function (e) {
                    if (e[column[1]] == table[j][column[0]]) {
                        return true;
                    }
                });
            }
            if (newTable.length > 0) {
                let Type = new Directory(table[j][DataKey], table[j][Value[0]], this.checkDrt(level, data, newTable), this.chkChildren(level, data, newTable), type, table[j].Level);
                type = Type;

            }
            else {
                let Type = new Directory(table[j][DataKey], table[j][Value[0]], [], [], type, table[j].Level);
                type = Type;
            }
            dir.push(type);
        }
        if (dir != undefined)
            fieldObjectsTreeView.push(dir);

        return fieldObjectsTreeView;
    }

    checkDrt(level: any, data: any, newTable: any) {

        var newTable2=[];
        var newTable3 = [];
        var flag = 0;
        level = level + 1;
        var tblLevl = level + 1;
        var dir2 = [];
        var DataKey = "ID";
        var column = ["ID", "Level2Id", "Level3Id", "Level4Id", "Level5Id"];
        var Value = ["L1Name", "L2Name", "L3Name", "L4Name", "L5Name"];
        var type: any;
        for (var j = 0; j < newTable.length; j++) {
            var newTable;
            type == [];
            if (data["Table" + tblLevl] != null) {
                newTable2 = eval(data["Table" + tblLevl]).filter(function (e) {
                    if (e[column[level]] == newTable[j][column[0]]) {
                        return true;
                    }
                });
                if (newTable2.length > 0) {
                    var newTable3 = newTable2.filter(function (e) {
                        if (column.length > tblLevl) {
                            var status = 0;
                            var clm = column[level + 1];
                            var tbl = eval(data["Table" + [tblLevl + 1]]);
                            for (var k = 0; k < tbl.length; k++) {
                                if (e[DataKey] == tbl[k][clm]) {
                                    status = 1;
                                }
                            }
                            if (status == 1) {
                                return true;
                            }
                        }
                    });
                }
                if (newTable2.length > 0) {
                    flag = 1;
                    let Type = new Directory(newTable[j][DataKey], newTable[j][Value[level - 1]], this.checkDrt(level, data, newTable3), this.chkChildren(level, data, newTable2), type, newTable[j].Level);
                    type = Type;
                    if (type != undefined) {
                        dir2.push(type);
                    }
                }
            }
        }
        return dir2;
    }

    chkChildren(level: any, data: any, newTable: any) {

        var newTable2 = [];;
        level = level + 1;
        var tblLevl = level + 1;
        var dir2 = [];
        var DataKey = "ID";
        var column = ["ID", "Level2Id", "Level3Id", "Level4Id", "Level5Id"];
        var Value = ["L1Name", "L2Name", "L3Name", "L4Name", "L5Name"];
        var type: any;
        var ff = new Array<files>();
        for (var j = 0; j < newTable.length; j++) {
            var newTable;
            if (column.length >= tblLevl) {
                if (data["Table" + tblLevl] != null) {
                    newTable2 = eval(data["Table" + tblLevl]).filter(function (e) {
                        if (e[column[level]] == newTable[j][column[0]]) {
                            return true;
                        }
                    });
                }
                if (newTable2.length > 0) {

                }
                else {
                    ff.push({
                        Id: newTable[j][DataKey],
                        Value: newTable[j][Value[level - 1]],
                        level: newTable[j]["Level"]
                    });
                }
            }
            else {
                ff.push({
                    Id: newTable[j][DataKey],
                    Value: newTable[j][Value[level - 1]],
                    level: newTable[j].Level
                });
            }
        }
        return ff;
    }
  
}

export interface files {
    Id: number;
    Value: string;
    level: number;
}

export interface subMenu {
    id: number,
    title: string,
    image: string,
    path: string,
}
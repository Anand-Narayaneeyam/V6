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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var addorganizational_units_component_1 = require('./addorganizational-units.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var directory_component_1 = require('../../../Framework/Whatever/TreeView/directory.component');
var treeview_component_1 = require('../../../Framework/Whatever/TreeView/treeview.component');
var General_1 = require('../../../Models/Common/General');
var accestomanyusers_component_1 = require('./../general settings/accestomanyusers.component');
var OrganizationalUnitsComponent = (function () {
    function OrganizationalUnitsComponent(administrationService, notificationService, confirmationService, getData) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.getData = getData;
        this.submenuSource = null;
        this.btnName = "Save Changes";
        this.action = "Add";
        this.showSecondaryView = false;
        this.pagePath = "Administration / Organizational Units";
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.types = false;
        this.change = false;
        this.showSlide = false;
        this.position = "top-right";
        this.deleteTtile = "";
        this.iscard = false;
        this.splitViewTarget = 0;
        var contextObj = this;
        contextObj.splitViewTarget = 0;
        this.administrationService.getOrganizationNamesForMenu().subscribe(function (resultData) {
            if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                var fieldobj = new Array();
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
                }
            }
        });
    }
    OrganizationalUnitsComponent.prototype.ngOnInit = function () {
        this.selectedIds = [];
    };
    OrganizationalUnitsComponent.prototype.OnSuccessfulSubmi = function (event) {
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
    };
    OrganizationalUnitsComponent.prototype.onSelectedIds = function (event) {
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
    };
    OrganizationalUnitsComponent.prototype.okDelete = function (event) {
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
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Employee'", 2);
                            ;
                            break;
                        case 8:
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Administration'", 2);
                            break;
                        case 9:
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Space'", 2);
                            ;
                            break;
                        case 10:
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.levelNames[contextObj.selectedlvl - 1] + " could not be deleted as it is linked to 'Work Order'", 2);
                            ;
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
    };
    OrganizationalUnitsComponent.prototype.onSubMenuChange = function (event) {
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
            }
            else if (this.selectedlvl - 1 != 0)
                this.notificationService.ShowToaster(this.levelNames[0] + " Access can be set to the first level only. Select " + this.checkVowel(this.levelNames) + " " + this.levelNames[0] + " Name", 2);
            else {
                this.level1 = this.levelNames[0];
                this.action = "Access";
                this.btnName = "Access";
                this.pageTitle = "Access to " + this.checkVowel(this.levelNames) + " " + this.level1 + " by Many Users";
                this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
                this.showSecondaryView = this.splitviewInput.showSecondaryView;
                this.splitViewTarget = 1;
            }
        }
        else {
            this.addClick(event);
        }
    };
    OrganizationalUnitsComponent.prototype.checkVowel = function (levelNames) {
        var x = this.levelNames[0].substr(0, 1).toUpperCase();
        if (x == "A" || x == "E" || x == "I" || x == "O" || x == "U") {
            return "an";
        }
        else
            return "a";
    };
    OrganizationalUnitsComponent.prototype.addClick = function (event) {
        this.splitViewTarget = 0;
        this.action = "add";
        this.btnName = "Add";
        this.Level = event.value;
        this.levelTitle = event.name;
        this.pageTitle = "New " + this.levelTitle;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.showSecondaryView = this.splitviewInput.showSecondaryView;
    };
    OrganizationalUnitsComponent.prototype.editClick = function (event) {
        this.splitViewTarget = 0;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.Level = this.selectedlvl;
        this.levelTitle = this.selectedlvl;
        this.pageTitle = "Edit " + this.levelNames[this.selectedlvl - 1];
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        this.showSecondaryView = this.splitviewInput.showSecondaryView;
    };
    OrganizationalUnitsComponent.prototype.deleteClick = function () {
        this.administrationService.deleteOrganizationalUnits(this.selectedIds).subscribe(function (resultData) {
        });
    };
    OrganizationalUnitsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    OrganizationalUnitsComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    OrganizationalUnitsComponent.prototype.convertJsonToTreeViewFormat = function (data, type) {
        var fieldObjectsTreeView = [];
        var DataKey = "ID";
        var column = ["ID", "Level2Id", "Level3Id", "Level4Id", "Level5Id"];
        var Value = ["Value", "L2Name", "L3Name", "L4Name", "L5Name"];
        var dir = [];
        var level = 1;
        var table = eval(data["Table1"]);
        for (var j = 0; j < table.length; j++) {
            var newTable = [];
            var type;
            if (data["Table2"] != null) {
                newTable = eval(data["Table2"]).filter(function (e) {
                    if (e[column[1]] == table[j][column[0]]) {
                        return true;
                    }
                });
            }
            if (newTable.length > 0) {
                var Type = new directory_component_1.Directory(table[j][DataKey], table[j][Value[0]], this.checkDrt(level, data, newTable), this.chkChildren(level, data, newTable), type, table[j].Level);
                type = Type;
            }
            else {
                var Type = new directory_component_1.Directory(table[j][DataKey], table[j][Value[0]], [], [], type, table[j].Level);
                type = Type;
            }
            dir.push(type);
        }
        if (dir != undefined)
            fieldObjectsTreeView.push(dir);
        return fieldObjectsTreeView;
    };
    OrganizationalUnitsComponent.prototype.checkDrt = function (level, data, newTable) {
        var newTable2 = [];
        var newTable3 = [];
        var flag = 0;
        level = level + 1;
        var tblLevl = level + 1;
        var dir2 = [];
        var DataKey = "ID";
        var column = ["ID", "Level2Id", "Level3Id", "Level4Id", "Level5Id"];
        var Value = ["L1Name", "L2Name", "L3Name", "L4Name", "L5Name"];
        var type;
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
                    var Type = new directory_component_1.Directory(newTable[j][DataKey], newTable[j][Value[level - 1]], this.checkDrt(level, data, newTable3), this.chkChildren(level, data, newTable2), type, newTable[j].Level);
                    type = Type;
                    if (type != undefined) {
                        dir2.push(type);
                    }
                }
            }
        }
        return dir2;
    };
    OrganizationalUnitsComponent.prototype.chkChildren = function (level, data, newTable) {
        var newTable2 = [];
        ;
        level = level + 1;
        var tblLevl = level + 1;
        var dir2 = [];
        var DataKey = "ID";
        var column = ["ID", "Level2Id", "Level3Id", "Level4Id", "Level5Id"];
        var Value = ["L1Name", "L2Name", "L3Name", "L4Name", "L5Name"];
        var type;
        var ff = new Array();
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
    };
    OrganizationalUnitsComponent = __decorate([
        core_1.Component({
            selector: 'organizational-units',
            templateUrl: './app/Views/Administration/General Settings/organizational-units.component.html',
            directives: [accestomanyusers_component_1.AccessToManyUsersComponent, slide_component_1.SlideComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, notify_component_1.Notification, page_component_1.PageComponent, treeview_component_1.TreeView, confirm_component_1.ConfirmationComponent, addorganizational_units_component_1.AddOrganizationalComponent, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], OrganizationalUnitsComponent);
    return OrganizationalUnitsComponent;
}());
exports.OrganizationalUnitsComponent = OrganizationalUnitsComponent;
//# sourceMappingURL=organizational-units.component.js.map
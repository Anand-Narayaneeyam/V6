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
var objects_service_1 = require('../../../Models/Objects/objects.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var listboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var objectData_addedit_component_1 = require('./objectData-addedit.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
//import {AssetsOpenDrawing} from '../../objects/assets/drawings/assetsopendrawing.service';
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var warranty_list_component_1 = require('../../Objects/Data/warranty-list.component');
var common_service_1 = require('../../../models/common/common.service');
var multiple_edit_component_1 = require('../../../framework/whatever/multipleedit/multiple-edit.component');
var analytics_component_1 = require('../../common/analytics/analytics.component');
var ObjectDataListinDrawingComponent = (function () {
    function ObjectDataListinDrawingComponent(cdr, objectsService, AdministrationService, notificationService, generFun, http, exportObject, commonService) {
        this.cdr = cdr;
        this.objectsService = objectsService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.http = http;
        this.exportObject = exportObject;
        this.commonService = commonService;
        this.gridHeight = "100%";
        this.inputItems = { dataKey: "ObjectId", groupBy: [], grpWithCheckBx: true, selectedIds: [], sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'Multiple', showContextMenu: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.secondaryTarget = 100;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 100 };
        this.filter = "";
        this.PageTarget = 0;
        this.varsort = "DESC";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.blnIsGrid = true;
        this.IsSearchmenuNeeded = false;
        this.dispSettingCategoryId = 6;
        this.dispTab = 0;
        this.arrHighlightRowIds = [];
        this.haseditprivilage = 1;
        this.selectedObjectClassDisplaySettingsId = 0;
        this.submitSuccess = new core_1.EventEmitter();
        this.UpdatedSuccess = new core_1.EventEmitter();
        this.showZoomOnClick = new core_1.EventEmitter();
        this.showInDrawingOnClick = new core_1.EventEmitter();
        this.PlaceObjectOnClick = new core_1.EventEmitter();
        this.DelinkOnClick = new core_1.EventEmitter();
        this.Attachmentcount = new core_1.EventEmitter();
        this.onSearchInDrawing = new core_1.EventEmitter();
        this.attributeoption = 2;
        this.isSiteAdmin = false;
        this.isdelinked = false;
        this.secondaryViewTarget = 0;
        this.sessionUserCatId = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.Isallattachmentmenuneeded = true;
        this.tempObjectClassId = 0;
        this.unassignedTxt = "Unassigned";
        this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "subMenu": null,
                "privilegeId": 993
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null,
                "privilegeId": 994
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": 995
            },
            {
                "id": 5,
                "title": "Tools",
                "image": "Settings",
                "path": "Settings",
                "subMenu": [
                    {
                        "id": 6,
                        "title": "Class Selection",
                        "image": "Class Selection",
                        "path": "Class Selection",
                        "subMenu": null
                    },
                    {
                        "id": 7,
                        "title": "Place",
                        "image": "Place",
                        "path": "Place",
                        "subMenu": null,
                        "privilegeId": 996
                    },
                    {
                        "id": 8,
                        "title": "De-Link",
                        "image": "De-Link",
                        "path": "De-Link",
                        "subMenu": null,
                        "privilegeId": 997
                    }
                ]
            },
            {
                "id": 20,
                "title": "More",
                "image": "More",
                "path": "More",
                "subMenu": [
                    {
                        "id": 10,
                        "title": "Show Drawing",
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null
                    },
                    {
                        "id": 11,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null
                    },
                    {
                        "id": 4,
                        "title": "Display Settings",
                        "image": "DisplaySettings",
                        "path": "DisplaySettings",
                        "subMenu": null
                    },
                    {
                        "id": 9,
                        "title": "Attachments",
                        "image": "Attachments",
                        "path": "Attachments",
                        "subMenu": null
                    },
                    {
                        "id": 15,
                        "title": "Export",
                        "image": "Export",
                        "path": "Export",
                        "subMenu": null
                    },
                    {
                        "id": 16,
                        "title": "Warranty Details",
                        "image": "Warranty",
                        "path": "Warranty",
                        "subMenu": null,
                        "privilegeId": null
                    }
                ]
            },
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.showSlidedelink = false;
        this.slidewidth = 250;
        this.IsBarcodeSubscribed = false;
        this.searchindex = 0;
        this.IsAutoNumbering = false;
        this.showMultipleAssign = false;
        this.exportSearchIndex = 0;
        this.analyticsInput = { menuId: 0 };
        this.showAnalytics = false;
        this.rearrangeItemSource = function (selectedRows, resCallback) {
            var itemSourcedata = this.itemsSource.slice();
            var selectedSpaceIds = selectedRows;
            var selectedRowDatas = [];
            for (var i = 0; i < selectedSpaceIds.length; i++) {
                var index = itemSourcedata.findIndex(function (el) { return el.ObjectId == selectedSpaceIds[i]; });
                if (index != -1) {
                    selectedRowDatas.push(itemSourcedata[index]);
                    itemSourcedata.splice(index, 1);
                }
            }
            var data = selectedRowDatas.concat(itemSourcedata);
            this.itemsSource = data;
            resCallback(0);
        };
    }
    ObjectDataListinDrawingComponent.prototype.ngOnInit = function () {
        console.log('isBuildingDrawing', this.isBuildingDrawing);
    };
    ObjectDataListinDrawingComponent.prototype.ngOnChanges = function (changes) {
        if (changes['IsObjectPlaced'] && changes['IsObjectPlaced']['currentValue']) {
            if (changes['IsObjectPlaced']['currentValue'] == true) {
                this.afterplaceandmove();
            }
        }
        else if (changes['IsObjectMoved'] && changes['IsObjectMoved']['currentValue']) {
            if (changes['IsObjectMoved']['currentValue'] == true) {
                this.afterplaceandmove();
            }
        }
        else if (changes['ObjectDelinked'] && changes['ObjectDelinked']['currentValue']) {
            if (changes['ObjectDelinked']['currentValue'].length > 0) {
                this.deleteFromGrid();
            }
        }
        if (changes['updateDataSource'] && changes['updateDataSource']['currentValue']) {
            if (this.updateDataSource != null && this.updateDataSource.length > 0)
                this.updatedDataSourceFromDrawing();
            this.changeEnableMenu(true);
        }
        if (changes['updateObjectsDetails'] && changes['updateObjectsDetails']['currentValue']) {
            if (this.updateObjectsDetails.length > 0)
                console.log("this.moveAssetsDetails", this.updateObjectsDetails);
        }
        var contextObj = this;
        if (changes["selectedRow"] && changes["selectedRow"]["currentValue"]) {
            if (this.selectedRow.length > 0) {
                if (this.itemsSource) {
                    this.rearrangeItemSource(this.selectedRow.slice(), function (retcode) {
                        contextObj.arrHighlightRowIds = [];
                        setTimeout(function () {
                            contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(contextObj.selectedRow);
                        }, 100);
                    });
                }
            }
            else
                contextObj.arrHighlightRowIds = [];
        }
    };
    ObjectDataListinDrawingComponent.prototype.updatedDataSourceFromDrawing = function () {
        this.refreshgrid = [];
        var retUpdatedSrc;
        if (this.updateDataSource[0]['Action'] == 'add') {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", this.updateDataSource[0], this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.updateDataSource[0]['Action'] == 'edit') {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", this.updateDataSource[0], this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        }
        this.refreshgrid = this.refreshgrid.concat([true]);
    };
    ObjectDataListinDrawingComponent.prototype.deleteFromGrid = function () {
        for (var _i = 0, _a = this.ObjectDelinked; _i < _a.length; _i++) {
            var item = _a[_i];
            var retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "delete", '', [item], this.inputItems.dataKey, this.totalItems);
            this.itemsSource = retUpdatedSrc["itemSrc"];
            this.totalItems = retUpdatedSrc["itemCount"];
            if (this.totalItems < 1) {
                this.enableMenu = [1];
            }
        }
    };
    ObjectDataListinDrawingComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var featureid = "";
        switch (contextObj.objectCategoryId) {
            case 1:
                featureid = "105,72";
                this.classname = "Asset Class";
                this.objectmultiplename = "Assets";
                this.modulename = "Assets";
                this.attributetitle = "Class Attributes";
                this.commonDisplaySettingCategoryId = 3;
                this.spaceDisplaySettingCategoryId = 13;
                break;
            case 2:
                featureid = "107,73";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[2].title = "Warehouse";
                this.unassignedTxt = "Warehoused";
                this.classname = "Furniture Class";
                this.objectmultiplename = "Furniture";
                this.modulename = "Furniture";
                this.attributetitle = "Class Attributes";
                this.commonDisplaySettingCategoryId = 4;
                this.spaceDisplaySettingCategoryId = 15;
                break;
            case 3:
                featureid = "109,71";
                this.classname = "Object Class";
                this.objectmultiplename = "Objects";
                this.modulename = "Telecom";
                this.attributetitle = "Class Attributes";
                this.commonDisplaySettingCategoryId = 5;
                this.spaceDisplaySettingCategoryId = 16;
                break;
            case 8:
                featureid = "113,92";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Electrical";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 9;
                this.spaceDisplaySettingCategoryId = 18;
                break;
            case 9:
                featureid = "115,100";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Fire and Safety";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 10;
                this.spaceDisplaySettingCategoryId = 19;
                break;
            case 10:
                featureid = "229,130";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Mechanical";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 20;
                this.spaceDisplaySettingCategoryId = 21;
                break;
            case 11:
                featureid = "131,140";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Plumbing";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 22;
                this.spaceDisplaySettingCategoryId = 23;
                break;
            case 12:
                featureid = "141,150";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection";
                this.classname = "Component Type";
                this.objectmultiplename = "Components";
                this.modulename = "Medical Gas";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 24;
                this.spaceDisplaySettingCategoryId = 25;
                break;
            case 20:
                featureid = "151,228";
                if (contextObj.menuData[3].title == "Tools")
                    contextObj.menuData[3].subMenu[0].title = "Type Selection";
                this.classname = "Equipment Type";
                this.objectmultiplename = "Equipment";
                this.modulename = "Security Assets";
                this.attributetitle = "Type Attributes";
                this.commonDisplaySettingCategoryId = 32;
                this.spaceDisplaySettingCategoryId = 33;
                break;
        }
        contextObj.IsKeyWordSearch = 0;
        contextObj.IsAdvanceSearch = 0;
        //var featureid = "105";
        //switch (contextObj.objectCategoryId) {
        //    case 1:
        //        featureid = "105";
        //        this.unassignedTxt = "Unassigned";
        //        break;
        //    case 2:
        //        featureid = "107";
        //        if (contextObj.menuData[3].title == "Tools")
        //            contextObj.menuData[3].subMenu[2].title = "Warehouse"
        //        this.unassignedTxt = "Warehoused";
        //        break;
        //}
        //featureid = featureid + ",72,73";
        contextObj.objectsService.getCustomerSubscribedFeaturesBarcode(featureid).subscribe(function (rt) {
            rt["Data"].find(function (item) {
                switch (item.Id) {
                    case 71:
                    case 72:
                    case 73:
                    case 92:
                    case 100:
                    case 130:
                    case 140:
                    case 150:
                    case 228:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsAutoNumbering = true;
                        }
                        break;
                    case 105:
                    case 107:
                    case 109:
                    case 113:
                    case 115:
                    case 229:
                    case 131:
                    case 141:
                    case 151:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsBarcodeSubscribed = true;
                        }
                        break;
                }
                //switch (item.Id) {
                //    case 72:
                //        if (item["IsSubscribed"] == true && item["Id"] == 72) {
                //            if (contextObj.objectCategoryId == 1)
                //                contextObj.IsAutoNumbering = true;
                //        }
                //        break;
                //    case 73:
                //        if (item["IsSubscribed"] == true && item["Id"] == 73) {
                //            if (contextObj.objectCategoryId == 2)
                //                contextObj.IsAutoNumbering = true;
                //        }
                //        break;
                //    case 105:
                //        if (item["IsSubscribed"] == true && item["Id"] == 105) {
                //            contextObj.IsBarcodeSubscribed = true;
                //        }
                //        break;
                //    case 107:
                //        if (item["IsSubscribed"] == true && item["Id"] == 107) {
                //            contextObj.IsBarcodeSubscribed = true;
                //        }
                //        break;
                //}
                //if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["Id"] == 72) {
                //    contextObj.IsAutoNumbering = true;
                //}
            });
        });
        switch (contextObj.Targetforstyle) {
            case 1:
                contextObj.Stylename = "search-containerInline";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 220;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
            case 2:
                contextObj.Stylename = "search-containerInlineforplace";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 320;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
            case 3:
                contextObj.Stylename = "search-containerInlinefromgrid";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 320;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
        }
        if (contextObj.dataOption == "2")
            contextObj.menuData = contextObj.menuData.filter(function (item) { return (item.id != 1); });
        //else
        //    contextObj.menuData.splice(3, 2);
        //else
        //    contextObj.menuData = contextObj.menuData.slice(1, 8);
        if (contextObj.drawingIds == undefined) {
            contextObj.drawingIds = '';
        }
        this.objectsService.getObjectDataFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObjectGrid = (result["Data"]);
            contextObj.fieldObjectGrid.find(function (item) {
                switch (item.ReportFieldId) {
                    case 4303:
                        if (contextObj.IsBarcodeSubscribed == true) {
                            item.IsVisible = true;
                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;
                        }
                        break;
                }
                return item.ReportFieldId === 4303;
            });
            contextObj.dataLoad('', 1);
        });
        this.getSessionUserData(contextObj);
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
    };
    ObjectDataListinDrawingComponent.prototype.afterplaceandmove = function () {
        var contextObj = this;
        switch (contextObj.Targetforstyle) {
            case 1:
                contextObj.Stylename = "search-containerInline";
                break;
            case 2:
                contextObj.Stylename = "search-containerInlineforplace";
                break;
            case 3:
                contextObj.Stylename = "search-containerInlinefromgrid";
                break;
        }
        if (contextObj.objectCategoryId == 2) {
            if (contextObj.menuData[3].title == "Tools")
                contextObj.menuData[3].subMenu[2].title = "Warehouse";
        }
        if (contextObj.drawingIds == undefined) {
            contextObj.drawingIds = '';
        }
        if (contextObj.dataOption == "2")
            contextObj.menuData = contextObj.menuData.filter(function (item) { return (item.id != 1); });
        this.objectsService.getObjectDataFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldObjectGrid = (result["Data"]);
            contextObj.dataLoad('', 1);
        });
        this.getSessionUserData(contextObj);
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 211, contextObj.AdministrationService, contextObj.menuData.length);
    };
    ObjectDataListinDrawingComponent.prototype.dataLoad = function (classIds, target) {
        var contextObj = this;
        var filter;
        if (contextObj.IsKeyWordSearch == 1)
            filter = contextObj.filter;
        else if (contextObj.IsAdvanceSearch == 1)
            filter = contextObj.advanceValue;
        else
            filter = "";
        contextObj.IsSearchmenuNeeded = false;
        contextObj.IsObjectMoved['currentValue'] = false;
        contextObj.SelectedclassIds = classIds;
        var SortColumn = contextObj.inputItems.sortCol;
        //contextObj.changeEnableMenu(true);
        if (contextObj.dataOption == "2")
            contextObj.PageTarget = 1;
        //if (contextObj.inputItems.sortCol == "[Asset No.]")
        //    SortColumn = "[ObjectNo]"
        //else if (contextObj.inputItems.sortCol == "[Asset Class Name]")
        //    SortColumn = "[ObjectClassName]"
        //if (this.inputItems.sortDir == "DESC")
        //    contextObj.varsort = "ASC";
        //else
        //    contextObj.varsort = "DESC";
        //if (classIds != "")
        //    contextObj.pageIndex = 0;
        contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, classIds, contextObj.drawingIds, '', false, 0, true, 1, contextObj.pageIndex, SortColumn, contextObj.inputItems.sortDir, filter, false, contextObj.isBuildingDrawing).subscribe(function (result) {
            //debugger
            contextObj.totalItems = result.DataCount;
            contextObj.messages = result.ReturnMessages;
            contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
            if (contextObj.totalItems > 0) {
                contextObj.IsSearchmenuNeeded = true;
                contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                if (contextObj.selectedRow["selectedIds"] != undefined && contextObj.dataOption == 2) {
                    if (contextObj.selectedRow.selectedIds.length > 0) {
                        if (contextObj.itemsSource) {
                            contextObj.rearrangeItemSource(contextObj.selectedRow.selectedIds.slice(), function (retcode) {
                                contextObj.arrHighlightRowIds = [];
                                setTimeout(function () {
                                    contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(contextObj.selectedRow.selectedIds);
                                }, 200);
                            });
                        }
                    }
                    else
                        contextObj.arrHighlightRowIds = [];
                }
                contextObj.rearrangeItemSource = function (selectedRows, resCallback) {
                    var itemSourcedata = contextObj.itemsSource.slice();
                    var selectedSpaceIds = selectedRows;
                    var selectedRowDatas = [];
                    for (var i = 0; i < selectedSpaceIds.length; i++) {
                        var index = itemSourcedata.findIndex(function (el) { return el.ObjectId == selectedSpaceIds[i]; });
                        if (index != -1) {
                            selectedRowDatas.push(itemSourcedata[index]);
                            itemSourcedata.splice(index, 1);
                        }
                    }
                    //var data = selectedRowDatas.concat(itemSourcedata);
                    //  var data = itemSourcedata.unshift(selectedRowDatas);
                    //  this.itemsSource = data;
                    resCallback(0);
                };
                if (target == 1) {
                    contextObj.itemsPerPage = result.RowsPerPage;
                }
                contextObj.changeEnableMenu(true);
            }
            else {
                contextObj.itemsSource = JSON.parse(result.FieldBinderData);
                contextObj.IsSearchmenuNeeded = false;
                contextObj.notificationService.ShowToaster("No " + contextObj.objectCategoryName + " data exists  ", 2);
                contextObj.changeEnableMenu(false);
                if (classIds != "") {
                    contextObj.enableMenu = [1, 5, 6];
                    contextObj.isdelinked = false;
                }
            }
        });
        //debugger
        contextObj.objectsService.getObjectDataKeywordField(contextObj.objectCategoryId).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.KeywordFieldObject = resultData["FieldBinderList"];
            }
        });
    };
    ObjectDataListinDrawingComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        this.objectsService.getAdvnceSearchLookup(contextObj.objectCategoryId).subscribe(function (resultData) {
            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
            }
        });
    };
    ObjectDataListinDrawingComponent.prototype.changeEnableMenu = function (haveData) {
        if (haveData) {
            switch (this.dataOption) {
                case 2:
                    this.enableMenu = [2, 3, 4, 5, 6, 8, 9, 10, 11, 20, 15, 16];
                    break;
                case 3:
                    this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 9, 20, 15, 16];
                    break;
            }
        }
        else {
            this.enableMenu = [1];
        }
    };
    ObjectDataListinDrawingComponent.prototype.onClassSelected = function (event) {
        var contextObj = this;
        var selectedClassIds = '';
        if (this.fieldDetailsCheckBox.MultiFieldValues == null || this.fieldDetailsCheckBox.MultiFieldValues.length == 0) {
            contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
        }
        else {
            contextObj.MultiFieldValues = this.fieldDetailsCheckBox.MultiFieldValues;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
            for (var count = 0; count < this.fieldDetailsCheckBox.MultiFieldValues.length; count++) {
                selectedClassIds = selectedClassIds + this.fieldDetailsCheckBox.MultiFieldValues[count] + ',';
            }
            selectedClassIds = selectedClassIds.slice(0, -1);
            if (this.fieldDetailsCheckBox.MultiFieldValues.length == 1) {
                this.objectsService.getObjectDataFieldsListforclass(this.objectCategoryId, selectedClassIds).subscribe(function (result) {
                    contextObj.attributeoption = 2;
                    contextObj.fieldObjectGrid = (result["Data"]);
                    contextObj.dataLoad(selectedClassIds, 1);
                });
            }
            else {
                contextObj.attributeoption = 1;
                this.objectsService.getObjectDataFieldsList(this.objectCategoryId).subscribe(function (result) {
                    for (var i = 0; i < result["Data"].length; i++) {
                        if (result.Data[i].FieldLabel.length > 13)
                            result.Data[i]["Width"] = 200;
                        if (result.Data[i].FieldLabel.length > 28)
                            result.Data[i]["Width"] = 250;
                    }
                    contextObj.fieldObjectGrid = (result["Data"]);
                    contextObj.fieldObjectGrid.find(function (item) {
                        switch (item.ReportFieldId) {
                            case 4303:
                                if (contextObj.IsBarcodeSubscribed == true) {
                                    item.IsVisible = true;
                                }
                                else if (contextObj.IsBarcodeSubscribed == false) {
                                    item.IsVisible = false;
                                }
                                break;
                        }
                        return item.ReportFieldId === 4303;
                    });
                    contextObj.IsKeyWordSearch = 0;
                    contextObj.IsAdvanceSearch = 0;
                    contextObj.dataLoad(selectedClassIds, 1);
                });
            }
        }
        /*console.log(this.fieldDetailsCheckBox);*/
    };
    ObjectDataListinDrawingComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.pageTitle = this.objectCategoryName + " Data";
                this.addClick();
                break;
            case 2:
                this.pageTitle = this.objectCategoryName + " Data";
                this.editClick();
                break;
            case 3:
                //this.pageTitle = "Delete";
                this.deleteClick();
                break;
            case 4:
                this.pageTitle = "Display Settings";
                this.displaySettingsClick();
                break;
            case 6:
                this.pageTitle = this.classname + " Selection";
                this.classSelectionClick();
                break;
            case 7:
                this.pageTitle = "Place";
                this.placeonclick();
                break;
            case 8:
                this.pageTitle = null;
                this.DelinkClick();
                break;
            case 9:
                this.pageTitle = "Attachments";
                this.attachmentClick();
                break;
            case 10:
                this.checkDrawingIds(1);
                break;
            case 11:
                this.checkDrawingIds(2);
                break;
            case 15:
                this.Export();
                break;
            case 16:
                this.pageTitle = "Warranty Details";
                this.Warranty();
                break;
        }
    };
    ObjectDataListinDrawingComponent.prototype.Warranty = function () {
        this.secondaryTarget = 16;
        //if (this.inputItems.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //}
        //else if (this.inputItems.selectedIds.length == 1) {
        //    this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        //}
        //else {
        //    this.notificationService.ShowToaster("Select an Asset", 2);
        //}
        var contextObj = this;
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else {
                contextObj.tempObjectClassId = contextObj.inputItems.rowData["ObjectClassId"];
                if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined) {
                    contextObj.Isallattachmentmenuneeded = false;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                else {
                    if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"]; });
                            if (orgidexists == undefined)
                                contextObj.Isallattachmentmenuneeded = false;
                            else
                                contextObj.Isallattachmentmenuneeded = true;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else
                        //  this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            }
        }
    };
    ObjectDataListinDrawingComponent.prototype.outDrawingObject = function (event) {
        //debugger;
        //console.log("drawingdetailsoutObject", event);
        this.objiWhiz = event.dwgObject;
        // this.markupObj = event.markupObj;
        //  this.outDrawingobject.emit({ "dwgObj": this.objiWhiz });
    };
    ObjectDataListinDrawingComponent.prototype.Export = function () {
        var contextObj = this;
        var selectedClassIds = '';
        var fileName = this.dataOption == 1 ? "All" + this.objectmultiplename : this.dataOption == 2 ? "Operational" + this.objectmultiplename : "Warehoused" + this.objectmultiplename;
        if (contextObj.inputItems.selectedIds.length > 1) {
            contextObj.exportDataSource = JSON.stringify(contextObj.inputItems.rowData.slice());
            contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObjectGrid, fileName, function (retCode) {
                if (retCode == 0) {
                    contextObj.notificationService.ShowToaster(contextObj.objectCategoryName + " data exported", 3);
                }
            });
        }
        else {
            var searchkey = contextObj.IsKeyWordSearch == 1 ? contextObj.filter : contextObj.advanceValue;
            if (contextObj.SelectedclassIds != "") {
                contextObj.pageIndex = 0;
            }
            var searchkey = contextObj.exportSearchIndex == 1 ? contextObj.filter : contextObj.exportSearchIndex == 2 ? contextObj.advanceValue : ""; //contextObj.g_selectedClassIds
            if (searchkey != "" && searchkey != "[]")
                contextObj.SelectedclassIds = "";
            var input = contextObj.objectsService.getObjectSpaceDataExport(contextObj.PageTarget, contextObj.exportSearchIndex == 1 ? 1 : 0, contextObj.exportSearchIndex == 2 ? 1 : 0, contextObj.objectCategoryId, contextObj.dataOption, contextObj.attributeoption, contextObj.SelectedclassIds, contextObj.drawingIds, '', false, 0, true, 1, contextObj.fieldObjectGrid, fileName, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, searchkey, true);
            //contextObj.exportDataSource = result["Data"]["FieldBinderData"];
            contextObj.exportObject.ExportDataFromServer(input, 2, fileName, function (retCode) {
                if (retCode == 0) {
                    contextObj.notificationService.ShowToaster(contextObj.objectCategoryName + " data exported", 3);
                }
                else {
                    contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                }
            });
        }
    };
    ObjectDataListinDrawingComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        if (this.searchindex == 0) {
            if (this.SelectedclassIds != "") {
                this.dataLoad(this.SelectedclassIds, 0);
            }
            else {
                this.dataLoad('', 0);
            }
        }
        else if (this.searchindex == 1)
            this.keywordSearchdata();
        else if (this.searchindex == 2)
            this.AdvancedSearchdata();
    };
    ;
    ObjectDataListinDrawingComponent.prototype.onSort = function (objGrid) {
        //if (objGrid.sortCol == "[Asset No.]" || objGrid.sortCol == "[Asset Class Name]") {
        //    var sortDir = this.inputItems.sortDir;
        //    this.inputItems.sortDir = (sortDir == "ASC") ? "DESC" : "ASC"
        //    if (this.varsort == "ASC")
        //        this.inputItems.sortDir = sortDir;
        //    else
        //        this.inputItems.sortDir;
        //}
        if (this.searchindex == 0)
            if (this.SelectedclassIds != "") {
                this.dataLoad(this.SelectedclassIds, 0);
            }
            else {
                this.dataLoad('', 0);
            }
        else if (this.searchindex == 1)
            this.keywordSearchdata();
        else if (this.searchindex == 2)
            this.AdvancedSearchdata();
    };
    ObjectDataListinDrawingComponent.prototype.checkDrawingIds = function (target) {
        var contextObj = this;
        var spaceIdsInput = "";
        var drawingId;
        if (target == 1) {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
            }
            else
                contextObj.showInDrawingOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedObjectDetails": contextObj.inputItems.rowData });
        }
        else {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
            }
            else if (this.inputItems.selectedIds.length > 1)
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            else
                contextObj.showZoomOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedObjectDetails": contextObj.inputItems.rowData });
        }
    };
    ObjectDataListinDrawingComponent.prototype.addClick = function () {
        var contextObj = this;
        contextObj.getCusSubscribedFeatures();
        this.action = "add";
        this.btnName = "Save";
        var Tagno = "";
        this.objectsService.getObjectDataAddEditFieldsList(this.objectCategoryId, 0, "add").subscribe(function (resultData) {
            contextObj.fieldDetailsAdd = resultData["Data"];
            var count = 0;
            contextObj.fieldDetailsAdd.find(function (item) {
                switch (item.ReportFieldId) {
                    case 4303:
                        if (contextObj.IsBarcodeSubscribed == true) {
                            item.IsVisible = true;
                        }
                        else if (contextObj.IsBarcodeSubscribed == false) {
                            item.IsVisible = false;
                        }
                        count++;
                        break;
                    case 651:
                        if (item.FieldId == 1985) {
                            if (contextObj.IsAutoNumbering == false) {
                                item.IsVisible = true;
                            }
                            else {
                                item.IsVisible = false;
                            }
                        }
                        else if (item.FieldId == 1605) {
                            Tagno = item.FieldLabel;
                            item.IsVisible = false; //for autonumber true /false asset no. field is invisible
                        }
                        var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661; });
                        if (tagNoItem != undefined) {
                            //if (contextObj.IsAutoNumbering == false)
                            //    tagNoItem.IsMandatory = true;
                            //else
                            if (contextObj.IsAutoNumbering == true)
                                tagNoItem.IsVisible = false;
                            tagNoItem.FieldLabel = Tagno;
                            tagNoItem.IsMandatory = true;
                        }
                        count++;
                        break;
                    case 657:
                        contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
                            item.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]); //class                     
                            contextObj.secondaryTarget = 0;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                        break;
                    case 7411:
                        item.IsMandatory = true;
                        break;
                }
                if (count == 5) {
                    return true;
                }
                else
                    return false;
            });
        });
    };
    ObjectDataListinDrawingComponent.prototype.editClick = function () {
        //debugger
        if (this.itemSelected) {
            this.action = "edit";
            this.btnName = "Save Changes";
            var contextObj = this;
            var haseditprivilage;
            var Tagno;
            var editabledivisions = new Array();
            contextObj.getCusSubscribedFeatures();
            if (this.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
            }
            else if (this.inputItems.selectedIds.length > 1) {
                this.onMultipleEditClick();
            }
            else {
                if (this.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined)
                    contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected " + contextObj.objectCategoryName, 5);
                else {
                    if (this.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        //if (contextObj.inputItems.rowData["SpaceId"] != undefined)
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            //contextObj.objectsService.checkEditPrivilageExist(contextObj.inputItems.rowData["SpaceId"]).subscribe(function (result) {
                            //haseditprivilage = contextObj.usereditprivilageforspace(contextObj.inputItems.rowData["SpaceId"]);
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"]; });
                            if (orgidexists == undefined)
                                contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected " + contextObj.objectCategoryName, 5);
                            else {
                                var withPrefix = false;
                                var withoutPrefix = false;
                                //debugger
                                contextObj.objectsService.getObjectDataEditFieldsList(contextObj.objectCategoryId, contextObj.inputItems.selectedIds[0], "edit", contextObj.dataOption, contextObj.attributeoption, contextObj.inputItems.rowData.ObjectClassId.toString(), contextObj.drawingIds, '', 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (result) {
                                    contextObj.fieldDetailsAdd = result["Data"];
                                    var count = 0;
                                    contextObj.fieldDetailsAdd.find(function (item) {
                                        switch (item.ReportFieldId) {
                                            case 4303:
                                                if (contextObj.IsBarcodeSubscribed == true) {
                                                    item.IsVisible = true;
                                                }
                                                else if (contextObj.IsBarcodeSubscribed == false) {
                                                    item.IsVisible = false;
                                                }
                                                count++;
                                                break;
                                            case 651:
                                                if (item.FieldId == 1985) {
                                                    if (contextObj.IsAutoNumbering == false) {
                                                        item.IsVisible = true;
                                                        withoutPrefix = true;
                                                        if (withPrefix == true)
                                                            item.FieldValue = "";
                                                    }
                                                    else {
                                                        item.IsVisible = false;
                                                    }
                                                }
                                                else if (item.FieldId == 1605) {
                                                    item.IsEnabled = false;
                                                    if (contextObj.IsAutoNumbering == false) {
                                                        withPrefix = true;
                                                        item.IsVisible = false;
                                                        if (withoutPrefix == true)
                                                            item.FieldValue = "";
                                                    }
                                                    else {
                                                        item.IsVisible = true;
                                                    }
                                                    var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661; });
                                                    if (tagNoItem != undefined) {
                                                        if (contextObj.IsAutoNumbering == false)
                                                            tagNoItem.IsMandatory = true;
                                                        else
                                                            tagNoItem.IsVisible = false;
                                                        tagNoItem.FieldLabel = item.FieldLabel;
                                                    }
                                                }
                                                count++; //2 times execution
                                                break;
                                            case 657:
                                                item.IsEnabled = false;
                                                item.IsMandatory = true;
                                                contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
                                                    item.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                                                });
                                                count++;
                                                break;
                                            case 7411:
                                                item.IsMandatory = true;
                                                if (contextObj.inputItems.rowData.Status == "Assigned")
                                                    item.IsEnabled = false;
                                                count++;
                                                break;
                                        }
                                        if (count == 5) {
                                            return true;
                                        }
                                        else
                                            return false;
                                    });
                                    contextObj.secondaryTarget = 0;
                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                });
                            }
                        });
                    }
                    else {
                        //debugger
                        var count = 0;
                        var withPrefix = false;
                        var withoutPrefix = false;
                        contextObj.objectsService.getObjectDataEditFieldsList(contextObj.objectCategoryId, contextObj.inputItems.selectedIds[0], "edit", contextObj.dataOption, contextObj.attributeoption, contextObj.inputItems.rowData.ObjectClassId.toString(), contextObj.drawingIds, '', 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (result) {
                            contextObj.fieldDetailsAdd = result["Data"];
                            contextObj.fieldDetailsAdd.find(function (item) {
                                switch (item.ReportFieldId) {
                                    case 4303:
                                        if (contextObj.IsBarcodeSubscribed == true) {
                                            item.IsVisible = true;
                                        }
                                        else if (contextObj.IsBarcodeSubscribed == false) {
                                            item.IsVisible = false;
                                        }
                                        count++;
                                        break;
                                    case 651:
                                        if (item.FieldId == 1985) {
                                            if (contextObj.IsAutoNumbering == false) {
                                                item.IsVisible = true;
                                                withoutPrefix = true;
                                                if (withPrefix == true)
                                                    item.FieldValue = "";
                                            }
                                            else {
                                                item.IsVisible = false;
                                            }
                                            count++;
                                        }
                                        if (item.FieldId == 1605) {
                                            item.IsEnabled = false;
                                            if (contextObj.IsAutoNumbering == false) {
                                                item.IsVisible = false;
                                                if (withoutPrefix == true)
                                                    item.FieldValue = "";
                                            }
                                            else {
                                                withPrefix = true;
                                                item.IsVisible = true;
                                            }
                                            var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661; });
                                            if (tagNoItem != undefined) {
                                                if (contextObj.IsAutoNumbering == false)
                                                    tagNoItem.IsMandatory = true;
                                                else
                                                    tagNoItem.IsVisible = false;
                                                tagNoItem.FieldLabel = item.FieldLabel;
                                            }
                                            count++;
                                        }
                                        break;
                                    case 657:
                                        item.IsEnabled = false;
                                        item.IsMandatory = true;
                                        contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {
                                            item.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                                        });
                                        count++;
                                        break;
                                    case 7411:
                                        item.IsMandatory = true;
                                        if (contextObj.inputItems.rowData.Status == "Assigned")
                                            item.IsEnabled = false;
                                        else if (contextObj.inputItems.rowData.ObjectSiteId != undefined)
                                            item.FieldValue = contextObj.inputItems.rowData.ObjectSiteId.toString();
                                        count++;
                                        break;
                                }
                                if (count == 5)
                                    return true;
                            });
                            contextObj.secondaryTarget = 0;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                }
            }
        }
    };
    //multipleAssign() {
    //  debugger
    //    var contextObj = this;
    //    let isPlaced: boolean = true;
    //    contextObj.inputItems.rowData.find(function (item) {
    //        if (item.Status == "Assigned")
    //        {
    //            isPlaced = false;
    //            contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + "s are already placed", 2);
    //            return true;
    //        }
    //       else if (item.SymbolId == null) {
    //            isPlaced = false;
    //            contextObj.notificationService.ShowToaster("Some of the "+contextObj.objectCategoryName + " have no Symbol assigned", 2);
    //            return true;
    //        }
    //        else
    //            return false;
    //    });
    //    if (isPlaced == true) {
    //        contextObj.PlaceAssetOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "rowData": contextObj.inputItems});
    //       // contextObj.secondaryTarget = 10;
    //      //  contextObj.wanttoreload = false;
    //       // contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    //    }
    //}
    ObjectDataListinDrawingComponent.prototype.multipleAssign = function () {
        var contextObj = this;
        // debugger
        var isPlaced = true;
        var isAssigned = true;
        var isunAssigned = false;
        var isSymbol = true;
        var count = 0;
        contextObj.inputItems.rowData.find(function (item) {
            if (item.Status == "Assigned") {
                isPlaced = false;
                isAssigned = false;
                // contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + "s are already placed", 2);
                count++;
            }
            else if (item.Status == contextObj.unassignedTxt && item.SymbolId != null) {
                isunAssigned = true;
                // contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + "s are already placed", 2);
                count++;
            }
            else if (item.SymbolId == null) {
                isPlaced = false;
                isSymbol = false;
                //contextObj.notificationService.ShowToaster("Some of the " + contextObj.objectCategoryName + " have no Symbol assigned", 2);
                count++;
            }
            if (count == contextObj.inputItems.selectedIds.length)
                return true;
            else
                return false;
        });
        if (isAssigned == false && isunAssigned == true) {
            contextObj.message = "Some of the selected " + contextObj.objectmultiplename + " is already placed. Do you want to continue?";
            contextObj.showMultipleAssign = !contextObj.showMultipleAssign;
        }
        else if (isSymbol == false && isunAssigned == true) {
            contextObj.message = "Some of the selected " + contextObj.objectmultiplename + " have no Symbol assigned. Do you want to continue?";
            contextObj.showMultipleAssign = !contextObj.showMultipleAssign;
        }
        else if (isPlaced == true) {
            contextObj.PlaceObjectOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "rowData": contextObj.inputItems });
        }
        else {
            if (isSymbol == false)
                this.notificationService.ShowToaster("Selected " + contextObj.objectmultiplename + " have no Symbol assigned", 2);
            else
                this.notificationService.ShowToaster("Selected " + contextObj.objectmultiplename + " is already placed", 2);
        }
    };
    ObjectDataListinDrawingComponent.prototype.displaySettingsClick = function () {
        //  this.action = "displaySettings";
        // this.btnName = "Save Changes";
        var contextObj = this;
        var dataoption = contextObj.dataOption;
        if (contextObj.displaySettingDdlFieldValue == null || contextObj.displaySettingDdlFieldValue == undefined) {
            contextObj.objectsService.getdropdownFields().subscribe(function (result) {
                contextObj.ddlObjectClassDisplaySettings = result["Data"][0];
                contextObj.ddlObjectClassDisplaySettings.FieldLabel = contextObj.classname;
                if (contextObj.dataOption == "3")
                    dataoption = "1";
                contextObj.objectsService.getObjectClassDisplaySettings(contextObj.objectCategoryId, contextObj.drawingIds, dataoption, 1, 0).subscribe(function (resultData) {
                    contextObj.ddlObjectClassDisplaySettings.LookupDetails.LookupValues = JSON.parse(resultData["Data"].FieldBinderData);
                });
            });
        }
        contextObj.allObjectAction = "displaySettings";
        contextObj.commonAdditionalDataFieldCategoryId = 19;
        contextObj.spaceAdditionalDataFieldCategoryId = 7;
        //switch (contextObj.objectCategoryId) {
        //    case 1: // Assets
        //        contextObj.commonDisplaySettingCategoryId = 3;
        //        contextObj.spaceDisplaySettingCategoryId = 13;
        //        break;
        //    case 2: // Furniture
        //        contextObj.commonDisplaySettingCategoryId = 4;
        //        contextObj.spaceDisplaySettingCategoryId = 15;
        //        break;
        //}
        contextObj.secondaryTarget = 3;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        // contextObj.splitviewInput.showSecondaryView = true;
    };
    ObjectDataListinDrawingComponent.prototype.onChnageObjectClassDisplaySettings = function (event) {
        if (Number(event) != -1) {
            this.selectedObjectClassDisplaySettingsId = Number(event);
        }
        else if (Number(event) == -1) {
            this.selectedObjectClassDisplaySettingsId = 0;
        }
        //else
        //    this.enableMenu = [];
        this.displaySettingDdlFieldValue = event;
    };
    ObjectDataListinDrawingComponent.prototype.attachmentSuccess = function (event) {
        var context = this;
        context.refreshgrid = [];
        var selId = context.inputItems.selectedIds[0];
        if (selId != undefined) {
            context.itemsSource.find(function (item) {
                if (item["ObjectId"] == selId) {
                    switch (event["status"]) {
                        case "success":
                            item["Attachments"] = (Number(item["Attachments"]) + 1).toString();
                            context.Attachmentcount.emit({ "attachcount": item["Attachments"], "selectedId": context.inputItems.selectedIds[0] });
                            break;
                        case "delete":
                            item["Attachments"] = (Number(item["Attachments"]) - 1).toString();
                            context.Attachmentcount.emit({ "attachcount": item["Attachments"], "selectedId": context.inputItems.selectedIds[0] });
                            break;
                    }
                    return true;
                }
                else
                    return false;
            });
            //var updatedData = new Array();/*To notify the watcher about the change*/
            //updatedData = updatedData.concat(context.itemsSource);
            //context.itemsSource = updatedData; 
            context.refreshgrid = context.refreshgrid.concat([true]);
        }
    };
    ObjectDataListinDrawingComponent.prototype.deleteClick = function () {
        var contextObj = this;
        var deletecount;
        this.objectsService.IsObjectInuse(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId).subscribe(function (result) {
            deletecount = result["Data"];
            if (contextObj.itemSelected) {
                if (contextObj.inputItems.selectedIds.length == 0) {
                    contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
                }
                else if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else {
                    if (deletecount == 0) {
                        contextObj.message = "Are you sure you want to delete the selected " + contextObj.objectCategoryName + "? ";
                    }
                    else {
                        contextObj.message = "Selected " + contextObj.objectCategoryName + " is used in Work Order module. Are you sure you want to delete from " + contextObj.modulename + " Module?";
                    }
                    contextObj.showSlide = !contextObj.showSlide;
                }
            }
        });
    };
    ObjectDataListinDrawingComponent.prototype.classSelectionClick = function () {
        var contextObj = this;
        var temp = new Array();
        var tempcombine = new Array();
        var drawingIdsforassigned = new Array();
        var dataoption = contextObj.dataOption;
        var tempdrawingids = "";
        //if (contextObj.fieldDetailsCheckBox != undefined) {
        //    contextObj.secondaryTarget = 6;
        //    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        //}
        //else {
        this.objectsService.getObjectClassSelectionFieldsList(this.objectCategoryId).subscribe(function (result) {
            contextObj.fieldDetailsCheckBox = (result["Data"][0]);
            //contextObj.objectsService.getAssignedFloorlist(50833, 1).subscribe(function (resultData) {
            //    contextObj.assigneddrawingids = JSON.parse(resultData["Data"]["Table3"]);
            //    for (let i = 0; i < contextObj.assigneddrawingids.length; i++) {
            //        drawingIdsforassigned = contextObj.assigneddrawingids[i]["DrawingId"].toString();
            //        tempdrawingids = tempdrawingids + drawingIdsforassigned + ",";
            //    }
            //    tempdrawingids = tempdrawingids;
            //    tempdrawingids = tempdrawingids.slice(0, -1);
            if (dataoption == "3")
                dataoption = "1";
            if (contextObj.dataOption != "2") {
                //contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, tempdrawingids, 2, 1, 0).subscribe(function (resultData) {
                //    contextObj.MultiFieldValuesforassigned = JSON.parse(resultData.Data["FieldBinderData"]);
                //})
                contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, contextObj.drawingIds, 3, 1, 0).subscribe(function (resultData) {
                    contextObj.MultiFieldValuesforunassigned = JSON.parse(resultData.Data["FieldBinderData"]);
                });
            }
            contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, contextObj.drawingIds, dataoption, 1, 0).subscribe(function (resultData) {
                contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                if (contextObj.MultiFieldValues != undefined) {
                    if (contextObj.MultiFieldValues.length > 0)
                        contextObj.fieldDetailsCheckBox.MultiFieldValues = contextObj.MultiFieldValues;
                }
                else {
                    if (contextObj.dataOption == "2") {
                        for (var i = 0; i < contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues.length; i++) {
                            temp[i] = contextObj.fieldDetailsCheckBox.LookupDetails.LookupValues[i]["Id"].toString();
                        }
                        contextObj.fieldDetailsCheckBox.MultiFieldValues = temp;
                    }
                    else if (contextObj.dataOption == "3") {
                        for (var i = 0; i < contextObj.MultiFieldValuesforunassigned.length; i++) {
                            temp[i] = contextObj.MultiFieldValuesforunassigned[i]["Id"].toString();
                        }
                        contextObj.fieldDetailsCheckBox.MultiFieldValues = temp;
                    }
                }
                contextObj.secondaryTarget = 6;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
            contextObj.fieldDetailsCheckBox.FieldLabel = "";
        });
        //});
        //}
    };
    ObjectDataListinDrawingComponent.prototype.attachmentClick = function () {
        this.secondaryTarget = 9;
        var contextObj = this;
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
            }
            else if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else {
                contextObj.tempObjectClassId = contextObj.inputItems.rowData["ObjectClassId"];
                if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined) {
                    contextObj.Isallattachmentmenuneeded = false;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                else {
                    if (contextObj.inputItems.rowData.Status == "Assigned" && contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"]; });
                            if (orgidexists == undefined)
                                contextObj.Isallattachmentmenuneeded = false;
                            else
                                contextObj.Isallattachmentmenuneeded = true;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else
                        //  this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
            }
        }
    };
    ObjectDataListinDrawingComponent.prototype.DelinkClick = function () {
        var contextObj = this;
        var haseditprivilage;
        var delink = "";
        switch (contextObj.objectCategoryId) {
            case 2:
                delink = "warehouse";
                break;
            default:
                delink = "de-link";
                break;
        }
        var editabledivisions = new Array();
        if (this.itemSelected) {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
            }
            else if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else if (this.inputItems.rowData.Status == "Assigned") {
                if (contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] == undefined)
                    contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                else {
                    if (contextObj.sessionUserRoleId == 7 && contextObj.inputItems.rowData["OrgUnitID"] != undefined) {
                        contextObj.objectsService.getUserEditableOrgUnits(contextObj.inputItems.rowData["DrawingId"]).subscribe(function (result) {
                            //contextObj.objectsService.checkEditPrivilageExist(contextObj.inputItems.rowData["SpaceId"]).subscribe(function (result) {
                            //haseditprivilage = contextObj.usereditprivilageforspace(contextObj.inputItems.rowData["SpaceId"]);
                            editabledivisions = JSON.parse(result["Data"]["FieldBinderData"]);
                            var orgidexists = editabledivisions.find(function (item) { return item.OrgUnitId === contextObj.inputItems.rowData["OrgUnitID"]; });
                            if (orgidexists == undefined)
                                contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 5);
                            else {
                                contextObj.message = "Are you sure you want to " + delink + " the selected " + contextObj.objectCategoryName + "? ";
                                contextObj.showSlidedelink = !contextObj.showSlidedelink;
                            }
                        });
                    }
                    else {
                        contextObj.message = "Are you sure you want to " + delink + " the selected " + contextObj.objectCategoryName + "? ";
                        contextObj.showSlidedelink = !contextObj.showSlidedelink;
                    }
                }
            }
            else {
                contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " is not assigned to any space", 2);
            }
        }
    };
    ObjectDataListinDrawingComponent.prototype.Delinkobject = function () {
        //debugger
        var contextObj = this;
        var retUpdatedSrc;
        var selectedClassIds = '';
        var delinked = "", updatestatus = "";
        switch (contextObj.objectCategoryId) {
            case 2:
                delinked = "warehoused";
                updatestatus = "14";
                break;
            default:
                delinked = "de-linked";
                updatestatus = "10";
                break;
        }
        if (this.fieldDetailsCheckBox != undefined) {
            if (this.fieldDetailsCheckBox.MultiFieldValues.length == 1) {
                selectedClassIds = this.fieldDetailsCheckBox.MultiFieldValues[0];
            }
        }
        var arr = new Array();
        //arr = JSON.parse(strsubmitField);
        arr.push({ ReportFieldId: 658, Value: contextObj.objectCategoryId.toString() });
        arr.push({ ReportFieldId: 659, Value: updatestatus });
        arr.push({ ReportFieldId: 665, Value: "" });
        arr.push({ ReportFieldId: 666, Value: "" });
        arr.push({ ReportFieldId: 667, Value: "" });
        arr.push({ ReportFieldId: 668, Value: "" });
        arr.push({ ReportFieldId: 669, Value: "" });
        if (contextObj.inputItems.rowData.SiteId != null) {
            arr.push({ ReportFieldId: 7411, Value: contextObj.inputItems.rowData.SiteId.toString() });
        }
        // //debugger
        contextObj.objectsService.DelinkObjectSpaceData(JSON.stringify(arr), contextObj.inputItems.selectedIds[0], 0, contextObj.objectCategoryId, contextObj.dataOption, 1, selectedClassIds, this.drawingIds, '', 0, 0, 1, 1, contextObj.isBuildingDrawing).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    var datakey = contextObj.inputItems.dataKey;
                    //for (let i = 0; i < contextObj.itemsSource.length; i++) {
                    //    if (contextObj.itemsSource[i][datakey] == JSON.parse(resultData["Data"].Data)[0][datakey]) {
                    //        contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data)[0]
                    //        contextObj.itemsSource[i]["Asset Class Name"] = contextObj.itemsSource[i].ObjectClassName;
                    //        contextObj.itemsSource[i]["Asset No."] = contextObj.itemsSource[i].ObjectNo;
                    //        var updatedData = new Array();/*To notify the watcher about the change*/
                    //        updatedData = updatedData.concat(contextObj.itemsSource);
                    //        contextObj.itemsSource = updatedData;
                    contextObj.DelinkOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedObjectDetails": contextObj.inputItems.rowData });
                    //contextObj.dataLoad(selectedClassIds, 1);
                    var retUpdatedSrc_1 = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc_1["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc_1["itemCount"];
                    if (contextObj.totalItems < 1)
                        contextObj.enableMenu = [1];
                    if (selectedClassIds != '')
                        contextObj.isdelinked = true;
                    contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " has been " + delinked, 3);
                    //    }
                    //}
                    //contextObj.notificationService.ShowToaster("Selected Asset has been de-linked", 3);                        
                    //contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    //retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "edit", resultData["Data"].Data, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster("Object already exists", 5);
                    }
                    break;
            }
        });
    };
    ObjectDataListinDrawingComponent.prototype.placeonclick = function () {
        //debugger
        var contextObj = this;
        if (this.itemSelected) {
            if (contextObj.inputItems.selectedIds.length == 0) {
                contextObj.showSelectMessage(contextObj.objectCategoryId, contextObj);
            }
            else if (this.inputItems.selectedIds.length > 1) {
                contextObj.multipleAssign(); // this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else {
                if (this.inputItems.selectedIds.length == 1 && this.inputItems.rowData.Status == "Assigned") {
                    this.notificationService.ShowToaster("Selected " + this.objectCategoryName + " is already placed", 2);
                }
                else if (this.inputItems.selectedIds.length > 1) {
                }
                else if (this.inputItems.selectedIds.length == 1 && this.inputItems.rowData.Status == contextObj.unassignedTxt) {
                    if (contextObj.inputItems.rowData.SymbolId > 0) {
                        contextObj.PlaceObjectOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "rowData": contextObj.inputItems.rowData });
                    }
                    else {
                        this.notificationService.ShowToaster("Selected " + this.objectCategoryName + " has no Symbol", 2);
                    }
                }
                else {
                    this.notificationService.ShowToaster("Selected " + this.objectCategoryName + " is already placed", 2);
                }
            }
        }
    };
    ObjectDataListinDrawingComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        this.refreshgrid = [];
        var addedclassid = JSON.parse(event["returnData"])[0]["ObjectClassId"].toString();
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            contextObj.UpdatedSuccess.emit({ "updatedData": event["returnData"] });
        }
        if (contextObj.MultiFieldValues != undefined) {
            if (contextObj.MultiFieldValues.indexOf(addedclassid) != -1)
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        if (this.action == "add" && this.totalItems > 0) {
            if (this.dataOption == 3)
                this.enableMenu = [1, 2, 3, 4, 5, 6, 7, 9, 20, 15, 16];
        }
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    ObjectDataListinDrawingComponent.prototype.deleteObjec = function () {
        var contextObj = this;
        contextObj.objectsService.deleteObject(contextObj.inputItems.selectedIds[0], contextObj.objectCategoryId, contextObj.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.IsSearchmenuNeeded = false;
                }
                contextObj.notificationService.ShowToaster("Selected " + contextObj.objectCategoryName + " deleted", 3);
                contextObj.DelinkOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "selectedObjectDetails": contextObj.inputItems.rowData });
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Object cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    //slide events/////
    ObjectDataListinDrawingComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteObjec();
    };
    ObjectDataListinDrawingComponent.prototype.okDelink = function (event) {
        this.showSlidedelink = !this.showSlidedelink;
        this.Delinkobject();
    };
    ObjectDataListinDrawingComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ObjectDataListinDrawingComponent.prototype.cancelDelinClick = function (event) {
        this.showSlidedelink = !this.showSlidedelink;
    };
    ObjectDataListinDrawingComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ObjectDataListinDrawingComponent.prototype.closeSlideDialogdelink = function (value) {
        this.showSlidedelink = value.value;
    };
    ObjectDataListinDrawingComponent.prototype.getUpdatedDisplaySettings = function (event) {
        var contextObj = this;
        var SpaceDisplayFields = this.generFun.updateSpacePrefixInDisplaySettings(event["dispSettingObject"]);
        this.fieldObjectGrid = this.generFun.updateDisplaySettingsinUI(this.fieldObjectGrid, SpaceDisplayFields);
        //  this.fieldObjectGrid = this.generFun.updateDisplaySettingsinUI(this.fieldObjectGrid, event["dispSettingObject"]);
        //this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    ObjectDataListinDrawingComponent.prototype.getSessionUserData = function (contextObj) {
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
    };
    ObjectDataListinDrawingComponent.prototype.usereditprivilageforspace = function (selectedSpaceid) {
        var contextObj = this;
        contextObj.objectsService.checkEditPrivilageExist(contextObj.inputItems.rowData["SpaceId"]).subscribe(function (result) {
            contextObj.haseditprivilage = result.ServerId;
            return contextObj.haseditprivilage;
        });
    };
    ObjectDataListinDrawingComponent.prototype.itemSelected = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a row", 2);
            return false;
        }
        return true;
    };
    ObjectDataListinDrawingComponent.prototype.onloadSearch = function (event) {
        var contextObj = this;
        contextObj.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        this.searchindex = 1;
        this.exportSearchIndex = 1;
        contextObj.keywordSearchdata();
    };
    ObjectDataListinDrawingComponent.prototype.keywordSearchdata = function () {
        var contextObj = this;
        var dataoptionno = contextObj.dataOption;
        contextObj.IsSearchmenuNeeded = true;
        var SortColumn = contextObj.inputItems.sortCol;
        var totalitems = contextObj.totalItems;
        //if (contextObj.inputItems.sortCol == "[Asset No.]")
        //    SortColumn = "[ObjectNo]"
        //else if (contextObj.inputItems.sortCol == "[Asset Class Name]")
        //    SortColumn = "[ObjectClassName]"
        if (contextObj.filter == "Assigned")
            dataoptionno = "2";
        else if (contextObj.filter == contextObj.unassignedTxt)
            dataoptionno = "3";
        if (contextObj.filter == "Assigned" && contextObj.dataOption == "3") {
            contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
            contextObj.itemsSource = [];
            contextObj.totalItems = 0;
            contextObj.changeEnableMenu(false);
        }
        else if (contextObj.filter == contextObj.unassignedTxt && contextObj.dataOption == "2") {
            contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
            contextObj.itemsSource = [];
            contextObj.totalItems = 0;
            contextObj.changeEnableMenu(false);
        }
        else {
            contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataoptionno, 1, '', this.drawingIds, '', false, 0, true, 1, 0, SortColumn, contextObj.inputItems.sortDir, contextObj.filter, false, contextObj.isBuildingDrawing).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    contextObj.totalItems = JSON.parse(result["DataCount"]);
                    contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        //contextObj.totalItems = totalitems;
                        contextObj.changeEnableMenu(false);
                    }
                    else {
                        if (contextObj.dataOption == 2 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 1, searchItems: contextObj.itemsSource, moduleId: contextObj.moduleId });
                        contextObj.changeEnableMenu(true);
                    }
                    //contextObj.IsKeyWordSearch = 0;
                    contextObj.searchindex = 0;
                }
            });
        }
    };
    ObjectDataListinDrawingComponent.prototype.Submit = function (event) {
        var contextObj = this;
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.searchindex = 2;
        this.IsAdvanceSearch = 1;
        this.exportSearchIndex = 2;
        contextObj.AdvancedSearchdata();
    };
    ObjectDataListinDrawingComponent.prototype.AdvancedSearchdata = function () {
        var contextObj = this;
        var dataoptionno = contextObj.dataOption;
        contextObj.IsSearchmenuNeeded = true;
        contextObj.filter = "";
        var SortColumn = contextObj.inputItems.sortCol;
        var totalitems = contextObj.totalItems;
        //if (contextObj.inputItems.sortCol == "[Asset No.]")
        //    SortColumn = "[ObjectNo]"
        //else if (contextObj.inputItems.sortCol == "[Asset Class Name]")
        //    SortColumn = "[ObjectClassName]"
        if (contextObj.advanceValue.indexOf("Assigned") > 0)
            dataoptionno = "2";
        else if (contextObj.advanceValue.indexOf(contextObj.unassignedTxt) > 0)
            dataoptionno = "3";
        if (contextObj.advanceValue.indexOf("Assigned") > 0 && contextObj.dataOption == "3") {
            contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
            contextObj.itemsSource = [];
            contextObj.totalItems = 0;
            contextObj.changeEnableMenu(false);
        }
        else if (contextObj.advanceValue.indexOf(contextObj.unassignedTxt) > 0 && contextObj.dataOption == "2") {
            contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
            contextObj.itemsSource = [];
            contextObj.totalItems = 0;
            contextObj.changeEnableMenu(false);
        }
        else {
            contextObj.objectsService.getObjectSpaceData(contextObj.PageTarget, contextObj.IsKeyWordSearch, contextObj.IsAdvanceSearch, contextObj.objectCategoryId, dataoptionno, 1, '', this.drawingIds, '', false, 0, true, 1, 0, SortColumn, contextObj.inputItems.sortDir, contextObj.advanceValue, false, contextObj.isBuildingDrawing).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    contextObj.totalItems = JSON.parse(result["DataCount"]);
                    contextObj.itemsSource = JSON.parse(result["FieldBinderData"]);
                    if (contextObj.totalItems == 0) {
                        contextObj.notificationService.ShowToaster("No data exists for the search criteria", 2);
                        //contextObj.totalItems = totalitems;
                        contextObj.changeEnableMenu(false);
                    }
                    else {
                        contextObj.changeEnableMenu(true);
                        if (contextObj.dataOption == 2 && contextObj.filter != "")
                            contextObj.onSearchInDrawing.emit({ searchType: 2, searchItems: contextObj.itemsSource, moduleId: contextObj.moduleId });
                    }
                    //contextObj.IsAdvanceSearch = 0;
                    contextObj.searchindex = 0;
                }
            });
        }
    };
    //updateAssetClass(fieldObjectArray) {
    //    var contextObject = this;
    //    fieldObjectArray.find(function (item: IField) {
    //        switch (item.ReportFieldId) {
    //            case 648:
    //                item.FieldValue = contextObject.inputItems.rowData[""];
    //                break;
    //            case 647:
    //                item.FieldValue = contextObject.inputItems.rowData[""];
    //                break;
    //        }
    //    });
    //    return fieldObjectArray;
    //}
    ObjectDataListinDrawingComponent.prototype.getSelectedTab = function (event) {
        this.dispTab = event[0];
    };
    ObjectDataListinDrawingComponent.prototype.getCusSubscribedFeatures = function () {
        var contextObj = this;
        contextObj.AdministrationService.getCustomerSubscribedFeatures("189").subscribe(function (rt) {
            var customerFeatureobj = rt["Data"];
            for (var i = 0; i < customerFeatureobj.length; i++) {
                switch (customerFeatureobj[i]["Id"]) {
                    case 189:
                        contextObj.isSiteAdmin = customerFeatureobj[i]["IsSubscribed"];
                        break;
                }
            }
        });
    };
    ObjectDataListinDrawingComponent.prototype.closeMultipleAssign = function (value) {
        this.showMultipleAssign = value.value;
    };
    ObjectDataListinDrawingComponent.prototype.cancelMultipleAssign = function (event) {
        this.showMultipleAssign = !this.showMultipleAssign;
    };
    ObjectDataListinDrawingComponent.prototype.okMultipleAssign = function (event) {
        var contextObj = this;
        contextObj.showMultipleAssign = !contextObj.showMultipleAssign;
        contextObj.PlaceObjectOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "rowData": contextObj.inputItems });
    };
    ObjectDataListinDrawingComponent.prototype.onSplitViewClose = function (event) {
        if (this.secondaryTarget == 17) {
            if (this.searchindex == 0) {
                if (this.SelectedclassIds != "") {
                    this.dataLoad(this.SelectedclassIds, 0);
                }
                else {
                    this.dataLoad('', 0);
                }
            }
            else if (this.searchindex == 1)
                this.keywordSearchdata();
            else if (this.searchindex == 2)
                this.AdvancedSearchdata();
        }
    };
    ObjectDataListinDrawingComponent.prototype.onMultipleEditClick = function () {
        var contextObj = this;
        contextObj.commonService.getFieldsForMultipleEdit(contextObj.objectsService.objectDataAddEditFormId, contextObj.getReportFieldIdValuesForMultipleEdit()).subscribe(function (resultData) {
            contextObj.multipleEditFieldDetails = JSON.parse(resultData);
            contextObj.secondaryTarget = 17;
            contextObj.pageTitle = "Multiple Update";
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    ObjectDataListinDrawingComponent.prototype.getReportFieldIdValuesForMultipleEdit = function () {
        var reportFieldValueAraay = [{ ReportFieldId: 67, Value: this.objectCategoryId.toString() }];
        var objectClassId = this.inputItems.rowData[0]["ObjectClassId"];
        for (var _i = 0, _a = this.inputItems.rowData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (objectClassId != item["ObjectClassId"]) {
                objectClassId = 0;
                break;
            }
        }
        reportFieldValueAraay.push({ ReportFieldId: 657, Value: objectClassId.toString() });
        return JSON.stringify(reportFieldValueAraay);
    };
    ObjectDataListinDrawingComponent.prototype.onMultipleEditUpdate = function (event) {
        for (var _i = 0, _a = this.inputItems.selectedIds; _i < _a.length; _i++) {
            var item = _a[_i];
            event.ReportFieldIdValuesArray.push({ ReportFieldId: 656, Value: item });
        }
        var contextObj = this;
        contextObj.objectsService.updateMultipleobjectData(JSON.stringify(event.ReportFieldIdValuesArray), event.ReportFieldId, event.NewValue).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster(contextObj.objectCategoryName + " details updated", 2);
                    break;
                default:
                    break;
            }
        });
    };
    ObjectDataListinDrawingComponent.prototype.showSelectMessage = function (objectCategoryId, contextObj) {
        switch (objectCategoryId) {
            case 1:
            case 3:
            case 20:
                contextObj.notificationService.ShowToaster("Select an " + contextObj.classname, 2);
                break;
            case 2:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                contextObj.notificationService.ShowToaster("Select a " + contextObj.classname, 2);
                break;
        }
    };
    ObjectDataListinDrawingComponent.prototype.onContextMenuOnClick = function (event) {
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObjectGrid;
            this.analyticsInput.selectedIds = this.drawingIds;
            this.analyticsInput.moduleId = this.moduleId;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
            this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch;
            this.analyticsInput.KeywordFilterValue = this.filter;
            this.analyticsInput.AdvanceFilterValue = this.advanceValue;
            this.analyticsInput.FormId = 207;
            this.analyticsInput.ParentFormId = 273;
            this.analyticsInput.objectCategoryId = this.objectCategoryId;
            this.analyticsInput.dataOption = this.dataOption;
            this.analyticsInput.attributeOption = this.attributeoption;
            this.analyticsInput.objectClassIds = this.SelectedclassIds; //classId
            this.analyticsInput.searchCondition = '';
            this.analyticsInput.isOrphan = false;
            this.analyticsInput.objectId = 0;
            this.analyticsInput.isDataBasedOnUserAccess = true;
            this.analyticsInput.objectComponentType = 1;
            this.showAnalytics = true;
        }
    };
    ObjectDataListinDrawingComponent.prototype.closeAnalytics = function () {
        this.showAnalytics = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "updateObjectsDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "updateDataSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "Targetforstyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ObjectDataListinDrawingComponent.prototype, "IsObjectPlaced", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ObjectDataListinDrawingComponent.prototype, "IsObjectMoved", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "ObjectDelinked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "selectedRow", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "submitSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "UpdatedSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "showZoomOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "showInDrawingOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "PlaceObjectOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "DelinkOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "Attachmentcount", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataListinDrawingComponent.prototype, "onSearchInDrawing", void 0);
    ObjectDataListinDrawingComponent = __decorate([
        core_1.Component({
            selector: 'objectData-listindrawing',
            templateUrl: './app/Views/Objects/Data/objectData-listindrawing.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, displaysettings_component_1.DisplaySettingsComponent, dropdownlistcomponent_component_1.DropDownListComponent, attachments_component_1.AttachmentsComponent,
                listboxcomponent_component_1.ListBoxComponent, objectData_addedit_component_1.ObjectDataAddEditComponent, search_component_1.searchBox, warranty_list_component_1.WarrantyListComponent, multiple_edit_component_1.MultipleEdit, analytics_component_1.Analytics],
            providers: [objects_service_1.ObjectsService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, exporttoexcel_service_1.ExportToExcel, common_service_1.CommonService],
            inputs: ["objectCategoryId", "dataOption", "drawingIds", "moduleId", "SiteId", "isBuildingDrawing"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, objects_service_1.ObjectsService, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, http_1.Http, exporttoexcel_service_1.ExportToExcel, common_service_1.CommonService])
    ], ObjectDataListinDrawingComponent);
    return ObjectDataListinDrawingComponent;
}());
exports.ObjectDataListinDrawingComponent = ObjectDataListinDrawingComponent;
//# sourceMappingURL=objectData-listindrawing.component.js.map
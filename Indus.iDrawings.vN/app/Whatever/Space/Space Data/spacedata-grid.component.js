var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/common/common.service.ts" />
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var space_service_1 = require('../../../Models/Space/space.service');
var spacedata_addedit_component_1 = require('./spacedata-addedit.component');
var assignspacestd_component_1 = require('./assignspacestd.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var spaceResourceList_1 = require('./spaceResourceList');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var drawing_service_1 = require('../../../framework/models/drawings/drawing.service');
var scheduling_service_1 = require('../../../models/scheduling/scheduling.service');
var common_service_1 = require('../../../models/common/common.service');
var multiple_edit_component_1 = require('../../../framework/whatever/multipleedit/multiple-edit.component');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var seatlist_component_1 = require('../../Scheduling/Seat Booking/seatlist.component');
var analytics_component_1 = require('../../common/analytics/analytics.component');
var SpaceDataGridComponent = (function () {
    function SpaceDataGridComponent(dwgServices, spaceService, AdministrationService, SchedulingService, notificationService, generFun, exportObject, commonService) {
        this.dwgServices = dwgServices;
        this.spaceService = spaceService;
        this.AdministrationService = AdministrationService;
        this.SchedulingService = SchedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.exportObject = exportObject;
        this.commonService = commonService;
        this.handleField = new Array();
        this.gridHeight = "100%";
        this.disable = false;
        this.moduleId = 3;
        this.arrHighlightRowIds = [];
        this.inputItems = { dataKey: "SpaceId", groupBy: [], grpWithCheckBx: true, allowAdd: false, allowEdit: false, sortDir: "ASC", showContextMenu: true, sortCol: "Site" };
        this.analyticsInput = { menuId: 0 };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.isAddEdit = false;
        this.isAttachment = false;
        this.isResource = false;
        this.blnIsGrid = true;
        this.dispSettingCategoryId = 1;
        this.additionalDataField = 7;
        this.pageTitle = "";
        this.Target = 0;
        this.strPopupText = "";
        this.blnDispSettingClick = false;
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        this.enableMenu = [];
        this.menuData = [];
        this.position = "center";
        this.showSlide = false;
        this.slidewidth = 250;
        this.isSmartSearch = false;
        this.sessionUserRoleId = 0;
        this.showbtndeassign = false;
        this.height = "calc(100% - 50px)";
        //gridResize = false;
        this.showZoomOnClick = new core_1.EventEmitter();
        this.showInDrawingOnClick = new core_1.EventEmitter();
        this.editedSpaceDataInDrawing = new core_1.EventEmitter();
        this.setAttachmentCount = new core_1.EventEmitter();
        this.getSelectedSpaceGridID = new core_1.EventEmitter();
        this.onSearchInDrawing = new core_1.EventEmitter();
        this.onMultipleEditUpdateData = new core_1.EventEmitter();
        this.showSlideExport = false;
        this.currentModuleId = 3;
        this.Stylename = "";
        this.isSeatBookingFeture = false;
        this.hyperLinkText = "";
        this.showAnalytics = false;
        this.enableAminity = false;
        this.rearrangeItemSource = function (selectedRows, resCallback) {
            var itemSourcedata = this.itemsSource.slice();
            var selectedSpaceIds = selectedRows;
            var selectedRowDatas = [];
            for (var i = 0; i < selectedSpaceIds.length; i++) {
                var index = itemSourcedata.findIndex(function (el) { return el.SpaceId == selectedSpaceIds[i]; });
                if (index != -1) {
                    selectedRowDatas.push(itemSourcedata[index]);
                    itemSourcedata.splice(index, 1);
                }
            }
            var data = selectedRowDatas.concat(itemSourcedata);
            this.itemsSource = data;
            resCallback(0);
        };
        var contextObj = this;
        contextObj.dwgServices.getCustomerSettings().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                switch (resultData["Data"][i]["Id"]) {
                    case 31:
                        contextObj.g_IsNetCustomer = resultData["Data"][i]["FeatureLookupId"] == "1" ? false : true;
                        break;
                }
            }
        });
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            contextObj.userRoleId = retData["UserRoleId"];
        });
        contextObj.spaceService.checkSubscribedFeature('187').subscribe(function (result) {
            contextObj.isSeatBookingFeture = result["Data"][0]["IsSubscribed"];
        });
        contextObj.SchedulingService.checkSubscribedFeature('282').subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"]) {
                contextObj.enableAminity = result["Data"][0]["IsSubscribed"];
            }
        });
    }
    SpaceDataGridComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        if (changes["highlightRows"] && changes["highlightRows"]["currentValue"]) {
            if (this.highlightRows.length > 0) {
                this.rearrangeItemSource(this.highlightRows.slice(), function (retcode) {
                    contextObj.arrHighlightRowIds = [];
                    setTimeout(function () {
                        contextObj.arrHighlightRowIds = contextObj.arrHighlightRowIds.concat(contextObj.highlightRows);
                    }, 100);
                });
            }
            else
                contextObj.arrHighlightRowIds = [];
        }
        if (changes["UpdateData"] && changes["UpdateData"]["currentValue"]) {
            if (this.UpdateData.length > 0 && this.UpdateData[0]['isEdit'] != undefined) {
                if (this.UpdateData[0]['isEdit']) {
                    if (this.UpdateData[0]['fromAttchment']) {
                        this.action = 'attachment';
                    }
                    else {
                        this.action = 'edit';
                    }
                    this.submitReturn(this.UpdateData[0]['event']);
                }
                else {
                    this.asignDeassignReturn(this.UpdateData[0]['event']);
                }
            }
        }
    };
    SpaceDataGridComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        if (this.moduleId == 14) {
            this.dispSettingCategoryId = 29;
            this.additionalDataField = 7;
            this.currentModuleId = 14;
        }
        if (this.moduleId == 12) {
            this.dispSettingCategoryId = 2;
            this.additionalDataField = 7;
            this.currentModuleId = 12;
        }
        switch (contextObj.pageTarget) {
            case 1:
            case 5:
                contextObj.menuData = [{
                        "id": 2,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 413
                    },
                    {
                        "id": 3,
                        "title": "Assign Space Standard",
                        "image": "Assign Space Standard",
                        "path": "Assign Space Standard",
                        "submenu": null,
                        "privilegeId": 413
                    },
                    //{
                    //    "id": 12,
                    //    "title": "Seats",
                    //    "image": "Seats",
                    //    "path": "Seats",
                    //    "submenu": null
                    //},
                    {
                        "id": 4,
                        "title": "Totalize",
                        "image": "Totalize",
                        "path": "Totalize",
                        "submenu": null,
                        "privilegeId": 423
                    },
                    {
                        "id": 6,
                        "title": "Attachments",
                        "image": "Attachments",
                        "path": "Attachments",
                        "subMenu": null,
                        "privilegeId": 424
                    },
                    {
                        "id": 5,
                        "title": "Display Settings",
                        "image": "DisplaySettings",
                        "path": "DisplaySettings",
                        "subMenu": null,
                        "privilegeId": 425
                    },
                    //{
                    //    "id": 7,
                    //    "title": "Resources",
                    //    "image": "Resources",
                    //    "subMenu": null,
                    //    "privilegeId": 1528
                    //},
                    {
                        "id": 8,
                        "title": "Show Drawing",
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null,
                        "privilegeId": 512
                    },
                    {
                        "id": 9,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null,
                        "privilegeId": 513
                    },
                    {
                        "id": 10,
                        "title": "Export",
                        "image": "Export",
                        "path": "Export",
                        "subMenu": null,
                        "privilegeId": 424
                    }
                ];
                break;
            case 2:
                contextObj.menuData = [
                    {
                        "id": 8,
                        "title": "Show Drawing",
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null,
                        "privilegeId": 512
                    },
                    {
                        "id": 9,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null,
                        "privilegeId": 513
                    },
                    {
                        "id": 10,
                        "title": "Export",
                        "image": "Export",
                        "path": "Export",
                        "subMenu": null,
                        "privilegeId": 424
                    }
                ];
                break;
            case 3:
                contextObj.isSmartSearch = true;
                contextObj.height = "100%";
                contextObj.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
                contextObj.position = 'top-right';
                contextObj.menuData = [{
                        "id": 2,
                        "title": "Edit",
                        "image": "Edit",
                        "path": "Edit",
                        "submenu": null,
                        "privilegeId": 413
                    },
                    {
                        "id": 8,
                        "title": "Show Drawing",
                        "image": "Show Drawing",
                        "path": "Show Drawing",
                        "submenu": null,
                        "privilegeId": 512
                    },
                    {
                        "id": 9,
                        "title": "Show Zoomed",
                        "image": "Show Zoomed",
                        "path": "Show Zoomed",
                        "submenu": null,
                        "privilegeId": 513
                    },
                    {
                        "id": 11,
                        "title": "More",
                        "image": "More",
                        "path": "More",
                        "subMenu": [
                            {
                                "id": 4,
                                "title": "Totalize",
                                "image": "Totalize",
                                "path": "Totalize",
                                "submenu": null,
                                "privilegeId": 423
                            },
                            {
                                "id": 3,
                                "title": "Assign Space Standard",
                                "image": "Assign Space Standard",
                                "path": "Assign Space Standard",
                                "submenu": null,
                                "privilegeId": 413
                            },
                            {
                                "id": 5,
                                "title": "Display Settings",
                                "image": "DisplaySettings",
                                "path": "DisplaySettings",
                                "subMenu": null,
                                "privilegeId": 424
                            },
                            {
                                "id": 6,
                                "title": "Attachments",
                                "image": "Attachments",
                                "path": "Attachments",
                                "subMenu": null,
                                "privilegeId": 424
                            },
                            //{
                            //    "id": 7,
                            //    "title": "Resources",
                            //    "image": "Resources",
                            //    "subMenu": null,
                            //    "privilegeId": 1528
                            //},
                            {
                                "id": 10,
                                "title": "Export",
                                "image": "Export",
                                "path": "Export",
                                "subMenu": null,
                                "privilegeId": 424
                            }
                        ]
                    }
                ];
                break;
        }
        /*Assignspacestd menu filtering based on Emp /Sched module subscription*/
        contextObj.AdministrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var enableEmpandSched = [];
            enableEmpandSched = resultData["Data"].filter(function (item) {
                return (item.ModuleId == 5 || item.ModuleId == 14);
            });
            if (((enableEmpandSched.length == 0 || contextObj.moduleId == 12) && (contextObj.pageTarget == 1 || contextObj.pageTarget == 5))) {
                contextObj.menuData = contextObj.menuData.filter(function (ite) { return ite.id != 3; });
            }
            if (contextObj.pageTarget == 3 && (enableEmpandSched.length == 0 || contextObj.moduleId == 12)) {
                var itemArry = [];
                contextObj.menuData.find(function (ite) {
                    if (ite.id == 11) {
                        itemArry = ite["subMenu"].filter(function (item) {
                            return item.id != 3;
                        });
                        ite.subMenu = itemArry;
                        return true;
                    }
                    else
                        return false;
                });
            }
            var callBack = function (data) {
                contextObj.menuData = data;
            };
            contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 116, contextObj.AdministrationService, contextObj.menuData.length);
        });
        contextObj.spaceService.getSpaceGridField(contextObj.moduleId).subscribe(function (result) {
            //if (contextObj.generFun.checkForUnhandledErrors(result)) {
            if (contextObj.pageTarget == 2 || contextObj.pageTarget == 3) {
                var rptField_1 = [1772, 488, 523];
                var count_1 = rptField_1.length;
                result["Data"].find(function (item) {
                    if (rptField_1.indexOf(item.ReportFieldId) >= 0) {
                        item.IsVisible = false;
                        count_1--;
                        if (count_1 == 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            var rptField = [];
            var count = 0;
            if (contextObj.moduleId == 14 || contextObj.moduleId == 3) {
                var rptField_2 = [6729, 6731];
            }
            else if (contextObj.moduleId == 12) {
                rptField = [1629, 817, 6730];
                count = rptField.length;
            }
            //result["Data"].find(function (item) {
            //    if (rptField.indexOf(item.ReportFieldId) != -1) {
            //        if (item.ReportFieldId == 817 || item.ReportFieldId == 6730) { //80002
            //            item.IsVisible = false;
            //        } else {
            //            item.IsVisible = true;
            //        }
            //        count--;
            //    } if (count == 0) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //});
            contextObj.fieldObject = result["Data"];
            // }
        });
        contextObj.dataLoad(1, contextObj, 1);
        contextObj.getSessionUserData(contextObj);
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
                    contextObj.gridHeight = window.innerHeight - 250;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
            case 3:
            case 4:
                contextObj.Stylename = "search-containerInlinefromgrid";
                if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
                    contextObj.gridHeight = window.innerHeight - 240;
                    contextObj.gridHeight = contextObj.gridHeight + "px";
                }
                break;
            default:
                contextObj.Stylename = "search-container";
        }
        if (this.pageTarget != 5) {
            setTimeout(function () {
                contextObj.spaceService.getSpaceKeywordField(contextObj.currentModuleId, contextObj.selectedDrwgIds).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        contextObj.KeywordFieldObject = resultData["FieldBinderList"];
                    }
                });
                contextObj.spaceService.getSpaceGridDataKeyWordLookUp(contextObj.currentModuleId, contextObj.selectedDrwgIds).subscribe(function (resultData) {
                    contextObj.keyWordLookup = resultData["FieldBinderList"];
                });
            }, 3000);
        }
    };
    SpaceDataGridComponent.prototype.getSessionUserData = function (contextObj) {
        contextObj.AdministrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
    };
    SpaceDataGridComponent.prototype.advanceSearch = function () {
        var contextObj = this;
        if (contextObj.advancelookup == undefined)
            this.spaceService.getAdvnceSearchLookup(this.currentModuleId, this.selectedDrwgIds).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    if (contextObj.pageTarget == 3 || contextObj.pageTarget == 5 || contextObj.pageTarget == 2) {
                        if (contextObj.pageTarget == 2) {
                            var rptField_3 = [786, 787, 782];
                            var count = rptField_3.length;
                            var fldData = resultData["Data"]["FieldBinderList"].filter(function (item) {
                                if (rptField_3.indexOf(item.ReportFieldId) >= 0) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            });
                        }
                        else {
                            debugger;
                            var rptField_4 = [1772, 488, 523];
                            if (contextObj.currentModuleId != 12) {
                                rptField_4.push(1629);
                            }
                            var count = rptField_4.length;
                            var fldData = resultData["Data"]["FieldBinderList"].filter(function (item) {
                                return rptField_4.indexOf(item.ReportFieldId) == -1;
                            });
                            if (contextObj.moduleId == 12) {
                                var remArr = [817, 6730, 6729, 6731];
                                fldData = fldData.filter(function (el) { return remArr.indexOf(el.ReportFieldId) == -1; });
                            }
                        }
                        //if (contextObj.currentModuleId == 3) {
                        //    fldData = fldData.filter(function (item) {
                        //        return (item.ReportFieldId != 1629);
                        //    });
                        //}
                        console.log(fldData, "dsfs");
                        contextObj.advancelookup = fldData;
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    }
                    else {
                        if (contextObj.currentModuleId == 14 || contextObj.currentModuleId == 3) {
                            resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el['ReportFieldId'] !== 1629; });
                            var index = resultData["Data"]["FieldBinderList"].findIndex(function (el) { return el['FieldId'] == 2295; });
                            resultData["Data"]["FieldBinderList"][index]['IsVisible'] = true;
                            var index1 = resultData["Data"]["FieldBinderList"].findIndex(function (el) { return el['FieldId'] == 2297; });
                            if (contextObj.isSeatBookingFeture == true)
                                resultData["Data"]["FieldBinderList"][index1]['IsVisible'] = true;
                        }
                        else if (contextObj.currentModuleId == 12) {
                            var index = resultData["Data"]["FieldBinderList"].findIndex(function (el) { return el['ReportFieldId'] == 1629; });
                            resultData["Data"]["FieldBinderList"][index]['IsVisible'] = true;
                            var removearray = [6729, 6730, 6731, 817];
                            resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el, i) {
                                return (removearray.indexOf(el.ReportFieldId) == -1);
                            });
                        }
                        if (contextObj.isSeatBookingFeture == false) {
                            resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el['ReportFieldId'] !== 6731; });
                        }
                        //if (contextObj.currentModuleId == 3) {
                        //    resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el.ReportFieldId != 1629 });
                        //    resultData["Data"]["FieldBinderList"] = resultData["Data"]["FieldBinderList"].filter(function (el) { return el.ReportFieldId != 6731 });
                        //}
                        contextObj.advancelookup = resultData["Data"]["FieldBinderList"];
                        contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookup));
                    }
                }
            });
    };
    SpaceDataGridComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0, contextObj);
    };
    ;
    SpaceDataGridComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.dataLoad(0, contextObj);
    };
    SpaceDataGridComponent.prototype.dataLoad = function (target, context, onLoad, id) {
        if (context.selectedDrwgIds && this.selectedDrwgIds[0] != "0") {
            context.spaceService.getSpaceGridData(this.currentModuleId, this.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, id).subscribe(function (result) {
                if (context.generFun.checkForUnhandledErrors(result)) {
                    context.totalItems = result["Data"].DataCount;
                    if (context.totalItems > 0) {
                        context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                        if (target == 1) {
                            context.itemsPerPage = result["Data"].RowsPerPage;
                            context.totalRowData = context.totalItems;
                        }
                        if (context.IsKeyWordSearch == 1 && context.IsAdvanceSearch == 0 && context.filter != "")
                            context.onSearchInDrawing.emit({ searchType: 1, searchItems: context.itemsSource, moduleId: 3 });
                        else if (context.IsKeyWordSearch == 0 && context.IsAdvanceSearch == 1 && context.totalRowData != context.totalItems)
                            context.onSearchInDrawing.emit({ searchType: 2, searchItems: context.itemsSource, moduleId: 3 });
                    }
                    else {
                        if (onLoad == 1) {
                            context.disable = true;
                        }
                        context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                        if (context.currentModuleId == 14) {
                            context.notificationService.ShowToaster("No Scheduling data exists", 2);
                        }
                        else {
                            context.notificationService.ShowToaster("No Space data exists", 2);
                        }
                    }
                }
            });
        }
        else if (context.qResult) {
            if (onLoad == 1) {
                context.itemsSource = JSON.parse(context.qResult.FieldBinderData);
                context.itemsPerPage = context.qResult.RowsPerPage;
                context.totalRowData = context.qResult.DataCount;
                context.totalItems = context.qResult.DataCount;
            }
            else {
                context.commonService.QueryBuilderSeachResult(516, context.buildarray, context.QueryCategryId, 0, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol).subscribe(function (result) {
                    // context.spaceService.getSpaceGridData(this.currentModuleId, this.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, id).subscribe(function (result) {
                    context.totalItems = result.DataCount;
                    if (context.totalItems > 0) {
                        context.itemsSource = JSON.parse(result.FieldBinderData);
                        if (target == 1) {
                            context.itemsPerPage = result.RowsPerPage;
                            context.totalRowData = context.totalItems;
                        }
                        if (context.IsKeyWordSearch == 1 && context.IsAdvanceSearch == 0 && context.filter != "")
                            context.onSearchInDrawing.emit({ searchType: 1, searchItems: context.itemsSource, moduleId: 3 });
                        else if (context.IsKeyWordSearch == 0 && context.IsAdvanceSearch == 1 && context.totalRowData != context.totalItems)
                            context.onSearchInDrawing.emit({ searchType: 2, searchItems: context.itemsSource, moduleId: 3 });
                    }
                    else {
                        if (onLoad == 1) {
                            context.disable = true;
                        }
                        context.itemsSource = JSON.parse(result.FieldBinderData);
                        if (context.currentModuleId == 14) {
                            context.notificationService.ShowToaster("No Scheduling data exists", 2);
                        }
                        else {
                            context.notificationService.ShowToaster("No Space data exists", 2);
                        }
                    }
                });
            }
        }
    };
    SpaceDataGridComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 1:
                contextObj.Target = 1;
                this.isAttachment = false;
                this.addClick();
                break;
            case 2:
                contextObj.Target = 2;
                this.isAttachment = false;
                var title;
                if (contextObj.currentModuleId == 14) {
                    title = "Edit Scheduling Data";
                }
                else {
                    title = "Edit Space Data";
                }
                contextObj.pageTitle = title;
                this.editClick();
                break;
            case 3:
                contextObj.Target = 3;
                this.isAttachment = false;
                contextObj.pageTitle = "Assign Space Standard";
                this.assignSpaceStdClick();
                break;
            case 4:
                contextObj.Target = 4;
                this.isAttachment = false;
                this.totalizeClick();
                break;
            case 5:
                contextObj.Target = 5;
                contextObj.pageTitle = "Display Settings";
                this.displaySettingsClick();
                break;
            case 6:
                contextObj.Target = 6;
                contextObj.pageTitle = "Attachments";
                this.attachmentClick();
                break;
            case 7:
                contextObj.Target = 7;
                contextObj.pageTitle = "";
                this.spaceResource();
                this.isAttachment = false;
                break;
            case 8:
                contextObj.checkDrawingIds(1);
                break;
            case 9:
                contextObj.checkDrawingIds(2);
                break;
            case 10:
                contextObj.Target = 10; //export
                contextObj.Export();
                break;
            case 12:
                contextObj.Target = 11; //export
                contextObj.hotellingSeats();
                break;
        }
    };
    SpaceDataGridComponent.prototype.checkDrawingIds = function (target) {
        var contextObj = this;
        var spaceIdsInput = "";
        var drawingId;
        if (contextObj.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else {
            if (contextObj.pageTarget == 2) {
                if (target == 1)
                    contextObj.showInDrawingOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds });
                else
                    contextObj.showZoomOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds });
            }
            else {
                this.spaceService.checkSpaceForDrawing(this.inputItems.selectedIds).subscribe(function (result) {
                    drawingId = JSON.parse(result["Data"].FieldBinderData)[0].DrawingId;
                    if (drawingId > 0) {
                        if (target == 1)
                            contextObj.showInDrawingOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "drawingId": drawingId });
                        else
                            contextObj.showZoomOnClick.emit({ "selectedIds": contextObj.inputItems.selectedIds, "drawingId": drawingId });
                    }
                    else
                        contextObj.notificationService.ShowToaster("The selected records are of different floors", 2);
                });
            }
        }
    };
    SpaceDataGridComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Add";
        var contextObj = this;
        this.spaceService.loadSpaceAddEdit(this.inputItems.selectedIds[0], 1).subscribe(function (result) {
            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                this.fieldDetailsAdd = result["Data"];
            }
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    SpaceDataGridComponent.prototype.editClick = function () {
        this.action = "edit";
        var isShareSpace = true;
        var assignementtype = "";
        var roomnumber = "";
        var isShare = false;
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else if (this.inputItems.selectedIds.length > 1) {
            //bug 76283
            if (this.sessionUserRoleId == 7)
                this.notificationService.ShowToaster('This operation can be performed only one row at a time', 3);
            else
                this.onMultipleEditClick();
        }
        else {
            var ret = this.chkSelectedSpaceKey(this.inputItems.selectedIds[0], 1);
            if (this.selectedDrwgIds[0].toString() == "0") {
                this.selectedDrwgIds[0] = this.inputItems.rowData.DrawingId;
            }
            if (ret) {
                contextObj.spaceService.checkEditPrivilageExist(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData.ServerId > 0) {
                        contextObj.spaceService.loadSpaceAddEdit(contextObj.inputItems.selectedIds[0], 2).subscribe(function (result) {
                            if (contextObj.generFun.checkForUnhandledErrors(result)) {
                                contextObj.fieldDetailsAdd = contextObj.setDisableField(result["Data"], contextObj);
                                contextObj.AdministrationService.getCustomerSubscribedFeatures("156").subscribe(function (rt) {
                                    if (contextObj.generFun.checkForUnhandledErrors(rt)) {
                                        if (rt["Data"][0].IsSubscribed == true && contextObj.userRoleId != 7) {
                                            var count = 0;
                                            contextObj.fieldDetailsAdd.find(function (item) {
                                                switch (item.ReportFieldId) {
                                                    case 6729:
                                                        assignementtype = item.FieldValue;
                                                        count++;
                                                        break;
                                                    case 793:
                                                        roomnumber = item.FieldValue;
                                                        count++;
                                                        break;
                                                }
                                                if (count == 2)
                                                    return true;
                                            });
                                            contextObj.fieldDetailsAdd.filter(function (item) {
                                                if (item.ReportFieldId === 783 && item.FieldValue != "4") {
                                                    isShareSpace = false;
                                                    return true;
                                                }
                                                if (item.FieldLabel == "IsShared") {
                                                    if (item.FieldValue == "False") {
                                                        contextObj.strPopupText = "Share Space";
                                                    }
                                                    else {
                                                        contextObj.strPopupText = "View";
                                                        isShare = true;
                                                    }
                                                    return true;
                                                }
                                            });
                                            contextObj.fieldDetailsAdd.filter(function (item) {
                                                if (item.ReportFieldId == 793) {
                                                    if ((assignementtype != "" && assignementtype != "2")) {
                                                        item.IsMandatory = true;
                                                    }
                                                    else {
                                                        item.IsMandatory = false;
                                                    }
                                                }
                                                if (item.FieldId == 737 && isShareSpace == true) {
                                                    item.LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                                                    if (isShare == true) {
                                                        item.FieldLabel = item.FieldLabel + ": Shared";
                                                        item.ReadOnlyMode = true;
                                                        item.IsEnabled = false;
                                                    }
                                                    return true;
                                                }
                                                if (item.ReportFieldId == 292 && isShareSpace == true && isShare == true) {
                                                    item.ReadOnlyMode = true;
                                                    item.IsEnabled = false;
                                                    return true;
                                                }
                                                if (item.ReportFieldId == 294 && isShareSpace == true && isShare == true) {
                                                    item.ReadOnlyMode = true;
                                                    item.IsEnabled = false;
                                                    return true;
                                                }
                                                if (item.ReportFieldId == 296 && isShareSpace == true && isShare == true) {
                                                    item.ReadOnlyMode = true;
                                                    item.IsEnabled = false;
                                                    return true;
                                                }
                                                if (item.ReportFieldId == 298 && isShareSpace == true && isShare == true) {
                                                    item.ReadOnlyMode = true;
                                                    item.IsEnabled = false;
                                                    return true;
                                                }
                                            });
                                        }
                                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    }
                                });
                            }
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 2);
                });
            }
        }
    };
    SpaceDataGridComponent.prototype.attachmentClick = function () {
        var contextObj = this;
        this.isAttachment = false;
        this.splitviewInput.showSecondaryView = false;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            this.isAttachment = false;
            this.splitviewInput.showSecondaryView = false;
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Space", 2);
        }
        else {
            var ret = this.chkSelectedSpaceKey(this.inputItems.selectedIds[0], 2);
            if (ret) {
                this.splitviewInput.showSecondaryView = true;
                this.isAttachment = true;
                this.Target = 6;
            }
            else
                this.splitviewInput.showSecondaryView = false;
        }
    };
    SpaceDataGridComponent.prototype.spaceResource = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Space", 2);
        }
        else {
            var ret = this.chkSelectedSpaceKey(this.inputItems.selectedIds[0], 3);
            if (ret) {
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            }
        }
    };
    SpaceDataGridComponent.prototype.chkSelectedSpaceKey = function (selectedId, target) {
        var selectObj = this.itemsSource.find(function (item) {
            return item.SpaceId === selectedId;
        });
        if ((selectObj["Space Key"] == "8000") || (selectObj["Space Key"] == "9000")) {
            var type = selectObj["Space Key"] == "8000" ? "External Wall" : "Floor Gross";
            var msg = "";
            switch (target) {
                case 1:
                    msg = type + " cannot be edited";
                    break;
                case 2:
                    msg = "Attachment cannot be linked to " + type;
                    break;
                case 3:
                    msg = "Resources cannot be linked to " + type;
                    break;
            }
            this.notificationService.ShowToaster(msg, 2);
            return false;
        }
        else
            return true;
    };
    SpaceDataGridComponent.prototype.setDisableField = function (data, context) {
        var retSpaceKey = data.find(function (item) {
            return item.ReportFieldId === 782;
        });
        if (retSpaceKey.FieldValue == "8000" || retSpaceKey.FieldValue == "9000") {
            var fieldObjLen = data.length;
            for (var i = 0; i < fieldObjLen; i++) {
                var rptFieldId = data[i].ReportFieldId;
                if (rptFieldId != 793) {
                    data[i].IsEnabled = false;
                    data[i].ReadOnlyMode = true;
                }
            }
        }
        else {
            var retItem = data.find(function (item) {
                return item.ReportFieldId === 783;
            });
            if (retItem.LookupDetails && retItem.LookupDetails.LookupValues.length > 0) {
                retItem.LookupDetails.LookupValues = retItem.LookupDetails.LookupValues.filter(function (el) {
                    return el["Id"] < 6;
                });
            }
            /*division admin ---7*/
            if (retItem.FieldValue != "4") {
                var fieldObjLen = data.length;
                for (var i = 0; i < fieldObjLen; i++) {
                    var rptFieldId = data[i].ReportFieldId;
                    if ((rptFieldId >= 290 && rptFieldId <= 298) || (rptFieldId == 779)) {
                        data[i].IsEnabled = false;
                        data[i].ReadOnlyMode = true;
                    }
                }
            }
            else {
                if (context.sessionUserRoleId == 7) {
                    var fieldObjLen = data.length;
                    for (var i = 0; i < fieldObjLen; i++) {
                        var rptFieldId = data[i].ReportFieldId;
                        if ((rptFieldId == 290) || (rptFieldId == 779)) {
                            data[i].IsEnabled = false;
                            data[i].ReadOnlyMode = true;
                        }
                    }
                }
            }
        }
        return data;
    };
    SpaceDataGridComponent.prototype.submitReturn = function (event) {
        if (event.shareSubmit != true) {
            this.refreshgrid = [];
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
            }
            else {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            //this.refreshgrid = this.refreshgrid.concat([true]);
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            if (this.action != "attachment") {
                this.splitviewInput.showSecondaryView = false;
                this.editedSpaceDataInDrawing.emit(event);
            }
        }
        else {
            var context = this;
            var sltdId;
            if (event.id[0] == undefined)
                sltdId = event.id;
            else
                sltdId = event.id[0];
            var retUpdatedSrc_1;
            context.refreshgrid = [];
            context.spaceService.getSpaceGridData(this.currentModuleId, this.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, this.filter, this.advanceValue, this.IsKeyWordSearch, this.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, false, sltdId).subscribe(function (result) {
                var jsonVariable = {};
                jsonVariable["returnData"] = result["Data"]["FieldBinderData"];
                retUpdatedSrc_1 = context.generFun.updateDataSource(context.itemsSource, "edit", jsonVariable, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                context.refreshgrid = context.refreshgrid.concat([true]);
            });
        }
    };
    SpaceDataGridComponent.prototype.assignSpaceStdClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else if (this.inputItems.selectedIds.length > 1) {
            this.multipleassignStandard();
        }
        else {
            this.multipledata = undefined;
            this.DrawingId = this.inputItems.rowData.DrawingId;
            var selectedItem = this.itemsSource.find(function (item) {
                return item["SpaceId"] === contextObj.inputItems.selectedIds[0];
            });
            if (selectedItem["Space Key"] == "8000") {
                this.notificationService.ShowToaster("Space Standard cannot be assigned to External Wall", 2);
            }
            else if (selectedItem["Space Key"] == "9000") {
                this.notificationService.ShowToaster("Space Standard cannot be assigned to Floor Gross", 2);
            }
            else {
                contextObj.spaceService.checkEditPrivilageExist(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData.ServerId > 0) {
                        contextObj.spaceService.loadAssignDeAssignSpacesStd(contextObj.inputItems.selectedIds[0]).subscribe(function (result) {
                            // if (contextObj.generFun.checkForUnhandledErrors(result)) {
                            //result["Data"].find(function (item) {
                            //    if (item.ReportFieldId == 793) {
                            //        item.IsEnabled =false; 
                            //        return true;
                            //    }
                            //    else
                            //        return false;
                            var arrfld = [793, 6729, 6730, 791, 6731];
                            var cnt = arrfld.length;
                            var spaceAsignmentTypeVal = "";
                            result["Data"].find(function (item) {
                                switch (item.ReportFieldId) {
                                    case 793:
                                        item.IsEnabled = false;
                                        cnt--;
                                        break;
                                    case 791:
                                        item.IsEnabled = false;
                                        cnt--;
                                        break;
                                    case 6729:
                                        spaceAsignmentTypeVal = item.FieldValue;
                                        if (item.FieldValue == "4") {
                                            contextObj.SchedulingService.getAmenitiesData(0, "", "", '').subscribe(function (resultData) {
                                                if (resultData["Data"].DataCount > 0 && contextObj.enableAminity == true) {
                                                    item.LookupDetails.PopupComponent = { Name: "Amenities", showImage: false };
                                                    contextObj.hyperLinkText = "Amenities";
                                                }
                                            });
                                        }
                                        //if (item.FieldValue == "1" && contextObj.isSeatBookingFeture) {
                                        //    /*seat booking feature*/                                            
                                        //            item.LookupDetails.PopupComponentName = "Seats";
                                        //            contextObj.hyperLinkText = "Seats";
                                        //}                                                                                                                                        
                                        cnt--;
                                        break;
                                    case 6730:
                                        if (spaceAsignmentTypeVal == "5") {
                                            item.FieldLabel = "Hoteling Seating Capactiy";
                                        }
                                        else {
                                            item.FieldLabel = "Room Seating Capacity";
                                        }
                                        if (spaceAsignmentTypeVal == "")
                                            contextObj.showbtndeassign = false;
                                        else {
                                            contextObj.showbtndeassign = true;
                                            if (spaceAsignmentTypeVal == "1" || spaceAsignmentTypeVal == "4" || spaceAsignmentTypeVal == "5" || spaceAsignmentTypeVal == "6") {
                                                item.IsMandatory = true;
                                                item.FieldValue = item.FieldValue == null ? "1" : item.FieldValue;
                                            }
                                            else {
                                                item.IsMandatory = false;
                                                item.IsEnabled = false;
                                            }
                                            if ((spaceAsignmentTypeVal == "1" || spaceAsignmentTypeVal == "5" || spaceAsignmentTypeVal == "6") && contextObj.isSeatBookingFeture) {
                                                /*seat booking feature*/
                                                item.LookupDetails.PopupComponent = { Name: "Seats", showImage: false };
                                                contextObj.hyperLinkText = "Seats";
                                            }
                                        }
                                        cnt--;
                                        break;
                                    case 6731:
                                        if (contextObj.isSeatBookingFeture && (spaceAsignmentTypeVal == "1"))
                                            item.IsVisible = true;
                                        else if (contextObj.isSeatBookingFeture && (spaceAsignmentTypeVal == "2")) {
                                            item.FieldValue = "0";
                                            item.IsVisible = false;
                                        }
                                        else {
                                            item.IsVisible = false;
                                        }
                                        cnt--;
                                        break;
                                    default:
                                        break;
                                }
                                if (cnt == 0)
                                    return true;
                                else
                                    return false;
                            });
                            contextObj.fieldDetailsAssignSpaceStd = result["Data"];
                            contextObj.Target = 3;
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            // }
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 2);
                });
            }
        }
    };
    SpaceDataGridComponent.prototype.onSecondaryClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    SpaceDataGridComponent.prototype.multipleassignStandard = function () {
        var contextObj = this;
        var reportFieldIdArray = [];
        var assignedcount = 0;
        for (var i = 0; i < this.inputItems.rowData.length; i++) {
            if (this.inputItems.rowData[i].SeatingAssignmentTypeId != null)
                assignedcount++;
            this.DrawingId = this.inputItems.rowData[i].DrawingId;
            var selectedItem = this.itemsSource.find(function (item) {
                return item["SpaceId"] === contextObj.inputItems.selectedIds[i];
            });
            if (selectedItem["Space Key"] == "8000") {
                this.notificationService.ShowToaster("Space Standard cannot be assigned to Floor Gross or External Wall", 2);
                return;
            }
            else if (selectedItem["Space Key"] == "9000") {
                this.notificationService.ShowToaster("Space Standard cannot be assigned to Floor Gross or External Wall", 2);
                return;
            }
            else {
                reportFieldIdArray.push({ ReportFieldId: 780, Value: contextObj.inputItems.selectedIds[i] });
            }
        }
        if (assignedcount == this.inputItems.selectedIds.length)
            this.showbtndeassign = true;
        else
            this.showbtndeassign = false;
        if (reportFieldIdArray.length == this.inputItems.selectedIds.length) {
            contextObj.spaceService.checkEditPrivilegeExistsForMultipleSpace(JSON.stringify(reportFieldIdArray)).subscribe(function (hasEditPrivilege) {
                if (hasEditPrivilege.ServerId == 1) {
                    contextObj.spaceService.loadMultipleAssignStd().subscribe(function (resultFields) {
                        console.log('assign fields', resultFields);
                        var array = [793, 791, 6730];
                        var cnt = array.length;
                        resultFields["Data"].find(function (item) {
                            switch (item.ReportFieldId) {
                                case 793:
                                    item.IsVisible = false;
                                    cnt--;
                                    break;
                                case 791:
                                    item.IsVisible = false;
                                    cnt--;
                                    break;
                            }
                            if (cnt == 0)
                                return true;
                            else
                                return false;
                        });
                        contextObj.fieldDetailsAssignSpaceStd = resultFields["Data"];
                        contextObj.multipledata = contextObj.inputItems.rowData;
                        // contextObj.inputItems.selectedIds = [];
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("You do not have edit permission in one of the selected space(s)", 2);
                    return;
                }
            });
        }
    };
    SpaceDataGridComponent.prototype.asignDeassignReturn = function (event) {
        this.refreshgrid = [];
        var retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
        //this.itemsSource = retUpdatedSrc["itemSrc"];
        this.refreshgrid = this.refreshgrid.concat([true]);
        if (event["target"] != 2) {
            this.splitviewInput.showSecondaryView = false;
        }
        if (this.pageTarget == 2 || this.pageTarget == 3)
            this.editedSpaceDataInDrawing.emit(event);
    };
    SpaceDataGridComponent.prototype.totalizeClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else {
            contextObj.selectedCount = this.inputItems.selectedIds.length;
            this.spaceService.getTotalizeSpace(this.inputItems.selectedIds).subscribe(function (result) {
                if (contextObj.generFun.checkForUnhandledErrors(result)) {
                    contextObj.totalizeData = JSON.parse(result.FieldBinderData)[0].Column1;
                    contextObj.totalizfocuseread = contextObj.totalizeData;
                    contextObj.totalizfocuseread = contextObj.totalizfocuseread.replace(/<(?:.|\n)*?>/gm, '');
                    contextObj.showSlide = true;
                }
            });
        }
    };
    SpaceDataGridComponent.prototype.displaySettingsClick = function () {
        var contextObj = this;
        contextObj.hiddenFields = ["Id"];
        contextObj.blnDispSettingClick = true;
        contextObj.isAddEdit = false;
        contextObj.splitviewInput.showSecondaryView = true;
    };
    SpaceDataGridComponent.prototype.getUpdatedDisplaySettings = function (event) {
        var contextObj = this;
        this.fieldObject = this.generFun.updateDisplaySettingsinUI(this.fieldObject, event["dispSettingObject"]);
        // setTimeout(function () {
        contextObj.splitviewInput.showSecondaryView = false;
        // }, 8000);
    };
    SpaceDataGridComponent.prototype.onQueryBuilderSearchClick = function (event) {
        var context = this;
        if (event) {
            context.qResult = event;
            context.itemsSource = JSON.parse(context.qResult.Data.FieldBinderData);
            context.itemsPerPage = context.qResult.Data.RowsPerPage;
            context.totalRowData = context.qResult.totalItems;
        }
    };
    SpaceDataGridComponent.prototype.closeSlideDialog = function (value, index) {
        if (index == 1)
            this.showSlide = value.value;
        else {
            this.showSlideExport = value.value;
        }
    };
    SpaceDataGridComponent.prototype.closeTotalize = function (event) {
        this.showSlide = false;
    };
    SpaceDataGridComponent.prototype.SaveAs = function (event) {
    };
    SpaceDataGridComponent.prototype.Delete = function (event) {
    };
    SpaceDataGridComponent.prototype.onloadSearch = function (event) {
        this.filter = event.value;
        this.IsKeyWordSearch = 1;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        this.pageIndex = 0;
        this.dataLoad(0, contextObj);
    };
    SpaceDataGridComponent.prototype.Clear = function (event) {
        this.filter = "";
        this.advanceValue = "[]";
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 0;
        var contextObj = this;
        contextObj.advancelookup = JSON.parse(JSON.stringify(contextObj.advancelookupDefault));
    };
    SpaceDataGridComponent.prototype.Submit = function (event) {
        this.filter = "";
        this.advanceValue = event.fieldobject;
        this.IsKeyWordSearch = 0;
        this.IsAdvanceSearch = 1;
        var contextObj = this;
        this.pageIndex = 0;
        this.dataLoad(0, contextObj);
    };
    /* attachmentSuccess(event: any) {
         
         var context = this;
         var selId = context.inputItems.selectedIds[0];
         var selObj = context.itemsSource.find(function (item) {
             return item["SpaceId"] === selId;
         })
 
         switch (event["status"]) {
             case "success":
                 if (selObj["Attachments"] == "None")
                     selObj["Attachments"] = "0";
                 selObj["Attachments"] = (Number(selObj["Attachments"]) + 1).toString();
                 break;
             case "delete":
                 selObj["Attachments"] = (Number(selObj["Attachments"]) - 1).toString();
                 if (selObj["Attachments"] == "0")
                     selObj["Attachments"] = "None";
                 break;
         }
 
       
     } */
    SpaceDataGridComponent.prototype.attachmentSuccess = function (event) {
        var context = this;
        context.refreshgrid = [];
        var selId = context.inputItems.selectedIds[0];
        var selObj = context.itemsSource.find(function (item) {
            return item["SpaceId"] === selId;
        });
        switch (event["status"]) {
            case "success":
                var attNum = selObj["Attachments"] == "None" ? 0 : selObj["Attachments"];
                selObj["Attachments"] = (Number(attNum) + 1).toString();
                break;
            case "delete":
                var attNo = (Number(selObj["Attachments"]) - 1).toString();
                selObj["Attachments"] = attNo == "0" ? "None" : attNo;
                break;
        }
        //var updatedData = new Array();/*To notify the watcher about the change*/
        //updatedData = updatedData.concat(context.itemsSource);
        //context.itemsSource = updatedData;
        context.refreshgrid = context.refreshgrid.concat([true]);
        if (this.pageTarget != 1) {
            var attachmentCount = context.itemsSource.find(function (item) { return item["SpaceId"] === selId; })["Attachments"];
            this.setAttachmentCount.emit({ 'spaceId': selId, 'Attachments': attachmentCount });
        }
        setTimeout(function () {
            context.arrHighlightRowIds = [];
            context.arrHighlightRowIds = context.arrHighlightRowIds.concat([selId]);
        }, 1);
    };
    //Export Grid
    SpaceDataGridComponent.prototype.okExportClick = function (event) {
        var context = this;
        context.handleField.push({
            FormFieldId: 1,
            FieldId: 0,
            ReportFieldId: 0,
            FieldLabel: context.g_IsNetCustomer == true ? "CarpetHandle" : "BomaHandle",
            DataEntryControlId: 11,
            GenericDataTypeId: 6,
            Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[a-zA-Z0-9!@#$%&*()+=\\s\\:.,/?[\\]_-]+$" },
            FieldValue: "",
            IsMandatory: false,
            IsVisible: true,
            IsEnabled: true,
            isContentHtml: "",
            Precision: 0,
            Scale: 0,
            Height: 0,
            IsSigned: false,
            RangeFrom: "",
            RangeTo: "",
            HelpText: "",
            IsGrouped: false,
            HasChild: false,
            ParentId: 0,
            IsSubField: false,
        });
        var filterFieldObjects = context.fieldObject.slice(); //copy of field object
        filterFieldObjects.push(context.handleField[0]);
        var fileName;
        switch (context.currentModuleId) {
            case 14:
                fileName = "SchedulingData";
                break;
            case 12:
                fileName = "CAIData";
                break;
            default:
                fileName = "SpaceData";
                break;
        }
        // debugger
        if (context.inputItems.selectedIds.length > 1) {
            context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
            context.exportObject.ExportData(context.exportDataSource, filterFieldObjects, fileName, function (retCode) {
                if (retCode == 0) {
                    var msg = "";
                    switch (context.currentModuleId) {
                        case 14:
                            msg = "Scheduling data exported";
                            break;
                        case 12:
                            msg = "CAI Data exported ";
                            break;
                        default:
                            msg = "Space data exported";
                            break;
                    }
                    context.notificationService.ShowToaster(msg, 3);
                }
                else {
                    if (context.currentModuleId == 14) {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                    else {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                }
            });
        }
        else {
            var input = {};
            var target = 4;
            if (context.qResult) {
                input = context.commonService.QueryBuilderSeachResultExport(516, context.buildarray, 5, 0, filterFieldObjects, fileName, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol);
                target = 6;
            }
            else {
                input = context.spaceService.getSpaceGridDataExport(context.currentModuleId, filterFieldObjects, fileName, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, true); //.subscribe(function (result) {
            }
            context.exportObject.ExportDataFromServer(input, target, fileName, function (retCode) {
                if (retCode == 0) {
                    var msg = "";
                    switch (context.currentModuleId) {
                        case 14:
                            msg = "Scheduling data exported";
                            break;
                        case 12:
                            msg = "CAI Data exported ";
                            break;
                        default:
                            msg = "Space data exported";
                            break;
                    }
                    context.notificationService.ShowToaster(msg, 3);
                }
                else {
                    if (context.currentModuleId == 14) {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                    else {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                }
                // });
            });
        }
        context.showSlideExport = false;
    };
    SpaceDataGridComponent.prototype.cancelExportClick = function (value) {
        var context = this;
        context.showSlideExport = value.value;
        var fileName;
        if (context.currentModuleId == 14) {
            fileName = "SchedulingData";
        }
        else {
            fileName = "SpaceData";
        }
        var fileName;
        switch (context.currentModuleId) {
            case 14:
                fileName = "SchedulingData";
                break;
            case 12:
                fileName = "CAIData";
                break;
            default:
                fileName = "SpaceData";
                break;
        }
        // debugger
        if (context.inputItems.selectedIds.length > 1) {
            context.exportDataSource = JSON.stringify(context.inputItems.rowData.slice());
            context.exportObject.ExportData(context.exportDataSource, context.fieldObject, fileName, function (retCode) {
                if (retCode == 0) {
                    var msg = "";
                    switch (context.currentModuleId) {
                        case 14:
                            msg = "Scheduling data exported";
                            break;
                        case 12:
                            msg = "CAI Data exported ";
                            break;
                        default:
                            msg = "Space data exported";
                            break;
                    }
                    context.notificationService.ShowToaster(msg, 3);
                }
                else {
                    if (context.currentModuleId == 14) {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                    else {
                        context.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    }
                }
            });
        }
        else {
            var input = {};
            var target = 4;
            if (context.qResult) {
                input = context.commonService.QueryBuilderSeachResultExport(516, context.buildarray, 5, 0, context.fieldObject, fileName, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol);
                target = 6;
            }
            else {
                input = context.spaceService.getSpaceGridDataExport(context.currentModuleId, context.fieldObject, fileName, context.pageIndex, context.inputItems.sortDir, context.inputItems.sortCol, context.filter, context.advanceValue, context.IsKeyWordSearch, context.IsAdvanceSearch, context.selectedDrwgIds, context.pageTarget, true); //.subscribe(function (result) {
            }
            context.exportObject.ExportDataFromServer(input, target, fileName, function (retCode) {
                if (retCode == 0) {
                    if (context.currentModuleId == 14) {
                        context.notificationService.ShowToaster("Scheduling data exported", 3);
                    }
                    else {
                        context.notificationService.ShowToaster("Space data exported", 3);
                    }
                }
                // });
            });
        }
    };
    SpaceDataGridComponent.prototype.Export = function () {
        this.showSlideExport = true;
    };
    SpaceDataGridComponent.prototype.onSplitViewClose = function (event) {
        if (this.Target == 8) {
            this.dataLoad(0, this);
        }
        this.Target = -1;
        this.action = '';
        this.splitviewInput.showSecondaryView = false;
    };
    SpaceDataGridComponent.prototype.onMultipleEditClick = function () {
        var contextObj = this;
        var editable = true;
        var reportFieldIdArray = [];
        for (var _i = 0, _a = contextObj.inputItems.selectedIds; _i < _a.length; _i++) {
            var item = _a[_i];
            reportFieldIdArray.push({ ReportFieldId: 780, Value: item });
        }
        for (var i = 0; i < contextObj.inputItems.selectedIds.length; i++) {
            var selectObj = this.itemsSource.find(function (item) {
                return item.SpaceId === contextObj.inputItems.selectedIds[i];
            });
            if ((selectObj["Space Key"] == "8000") || (selectObj["Space Key"] == "9000")) {
                editable = false;
            }
        }
        if (editable) {
            contextObj.spaceService.checkEditPrivilegeExistsForMultipleSpace(JSON.stringify(reportFieldIdArray)).subscribe(function (hasEditPrivilege) {
                if (hasEditPrivilege.ServerId == 1) {
                    contextObj.commonService.getFieldsForMultipleEdit(contextObj.spaceService.spaceAddEditFrmId).subscribe(function (resultData) {
                        if (contextObj.sessionUserRoleId == 7) {
                            var orgArray = [290, 292, 294, 296, 298];
                            contextObj.multipleEditFieldDetails = JSON.parse(resultData).filter(function (item) { return orgArray.indexOf(item.ReportFieldId) == -1; });
                        }
                        else {
                            if (contextObj.currentModuleId != 12) {
                                /*removing CAI Space Driver field */
                                contextObj.multipleEditFieldDetails = JSON.parse(resultData).filter(function (item) { return item.ReportFieldId != 1629; });
                            }
                            else {
                                contextObj.multipleEditFieldDetails = JSON.parse(resultData);
                            }
                        }
                        contextObj.Target = 8;
                        contextObj.pageTitle = "Multiple Update";
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("You do not have edit permission in one of the selected space(s)", 2);
                }
            });
        }
        else
            contextObj.notificationService.ShowToaster("Floor Gross or External Wall cannot be edited", 2);
    };
    SpaceDataGridComponent.prototype.onMultipleEditUpdate = function (event) {
        for (var _i = 0, _a = this.inputItems.selectedIds; _i < _a.length; _i++) {
            var item = _a[_i];
            event.ReportFieldIdValuesArray.push({ ReportFieldId: 780, Value: item });
        }
        event.ReportFieldIdValuesArray.push({ ReportFieldId: 271, Value: this.moduleId });
        var contextObj = this;
        contextObj.spaceService.updateMultipleSpaceData(JSON.stringify(event.ReportFieldIdValuesArray), event.ReportFieldId, event.NewValue, event.ParentUnitId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.onMultipleEditUpdateData.emit({ data: JSON.parse(resultData["Data"]["Data"]) });
                    contextObj.notificationService.ShowToaster("Space details updated", 2);
                    break;
                default:
                    break;
            }
        });
    };
    SpaceDataGridComponent.prototype.hotellingSeats = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0)
            this.notificationService.ShowToaster("Select a Space", 2);
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var selectedItem = this.itemsSource.find(function (item) {
                return item["SpaceId"] === contextObj.inputItems.selectedIds[0];
            });
            if (selectedItem["Space Key"] == "8000") {
                this.notificationService.ShowToaster("Seat cannot be assigned to External Wall", 2);
            }
            else if (selectedItem["Space Key"] == "9000") {
                this.notificationService.ShowToaster("Seat cannot be assigned to Floor Gross", 2);
            }
            else {
                contextObj.spaceService.checkEditPrivilageExist(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    if (resultData.ServerId > 0) {
                        contextObj.spaceService.loadAssignDeAssignSpacesStd(contextObj.inputItems.selectedIds[0]).subscribe(function (result) {
                            var cnt = 3; /*spaceassignment ,seatingCapacity*/
                            var spaceAssignment = "";
                            var seatingCapacity = 0;
                            var romNo = "";
                            contextObj.fldForAssignOnAddSeat = result["Data"];
                            result["Data"].find(function (item) {
                                switch (item.ReportFieldId) {
                                    case 793:
                                        romNo = item.FieldValue;
                                        break;
                                    case 6729:
                                        spaceAssignment = item.FieldValue;
                                        cnt--;
                                        break;
                                    case 6730:
                                        seatingCapacity = Number(item.FieldValue);
                                        cnt--;
                                        break;
                                }
                                if (cnt == 0)
                                    return true;
                                else
                                    return false;
                            });
                            if (spaceAssignment != "1") {
                                contextObj.notificationService.ShowToaster("Seats can be added  for assignable space", 2);
                            }
                            else if (romNo == "") {
                                contextObj.notificationService.ShowToaster("Room No. is mandatory for assigning Hoteling Seat(s)", 2);
                            }
                            else if (seatingCapacity <= 0 || isNaN(seatingCapacity) == true) {
                                contextObj.notificationService.ShowToaster("Room Seating Capacity should be greater than zero", 2);
                            }
                            else {
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            }
                        });
                    }
                    else
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected space", 2);
                });
            }
        }
    };
    SpaceDataGridComponent.prototype.seatSuccessout = function (event) {
        //var context = this;
        //var rptFldArray;
        //if (event["action"] == "UpdateSeat") {
        //    this.fieldDetails.find(function (el) {
        //        if (el.FieldId == 2020) {
        //            el.FieldValue = event["hotellingSeatCount"];
        //            return true;
        //        } else
        //            return false;
        //    });
        //}
        //rptFldArray = context.generFun.getFieldValuesAsReportFieldArray(context.fieldDetails)
        //context.assign(2, context, rptFldArray);
    };
    SpaceDataGridComponent.prototype.onContextMenuOnClick = function (event) {
        var tempID = "";
        if (event != undefined && event != null) {
            if (this.qResult != undefined) {
                var rowCount = this.inputItems.selectedIds.length;
                this.analyticsInput.selectedRowCount = rowCount;
                this.analyticsInput.menuId = event['menuId'];
                this.analyticsInput.fieldObject = this.fieldObject;
                this.analyticsInput.selectedIds = tempID;
                this.analyticsInput.moduleId = 3;
                this.analyticsInput.pageTarget = 2;
                this.analyticsInput.IsAdvanceSearch = 0;
                this.analyticsInput.IsKeywordSearch = 0;
                this.analyticsInput.KeywordFilterValue = "";
                this.analyticsInput.AdvanceFilterValue = "[]";
                this.analyticsInput.FormId = 516;
                this.analyticsInput.ParentFormId = 0;
                this.analyticsInput.QueryCategryId = Number(this.QueryCategryId);
                this.analyticsInput.buildarray = this.buildarray;
                this.showAnalytics = true;
            }
            else {
                var rowCount = this.inputItems.selectedIds.length;
                this.analyticsInput.selectedRowCount = rowCount;
                this.analyticsInput.menuId = event['menuId'];
                this.analyticsInput.fieldObject = this.fieldObject;
                this.analyticsInput.selectedIds = this.selectedDrwgIds;
                this.analyticsInput.moduleId = 3;
                this.analyticsInput.pageTarget = 1;
                this.analyticsInput.IsAdvanceSearch = this.IsAdvanceSearch;
                this.analyticsInput.IsKeywordSearch = this.IsKeyWordSearch;
                this.analyticsInput.KeywordFilterValue = this.filter;
                this.analyticsInput.AdvanceFilterValue = this.advanceValue;
                this.analyticsInput.FormId = 103;
                this.analyticsInput.ParentFormId = 116;
                this.showAnalytics = true;
            }
        }
    };
    SpaceDataGridComponent.prototype.closeAnalytics = function () {
        this.showAnalytics = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "changeEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "Targetforstyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "UpdateData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "qResult", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "buildarray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SpaceDataGridComponent.prototype, "QueryCategryId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "showZoomOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "showInDrawingOnClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "editedSpaceDataInDrawing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "setAttachmentCount", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "getSelectedSpaceGridID", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "onSearchInDrawing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceDataGridComponent.prototype, "onMultipleEditUpdateData", void 0);
    SpaceDataGridComponent = __decorate([
        core_1.Component({
            selector: 'spaceDataGrid',
            templateUrl: './app/Views/Space/Space Data/spacedata-grid.component.html',
            directives: [analytics_component_1.Analytics, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, search_component_1.searchBox, split_view_component_1.SplitViewComponent, spacedata_addedit_component_1.SpaceAddEditComponent, assignspacestd_component_1.AssignSpaceStd, slide_component_1.SlideComponent, attachments_component_1.AttachmentsComponent, displaysettings_component_1.DisplaySettingsComponent, spaceResourceList_1.SpaceResourceListComponent, multiple_edit_component_1.MultipleEdit, confirm_component_1.ConfirmationComponent, seatlist_component_1.SeatsGridComponent],
            providers: [space_service_1.SpaceService, administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel, drawing_service_1.DrawingService, scheduling_service_1.SchedulingService, common_service_1.CommonService],
            inputs: ['selectedDrwgIds', 'pageTarget', 'highlightRows', 'moduleId'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [drawing_service_1.DrawingService, space_service_1.SpaceService, administration_service_1.AdministrationService, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel, common_service_1.CommonService])
    ], SpaceDataGridComponent);
    return SpaceDataGridComponent;
}());
exports.SpaceDataGridComponent = SpaceDataGridComponent;
//# sourceMappingURL=spacedata-grid.component.js.map
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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var pmschedules_addedit_1 = require('./pmschedules-addedit');
var PM_Procedures_list_component_1 = require('./PM-Procedures-list.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var PMSchedulesListComponent = (function () {
    function PMSchedulesListComponent(administrationServices, workOrderService, notificationService, generFun) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectedIds: [0] };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.target = 0;
        this.enableMenu = [0];
        //Form Id : 215
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (215))
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "subMenu": null,
                "privilegeId": 3358
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null,
                "privilegeId": 3359
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": 3360
            },
            {
                "id": 3,
                "title": "Procedures",
                "image": "Procedures",
                "path": "Procedures",
                "subMenu": null,
                "privilegeId": 3360
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.showProcedureSlide = false;
    }
    PMSchedulesListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.workOrderService.getPMListFields().subscribe(function (resultData) {
            contextObj.siteName = resultData["Data"].find(function (el) { return el.ReportFieldId === 572; });
            contextObj.routeName = resultData["Data"].find(function (el) { return el.ReportFieldId === 5628; });
            contextObj.siteName["FieldValue"] = contextObj.SiteName;
            contextObj.routeName["FieldValue"] = contextObj.RouteName;
            contextObj.fieldObject = resultData["Data"];
        });
        this.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No PM Schedules exist", 2);
                contextObj.enableMenu = [0];
            }
        });
        /* form id : 215***** PageId :737 */
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 737, contextObj.administrationServices, contextObj.menuData.length);
    };
    PMSchedulesListComponent.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                contextObj.target = 1;
                this.addClick();
                break;
            case 1:
                contextObj.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                contextObj.target = 2;
                this.procedureClick(this.inputItems.selectedIds, this.inputItems.rowData["Equipment Category"], this.inputItems.rowData["Equipment Class"], this.inputItems.rowData["EquipmentTypeId"]);
                break;
        }
    };
    PMSchedulesListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    };
    ;
    PMSchedulesListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    };
    PMSchedulesListComponent.prototype.addClick = function () {
        debugger;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New PM Schedule";
        var contextObj = this;
        this.workOrderService.loadPMAddFields(contextObj.siteId, contextObj.equipmentCategoryId, contextObj.routeId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            if (contextObj.equipmentCategoryId > -1) {
                var _loop_1 = function(i) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1368:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1383:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = contextObj.equipmentCategoryId;
                            break;
                        case 1384:
                            contextObj.workOrderService.loadEquipmentClassForPM(contextObj.equipmentCategoryId, contextObj.siteId, contextObj.masterPMId).subscribe(function (resultData) {
                                if (resultData["Data"]["LookupValues"]["LookupValues"] != "") {
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"];
                                }
                            });
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                            break;
                        case 1413:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1414:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1421:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "11";
                            break;
                        case 1422:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1198:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                    }
                };
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    _loop_1(i);
                }
            }
            else if (contextObj.routeId > -1) {
                var tempMasterPM;
                var tempApplyUpdates;
                var tempEquipmentNo;
                var _loop_2 = function(i) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1368:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1369:
                            contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = [];
                            tempMasterPM = contextObj.fieldDetailsAddEdit[i];
                            break;
                        case 1370:
                            tempApplyUpdates = contextObj.fieldDetailsAddEdit[i];
                            break;
                        case 1383:
                        case 1384:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            break;
                        case 1401:
                            //contextObj.workOrderService.loadRouteEquipmentNoForPM(contextObj.routeId).subscribe(function (resultData) {
                            //    if (resultData["Data"]["LookupValues"]["LookupValues"].length > 0) {
                            //        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"]                                    
                            //    }
                            //    tempEquipmentNo = contextObj.fieldDetailsAddEdit[i]; 
                            //    contextObj.fieldDetailsAddEdit[4] = tempEquipmentNo;
                            //    contextObj.fieldDetailsAddEdit[5] = tempMasterPM;
                            //    contextObj.fieldDetailsAddEdit[8] = tempApplyUpdates;
                            //});
                            arrList = new Array();
                            arrList.push({
                                ReportFieldId: 5570,
                                Value: contextObj.routeId
                            });
                            contextObj.workOrderService.loadRouteEquipmentNoForPM(50902, JSON.stringify(arrList)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                }
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                                tempEquipmentNo = contextObj.fieldDetailsAddEdit[i];
                                contextObj.fieldDetailsAddEdit[4] = tempEquipmentNo;
                                contextObj.fieldDetailsAddEdit[5] = tempMasterPM;
                                contextObj.fieldDetailsAddEdit[8] = tempApplyUpdates;
                            });
                            break;
                        case 1413:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1414:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1421:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "11";
                            break;
                        case 1422:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1198:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                    }
                };
                var arrList;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    _loop_2(i);
                }
            }
            else {
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1368:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1413:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1414:
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1421:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "11";
                            break;
                        case 1422:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                            break;
                        case 1198:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                    }
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    PMSchedulesListComponent.prototype.editClick = function () {
        debugger;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit PM Schedule";
        var tempMasterPM;
        var tempApplyUpdates;
        var tempEquipmentNo;
        var componentCategoryId = this.inputItems.rowData["ComponentCategoryId"];
        this.equipmentTypeId = this.inputItems.rowData["EquipmentTypeId"];
        var objectId = this.inputItems.rowData["ObjectId"];
        this.actionPointUsers = this.inputItems.rowData["Action Point Users"];
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a PM Schedule", 2);
        }
        else {
            this.workOrderService.loadPMEditFields(this.inputItems.selectedIds[0], this.siteId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                var _loop_3 = function(i) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1320:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            break;
                        case 1369:
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            if (contextObj.routeId > -1) {
                                tempMasterPM = contextObj.fieldDetailsAddEdit[i];
                            }
                            break;
                        case 1370:
                            if (contextObj.routeId > -1) {
                                tempApplyUpdates = contextObj.fieldDetailsAddEdit[i];
                            }
                            break;
                        case 1383:
                            if (contextObj.routeId > -1) {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                            }
                            else {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            }
                            break;
                        case 1384:
                            if (contextObj.routeId > -1) {
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = false;
                            }
                            else {
                                contextObj.workOrderService.loadEquipmentClassForPM(componentCategoryId, contextObj.siteId, contextObj.masterPMId).subscribe(function (resultData) {
                                    if (resultData["Data"]["LookupValues"]["LookupValues"] != "") {
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"];
                                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                    }
                                });
                                contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                            }
                            break;
                        case 1401:
                            arrList = new Array();
                            arrList.push({
                                ReportFieldId: 5570,
                                Value: contextObj.routeId
                            });
                            tempArray = new Array();
                            tempArray.push(objectId);
                            if (contextObj.routeId > -1) {
                                //contextObj.workOrderService.loadRouteEquipmentNoForPM(contextObj.routeId).subscribe(function (resultData) {
                                //    if (resultData["Data"]["LookupValues"]["LookupValues"] != "") {
                                //        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"]
                                //        contextObj.fieldDetailsAddEdit[i].MultiFieldValues = tempArray;
                                //        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                //        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                //    }
                                //});  
                                contextObj.workOrderService.loadRouteEquipmentNoForPM(50902, JSON.stringify(arrList)).subscribe(function (resultData) {
                                    if (resultData["Data"] != "[]") {
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                        contextObj.fieldDetailsAddEdit[i].MultiFieldValues = tempArray;
                                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                        tempEquipmentNo = contextObj.fieldDetailsAddEdit[i];
                                        contextObj.fieldDetailsAddEdit[4] = tempEquipmentNo;
                                        contextObj.fieldDetailsAddEdit[5] = tempMasterPM;
                                        contextObj.fieldDetailsAddEdit[8] = tempApplyUpdates;
                                    }
                                });
                            }
                            else {
                                contextObj.workOrderService.loadEquipmentNoForPM(contextObj.equipmentTypeId, contextObj.siteId, contextObj.masterPMId).subscribe(function (resultData) {
                                    if (resultData["Data"]["LookupValues"]["LookupValues"] != "") {
                                        contextObj.fieldDetailsAddEdit[i].LookupDetails.LookupValues = resultData["Data"]["LookupValues"]["LookupValues"];
                                        contextObj.fieldDetailsAddEdit[i].MultiFieldValues = tempArray;
                                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                    }
                                });
                            }
                            break;
                        case 1414:
                            switch (contextObj.fieldDetailsAddEdit[i].FieldValue) {
                                case "1":
                                    break;
                                case "2":
                                    ckblWeekDays = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1415;
                                    });
                                    ckblWeekDays.IsEnabled = true;
                                    ckblWeekDays.IsVisible = true;
                                    ckblWeekDays.FieldLabel = "";
                                    break;
                                case "3":
                                    rbtnMonthlyReccurencePatternCriteria = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1372;
                                    });
                                    ddlMonthlyDayNo = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1373;
                                    });
                                    ddlMonthlyWeekOccurence = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1374;
                                    });
                                    ddlMonthlyWeekDay = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1375;
                                    });
                                    rbtnMonthlyReccurencePatternCriteria.IsEnabled = true;
                                    rbtnMonthlyReccurencePatternCriteria.IsVisible = true;
                                    rbtnMonthlyReccurencePatternCriteria.FieldLabel = "";
                                    ddlMonthlyDayNo.IsVisible = true;
                                    ddlMonthlyWeekOccurence.IsVisible = true;
                                    ddlMonthlyWeekDay.IsVisible = true;
                                    ddlMonthlyDayNo.FieldLabel = "";
                                    ddlMonthlyWeekOccurence.FieldLabel = "";
                                    ddlMonthlyWeekDay.FieldLabel = "";
                                    switch (rbtnMonthlyReccurencePatternCriteria.FieldValue) {
                                        case "5":
                                            ddlMonthlyDayNo.FieldValue = "1";
                                            ddlMonthlyWeekOccurence.FieldValue = "1";
                                            ddlMonthlyWeekDay.FieldValue = "1";
                                            break;
                                        case "6":
                                            ddlMonthlyDayNo.IsEnabled = true;
                                            ddlMonthlyWeekOccurence.FieldValue = "1";
                                            ddlMonthlyWeekDay.FieldValue = "1";
                                            break;
                                        case "7":
                                            ddlMonthlyDayNo.FieldValue = "1";
                                            ddlMonthlyWeekOccurence.IsEnabled = true;
                                            ddlMonthlyWeekDay.IsEnabled = true;
                                            break;
                                    }
                                    break;
                                case "4":
                                    rbtnYearlyReccurencePatternCriteria = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1381;
                                    });
                                    ddlYearlyDayNo = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1376;
                                    });
                                    ddlYearlyMonthDay = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1377;
                                    });
                                    ddlYearlyWeekOccurence = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1378;
                                    });
                                    ddlYearlyWeekDay = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1379;
                                    });
                                    ddlYearlyMonthofYear = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1380;
                                    });
                                    rbtnYearlyReccurencePatternCriteria.IsEnabled = true;
                                    rbtnYearlyReccurencePatternCriteria.IsVisible = true;
                                    rbtnYearlyReccurencePatternCriteria.FieldLabel = "";
                                    ddlYearlyDayNo.IsVisible = true;
                                    ddlYearlyMonthDay.IsVisible = true;
                                    ddlYearlyWeekOccurence.IsVisible = true;
                                    ddlYearlyWeekDay.IsVisible = true;
                                    ddlYearlyMonthofYear.IsVisible = true;
                                    ddlYearlyDayNo.FieldLabel = "";
                                    ddlYearlyMonthDay.FieldLabel = "";
                                    ddlYearlyWeekOccurence.FieldLabel = "";
                                    ddlYearlyWeekDay.FieldLabel = "";
                                    ddlYearlyMonthofYear.FieldLabel = "of";
                                    switch (rbtnYearlyReccurencePatternCriteria.FieldValue) {
                                        case "8":
                                            ddlYearlyDayNo.FieldValue = "1";
                                            ddlYearlyMonthDay.FieldValue = "1";
                                            ddlYearlyWeekOccurence.FieldValue = "1";
                                            ddlYearlyWeekDay.FieldValue = "1";
                                            ddlYearlyMonthofYear.FieldValue = "1";
                                            break;
                                        case "9":
                                            ddlYearlyDayNo.IsEnabled = true;
                                            ddlYearlyMonthDay.IsEnabled = true;
                                            ddlYearlyWeekOccurence.FieldValue = "1";
                                            ddlYearlyWeekDay.FieldValue = "1";
                                            ddlYearlyMonthofYear.FieldValue = "1";
                                            break;
                                        case "10":
                                            ddlYearlyDayNo.FieldValue = "1";
                                            ddlYearlyMonthDay.FieldValue = "1";
                                            ddlYearlyWeekOccurence.IsEnabled = true;
                                            ddlYearlyWeekDay.IsEnabled = true;
                                            ddlYearlyMonthofYear.IsEnabled = true;
                                            break;
                                    }
                                    break;
                            }
                            break;
                        case 1421:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            rbtnRangeReccurenceNo = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1421;
                            });
                            ddlEndAfter = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1422;
                            });
                            datePickerEndBy = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1198;
                            });
                            switch (rbtnRangeReccurenceNo.FieldValue) {
                                case "11":
                                    break;
                                case "12":
                                    ddlEndAfter.IsEnabled = false;
                                    ddlEndAfter.FieldValue = "1";
                                    datePickerEndBy.IsEnabled = true;
                                    datePickerEndBy.IsVisible = true;
                                    break;
                            }
                            break;
                        case 1422:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                        case 1198:
                            contextObj.fieldDetailsAddEdit[i]["FieldLabel"] = "";
                            break;
                        case 1410:
                            chkbxAutoGenerate = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1410;
                            });
                            txtbxGenerateWO = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1411;
                            });
                            ddlWorkType = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1412;
                            });
                            ckblActionPointUser = contextObj.fieldDetailsAddEdit.find(function (item) {
                                return item.FieldId === 1423;
                            });
                            if (chkbxAutoGenerate.FieldValue == "1") {
                                txtbxGenerateWO.IsEnabled = true;
                                ddlWorkType.IsEnabled = true;
                                worktypeId = ddlWorkType.FieldValue;
                                id = ddlWorkType.LookupDetails.LookupValues.find(function (el) { return el.Id === parseInt(worktypeId); });
                                if (id != undefined) {
                                    if (ckblActionPointUser.MultiFieldValues.length > 0) {
                                        ckblActionPointUser.IsEnabled = true;
                                        ckblActionPointUser.IsVisible = true;
                                    }
                                }
                                else {
                                    ddlWorkType.FieldValue = "-1";
                                    ddlWorkType.IsMandatory = true;
                                    ckblActionPointUser.IsEnabled = false;
                                    ckblActionPointUser.IsVisible = false;
                                    ckblActionPointUser.IsMandatory = false;
                                    ckblActionPointUser.LookupDetails.LookupValues = [];
                                    ckblActionPointUser.MultiFieldValues = [];
                                }
                            }
                            break;
                    }
                };
                var arrList, tempArray, ckblWeekDays, rbtnMonthlyReccurencePatternCriteria, ddlMonthlyDayNo, ddlMonthlyWeekOccurence, ddlMonthlyWeekDay, rbtnYearlyReccurencePatternCriteria, ddlYearlyDayNo, ddlYearlyMonthDay, ddlYearlyWeekOccurence, ddlYearlyWeekDay, ddlYearlyMonthofYear, rbtnRangeReccurenceNo, ddlEndAfter, datePickerEndBy, chkbxAutoGenerate, txtbxGenerateWO, ddlWorkType, ckblActionPointUser, worktypeId, id;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    _loop_3(i);
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    PMSchedulesListComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a PM Schedule", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    PMSchedulesListComponent.prototype.deletePM = function () {
        var contextObj = this;
        var arrayList = new Array();
        for (var i = 0; i < this.inputItems.selectedIds.length; i++) {
            arrayList.push({
                ReportFieldId: 5563,
                Value: this.inputItems.selectedIds[i]
            });
        }
        if (this.inputItems.selectedIds.length > 1) {
            this.workOrderService.postDeletePMSchedule(JSON.stringify(arrayList)).subscribe(function (resultData) {
                if (resultData["Data"].ServerId >= 0) {
                    contextObj.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
                        contextObj.totalItems = resultData["Data"].DataCount;
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.splitviewInput.showSecondaryView = false;
                        if (contextObj.totalItems < 1) {
                            contextObj.enableMenu = [0];
                            contextObj.notificationService.ShowToaster("No PM Schedules exist", 2);
                        }
                        contextObj.notificationService.ShowToaster("Selected PM Schedule(s) deleted", 3);
                    });
                }
                else if (resultData["Data"].ServerId == -1) {
                    contextObj.notificationService.ShowToaster("Some of selected PM Schedule(s) in use, cannot be deleted", 5);
                }
            });
        }
        else {
            this.workOrderService.postDeletePMSchedule(JSON.stringify(arrayList)).subscribe(function (resultData) {
                if (resultData["Data"].ServerId >= 0) {
                    var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                    contextObj.totalItems = retUpdatedSrc["itemCount"];
                    if (contextObj.totalItems < 1) {
                        contextObj.enableMenu = [0];
                        contextObj.notificationService.ShowToaster("No PM Schedules exist", 2);
                    }
                    contextObj.notificationService.ShowToaster("Selected PM Schedule(s) deleted", 3);
                }
                else if (resultData["Data"].ServerId == -1) {
                    contextObj.notificationService.ShowToaster("Selected PM Schedule in use, cannot be deleted", 5);
                }
            });
        }
    };
    PMSchedulesListComponent.prototype.OnSuccessfulSubmit = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                if (event["returnData"] == "2") {
                    this.workOrderService.getPMListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.equipmentCategoryId, contextObj.equipmentClassId, contextObj.routeId, contextObj.siteId).subscribe(function (resultData) {
                        contextObj.totalItems = resultData["Data"].DataCount;
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.splitviewInput.showSecondaryView = false;
                        if (contextObj.totalItems > 0) {
                            contextObj.enableMenu = [0, 1, 2, 3];
                        }
                    });
                }
                else {
                    this.returnId = JSON.parse(event.returnData);
                    this.returnPMId = this.returnId[0].Id;
                    this.returnPMEquipmentCategory = this.returnId[0]["Equipment Category"];
                    this.returnPMEquipmentClass = this.returnId[0]["Equipment Class"];
                    this.returnEquipmentTypeId = this.returnId[0].EquipmentTypeId;
                    retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                    this.totalItems = retUpdatedSrc["itemCount"];
                    this.itemsSource = retUpdatedSrc["itemSrc"];
                    this.splitviewInput.showSecondaryView = false;
                    if (contextObj.totalItems > 0) {
                        contextObj.enableMenu = [0, 1, 2, 3];
                    }
                    this.showProcedureSlide = true;
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                //this.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                this.splitviewInput.showSecondaryView = false;
            }
        }
    };
    PMSchedulesListComponent.prototype.inlineDelete = function (event) {
        this.deletePM();
    };
    PMSchedulesListComponent.prototype.okDelete = function (event) {
        this.deletePM();
        this.showSlide = !this.showSlide;
    };
    PMSchedulesListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    PMSchedulesListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = false;
        this.showProcedureSlide = false;
    };
    PMSchedulesListComponent.prototype.okProcedureClick = function (event) {
        this.procedureClick(this.returnPMId, this.returnPMEquipmentCategory, this.returnPMEquipmentClass, this.returnEquipmentTypeId);
        this.showProcedureSlide = false;
    };
    PMSchedulesListComponent.prototype.cancelProcedureClick = function (value) {
        this.showProcedureSlide = false;
    };
    PMSchedulesListComponent.prototype.procedureClick = function (pmId, pmEquipmentCategory, pmEquipmentClass, pmEquipmentTypeId) {
        this.pageTitle = "Procedures";
        this.target = 2;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a PM", 2);
        }
        else {
            this.pmIdforProcedure = pmId;
            this.pmEquipmentClassName = pmEquipmentClass;
            this.pmEquipmentCategoryName = pmEquipmentCategory;
            this.pmEquipmentClassId = pmEquipmentTypeId;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    PMSchedulesListComponent.prototype.onPMScheduleRowUpdate = function (event) {
        this.refreshgrid = [];
        this.itemsSource.find(function (item) {
            if (item.Id == event.pmId) {
                item["Procedure Count"] = event.procedureCount.toString();
                item["Sequence"] = event.sequenceNumber.toString();
                ;
                return true;
            }
            else {
                return false;
            }
        });
        //var updatedData = new Array();/*To notify the watcher about the change*/
        //updatedData = updatedData.concat(this.itemsSource);
        //this.itemsSource = updatedData;    
        this.refreshgrid = this.refreshgrid.concat([true]);
    };
    PMSchedulesListComponent = __decorate([
        core_1.Component({
            selector: 'pmSchedules-list',
            templateUrl: './app/Views/WorkOrder/Maintenance/pmschedules-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, labelcomponent_component_1.LabelComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, pmschedules_addedit_1.PMSchedulesAddEditComponent, PM_Procedures_list_component_1.PMProceduresListComponent],
            providers: [workorder_service_1.WorkOrdereService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['siteId', 'SiteName', 'equipmentCategoryId', 'equipmentClassId', 'routeId', 'RouteName']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], PMSchedulesListComponent);
    return PMSchedulesListComponent;
}());
exports.PMSchedulesListComponent = PMSchedulesListComponent;
//# sourceMappingURL=pmschedules-list.component.js.map
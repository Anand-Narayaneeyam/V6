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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var http_1 = require('@angular/http');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var logUserList_component_1 = require('./logUserList.component');
var logEntityList_component_1 = require('./logEntityList.component');
var logActivityList_component_1 = require('./logActivityList.component');
var exporttoexcel_service_1 = require('../../../framework/models/export/exporttoexcel.service');
var LogbookComponent = (function () {
    function LogbookComponent(exportObject, administrationService, _notificationService, getData) {
        this.exportObject = exportObject;
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.getData = getData;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.pagingTarget = 0;
        this.blnUserSection = false;
        this.pageTitle = "Select Criteria";
        this.btnName = "Next";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Date Time]", sortDir: "DESC", selectedIds: [], allowAdd: false, allowEdit: false };
        this.splitViewLogBook = { showSecondaryView: false, showButton: false, secondaryArea: 60 };
        this.sectionAccessExpansionStatus = [{ "title": "Select Criteria", "isExpanded": false }, { "title": "Select User", "isExpanded": false }, { "title": "Select Entities", "isExpanded": false }, { "title": "Select Activities", "isExpanded": false }];
        this.menuData = [
            {
                "id": 1,
                "title": "Filter",
                "image": "Filter",
                "path": "Filter",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Export",
                "image": "Export",
                "path": "Export",
                "submenu": null
            }
        ];
        this.enableMenu = [1];
    }
    LogbookComponent.prototype.ngOnInit = function () {
        this.pagePath = "Logbook";
    };
    LogbookComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        var multivalue = [];
        this.getSessionUserData(contextObj);
        contextObj.pagingTarget = 1;
        contextObj.sectionAccessExpansionStatus[0].isExpanded = true;
        this.administrationService.getLogListColumns().subscribe(function (resultData) {
            contextObj.fieldObjectLog = resultData["Data"];
        });
        this.administrationService.getLogBookParameterFieldList().subscribe(function (resultData) {
            for (var i = 0; i < resultData["Data"].length; i++) {
                if (i == 0) {
                    contextObj.dateSelectorData = resultData["Data"][0];
                }
                if (resultData["Data"][i].ReportFieldId == 500339) {
                    resultData["Data"][i].FieldValue = contextObj.setPrevMonthsDate();
                }
                if (resultData["Data"][i].ReportFieldId == 1703) {
                    resultData["Data"][i].FieldValue = "1";
                }
                if (resultData["Data"][i].ReportFieldId == 1698) {
                    resultData["Data"][i].FieldValue = "1";
                }
                if (resultData["Data"][i].ReportFieldId == 6325) {
                    var lookup = resultData["Data"][i]["LookupDetails"]["LookupValues"];
                    var length = lookup.length;
                    for (var k = 0; k < length; k++) {
                        multivalue.push(lookup[k].Id.toString());
                    }
                    resultData["Data"][i]["MultiFieldValues"] = multivalue;
                    multivalue = [];
                }
            }
            contextObj.logbookParameterFieldData = resultData["Data"];
        });
        /*
        this.administrationService.getLogBookDataOnload().subscribe(function (resultData) {
            if (resultData.Data.FieldBinderData != "[]" && resultData.Data.FieldBinderData != undefined && resultData.Data.FieldBinderData != "" && resultData.Data.FieldBinderData != null) {
                contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
            }
            else {
                contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
            }
        });*/
        this.administrationService.getLogBookDataOnload(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            if (resultData.Data.FieldBinderData != "[]" && resultData.Data.FieldBinderData != undefined && resultData.Data.FieldBinderData != "" && resultData.Data.FieldBinderData != null) {
                contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
            }
            else {
                if (contextObj.totalItems == 0) {
                    contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                }
            }
        });
    };
    LogbookComponent.prototype.getSessionUserData = function (contextObj) {
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
    };
    LogbookComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.toggleSearch();
                break;
            case 2:
                this.ExportToExcel();
                break;
        }
    };
    LogbookComponent.prototype.ShowSplitView = function (event) {
    };
    LogbookComponent.prototype.toggleSearch = function () {
        var contextObj = this;
        if (contextObj.splitViewLogBook.showSecondaryView == false) {
            contextObj.splitViewLogBook.showSecondaryView = true;
            contextObj.blnUserSection = true;
        }
        else if (contextObj.splitViewLogBook.showSecondaryView == true) {
            contextObj.splitViewLogBook.showSecondaryView = false;
            contextObj.blnUserSection = false;
        }
    };
    LogbookComponent.prototype.getListBoxChanges = function (event) {
    };
    LogbookComponent.prototype.setPrevMonthsDate = function () {
        var currentDate = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var prevMonth;
        var eoy;
        if (currentDate.getMonth() - 1 < 0) {
            prevMonth = monthNames[monthNames.length - 1];
            eoy = true;
        }
        else
            prevMonth = monthNames[currentDate.getMonth() - 1];
        var arr;
        arr = currentDate.toDateString().split(" ");
        if (eoy)
            arr[3] = (Number(arr[3]) - 1).toString();
        return arr[2] + " " + prevMonth + " " + arr[3];
    };
    LogbookComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var DeviceTypeIds = "";
        var blnModulesSelected = false;
        var listBoxData;
        var rptFieldArray;
        this.strSelectedIds = "";
        var fromDateIfield;
        var toDateIfield;
        if (contextObj.logbookParameterFieldData.length > 0) {
            fromDateIfield = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 500339; });
            toDateIfield = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 500340; });
            var frmDate = new Date(fromDateIfield.FieldValue);
            var toDate = new Date(toDateIfield.FieldValue);
            if (frmDate <= toDate) {
                if (contextObj.logbookParameterFieldData.length > 0) {
                    listBoxData = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 1699; });
                    if (listBoxData.MultiFieldValues != null) {
                        for (var i = 0; i < listBoxData.MultiFieldValues.length; i++) {
                            if (i == 0) {
                                this.strSelectedIds = listBoxData.MultiFieldValues[i];
                            }
                            else {
                                this.strSelectedIds = this.strSelectedIds + "," + listBoxData.MultiFieldValues[i];
                            }
                        }
                    }
                    listBoxData = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 6325; }); /*Device Type*/
                    if (listBoxData && listBoxData.MultiFieldValues != null) {
                        for (var i = 0; i < listBoxData.MultiFieldValues.length; i++) {
                            if (i == 0) {
                                DeviceTypeIds = listBoxData.MultiFieldValues[i];
                            }
                            else {
                                DeviceTypeIds = DeviceTypeIds + "," + listBoxData.MultiFieldValues[i];
                            }
                        }
                    }
                }
                rptFieldArray = JSON.parse(event.fieldobject);
                for (var i = 0; i < rptFieldArray.length; i++) {
                    if (rptFieldArray[i].ReportFieldId == 1703) {
                        rptFieldArray[i].Value = "-1"; /*for all users*/
                    }
                    if (i == 4) {
                        rptFieldArray[i].Value = this.strSelectedIds;
                    }
                    if (rptFieldArray[i].ReportFieldId == 6325) {
                        rptFieldArray[i].Value = DeviceTypeIds;
                    }
                }
                if (this.strSelectedIds != "") {
                    this.administrationService.postLogBookParameterFieldInsert(JSON.stringify(rptFieldArray)).subscribe(function (resultData) {
                        if (JSON.parse(resultData["Data"].FieldBinderData).length > 0) {
                            contextObj.logUserDataInput = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.logParameterListRptFields = JSON.stringify(rptFieldArray);
                            contextObj._notificationService.ShowToaster("Select Users", 2);
                            contextObj.sectionAccessExpansionStatus[0].isExpanded = false;
                            contextObj.sectionAccessExpansionStatus[1].isExpanded = true;
                        }
                        else {
                            contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                        }
                    });
                }
                else {
                    contextObj._notificationService.ShowToaster("Select at least one Module", 2);
                }
            }
            else {
                contextObj._notificationService.ShowToaster("To Date must be greater than From Date", 2);
            }
        }
    };
    LogbookComponent.prototype.getDataForEntities = function (event) {
        var contextObj = this;
        contextObj.logEntitiesInput = event.logEntitiesInput;
        contextObj.logParamDataforEntities = event.logParameterData;
        contextObj.logUserDataforEntities = event.logUserData;
        contextObj.sectionAccessExpansionStatus[1].isExpanded = false;
        contextObj.sectionAccessExpansionStatus[2].isExpanded = true;
    };
    LogbookComponent.prototype.getDataForActivities = function (event) {
        var contextObj = this;
        contextObj.logEntitiesDataforActivity = event.logEntities;
        contextObj.logParamDataforActivity = event.logParameterData;
        contextObj.logUserDataforActivity = event.logUserData;
        contextObj.logActivityInput = event.logActivityInput;
        contextObj.sectionAccessExpansionStatus[2].isExpanded = false;
        contextObj.sectionAccessExpansionStatus[3].isExpanded = true;
    };
    LogbookComponent.prototype.getDataForLog = function (event) {
        var contextObj = this;
        contextObj.pagingTarget = 2;
        if (event != null) {
            contextObj.strLogParams = JSON.stringify(event.logActivityList);
            contextObj.strLogUsers = event.logParamList;
            contextObj.strLogEvents = event.logUserList;
            contextObj.strLogActivities = event.logEntityList;
            this.administrationService.postLogListFieldInsert(JSON.stringify(event.logActivityList), event.logParamList, event.logUserList, event.logEntityList, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData["Data"].DataCount > 0) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.sectionAccessExpansionStatus[3].isExpanded = false;
                    contextObj.splitViewLogBook.showSecondaryView = false;
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                    contextObj.splitViewLogBook.showSecondaryView = false;
                }
            });
        }
        else {
            if (contextObj.totalItems == 0) {
                contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
            }
            contextObj.splitViewLogBook.showSecondaryView = false;
        }
        contextObj.sectionAccessExpansionStatus[0].isExpanded = true;
    };
    LogbookComponent.prototype.getLogGenerateClick = function () {
        var contextObj = this;
        var blnModulesSelected = false;
        var listBoxData;
        var logParameterArray;
        var logUserIdsArray;
        var logEntityIdsArray;
        var logActivityIdsArray;
        this.strSelectedIds = "";
        if (contextObj.logbookParameterFieldData.length > 0) {
            listBoxData = contextObj.logbookParameterFieldData.find(function (el) { return el.ReportFieldId === 1699; });
            if (listBoxData.MultiFieldValues != null) {
                for (var i = 0; i < listBoxData.MultiFieldValues.length; i++) {
                    if (i == 0) {
                        this.strSelectedIds = listBoxData.MultiFieldValues[i];
                    }
                    else {
                        this.strSelectedIds = this.strSelectedIds + "," + listBoxData.MultiFieldValues[i];
                    }
                }
            }
        }
        logParameterArray = JSON.parse(this.getData.getFieldValuesAsReportFieldArray(contextObj.logbookParameterFieldData));
        for (var i = 0; i < logParameterArray.length; i++) {
            if (logParameterArray[i].ReportFieldId == 1703) {
                switch (logParameterArray[i].Value) {
                    case "0":
                        logParameterArray[i].Value = "-1";
                        break;
                    case "1":
                        logParameterArray[i].Value = "-3";
                        break;
                    case "2":
                        logParameterArray[i].Value = "-2";
                        break;
                }
            }
            if (i == 4) {
                logParameterArray[i].Value = this.strSelectedIds;
            }
        }
        if (this.strSelectedIds != "") {
            this.administrationService.postLogListOnRandomSelection(JSON.stringify(logParameterArray), "", "", "", contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData["Data"].DataCount > 0) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            });
        }
        else {
            contextObj._notificationService.ShowToaster("Select at least one Module", 2);
        }
    };
    LogbookComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        if (contextObj.pagingTarget == 1) {
            this.administrationService.getLogBookDataOnload(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData.Data.FieldBinderData != "[]" && resultData.Data.FieldBinderData != undefined && resultData.Data.FieldBinderData != "" && resultData.Data.FieldBinderData != null) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            });
        }
        else if (contextObj.pagingTarget == 2) {
            this.administrationService.postLogListFieldInsert(contextObj.strLogParams, contextObj.strLogUsers, contextObj.strLogEvents, contextObj.strLogActivities, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData["Data"].DataCount > 0) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            });
        }
    };
    ;
    LogbookComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        if (contextObj.pagingTarget == 1) {
            this.administrationService.getLogBookDataOnload(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData.Data.FieldBinderData != "[]" && resultData.Data.FieldBinderData != undefined && resultData.Data.FieldBinderData != "" && resultData.Data.FieldBinderData != null) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            });
        }
        else if (contextObj.pagingTarget == 2) {
            this.administrationService.postLogListFieldInsert(contextObj.strLogParams, contextObj.strLogUsers, contextObj.strLogEvents, contextObj.strLogActivities, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                if (resultData["Data"].DataCount > 0) {
                    contextObj.itemsSourceLog = JSON.parse(resultData["Data"].FieldBinderData);
                }
                else {
                    if (contextObj.totalItems == 0) {
                        contextObj._notificationService.ShowToaster("No Log events exist for the selected period", 2);
                    }
                }
            });
        }
    };
    LogbookComponent.prototype.onSectionExpandChange = function (obj) {
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            if (this.sectionAccessExpansionStatus[i].title !== obj[1].title) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;
            }
            else {
                this.sectionAccessExpansionStatus[i].isExpanded = true;
            }
        }
    };
    LogbookComponent.prototype.ExportToExcel = function () {
        var contextObj = this;
        var fieldObjectsCopy = contextObj.fieldObjectLog.slice(); //copy of field object  
        var fileName = "Logbook-Details";
        debugger;
        var input = contextObj.administrationService.getInputExportHighlighted(contextObj.inputItems.selectedIds, fileName, contextObj.pagingTarget, fieldObjectsCopy, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.strLogParams, contextObj.strLogUsers, contextObj.strLogEvents, contextObj.strLogActivities);
        contextObj.exportObject.ExportDataFromServer(input, 5, fileName, function (retCode) {
            if (retCode == 0)
                contextObj._notificationService.ShowToaster("Log Activites exported", 3);
            //else
            //    contextObj._notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
        });
    };
    LogbookComponent = __decorate([
        core_1.Component({
            selector: 'logbook',
            templateUrl: './app/Views/Common/LogBook/logbook.component.html',
            inputs: ['dataKey'],
            directives: [search_component_1.searchBox, page_component_1.PageComponent, submenu_component_1.SubMenu, fieldGeneration_component_1.FieldComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, logUserList_component_1.LogUserListComponent, logEntityList_component_1.LogEntityListComponent, logActivityList_component_1.LogActivityListComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent],
            providers: [exporttoexcel_service_1.ExportToExcel, administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [exporttoexcel_service_1.ExportToExcel, administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], LogbookComponent);
    return LogbookComponent;
}());
exports.LogbookComponent = LogbookComponent;
//# sourceMappingURL=logbook.component.js.map
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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var masterpm_addedit_1 = require('./masterpm-addedit');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var PM_Procedures_list_component_1 = require('./PM-Procedures-list.component');
var MasterPMSchedulesListComponent = (function () {
    function MasterPMSchedulesListComponent(administrationService, notificationService, generFun, workOrderService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.workOrderService = workOrderService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectedIds: [0], selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.enableMenu = [];
        this.target = 0;
        this.masterPMTab = false;
        this.masterPMProcedureTab = false;
        this.selectedTab = 0;
        this.deleteIndex = 0;
        this.isSubscribed = false;
        //Form Id : 198
        //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (198))
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 3358
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 3359
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
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
    }
    MasterPMSchedulesListComponent.prototype.ngAfterViewInit = function () {
        this.LoadData();
    };
    MasterPMSchedulesListComponent.prototype.LoadData = function () {
        var contextObj = this;
        var rptField = [5606, 5608, 5612, 5602];
        var count = rptField.length;
        this.workOrderService.getMasterPMScheduleColumns().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
            });
            contextObj.fieldObject = resultData["Data"];
        });
        this.workOrderService.getMasterPMScheduleData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [0, 1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Master PM Schedules exist", 2);
                contextObj.enableMenu = [0];
            }
        });
        //form id : 198***** PageId :2540
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2540, contextObj.administrationService, contextObj.menuData.length);
    };
    MasterPMSchedulesListComponent.prototype.onSubMenuChange = function (event) {
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
                this.procedureClick();
                break;
        }
    };
    MasterPMSchedulesListComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.workOrderService.getMasterPMScheduleData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    };
    MasterPMSchedulesListComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.workOrderService.getMasterPMScheduleData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    };
    MasterPMSchedulesListComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Master PM Schedule";
        var contextObj = this;
        this.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
            contextObj.isSubscribed = customerSettingsData.Data[0]["IsSubscribed"];
        });
        this.workOrderService.loadMasterPMAddFields().subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                    case 1534:
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                        break;
                    case 1547:
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                        break;
                    case 1540:
                        contextObj.fieldDetailsAddEdit[i]["FieldValue"] = "1";
                        break;
                    case 2954:
                        if (contextObj.isSubscribed) {
                            contextObj.fieldDetailsAddEdit[i]["IsValidated"] = true;
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                        }
                        else
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                        break;
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    MasterPMSchedulesListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Master PM Schedule";
        var contextObj = this;
        this.administrationService.getCustomerSubscribedFeatures("189").subscribe(function (customerSettingsData) {
            contextObj.isSubscribed = customerSettingsData.Data[0]["IsSubscribed"];
        });
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Master PM Schedule", 2);
        }
        else {
            this.workOrderService.loadMasterPMEditFields(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                var _loop_1 = function(i) {
                    switch (contextObj.fieldDetailsAddEdit[i].FieldId) {
                        case 1537:
                        case 1538:
                            contextObj.workOrderService.checkMasterPMScheduleInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (checkInUse) {
                                if (checkInUse["Data"] == 1) {
                                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                                    contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                                    contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                }
                                else {
                                    contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = true;
                                    contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                                    contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                                }
                            });
                            break;
                        case 1540:
                            switch (contextObj.fieldDetailsAddEdit[i].FieldValue) {
                                case "1":
                                    break;
                                case "2":
                                    ckblWeekDays = contextObj.fieldDetailsAddEdit.find(function (item) {
                                        return item.FieldId === 1543;
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
                        case 2954:
                            if (contextObj.isSubscribed) {
                                contextObj.fieldDetailsAddEdit[i]["IsValidated"] = true;
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = true;
                            }
                            else
                                contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            break;
                    }
                };
                var ckblWeekDays, rbtnMonthlyReccurencePatternCriteria, ddlMonthlyDayNo, ddlMonthlyWeekOccurence, ddlMonthlyWeekDay, rbtnYearlyReccurencePatternCriteria, ddlYearlyDayNo, ddlYearlyMonthDay, ddlYearlyWeekOccurence, ddlYearlyWeekDay, ddlYearlyMonthofYear;
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    _loop_1(i);
                }
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    MasterPMSchedulesListComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Master PM Schedule", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.workOrderService.checkMasterPMScheduleInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (checkInUse) {
                if (checkInUse["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Master PM Schedule in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    MasterPMSchedulesListComponent.prototype.deleteMasterPM = function () {
        var contextObj = this;
        this.workOrderService.postDeleteMasterPMSchedule(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].ServerId >= 0) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Master PM Schedule deleted", 3);
            }
        });
    };
    MasterPMSchedulesListComponent.prototype.OnSuccessfulSubmit = function (event) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2, 3];
                }
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    };
    MasterPMSchedulesListComponent.prototype.inlineDelete = function (event) {
        this.deleteMasterPM();
    };
    MasterPMSchedulesListComponent.prototype.okDelete = function (event) {
        this.deleteMasterPM();
        this.showSlide = !this.showSlide;
    };
    MasterPMSchedulesListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    MasterPMSchedulesListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    MasterPMSchedulesListComponent.prototype.procedureClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Master PM Schedule", 2);
        }
        else {
            this.equipmentClassName = contextObj.inputItems.rowData["Equipment Class"];
            this.equipmentCategoryName = contextObj.inputItems.rowData["Equipment Category"];
            this.equipmentClassId = contextObj.inputItems.rowData["ClassId"];
            this.pmId = contextObj.inputItems.selectedIds[0];
            contextObj.masterPMProcedureTab = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 100);
        }
    };
    MasterPMSchedulesListComponent.prototype.getSelectedTab = function (event) {
        var contextObj = this;
        if (event[0] == 0 && event[1] == true && contextObj.masterPMProcedureTab) {
            contextObj.LoadData();
            setTimeout(function () {
                contextObj.deleteIndex = 1;
            }, 50);
            contextObj.masterPMProcedureTab = false;
            setTimeout(function () {
                contextObj.deleteIndex = 0;
            }, 50);
        }
        this.selectedTab = event[0];
    };
    MasterPMSchedulesListComponent = __decorate([
        core_1.Component({
            selector: 'Master-PM-Schedules-list',
            templateUrl: './app/Views/WorkOrder/Maintenance/Master-PM-Schedules-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, masterpm_addedit_1.MasterPMScheduleAddEditComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, PM_Procedures_list_component_1.PMProceduresListComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, workorder_service_1.WorkOrdereService, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, workorder_service_1.WorkOrdereService])
    ], MasterPMSchedulesListComponent);
    return MasterPMSchedulesListComponent;
}());
exports.MasterPMSchedulesListComponent = MasterPMSchedulesListComponent;
//# sourceMappingURL=Master-PM-Schedules-list.component.js.map
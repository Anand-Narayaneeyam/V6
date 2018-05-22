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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var seasons_addedit_component_1 = require('./seasons-addedit.component');
var SeasonsComponent = (function () {
    function SeasonsComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.enableMenu = [1];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 6201
            },
            {
                "id": 2,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 6202
            },
            {
                "id": 3,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 6203
            }
        ];
        this.showSlide = false;
        this.ddlDisableShowSelect = [2878, 2879, 2880, 2882];
    }
    SeasonsComponent.prototype.ngOnInit = function () {
        this.getSeasonsListFields();
        this.getSeasonsnList();
    };
    SeasonsComponent.prototype.getSeasonsListFields = function () {
        var contextObj = this;
        this.administrationService.getSeasonsGridFields().subscribe(function (resultData) {
            debugger;
            contextObj.fieldObject = resultData.Data;
        });
        return;
    };
    SeasonsComponent.prototype.getSeasonsnList = function () {
        var contextObj = this;
        contextObj.administrationService.getSeasonsGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            debugger;
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Seasons exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    SeasonsComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    };
    SeasonsComponent.prototype.addClick = function () {
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "New Season";
        this.btnName = "Save";
        this.getAddEditFields(0);
    };
    SeasonsComponent.prototype.editClick = function () {
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "Edit Season";
        this.btnName = "Save Changes";
        this.selectedId = this.inputItems.selectedIds[0];
        this.getAddEditFields(this.inputItems.selectedIds[0]);
    };
    SeasonsComponent.prototype.deleteClick = function () {
        var context = this;
        if (context.inputItems.selectedIds[0] != undefined) {
            context.selectedId = context.inputItems.selectedIds[0];
            context.administrationService.checkSeasonInUse(context.selectedId).subscribe(function (resultData) {
                if (resultData == 0) {
                    context.showSlide = true;
                    context.slideTitle = "iDrawings V6";
                    context.slideType = "notification";
                    context.slideMessage = "Are you sure you want to delete the selected Season?";
                }
                else if (resultData == 1) {
                    context.notificationService.ShowToaster("Selected Season in use, cannot be deleted", 2);
                }
            });
        }
    };
    SeasonsComponent.prototype.getAddEditFields = function (selId) {
        var context = this;
        context.action = "add";
        if (selId == 0) {
            context.administrationService.getSeasonsAddEditFields(0).subscribe(function (resultData) {
                debugger;
                context.fieldDetailsAdd = resultData.Data;
                context.clearDDlShowSelect(context.fieldDetailsAdd);
                context.styleForm(context.fieldDetailsAdd);
                context.setAsValidated(context.fieldDetailsAdd);
            });
            return;
        }
        else if (selId > 0) {
            context.action = "edit";
            debugger;
            var seasonFrmGrid = context.inputItems.rowData.Season;
            var startDateRawFrmGrid = context.inputItems.rowData.Start;
            startDateRawFrmGrid = startDateRawFrmGrid.split(" ");
            var startDayFromGrid = startDateRawFrmGrid[0];
            var startMonthFrmGrid = startDateRawFrmGrid[1];
            var endDateRawFrmGrid = context.inputItems.rowData.End;
            endDateRawFrmGrid = endDateRawFrmGrid.split(" ");
            var endDayFromGrid = endDateRawFrmGrid[0];
            var endMonthFrmGrid = endDateRawFrmGrid[1];
            context.administrationService.getSeasonsAddEditFields(0).subscribe(function (resultData) {
                context.fieldDetailsAdd = resultData.Data;
                context.clearDDlShowSelect(context.fieldDetailsAdd);
                context.styleForm(context.fieldDetailsAdd);
                context.setAsValidated(context.fieldDetailsAdd);
                var seasonField = context.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 2877;
                });
                seasonField.FieldValue = seasonFrmGrid;
                var startMonthField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2878; });
                var monthDetails = Month.find(function (e) { return e.MCode == startMonthFrmGrid; });
                for (var i = 0; i < startMonthField.LookupDetails.LookupValues.length; i++) {
                    if (startMonthField.LookupDetails.LookupValues[i].Id == monthDetails.Id) {
                        startMonthField.FieldValue = startMonthField.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
                var startDayField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2879; });
                var daysForStart = context.getDaysForMonth(startMonthField.FieldValue);
                startDayField.LookupDetails.LookupValues = [];
                context.generateLookUpValuesFor(startDayField, daysForStart);
                for (var i = 0; i < startDayField.LookupDetails.LookupValues.length; i++) {
                    if (startDayField.LookupDetails.LookupValues[i].Id == startDayFromGrid) {
                        startDayField.FieldValue = startDayField.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
                var endMonthField = context.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 2880;
                });
                var monthDetails = Month.find(function (e) {
                    return e.MCode == endMonthFrmGrid;
                });
                for (var i = 0; i < endMonthField.LookupDetails.LookupValues.length; i++) {
                    if (endMonthField.LookupDetails.LookupValues[i].Id == monthDetails.Id) {
                        endMonthField.FieldValue = endMonthField.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
                var endDayField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2882; });
                var daysForEnd = context.getDaysForMonth(endMonthField.FieldValue);
                endDayField.LookupDetails.LookupValues = [];
                context.generateLookUpValuesFor(endDayField, daysForEnd);
                for (var i = 0; i < endDayField.LookupDetails.LookupValues.length; i++) {
                    if (endDayField.LookupDetails.LookupValues[i].Id == endDayFromGrid) {
                        endDayField.FieldValue = endDayField.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
            });
            return;
        }
    };
    SeasonsComponent.prototype.getDaysForMonth = function (fValue) {
        var daysFor = Month.find(function (item) {
            return item.Id == fValue;
        });
        return daysFor.NoDays;
    };
    SeasonsComponent.prototype.generateLookUpValuesFor = function (startDayField, daysFor) {
        for (var i = 1; i <= daysFor; i++) {
            startDayField.LookupDetails.LookupValues.push({ Id: i, Value: "" + i, IsChecked: null });
        }
        debugger;
    };
    SeasonsComponent.prototype.setAsValidated = function (fieldDetailsAdd) {
        var context = this;
        var startMonthValField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2878; });
        var startDayField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2879; });
        var endMonthValField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2880; });
        var startDayValField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2882; });
        startMonthValField.IsValidated = true;
        startDayField.IsValidated = true;
        endMonthValField.IsValidated = true;
        startDayValField.IsValidated = true;
        return;
    };
    SeasonsComponent.prototype.styleForm = function (fieldDetailsAdd) {
        fieldDetailsAdd.find(function (item) { if (item.FieldId == 2878) {
            return item.FieldLabel = "Start";
        } });
        fieldDetailsAdd.find(function (item) { if (item.FieldId == 2879) {
            return item.FieldLabel = "";
        } });
        fieldDetailsAdd.find(function (item) { if (item.FieldId == 2880) {
            return item.FieldLabel = "End";
        } });
        fieldDetailsAdd.find(function (item) { if (item.FieldId == 2882) {
            return item.FieldLabel = "";
        } });
        return;
    };
    SeasonsComponent.prototype.clearDDlShowSelect = function (fieldDetailsAdd) {
        for (var i = 0; i < this.fieldDetailsAdd.length; i++) {
            if (this.ddlDisableShowSelect.indexOf(this.fieldDetailsAdd[i].FieldId) > -1) {
                this.fieldDetailsAdd[i].ShowSelect = false;
                this.fieldDetailsAdd[i].FieldValue = this.fieldDetailsAdd[i].LookupDetails.LookupValues[0].Id.toString();
                ;
            }
        }
        return;
    };
    SeasonsComponent.prototype.onSort = function (objGrid) {
        this.getSeasonsnList();
    };
    SeasonsComponent.prototype.closeSlide = function (event) {
        this.showSlide = false;
    };
    SeasonsComponent.prototype.onSplitViewClose = function (event) {
        this.splitviewInput.showSecondaryView = false;
    };
    SeasonsComponent.prototype.yesOnClick = function (event) {
        this.deleteSeasons();
        this.showSlide = false;
    };
    SeasonsComponent.prototype.deleteSeasons = function () {
        var context = this;
        context.administrationService.postSeasonDelete(this.selectedId).subscribe(function (resultData) {
            debugger;
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                context.itemsSource = retUpdatedSrc["itemSrc"];
                context.totalItems = retUpdatedSrc["itemCount"];
                if (context.totalItems > 0) {
                    context.enableMenu = [1];
                }
                else {
                    context.notificationService.ShowToaster("No Seasons exist", 2);
                    context.enableMenu = [1];
                }
                context.notificationService.ShowToaster("Selected Season deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Selected Season in use, cannot be deleted", 2);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            context.notificationService.ShowToaster("Selected Season in use, cannot be deleted", 2);
                        }
                        break;
                }
            }
        });
        return;
    };
    SeasonsComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    SeasonsComponent.prototype.submitReturn = function (event) {
        debugger;
        var retUpdatedSrc;
        var context = this;
        context.splitviewInput.showSecondaryView = false;
        context.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.totalItems = retUpdatedSrc["itemCount"];
            context.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }
    };
    SeasonsComponent = __decorate([
        core_1.Component({
            selector: 'seasons-component',
            templateUrl: './app/Views/Administration/General Settings/seasons.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, seasons_addedit_component_1.SeasonsAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], SeasonsComponent);
    return SeasonsComponent;
}());
exports.SeasonsComponent = SeasonsComponent;
var Month = [{ Id: 1, MCode: "Jan", NoDays: 31 },
    { Id: 2, MCode: "Feb", NoDays: 29 },
    { Id: 3, MCode: "Mar", NoDays: 31 },
    { Id: 4, MCode: "Apr", NoDays: 30 },
    { Id: 5, MCode: "May", NoDays: 31 },
    { Id: 6, MCode: "Jun", NoDays: 30 },
    { Id: 7, MCode: "Jul", NoDays: 31 },
    { Id: 8, MCode: "Aug", NoDays: 31 },
    { Id: 9, MCode: "Sep", NoDays: 30 },
    { Id: 10, MCode: "Oct", NoDays: 31 },
    { Id: 11, MCode: "Nov", NoDays: 30 },
    { Id: 12, MCode: "Dec", NoDays: 31 }];
//# sourceMappingURL=seasons.component.js.map
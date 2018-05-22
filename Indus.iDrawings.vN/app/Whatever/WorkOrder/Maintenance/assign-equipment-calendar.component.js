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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var AssignEquipmentCalendar = (function () {
    function AssignEquipmentCalendar(administrationServices, workOrderService, notificationService, getData) {
        this.administrationServices = administrationServices;
        this.workOrderService = workOrderService;
        this.notificationService = notificationService;
        this.getData = getData;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: true, selectioMode: "single", isHeaderCheckBx: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.showSlide = false;
        this.slidewidth = 250;
        this.showButton = false;
        this.showaddedit = false;
        this.showslide = false;
        this.slideTitle = "";
        this.ConfirmDeleteMsg = "";
        this.slideType = "";
        this.selectedId = 0;
        this.totalItem = 0;
        this.firstDropDownId = 0;
        this.secondDropDownId = 0;
        this.showCalendar = false;
        this.isClass = false;
        this.rptCat = [];
    }
    AssignEquipmentCalendar.prototype.ngOnInit = function () {
        this.btnName = "Save Changes";
        this.getAssignEquipFormFields();
        this.getAssignEquipCalFieldsOnCategorySelected();
    };
    AssignEquipmentCalendar.prototype.getAssignEquipFormFields = function () {
        var contextObj = this;
        this.workOrderService.getAssignEquipmentCalDDlFields().subscribe(function (resultData) {
            contextObj.fieldObject = [];
            contextObj.formFieldObj = resultData.Data;
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2930; });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2931; });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2932; });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2933; });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2934; });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2935; });
            contextObj.inputItems.isHeaderCheckBx = true;
        });
        return;
    };
    AssignEquipmentCalendar.prototype.getAssignEquipCalFieldsOnCategorySelected = function () {
        var contextObj = this;
        this.workOrderService.getAssignEquipmentCalDDlFields().subscribe(function (resultData) {
            contextObj.fieldObject = [];
            contextObj.fieldObject = resultData.Data;
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2910; });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2911; });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2933; });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2934; });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2935; });
            contextObj.inputItems.isHeaderCheckBx = true;
        });
        return;
    };
    AssignEquipmentCalendar.prototype.getAssignEquipCalFieldsOnClassSelected = function () {
        var contextObj = this;
        this.workOrderService.getAssignEquipmentCalDDlFields().subscribe(function (resultData) {
            contextObj.fieldObject = [];
            contextObj.fieldObject = resultData.Data;
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2910; });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2911; });
            var EqClassField = contextObj.fieldObject.find(function (item) { return item.FieldId === 2931; });
            EqClassField.FieldLabel = "Equipment No.";
        });
        return;
    };
    AssignEquipmentCalendar.prototype.getAssignEquipCalList = function (isClassSelected, parentId, classId, sortStatus) {
        var context = this;
        var tempField = [];
        if (isClassSelected == 0) {
            context.isClass = false;
            tempField.push({ ReportFieldId: 4491, Value: "" + parentId });
            tempField.push({ ReportFieldId: 657, Value: "0" });
            try {
                context.fieldObject = [];
                this.getAssignEquipCalFieldsOnCategorySelected();
            }
            catch (Error) {
                context.notificationService.ShowToaster("Unknown Error", 5);
            }
        }
        else {
            context.isClass = true;
            tempField.push({ ReportFieldId: 4491, Value: "" + parentId });
            tempField.push({ ReportFieldId: 657, Value: "" + classId });
            try {
                context.fieldObject = [];
                this.getAssignEquipCalFieldsOnClassSelected();
            }
            catch (Error) {
                context.notificationService.ShowToaster("Unknown Error", 5);
            }
        }
        if (sortStatus == 0) {
            context.workOrderService.getAssignEquipCalData(0, "", "ASC", isClassSelected, JSON.stringify(tempField)).subscribe(function (resultData) {
                try {
                    context.itemsSource = [];
                    context.itemsSource = JSON.parse(resultData.Data.FieldBinderData);
                }
                catch (Error) {
                    context.notificationService.ShowToaster("Unknown Error", 5);
                }
            });
        }
        else if (sortStatus == 1) {
            context.workOrderService.getAssignEquipCalData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, isClassSelected, JSON.stringify(tempField)).subscribe(function (resultData) {
                try {
                    context.itemsSource = [];
                    context.itemsSource = JSON.parse(resultData.Data.FieldBinderData);
                }
                catch (Error) {
                    context.notificationService.ShowToaster("Unknown Error", 5);
                }
            });
        }
        return;
    };
    AssignEquipmentCalendar.prototype.ddlChange = function (event) {
        var context = this;
        if (event.ddlRelationShipEvent.ChildFieldObject.FieldId == 2910) {
            context.notificationService.ClearAllToasts();
            var parentId = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
            parentId = parseInt(parentId);
            context.firstDropDownId = parentId;
            context.workOrderService.getLookUpsForEquipmentClassDDL(parentId).subscribe(function (resultData) {
                var EqClassField = context.formFieldObj.find(function (item) { return item.FieldId === 2911; });
                EqClassField.LookupDetails.LookupValues = [];
                if (resultData.Data.LookupValues.length > 0) {
                    EqClassField.LookupDetails.LookupValues = resultData.Data.LookupValues;
                    EqClassField.FieldValue = "-1";
                    context.showButton = true;
                }
                else {
                    context.notificationService.ShowToaster("No Equipment Classes exist", 2);
                    context.showButton = false;
                    EqClassField.FieldValue = "-1";
                }
            });
            this.getAssignEquipCalList(0, parentId, 0, 0);
        }
        else if (event.ddlRelationShipEvent.ChildFieldObject.FieldId == 2911) {
            context.notificationService.ClearAllToasts();
            var childId = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
            childId = parseInt(childId);
            context.secondDropDownId = childId;
            var catField = context.formFieldObj.find(function (item) { return item.FieldId === 2910; });
            var classField = event.ddlRelationShipEvent.ChildFieldObject;
            if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue != "-1") {
                this.getAssignEquipCalList(1, context.firstDropDownId, context.secondDropDownId, 0);
                this.isClass = true;
            }
            else {
                this.getAssignEquipCalList(0, context.firstDropDownId, 0, 0);
                this.isClass = false;
            }
        }
        return;
    };
    AssignEquipmentCalendar.prototype.onSort = function (objGrid) {
        var context = this;
        if (context.isClass == false) {
            context.getAssignEquipCalList(0, context.firstDropDownId, 0, 1);
        }
        else if (context.isClass == true) {
            context.getAssignEquipCalList(1, context.firstDropDownId, context.secondDropDownId, 1);
        }
    };
    AssignEquipmentCalendar.prototype.onSaveChanges = function () {
        var context = this;
        this.rptCat = [];
        this.rptCat = context.getCheckedRows(context.itemsSource);
        if (context.rptCat.length > 0) {
            context.getFieldsForUpdate();
            context.showSlide = true;
            context.showCalendar = true;
            context.slideType = "dialog";
            context.slideTitle = "Set Calendar";
        }
        else {
            context.notificationService.ShowToaster("Select Equipment(s)", 2);
        }
    };
    AssignEquipmentCalendar.prototype.getFieldsForUpdate = function () {
        var contextObj = this;
        this.workOrderService.getAssignEquipmentUpdateFields().subscribe(function (resultData) {
            contextObj.fieldObjUpdate = resultData.Data;
        });
        return;
    };
    AssignEquipmentCalendar.prototype.getCheckedRows = function (itemsSource) {
        var tempField = [];
        for (var i = 0; i < itemsSource.length; i++) {
            if (itemsSource[i]["Select All"] == true) {
                tempField.push({ Id: itemsSource[i]["Id"] });
            }
        }
        return tempField;
    };
    AssignEquipmentCalendar.prototype.yesOnClick = function (event) {
        var CalendarId;
        var context = this;
        var reportField = [];
        var updateField = this.fieldObjUpdate.find(function (item) { return item.FieldId === 2937; });
        if (updateField.FieldValue == "-1") {
            reportField.push({ ReportFieldId: 6150, Value: "0" });
        }
        else {
            reportField.push({ ReportFieldId: 6150, Value: "" + updateField.FieldValue });
        }
        if (context.isClass == false) {
            for (var i = 0; i < this.rptCat.length; i++) {
                reportField.push({ ReportFieldId: 6149, Value: "" + this.rptCat[i].Id });
            }
        }
        else if (context.isClass == true) {
            for (var i = 0; i < this.rptCat.length; i++) {
                reportField.push({ ReportFieldId: 6147, Value: "" + this.rptCat[i].Id });
            }
        }
        context.UpdateEquipmentCalendar(reportField);
        return;
    };
    AssignEquipmentCalendar.prototype.UpdateEquipmentCalendar = function (reportField) {
        var context = this;
        context.workOrderService.postUpdateEquipmentCalendar(JSON.stringify(reportField)).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 1:
                    context.notificationService.ShowToaster("Equipment Calendar updated", 3);
                    context.showSlide = false;
                    this.showCalendar = false;
                    if (context.isClass == false) {
                        context.getAssignEquipCalList(0, context.firstDropDownId, 0, 0);
                    }
                    else if (context.isClass == true) {
                        context.getAssignEquipCalList(1, context.firstDropDownId, context.secondDropDownId, 0);
                    }
                    break;
                case 0:
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                default:
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
            }
        });
    };
    AssignEquipmentCalendar.prototype.closeSlide = function (value) {
        this.showSlide = value.value;
        this.showCalendar = false;
    };
    AssignEquipmentCalendar = __decorate([
        core_1.Component({
            selector: 'assign-equipment-calendar',
            templateUrl: './app/Views/WorkOrder/Maintenance/assign-equipment-calendar.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService],
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], AssignEquipmentCalendar);
    return AssignEquipmentCalendar;
}());
exports.AssignEquipmentCalendar = AssignEquipmentCalendar;
//# sourceMappingURL=assign-equipment-calendar.component.js.map
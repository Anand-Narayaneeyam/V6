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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var validation_service_1 = require('../../../framework/models/validation/validation.service');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var SymbolAssign = (function () {
    function SymbolAssign(notificationService, administrationService, validateService) {
        this.notificationService = notificationService;
        this.administrationService = administrationService;
        this.validateService = validateService;
        this.totalItems = 0;
        this.types = true;
        this.itemsSourceCopy = [];
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, selectioMode: 'single', allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.ShowCheckbox = false;
        this.totalSelectedBox = [];
        this.checkedItemSource = [];
        this.showSlide = false;
        this.Symbol = "";
        this.position = "top-right";
        this.disableBtn = false;
    }
    SymbolAssign.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.alignContent = "horizontal";
        contextObj.administrationService.AssignSymbolFeilds().subscribe(function (resultData) {
            contextObj.ddlField1 = resultData["Data"].find(function (item) { return item.FieldId == 3056; });
            contextObj.ddlField2 = resultData["Data"].find(function (item) { return item.FieldId == 3057; });
            contextObj.fieldObject = resultData["Data"].splice(3);
            contextObj.fieldObject.find(function (item) { return item.FieldId === 3059; }).IsEnabled = false;
        });
    };
    SymbolAssign.prototype.onChange = function (event, target) {
        var contextObj = this;
        var dropdownId = +event; //dont remove the + sign
        if (target == 1) {
            contextObj.checkedItemSource = [];
            contextObj.ShowCheckbox = false;
            contextObj.ddlField2.FieldValue = "-1";
            if (dropdownId == -1) {
                contextObj.ddlField2.LookupDetails.LookupValues = [];
                var el = document.getElementById(this.ddlField2.FieldId.toString());
                this.validateService.initiateValidation(this.ddlField2, this, true, el);
            }
            else {
                contextObj.org_Name = dropdownId;
                contextObj.administrationService.loadModuleddl(3056, dropdownId).subscribe(function (resultData) {
                    if (resultData["Data"]["LookupValues"] != null && resultData["Data"]["LookupValues"] != undefined && resultData["Data"]["LookupValues"] != "") {
                        contextObj.ddlField2.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        var el = document.getElementById(contextObj.ddlField2.FieldId.toString());
                        contextObj.validateService.initiateValidation(contextObj.ddlField2, contextObj, true, el);
                    }
                });
            }
        }
        else {
            contextObj.ShowCheckbox = !(dropdownId == -1);
            contextObj.Module = dropdownId;
            contextObj.checkedItemSource = [];
            if (contextObj.org_Name != undefined && contextObj.Module != undefined) {
                this.dataLoad();
            }
        }
        contextObj.disableBtn = contextObj.ddlField2.HasValidationError || contextObj.ddlField1.HasValidationError;
    };
    SymbolAssign.prototype.dataLoad = function () {
        var contextObj = this;
        var reportfieldIdArray = [];
        reportfieldIdArray.push({
            ReportFieldId: 679,
            Value: contextObj.Module,
        }, {
            ReportFieldId: 676,
            Value: contextObj.org_Name,
        });
        contextObj.administrationService.loadCheckBoxDataSort(JSON.stringify(reportfieldIdArray), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            var tempItemSource = [];
            tempItemSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsSourceCopy = tempItemSource.slice();
            contextObj.updateCheckedItemSource();
            for (var i = 0; i < tempItemSource.length; i++) {
                tempItemSource[i]["Select All"] = false;
            }
            contextObj.itemsSource = tempItemSource;
        });
    };
    SymbolAssign.prototype.updateCheckedItemSource = function () {
        var contextObj = this;
        contextObj.checkedItemSource = contextObj.itemsSourceCopy.filter(function (item) {
            return item["Select All"] == 1;
        });
    };
    SymbolAssign.prototype.onSort = function (objGrid) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (contextObj.org_Name != undefined && contextObj.Module != undefined) {
            this.dataLoad();
        }
    };
    SymbolAssign.prototype.onSubmit = function (event) {
        var contextObj = this;
        var reportfieldIdArray = contextObj.getReportFieldArray();
        if (reportfieldIdArray.find(function (item) { return item.ReportFieldId === 677; }) == undefined) {
            contextObj.notificationService.ShowToaster("Select at least one Symbol", 2);
            return;
        }
        var stringArray = [];
        stringArray = contextObj.getExistingSource();
        contextObj.message = "Symbol(s) '" + stringArray.join(", ") + "' already assigned to the Customer, Do you want to overwrite the existing Symbol(s) ?";
        if (stringArray.length > 0) {
            contextObj.showSlide = true;
        }
        else {
            contextObj.updateAssignSymbol();
        }
    };
    SymbolAssign.prototype.getExistingSource = function () {
        var contextObj = this;
        var stringArray = [];
        for (var i = 0; i < contextObj.checkedItemSource.length; i++) {
            contextObj.itemsSource.find(function (item) {
                if (item.Id == contextObj.checkedItemSource[i].Id && (item["Select All"] == true || item["Select All"] == 1)) {
                    stringArray.push(item.Symbol);
                    return true;
                }
                return false;
            });
        }
        return stringArray;
    };
    SymbolAssign.prototype.getReportFieldArray = function () {
        var contextObj = this;
        var reportfieldIdArray = [];
        reportfieldIdArray.push({
            ReportFieldId: 679,
            Value: contextObj.Module,
        });
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true)
                reportfieldIdArray.push({
                    ReportFieldId: 677,
                    Value: contextObj.itemsSource[i].Id
                });
        }
        reportfieldIdArray.push({
            ReportFieldId: 676,
            Value: contextObj.org_Name,
        });
        return reportfieldIdArray;
    };
    SymbolAssign.prototype.ok = function (event) {
        this.showSlide = !this.showSlide;
        var contextObj = this;
        this.getReportFieldArray();
        this.updateAssignSymbol();
    };
    SymbolAssign.prototype.updateAssignSymbol = function () {
        var contextObj = this;
        contextObj.administrationService.UpdateAssignSymbol(JSON.stringify(contextObj.getReportFieldArray())).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Symbols assigned to the Customer", 2);
                contextObj.itemsSourceCopy = JSON.parse(resultData["Data"].Data);
                contextObj.updateCheckedItemSource();
            }
            else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    };
    SymbolAssign.prototype.cancel = function (event) {
        this.showSlide = !this.showSlide;
    };
    SymbolAssign.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    SymbolAssign = __decorate([
        core_1.Component({
            selector: 'AssignSymbol',
            templateUrl: './app/Views/Administration/SymbolLibrary/AssignSymbol.html',
            directives: [split_view_component_1.SplitViewComponent, slide_component_1.SlideComponent, notify_component_1.Notification, page_component_1.PageComponent, dropdownlistcomponent_component_1.DropDownListComponent, grid_component_1.GridComponent, sort_component_1.Sorting],
            providers: [notify_service_1.NotificationService, administration_service_1.AdministrationService, validation_service_1.ValidateService],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, administration_service_1.AdministrationService, validation_service_1.ValidateService])
    ], SymbolAssign);
    return SymbolAssign;
}());
exports.SymbolAssign = SymbolAssign;
//# sourceMappingURL=AssignSymbol.js.map
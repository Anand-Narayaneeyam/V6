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
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var buttoncomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component');
var validation_service_1 = require('../../../framework/models/validation/validation.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var AssignDrawingCategoryComponent = (function () {
    function AssignDrawingCategoryComponent(administrationService, notificationService, validateService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.validateService = validateService;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, selectioMode: 'single', sortDir: 'ASC', sortCol: "[Drawing Category]", isHeaderCheckBx: true };
        this.itemsSource = [];
        this.customerId = 0;
        this.entityCategoryId = 0;
        this.disableBtn = true;
        this.count = 0;
        this.moduleId = 0;
        this.pageIndex = 0;
        this.value = [];
        this.totalItems = 0;
        this.itemsPerPage = 0;
    }
    AssignDrawingCategoryComponent.prototype.ngOnInit = function () {
        var context = this;
        this.alignContent = "horizontal";
        this.btnSave = "Save Changes";
        this.itemsSource = [];
    };
    AssignDrawingCategoryComponent.prototype.dataLoad = function (moduleId) {
        var contextObj = this;
        var reportfieldIdValues = new Array();
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() });
        reportfieldIdValues.push({ ReportFieldId: 271, Value: moduleId.toString() });
        contextObj.administrationService.getDrawingCategoryData(reportfieldIdValues, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result.DataCount;
            contextObj.itemsSource = JSON.parse(result.FieldBinderData);
            contextObj.itemsPerPage = result.RowsPerPage;
            if (contextObj.totalItems == 0) {
                contextObj.itemsSource = [];
                contextObj.notificationService.ShowToaster("No Drawing Categories exist", 2);
                contextObj.disableBtn = true;
            }
        });
    };
    AssignDrawingCategoryComponent.prototype.onChangeModule = function (event) {
        this.moduleId = event;
        if (this.moduleId == -1) {
            this.disableBtn = true;
            this.itemsSource = [];
        }
        else {
            this.disableBtn = false;
            this.dataLoad(this.moduleId);
        }
    };
    AssignDrawingCategoryComponent.prototype.onCellEdit = function (event) {
        if ((event.dataKeyValue == 1 || !event.isHeaderClicked) && this.moduleId == 1) {
            var arch = event["dataSource"].find(function (item) { return item.Id == 1; });
            arch["Select All"] = true;
        }
    };
    AssignDrawingCategoryComponent.prototype.Update = function () {
        var context = this;
        var reportfieldIdValues = new Array();
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() });
        reportfieldIdValues.push({ ReportFieldId: 271, Value: this.moduleId.toString() });
        if (this.moduleId == 1) {
            var arch = this.itemsSource.find(function (item) { return item.Id == 1; });
            arch["Select All"] = true;
        }
        for (var _i = 0, _a = this.itemsSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item['Select All'] == true) {
                reportfieldIdValues.push({ ReportFieldId: 2056, Value: item['Id'].toString() });
            }
        }
        this.administrationService.postsubmitCustomerDwgCategory(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
            if (result["StatusId"] == 1) {
                context.notificationService.ShowToaster("Drawing Categories updated", 3);
            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2);
            }
        });
    };
    AssignDrawingCategoryComponent.prototype.onSort = function (event) {
        this.dataLoad(this.moduleId);
    };
    AssignDrawingCategoryComponent = __decorate([
        core_1.Component({
            selector: 'assign-drawingcategories',
            templateUrl: './app/Views/Administration/Customers/assign-drawingcategories.html',
            directives: [split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, dropdownlistcomponent_component_1.DropDownListComponent, buttoncomponent_component_1.ButtonComponent, paging_component_1.PagingComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            inputs: ["customerId", "fieldDetails", "ddlOrgName", "ddlModule"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], AssignDrawingCategoryComponent);
    return AssignDrawingCategoryComponent;
}());
exports.AssignDrawingCategoryComponent = AssignDrawingCategoryComponent;
//# sourceMappingURL=assign-drawingcategories.js.map
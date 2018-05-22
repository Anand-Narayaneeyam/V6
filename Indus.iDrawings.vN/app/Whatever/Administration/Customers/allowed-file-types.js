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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var buttoncomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component');
var validation_service_1 = require('../../../framework/models/validation/validation.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var AllowedFileTypesComponent = (function () {
    function AllowedFileTypesComponent(administrationService, notificationService, validateService) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.validateService = validateService;
        this.inputItems = { dataKey: "FileTypeId", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, selectioMode: 'single', sortDir: 'ASC', sortCol: "[File Type]", isHeaderCheckBx: true };
        this.itemsSource = [];
        this.customerId = 0;
        this.disableBtn = false;
        this.count = 0;
        this.moduleId = 0;
        this.pageIndex = 0;
        this.value = [];
        this.totalItems = 0;
        this.itemsPerPage = 0;
    }
    AllowedFileTypesComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.btnSave = "Save Changes";
        var rptField = [330];
        this.administrationService.getAllowedFileTypesFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            for (var i = 0; i < contextObj.fieldObject.length; i++) {
                if (contextObj.fieldObject[i].ReportFieldId == 113) {
                    contextObj.txtOrgName = contextObj.fieldObject[i];
                    contextObj.txtOrgName.FieldValue = contextObj.rowData["Name"];
                }
            }
            var removeArr = [113];
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
            contextObj.loadData();
        });
    };
    AllowedFileTypesComponent.prototype.loadData = function () {
        var contextObj = this;
        var reportfieldIdValues = new Array();
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() });
        contextObj.administrationService.getAllowedFileTypesData(reportfieldIdValues, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems == 0) {
                contextObj.itemsSource = [];
                contextObj.notificationService.ShowToaster("No File Types exist", 2);
                contextObj.disableBtn = true;
            }
        });
    };
    AllowedFileTypesComponent.prototype.Update = function () {
        var context = this;
        var reportfieldIdValues = new Array();
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() });
        for (var _i = 0, _a = this.itemsSource; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item['Select All'] == true) {
                reportfieldIdValues.push({ ReportFieldId: 329, Value: item['FileTypeId'].toString() });
            }
        }
        this.administrationService.postsubmitAllowedFileTypes(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
            if (result["StatusId"] == 1) {
                context.notificationService.ShowToaster("File Types updated", 3);
            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2);
            }
        });
    };
    AllowedFileTypesComponent.prototype.onSort = function (event) {
        this.loadData();
    };
    AllowedFileTypesComponent = __decorate([
        core_1.Component({
            selector: 'allowed-file-types',
            templateUrl: './app/Views/Administration/Customers/allowed-file-types.html',
            directives: [split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, stringtextbox_component_1.StringTextBoxComponent, buttoncomponent_component_1.ButtonComponent, paging_component_1.PagingComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            inputs: ["customerId", "rowData"]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, validation_service_1.ValidateService])
    ], AllowedFileTypesComponent);
    return AllowedFileTypesComponent;
}());
exports.AllowedFileTypesComponent = AllowedFileTypesComponent;
//# sourceMappingURL=allowed-file-types.js.map
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
var space_service_1 = require('../../../Models/space/space.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var EmployeeScale = (function () {
    function EmployeeScale(notificationService, generalFunctions, EmployeeService) {
        this.notificationService = notificationService;
        this.generalFunctions = generalFunctions;
        this.EmployeeService = EmployeeService;
        this.fieldDetailsAdd1 = [];
        // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'single' };
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.submitSuccess = new core_1.EventEmitter();
        this.totalItems = 0;
        this.showSlide = false;
        this.position = "top-right";
        this.message = "";
    }
    EmployeeScale.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.EmployeeService.ScaleEmployeefield().subscribe(function (resultData) {
            debugger;
            contextObj.fieldDetails = resultData["Data"];
            var employeescale = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 618; });
            if (contextObj.pageTarget == 1) {
                employeescale.FieldLabel = "Employee Text Height (%)";
            }
            else if (contextObj.pageTarget == 2) {
                contextObj.btnName = "Save";
                employeescale.FieldLabel = "Angle of rotation (anti-clockwise) ";
            }
        });
    };
    EmployeeScale.prototype.onSubmitData = function (event) {
        debugger;
        var contextObj = this;
        var ScaleFactor = JSON.parse(event.fieldobject)[0].Value;
        if (this.pageTarget == 2) {
            if (ScaleFactor < 0 || ScaleFactor > 360) {
                contextObj.notificationService.ShowToaster("Enter angle of rotation between 0 and 360", 2);
                return;
            }
            else
                ScaleFactor = Number(JSON.parse(event.fieldobject)[0].Value).toFixed(0);
        }
        else {
            var fieldReportFieldId = JSON.parse(event.fieldobject)[0].ReportFieldId;
            var toBeDisplayed = contextObj.fieldDetails.find(function (el) { return el.ReportFieldId == fieldReportFieldId; }).FieldLabel;
            toBeDisplayed = toBeDisplayed.split("(")[0];
            if (ScaleFactor < 10 || ScaleFactor > 1000) {
                contextObj.notificationService.ShowToaster("Enter " + toBeDisplayed + "between 10 and 1000", 2);
                return;
            }
        }
        this.submitSuccess.emit(ScaleFactor);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], EmployeeScale.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EmployeeScale.prototype, "fieldDetails", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EmployeeScale.prototype, "submitSuccess", void 0);
    EmployeeScale = __decorate([
        core_1.Component({
            selector: 'Employee-Scale',
            templateUrl: './app/Views/Common/OpenDrawing/EmployeeScale.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, submenu_component_1.SubMenu, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent],
            providers: [http_1.HTTP_PROVIDERS, space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions, employee_services_1.EmployeeService],
            inputs: ['selectedId', 'action', 'fieldDetails', 'btnName', 'pageTarget'],
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, General_1.GeneralFunctions, employee_services_1.EmployeeService])
    ], EmployeeScale);
    return EmployeeScale;
}());
exports.EmployeeScale = EmployeeScale;
//# sourceMappingURL=EmployeeScale.js.map
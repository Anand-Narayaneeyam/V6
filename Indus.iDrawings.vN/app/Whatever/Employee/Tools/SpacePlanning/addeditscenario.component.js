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
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var employee_services_1 = require('../../../../Models/Employee/employee.services');
var AddEditScenariosComponent = (function () {
    function AddEditScenariosComponent(employeeService, notificationService) {
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.submitSuccess = new core_1.EventEmitter();
    }
    AddEditScenariosComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var eventData = JSON.parse(event.fieldobject);
        eventData.find(function (item) {
            if (item.ReportFieldId == 907) {
                item.Value = contextObj.selectedId.toString();
                return true;
            }
            else
                return false;
        });
        this.employeeService.listUpdateScenarios(JSON.stringify(eventData)).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 1:
                    contextObj.notificationService.ShowToaster("Scenario updated", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1)
                        contextObj.notificationService.ShowToaster("Scenario Name already exists", 5);
                    break;
                default:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AddEditScenariosComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddEditScenariosComponent.prototype, "submitSuccess", void 0);
    AddEditScenariosComponent = __decorate([
        core_1.Component({
            selector: 'addedit-scenario',
            templateUrl: './app/Views/Employee/Tools/SpacePlanning/addeditscenario.component.html',
            directives: [fieldGeneration_component_1.FieldComponent],
            providers: [employee_services_1.EmployeeService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService],
            inputs: ['selectedId', 'fieldDetailsAdd']
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], AddEditScenariosComponent);
    return AddEditScenariosComponent;
}());
exports.AddEditScenariosComponent = AddEditScenariosComponent;
//# sourceMappingURL=addeditscenario.component.js.map
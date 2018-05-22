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
var employee_services_1 = require('../../../Models/Employee/employee.services');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var JobTitleAddEditComponent = (function () {
    function JobTitleAddEditComponent(employeeService, _notificationService) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    JobTitleAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    JobTitleAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var field = new Array();
        contextObj.employeeService.AddUpdateJobTitle(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj._notificationService.ShowToaster("Job Title added", 3);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Job Title updated", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Job Title already exists", 5);
                        setTimeout(function () {
                            var el = document.getElementById("999");
                            if (el != null && el != undefined) {
                                el.focus();
                            }
                        }, 100);
                    }
                    else {
                        contextObj._notificationService.ShowToaster("Unknown problem", 1);
                    }
                    break;
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], JobTitleAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], JobTitleAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], JobTitleAddEditComponent.prototype, "submitSuccess", void 0);
    JobTitleAddEditComponent = __decorate([
        core_1.Component({
            selector: 'jobtitle-add-edit',
            templateUrl: 'app/Views/Employee/General Settings/jobtitle-add-edit.component.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], JobTitleAddEditComponent);
    return JobTitleAddEditComponent;
}());
exports.JobTitleAddEditComponent = JobTitleAddEditComponent;
//# sourceMappingURL=jobtitle-add-edit.component.js.map
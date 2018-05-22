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
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var buttoncomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component');
var spaceallocationruleaddeditComponent = (function () {
    function spaceallocationruleaddeditComponent(employeeService, _notificationService) {
        this.employeeService = employeeService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
        this.pagePath = "";
    }
    spaceallocationruleaddeditComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.pagePath = "Employee / General Settings / Space Type";
        this.employeeService.loadSpaceAllocationruleAddEdit(0, 1).subscribe(function (result) {
            contextObj.fieldDetailsAdd1 = result["Data"];
            if (contextObj.add == false) {
                contextObj.fieldDetailsAdd1[0].FieldValue = contextObj.rowData["GradeId"];
                contextObj.fieldDetailsAdd1[0].IsEnabled = false;
                contextObj.fieldDetailsAdd1[1].FieldValue = contextObj.rowData["SpaceAllocationRuleId"];
            }
            contextObj.fieldDetailsAdd1[0].IsValidated = true;
            contextObj.fieldDetailsAdd1[1].IsValidated = true;
        });
    };
    spaceallocationruleaddeditComponent.prototype.submitSpaceAllocationtoGrade = function () {
        var contextObj = this;
        var reportfieldIdArray = new Array();
        if (contextObj.fieldDetailsAdd1[0].HasValidationError == true) {
            contextObj._notificationService.ShowToaster("Select Grade", 2);
            return;
        }
        if (contextObj.fieldDetailsAdd1[1].HasValidationError == true) {
            contextObj._notificationService.ShowToaster("Select Space Type", 2);
            return;
        }
        reportfieldIdArray.push({
            ReportFieldId: 5091,
            Value: contextObj.fieldDetailsAdd1[0].FieldValue,
        });
        reportfieldIdArray.push({
            ReportFieldId: 5090,
            Value: contextObj.fieldDetailsAdd1[1].FieldValue,
        });
        contextObj.employeeService.AddUpdateGradestospaceallocation(reportfieldIdArray, this.add).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (contextObj.add) {
                        contextObj.submitSuccess.emit({ Grade: contextObj.fieldDetailsAdd1[0].FieldValue, Space: contextObj.fieldDetailsAdd1[1].FieldValue });
                        contextObj._notificationService.ShowToaster("Space Allocation Rule added", 3);
                    }
                    else {
                        contextObj.submitSuccess.emit(contextObj.fieldDetailsAdd1[1]);
                        contextObj._notificationService.ShowToaster("Space Allocation Rule updated", 3);
                    }
                    //contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj._notificationService.ShowToaster("Space Type for the selected Grade already exists", 5);
                        setTimeout(function () {
                            var el = document.getElementById("1012");
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
    spaceallocationruleaddeditComponent.prototype.onSubmit = function (event) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], spaceallocationruleaddeditComponent.prototype, "add", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], spaceallocationruleaddeditComponent.prototype, "rowData", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], spaceallocationruleaddeditComponent.prototype, "submitSuccess", void 0);
    spaceallocationruleaddeditComponent = __decorate([
        core_1.Component({
            selector: 'spaceallocationrule-add-edit',
            templateUrl: 'app/Views/Employee/General Settings/spaceallocationrule-add-edt.component.html',
            providers: [employee_services_1.EmployeeService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, dropdownlistcomponent_component_1.DropDownListComponent, buttoncomponent_component_1.ButtonComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName'],
        }), 
        __metadata('design:paramtypes', [employee_services_1.EmployeeService, notify_service_1.NotificationService])
    ], spaceallocationruleaddeditComponent);
    return spaceallocationruleaddeditComponent;
}());
exports.spaceallocationruleaddeditComponent = spaceallocationruleaddeditComponent;
//# sourceMappingURL=spaceallocationrule-add-edit.component.js.map
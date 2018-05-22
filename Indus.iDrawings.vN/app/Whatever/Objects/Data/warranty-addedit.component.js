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
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var WarrantyAddEditComponent = (function () {
    function WarrantyAddEditComponent(workOrdereService, objectsService, _notificationService) {
        this.workOrdereService = workOrdereService;
        this.objectsService = objectsService;
        this._notificationService = _notificationService;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    WarrantyAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    WarrantyAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var fields1 = JSON.parse(strsubmitField);
        var months = fields1[4].Value;
        var date = new Date(fields1[2].Value);
        date.setMonth(date.getMonth() + parseInt(months));
        var year = date.getFullYear();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        fields1[3].Value = dd + " " + mon + " " + year;
        fields1[7].Value = this.objectId;
        fields1[8].Value = 0;
        fields1[9].Value = 0;
        strsubmitField = JSON.stringify(fields1);
        var endDate = new Date(fields1[3].Value);
        var today = new Date();
        if (endDate < today) {
            contextObj._notificationService.ShowToaster("Warranty End Date should be greater than Current Date", 5);
            return;
        }
        else {
            contextObj.objectsService.AddUpdateWarranty(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1) {
                            contextObj._notificationService.ShowToaster("Warranty added", 3);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Warranty Details updated", 3);
                        }
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj._notificationService.ShowToaster("Warranty details exist for the selected " + contextObj.objectCategoryName + " with same Warranty End Date", 5);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            contextObj._notificationService.ShowToaster("Specified mail domain not added in iDrawings", 5);
                        }
                        else {
                            contextObj._notificationService.ShowToaster("Unknown problem", 1);
                        }
                        break;
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], WarrantyAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], WarrantyAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WarrantyAddEditComponent.prototype, "submitSuccess", void 0);
    WarrantyAddEditComponent = __decorate([
        core_1.Component({
            selector: 'warranty-add-edit',
            templateUrl: './app/Views/Objects/Data/warranty-addedit.component.html',
            providers: [workorder_service_1.WorkOrdereService, notify_service_1.NotificationService, objects_service_1.ObjectsService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'objectId', 'objectCategoryName'],
        }), 
        __metadata('design:paramtypes', [workorder_service_1.WorkOrdereService, objects_service_1.ObjectsService, notify_service_1.NotificationService])
    ], WarrantyAddEditComponent);
    return WarrantyAddEditComponent;
}());
exports.WarrantyAddEditComponent = WarrantyAddEditComponent;
//# sourceMappingURL=warranty-addedit.component.js.map
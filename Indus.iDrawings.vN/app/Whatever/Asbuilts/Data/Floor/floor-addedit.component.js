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
var administration_service_1 = require('../../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var FloorAddEditComponent = (function () {
    function FloorAddEditComponent(administrationService, _notificationService) {
        this.administrationService = administrationService;
        this._notificationService = _notificationService;
        this.submitSuccess = new core_1.EventEmitter();
    }
    FloorAddEditComponent.prototype.ngOnInit = function () {
        if (this.addEdit == "add")
            this.btnName = "Add";
        else if (this.addEdit == "edit")
            this.btnName = "Edit";
    };
    FloorAddEditComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Add";
            this.administrationService.loadFloorAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) { return _this.fieldDetailsSpaceEdit = resultData["data"]; });
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Edit";
            this.administrationService.loadFloorAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) { return _this.fieldDetailsSpaceEdit = resultData["data"]; });
        }
    };
    FloorAddEditComponent.prototype.onSubmitData = function (event) {
        if (this.addEdit == "add") {
            this.administrationService.submitFloorAdd(this.fieldDetailsSpaceEdit);
            this._notificationService.ShowToaster("Floor Added", 3);
        }
        else if (this.addEdit == "edit") {
        }
        this.submitSuccess.emit("success");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorAddEditComponent.prototype, "submitSuccess", void 0);
    FloorAddEditComponent = __decorate([
        core_1.Component({
            selector: 'floor-addEdit',
            templateUrl: 'app/Views/Asbuilts/Data/floor-addedit.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'addEdit']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService])
    ], FloorAddEditComponent);
    return FloorAddEditComponent;
}());
exports.FloorAddEditComponent = FloorAddEditComponent;
//# sourceMappingURL=floor-addedit.component.js.map
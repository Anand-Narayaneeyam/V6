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
var asbuilt_service_1 = require('../../../Models/Asbuilts/asbuilt.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var AdditionalDataFieldomponentAddEdit = (function () {
    function AdditionalDataFieldomponentAddEdit(asbuiltService, notificationService) {
        this.asbuiltService = asbuiltService;
        this.notificationService = notificationService;
        this.btnName = "Add";
        this.dataKey = "DrawingId";
        this.submitSuccess = new core_1.EventEmitter();
    }
    AdditionalDataFieldomponentAddEdit.prototype.ngOnInit = function () {
        if (this.addEdit == "add") {
            this.btnName = "ADD";
        }
        else if (this.addEdit == "edit") {
            this.btnName = "EDIT";
        }
    };
    AdditionalDataFieldomponentAddEdit.prototype.onSubmitData = function (event) {
        if (this.addEdit == "add") {
            this.notificationService.ShowToaster("Drawing added", 3);
        }
        else if (this.addEdit == "edit") {
            //this.asbuiltService.editDescrition(event[0]);
            this.notificationService.ShowToaster("Drawing updated", 3);
        }
        this.submitSuccess.emit("success");
    };
    AdditionalDataFieldomponentAddEdit.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "ADD";
        }
        else if (changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "EDIT";
            this.asbuiltService.getDrawingtEditDiscriptionFields(this.selectedId, this.addEdit).
                subscribe(function (resultData) { return _this.fieldDetailsAddEdit = resultData["data"]; });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AdditionalDataFieldomponentAddEdit.prototype, "submitSuccess", void 0);
    AdditionalDataFieldomponentAddEdit = __decorate([
        core_1.Component({
            selector: 'drawing-addEdit',
            templateUrl: 'app/Views/Common/Additional Data Fields/addl-datafield_addedit.html',
            directives: [fieldGeneration_component_1.FieldComponent],
            providers: [asbuilt_service_1.AsbuiltService, notify_service_1.NotificationService],
            inputs: ['selectedId', 'addEdit']
        }), 
        __metadata('design:paramtypes', [asbuilt_service_1.AsbuiltService, notify_service_1.NotificationService])
    ], AdditionalDataFieldomponentAddEdit);
    return AdditionalDataFieldomponentAddEdit;
}());
exports.AdditionalDataFieldomponentAddEdit = AdditionalDataFieldomponentAddEdit;
//# sourceMappingURL=drawing_editdiscription.component.js.map
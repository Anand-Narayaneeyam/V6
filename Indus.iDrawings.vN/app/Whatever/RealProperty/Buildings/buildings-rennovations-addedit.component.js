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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var General_1 = require('../../../Models/Common/General');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var RenovationAddEditComponent = (function () {
    function RenovationAddEditComponent(realPropertyService, _notificationService, generalFunctions) {
        this.realPropertyService = realPropertyService;
        this._notificationService = _notificationService;
        this.generalFunctions = generalFunctions;
        this.dataKey = "Id";
        this.submitSuccess = new core_1.EventEmitter();
    }
    RenovationAddEditComponent.prototype.ngOnInit = function () {
    };
    RenovationAddEditComponent.prototype.onSubmitData = function (event) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], 2);
                break;
        }
    };
    RenovationAddEditComponent.prototype.postSubmit = function (strsubmitField, target) {
        var contextObj = this;
        var field = JSON.parse(strsubmitField);
        field.push({
            ReportFieldId: 271,
            Value: "30"
        });
        strsubmitField = JSON.stringify(field);
        var date = new Date(field[1].Value);
        var bcd = new Date(this.BuildingConstructionDate);
        if (bcd > date) {
            var year = bcd.getFullYear();
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var mon = monthNames[bcd.getMonth()];
            var dd = (bcd.getDate() < 10 ? '0' : '') + bcd.getDate();
            var bcd1 = dd + " " + mon + " " + year;
            contextObj._notificationService.ShowToaster("Renovation Date should be greater than Building Construction Date (" + bcd1 + ")", 2);
            setTimeout(function () {
                var el = document.getElementById("1026");
                if (el != null && el != undefined) {
                    el.focus();
                }
            }, 100);
        }
        else {
            contextObj.realPropertyService.AddUpdateRenovation(strsubmitField, this.selectedId, target).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 1:
                        if (target == 1)
                            contextObj._notificationService.ShowToaster("Renovation added", 3);
                        else
                            contextObj._notificationService.ShowToaster("Renovation updated", 3);
                        contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                        break;
                    case 3:
                        contextObj._notificationService.ShowToaster("Renovation already exists", 5);
                        setTimeout(function () {
                            var el = document.getElementById("1026");
                            if (el != null && el != undefined) {
                                el.focus();
                            }
                        }, 100);
                        break;
                }
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RenovationAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], RenovationAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RenovationAddEditComponent.prototype, "submitSuccess", void 0);
    RenovationAddEditComponent = __decorate([
        core_1.Component({
            selector: 'renovation-add-edit',
            templateUrl: './app/Views/RealProperty/Buildings/buildings-rennovations-addedit.component.html',
            providers: [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'BuildingConstructionDate'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], RenovationAddEditComponent);
    return RenovationAddEditComponent;
}());
exports.RenovationAddEditComponent = RenovationAddEditComponent;
//# sourceMappingURL=buildings-rennovations-addedit.component.js.map
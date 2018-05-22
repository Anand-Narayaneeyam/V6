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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var scheduling_service_1 = require('../../../models/scheduling/scheduling.service');
var HotellingResourceListComponent = (function () {
    function HotellingResourceListComponent(schedulingService, notificationService) {
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.sourceFieldObj = [];
    }
    HotellingResourceListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.schedulingService.gethotelingResourceFlds().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
        });
        this.loadSource(contextObj);
    };
    HotellingResourceListComponent.prototype.loadSource = function (context) {
        context.schedulingService.gethotelingResourceData(context.selSeatId).subscribe(function (resultData) {
            debugger;
            context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
            var itemSrc = context.itemSource;
            for (var j = 0; j < context.fieldObject.length; j++) {
                context.fieldObject[j].Width = context.getColumnwidth(context.fieldObject[j]).toString();
                context.fieldObject[j].IsHiddenLabel = true;
            }
            var fieldarr = context.fieldObject;
            for (var i = 0; i < itemSrc.length; i++) {
                fieldarr = JSON.parse(JSON.stringify(fieldarr));
                fieldarr[0].FieldValue = itemSrc[i]["ResourceId"];
                context.sourceFieldObj[i] = fieldarr;
            }
        });
    };
    HotellingResourceListComponent.prototype.getColumnwidth = function (fieldobj) {
        var width = 0;
        if (fieldobj.IsVisible == true) {
            if (fieldobj.DataEntryControlId == 1 && fieldobj.FieldId == 2065)
                width = 250;
            else if (fieldobj.DataEntryControlId == 6)
                width = 75;
            else
                width = 90;
        }
        return width;
    };
    HotellingResourceListComponent = __decorate([
        core_1.Component({
            selector: 'hotellingresource',
            templateUrl: './app/Views/Scheduling/Seat Booking/hotellingresourcelist.component.html',
            directives: [submenu_component_1.SubMenu, fieldGeneration_component_1.FieldComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, scheduling_service_1.SchedulingService],
            inputs: ['target', 'selSeatId']
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService])
    ], HotellingResourceListComponent);
    return HotellingResourceListComponent;
}());
exports.HotellingResourceListComponent = HotellingResourceListComponent;
//# sourceMappingURL=hotellingresourcelist.component.js.map
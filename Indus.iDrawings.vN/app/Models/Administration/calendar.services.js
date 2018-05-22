var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var HttpHelpers_1 = require('../../Whatever/utils/HttpHelpers');
require('rxjs/Rx');
var CalendarService = (function (_super) {
    __extends(CalendarService, _super);
    function CalendarService() {
        _super.apply(this, arguments);
    }
    CalendarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CalendarService);
    return CalendarService;
}(HttpHelpers_1.HttpHelpers));
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.services.js.map
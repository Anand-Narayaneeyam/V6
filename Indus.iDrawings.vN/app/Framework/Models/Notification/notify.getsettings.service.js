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
var GetToasterSettings = (function () {
    function GetToasterSettings() {
        this.themes = [{
                name: 'Default Theme',
                code: 'default'
            }, {
                name: 'Material Design',
                code: 'material'
            }, {
                name: 'Bootstrap 3',
                code: 'bootstrap'
            }];
        this.types = [{
                name: 'Default',
                code: 'default',
            }, {
                name: 'Info',
                code: 'info'
            }, {
                name: 'Success',
                code: 'success'
            }, {
                name: 'Wait',
                code: 'wait'
            }, {
                name: 'Error',
                code: 'error'
            }, {
                name: 'Warning',
                code: 'warning'
            }];
        this.position = [{
                name: 'BR',
                code: 'bottom-right'
            }, {
                name: 'BL',
                code: 'bottom-left'
            }, {
                name: 'TR',
                code: 'top-right'
            }, {
                name: 'TL',
                code: 'top-left'
            }, {
                name: 'TC',
                code: 'top-center'
            },
            {
                name: 'BC',
                code: 'bottom-center'
            }];
        this.title = { name: 'iDrawings V6' };
    }
    GetToasterSettings = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GetToasterSettings);
    return GetToasterSettings;
}());
exports.GetToasterSettings = GetToasterSettings;
//# sourceMappingURL=notify.getsettings.service.js.map
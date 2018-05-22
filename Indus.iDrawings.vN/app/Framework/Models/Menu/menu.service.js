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
var HttpHelpers_1 = require('../../../Whatever/utils/HttpHelpers');
var http_1 = require('@angular/http');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var MenuService = (function (_super) {
    __extends(MenuService, _super);
    function MenuService(http) {
        _super.call(this, http);
        this.http = http;
        this._adminMenuUrl = 'MockData/menu/admin.json';
        this._spaceMenuUrl = 'MockData/menu/space.json';
        this._OverAllDataUrl = 'MockData/menu/overall.json';
        this._generalsettingsUrl = 'MockData/menu/generalsettings.json';
        this._employeeMenuUrl = 'MockData/menu/employee.json';
        this._asbuiltsMenuUrl = 'MockData/menu/asbuilts.json';
        this._schedulingMenuUrl = 'MockData/menu/scheduling.json';
        this._assetsMenuUrl = 'MockData/menu/assets.json';
        this._rpmMenuUrl = 'MockData/menu/rpm.json';
        this._workorderMenuUrl = 'MockData/menu/workorder.json';
        this._reportMenuUrl = 'MockData/menu/reportsmenu.json';
        this._MenuUrl = 'Common/GetMenuDetails';
        this._SettingsMenuUrl = 'Common/GetSettingsMenuDetails';
        this._ReportsMenuUrl = 'Common/GetReportMenuDetails';
    }
    MenuService.prototype.switchModules = function (moduleId) {
        switch (moduleId) {
            case 0: return this.postaction({ Input: "{EntityId: 13, Id: " + moduleId + " }" }, this._MenuUrl);
            case 1: return this.postaction({ Input: "{EntityId: 17, Id: " + moduleId + " }" }, this._MenuUrl);
            case 3: return this.postaction({ Input: "{EntityId: 21, Id: " + moduleId + " }" }, this._MenuUrl);
            case 4: return this.postaction({ Input: "{EntityId: 60, Id: " + moduleId + " }" }, this._MenuUrl);
            case 5: return this.postaction({ Input: "{EntityId: 25, Id: " + moduleId + " }" }, this._MenuUrl);
            case 14: return this.postaction({ Input: "{EntityId: 29, Id: " + moduleId + " }" }, this._MenuUrl);
            case 7: return this.postaction({ Input: "{EntityId: 33, Id: " + moduleId + " }" }, this._MenuUrl);
            case 9: return this.postaction({ Input: "{EntityId: 37, Id: " + moduleId + " }" }, this._MenuUrl);
            case 11: return this.postaction({ Input: "{EntityId: 89, Id: " + moduleId + " }" }, this._MenuUrl);
            case 30: return this.postaction({ Input: "{EntityId: 41, Id: " + moduleId + " }" }, this._MenuUrl);
            case 2: return this.postaction({ Input: "{EntityId: 45, Id: " + moduleId + " }" }, this._MenuUrl);
            case 8: return this.postaction({ Input: "{EntityId: 47, Id: " + moduleId + " }" }, this._MenuUrl);
            case 6: return this.postaction({ Input: "{EntityId: 86, Id: " + moduleId + " }" }, this._MenuUrl);
            case 17: return this.postaction({ Input: "{EntityId: 65, Id: " + moduleId + " }" }, this._MenuUrl);
            case 12: return this.postaction({ Input: "{EntityId: 80, Id: " + moduleId + " }" }, this._MenuUrl);
            case 18: return this.postaction({ Input: "{EntityId: 68, Id: " + moduleId + " }" }, this._MenuUrl);
            case 24: return this.postaction({ Input: "{EntityId: 77, Id: " + moduleId + " }" }, this._MenuUrl);
            case 25: return this.postaction({ Input: "{EntityId: 71, Id: " + moduleId + " }" }, this._MenuUrl);
            case 26: return this.postaction({ Input: "{EntityId: 74, Id: " + moduleId + " }" }, this._MenuUrl);
            case 27: return this.postaction({ Input: "{EntityId: 83, Id: " + moduleId + " }" }, this._MenuUrl);
        }
    };
    MenuService.prototype.getmenu = function (defaultModuleId) {
        var contextObj = this;
        return this.switchModules(defaultModuleId);
    };
    MenuService.prototype.getChangemenu = function (value) {
        return this.switchModules(value);
    };
    MenuService.prototype.getAllDatasource = function () {
        return this.getaction(this._OverAllDataUrl);
    };
    MenuService.prototype.getgeneralsettingssource = function (value) {
        switch (value) {
            case 12: return this.postaction({}, this._SettingsMenuUrl); /*return this.postgetaction<Observable<any>>(null, this._generalsettingsUrl);*/
            case 11: return this.postaction({}, this._ReportsMenuUrl); /*return this.postgetaction<Observable<any>>(null, this._reportMenuUrl);*/
        }
    };
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MenuService);
    return MenuService;
}(HttpHelpers_1.HttpHelpers));
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map
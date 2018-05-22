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
var space_service_1 = require('../../../Models/Space/space.service');
var search_component_1 = require('../../../Framework/Whatever/Search/search.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var drawingdetails_component_1 = require("../../common/drawingdetails/drawingdetails.component");
var LockDrawingComponent = (function () {
    function LockDrawingComponent(_spaceService, differs) {
        this._spaceService = _spaceService;
        this.differs = differs;
        this.selectedTab = 0;
        this.pagePath = "Space / Lock Drawing ";
        this.getSelectedFloorDrawing = new core_1.EventEmitter();
        this.viewDrawing = false;
        this.differ = differs.find({}).create(null);
    }
    LockDrawingComponent.prototype.getSelectedTab = function (event) {
        this.selectedTab = event[0];
    };
    LockDrawingComponent.prototype.ngOnInit = function () {
        this.pageTarget = 3;
        this.moduleId = 3;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LockDrawingComponent.prototype, "getSelectedFloorDrawing", void 0);
    LockDrawingComponent = __decorate([
        core_1.Component({
            selector: 'lockdrawinglist',
            templateUrl: './app/Views/Space/Tools/lockdrawing.component.html',
            directives: [search_component_1.searchBox, page_component_1.PageComponent, drawingdetails_component_1.DrawingDetailsComponent],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, core_1.KeyValueDiffers])
    ], LockDrawingComponent);
    return LockDrawingComponent;
}());
exports.LockDrawingComponent = LockDrawingComponent;
//# sourceMappingURL=lockdrawing.component.js.map
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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var drawingdetails_component_1 = require('../../common/drawingdetails/drawingdetails.component');
var MedicalGasDrawingList = (function () {
    function MedicalGasDrawingList() {
        this.selectedTab = 0;
    }
    MedicalGasDrawingList.prototype.ngOnInit = function () {
        if (this.pageTarget == null || this.pageTarget == "" || this.pageTarget == undefined) {
            this.pageTarget = 1;
            this.objectCategoryId = 12;
            this.moduleId = 27;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MedicalGasDrawingList.prototype, "selectedRowDetails", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MedicalGasDrawingList.prototype, "pageTarget", void 0);
    MedicalGasDrawingList = __decorate([
        core_1.Component({
            selector: 'medicalgasDrawinglist',
            templateUrl: './app/Views/Objects/Drawings/object-drawing-list.html',
            directives: [page_component_1.PageComponent, drawingdetails_component_1.DrawingDetailsComponent],
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], MedicalGasDrawingList);
    return MedicalGasDrawingList;
}());
exports.MedicalGasDrawingList = MedicalGasDrawingList;
//# sourceMappingURL=medicalgas-drawing-list.js.map
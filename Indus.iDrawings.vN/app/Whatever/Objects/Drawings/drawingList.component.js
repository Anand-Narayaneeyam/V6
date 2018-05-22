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
var drawingdetails_component_1 = require('../../common/drawingdetails/drawingdetails.component');
var DrawingListComponent = (function () {
    function DrawingListComponent() {
        this.selectedTab = 0;
    }
    DrawingListComponent.prototype.ngOnInit = function () {
        // debugger;      
        console.log("ngOnInit");
        switch (this.ObjectCategoryId) {
            case 1:
                this.moduleId = 7;
                // this.pageTarget = 1;
                if (this.pageTarget == null || this.pageTarget == "" || this.pageTarget == undefined) {
                    this.pageTarget = 1;
                }
                else {
                    this.pageTarget = 2;
                }
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DrawingListComponent.prototype, "pageTarget", void 0);
    DrawingListComponent = __decorate([
        core_1.Component({
            selector: 'objectDrawinglist',
            templateUrl: './app/Views/Objects/Drawings/drawingList.component.html',
            directives: [drawingdetails_component_1.DrawingDetailsComponent],
            providers: [http_1.HTTP_PROVIDERS],
            inputs: ['ObjectCategoryId']
        }), 
        __metadata('design:paramtypes', [])
    ], DrawingListComponent);
    return DrawingListComponent;
}());
exports.DrawingListComponent = DrawingListComponent;
//# sourceMappingURL=drawingList.component.js.map
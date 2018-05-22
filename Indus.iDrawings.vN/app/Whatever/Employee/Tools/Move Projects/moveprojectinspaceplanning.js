var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var moveproject_component_1 = require('./moveproject.component');
var core_1 = require('@angular/core');
var page_component_1 = require('../../../../Framework/Whatever/Page/page.component');
var MoveProjectInSpacePlanningComponent = (function () {
    function MoveProjectInSpacePlanningComponent() {
    }
    MoveProjectInSpacePlanningComponent = __decorate([
        core_1.Component({
            selector: 'move-project-inspaceplanning',
            templateUrl: './app/Views/Employee/Tools/Move Projects/moveProjectInSpacePlanning.html',
            directives: [moveproject_component_1.MoveProjectComponent, page_component_1.PageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], MoveProjectInSpacePlanningComponent);
    return MoveProjectInSpacePlanningComponent;
}());
exports.MoveProjectInSpacePlanningComponent = MoveProjectInSpacePlanningComponent;
//# sourceMappingURL=moveprojectinspaceplanning.js.map
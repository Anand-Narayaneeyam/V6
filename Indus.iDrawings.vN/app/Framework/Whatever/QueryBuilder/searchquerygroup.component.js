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
var searchquerycondition_component_1 = require('../../../Framework/Whatever/QueryBuilder/searchquerycondition.component');
var SearchQueryGroupComponent = (function () {
    function SearchQueryGroupComponent() {
        this.isConditionExistsinParentGroup = false;
        this.isGroupExistsinParentGroup = false;
    }
    SearchQueryGroupComponent.prototype.ngOnInit = function () {
        debugger;
        var contextObj = this;
        var contextObj = this;
        if (contextObj.allGroupData && contextObj.datasource) {
            if (contextObj.datasource.GroupId != 1 && contextObj.datasource.OperatorFieldObj)
                contextObj.isOperatorVisible = true;
            console.log("allGroupData", contextObj.allGroupData);
        }
        //if (contextObj.allGroupData && contextObj.datasource) {          
        //    if (contextObj.datasource.GroupId != 1 && contextObj.datasource.OperatorFieldObj) {
        //        var ParentGroup = this.findParentGrp(contextObj.datasource.GroupId, contextObj.allGroupData.SubGroups, contextObj.allGroupData);
        //        if (ParentGroup) {
        //            if (ParentGroup.Conditions.length > 0)
        //                this.isConditionExistsinParentGroup = true;
        //            if (ParentGroup.SubGroups.length > 1)
        //                this.isGroupExistsinParentGroup = true;
        //            if (this.isConditionExistsinParentGroup == false && this.isGroupExistsinParentGroup == false)
        //                this.isOperatorVisible = false;
        //            else
        //                this.isOperatorVisible = true;
        //        }
        //    }
        //}
    };
    SearchQueryGroupComponent.prototype.findParentGrp = function (grpId, grpArray, parentofActiveGroup) {
        for (var i = 0; i < grpArray.length; i++) {
            if (grpArray[i].GroupId == grpId) {
                return parentofActiveGroup;
            }
        }
        for (var i = 0; i < grpArray.length; i++) {
            return this.findParentGrp(grpId, grpArray[i].SubGroups, grpArray[i]);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SearchQueryGroupComponent.prototype, "datasource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SearchQueryGroupComponent.prototype, "allGroupData", void 0);
    SearchQueryGroupComponent = __decorate([
        core_1.Component({
            selector: 'qbsearchquerygroup',
            templateUrl: 'app/Framework/Views/QueryBuilder/searchquerygroup.component.html',
            directives: [SearchQueryGroupComponent, searchquerycondition_component_1.SearchQueryConditionComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SearchQueryGroupComponent);
    return SearchQueryGroupComponent;
}());
exports.SearchQueryGroupComponent = SearchQueryGroupComponent;
//# sourceMappingURL=searchquerygroup.component.js.map
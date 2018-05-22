var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentFireandSafetyRoute = (function () {
    function ComponentFireandSafetyRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Fire and Safety/fireandsafetyData.route'), baseRouteObj.importRoute('./app/whatever/Objects/Fire and Safety/fireandsafety-drawing.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Fire and Safety/QueryBuilder/fireandsafety-querybuilder-route'));
        };
    }
    return ComponentFireandSafetyRoute;
}());
exports.ComponentFireandSafetyRoute = ComponentFireandSafetyRoute;
//# sourceMappingURL=component.fireandsafety.routes.js.map
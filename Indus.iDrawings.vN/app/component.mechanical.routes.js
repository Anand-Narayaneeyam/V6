var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentMechanicalRoute = (function () {
    function ComponentMechanicalRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Mechanical/mechanicalData.route'), baseRouteObj.importRoute('./app/whatever/Objects/Mechanical/mechanical-drawing.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Mechanical/QueryBuilder/mechanical-querybuilder-route'));
        };
    }
    return ComponentMechanicalRoute;
}());
exports.ComponentMechanicalRoute = ComponentMechanicalRoute;
//# sourceMappingURL=component.mechanical.routes.js.map
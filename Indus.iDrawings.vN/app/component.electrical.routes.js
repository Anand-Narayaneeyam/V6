var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentElectricalRoute = (function () {
    function ComponentElectricalRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Electrical/electricalData.route'), baseRouteObj.importRoute('./app/whatever/Objects/Electrical/electrical-drawing.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Electrical/QueryBuilder/elecrical-querybuilder-route'));
        };
    }
    return ComponentElectricalRoute;
}());
exports.ComponentElectricalRoute = ComponentElectricalRoute;
//# sourceMappingURL=component.electrical.routes.js.map
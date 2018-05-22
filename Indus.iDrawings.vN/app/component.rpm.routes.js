var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentRPMRoute = (function () {
    function ComponentRPMRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/realproperty/dashboard/realpropertydashboard.route'), baseRouteObj.importRoute('./app/whatever/RealProperty/Buildings/buildings.route'), baseRouteObj.importRoute('./app/whatever/RealProperty/Lease/lease.route'), baseRouteObj.importRoute('./app/whatever/RealProperty/Buildings/buildings-map.route'));
        };
    }
    return ComponentRPMRoute;
}());
exports.ComponentRPMRoute = ComponentRPMRoute;
//# sourceMappingURL=component.rpm.routes.js.map
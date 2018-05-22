var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentAsbuiltsRoute = (function () {
    function ComponentAsbuiltsRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/Asbuilts/dashboard/asbuiltsdashboard.route'), baseRouteObj.importRoute('./app/Whatever/Asbuilts/Drawings/drawings.route'), baseRouteObj.importRoute('./app/Whatever/Asbuilts/Data/data.route'));
        };
    }
    return ComponentAsbuiltsRoute;
}());
exports.ComponentAsbuiltsRoute = ComponentAsbuiltsRoute;
//# sourceMappingURL=component.asbuilts.routes.js.map
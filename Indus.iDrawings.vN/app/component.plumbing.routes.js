var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentPlumbingRoute = (function () {
    function ComponentPlumbingRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Plumbing/plumbingData.route'), baseRouteObj.importRoute('./app/whatever/Objects/Plumbing/plumbing-drawing.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Plumbing/QueryBuilder/plumbing-querybuilder-route'));
        };
    }
    return ComponentPlumbingRoute;
}());
exports.ComponentPlumbingRoute = ComponentPlumbingRoute;
//# sourceMappingURL=component.plumbing.routes.js.map
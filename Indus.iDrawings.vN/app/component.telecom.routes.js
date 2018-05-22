var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentTelecomRoute = (function () {
    function ComponentTelecomRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Telecom/telecomData.route'), baseRouteObj.importRoute('./app/whatever/Objects/Telecom/telecom-drawing.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Telecom/QueryBuilder/telecom-querybuilder-route'));
        };
    }
    return ComponentTelecomRoute;
}());
exports.ComponentTelecomRoute = ComponentTelecomRoute;
//# sourceMappingURL=component.telecom.routes.js.map
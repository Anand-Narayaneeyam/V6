var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentSecurityAssetsRoute = (function () {
    function ComponentSecurityAssetsRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Security Assets/securityassetsData.route'), baseRouteObj.importRoute('./app/whatever/Objects/Security Assets/securityassets-drawing.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Security Assets/QueryBuilder/securityasset-querybuilder-route'));
        };
    }
    return ComponentSecurityAssetsRoute;
}());
exports.ComponentSecurityAssetsRoute = ComponentSecurityAssetsRoute;
//# sourceMappingURL=component.securityassets.routes.js.map
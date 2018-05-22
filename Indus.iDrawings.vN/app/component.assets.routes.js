var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentAssetsRoute = (function () {
    function ComponentAssetsRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/assets/dashboard/assetdashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Assets/asset-drawing-list.route'), baseRouteObj.importRoute('./app/whatever/Objects/Data/objectData.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Assets/QueryBuilder/assets-querybuilder-route'));
        };
    }
    return ComponentAssetsRoute;
}());
exports.ComponentAssetsRoute = ComponentAssetsRoute;
//# sourceMappingURL=component.assets.routes.js.map
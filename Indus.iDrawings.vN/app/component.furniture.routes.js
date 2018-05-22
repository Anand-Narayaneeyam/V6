var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentFurnitureRoute = (function () {
    function ComponentFurnitureRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Furniture/furnitureData.route'), baseRouteObj.importRoute('./app/whatever/Objects/Furniture/furniture-drawing.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Furniture/QueryBuilder/furniture-querybuilder-route'));
        };
    }
    return ComponentFurnitureRoute;
}());
exports.ComponentFurnitureRoute = ComponentFurnitureRoute;
//# sourceMappingURL=component.furniture.routes.js.map
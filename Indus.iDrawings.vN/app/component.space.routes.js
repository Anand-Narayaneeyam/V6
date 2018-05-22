var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentSpaceRoute = (function () {
    function ComponentSpaceRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/space/dashboard/spacedashboard.route'), baseRouteObj.importRoute('./app/Whatever/Space/Space Data/spacedata.route'), baseRouteObj.importRoute('./app/whatever/Space/Space Resources/space-resources.route'), baseRouteObj.importRoute('./app/Whatever/Space/Drawings/space-drawings.route'), baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/Snapshots/space-snapshots.route'), baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/ChargeableArea/space-chargeablearea.route'), baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/UsableArea/space-usablearea.route'), baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/Cost/space-cost.route'), baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/SpaceFunctions/space-spacefunctions.route'), baseRouteObj.importRoute('./app/Whatever/Space/Space Data/space-querybuilder-route'));
        };
    }
    return ComponentSpaceRoute;
}());
exports.ComponentSpaceRoute = ComponentSpaceRoute;
//# sourceMappingURL=component.space.routes.js.map
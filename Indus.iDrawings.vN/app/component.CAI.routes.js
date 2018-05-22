var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentCAIRoute = (function () {
    function ComponentCAIRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(
            //baseRouteObj.importRoute('./app/whatever/space/dashboard/spacedashboard.route'),
            baseRouteObj.importRoute('./app/Whatever/CAI/CAI Data/CAIdata.route'), baseRouteObj.importRoute('./app/Whatever/CAI/Drawings/CAI-drawings.route'), baseRouteObj.importRoute('./app/whatever/Reports/CAI/ArchiveSpaceDriver/space-driver-select-route'), baseRouteObj.importRoute('./app/whatever/Reports/CAI/DistributionMaps/distribution-maps-select-route'), baseRouteObj.importRoute('./app/whatever/Reports/CAI/ArchiveBuildingStatus/building-status-select-route'));
        };
    }
    return ComponentCAIRoute;
}());
exports.ComponentCAIRoute = ComponentCAIRoute;
//# sourceMappingURL=component.CAI.routes.js.map
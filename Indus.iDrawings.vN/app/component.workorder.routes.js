var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentWorkorderRoute = (function () {
    function ComponentWorkorderRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/workorder/dashboard/workorderdashboard.route'), baseRouteObj.importRoute('./app/whatever/WorkOrder/maintenance/maintenance.route'), baseRouteObj.importRoute('./app/whatever/WorkOrder/Create Request/createRequest.route'), baseRouteObj.importRoute('./app/whatever/WorkOrder/Review/review.route'), baseRouteObj.importRoute('./app/whatever/WorkOrder/Track Request/track-request.route'), baseRouteObj.importRoute('./app/Whatever/WorkOrder/Closed Tasks/closed-Tasks.route'), baseRouteObj.importRoute('./app/Whatever/WorkOrder/PM Generated/pmGenerated.route'), baseRouteObj.importRoute('./app/whatever/WorkOrder/Generate PM WOs/generate-work-order-route'));
        };
    }
    return ComponentWorkorderRoute;
}());
exports.ComponentWorkorderRoute = ComponentWorkorderRoute;
//# sourceMappingURL=component.workorder.routes.js.map
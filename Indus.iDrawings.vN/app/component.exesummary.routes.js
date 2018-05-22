/// <reference path="whatever/executivesummary/dashboard/exesummarydashboard.route.ts" />
/// <reference path="whatever/executivesummary/generalsettings/general-settings.route.ts" />
var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentExecSummaryRoute = (function () {
    function ComponentExecSummaryRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/executivesummary/dashboard/exesummarydashboard.route'), baseRouteObj.importRoute('./app/whatever/executivesummary/generalsettings/general-settings.route'));
        };
    }
    return ComponentExecSummaryRoute;
}());
exports.ComponentExecSummaryRoute = ComponentExecSummaryRoute;
//# sourceMappingURL=component.exesummary.routes.js.map
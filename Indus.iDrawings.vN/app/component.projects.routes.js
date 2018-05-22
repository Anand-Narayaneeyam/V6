var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentProjectsRoute = (function () {
    function ComponentProjectsRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/Whatever/Projects/Projects Data/projects-data-list-route'));
        };
    }
    return ComponentProjectsRoute;
}());
exports.ComponentProjectsRoute = ComponentProjectsRoute;
//# sourceMappingURL=component.projects.routes.js.map
var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentAdminRoute = (function () {
    function ComponentAdminRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/administration/dashboard/administrationdashboard.route'), baseRouteObj.importRoute('./app/whatever/Administration/Customers/customers.route'), baseRouteObj.importRoute('./app/whatever/Administration/Users/users.route'), baseRouteObj.importRoute('./app/whatever/Administration/portfolio.route'), baseRouteObj.importRoute('./app/whatever/administration/workflow/actionPoints.route'));
        };
    }
    return ComponentAdminRoute;
}());
exports.ComponentAdminRoute = ComponentAdminRoute;
//# sourceMappingURL=component.administration.routes.js.map
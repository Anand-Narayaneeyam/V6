var app_routes_1 = require('./app.routes');
var BaseRoute = (function () {
    function BaseRoute() {
        this.System = window["System"];
        this.importRoute = function (routeFilePath) {
            return this.System.import(routeFilePath).then(function (refToLoadedModule) {
                app_routes_1.routes.push.apply(app_routes_1.routes, refToLoadedModule[Object.keys(refToLoadedModule)[0]]);
            });
        };
    }
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=base.routes.js.map
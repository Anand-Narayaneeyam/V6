var app_routes_1 = require('./app.routes');
var MyRoute = (function () {
    function MyRoute(_route) {
        this.addRoute = function (_route) {
            app_routes_1.routes.push.apply(app_routes_1.routes, _route);
        };
        app_routes_1.routes.push.apply(app_routes_1.routes, _route);
    }
    return MyRoute;
}());
exports.MyRoute = MyRoute;
//# sourceMappingURL=MyRoute.js.map
var router_1 = require('@angular/router');
var Component_routes_1 = require('./Component.routes');
var test2_component_1 = require('./Whatever/Test2/test2.component');
exports.AppRoutes = [
    { path: '', component: test2_component_1.Test2Component }
];
exports.routes = exports.AppRoutes.slice();
var route = new Component_routes_1.ComponentRoute();
route.configRoute();
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map
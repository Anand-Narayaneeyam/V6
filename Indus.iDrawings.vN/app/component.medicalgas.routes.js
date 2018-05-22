var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentMedicalGasRoute = (function () {
    function ComponentMedicalGasRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'), baseRouteObj.importRoute('./app/whatever/Objects/Medical Gas/medicalgasData.route'), baseRouteObj.importRoute('./app/whatever/Objects/Medical Gas/medicalgas-drawing.route'), baseRouteObj.importRoute('./app/Whatever/Objects/Medical Gas/QueryBuilder/medicalgas-querybuilder-route'));
        };
    }
    return ComponentMedicalGasRoute;
}());
exports.ComponentMedicalGasRoute = ComponentMedicalGasRoute;
//# sourceMappingURL=component.medicalgas.routes.js.map
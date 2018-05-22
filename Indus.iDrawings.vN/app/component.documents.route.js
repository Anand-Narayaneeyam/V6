/// <reference path="whatever/documents/documents/documentlist.route.ts" />
var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentDocumentsRoute = (function () {
    function ComponentDocumentsRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/documents/documents/documentlist.route'), baseRouteObj.importRoute('./app/whatever/documents/dashboard/DocumentDashBoard.route'), baseRouteObj.importRoute('./app/whatever/documents/Document Explorer/documentexplorer.route'), baseRouteObj.importRoute('./app/whatever/documents/Approval Requests/documentcheckout.route'), baseRouteObj.importRoute('./app/whatever/documents/Approval Requests/documentpublish.route'), baseRouteObj.importRoute('./app/Whatever/documents/QueryBuilder/documents-querybuilder-route'));
        };
    }
    return ComponentDocumentsRoute;
}());
exports.ComponentDocumentsRoute = ComponentDocumentsRoute;
//# sourceMappingURL=component.documents.route.js.map
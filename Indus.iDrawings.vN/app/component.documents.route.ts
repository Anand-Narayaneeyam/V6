/// <reference path="whatever/documents/documents/documentlist.route.ts" />
import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentDocumentsRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/documents/documents/documentlist.route') ,        
            baseRouteObj.importRoute('./app/whatever/documents/dashboard/DocumentDashBoard.route'),     
            baseRouteObj.importRoute('./app/whatever/documents/Document Explorer/documentexplorer.route'),
            baseRouteObj.importRoute('./app/whatever/documents/Approval Requests/documentcheckout.route'),
            baseRouteObj.importRoute('./app/whatever/documents/Approval Requests/documentpublish.route'),
            baseRouteObj.importRoute('./app/Whatever/documents/QueryBuilder/documents-querybuilder-route')
        );
    }
}
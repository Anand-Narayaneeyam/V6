import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentTelecomRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Telecom/telecomData.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Telecom/telecom-drawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Objects/Telecom/QueryBuilder/telecom-querybuilder-route')
        );
    }
}
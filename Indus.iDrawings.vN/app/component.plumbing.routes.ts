import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentPlumbingRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Plumbing/plumbingData.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Plumbing/plumbing-drawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Objects/Plumbing/QueryBuilder/plumbing-querybuilder-route')
        );
    }
}
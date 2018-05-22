import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentMechanicalRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Mechanical/mechanicalData.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Mechanical/mechanical-drawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Objects/Mechanical/QueryBuilder/mechanical-querybuilder-route')
        );
    }
}
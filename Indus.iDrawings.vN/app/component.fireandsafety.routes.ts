import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentFireandSafetyRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Fire and Safety/fireandsafetyData.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Fire and Safety/fireandsafety-drawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Objects/Fire and Safety/QueryBuilder/fireandsafety-querybuilder-route')
        );
    }
}
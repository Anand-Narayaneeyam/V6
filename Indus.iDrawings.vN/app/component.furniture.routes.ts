import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentFurnitureRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Furniture/furnitureData.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Furniture/furniture-drawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Objects/Furniture/QueryBuilder/furniture-querybuilder-route')
        );
    }
}
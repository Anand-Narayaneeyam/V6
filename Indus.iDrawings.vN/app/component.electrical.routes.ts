import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentElectricalRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Electrical/electricalData.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Electrical/electrical-drawing.route') , 
            baseRouteObj.importRoute('./app/Whatever/Objects/Electrical/QueryBuilder/elecrical-querybuilder-route')

        );
    }
}
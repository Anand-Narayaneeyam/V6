import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentSecurityAssetsRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Security Assets/securityassetsData.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Security Assets/securityassets-drawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Objects/Security Assets/QueryBuilder/securityasset-querybuilder-route')
        );
    }
}
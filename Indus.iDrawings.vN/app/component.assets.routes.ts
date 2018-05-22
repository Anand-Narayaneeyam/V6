import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentAssetsRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/assets/dashboard/assetdashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Assets/asset-drawing-list.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Data/objectData.route'),
            baseRouteObj.importRoute('./app/Whatever/Objects/Assets/QueryBuilder/assets-querybuilder-route')
        );
    }
}
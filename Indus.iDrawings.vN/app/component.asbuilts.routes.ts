import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentAsbuiltsRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/Asbuilts/dashboard/asbuiltsdashboard.route'),
            baseRouteObj.importRoute('./app/Whatever/Asbuilts/Drawings/drawings.route'),
            baseRouteObj.importRoute('./app/Whatever/Asbuilts/Data/data.route')
        );
    }
}
import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentRPMRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/realproperty/dashboard/realpropertydashboard.route'),
            baseRouteObj.importRoute('./app/whatever/RealProperty/Buildings/buildings.route'),
            baseRouteObj.importRoute('./app/whatever/RealProperty/Lease/lease.route'),
            baseRouteObj.importRoute('./app/whatever/RealProperty/Buildings/buildings-map.route')
        );
    }
}
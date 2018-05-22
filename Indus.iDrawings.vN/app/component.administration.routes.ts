import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentAdminRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/administration/dashboard/administrationdashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Administration/Customers/customers.route'),
            baseRouteObj.importRoute('./app/whatever/Administration/Users/users.route'),
            baseRouteObj.importRoute('./app/whatever/Administration/portfolio.route'),
            baseRouteObj.importRoute('./app/whatever/administration/workflow/actionPoints.route')
        );
    }
}
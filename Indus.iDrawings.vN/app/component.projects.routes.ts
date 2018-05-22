import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentProjectsRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/Whatever/Projects/Projects Data/projects-data-list-route')
        );
    }
}
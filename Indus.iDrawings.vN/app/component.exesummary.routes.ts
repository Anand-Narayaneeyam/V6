/// <reference path="whatever/executivesummary/dashboard/exesummarydashboard.route.ts" />
/// <reference path="whatever/executivesummary/generalsettings/general-settings.route.ts" />
import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentExecSummaryRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/executivesummary/dashboard/exesummarydashboard.route'),
            baseRouteObj.importRoute('./app/whatever/executivesummary/generalsettings/general-settings.route')
        );
    }
}
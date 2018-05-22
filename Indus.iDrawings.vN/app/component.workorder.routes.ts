import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentWorkorderRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/workorder/dashboard/workorderdashboard.route'),
            baseRouteObj.importRoute('./app/whatever/WorkOrder/maintenance/maintenance.route'),
            baseRouteObj.importRoute('./app/whatever/WorkOrder/Create Request/createRequest.route'),
            baseRouteObj.importRoute('./app/whatever/WorkOrder/Review/review.route'),
            baseRouteObj.importRoute('./app/whatever/WorkOrder/Track Request/track-request.route'),
            baseRouteObj.importRoute('./app/Whatever/WorkOrder/Closed Tasks/closed-Tasks.route'),
            baseRouteObj.importRoute('./app/Whatever/WorkOrder/PM Generated/pmGenerated.route'),
            baseRouteObj.importRoute('./app/whatever/WorkOrder/Generate PM WOs/generate-work-order-route')
            );
    }
}
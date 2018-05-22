import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentSpaceRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/space/dashboard/spacedashboard.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/Space Data/spacedata.route'),
            baseRouteObj.importRoute('./app/whatever/Space/Space Resources/space-resources.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/Drawings/space-drawings.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/Snapshots/space-snapshots.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/ChargeableArea/space-chargeablearea.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/UsableArea/space-usablearea.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/Cost/space-cost.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/TrendAnalysis/SpaceFunctions/space-spacefunctions.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/Space Data/space-querybuilder-route')
   
        );
    }
}
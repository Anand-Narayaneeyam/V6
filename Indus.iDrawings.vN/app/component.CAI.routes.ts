import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentCAIRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            //baseRouteObj.importRoute('./app/whatever/space/dashboard/spacedashboard.route'),
            baseRouteObj.importRoute('./app/Whatever/CAI/CAI Data/CAIdata.route'),        
            baseRouteObj.importRoute('./app/Whatever/CAI/Drawings/CAI-drawings.route'),
            baseRouteObj.importRoute('./app/whatever/Reports/CAI/ArchiveSpaceDriver/space-driver-select-route'),
            baseRouteObj.importRoute('./app/whatever/Reports/CAI/DistributionMaps/distribution-maps-select-route'),
            baseRouteObj.importRoute('./app/whatever/Reports/CAI/ArchiveBuildingStatus/building-status-select-route')
        
        );
    }
}

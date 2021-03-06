﻿import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentHelpRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/general-setting-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/adm-general-setting-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/drawing-settings.rout'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/importfromexcel-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/users-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/portfolio-list-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/adm-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/workflow-action-points-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Asbuilts/settings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Asbuilts/asBuilts-drawings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Asbuilts/asBuilts-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Asbuilts/asbuilts-data-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/space-general-settings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/unlockDrawings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/deleteSpaceData-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/space-drawings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/space-data-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/space-trendAnalysis-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/space-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Scheduling/scheduling-general-settings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Scheduling/scheduling-drawings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Scheduling/scheduling-data-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Scheduling/reserveRoom-component-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Scheduling/reserveSeat-component-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Scheduling/scheduling-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Scheduling/scheduling-logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Assets/assets-general-settings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Assets/assets-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Assets/assets-data-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Assets/assets-drawings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Assets/assets-logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Assets/assets-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-general-settings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-space-planning-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-workflow-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-data-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-drawings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-forecasting-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-rollback-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Employee/employee-trend-analysis-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Furniture/furniture-general-settings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Furniture/furniture-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Furniture/furniture-data-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Furniture/furniture-drawings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Furniture/furniture-logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Furniture/furniture-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/workorder-workflow-settings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/workorder-PMSettings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/workorder-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/workorder-logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/workorder-PMWorkOrder-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/workorder-service-request-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/workorder-task-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/WorkOrder/workorder-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Real Property/rp-general-settings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Real Property/rp-buildings-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Real Property/rp-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Real Property/rp-leases-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Real Property/rp-logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Real Property/rp-reports-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/adm-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Administration/adm-logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Asbuilts/asBuilts-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Asbuilts/asBuilts-Logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/space-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Space/space-logbook-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Assets/assets-dash-board-route'),
            baseRouteObj.importRoute('./app/Whatever/Help/Assets/assets-logbook-route')

        );
    }
}
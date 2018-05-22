﻿import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentEmployeeRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/employee/dashboard/employeedashboard.route'),
            baseRouteObj.importRoute('./app/whatever/employee/data/employeedata.route'),
            baseRouteObj.importRoute('./app/whatever/employee/request/spaceplanning-approvalreview.route'),
            baseRouteObj.importRoute('./app/whatever/employee/tools/spaceplanningprojects.route'),
            baseRouteObj.importRoute('./app/whatever/employee/Drawings/employeeDrawings.route'),
            baseRouteObj.importRoute('./app/whatever/employee/Tools/SpacePlanning/space-planning-request.route'),
            baseRouteObj.importRoute('./app/whatever/employee/Tools/SpacePlanning/scenarios.component.route'),
            baseRouteObj.importRoute('./app/whatever/employee/Tools/SpacePlanning/approvedstackplan.component.route'),
            baseRouteObj.importRoute('./app/whatever/employee/tools/move projects/moveproject.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/TrendAnalysis/Snapshots/employee-snapshots.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/TrendAnalysis/Snapshots/employee-snapshots.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/TrendAnalysis/OrgLevel1/employee.orglevel1.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/TrendAnalysis/SpaceStandard/employee.spacestandard.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/TrendAnalysis/HiringRate/employee.hiringrate.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/TrendAnalysis/Grade/employee.grade.route'),
            baseRouteObj.importRoute('./app/whatever/employee/tools/rollback moves/rollbackmoves.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/Move Execution Requests/moveExecution-Request.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/TrendAnalysis/DivisionWiseSeatingCapacitybyTime/seatingCapacitybyTime.route'),
            baseRouteObj.importRoute('./app/whatever/employee/trendanalysis/spacestandardwiseseatingcapacitybytime/spacestandardtrendanalysis.route'),
            baseRouteObj.importRoute('./app/whatever/employee/trendanalysis/spacestandardwiseseatingcapacitybytime/spacestandardtrendanalysis.route'),
            baseRouteObj.importRoute('./app/whatever/employee/trendanalysis/GradeOccupancy/gradeTrendAnalysis.route'),
            baseRouteObj.importRoute('./app/Whatever/Employee/TrendAnalysis/RateofHiringbyTime/rateofHiringbyTime-route'),
            baseRouteObj.importRoute('./app/whatever/employee/move review/review.route'),
            baseRouteObj.importRoute('./app/whatever/employee/assign review/assignreview.route'),
            baseRouteObj.importRoute('./app/Whatever/employee/data/employee-querybuilder-route')
        );
    }
}
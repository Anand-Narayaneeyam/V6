import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentSchedulingRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/Scheduling/Drawings/schedulingDrawings.route'),
            baseRouteObj.importRoute('./app/whatever/Scheduling/Room Booking/reserveroom.route'),
            baseRouteObj.importRoute('./app/Whatever/Scheduling/Scheduling Data/schedulingdata.route'),
            baseRouteObj.importRoute('./app/Whatever/Scheduling/Requests/my-active-requests.route'),
            baseRouteObj.importRoute('./app/Whatever/Scheduling/Seat Booking/myseatrequests.route'),
            baseRouteObj.importRoute('./app/Whatever/Scheduling/Seat Booking/allactiveseatrequests.route'),
            baseRouteObj.importRoute('./app/whatever/Scheduling/Seat Booking/reserveseats.route'),
            baseRouteObj.importRoute('./app/whatever/Scheduling/Equipment Reservation/reserveequipments.route'),
            baseRouteObj.importRoute('./app/Whatever/Scheduling/EquipmentReservations/EquipmentReservations.route'),
            baseRouteObj.importRoute('./app/whatever/reports/scheduling/seatutilization/scheduling.seatutilization.report.route'),
            baseRouteObj.importRoute('./app/whatever/reports/scheduling/underutilizedseats/scheduling.underutilizedseats.report.route'),
            baseRouteObj.importRoute('./app/whatever/reports/scheduling/peakseatutilization/scheduling.peakseatutilization.report.route'),
            baseRouteObj.importRoute('./app/whatever/reports/scheduling/dailyseatutilization/scheduling.dailyseatutilization.report.route'),
            baseRouteObj.importRoute('./app/whatever/reports/scheduling/unusedseats/scheduling.unusedseats.report.route')
        );
    }
}
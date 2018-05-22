var base_routes_1 = require('./base.routes');
var Observable_1 = require('rxjs/Observable');
var ComponentSchedulingRoute = (function () {
    function ComponentSchedulingRoute() {
        this.configRoute = function () {
            var baseRouteObj = new base_routes_1.BaseRoute();
            return Observable_1.Observable.forkJoin(baseRouteObj.importRoute('./app/whatever/Scheduling/Drawings/schedulingDrawings.route'), baseRouteObj.importRoute('./app/whatever/Scheduling/Room Booking/reserveroom.route'), baseRouteObj.importRoute('./app/Whatever/Scheduling/Scheduling Data/schedulingdata.route'), baseRouteObj.importRoute('./app/Whatever/Scheduling/Requests/my-active-requests.route'), baseRouteObj.importRoute('./app/Whatever/Scheduling/Seat Booking/myseatrequests.route'), baseRouteObj.importRoute('./app/Whatever/Scheduling/Seat Booking/allactiveseatrequests.route'), baseRouteObj.importRoute('./app/whatever/Scheduling/Seat Booking/reserveseats.route'), baseRouteObj.importRoute('./app/whatever/Scheduling/Equipment Reservation/reserveequipments.route'), baseRouteObj.importRoute('./app/Whatever/Scheduling/EquipmentReservations/EquipmentReservations.route'), baseRouteObj.importRoute('./app/whatever/reports/scheduling/seatutilization/scheduling.seatutilization.report.route'), baseRouteObj.importRoute('./app/whatever/reports/scheduling/underutilizedseats/scheduling.underutilizedseats.report.route'), baseRouteObj.importRoute('./app/whatever/reports/scheduling/peakseatutilization/scheduling.peakseatutilization.report.route'), baseRouteObj.importRoute('./app/whatever/reports/scheduling/dailyseatutilization/scheduling.dailyseatutilization.report.route'), baseRouteObj.importRoute('./app/whatever/reports/scheduling/unusedseats/scheduling.unusedseats.report.route'));
        };
    }
    return ComponentSchedulingRoute;
}());
exports.ComponentSchedulingRoute = ComponentSchedulingRoute;
//# sourceMappingURL=component.scheduling.routes.js.map
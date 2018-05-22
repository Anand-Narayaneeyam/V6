import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentMedicalGasRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/objects/furniture/dashboard/furnituredashboard.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Medical Gas/medicalgasData.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Medical Gas/medicalgas-drawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Objects/Medical Gas/QueryBuilder/medicalgas-querybuilder-route')
        );
    }
}
import {BaseRoute} from './base.routes';
import {Observable} from 'rxjs/Observable';
export class ComponentSettingsRoute {
    configRoute = function () {
        var baseRouteObj = new BaseRoute();
        return Observable.forkJoin(
            baseRouteObj.importRoute('./app/whatever/Administration/General Settings/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Administration/Drawing Settings/drawing-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Space/General Settings/general-settings.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/Tools/space-tools.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/Tools/unlockdrawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Space/Tools/lockdrawing.route'),
            baseRouteObj.importRoute('./app/Whatever/Asbuilts/Drawing Settings/setupdrawings.route'),
            baseRouteObj.importRoute('./app/whatever/employee/general settings/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/employee/Workflow Settings/workflow-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Scheduling/General Settings/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Assets/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Furniture/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/RealProperty/GeneralSettings/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/WorkOrder/GeneralSettings/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/WorkOrder/Workflow Settings/workflow-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Common/DataImport/importdata.route'),
            baseRouteObj.importRoute('./app/Whatever/Administration/CustomerSettings/customersettingsmain.route'),
            baseRouteObj.importRoute('./app/whatever/documents/general settings/general-settings.route'),
            baseRouteObj.importRoute('./app/Whatever/Documents/Workflow Settings/workflow-settings.route'),
            baseRouteObj.importRoute('./app/whatever/WorkOrder/maintenance/maintenance.route'),
            baseRouteObj.importRoute('./app/whatever/documents/Access Control/access-control-route'),
            baseRouteObj.importRoute('./app/whatever/CAI/General Settings/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Electrical/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Fire and Safety/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Mechanical/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Plumbing/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Security Assets/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Medical Gas/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/Objects/Telecom/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/ExecutiveSummary/GeneralSettings/general-settings.route'),
            baseRouteObj.importRoute('./app/whatever/projects/generalsettings/generalsettings.route'),
            baseRouteObj.importRoute('./app/whatever/Administration/SymbolLibrary/General Settings.route')
        );
    }
}
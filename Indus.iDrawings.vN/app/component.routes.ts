import {MyRoute} from './MyRoute';
import {PortfolioRoutes} from './whatever/Administration/portfolio.route';
import {LogbookRoutes} from './whatever/Common/LogBook/logbook.route';
import {CommonReportRoutes} from './whatever/Reports/common.report.route';
import {PersonalSettingsRoute, PersonalSettingsCancelledRoute} from './Whatever/Administration/Personal Settings/personal-settings-route';
import {FeedbackComponentRoute} from './Whatever/Administration/Feedback/feedback-route';

export class ComponentRoute {
    static myRts: MyRoute;

    configRoute = function () {
        ComponentRoute.myRts = new MyRoute(PortfolioRoutes);    
        ComponentRoute.myRts.addRoute(PersonalSettingsRoute);
        ComponentRoute.myRts.addRoute(PersonalSettingsCancelledRoute);
        ComponentRoute.myRts.addRoute(CommonReportRoutes);
        ComponentRoute.myRts.addRoute(LogbookRoutes);
        ComponentRoute.myRts.addRoute(FeedbackComponentRoute); 
  }
}
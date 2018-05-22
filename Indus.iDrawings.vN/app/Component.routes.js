var MyRoute_1 = require('./MyRoute');
var portfolio_route_1 = require('./whatever/Administration/portfolio.route');
var logbook_route_1 = require('./whatever/Common/LogBook/logbook.route');
var common_report_route_1 = require('./whatever/Reports/common.report.route');
var personal_settings_route_1 = require('./Whatever/Administration/Personal Settings/personal-settings-route');
var feedback_route_1 = require('./Whatever/Administration/Feedback/feedback-route');
var ComponentRoute = (function () {
    function ComponentRoute() {
        this.configRoute = function () {
            ComponentRoute.myRts = new MyRoute_1.MyRoute(portfolio_route_1.PortfolioRoutes);
            ComponentRoute.myRts.addRoute(personal_settings_route_1.PersonalSettingsRoute);
            ComponentRoute.myRts.addRoute(personal_settings_route_1.PersonalSettingsCancelledRoute);
            ComponentRoute.myRts.addRoute(common_report_route_1.CommonReportRoutes);
            ComponentRoute.myRts.addRoute(logbook_route_1.LogbookRoutes);
            ComponentRoute.myRts.addRoute(feedback_route_1.FeedbackComponentRoute);
        };
    }
    return ComponentRoute;
}());
exports.ComponentRoute = ComponentRoute;
//# sourceMappingURL=Component.routes.js.map
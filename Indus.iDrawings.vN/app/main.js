var http_1 = require('@angular/http');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var forms_1 = require('@angular/forms');
var angular2_toaster_1 = require('./Framework/ExternalLibraries/Notification/angular2-toaster');
var notify_getsettings_service_1 = require('./Framework/Models/Notification/notify.getsettings.service');
var ng2_dnd_1 = require('./Framework/ExternalLibraries/dnd/ng2-dnd');
var core_1 = require('@angular/core');
/*class CustomExceptionHandler{
    call(error, stackTrace = null, reason = null) {
        // do something with the exception
        console.log("Errorrrr", error);
        //bootstrapiDrawingsV6();
    }
}*/
function bootstrapiDrawingsV6() {
    platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, app_routes_1.APP_ROUTER_PROVIDERS, angular2_toaster_1.ToasterService, angular2_toaster_1.ConfirmToasterService, notify_getsettings_service_1.GetToasterSettings, forms_1.disableDeprecatedForms(),
        forms_1.provideForms(), ng2_dnd_1.DND_PROVIDERS /*, provide(ExceptionHandler, { useClass: CustomExceptionHandler })*/])
        .catch(function (err) { return console.error(err); });
}
;
core_1.enableProdMode();
bootstrapiDrawingsV6();
//# sourceMappingURL=main.js.map
// main entry point
import {ExceptionHandler, provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { bootstrap }  from '@angular/platform-browser-dynamic';
import { AppComponent }   from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {TestService} from './Whatever/test2/testservice';
import { ToasterService, ConfirmToasterService } from './Framework/ExternalLibraries/Notification/angular2-toaster';
import {GetToasterSettings} from './Framework/Models/Notification/notify.getsettings.service';
import {DND_PROVIDERS, DND_DIRECTIVES} from './Framework/ExternalLibraries/dnd/ng2-dnd';
import { enableProdMode} from '@angular/core';

/*class CustomExceptionHandler{
    call(error, stackTrace = null, reason = null) {
        // do something with the exception
        console.log("Errorrrr", error);
        //bootstrapiDrawingsV6();
    }    
}*/

function bootstrapiDrawingsV6() {
    bootstrap(AppComponent, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, ToasterService, ConfirmToasterService, GetToasterSettings, disableDeprecatedForms(),
        provideForms(), DND_PROVIDERS/*, provide(ExceptionHandler, { useClass: CustomExceptionHandler })*/])
        .catch(err => console.error(err));
};
enableProdMode();
bootstrapiDrawingsV6();


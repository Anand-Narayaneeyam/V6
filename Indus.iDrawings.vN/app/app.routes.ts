import { provideRouter, RouterConfig } from '@angular/router';
import {AppComponent} from './app.component';
import {ComponentRoute} from './Component.routes';
import {Test2Component} from './Whatever/Test2/test2.component';

export const AppRoutes: RouterConfig = [
    { path: '', component: Test2Component } 
];
export const routes: RouterConfig = [   
    ...AppRoutes
];
let route = new ComponentRoute();
route.configRoute();
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];


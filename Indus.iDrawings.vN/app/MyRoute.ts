import {RouterConfig} from '@angular/router';
import {routes} from './app.routes'
export class MyRoute {
    constructor(_route: any) {
        routes.push(..._route);
    }
    addRoute = function (_route: RouterConfig) {
        routes.push(..._route);
}
}
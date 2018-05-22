import {routes} from './app.routes'
export class BaseRoute {
    System = window["System"];
    importRoute = function (routeFilePath: string) {
        return this.System.import(routeFilePath).then(refToLoadedModule => {
            routes.push(...refToLoadedModule[Object.keys(refToLoadedModule)[0]]);
        }
        );
    };
}
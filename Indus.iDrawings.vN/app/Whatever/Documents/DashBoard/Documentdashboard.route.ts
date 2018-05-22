import {RouterConfig} from '@angular/router';
import {documentDashBoard} from './DashBoard.Component';
//import {MultiBarChart} from '../DashBoard/multibarchart.component';
//import {DashBoard} from '../DashBoard/dashboard.component';
export const DocumentDashBoards: RouterConfig = [
    { path: 'DocumentDashBoard', component: documentDashBoard }
];
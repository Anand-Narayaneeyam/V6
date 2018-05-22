import {RouterConfig} from '@angular/router';
import {AdministrationDashBoard} from './administrationdashboard.component';
//import {MultiBarChart} from '../DashBoard/multibarchart.component';
//import {DashBoard} from '../DashBoard/dashboard.component';
export const AdministrationDashBoards: RouterConfig = [
    { path: 'AdminDashboard', component: AdministrationDashBoard }
];
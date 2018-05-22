import {RouterConfig} from '@angular/router';
import {EmployeeDashBoard} from './employeedashboard.component';
//import {MultiBarChart} from '../DashBoard/multibarchart.component';
//import {DashBoard} from '../DashBoard/dashboard.component';
export const EmployeeDashBoards: RouterConfig = [
    { path: 'EmpDashboard', component: EmployeeDashBoard }
];
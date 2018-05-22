import {RouterConfig} from '@angular/router';
import {CustomReportComponent} from './customreports.component';
export const CustomReportViewerRoutes: RouterConfig = [
    { path: 'custom-reports/:t', component: CustomReportComponent }
];

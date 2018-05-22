import {RouterConfig} from '@angular/router';
import {AdditionalReportTreeComponent} from './reports-tree-view';
export const AdditionalReportViewerRoutes: RouterConfig = [
    { path: 'additional-reports/:t', component: AdditionalReportTreeComponent }
];
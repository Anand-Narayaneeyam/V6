import {Component, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {ReviewWorkFlowComponent} from '../../common/review/reviewworkflow';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'

@Component({
    selector: 'spaceplanning-approvalreview',
    templateUrl: './app/Views/Employee/Request/spaceplanning-approvalreview.component.html',
    directives: [ReviewWorkFlowComponent, PageComponent],
    providers: []
})

export class SpacePlanningApprovalReview {
    pagePath: string = "Employee/Space Planning Approval Request";
}
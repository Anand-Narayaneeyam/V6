import {MoveProjectComponent}from './moveproject.component'
import {Component, ChangeDetectorRef, SimpleChange, Output, KeyValueDiffers, EventEmitter, OnInit} from '@angular/core';
import {PageComponent} from '../../../../Framework/Whatever/Page/page.component'


@Component({
    selector: 'move-project-inspaceplanning',
    templateUrl: './app/Views/Employee/Tools/Move Projects/moveProjectInSpacePlanning.html',
    directives: [MoveProjectComponent, PageComponent]
})

export class MoveProjectInSpacePlanningComponent { }
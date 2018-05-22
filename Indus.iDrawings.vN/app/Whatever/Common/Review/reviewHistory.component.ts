import {Component, Output, EventEmitter, DoCheck, KeyValueDiffers, Input,OnChanges,SimpleChange } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {ReviewWorkFlowService} from '../../../models/common/reviewworkflow.service'
import {SortHelper} from '../../utils/sortHelper'


@Component({
    selector: 'reviewHistory',
    templateUrl: './app/Views/Common/Review/reviewHistory.component.html',
    directives: [GridComponent, PagingComponent ],
    providers: [ReviewWorkFlowService, SortHelper],
    inputs: ['workflowCatId', 'entityCatId','selectedid']


})

export class ReviewHistoryComponent {

    itemsSource: any[];
    inputItems: IGrid = { dataKey: "", groupBy: [], grpWithCheckBx: false, allowAdd: false, allowEdit: false }
    fieldObject: IField[];
    totalItems: number=100;//grid count
    itemsPerPage: number=20;//number of rows to be shown per page 
    workflowCatId: number;
    entityCatId: number;
    selectedid: number;
    @Output() ClickEvent = new EventEmitter();

    constructor(private reviewService: ReviewWorkFlowService,private _sortHelper:SortHelper) { }

    pageChanged(event: any) {
        this.reviewService.getHistoryPaging(this.workflowCatId, this.entityCatId,event.pageEvent.page)
    }
    public onSort(objGrid: any) {
        var sortedData = new Array();/*To notify the watcher about the change*/
        sortedData = sortedData.concat(this.itemsSource.sort(this._sortHelper.sortByProperty(this.inputItems["sortCol"], this.inputItems["sortDir"])));
        this.itemsSource = sortedData;

    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["selectedid"] && changes["selectedid"]["currentValue"] != changes["selectedid"]["previousValue"]) {
            this.reviewService.getHistoryField().subscribe(resultData => this.fieldObject = resultData["historyField"]);
            this.reviewService.getHistoryData(this.selectedid).subscribe(resultData => this.itemsSource = resultData["historyData"]);
        }
    }
    CloseClick() {
        this.ClickEvent.emit("cancel");
    }
    ViewClick() {
        this.ClickEvent.emit(this.selectedid);
    }

}

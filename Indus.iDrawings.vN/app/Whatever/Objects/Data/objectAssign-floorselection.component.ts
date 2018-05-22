import {Component, Output, EventEmitter, DoCheck, KeyValueDiffers, ChangeDetectorRef } from '@angular/core';
import {NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {ObjectsService} from '../../../Models/Objects/objects.service'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';



@Component({
    selector: 'objectsAssign-FloorSelecton',
    templateUrl: './app/Views/Objects/Data/objectAssign-floorselection.component.html',
    directives: [GridComponent, PagingComponent],
    providers: [ObjectsService, HTTP_PROVIDERS]

})

export class AssignedMainListComponent {
    fieldObject: IField[];
    itemsSource: any[];
    inputItems: IGrid = {
        dataKey: "Id", groupBy: ["Site", "Building"], grpWithCheckBx: true, allowAdd: false
    };
    differ: any;
    public totalItems: number;//= 1000;
    public itemsPerPage: number;// = 200;
    @Output() getSelectedFloor = new EventEmitter();
    @Output() floorSelected = new EventEmitter();
    cdr: any;

    constructor(cdr: ChangeDetectorRef, private objectsService: ObjectsService, private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create(null);
    }
    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {

            var selectedFloor = this.inputItems.selectedIds;
            this.getSelectedFloor.emit({
                selectedFloor
            })
        }
    }
    public pageChanged(event: any) {
        //this.objectsService.floorSelectionPaging(event.pageEvent.page)
    }
    SaveAs(event: any) {
        console.log('Entered Save As');
    }
    Delete(event: any) {
        console.log('Entered Delete');
    }
    onloadSearch(event: any) {
        console.log('Enetered On Load Search');
    }
    Clear(event: any) {
        console.log('Entered Clear');
    }
    Submit(event: any) {
        console.log('Entered Search')
    }
    NextClick() {
        if (this.inputItems.selectedIds) {
            var floorselected = true;
            this.floorSelected.emit({ floorselected });
        }
    }
}
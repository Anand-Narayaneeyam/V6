import { Component, Input, EventEmitter, Output} from '@angular/core';
import {NgModel} from '@angular/forms';
import {PaginationComponent} from './pagination.component';

@Component({
    selector: 'paging',
    templateUrl: './app/Framework/Views/Paging/paging.component.html',
    directives: [PaginationComponent],
    inputs: ["totalItems", "itemsPerPage"]    
})

export class PagingComponent{

    public currentPage: number = 1;    
    @Output()
    onPageChanged = new EventEmitter();

    public pageChanged(event: any): void {
        event.page = (event.page - 1);
        event.itemsPerPage = event.itemsPerPage;
        this.onPageChanged.emit({
            pageEvent: event
        });
    };
}

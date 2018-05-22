import { Component, Input, AfterContentChecked, ContentChild, TemplateRef, Output, EventEmitter, ElementRef} from '@angular/core';

@Component({
    selector: 'list',
    template:   `
                <template ngFor [ngForOf] = "source" [ngForTemplate] = "userItemTemplate"   >
                </template>`,
    inputs: ['source', 'selectedIds', 'datakey', 'selectionMode'],
    styleUrls: ['app/Framework/Views/List/list.component.css']
})
export class ListComponent implements AfterContentChecked{
    public source: any[];
    @Input() selectedIds = [];
    @Input() datakey: string;
    @Input() selectionMode: string;
    @Output() selectedIdsChange = new EventEmitter();
    listElement: ElementRef;
    public previousCardObj = [];
    public isAddedCard: boolean = false;
    @ContentChild(TemplateRef) userItemTemplate: TemplateRef<any>;
    
    constructor(private el: ElementRef) {
        this.listElement = el;
    }    
    ngAfterContentChecked() {
        
          
    }
    changeSelectedIds(ids: string) {
     
        this.selectedIds.push(ids);
          this.selectedIdsChange.emit(this.selectedIds);
      
    }
  //<div *ngIf ="source.length>0">"No data exists"</div>
}
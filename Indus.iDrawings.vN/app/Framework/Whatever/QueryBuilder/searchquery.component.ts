import { Component, Input, ChangeDetectorRef, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef} from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import {IGroup} from '../../Models/Interface/IGroup';
import {IField} from '../../Models/Interface/IField';
import {ICondition} from '../../Models/Interface/ICondition';
import { SearchQueryGroupComponent} from '../../../Framework/Whatever/QueryBuilder/searchquerygroup.component';
import { SearchQueryConditionComponent} from '../../../Framework/Whatever/QueryBuilder/searchquerycondition.component';

@Component({
    selector: 'qbsearchquery',
    templateUrl: 'app/Framework/Views/QueryBuilder/searchquery.component.html',
    directives: [SearchQueryGroupComponent, SearchQueryConditionComponent]
})
export class SearchQueryComponent {
    @Input() datasource: IGroup;
    ngOnInit() {
      debugger
        var contextObj = this;
        var testdatasource = contextObj.datasource;

    }
}
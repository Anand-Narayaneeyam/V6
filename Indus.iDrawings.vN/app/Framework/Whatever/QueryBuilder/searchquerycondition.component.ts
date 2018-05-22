import { Component, Input, ChangeDetectorRef, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef} from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import {IGroup} from '../../Models/Interface/IGroup';
import {IField} from '../../Models/Interface/IField';
import {ICondition} from '../../Models/Interface/ICondition';

@Component({
    selector: 'qbsearchquerycondition',
    templateUrl: 'app/Framework/Views/QueryBuilder/searchquerycondition.component.html',
    directives: [SearchQueryConditionComponent]
})
export class SearchQueryConditionComponent {
    @Input() datasource: ICondition;
    @Input() conditionindex: number;
    ngOnInit() {
      debugger
        var contextObj = this;
        var testdatasource = contextObj.datasource;

    }
}
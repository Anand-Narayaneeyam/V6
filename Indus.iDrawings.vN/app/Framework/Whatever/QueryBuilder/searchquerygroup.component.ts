import { Component, Input, ChangeDetectorRef, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges, forwardRef} from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import {IGroup} from '../../Models/Interface/IGroup';
import {IField} from '../../Models/Interface/IField';
import {ICondition} from '../../Models/Interface/ICondition';
import { SearchQueryConditionComponent} from '../../../Framework/Whatever/QueryBuilder/searchquerycondition.component';

@Component({
    selector: 'qbsearchquerygroup',
    templateUrl: 'app/Framework/Views/QueryBuilder/searchquerygroup.component.html',
    directives: [SearchQueryGroupComponent, SearchQueryConditionComponent]
})
export class SearchQueryGroupComponent {
    @Input() datasource: IGroup;
    @Input() allGroupData: any

    isOperatorVisible;
    isConditionExistsinParentGroup = false;
    isGroupExistsinParentGroup = false;
    ngOnInit() {
   debugger
   var contextObj = this;
   var contextObj = this;
   if (contextObj.allGroupData && contextObj.datasource) {
       if (contextObj.datasource.GroupId != 1 && contextObj.datasource.OperatorFieldObj)// && (contextObj.allGroupData.Conditions.length > 0 || contextObj.allGroupData.SubGroups.length>1))
           contextObj.isOperatorVisible = true;
       console.log("allGroupData", contextObj.allGroupData);
   }
        //if (contextObj.allGroupData && contextObj.datasource) {          
        //    if (contextObj.datasource.GroupId != 1 && contextObj.datasource.OperatorFieldObj) {

        //        var ParentGroup = this.findParentGrp(contextObj.datasource.GroupId, contextObj.allGroupData.SubGroups, contextObj.allGroupData);
        //        if (ParentGroup) {
        //            if (ParentGroup.Conditions.length > 0)
        //                this.isConditionExistsinParentGroup = true;
        //            if (ParentGroup.SubGroups.length > 1)
        //                this.isGroupExistsinParentGroup = true;

        //            if (this.isConditionExistsinParentGroup == false && this.isGroupExistsinParentGroup == false)
        //                this.isOperatorVisible = false;
        //            else
        //                this.isOperatorVisible = true;
        //        }
        //    }
        //}
   

    }
    findParentGrp(grpId, grpArray: IGroup[], parentofActiveGroup) {
      
        for (var i = 0; i < grpArray.length; i++) {
            if (grpArray[i].GroupId == grpId) {
                return parentofActiveGroup;
            }
        }
        for (var i = 0; i < grpArray.length; i++) {
            return this.findParentGrp(grpId, grpArray[i].SubGroups, grpArray[i]);
        }

    }
}
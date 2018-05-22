
import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { HTTP_PROVIDERS} from '@angular/http';
import {DND_PROVIDERS, DND_DIRECTIVES} from '../../../FrameWork/ExternalLibraries/dnd/ng2-dnd';

@Component({
    selector: 'custom-fieldOrder',
    templateUrl: 'app/Views/Common/Field Order/fieldorder.component.html',
    directives: [DND_DIRECTIVES],
    providers: [DND_PROVIDERS, HTTP_PROVIDERS],
    inputs: ['rptFieldSource', 'subHeaderFieldSrc']

})

export class CustomFieldOrderComponent {
    rptFieldSource;
    subHeaderFieldSrc;
    @Output() retFieldOrderUpdate = new EventEmitter();

    ngOnInit() {

        debugger
    }
   
    fieldOrderSaveClick() {  
        var rptfldIds = [];
        var subHdrFldIds = [];
        for (var i = 0; i < this.rptFieldSource.length;i++) {
            rptfldIds.push(this.rptFieldSource[i]["Id"]);
        }
        for (var j = 0; j < this.subHeaderFieldSrc.length; j++) {       
            subHdrFldIds.push(this.subHeaderFieldSrc[j]["Id"]);
        } 
        console.log("data", rptfldIds, subHdrFldIds)     
        this.retFieldOrderUpdate.emit({ "rptFieldSrcIds": rptfldIds, "subHdrFldSrcIds": subHdrFldIds });
    }
}
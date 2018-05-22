import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { DND_PROVIDERS, DND_DIRECTIVES } from '../../../FrameWork/ExternalLibraries/dnd/ng2-dnd';

@Component({
    selector: 'fieldorder-common',
    templateUrl: 'app/Views/Common/Field Order/fieldorder-common.component.html',
    directives: [DND_DIRECTIVES],
    providers: [DND_PROVIDERS, HTTP_PROVIDERS],
    inputs: ['rptFieldSource', 'fieldOrderTitle']
})

export class FieldOrderCommonComponent {
    rptFieldSource;
    subHeaderFieldSrc;
    @Output() retFieldOrderUpdate = new EventEmitter();
    fieldOrderTitle: string;

    ngOnInit() {

        debugger
    }

    fieldOrderSaveClick() {
        var rptfldIds = [];
        var subHdrFldIds = [];
        for (var i = 0; i < this.rptFieldSource.length; i++) {
            rptfldIds.push(this.rptFieldSource[i]["Id"]);
        }        
        console.log("data", rptfldIds)
        this.retFieldOrderUpdate.emit({ "rptFieldSrcIds": rptfldIds });
    }
}
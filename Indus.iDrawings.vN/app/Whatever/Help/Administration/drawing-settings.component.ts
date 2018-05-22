import {Component, OnInit} from '@angular/core';
import {NgControl} from '@angular/common';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';

@Component({
    selector: 'drawing-settings-help',
    templateUrl: './app/Views/Help/Administration/drawing-settings.component.html',
    directives: [PageComponent]

})
export class DrawingSettingsHelpComponent implements OnInit {

    pageTitle: string = "Drawing Settings";
    pagePath: string;
   
    constructor() {

    }
    ngOnInit(): void {

        var objContext = this;
        objContext.pagePath = "Help / Administration / Drawing Settings";


    }

}
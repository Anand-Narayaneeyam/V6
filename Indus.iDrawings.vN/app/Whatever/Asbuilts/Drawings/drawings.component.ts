import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { DrawingDetailsComponent } from "../../common/drawingdetails/drawingdetails.component";

@Component({
    selector: 'drawings',
    templateUrl: './app/Views/Asbuilts/Drawings/drawings.component.html',
    directives: [PageComponent, DrawingDetailsComponent],
    providers: [HTTP_PROVIDERS]
})

export class DrawingsComponent implements OnInit {
    pagePath: string;

    ngOnInit(): void {
        this.pagePath = "As Builts / Drawings";
    }
}
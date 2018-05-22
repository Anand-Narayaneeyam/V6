import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { DrawingDetailsComponent } from "../../common/drawingdetails/drawingdetails.component";
@Component({
    selector: 'setup-drawings',
    templateUrl: './app/Views/Asbuilts/Drawing Settings/asbuilt-setupdrawings.component.html',
    directives: [PageComponent, DrawingDetailsComponent],
    providers: [HTTP_PROVIDERS]
})

export class SetupDrawingsComponent implements OnInit {
    pagePath: string;
    ngOnInit(): void {
        this.pagePath = "Settings / As Builts / Drawings";
    }
}
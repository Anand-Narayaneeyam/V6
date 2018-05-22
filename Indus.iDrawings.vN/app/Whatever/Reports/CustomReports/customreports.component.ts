import {Component, Input, AfterViewInit, DoCheck} from '@angular/core';
import {Html5ViewerComponent} from '../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../Models/Common/General';
import { CommonReportService } from '../../../Models/reports/common.service'
import { IField, ILookupValues } from  '../../../Framework/Models/Interface/IField';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import {CustomReportViewerComponent} from '../../Reports/CustomReports/customreports-preview';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'custom-report',
    template: `
        <custom-reportviewer *ngIf="isNext" [isPreview]="false" [reportId]="reportId"></custom-reportviewer>
  `,
    directives: [Html5ViewerComponent, PageComponent, CustomReportViewerComponent],
    providers: [CommonReportService],
})


export class CustomReportComponent implements AfterViewInit{  

    reportTitle: string = "";
    moduleId: number;
    reportId: number = 0;
    needPrefix: string = "False";
    dataForCustomReport: any = undefined;
    sub: number = 0;
    isNext: boolean = false;

    constructor(private commonreportservice: CommonReportService, private route: ActivatedRoute,
        private router: Router) { }

    ngAfterViewInit() {
    }


    ngDoCheck() {
        var oldValue = this.sub;
        this.sub = this.route.snapshot.params["t"];

        if (this.sub != oldValue) {
            this.isNext = false;
            this.sub = this.route.snapshot.params["t"];
            if (this.sub >= 2000) {
                var temp = this.sub - 2000;
                this.reportId = temp;

                var contexObj = this;
                setTimeout(function () {
                    contexObj.isNext = true;
                }, 1000);
            }

        }
    }

}
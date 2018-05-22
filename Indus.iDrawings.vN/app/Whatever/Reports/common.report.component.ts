
import {Component, Input, OnInit} from '@angular/core';
import {PageComponent} from '../../Framework/Whatever/Page/page.component';




@Component({
    selector: 'common-report',
    templateUrl: 'app/Views/Reports/common.report.html',
    directives: [PageComponent]
   
})


export class CommonReportComponent implements OnInit {

    pagePath: string;

    ngOnInit(): void {
        this.pagePath = "Reports";
    }

}
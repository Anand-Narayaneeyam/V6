import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import {DateComponent} from '../../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component';
import { CommonReportService } from '../../../../Models/reports/common.service'

@Component({
    selector: 'select-reportperiod',
    templateUrl: './app/Views/Reports/Common/SelectPeriod/select.period.report.component.html',
    directives: [DateComponent],
    providers: [CommonReportService]
})


export class SelectPeriodReportComponent implements OnInit {

    @Output() onSubmitClick = new EventEmitter();

    dateSelectorField: any = undefined;
    constructor(private usersreportservice: CommonReportService) { }

    ngOnInit() {
        var contexObj = this;
        contexObj.usersreportservice.UserReportdate().subscribe(function (resultData) {
        contexObj.dateSelectorField = resultData.Data;
        });
    }
    onSubmit(event: any)
    {
        if (this.dateSelectorField[0].FieldValue != "" && this.dateSelectorField[1].FieldValue != "")
        {
           this.onSubmitClick.emit(this.dateSelectorField);
        }
   
    }

}
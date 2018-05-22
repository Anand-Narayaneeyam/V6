import {Component, Input, OnInit, AfterViewChecked, SimpleChange} from '@angular/core';
import {Html5ViewerComponent} from '../../../../Framework/Whatever/ReportViewer/reportviewercomponent';
import {IReportDataEntity} from '../../../../Framework/Models/Interface/IReportDataEntity';
import { ReportFieldArray} from '../../../../Models/Common/General';
import { CommonReportService } from '../../../../Models/reports/common.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import {EmployeeService} from '../../../../Models/Employee/employee.services';




@Component({
    selector: 'EmployeeOrgLevel1',
    template: `
    <page *ngIf="LevelNameCustomized != undefined" [pagetitle]="pagePath">
        <content>
            <div style="width:100%;height:100%" *ngIf="ReportData != undefined">
            <reportviewer [reportData]=ReportData > Loading ...</reportviewer>
            </div>
        </content>
    </page>

  `,
    directives: [Html5ViewerComponent, PageComponent],
    providers: [CommonReportService, EmployeeService]
})


export class EmployeeOrgLevel1 implements OnInit, IReportDataEntity {
    public ReportData: IReportDataEntity;


    ModuleId: number;
    ReportCategoryId: number;
    ExportFileName: string = "Trend Analysis - Seating Capacity by Organizational";
    ReportTitle: string = "Trend Analysis - Seating Capacity by Organizational";
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    pagePath: string = "Employees / Organizational";
    LevelNameCustomized: string = "";
    OrgUnitId: string = "0";
    FromDate: string = "";
    ToDate: string = "";
    ForcastToYear: string = "0";
    ForcastByPercentage: string = "0";



    constructor(private commonreportservice: CommonReportService, private employeeService: EmployeeService) { }

    ngOnInit() {
        var contexObj = this;
        this.employeeService.getOrgLevelCustomizedName().subscribe(function (resultData) {         
            if (resultData.Data != undefined) {
                var LevelNames = JSON.parse(resultData.Data);
                contexObj.LevelNameCustomized = LevelNames[0].L1Caption;

                if (contexObj.LevelNameCustomized != "") {
                    contexObj.pagePath = "Employees / Seating Capacities by " + contexObj.LevelNameCustomized;
                }
            }
            setTimeout(function () {
                contexObj.LoadReportData();
            }, 50);
        });
    }




    LoadReportData() {
        this.ReportData = { ModuleId: 0, ReportCategoryId: 0, ExportFileName: "", ReportTitle: "", ReportSubTitle: "", ListReportFieldIdValues: [] };
        var arrRptFieldIds = new Array<ReportFieldArray>();
        this.ReportData.ModuleId = 5;
        this.ReportData.ReportCategoryId = 322;
        this.ReportData.ExportFileName = "Trend Analysis - Seating Capacity by " + this.LevelNameCustomized;
        this.ReportData.ReportSubTitle = "";
        this.ReportData.ReportTitle = "Trend Analysis - Seating Capacity by " + this.LevelNameCustomized;
        arrRptFieldIds.push({
            ReportFieldId: 271,
            Value: this.ReportData.ModuleId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 346,
            Value: this.ReportData.ReportCategoryId.toString()
        })

        arrRptFieldIds.push({
            ReportFieldId: 1965,
            Value: this.OrgUnitId.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900194,
            Value: this.FromDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 900195,
            Value: this.ToDate.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 7907,
            Value: this.ForcastToYear.toString()
        })
        arrRptFieldIds.push({
            ReportFieldId: 5080,
            Value: this.ForcastByPercentage.toString()
        })
        this.ReportData.ListReportFieldIdValues = arrRptFieldIds;


    }



}





import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service'
import { ListBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';

@Component({
    selector: 'select-orgunit-report',
    templateUrl: './app/Views/Reports/Common/SelectOrgUnitForReport/select.orgunit.report.html',
    providers: [CommonReportService, NotificationService],
    directives: [ListBoxComponent, Notification, PageComponent, SubMenu],
    inputs: ['ReportCategoryId']
})

export class SelectOrgUnitReportComponent implements OnInit {

    ListboxData: IField = undefined;
    @Output() onSubmitClick = new EventEmitter();
    LevelNameCustomized: string = "";
    menuData: any;
    iscard = true;
    enableMenu: any[];
    ReportCategoryId: number;
    pagePath: string = "";
    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService) { }

    ngOnInit() {

        switch (this.ReportCategoryId) {
            case 100: this.pagePath = "Reports / Employees / Detailed Occupancy";
                break;
            case 101: this.pagePath = "Reports / Employees / Under Occupied Spaces";
                break;
            case 102: this.pagePath = "Reports / Employees / Over Occupied Spaces";
                break;
            case 103: this.pagePath = "Reports / Employees / Nominally Occupied ";
                break;
            default: this.pagePath = " ";
                break;
        }

        this.menuData = [
            {
                "id": 0,
                "title": "Show Report",
                "image": "Show Report",
                "path": "Show Report",
                "subMenu": null
            }
        ];
        this.enableMenu = [0];

        var contexObj = this;
        contexObj.commonreportservice.getOrganizationalUnitField().subscribe(function (resultData) {
            var data = resultData.Data[0];
            data.FieldLabel = "";
            contexObj.ListboxData = data;
            if (contexObj.ListboxData == undefined) {
                contexObj.enableMenu = [];
            }

        });
        contexObj.commonreportservice.getOrgLevelCustomizedName().subscribe(function (result) {
            if (result.Data != undefined) {
                var LevelNames = JSON.parse(result.Data);
                contexObj.LevelNameCustomized = LevelNames[0].L1Caption;
            }
        });

    }

    getListBoxData(event) {
        if (event.fieldObject.MultiFieldValues != undefined) {
            if (event.fieldObject.MultiFieldValues.length == 0) {
                this.enableMenu = [];
            }
            else {
                this.enableMenu = [0];
            }
        }
    }

    onSubMenuChange(event: any) {
        if (this.ListboxData.MultiFieldValues == null) {
            this.notificationService.ShowToaster("Select " + this.LevelNameCustomized +"(s)", 2);
        }
        else {
            this.onSubmitClick.emit(this.ListboxData.MultiFieldValues);
            this.ListboxData.MultiFieldValues = null;
        }
    }
}
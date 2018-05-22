import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {IField} from '../../../../Framework/Models//Interface/IField';
import { CommonReportService } from '../../../../Models/reports/common.service';
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { PageComponent } from '../../../../Framework/Whatever/Page/page.component';
import { ListBoxComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import {AssetListbyClassComponent} from './asset.listbyclass.report'
import {TabsComponent} from '../../../../Framework/Whatever/Tab/tabs.component'
import {TabComponent} from '../../../../Framework/Whatever/Tab/tab.component'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';




@Component({
    selector: 'assetlistbyclass-selector',
    templateUrl: './app/Views/Reports/Assets/AssetListByClass/asset.listbyclass.select.html',
    providers: [CommonReportService, NotificationService],
    directives: [PagingComponent, Notification, PageComponent, AssetListbyClassComponent, ListBoxComponent, TabsComponent, TabComponent, SubMenu]
})

export class AssetListbyClassSelect implements OnInit {

    ListboxData: IField = undefined;
    @Output() onSubmitClick = new EventEmitter();
    objectCategoryId: any = 1;
    drawingIds: any = "";
    dataOption: any = 1;
    classListOption: any = 1;
    objectComponentCategory: any = 0;
    selectedIds: any;
    isNextClicked: boolean = false;
    selectedTab: number = 0;
    pagePath: string;
    menuData: any;
    iscard = true;
    enableMenu: any[];

    constructor(private commonreportservice: CommonReportService, private notificationService: NotificationService) { }

    ngOnInit() {
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
        this.pagePath = "Reports / Assets / Asset List by Class";
        var contextObj = this;
        this.commonreportservice.getAssetClassSelectionFieldsList(1).subscribe(function (result) {
            var data = result.Data[0];
            data.FieldLabel = "";
            contextObj.ListboxData = data;
            contextObj.commonreportservice.getAssetClassLookups(contextObj.objectCategoryId, contextObj.drawingIds, contextObj.dataOption, contextObj.classListOption, contextObj.objectComponentCategory).subscribe(function (resultData) {
                contextObj.ListboxData.LookupDetails.LookupValues = JSON.parse(resultData.Data["FieldBinderData"]);
                if (contextObj.ListboxData.LookupDetails.LookupValues == undefined) {
                    contextObj.enableMenu = [];
                }
            });
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

    onSubMenuChange(event) {
        this.isNextClicked = false;
        var selectedClassIds: string = ''
        if (this.ListboxData.MultiFieldValues == null || this.ListboxData.MultiFieldValues.length == 0) {
            this.notificationService.ShowToaster("Select an Asset Class", 2)
        }
        else {
            for (var count = 0; count < this.ListboxData.MultiFieldValues.length; count++) {
                selectedClassIds = selectedClassIds + this.ListboxData.MultiFieldValues[count] + ',';
            }
            selectedClassIds = selectedClassIds.slice(0, -1);
            this.selectedIds = selectedClassIds;

            var contexObj = this;
            setTimeout(function () {
                contexObj.isNextClicked = true;            
            }, 50);
            setTimeout(function () {            
                contexObj.selectedTab = 1;
            }, 100);
        }
    }

    getSelectedTab(event) {
        this.selectedTab = event[0];       
    }



}
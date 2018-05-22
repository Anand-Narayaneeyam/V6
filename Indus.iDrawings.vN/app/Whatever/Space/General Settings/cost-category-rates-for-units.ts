import { Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { GeneralFunctions} from '../../../Models/Common/General';
import { IField} from '../../../framework/models/interface/ifield';
import { SpaceService } from '../../../models/space/space.service';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component';
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { SetDivisionRatesComponent } from './set-division-rates.component';

@Component({
    selector: 'cost-category-rates-for-units',
    templateUrl: 'app/Views/Space/General Settings/cost-category-rates-for-units.html',
    directives: [GridComponent, SplitViewComponent, TabsComponent, TabComponent, SetDivisionRatesComponent],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, GeneralFunctions]
})

export class CostCategoryRateUnits implements OnInit{

    pagePath: string;
    strReportFields: string = "";
    strLevel1OrgUnitName: string = "";
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    selectedTab: number = 0;
    deleteIndex: number;
    isDivisionLoaded: boolean = false;
    localselection: number;
    isTabOpen = false;
    itemsSource: any[] = null;
    fieldObject: IField[];
    isGridEnableFlag: boolean = false;
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true };

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;
        //contextObj.isTabOpen = true;

        this.spaceService.isStructureOrganization().subscribe(function (resultData) {
            if (resultData["Data"] == 0)
            {
                contextObj.isGridEnableFlag = true;
                contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
            }
            else if (resultData["Data"] == 1) {
                contextObj.spaceService.getCostCategoryRatesColumns().subscribe(function (resultData) {
                    console.log("resultData", resultData);
                    contextObj.fieldObject = resultData["Data"];
                    var level1FldObj = contextObj.fieldObject.find(function (el) { return el.ReportFieldId == 290 });
                    contextObj.strLevel1OrgUnitName = level1FldObj.FieldLabel;
                    for (let j = 0; j < contextObj.fieldObject.length; j++) {
                        if (contextObj.fieldObject[j].ReportFieldId == 290) {
                            contextObj.fieldObject[j].IsEnabled = false;
                        }
                    }
                });
               
                contextObj.spaceService.getCostCategoryRatesData().subscribe(function (resultData) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        if (JSON.parse(resultData["Data"].FieldBinderData)[0]["Column1"]) {
                            if (JSON.parse(resultData["Data"].FieldBinderData)[0]["Column1"] == -2) {
                                contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
                            }
                            else if (JSON.parse(resultData["Data"].FieldBinderData)[0]["Column1"] == -3) {
                                contextObj.notificationService.ShowToaster("No Organizational Units exist", 2);
                            }
                        }
                        else {
                            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        }
                    }
                    else {
                    }
                })
            }

        });

    }

    updateCostCategoryRates(event) {
        var contextObj = this;
        var vowels=['A','E','I','O','U']
        var hasSelectedIds: boolean = false;
        var arrayList = new Array<ReportFieldArray>();
        if (contextObj.totalItems > 0) {
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["Select All"] == true) {
                    hasSelectedIds = true;
                    arrayList.push({
                        ReportFieldId: 286,
                        Value: contextObj.itemsSource[i].ID.toString()
                    });
                }
            }
            if (hasSelectedIds == true) {
                var contextObj = this;
                this.strReportFields = JSON.stringify(arrayList);

                this.localselection = 1;
                contextObj.isTabOpen = true;
                setTimeout(function () {
                    contextObj.selectedTab = 1;

                }, 100);
                setTimeout(function () {
                    contextObj.isDivisionLoaded = true;
                }, 100);
            }
            else {
                var index = vowels.indexOf(contextObj.strLevel1OrgUnitName[0].toUpperCase())
                if (index>-1)
                    contextObj.notificationService.ShowToaster("Select an " + contextObj.strLevel1OrgUnitName + " ", 2);
                else
                    contextObj.notificationService.ShowToaster("Select a " + contextObj.strLevel1OrgUnitName + " ", 2);
            }
        }
    }

    getSelectedTab(event: any) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;

        }
    }

    onTabClose(event: any) {
        var contextObj = this;
        this.isTabOpen = false;
        this.selectedTab = event[0];
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

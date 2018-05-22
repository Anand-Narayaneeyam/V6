import {Component, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../../Models/WorkOrder/workorder.service'
import {IField} from  '../../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../../Models/Common/General';
import { AdministrationService } from '../../../../Models/Administration/administration.service';
import { ChargebackAddEditComponent } from './chargeback-addedit';


@Component({
    selector: 'chargeback-list',
    templateUrl: './app/Views/WorkOrder/Review/Manage Chargeback/chargeback-list.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent, ChargebackAddEditComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ["workOrderId"]
})

export class ChargebackListComponent implements AfterViewInit {

    fieldObject: IField[];
    fieldDetailsAddEdit: IField[]; 
    itemsSource: any[];
    workOrderId: number;
    inputItems: IGrid = { dataKey: "ChargeBackId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    enableMenu = [];
    reportfieldIdValues;
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 3496
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 3496
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 3497
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    refreshgrid;
    chargeBackType: number;
    remainingChargebackPer;

    constructor(private workOrdereService: WorkOrdereService, private AdministrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngAfterViewInit() {
        var contextObj = this;
        this.workOrdereService.getChargebackListFields().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad();
        });
    }

    public dataLoad() {
        var contextObj = this;
        this.workOrdereService.getCustomerSubscribedFeatures("74").subscribe(function (result) {
            if (result["Data"][0]["IsSubscribed"] == true) {
                if (result["Data"][0]["FeatureLookupId"] == "17") {
                    contextObj.chargeBackType = 0;
                }
                else if (result["Data"][0]["FeatureLookupId"] == "18") {
                    contextObj.chargeBackType = 1;
                }
            }
            contextObj.reportfieldIdValues = new Array<ReportFieldIdValues>();
            contextObj.reportfieldIdValues.push({ ReportFieldId: 1424, Value: contextObj.workOrderId.toString() })
            contextObj.reportfieldIdValues.push({ ReportFieldId: 1425, Value: contextObj.chargeBackType.toString() })

            contextObj.workOrdereService.getChargebackData(JSON.stringify(contextObj.reportfieldIdValues), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                contextObj.totalItems = result["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                else {
                    contextObj.notificationService.ShowToaster("No Chargebacks exist", 2);
                    contextObj.enableMenu = [1];
                }
            });
        });

        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 731, contextObj.AdministrationService, contextObj.menuData.length);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad();
    };
    public onSort(objGrid: any) {
        this.dataLoad();
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Chargeback";

        this.workOrdereService.getWorkorderDetails(this.workOrderId).subscribe(function (resultData) {
            contextObj.remainingChargebackPer = (JSON.parse(resultData))[0]["Remaining ChargeBack Percentage"];

            if (contextObj.remainingChargebackPer == 0)
                contextObj.notificationService.ShowToaster("Total Chargeback is already 100 percent, new Chargeback cannot be added ", 2);
            else
            {
                contextObj.workOrdereService.loadChargebackAddEditFields("",0, 1).subscribe(function (result) {
                    result["Data"].find(function (item) {
                        if (item.ReportFieldId == 1426) {
                            item.FieldValue = contextObj.remainingChargebackPer;
                        } else return false;
                    })
                    contextObj.loadChargebackLookups(contextObj, result["Data"]);
                })
            }
        })
    }

    loadChargebackLookups(contextObj,data) {            
        contextObj.workOrdereService.loadChargebackLookups(contextObj.chargeBackType).subscribe(function (resultData) {
            data.find(function (item) {
                if (item.ReportFieldId == 1427) {
                    item.LookupDetails.LookupValues = JSON.parse(resultData);
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                } else return false;
            })

        });
        contextObj.fieldDetailsAddEdit = data;
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Chargeback";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Chargeback", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                this.workOrdereService.loadChargebackAddEditFields(JSON.stringify(contextObj.reportfieldIdValues), this.inputItems.selectedIds[0], 2).subscribe(function (result) {
                    contextObj.loadChargebackLookups(contextObj, result["Data"]);
                });
            }
        }
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Chargeback", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            contextObj.showSlide = !contextObj.showSlide;
        }
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            for (let i = 0; i < contextObj.itemsSource.length; i++) {
                if (contextObj.itemsSource[i]["ChargeBackId"] == contextObj.inputItems.selectedIds[0]) {
                    contextObj.itemsSource[i] = JSON.parse(event["returnData"])[0];
                }
            }
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }


    deleteChargeback() {
        var contextObj = this;
        contextObj.workOrdereService.deleteChargeback(JSON.stringify(contextObj.reportfieldIdValues), contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Chargeback deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Chargeback in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteChargeback();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}

export interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: string;
}
import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {ButtonComponent}from '../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component'
import {ValidateService} from '../../../framework/models/validation/validation.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'assign-drawingcategories',
    templateUrl: './app/Views/Administration/Customers/assign-drawingcategories.html',
    directives: [SplitViewComponent, FieldComponent, SubMenu, GridComponent, DropDownListComponent, ButtonComponent, PagingComponent],
    providers: [AdministrationService, NotificationService, ValidateService],
    inputs: ["customerId", "fieldDetails", "ddlOrgName", "ddlModule"]
})
export class AssignDrawingCategoryComponent {

    ddlOrgName: any;
    ddlModule: any;
    alignContent: string;
    fieldDetails: IField[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, selectioMode: 'single', sortDir: 'ASC', sortCol: "[Drawing Category]", isHeaderCheckBx: true};
    itemsSource: any[] = [];
    refreshgrid;
    customerId: number = 0;
    entityCategoryId: number = 0;
    btnSave: string;
    disableBtn = true;
    count = 0;
    moduleId = 0;
    pageIndex: number = 0;
    value = [];
    totalItems: number = 0;
    itemsPerPage: number = 0;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private validateService: ValidateService) {
    }

    ngOnInit() {
        var context = this;
        this.alignContent = "horizontal";
        this.btnSave = "Save Changes";
        this.itemsSource = [];
    }

    public dataLoad(moduleId) {
        var contextObj = this;
        var reportfieldIdValues = new Array<ReportFieldIdValues>();
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() })
        reportfieldIdValues.push({ ReportFieldId: 271, Value: moduleId.toString() })
        contextObj.administrationService.getDrawingCategoryData(reportfieldIdValues, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result.DataCount;
            contextObj.itemsSource = JSON.parse(result.FieldBinderData);
            contextObj.itemsPerPage = result.RowsPerPage;
            if (contextObj.totalItems == 0) {
                contextObj.itemsSource = [];
                contextObj.notificationService.ShowToaster("No Drawing Categories exist", 2);
                contextObj.disableBtn = true;
            }
        });
    }

    onChangeModule(event) {
        this.moduleId = event;
        if (this.moduleId == -1) {
            this.disableBtn = true;
            this.itemsSource = [];
        }
        else
        {
            this.disableBtn = false;
            this.dataLoad(this.moduleId);
        }
    }

    onCellEdit(event) {
        if ((event.dataKeyValue == 1 || !event.isHeaderClicked ) && this.moduleId == 1)
        {
            var arch = event["dataSource"].find(function (item) { return item.Id == 1 });
            arch["Select All"] = true;
        }
    }

    Update() {

        var context = this;
        var reportfieldIdValues = new Array<ReportFieldIdValues>();
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() })
        reportfieldIdValues.push({ ReportFieldId: 271, Value: this.moduleId.toString() })

        if (this.moduleId == 1) {
            var arch = this.itemsSource.find(function (item) { return item.Id == 1 });
            arch["Select All"] = true;
        }

        for (var item of this.itemsSource) {
            if (item['Select All'] == true) {
                reportfieldIdValues.push({ ReportFieldId: 2056, Value: item['Id'].toString() })
               
            }
        }
        this.administrationService.postsubmitCustomerDwgCategory(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
            if (result["StatusId"] == 1) {
                context.notificationService.ShowToaster("Drawing Categories updated", 3)
            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2)
            }
        });
    }

    public onSort(event) {
        this.dataLoad(this.moduleId);
    }
}

export interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: string;
}
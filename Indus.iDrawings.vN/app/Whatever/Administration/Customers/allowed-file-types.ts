import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/common';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { StringTextBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ButtonComponent}from '../../../framework/whatever/dynamiccontrols/dynamicfields/buttoncomponent.component'
import { ValidateService} from '../../../framework/models/validation/validation.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'allowed-file-types',
    templateUrl: './app/Views/Administration/Customers/allowed-file-types.html',
    directives: [SplitViewComponent, FieldComponent, SubMenu, GridComponent, StringTextBoxComponent,ButtonComponent, PagingComponent],
    providers: [AdministrationService, NotificationService, ValidateService],
    inputs: ["customerId", "rowData"]
})

export class AllowedFileTypesComponent {

    txtOrgName: IField;
    rowData;
    alignContent: string;
    fieldObject: IField[];
    inputItems: IGrid = { dataKey: "FileTypeId", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, selectioMode: 'single', sortDir: 'ASC', sortCol: "[File Type]", isHeaderCheckBx: true };
    itemsSource: any[] = [];
    refreshgrid;
    customerId: number = 0;
    btnSave: string;
    disableBtn = false;
    count = 0;
    moduleId = 0;
    pageIndex: number = 0;
    value = [];
    totalItems: number = 0;
    itemsPerPage: number = 0;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private validateService: ValidateService) {
    }

    ngOnInit() {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.btnSave = "Save Changes";
        let rptField = [330];
        this.administrationService.getAllowedFileTypesFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            for (let i = 0; i < contextObj.fieldObject.length; i++) {
                if (contextObj.fieldObject[i].ReportFieldId == 113) {
                    contextObj.txtOrgName = contextObj.fieldObject[i];
                    contextObj.txtOrgName.FieldValue = contextObj.rowData["Name"];
                }
            }
            var removeArr = [113];
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
            contextObj.loadData();
        })
    }

    public loadData() {
        var contextObj = this;
        var reportfieldIdValues = new Array<ReportFieldIdValues>();
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() })
        contextObj.administrationService.getAllowedFileTypesData(reportfieldIdValues, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems == 0) {
                contextObj.itemsSource = [];
                contextObj.notificationService.ShowToaster("No File Types exist", 2);
                contextObj.disableBtn = true;
            }
        });
    }

    Update() {
        var context = this;
        var reportfieldIdValues = new Array<ReportFieldIdValues>();
        reportfieldIdValues.push({ ReportFieldId: 112, Value: this.customerId.toString() })

        for (var item of this.itemsSource) {
            if (item['Select All'] == true) {
                reportfieldIdValues.push({ ReportFieldId: 329, Value: item['FileTypeId'].toString() })
            }
        }
        this.administrationService.postsubmitAllowedFileTypes(JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
            if (result["StatusId"] == 1) {
                context.notificationService.ShowToaster("File Types updated", 3)
            }
            else {
                context.notificationService.ShowToaster('iDrawings encountered a problem', 2)
            }
        });
    }

    public onSort(event) {
        this.loadData();
    }
}

export interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: string;
}
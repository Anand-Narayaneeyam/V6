import { Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { GeneralFunctions} from '../../../Models/Common/General';
import { IField} from '../../../framework/models/interface/ifield';
import { SpaceService } from '../../../models/space/space.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component'
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { AddEditCostCategoryRatesComponent } from './addedit-cost-category-rates';

@Component({
    selector: 'cost-category-rates',
    templateUrl: 'app/Views/Space/General Settings/cost-category-rates.component.html',
    directives: [GridComponent, SplitViewComponent, DropDownListComponent, SubMenu, AddEditCostCategoryRatesComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, GeneralFunctions]
})

export class CostCategoryRates implements OnInit {

    pagePath: string;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    alignContent = "horizontal";
    ddlFieldObject: IField;
    ddlSelectedId: string;
    action: string;
    btnName: string;
    pageTitle: string;
    itemsSource: any[] = null;
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[] = [];
    enableMenu: number[];
    showSlide = false;
    position = "top-right";
    message = "Are you sure you want to delete the selected Cost Category Rate?";
    refreshgrid;
    @Input() SelectedCostCategoryId;
    splitviewCostCategoryInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: false, selectioMode: 'single', allowEdit: false };
    menuData = [
    {
        "id": 1,
        "title": "Add",
        "image": "Add",
        "path": "Add",
        "subMenu": null

    },
    {
        "id": 2,
        "title": "Edit",
        "image": "Edit",
        "path": "Edit",
        "subMenu": null

    },
    {
        "id": 3,
        "title": "Delete",
        "image": "Delete",
        "path": "Delete",
        "subMenu": null
    }];

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;
        this.spaceService.getCostCategoryRtsColumns().subscribe(function (resultData) {
            console.log("resultData", resultData);
            contextObj.fieldObject = resultData["Data"];
            contextObj.ddlFieldObject = resultData["Data"].find(function (el) { return el.ReportFieldId === 742; });
            contextObj.fieldObject = resultData["Data"];
            for (let i = 0; i < resultData["Data"].length; i++) {
                var updatedData = new Array();
                contextObj.fieldObject = resultData["Data"].splice(2, 5);
                break;
            }
            var reportFieldArray = new Array<ReportFieldArray>();
            contextObj.ddlFieldObject.FieldValue = contextObj.SelectedCostCategoryId;
            reportFieldArray.push({
                ReportFieldId: 742,
                Value: contextObj.SelectedCostCategoryId
            });
            contextObj.ddlSelectedId = contextObj.SelectedCostCategoryId;
            contextObj.spaceService.getCostCategoryRtsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir,JSON.stringify(reportFieldArray)).subscribe(function (resultData) {

                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.enableMenu = [1,2,3];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Cost Category Rates exist", 2);
                    contextObj.enableMenu = [1];
                }
            })
        });
    }

    ddlStyleNameChange(event) {
        var contextObj = this;
        if (event == "-1") {
            contextObj.notificationService.ShowToaster("Select a Cost Category", 2);
            contextObj.enableMenu = [];
            contextObj.itemsSource = null;
            contextObj.itemsPerPage = 0;
        }
        else {
            contextObj.ddlSelectedId = event;
            var reportFieldArray = new Array<ReportFieldArray>();
            reportFieldArray.push({
                ReportFieldId: 742,
                Value: event
            });
            contextObj.spaceService.getCostCategoryRtsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
               
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.enableMenu = [1, 2, 3];
                }
                else {
                    contextObj.notificationService.ShowToaster("No Cost Category Rates exist", 2);
                    contextObj.enableMenu = [1];
                    contextObj.itemsSource = null;
                    contextObj.itemsPerPage = 0;
                }
            })
        }
    }

    onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        var reportFieldArray = new Array<ReportFieldArray>();
        reportFieldArray.push({
            ReportFieldId: 742,
            Value: contextObj.ddlSelectedId
        });
        contextObj.spaceService.getCostCategoryRtsData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.enableMenu = [1, 2, 3];
            }
            else {
                contextObj.notificationService.ShowToaster("No Cost Category Rates exist", 2);
                contextObj.enableMenu = [1];
            }
        })
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

    addClick() {
        this.btnName = "Save";
        this.action = "add";
        this.pageTitle = "New Cost Category Rate";
        var contextObj = this;
        this.fieldDetailsAddEdit = [];
        this.fieldDetailsAddEdit = this.fieldDetailsAddEdit.concat(this.fieldObject)
        this.splitviewCostCategoryInput.showSecondaryView = !this.splitviewCostCategoryInput.showSecondaryView;
        this.spaceService.AddCostCategoriesRates().subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
        })
    }

    editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Cost Category Rate";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            var reportFieldArray = new Array<ReportFieldArray>();
            contextObj.ddlFieldObject.FieldValue = contextObj.SelectedCostCategoryId;
            reportFieldArray.push({
                ReportFieldId: 742,
                Value: contextObj.SelectedCostCategoryId
            });
            this.spaceService.EditCostCategoriesRates(this.inputItems.selectedIds[0], JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                contextObj.splitviewCostCategoryInput.showSecondaryView = !contextObj.splitviewCostCategoryInput.showSecondaryView;
            });
        }
    }

    deleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Cost Category Rate to delete", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    }

    submitReturnData(event) {
        let retUpdatedSrc; 
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
            this.enableMenu = [1, 2, 3];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewCostCategoryInput.showSecondaryView = !contextObj.splitviewCostCategoryInput.showSecondaryView;
    }

    deleteCostCategoryRate() {
        var contextObj = this;
        contextObj.spaceService.DeleteCostCategoryRate(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.itemsSource.length < 1) {
                    contextObj.enableMenu = [1];
                    contextObj.notificationService.ShowToaster("Selected Cost Category Rate deleted", 3);
                    contextObj.notificationService.ShowToaster("No Cost Category Rates exist", 3);

                }
                else
                    contextObj.notificationService.ShowToaster("Selected Cost Category Rate deleted", 3);
            }
            else if (resultData["Data"].Message == "Already in use") {
                contextObj.notificationService.ShowToaster("Selected Cost Category Rate in use, cannot be deleted", 5);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        contextObj.notificationService.ShowToaster("Selected Cost Category Rate in use, cannot be deleted", 5);
                        break;
                }
            }
        });
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteCostCategoryRate();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}


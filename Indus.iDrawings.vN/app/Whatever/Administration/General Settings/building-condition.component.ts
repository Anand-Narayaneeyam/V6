import { Component, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField } from '../../../Framework/Models/Interface/IField'
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent } from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions } from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';


@Component({
    selector: 'building-condition',
    templateUrl: './app/Views/Administration/General Settings/building-condition.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, DropDownListComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
})

export class BuildingConditionComponent {

    fieldObject: IField[];
    fieldObjAdd: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    enableMenu = [1];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 6193
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 6194
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 6195
        }

    ];

    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    refreshgrid;
    alignContent;

    showaddedit: boolean = false;
    showslide: boolean = false;
    slideTitle: string = "";
    ConfirmDeleteMsg: string = "";
    private slideType: string = "";
    private selectedId = 0;


    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit() {

        this.getBuildingConditionListFields();
        this.getBuildingConditionList();
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

    public onSort(objGrid: any) {
        this.getBuildingConditionList();
    }

    addClick() {

        this.selectedId = 0;
        this.showaddedit = true;
        this.showSlide = true;
        this.slideTitle = "New Building Condition";
        this.slideType = "dialog";
        this.btnName = "Save";
        this.getAddFields();
    }


    editClick() {
        this.selectedId = this.inputItems.selectedIds[0];
        this.showaddedit = true;
        this.showSlide = true;
        this.slideTitle = "Edit Building Condition";
        this.slideType = "dialog";
        this.btnName = "Save Changes";
        this.getEditFields(this.inputItems.selectedIds[0]);
    }

    deleteClick() {

        if (this.inputItems.rowData.InUse == 0) {
            this.selectedId = this.inputItems.selectedIds[0];
            this.showaddedit = false;
            this.showSlide = true;
            this.slideTitle = "iDrawings V6";
            this.slideType = "notification";
            this.ConfirmDeleteMsg = "Are you sure you want to delete the selected Building Condition?";
        }
        else {
            this.notificationService.ShowToaster("Selected Building Condition in use, can't be deleted", 2);
            this.showSlide = false;
        }

    }

    getBuildingConditionListFields() {
        var contextObj = this;
        this.administrationService.getBuildingConditionGridFields().subscribe(function (resultData) {

            debugger
            contextObj.fieldObject = resultData.Data;

        });
        return;
    }

    getBuildingConditionList() {
        var contextObj = this;
        this.administrationService.getBuildingConditionGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            debugger
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {

                contextObj.enableMenu = [1, 2, 3];
            } else {
                contextObj.notificationService.ShowToaster("No Building Conditions exist", 2);
                contextObj.enableMenu = [1];
            }

        });

    }

    getAddFields() {
        debugger
        var contextObj = this;
        var selId = 0;
        this.administrationService.getBuildingConditionAddEditFields(selId).subscribe(function (resultData) {
            debugger
            contextObj.fieldObjAdd = resultData.Data;
        });
        return;
    }

    getEditFields(selId: number) {
        debugger
        var contextObj = this;
        this.administrationService.getBuildingConditionAddEditFields(selId).subscribe(function (resultData) {
            debugger
            contextObj.fieldObjAdd = resultData.Data;
        });
        return;
    }

    private onSubmitData(event) {
        event.fieldobject = JSON.parse(event.fieldobject);

        event.fieldobject = event.fieldobject.filter(function (item) {

            return item.ReportFieldId != 6691;
        });

        var context = this;
        if (context.selectedId == 0) {

            this.administrationService.postBuildingConditionInsert(JSON.stringify(event.fieldobject)).subscribe(function (resultData) {

               
                debugger

                switch (resultData["Data"].StatusId) {

                    case 1:
                        context.notificationService.ShowToaster("Building Condition added", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        context.showaddedit = false;
                        context.showSlide = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Building Condition already exists", 2);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            context.notificationService.ShowToaster("Building Condition already exists", 2);
                        }
                        break;
                    case 0:
                        context.showaddedit = false;
                        context.showSlide = false;
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                }

            });
        } else {
            this.administrationService.postBuildingConditionUpdate(JSON.stringify(event.fieldobject), context.selectedId).subscribe(function (resultData) {

                debugger


                switch (resultData["Data"].StatusId) {

                    case 1:
                        context.notificationService.ShowToaster("Building Condition updated", 3);
                        context.updateGrid({ "returnData": resultData["Data"].Data }, context.selectedId);
                        context.showaddedit = false;
                        context.showSlide = false;
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Building Condition already exists", 2);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            context.notificationService.ShowToaster("Building Condition already exists", 2);
                        }
                        break;
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        context.showaddedit = false;
                        context.showSlide = false;
                        break;
                }


            });
        }

        debugger
    }


    yesOnClick(event) {
        var context = this;
        var selId = this.inputItems.selectedIds[0];
        this.administrationService.postBuildingConditioDelete(selId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 1:
                    context.showaddedit = false;
                    context.showSlide = false;
                    context.notificationService.ShowToaster("Selected Building Condition deleted", 3);
                    let retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                    context.itemsSource = retUpdatedSrc["itemSrc"];
                    context.totalItems = retUpdatedSrc["itemCount"];
                    if (context.itemsSource.length < 1) {
                        context.enableMenu = [1];
                    }
                    break;
                case 0:
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    context.showaddedit = false;
                    context.showSlide = false;
                    break;
                case 3:
                    context.notificationService.ShowToaster("Selected Building Condition in use, can't be deleted", 2);
                    context.showaddedit = false;
                    context.showSlide = false;
                    break;
            }
        });

    }

    private updateGrid(event, selId) {

        let retUpdatedSrc;
        var context = this;
        context.refreshgrid = [];
        if (selId == 0) {
            debugger
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.itemsSource = retUpdatedSrc["itemSrc"];
            context.totalItems = retUpdatedSrc["itemCount"];
            if (context.totalItems > 0) {
                context.enableMenu = [1, 2, 3];
            }
        } else {
            debugger
            context.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }

    }

    closeSlide(value: any) {

        this.showSlide = value.value;
        this.showaddedit = false;
    }


}
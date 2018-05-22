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
import { SeasonsAddEditComponent } from './seasons-addedit.component';

@Component({
    selector: 'seasons-component',
    templateUrl: './app/Views/Administration/General Settings/seasons.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent, SeasonsAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
})

export class SeasonsComponent {

    fieldObject: IField[];
    fieldDetailsAdd: IField[];
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
            "privilegeId": 6201
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 6202
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 6203
        }

    ];
    pageTitle: string;
    selectedId: number;
    showSlide: boolean = false;
    slideTitle: string;
    slideType: string;
    slideMessage: string;
    ddlDisableShowSelect = [2878, 2879, 2880, 2882];
    refreshgrid;
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }
    ngOnInit() {
        this.getSeasonsListFields();
        this.getSeasonsnList();
    }

    getSeasonsListFields() {
        var contextObj = this;
        this.administrationService.getSeasonsGridFields().subscribe(function (resultData) {
            debugger
            contextObj.fieldObject = resultData.Data;
        });
        return;
    }
    getSeasonsnList() {
        var contextObj = this;
        contextObj.administrationService.getSeasonsGridData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            debugger
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {

                contextObj.enableMenu = [1, 2, 3];
            } else {
                contextObj.notificationService.ShowToaster("No Seasons exist", 2);
                contextObj.enableMenu = [1];
            }
        });

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
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "New Season";
        this.btnName = "Save";
        this.getAddEditFields(0);
    }

    editClick() {
        this.splitviewInput.showSecondaryView = true;
        this.pageTitle = "Edit Season";
        this.btnName = "Save Changes";
        this.selectedId = this.inputItems.selectedIds[0];
        this.getAddEditFields(this.inputItems.selectedIds[0]);
    }

    deleteClick() {

        var context = this;
        if (context.inputItems.selectedIds[0] != undefined) {
            context.selectedId = context.inputItems.selectedIds[0];
            context.administrationService.checkSeasonInUse(context.selectedId).subscribe((resultData) => {
                if (resultData == 0) {
                    context.showSlide = true;
                    context.slideTitle = "iDrawings V6";
                    context.slideType = "notification";
                    context.slideMessage = "Are you sure you want to delete the selected Season?";
                }
                else if (resultData == 1)
                {
                    context.notificationService.ShowToaster("Selected Season in use, cannot be deleted", 2);
                }
            });
        }
    }

    getAddEditFields(selId: number) {

        var context = this;
        context.action = "add";
        if (selId == 0) {
            context.administrationService.getSeasonsAddEditFields(0).subscribe(function (resultData) {
                debugger
                context.fieldDetailsAdd = resultData.Data;
                context.clearDDlShowSelect(context.fieldDetailsAdd);
                context.styleForm(context.fieldDetailsAdd);
                context.setAsValidated(context.fieldDetailsAdd);
            });

            return;
        }
        else if (selId > 0) {
            context.action = "edit";
            debugger
            var seasonFrmGrid = context.inputItems.rowData.Season;
            var startDateRawFrmGrid = context.inputItems.rowData.Start;
            startDateRawFrmGrid = startDateRawFrmGrid.split(" ");
            var startDayFromGrid = startDateRawFrmGrid[0];
            var startMonthFrmGrid = startDateRawFrmGrid[1];
            var endDateRawFrmGrid = context.inputItems.rowData.End;
            endDateRawFrmGrid = endDateRawFrmGrid.split(" ");
            var endDayFromGrid = endDateRawFrmGrid[0];
            var endMonthFrmGrid = endDateRawFrmGrid[1];


            context.administrationService.getSeasonsAddEditFields(0).subscribe(function (resultData) {
                context.fieldDetailsAdd = resultData.Data;
                context.clearDDlShowSelect(context.fieldDetailsAdd);
                context.styleForm(context.fieldDetailsAdd);
                context.setAsValidated(context.fieldDetailsAdd);

                var seasonField = context.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 2877;
                });
                seasonField.FieldValue = seasonFrmGrid;
                var startMonthField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2878; });
                var monthDetails = Month.find(function (e) { return e.MCode == startMonthFrmGrid; });
                for (var i = 0; i < startMonthField.LookupDetails.LookupValues.length; i++) {
                    if (startMonthField.LookupDetails.LookupValues[i].Id == monthDetails.Id) {
                        startMonthField.FieldValue = startMonthField.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
                var startDayField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2879; });
                var daysForStart = context.getDaysForMonth(startMonthField.FieldValue);
                startDayField.LookupDetails.LookupValues = [];
                context.generateLookUpValuesFor(startDayField, daysForStart);
                for (var i = 0; i < startDayField.LookupDetails.LookupValues.length; i++) {

                    if (startDayField.LookupDetails.LookupValues[i].Id == startDayFromGrid) {
                        startDayField.FieldValue = startDayField.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
                var endMonthField = context.fieldDetailsAdd.find(function (item) {
                    return item.FieldId === 2880;
                });
                var monthDetails = Month.find(function (e) {
                    return e.MCode == endMonthFrmGrid;
                });
                for (var i = 0; i < endMonthField.LookupDetails.LookupValues.length; i++) {

                    if (endMonthField.LookupDetails.LookupValues[i].Id == monthDetails.Id) {
                        endMonthField.FieldValue = endMonthField.LookupDetails.LookupValues[i].Id.toString();
                    }
                }
                var endDayField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2882; });
                var daysForEnd = context.getDaysForMonth(endMonthField.FieldValue);
                endDayField.LookupDetails.LookupValues = [];
                context.generateLookUpValuesFor(endDayField, daysForEnd);
                for (var i = 0; i < endDayField.LookupDetails.LookupValues.length; i++) {
                    if (endDayField.LookupDetails.LookupValues[i].Id == endDayFromGrid) {
                        endDayField.FieldValue = endDayField.LookupDetails.LookupValues[i].Id.toString();
                    }
                }

            });
            return;
        }

    }

    getDaysForMonth(fValue) {


        var daysFor = Month.find(function (item) {

            return item.Id == fValue;

        });

        return daysFor.NoDays;


    }

    generateLookUpValuesFor(startDayField, daysFor) {

        for (var i = 1; i <= daysFor; i++) {

            startDayField.LookupDetails.LookupValues.push({ Id: i, Value: "" + i, IsChecked: null });
        }

        debugger

    }

    setAsValidated(fieldDetailsAdd) {

        var context = this;
        var startMonthValField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2878; });
        var startDayField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2879; });
        var endMonthValField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2880; });
        var startDayValField = context.fieldDetailsAdd.find(function (item) { return item.FieldId === 2882; });

        startMonthValField.IsValidated = true;
        startDayField.IsValidated = true;
        endMonthValField.IsValidated = true;
        startDayValField.IsValidated = true;

        return;
    }

    styleForm(fieldDetailsAdd) {

        fieldDetailsAdd.find(function (item) { if (item.FieldId == 2878) { return item.FieldLabel = "Start"; } });
        fieldDetailsAdd.find(function (item) { if (item.FieldId == 2879) { return item.FieldLabel = ""; } });
        fieldDetailsAdd.find(function (item) { if (item.FieldId == 2880) { return item.FieldLabel = "End"; } });
        fieldDetailsAdd.find(function (item) { if (item.FieldId == 2882) { return item.FieldLabel = ""; } });

        return;

    }


    clearDDlShowSelect(fieldDetailsAdd) {
        for (var i = 0; i < this.fieldDetailsAdd.length; i++) {
            if (this.ddlDisableShowSelect.indexOf(this.fieldDetailsAdd[i].FieldId) > -1) {
                this.fieldDetailsAdd[i].ShowSelect = false;
                this.fieldDetailsAdd[i].FieldValue = this.fieldDetailsAdd[i].LookupDetails.LookupValues[0].Id.toString();;
            }
        }
        return;
    }

    public onSort(objGrid: any) {
        this.getSeasonsnList();
    }

    closeSlide(event) {
        this.showSlide = false;
    }

    public onSplitViewClose(event) {
        this.splitviewInput.showSecondaryView = false;
    }

    yesOnClick(event: Event) {

        this.deleteSeasons();
        this.showSlide = false;
    }
    deleteSeasons() {
        var context = this;
        context.administrationService.postSeasonDelete(this.selectedId).subscribe(function (resultData) {
            debugger
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "delete", '', context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                context.itemsSource = retUpdatedSrc["itemSrc"];
                context.totalItems = retUpdatedSrc["itemCount"];
                if (context.totalItems > 0) {
                    context.enableMenu = [1];
                }
                else {
                    context.notificationService.ShowToaster("No Seasons exist", 2);
                    context.enableMenu = [1];
                }

                context.notificationService.ShowToaster("Selected Season deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            context.notificationService.ShowToaster("Selected Season in use, cannot be deleted", 2);
                        }
                        else if (resultData["Data"].ServerId == -2) {
                            context.notificationService.ShowToaster("Selected Season in use, cannot be deleted", 2);
                        }
                        break;
                }
            }
        });
        return;
    }

    cancelClick(event: Event) {
        this.showSlide = false;
    }

    submitReturn(event) {
        debugger
        let retUpdatedSrc;
        var context = this;
        context.splitviewInput.showSecondaryView = false;
        context.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = context.generFun.updateDataSource(context.itemsSource, "add", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.totalItems = retUpdatedSrc["itemCount"];
            context.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(context.itemsSource, "edit", event, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
            context.refreshgrid = context.refreshgrid.concat([true]);
        }

    }

}

var Month = [{ Id: 1, MCode: "Jan", NoDays: 31 },
{ Id: 2, MCode: "Feb", NoDays: 29 },
{ Id: 3, MCode: "Mar", NoDays: 31 },
{ Id: 4, MCode: "Apr", NoDays: 30 },
{ Id: 5, MCode: "May", NoDays: 31 },
{ Id: 6, MCode: "Jun", NoDays: 30 },
{ Id: 7, MCode: "Jul", NoDays: 31 },
{ Id: 8, MCode: "Aug", NoDays: 31 },
{ Id: 9, MCode: "Sep", NoDays: 30 },
{ Id: 10, MCode: "Oct", NoDays: 31 },
{ Id: 11, MCode: "Nov", NoDays: 30 },
{ Id: 12, MCode: "Dec", NoDays: 31 }];
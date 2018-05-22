import {Component, OnInit, Input} from '@angular/core';
import {NgControl} from '@angular/common';
import {IField} from  '../../../Framework/Models/Interface/IField';
import {AdministrationService} from '../../../Models/Administration/administration.service';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import {ValidateService} from '../../../framework/models/validation/validation.service';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';

@Component({
    selector: 'AssignSymbol',
    templateUrl: './app/Views/Administration/SymbolLibrary/AssignSymbol.html',
    directives: [SplitViewComponent, SlideComponent, Notification, PageComponent, DropDownListComponent, GridComponent, Sorting],
    providers: [NotificationService, AdministrationService, ValidateService],
})
export class SymbolAssign {
    fieldObject: IField[];
    ddlField1: IField;
    ddlField2: IField;
    totalItems: number = 0;
    pageTitle: string;
    alignContent: string;
    btnName: string;
    action: string;
    types: boolean = true;
    itemsSource: any[];
    itemsSourceCopy: any[] = [];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, selectioMode: 'single', allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    org_Name: number;
    Module: number;
    ShowCheckbox: boolean = false;
    totalSelectedBox: any[] = [];
    checkedItemSource: any[] = []
    showSlide = false;
    Symbol: string = "";
    position = "top-right";
    message: any;
    disableBtn = false;
    refreshgrid;



    constructor(private notificationService: NotificationService, private administrationService: AdministrationService, private validateService: ValidateService) {

    }

    ngOnInit() {

        var contextObj = this;
        contextObj.alignContent = "horizontal";
        contextObj.administrationService.AssignSymbolFeilds().subscribe(function (resultData) {

            contextObj.ddlField1 = resultData["Data"].find(function (item) { return item.FieldId == 3056 });
            contextObj.ddlField2 = resultData["Data"].find(function (item) { return item.FieldId == 3057 });
            contextObj.fieldObject = resultData["Data"].splice(3);
            contextObj.fieldObject.find(function (item) { return item.FieldId === 3059 }).IsEnabled = false;
        });
    }

    onChange(event: any, target: number) {
        var contextObj = this;
        var dropdownId = +event;  //dont remove the + sign

        if (target == 1) {
            contextObj.checkedItemSource = [];
            contextObj.ShowCheckbox = false;
            contextObj.ddlField2.FieldValue = "-1";
            if (dropdownId == -1) {
                contextObj.ddlField2.LookupDetails.LookupValues = [];
                var el = <HTMLElement>document.getElementById(this.ddlField2.FieldId.toString());
                this.validateService.initiateValidation(this.ddlField2, this, true, el)
            }
            else {

                contextObj.org_Name = dropdownId;
                contextObj.administrationService.loadModuleddl(3056, dropdownId).subscribe(function (resultData) {

                    if (resultData["Data"]["LookupValues"] != null && resultData["Data"]["LookupValues"] != undefined && resultData["Data"]["LookupValues"] != "") {
                        contextObj.ddlField2.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                        var el = <HTMLElement>document.getElementById(contextObj.ddlField2.FieldId.toString());
                        contextObj.validateService.initiateValidation(contextObj.ddlField2, contextObj, true, el)
                    }
                });
            }


        }
        else {
            contextObj.ShowCheckbox = !(dropdownId == -1);
            contextObj.Module = dropdownId;
            contextObj.checkedItemSource = [];
            if (contextObj.org_Name != undefined && contextObj.Module != undefined) {
                this.dataLoad();
            }
        }
        contextObj.disableBtn = contextObj.ddlField2.HasValidationError || contextObj.ddlField1.HasValidationError;

    }

    dataLoad(): void {
        var contextObj = this;
        var reportfieldIdArray: ReportFieldIdValues[] = [];
        reportfieldIdArray.push({
            ReportFieldId: 679,
            Value: contextObj.Module,
            },
            {
            ReportFieldId: 676,
            Value: contextObj.org_Name,
        });
        contextObj.administrationService.loadCheckBoxDataSort(JSON.stringify(reportfieldIdArray), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            var tempItemSource = [];
            tempItemSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.itemsSourceCopy = tempItemSource.slice();
            contextObj.updateCheckedItemSource();

            for (var i = 0; i < tempItemSource.length; i++) {
                tempItemSource[i]["Select All"] = false;
            }
            contextObj.itemsSource = tempItemSource;
        });
    }

    updateCheckedItemSource() {
        var contextObj = this;
        contextObj.checkedItemSource = contextObj.itemsSourceCopy.filter(function (item) {
            return item["Select All"] == 1;
        });
    }
    onSort(objGrid: any) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;

        var contextObj = this;
        contextObj.refreshgrid = [];
        if (contextObj.org_Name != undefined && contextObj.Module != undefined) {
            this.dataLoad();
        }

    }

    onSubmit(event: any) {
        var contextObj = this;
        var reportfieldIdArray = contextObj.getReportFieldArray();
        if (reportfieldIdArray.find(function (item) { return item.ReportFieldId === 677 }) == undefined) {
            contextObj.notificationService.ShowToaster("Select at least one Symbol", 2);
            return;
        }
        var stringArray = [];
        stringArray = contextObj.getExistingSource();
        contextObj.message = "Symbol(s) '" + stringArray.join(", ") + "' already assigned to the Customer, Do you want to overwrite the existing Symbol(s) ?";
        if (stringArray.length > 0) {
            contextObj.showSlide = true;
        }
        else {
            contextObj.updateAssignSymbol();
        }
    }

    getExistingSource(): string[] {
        var contextObj = this;
        var stringArray = [];
        for (var i = 0; i < contextObj.checkedItemSource.length; i++) {

            contextObj.itemsSource.find(function (item) {
                if (item.Id == contextObj.checkedItemSource[i].Id && (item["Select All"] == true || item["Select All"] == 1)) {
                    stringArray.push(item.Symbol);
                    return true;
                }
                return false;
            });
        }
        return stringArray;
    }

    getReportFieldArray(): ReportFieldIdValues[] {
        var contextObj = this;
        var reportfieldIdArray: ReportFieldIdValues[] = [];
        reportfieldIdArray.push({
            ReportFieldId: 679,
            Value: contextObj.Module,
        });
        for (var i = 0; i < contextObj.itemsSource.length; i++) {
            if (contextObj.itemsSource[i]["Select All"] == true)
                reportfieldIdArray.push({
                    ReportFieldId: 677,
                    Value: contextObj.itemsSource[i].Id
                });
        }
        reportfieldIdArray.push({
            ReportFieldId: 676,
            Value: contextObj.org_Name,
        });

        return reportfieldIdArray;
    }

    ok(event: Event) {
        this.showSlide = !this.showSlide;
        var contextObj = this;
        this.getReportFieldArray();
        this.updateAssignSymbol();
    }

    updateAssignSymbol() {
        var contextObj = this;
        contextObj.administrationService.UpdateAssignSymbol(JSON.stringify(contextObj.getReportFieldArray())).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                contextObj.notificationService.ShowToaster("Symbols assigned to the Customer", 2);
                contextObj.itemsSourceCopy = JSON.parse(resultData["Data"].Data);
                contextObj.updateCheckedItemSource();
            } else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });
    }


    cancel(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}



interface ReportFieldIdValues {
    ReportFieldId: number,
    Value: any
}

import { ViewEncapsulation, Component, AfterViewInit, OnInit } from '@angular/core';
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
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';

@Component({
    selector: 'assign-equipment-calendar',
    templateUrl: './app/Views/WorkOrder/Maintenance/assign-equipment-calendar.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
        SlideComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, WorkOrdereService],
    encapsulation: ViewEncapsulation.None,
})

export class AssignEquipmentCalendar implements OnInit {

    fieldObject: IField[];
    formFieldObj: IField[];
    fieldObjUpdate: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: true, selectioMode: "single", isHeaderCheckBx: true };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    refreshgrid;
    alignContent;
    showButton: boolean = false;
    showaddedit: boolean = false;
    showslide: boolean = false;
    slideTitle: string = "";
    ConfirmDeleteMsg: string = "";
    private slideType: string = "";
    private selectedId = 0;
    totalItem: number = 0;
    firstDropDownId: number = 0;
    secondDropDownId: number = 0;
    showCalendar: boolean = false;
    isClass: boolean = false;
    rptCat: any = [];
    constructor(private administrationServices: AdministrationService, private workOrderService: WorkOrdereService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit() {
        this.btnName = "Save Changes";
        this.getAssignEquipFormFields();
        this.getAssignEquipCalFieldsOnCategorySelected();
    }

    getAssignEquipFormFields() {
        var contextObj = this;
        this.workOrderService.getAssignEquipmentCalDDlFields().subscribe(function (resultData) {
            contextObj.fieldObject = [];
            contextObj.formFieldObj = resultData.Data;
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2930 });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2931 });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2932 });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2933 });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2934 });
            contextObj.formFieldObj = contextObj.formFieldObj.filter(function (item) { return item.FieldId != 2935 });
            contextObj.inputItems.isHeaderCheckBx = true;
        });
        return;
    }

    getAssignEquipCalFieldsOnCategorySelected() { // Category DDL-1
        var contextObj = this;
        this.workOrderService.getAssignEquipmentCalDDlFields().subscribe(function (resultData) {
            contextObj.fieldObject = [];
            contextObj.fieldObject = resultData.Data;
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2910 });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2911 });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2933 });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2934 });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2935 });
            contextObj.inputItems.isHeaderCheckBx = true;
        });
        return;
    }

    getAssignEquipCalFieldsOnClassSelected() {    //Class DDL-2
        var contextObj = this;
        this.workOrderService.getAssignEquipmentCalDDlFields().subscribe(function (resultData) {
            contextObj.fieldObject = [];
            contextObj.fieldObject = resultData.Data;
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2910 });
            contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return item.FieldId != 2911 });
            var EqClassField = contextObj.fieldObject.find(function (item) { return item.FieldId === 2931 });
            EqClassField.FieldLabel = "Equipment No.";
        });
        return;
    }

    getAssignEquipCalList(isClassSelected: number, parentId: number, classId: number, sortStatus: number) {
        var context = this;
        var tempField = [];
        if (isClassSelected == 0) {            
            context.isClass = false;
            tempField.push({ ReportFieldId: 4491, Value: "" + parentId });
            tempField.push({ ReportFieldId: 657, Value: "0" });
            try { context.fieldObject = []; this.getAssignEquipCalFieldsOnCategorySelected(); }
            catch (Error) { context.notificationService.ShowToaster("Unknown Error", 5); }
        } else {            
            context.isClass = true;
            tempField.push({ ReportFieldId: 4491, Value: "" + parentId });
            tempField.push({ ReportFieldId: 657, Value: "" + classId });
            try { context.fieldObject = []; this.getAssignEquipCalFieldsOnClassSelected(); }
            catch (Error) { context.notificationService.ShowToaster("Unknown Error", 5); }
        }
        if (sortStatus == 0) {
            context.workOrderService.getAssignEquipCalData(0, "", "ASC", isClassSelected, JSON.stringify(tempField)).subscribe(function (resultData) {
                try { context.itemsSource = []; context.itemsSource = JSON.parse(resultData.Data.FieldBinderData); }
                catch (Error) { context.notificationService.ShowToaster("Unknown Error", 5); }
            });
        }
        else if (sortStatus == 1) {
            context.workOrderService.getAssignEquipCalData(context.pageIndex, context.inputItems.sortCol, context.inputItems.sortDir, isClassSelected, JSON.stringify(tempField)).subscribe(function (resultData) {
                try { context.itemsSource = []; context.itemsSource = JSON.parse(resultData.Data.FieldBinderData); }
                catch (Error) { context.notificationService.ShowToaster("Unknown Error", 5); }
            });
        }
        return;
    }
    ddlChange(event) {
        var context = this;
        if (event.ddlRelationShipEvent.ChildFieldObject.FieldId == 2910) {
            context.notificationService.ClearAllToasts();
            var parentId = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
            parentId = parseInt(parentId);
            context.firstDropDownId = parentId;
            context.workOrderService.getLookUpsForEquipmentClassDDL(parentId).subscribe(function (resultData) {
                var EqClassField = context.formFieldObj.find(function (item) { return item.FieldId === 2911; });
                EqClassField.LookupDetails.LookupValues = [];
                if (resultData.Data.LookupValues.length > 0) {
                    EqClassField.LookupDetails.LookupValues = resultData.Data.LookupValues;
                    EqClassField.FieldValue = "-1";
                    context.showButton = true;
                } else {
                    context.notificationService.ShowToaster("No Equipment Classes exist", 2);
                    context.showButton = false;
                    EqClassField.FieldValue = "-1";
                }
            });

            this.getAssignEquipCalList(0, parentId, 0, 0);
        }
        else if (event.ddlRelationShipEvent.ChildFieldObject.FieldId == 2911) {
            context.notificationService.ClearAllToasts();
            var childId = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
            childId = parseInt(childId);
            context.secondDropDownId = childId;
            var catField = context.formFieldObj.find(function (item) { return item.FieldId === 2910; });
            var classField = event.ddlRelationShipEvent.ChildFieldObject;

            if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue != "-1") {
                this.getAssignEquipCalList(1, context.firstDropDownId, context.secondDropDownId, 0);
                this.isClass = true;
            } else {

                this.getAssignEquipCalList(0, context.firstDropDownId, 0, 0);
                this.isClass = false;
            }
        }
        return;
    }

    public onSort(objGrid: any) {
        var context = this;
        if (context.isClass == false) { context.getAssignEquipCalList(0, context.firstDropDownId, 0, 1); }
        else if (context.isClass == true) { context.getAssignEquipCalList(1, context.firstDropDownId, context.secondDropDownId, 1); }
    }

    private onSaveChanges() {
        var context = this;
        this.rptCat = [];
        this.rptCat = context.getCheckedRows(context.itemsSource);
        if (context.rptCat.length > 0) {
            context.getFieldsForUpdate();
            context.showSlide = true;
            context.showCalendar = true;
            context.slideType = "dialog";
            context.slideTitle = "Set Calendar";
        } else {
            context.notificationService.ShowToaster("Select Equipment(s)", 2);
        }
    }

    getFieldsForUpdate() {
        var contextObj = this;
        this.workOrderService.getAssignEquipmentUpdateFields().subscribe(function (resultData) {
            contextObj.fieldObjUpdate = resultData.Data;
        });
        return;
    }
    getCheckedRows(itemsSource: any) {
        var tempField = [];
        for (var i = 0; i < itemsSource.length; i++) {
            if (itemsSource[i]["Select All"] == true) {
                tempField.push({ Id: itemsSource[i]["Id"] });
            }
        }
        return tempField;
    }

    yesOnClick(event) {

        var CalendarId;
        var context = this;
        var reportField = [];
        var updateField = this.fieldObjUpdate.find(function (item) { return item.FieldId === 2937; });
        if (updateField.FieldValue == "-1") {
            reportField.push({ ReportFieldId: 6150, Value: "0" });
        } else {
            reportField.push({ ReportFieldId: 6150, Value: "" + updateField.FieldValue });
        }
        if (context.isClass == false) {
            for (var i = 0; i < this.rptCat.length; i++) {
                reportField.push({ ReportFieldId: 6149, Value: "" + this.rptCat[i].Id })
            }

        }
        else if (context.isClass == true) {
            for (var i = 0; i < this.rptCat.length; i++) {
                reportField.push({ ReportFieldId: 6147, Value: "" + this.rptCat[i].Id });
            }
        }
        context.UpdateEquipmentCalendar(reportField);
        return;
    }

    UpdateEquipmentCalendar(reportField) {
        var context = this;
        context.workOrderService.postUpdateEquipmentCalendar(JSON.stringify(reportField)).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 1:
                    context.notificationService.ShowToaster("Equipment Calendar updated", 3);
                    context.showSlide = false;
                    this.showCalendar = false;
                    if (context.isClass == false) { context.getAssignEquipCalList(0, context.firstDropDownId, 0, 0); }
                    else if (context.isClass == true) { context.getAssignEquipCalList(1, context.firstDropDownId, context.secondDropDownId, 0); }
                    break;
                case 0:
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                default:
                    context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
            }
        });
    }

    closeSlide(value: any) {

        this.showSlide = value.value;
        this.showCalendar = false;
    }

}
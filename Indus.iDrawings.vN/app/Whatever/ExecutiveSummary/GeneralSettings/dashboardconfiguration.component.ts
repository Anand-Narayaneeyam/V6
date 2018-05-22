import { Component, OnInit, ElementRef, ViewChild, Renderer, Input, AfterViewChecked } from '@angular/core';
import {ExecutiveSummaryService} from '../../../Models/ExecutiveSummary/executivesummary.service';
import {IField} from '../../../Framework/Models//Interface/IField'
import {GridComponent} from '../../../framework/whatever/grid/grid.component';
import { DND_PROVIDERS, DND_DIRECTIVES } from '../../../Framework/ExternalLibraries/dnd/ng2-dnd';
import {IGrid} from '../../../framework/models/interface/igrid';
import { GeneralFunctions} from '../../../Models/Common/General';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'

@Component({
    selector: 'dashboard-config',
    templateUrl: './app/Views/ExecutiveSummary/GeneralSettings/dashboardconfiguration.component.html',
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'selectedUserRole'],
    directives: [DND_DIRECTIVES, FieldComponent, GridComponent],
    //directives: [FieldComponent, Notification, SlideComponent, StringTextBoxComponent, DropDownListComponent, CustomRadioComponent, CustomCheckBoxComponent, ButtonComponent],
    providers: [ExecutiveSummaryService, NotificationService, GeneralFunctions]
})

export class DashBoardConfigurationComponent implements OnInit {
    dragEnable: boolean = false; /*to enable drag and drop option */
    userId: number;
    fieldDetailsDashboardWidgets: IField[];
    isNamesNAN = true;
    @Input() action: string;
    @Input() btnName: string = "Update";
    fieldObjectWidgets: IField;
    itemsSourceWidgets: any[];
    Dragged: boolean = false;
    IsChecked: boolean = true;
    IsSelectAllChecked: boolean;
    reportFieldIds = new Array<ReportFieldArray>();
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: true };

    constructor(private executiveSummaryService: ExecutiveSummaryService, private notificationService: NotificationService) {

    }


    ngOnInit(): void {
        var objContext = this;
        objContext.Dragged = false;
    }

    ngAfterViewInit() {
        var contextObj = this;
        this.executiveSummaryService.GetWidgetFields().subscribe(function (result) {
            contextObj.fieldObjectWidgets = (result["Data"]);
            contextObj.dataLoad();
        });


    }

    public dataLoad() {
        var contextObj = this;
        contextObj.executiveSummaryService.GetAllWidgets(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
           // debugger;
            contextObj.itemsSourceWidgets = JSON.parse(result["Data"].FieldBinderData);
           // contextObj.listWidgets.push(contextObj.itemsSourceAdmin);
        });

        //contextObj.SpS.GetDashboardOrgDistributionData("", contextObj.inputItems.sortDir).subscribe(function (result) {
        //    //contextObj.totalItems = result["Data"].DataCount;
        //    // debugger
        //    contextObj.itemsSourceSpace = JSON.parse(result["Data"].FieldBinderData);

        //});
    }

    selectAllOptions(event: any) {
        //debugger;
        if (this.itemsSourceWidgets != null) {
            if (event.target.checked == true) {
                for (var i = 0; i < this.itemsSourceWidgets.length; i++) {
                    this.itemsSourceWidgets[i].IsSelected = true;
                    this.IsChecked = true;
                }
            }
            else if (event.target.checked == false) {
                for (var i = 0; i < this.itemsSourceWidgets.length; i++) {
                    this.itemsSourceWidgets[i].IsSelected = false;
                    this.IsChecked = false;
                }
            }
        }
    }


    checkedOption(fieldObj): boolean {
        this.Check();
        return fieldObj["IsSelected"]
    }

    updateCheckedOptions(widget, event) {
        widget["IsSelected"] = !widget["IsSelected"];
        this.Check();
    }


    Check() {
        if (this.itemsSourceWidgets != null) {
           // debugger;
            var count = 0;
            for (let i = 0; i < this.itemsSourceWidgets.length; i++) {
                if (this.itemsSourceWidgets[i].IsSelected == true) {
                    count++;
                }
            }

            if (count == this.itemsSourceWidgets.length) {
                this.IsSelectAllChecked = true;
            }
            else {
                this.IsSelectAllChecked = false;
            }
        }
    }

    changecursorstyle(MouseEvent) {
        var MouseElement: any = MouseEvent.srcElement;
        if (MouseElement)
            MouseElement.style.cursor = "pointer";
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataLoad();
    }

    ondragEnd(event) {
        console.log(event);
        if (event == true)
            this.Dragged = true;
    }

    SaveClick() {
        var contextObj = this;
        var posCount = 0;
        contextObj.reportFieldIds = [];
        debugger;
        for (let i = 0; i < this.itemsSourceWidgets.length; i++) {
            if (this.itemsSourceWidgets[i].IsSelected == true) {
               // this.itemsSourceWidgets[i].Position
                posCount++;
                this.reportFieldIds.push({
                    ReportFieldId: parseInt(this.itemsSourceWidgets[i].Id),
                    Value: posCount
                });
            }
        }

        if (posCount == 0) {
            contextObj.notificationService.ShowToaster("At least one dashboard widget needs to be selected", 2);
        }
        else {
            contextObj.postUpdateWidgetPreferences();
        }
    }

    postUpdateWidgetPreferences() {
        var contextObj = this;
        this.executiveSummaryService.postWidgetPreferences(JSON.stringify(contextObj.reportFieldIds)).subscribe(function (result) {
            debugger;
            contextObj.notificationService.ShowToaster("Dashboard Configuration updated", 3);
            //if (result["Data"].StatusId == 1) {

            //}
            //else {
            //    contextObj.showDispSetSlide = false;
            //}
            //contextObj.disableBtnSave = false;
            //console.log("after save", contextObj.dispSettingObject);
            //contextObj.emitdisplaySetting.emit({ "dispSettingObject": contextObj.dispSettingObject, "IsDragged": contextObj.Dragged });
        });
    }


    onSubmitData(event) {
        var contextObj = this;
         debugger;
        if (contextObj.isNamesNAN) {
            switch (this.action) {
                case "add":
                    this.postSubmit(contextObj, event["fieldobject"], 1);
                    break;
                case "edit":
                    this.postSubmit(contextObj, event["fieldobject"], 2);
                    break;
            }
        }
    }

    postSubmit(contextObj, strsubmitField: string, target: number) {
    }

}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: number;

}
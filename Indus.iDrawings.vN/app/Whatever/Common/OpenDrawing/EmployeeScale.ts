import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { SpaceService } from '../../../Models/space/space.service';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {EmployeeService} from '../../../Models/Employee/employee.services';


@Component({
    selector: 'Employee-Scale',
    templateUrl: './app/Views/Common/OpenDrawing/EmployeeScale.html',
    directives: [FieldComponent, Notification, SubMenu, ConfirmationComponent, SlideComponent, SplitViewComponent],
    providers: [HTTP_PROVIDERS, SpaceService, NotificationService, GeneralFunctions, EmployeeService],
    inputs: ['selectedId', 'action', 'fieldDetails', 'btnName', 'pageTarget'],

})


export class EmployeeScale implements OnInit {
    pageTarget: number;
    fieldObject: IField[];
    fieldDetailsAdd1: IField[] = [];
    // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: 'single' };
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    btnName: string;
    enableMenu: number[];
    @Input() action: string;
    @Input() fieldDetails: IField[];
    @Output() submitSuccess = new EventEmitter();
    pageTitle: string;
    totalItems: number = 0;
    showSlide = false;
    position = "top-right";
    message = "";
    constructor(private notificationService: NotificationService, private generalFunctions: GeneralFunctions, private EmployeeService: EmployeeService) {
    }
    ngOnInit() {
        var contextObj = this;
        contextObj.EmployeeService.ScaleEmployeefield().subscribe(function (resultData) {
            debugger
            contextObj.fieldDetails = resultData["Data"];
            var employeescale = contextObj.fieldDetails.find(function (item) { return item.ReportFieldId === 618 })
            if (contextObj.pageTarget == 1) {
                employeescale.FieldLabel = "Employee Text Height (%)";
            }
            else if (contextObj.pageTarget == 2) {
                contextObj.btnName = "Save";
                employeescale.FieldLabel = "Angle of rotation (anti-clockwise) ";
            }
        });
    }
    onSubmitData(event) {
        debugger
        var contextObj = this;
        var ScaleFactor = JSON.parse(event.fieldobject)[0].Value;
        if (this.pageTarget == 2) {
            if (ScaleFactor < 0 || ScaleFactor > 360) {
                contextObj.notificationService.ShowToaster("Enter angle of rotation between 0 and 360", 2);
                return;
            }
            else
                ScaleFactor = Number(JSON.parse(event.fieldobject)[0].Value).toFixed(0);
        }
        else {
            var fieldReportFieldId = JSON.parse(event.fieldobject)[0].ReportFieldId;
            var toBeDisplayed = contextObj.fieldDetails.find(function (el) { return el.ReportFieldId == fieldReportFieldId }).FieldLabel;
            toBeDisplayed = toBeDisplayed.split("(")[0];
            if (ScaleFactor < 10 || ScaleFactor > 1000) {
                contextObj.notificationService.ShowToaster("Enter " + toBeDisplayed + "between 10 and 1000", 2);
                return;
            }
        }
        this.submitSuccess.emit(ScaleFactor);




    }

}
import {Component, EventEmitter, AfterViewInit, Output} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { WorkOrdereService } from '../../../../Models/WorkOrder/workorder.service'
import {IField} from  '../../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {IGrid} from '../../../../Framework/Models/Interface/Igrid'
import { Notification} from '../../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../../Models/Common/General';
import { AdministrationService } from '../../../../Models/Administration/administration.service';
import { ValidateService } from '../../../../Framework/Models/Validation/validation.service';


@Component({
    selector: 'reviewParts-list',
    templateUrl: './app/Views/WorkOrder/Review/Review Cost/reviewCost-Parts-list.component.html',
    directives: [SubMenu, SplitViewComponent, GridComponent, PagingComponent, FieldComponent,
        Notification, SlideComponent],
    providers: [WorkOrdereService, HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService, ValidateService],
    inputs: ['workrequestId', 'workFlowEntityIds', 'itemsSource', 'totalItems', 'inputItems', 'itemsPerPage', 'enableMenu'],
})

export class ReviewPartsComponent implements AfterViewInit {

    @Output() itemSourceUpdate = new EventEmitter();
    @Output() onSubmit = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onCostUpdate = new EventEmitter();

    fieldObject: IField[];
    workrequestId: number;
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid;
    totalItems: number;
    itemsPerPage: number;
    pageIndex: number = 0;
    secondaryTarget: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
    action: string;
    btnName: string;
    workFlowEntityIds: any[];
    equipmentCategoryId: number = 0;
    cardButtonPrivilege = [false, false];
    enableMenu: number[];
    types: boolean = true;
    pageTitle: string = "Select Parts";
    onFinalSubmitChange: boolean;
     //Form id : 250-- page id 732
     //select * from OWL_Privileges where PageId in(select PageId from OWL_ApplicationForms where Id in (250))
    
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "subMenu": null,
            "privilegeId": null
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "subMenu": null,
            "privilegeId": null
        }//,
        //For privilege
        //{
        //    "id": 3,
        //    "title": "Edit",
        //    "image": null,
        //    "path": null,
        //    "submenu": null,
        //    "isvisible": false,
        //    "privilegeId": 3500
        //}
    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;

    constructor(private administrationServices: AdministrationService, private workOrderService: WorkOrdereService, private notificationService: NotificationService, private generFun: GeneralFunctions, private _validateService: ValidateService) { }

    ngAfterViewInit() {
         
        var contextObj = this;
        // var callBack = function (data) {
        //    contextObj.menuData = data;
        //};
        //contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 723, contextObj.administrationServices, contextObj.menuData.length);
        this.workOrderService.getReviewPartsFields().subscribe(function (result) {
            contextObj.fieldObject = result["Data"];
            contextObj.dataLoad(1);
        });
    }

    public dataLoad(target?: number) {
        var contextObj = this;
        debugger;
        contextObj.workOrderService.getReviewPartsData(contextObj.getWorkFlowEntityReportFieldIdValues()).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [1, 2];
            }
            else {
                contextObj.enableMenu = [1];
            }
            contextObj.itemSourceUpdate.emit({
                itemSource: contextObj.itemsSource,
                rowsPerPage: contextObj.itemsPerPage,
                totalItems: contextObj.totalItems,
                fieldObject: contextObj.fieldObject
            });
        });
    }

    public getWorkFlowEntityReportFieldIdValues() {
        var tempArray: ReportFieldIdValues[] = [];
        for (var item of this.workFlowEntityIds) {
            tempArray.push({
                ReportFieldId: 7498,
                Value: item
            })
        }
        return JSON.stringify(tempArray);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.deleteClick();
                break;
        }
    }

    onPartsSubmit(event) {
        debugger;
        console.log(event);
        var fieldObjectArray: any[] = JSON.parse(event.fieldobject);
        var index = fieldObjectArray.indexOf(fieldObjectArray.find(function (item) { return item.ReportFieldId === 1378 }));
        if (index > -1) {
            fieldObjectArray.splice(index, 1);
        }

        var partsField: IField = this.fieldDetailsAdd1.find(function (item) {
            return item.ReportFieldId === 1378;
        });

        if (partsField.MultiFieldValues != null) {
            for (var item of partsField.MultiFieldValues) {
                fieldObjectArray.push({
                    ReportFieldId: 1378,
                    Value: item
                });
            }
        }
        this.onSubmit.emit(fieldObjectArray); 
        var contextObj = this;
        setTimeout(function () {
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        }, 150);
        
    }

    public onCellUpdate(event) {
        this.onCostUpdate.emit(event);
    }

    public addClick() {
        var contextObj = this;
        contextObj.action = "add";
        contextObj.btnName = "Save";
        contextObj.equipmentCategoryId = 0;
        contextObj.workOrderService.loadReviewPartsAdd(contextObj.getLookupWorkFlowEntityReportFieldIdValues(0, "add")).subscribe(function (resultData) {
            contextObj.fieldDetailsAdd1 = contextObj.updateFieldDetails(resultData["Data"]);
            var partsField: IField = contextObj.fieldDetailsAdd1.find(function (item) {
                return item.ReportFieldId === 1378;
            });
            if (partsField.LookupDetails.LookupValues == null || partsField.LookupDetails.LookupValues.length == 0) {
                contextObj.notificationService.ShowToaster("No Parts exist", 2);
                return;
            }
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    onDropDownChange(event) {
        var contextObj = this;
        switch (event.FieldId) {
            case 1357: /*Equipment Category*/
                contextObj.equipmentCategoryId = event.FieldValue == "-1" ? "0" : event.FieldValue;
                contextObj.workOrderService.loadEquipmentClassforParts(event.FieldValue).subscribe(function (resultData) {
                    debugger;
                    console.log(resultData);
                    var equipmentClassField: IField = contextObj.fieldDetailsAdd1.find(function (item: IField) {
                        return item.FieldId === 1358;
                    });
                    equipmentClassField.LookupDetails.LookupValues = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    equipmentClassField.FieldValue = "-1";
                });
                /*Load Parts Lookup values with respect to Equipment Category*/
                contextObj.workOrderService.getValuesWithDbObjectDetails(50734, contextObj.getLookupWorkFlowEntityReportFieldIdValues(0, "dropDown")).subscribe(function (resultData) {
                    var partsField: IField = contextObj.fieldDetailsAdd1.find(function (item: IField) {
                        return item.FieldId === 1420;
                    });
                    partsField.MultiFieldValues = null;
                    partsField.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    partsField.IsMandatory = partsField.IsEnabled = partsField.LookupDetails.LookupValues.length != 0;
                });
                break;
            case 1358:  /*Load Parts Lookup values with respect to Equipment Class*/
                contextObj.workOrderService.getValuesWithDbObjectDetails(50734, contextObj.getLookupWorkFlowEntityReportFieldIdValues(event.FieldValue == "-1" ? "0" : event.FieldValue, "dropDown")).subscribe(function (resultData) {
                    var partsField: IField = contextObj.fieldDetailsAdd1.find(function (item: IField) {
                        return item.FieldId === 1420;
                    });
                    partsField.MultiFieldValues = null;
                    partsField.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                    partsField.IsMandatory = partsField.IsEnabled = partsField.LookupDetails.LookupValues.length != 0;
                });
                break;
        }
    }

    public getLookupWorkFlowEntityReportFieldIdValues(classId: any, target: string) {
        if (target == "add") {
            var tempArray: LookupReportFieldIdValues[] = [];
            tempArray.push({ FieldId: 1420, ReportFieldId: 4484, Value: classId }, { FieldId: 1420, ReportFieldId: 4485, Value: this.equipmentCategoryId })
            for (var item of this.workFlowEntityIds) {
                tempArray.push({
                    FieldId: 1420,
                    ReportFieldId: 7498,
                    Value: item
                })
            }
            return JSON.stringify(tempArray);
        } else if (target == "dropDown") {
            var tempArray1: ReportFieldIdValues[] = [];
            tempArray1.push({ ReportFieldId: 4484, Value: classId }, { ReportFieldId: 4485, Value: this.equipmentCategoryId })
            for (var item of this.workFlowEntityIds) {
                tempArray1.push({
                    ReportFieldId: 7498,
                    Value: item
                })
            }
            return JSON.stringify(tempArray1);
        }
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a row", 2);
        } else {
            this.showSlide = !this.showSlide;
        }
    }

    public updateFieldDetails(fieldDetailsArray) {
        var contextObj = this;
        fieldDetailsArray.find(function (item: IField) {
            switch (item.ReportFieldId) {
                case 5859:
                    item.FieldValue = contextObj.workFlowEntityIds[0];
                    break;
                case 4491:
                    item.IsMandatory = false;
                    break;
                case 657:
                    item.IsMandatory = false;
                    break;
                default:
                    break;
            }
        });
        return fieldDetailsArray;
    }

    /*slide events*/

    public okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.onDelete.emit(this.inputItems.selectedIds);
    }

    public cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    public closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    public initiateValidation(fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    }
}

interface ReportFieldIdValues {
    ReportFieldId: number;
    Value: any;
}

interface LookupReportFieldIdValues {
    FieldId: number;
    ReportFieldId: number;
    Value: any;
}

import { Component, KeyValueDiffers, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { IField, ILookupValues } from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import {DND_PROVIDERS, DND_DIRECTIVES} from '../../../Framework/ExternalLibraries/dnd/ng2-dnd';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ConfirmationComponent} from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { WorkOrderAdditionalDataFieldomponentAddEdit } from './addl-datafield_addedit.component';
import { FieldValuesComponent } from '../../Common/Additional Data Fields/field-values.component';
import { FieldOrderComponent } from '../../Common/Additional Data Fields/fieldorder.component';
import { FieldRelation } from '../../Common/Additional Data Fields/fieldrelation.component';
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { WorkOrdereService } from '../../../Models/WorkOrder/workorder.service';
import { WorkOrderFieldValuesComponent } from './field-values.component';
import { SetWorkflowEntityDataFields } from './set-workflow-entity-data-fields.component';

@Component({
    selector: 'work-order-additional-datafields',
    templateUrl: './app/Views/WorkOrder/Additional Data Fields/additional-datafields.component.html',
    directives: [FieldRelation, SlideComponent, FieldOrderComponent, DND_DIRECTIVES, DisplaySettingsComponent, PageComponent, SplitViewComponent, FieldComponent, DropDownListComponent, SubMenu, GridComponent, PagingComponent, ConfirmationComponent, FieldValuesComponent, WorkOrderAdditionalDataFieldomponentAddEdit, WorkOrderFieldValuesComponent, SetWorkflowEntityDataFields],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, ConfirmationService, WorkOrdereService],
    inputs: ['addlDataFieldCategoryId']
})

export class WorkOrderAdditionalDataFieldsComponent implements OnInit {

    CategoryId: any;
    position = "top-right";
    showSlide: boolean = false;
    pageIndex: number = 0;
    fieldType: string;

    addlDataFieldCategoryId: any = 0;
    pagePath: string;
    parentsourceData;
    childsourceData;
    parentsourcefieldObject;
    ddlAdditionalDataFieldCategory: IField;
    errorMessage: string;
    menuClickValue: any;
    action: string;
    alignContent: string;
    btnName: string = "Save Changes";
    fieldObject: IField[];
    selId = new Array();
    itemsSource: any[];
    message;
    workTypeId: any;
    dataKey: any[];
    totalItems: number;
    itemsPerPage: number;
    pageTitle: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Id]' }; 
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 9503
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 9503
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,           
            "privilegeId": 9503
        },

        {
            "id": 4,
            "title": "Field Values",
            "image": "FieldValues",
            "path": "FieldValues",
            "submenu": null,
            "privilegeId": 9503
        },
        {
            "id": 5,
            "title": "Set Workflow Entity Data Fields",
            "image": "Set Workflow Entity Data Fields",
            "path": "Set Workflow Entity Data Fields",
            "submenu": null,
            "privilegeId": 9503
        }
    ];
   
    gridcount = 6;
    enableMenu: any[]; 
    differ: any;
    addlDataField: number[];
    ddlParent = {
        "FieldId": 1,
        "FieldName": "Style Name",
        "FieldType": 5,
        "FieldValue": "0",
        "IsMultiValued": true,
        "HasRelation": false,
        "MultiValuedDetails": {
            "LookupValues": [
                {
                    "Id": 1,
                    "Value": "AutoDesk-Color"
                },
                {
                    "Id": 2,
                    "Value": "AutoDesk-MONO"
                }
            ],
            "PopupComponent": null
        },
        "IsMandatory": true,
        "IsVisible": true,
        "IsHiddenLabel": false,
        "ReadOnlyMode": false,
        "NotificationType": ""
    };

    ngOnInit(): void {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.enableMenu = []


        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2439, contextObj.administrationService, contextObj.menuData.length);
      }


    constructor(private generFun: GeneralFunctions, private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private differs: KeyValueDiffers, private workOrdereService: WorkOrdereService) {
        this.differ = differs.find({}).create(null);
        this.btnName = "Add";
        var contextObj = this;

        workOrdereService.getAddtlDataFieldField().subscribe(function (resultData) {
            var updatedData = new Array();/*To notify the watcher about the change*/
            contextObj.ddlAdditionalDataFieldCategory = resultData["Data"].splice(0,1)[0];
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fieldObject = updatedData;
            var fieldtype = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 70 })
            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
            fieldtype["LookupDetails"]["LookupValues"] = newlookup;

            if (contextObj.ddlAdditionalDataFieldCategory.LookupDetails.LookupValues.length == 1) {
                var additionalDataFieldCategoryId = contextObj.ddlAdditionalDataFieldCategory.LookupDetails.LookupValues[0].Id;
                contextObj.ddlAdditionalDataFieldCategory.FieldValue = additionalDataFieldCategoryId.toString();
                contextObj.onChangeDataFieldCategory(additionalDataFieldCategoryId);
            }
        })       
       
    }



    ngDoCheck() {
        var contextObj = this;
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            this.addlDataField = this.inputItems.selectedIds;
            if (this.CategoryId > -1) {
                if (this.itemsSource.length != 0) {
                    if (this.inputItems.rowData.Validated == "True")
                        this.enableMenu = [0, 1, 2, 4, 5]
                    else
                        this.enableMenu = [0, 1, 2, 5]
                }
                else
                    this.enableMenu = [0]
   
            }
            else
                this.enableMenu = [];
        }

       
    }

 
    public onSubMenuChange(event: any) {
        
        this.menuClickValue = event.value;
        if (event.value == 0) 
        {
            this.addClick();
        }
        else if (event.value == 1) 
        {
            this.editClick(this.inputItems.selectedIds);
        }
        else if (event.value == 2) 
        {
            this.deleteClick(this.inputItems.selectedIds);
        }
        else if (event.value == 4) 
        {
            this.fieldValueClick(this.inputItems.selectedIds);
        }
        else if (event.value == 5) 
        {
            this.setWorkflowEntityDataFields();
        }
    }

    OnSuccessfulSubmi(event: any) {
        var contextObj = this;
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            }
            this.itemsSource = retUpdatedSrc["itemSrc"];
            
            this.splitviewInput.showSecondaryView = false;
        }
    }

    public addClick() {
        this.action = "add";
        this.btnName = "Add";
        this.pageTitle = "New Data Field";
        this.splitviewInput.showSecondaryView = true;
    }

    public editClick(id) {
        if (id.length > 0) {
            this.action = "edit";
            this.pageTitle = "Edit Data Field";
            this.btnName = "Save Changes";
            this.splitviewInput.showSecondaryView = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Data Field", 2);
        }
    }

    public deleteClick(id) {
        var contextObj = this;
        var fieldobj1 = new Array<ReportFieldArray>();
        fieldobj1.push({
            ReportFieldId: 16,
            Value: contextObj.CategoryId
        })
        if (id.length > 0) {
            contextObj.workOrdereService.CheckisinUse(fieldobj1, contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == 1)
                    contextObj.message = "Selected Additional Data Field is in use. Are you sure you want to delete?"
                else
                    contextObj.message = "Are you sure you want to delete the selected Additional Data Field?"
            })
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select a Data Field", 2);
        }
    }

    public fieldValueClick(id) {
        this.pageTitle = "Data Field Values";
        var contextObj = this;
        let j = -1;
        if (this.itemsSource)
            for (let i = 0; i < this.itemsSource.length; i++) {
                if (id[0] == this.itemsSource[i].Id) {
                    if (this.itemsSource[i].Validated == "False")
                        j = 0;
                    this.fieldType = this.itemsSource[i];
                    break;
                }
            }

        /* if (this.enableMenu.indexOf(3) > -1)*/
        if (j == -1) {
            if (id.length > 0) {
                this.action = "fieldvalues";
                this.splitviewInput.showSecondaryView = true;
            }
            else {
                this.notificationService.ShowToaster("Select a Data Field", 2);
            }
        }
        else {
            this.notificationService.ShowToaster("Not a Validated Field", 2);
        }
    }

    public setWorkflowEntityDataFields() {
        this.pageTitle = "Workflow Entity Data Fields";
        this.splitviewInput.showSecondaryView = true;
    }

    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }
    cancelClick(event: any) {
        this.showSlide = false;
    }
    okDelete(event: any) {

        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.workOrdereService.deleteAddtlDataField(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.notificationService.ShowToaster("Additional Data Field deleted", 3);
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
            }
            else
                contextObj.notificationService.ShowToaster("Failed to delete Additional Data Field", 5);
        })

    }


    OnSuccessfulSubmitFieldRelation(event: any) {
    }

   

    onChangeDataFieldCategory(event: any) {
        var contextObj = this;
        this.getAddlDataFieldCategory(event);
        this.CategoryId = event;       
    }

    getAddlDataFieldCategory(event: any) {

        this.workTypeId = event;
        var contextObj = this;
        this.workOrdereService.getAddtlDataFieldData(event,"5", this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0]
                contextObj.notificationService.ShowToaster("No Additional Data Fields exist", 2);
            }
            else
               contextObj.enableMenu = [0, 1, 2, 4, 5]
            if (contextObj.CategoryId == -1)
                contextObj.enableMenu = [];
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });

    }
    showDrawingDetails(event) {
        
        if (event.rowdata.Validated == "False") {
            this.enableMenu = [0, 1, 2, 5];
        }
        else {
            this.enableMenu = [0, 1, 2, 4, 5];
        }
    }
    public onSort(objGrid: any) {
        
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        var contextObj = this;
        this.workOrdereService.getAddtlDataFieldData(contextObj.CategoryId, "5", contextObj.pageIndex, objGrid.sortDir, objGrid.sortCol).subscribe(function (resultData) {
            
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
        });
        }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
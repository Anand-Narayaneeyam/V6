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
import { AdditionalDataFieldomponentAddEdit } from './addl-datafield_addedit.component';
import { FieldValuesComponent } from './field-values.component';
import { FieldOrderComponent } from './fieldorder.component';
import { FieldRelation } from './fieldrelation.component';
import {DisplaySettingsComponent} from '../../../Framework/Whatever/Display Settings/displaysettings.component'
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';


@Component({
    selector: 'additional-datafields',
    templateUrl: './app/Views/Common/Additional Data Fields/additional-datafields.component.html',
    directives: [FieldRelation, SlideComponent, FieldOrderComponent, DND_DIRECTIVES, DisplaySettingsComponent, PageComponent, SplitViewComponent, FieldComponent, DropDownListComponent, SubMenu, GridComponent, PagingComponent, AdditionalDataFieldomponentAddEdit, ConfirmationComponent, FieldValuesComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, ConfirmationService],
    inputs: ['addlDataFieldCategoryId']
})

export class AdditionalDataFieldsComponent implements OnInit {

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
    dataKey: any[];
    message;
    CustomReportData;
    slideWidth;
    privilegeIds: any[];
    totalItems: number;
    itemsPerPage: number;
    slideView: any;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Field Name]' };
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": null   
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": null   
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": null   
        },

        {
            "id": 4,
            "title": "Field Values",
            "image": "FieldValues",
            "path": "FieldValues",
            "submenu": null,
            "privilegeId": null   
        }
    ];

    gridcount = 6;
    enableMenu: any[]; 
    differ: any;
    addlDataField: number[];
    pageTitle: string;
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
    refreshgrid;
    ngOnInit(): void {
        this.pagePath = "Administration / Additional Data Fields";
        this.alignContent = "horizontal";
        this.enableMenu = []
        switch (this.addlDataFieldCategoryId.toString()) {
            case "1":
                this.privilegeIds = [1538, 1539, 1540, 1541];
                break;
            case "2":
                this.privilegeIds = [71, 72, 73, 74];
                break;
            case "3":
                this.privilegeIds = [105, 106, 107, 108];
                break;
            case "4":
                this.privilegeIds = [138, 139, 140, 141];
                break;
            case "5":
                this.privilegeIds = [11532, 11533, 11534, 11535];
                break;
            case "6":
                this.privilegeIds = [824, 825, 826, 827];
                break;
            case "7":
                this.privilegeIds = [346, 347, 348, 349];
                break;
            default:
                this.privilegeIds = [];

        }
        let i = 0;
        if (this.privilegeIds.length != 0) {
            var contextObj = this;
            this.menuData = this.menuData.filter(function (el) {
                el.privilegeId = contextObj.privilegeIds[i];
                i = i + 1;
                return true
            });
            var callBack = function (data) {
                this.menuData = data;
            };
            this.generFun.GetPrivilegesOfPage(this.menuData, callBack, 101, this.administrationService, this.menuData.length);
        }

        if (this.addlDataFieldCategoryId > 0) {
            this.CategoryId = this.addlDataFieldCategoryId;
            this.getAddlDataFieldCategory(this.addlDataFieldCategoryId);
        }
    }
    constructor(private generFun: GeneralFunctions, private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService, private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create(null);
        this.btnName = "Add";
        var contextObj = this;
        function findAddlCategoryField(entity) {
            return entity.FieldId === 350;
        }
        administrationService.getAddtlDataFieldField().subscribe(function (resultData) {
            var updatedData = new Array();/*To notify the watcher about the change*/
            contextObj.ddlAdditionalDataFieldCategory = resultData["Data"].splice(resultData["Data"].findIndex(findAddlCategoryField), 1)[0];
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fieldObject = updatedData;
            var fieldtype = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 26 })
            var fieldName = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 25 })
            fieldtype.Width = "*"
            fieldName.Width="*"
            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
            fieldtype["LookupDetails"]["LookupValues"] = newlookup;
        })
    }

    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            this.addlDataField = this.inputItems.selectedIds;
           
            var contextObj = this;
            if (this.CategoryId > -1) {
                if (this.itemsSource.length != 0) {
                    if (this.inputItems.rowData.Validated == "True")
                        this.enableMenu = [0, 1, 2, 4]
                    else
                        this.enableMenu = [0, 1, 2]
                }
                else
                    this.enableMenu = [0]
            }
            else
                this.enableMenu = [];
        }
    }

    public pageChanged(event: any) {
        
        this.pageIndex = event.pageEvent.page;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 24,
            Value: this.CategoryId
        })
        this.administrationService.pagingAdditionalDataField(this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol, fieldobj).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]))

    }

    public onSort(objGrid: any) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 24,
            Value: this.CategoryId
        })
        this.administrationService.sortAdditionalDataField(this.pageIndex, objGrid.sortDir, objGrid.sortCol, fieldobj).subscribe(resultData => this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]));
    }

    showDrawingDetails(event) {
        if (event.rowdata.Validated == "False") {
            this.enableMenu = [0, 1, 2];
        }
        else {
            this.enableMenu = [0, 1, 2, 4];
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
        else if (event.value == 3) 
        {
            this.displaySettings();
        }
        else if (event.value == 4) 
        {
            this.fieldValueClick(this.inputItems.selectedIds);
        }
        else if (event.value == 5) 
        {
            this.fieldorderClick(this.inputItems.selectedIds);
        }
        else if (event.value == 6) 
        {
            this.fieldrelationClick(this.inputItems.selectedIds);
        }
    }

    OnSuccessfulSubmi(event: any) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
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
            this.btnName = "Save Changes";
            this.pageTitle = "Edit Data Field";
            this.splitviewInput.showSecondaryView = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Additional Data Field", 2);
        }
    }

    public fieldValueClick(id) {
        this.pageTitle = "Data Field Values";
        let j = -1;
        if (this.itemsSource)
            for (let i = 0; i < this.itemsSource.length; i++) {
                if (id[0] == this.itemsSource[i].Id) {
                    if (this.itemsSource[i].Validated == "False")
                        j = 0;
                    this.fieldType = this.itemsSource[i]
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
                this.notificationService.ShowToaster("Select a Additional Data Field", 2);
            }
        }
        else {
            this.notificationService.ShowToaster("Not a Validated Field", 2);
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
            debugger;
            contextObj.administrationService.GetCustomReportDetailsforSelectedAdditionalField(fieldobj1, contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck1) {
                debugger;
                if (returnCheck1.length == 0) {
                    contextObj.slideView = "1";
                    contextObj.slideWidth = "200";
                    contextObj.administrationService.CheckisinUse(fieldobj1, contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                        if (returnCheck["Data"] == 1)
                            contextObj.message = "Selected Additional Data Field is in use. Are you sure you want to delete?"
                        else
                            contextObj.message = "Are you sure you want to delete the selected Additional Data Field?"
                    })
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else
                {
                    contextObj.slideView = "2";
                    contextObj.slideWidth = "600";
                    contextObj.CustomReportData = returnCheck1;
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });


            //contextObj.administrationService.CheckisinUse(fieldobj1, contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
            //    if (returnCheck["Data"] == 1)
            //        contextObj.message = "Selected Additional Data Field is in use. Are you sure you want to delete?"
            //    else
            //        contextObj.message = "Are you sure you want to delete the selected Additional Data Field?"
            //})
            //this.showSlide = !this.showSlide;

        }
        else {
            this.notificationService.ShowToaster("Select an Additional Data Field", 2);
        }
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
        function findEntity(entity) {
            return entity.Id === contextObj.inputItems.selectedIds[0];
        }
        this.administrationService.deleteAddtlDataField(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
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

    ddlParentChange(event: any) {

    }

    ddlChildChange(event: any) {

    }

    public displaySettings() {
        this.action = "displaySettings";
        this.splitviewInput.showSecondaryView = true;
        this.fieldObject;
        this.dataKey = ["Id"];
    }

    displaySettingUpdate(event: any) {
        if (event != "cancel") {
            this.notificationService.ShowToaster("Field Order for Site updated", 3)
        }
        this.splitviewInput.showSecondaryView = false;
    }

    public fieldorderClick(event: any) {
        this.action = "fieldorder";
        this.splitviewInput.showSecondaryView = true;
        this.itemsSource;
        this.dataKey = ["Id"];

    }

    fieldorderUpdate(event: any) {
        if (event != "cancel") {
            this.notificationService.ShowToaster("Field Order for Additional Field Order updated", 3)
        }
        this.splitviewInput.showSecondaryView = false;
    }

    fieldrelationClick(event: any) {
        this.action = "fieldrelation";
        this.splitviewInput.showSecondaryView = true;
        this.itemsSource;
    }

    OnSuccessfulSubmitFieldRelation(event: any) {
    }

    OnCloseRelation() {
        this.splitviewInput.showSecondaryView = false;
    }

    onChangeDataFieldCategory(event: any) {
        this.getAddlDataFieldCategory(event);
        this.CategoryId = event;
        var submenuclass: any, focustag: any;
        submenuclass = document.getElementsByClassName("submenu");
        if (submenuclass && submenuclass.length > 0)
        {
            focustag = submenuclass[0].getElementsByTagName("a");
            if (focustag && focustag.length > 0)
                focustag[0].focus();
        }
    }

    getAddlDataFieldCategory(event: any) {
        var contextObj = this;
     
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 24,
            Value: event
        })
        this.administrationService.getAddtlDataFieldData(fieldobj, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);

            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0 && contextObj.CategoryId != -1) {
                contextObj.enableMenu = [0]
                contextObj.notificationService.ShowToaster("No Additional Data Fields exist", 2);
            }
            else
                contextObj.enableMenu = [0, 1, 2, 4]
            if (contextObj.CategoryId == -1)
                contextObj.enableMenu = [];
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    }

}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
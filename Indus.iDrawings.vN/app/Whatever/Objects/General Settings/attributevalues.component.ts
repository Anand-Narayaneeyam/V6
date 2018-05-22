import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IField } from  '../../../Framework/Models/Interface/IField'
import { ObjectsService } from '../../../Models/Objects/objects.service';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ConfirmationComponent } from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'attributevalues',
    templateUrl: './app/Views/Objects/General Settings/attributevalues.component.html',
    directives: [SubMenu, Sorting, PagingComponent, ListComponent, FieldComponent, Notification, CardComponent, ConfirmationComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, ObjectsService, NotificationService, GeneralFunctions],
    inputs: ['objectCategoryId', 'selectedId', 'fieldType', 'PageTarget', 'moduleId']
})

export class AttributeValueComponent implements OnInit {

    success: any;
    fieldType;
    classname: any = "Class";
    showSlide: boolean = false;
    position: any = "top-right";
    slidewidth = 300;
    public errorMessage: string;
    objectCategoryId: number;
    moduleId: number = 0;
    selectedId: number;
    pageIndex: any = 0;
    PageTarget: number;
    sortdirection: any = "ASC";
    sortfield: any = "Id";
    public fieldDetails: IField[];
    private fields: IField[];
    @Input() action: string;
    @Output() AddSuccess = new EventEmitter();
    public disableSort: boolean = false;
    sourceData: any[];
    message;
    maildomaindataSource: any[];
    enableMenu = [0, 2];
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        }
    ];
    types = false;
    submitSuccess: any[] = [];
    selIds = new Array();
    fieldobj: any = new Array<ReportFieldArray>();
    public totalItems: number = 0;
    public itemsPerPage: number = 0;

    constructor(private ObjectsService: ObjectsService, private notificationService: NotificationService, private generFunctions: GeneralFunctions) {
    }
    ngOnInit(): void {  
        switch (this.objectCategoryId) {
            case 1:
            case 2:
                this.classname = "Class";
                break;
            case 3:
                this.classname = "Object Class";
                break;
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                this.classname = "Component Type";
                break;
            case 20:
                this.classname = "Equipment Type";
                break;
        }
                    
        var contextObj = this;
        this.objectCategoryId;
        var contextObj = this;
        this.enableMenu = [0]
        this.selectedId;   
        this.selIds = [];     
        this.fieldobj.push({
            ReportFieldId: 64,
            Value: this.selectedId
        })
        this.ObjectsService.getAttributeValuesList(this.objectCategoryId, this.selectedId, 0, "[Attribute Value]", "ASC", "").subscribe(function (resultData) {                             
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0]
                if (contextObj.PageTarget==1)              
                    contextObj.notificationService.ShowToaster("No Common Attribute Values exist", 2);
                else
                    contextObj.notificationService.ShowToaster("No " + contextObj.classname + " Attribute Values exist", 2);
            }
            else {
                contextObj.sourceData = JSON.parse(resultData["Data"].FieldBinderData);
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
        this.ObjectsService.getAttributeValuesFieldList(this.objectCategoryId).subscribe(function (resultData) {            
            contextObj.fields = resultData["Data"];
            var fieldValue = contextObj.fields.find(function (item) { return item.ReportFieldId === 65 })
            switch (contextObj.fieldType["Attribute Type"]) {
                case "Date":
                    fieldValue.GenericDataTypeId = 2;
                    fieldValue.DataEntryControlId = 2;
                    fieldValue.Whitelist.Id = 7;
                    contextObj.ObjectsService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    //fieldValue.Whitelist.RegularExpression ="^[0-9a-zA-Z ]+$"
                    fieldValue.Format.Id = 1;
                    contextObj.ObjectsService.getFieldFormatDetails(fieldValue.Format.Id).subscribe(function (resultData) {
                        fieldValue.Format.FormatString = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
                        fieldValue.Format.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    })
                    //fieldValue.Format.FormatString = "dd MMM yyyy";
                    //fieldValue.Format.RegularExpression ="^(?:((31 (Jan|Mar|May|Jul|Aug|Oct|Dec))|((([0-2]\d)|30) (Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))|(([01]\d|2[0-8]) Feb))|(29 Feb(?= ((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))) ((1[6-9]|[2-9]\d)\d{2})$"
                    break;
                case "Date Time":
                    fieldValue.GenericDataTypeId = 3;
                    fieldValue.DataEntryControlId = 8;
                    fieldValue.Whitelist.Id = 8;
                    contextObj.ObjectsService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    fieldValue.Format.Id = 2;
                    contextObj.ObjectsService.getFieldFormatDetails(fieldValue.Format.Id).subscribe(function (resultData) {
                        fieldValue.Format.FormatString = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
                        fieldValue.Format.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    })
                    break;
                case "Integer":
                    fieldValue.GenericDataTypeId = 5;
                    fieldValue.DataEntryControlId = 1;
                    fieldValue.Whitelist.Id = 10;
                    fieldValue.MaxLength = 9;
                    fieldValue.Format.Id = 8;
                    fieldValue.Format.FormatString = "Signed Integer";
                    fieldValue.Format.RegularExpression = "^-?[0-9]{0,10}$";
                    contextObj.ObjectsService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    break;
                case "Numeric":
                    fieldValue.GenericDataTypeId = 4;
                    fieldValue.DataEntryControlId = 1;
                    fieldValue.Whitelist.Id = 9;
                    fieldValue.MaxLength = 14;
                    fieldValue.Format.Id = 6;
                    fieldValue.Format.FormatString = "Numeric";
                    fieldValue.Format.RegularExpression = "^(\\d{1,15}|\\d{0,30}\\.\\d{1,20})$";
                    contextObj.ObjectsService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    break;
                case "Single Line Text":
                    fieldValue.MaxLength = contextObj.fieldType["Max Characters Allowed"]
                    break;
                case "Multi Line Text":
                    fieldValue.MaxLength = contextObj.fieldType["Max Characters Allowed"]
                    break;
            }
        });
    }

    onCardSubmit(event: any) {
                
        var contextObj = this;
        contextObj.disableSort = false;
        var id = [event["dataKeyValue"]]      
        var temp = JSON.parse(event["fieldObject"]);
        temp.push(this.fieldobj[0]);       
        event["fieldObject"] = JSON.stringify(temp);
        temp.push({ ReportFieldId: 271, Value: this.moduleId.toString() });        
        if (event["dataKeyValue"]) {            
            this.ObjectsService.postEditAttributeValues(JSON.stringify(temp), this.selIds[0], this.objectCategoryId).subscribe(function (resultData) {                
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (contextObj.success["StatusId"] == 1) {
                    if (contextObj.PageTarget == 1)   
                        contextObj.notificationService.ShowToaster("Common Attribute Value updated", 3);
                    else
                        contextObj.notificationService.ShowToaster(contextObj.classname + " Attribute Value updated", 3);
                    let returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "edit", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    contextObj.selIds = [];
                    contextObj.AddSuccess.emit({ Sucess: "True" });
                    contextObj.enableMenu = [0];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj.notificationService.ShowToaster("Failed to update Attribute Value", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        if (contextObj.PageTarget == 1)
                            contextObj.notificationService.ShowToaster("Common Attribute Value already exists", 5);
                        else
                            contextObj.notificationService.ShowToaster(contextObj.classname + " Attribute Value already exists", 5);
                       // contextObj.enableMenu = [0];
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1218" });
                    }
                }
            })
        }
        else {            
            this.ObjectsService.postAddAttributeValues(JSON.stringify(temp), this.objectCategoryId).subscribe(function (resultData) {                
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (contextObj.success["StatusId"] == 1) {
                    if (contextObj.PageTarget == 1)
                        contextObj.notificationService.ShowToaster("Common Attribute Value added", 3);
                    else
                        contextObj.notificationService.ShowToaster(contextObj.classname + " Attribute Value added", 3);
                    contextObj.selIds = [];
                    contextObj.sourceData.pop();
                    let returnDatasrc = contextObj.generFunctions.updateDataSource(contextObj.sourceData, "add", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    if (contextObj.totalItems==1)
                    contextObj.AddSuccess.emit({ Sucess: "True" });
                    contextObj.enableMenu = [0];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else if (contextObj.success["StatusId"] == 0)
                    contextObj.notificationService.ShowToaster("Failed to add Attribute Value", 5);
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        //contextObj.sourceData.pop();
                        if (contextObj.PageTarget == 1)
                            contextObj.notificationService.ShowToaster("Common Attribute Value already exists", 5);
                        else
                            contextObj.notificationService.ShowToaster(contextObj.classname + " Attribute Value already exists", 5);
                       // contextObj.enableMenu = [0];
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "1218" });
                    }
                }
            });
        }
    }

    okDelete(event: any) {        
        this.showSlide = false;
        var contextObj = this;             
        function findEntity(entity) {
            return entity.Id === contextObj.selIds[0];
        }
        this.ObjectsService.postDeleteAttributeValues(this.selIds[0], this.objectCategoryId, this.moduleId).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {                
                contextObj.sourceData.splice(contextObj.sourceData.findIndex(findEntity), 1);
                var updatedList = new Array();/*To notify the watcher about the change*/
                updatedList = updatedList.concat(contextObj.sourceData);
                contextObj.sourceData = updatedList;
                contextObj.totalItems = contextObj.generFunctions.updateTotalItems(contextObj.totalItems, "delete");
                if (contextObj.totalItems == 0) {
                    contextObj.AddSuccess.emit({ Sucess: "False" });
                    contextObj.enableMenu = [0];
                }
                else
                    contextObj.enableMenu = [0];
                if (contextObj.PageTarget == 1)
                    contextObj.notificationService.ShowToaster("Selected Common Attribute Value deleted", 3);
                else
                    contextObj.notificationService.ShowToaster("Selected " + contextObj.classname + " Attribute Value deleted", 3);
                contextObj.selIds = [];
                
                contextObj.showSlide = false;
            }
            else if ((resultData["Data"]["StatusId"] == 0) && (resultData["Data"]["ServerId"] == -1)) {
                if (contextObj.PageTarget == 1)
                    contextObj.notificationService.ShowToaster("Selected Common Attribute Value is already in use", 5);
                else
                    contextObj.notificationService.ShowToaster("Selected " + contextObj.classname + " Attribute Value is already in use", 5);
            }            
            else
                contextObj.notificationService.ShowToaster("Failed to delete the selected  Attribute Value ", 5);
        });
    }
    onSorting(event: any) {       
        var contextObj = this; 
        this.selIds = [];       
        this.sortdirection = event["sortDirection"];
        this.sortfield = event["selectedField"];
        this.ObjectsService.getAttributeValuesList(this.objectCategoryId, this.selectedId, this.pageIndex, event["selectedField"], event["sortDirection"], "").subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0]
                if (contextObj.PageTarget == 1)
                    contextObj.notificationService.ShowToaster("No Common Attribute Values exist", 2);
                else
                    contextObj.notificationService.ShowToaster("No " + contextObj.classname + " Attribute Values exist", 2);
            }
            //contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            //contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });        
    }
    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.ObjectsService.getAttributeValuesList(this.objectCategoryId, this.selectedId, this.pageIndex, this.sortfield, this.sortdirection, "").subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0]
                if (contextObj.PageTarget == 1)
                    contextObj.notificationService.ShowToaster("No Common Attribute Values exist", 2);
                else
                    contextObj.notificationService.ShowToaster("No " + contextObj.classname + " Attribute Values exist", 2);
            }
            //contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            //contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    };
    public onSubMenuChange(event: any) {
        if (event.value == 0) // Add
        {
            this.enableMenu = [];
            this.selIds = [];
            this.addClick();
        }
        else if (event.value == 2) // Delete
        {
            //this.showSlide = !this.showSlide;
            this.deleteClick(this.selIds);
        }
    }
    public addClick() {  
        this.disableSort = true;      
        this.sourceData = this.generFunctions.addCardForGrid(this.sourceData, this.fields);
    }

    public deleteClick(id) {   
        var contextObj = this;          
        if (id.length > 0) {
            var details = contextObj.sourceData.find(function (item) { return item.Id === id[0] })
            if (details["IsInUse"] == true) {
                if (this.PageTarget == 1)
                    contextObj.message = "Selected Common Attribute Value is in use. Are you sure you want to delete?";
                else
                    contextObj.message = "Selected " + contextObj.classname + " Attribute Value is in use. Are you sure you want to delete?";
            }
            else {
                if (this.PageTarget == 1)
                    contextObj.message = "Are you sure you want to delete the selected Common Attribute Value ?";
                else
                    contextObj.message = "Are you sure you want to delete the selected " + contextObj.classname + " Attribute Value ?";
            }
            this.showSlide = !this.showSlide;                
        }
        else {
            if (contextObj.PageTarget == 1)
                contextObj.notificationService.ShowToaster("Select a Common Attribute Value", 2);
            else
                contextObj.notificationService.ShowToaster("Select a " + contextObj.classname + " Attribute Value", 2);           
        }
    }
    onDelete(e: Event) {
        //this.showSlide = !this.showSlide;
        this.deleteClick(this.selIds);
    }
    closeSlideDialog(event: any) {
        this.showSlide = event.value;
    }
    cancelClick(event: any) {
        this.showSlide = false;
    }
    onCancel(e) {
        this.disableSort = false; 
        if (this.sourceData.length > 0)
            this.enableMenu = [0];
        else
            this.enableMenu = [0]
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
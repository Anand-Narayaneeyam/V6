import { Component, OnInit, Input } from '@angular/core';
import { IField } from  '../../../Framework/Models/Interface/IField'
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { Sorting } from '../../../Framework/Whatever/Sort/sort.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { ListComponent } from '../../../Framework/Whatever/List/list.component';
import { FieldComponent } from '../../../Framework/Whatever/Card/field.component';
import { CardComponent } from  '../../../Framework/Whatever/Card/card.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { ConfirmationComponent } from '../../../Framework/Whatever/Notification/confirm.component';
import { ConfirmationService } from '../../../Framework/Models/Notification/confirm.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'field-values',
    templateUrl: './app/Views/Common/Additional Data Fields/field-values.component.html',
    directives: [SlideComponent, SubMenu, Sorting, PagingComponent, ListComponent, FieldComponent, CardComponent, Notification, ConfirmationComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, ConfirmationService],
    inputs: ['addlDataField', 'CategoryId', 'fieldType']
})

export class FieldValuesComponent implements OnInit {

    fieldType;
    showSlide: boolean = false;
    position: any = "top-right";
    CategoryId: any;
    pageIndex: any = 0;
    sortdirection: any = "ASC";
    sortfield: any = "Id";
    public fieldDetails: IField[];
    public errorMessage: string;
    private fields: IField[];
    public disableSort: boolean = false;
    @Input() addlDataField;
    sourceData: any[];
    message;
    submitSuccess: any[] = [];

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
    gridcount = 8;
    enableMenu = [0];
    selIds = new Array();
    public totalItems: number = 30;
    public itemsPerPage: number = 10;
    fieldobj: any = new Array<ReportFieldArray>();
    success: any;
    constructor(private generFun: GeneralFunctions, private administrationService: AdministrationService, private notificationService: NotificationService, private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        var contextObj = this;
        this.selIds = [];
        this.enableMenu = [0]
        this.addlDataField
        this.fieldobj.push({
            ReportFieldId: 20,
            Value: this.addlDataField[0]
        })
        this.administrationService.getFieldValuesData(this.fieldobj).subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0]
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
        this.administrationService.getFieldValuesFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            var fieldValue = contextObj.fields.find(function (item) { return item.ReportFieldId === 21 })
            switch (contextObj.fieldType["Field Type"]) {
                case "Date":
                    fieldValue.GenericDataTypeId = 2;
                    fieldValue.DataEntryControlId = 2;
                    fieldValue.Whitelist.Id = 7;
                    contextObj.administrationService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });

                    fieldValue.Format.Id = 1;
                    contextObj.administrationService.getFieldFormatDetails(fieldValue.Format.Id).subscribe(function (resultData) {
                        fieldValue.Format.FormatString = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
                        fieldValue.Format.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    })
                 
                    break;
                case "Date Time":
                    fieldValue.GenericDataTypeId = 3;
                    fieldValue.DataEntryControlId = 8;
                    fieldValue.Whitelist.Id = 8;
                    contextObj.administrationService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
                        fieldValue.Whitelist.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    });
                    fieldValue.Format.Id = 2;
                    contextObj.administrationService.getFieldFormatDetails(fieldValue.Format.Id).subscribe(function (resultData) {
                        fieldValue.Format.FormatString = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["FormatString"];
                        fieldValue.Format.RegularExpression = JSON.parse(resultData["Data"]["FieldBinderData"])[0]["RegularExpression"];
                    })
                    break;
                case "Integer":
                    fieldValue.GenericDataTypeId = 5;
                    fieldValue.DataEntryControlId = 1;
                    fieldValue.Whitelist.Id = 10;
                    fieldValue.MaxLength = 9;
                    fieldValue.Format.Id = 7;
                    fieldValue.Format.FormatString = "Integer";
                    fieldValue.Format.RegularExpression = "^[+-]?[0-9,]+$";
                    contextObj.administrationService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
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
                    fieldValue.Format.RegularExpression = "^[+-]?((\\d+(\\.\\d*)?)|(\\.\\d+))$";
                    contextObj.administrationService.getWhitelistDetails(fieldValue.Whitelist.Id).subscribe(function (resultData) {
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
        this.disableSort = false;
        var contextObj = this;
        var id = [event["dataKeyValue"]]
        var temp = JSON.parse(event["fieldObject"]);
        temp.push(this.fieldobj[0]);
        event["fieldObject"] = JSON.stringify(temp);
      
        if (event["dataKeyValue"]) {
            this.administrationService.updateFieldValue(event["fieldObject"], this.selIds[0]).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.notificationService.ShowToaster("Additional Data Field Value updated", 3);
                    let returnDatasrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "edit", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];
                    contextObj.selIds = [];
                    contextObj.enableMenu = [0];
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj.notificationService.ShowToaster("Failed to update Additional Data Field Value", 5);
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -2) {
                        if (contextObj.totalItems > 0)
                            contextObj.notificationService.ShowToaster("Additional Data Field Value already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "435" });
                    }
                }
            }) 
        }

        else {
            this.administrationService.insertFieldValue(event["fieldObject"]).subscribe(function (resultData) {
                contextObj.success = (resultData["Data"]);
                var retData = { returnData: contextObj.success.Data };
                if (contextObj.success["StatusId"] == 1) {
                    contextObj.notificationService.ShowToaster("Additional Data Field Value added", 3);
                    contextObj.selIds = [];
                    contextObj.sourceData.pop();
                    let returnDatasrc = contextObj.generFun.updateDataSource(contextObj.sourceData, "add", retData, id, 'Id', contextObj.totalItems);
                    contextObj.sourceData = returnDatasrc["itemSrc"];
                    contextObj.totalItems = returnDatasrc["itemCount"];                   
                    if (contextObj.totalItems > 0)
                        contextObj.enableMenu = [0]
                    contextObj.submitSuccess.unshift({ "isSuccess": true, "FieldId": "" });
                }
                else if (contextObj.success["StatusId"] == 0) {
                    contextObj.notificationService.ShowToaster("Failed to add Additional Data Field Value", 5);
                }
                else if (contextObj.success["StatusId"] == 3) {
                    if (contextObj.success["ServerId"] == -1) {
                        if (contextObj.totalItems > 0) {
                            contextObj.enableMenu = [];
                            contextObj.selIds = [];
                        }
                        else {
                            contextObj.enableMenu = [];
                            contextObj.selIds = [];
                        }
                        contextObj.notificationService.ShowToaster("Additional Data Field Value already exists", 5);
                        contextObj.submitSuccess.unshift({ "isSuccess": false, "FieldId": "435" });
                    }
                }
            });
        }
    }

    public onSubMenuChange(event: any) {
        if (event.value == 0) 
        {
            this.enableMenu = []
            this.selIds = [];
            this.addClick();
        }
        else if (event.value == 2) 
        {
            this.deleteClick(this.selIds);
        }
    }

    onSorting(event: any) {
        this.selIds = [];
        this.enableMenu = [0]
        var contextObj = this;
        this.sortdirection = event["sortDirection"];
        this.sortfield = event["selectedField"];
        this.administrationService.sortFieldValue(this.fieldobj, this.pageIndex, event["sortDirection"], "").subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0]
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
        });
        contextObj.enableMenu = [0]
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.administrationService.pagingFieldValue(this.fieldobj, this.pageIndex, this.sortdirection, "").subscribe(function (resultData) {
            contextObj.sourceData = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0]
                contextObj.notificationService.ShowToaster("No Field Values exist", 2);
            }
        });
        contextObj.enableMenu = [0]
    };

    public addClick() {
        this.disableSort = true;
        this.sourceData = this.generFun.addCardForGrid(this.sourceData, this.fields);

    }

    public deleteClick(id) {
        if (id.length > 0) {
            var contextObj = this;
            var fieldobj1 = new Array<ReportFieldArray>();
            fieldobj1.push({
                ReportFieldId: 16,
                Value: contextObj.CategoryId
            })
            if (id.length > 0) {
                contextObj.administrationService.CheckAdditionalDataFieldLookUpValueInUse(this.selIds[0]).subscribe(function (returnCheck) {
                    if (returnCheck["Data"] == 1)
                        contextObj.message = " Selected Additional Data Field Value is in use. Are you sure you want to delete?"
                    else
                        contextObj.message = " Are you sure you want to delete the selected Data Field Value?"
                })
                this.showSlide = true;
            }
        }
        else {
            this.notificationService.ShowToaster("Select a Field Value", 2);
        }
    }

    okDelete(event: any) {
        this.showSlide = false;
        var contextObj = this;
        var count = 0;
        for (let i = 0; i < this.fieldobj.length; i++) {
            if (this.fieldobj[i].ReportFieldId == 24)
                count++;
        }
        if (count == 0)
            if (this.CategoryId[0])
                this.fieldobj.push({
                    ReportFieldId: 24,
                    Value: this.CategoryId[0]
                });
            else
                this.fieldobj.push({
                    ReportFieldId: 24,
                    Value: this.CategoryId
                });
        else {

            var item = this.fieldobj.find(function (item) {
                return item.ReportFieldId === 24
            })
            if (this.CategoryId[0])
                item.Value = this.CategoryId[0];
            else
                item.Value = this.CategoryId;
        }
        function findEntity(entity) {
            return entity.Id === contextObj.selIds[0];
        }
        this.administrationService.postDataFieldValueDelete(this.selIds, this.fieldobj).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.sourceData.splice(contextObj.sourceData.findIndex(findEntity), 1);
                var updatedList = new Array();/*To notify the watcher about the change*/
                updatedList = updatedList.concat(contextObj.sourceData);
                contextObj.sourceData = updatedList;
                contextObj.totalItems = contextObj.generFun.updateTotalItems(contextObj.totalItems, "delete");
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("Selected Additional Data Field Value deleted", 3);
                contextObj.showSlide = false;
                contextObj.selIds = [];
            }
            else if ((resultData["Data"]["StatusId"] == 0) && (resultData["Data"]["ServerId"] == -1))
                contextObj.notificationService.ShowToaster("Selected Additional data field is already in use", 5);
            else
                contextObj.notificationService.ShowToaster("Failed to delete the selected  Additional Data Field Value ", 5);
        });
    }

    onDelete(e: Event) {
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
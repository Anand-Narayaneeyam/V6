import { Component, KeyValueDiffers, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ObjectsService } from '../../../Models/Objects/objects.service';
import { ClassAttributescomponentAddEdit } from './class-attributes-addedit.component';
import { AttributeValueComponent } from './attributevalues.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';



@Component({
    selector: 'class-attributes',
    templateUrl: './app/Views/Objects/General Settings/class-attributes.component.html',
    directives: [SlideComponent, SplitViewComponent, FieldComponent, SubMenu, GridComponent, PagingComponent, DropDownListComponent, ClassAttributescomponentAddEdit, AttributeValueComponent],
    providers: [HTTP_PROVIDERS, ObjectsService, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['objectCategoryId', 'moduleId']
})

export class ClassAttributesComponent implements OnInit {

    showSlide: boolean = false;
    classname: any = "Class";
    position: any = "top-right";
    slidewidth = 300;
    objectCategoryId: number;
    moduleId: number = 0;
    menuClickValue: any;
    fieldObject: IField[];
    ClassAttributesAddEdit: IField[];
    itemsSource: any[];
    ddlClass: IField;
    deleteConfrmtnMsg: string;
    fieldType: string;
    ClassId: any;
    addlDataField: number[];
    differ: any;
    alignContent: string;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    message;
    hasFieldValue: boolean = false;
    isinUse: boolean = false;

    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Attribute Name]' };
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId":924
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 925
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 926
        },
        {
            "id": 4,
            "title": "Attribute Values",
            "image": "FieldValues",
            "path": "FieldValues",
            "submenu": null,
            "privilegeId": 927
        },
        //         {
        //    "id": 5,
        //        "title": "Field Order",
        //            "image": "FieldValues",
        //                "path": "FieldValues",
        //                    "submenu": null
        //},
    ];
    enableMenu: any[];
    pageTitle: string;
    refreshgrid;

    constructor(private generFun: GeneralFunctions, private objectsService: ObjectsService, private AdministrationService: AdministrationService,private notificationService: NotificationService, private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create(null);
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

        //this.btnName = "Add";        
        var contextObj = this;
        var field = new Array();
        this.alignContent = "horizontal";
        contextObj.objectsService.getObjectClassSelectionLookups(contextObj.objectCategoryId, '', 1, 1, 0).subscribe(function (resultData) {     
            debugger       
            field = JSON.parse(resultData.Data["FieldBinderData"]);        
            contextObj.objectsService.getClassAttributesFieldList(contextObj.objectCategoryId).subscribe(function (resultData) {           
            var updatedData = new Array();/*To notify the watcher about the change*/
            contextObj.ddlClass = resultData["Data"].splice(7, 8)[0];
            contextObj.ddlClass.LookupDetails.LookupValues = field;            
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fieldObject = updatedData;
            if (contextObj.fieldObject[6].FieldId == 1146)
                contextObj.fieldObject[6].IsVisible = false;
            var fieldtype = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 70 })
            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
            fieldtype["LookupDetails"]["LookupValues"] = newlookup;
            this.enableMenu = [0]
            //contextObj.dataLoad(); 
            var callBack = function (data) {
                contextObj.menuData = data;
            };
            contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 200, contextObj.AdministrationService, contextObj.menuData.length);
            })
        });
    }
    ngDoCheck() {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            this.addlDataField = this.inputItems.selectedIds;
            console.log(this.addlDataField)
            var contextObj = this;

            if (this.itemsSource.length != 0) {
                if (this.inputItems.rowData.Validated == "True")
                    this.enableMenu = [ 1, 2,3, 4]
                else
                    this.enableMenu = [ 1, 2, 3]
            }
            else
                if (contextObj.ClassId>0)
                    this.enableMenu = [1]
                else
                    contextObj.enableMenu = []
        }
    }  
    public dataLoad(event: any) {
        var contextObj = this;
        contextObj.ClassId = event;
        this.objectsService.getClassAttributesList(this.objectCategoryId, this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, event,"").subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {
               
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                // contextObj.notificationService.ShowToaster("No Object Classes exist", 2);
                if (event > 0) {
                    contextObj.notificationService.ShowToaster("No " + contextObj.classname + " Attributes exist", 2)
                    contextObj.enableMenu = [1];
                }
                else
                    contextObj.enableMenu = [];
            }
        });
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(this.ClassId);
    }

    public onSort(objGrid: any) {
        this.dataLoad(this.ClassId);
    }

    public onSubMenuChange(event: any) {
        this.menuClickValue = event.value;
        switch (event.value) {
            case 1:
                this.pageTitle = "New " + this.classname + " Attribute";
                this.addClick();
                break;
            case 2:
                this.pageTitle = "Edit " + this.classname + " Attribute";
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
            case 4:
                this.pageTitle = this.classname + " Attribute Values";
                this.fieldValueClick(this.inputItems.selectedIds);
                break;
        }
    }

    public addClick() {        
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        if (this.ClassId == undefined) {
            this.notificationService.ShowToaster("Please Select a " + this.classname, 2);
        }
        else {
            this.objectsService.loadClassAttributesAddEdit(0, 1, this.objectCategoryId, this.ClassId).subscribe(function (resultData) {
                contextObj.ClassAttributesAddEdit = (resultData["Data"]);
                var fieldtype = contextObj.ClassAttributesAddEdit.find(function (item) { return item.ReportFieldId === 70 })
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                contextObj.ClassAttributesAddEdit[3].IsEnabled = false;
                contextObj.ClassAttributesAddEdit[6].IsEnabled = false;
                //contextObj.AttributesAddEdit = resultData["Data"];
            })
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.ClassId == undefined) {
            this.notificationService.ShowToaster("Please Select a " + this.classname, 2);
        }
        else {
            if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            } else {
                this.objectsService.loadClassAttributesAddEdit(this.inputItems.selectedIds[0], 2, this.objectCategoryId, this.ClassId).subscribe(function (resultData) {
                    contextObj.ClassAttributesAddEdit = resultData["Data"];
                    var fieldtype = contextObj.ClassAttributesAddEdit.find(function (item) { return item.ReportFieldId === 70 })
                    var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14) })
                    fieldtype["LookupDetails"]["LookupValues"] = newlookup;

                    if (contextObj.inputItems.rowData["IsInUseButCanDelete"] == true || contextObj.inputItems.rowData["IsInUse"] == true) {
                        switch (contextObj.ClassAttributesAddEdit[2].FieldValue) {
                            case "2":
                                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 3 && item.Id != 6 && item.Id != 4) })
                                break;
                            case "7":
                                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 3 && item.Id != 6 && item.Id != 4 && item.Id != 2) })
                                break;
                            case "3":
                                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7) })
                                break;
                            case "4":
                                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7 && item.Id != 3 && item.Id != 6) })
                                break;
                            case "5":
                                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id === 5) })
                                break;
                            case "6":
                                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id === 6) })
                                break;


                        }
                        fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                    }
                    if (contextObj.ClassAttributesAddEdit[2].FieldValue != "3" && contextObj.ClassAttributesAddEdit[2].FieldValue != "4")
                        contextObj.ClassAttributesAddEdit[6].IsEnabled = false;
                    if (contextObj.ClassAttributesAddEdit[2].FieldValue != "6" && contextObj.ClassAttributesAddEdit[2].FieldValue != "5") {
                        contextObj.ClassAttributesAddEdit[3].IsEnabled = false;
                        contextObj.ClassAttributesAddEdit[3].FieldValue = "";
                    }
                    if (contextObj.ClassAttributesAddEdit[2].FieldValue == "6")
                        contextObj.ClassAttributesAddEdit[5].IsEnabled = false;      
                    if (contextObj.ClassAttributesAddEdit[4].FieldValue == "True")
                        contextObj.ClassAttributesAddEdit[4].FieldValue = "1";
                    if (contextObj.ClassAttributesAddEdit[5].FieldValue == "True")
                        contextObj.ClassAttributesAddEdit[5].FieldValue = "1";
                    if (contextObj.ClassAttributesAddEdit[6].FieldValue == "True")
                        contextObj.ClassAttributesAddEdit[6].FieldValue = "1";
                    contextObj.loadControl(contextObj.ClassAttributesAddEdit[2].FieldValue, contextObj, "changecall");  
                    if (contextObj.inputItems.rowData["IsInUseButCanDelete"] == true || contextObj.inputItems.rowData["IsInUse"] == true)
                        contextObj.ClassAttributesAddEdit[5].IsEnabled = false; 
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    }
    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            if (this.inputItems.rowData.IsInUse == false) {
                if (this.inputItems.rowData.IsInUseButCanDelete == false) {
                    contextObj.message = "Are you sure you want to delete the selected " + contextObj.classname + " Attribute?";
                }
                else {
                    contextObj.message = "Selected " + contextObj.classname + " Attribute is in use. Are you sure you want to delete?";
                }
            }
            else {
                contextObj.message = "Selected Attribute could not be deleted as it is linked to the report";
            }
            this.showSlide = !this.showSlide;
        }
    }

    deleteAttribute() {
        var contextObj = this;
        contextObj.objectsService.postDeleteClassAttributes(contextObj.inputItems.selectedIds[0], this.objectCategoryId, this.ClassId, this.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster(contextObj.classname +" Attribute deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected " + contextObj.classname + " Attribute in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }

    OnSuccessfulSubmit(event: any) {        
        var contextObj = this;
        contextObj.refreshgrid = [];
        let retUpdatedSrc;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]); 
            if (retUpdatedSrc["itemSrc"]["0"]["Validated"] == "True")
                contextObj.enableMenu = [1, 2, 3, 4]
            else
                contextObj.enableMenu = [1, 2, 3]
        }       
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]); 
        //this.itemsSource = retUpdatedSrc["itemSrc"];
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }
    public fieldValueClick(id) {        
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
                this.notificationService.ShowToaster("Select a Data Field", 2);
            }
        }
        else {
            this.notificationService.ShowToaster("Not a Validated Field", 2);
        }

    }
    //slide events//
    onChangeClass(event: any) {
      this.dataLoad(event);
    }

    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteAttribute();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
    Successfulladd(event: any) {
        if (event["Sucess"] == "True") {
            this.inputItems.rowData["IsInUseButCanDelete"] = true;
        }
        else {
            this.inputItems.rowData["IsInUseButCanDelete"] = false;
        }
    }
    loadControl(eventValue: any, contextObj, action) {
        if (eventValue == "2" || eventValue == "7") // Date 2 or datetime 7
        {
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                //if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed" || this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146 || contextObj.ClassAttributesAddEdit[i].FieldId == 1157) {
                    if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146) {
                        contextObj.ClassAttributesAddEdit[i].FieldValue = "";
                        contextObj.ClassAttributesAddEdit[i].IsMandatory = false;
                        contextObj.ClassAttributesAddEdit[i].HasValidationError = false;
                    }
                    else
                        this.ClassAttributesAddEdit[i].FieldValue = "0";
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                }

                //this.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.ClassAttributesAddEdit[i].FieldId == 1156)
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.ClassAttributesAddEdit[i].FieldId == 1156) {
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                }
                else
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;

                //if (this.fieldDetailsAddEdit[i].FieldId == 361) {
                //    this.fieldDetailsAddEdit[i].IsMandatory = false;
                //    this.fieldDetailsAddEdit[i].HasValidationError = false;
                //}
            }
        }
        else if (eventValue == "3" || eventValue == "4") { //integer 3 or numeric 4
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed") {
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146) {
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.ClassAttributesAddEdit[i].FieldValue = "";
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                    contextObj.ClassAttributesAddEdit[i].IsMandatory = false;
                    contextObj.ClassAttributesAddEdit[i].HasValidationError = false;
                }

                else if (contextObj.ClassAttributesAddEdit[i].FieldId == 1157 || contextObj.ClassAttributesAddEdit[i].FieldId == 1156) {
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                }
                //this.fieldDetailsAddEdit[i].ReadOnlyMode = false;
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.ClassAttributesAddEdit[i].FieldId == 1156)
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                else
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;

                //if (this.fieldDetailsAddEdit[i].FieldId == 361) {
                //    this.fieldDetailsAddEdit[i].IsMandatory = false;
                //    this.fieldDetailsAddEdit[i].HasValidationError = false;
                //}
            }
        }
        else if (eventValue == "6") { //multi 6
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable" || this.fieldDetailsAddEdit[i].FieldLabel== "Validated" ) {
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1157 || contextObj.ClassAttributesAddEdit[i].FieldId == 1156) {
                    //if (this.addEdit != "edit" && this.hasFieldValue != true) {
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = true;
                    contextObj.ClassAttributesAddEdit[i].FieldValue = "0";
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                    //}
                }
                else {
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                }
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146) {
                    if (action == "changecall")                      
                    contextObj.ClassAttributesAddEdit[i].IsLocallyValidated = false;
                    contextObj.ClassAttributesAddEdit[i].IsMandatory = true;
                    contextObj.ClassAttributesAddEdit[i].RangeFrom = "101";
                    contextObj.ClassAttributesAddEdit[i].RangeTo = "4000";
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    if (<HTMLElement>document.getElementById("1146")) {
                        var el = <HTMLElement>document.getElementById("1146");
                        //var contextObj = contextObj;
                        var fldObj = contextObj.ClassAttributesAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);

                    }
                }
            }
        }
        else if (eventValue == "5") { //text 5
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1157) {
                    contextObj.ClassAttributesAddEdit[i].FieldValue = "0";
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = true;
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = false;
                }
                else {
                    if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.ClassAttributesAddEdit[i].FieldId != 1156) {
                        contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                        contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                    }
                    else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.ClassAttributesAddEdit[i].FieldId == 1156) {
                        contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                        contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                    }
                }
                if (contextObj.ClassAttributesAddEdit[i].FieldId == 1146) {
                    if (action == "changecall")                       
                    contextObj.ClassAttributesAddEdit[i].IsLocallyValidated = false;
                    contextObj.ClassAttributesAddEdit[i].IsMandatory = true;
                    contextObj.ClassAttributesAddEdit[i].RangeFrom = "1";
                    contextObj.ClassAttributesAddEdit[i].RangeTo = "100";
                    contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                    contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
                    if (<HTMLElement>document.getElementById("1146")) {
                        var el = <HTMLElement>document.getElementById("1146");
                        //var contextObj = this;
                        var fldObj = contextObj.ClassAttributesAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);

                    }
                }
            }
        }
        else if (eventValue == "-1") {
            for (var i = 0; i < contextObj.ClassAttributesAddEdit.length; i++) {
                contextObj.ClassAttributesAddEdit[i].IsEnabled = true;
                contextObj.ClassAttributesAddEdit[i].ReadOnlyMode = false;
            }
        }
        this.ClassAttributesAddEdit = contextObj.ClassAttributesAddEdit;
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

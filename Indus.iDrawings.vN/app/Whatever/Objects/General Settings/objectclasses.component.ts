import { Component, OnInit} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ObjectsService } from '../../../Models/Objects/objects.service';
import { ObjectClassesAddEditComponent } from './objectclasses-addedit.component';
import { AttachmentsComponent} from '../../Common/Attachments/attachments.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'object-classes',
    templateUrl: './app/Views/Objects/General Settings/objectclasses.component.html',
    directives: [SlideComponent, SplitViewComponent, FieldComponent, SubMenu, GridComponent, PagingComponent, AttachmentsComponent, ObjectClassesAddEditComponent],
    providers: [HTTP_PROVIDERS, ObjectsService, NotificationService, GeneralFunctions, AdministrationService],
    inputs: ['objectCategoryId', 'moduleId']
})

export class ObjectClassesComponent implements OnInit {

    showSlide: boolean = false;
    position: any = "top-right";
    slidewidth = 350;   
    objectCategoryId: number;
    moduleId: number=0;
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    itemsSource: any[];
    messages: any[];
    deleteConfrmtnMsg: string;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    IsObjectClassInUse: number;
    btnName: string;
    classname: any;
    objectCategoryName: string;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '' };
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 919
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 920
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 921
        },
        {
            "id": 4,
            "title": "Attachments",
            "image": "Attachments",
            "path": "Attachments",
            "submenu": null,
            "privilegeId": 1035
        }
    ];
    enableMenu = [];
    pageTitle: string;
    refreshgrid;
    constructor(private generFun: GeneralFunctions, private objectsService: ObjectsService, private AdministrationService: AdministrationService,private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        switch (this.objectCategoryId) {
            case 1:
                this.classname = "Asset Class";
                break;
            case 2:
                this.classname = "Furniture Class";
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

        this.btnName = "Add";
        var contextObj = this;
        let rptField = [648, 4485, 651];
        let count = rptField.length;
        contextObj.objectsService.getFieldsList(this.objectCategoryId).subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (rptField.indexOf(item.ReportFieldId) >= 0) {
                    item.Width = "*";
                    count--;
                    if (count == 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });


            contextObj.fieldObject = (resultData["Data"]);

            if (contextObj.moduleId == 9) {
                contextObj.fieldObject.find(function (item) {
                    if (item.ReportFieldId == 653)
                    {
                        item.IsVisible = false;
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                });
            }
        })
        this.objectsService.getObjectClassesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.messages = resultData["Data"].ReturnMessages;
            contextObj.objectCategoryName = contextObj.messages["ObjectCategoryName"];
            contextObj.deleteConfrmtnMsg = contextObj.messages["DeleteConfirmation"];
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.enableMenu = [1, 2, 3, 4];
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster(contextObj.messages["NoDataExist"],2)
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 204, contextObj.AdministrationService, contextObj.menuData.length);
    }    

    public pageChanged(event: any) {
        var contextObj = this;

        this.pageIndex = event.pageEvent.page;
        this.objectsService.getObjectClassesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.objectsService.getObjectClassesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.pageTitle = "New " + this.classname;
                this.addClick();
                break;
            case 2:
                this.pageTitle = "Edit " + this.classname;
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
            case 4:
                this.pageTitle = "Attachments";
                this.attachmentsClick();
                break;
        }
    }

    public addClick() {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        this.objectsService.loadObjectClassAddEdit(0, 1, this.objectCategoryId).subscribe(function (resultData) {
            resultData["Data"].find(function (el) { return el.ReportFieldId === 653; })["FieldLabel"] = "Symbol";
            resultData["Data"].find(function (el) { return el.ReportFieldId === 655; })["FieldValue"] = "130";
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            if (contextObj.moduleId == 9) {
                var length: any = contextObj.fieldDetailsAddEdit.length;
                for (var i = 0; i < length; i++) {
                    switch (contextObj.fieldDetailsAddEdit[i].ReportFieldId) {
                        case 653:
                        case 655:
                            contextObj.fieldDetailsAddEdit[i].IsVisible = false;
                            break;
                        case 4489: contextObj.fieldDetailsAddEdit[i].FieldValue = "1";                            
                            break
                        default:
                            break;
                    }
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        })
    }

    public editClick() {       
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.CheckIsInUse();

            this.objectsService.loadObjectClassAddEdit(this.inputItems.selectedIds[0], 2, this.objectCategoryId).subscribe(function (resultData) {

                contextObj.fieldDetailsAddEdit = resultData["Data"];
                var symbolField = contextObj.fieldDetailsAddEdit.find(function (item) {return item.ReportFieldId === 653 });
                symbolField["FieldLabel"] = "Symbol";

                if (contextObj.IsObjectClassInUse == 1) {
                    var pmRequiredField = contextObj.fieldDetailsAddEdit.find(function (item) {
                        return item.ReportFieldId === 4489
                    });
                    if (pmRequiredField.FieldValue == "1") {
                        pmRequiredField["IsEnabled"] = false;
                    }
                }
                if (contextObj.moduleId == 9) {
                    var length: any = contextObj.fieldDetailsAddEdit.length;
                    for (var i = 0; i < length; i++) {
                        switch (contextObj.fieldDetailsAddEdit[i].ReportFieldId) {
                            case 653:
                            case 655:
                                contextObj.fieldDetailsAddEdit[i].IsVisible = false;
                                break;
                            default:
                                break;
                        }
                    }
                }              
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;


            });
        }
    }

    public CheckIsInUse() {
        var contextObj = this;
        this.objectsService.IsObjectClassInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            contextObj.IsObjectClassInUse = resultData["Data"];
        });
    }

    public deleteClick() {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            var contextObj = this;
            this.CheckIsInUse();
            var dbObject = new Array<ReportFieldArray>();
            dbObject.push({ ReportFieldId: 173, Value: "135" })
            this.objectsService.CheckIsEntityReferenceFound(dbObject, this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == false) {
                    contextObj.deleteConfrmtnMsg = contextObj.messages["DeleteConfirmation"]; 
                }
                else {
                    if (contextObj.IsObjectClassInUse == 1) {
                        if (contextObj.moduleId == 9) 
                            contextObj.deleteConfrmtnMsg = contextObj.messages["InUse"];
                        else
                            contextObj.deleteConfrmtnMsg = contextObj.messages["InUseWorkOrder"];
                    }
                    else
                        contextObj.deleteConfrmtnMsg = contextObj.messages["InUse"];;
                }
                contextObj.showSlide = !contextObj.showSlide;
            });
        }
    }

    public deleteObjectClass() {
        var contextObj = this;
        contextObj.objectsService.postDeleteObjectClass(contextObj.inputItems.selectedIds[0], this.objectCategoryId, this.moduleId).subscribe(function (resultData) {
            if (resultData["Data"].StatusId > 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }

                contextObj.notificationService.ShowToaster(contextObj.messages["DeleteSuccess"], 3);
            }
            else {
                //contextObj.notificationService.ShowToaster("Selected Object Class cannot be deleted", 5);
            }
        });
    }

    public attachmentsClick() {

        this.action = "attachments";
       // this.btnName = "Save ";
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        
    }


    OnSuccessfulSubmit(event: any) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.enableMenu = [1, 2, 3, 4];
                this.itemsSource = retUpdatedSrc["itemSrc"];
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            //this.refreshgrid = this.refreshgrid.concat([true]);
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    }

    //grid inline events
    public inlineAdd(pageDetails: any) {
        var contextObj = this;
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 283) {
                arr[i].Value = "1";
            }
            if (arr[i].ReportFieldId == 649) {
                arr[i].Value = "1";
            }
        }
        contextObj.objectsService.InlineInsertUpdateObjectClass(JSON.stringify(arr), contextObj.inputItems.selectedIds[0], 1, this.objectCategoryId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster(contextObj.messages["AddSuccess"], 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId <= 0) {
                        contextObj.notificationService.ShowToaster(contextObj.messages["AlreadyExist"], 5);
                    }
                    break;
            }
        });
    }

    public inlineEdit(pageDetails: any) {
        var contextObj = this;
        var arr = new Array<ReportFieldArray>();
        arr = JSON.parse(pageDetails);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ReportFieldId == 283) {
                arr[i].Value = "1";
            }
            if (arr[i].ReportFieldId == 649) {
                arr[i].Value = "1";
            }
        }
        contextObj.objectsService.InlineInsertUpdateObjectClass(JSON.stringify(arr), contextObj.inputItems.selectedIds[0], 2, this.objectCategoryId).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    contextObj.notificationService.ShowToaster(contextObj.messages["UpdateSuccess"], 3);
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1) {
                        contextObj.notificationService.ShowToaster(contextObj.messages["AlreadyExist"], 5);
                    }
                    break;
            }
        });
    }
    public inlineDelete(event: any) {
        this.deleteObjectClass();
    }

    //slide events//

    okDelete(event: Event) {
        this.deleteObjectClass();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    attachmentSuccess(event: any) {
        var context = this;
        context.refreshgrid = [];
        var selId = context.inputItems.selectedIds[0];
        var selObj = context.itemsSource.find(function (item) {
            return item["Id"] === selId;
        })

        switch (event["status"]) {
            case "success":
                selObj["Attachments"] = (Number(selObj["Attachments"]) + 1).toString();
                break;
            case "delete":
                selObj["Attachments"] = (Number(selObj["Attachments"]) - 1).toString();
                break;
        }

        context.refreshgrid = context.refreshgrid.concat([true]);
        //var updatedData = new Array();/*To notify the watcher about the change*/
        //updatedData = updatedData.concat(context.itemsSource);
        //context.itemsSource = updatedData;
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

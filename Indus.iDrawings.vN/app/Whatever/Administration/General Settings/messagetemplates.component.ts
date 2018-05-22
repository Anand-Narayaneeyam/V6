import {Component, AfterViewInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import {SectionComponent} from '../../../Framework/Whatever/Section/section.component';
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { MessageTemplateAddEditComponent } from './messagetemplate-addedit'



@Component({
    selector: 'message-templates',
    templateUrl: './app/Views/Administration/General Settings/messagetemplates.component.html',
    directives: [SubMenu, SplitViewComponent, SectionComponent, GridComponent, PagingComponent, FieldComponent,
       SlideComponent, DropDownListComponent, MessageTemplateAddEditComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, AdministrationService],
})

export class MessageTemplatesComponent  {

    fieldObject: IField[];
    fieldDetailsAdd: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    action: string;
    btnName: string;
    enableMenu = [];
    menuData = [
        {
            "id": 1,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null,
            "privilegeId": 6193
        },
        {
            "id": 2,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 6194
        },
        {
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null,
            "privilegeId": 6195
        }

    ];

    position = "top-right";
    showSlide = false;
    slidewidth = 250;
    pageTitle: string;
    refreshgrid;
    alignContent;
    ddlMsgCategory: any;
    msgCategoryId: number = 0;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) { }

    ngOnInit()
    {
        this.alignContent = "horizontal";
        var contextObj = this;
        this.administrationService.getMessageTemplateFields().subscribe(function (resultData) {
            contextObj.ddlMsgCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 5472; });
            var removeArr = [5472];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            })
            if (contextObj.ddlMsgCategory.LookupDetails.LookupValues == "") {
                contextObj.notificationService.ShowToaster("No Message Categories exist", 2);
            }
            this.itemsSource = [];
        });
       
    }

    onChangeMsgCategory(event: any) {
        var contextObj = this;
        this.msgCategoryId = event;
        if (this.msgCategoryId > -1) {
            this.dataLoad(this.msgCategoryId)
        } else {
            contextObj.itemsSource = [];
        }
    }

    public dataLoad(msgCategoryId) {
        var contextObj = this;
        var reportfieldIdValues = new Array<ReportFieldArray>();
        reportfieldIdValues.push({ ReportFieldId: 5472, Value: msgCategoryId })
        contextObj.administrationService.getMessageTemplatesData(reportfieldIdValues,contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Message Templates exist", 2);
                contextObj.enableMenu = [1];
            }
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 735, contextObj.administrationService, contextObj.menuData.length);
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 1:
                this.addClick();
                break;
            case 2:
                this.editClick();
                break;
            case 3:
                this.deleteClick();
                break;
        }
    }

    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(this.msgCategoryId);
    };
    public onSort(objGrid: any) {
        this.dataLoad(this.msgCategoryId);
    }

    public addClick() {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Message Template";
        this.administrationService.loadMessageTemplateAddEditFields(0, 1,'').subscribe(function (resultData) {
            contextObj.fieldDetailsAdd = resultData["Data"];
            for (let i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                if (contextObj.fieldDetailsAdd[i]["ReportFieldId"] == 5472)
                {
                    contextObj.fieldDetailsAdd[i].FieldValue = contextObj.msgCategoryId.toString();
                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                }
                else if (contextObj.fieldDetailsAdd[i]["ReportFieldId"] == 5474) {
                    contextObj.fieldDetailsAdd[i].FieldValue = "True";
                }
                else if (contextObj.fieldDetailsAdd[i]["ReportFieldId"] == 5477) {
                    contextObj.fieldDetailsAdd[i].FieldValue = "False";
                }
                else if (contextObj.fieldDetailsAdd[i]["ReportFieldId"] == 5476) {
                    contextObj.fieldDetailsAdd[i].FieldValue = "0";
                }
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        })
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Message Template";
        var contextObj = this;
      
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Message Template", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                var reportfieldIdValues = new Array<ReportFieldArray>();
                reportfieldIdValues.push({ ReportFieldId: 5472, Value: this.msgCategoryId.toString() })
                this.administrationService.loadMessageTemplateAddEditFields(this.inputItems.selectedIds[0], 2, JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
                    contextObj.fieldDetailsAdd = result["Data"];
                    for (let i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                        if (contextObj.fieldDetailsAdd[i]["ReportFieldId"] == 5472) {
                            contextObj.fieldDetailsAdd[i].IsEnabled = false;
                        }
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }

    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Message Template", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.rowData["IsStatic"] == true) {
                contextObj.notificationService.ShowToaster("Selected Message Template is static, cannot be deleted", 5);
            }
            else {
                this.administrationService.checkMessageTemplateInUse(this.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                    if (returnCheck["Data"] == 0)
                        contextObj.notificationService.ShowToaster("Selected Message Template is in use, cannot be deleted", 5);
                    else
                        contextObj.showSlide = !contextObj.showSlide;
                });
            }
        }
    }

    submitReturn(event) {
        let retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];

        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        } else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }


    deleteMessageTemplate() {
        var contextObj = this;
        contextObj.administrationService.deleteMessageTemplate(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Message Template deleted", 3);
            } else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Message Template is static, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    }
    //slide events/////


    okDelete(event: Event) {
        this.showSlide = !this.showSlide;
        this.deleteMessageTemplate();
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
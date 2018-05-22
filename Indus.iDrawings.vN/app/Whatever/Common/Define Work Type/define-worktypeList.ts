import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { IField } from  '../../../Framework/Models/Interface/IField';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { Notification } from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { WorkFlowService } from '../../../Models/Common/workflow.service';
import { DefineWorkTypeAddEditComponent } from './define-worktypeaddedit';
import { SetNotificationComponent } from './set-notification';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'define-workType',
    templateUrl: './app/Views/Common/Define Work Type/define-worktypeList.html',
    directives: [SplitViewComponent, FieldComponent, SubMenu, GridComponent, PagingComponent, SlideComponent, DefineWorkTypeAddEditComponent, SetNotificationComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, NotificationService, GeneralFunctions, WorkFlowService, ValidateService],
    inputs: ['moduleId', 'workFlowCategoryId']
})

export class DefineWorkTypeComponent implements OnInit {
    pageTitle: string;
    showSlide: boolean = false;
    position: any = "top-right";
    fieldObject: IField[];
    fieldDetailsAddEdit: IField[];
    fieldDetailsSetNotification: IField[];
    itemsSource: any[];
    actionPointDetails: any[];
    moduleId: number = 0;
    workFlowCategoryId: number = 0;
    isWorkFlowExists: any;
    isGeneral: boolean = false;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    action: string;
    btnName: string;
    target: number;
    entityCategoryId: number;
    isSiteAdmin: boolean = true;
    messageTemplateCategoryId: number;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: "ASC", sortCol: "" };
    menuData = [
        {
            "id": 0,
            "title": "Add",
            "image": "Add",
            "path": "Add",
            "submenu": null
        },
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        },
        {
            "id": 3,
            "title": "Notifications",
            "image": "Notifications",
            "path": "Notifications",
            "submenu": null
        }
    ];
    enableMenu = [];
    refreshgrid;
    constructor(private generFun: GeneralFunctions, private schedulingService: SchedulingService, private workFlowService: WorkFlowService, private notificationService: NotificationService, private validateService: ValidateService, private administrationService: AdministrationService) {
    }

    ngOnInit(): void {
        this.btnName = "Add";
        var contextObj = this;
        contextObj.administrationService.CheckIsSiteLevelAdmin(contextObj.moduleId).subscribe(function (result) {
            contextObj.isSiteAdmin = result == 1 ? true : false;           
        });
        this.schedulingService.getFieldsList().subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
        })
        this.schedulingService.getDefineWorkTypesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.moduleId, 0).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                contextObj.changeEnableMenu();
            }
            else {
                contextObj.notificationService.ShowToaster("No Work Types exist", 2);
                contextObj.changeEnableMenu();
            }
        });
    }

    public changeEnableMenu() {

        switch (this.workFlowCategoryId) {
            case 1: /*WorkOrder*/
                this.enableMenu = this.totalItems > 0 ? [0, 1, 2, 3] : [0];
                break;
            case 8: /*Scheduling*/
                this.enableMenu = this.totalItems == 0 ? [0] : (this.totalItems == 1 ? [1, 2] : [2]);
                break;
            default:
                this.enableMenu = this.totalItems > 0 ? [0, 1, 2] : [0];
                break;
        }
    }

    public pageChanged(event: any) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.schedulingService.getDefineWorkTypesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.moduleId, 0).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.schedulingService.getDefineWorkTypesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.moduleId, 0).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"])
        });
    }

    public onSubMenuChange(event: any) {
        switch (event.value) {
            case 0:
                this.target = 1;
                this.addClick();
                break;
            case 1:
                this.target = 1;
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                this.target = 2;
                this.notificationsClick();
                break;
        }
    }

    public addClick() {
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Work Type";
        var contextObj = this;
        this.schedulingService.loadDefineWorkTypesAddEdit(0, 1, 0, this.moduleId).subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = resultData["Data"];
            var workFlowCategory = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 1001 });
            if (workFlowCategory.LookupDetails.LookupValues.length == 1) {
                workFlowCategory.FieldValue = workFlowCategory.LookupDetails.LookupValues[0].Id.toString();
                contextObj.loadWorkFlowEntityLookups();
            }
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    }

    public editClick() {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Work Type";
        var contextObj = this;
        this.isGeneral = this.inputItems.rowData["IsGeneral"];
        this.isWorkFlowExists = this.inputItems.rowData["IsWorkflowExists"];
        console.log("isGeneral", this.isGeneral);
        console.log("isWorkFlowExists", this.isWorkFlowExists);
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.schedulingService.loadDefineWorkTypesAddEdit(this.inputItems.selectedIds[0], 2, this.inputItems.rowData["WorkflowCategoryId"], this.moduleId).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = resultData["Data"];
                for (var i = 0; i < contextObj.fieldDetailsAddEdit.length; i++) {
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1001) {
                        contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                        contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                        contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                    }
                    if (contextObj.fieldDetailsAddEdit[i]["FieldId"] == 1937) {
                        if (contextObj.isWorkFlowExists == 1 || contextObj.moduleId == 4) {
                            contextObj.fieldDetailsAddEdit[i]["IsMandatory"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsEnabled"] = false;
                            contextObj.fieldDetailsAddEdit[i]["IsVisible"] = true;
                        }
                    }
                }
                contextObj.loadWorkFlowEntityLookups();
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public loadWorkFlowEntityLookups() {
        var contextObj = this;
        var workFlowCategory = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 1001 });
        contextObj.schedulingService.loadWorkFlowEntityLookups(workFlowCategory.FieldValue, workFlowCategory.FieldId, contextObj.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["LookupValues"].length > 0) {
                var workFlowEntity = contextObj.fieldDetailsAddEdit.find(function (item) { return item.FieldId === 1937 });
                workFlowEntity.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                if (workFlowEntity.LookupDetails.LookupValues.length == 1) {
                    workFlowEntity.MultiFieldValues = [workFlowEntity.LookupDetails.LookupValues[0].Id.toString()];
                }
            }
        });
    }

    public deleteClick() {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.schedulingService.checkWorkTypeInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (inUse) {
                if (inUse["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Work Type in use, cannot be deleted", 5);
                } else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            }); 
        }
    }

    public deleteWorkTypes() {
        var contextObj = this;
        this.schedulingService.postDeleteDefineWorkType(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].ServerId >= 0) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.changeEnableMenu();
                    contextObj.notificationService.ShowToaster("No Work Types exist", 2);
                }
                contextObj.notificationService.ShowToaster("Selected Work Type deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    }

    OnSuccessfulSubmit(event: any) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.changeEnableMenu();
                }
            } else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = false;
        }
    }

    public notificationsClick() {
        this.action = "setNotification";
        this.btnName = "Save Changes";
        this.pageTitle = "Set Notification";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("Select a Work Type", 2);
        } else {
            this.workFlowService.loadSetNotification(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsSetNotification = resultData["Data"];
                for (let i = 0; i < contextObj.fieldDetailsSetNotification.length; i++) {
                    switch (contextObj.fieldDetailsSetNotification[i].FieldId) {
                        case 2801:
                            var arrList = new Array();
                            arrList.push(
                                {
                                    ReportFieldId: 5873,
                                    Value: contextObj.inputItems.selectedIds[0]
                                }
                            );
                            contextObj.workFlowService.loadActionPoint(51182, JSON.stringify(arrList)).subscribe(function (resultData) {
                                if (resultData["Data"] != "[]") {
                                    contextObj.actionPointDetails = JSON.parse(resultData["Data"]);
                                       
                                    contextObj.fieldDetailsSetNotification[i].LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                    if (contextObj.fieldDetailsSetNotification[i].LookupDetails.LookupValues.length == 1) {
                                        contextObj.fieldDetailsSetNotification[i].HasValidationError = false;
                                        contextObj.fieldDetailsSetNotification[i].FieldValue = contextObj.fieldDetailsSetNotification[i].LookupDetails.LookupValues[0].Id.toString();
                                        contextObj.initiateValidation(contextObj.fieldDetailsSetNotification[i].FieldId, contextObj.fieldDetailsSetNotification[i]);
                                         
                                        var ddlOutcome = contextObj.fieldDetailsSetNotification.find(function (item) {
                                            return item.FieldId === 2802;
                                        });

                                        contextObj.workFlowService.loadOutcome(contextObj.fieldDetailsSetNotification[i].FieldValue, 2801).subscribe(function (resultData) {
                                            if (resultData["Data"]["LookupValues"].length == 1) {
                                                ddlOutcome.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                ddlOutcome.FieldValue = ddlOutcome.LookupDetails.LookupValues[0].Id.toString();
                                                ddlOutcome.HasValidationError = false;
                                                contextObj.initiateValidation(ddlOutcome.FieldId, ddlOutcome);
                                            }
                                            var ddlMessageTemplate = contextObj.fieldDetailsSetNotification.find(function (item) {
                                                return item.FieldId === 2803;
                                            });
                                            var dyLstBxRecipients = contextObj.fieldDetailsSetNotification.find(function (item) {
                                                return item.FieldId === 2804;
                                            });
                                            ddlMessageTemplate.IsMandatory = true;
                                            ddlMessageTemplate.HasValidationError = true;
                                            ddlMessageTemplate.IsLocallyValidated = false;
                                            contextObj.initiateValidation(ddlMessageTemplate.FieldId, ddlMessageTemplate);
                            
                                            var actionPoint = contextObj.actionPointDetails.find(function (item) {
                                                return item.Id === +contextObj.fieldDetailsSetNotification[i].FieldValue;
                                            });
                                            contextObj.entityCategoryId = actionPoint.EntityCategoryId;
                                            if (contextObj.entityCategoryId == 1) {
                                                contextObj.messageTemplateCategoryId = 1;
                                            } else if (contextObj.entityCategoryId == 3) {
                                                contextObj.messageTemplateCategoryId = 11;
                                            }   

                                            var arrList1 = new Array();
                                            arrList1.push(
                                                {
                                                    ReportFieldId: 5472,
                                                    Value: contextObj.messageTemplateCategoryId
                                                }
                                            );
                                            contextObj.workFlowService.loadMessageTemplate(50783, JSON.stringify(arrList1)).subscribe(function (resultData) {
                                                if (resultData["Data"] != "[]") {
                                                    ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);

                                                    var arrMessageTemplate = new Array();
                                                    arrMessageTemplate.push(
                                                        {
                                                            ReportFieldId: 5834,
                                                            Value: ddlOutcome.FieldValue
                                                        }
                                                    );
                                                    contextObj.workFlowService.loadMessageTemplate(51211, JSON.stringify(arrMessageTemplate)).subscribe(function (resultData) {
                                                        if (resultData["Data"] != "[]") {
                                                            //ddlMessageTemplate.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                                            ddlMessageTemplate.FieldValue = JSON.parse(resultData["Data"])[0].Id.toString();
                                                            contextObj.initiateValidation(ddlMessageTemplate.FieldId, ddlMessageTemplate);

                                                        }
                                                        var arrRecipients = new Array();
                                                        arrRecipients.push(
                                                            {
                                                                ReportFieldId: 5834,
                                                                Value: ddlOutcome.FieldValue
                                                            }
                                                        )
                                                        contextObj.workFlowService.loadNotificationRecipientsInWotkType(51203, JSON.stringify(arrRecipients)).subscribe(function (resultData) {
                                                            if (resultData["Data"] != "[]") {
                                                                dyLstBxRecipients.LookupDetails.LookupValues = JSON.parse(resultData["Data"]);
                                                            }
                                                        });
                                                        arrRecipients = [];
                                                    });
                                                    arrMessageTemplate = [];

                                                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                                }
                                            });
                                            arrList1 = [];

                                            
                                        });
                                    }
                                    else {
                                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                                    }
                                }
                               
                            });
                            arrList = [];
                            break;
                    }
                }              
                //contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    }

    public initiateValidation(id: any, fieldObject: IField) {
        var contextObj = this;
        var el = <HTMLElement>document.getElementById(id);
        setTimeout(function () {
            contextObj.validateService.initiateValidation(fieldObject, contextObj, true, el);
        }, 100);
    }

    public inlineDelete(event: any) {
        this.deleteWorkTypes();
    }

    okDelete(event: Event) {
        this.deleteWorkTypes();
        this.showSlide = !this.showSlide;
    }

    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    getRecipientsList(event) {
        return event["RecipientsList"];
    }
}

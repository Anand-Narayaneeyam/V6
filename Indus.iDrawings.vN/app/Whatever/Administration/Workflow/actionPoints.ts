import { Component, Output, EventEmitter,OnInit} from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService} from '../../../models/administration/administration.service';
import { IField} from '../../../framework/models/interface/ifield';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { ActionPointsAddEditComponent } from './addeditActionPoints';
import { ActionPointUsers} from './actionPointUsers';
import { ActionPointUserGroup } from './actionPointUserGroup';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SectionComponent } from '../../../Framework/Whatever/Section/section.component';
import { SetWorkflowCategoriesComponent } from './setWorkflowCategory';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';


@Component({

    selector: 'action-points',
    templateUrl: 'app/Views/Administration/Workflow/actionPoints.html',
    directives: [PageComponent, GridComponent, SubMenu, SplitViewComponent, Notification, ActionPointsAddEditComponent, ActionPointUsers, ActionPointUserGroup, SectionComponent, PagingComponent, SetWorkflowCategoriesComponent, SlideComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions],
    inputs: []
})

export class WorkFlowActionPoints implements OnInit{
    pageTitle: string;
    pagePath: string;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    btnName: string;
    action: string;
    selectedCellId: any;
    selectedIds: any;
    errorMessage: string;
    ddlStyleName: IField;
    fieldObject: IField[];
    selectedUserIds: any[];
    fieldDetailsAddEdit: IField[];
    fieldDetailsSetWorkflowCategory: IField[];
    categoriesInUse: any[];
    target: number;
    itemsSource: any[];
    showSlide = false;
    showUserSlide = false;
    Position = "bottom-right";
    isSiteAdminEnabled;
    isSiteLevelUser;

    @Output() submitSuccess = new EventEmitter();
    splitViewActionPoint: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Action Point]", selectioMode: "single", sortDir: "ASC", selectedIds: [], allowAdd: false }; 
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
            "id": 3,
            "title": "Delete",
            "image": "Delete",
            "path": "Delete",
            "submenu": null
        },
        {
            "id": 2,
            "title": "Action Point Users / User Groups",
            "image": "Users",
            "path": "Users",
            "submenu": null
        },
        {
            "id": 4,
            "title": "Set Workflow Category",
            "image": "SetWFCategoryAP",
            "path": "SetWFCategoryAP",
            "submenu": null
        }
    ];
    enableMenu = [0, 1, 2, 3];
    sectionAccessExpansionStatus = [{ "title": "Action Point Users", "isExpanded": false }, { "title": "Action Point User Groups", "isExpanded": false }];
    refreshgrid;

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun:GeneralFunctions) {
    }

    ngOnInit() {
        debugger
        this.pagePath = "Administration / Action Points";
        var contextObj = this;
        this.administrationService.getActionPointsColumns().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            for (let i = 0; i < contextObj.fieldObject.length; i++) {
                contextObj.fieldObject[i].IsEnabled = false;
            }
        })
        this.dataLoad();    
    }

    public dataLoad() {
        var contextObj = this;
        this.administrationService.getActionPointsFieldList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Action Points exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    }

    public onSubMenuChange(event: any) {
        var contextObj = this;
        if (event.value == 0) 
        {
            this.addClick();
        }
        else if (event.value == 1)
        {
            this.editClick();
        }
        else if (event.value == 2)
        {
            this.actionPointUsersClick();
        }
        else if (event.value == 3)
        {
            if (contextObj.totalItems > 0) {
                this.deleteClick();
            }
            else {
                contextObj.notificationService.ShowToaster("No Action Points exist", 2);
            }
        }
        else if (event.value == 4)
        {
            this.setWorkFlowCategory();
        }
    }

    public onSort(objGrid: any) {
        this.dataLoad();     
    }

    public addClick() {
        this.pageTitle = "New Action Point";
        this.btnName = "Save";
        this.action = "add";
        var contextObj = this;
        this.target = 1;
        this.administrationService.listActionPointAddEdit(0, 1).subscribe(function (resultData) {
            if (resultData["Data"] != undefined) {
                contextObj.administrationService.getCustomerSubscribedFeatures("189,255").subscribe(function (result) {
                    contextObj.isSiteAdminEnabled = result["Data"][0]["IsSubscribed"];
                    contextObj.isSiteLevelUser = result["Data"][1]["IsSubscribed"];         /* Bug 81968 */

                    for (var i = 0; i < resultData["Data"].length; i++) {
                        if (resultData["Data"][i].FieldId == 682) { /*Enable only when Site Admin exists*/ 
                            resultData["Data"][i].IsVisible = false;
                            resultData["Data"][i].IsEnabled = false;
                            resultData["Data"][i].FieldValue = null;
                        }
                        if (resultData["Data"][i].FieldId == 991) { /*Enable only when Site Admin exists*/ 
                            resultData["Data"][i].IsVisible = false;
                            resultData["Data"][i].IsEnabled = false;
                        }
                        if (resultData["Data"][i].FieldId == 2875) {
                            if (contextObj.isSiteAdminEnabled) {
                                resultData["Data"][i].IsVisible = true;
                                resultData["Data"][i].IsEnabled = true;
                            }
                            if (!contextObj.isSiteLevelUser) {                  /* Bug 81968 */
                                resultData["Data"][i].IsVisible = false;
                                resultData["Data"][i].IsEnabled = false;
                            } else if (contextObj.isSiteLevelUser) {
                                resultData["Data"][i].IsVisible = true;
                                resultData["Data"][i].IsEnabled = true;
                            }
                        }
                    }
                });
            }
            contextObj.fieldDetailsAddEdit = resultData["Data"];
        })
        contextObj.splitViewActionPoint.showSecondaryView = !contextObj.splitViewActionPoint.showSecondaryView;
    }

    public editClick() {
        this.pageTitle = "Edit Action Point";
        this.btnName = "Save Changes";
        this.action = "edit";
        var contextObj = this;
        this.target = 2;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            this.administrationService.listActionPointAddEdit(this.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
                if (resultData["Data"] != undefined) {
                    contextObj.administrationService.getCustomerSubscribedFeatures("189,255").subscribe(function (result) {
                        contextObj.isSiteAdminEnabled = result["Data"][0]["IsSubscribed"];
                        contextObj.isSiteLevelUser = result["Data"][1]["IsSubscribed"];         /* Bug 81968 */

                        for (var i = 0; i < resultData["Data"].length; i++) {
                            if (resultData["Data"][i].FieldId == 682) { /*Enable only when Site Admin exists*/ 
                                resultData["Data"][i].IsVisible = false;
                                resultData["Data"][i].IsEnabled = false;
                                resultData["Data"][i].FieldValue = null;
                            }
                            if (resultData["Data"][i].FieldId == 991) { /*Enable only when Site Admin exists*/ 
                                resultData["Data"][i].IsVisible = false;
                                resultData["Data"][i].IsEnabled = false;
                            }
                            if (resultData["Data"][i].FieldId == 2875) {
                                if (contextObj.isSiteAdminEnabled) {
                                    resultData["Data"][i].IsVisible = true;
                                    resultData["Data"][i].IsEnabled = true;
                                }
                                if (!contextObj.isSiteLevelUser) {                      /* Bug 81968 */
                                    resultData["Data"][i].IsVisible = false;
                                    resultData["Data"][i].IsEnabled = false;
                                } else if (contextObj.isSiteLevelUser) {
                                    resultData["Data"][i].IsVisible = true;
                                    resultData["Data"][i].IsEnabled = true;
                                }
                            }
                        }
                    });
                }
                contextObj.fieldDetailsAddEdit = resultData["Data"];
            })
        }
        contextObj.splitViewActionPoint.showSecondaryView = !contextObj.splitViewActionPoint.showSecondaryView;
        this.btnName = "Save Changes";
    }

    public actionPointUsersClick() {
        var contextObj = this;
        this.pageTitle = "Action Point Users / User Groups";
        this.target = 3;
        contextObj.selectedCellId = null;
        contextObj.splitViewActionPoint.showSecondaryView = true;
        contextObj.selectedCellId = contextObj.inputItems.selectedIds;
    }

    DefaultSetting(event: any) {
        var contextObj = this;
        contextObj.administrationService.postDeleteActionPoints(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                let retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems == 0) {
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Action Point deleted", 3);
            }
        });
        this.showSlide = false;
    }

    cancelClick(value: any) {
        var contextObj = this;
        this.enableMenu = [0, 2];
        this.showSlide = false;
    }

    APDefaultSetting(event: any) {
        var contextObj = this;
        this.target = 3;
        this.splitViewActionPoint.showSecondaryView = true;
        this.showUserSlide = false;
    }

    cancelAPClick(value: any) {
        var contextObj = this;
        this.showUserSlide = false;
    }

    closeSlideDialog(value: any) {
        this.showSlide = false;
        this.showUserSlide = false;
    }

    private onSectionExpandChange(obj) {
        for (var i = 0; i < this.sectionAccessExpansionStatus.length; i++) {
            if (this.sectionAccessExpansionStatus[i].title !== obj[1].title) {
                this.sectionAccessExpansionStatus[i].isExpanded = false;

            } else {
                this.sectionAccessExpansionStatus[i].isExpanded = true;
            }
        }
    }

    public deleteClick() {
        var contextObj = this;
        contextObj.administrationService.postActionPointsInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData.Data == 1) {
                contextObj.notificationService.ShowToaster("Selected Action Point in use, cannot be deleted", 2);
            }
            else {
                contextObj.showSlide = true;
            }
        });
    }

    public setWorkFlowCategory() {
        this.pageTitle = "Set Workflow Category";
        this.target = 4;
        this.action = "setWorkFlowCategory";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select an Action Point", 2);
        } else {
            if (this.inputItems.selectedIds != undefined) {
                var contextObj = this;

                contextObj.administrationService.checkWorkFlowCategoryInUse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    contextObj.categoriesInUse = JSON.parse(resultData["Data"].FieldBinderData);
                    
                });

                contextObj.administrationService.getWorkFlowCategories(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    
                    contextObj.fieldDetailsSetWorkflowCategory = resultData["Data"];
                    var workflowCategory = contextObj.fieldDetailsSetWorkflowCategory.find(function (el) { return el.ReportFieldId === 5843; });
                    var lookups = workflowCategory["LookupDetails"]["LookupValues"];

                    for (var i = 0; i < contextObj.categoriesInUse.length; i++){
                        if (contextObj.categoriesInUse[i]["IsDisabled"] == 1)
                        {
                            var disablelookup = lookups.find(function (el) { return el.Id === contextObj.categoriesInUse[i]["WorkFlowCategoryId"] });
                            if (disablelookup)
                                disablelookup.IsDisabled = true;
                        }
                    }
                    contextObj.splitViewActionPoint.showSecondaryView = !contextObj.splitViewActionPoint.showSecondaryView ;
                });
            }
        }
    }

    pageChanged(event) {
        var contextObj = this;
        contextObj.pageIndex = event.pageEvent.page;
        this.administrationService.getActionPointsFieldList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.notificationService.ShowToaster("No Action Points exist", 2);
                contextObj.enableMenu = [0];
            }
        });     
    }

    OnSuccessfulSubmit(event: any) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            let retUpdatedSrc;
            if (this.action == "add") {
                var addedId;
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                if (event.returnData != undefined) {
                    addedId = JSON.parse(event.returnData)[0].Id;
                    contextObj.selectedCellId = addedId
                    contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                }
                this.showUserSlide = true;
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                //contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
            this.splitViewActionPoint.showSecondaryView = false;
            this.pageTitle = "Action Point Users / User Groups";
        }
    }

    getActionPointResult(event: any) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event.returnData.Data.StatusId == 1) {
            this.administrationService.getActionPointsFieldList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    var itemsSource = JSON.parse(resultData["Data"].FieldBinderData);     //Bug 81881:  Grid Refresh Issue
                    contextObj.generFun.updateDataSource(itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                }
            });    
        }
    }

    getActionPointGroupResult(event: any) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event.returnData.Data.StatusId == 1) {
            this.administrationService.getActionPointsFieldList(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    var itemsSource = JSON.parse(resultData["Data"].FieldBinderData);  //Bug 81881:  Grid Refresh Issue
                    contextObj.generFun.updateDataSource(itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                    contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
                }
            });    
        }
    }

    onSplitViewClose(event) {    //Bug 81881:  Grid Refresh Issue
        this.dataLoad(); 
    }
}
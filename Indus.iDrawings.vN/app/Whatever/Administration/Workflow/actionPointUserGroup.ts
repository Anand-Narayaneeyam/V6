import { Component, Output, EventEmitter, AfterViewInit, Input} from '@angular/core';
import { NgControl} from '@angular/common';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService} from '../../../models/administration/administration.service';
import { IField} from '../../../framework/models/interface/ifield';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { IGrid} from '../../../Framework/Models/Interface/Igrid';
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view';
import { ActionPointsAddEditComponent } from './addeditActionPoints';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { DropDownListComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistComponent.component';
import { CustomRadioComponent} from '../../../framework/whatever/dynamiccontrols/dynamicfields/radiocomponent.component';

@Component({

    selector: 'action-point-user-group',
    templateUrl: 'app/Views/Administration/Workflow/actionPointUserGroup.html',
    directives: [PageComponent, GridComponent, SubMenu, SplitViewComponent, ActionPointsAddEditComponent, DropDownListComponent, CustomRadioComponent],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions],
    inputs: ["selectedGridCellId", "rowData"]
})

export class ActionPointUserGroup implements AfterViewInit {
    pagePath: string;
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    btnName: string;
    action: string;
    @Input() selectedGridCellId: string;
    errorMessage: string;
    ddlStyleName: IField;
    fieldObjectUserGroupData: IField[];
    selectedUserIds: any[];
    fieldDetailsAddEdit: IField[];
    itemsSourceUserGroupData: any[];
    rowData;
    rdAccessLevel;
    ddlSite;
    siteId: any = 0;
    actionPointUserIds = new Array<UserIdsArray>();
    @Output() ActPointUsrgroupSuccess = new EventEmitter();
    splitViewActionPoint: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true };

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generFun: GeneralFunctions) {
    }

    ngAfterViewInit() {
        var contextObj = this;
        if (contextObj.selectedGridCellId != "") {
            this.administrationService.getActionPointUserGroupColumns().subscribe(function (resultData) {
                for (let i = 0; i < resultData["Data"].length; i++) {
                    if (resultData["Data"][i].FieldId == 496) {
                        resultData["Data"][i].IsVisible = false;
                    }
                    else if (resultData["Data"][i].FieldId == 2898) {
                        if (contextObj.rowData["Site Users Required"]) {
                            resultData["Data"][i].FieldLabel = "";
                            resultData["Data"][i].FieldValue = "0";
                            if (contextObj.rowData["SiteId"] != null) {
                                resultData["Data"][i].IsEnabled = false;
                            }
                            contextObj.rdAccessLevel = resultData["Data"][i];
                        }
                    }
                    else if (resultData["Data"][i].FieldId == 2900) {
                        if (contextObj.rowData["Site Users Required"]) {
                            if (contextObj.rowData["SiteId"] != null) {
                                resultData["Data"][i].IsEnabled = false;
                                resultData["Data"][i].FieldValue = contextObj.rowData["SiteId"];
                            }
                            contextObj.ddlSite = resultData["Data"][i];
                        }
                    }
                    else if (resultData["Data"][i].FieldId == 712) {
                        resultData["Data"][i].IsEnabled = false;
                    }
                }
                var removeArr = [500363, 12449];
                contextObj.fieldObjectUserGroupData = resultData["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                })
            })
            contextObj.loadData(0);
        }
        else {
            contextObj.notificationService.ShowToaster("Select an Action Point User Group", 2);
        }
    }

    loadData(siteId) {
        var contextObj = this;
        var reportfieldIdValues = new Array<ReportFieldArray>();
        reportfieldIdValues.push({ ReportFieldId: 12449, Value: siteId.toString() })
        this.administrationService.getActionPointUserGroupList(JSON.stringify(reportfieldIdValues),contextObj.selectedGridCellId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSourceUserGroupData = JSON.parse(resultData["Data"].FieldBinderData);
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                contextObj.itemsSourceUserGroupData = [];
                contextObj.notificationService.ShowToaster("No Action Point User Groups exist", 2);
            }
        })
    }

    rbtnChange(event) {
        if (event["fieldobject"]["FieldValue"] == "1") {
            this.ddlSite.IsEnabled = true;
            this.ddlSite.IsMandatory = true;
            this.ddlSite.HasValidationError = true;
            this.ddlSite.IsLocallyValidated = false;
            this.itemsSourceUserGroupData = [];
        }
        else {
            this.ddlSite.FieldValue = "-1";
            this.ddlSite.IsEnabled = false;
            this.ddlSite.IsMandatory = false;
            this.ddlSite.HasValidationError = false;
            this.ddlSite.IsLocallyValidated = true;
            this.siteId = 0;
            this.loadData(0);
        }
    }

    ddlOnChange(value) {
        this.siteId = value;
        if (this.siteId != -1)
            this.loadData(this.siteId);
        else
            this.itemsSourceUserGroupData = [];
    }

    public onSort(objGrid: any) {
        var contextObj = this;
        this.loadData(this.siteId);
    }

    updateActionPointUsers(event) {
        var contextObj = this;
        if (this.ddlSite && this.ddlSite.HasValidationError == true)
            return;
        var arrayList = new Array<ReportFieldArray>();
        var hasSelectedIds: boolean = false;
        for (let i = 0; i < contextObj.itemsSourceUserGroupData.length; i++) {
            if (contextObj.itemsSourceUserGroupData[i]["Select All"] == true) {
                hasSelectedIds = true;
                arrayList.push({
                    ReportFieldId: 6295,
                    Value: contextObj.itemsSourceUserGroupData[i].Id.toString()
                });
            }
        }
        if (this.siteId != undefined && this.siteId != null)
            arrayList.push({ ReportFieldId: 12449, Value: this.siteId.toString() })

        if (hasSelectedIds == true) {
            this.administrationService.postSubmitActionPointUserGroup(JSON.stringify(arrayList), contextObj.selectedGridCellId).subscribe(function (resultData) {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("User Groups updated", 3);
                        break;
                    case 1:
                        contextObj.notificationService.ShowToaster("User Groups updated", 3);
                        contextObj.ActPointUsrgroupSuccess.emit({
                            returnData: resultData
                        });
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("User Groups updated", 3);
                        }
                        break;
                }
            })
        }
        else {
            contextObj.administrationService.checkActionPointUsersAndUserGroup(contextObj.selectedGridCellId, 1).subscribe(function (resultData) {
                
                if (resultData.Data == "True") {
                    contextObj.administrationService.postSubmitActionPointUserGroup(JSON.stringify(arrayList), contextObj.selectedGridCellId).subscribe(function (resultData) {
                        
                        switch (resultData["Data"].StatusId) {
                            case 0:
                                contextObj.notificationService.ShowToaster("User Groups updated", 3);
                                break;
                            case 1:
                                contextObj.notificationService.ShowToaster("User Groups updated", 3);
                                contextObj.ActPointUsrgroupSuccess.emit({
                                    returnData: resultData
                                });
                                break;
                            case 3:
                                if (resultData["Data"].ServerId == -1) {
                                    contextObj.notificationService.ShowToaster("User Groups updated", 3);
                                }
                                break;
                        }
                    });
                }
                else
                    contextObj.notificationService.ShowToaster("Select at least one Action Point User Groups", 2);
            });
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
export interface UserIdsArray {
    Id: number;
}
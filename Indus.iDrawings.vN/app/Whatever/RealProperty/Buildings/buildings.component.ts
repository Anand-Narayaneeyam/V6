import { Component, Input, AfterViewInit } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RealPropertyService } from '../../../Models/RealProperty/realproperty.service'
import { IField } from '../../../Framework/Models/Interface/IField'
import { SubMenu } from '../../../Framework/Whatever/Submenu/submenu.component';
import { GridComponent } from '../../../Framework/Whatever/Grid/grid.component'
import { PagingComponent } from '../../../Framework/Whatever/Paging/paging.component';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IGrid } from '../../../Framework/Models/Interface/Igrid'
import { Notification } from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import { PageComponent } from '../../../Framework/Whatever/Page/page.component';
import { TabsComponent } from '../../../Framework/Whatever/Tab/tabs.component'
import { TabComponent } from '../../../Framework/Whatever/Tab/tab.component';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { ISplitView } from '../../../Framework/Models/Interface/ISplit-view'
//importing addedit component
import { BuildingEditComponent } from './buildings-edit.component';
import { ExportToExcel } from '../../../Framework/Models/Export/exporttoexcel.service';
//importing rennovation component
import { BuildingRennovationComponent } from './buildings-rennovations.component';


//importing Attachment
import { AttachmentsComponent } from '../../Common/Attachments/attachments.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'rpmbuilding-list',
    templateUrl: './app/Views/RealProperty/Buildings/buildings.component.html',
    directives: [SubMenu, GridComponent, PagingComponent, FieldComponent, Notification, PageComponent,
        TabsComponent, TabComponent, SplitViewComponent, BuildingEditComponent, BuildingRennovationComponent, AttachmentsComponent],
    providers: [HTTP_PROVIDERS, NotificationService, GeneralFunctions, RealPropertyService, ExportToExcel, AdministrationService]
})

export class RealPropertyBuildingsComponent {

    pagePath: string = "Real Property / Data";
    fieldObject: IField[];
    fieldDetailsAdd1: IField[];
    itemsSource: any[];
    inputItems: IGrid = { dataKey: "BuildingId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
    totalItems: number = 0;
    itemsPerPage: number = 0;
    pageIndex: number = 0;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    action: string;
    btnName: string;
    //for input which TAB is clicked 1: owned 3:lease
    OwnerShipId: any = 1;
    //Which menu clicked : edit or rennovation 1:edit 2:rennovation,3:attachments   
    menuClick: any;

    //attachment cateogry for attachment tab
    attachmentCategoryId: any;

    //Passing building name(for showing),building date(for delete) in rennovation page
    BuildingName: any;
    exportDataSource: any;
    selectedTab: number = 0;
    newTabLeased: boolean = false;
    enableMenu = [1, 2, 3, 4];
    pageTitle: string;
    menuData = [
        {
            "id": 1,
            "title": "Edit",
            "image": "Edit",
            "path": "Edit",
            "submenu": null,
            "privilegeId": 94
        },
        {
            "id": 2,
            "title": "Renovations",
            "image": "Renovations",
            "path": "Renovations",
            "submenu": null,
            "privilegeId": 0 
        },
        {
            "id": 3,
            "title": "Attachments",
            "image": "Attachments",
            "path": "Attachments",
            "submenu": null,
            "privilegeId": 0 
        },
        {
            "id": 4,
            "title": "Export",
            "image": "Export",
            "path": "Export",
            "submenu": null,
            "privilegeId": 0 
        }


    ];
    BuildingConstructionDate: any;
    constructor(private realPropertyService: RealPropertyService, private notificationService: NotificationService, private generFun: GeneralFunctions, private exportObject: ExportToExcel, private administrationService: AdministrationService) {
    }
    ngAfterViewInit() {
        //debugger;     
        var contextObj = this;
        this.realPropertyService.getBuildingColumnData().subscribe(function (result) {
            for (var i = 0; i < result["Data"].length; i++) {
                if (result.Data[i].FieldLabel.length > 13)
                    result.Data[i]["Width"] = 150;
                if (result.Data[i].FieldLabel.length > 26)
                    result.Data[i]["Width"] = 200;
            }
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
        var callBack = function (data) {
            contextObj.administrationService.getIsModuleAdmin(30).subscribe(function (resultdata) {
                if (resultdata["Data"] == false) {
                    contextObj.menuData = data;
                }
            });
        };
        this.generFun.GetPrivilegesOfPage(this.menuData, callBack, 34, this.administrationService, this.menuData.length);   
    }

    getSelectedTab(event: any) {
        // debugger;  
        var contextObj = this;
        if(this.selectedTab != event[0])
        {
            this.selectedTab = event[0];
            if (event[0] == "0") {
                contextObj.OwnerShipId = 1;
                contextObj.dataLoad(1);
            }
            else {
                contextObj.OwnerShipId = 3;
                contextObj.dataLoad(1);
            }
        }
    }

    //Gridloading function : Passing Parameter ownershipId : 1:owned 3:leased
    public dataLoad(target?: number) {
        //debugger;   
        var contextObj = this;
        var obj = new Array<ReportFieldArray>();
        if (contextObj.OwnerShipId == 1) {
            obj.push(
                { ReportFieldId: 6647, Value: "4" }
            );
        }
        else {
            obj.push(
                { ReportFieldId: 6647, Value: "3" }
            );
        }
        var ReportFieldIdValues = JSON.stringify(obj);
        contextObj.realPropertyService.getBuildingData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir, contextObj.OwnerShipId, ReportFieldIdValues).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
            contextObj.itemsPerPage = result["Data"].RowsPerPage;
            if (contextObj.totalItems == 0) {
                contextObj.notificationService.ShowToaster("No Buildings exist", 2);
                contextObj.enableMenu = [];
            }
        });
    }
    //Page change
    public pageChanged(event: any) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    //sort
    public onSort(objGrid: any) {
        this.dataLoad(0);
    }
    //While changing the menu
    public onSubMenuChange(event: any) {
        //debugger;
        var contextObj = this;
        switch (event.value) {
            case 1://Edit
                this.menuClick = 1;
                this.editClick();
                break;
            case 2://Rennovation
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                } else if (this.inputItems.selectedIds.length == 1) {
                    this.menuClick = 2;
                    this.pageTitle = "Renovations";
                    this.BuildingName = this.inputItems.rowData["Building"];
                    this.BuildingConstructionDate = this.inputItems.rowData["Construction Date"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                break;
            case 3://Attachments

                var contextObj = this;
                this.menuClick = 3;
                this.attachmentCategoryId = 3;
                this.BuildingAttachment();
                break;
            case 4:
                var contextObj = this;
                this.exportClick(this.selectedTab);
        }
    }
    public exportClick(event) {
        var contextObj = this;
        var obj = new Array<ReportFieldArray>();
        //if (contextObj.OwnerShipId == 1) {
        //    obj.push(
        //        { ReportFieldId: 6647, Value: "4" }
        //    );
        //}
        //else {
        //    obj.push(
        //        { ReportFieldId: 6647, Value: "3" }
        //    );
        //}

       
        switch (contextObj.OwnerShipId) {

            case 1:

                var fileName = "Owned";
                obj.push(
                    { ReportFieldId: 6647, Value: "4" }
                );
               

                if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.exportDataSource = JSON.stringify(contextObj.inputItems.rowData.slice());
                    contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObject, "OwnedBuilding", function (retCode) {
                        if (retCode == 0) {
                            contextObj.notificationService.ShowToaster("Owned Building data exported", 3);
                        }
                        else { contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
                    });
                }
                else {
                   
                    var input = contextObj.realPropertyService.getExportData(1, 0, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, contextObj.fieldObject, JSON.stringify(obj), "OwnedBuilding", "", "[]");
                    
                    contextObj.exportObject.ExportDataFromServer(input, 1, "OwnedBuilding", function (retCode) {
                        if (retCode == 0) {
                            contextObj.notificationService.ShowToaster("Owned Building data exported", 3);
                        }
                        else contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    });
                }

                break;
            case 3:

                var fileName = "Leased";
               
                obj.push(
                    { ReportFieldId: 6647, Value: "3" }
                );
                if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.exportDataSource = JSON.stringify(contextObj.inputItems.rowData.slice());
                    contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObject, "LeasedBuilding", function (retCode) {
                        if (retCode == 0) {
                            contextObj.notificationService.ShowToaster("Leased Building Data exported", 3);
                        }
                        else { contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3); }
                    });
                }
                else {

                    
                    var input = contextObj.realPropertyService.getExportData(1, 0, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, contextObj.fieldObject, JSON.stringify(obj), "LeasedBuilding", "", "[]");
                    
                    contextObj.exportObject.ExportDataFromServer(input, 1, "LeasedBuilding", function (retCode) {
                        if (retCode == 0) {
                            contextObj.notificationService.ShowToaster("Leased Building Data exported", 3);
                        }
                        else contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    });

                }
                break;

        }



    }
    //While clicking edit icon
    public editClick() {
        //debugger;
        this.pageTitle = "Edit Building";
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else {
            console.log("editid", this.inputItems.selectedIds[0])
            if (this.inputItems.rowData["SiteStatus"] == "Active") {
                this.realPropertyService.loadBuildingAddEdit(this.inputItems.selectedIds[0], "edit").subscribe(function (result) {
                    contextObj.fieldDetailsAdd1 = result["Data"];
                    contextObj.fieldDetailsAdd1[3].IsVisible = false;
                    contextObj.fieldDetailsAdd1[6].IsEnabled = false;

                    //console.log("Field object" + contextObj.fieldDetailsAdd1)
                    contextObj.fieldDetailsAdd1.find(function (el) {
                        //console.log("FieldId" + el.FieldId)
                        if (el.FieldId == 54) {
                            el.LookupDetails.PopupComponent = { Name: "Validate on Map", showImage: false };
                            return true
                        }
                    })

                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
            else {
               
                this.notificationService.ShowToaster("Site is not active, Building cannot be edited", 2);
            }
        }

    }
    //While clicking attachment icon
    public BuildingAttachment() {
        var contextObj = this;
        this.pageTitle = "Attachments";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        } else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Space", 2);
        } else {
            this.splitviewInput.showSecondaryView = true;
        }
    }

    //after submit : update the datasource : so that the grid will be updated
    submitReturn(event) {
        //debugger;
        var contextObj = this;
        let retUpdatedSrc;
        var contextObj = this;
        if (this.btnName = "Save Changes") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
        }
        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    }

    //Inline edit : from the grid
    public inlineEdit(event: any) {
        //debugger;
        //var contextObj = this;
        //contextObj.realPropertyService.InlineAddUpdateBuilding(event, contextObj.inputItems.selectedIds[0], 2).subscribe(function (resultData) {
        //    switch (resultData["Data"].StatusId) {
        //        case 0:
        //            contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        //            break;
        //        case 1:
        //            contextObj.notificationService.ShowToaster("Building details updated", 3);
        //            break;
        //        case 3:
        //            if (resultData["Data"].ServerId == -1) {
        //                contextObj.notificationService.ShowToaster("Building already exists", 5);
        //            }
        //            break;
        //    }
        //});
    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

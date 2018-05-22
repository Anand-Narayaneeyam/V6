var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var realproperty_service_1 = require('../../../Models/RealProperty/realproperty.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
//importing addedit component
var buildings_edit_component_1 = require('./buildings-edit.component');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
//importing rennovation component
var buildings_rennovations_component_1 = require('./buildings-rennovations.component');
//importing Attachment
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var RealPropertyBuildingsComponent = (function () {
    function RealPropertyBuildingsComponent(realPropertyService, notificationService, generFun, exportObject, administrationService) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.exportObject = exportObject;
        this.administrationService = administrationService;
        this.pagePath = "Real Property / Data";
        this.inputItems = { dataKey: "BuildingId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        //for input which TAB is clicked 1: owned 3:lease
        this.OwnerShipId = 1;
        this.selectedTab = 0;
        this.newTabLeased = false;
        this.enableMenu = [1, 2, 3, 4];
        this.menuData = [
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
    }
    RealPropertyBuildingsComponent.prototype.ngAfterViewInit = function () {
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
    };
    RealPropertyBuildingsComponent.prototype.getSelectedTab = function (event) {
        // debugger;  
        var contextObj = this;
        if (this.selectedTab != event[0]) {
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
    };
    //Gridloading function : Passing Parameter ownershipId : 1:owned 3:leased
    RealPropertyBuildingsComponent.prototype.dataLoad = function (target) {
        //debugger;   
        var contextObj = this;
        var obj = new Array();
        if (contextObj.OwnerShipId == 1) {
            obj.push({ ReportFieldId: 6647, Value: "4" });
        }
        else {
            obj.push({ ReportFieldId: 6647, Value: "3" });
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
    };
    //Page change
    RealPropertyBuildingsComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    //sort
    RealPropertyBuildingsComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    //While changing the menu
    RealPropertyBuildingsComponent.prototype.onSubMenuChange = function (event) {
        //debugger;
        var contextObj = this;
        switch (event.value) {
            case 1:
                this.menuClick = 1;
                this.editClick();
                break;
            case 2:
                if (this.inputItems.selectedIds.length > 1) {
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                else if (this.inputItems.selectedIds.length == 1) {
                    this.menuClick = 2;
                    this.pageTitle = "Renovations";
                    this.BuildingName = this.inputItems.rowData["Building"];
                    this.BuildingConstructionDate = this.inputItems.rowData["Construction Date"];
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                }
                break;
            case 3:
                var contextObj = this;
                this.menuClick = 3;
                this.attachmentCategoryId = 3;
                this.BuildingAttachment();
                break;
            case 4:
                var contextObj = this;
                this.exportClick(this.selectedTab);
        }
    };
    RealPropertyBuildingsComponent.prototype.exportClick = function (event) {
        var contextObj = this;
        var obj = new Array();
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
                obj.push({ ReportFieldId: 6647, Value: "4" });
                if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.exportDataSource = JSON.stringify(contextObj.inputItems.rowData.slice());
                    contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObject, "OwnedBuilding", function (retCode) {
                        if (retCode == 0) {
                            contextObj.notificationService.ShowToaster("Owned Building data exported", 3);
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                        }
                    });
                }
                else {
                    var input = contextObj.realPropertyService.getExportData(1, 0, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, contextObj.fieldObject, JSON.stringify(obj), "OwnedBuilding", "", "[]");
                    contextObj.exportObject.ExportDataFromServer(input, 1, "OwnedBuilding", function (retCode) {
                        if (retCode == 0) {
                            contextObj.notificationService.ShowToaster("Owned Building data exported", 3);
                        }
                        else
                            contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    });
                }
                break;
            case 3:
                var fileName = "Leased";
                obj.push({ ReportFieldId: 6647, Value: "3" });
                if (contextObj.inputItems.selectedIds.length > 1) {
                    contextObj.exportDataSource = JSON.stringify(contextObj.inputItems.rowData.slice());
                    contextObj.exportObject.ExportData(contextObj.exportDataSource, contextObj.fieldObject, "LeasedBuilding", function (retCode) {
                        if (retCode == 0) {
                            contextObj.notificationService.ShowToaster("Leased Building Data exported", 3);
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                        }
                    });
                }
                else {
                    var input = contextObj.realPropertyService.getExportData(1, 0, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, contextObj.fieldObject, JSON.stringify(obj), "LeasedBuilding", "", "[]");
                    contextObj.exportObject.ExportDataFromServer(input, 1, "LeasedBuilding", function (retCode) {
                        if (retCode == 0) {
                            contextObj.notificationService.ShowToaster("Leased Building Data exported", 3);
                        }
                        else
                            contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
                    });
                }
                break;
        }
    };
    //While clicking edit icon
    RealPropertyBuildingsComponent.prototype.editClick = function () {
        //debugger;
        this.pageTitle = "Edit Building";
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            console.log("editid", this.inputItems.selectedIds[0]);
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
                            return true;
                        }
                    });
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
            else {
                this.notificationService.ShowToaster("Site is not active, Building cannot be edited", 2);
            }
        }
    };
    //While clicking attachment icon
    RealPropertyBuildingsComponent.prototype.BuildingAttachment = function () {
        var contextObj = this;
        this.pageTitle = "Attachments";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Space", 2);
        }
        else {
            this.splitviewInput.showSecondaryView = true;
        }
    };
    //after submit : update the datasource : so that the grid will be updated
    RealPropertyBuildingsComponent.prototype.submitReturn = function (event) {
        //debugger;
        var contextObj = this;
        var retUpdatedSrc;
        var contextObj = this;
        if (this.btnName = "Save Changes") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
        }
        contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    //Inline edit : from the grid
    RealPropertyBuildingsComponent.prototype.inlineEdit = function (event) {
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
    };
    RealPropertyBuildingsComponent = __decorate([
        core_1.Component({
            selector: 'rpmbuilding-list',
            templateUrl: './app/Views/RealProperty/Buildings/buildings.component.html',
            directives: [submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, page_component_1.PageComponent,
                tabs_component_1.TabsComponent, tab_component_1.TabComponent, split_view_component_1.SplitViewComponent, buildings_edit_component_1.BuildingEditComponent, buildings_rennovations_component_1.BuildingRennovationComponent, attachments_component_1.AttachmentsComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, realproperty_service_1.RealPropertyService, exporttoexcel_service_1.ExportToExcel, administration_service_1.AdministrationService]
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel, administration_service_1.AdministrationService])
    ], RealPropertyBuildingsComponent);
    return RealPropertyBuildingsComponent;
}());
exports.RealPropertyBuildingsComponent = RealPropertyBuildingsComponent;
//# sourceMappingURL=buildings.component.js.map
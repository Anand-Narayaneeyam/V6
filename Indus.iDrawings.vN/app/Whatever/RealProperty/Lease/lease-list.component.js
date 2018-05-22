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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var tabs_component_1 = require('../../../Framework/Whatever/Tab/tabs.component');
var tab_component_1 = require('../../../Framework/Whatever/Tab/tab.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var leaseRenewal_list_component_1 = require('./leaseRenewal-list.component');
var lease_addedit_component_1 = require('./lease-addedit.component');
var sublease_addedit_component_1 = require('./sublease-addedit.component');
var areacost_details_1 = require('./areacost-details');
var alert_contacts_1 = require('./alert-contacts');
var rent_paymentlist_1 = require('./rent-paymentlist');
var agreement_clauses_1 = require('../generalsettings/agreement-clauses');
var cancellation_clauses_1 = require('./cancellation-clauses');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var rent_information_1 = require('./rent-information');
var leaseItemUpdate_Building_Floor_component_1 = require('./leaseItemUpdate-Building-Floor.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var exporttoexcel_service_1 = require('../../../Framework/Models/Export/exporttoexcel.service');
var analytics_component_1 = require('../../common/analytics/analytics.component');
var LeaseListComponent = (function () {
    function LeaseListComponent(administrationServices, realPropertyService, notificationService, generFun, exportObject) {
        this.administrationServices = administrationServices;
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.exportObject = exportObject;
        this.pageTitle = "Leases";
        this.pagePath = "Real Property / Leases";
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectedIds: [0], selectioMode: "single", showContextMenu: true };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
        this.leaseRenewalTab = false;
        this.selectedTab = 0;
        this.setFeatureLookupId = 0;
        this.enableMenu = [];
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "subMenu": null,
                "privilegeId": 10049
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "subMenu": null,
                "privilegeId": 10050
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": 10047
            },
            {
                "id": 4,
                "title": "",
                "image": "DisplaySettings",
                "path": "DisplaySettings",
                "subMenu": [
                    {
                        "id": 5,
                        "title": "Area and Cost Details",
                        "image": "Area and Cost Details",
                        "path": "Area and Cost Details",
                        "subMenu": null,
                        "privilegeId": 10038
                    },
                    //{
                    //    "id": 6,
                    //    "title": "Alert",
                    //    "image": "Alert",
                    //    "path": "Alert",
                    //    "subMenu": null
                    //},
                    {
                        "id": 7,
                        "title": "Rent Information",
                        "image": "Rent Information",
                        "path": "Rent Information",
                        "subMenu": null,
                        "privilegeId": 10039
                    },
                    {
                        "id": 8,
                        "title": "Rent Payment",
                        "image": "Rent Payment",
                        "path": "Rent Payment",
                        "subMenu": null,
                        "privilegeId": 10040
                    },
                ]
            },
            {
                "id": 10,
                "title": "Lease Items",
                "image": "Lease Items",
                "path": "Lease Items",
                "subMenu": [
                    {
                        "id": 11,
                        "title": "Building",
                        "image": "Building",
                        "path": "Building",
                        "subMenu": null
                    },
                    {
                        "id": 12,
                        "title": "Floor",
                        "image": "Floor",
                        "path": "Floor",
                        "subMenu": null
                    },
                ]
            },
            {
                "id": 14,
                "title": "Clauses",
                "image": "Clauses",
                "path": "Clauses",
                "subMenu": [
                    {
                        "id": 15,
                        "title": "Agreement Clauses",
                        "image": "Agreement Clauses",
                        "path": "Agreement Clauses",
                        "subMenu": null,
                        "privilegeId": 10043
                    },
                    {
                        "id": 16,
                        "title": "Cancellation Clauses",
                        "image": "Cancellation Clauses",
                        "path": "Cancellation Clauses",
                        "subMenu": null,
                        "privilegeId": 10044
                    }
                ]
            },
            {
                "id": 17,
                "title": "Lease Documents",
                "image": "Lease Documents",
                "path": "Lease Documents",
                "submenu": null
            },
            {
                "id": 3,
                "title": "Lease Renewal",
                "image": "Lease Renewal",
                "path": "Lease Renewal",
                "subMenu": null,
                "privilegeId": 10045
            },
            {
                "id": 18,
                "title": "Export",
                "image": "Export",
                "path": "Export",
                "submenu": null
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.showCostButton = false;
        this.showRentInfoButton = false;
        this.IsCostDataEntered = false;
        this.IsRentDataEntered = false;
        this.sessionUserCatId = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.IsModuleAdmin = false;
        this.analyticsInput = { menuId: 0 };
        this.showAnalytics = false;
    }
    LeaseListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);
        this.realPropertyService.getLeaseListColumns().subscribe(function (result) {
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
        this.realPropertyService.customerSubscribedFeatures("174").subscribe(function (customerSettingsData) {
            if (customerSettingsData.Data[0]["IsSubscribed"] == true) {
                if (customerSettingsData.Data[0]["FeatureLookupId"] == "49") {
                    contextObj.setFeatureLookupId = 49;
                }
                else if (customerSettingsData.Data[0]["FeatureLookupId"] == "50") {
                    contextObj.setFeatureLookupId = 50;
                }
                else if (customerSettingsData.Data[0]["FeatureLookupId"] == "51") {
                    contextObj.setFeatureLookupId = 51;
                }
            }
        });
        contextObj.realPropertyService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserCatId = retData["UserCategoryId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
            if (contextObj.sessionUserRoleId == 6) {
                contextObj.realPropertyService.getIsModuleAdmin(30).subscribe(function (resultData) {
                    if (resultData["Data"] == true) {
                        contextObj.IsModuleAdmin = true;
                    }
                });
            }
        });
    };
    LeaseListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.realPropertyService.getLeaseListData(contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
                contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
            }
            else {
                contextObj.notificationService.ShowToaster("No Leases exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    };
    LeaseListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 0:
                this.addClick();
                break;
            case 1:
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 3:
                this.leaseRenewal();
                break;
            case 5:
                this.areaCostDetails();
                break;
            case 6:
                this.alert();
                break;
            case 7:
                this.rentInformation();
                break;
            case 8:
                this.rentPayment();
                break;
            case 9:
                if (this.canBeSubleased()) {
                    this.subLeaseClick();
                }
                break;
            case 11:
                this.leaseItemBuildingClick();
                break;
            case 12:
                this.leaseItemFloorClick();
                break;
            case 15:
                this.agreementClauses();
                break;
            case 16:
                this.cancellationClauses();
                break;
            case 17:
                this.leaseDocumentsClick();
                break;
            case 18:
                this.exportClick();
                break;
        }
    };
    LeaseListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    LeaseListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    LeaseListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Lease";
        this.realPropertyService.loadLeaseAddEdit(0, "add").subscribe(function (resultData) {
            contextObj.fieldDetailsAddEdit = contextObj.updateFieldProperties(resultData["Data"], "add");
            contextObj.secondaryTarget = 0;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    LeaseListComponent.prototype.editClick = function () {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Lease";
        this.leaseStatus = this.inputItems.rowData["Status"];
        this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            if (this.leaseStatus == "Expired") {
                this.notificationService.ShowToaster("Selected Lease has been expired, cannot be edited", 2);
            }
            else if (this.leaseStatus == "Deleted") {
                this.notificationService.ShowToaster("Selected Lease has been deleted, cannot be edited", 2);
            }
            else if (this.leaseStatus == "Terminated") {
                this.notificationService.ShowToaster("Selected Lease has been terminated, cannot be edited", 2);
            }
            else {
                contextObj.realPropertyService.IsCostRentEntered(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                    switch (resultData["Data"]) {
                        case 0:
                            contextObj.IsCostDataEntered = true;
                            contextObj.IsRentDataEntered = true;
                            break;
                        case 1:
                            contextObj.IsCostDataEntered = false;
                            contextObj.IsRentDataEntered = false;
                            break;
                        case 4:
                            contextObj.IsCostDataEntered = true;
                            contextObj.IsRentDataEntered = false;
                            break;
                        default:
                            contextObj.IsCostDataEntered = false;
                            contextObj.IsRentDataEntered = false;
                            break;
                    }
                    contextObj.realPropertyService.loadLeaseAddEdit(contextObj.inputItems.selectedIds[0], "edit").subscribe(function (result) {
                        contextObj.fieldDetailsAddEdit = contextObj.updateFieldProperties(result["Data"], "edit");
                        contextObj.secondaryTarget = 0;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                });
            }
        }
    };
    LeaseListComponent.prototype.updateStatusLookupValues = function (fieldArray, target, status) {
        if (target == "add") {
            var tempArray = fieldArray.LookupDetails.LookupValues;
            for (var index = 0; index < fieldArray.LookupDetails.LookupValues.length; index++) {
                if (tempArray[index].Id == 1 || tempArray[index].Id == 4 || tempArray[index].Id == 15) {
                    fieldArray.LookupDetails.LookupValues.splice(index, 1);
                    index = -1;
                }
            }
        }
        else {
            if (status == "Draft") {
                var tempArray = fieldArray.LookupDetails.LookupValues;
                for (var index = 0; index < fieldArray.LookupDetails.LookupValues.length; index++) {
                    if (tempArray[index].Id == 4 || tempArray[index].Id == 15) {
                        fieldArray.LookupDetails.LookupValues.splice(index, 1);
                        index = -1;
                    }
                }
            }
            else if (status == "Active") {
                var tempArray = fieldArray.LookupDetails.LookupValues;
                for (var index = 0; index < fieldArray.LookupDetails.LookupValues.length; index++) {
                    if (tempArray[index].Id == 37) {
                        fieldArray.LookupDetails.LookupValues.splice(index, 1);
                        index = -1;
                    }
                }
            }
        }
    };
    LeaseListComponent.prototype.updateFieldProperties = function (fieldObjectArray, target) {
        var contextObj = this;
        if (target == "add") {
            fieldObjectArray.find(function (item) {
                switch (item.ReportFieldId) {
                    case 5775:
                        if (contextObj.setFeatureLookupId == 49 || contextObj.setFeatureLookupId == 51) {
                            item.IsVisible = true;
                            item.IsMandatory = true;
                            item.HasValidationError = true;
                            item.IsLocallyValidated = false;
                        }
                        else if (contextObj.setFeatureLookupId == 50) {
                            item.IsVisible = false;
                            item.IsMandatory = false;
                            item.HasValidationError = false;
                        }
                        break;
                    case 5774:
                        if (contextObj.setFeatureLookupId == 50) {
                            item.IsVisible = true;
                            item.IsMandatory = true;
                            item.HasValidationError = true;
                            item.IsLocallyValidated = false;
                        }
                        else if (contextObj.setFeatureLookupId == 51) {
                            item.IsVisible = false;
                            item.IsMandatory = false;
                            item.HasValidationError = false;
                        }
                        break;
                    case 5778:
                        if (contextObj.setFeatureLookupId == 49 || contextObj.setFeatureLookupId == 51) {
                            item.IsEnabled = false;
                        }
                        else if (contextObj.setFeatureLookupId == 50) {
                            item.IsEnabled = true;
                        }
                        item.IsVisible = false; // temporary hidden 
                        break;
                    case 5771:
                        if (contextObj.setFeatureLookupId == 49) {
                            item.FieldValue = 1;
                            item.IsEnabled = true;
                            item.IsVisible = true;
                            item.IsMandatory = true;
                            item.LookupDetails.LookupValues.sort(function (a, b) {
                                return a.Id - b.Id;
                            });
                        }
                        else if (contextObj.setFeatureLookupId == 50 || contextObj.setFeatureLookupId == 51) {
                            item.FieldValue = 0;
                            item.IsEnabled = false;
                            item.IsVisible = false;
                            item.IsMandatory = false;
                        }
                        break;
                    case 5772:
                        contextObj.updateStatusLookupValues(item, "add", null);
                        item.FieldValue = "37";
                        break;
                    case 6143:
                        item.FieldValue = "1";
                        break;
                    case 6142:
                        this.leaseTypeDdl = item.LookupDetails.LookupValues;
                        break;
                }
            });
        }
        else if (target == "edit") {
            fieldObjectArray.find(function (item) {
                switch (item.ReportFieldId) {
                    case 5775:
                        if (contextObj.setFeatureLookupId == 49 || contextObj.setFeatureLookupId == 51) {
                            item.IsVisible = (contextObj.inputItems.rowData.Tenant != null);
                            item.IsMandatory = (contextObj.inputItems.rowData.Tenant != null);
                        }
                        else if (contextObj.setFeatureLookupId == 50) {
                            item.IsVisible = false;
                            item.IsMandatory = false;
                            item.HasValidationError = false;
                        }
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5774:
                        if (contextObj.setFeatureLookupId == 50) {
                            item.IsVisible = (contextObj.inputItems.rowData.Landlord != null);
                            item.IsMandatory = (contextObj.inputItems.rowData.Landlord != null);
                        }
                        else if (contextObj.setFeatureLookupId == 51) {
                            item.IsVisible = false;
                            item.IsMandatory = false;
                            item.HasValidationError = false;
                        }
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5778:
                        if (contextObj.setFeatureLookupId == 49 || contextObj.setFeatureLookupId == 51) {
                            item.IsEnabled = false;
                        }
                        else if (contextObj.setFeatureLookupId == 50) {
                            item.IsEnabled = (contextObj.inputItems.rowData.Landlord != null);
                            item.FieldValue = (item.FieldValue) == "No" ? false : true;
                        }
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        item.IsVisible = false; // temporary hidden 
                        break;
                    case 5779:
                        item.FieldValue = (item.FieldValue) == "No" ? "false" : "true";
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5771:
                        if (contextObj.setFeatureLookupId == 49) {
                            item.FieldValue = (contextObj.inputItems.rowData.Tenant != null) ? 1 : 0;
                            item.IsEnabled = false;
                            item.IsVisible = true;
                            item.LookupDetails.LookupValues.sort(function (a, b) {
                                return a.Id - b.Id;
                            });
                        }
                        else if (contextObj.setFeatureLookupId == 50 || contextObj.setFeatureLookupId == 51) {
                            item.FieldValue = 0;
                            item.IsEnabled = false;
                            item.IsVisible = false;
                            item.IsMandatory = false;
                        }
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5772:
                        contextObj.updateStatusLookupValues(item, "edit", contextObj.inputItems.rowData.Status);
                        break;
                    case 6142:
                        this.leaseTypeDdl = item.LookupDetails.LookupValues;
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5776: //Lease Category 
                    case 5770:
                    case 6143:
                        if (contextObj.leaseStatus == "Active") {
                            item.IsEnabled = false;
                        }
                        break;
                    case 5696:
                    case 5698:
                    case 5695:
                    case 5697:
                        if (contextObj.leaseStatus == "Active") {
                            item.ReadOnlyMode = true;
                        }
                        break;
                }
            });
        }
        return fieldObjectArray;
    };
    LeaseListComponent.prototype.OnSuccessfulSubmit = function (event) {
        this.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
                if (this.totalItems > 0) {
                    this.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
                }
            }
            else {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                var contextObj = this;
                this.inputItems.rowData = retUpdatedSrc.itemSrc.find(function (item) { return item.Id === contextObj.inputItems.selectedIds[0]; });
                this.refreshgrid = this.refreshgrid.concat([true]);
            }
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    LeaseListComponent.prototype.deleteClick = function () {
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if (this.leaseStatus == "Active") {
            this.notificationService.ShowToaster("Selected Lease is Active, cannot be deleted", 2);
        }
        else if (this.leaseStatus == "Deleted") {
            this.notificationService.ShowToaster("Selected Lease is already deleted", 2);
        }
        else if (this.leaseStatus == "Terminated") {
            this.notificationService.ShowToaster("Selected Lease has been Terminated, cannot be deleted", 2);
        }
        else if (this.leaseStatus == "Expired") {
            this.notificationService.ShowToaster("Selected Lease has been Expired, cannot be deleted", 2);
        }
        else if (this.leaseStatus == "Draft") {
            this.showSlide = !this.showSlide;
        }
    };
    LeaseListComponent.prototype.deleteLease = function () {
        var contextObj = this;
        this.realPropertyService.deleteLease(this.inputItems.selectedIds[0], this.inputItems.rowData["Lease Renewal Count"]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Lease exist", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Lease deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    LeaseListComponent.prototype.leaseRenewal = function () {
        var contextObj = this;
        this.canBeRenewed = this.inputItems.rowData["Can be Renewed"];
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if (this.leaseStatus == "Active" && this.canBeRenewed == "Yes") {
            this.localselection = 1;
            this.leaseRenewalTab = true;
            setTimeout(function () {
                contextObj.selectedTab = 1;
            }, 50);
        }
        else if (this.leaseStatus == "Active" && this.canBeRenewed == "No") {
            this.notificationService.ShowToaster("Selected Lease cannot be renewed", 2);
        }
        else {
            this.notificationService.ShowToaster("Selected Lease is not Active, cannot be renewed", 2);
        }
    };
    LeaseListComponent.prototype.getSelectedTab = function (event) {
        this.deleteIndex = 0;
        if (this.localselection > 0 && event[0] == 0) {
            this.deleteIndex = this.localselection;
        }
    };
    LeaseListComponent.prototype.onTabClose = function (event) {
        this.leaseRenewalTab = false;
        this.selectedTab = event[0];
    };
    LeaseListComponent.prototype.areaCostDetails = function () {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save";
        this.pageTitle = "Area and Cost Details";
        this.leaseType = this.inputItems.rowData["Lease Type"];
        this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        if (this.inputItems.rowData["Status"] == "Draft") {
            this.showCostButton = true;
        }
        else {
            this.showCostButton = false;
        }
        if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
            this.showCostButton = false;
        }
        if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
            contextObj.showCostButton = true;
        }
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else {
            this.realPropertyService.loadareaCostDetails(this.inputItems.selectedIds[0], this.leaseRenewalCount).subscribe(function (resultData) {
                contextObj.fieldDetailsAreaCost = contextObj.areaCostFieldDetails(resultData["Data"], contextObj.leaseType);
                contextObj.secondaryTarget = 1;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    LeaseListComponent.prototype.areaCostFieldDetails = function (fieldObjectArray, leaseType) {
        var contextObj = this;
        contextObj.leasePropertyType = contextObj.inputItems.rowData["Lease Property Type"];
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 5770:
                    item.FieldValue = contextObj.inputItems.rowData["Lease Identifier"];
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 6185: //Bargain Value
                case 6186:
                    if (leaseType == "Capital Lease") {
                        item.IsEnabled = true;
                        item.IsVisible = true;
                        item.IsMandatory = true;
                        item.HasValidationError = true;
                        item.IsLocallyValidated = false;
                    }
                    else {
                        item.IsEnabled = false;
                        item.IsVisible = false;
                        item.IsMandatory = false;
                        item.HasValidationError = false;
                    }
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 5760:
                    contextObj.ddlPaymentInterval = fieldObjectArray.find(function (item) {
                        return item.FieldId === 1705;
                    });
                    var removeArr = [27, 28, 30];
                    var lookUpDetails = contextObj.ddlPaymentInterval["LookupDetails"]["LookupValues"].filter(function (item) {
                        return removeArr.indexOf(item["Id"]) == -1;
                    });
                    if (item.FieldValue == "3") {
                        item.FieldValue = "29";
                    }
                    else if (item.FieldValue == "4") {
                        item.FieldValue = "31";
                    }
                    contextObj.ddlPaymentInterval["LookupDetails"]["LookupValues"] = lookUpDetails;
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 5737: //Documented Area
                case 5758:
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 6226:
                    if (leaseType == "Capital Lease" && contextObj.leasePropertyType == "Whole Building") {
                        item.IsVisible = true;
                    }
                    break;
            }
        });
        return fieldObjectArray;
    };
    LeaseListComponent.prototype.OnCostAreaSubmit = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseListComponent.prototype.alert = function () {
        var contextObj = this;
        this.pageTitle = "Point of Contacts";
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if ((this.leaseStatus == "Active") || (this.leaseStatus == "Draft")) {
            this.secondaryTarget = 2;
            this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Alert can be set to Leases in Draft or Active status", 2);
        }
    };
    LeaseListComponent.prototype.rentInformation = function () {
        var contextObj = this;
        this.btnName = "Save";
        this.pageTitle = "Rent Information";
        this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
        this.rentCommenceDate = this.inputItems.rowData["Rent Commencement Date"];
        this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        if (this.inputItems.rowData["Status"] == "Draft") {
            this.showRentInfoButton = true;
        }
        else {
            this.showRentInfoButton = false;
        }
        if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
            this.showRentInfoButton = false;
        }
        if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
            contextObj.showRentInfoButton = true;
        }
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else {
            contextObj.realPropertyService.loadareaCostDetails(contextObj.inputItems.selectedIds[0], contextObj.leaseRenewalCount).subscribe(function (resultData) {
                var tempCostData = resultData["Data"];
                var leaseAmount;
                var PaymentInterval;
                tempCostData.find(function (item) {
                    switch (item.ReportFieldId) {
                        case 5760:
                            PaymentInterval = item.FieldValue;
                            break;
                        case 5758:
                            leaseAmount = item.FieldValue;
                            break;
                    }
                });
                if (leaseAmount != null) {
                    if (PaymentInterval == "3") {
                        contextObj.annualBaseRent = (parseFloat(leaseAmount) * 12).toFixed(2);
                    }
                    else if (PaymentInterval == "4") {
                        contextObj.annualBaseRent = leaseAmount;
                    }
                    contextObj.realPropertyService.rentInformationDetails(contextObj.inputItems.selectedIds[0], contextObj.leaseRenewalCount).subscribe(function (resultDataRent) {
                        contextObj.fieldDetailsRentInfo = contextObj.RentInfoFieldDetails(resultDataRent["Data"]);
                        contextObj.secondaryTarget = 3;
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else {
                    contextObj.notificationService.ShowToaster("Cost details not entered", 2);
                    return;
                }
            });
        }
    };
    LeaseListComponent.prototype.RentInfoFieldDetails = function (fieldObjectArray) {
        var contextObj = this;
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 5770:
                    item.FieldValue = contextObj.inputItems.rowData["Lease Identifier"];
                    item.IsEnabled = false;
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 5758: //Annual Base Rent
                case 5763:
                    item.FieldValue = contextObj.annualBaseRent; //Annual Base Rent as Default
                    item.IsEnabled = false;
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 6240:
                    if (item.FieldValue == null) {
                        item.FieldValue = "44";
                    }
                    if (item.FieldValue == "True") {
                        item.FieldValue = "45";
                    }
                    if (item.FieldValue == "False") {
                        item.FieldValue = "44";
                    }
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                    break;
                case 5759:
                case 6187:
                case 5763:
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.IsEnabled = false;
                    }
                case 5762:
                    if (contextObj.inputItems.rowData["Status"] != "Draft") {
                        item.ReadOnlyMode = true;
                    }
                    break;
            }
        });
        return fieldObjectArray;
    };
    LeaseListComponent.prototype.OnRentInfoSubmit = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseListComponent.prototype.rentPayment = function () {
        var contextObj = this;
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if (this.leaseStatus == "Draft") {
            this.notificationService.ShowToaster("Selected Lease is in Draft, no Rent Payments exist", 2);
        }
        else if (this.leaseStatus == "Terminated") {
            this.notificationService.ShowToaster("Selected Lease is in Terminated, no Rent Payments exist", 2);
        }
        else if (this.leaseStatus == "Deleted") {
            this.notificationService.ShowToaster("Selected Lease is in Deleted, no Rent Payments exist", 2);
        }
        else {
            this.secondaryTarget = 4;
            this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
            this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    LeaseListComponent.prototype.canBeSubleased = function () {
        this.canbeSubleased = this.inputItems.rowData["Can be Subleased"];
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Lease", 2);
            return false;
        }
        else if (this.canbeSubleased == "Yes" && (this.leaseStatus == "Active" || this.leaseStatus == "Draft")) {
            return true;
        }
        else {
            this.notificationService.ShowToaster("Selected Lease cannot be subleased", 2);
            return false;
        }
    };
    LeaseListComponent.prototype.subLeaseClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Add";
        this.pageTitle = "New Sublease";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else {
            this.realPropertyService.loadSubLeaseAddEdit(this.inputItems.selectedIds[0]).subscribe(function (resultData) {
                contextObj.fieldDetailsAddEdit = contextObj.updateDetailsForSubleaseAddEdit(resultData["Data"], "add");
                contextObj.secondaryTarget = 5;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    LeaseListComponent.prototype.updateDetailsForSubleaseAddEdit = function (fieldObjectArray, target) {
        var contextObj = this;
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 5782:
                    item.FieldValue = contextObj.inputItems.rowData.Id;
                    break;
                case 500174:
                    item.FieldValue = contextObj.inputItems.rowData["Lease Identifier"];
                    item.ReadOnlyMode = true;
                    break;
                case 5774:
                    item.ReadOnlyMode = true;
                    item.FieldValue = contextObj.inputItems.rowData["LessorId"];
                    break;
                case 6142:
                    item.FieldValue = contextObj.inputItems.rowData["LeaseTypeId"];
                    item.ReadOnlyMode = true;
                    break;
                case 5776:
                    item.FieldValue = contextObj.inputItems.rowData["LeaseCategoryId"];
                    item.ReadOnlyMode = true;
                    break;
                case 5772:
                    contextObj.updateStatusLookupValues(item, "add", null);
                    if (target == "add") {
                        item.FieldValue = "37";
                    }
                    break;
                case 5771:
                    item.FieldValue = "1";
                    break;
            }
        });
        return fieldObjectArray;
    };
    LeaseListComponent.prototype.agreementClauses = function () {
        var contextObj = this;
        this.pageTitle = "Agreement Clauses";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else {
            this.secondaryTarget = 6;
            this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
            this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    LeaseListComponent.prototype.cancellationClauses = function () {
        var contextObj = this;
        this.pageTitle = "Cancellation Clauses";
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else {
            this.secondaryTarget = 7;
            this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    LeaseListComponent.prototype.leaseDocumentsClick = function () {
        var contextObj = this;
        this.pageTitle = "Lease Documents";
        this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        this.leaseStatus = this.inputItems.rowData["Status"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if ((this.leaseStatus == "Active") || (this.leaseStatus == "Draft")) {
            this.secondaryTarget = 8;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
        else {
            this.notificationService.ShowToaster("Document can be uploaded only for Leases in Active or Draft status", 2);
        }
    };
    LeaseListComponent.prototype.exportClick = function () {
        var contextObj = this;
        //alert();
        var input = contextObj.realPropertyService.getExportData(180, 0, contextObj.pageIndex, contextObj.inputItems.sortDir, contextObj.inputItems.sortCol, contextObj.fieldObject, "[]", "Leases", "", "[]");
        contextObj.exportObject.ExportDataFromServer(input, 1, "Leases", function (retCode) {
            if (retCode == 0) {
                contextObj.notificationService.ShowToaster("Lease data exported", 3);
            }
            else
                contextObj.notificationService.ShowToaster("Only Data matches the search criteria can be exported", 3);
        });
    };
    LeaseListComponent.prototype.attachmentSuccess = function (event) {
        this.refreshgrid = [];
        var contextObj = this;
        var selId = contextObj.inputItems.selectedIds[0];
        var selObj = contextObj.itemsSource.find(function (item) {
            return item["Id"] === selId;
        });
        switch (event["status"]) {
            case "success":
                selObj["Documents"] = (Number(selObj["Documents"]) + 1).toString();
                break;
            case "delete":
                selObj["Documents"] = (Number(selObj["Documents"]) - 1).toString();
                break;
        }
        //var updatedData = new Array();/*To notify the watcher about the change*/
        //updatedData = updatedData.concat(contextObj.itemsSource);
        //contextObj.itemsSource = updatedData;
        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
    };
    LeaseListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteLease();
    };
    LeaseListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    LeaseListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    LeaseListComponent.prototype.onSubmitCancelClause = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseListComponent.prototype.leaseItemBuildingClick = function () {
        var contextObj = this;
        this.action = "leaseitem";
        this.btnName = "Done";
        this.pageTitle = "Select Lease Area";
        this.leasePropertyType = this.inputItems.rowData["Lease Property Type"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else if (this.leasePropertyType == "Part of Building") {
            this.notificationService.ShowToaster("Lease Property Type of selected Lease is not Whole Building", 2);
        }
        else if (this.leasePropertyType == "Whole Building") {
            contextObj.target = 2;
            contextObj.leaseRenewalCount = contextObj.inputItems.rowData["Lease Renewal Count"];
            contextObj.secondaryTarget = 9;
            contextObj.splitviewInput.showSecondaryView = true;
            this.status1 = this.inputItems.rowData["Status"];
            if (this.status1 == "Draft")
                contextObj.Hidebutton = false;
            else
                contextObj.Hidebutton = true;
            if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
                contextObj.Hidebutton = true;
            }
            if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
                contextObj.Hidebutton = false;
            }
        }
    };
    LeaseListComponent.prototype.leaseItemFloorClick = function () {
        var contextObj = this;
        this.action = "leaseitem";
        this.btnName = "Done";
        this.pageTitle = "Select Lease Area";
        this.leasePropertyType = this.inputItems.rowData["Lease Property Type"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else if (this.leasePropertyType == "Whole Building") {
            this.notificationService.ShowToaster("Lease Property Type of selected Lease is not Part of Building", 2);
        }
        else if (this.leasePropertyType == "Part of Building") {
            contextObj.target = 3;
            contextObj.leaseRenewalCount = contextObj.inputItems.rowData["Lease Renewal Count"];
            contextObj.secondaryTarget = 9;
            contextObj.splitviewInput.showSecondaryView = true;
            this.status1 = this.inputItems.rowData["Status"];
            if (this.status1 == "Draft")
                contextObj.Hidebutton = false;
            else
                contextObj.Hidebutton = true;
            if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
                contextObj.Hidebutton = true;
            }
            if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
                contextObj.Hidebutton = false;
            }
        }
    };
    LeaseListComponent.prototype.onSubmitAlert = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseListComponent.prototype.successReturn = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseListComponent.prototype.onContextMenuOnClick = function (event) {
        var tempID = "";
        if (event != undefined && event != null) {
            var rowCount = this.inputItems.selectedIds.length;
            this.analyticsInput.selectedRowCount = rowCount;
            this.analyticsInput.menuId = event['menuId'];
            this.analyticsInput.fieldObject = this.fieldObject;
            this.analyticsInput.selectedIds = tempID;
            this.analyticsInput.moduleId = 30;
            this.analyticsInput.pageTarget = 1;
            this.analyticsInput.IsAdvanceSearch = 0;
            this.analyticsInput.IsKeywordSearch = 0;
            this.analyticsInput.KeywordFilterValue = "";
            this.analyticsInput.AdvanceFilterValue = "[]";
            this.analyticsInput.FormId = 180;
            this.analyticsInput.ParentFormId = 0;
            this.showAnalytics = true;
        }
    };
    LeaseListComponent.prototype.closeAnalytics = function () {
        this.showAnalytics = false;
    };
    LeaseListComponent = __decorate([
        core_1.Component({
            selector: 'lease-list',
            templateUrl: './app/Views/RealProperty/Lease/lease-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, grid_component_1.GridComponent, page_component_1.PageComponent, paging_component_1.PagingComponent, tabs_component_1.TabsComponent, tab_component_1.TabComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, lease_addedit_component_1.LeaseAddEditComponent, sublease_addedit_component_1.SubLeaseAddEditComponent, leaseRenewal_list_component_1.LeaseRenewalListComponent, areacost_details_1.AreaCostDetailsComponent, alert_contacts_1.AlertContactsComponent, rent_paymentlist_1.RentPaymentComponent, agreement_clauses_1.AgreementClausesComponent, cancellation_clauses_1.CancellataionClausesComponent, attachments_component_1.AttachmentsComponent, rent_information_1.RentInformationComponent, leaseItemUpdate_Building_Floor_component_1.leaseItemUpdateBuildingFloorComponent, analytics_component_1.Analytics],
            providers: [realproperty_service_1.RealPropertyService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService, exporttoexcel_service_1.ExportToExcel],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions, exporttoexcel_service_1.ExportToExcel])
    ], LeaseListComponent);
    return LeaseListComponent;
}());
exports.LeaseListComponent = LeaseListComponent;
//# sourceMappingURL=lease-list.component.js.map
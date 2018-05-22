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
var labelcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/labelcomponent.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var renew_lease_1 = require('./renew-lease');
var areacost_details_1 = require('./areacost-details');
var agreement_clauses_1 = require('../generalsettings/agreement-clauses');
var attachments_component_1 = require('../../Common/Attachments/attachments.component');
var rent_paymentlist_1 = require('./rent-paymentlist');
var cancellation_clauses_1 = require('./cancellation-clauses');
var rent_information_1 = require('./rent-information');
var leaseItemUpdate_Building_Floor_component_1 = require('./leaseItemUpdate-Building-Floor.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var LeaseRenewalListComponent = (function () {
    function LeaseRenewalListComponent(realPropertyService, notificationService, administrationServices, generFun) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.administrationServices = administrationServices;
        this.generFun = generFun;
        this.inputItems = { dataKey: "LeaseId", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectedIds: [] };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.secondaryTarget = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 80 };
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
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "subMenu": null,
                "privilegeId": 10046
            },
            {
                "id": 2,
                "title": "",
                "image": "DisplaySettings",
                "path": "DisplaySettings",
                "subMenu": [
                    {
                        "id": 3,
                        "title": "Area and Cost Details",
                        "image": "Area and Cost Details",
                        "path": "Area and Cost Details",
                        "subMenu": null,
                        "privilegeId": 10038
                    },
                    {
                        "id": 4,
                        "title": "Rent Information",
                        "image": "Rent Information",
                        "path": "Rent Information",
                        "subMenu": null,
                        "privilegeId": 10039
                    },
                    {
                        "id": 5,
                        "title": "Rent Payment",
                        "image": "Rent Payment",
                        "path": "Rent Payment",
                        "subMenu": null,
                        "privilegeId": 10040
                    }
                ]
            },
            {
                "id": 8,
                "title": "Lease Items",
                "image": "Lease Items",
                "path": "Lease Items",
                "subMenu": [
                    {
                        "id": 9,
                        "title": "Building",
                        "image": "Building",
                        "path": "Building",
                        "subMenu": null
                    },
                    {
                        "id": 10,
                        "title": "Floor",
                        "image": "Floor",
                        "path": "Floor",
                        "subMenu": null
                    },
                ]
            },
            {
                "id": 6,
                "title": "Clauses",
                "image": "Clauses",
                "path": "Clauses",
                "subMenu": null
            },
            {
                "id": 7,
                "title": "Lease Documents",
                "image": "Lease Documents",
                "path": "Lease Documents",
                "submenu": null
            },
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.showRentInfoButton = false;
        this.leaseStatus = "Active";
        this.showCostButton = false;
        this.leaseId1 = [];
        this.sessionUserCatId = 0;
        this.sessionUserRoleId = 0;
        this.sessionUserId = 0;
        this.IsModuleAdmin = false;
    }
    LeaseRenewalListComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2280, contextObj.administrationServices, contextObj.menuData.length);
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
        if (changes["leaseData"] && changes["leaseData"]["currentValue"]) {
            this.leaseId = changes["selectedId"]["currentValue"][0];
            this.leaseIdentifier = changes["leaseData"]["currentValue"]["Lease Identifier"];
            if (changes["leaseData"]["currentValue"]["Tenant"] == null) {
                this.tenant = changes["leaseData"]["currentValue"]["Landlord"];
            }
            else {
                this.tenant = changes["leaseData"]["currentValue"]["Tenant"];
            }
            this.leasePropertyType = changes["leaseData"]["currentValue"]["Lease Property Type"];
            this.leaseType = changes["leaseData"]["currentValue"]["Lease Type"];
            this.leaseCategory = changes["leaseData"]["currentValue"]["Lease Category"];
            this.leaseExecutionDate = changes["leaseData"]["currentValue"]["Execution Date"];
            this.leaseCommencementDate = changes["leaseData"]["currentValue"]["Commencement Date"];
            this.rentCommencementDate = changes["leaseData"]["currentValue"]["Rent Commencement Date"];
            this.leaseExpiryDate = changes["leaseData"]["currentValue"]["Expiry Date"];
            this.leaseRenewalCount = changes["leaseData"]["currentValue"]["Lease Renewal Count"];
        }
        if (changes["selectedId"] && changes["selectedId"]["currentValue"] != changes["selectedId"]["previousValue"]) {
            contextObj.realPropertyService.getLeaseRenewalListColumns().subscribe(function (resultData) {
                contextObj.fieldLeaseIdentifier = resultData["Data"].find(function (el) { return el.ReportFieldId === 5770; });
                if (changes["leaseData"]["currentValue"]) {
                    contextObj.fieldLeaseIdentifier["FieldValue"] = contextObj.leaseIdentifier;
                }
                var removeArr = [5770];
                contextObj.fieldObject = resultData["Data"].filter(function (item) {
                    return removeArr.indexOf(item.ReportFieldId) == -1;
                });
                contextObj.realPropertyService.getLeaseRenewalListData(contextObj.leaseId, contextObj.leaseRenewalCount, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                    contextObj.totalItems = result["Data"].DataCount;
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                    if (contextObj.totalItems > 0) {
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No Renewal Leases exist", 2);
                        contextObj.enableMenu = [0];
                    }
                });
            });
        }
    };
    LeaseRenewalListComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 0:
                this.addClick();
                break;
            case 1:
                this.deleteClick();
                break;
            case 3:
                this.areaCostDetails();
                break;
            case 4:
                this.rentInformation();
                break;
            case 5:
                this.rentPayment();
                break;
            case 6:
                this.agreementClauses();
                break;
            case 7:
                this.leaseDocumentsClick();
                break;
            case 9:
                this.leaseItemBuildingClick();
                break;
            case 10:
                this.leaseItemFloorClick();
                break;
        }
    };
    LeaseRenewalListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
    };
    ;
    LeaseRenewalListComponent.prototype.onSort = function (objGrid) {
    };
    LeaseRenewalListComponent.prototype.addClick = function () {
        var contextObj = this;
        var newExpiry;
        if (contextObj.itemsSource.length > 0) {
            if (contextObj.itemsSource[contextObj.itemsSource.length - 1]["Status"] == "Draft") {
                newExpiry = contextObj.itemsSource[contextObj.itemsSource.length - 1]["Expiry Date"];
                contextObj.leaseExpiryDate = newExpiry;
            }
        }
        this.action = "add";
        this.btnName = "Renew";
        this.pageTitle = "New Lease Renewal";
        var date = new Date(contextObj.leaseExpiryDate);
        date.setDate(date.getDate() + 1);
        var strDate = date.toDateString().split(" ");
        var strDates = strDate[1] + " " + strDate[2] + " " + strDate[3];
        var renewExpiry = new Date(contextObj.leaseExpiryDate);
        renewExpiry.setDate(renewExpiry.getDate() + 2);
        var strDate1 = renewExpiry.toDateString().split(" ");
        var renewExpiryDate = strDate1[1] + " " + strDate1[2] + " " + strDate1[3];
        this.realPropertyService.loadRenewLease(0).subscribe(function (resultData) {
            contextObj.fieldDetailsRenew = resultData["Data"];
            for (var i = 0; i < contextObj.fieldDetailsRenew.length; i++) {
                switch (contextObj.fieldDetailsRenew[i].FieldId) {
                    case 1662:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.leaseIdentifier;
                        break;
                    case 1666:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.tenant;
                        break;
                    case 1668:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.leasePropertyType;
                        break;
                    case 1670:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.leaseType;
                        break;
                    case 1671:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = contextObj.leaseCategory;
                        break;
                    case 1672:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = strDates;
                        break;
                    case 1673:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = strDates;
                        break;
                    case 1674:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = strDates;
                        break;
                    case 1675:
                        contextObj.fieldDetailsRenew[i]["FieldValue"] = renewExpiryDate;
                        break;
                }
            }
            contextObj.secondaryTarget = 1;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
    };
    LeaseRenewalListComponent.prototype.OnSuccessfulSubmit = function (event) {
        if (event["status"] == "success") {
            var contextObj = this;
            if (this.action == "add") {
                this.realPropertyService.getLeaseRenewalListData(contextObj.leaseId, contextObj.leaseRenewalCount, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
                    contextObj.totalItems = result["Data"].DataCount;
                    contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                    if (contextObj.totalItems > 0) {
                        contextObj.enableMenu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    LeaseRenewalListComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else if (this.inputItems.rowData["Status"] == "Expired") {
            this.notificationService.ShowToaster("Selected Lease has been expired, cannot be deleted", 2);
        }
        else {
            this.showSlide = !this.showSlide;
        }
    };
    LeaseRenewalListComponent.prototype.deleteLeaseRenewal = function () {
        var contextObj = this;
        this.renewalCount = this.inputItems.rowData["RenewalCount"];
        this.realPropertyService.deleteLeaseRenewal(this.leaseId, this.renewalCount).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.notificationService.ShowToaster("No Renewal Leases exist", 2);
                    contextObj.enableMenu = [0];
                }
                contextObj.notificationService.ShowToaster("Selected Lease deleted", 3);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    LeaseRenewalListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteLeaseRenewal();
    };
    LeaseRenewalListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    LeaseRenewalListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    LeaseRenewalListComponent.prototype.areaCostDetails = function () {
        var contextObj = this;
        this.action = "edit";
        this.btnName = "Save";
        this.pageTitle = "Area and Cost Details";
        this.renewalCount = this.inputItems.rowData["RenewalCount"];
        //this.leaseType = this.inputItems.rowData["Lease Type"];
        //this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        //if (this.inputItems.rowData["Status"] == "Draft") {
        this.showCostButton = true;
        //}
        //else {
        //    this.showCostButton = false;
        //}
        if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
            contextObj.showCostButton = false;
        }
        if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
            contextObj.showCostButton = true;
        }
        //if (this.inputItems.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //} else if (this.inputItems.selectedIds.length < 1) {
        //    this.notificationService.ShowToaster("Select a Lease", 2);
        //} else {
        this.realPropertyService.loadareaCostDetails(contextObj.leaseId, contextObj.renewalCount).subscribe(function (resultData) {
            contextObj.fieldDetailsAreaCost = contextObj.areaCostFieldDetails(resultData["Data"], contextObj.leaseType);
            contextObj.secondaryTarget = 2;
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
        //}
    };
    LeaseRenewalListComponent.prototype.areaCostFieldDetails = function (fieldObjectArray, leaseType) {
        var contextObj = this;
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 5770:
                    item.FieldValue = contextObj.leaseIdentifier;
                    //if (contextObj.inputItems.rowData["Status"] != "Draft") {
                    //    item.IsEnabled = false;
                    //}
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
                    //if (contextObj.inputItems.rowData["Status"] != "Draft") {
                    //    item.IsEnabled = false;
                    //}
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
                    //if (contextObj.inputItems.rowData["Status"] != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                    break;
                case 5737: //Documented Area
                case 5758:
                    //if (contextObj.inputItems.rowData["Status"] != "Draft") {
                    //    item.IsEnabled = false;
                    //}
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
    LeaseRenewalListComponent.prototype.OnCostAreaSubmit = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseRenewalListComponent.prototype.rentInformation = function () {
        var contextObj = this;
        this.btnName = "Save";
        this.pageTitle = "Rent Information";
        this.renewalCount = this.inputItems.rowData["RenewalCount"];
        //this.leaseIdentifier = this.leaseIdentifier;
        this.rentCommenceDate = this.inputItems.rowData["Rent Commencement Date"];
        //this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
        //if (this.inputItems.rowData["Status"] == "Draft") {
        this.showRentInfoButton = true;
        //}
        //else {
        //    this.showRentInfoButton = false;
        //}
        if (contextObj.sessionUserRoleId == 4 || contextObj.sessionUserRoleId == 7) {
            contextObj.showRentInfoButton = false;
        }
        if (contextObj.sessionUserRoleId == 6 && contextObj.IsModuleAdmin == true) {
            contextObj.showRentInfoButton = true;
        }
        //if (this.inputItems.selectedIds.length > 1) {
        //    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        //} else if (this.inputItems.selectedIds.length < 1) {
        //    this.notificationService.ShowToaster("Select a Lease", 2);
        //} else {
        contextObj.realPropertyService.loadareaCostDetails(contextObj.leaseId, contextObj.renewalCount).subscribe(function (resultData) {
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
                contextObj.realPropertyService.rentInformationDetails(contextObj.leaseId, contextObj.renewalCount).subscribe(function (resultDataRent) {
                    contextObj.fieldDetailsRentInfo = contextObj.RentInfoFieldDetails(resultDataRent["Data"]);
                    contextObj.secondaryTarget = 4;
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
            else {
                contextObj.notificationService.ShowToaster("Cost details not entered", 2);
                return;
            }
        });
        //}
    };
    LeaseRenewalListComponent.prototype.RentInfoFieldDetails = function (fieldObjectArray) {
        var contextObj = this;
        fieldObjectArray.find(function (item) {
            switch (item.ReportFieldId) {
                case 5770:
                    item.FieldValue = contextObj.leaseIdentifier;
                    item.IsEnabled = false;
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                    break;
                case 5758: //Annual Base Rent
                case 5763:
                    item.FieldValue = contextObj.annualBaseRent; //Annual Base Rent as Default
                    item.IsEnabled = false;
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.IsEnabled = false;
                    //}
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
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.IsEnabled = false;
                    //}
                    break;
                case 5759:
                case 6187:
                case 5763:
                //if (contextObj.leaseStatus != "Draft") {
                //    item.IsEnabled = false;
                //}
                case 5762:
                    //if (contextObj.leaseStatus != "Draft") {
                    //    item.ReadOnlyMode = true;
                    //}
                    break;
            }
        });
        return fieldObjectArray;
    };
    LeaseRenewalListComponent.prototype.OnRentInfoSubmit = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseRenewalListComponent.prototype.rentPayment = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        if (this.inputItems.rowData["Status"] == "Draft") {
            this.notificationService.ShowToaster("Selected Lease is in Draft, no Rent Payments exist", 2);
        }
        else {
            this.secondaryTarget = 5;
            this.renewalCount = this.inputItems.rowData["RenewalCount"];
            //this.leaseIdentifier = this.inputItems.rowData["Lease Identifier"];
            //this.leaseRenewalCount = this.inputItems.rowData["Lease Renewal Count"];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    LeaseRenewalListComponent.prototype.agreementClauses = function () {
        var contextObj = this;
        this.pageTitle = "Agreement Clauses";
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else {
            this.secondaryTarget = 3;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    LeaseRenewalListComponent.prototype.leaseDocumentsClick = function () {
        var contextObj = this;
        this.pageTitle = "Lease Documents";
        this.renewalCount = this.inputItems.rowData["RenewalCount"];
        this.leaseId = this.inputItems.rowData["LeaseId"];
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length < 1) {
            this.notificationService.ShowToaster("Select a Lease", 2);
        }
        else {
            this.secondaryTarget = 6;
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
        }
    };
    LeaseRenewalListComponent.prototype.attachmentSuccess = function (event) {
        this.refreshgrid = [];
        var contextObj = this;
        var selId = contextObj.inputItems.selectedIds[0];
        var selObj = contextObj.itemsSource.find(function (item) {
            return item["LeaseId"] === selId;
        });
        switch (event["status"]) {
            case "success":
                selObj["Documents"] = (Number(selObj["Documents"]) + 1).toString();
                break;
            case "delete":
                selObj["Documents"] = (Number(selObj["Documents"]) - 1).toString();
                break;
        }
        contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
    };
    LeaseRenewalListComponent.prototype.leaseItemBuildingClick = function () {
        var contextObj = this;
        this.action = "leaseitem";
        this.btnName = "Done";
        this.pageTitle = "Select Lease Area";
        //this.leasePropertyType = this.inputItems.rowData["Lease Property Type"];
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
            contextObj.leaseId1.push(contextObj.inputItems.rowData["LeaseId"]);
            contextObj.renewalCount = contextObj.inputItems.rowData["RenewalCount"];
            contextObj.secondaryTarget = 7;
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
    LeaseRenewalListComponent.prototype.leaseItemFloorClick = function () {
        var contextObj = this;
        this.action = "leaseitem";
        this.btnName = "Done";
        this.pageTitle = "Select Lease Area";
        //this.leasePropertyType = this.inputItems.rowData["Lease Property Type"];
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
            contextObj.leaseId1.push(contextObj.inputItems.rowData["LeaseId"]);
            contextObj.renewalCount = contextObj.inputItems.rowData["RenewalCount"];
            contextObj.secondaryTarget = 7;
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
    LeaseRenewalListComponent.prototype.successReturn = function (event) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    LeaseRenewalListComponent = __decorate([
        core_1.Component({
            selector: 'leaseRenewal-list',
            templateUrl: './app/Views/RealProperty/Lease/leaseRenewal-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, labelcomponent_component_1.LabelComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, renew_lease_1.RenewLeaseComponent, areacost_details_1.AreaCostDetailsComponent, agreement_clauses_1.AgreementClausesComponent, attachments_component_1.AttachmentsComponent, rent_paymentlist_1.RentPaymentComponent, cancellation_clauses_1.CancellataionClausesComponent, rent_information_1.RentInformationComponent, leaseItemUpdate_Building_Floor_component_1.leaseItemUpdateBuildingFloorComponent],
            providers: [realproperty_service_1.RealPropertyService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['selectedId', 'leaseData'],
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, administration_service_1.AdministrationService, General_1.GeneralFunctions])
    ], LeaseRenewalListComponent);
    return LeaseRenewalListComponent;
}());
exports.LeaseRenewalListComponent = LeaseRenewalListComponent;
//# sourceMappingURL=leaseRenewal-list.component.js.map
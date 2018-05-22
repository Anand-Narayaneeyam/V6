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
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var ng2_dnd_1 = require('../../../Framework/ExternalLibraries/dnd/ng2-dnd');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var addl_datafield_addedit_component_1 = require('./addl-datafield_addedit.component');
var field_values_component_1 = require('./field-values.component');
var fieldorder_component_1 = require('./fieldorder.component');
var fieldrelation_component_1 = require('./fieldrelation.component');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var AdditionalDataFieldsComponent = (function () {
    function AdditionalDataFieldsComponent(generFun, administrationService, notificationService, confirmationService, differs) {
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.differs = differs;
        this.position = "top-right";
        this.showSlide = false;
        this.pageIndex = 0;
        this.addlDataFieldCategoryId = 0;
        this.btnName = "Save Changes";
        this.selId = new Array();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Field Name]' };
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 4,
                "title": "Field Values",
                "image": "FieldValues",
                "path": "FieldValues",
                "submenu": null,
                "privilegeId": null
            }
        ];
        this.gridcount = 6;
        this.ddlParent = {
            "FieldId": 1,
            "FieldName": "Style Name",
            "FieldType": 5,
            "FieldValue": "0",
            "IsMultiValued": true,
            "HasRelation": false,
            "MultiValuedDetails": {
                "LookupValues": [
                    {
                        "Id": 1,
                        "Value": "AutoDesk-Color"
                    },
                    {
                        "Id": 2,
                        "Value": "AutoDesk-MONO"
                    }
                ],
                "PopupComponent": null
            },
            "IsMandatory": true,
            "IsVisible": true,
            "IsHiddenLabel": false,
            "ReadOnlyMode": false,
            "NotificationType": ""
        };
        this.differ = differs.find({}).create(null);
        this.btnName = "Add";
        var contextObj = this;
        function findAddlCategoryField(entity) {
            return entity.FieldId === 350;
        }
        administrationService.getAddtlDataFieldField().subscribe(function (resultData) {
            var updatedData = new Array(); /*To notify the watcher about the change*/
            contextObj.ddlAdditionalDataFieldCategory = resultData["Data"].splice(resultData["Data"].findIndex(findAddlCategoryField), 1)[0];
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fieldObject = updatedData;
            var fieldtype = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 26; });
            var fieldName = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 25; });
            fieldtype.Width = "*";
            fieldName.Width = "*";
            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14); });
            fieldtype["LookupDetails"]["LookupValues"] = newlookup;
        });
    }
    AdditionalDataFieldsComponent.prototype.ngOnInit = function () {
        this.pagePath = "Administration / Additional Data Fields";
        this.alignContent = "horizontal";
        this.enableMenu = [];
        switch (this.addlDataFieldCategoryId.toString()) {
            case "1":
                this.privilegeIds = [1538, 1539, 1540, 1541];
                break;
            case "2":
                this.privilegeIds = [71, 72, 73, 74];
                break;
            case "3":
                this.privilegeIds = [105, 106, 107, 108];
                break;
            case "4":
                this.privilegeIds = [138, 139, 140, 141];
                break;
            case "5":
                this.privilegeIds = [11532, 11533, 11534, 11535];
                break;
            case "6":
                this.privilegeIds = [824, 825, 826, 827];
                break;
            case "7":
                this.privilegeIds = [346, 347, 348, 349];
                break;
            default:
                this.privilegeIds = [];
        }
        var i = 0;
        if (this.privilegeIds.length != 0) {
            var contextObj = this;
            this.menuData = this.menuData.filter(function (el) {
                el.privilegeId = contextObj.privilegeIds[i];
                i = i + 1;
                return true;
            });
            var callBack = function (data) {
                this.menuData = data;
            };
            this.generFun.GetPrivilegesOfPage(this.menuData, callBack, 101, this.administrationService, this.menuData.length);
        }
        if (this.addlDataFieldCategoryId > 0) {
            this.CategoryId = this.addlDataFieldCategoryId;
            this.getAddlDataFieldCategory(this.addlDataFieldCategoryId);
        }
    };
    AdditionalDataFieldsComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            this.addlDataField = this.inputItems.selectedIds;
            var contextObj = this;
            if (this.CategoryId > -1) {
                if (this.itemsSource.length != 0) {
                    if (this.inputItems.rowData.Validated == "True")
                        this.enableMenu = [0, 1, 2, 4];
                    else
                        this.enableMenu = [0, 1, 2];
                }
                else
                    this.enableMenu = [0];
            }
            else
                this.enableMenu = [];
        }
    };
    AdditionalDataFieldsComponent.prototype.pageChanged = function (event) {
        var _this = this;
        this.pageIndex = event.pageEvent.page;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 24,
            Value: this.CategoryId
        });
        this.administrationService.pagingAdditionalDataField(this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol, fieldobj).subscribe(function (resultData) { return _this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    AdditionalDataFieldsComponent.prototype.onSort = function (objGrid) {
        var _this = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 24,
            Value: this.CategoryId
        });
        this.administrationService.sortAdditionalDataField(this.pageIndex, objGrid.sortDir, objGrid.sortCol, fieldobj).subscribe(function (resultData) { return _this.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]); });
    };
    AdditionalDataFieldsComponent.prototype.showDrawingDetails = function (event) {
        if (event.rowdata.Validated == "False") {
            this.enableMenu = [0, 1, 2];
        }
        else {
            this.enableMenu = [0, 1, 2, 4];
        }
    };
    AdditionalDataFieldsComponent.prototype.onSubMenuChange = function (event) {
        this.menuClickValue = event.value;
        if (event.value == 0) {
            this.addClick();
        }
        else if (event.value == 1) {
            this.editClick(this.inputItems.selectedIds);
        }
        else if (event.value == 2) {
            this.deleteClick(this.inputItems.selectedIds);
        }
        else if (event.value == 3) {
            this.displaySettings();
        }
        else if (event.value == 4) {
            this.fieldValueClick(this.inputItems.selectedIds);
        }
        else if (event.value == 5) {
            this.fieldorderClick(this.inputItems.selectedIds);
        }
        else if (event.value == 6) {
            this.fieldrelationClick(this.inputItems.selectedIds);
        }
    };
    AdditionalDataFieldsComponent.prototype.OnSuccessfulSubmi = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
                this.itemsSource = retUpdatedSrc["itemSrc"];
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            }
            //this.itemsSource = retUpdatedSrc["itemSrc"];
            //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            this.splitviewInput.showSecondaryView = false;
        }
    };
    AdditionalDataFieldsComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Add";
        this.pageTitle = "New Data Field";
        this.splitviewInput.showSecondaryView = true;
    };
    AdditionalDataFieldsComponent.prototype.editClick = function (id) {
        if (id.length > 0) {
            this.action = "edit";
            this.btnName = "Save Changes";
            this.pageTitle = "Edit Data Field";
            this.splitviewInput.showSecondaryView = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Additional Data Field", 2);
        }
    };
    AdditionalDataFieldsComponent.prototype.fieldValueClick = function (id) {
        this.pageTitle = "Data Field Values";
        var j = -1;
        if (this.itemsSource)
            for (var i = 0; i < this.itemsSource.length; i++) {
                if (id[0] == this.itemsSource[i].Id) {
                    if (this.itemsSource[i].Validated == "False")
                        j = 0;
                    this.fieldType = this.itemsSource[i];
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
                this.notificationService.ShowToaster("Select a Additional Data Field", 2);
            }
        }
        else {
            this.notificationService.ShowToaster("Not a Validated Field", 2);
        }
    };
    AdditionalDataFieldsComponent.prototype.deleteClick = function (id) {
        var contextObj = this;
        var fieldobj1 = new Array();
        fieldobj1.push({
            ReportFieldId: 16,
            Value: contextObj.CategoryId
        });
        if (id.length > 0) {
            debugger;
            contextObj.administrationService.GetCustomReportDetailsforSelectedAdditionalField(fieldobj1, contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck1) {
                debugger;
                if (returnCheck1.length == 0) {
                    contextObj.slideView = "1";
                    contextObj.slideWidth = "200";
                    contextObj.administrationService.CheckisinUse(fieldobj1, contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                        if (returnCheck["Data"] == 1)
                            contextObj.message = "Selected Additional Data Field is in use. Are you sure you want to delete?";
                        else
                            contextObj.message = "Are you sure you want to delete the selected Additional Data Field?";
                    });
                    contextObj.showSlide = !contextObj.showSlide;
                }
                else {
                    contextObj.slideView = "2";
                    contextObj.slideWidth = "600";
                    contextObj.CustomReportData = returnCheck1;
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
        else {
            this.notificationService.ShowToaster("Select an Additional Data Field", 2);
        }
    };
    AdditionalDataFieldsComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    AdditionalDataFieldsComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    AdditionalDataFieldsComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        function findEntity(entity) {
            return entity.Id === contextObj.inputItems.selectedIds[0];
        }
        this.administrationService.deleteAddtlDataField(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
            if ((resultData["Data"]["ServerId"] >= 0) && (resultData["Data"]["StatusId"] == 1)) {
                contextObj.notificationService.ShowToaster("Additional Data Field deleted", 3);
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
            }
            else
                contextObj.notificationService.ShowToaster("Failed to delete Additional Data Field", 5);
        });
    };
    AdditionalDataFieldsComponent.prototype.ddlParentChange = function (event) {
    };
    AdditionalDataFieldsComponent.prototype.ddlChildChange = function (event) {
    };
    AdditionalDataFieldsComponent.prototype.displaySettings = function () {
        this.action = "displaySettings";
        this.splitviewInput.showSecondaryView = true;
        this.fieldObject;
        this.dataKey = ["Id"];
    };
    AdditionalDataFieldsComponent.prototype.displaySettingUpdate = function (event) {
        if (event != "cancel") {
            this.notificationService.ShowToaster("Field Order for Site updated", 3);
        }
        this.splitviewInput.showSecondaryView = false;
    };
    AdditionalDataFieldsComponent.prototype.fieldorderClick = function (event) {
        this.action = "fieldorder";
        this.splitviewInput.showSecondaryView = true;
        this.itemsSource;
        this.dataKey = ["Id"];
    };
    AdditionalDataFieldsComponent.prototype.fieldorderUpdate = function (event) {
        if (event != "cancel") {
            this.notificationService.ShowToaster("Field Order for Additional Field Order updated", 3);
        }
        this.splitviewInput.showSecondaryView = false;
    };
    AdditionalDataFieldsComponent.prototype.fieldrelationClick = function (event) {
        this.action = "fieldrelation";
        this.splitviewInput.showSecondaryView = true;
        this.itemsSource;
    };
    AdditionalDataFieldsComponent.prototype.OnSuccessfulSubmitFieldRelation = function (event) {
    };
    AdditionalDataFieldsComponent.prototype.OnCloseRelation = function () {
        this.splitviewInput.showSecondaryView = false;
    };
    AdditionalDataFieldsComponent.prototype.onChangeDataFieldCategory = function (event) {
        this.getAddlDataFieldCategory(event);
        this.CategoryId = event;
        var submenuclass, focustag;
        submenuclass = document.getElementsByClassName("submenu");
        if (submenuclass && submenuclass.length > 0) {
            focustag = submenuclass[0].getElementsByTagName("a");
            if (focustag && focustag.length > 0)
                focustag[0].focus();
        }
    };
    AdditionalDataFieldsComponent.prototype.getAddlDataFieldCategory = function (event) {
        var contextObj = this;
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 24,
            Value: event
        });
        this.administrationService.getAddtlDataFieldData(fieldobj, this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0 && contextObj.CategoryId != -1) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Additional Data Fields exist", 2);
            }
            else
                contextObj.enableMenu = [0, 1, 2, 4];
            if (contextObj.CategoryId == -1)
                contextObj.enableMenu = [];
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    AdditionalDataFieldsComponent = __decorate([
        core_1.Component({
            selector: 'additional-datafields',
            templateUrl: './app/Views/Common/Additional Data Fields/additional-datafields.component.html',
            directives: [fieldrelation_component_1.FieldRelation, slide_component_1.SlideComponent, fieldorder_component_1.FieldOrderComponent, ng2_dnd_1.DND_DIRECTIVES, displaysettings_component_1.DisplaySettingsComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, addl_datafield_addedit_component_1.AdditionalDataFieldomponentAddEdit, confirm_component_1.ConfirmationComponent, field_values_component_1.FieldValuesComponent],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService],
            inputs: ['addlDataFieldCategoryId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, core_1.KeyValueDiffers])
    ], AdditionalDataFieldsComponent);
    return AdditionalDataFieldsComponent;
}());
exports.AdditionalDataFieldsComponent = AdditionalDataFieldsComponent;
//# sourceMappingURL=additional-datafields.component.js.map
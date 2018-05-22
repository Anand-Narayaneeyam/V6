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
var field_values_component_1 = require('../../Common/Additional Data Fields/field-values.component');
var fieldorder_component_1 = require('../../Common/Additional Data Fields/fieldorder.component');
var fieldrelation_component_1 = require('../../Common/Additional Data Fields/fieldrelation.component');
var displaysettings_component_1 = require('../../../Framework/Whatever/Display Settings/displaysettings.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var workorder_service_1 = require('../../../Models/WorkOrder/workorder.service');
var field_values_component_2 = require('./field-values.component');
var set_workflow_entity_data_fields_component_1 = require('./set-workflow-entity-data-fields.component');
var WorkOrderAdditionalDataFieldsComponent = (function () {
    function WorkOrderAdditionalDataFieldsComponent(generFun, administrationService, notificationService, confirmationService, differs, workOrdereService) {
        this.generFun = generFun;
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.differs = differs;
        this.workOrdereService = workOrdereService;
        this.position = "top-right";
        this.showSlide = false;
        this.pageIndex = 0;
        this.addlDataFieldCategoryId = 0;
        this.btnName = "Save Changes";
        this.selId = new Array();
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 50 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Id]' };
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 9503
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 9503
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 9503
            },
            {
                "id": 4,
                "title": "Field Values",
                "image": "FieldValues",
                "path": "FieldValues",
                "submenu": null,
                "privilegeId": 9503
            },
            {
                "id": 5,
                "title": "Set Workflow Entity Data Fields",
                "image": "Set Workflow Entity Data Fields",
                "path": "Set Workflow Entity Data Fields",
                "submenu": null,
                "privilegeId": 9503
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
        workOrdereService.getAddtlDataFieldField().subscribe(function (resultData) {
            var updatedData = new Array(); /*To notify the watcher about the change*/
            contextObj.ddlAdditionalDataFieldCategory = resultData["Data"].splice(0, 1)[0];
            updatedData = updatedData.concat(resultData["Data"]);
            contextObj.fieldObject = updatedData;
            var fieldtype = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 70; });
            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14); });
            fieldtype["LookupDetails"]["LookupValues"] = newlookup;
            if (contextObj.ddlAdditionalDataFieldCategory.LookupDetails.LookupValues.length == 1) {
                var additionalDataFieldCategoryId = contextObj.ddlAdditionalDataFieldCategory.LookupDetails.LookupValues[0].Id;
                contextObj.ddlAdditionalDataFieldCategory.FieldValue = additionalDataFieldCategoryId.toString();
                contextObj.onChangeDataFieldCategory(additionalDataFieldCategoryId);
            }
        });
    }
    WorkOrderAdditionalDataFieldsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.alignContent = "horizontal";
        this.enableMenu = [];
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 2439, contextObj.administrationService, contextObj.menuData.length);
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.ngDoCheck = function () {
        var contextObj = this;
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            this.addlDataField = this.inputItems.selectedIds;
            if (this.CategoryId > -1) {
                if (this.itemsSource.length != 0) {
                    if (this.inputItems.rowData.Validated == "True")
                        this.enableMenu = [0, 1, 2, 4, 5];
                    else
                        this.enableMenu = [0, 1, 2, 5];
                }
                else
                    this.enableMenu = [0];
            }
            else
                this.enableMenu = [];
        }
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.onSubMenuChange = function (event) {
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
        else if (event.value == 4) {
            this.fieldValueClick(this.inputItems.selectedIds);
        }
        else if (event.value == 5) {
            this.setWorkflowEntityDataFields();
        }
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.OnSuccessfulSubmi = function (event) {
        var contextObj = this;
        if (event["status"] == "success") {
            var retUpdatedSrc = void 0;
            if (this.action == "add") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
                this.totalItems = retUpdatedSrc["itemCount"];
            }
            else if (this.action == "edit") {
                retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            }
            this.itemsSource = retUpdatedSrc["itemSrc"];
            this.splitviewInput.showSecondaryView = false;
        }
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Add";
        this.pageTitle = "New Data Field";
        this.splitviewInput.showSecondaryView = true;
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.editClick = function (id) {
        if (id.length > 0) {
            this.action = "edit";
            this.pageTitle = "Edit Data Field";
            this.btnName = "Save Changes";
            this.splitviewInput.showSecondaryView = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Data Field", 2);
        }
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.deleteClick = function (id) {
        var contextObj = this;
        var fieldobj1 = new Array();
        fieldobj1.push({
            ReportFieldId: 16,
            Value: contextObj.CategoryId
        });
        if (id.length > 0) {
            contextObj.workOrdereService.CheckisinUse(fieldobj1, contextObj.inputItems.selectedIds[0]).subscribe(function (returnCheck) {
                if (returnCheck["Data"] == 1)
                    contextObj.message = "Selected Additional Data Field is in use. Are you sure you want to delete?";
                else
                    contextObj.message = "Are you sure you want to delete the selected Additional Data Field?";
            });
            this.showSlide = !this.showSlide;
        }
        else {
            this.notificationService.ShowToaster("Select a Data Field", 2);
        }
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.fieldValueClick = function (id) {
        this.pageTitle = "Data Field Values";
        var contextObj = this;
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
                this.notificationService.ShowToaster("Select a Data Field", 2);
            }
        }
        else {
            this.notificationService.ShowToaster("Not a Validated Field", 2);
        }
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.setWorkflowEntityDataFields = function () {
        this.pageTitle = "Workflow Entity Data Fields";
        this.splitviewInput.showSecondaryView = true;
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = event.value;
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.cancelClick = function (event) {
        this.showSlide = false;
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.okDelete = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.workOrdereService.deleteAddtlDataField(contextObj.inputItems.selectedIds).subscribe(function (resultData) {
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
    WorkOrderAdditionalDataFieldsComponent.prototype.OnSuccessfulSubmitFieldRelation = function (event) {
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.onChangeDataFieldCategory = function (event) {
        var contextObj = this;
        this.getAddlDataFieldCategory(event);
        this.CategoryId = event;
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.getAddlDataFieldCategory = function (event) {
        this.workTypeId = event;
        var contextObj = this;
        this.workOrdereService.getAddtlDataFieldData(event, "5", this.pageIndex, this.inputItems.sortDir, this.inputItems.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            if (contextObj.totalItems == 0) {
                contextObj.enableMenu = [0];
                contextObj.notificationService.ShowToaster("No Additional Data Fields exist", 2);
            }
            else
                contextObj.enableMenu = [0, 1, 2, 4, 5];
            if (contextObj.CategoryId == -1)
                contextObj.enableMenu = [];
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.showDrawingDetails = function (event) {
        if (event.rowdata.Validated == "False") {
            this.enableMenu = [0, 1, 2, 5];
        }
        else {
            this.enableMenu = [0, 1, 2, 4, 5];
        }
    };
    WorkOrderAdditionalDataFieldsComponent.prototype.onSort = function (objGrid) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        var contextObj = this;
        this.workOrdereService.getAddtlDataFieldData(contextObj.CategoryId, "5", contextObj.pageIndex, objGrid.sortDir, objGrid.sortCol).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
        });
    };
    WorkOrderAdditionalDataFieldsComponent = __decorate([
        core_1.Component({
            selector: 'work-order-additional-datafields',
            templateUrl: './app/Views/WorkOrder/Additional Data Fields/additional-datafields.component.html',
            directives: [fieldrelation_component_1.FieldRelation, slide_component_1.SlideComponent, fieldorder_component_1.FieldOrderComponent, ng2_dnd_1.DND_DIRECTIVES, displaysettings_component_1.DisplaySettingsComponent, page_component_1.PageComponent, split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, confirm_component_1.ConfirmationComponent, field_values_component_1.FieldValuesComponent, addl_datafield_addedit_component_1.WorkOrderAdditionalDataFieldomponentAddEdit, field_values_component_2.WorkOrderFieldValuesComponent, set_workflow_entity_data_fields_component_1.SetWorkflowEntityDataFields],
            providers: [http_1.HTTP_PROVIDERS, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, workorder_service_1.WorkOrdereService],
            inputs: ['addlDataFieldCategoryId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, administration_service_1.AdministrationService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, core_1.KeyValueDiffers, workorder_service_1.WorkOrdereService])
    ], WorkOrderAdditionalDataFieldsComponent);
    return WorkOrderAdditionalDataFieldsComponent;
}());
exports.WorkOrderAdditionalDataFieldsComponent = WorkOrderAdditionalDataFieldsComponent;
//# sourceMappingURL=additional-datafields.component.js.map
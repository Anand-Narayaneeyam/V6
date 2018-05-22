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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var messagetemplate_addedit_1 = require('./messagetemplate-addedit');
var MessageTemplatesComponent = (function () {
    function MessageTemplatesComponent(administrationService, notificationService, generFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.enableMenu = [];
        this.menuData = [
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
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.msgCategoryId = 0;
    }
    MessageTemplatesComponent.prototype.ngOnInit = function () {
        this.alignContent = "horizontal";
        var contextObj = this;
        this.administrationService.getMessageTemplateFields().subscribe(function (resultData) {
            contextObj.ddlMsgCategory = resultData["Data"].find(function (el) { return el.ReportFieldId === 5472; });
            var removeArr = [5472];
            contextObj.fieldObject = resultData["Data"].filter(function (item) {
                return removeArr.indexOf(item.ReportFieldId) == -1;
            });
            if (contextObj.ddlMsgCategory.LookupDetails.LookupValues == "") {
                contextObj.notificationService.ShowToaster("No Message Categories exist", 2);
            }
            this.itemsSource = [];
        });
    };
    MessageTemplatesComponent.prototype.onChangeMsgCategory = function (event) {
        var contextObj = this;
        this.msgCategoryId = event;
        if (this.msgCategoryId > -1) {
            this.dataLoad(this.msgCategoryId);
        }
        else {
            contextObj.itemsSource = [];
        }
    };
    MessageTemplatesComponent.prototype.dataLoad = function (msgCategoryId) {
        var contextObj = this;
        var reportfieldIdValues = new Array();
        reportfieldIdValues.push({ ReportFieldId: 5472, Value: msgCategoryId });
        contextObj.administrationService.getMessageTemplatesData(reportfieldIdValues, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
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
    };
    MessageTemplatesComponent.prototype.onSubMenuChange = function (event) {
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
    };
    MessageTemplatesComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(this.msgCategoryId);
    };
    ;
    MessageTemplatesComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(this.msgCategoryId);
    };
    MessageTemplatesComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Message Template";
        this.administrationService.loadMessageTemplateAddEditFields(0, 1, '').subscribe(function (resultData) {
            contextObj.fieldDetailsAdd = resultData["Data"];
            for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                if (contextObj.fieldDetailsAdd[i]["ReportFieldId"] == 5472) {
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
        });
    };
    MessageTemplatesComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Message Template";
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Message Template", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            if (this.inputItems.selectedIds[0] != null) {
                var reportfieldIdValues = new Array();
                reportfieldIdValues.push({ ReportFieldId: 5472, Value: this.msgCategoryId.toString() });
                this.administrationService.loadMessageTemplateAddEditFields(this.inputItems.selectedIds[0], 2, JSON.stringify(reportfieldIdValues)).subscribe(function (result) {
                    contextObj.fieldDetailsAdd = result["Data"];
                    for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                        if (contextObj.fieldDetailsAdd[i]["ReportFieldId"] == 5472) {
                            contextObj.fieldDetailsAdd[i].IsEnabled = false;
                        }
                    }
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
            }
        }
    };
    MessageTemplatesComponent.prototype.deleteClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Message Template", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
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
    };
    MessageTemplatesComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    MessageTemplatesComponent.prototype.deleteMessageTemplate = function () {
        var contextObj = this;
        contextObj.administrationService.deleteMessageTemplate(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Message Template deleted", 3);
            }
            else {
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
    };
    //slide events/////
    MessageTemplatesComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteMessageTemplate();
    };
    MessageTemplatesComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    MessageTemplatesComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    MessageTemplatesComponent = __decorate([
        core_1.Component({
            selector: 'message-templates',
            templateUrl: './app/Views/Administration/General Settings/messagetemplates.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                slide_component_1.SlideComponent, dropdownlistcomponent_component_1.DropDownListComponent, messagetemplate_addedit_1.MessageTemplateAddEditComponent],
            providers: [http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], MessageTemplatesComponent);
    return MessageTemplatesComponent;
}());
exports.MessageTemplatesComponent = MessageTemplatesComponent;
//# sourceMappingURL=messagetemplates.component.js.map
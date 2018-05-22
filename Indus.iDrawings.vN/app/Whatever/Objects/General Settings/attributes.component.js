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
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var objects_service_1 = require('../../../Models/Objects/objects.service');
var attributes_addedit_component_1 = require('./attributes-addedit.component');
var attributevalues_component_1 = require('./attributevalues.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var AttributesComponent = (function () {
    function AttributesComponent(generFun, objectsService, AdministrationService, notificationService, differs) {
        this.generFun = generFun;
        this.objectsService = objectsService;
        this.AdministrationService = AdministrationService;
        this.notificationService = notificationService;
        this.differs = differs;
        this.showSlide = false;
        this.position = "top-right";
        this.slidewidth = 300;
        this.moduleId = 0;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.hasFieldValue = false;
        this.isinUse = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 90 };
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: false, allowEdit: false, selectioMode: 'single', sortDir: 'ASC', sortCol: '[Attribute Name]' };
        this.menuData = [
            {
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null,
                "privilegeId": 904
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": 905
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": 906
            },
            {
                "id": 4,
                "title": "Attribute Values",
                "image": "FieldValues",
                "path": "FieldValues",
                "submenu": null,
                "privilegeId": 907
            },
        ];
        this.differ = differs.find({}).create(null);
    }
    AttributesComponent.prototype.ngOnInit = function () {
        //this.btnName = "Add";        
        var contextObj = this;
        contextObj.objectsService.getAttributesFieldList(this.objectCategoryId).subscribe(function (resultData) {
            contextObj.fieldObject = (resultData["Data"]);
            if (contextObj.fieldObject[6].FieldId == 1146)
                contextObj.fieldObject[6].IsVisible = false;
            var fieldtype = contextObj.fieldObject.find(function (item) { return item.ReportFieldId === 70; });
            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14); });
            fieldtype["LookupDetails"]["LookupValues"] = newlookup;
            contextObj.dataLoad();
        });
        var callBack = function (data) {
            contextObj.menuData = data;
        };
        contextObj.generFun.GetPrivilegesOfPage(contextObj.menuData, callBack, 200, contextObj.AdministrationService, contextObj.menuData.length);
    };
    AttributesComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.inputItems.selectedIds);
        if (changes) {
            this.addlDataField = this.inputItems.selectedIds;
            console.log(this.addlDataField);
            var contextObj = this;
            if (this.itemsSource.length != 0) {
                if (this.inputItems.rowData.Validated == "True")
                    this.enableMenu = [0, 1, 2, 4];
                else
                    this.enableMenu = [0, 1, 2];
            }
            else
                this.enableMenu = [0];
        }
    };
    AttributesComponent.prototype.dataLoad = function () {
        var contextObj = this;
        this.objectsService.getAttributesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.totalItems = resultData["Data"].DataCount;
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (contextObj.totalItems > 0) {
                contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            }
            else {
                // contextObj.notificationService.ShowToaster("No Object Classes exist", 2);
                contextObj.notificationService.ShowToaster("No Common Attributes exist", 2);
                contextObj.enableMenu = [0];
            }
        });
    };
    AttributesComponent.prototype.pageChanged = function (event) {
        var contextObj = this;
        this.pageIndex = event.pageEvent.page;
        this.objectsService.getAttributesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    AttributesComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.objectsService.getAttributesList(this.pageIndex, this.inputItems.sortCol, this.inputItems.sortDir, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            contextObj.totalItems = JSON.parse(resultData["Data"]["DataCount"]);
            contextObj.itemsPerPage = JSON.parse(resultData["Data"]["RowsPerPage"]);
        });
    };
    AttributesComponent.prototype.onSubMenuChange = function (event) {
        this.menuClickValue = event.value;
        switch (event.value) {
            case 0:
                this.pageTitle = "New Common Attribute";
                this.addClick();
                break;
            case 1:
                this.pageTitle = "Edit Common Attribute";
                this.editClick();
                break;
            case 2:
                this.deleteClick();
                break;
            case 4:
                this.pageTitle = "Common Attribute Values";
                this.fieldValueClick(this.inputItems.selectedIds);
                break;
        }
    };
    AttributesComponent.prototype.addClick = function () {
        this.action = "add";
        this.btnName = "Save";
        var contextObj = this;
        this.objectsService.loadAttributesAddEdit(0, 1, this.objectCategoryId).subscribe(function (resultData) {
            contextObj.AttributesAddEdit = (resultData["Data"]);
            var fieldtype = contextObj.AttributesAddEdit.find(function (item) { return item.ReportFieldId === 70; });
            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14); });
            fieldtype["LookupDetails"]["LookupValues"] = newlookup;
            contextObj.AttributesAddEdit[3].IsEnabled = false;
            contextObj.AttributesAddEdit[6].IsEnabled = false;
            //contextObj.AttributesAddEdit = resultData["Data"];
        });
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    AttributesComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.objectsService.loadAttributesAddEdit(this.inputItems.selectedIds[0], 2, this.objectCategoryId).subscribe(function (resultData) {
                contextObj.AttributesAddEdit = resultData["Data"];
                var fieldtype = contextObj.AttributesAddEdit.find(function (item) { return item.ReportFieldId === 70; });
                var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 1 && item.Id != 14); });
                fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                if (contextObj.inputItems.rowData["IsInUseButCanDelete"] == true || contextObj.inputItems.rowData["IsInUse"] == true) {
                    switch (contextObj.AttributesAddEdit[2].FieldValue) {
                        case "2":
                            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 3 && item.Id != 6 && item.Id != 4); });
                            break;
                        case "7":
                            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 3 && item.Id != 6 && item.Id != 4 && item.Id != 2); });
                            break;
                        case "3":
                            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7); });
                            break;
                        case "4":
                            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id != 2 && item.Id != 7 && item.Id != 3 && item.Id != 6); });
                            break;
                        case "5":
                            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id === 5); });
                            break;
                        case "6":
                            var newlookup = fieldtype["LookupDetails"]["LookupValues"].filter(function (item) { return (item.Id === 6); });
                            break;
                    }
                    fieldtype["LookupDetails"]["LookupValues"] = newlookup;
                }
                if (contextObj.AttributesAddEdit[2].FieldValue != "3" && contextObj.AttributesAddEdit[2].FieldValue != "4")
                    contextObj.AttributesAddEdit[6].IsEnabled = false;
                if (contextObj.AttributesAddEdit[2].FieldValue != "6" && contextObj.AttributesAddEdit[2].FieldValue != "5") {
                    contextObj.AttributesAddEdit[3].IsEnabled = false;
                    contextObj.AttributesAddEdit[3].FieldValue = "";
                }
                if (contextObj.AttributesAddEdit[2].FieldValue == "6")
                    contextObj.AttributesAddEdit[5].IsEnabled = false;
                if (contextObj.AttributesAddEdit[4].FieldValue == "True")
                    contextObj.AttributesAddEdit[4].FieldValue = "1";
                if (contextObj.AttributesAddEdit[5].FieldValue == "True")
                    contextObj.AttributesAddEdit[5].FieldValue = "1";
                if (contextObj.AttributesAddEdit[6].FieldValue == "True")
                    contextObj.AttributesAddEdit[6].FieldValue = "1";
                contextObj.loadControl(contextObj.AttributesAddEdit[2].FieldValue, contextObj, "changecall");
                if (contextObj.inputItems.rowData["IsInUseButCanDelete"] == true || contextObj.inputItems.rowData["IsInUse"] == true)
                    contextObj.AttributesAddEdit[5].IsEnabled = false;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    AttributesComponent.prototype.deleteClick = function () {
        var contextObj = this;
        var Isinuse;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            contextObj.objectsService.IsAttributeInuse(contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                Isinuse = resultData["Data"];
                if (Isinuse == 0) {
                    if (contextObj.inputItems.rowData.IsInUse == false) {
                        if (contextObj.inputItems.rowData.IsInUseButCanDelete == false) {
                            contextObj.message = "Are you sure you want to delete the selected Common Attribute?";
                        }
                        else {
                            contextObj.message = "Selected Common Attribute is in use. Are you sure you want to delete?";
                        }
                        contextObj.showSlide = !contextObj.showSlide;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Selected Attribute could not be deleted as it is linked to the report", 2);
                    }
                }
                else {
                    contextObj.notificationService.ShowToaster("Selected Attribute is in use", 2);
                }
            });
        }
    };
    AttributesComponent.prototype.deleteAttribute = function () {
        var contextObj = this;
        contextObj.objectsService.postDeleteAttributes(contextObj.inputItems.selectedIds[0], this.objectCategoryId, this.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Common Attribute deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Common Attribute in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    AttributesComponent.prototype.OnSuccessfulSubmit = function (event) {
        var contextObj = this;
        contextObj.refreshgrid = [];
        var retUpdatedSrc;
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "add", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            this.totalItems = retUpdatedSrc["itemCount"];
            this.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else if (this.action == "edit") {
            retUpdatedSrc = this.generFun.updateDataSource(this.itemsSource, "edit", event, this.inputItems.selectedIds, this.inputItems.dataKey, this.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
            if (retUpdatedSrc["itemSrc"]["0"]["Validated"] == "True")
                contextObj.enableMenu = [0, 1, 2, 4];
            else
                contextObj.enableMenu = [0, 1, 2];
        }
        //this.itemsSource = retUpdatedSrc["itemSrc"];
        //contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    AttributesComponent.prototype.fieldValueClick = function (id) {
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
    //slide events//
    AttributesComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteAttribute();
    };
    AttributesComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    AttributesComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    AttributesComponent.prototype.loadControl = function (eventValue, contextObj, action) {
        if (eventValue == "2" || eventValue == "7") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                //if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed" || this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.AttributesAddEdit[i].FieldId == 1146 || contextObj.AttributesAddEdit[i].FieldId == 1157) {
                    if (contextObj.AttributesAddEdit[i].FieldId == 1146) {
                        contextObj.AttributesAddEdit[i].FieldValue = "";
                        contextObj.AttributesAddEdit[i].IsMandatory = false;
                        contextObj.AttributesAddEdit[i].HasValidationError = false;
                    }
                    else
                        contextObj.AttributesAddEdit[i].FieldValue = "0";
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                }
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.AttributesAddEdit[i].FieldId == 1156)
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.AttributesAddEdit[i].FieldId == 1156) {
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                }
                else
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
            }
        }
        else if (eventValue == "3" || eventValue == "4") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Max Characters Allowed") {
                if (contextObj.AttributesAddEdit[i].FieldId == 1146) {
                    // this.fieldDetailsAddEdit[i].ReadOnlyMode = true;
                    contextObj.AttributesAddEdit[i].FieldValue = "";
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                    contextObj.AttributesAddEdit[i].IsMandatory = false;
                    contextObj.AttributesAddEdit[i].HasValidationError = false;
                }
                else if (contextObj.AttributesAddEdit[i].FieldId == 1157 || contextObj.AttributesAddEdit[i].FieldId == 1156) {
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                }
                else if ((contextObj.hasFieldValue == true || contextObj.isinUse == true) && contextObj.AttributesAddEdit[i].FieldId == 1156)
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                else
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
            }
        }
        else if (eventValue == "6") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable" || this.fieldDetailsAddEdit[i].FieldLabel== "Validated" ) {
                if (contextObj.AttributesAddEdit[i].FieldId == 1157 || contextObj.AttributesAddEdit[i].FieldId == 1156) {
                    //if (this.addEdit != "edit" && this.hasFieldValue != true) {
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = true;
                    contextObj.AttributesAddEdit[i].FieldValue = "0";
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                }
                else {
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                }
                if (contextObj.AttributesAddEdit[i].FieldId == 1146) {
                    if (action == "changecall")
                        contextObj.AttributesAddEdit[i].IsLocallyValidated = false;
                    contextObj.AttributesAddEdit[i].IsMandatory = true;
                    contextObj.AttributesAddEdit[i].RangeFrom = "101";
                    contextObj.AttributesAddEdit[i].RangeTo = "4000";
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    if (document.getElementById("1146")) {
                        var el = document.getElementById("1146");
                        //var contextObj = this;
                        var fldObj = contextObj.AttributesAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        }
        else if (eventValue == "5") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                // if (this.fieldDetailsAddEdit[i].FieldLabel == "Totalizable") {
                if (contextObj.AttributesAddEdit[i].FieldId == 1157) {
                    contextObj.AttributesAddEdit[i].FieldValue = "0";
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = true;
                    contextObj.AttributesAddEdit[i].IsEnabled = false;
                }
                else {
                    if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.AttributesAddEdit[i].FieldId != 1156) {
                        contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                        contextObj.AttributesAddEdit[i].IsEnabled = true;
                    }
                    else if (contextObj.hasFieldValue == false && contextObj.isinUse == false && contextObj.AttributesAddEdit[i].FieldId == 1156) {
                        contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                        contextObj.AttributesAddEdit[i].IsEnabled = true;
                    }
                }
                if (contextObj.AttributesAddEdit[i].FieldId == 1146) {
                    if (action == "changecall")
                        contextObj.AttributesAddEdit[i].IsLocallyValidated = false;
                    contextObj.AttributesAddEdit[i].IsMandatory = true;
                    contextObj.AttributesAddEdit[i].RangeFrom = "1";
                    contextObj.AttributesAddEdit[i].RangeTo = "100";
                    contextObj.AttributesAddEdit[i].IsEnabled = true;
                    contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
                    if (document.getElementById("1146")) {
                        var el = document.getElementById("1146");
                        //var contextObj = this;
                        var fldObj = contextObj.AttributesAddEdit[i];
                        setTimeout(function () {
                            contextObj._validateService.initiateValidation(fldObj, contextObj, true, el);
                        }, 100);
                    }
                }
            }
        }
        else if (eventValue == "-1") {
            for (var i = 0; i < contextObj.AttributesAddEdit.length; i++) {
                contextObj.AttributesAddEdit[i].IsEnabled = true;
                contextObj.AttributesAddEdit[i].ReadOnlyMode = false;
            }
        }
        this.AttributesAddEdit = contextObj.AttributesAddEdit;
    };
    AttributesComponent.prototype.Successfulladd = function (event) {
        if (event["Sucess"] == "True") {
            this.inputItems.rowData["IsInUseButCanDelete"] = true;
        }
        else {
            this.inputItems.rowData["IsInUseButCanDelete"] = false;
        }
    };
    AttributesComponent = __decorate([
        core_1.Component({
            selector: 'attributes',
            templateUrl: './app/Views/Objects/General Settings/attributes.component.html',
            directives: [slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent, fieldGeneration_component_1.FieldComponent, submenu_component_1.SubMenu, grid_component_1.GridComponent, paging_component_1.PagingComponent, attributes_addedit_component_1.AttributescomponentAddEdit, attributevalues_component_1.AttributeValueComponent],
            providers: [http_1.HTTP_PROVIDERS, objects_service_1.ObjectsService, notify_service_1.NotificationService, General_1.GeneralFunctions, administration_service_1.AdministrationService],
            inputs: ['objectCategoryId', 'moduleId']
        }), 
        __metadata('design:paramtypes', [General_1.GeneralFunctions, objects_service_1.ObjectsService, administration_service_1.AdministrationService, notify_service_1.NotificationService, core_1.KeyValueDiffers])
    ], AttributesComponent);
    return AttributesComponent;
}());
exports.AttributesComponent = AttributesComponent;
//# sourceMappingURL=attributes.component.js.map
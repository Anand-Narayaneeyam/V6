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
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var section_component_1 = require('../../../Framework/Whatever/Section/section.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
//importing addedit component
var contacts_addedit_component_1 = require('./contacts-addedit.component');
var ContactsListComponent = (function () {
    function ContactsListComponent(realPropertyService, notificationService, generFun) {
        this.realPropertyService = realPropertyService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: false, selectioMode: "single" };
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.pageTitle = "New Contact";
        this.enableMenu = [];
        this.menuData = [
            {
                "id": 1,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 2,
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
            }
        ];
        this.position = "top-right";
        this.showSlide = false;
        this.slidewidth = 250;
        this.isAdministration = false;
        this.moduleId = "";
    }
    ContactsListComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.realPropertyService.getContactColumns().subscribe(function (result) {
            if (contextObj.isAdministration == true) {
                result["Data"].find(function (item) {
                    if (item.FieldId == 941)
                        item.FieldLabel = "Client";
                });
                result["Data"].find(function (item) {
                    if (item.FieldId == 2992) {
                        item.IsEnabled = true;
                        item.IsVisible = true;
                    }
                });
            }
            contextObj.fieldObject = (result["Data"]);
            contextObj.dataLoad(1);
        });
    };
    ContactsListComponent.prototype.dataLoad = function (target) {
        var contextObj = this;
        contextObj.realPropertyService.getContactData(contextObj.moduleId, contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (result) {
            contextObj.totalItems = result["Data"].DataCount;
            if (contextObj.totalItems > 0) {
                contextObj.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                if (target == 1) {
                    contextObj.itemsPerPage = result["Data"].RowsPerPage;
                }
            }
            else {
                contextObj.notificationService.ShowToaster("No Contacts exist", 2);
                contextObj.enableMenu = [1];
            }
        });
    };
    ContactsListComponent.prototype.onSubMenuChange = function (event) {
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
    ContactsListComponent.prototype.pageChanged = function (event) {
        this.pageIndex = event.pageEvent.page;
        this.dataLoad(0);
    };
    ;
    ContactsListComponent.prototype.onSort = function (objGrid) {
        this.dataLoad(0);
    };
    ContactsListComponent.prototype.addClick = function () {
        var contextObj = this;
        this.action = "add";
        this.btnName = "Save";
        this.pageTitle = "New Contact";
        this.realPropertyService.loadContactsAddEdit(0, 1, this.moduleId).subscribe(function (resultData) {
            if (contextObj.isAdministration == true) {
                var tempData = resultData["Data"].find(function (item) {
                    if (item.FieldId == 941) {
                        item.FieldLabel = "Client";
                        return item;
                    }
                });
                resultData["Data"].find(function (item) {
                    if (item.FieldId == 2992) {
                        item.IsEnabled = true;
                        item.IsVisible = true;
                    }
                });
                var temp = [];
                temp.push(tempData);
                var x = resultData["Data"].splice(0, 14);
                var y = resultData["Data"].splice(1, 1);
                for (var i = 0; i < x.length; i++) {
                    temp.push(x[i]);
                }
                temp.push(y[0]);
                contextObj.fieldDetailsAdd1 = temp;
            }
            else
                contextObj.fieldDetailsAdd1 = resultData["Data"];
            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
        });
        //this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    ContactsListComponent.prototype.editClick = function () {
        this.action = "edit";
        this.btnName = "Save Changes";
        this.pageTitle = "Edit Contact";
        var contextObj = this;
        if (contextObj.inputItems.selectedIds.length == 0) {
            contextObj.notificationService.ShowToaster("Select a Contact", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.realPropertyService.loadContactsAddEdit(this.inputItems.selectedIds[0], 2, this.moduleId).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                if (contextObj.isAdministration == true) {
                    var tempData = result["Data"].find(function (item) {
                        if (item.FieldId == 941) {
                            item.FieldLabel = "Client";
                            return item;
                        }
                    });
                    result["Data"].find(function (item) {
                        if (item.FieldId == 2992) {
                            item.IsEnabled = true;
                            item.IsVisible = true;
                        }
                    });
                    var temp = [];
                    temp.push(tempData);
                    var x = result["Data"].splice(0, 14);
                    var y = result["Data"].splice(1, 1);
                    for (var i = 0; i < x.length; i++) {
                        temp.push(x[i]);
                    }
                    temp.push(y[0]);
                    contextObj.fieldDetailsAdd1 = temp;
                }
                else
                    contextObj.fieldDetailsAdd1 = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    ContactsListComponent.prototype.deleteClick = function () {
        if (this.inputItems.selectedIds.length == 0) {
            this.notificationService.ShowToaster("Select a Contact", 2);
        }
        else if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            var contextObj = this;
            var reportFieldIdArray = [{ ReportFieldId: 173, Value: 769 }];
            contextObj.realPropertyService.checkEntityReferenceExists(JSON.stringify(reportFieldIdArray), contextObj.inputItems.selectedIds[0]).subscribe(function (resultData) {
                if (resultData["Data"] == 1) {
                    contextObj.notificationService.ShowToaster("Selected Contact in use, cannot be deleted", 5);
                }
                else {
                    contextObj.showSlide = !contextObj.showSlide;
                }
            });
        }
    };
    ContactsListComponent.prototype.submitReturn = function (event) {
        var retUpdatedSrc;
        var contextObj = this;
        contextObj.refreshgrid = [];
        if (this.action == "add") {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "add", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.totalItems = retUpdatedSrc["itemCount"];
            contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        }
        else {
            retUpdatedSrc = this.generFun.updateDataSource(contextObj.itemsSource, "edit", event, contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
            contextObj.refreshgrid = contextObj.refreshgrid.concat([true]);
        }
        // contextObj.itemsSource = retUpdatedSrc["itemSrc"];
        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
    };
    ContactsListComponent.prototype.deleteContacts = function () {
        var contextObj = this;
        contextObj.realPropertyService.deleteContacts(contextObj.inputItems.selectedIds[0], contextObj.moduleId).subscribe(function (resultData) {
            if (resultData["Data"]["StatusId"] == 1) {
                var retUpdatedSrc = contextObj.generFun.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems < 1) {
                    contextObj.enableMenu = [1];
                }
                contextObj.notificationService.ShowToaster("Selected Contact deleted", 3);
            }
            else {
                switch (resultData["Data"].StatusId) {
                    case 0:
                        contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                        break;
                    case 3:
                        if (resultData["Data"].ServerId == -1) {
                            contextObj.notificationService.ShowToaster("Selected Contact in use, cannot be deleted", 5);
                        }
                        break;
                }
            }
        });
    };
    //slide events/////
    ContactsListComponent.prototype.okDelete = function (event) {
        this.showSlide = !this.showSlide;
        this.deleteContacts();
    };
    ContactsListComponent.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    ContactsListComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ContactsListComponent = __decorate([
        core_1.Component({
            selector: 'contact-list',
            templateUrl: './app/Views/RealProperty/GeneralSettings/contacts-list.component.html',
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, section_component_1.SectionComponent, grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent,
                notify_component_1.Notification, slide_component_1.SlideComponent, contacts_addedit_component_1.ContactAddEditComponent],
            providers: [realproperty_service_1.RealPropertyService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['moduleId', 'isAdministration']
        }), 
        __metadata('design:paramtypes', [realproperty_service_1.RealPropertyService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], ContactsListComponent);
    return ContactsListComponent;
}());
exports.ContactsListComponent = ContactsListComponent;
//# sourceMappingURL=contacts-list.component.js.map
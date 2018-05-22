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
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var drawingdetails_service_1 = require('../../../Models/Common/drawingdetails.service');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var fieldgeneration_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/fieldgeneration.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
//import {CardComponent} from  '../../../Framework/Whatever/Card/card.component';
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var confirm_component_1 = require('../../../Framework/Whatever/Notification/confirm.component');
var confirm_service_1 = require('../../../Framework/Models/Notification/confirm.service');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var MarkupsList = (function () {
    function MarkupsList(administrationService, drawingDetailsService, notificationService, confirmationService, genFuns) {
        this.administrationService = administrationService;
        this.drawingDetailsService = drawingDetailsService;
        this.notificationService = notificationService;
        this.confirmationService = confirmationService;
        this.genFuns = genFuns;
        this.siteDrawing = 999;
        this.buildingDrawing = 0;
        this.floorDrawing = 1;
        this.success = "";
        this.position = "top-right";
        this.showSlide = false;
        this.onmarkupCardClick = new core_1.EventEmitter();
        this.onViewmarkupClick = new core_1.EventEmitter();
        this.onDeletemarkupClick = new core_1.EventEmitter();
        this.cardButtonPrivilege = [true, true];
        this.inputItems = { dataKey: "MarkupId", isHeaderCheckBx: true, allowSort: true, selectedIds: [], allowAdd: false, sortCol: "[Uploaded On]", sortDir: "ASC" };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.enableMenu = [];
        this.markupViewList = [];
        this.selectedmarkupslength = 0;
        this.onMarkupCountChange = new core_1.EventEmitter();
        this.onEditViewmarkupClick = new core_1.EventEmitter();
        this.menuData = [
            {
                "id": 0,
                "title": "Edit Description",
                "image": "Edit",
                "path": "Edit",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 1,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null,
                "privilegeId": null
            },
            {
                "id": 2,
                "title": "View",
                "image": "View",
                "path": "View",
                "submenu": null,
                "privilegeId": null
            }
        ];
    }
    MarkupsList.prototype.ngOnInit = function () {
        var contextObj = this;
        console.log("drawingType", this.drawingType);
        switch (this.drawingType) {
            case this.buildingDrawing:
                this.isBuildingMarkup = true;
                //this.datakey = "MarkupId";
                break;
            case this.floorDrawing:
                this.isBuildingMarkup = false;
                //this.datakey = "MarkupId";
                break;
        }
        this.drawingDetailsService.getMarkupsDetailsFields(contextObj.drawingType).subscribe(function (resultData) {
            contextObj.fieldObj = resultData["Data"];
            if (contextObj.pageTarget == 1) {
                contextObj.fieldObj[0].IsVisible = false;
                contextObj.inputItems.isHeaderCheckBx = false;
                contextObj.inputItems.selectioMode = "single";
            }
            else {
                contextObj.selectedmarkupslength = contextObj.visibleMarkupIds.length;
            }
            console.log("MARKUPCARDFIELD", contextObj.fieldObj);
        });
        contextObj.dataLoad();
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserId = retData["UserId"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
    };
    MarkupsList.prototype.ngOnChanges = function (changes) {
        if (changes["visibleMarkupIds"] && changes["visibleMarkupIds"]["currentValue"]) {
            this.selectedmarkupslength = this.visibleMarkupIds.length;
        }
    };
    MarkupsList.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                var AddedBy = "";
                if (this.sessionUserRoleId >= 3 && this.pageTarget == 1) {
                    contextObj.itemSource.find(function (el) {
                        if (el.MarkupId == contextObj.inputItems.selectedIds[0]) {
                            AddedBy = el.AddedBy;
                            return true;
                        }
                        else
                            return false;
                    });
                    if (AddedBy == contextObj.sessionUserId) {
                        contextObj.onEdit();
                    }
                    else {
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected markup", 2);
                    }
                }
                else
                    contextObj.onEdit();
                break;
            case 1:
                var AddedBy = "";
                if (this.sessionUserRoleId >= 3 && this.pageTarget == 1) {
                    contextObj.itemSource.find(function (el) {
                        if (el.MarkupId == contextObj.inputItems.selectedIds[0]) {
                            AddedBy = el.AddedBy;
                            return true;
                        }
                        else
                            return false;
                    });
                    if (AddedBy == contextObj.sessionUserId) {
                        contextObj.deleteMarkup();
                    }
                    else {
                        contextObj.notificationService.ShowToaster("You do not have the privilege to delete the data of the selected markup", 2);
                    }
                }
                else
                    contextObj.deleteMarkup();
                break;
            case 2:
                contextObj.viewMarkup(false);
                break;
            case 3:
                var AddedBy = "";
                if (this.sessionUserRoleId >= 3) {
                    contextObj.itemSource.find(function (el) {
                        if (el.MarkupId == contextObj.inputItems.selectedIds[0]) {
                            AddedBy = el.AddedBy;
                            return true;
                        }
                        else
                            return false;
                    });
                    if (AddedBy == contextObj.sessionUserId) {
                        contextObj.viewMarkup(true);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected markup", 2);
                    }
                }
                else
                    contextObj.viewMarkup(true);
                break;
        }
    };
    MarkupsList.prototype.dataLoad = function () {
        var contextObj = this;
        this.drawingDetailsService.getMarkupsDetailsData(contextObj.drawingType, contextObj.drawingId, contextObj.revisionNo, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultDataSource) {
            if (resultDataSource["Data"] == "[]") {
                resultDataSource["Data"] = null;
            }
            contextObj.itemSource = JSON.parse(resultDataSource["Data"].FieldBinderData);
            contextObj.totalItems = JSON.parse(resultDataSource["Data"]["DataCount"]);
            contextObj.itemsPerPage = resultDataSource["Data"].RowsPerPage;
            console.log("MARKUPCARD", contextObj.totalItems);
            if (contextObj.itemSource.length == 0) {
                contextObj.notificationService.ShowToaster("No Markups exist", 2);
            }
            else {
                contextObj.enableMenu = [0, 1, 2, 3];
                if (contextObj.visibleMarkupIds != undefined) {
                    if (contextObj.visibleMarkupIds.length > 0) {
                        for (var i = 0; i < contextObj.visibleMarkupIds.length; i++) {
                            var visibleMarkupId = contextObj.visibleMarkupIds[i];
                            var index = contextObj.itemSource.findIndex(function (el) { return el['MarkupId'] === visibleMarkupId; });
                            if (index != -1) {
                                contextObj.itemSource[index]["Select All"] = true;
                            }
                        }
                    }
                }
            }
        });
    };
    MarkupsList.prototype.deleteMarkup = function () {
        if (this.pageTarget == 1) {
            if (this.inputItems.selectedIds.length > 1) {
                this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
            }
            else if (this.inputItems.selectedIds.length == 1) {
                this.showSlide = true;
            }
            else {
                this.notificationService.ShowToaster("Select a Markup", 2);
            }
        }
        else {
            var isCheck = this.checkBoxEnableCheck(2);
        }
    };
    MarkupsList.prototype.checkBoxEnableCheck = function (target) {
        var isCheck = [];
        for (var i = 0; i < this.itemSource.length; i++) {
            if (this.itemSource[i]["Select All"] == true) {
                isCheck.push(this.itemSource[i]['MarkupId']);
            }
        }
        if (isCheck.length > 1)
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        else if (isCheck.length == 1) {
            var contextObj = this;
            if (target == 3) {
                return true;
            }
            else {
                var AddedBy = "";
                if (this.sessionUserRoleId >= 3) {
                    contextObj.itemSource.find(function (el) {
                        if (el.MarkupId == isCheck[0]) {
                            AddedBy = el.AddedBy;
                            return true;
                        }
                        else
                            return false;
                    });
                    if (AddedBy == contextObj.sessionUserId) {
                        contextObj.selectedId = isCheck[0];
                        if (target == 1) {
                            contextObj.drawingDetailsService.loadMarkupDesEdit(isCheck[0], this.isBuildingMarkup, this.drawingId, this.revisionNo).subscribe(function (result) {
                                contextObj.fieldDetailsForEdit = result["Data"];
                                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                            });
                        }
                        else if (target == 2)
                            this.showSlide = true;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("You do not have the privilege to edit the data of the selected markup", 2);
                    }
                }
                else {
                    contextObj.selectedId = isCheck[0];
                    if (target == 1) {
                        contextObj.drawingDetailsService.loadMarkupDesEdit(isCheck[0], this.isBuildingMarkup, this.drawingId, this.revisionNo).subscribe(function (result) {
                            contextObj.fieldDetailsForEdit = result["Data"];
                            contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                        });
                    }
                    else if (target == 2)
                        this.showSlide = true;
                }
            }
        }
        else
            this.notificationService.ShowToaster("Select a Markup", 2);
    };
    MarkupsList.prototype.onEdit = function () {
        this.pageTitle = "Edit Markup Description";
        if (this.pageTarget == 1)
            this.editClick();
        else {
            this.checkBoxEnableCheck(1);
        }
    };
    MarkupsList.prototype.editClick = function () {
        var contextObj = this;
        if (this.inputItems.selectedIds.length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            contextObj.drawingDetailsService.loadMarkupDesEdit(contextObj.inputItems.selectedIds[0], this.isBuildingMarkup, this.drawingId, this.revisionNo).subscribe(function (result) {
                contextObj.fieldDetailsForEdit = result["Data"];
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        }
    };
    MarkupsList.prototype.onSort = function (event) {
        debugger;
        this.inputItems.sortCol = event.sortCol;
        this.inputItems.sortDir = event.sortDir;
        this.dataLoad();
    };
    MarkupsList.prototype.onSubmitData = function (event) {
        var contextObj = this;
        var updateValue; // JSON.stringify(JSON.parse(event.fieldobject)[2])
        var revisionNoObj; // = JSON.stringify(JSON.parse(event.fieldobject)[1])
        var singlecheck = JSON.parse(event.fieldobject).filter(function (item) {
            if (item.ReportFieldId == 4393 || item.ReportFieldId == 555) {
                updateValue = item;
                return true;
            }
            else
                return false;
        });
        var selectedMarkupId;
        if (this.pageTarget == 1)
            selectedMarkupId = this.inputItems.selectedIds[0];
        else
            selectedMarkupId = this.selectedId;
        var description = updateValue['Value'];
        this.drawingDetailsService.updateMarkupDescription(JSON.stringify(updateValue), selectedMarkupId, contextObj.drawingType, contextObj.drawingId, contextObj.revisionNo).subscribe(function (resultData) {
            contextObj.success = resultData.Message;
            if (contextObj.success == "Success") {
                var datakey = contextObj.inputItems.dataKey;
                for (var i = 0; i < contextObj.itemSource.length; i++) {
                    if (contextObj.itemSource[i][datakey] == selectedMarkupId) {
                        contextObj.itemSource[i]['Description'] = description;
                        var updatedData = new Array(); /*To notify the watcher about the change*/
                        updatedData = updatedData.concat(contextObj.itemSource);
                        contextObj.itemSource = updatedData;
                    }
                }
                contextObj.notificationService.ShowToaster("Markup description updated", 3);
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    MarkupsList.prototype.deleteMarkupFromListYesClick = function (event) {
        console.log("Yes");
        this.showSlide = false;
        var contextObj = this;
        var markupId = [];
        if (this.pageTarget == 1)
            markupId.push(this.inputItems.selectedIds[0]);
        else
            markupId.push(this.selectedId);
        this.drawingDetailsService.postMarkupDelete(markupId[0], this.drawingId, this.revisionNo, this.drawingType).subscribe(function (resultData) {
            contextObj.success = resultData.Message;
            if (contextObj.success == "Success") {
                var retUpdatedSrc = contextObj.genFuns.updateDataSource(contextObj.itemSource, "delete", '', markupId, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = retUpdatedSrc["itemCount"];
                if (contextObj.totalItems == 0)
                    contextObj.enableMenu = [];
                contextObj.notificationService.ShowToaster("Markup file deleted", 3);
                contextObj.onMarkupCountChange.emit({
                    markups: contextObj.itemSource.length, drawingId: contextObj.drawingId, revisionNo: contextObj.revisionNo
                });
                contextObj.onDeletemarkupClick.emit(markupId[0]);
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    MarkupsList.prototype.deleteMarkupFromListNoClick = function (value) {
        this.showSlide = value.value;
    };
    MarkupsList.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    MarkupsList.prototype.viewMarkup = function (fromEdit) {
        debugger;
        this.selectedmarkupslength = 0;
        var contextObj = this;
        contextObj.markupViewList = [];
        if (this.pageTarget == 1) {
            this.markupViewList.push({ markupId: this.inputItems.selectedIds[0], isView: true });
        }
        else {
            for (var i = 0; i < this.itemSource.length; i++) {
                if (this.itemSource[i]["Select All"] == true) {
                    this.markupViewList.push({ markupId: this.itemSource[i]['MarkupId'], isView: true });
                    this.selectedmarkupslength++;
                }
                else {
                    this.markupViewList.push({ markupId: this.itemSource[i]['MarkupId'], isView: false });
                }
            }
        }
        if (this.pageTarget == 1) {
            this.onViewmarkupClick.emit(contextObj.markupViewList);
        }
        else {
            debugger;
            if (fromEdit) {
                if (this.selectedmarkupslength == 1) {
                    var index = contextObj.markupViewList.findIndex(function (el) { return el.isView == true; });
                    var data = contextObj.markupViewList[index];
                    contextObj.markupViewList = [];
                    contextObj.markupViewList.push(data);
                    this.onEditViewmarkupClick.emit(contextObj.markupViewList);
                }
                else if (this.selectedmarkupslength > 1)
                    this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                else
                    this.notificationService.ShowToaster("Select a Markup", 2);
            }
            else {
                if (this.selectedmarkupslength == 0) {
                    this.notificationService.ShowToaster("Select a Markup", 2);
                }
                else {
                    this.onViewmarkupClick.emit(contextObj.markupViewList);
                }
            }
        }
    };
    MarkupsList.prototype.editMarkupInDrawing = function () {
        if (this.checkBoxEnableCheck(3))
            this.viewMarkup(true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MarkupsList.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MarkupsList.prototype, "revisionNo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MarkupsList.prototype, "drawingType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MarkupsList.prototype, "pageTarget", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MarkupsList.prototype, "visibleMarkupIds", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MarkupsList.prototype, "onmarkupCardClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MarkupsList.prototype, "onViewmarkupClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MarkupsList.prototype, "onDeletemarkupClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MarkupsList.prototype, "onMarkupCountChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MarkupsList.prototype, "onEditViewmarkupClick", void 0);
    MarkupsList = __decorate([
        core_1.Component({
            selector: 'markup-list',
            templateUrl: 'app/Views/Common/DrawingDetails/markuplist.component.html',
            styleUrls: ['app/Views/Common/DrawingDetails/drawingdetails.css'],
            directives: [page_component_1.PageComponent, paging_component_1.PagingComponent, grid_component_1.GridComponent, notify_component_1.Notification, list_component_1.ListComponent, fieldgeneration_component_1.FieldComponent, confirm_component_1.ConfirmationComponent, slide_component_1.SlideComponent, submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent],
            providers: [http_1.HTTP_PROVIDERS, drawingdetails_service_1.DrawingDetailsService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions],
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, drawingdetails_service_1.DrawingDetailsService, notify_service_1.NotificationService, confirm_service_1.ConfirmationService, General_1.GeneralFunctions])
    ], MarkupsList);
    return MarkupsList;
}());
exports.MarkupsList = MarkupsList;
//# sourceMappingURL=markuplist.component.js.map
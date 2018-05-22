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
var drawingdetails_service_1 = require('../../../Models/Common/drawingdetails.service');
var list_component_1 = require('../../../Framework/Whatever/List/list.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var asbuilt_service_1 = require('../../../Models/Asbuilts/asbuilt.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var RevisionList = (function () {
    function RevisionList(asbuiltService, administrationService, drawingDetailsService, notificationService, generalFunctions) {
        this.asbuiltService = asbuiltService;
        this.administrationService = administrationService;
        this.drawingDetailsService = drawingDetailsService;
        this.notificationService = notificationService;
        this.generalFunctions = generalFunctions;
        this.selIds = new Array();
        // cardButtonPrivilege = [true, false];
        this.siteDrawing = 999;
        this.buildingDrawing = 0;
        this.floorDrawing = 1;
        this.success = "";
        this.position = "top-right";
        this.showSlide = false;
        this.onmarkupCardClick = new core_1.EventEmitter();
        this.onViewDwgClick = new core_1.EventEmitter();
        this.onRevisionCountChange = new core_1.EventEmitter();
        this.pageTitle = "Revisions";
        this.dataKey = "Revision No.";
        this.inputItems = { dataKey: "Revision No.", groupBy: [], grpWithCheckBx: false, selectioMode: "single", selectedIds: [], allowAdd: false, allowEdit: false, sortDir: 'ASC', sortCol: '' };
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.itemsPerPage = 0;
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
        this.enableMenu = [];
        ;
    }
    RevisionList.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 0:
                this.editClick();
                break;
            case 1:
                this.deleteRevision();
                break;
            case 2:
                this.viewDwg();
                break;
        }
    };
    RevisionList.prototype.editClick = function () {
        var contextObj = this;
        this.pageTitle = "Edit Drawing Description";
        contextObj.action = "add";
        contextObj.btnName = "Save Changes";
        contextObj.revisionNo = contextObj.inputItems.rowData["Revision No."];
        if (contextObj.drawingType == 0)
            contextObj.drawingDetailsService.getEditBuildingDrawingFieldDetails(135, contextObj.inputItems.selectedIds[0], 58, contextObj.drawingId, contextObj.revisionNo).subscribe(function (resultData) {
                resultData["Data"] = contextObj.setBuildingFieldDetails(resultData["Data"]);
                contextObj.fieldDetailsAdd = resultData["Data"];
                contextObj.dataKey = contextObj.fieldDetailsAdd[0].FieldLabel;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
        else
            contextObj.drawingDetailsService.getEditFloorDrawingFieldDetails(136, contextObj.inputItems.selectedIds[0], 64, contextObj.drawingId, contextObj.revisionNo).subscribe(function (resultData) {
                resultData["Data"] = contextObj.setFloorFieldDetails(resultData["Data"]);
                contextObj.fieldDetailsAdd = resultData["Data"];
                contextObj.dataKey = contextObj.fieldDetailsAdd[0].FieldLabel;
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            });
    };
    RevisionList.prototype.ngOnInit = function () {
        var contextObj = this;
        switch (contextObj.drawingType) {
            case contextObj.buildingDrawing:
                contextObj.datakey = "Revision No.";
                break;
            case contextObj.floorDrawing:
                contextObj.datakey = "Revision No.";
                break;
        }
        this.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            contextObj.sessionUserRoleId = retData["UserRoleId"];
        });
        contextObj.drawingDetailsService.getRevisionDetailsFields(contextObj.drawingType).subscribe(function (resultData) {
            if (contextObj.drawingType == 1)
                contextObj.fieldObject = contextObj.setFieldDisabled(resultData["Data"]); //edit enabling for file name
            else
                contextObj.fieldObject = resultData["Data"];
        });
        contextObj.dataload();
        //Previliage
        var i = 0;
        contextObj.privilegeIds = [217, 218, 219];
        this.menuData = contextObj.menuData.filter(function (el) {
            el.privilegeId = contextObj.privilegeIds[i];
            i = i + 1;
            return true;
        });
        var callBack = function (data) {
            if (contextObj.pageTarget != 1) {
                if (data != undefined && data.length != 0) {
                    data.filter(function (el) {
                        if (el.title == "Edit") {
                            contextObj.enableMenu.push[0];
                        }
                        else if (el.title == "Delete") {
                            contextObj.enableMenu.push[1];
                        }
                    });
                }
                contextObj.enableMenu.push[2];
            }
            if (contextObj.sessionUserRoleId > 3) {
                contextObj.enableMenu = [2];
            }
            contextObj.menuData = data;
        };
        contextObj.generalFunctions.GetPrivilegesOfPage(this.menuData, callBack, 62, this.administrationService, this.menuData.length);
    };
    RevisionList.prototype.deleteRevision = function () {
        if (this.inputItems.selectedIds[0].length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else if (this.inputItems.selectedIds.length == 1) {
            this.showSlide = true;
        }
        else {
            this.notificationService.ShowToaster("Select a Revision", 2);
        }
    };
    RevisionList.prototype.onDelete = function (e) {
        if (this.inputItems.selectedIds[0].length > 1) {
            this.notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
        }
        else {
            this.deleteRevision();
        }
    };
    RevisionList.prototype.dataload = function () {
        var contextObj = this;
        contextObj.drawingDetailsService.getRevisionsData(contextObj.drawingType, contextObj.drawingId, -1, 0, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            debugger;
            if (resultData["Data"] == "[]") {
                resultData["Data"] = null;
            }
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = contextObj.itemsSource.length;
            console.log("total", contextObj.totalItems);
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
        });
    };
    RevisionList.prototype.onCardClick = function (event) {
        //console.log("cardClick");        
        this.onmarkupCardClick.emit(event);
    };
    RevisionList.prototype.onSubmit = function (event) {
        var contextObj = this;
        var items;
        var count = 0;
        var updateValue; // JSON.stringify(JSON.parse(event.fieldobject)[2])
        var revisionNoObj; // = JSON.stringify(JSON.parse(event.fieldobject)[1])
        var singlecheck = JSON.parse(event.fieldobject).filter(function (item) {
            if (item.ReportFieldId == 4382 || item.ReportFieldId == 516) {
                updateValue = item;
                count++;
            }
            if (item.ReportFieldId == 4377 || item.ReportFieldId == 511) {
                revisionNoObj = item;
                // items.push({ ReportFieldId: 4377, Value: item.FieldValue });
                count++;
            }
            if (count == 2)
                return true;
            else
                return false;
        });
        // let selectId: number = event["dataKeyValue"];
        this.drawingDetailsService.updateRevisionDescription(this.drawingId, JSON.stringify(updateValue), contextObj.drawingType, revisionNoObj.Value, JSON.stringify(revisionNoObj)).subscribe(function (resultData) {
            //   if (this.getData.checkForUnhandledErrors(resultData)) {
            contextObj.success = resultData["Data"].Message;
            if (contextObj.success == "Success") {
                var datakey = contextObj.inputItems.dataKey;
                for (var i = 0; i < contextObj.itemsSource.length; i++) {
                    if (contextObj.itemsSource[i][datakey] == contextObj.inputItems.selectedIds[0]) {
                        contextObj.itemsSource[i] = JSON.parse(resultData["Data"].Data)[0];
                        var updatedData = new Array(); /*To notify the watcher about the change*/
                        updatedData = updatedData.concat(contextObj.itemsSource);
                        contextObj.itemsSource = updatedData;
                    }
                }
                contextObj.notificationService.ShowToaster("Drawing description updated", 3);
                contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
            // }
        });
    };
    RevisionList.prototype.setBuildingFieldDetails = function (jsonobject) {
        //////debugger
        var contextObj = this;
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 489
                    || jsonobject[i]["ReportFieldId"] == 473
                    || jsonobject[i]["ReportFieldId"] == 4304
                    || jsonobject[i]["ReportFieldId"] == 474 || jsonobject[i]["ReportFieldId"] == 4378 || jsonobject[i]["ReportFieldId"] == 4377) {
                    jsonobject[i]["IsEnabled"] = true;
                    jsonobject[i]["ReadOnlyMode"] = true;
                    jsonobject[i]["IsMandatory"] = false;
                }
            }
            return jsonobject;
        }
    };
    RevisionList.prototype.setFloorFieldDetails = function (jsonobject) {
        var contextObj = this;
        for (var i = 0; i < jsonobject.length; i++) {
            if (jsonobject[i]["ReportFieldId"] == 489
                || jsonobject[i]["ReportFieldId"] == 473
                || jsonobject[i]["ReportFieldId"] == 523
                || jsonobject[i]["ReportFieldId"] == 524
                || jsonobject[i]["ReportFieldId"] == 525
                || jsonobject[i]["ReportFieldId"] == 511) {
                jsonobject[i]["IsEnabled"] = true;
                jsonobject[i]["ReadOnlyMode"] = true;
                jsonobject[i]["IsMandatory"] = false;
            }
            else if (jsonobject[i]["ReportFieldId"] == 512) {
                jsonobject[i]["IsEnabled"] = true;
                jsonobject[i]["ReadOnlyMode"] = true;
                jsonobject[i]["IsMandatory"] = false;
                jsonobject[i]["DataEntryControlId"] = "1";
            }
        }
        return jsonobject;
    };
    RevisionList.prototype.okDeleteClick = function (event) {
        //  //  //console.log("Yes");
        // debugger
        var contextObj = this;
        this.showSlide = false;
        contextObj.revisionNo = contextObj.inputItems.selectedIds[0];
        this.drawingDetailsService.postRevisionDelete(this.drawingId, contextObj.revisionNo, this.drawingType).subscribe(function (resultData) {
            contextObj.success = resultData["Data"].Message;
            if (contextObj.success == "Success") {
                var retUpdatedSrc = contextObj.generalFunctions.updateDataSource(contextObj.itemsSource, "delete", '', contextObj.inputItems.selectedIds, contextObj.inputItems.dataKey, contextObj.totalItems);
                contextObj.itemsSource = retUpdatedSrc["itemSrc"];
                contextObj.totalItems = contextObj.itemsSource.length;
                contextObj.notificationService.ShowToaster("Revision deleted", 3);
                if (contextObj.itemsSource.length == 0)
                    contextObj.enableMenu = [];
                // contextObj._notificationService.ShowToaster("Drawing deleted", 3);
                //// for (var j = 0; j < contextObj.selIds.length; j++) {
                // var index = contextObj.itemsSource.indexOf(contextObj.itemsSource.filter(x => x[contextObj.datakey] == contextObj.revisionNo)[0]);
                //     if (index > -1)
                //         contextObj.itemsSource.splice(index, 1);
                //// }
                //  contextObj.notificationService.ShowToaster("Drawing deleted", 3);
                // debugger             
                contextObj.onRevisionCountChange.emit({
                    revisions: contextObj.itemsSource.length, drawingId: contextObj.drawingId
                });
            }
            else {
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    RevisionList.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    RevisionList.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    RevisionList.prototype.viewDwg = function () {
        this.revisionNo = this.inputItems.rowData["Revision No."];
        this.onViewDwgClick.emit({
            latestRevisionNo: this.revisionNo, drawingId: this.drawingId, rowData: this.inputItems.rowData
        });
    };
    RevisionList.prototype.setFieldDisabled = function (jsonobject) {
        var contextObj = this;
        if (jsonobject) {
            for (var i = 0; i < jsonobject.length; i++) {
                if (jsonobject[i]["ReportFieldId"] == 512) {
                    jsonobject[i]["IsEnabled"] = false;
                }
            }
        }
        return jsonobject;
    };
    RevisionList.prototype.onSort = function (objGrid) {
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataload();
    };
    RevisionList.prototype.RowUpdate = function (event) {
    };
    RevisionList.prototype.RowDelete = function (event) {
    };
    RevisionList.prototype.pageChanged = function (event) {
        var contextObj = this;
        contextObj.revisionNo = contextObj.inputItems.rowData["Revision No."];
        contextObj.drawingDetailsService.getRevisionsData(contextObj.drawingType, contextObj.drawingId, contextObj.revisionNo, event.pageEvent.page, this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (resultData) {
            if (resultData["Data"] == "[]") {
                resultData["Data"] = null;
            }
            contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
            contextObj.totalItems = contextObj.itemsSource.length;
            contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
            //console.log("data", contextObj.cardSource);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RevisionList.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RevisionList.prototype, "revisionNo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RevisionList.prototype, "drawingType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RevisionList.prototype, "pageTarget", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RevisionList.prototype, "moduleId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RevisionList.prototype, "onmarkupCardClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RevisionList.prototype, "onViewDwgClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], RevisionList.prototype, "onRevisionCountChange", void 0);
    RevisionList = __decorate([
        core_1.Component({
            selector: 'revision-list',
            templateUrl: './app/Views/Common/DrawingDetails/revisionlist.component.html',
            styleUrls: ['app/Views/Common/DrawingDetails/drawingdetails.css'],
            directives: [submenu_component_1.SubMenu, split_view_component_1.SplitViewComponent, notify_component_1.Notification, list_component_1.ListComponent, fieldGeneration_component_1.FieldComponent, slide_component_1.SlideComponent, grid_component_1.GridComponent],
            providers: [http_1.HTTP_PROVIDERS, drawingdetails_service_1.DrawingDetailsService, asbuilt_service_1.AsbuiltService, notify_service_1.NotificationService, paging_component_1.PagingComponent]
        }), 
        __metadata('design:paramtypes', [asbuilt_service_1.AsbuiltService, administration_service_1.AdministrationService, drawingdetails_service_1.DrawingDetailsService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], RevisionList);
    return RevisionList;
}());
exports.RevisionList = RevisionList;
//# sourceMappingURL=revisionlist.component.js.map
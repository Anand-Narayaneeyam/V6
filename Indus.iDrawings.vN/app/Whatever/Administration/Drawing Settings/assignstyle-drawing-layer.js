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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var sort_component_1 = require('../../../Framework/Whatever/Sort/sort.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var general_1 = require('../../../Models/common/general');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var AssignstyleDrawingLayerComponent = (function () {
    function AssignstyleDrawingLayerComponent(administrationService, notificationService, genFun) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.genFun = genFun;
        this.btnEnabled = false;
        this.totalItems = 0;
        this.itemsPerPage = 0;
        this.pageIndex = 0;
        this.alignContent = "horizontal";
        this.blnShowSort = true;
        this.enableMenu = [];
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: true, selectedIds: [], allowAdd: false, allowEdit: true, sortCol: "", sortDir: "ASC", isHeaderCheckBx: true };
        // inputItems: IGrid = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "[Id]", sortDir: "ASC", selectedIds: [], allowAdd: false, isHeaderCheckBx: true }; 
        this.menuData = [
            {
                "id": 1,
                "title": "Save Changes",
                "image": "Update",
                "path": "Update",
                "subMenu": null,
                "privilegeId": null
            }
        ];
    }
    AssignstyleDrawingLayerComponent.prototype.onSubMenuChange = function (event) {
        switch (event.value) {
            case 1:
                this.update();
                break;
        }
    };
    AssignstyleDrawingLayerComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.administrationService.getAssignStyleColumns().subscribe(function (resultData) {
            if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                contextObj.ddlStyleName = resultData["Data"].find(function (el) { return el.ReportFieldId === 4433; });
                contextObj.fieldObject = resultData["Data"];
                for (var i = 0; i < resultData["Data"].length; i++) {
                    var updatedData = new Array();
                    contextObj.fieldObject = resultData["Data"].splice(2, 5);
                    break;
                }
                for (var j = 0; j < contextObj.fieldObject.length; j++) {
                    if (contextObj.fieldObject[j].ReportFieldId == 4405 || contextObj.fieldObject[j].ReportFieldId == 272) {
                        contextObj.fieldObject[j].IsEnabled = false;
                    }
                }
            }
        });
    };
    AssignstyleDrawingLayerComponent.prototype.pageChanged = function (event) {
        /*if (event.pageEvent.page == 2) {
            this.administrationService.getAssignStyleList().subscribe(
                result => this.itemsSource = result["paging"],
                error => this.errorMessage = error,
                () => console.log('itemsSource', this.itemsSource));
        }
        else
        {
            this.administrationService.getAssignStyleList().subscribe(
                result => this.itemsSource = result["data"],
                error => this.errorMessage = error,
                () => console.log('itemsSource', this.itemsSource));
        }*/
    };
    AssignstyleDrawingLayerComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        if (contextObj.ddlSelectedStyleId != "-1") {
            var fieldobj = new Array();
            fieldobj.push({
                ReportFieldId: 4411,
                Value: contextObj.ddlSelectedStyleId
            });
            this.administrationService.getAssignStyleData(JSON.stringify(fieldobj), contextObj.pageIndex, '[' + objGrid.selectedField + ']', contextObj.inputItems.sortDir).subscribe(function (resultData) {
                if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                    contextObj.totalItems = resultData["Data"].DataCount;
                    if (contextObj.totalItems > 0) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                        contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                        contextObj.blnShowSort = true;
                    }
                    else {
                        contextObj.notificationService.ShowToaster("No data exists", 2);
                        contextObj.blnShowSort = false;
                    }
                }
            });
        }
        else {
            contextObj.itemsSource = null;
        }
    };
    AssignstyleDrawingLayerComponent.prototype.ddlStyleNameChange = function (event) {
        var contextObj = this;
        this.ddlSelectedStyleId = event;
        if (this.ddlSelectedStyleId == "-1") {
            contextObj.btnEnabled = false;
            contextObj.notificationService.ShowToaster("Select a Style Name", 2);
            contextObj.itemsSource = null;
            contextObj.enableMenu = [];
        }
        else {
            contextObj.btnEnabled = true;
            var fieldobj = new Array();
            fieldobj.push({
                ReportFieldId: 4411,
                Value: event
            });
            this.administrationService.getAssignStyleData(JSON.stringify(fieldobj), contextObj.pageIndex, contextObj.inputItems.sortCol, contextObj.inputItems.sortDir).subscribe(function (resultData) {
                contextObj.totalItems = resultData["Data"].DataCount;
                if (contextObj.totalItems > 0) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"].FieldBinderData);
                    contextObj.itemsPerPage = resultData["Data"].RowsPerPage;
                    contextObj.blnShowSort = true;
                    contextObj.enableMenu = [1];
                }
                else {
                    contextObj.enableMenu = [];
                    contextObj.notificationService.ShowToaster("No data exists", 3);
                    contextObj.blnShowSort = false;
                }
            });
        }
    };
    AssignstyleDrawingLayerComponent.prototype.update = function () {
        debugger;
        var contextObj = this;
        var plotStyleId = this.ddlSelectedStyleId;
        var reportFieldArray = new Array();
        if (plotStyleId != undefined || plotStyleId > -1) {
            for (var i = 0; i < this.itemsSource.length; i++) {
                if (this.itemsSource[i].IsAssigned == true) {
                    reportFieldArray.push({
                        ReportFieldId: 4402,
                        Value: this.itemsSource[i].Id
                    });
                }
            }
            reportFieldArray.push({
                ReportFieldId: 4411,
                Value: plotStyleId
            });
            this.administrationService.updateAssignStyleData(plotStyleId, JSON.stringify(reportFieldArray)).subscribe(function (resultData) {
                if (contextObj.genFun.checkForUnhandledErrors(resultData)) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster("Drawing Layer details updated", 3);
                            break;
                        case 1:
                            contextObj.notificationService.ShowToaster("Drawing Layer details updated", 3);
                            break;
                        case 3:
                            if (resultData["Data"].ServerId == -1) {
                                contextObj.notificationService.ShowToaster("Drawing Layer details already exists", 5);
                            }
                            break;
                    }
                }
            });
            var arrayList = new Array();
        }
        else {
            contextObj.btnEnabled = false;
        }
    };
    AssignstyleDrawingLayerComponent = __decorate([
        core_1.Component({
            selector: 'assignstyle-drawing-layer',
            templateUrl: './app/Views/Administration/Drawing Settings/assignstyle-drawing-layer.html',
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, dropdownlistcomponent_component_1.DropDownListComponent, sort_component_1.Sorting, submenu_component_1.SubMenu],
            providers: [administration_service_1.AdministrationService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, general_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, general_1.GeneralFunctions])
    ], AssignstyleDrawingLayerComponent);
    return AssignstyleDrawingLayerComponent;
}());
exports.AssignstyleDrawingLayerComponent = AssignstyleDrawingLayerComponent;
//# sourceMappingURL=assignstyle-drawing-layer.js.map
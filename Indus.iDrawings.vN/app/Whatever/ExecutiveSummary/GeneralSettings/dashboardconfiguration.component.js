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
var executivesummary_service_1 = require('../../../Models/ExecutiveSummary/executivesummary.service');
var grid_component_1 = require('../../../framework/whatever/grid/grid.component');
var ng2_dnd_1 = require('../../../Framework/ExternalLibraries/dnd/ng2-dnd');
var General_1 = require('../../../Models/Common/General');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var DashBoardConfigurationComponent = (function () {
    function DashBoardConfigurationComponent(executiveSummaryService, notificationService) {
        this.executiveSummaryService = executiveSummaryService;
        this.notificationService = notificationService;
        this.dragEnable = false; /*to enable drag and drop option */
        this.isNamesNAN = true;
        this.btnName = "Update";
        this.Dragged = false;
        this.IsChecked = true;
        this.reportFieldIds = new Array();
        this.inputItems = { dataKey: "Id", groupBy: [], grpWithCheckBx: false, sortCol: "", sortDir: "ASC", allowAdd: false, allowEdit: true };
    }
    DashBoardConfigurationComponent.prototype.ngOnInit = function () {
        var objContext = this;
        objContext.Dragged = false;
    };
    DashBoardConfigurationComponent.prototype.ngAfterViewInit = function () {
        var contextObj = this;
        this.executiveSummaryService.GetWidgetFields().subscribe(function (result) {
            contextObj.fieldObjectWidgets = (result["Data"]);
            contextObj.dataLoad();
        });
    };
    DashBoardConfigurationComponent.prototype.dataLoad = function () {
        var contextObj = this;
        contextObj.executiveSummaryService.GetAllWidgets(this.inputItems.sortCol, this.inputItems.sortDir).subscribe(function (result) {
            // debugger;
            contextObj.itemsSourceWidgets = JSON.parse(result["Data"].FieldBinderData);
            // contextObj.listWidgets.push(contextObj.itemsSourceAdmin);
        });
        //contextObj.SpS.GetDashboardOrgDistributionData("", contextObj.inputItems.sortDir).subscribe(function (result) {
        //    //contextObj.totalItems = result["Data"].DataCount;
        //    // debugger
        //    contextObj.itemsSourceSpace = JSON.parse(result["Data"].FieldBinderData);
        //});
    };
    DashBoardConfigurationComponent.prototype.selectAllOptions = function (event) {
        //debugger;
        if (this.itemsSourceWidgets != null) {
            if (event.target.checked == true) {
                for (var i = 0; i < this.itemsSourceWidgets.length; i++) {
                    this.itemsSourceWidgets[i].IsSelected = true;
                    this.IsChecked = true;
                }
            }
            else if (event.target.checked == false) {
                for (var i = 0; i < this.itemsSourceWidgets.length; i++) {
                    this.itemsSourceWidgets[i].IsSelected = false;
                    this.IsChecked = false;
                }
            }
        }
    };
    DashBoardConfigurationComponent.prototype.checkedOption = function (fieldObj) {
        this.Check();
        return fieldObj["IsSelected"];
    };
    DashBoardConfigurationComponent.prototype.updateCheckedOptions = function (widget, event) {
        widget["IsSelected"] = !widget["IsSelected"];
        this.Check();
    };
    DashBoardConfigurationComponent.prototype.Check = function () {
        if (this.itemsSourceWidgets != null) {
            // debugger;
            var count = 0;
            for (var i = 0; i < this.itemsSourceWidgets.length; i++) {
                if (this.itemsSourceWidgets[i].IsSelected == true) {
                    count++;
                }
            }
            if (count == this.itemsSourceWidgets.length) {
                this.IsSelectAllChecked = true;
            }
            else {
                this.IsSelectAllChecked = false;
            }
        }
    };
    DashBoardConfigurationComponent.prototype.changecursorstyle = function (MouseEvent) {
        var MouseElement = MouseEvent.srcElement;
        if (MouseElement)
            MouseElement.style.cursor = "pointer";
    };
    DashBoardConfigurationComponent.prototype.onSort = function (objGrid) {
        var contextObj = this;
        this.inputItems.sortCol = objGrid.sortCol;
        this.inputItems.sortDir = objGrid.sortDir;
        this.dataLoad();
    };
    DashBoardConfigurationComponent.prototype.ondragEnd = function (event) {
        console.log(event);
        if (event == true)
            this.Dragged = true;
    };
    DashBoardConfigurationComponent.prototype.SaveClick = function () {
        var contextObj = this;
        var posCount = 0;
        contextObj.reportFieldIds = [];
        debugger;
        for (var i = 0; i < this.itemsSourceWidgets.length; i++) {
            if (this.itemsSourceWidgets[i].IsSelected == true) {
                // this.itemsSourceWidgets[i].Position
                posCount++;
                this.reportFieldIds.push({
                    ReportFieldId: parseInt(this.itemsSourceWidgets[i].Id),
                    Value: posCount
                });
            }
        }
        if (posCount == 0) {
            contextObj.notificationService.ShowToaster("At least one dashboard widget needs to be selected", 2);
        }
        else {
            contextObj.postUpdateWidgetPreferences();
        }
    };
    DashBoardConfigurationComponent.prototype.postUpdateWidgetPreferences = function () {
        var contextObj = this;
        this.executiveSummaryService.postWidgetPreferences(JSON.stringify(contextObj.reportFieldIds)).subscribe(function (result) {
            debugger;
            contextObj.notificationService.ShowToaster("Dashboard Configuration updated", 3);
            //if (result["Data"].StatusId == 1) {
            //}
            //else {
            //    contextObj.showDispSetSlide = false;
            //}
            //contextObj.disableBtnSave = false;
            //console.log("after save", contextObj.dispSettingObject);
            //contextObj.emitdisplaySetting.emit({ "dispSettingObject": contextObj.dispSettingObject, "IsDragged": contextObj.Dragged });
        });
    };
    DashBoardConfigurationComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        debugger;
        if (contextObj.isNamesNAN) {
            switch (this.action) {
                case "add":
                    this.postSubmit(contextObj, event["fieldobject"], 1);
                    break;
                case "edit":
                    this.postSubmit(contextObj, event["fieldobject"], 2);
                    break;
            }
        }
    };
    DashBoardConfigurationComponent.prototype.postSubmit = function (contextObj, strsubmitField, target) {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DashBoardConfigurationComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DashBoardConfigurationComponent.prototype, "btnName", void 0);
    DashBoardConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'dashboard-config',
            templateUrl: './app/Views/ExecutiveSummary/GeneralSettings/dashboardconfiguration.component.html',
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'selectedUserRole'],
            directives: [ng2_dnd_1.DND_DIRECTIVES, fieldGeneration_component_1.FieldComponent, grid_component_1.GridComponent],
            //directives: [FieldComponent, Notification, SlideComponent, StringTextBoxComponent, DropDownListComponent, CustomRadioComponent, CustomCheckBoxComponent, ButtonComponent],
            providers: [executivesummary_service_1.ExecutiveSummaryService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [executivesummary_service_1.ExecutiveSummaryService, notify_service_1.NotificationService])
    ], DashBoardConfigurationComponent);
    return DashBoardConfigurationComponent;
}());
exports.DashBoardConfigurationComponent = DashBoardConfigurationComponent;
//# sourceMappingURL=dashboardconfiguration.component.js.map
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
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var space_service_1 = require('../../../Models/Space/space.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var dropdownlistcomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var table_component_1 = require('../../../Framework/Whatever/Table/table.component');
var DistributionMapSettingsComponent = (function () {
    function DistributionMapSettingsComponent(spaceService, notificationService, generFun) {
        this.spaceService = spaceService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.target = -1;
        this.FieldName = "";
        this.Position = "bottom-right";
        this.width = 300;
        this.change = false;
        this.showSlide = false;
        this.disableButton = false;
        this.valueofDropDown = "";
        this.validatedValue = "";
        this.CAIFieldObject = undefined;
    }
    DistributionMapSettingsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        debugger;
        if (this.moduleId == 12) {
            this.spaceService.getDistributionMapSettingsFields().subscribe(function (resultData) {
                contextObj.fields = resultData["Data"];
                contextObj.spaceService.getCAIDistributionMapSettings("147", "12", true).subscribe(function (resultData) {
                    for (var _i = 0, _a = contextObj.fields; _i < _a.length; _i++) {
                        var val = _a[_i];
                        if (val["ReportFieldId"] == 290) {
                            val.FieldLabel = "CAI Space Driver";
                        }
                        if (val["ReportFieldId"] == 304 || val["ReportFieldId"] == 25 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298 || val["ReportFieldId"] == 22) {
                            val.IsEnabled = false;
                        }
                    }
                    contextObj.fields = contextObj.fields;
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    if (contextObj.itemsSource.length == 0) {
                        contextObj.disableButton = true;
                        contextObj.notificationService.ShowToaster("No data exists", 2);
                    }
                    else {
                        contextObj.disableButton = false;
                    }
                });
            });
        }
        else {
            this.spaceService.getDistributionMapSettingsFields().subscribe(function (resultData) {
                contextObj.fields = resultData["Data"];
                if (contextObj.fields.length > 0) {
                    contextObj.DropdownField = contextObj.fields.filter(function (el) {
                        return el["ReportFieldId"] === 304;
                    });
                    if (contextObj.DropdownField[0].LookupDetails.LookupValues.length != 0)
                        contextObj.DropdownField[0].FieldValue = "1";
                    else
                        contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
                }
                if (contextObj.fields.length > 0) {
                    contextObj.ValidatedDropDown = contextObj.fields.filter(function (el) {
                        return el["ReportFieldId"] === 22;
                    });
                    contextObj.ValidatedDropDown[0].FieldValue = "-1";
                    contextObj.ValidatedDropDown[0].Whitelist['FormatString'] = "4";
                    contextObj.ValidatedDropDown[0].Whitelist['RegularExpression'] = "";
                }
                if (contextObj.fields.length > 0) {
                    contextObj.fields = contextObj.fields.filter(function (el) {
                        if (el["ReportFieldId"] != 304 && el["ReportFieldId"] != 22)
                            return true;
                        else
                            return false;
                    });
                    for (var _i = 0, _a = contextObj.fields; _i < _a.length; _i++) {
                        var val = _a[_i];
                        if (contextObj.DropdownField.length == 0) {
                            val.IsEnabled = false;
                        }
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                            val.IsEnabled = false;
                        }
                    }
                }
                if (contextObj.DropdownField[0].LookupDetails.LookupValues.length != 0) {
                    contextObj.valueofDropDown = contextObj.DropdownField[0].LookupDetails.LookupValues[0].Value;
                    var fieldobj = new Array();
                    fieldobj.push({
                        ReportFieldId: 289,
                        Value: "1"
                    });
                    contextObj.spaceService.getDistributionMapSettingsData(fieldobj, 1, contextObj.target).subscribe(function (resultData) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        if (contextObj.itemsSource.length == 0) {
                            contextObj.disableButton = true;
                            contextObj.notificationService.ShowToaster("No data exists", 2);
                        }
                        else {
                            contextObj.disableButton = false;
                        }
                    });
                }
            });
        }
    };
    DistributionMapSettingsComponent.prototype.ngAfterViewInit = function () {
    };
    DistributionMapSettingsComponent.prototype.onChangeValidatedValues = function (value) {
        var selectedName;
        var contextObj = this;
        contextObj.DropdownField[0].FieldValue = "-1";
        contextObj.target = +value;
        contextObj.validatedValue = value;
        if (value != -1) {
            var fieldobj = new Array();
            fieldobj.push({
                ReportFieldId: 20,
                Value: value
            });
            selectedName = contextObj.ValidatedDropDown[0].LookupDetails.LookupValues.filter(function (el) {
                return el["Id"] === +value;
            });
            this.valueofDropDown = selectedName[0].Value;
            this.spaceService.getDistributionMapSettingsData(fieldobj, 0, value, selectedName[0].Value).subscribe(function (resultData) {
                for (var _i = 0, _a = contextObj.fields; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 290 || val["ReportFieldId"] == 298 || val["ReportFieldId"] == 296) {
                        val.IsEnabled = false;
                    }
                    if (val["ReportFieldId"] == 25) {
                        val.IsEnabled = true;
                        val.IsVisible = true;
                        val.FieldLabel = selectedName[0].Value;
                    }
                }
                contextObj.fields = contextObj.fields;
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                if (contextObj.itemsSource.length == 0) {
                    contextObj.disableButton = true;
                    contextObj.notificationService.ShowToaster("No data exists", 2);
                }
                else {
                    contextObj.disableButton = false;
                }
            });
        }
        else {
            this.itemsSource = undefined;
        }
    };
    DistributionMapSettingsComponent.prototype.onChangeDataFieldCategory = function (value) {
        var contextObj = this;
        contextObj.validatedValue = value;
        var selectedName;
        contextObj.ValidatedDropDown[0].FieldValue = "-1";
        contextObj.target = -1;
        if (value != -1) {
            var fieldobj = new Array();
            fieldobj.push({
                ReportFieldId: 289,
                Value: value
            });
            selectedName = contextObj.DropdownField[0].LookupDetails.LookupValues.filter(function (el) {
                return el["Id"] === +value;
            });
            this.valueofDropDown = selectedName[0].Value;
            this.spaceService.getDistributionMapSettingsData(fieldobj, value, contextObj.target).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                if (contextObj.itemsSource.length == 0) {
                    contextObj.notificationService.ShowToaster("No data exists", 2);
                    contextObj.disableButton = true;
                }
                else {
                    contextObj.disableButton = false;
                }
                for (var _i = 0, _a = contextObj.fields; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (val["ReportFieldId"] == 25) {
                        val.IsEnabled = false;
                        val.IsVisible = false;
                        val.FieldLabel = "";
                    }
                }
                if (value == 1) {
                    for (var _b = 0, _c = contextObj.fields; _b < _c.length; _b++) {
                        var val = _c[_b];
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294) {
                            val.IsEnabled = false;
                        }
                        else if (val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                            val.IsEnabled = false;
                        }
                        else if (val["ReportFieldId"] == 290) {
                            val.IsEnabled = true;
                        }
                    }
                }
                else if (value == 3) {
                    for (var _d = 0, _e = contextObj.fields; _d < _e.length; _d++) {
                        var val = _e[_d];
                        if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294) {
                            val.IsEnabled = true;
                        }
                        else if (val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                            val.IsEnabled = false;
                        }
                    }
                }
                else if (value == 4) {
                    for (var _f = 0, _g = contextObj.fields; _f < _g.length; _f++) {
                        var val = _g[_f];
                        if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296) {
                            val.IsEnabled = true;
                        }
                        else if (val["ReportFieldId"] == 298) {
                            val.IsEnabled = false;
                        }
                    }
                }
                else if (value == 5) {
                    for (var _h = 0, _j = contextObj.fields; _h < _j.length; _h++) {
                        var val = _j[_h];
                        if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                            val.IsEnabled = true;
                        }
                    }
                }
                else {
                    for (var _k = 0, _l = contextObj.fields; _k < _l.length; _k++) {
                        var val = _l[_k];
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 290) {
                            val.IsEnabled = true;
                        }
                        else if (val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298 || val["ReportFieldId"] == 294) {
                            val.IsEnabled = false;
                        }
                    }
                }
                contextObj.fields = contextObj.fields;
            });
        }
        else {
            this.itemsSource = undefined;
        }
    };
    DistributionMapSettingsComponent.prototype.submit = function (value) {
        this.savedData = value;
        var contextObj = this;
        var PageTarget;
        switch (this.target) {
            case -1:
                PageTarget = 1;
                break;
            case -2:
                PageTarget = 2;
                break;
            case 0:
                PageTarget = 3;
                break;
            default:
                PageTarget = 4;
        }
        if (this.moduleId == 12) {
            this.spaceService.updateCAIDistributionMapSettingsData(value.ReportFieldIdValues, 0, 1).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.spaceService.getUserPrivilegesofPage(contextObj.pageId, contextObj.Previlages).subscribe(function (resultData) {
                        if (resultData["Data"] == 1) {
                            contextObj.width = 300;
                            contextObj.change = !this.change;
                            contextObj.showSlide = !this.showSlide;
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
                        }
                    });
                }
                else if (resultData["Data"].Message == "Already Exists") {
                    contextObj.notificationService.ShowToaster("Distribution Map Settings already exists", 5);
                }
                else {
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
                }
            });
        }
        else {
            this.spaceService.updateDistributionMapSettingsData(value.ReportFieldIdValues, 0, 1, PageTarget, this.valueofDropDown, this.validatedValue).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.spaceService.getUserPrivilegesofPage(contextObj.pageId, contextObj.Previlages).subscribe(function (resultData) {
                        if (resultData["Data"] == 1) {
                            contextObj.width = 300;
                            contextObj.change = !this.change;
                            contextObj.showSlide = !this.showSlide;
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
                        }
                    });
                }
                else if (resultData["Data"].Message == "Already Exists") {
                    contextObj.notificationService.ShowToaster("Distribution Map Settings already exists", 5);
                }
                else {
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
                }
            });
        }
    };
    DistributionMapSettingsComponent.prototype.DefaultSetting = function (event) {
        var contextObj = this;
        var PageTarget;
        this.showSlide = !this.showSlide;
        switch (this.target) {
            case -1:
                PageTarget = 1;
                break;
            case -2:
                PageTarget = 2;
                break;
            case 0:
                PageTarget = 3;
                break;
            default:
                PageTarget = 4;
        }
        if (this.moduleId == 12) {
            this.spaceService.updateCAIDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
            });
        }
        else {
            this.spaceService.updateDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1, PageTarget, this.valueofDropDown, this.validatedValue).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
            });
        }
    };
    DistributionMapSettingsComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    DistributionMapSettingsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DistributionMapSettingsComponent.prototype, "pageId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DistributionMapSettingsComponent.prototype, "Previlages", void 0);
    DistributionMapSettingsComponent = __decorate([
        core_1.Component({
            selector: 'distributionmapsettings',
            templateUrl: './app/Views/Common/DistributionMapSettings/distributionmapsettings.component.html',
            directives: [grid_component_1.GridComponent, slide_component_1.SlideComponent, dropdownlistcomponent_component_1.DropDownListComponent, table_component_1.TableComponent, page_component_1.PageComponent],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['selectedDrwgIds', 'moduleId']
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DistributionMapSettingsComponent);
    return DistributionMapSettingsComponent;
}());
exports.DistributionMapSettingsComponent = DistributionMapSettingsComponent;
//# sourceMappingURL=distributionmapsettings.component.js.map
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
    }
    DistributionMapSettingsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.spaceService.getDistributionMapSettingsFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            if (contextObj.fields.length > 0) {
                contextObj.DropdownField = contextObj.fields.filter(function (el) {
                    return el["ReportFieldId"] === 304;
                });
                contextObj.DropdownField[0].FieldValue = "1";
            }
            if (contextObj.fields.length > 0) {
                contextObj.ValidatedDropDown = contextObj.fields.filter(function (el) {
                    return el["ReportFieldId"] === 22;
                });
                contextObj.ValidatedDropDown[0].FieldValue = "-1";
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
                    if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294) {
                        val.IsEnabled = false;
                    }
                }
            }
        });
        var fieldobj = new Array();
        fieldobj.push({
            ReportFieldId: 289,
            Value: "1"
        });
        this.spaceService.getDistributionMapSettingsData(fieldobj, 1, this.target).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
        });
    };
    DistributionMapSettingsComponent.prototype.ngAfterViewInit = function () {
    };
    DistributionMapSettingsComponent.prototype.onChangeValidatedValues = function (value) {
        var selectedName;
        var contextObj = this;
        contextObj.DropdownField[0].FieldValue = "-1";
        contextObj.target = value;
        if (value != -1) {
            var fieldobj = new Array();
            fieldobj.push({
                ReportFieldId: 289,
                Value: value
            });
            selectedName = contextObj.ValidatedDropDown[0].LookupDetails.LookupValues.filter(function (el) {
                return el["Id"] === +value;
            });
            this.spaceService.getDistributionMapSettingsData(fieldobj, 0, value, selectedName[0].Value).subscribe(function (resultData) {
                for (var _i = 0, _a = contextObj.fields; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 290) {
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
            });
        }
        else {
            this.itemsSource = undefined;
        }
    };
    DistributionMapSettingsComponent.prototype.onChangeDataFieldCategory = function (value) {
        var contextObj = this;
        contextObj.ValidatedDropDown[0].FieldValue = "-1";
        contextObj.target = -1;
        if (value != -1) {
            var fieldobj = new Array();
            fieldobj.push({
                ReportFieldId: 289,
                Value: value
            });
            this.spaceService.getDistributionMapSettingsData(fieldobj, value, contextObj.target).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
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
                        else if (val["ReportFieldId"] == 290) {
                            val.IsEnabled = true;
                        }
                    }
                }
                else if (value == 3) {
                    for (var _d = 0, _e = contextObj.fields; _d < _e.length; _d++) {
                        var val = _e[_d];
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294) {
                            val.IsEnabled = true;
                        }
                    }
                }
                else {
                    for (var _f = 0, _g = contextObj.fields; _f < _g.length; _f++) {
                        var val = _g[_f];
                        if (val["ReportFieldId"] == 292) {
                            val.IsEnabled = true;
                        }
                        if (val["ReportFieldId"] == 294) {
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
        this.spaceService.updateDistributionMapSettingsData(value.ReportFieldIdValues, 0, 1).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                contextObj.width = 300;
                contextObj.change = !this.change;
                contextObj.showSlide = !this.showSlide;
            }
            else
                contextObj.notificationService.ShowToaster("Update Failed", 5);
        });
    };
    DistributionMapSettingsComponent.prototype.DefaultSetting = function (event) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.spaceService.updateDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("Update Failed", 5);
        });
    };
    DistributionMapSettingsComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    DistributionMapSettingsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    DistributionMapSettingsComponent = __decorate([
        core_1.Component({
            selector: 'distributionmapsettings',
            templateUrl: './app/Views/Space/General Settings/distributionmapsettings.component.html',
            directives: [grid_component_1.GridComponent, slide_component_1.SlideComponent, dropdownlistcomponent_component_1.DropDownListComponent, table_component_1.TableComponent, page_component_1.PageComponent],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['selectedDrwgIds']
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DistributionMapSettingsComponent);
    return DistributionMapSettingsComponent;
}());
exports.DistributionMapSettingsComponent = DistributionMapSettingsComponent;
//# sourceMappingURL=distributionmapsettings.js.map
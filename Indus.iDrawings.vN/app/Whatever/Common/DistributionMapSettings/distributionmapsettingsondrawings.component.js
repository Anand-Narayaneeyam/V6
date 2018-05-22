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
var tableDistMaponDrawing_component_1 = require('../../../Framework/Whatever/Table/tableDistMaponDrawing.component');
var DistributionMapSettingsonDrawingsComponent = (function () {
    function DistributionMapSettingsonDrawingsComponent(spaceService, notificationService, generFun) {
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
        this.buttonName = "Show Distribution Map";
        this.submitSuccess = new core_1.EventEmitter();
    }
    DistributionMapSettingsonDrawingsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.spaceService.getDistributionMapSettingsonDrawingsFields().subscribe(function (resultData) {
            debugger;
            contextObj.fields = resultData["Data"];
            if (contextObj.fields.length > 0) {
                contextObj.DropdownField = contextObj.fields.filter(function (el) {
                    return el["ReportFieldId"] === 304;
                });
            }
            if (contextObj.fields.length > 0) {
                contextObj.ValidatedDropDown = contextObj.fields.filter(function (el) {
                    return el["ReportFieldId"] === 22;
                });
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
                    //if (contextObj.DropdownField.length == 0) {
                    //    val.IsEnabled = false;
                    //}
                    if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                        val.IsEnabled = false;
                    }
                    if (contextObj.value == "-4" && val.ReportFieldId == 290) {
                        val.FieldLabel = "CAI Archived Space Driver";
                    }
                }
            }
            //if (contextObj.DropdownField[0].LookupDetails.LookupValues.length != 0) {
            //contextObj.valueofDropDown = contextObj.DropdownField[0].LookupDetails.LookupValues[0].Value;
            var fieldobj = new Array();
            contextObj.target = -1;
            switch (contextObj.value) {
                case 290:
                    contextObj.value = 1;
                    break;
                case 292:
                    contextObj.value = 2;
                    break;
                case 294:
                    contextObj.value = 3;
                    break;
                case 296:
                    contextObj.value = 4;
                    break;
                case 298:
                    contextObj.value = 5;
                    break;
                case -1:
                case -2:
                    contextObj.value = -2;
                    break;
                case 0:
                    contextObj.value = 0;
                    break;
                default:
                    contextObj.target = contextObj.value;
                    contextObj.target = 1;
                    break;
            }
            if (contextObj.value == "-4") {
                fieldobj.push({ ReportFieldId: 1591, Value: contextObj.drawingId });
                fieldobj.push({ ReportFieldId: 1590, Value: contextObj.archiveId });
            }
            else {
                fieldobj.push({
                    ReportFieldId: 289,
                    Value: contextObj.value
                });
                fieldobj.push({
                    ReportFieldId: 781,
                    Value: contextObj.drawingId
                });
                fieldobj.push({
                    ReportFieldId: 278,
                    Value: contextObj.moduleId
                });
                fieldobj.push({
                    ReportFieldId: 20,
                    Value: contextObj.value
                });
            }
            if (contextObj.value > 0 && contextObj.value < 6) {
                contextObj.spaceService.getDistributionMapSettingsnDrawingsData(fieldobj, contextObj.value, contextObj.target).subscribe(function (resultData) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    if (contextObj.itemsSource.length == 0) {
                        contextObj.notificationService.ShowToaster("No " + contextObj.fieldname + "(s) are assigned to this floor", 2);
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
                    if (contextObj.value == 1) {
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
                    else if (contextObj.value == 3) {
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
                    else if (contextObj.value == 4) {
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
                    else if (contextObj.value == 5) {
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
            else if (contextObj.value == "-4") {
                contextObj.spaceService.getDistributionMapSettingsnDrawingsData(fieldobj, contextObj.value, contextObj.value).subscribe(function (resultData) {
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    if (contextObj.itemsSource.length == 0) {
                        contextObj.notificationService.ShowToaster("No " + contextObj.fieldname + "(s) are assigned to this floor", 2);
                        contextObj.disableButton = true;
                    }
                });
            }
            else {
                var selectedName = contextObj.fieldname;
                //contextObj.ValidatedDropDown[0].LookupDetails.LookupValues.filter(function (el) {
                //    return el["Id"] === +contextObj.value;
                //});
                contextObj.spaceService.getDistributionMapSettingsnDrawingsData(fieldobj, 0, contextObj.value, selectedName).subscribe(function (resultData) {
                    for (var _i = 0, _a = contextObj.fields; _i < _a.length; _i++) {
                        var val = _a[_i];
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 290 || val["ReportFieldId"] == 298 || val["ReportFieldId"] == 296) {
                            val.IsEnabled = false;
                        }
                        if (val["ReportFieldId"] == 25) {
                            val.IsEnabled = true;
                            val.IsVisible = true;
                            val.FieldLabel = selectedName;
                        }
                    }
                    contextObj.fields = contextObj.fields;
                    contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                    if (contextObj.itemsSource.length == 0) {
                        contextObj.disableButton = true;
                        contextObj.notificationService.ShowToaster("No " + contextObj.fieldname + "(s) are assigned to this floor", 2);
                    }
                    else {
                        contextObj.disableButton = false;
                    }
                });
            }
            //}
        });
    };
    DistributionMapSettingsonDrawingsComponent.prototype.ngAfterViewInit = function () {
    };
    DistributionMapSettingsonDrawingsComponent.prototype.submit = function (value) {
        var contextObj = this;
        this.savedData = value;
        var PageTarget;
        switch (this.value) {
            case 1:
                this.value = 290;
                break;
            case 2:
                this.value = 292;
                break;
            case 3:
                this.value = 294;
                break;
            case 4:
                this.value = 296;
                break;
            case 5:
                this.value = 298;
                break;
            case -2:
                this.value = -1;
                break;
        }
        var checkcount = value.checkcount;
        if (checkcount == 0) {
            contextObj.notificationService.ShowToaster("Select at least one " + this.fieldname + ", Color", 5);
        }
        else {
            var count = 0;
            var reportfieldidvalue = value.ReportFieldIdValues;
            var fields1 = JSON.parse(reportfieldidvalue);
            var fieldobj = new Array();
            for (var i = 0; i < fields1.length; i++) {
                fields1[i].ReportFieldIdValues.find(function (item) {
                    if (item.ReportFieldId == 766) {
                        contextObj.angle = item.Value;
                    }
                });
                fields1[i].ReportFieldIdValues.find(function (item) {
                    if (item.ReportFieldId == 765) {
                        contextObj.pattern = item.Value;
                    }
                });
                fields1[i].ReportFieldIdValues.find(function (item) {
                    if (item.ReportFieldId == 767) {
                        contextObj.scale = item.Value;
                    }
                });
                fields1[i].ReportFieldIdValues.find(function (item) {
                    if (item.ReportFieldId == 768) {
                        if (item.Value != "nil")
                            contextObj.color = item.Value;
                        else
                            contextObj.color = "FFFFFF";
                    }
                });
                fields1[i].ReportFieldIdValues.find(function (item) {
                    if (item.ReportFieldId == 286) {
                        contextObj.selectedValue = item.Value;
                    }
                });
                this.spaceService.insertDistributionMaponDrawing(this.value, this.drawingId, contextObj.selectedValue, contextObj.pattern, contextObj.angle, contextObj.scale, "'" + contextObj.color + "'").subscribe(function (resultData) {
                    if (resultData.ServerId == 1) {
                        count++;
                    }
                    if (count == fields1.length) {
                        if (contextObj.value == "-4") {
                            contextObj.spaceService.UpdateArchivedSpaceDriverDefaultColors(value.ReportFieldIdValues, contextObj.drawingId, contextObj.archiveId).subscribe(function (resultData) {
                                contextObj.submitSuccess.emit({ status: "success", FieldId: contextObj.value, FieldName: contextObj.fieldname });
                            });
                        }
                        else
                            contextObj.submitSuccess.emit({ status: "success", FieldId: contextObj.value, FieldName: contextObj.fieldname });
                    }
                });
            }
        }
    };
    DistributionMapSettingsonDrawingsComponent.prototype.DefaultSetting = function (event) {
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
        this.spaceService.updateDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1, PageTarget, this.valueofDropDown).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("Update Failed", 5);
        });
    };
    DistributionMapSettingsonDrawingsComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    DistributionMapSettingsonDrawingsComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DistributionMapSettingsonDrawingsComponent.prototype, "pageId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DistributionMapSettingsonDrawingsComponent.prototype, "Previlages", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DistributionMapSettingsonDrawingsComponent.prototype, "submitSuccess", void 0);
    DistributionMapSettingsonDrawingsComponent = __decorate([
        core_1.Component({
            selector: 'distributionmapsettingsondrawings',
            templateUrl: './app/Views/Common/DistributionMapSettings/distributionmapsettingsondrawings.component.html',
            directives: [grid_component_1.GridComponent, slide_component_1.SlideComponent, dropdownlistcomponent_component_1.DropDownListComponent, tableDistMaponDrawing_component_1.TableDistMaponDrawingComponent, page_component_1.PageComponent],
            providers: [space_service_1.SpaceService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions],
            inputs: ['value', 'fieldname', 'drawingId', 'moduleId', 'archiveId']
        }), 
        __metadata('design:paramtypes', [space_service_1.SpaceService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DistributionMapSettingsonDrawingsComponent);
    return DistributionMapSettingsonDrawingsComponent;
}());
exports.DistributionMapSettingsonDrawingsComponent = DistributionMapSettingsonDrawingsComponent;
//# sourceMappingURL=distributionmapsettingsondrawings.component.js.map
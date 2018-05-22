var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../building/building-addedit.component.ts" />
var core_1 = require('@angular/core');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var site_addedit_component_1 = require('../site/site-addedit.component');
var building_addedit_component_1 = require('../building/building-addedit.component');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var FloorAddEditComponent = (function () {
    function FloorAddEditComponent(administrationService, validateService, _notificationService, generFun) {
        this.administrationService = administrationService;
        this.validateService = validateService;
        this._notificationService = _notificationService;
        this.generFun = generFun;
        this.addedit = "add";
        this.position = "top-right";
        this.showSlide = false;
        this.submitSuccess = new core_1.EventEmitter();
    }
    FloorAddEditComponent.prototype.ngOnInit = function () {
        console.log("mod1" + this.moduleId.toString());
        if (this.addEdit == "add")
            this.btnName = "Save";
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes";
    };
    FloorAddEditComponent.prototype.ngOnChanges = function (changes) {
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save";
            var contextObj = this;
            this.administrationService.loadFloorAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                    var _loop_1 = function(i) {
                        switch (contextObj.fieldDetailsSpaceEdit[i]["FieldId"]) {
                            case 347:
                                contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = true;
                                contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "1";
                                break;
                            case 38:
                                contextObj.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = result == 1 ? null : { Name: "SiteAdd", showImage: true };
                                });
                                // contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = { Name: "SiteAdd", showImage: true };
                                break;
                            case 325:
                                contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = { Name: "BuildingAdd", showImage: true };
                                break;
                        }
                    };
                    for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                        _loop_1(i);
                    }
                }
            });
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes";
            var contextObj = this;
            this.administrationService.loadFloorAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                    for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                        switch (contextObj.fieldDetailsSpaceEdit[i]["FieldId"]) {
                            case 347:
                                contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = false;
                                break;
                            case 38:
                                if (changes["pagePath"] && changes["pagePath"]["currentValue"] == "As Builts / Data")
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = null;
                                contextObj.fieldDetailsSpaceEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsSpaceEdit[i]["ReadOnlyMode"] = true;
                                break;
                            case 325:
                                if (changes["pagePath"] && changes["pagePath"]["currentValue"] == "As Builts / Data")
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = null;
                                contextObj.fieldDetailsSpaceEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsSpaceEdit[i]["ReadOnlyMode"] = true;
                                break;
                        }
                    }
                }
            });
        }
    };
    FloorAddEditComponent.prototype.onSubmitData = function (event) {
        if (this.addEdit == "add") {
            var temp = JSON.parse(event["fieldobject"]);
            var contextObj = this;
            if (contextObj.moduleId != undefined)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });
            this.administrationService.submitFloorAdd(JSON.stringify(temp)).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"];
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Floor added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("Failed to update Floor", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            contextObj._notificationService.ShowToaster("Floor already exists", 5);
                        }
                    }
                }
            });
        }
        else if (this.addEdit == "edit") {
            var contextObj = this;
            var temp = JSON.parse(event["fieldobject"]);
            if (contextObj.moduleId)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });
            this.administrationService.submitFloorEdit(JSON.stringify(temp), this.selectedId).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.success = (resultData["Data"]);
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Floor updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("Failed to update Floor", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            contextObj._notificationService.ShowToaster("Floor already exists", 5);
                        }
                    }
                }
            });
        }
    };
    FloorAddEditComponent.prototype.fieldChange = function (event) {
        var fieldobj = new Array();
        var siteid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        if (siteid) {
            fieldobj.push({
                ReportFieldId: event["ddlRelationShipEvent"]["ChildFieldObject"]["ReportFieldId"],
                Value: event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"]
            });
        }
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var result;
        var status = this.fieldDetailsSpaceEdit.find(function (item) { return item.FieldId === 347; });
        var contextObj = this;
        if (siteid > 0) {
            if (parentFieldId == 38) {
                status.IsEnabled = true;
                status.FieldValue = "1";
                this.administrationService.loadBuilding(siteid, parentFieldId).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    if (document.getElementById("325")) {
                                        var el = document.getElementById("325");
                                        contextObj.validateService.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true, el);
                                    }
                                    break;
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    if (document.getElementById("325")) {
                                        var el = document.getElementById("325");
                                        contextObj.validateService.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true, el);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                });
            }
            else if (parentFieldId == 325) {
                this.administrationService.getStatus(siteid, 487).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"] == 56) {
                            status.IsEnabled = false;
                            status.FieldValue = "56";
                        }
                        else {
                            status.IsEnabled = true;
                            status.FieldValue = "1";
                        }
                    }
                });
            }
        }
        else {
            if (parentFieldId == 38) {
                for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                    if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                        contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                        if (document.getElementById("325")) {
                            var el = document.getElementById("325");
                            contextObj.validateService.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true, el);
                        }
                        break;
                    }
                }
            }
            else if (parentFieldId == 325) {
                status.IsEnabled = true;
                status.FieldValue = "1";
            }
        }
    };
    FloorAddEditComponent.prototype.addClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    FloorAddEditComponent.prototype.popupItemEmit = function (event) {
        this.showSlide = !this.showSlide;
        this.btnName = "";
        this.sitebuildingadd = event["reportfieldId"];
        if (this.sitebuildingadd == 38)
            this.title = "New Site";
        else if (this.sitebuildingadd == 325)
            this.title = "New Building";
    };
    FloorAddEditComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
        if (this.addEdit == "add")
            this.btnName = "Save";
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes";
        this.sitebuildingadd = 0;
    };
    FloorAddEditComponent.prototype.OnSuccessfulSubmi = function (event) {
        if (event["status"] == "success") {
            this.showSlide = !this.showSlide;
            if (this.addEdit == "add")
                this.btnName = "Save";
            else if (this.addEdit == "edit")
                this.btnName = "Save Changes";
            var sitedetails = this.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 489; });
            var buildingdetails = this.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 541; });
            var status = this.fieldDetailsSpaceEdit.find(function (item) { return item.FieldId === 347; });
            if (this.sitebuildingadd == 38) {
                sitedetails.FieldValue = JSON.parse(event["returnData"]["Data"])[0].Id.toString();
                sitedetails.LookupDetails.LookupValues.push({ Id: JSON.parse(event["returnData"]["Data"])[0].Id, IsDisabled: null, Value: JSON.parse(event["returnData"]["Data"])[0].Site });
                status.IsEnabled = true;
                status.FieldValue = "1";
            }
            else if (this.sitebuildingadd == 325) {
                var contextObj = this;
                sitedetails.FieldValue = JSON.parse(event["returnData"]["Data"])[0].SiteId.toString();
                this.administrationService.loadBuilding(JSON.parse(event["returnData"]["Data"])[0].SiteId, 38).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                        buildingdetails.FieldValue = JSON.parse(event["returnData"]["Data"])[0].BuildingId.toString();
                        contextObj.administrationService.getStatus(buildingdetails.FieldValue, 487).subscribe(function (resultData) {
                            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                                if (resultData["Data"] == 56) {
                                    status.IsEnabled = false;
                                    status.FieldValue = "56";
                                }
                                else {
                                    status.IsEnabled = true;
                                    status.FieldValue = "1";
                                }
                            }
                        });
                    }
                });
            }
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FloorAddEditComponent.prototype, "submitSuccess", void 0);
    FloorAddEditComponent = __decorate([
        core_1.Component({
            selector: 'floor-addEdit',
            templateUrl: 'app/Views/Administration/Floor/floor-addedit.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, site_addedit_component_1.SiteAddEditComponent, building_addedit_component_1.BuildingAddEditComponent],
            inputs: ['selectedId', 'addEdit', 'moduleId']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, validation_service_1.ValidateService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], FloorAddEditComponent);
    return FloorAddEditComponent;
}());
exports.FloorAddEditComponent = FloorAddEditComponent;
//# sourceMappingURL=floor-addedit.component.js.map
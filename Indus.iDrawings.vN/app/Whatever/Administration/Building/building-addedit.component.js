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
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var popupadd_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/popupadd.component');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var site_addedit_component_1 = require('../site/site-addedit.component');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var map_component_1 = require('../../../Framework/Whatever/Map/map.component');
var BuildingAddEditComponent = (function () {
    function BuildingAddEditComponent(administrationService, _validateService, _notificationService, getData, generFun) {
        this.administrationService = administrationService;
        this._validateService = _validateService;
        this._notificationService = _notificationService;
        this.getData = getData;
        this.generFun = generFun;
        this.addedit = "add";
        this.position = "top-right";
        this.showSlide = false;
        this.submitSuccess = new core_1.EventEmitter();
        this.inputItems = [];
        this.splitview = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
        this.pageTitle = "";
        this.flag = false;
    }
    BuildingAddEditComponent.prototype.ngOnInit = function () {
        if (this.addEdit == "add")
            this.btnName = "Save";
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes";
    };
    BuildingAddEditComponent.prototype.ngOnChanges = function (changes) {
        var index;
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save";
            var contextObj = this;
            this.administrationService.loadBuildingAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                    var _loop_1 = function(i) {
                        switch (contextObj.fieldDetailsSpaceEdit[i]["FieldId"]) {
                            case 42:
                                {
                                    contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = true;
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "1";
                                }
                                break;
                            case 1387:
                                {
                                    contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = false;
                                }
                                break;
                            case 38:
                                if (changes["pagePath"] == undefined) {
                                    contextObj.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
                                        contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = result == 1 ? null : { Name: "SiteAdd", showImage: true };
                                    });
                                }
                                else
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = null;
                                break;
                        }
                    };
                    for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                        _loop_1(i);
                    }
                    contextObj.fieldDetailsSpaceEdit = contextObj.checkRPMModuleIsEnabled(contextObj.fieldDetailsSpaceEdit);
                    contextObj.fieldDetailsSpaceEdit.find(function (el) {
                        if (el.FieldId == 54) {
                            contextObj.strPopupText = "Validate on Map";
                            el.LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                            return true;
                        }
                    });
                }
            });
        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes";
            var contextObj = this;
            this.administrationService.loadBuildingAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                    var _loop_2 = function(i) {
                        switch (contextObj.fieldDetailsSpaceEdit[i]["FieldId"]) {
                            case 42:
                                {
                                    contextObj.administrationService.getStatus(contextObj.selectedId, 487).subscribe(function (resultData) {
                                        if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                                            console.log(resultData);
                                            if (resultData["Data"] == 56) {
                                                contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = true;
                                                contextObj.fieldDetailsSpaceEdit[i].FieldValue = "56";
                                            }
                                            else
                                                contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = false;
                                        }
                                    });
                                }
                                break;
                            case 46:
                                relievinginfo = contextObj.fieldDetailsSpaceEdit.find(function (item) {
                                    return item.FieldId === 1387;
                                });
                                // debugger
                                if (contextObj.fieldDetailsSpaceEdit[i].FieldValue == "2") {
                                    relievinginfo.IsEnabled = true;
                                    relievinginfo.IsVisible = true;
                                }
                                else {
                                    relievinginfo.IsVisible = false;
                                }
                                break;
                            case 38:
                                if (changes["pagePath"] && changes["pagePath"]["currentValue"] == "As Builts / Data")
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = null;
                                else {
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = { Name: "SiteAdd", showImage: true };
                                }
                                break;
                        }
                    };
                    var relievinginfo;
                    for (var i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                        _loop_2(i);
                    }
                    contextObj.fieldDetailsSpaceEdit = contextObj.checkRPMModuleIsEnabled(contextObj.fieldDetailsSpaceEdit);
                    contextObj.fieldDetailsSpaceEdit.find(function (el) {
                        if (el.FieldId == 54) {
                            contextObj.strPopupText = "Validate on Map";
                            el.LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                            return true;
                        }
                    });
                }
            });
        }
    };
    BuildingAddEditComponent.prototype.onSubmitData = function (event) {
        // debugger
        if (this.addEdit == "add") {
            var temp = JSON.parse(event["fieldobject"]);
            var contextObj = this;
            if (contextObj.moduleId != undefined)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });
            this.administrationService.submitBuildingAdd(JSON.stringify(temp)).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"];
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Building added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -2) {
                            contextObj._notificationService.ShowToaster("Building already exists", 5);
                        }
                        else if (contextObj.success["ServerId"] == -1)
                            contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                        else if (contextObj.success["ServerId"] == -3)
                            contextObj._notificationService.ShowToaster("Building Code already exists", 5);
                    }
                }
            });
        }
        else if (this.addEdit == "edit") {
            var contextObj = this;
            var temp = JSON.parse(event["fieldobject"]);
            if (contextObj.moduleId)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });
            this.administrationService.submitBuildingEdit(JSON.stringify(temp), this.selectedId).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = (resultData["Data"]);
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Building updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -2) {
                            contextObj._notificationService.ShowToaster("Building already exists", 5);
                        }
                        else if (contextObj.success["ServerId"] == -1)
                            contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                        else if (contextObj.success["ServerId"] == -3)
                            contextObj._notificationService.ShowToaster("Building Code already exists", 5);
                    }
                }
            });
        }
    };
    BuildingAddEditComponent.prototype.addClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    BuildingAddEditComponent.prototype.fieldChange = function (event) {
        // debugger
        var parentSelectedValue = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var contextObj = this;
        var relievinginfo = this.fieldDetailsSpaceEdit.find(function (item) {
            return item.FieldId === 1387;
        });
        if (parentFieldId == 46) {
            console.log("relievinginfo", relievinginfo.FieldValue);
            //  relievinginfo.IsLocallyValidated = false;
            if (parentSelectedValue == "2") {
                // relievinginfo.IsMandatory = true;
                relievinginfo.IsEnabled = true;
                relievinginfo.IsVisible = true;
            }
            else {
                // relievinginfo.IsMandatory = false;
                relievinginfo.IsEnabled = false;
                relievinginfo.IsVisible = false;
                relievinginfo.FieldValue = null;
            }
        }
    };
    BuildingAddEditComponent.prototype.checkRPMModuleIsEnabled = function (data) {
        // debugger
        var contextObj = this;
        this.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var accesibleModules = resultData["Data"];
            var isRpmEnabled = [];
            isRpmEnabled = resultData["Data"].filter(function (item) { return item.ModuleId === 30; });
            if (isRpmEnabled.length > 0) {
                var count = 0;
                data.find(function (item) {
                    if (item.FieldId == 45 || item.FieldId == 46) {
                        if (isRpmEnabled) {
                            item.IsMandatory = true;
                            item.HasValidationError = true;
                            item.IsLocallyValidated = false;
                            var el = document.getElementById(item.FieldId.toString());
                            if (el != null && el != undefined) {
                                setTimeout(function () {
                                    contextObj._validateService.initiateValidation(item, contextObj, true, el);
                                }, 100);
                            }
                            count++;
                        }
                        if (count == 2)
                            return true;
                    }
                    else
                        return false;
                });
            }
            else {
                data.find(function (item) {
                    if (item.FieldId == 45 || item.FieldId == 46) {
                        if (isRpmEnabled) {
                            item.IsVisible = false;
                            count++;
                        }
                        if (count == 2)
                            return true;
                    }
                    else
                        return false;
                });
            }
        });
        return data;
    };
    BuildingAddEditComponent.prototype.popupItemEmit = function (event) {
        if (event["reportfieldId"] == 54) {
            this.pageTitle = "Map";
            this.getGisData(event);
        }
        else {
            this.showSlide = !this.showSlide;
            this.btnName = "";
            this.siteadd = event["reportfieldId"];
        }
        if (this.siteadd == 38)
            this.title = "New Site";
    };
    BuildingAddEditComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
        if (this.addEdit == "add")
            this.btnName = "Save";
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes";
        this.siteadd = 0;
    };
    BuildingAddEditComponent.prototype.OnSuccessfulSubmi = function (event) {
        if (event["status"] == "success") {
            this.showSlide = !this.showSlide;
            if (this.addEdit == "add")
                this.btnName = "Save";
            else if (this.addEdit == "edit")
                this.btnName = "Save Changes";
            var sitedetails = this.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 489; });
            sitedetails.FieldValue = JSON.parse(event["returnData"]["Data"])[0].Id.toString();
            sitedetails.LookupDetails.LookupValues.push({ Id: JSON.parse(event["returnData"]["Data"])[0].Id, IsDisabled: null, Value: JSON.parse(event["returnData"]["Data"])[0].Site });
        }
    };
    BuildingAddEditComponent.prototype.getGisData = function (event) {
        var contextObj = this;
        contextObj.inputItems = [];
        var draggedLatitude = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 51; })]["FieldValue"];
        var draggedLongitude = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 54; })]["FieldValue"];
        if (draggedLatitude && draggedLongitude) {
            if (draggedLatitude >= -90 && draggedLatitude <= 90 && draggedLongitude >= -180 && draggedLongitude <= 180) {
                var Site, Building, OwnershipType, DateofConstruction, BuildingCondition;
                var Popup, subPopup, color;
                var index = contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 46; });
                var draggedOwnershipId = Number(contextObj.fieldDetailsSpaceEdit[index]["FieldValue"]);
                if (draggedOwnershipId >= 0) {
                    var OwnershipLookup = contextObj.fieldDetailsSpaceEdit[index].LookupDetails.LookupValues;
                    index = OwnershipLookup.findIndex(function (c) { return c.Id == draggedOwnershipId; });
                    OwnershipType = OwnershipLookup[index].Value;
                }
                index = contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 45; });
                var draggedBuildingConditionId = Number(contextObj.fieldDetailsSpaceEdit[index]["FieldValue"]);
                if (draggedBuildingConditionId >= 0) {
                    var BuildingConditionLookup = contextObj.fieldDetailsSpaceEdit[index].LookupDetails.LookupValues;
                    index = BuildingConditionLookup.findIndex(function (c) { return c.Id == draggedBuildingConditionId; });
                    BuildingCondition = BuildingConditionLookup[index].Value;
                }
                index = contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 38; });
                var SiteId = Number(contextObj.fieldDetailsSpaceEdit[index]["FieldValue"]);
                if (SiteId >= 0) {
                    var SiteLookup = contextObj.fieldDetailsSpaceEdit[index].LookupDetails.LookupValues;
                    index = SiteLookup.findIndex(function (c) { return c.Id == SiteId; });
                    Site = SiteLookup[index].Value;
                }
                var draggedid = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 38; })];
                Building = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 39; })]["FieldValue"];
                DateofConstruction = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 47; })]["FieldValue"];
                Popup = "<b style=\"display:inline-block;width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\" title=\"" + Site + "\">SITE: " + Site + "</b><br/>"
                    + "<b style=\"display:inline-block;width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\" title=\"" + Building + "\">BUILDING: " + Building + "</b>"
                    + "<hr style=\"height: 1px;width:190px;color: #333;background-color:#333;margin-left:0px;margin-top: 5px;margin-bottom: 5px;\" />"
                    + "<table style=\"position:relative;font-size:13px;\"><tr><td style=\"white-space:nowrap;\">Ownership Type</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + OwnershipType + "</td></tr>";
                subPopup = "";
                if (DateofConstruction)
                    subPopup = subPopup + "<tr><td style=\"white-space:nowrap;\">Construction Date</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + DateofConstruction + "</td></tr>";
                if (BuildingCondition)
                    subPopup = subPopup + "<tr><td style=\"white-space:nowrap;\">Building Condition</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + BuildingCondition + "</td></tr>";
                Popup = Popup + subPopup + "</table>";
                if (Number(contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 46; })]["FieldValue"]) == 3) {
                    color = "Red";
                }
                else {
                    color = "Blue";
                }
                if (Popup) {
                    contextObj.inputItems.push({ Id: 0, Latitude: draggedLatitude, Longitude: draggedLongitude, Popup: Popup, Color: color, Draggable: true });
                    contextObj.splitview.showSecondaryView = !contextObj.splitview.showSecondaryView;
                    contextObj.flag = true;
                    contextObj._notificationService.ShowToaster("Drag Pushpin to update Latitude and Longitude", 2);
                }
            }
        }
        else {
            contextObj._notificationService.ShowToaster("Enter Latitude and Longitude Values", 5);
        }
    };
    BuildingAddEditComponent.prototype.outputDraggedValue = function (event) {
        var contextObj = this;
        var DraggedItem = event.DraggedItem;
        contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 51; })]["FieldValue"] = DraggedItem.Latitude;
        contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 54; })]["FieldValue"] = DraggedItem.Longitude;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BuildingAddEditComponent.prototype, "submitSuccess", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BuildingAddEditComponent.prototype, "pagePath", void 0);
    BuildingAddEditComponent = __decorate([
        core_1.Component({
            selector: 'building-addEdit',
            templateUrl: 'app/Views/Administration/Building/building-addedit.html',
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, popupadd_component_1.PopupAddComponent, slide_component_1.SlideComponent, site_addedit_component_1.SiteAddEditComponent, split_view_component_1.SplitViewComponent, map_component_1.MapComponent],
            inputs: ['selectedId', 'addEdit', 'moduleId']
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, validation_service_1.ValidateService, notify_service_1.NotificationService, General_1.GeneralFunctions, General_1.GeneralFunctions])
    ], BuildingAddEditComponent);
    return BuildingAddEditComponent;
}());
exports.BuildingAddEditComponent = BuildingAddEditComponent;
//# sourceMappingURL=building-addedit.component.js.map
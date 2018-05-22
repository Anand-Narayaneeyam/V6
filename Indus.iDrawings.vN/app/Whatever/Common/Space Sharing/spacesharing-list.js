var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../../../models/common/general.ts" />
var core_1 = require('@angular/core');
var grid_component_1 = require('../../../Framework/Whatever/Grid/grid.component');
var paging_component_1 = require('../../../Framework/Whatever/Paging/paging.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var page_component_1 = require('../../../Framework/Whatever/Page/page.component');
var submenu_component_1 = require('../../../Framework/Whatever/Submenu/submenu.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var space_service_1 = require('../../../Models/Space/space.service');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var spacesharing = (function () {
    function spacesharing(differs, _notificationService, spaceService, generalFunctions, administrationService) {
        this.differs = differs;
        this._notificationService = _notificationService;
        this.spaceService = spaceService;
        this.generalFunctions = generalFunctions;
        this.administrationService = administrationService;
        this.submitSuccessSpaceShare = new core_1.EventEmitter();
        this.add = false;
        this.edit = false;
        this.delete = true;
        this.menuData = [];
        this.orgLevels = new Array();
        this.btnName = "";
        this.enableMenu = [0];
        this.pageTitle = "Space Sharing by Division";
        this.isSmartSearch = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
        this.inputItems = { dataKey: "RowIndex", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: this.add, allowEdit: this.edit, selectioMode: 'single' };
        this.currentPercentageValue = 0;
        this.action = "";
        this.orgunitIds = [];
        this.rowIndex = 0;
        this.onintCount = 0;
        this.chngeInputSource = false;
        this.position = "top-right";
        this.width = 300;
        this.change = false;
        this.showSlide = false;
        this.message = "";
        this.slidePopups = 0;
    }
    spacesharing.prototype.ngOnInit = function () {
        this.orgLevels.push({ lvl1: "", lvl2: "", lvl3: "", lvl4: "", lvl5: "" });
        this.menuData = [{
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        var context = this;
        context.spaceService.getSpaceSharingGridField().subscribe(function (result) {
            context.fieldObject = result["Data"];
        });
        if (context.selectedId[0] == undefined)
            context.spaceId = context.selectedId;
        else
            context.spaceId = context.selectedId[0];
        context.spaceService.getSpaceSharingGridData(context.spaceId).subscribe(function (result) {
            if (context.generalFunctions.checkForUnhandledErrors(result)) {
                context.totalItems = result["Data"].DataCount;
                context.onintCount = result["Data"].DataCount;
                var newdatasource = JSON.parse(result["Data"].FieldBinderData);
                var i = 0;
                newdatasource.filter(function (item) {
                    item["RowIndex"] = ++context.rowIndex;
                    context.currentPercentageValue = +parseFloat(item["Percentage"]).toFixed(1) + context.currentPercentageValue;
                    context.orgunitIds.push(+item["Id"]);
                    return true;
                });
                context.itemsSource = newdatasource;
                if (context.totalItems > 0) {
                    context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    context.itemsPerPage = result["Data"].RowsPerPage;
                    context.totalRowData = context.totalItems;
                }
                else {
                    context.currentPercentageValue = 0;
                }
            }
        });
    };
    spacesharing.prototype.ngDoCheck = function () {
    };
    spacesharing.prototype.ngOnChanges = function (changes) {
    };
    spacesharing.prototype.onSubmitSave = function () {
        var jsonVariable = {};
        var jsonarray = [];
        var contextObj = this;
        if (contextObj.currentPercentageValue == 100 && contextObj.chngeInputSource == true) {
            contextObj.itemsSource.filter(function (item) {
                var fieldObj = new Array();
                fieldObj.push({ ReportFieldId: 780, Value: contextObj.spaceId }, { ReportFieldId: 5080, Value: parseFloat(item["Percentage"]).toFixed(2) }, { ReportFieldId: 792, Value: item["Id"] });
                jsonarray.push(fieldObj);
                return true;
            });
            this.spaceService.insertSpacesharingOrganizationalUnit(JSON.stringify(jsonarray)).subscribe(function (resultData) {
                if (resultData["Data"].StatusId == 1)
                    contextObj._notificationService.ShowToaster("Space Sharing details saved", 3);
                else
                    contextObj._notificationService.ShowToaster("Failed to update Space Sharing", 5);
                contextObj.submitSuccessSpaceShare.emit({ update: true });
            });
        }
        else if (contextObj.currentPercentageValue == 0 && contextObj.chngeInputSource == true) {
            if (contextObj.onintCount > 0) {
                var fieldObj = new Array();
                fieldObj.push({ ReportFieldId: 780, Value: contextObj.spaceId });
                this.spaceService.deleteSpacesharingOrganizationalUnit(JSON.stringify(fieldObj)).subscribe(function (resultData) {
                    if (resultData["Data"].Message == "Success")
                        contextObj._notificationService.ShowToaster("Space Sharing details saved", 3);
                    else
                        contextObj._notificationService.ShowToaster("Failed to update Space Sharing", 5);
                    contextObj.submitSuccessSpaceShare.emit({ update: true });
                });
            }
            else {
                contextObj.submitSuccessSpaceShare.emit({ update: false });
            }
        }
        else if (contextObj.currentPercentageValue > 0 && contextObj.currentPercentageValue < 100 && contextObj.chngeInputSource == true) {
            contextObj._notificationService.ShowToaster("Occupancy Percentages should add up to 100", 2);
        }
        else {
            contextObj.submitSuccessSpaceShare.emit({ update: false });
        }
    };
    spacesharing.prototype.onCancel = function () {
    };
    spacesharing.prototype.pageChanged = function (event) {
    };
    spacesharing.prototype.onSubmitData = function (event) {
        var context = this;
        var jsonVariable = {};
        var jsonarray = [];
        var submitStatus = true;
        JSON.parse(event.fieldobject).filter(function (obj) {
            context.fieldObject.find(function (item) {
                if (obj.ReportFieldId == item.ReportFieldId) {
                    if (item.ReportFieldId == 290) {
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl1;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    }
                    else if (item.ReportFieldId == 292)
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl2;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    else if (item.ReportFieldId == 294)
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl3;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    else if (item.ReportFieldId == 296)
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl4;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    else if (item.ReportFieldId == 298)
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl5;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    else if (item.ReportFieldId == 5079)
                        jsonVariable[item.FieldLabel] = context.currentParentId;
                    else if (item.ReportFieldId == 780) {
                        if (context.action == "add")
                            jsonVariable[item.FieldLabel] = ++context.rowIndex;
                        else
                            jsonVariable[item.FieldLabel] = obj.Value;
                    }
                    else if (item.ReportFieldId == 5080) {
                        jsonVariable[item.FieldLabel] = (+parseFloat(obj.Value).toFixed(1)).toString();
                    }
                    else
                        jsonVariable[item.FieldLabel] = obj.Value;
                    return true;
                }
            });
            return true;
        });
        if (context.action == "Update") {
            context.orgunitIds = [];
            context.itemsSource.filter(function (item) {
                if (+item["RowIndex"] == context.inputItems.selectedIds[0]) {
                    context.orgunitIds.push(+jsonVariable["Id"]);
                }
                else {
                    context.orgunitIds.push(+item["Id"]);
                }
                return true;
            });
            var numOfTrue = 0;
            var status = false;
            for (var i = 0; i < context.orgunitIds.length; i++) {
                numOfTrue = 0;
                for (var j = 0; j < context.orgunitIds.length; j++) {
                    if (context.orgunitIds[i] === context.orgunitIds[j]) {
                        numOfTrue++;
                        if (numOfTrue > 1) {
                            status = true;
                        }
                    }
                }
            }
            if (status == true) {
                context._notificationService.ShowToaster("Organizational Unit already assigned", 5);
                submitStatus = false;
            }
        }
        else {
            context.orgunitIds = [];
            context.itemsSource.filter(function (item) {
                context.orgunitIds.push(+item["Id"]);
                return true;
            });
            if (context.orgunitIds.indexOf(+jsonVariable["Id"]) >= 0) {
                context._notificationService.ShowToaster("Organizational Unit already assigned", 5);
                submitStatus = false;
            }
            else {
                context.orgunitIds.push(+jsonVariable["Id"]);
            }
        }
        if (submitStatus == true) {
            jsonVariable["Area"] = (context.GrossArea * +parseFloat(jsonVariable["Percentage"]).toFixed(1)) / 100;
            jsonarray.push(jsonVariable);
            if ((+parseFloat(jsonVariable["Percentage"]).toFixed(1) + context.currentPercentageValue) > 100 && this.action == "add") {
                context._notificationService.ShowToaster("Total Occupancy Percentage cannot exceed 100", 5);
            }
            else if (this.action == "Update" && (+parseFloat(jsonVariable["Percentage"]).toFixed(1) + context.currentPercentageValue - +context.selectedpercentage) > 100) {
                context._notificationService.ShowToaster("Total Occupancy Percentage cannot exceed 100", 5);
            }
            else {
                var retUpdatedSrc = void 0;
                if (this.action == "add") {
                    context.chngeInputSource = true;
                    var newtable = {};
                    newtable["returnData"] = JSON.stringify(jsonarray);
                    context.refreshgrid = [];
                    context.currentPercentageValue = +parseFloat(jsonVariable["Percentage"]).toFixed(1) + +context.currentPercentageValue;
                    retUpdatedSrc = context.generalFunctions.updateDataSource(context.itemsSource, "add", newtable, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                    context.totalItems = retUpdatedSrc["itemCount"];
                    context.itemsSource = retUpdatedSrc["itemSrc"];
                    context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                    context.enableMenu = [0, 1, 2];
                    context.types = true;
                }
                else {
                    context.chngeInputSource = true;
                    var newtable = {};
                    newtable["returnData"] = JSON.stringify(jsonarray);
                    context.refreshgrid = [];
                    context.currentPercentageValue = +parseFloat(jsonVariable["Percentage"]).toFixed(1) + context.currentPercentageValue - +context.selectedpercentage;
                    retUpdatedSrc = context.generalFunctions.updateDataSource(context.itemsSource, "edit", newtable, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                    context.refreshgrid = context.refreshgrid.concat([true]);
                    context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                }
            }
        }
    };
    spacesharing.prototype.onSubMenuChange = function (event) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                if (contextObj.currentPercentageValue != 100) {
                    contextObj.action = "add";
                    contextObj.spaceService.getSpaceSharingeditDetailsFields(contextObj.spaceId).subscribe(function (result) {
                        contextObj.fieldDetailsAdd = result["Data"];
                        contextObj.fieldDetailsAdd.find(function (itemdetails) {
                            if (itemdetails.FieldLabel == "Percentage") {
                                itemdetails.FieldValue = (100 - (+parseFloat(contextObj.currentPercentageValue.toString()).toFixed(1))).toString();
                                itemdetails.FieldValue = parseFloat(itemdetails.FieldValue).toFixed(1);
                                return true;
                            }
                        });
                        contextObj.Target = 0;
                        contextObj.btnName = "Save";
                        contextObj.pageTitle = "Assign Shared Organizational Unit";
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });
                }
                else {
                    contextObj._notificationService.ShowToaster("Total Occupancy is already 100 percent", 5);
                }
                break;
            case 1:
                contextObj.spaceService.getSpaceSharingeditDetailsFields(contextObj.spaceId).subscribe(function (result) {
                    contextObj.fieldDetailsAdd = result["Data"];
                    contextObj.itemsSource.filter(function (item) {
                        if (contextObj.inputItems.selectedIds[0] == item["RowIndex"]) {
                            var length = contextObj.fieldDetailsAdd.length;
                            contextObj.fieldDetailsAdd[0].FieldValue = item[contextObj.fieldDetailsAdd[0].FieldLabel];
                            contextObj.fieldDetailsAdd[length - 2].FieldValue = item[contextObj.fieldDetailsAdd[length - 2].FieldLabel];
                            contextObj.fieldDetailsAdd[length - 1].FieldValue = item[contextObj.fieldDetailsAdd[length - 1].FieldLabel];
                            contextObj.selectedpercentage = +item[contextObj.fieldDetailsAdd[length - 2].FieldLabel];
                            if (length - 2 > 1) {
                                if (contextObj.fieldDetailsAdd[1].LookupDetails.LookupValues != null) {
                                    contextObj.fieldDetailsAdd[1].LookupDetails.LookupValues.find(function (lookup) {
                                        if (lookup.Value == item[contextObj.fieldDetailsAdd[1].FieldLabel]) {
                                            contextObj.fieldDetailsAdd[1].FieldValue = lookup.Id.toString();
                                            contextObj.currentParentId = lookup.Id;
                                            contextObj.fieldDetailsAdd[1].FieldValue = item[contextObj.fieldDetailsAdd[1].FieldLabel];
                                            contextObj.orgLevels[0].lvl1 = item[contextObj.fieldDetailsAdd[1].FieldLabel];
                                            return true;
                                        }
                                    });
                                }
                            }
                            if (length - 2 > 2) {
                                var fieldObj = new Array();
                                if (contextObj.fieldDetailsAdd[2].ReportFieldId == 292) {
                                    fieldObj.push({ ReportFieldId: 289, Value: "2" }, { ReportFieldId: 288, Value: contextObj.currentParentId.toString() });
                                    contextObj.spaceService.loadSpacesharingOrganizationalUnit(contextObj.currentParentId, contextObj.fieldDetailsAdd[1].FieldId, fieldObj).subscribe(function (resultData) {
                                        contextObj.fieldDetailsAdd[2].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                        contextObj.fieldDetailsAdd[2].LookupDetails.LookupValues.find(function (lookup) {
                                            if (lookup.Value == item[contextObj.fieldDetailsAdd[2].FieldLabel]) {
                                                contextObj.fieldDetailsAdd[2].FieldValue = lookup.Id.toString();
                                                contextObj.currentParentId = lookup.Id;
                                                contextObj.orgLevels[0].lvl2 = item[contextObj.fieldDetailsAdd[2].FieldLabel];
                                                return true;
                                            }
                                        });
                                        if (length - 2 > 3) {
                                            var fieldObj = new Array();
                                            if (contextObj.fieldDetailsAdd[3].ReportFieldId == 294) {
                                                fieldObj.push({ ReportFieldId: 289, Value: "3" }, { ReportFieldId: 288, Value: contextObj.currentParentId.toString() });
                                                contextObj.spaceService.loadSpacesharingOrganizationalUnit(contextObj.currentParentId, contextObj.fieldDetailsAdd[2].FieldId, fieldObj).subscribe(function (resultData) {
                                                    contextObj.fieldDetailsAdd[3].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                    contextObj.fieldDetailsAdd[3].LookupDetails.LookupValues.find(function (lookup) {
                                                        if (lookup.Value == item[contextObj.fieldDetailsAdd[3].FieldLabel]) {
                                                            contextObj.fieldDetailsAdd[3].FieldValue = lookup.Id.toString();
                                                            contextObj.currentParentId = lookup.Id;
                                                            contextObj.orgLevels[0].lvl3 = item[contextObj.fieldDetailsAdd[3].FieldLabel];
                                                            return true;
                                                        }
                                                    });
                                                    if (length - 2 > 4) {
                                                        var fieldObj = new Array();
                                                        if (contextObj.fieldDetailsAdd[4].ReportFieldId == 296) {
                                                            fieldObj.push({ ReportFieldId: 289, Value: "4" }, { ReportFieldId: 288, Value: contextObj.currentParentId.toString() });
                                                            contextObj.spaceService.loadSpacesharingOrganizationalUnit(contextObj.currentParentId, contextObj.fieldDetailsAdd[3].FieldId, fieldObj).subscribe(function (resultData) {
                                                                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues.find(function (lookup) {
                                                                    if (lookup.Value == item[contextObj.fieldDetailsAdd[4].FieldLabel]) {
                                                                        contextObj.fieldDetailsAdd[4].FieldValue = lookup.Id.toString();
                                                                        contextObj.currentParentId = lookup.Id;
                                                                        contextObj.orgLevels[0].lvl4 = item[contextObj.fieldDetailsAdd[4].FieldLabel];
                                                                        return true;
                                                                    }
                                                                });
                                                                if (length - 2 > 5) {
                                                                    var fieldObj = new Array();
                                                                    if (contextObj.fieldDetailsAdd[5].ReportFieldId == 296) {
                                                                        fieldObj.push({ ReportFieldId: 289, Value: "5" }, { ReportFieldId: 288, Value: contextObj.currentParentId.toString() });
                                                                        contextObj.spaceService.loadSpacesharingOrganizationalUnit(contextObj.currentParentId, contextObj.fieldDetailsAdd[4].FieldId, fieldObj).subscribe(function (resultData) {
                                                                            contextObj.fieldDetailsAdd[5].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                                            contextObj.fieldDetailsAdd[5].LookupDetails.LookupValues.find(function (lookup) {
                                                                                if (lookup.Value == item[contextObj.fieldDetailsAdd[5].FieldLabel]) {
                                                                                    contextObj.fieldDetailsAdd[5].FieldValue = lookup.Id.toString();
                                                                                    contextObj.currentParentId = lookup.Id;
                                                                                    contextObj.orgLevels[0].lvl5 = item[contextObj.fieldDetailsAdd[5].FieldLabel];
                                                                                    return true;
                                                                                }
                                                                            });
                                                                            if (length - 2 > 3) {
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        return true;
                    });
                    contextObj.Target = 0;
                    contextObj.btnName = "Save Changes";
                    contextObj.action = "Update";
                    contextObj.pageTitle = "Assign Shared Organizational Unit";
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
                break;
            case 2:
                if (contextObj.inputItems.selectedIds[0] != undefined) {
                    contextObj.Target = 2;
                    contextObj.slidePopups = 2;
                    this.message = "Are you sure you want to delete the selected Organizational Unit?";
                    contextObj.width = 300;
                    contextObj.change = !this.change;
                    contextObj.showSlide = !this.showSlide;
                }
                else {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                break;
        }
    };
    spacesharing.prototype.editddlChange = function (arg, state) {
        var context = this;
        var rptFieldId;
        if (state == true) {
            rptFieldId = arg;
        }
        else {
            rptFieldId = arg.ddlRelationShipEvent.ChildFieldObject;
        }
        var fieldObj = new Array();
        context.currentParentId = +rptFieldId.FieldValue;
        switch (rptFieldId.ReportFieldId) {
            case 290:
                var rptArray = [292, 294, 296, 298]; //clearing orgddl
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl1 = item.Value;
                            return true;
                        }
                    });
                    fieldObj.push({ ReportFieldId: 289, Value: "2" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpacesharingOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 292);
                    });
                }
                else {
                    context.orgLevels[0].lvl1 = "";
                    context.orgLevels[0].lvl2 = "";
                    context.orgLevels[0].lvl3 = "";
                    context.orgLevels[0].lvl4 = "";
                    context.orgLevels[0].lvl5 = "";
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 292:
                var rptArray = [294, 296, 298]; //clearing orgddl            
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl2 = item.Value;
                            return true;
                        }
                    });
                    fieldObj.push({ ReportFieldId: 289, Value: "3" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpacesharingOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 294);
                    });
                }
                else {
                    context.orgLevels[0].lvl2 = "";
                    context.orgLevels[0].lvl3 = "";
                    context.orgLevels[0].lvl4 = "";
                    context.orgLevels[0].lvl5 = "";
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 294:
                var rptArray = [296, 298]; //clearing orgddl             
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl3 = item.Value;
                            return true;
                        }
                    });
                    fieldObj.push({ ReportFieldId: 289, Value: "4" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpacesharingOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 296);
                    });
                }
                else {
                    context.orgLevels[0].lvl3 = "";
                    context.orgLevels[0].lvl4 = "";
                    context.orgLevels[0].lvl5 = "";
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 296:
                var rptArray = [298];
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl4 = item.Value;
                            return true;
                        }
                    });
                    fieldObj.push({ ReportFieldId: 289, Value: "5" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpacesharingOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 298);
                    });
                }
                else {
                    context.orgLevels[0].lvl4 = "";
                    context.orgLevels[0].lvl5 = "";
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 298:
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl5 = item.Value;
                            return true;
                        }
                    });
                }
                else {
                    context.orgLevels[0].lvl5 = "";
                }
                break;
        }
    };
    spacesharing.prototype.setRelatedOrgUnitddlValue = function (context, rptArray) {
        var count = rptArray.length;
        context.fieldDetailsAdd.find(function (item) {
            if (rptArray.indexOf(item.ReportFieldId) > -1) {
                count--;
                item.LookupDetails.LookupValues = [];
                item.FieldValue = "-1";
            }
            if (count == 0)
                return true;
            else
                return false;
        });
    };
    spacesharing.prototype.resetrealetedOrgLevellookup = function (context, rptArray, resultData, rsetddlRptFieldId) {
        var count = rptArray.length;
        context.fieldDetailsAdd.find(function (item) {
            if (rptArray.indexOf(item.ReportFieldId) > -1) {
                count--;
                if (item.ReportFieldId == rsetddlRptFieldId)
                    item.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                else
                    item.LookupDetails.LookupValues = [];
                item.FieldValue = "-1";
            }
            if (count == 0)
                return true;
            else
                return false;
        });
    };
    spacesharing.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
        if (this.slidePopups == 1) {
            this.submitSuccessSpaceShare.emit({ update: false });
        }
    };
    spacesharing.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    spacesharing.prototype.yesClick = function (value) {
        var context = this;
        if (context.slidePopups == 2) {
            context.currentPercentageValue = 0;
            context.itemsSource = context.itemsSource.filter(function (item) {
                if (+item["RowIndex"] != context.inputItems.selectedIds[0]) {
                    context.currentPercentageValue = +parseFloat(item["Percentage"]).toFixed(1) + context.currentPercentageValue;
                    return true;
                }
                else
                    return false;
            });
            context.inputItems.selectedIds[0] = undefined;
            context.totalRowData = context.totalRowData - 1;
            context.totalItems = context.totalItems - 1;
            if (context.totalItems == 0) {
                context.enableMenu = [0];
                context.types = true;
            }
            else {
                context.enableMenu = [0, 1, 2];
                context.types = true;
            }
            context.showSlide = !context.showSlide;
            context.chngeInputSource = true;
            context._notificationService.ShowToaster("Selected Organizational Unit deleted", 2);
        }
        else {
            this.onSubmitSave();
        }
    };
    spacesharing.prototype.onCancelSpaceSharing = function () {
        var contextObj = this;
        if ((contextObj.currentPercentageValue == 100 || (contextObj.currentPercentageValue == 0 && contextObj.onintCount > 0)) && contextObj.chngeInputSource == true) {
            this.width = 300;
            this.change = !this.change;
            this.slidePopups = 1;
            this.message = " Do you want to save changes?";
            this.showSlide = !this.showSlide;
        }
        else {
            contextObj.submitSuccessSpaceShare.emit({ update: false });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], spacesharing.prototype, "selectedId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], spacesharing.prototype, "GrossArea", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], spacesharing.prototype, "submitSuccessSpaceShare", void 0);
    spacesharing = __decorate([
        core_1.Component({
            selector: 'spacesharing-list',
            templateUrl: 'app/Views/Common/SpaceSharing/spacesharing-list.component.html',
            providers: [notify_service_1.NotificationService, General_1.GeneralFunctions, space_service_1.SpaceService, administration_service_1.AdministrationService],
            inputs: ["selectedId", "GrossArea"],
            directives: [grid_component_1.GridComponent, paging_component_1.PagingComponent, page_component_1.PageComponent, submenu_component_1.SubMenu, notify_component_1.Notification, slide_component_1.SlideComponent, fieldGeneration_component_1.FieldComponent, split_view_component_1.SplitViewComponent],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.KeyValueDiffers, notify_service_1.NotificationService, space_service_1.SpaceService, General_1.GeneralFunctions, administration_service_1.AdministrationService])
    ], spacesharing);
    return spacesharing;
}());
exports.spacesharing = spacesharing;
//# sourceMappingURL=spacesharing-list.js.map
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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var space_service_1 = require('../../../Models/Space/space.service');
var spacesharing_list_1 = require('../../Common/Space Sharing/spacesharing-list');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var SpaceAddEditComponent = (function () {
    function SpaceAddEditComponent(notificationService, spaceService, administrationService) {
        this.notificationService = notificationService;
        this.spaceService = spaceService;
        this.administrationService = administrationService;
        this.dataKey = "SpaceId";
        this.intpoptext = "";
        this.showSlide = false;
        this.spacesharingadd = "";
        this.addedit = "";
        this.btnName = "";
        this.submitSuccess = new core_1.EventEmitter();
        this.isableAllComponents = false;
        this.position = "top-right";
        this.splitviewInput1 = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
        this.pageTitle = "";
        this.levelname = "";
        this.selectedgrossArea = "";
    }
    SpaceAddEditComponent.prototype.ngOnInit = function () {
        var context = this;
        this.administrationService.getOrganizationNames().subscribe(function (resultData) {
            var pageName = JSON.parse(resultData["Data"]["FieldBinderData"]);
            if (pageName.length > 0) {
                context.levelname = pageName[0].Value;
            }
        });
        context.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            context.userRoleId = retData["UserRoleId"];
        });
        /*CAI space driver field visibility*/
        if (context.moduleId == 12) {
            context.fieldDetailsAdd.find(function (el) {
                if (el.FieldId == 2596) {
                    el.IsVisible = true;
                    return true;
                }
                else
                    return false;
            });
        }
        //var contextObj = this;
        //this.spaceService.checkEditPrivilageExist(this.selectedId).subscribe(function (resultData) {
        //    if (resultData['Data'].ServerId == 0)
        //        contextObj.isableAllComponents = true;
        //});
    };
    SpaceAddEditComponent.prototype.onSubmitData = function (event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    };
    SpaceAddEditComponent.prototype.ngOnChanges = function (changes) {
        this.intpoptext = this.strPopupText;
    };
    SpaceAddEditComponent.prototype.postSubmit = function (contextObj, strsubmitField, target) {
        debugger;
        var bigLevelId = contextObj.getGreaterOrgLevel();
        var submitFieldObj = JSON.parse(strsubmitField);
        submitFieldObj.find(function (item) {
            if (item.ReportFieldId == 792) {
                item.Value = bigLevelId;
                return true;
            }
            else {
                return false;
            }
        });
        var count = 0;
        //submitFieldObj.filter(function (item) {
        //    if (item.ReportFieldId == 271) {
        //        item.Value = contextObj.moduleId
        //    } count++;
        //    if (count == submitFieldObj.length)
        //        return true;
        //});
        submitFieldObj.push({ ReportFieldId: 271, Value: contextObj.moduleId });
        submitFieldObj = JSON.stringify(submitFieldObj);
        contextObj.spaceService.AddUpdateSpaceData(submitFieldObj, this.selectedId, target, this.seledrwgids.toString()).subscribe(function (resultData) {
            switch (resultData.StatusId) {
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Space details added", 3);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Space Details updated ", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData.Data });
                    break;
                case 3:
                    switch (resultData.ServerId) {
                        case -2:
                            contextObj.notificationService.ShowToaster("This Room Number is already allotted", 5);
                            break;
                        case -3:
                            contextObj.notificationService.ShowToaster("This Room Number is already allotted in this Site", 5);
                            break;
                        case -4:
                            contextObj.notificationService.ShowToaster("This Room Number is already allotted in this Floor", 5);
                            break;
                        case -5:
                            contextObj.notificationService.ShowToaster("This Room Number is already allotted in this Building", 5);
                            break;
                    }
                    break;
            }
        });
    };
    SpaceAddEditComponent.prototype.getGreaterOrgLevel = function () {
        var orgRptFieldId = [290, 292, 294, 296, 298];
        var ct = orgRptFieldId.length;
        var maxlevelId = 0;
        this.fieldDetailsAdd.find(function (item) {
            if (orgRptFieldId.indexOf(item.ReportFieldId) > -1) {
                ct--;
                if (item.FieldValue != "-1") {
                    maxlevelId = Number(item.FieldValue);
                }
            }
            if (ct == 0)
                return true;
            else
                return false;
        });
        return maxlevelId;
    };
    SpaceAddEditComponent.prototype.editddlChange = function (arg) {
        var context = this;
        var rptFieldId = arg.ddlRelationShipEvent.ChildFieldObject;
        var fieldObj = new Array();
        switch (rptFieldId.ReportFieldId) {
            case 783:
                if (rptFieldId.FieldValue != "4") {
                    this.setEnable(false);
                }
                else {
                    this.setEnable(true);
                }
                break;
            case 290:
                var rptArray = [292, 294, 296, 298]; //clearing orgddl
                if (rptFieldId.FieldValue != -1) {
                    fieldObj.push({ ReportFieldId: 289, Value: "2" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpaceOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 292);
                    });
                }
                else {
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 292:
                var rptArray = [294, 296, 298]; //clearing orgddl            
                if (rptFieldId.FieldValue != -1) {
                    fieldObj.push({ ReportFieldId: 289, Value: "3" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpaceOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 294);
                    });
                }
                else
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                break;
            case 294:
                var rptArray = [296, 298]; //clearing orgddl             
                if (rptFieldId.FieldValue != -1) {
                    fieldObj.push({ ReportFieldId: 289, Value: "4" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpaceOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 296);
                    });
                }
                else
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                break;
            case 296:
                var rptArray = [298];
                if (rptFieldId.FieldValue != -1) {
                    fieldObj.push({ ReportFieldId: 289, Value: "5" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpaceOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 298);
                    });
                }
                else
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                break;
        }
    };
    SpaceAddEditComponent.prototype.setRelatedOrgUnitddlValue = function (context, rptArray) {
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
    SpaceAddEditComponent.prototype.resetrealetedOrgLevellookup = function (context, rptArray, resultData, rsetddlRptFieldId) {
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
    SpaceAddEditComponent.prototype.setEnable = function (isEnable) {
        var fieldObjLen = this.fieldDetailsAdd.length;
        for (var i = 0; i < fieldObjLen; i++) {
            var rptFieldId = this.fieldDetailsAdd[i].ReportFieldId;
            //org unit and cost category disabling,spacecategory==4--isenable variableis true.
            if (this.sessionUserRoleId == 7 && isEnable == true) {
                if ((rptFieldId >= 290 && rptFieldId <= 298) || (rptFieldId == 779)) {
                    if ((rptFieldId == 290) || (rptFieldId == 779)) {
                        this.fieldDetailsAdd[i].IsEnabled = false;
                        this.fieldDetailsAdd[i].ReadOnlyMode = true;
                    }
                    else {
                        this.fieldDetailsAdd[i].IsEnabled = isEnable;
                        this.fieldDetailsAdd[i].ReadOnlyMode = !isEnable;
                    }
                }
            }
            else {
                if ((rptFieldId >= 290 && rptFieldId <= 298) || (rptFieldId == 779)) {
                    if (rptFieldId == 290 && isEnable == false) {
                        this.strPopupText = "";
                        this.fieldDetailsAdd[i].LookupDetails.PopupComponent = null;
                    }
                    else if (rptFieldId == 290 && isEnable == true) {
                        this.strPopupText = this.intpoptext;
                        this.fieldDetailsAdd[i].LookupDetails.PopupComponent = { Name: this.intpoptext, showImage: false };
                    }
                    this.fieldDetailsAdd[i].IsEnabled = isEnable;
                    this.fieldDetailsAdd[i].ReadOnlyMode = !isEnable;
                }
            }
        }
    };
    SpaceAddEditComponent.prototype.onsubmitSuccessSpaceShare = function (value) {
        var contextObj = this;
        var isSharing = true;
        if (value.update == true) {
            var newfieldDetailsAdd;
            contextObj.spaceService.loadSpaceAddEdit(contextObj.selectedId, 2).subscribe(function (result) {
                //contextObj.fieldDetailsAdd = result["Data"];
                for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++) {
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 5049) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 5049) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (contextObj.fieldDetailsAdd[i].FieldValue == "False") {
                                    isSharing = false;
                                }
                                else {
                                    isSharing = true;
                                }
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 290) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 290) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == false) {
                                    contextObj.strPopupText = "Share Space";
                                    contextObj.intpoptext = contextObj.strPopupText;
                                }
                                else {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                    contextObj.fieldDetailsAdd[i].FieldLabel = contextObj.fieldDetailsAdd[i].FieldLabel + ": Shared";
                                    contextObj.strPopupText = "View";
                                    contextObj.intpoptext = contextObj.strPopupText;
                                }
                                contextObj.fieldDetailsAdd[i].LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 292) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 292) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == true) {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                }
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 294) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 294) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == true) {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                }
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 296) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 296) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == true) {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                }
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 298) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 298) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == true) {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                }
                                return true;
                            }
                        });
                    }
                }
                contextObj.fieldDetailsAdd = contextObj.fieldDetailsAdd;
                contextObj.submitSuccess.emit({ returnData: [], shareSubmit: true, id: contextObj.selectedId });
                //newfieldDetailsAdd = contextObj.fieldDetailsAdd.filter(function (item) {
                //    if (item.ReportFieldId >= 290 && item.ReportFieldId <= 298 || item.ReportFieldId == 5049) {
                //        result["Data"].find(function (item2) {
                //            if (item.ReportFieldId == item2.ReportFieldId) {
                //                item = item2;
                //                return true;
                //            }
                //        });
                //    }
                //    return true;
                //});
                //contextObj.fieldDetailsAdd = newfieldDetailsAdd;
            });
        }
        this.splitviewInput1.showSecondaryView = !this.splitviewInput1.showSecondaryView;
        this.Target = 0;
    };
    SpaceAddEditComponent.prototype.popupItemEmit = function (event) {
        this.spacesharingadd = event["reportfieldId"];
        this.pageTitle = "Space Sharing by " + this.levelname;
        this.splitviewInput1.showSecondaryView = !this.splitviewInput1.showSecondaryView;
        this.Target = 1;
        var context = this;
        context.fieldDetailsAdd.filter(function (item) {
            if (item.FieldLabel == "Gross Area") {
                context.selectedgrossArea = item.FieldValue;
                return true;
            }
        });
    };
    SpaceAddEditComponent.prototype.closeSlideDialog = function (event) {
        this.showSlide = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SpaceAddEditComponent.prototype, "submitSuccess", void 0);
    SpaceAddEditComponent = __decorate([
        core_1.Component({
            selector: 'spacedata-addedit',
            templateUrl: 'app/Views/Space/Space Data/spacedata-addedit.html',
            providers: [notify_service_1.NotificationService, space_service_1.SpaceService, administration_service_1.AdministrationService],
            directives: [fieldGeneration_component_1.FieldComponent, spacesharing_list_1.spacesharing, slide_component_1.SlideComponent, split_view_component_1.SplitViewComponent],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'seledrwgids', 'sessionUserRoleId', 'strPopupText', 'moduleId']
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, space_service_1.SpaceService, administration_service_1.AdministrationService])
    ], SpaceAddEditComponent);
    return SpaceAddEditComponent;
}());
exports.SpaceAddEditComponent = SpaceAddEditComponent;
//# sourceMappingURL=spacedata-addedit.component.js.map
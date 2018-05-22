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
var objects_service_1 = require('../../../Models/Objects/objects.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var ObjectDataAddEditComponent = (function () {
    function ObjectDataAddEditComponent(objectService, notificationService) {
        this.objectService = objectService;
        this.notificationService = notificationService;
        this.dataKey = "Id";
        this.Issubscribed = false;
        this.submitSuccess = new core_1.EventEmitter();
        this.IsBarcodeSubscribed = false;
        this.IsAutoNumbering = false;
        this.IsClassPrefix = false;
        this.isSiteAdmin = false;
    }
    ObjectDataAddEditComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.fieldDetailsAdd.find(function (item) {
            switch (item.ReportFieldId) {
                case 4303:
                    contextObj.prevBarcode = item.FieldValue;
                    break;
                case 7411:
                    if (contextObj.SiteId != undefined && contextObj.SiteId != null) {
                        item.FieldValue = contextObj.SiteId;
                        item.IsEnabled = false;
                    }
            }
            return item.ReportFieldId === 4303;
        });
        if (this.blockRefHandle == undefined || this.blockRefHandle == null)
            this.blockRefHandle = '';
        if (this.selectedSpaceId == undefined || this.selectedSpaceId == null || this.selectedSpaceId == "0")
            this.selectedSpaceId = '';
        if (this.xPosition == undefined || this.xPosition == null)
            this.selectedSpaceId = '';
        if (this.yPosition == undefined || this.yPosition == null)
            this.selectedSpaceId = '';
        if (this.objectAngle == undefined || this.objectAngle == null)
            this.selectedSpaceId = '';
        if (this.drawingIds == undefined || this.drawingIds == null)
            this.drawingIds = '';
        var featureid = "105";
        switch (contextObj.ObjectCategoryId) {
            case 1:
                featureid = "105,72,62";
                this.objectname = "Asset";
                this.objectmultiplename = "Assets";
                this.objectclassname = "Asset Class";
                break;
            case 2:
                featureid = "107,73,68";
                this.objectname = "Furniture";
                this.objectmultiplename = "Furniture";
                this.objectclassname = "Furniture Class";
                break;
            case 3:
                featureid = "109,71,65";
                this.objectname = "Object";
                this.objectmultiplename = "Objects";
                this.objectclassname = "Object Class";
                break;
            case 8:
                featureid = "113,92,89";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectclassname = "Component Type";
                break;
            case 9:
                featureid = "115,100,97";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectclassname = "Component Type";
                break;
            case 10:
                featureid = "229,130,127";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectclassname = "Component Type";
                break;
            case 11:
                featureid = "131,140,137";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectclassname = "Component Type";
                break;
            case 12:
                featureid = "141,150,147";
                this.objectname = "Component";
                this.objectmultiplename = "Components";
                this.objectclassname = "Component Type";
                break;
            case 20:
                featureid = "151,228,225";
                this.objectname = "Equipment";
                this.objectmultiplename = "Equipment";
                this.objectclassname = "Equipment Type";
                break;
        }
        featureid = featureid + ",189";
        contextObj.objectService.getCustomerSubscribedFeaturesBarcode(featureid).subscribe(function (rt) {
            rt["Data"].find(function (item) {
                switch (item.Id) {
                    case 71:
                    case 72:
                    case 73:
                    case 92:
                    case 100:
                    case 130:
                    case 140:
                    case 150:
                    case 228:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsAutoNumbering = true;
                        }
                        break;
                    case 105:
                    case 107:
                    case 109:
                    case 113:
                    case 115:
                    case 229:
                    case 131:
                    case 141:
                    case 151:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsBarcodeSubscribed = true;
                        }
                        break;
                    case 62:
                    case 65:
                    case 68:
                    case 89:
                    case 97:
                    case 127:
                    case 137:
                    case 147:
                    case 163:
                    case 225:
                    case 167:
                        if (item["IsSubscribed"] == true) {
                            contextObj.IsClassPrefix = true;
                        }
                        break;
                    case 189:
                        if (item["IsSubscribed"] == true) {
                            contextObj.isSiteAdmin = true;
                        }
                        break;
                }
                //if (rt.Data[0]["IsSubscribed"] == true && rt.Data[0]["Id"] == 72) {
                //    contextObj.IsAutoNumbering = true;
                //}
            });
            if (contextObj.IsAutoNumbering == false && contextObj.IsClassPrefix) {
                var fieldValue = contextObj.fieldDetailsAdd.find(function (el) { return el.ReportFieldId == 651 && el.FieldId == 1985; })['FieldValue'];
                if (fieldValue != null) {
                    var lengthToTrimPrefix = fieldValue.length + 1;
                    var index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 661 && el.FieldId == 2024; });
                    contextObj.fieldDetailsAdd[index].FieldValue = contextObj.fieldDetailsAdd[index].FieldValue.substring(lengthToTrimPrefix);
                }
            }
        });
        if (contextObj.target == "2" && contextObj.action == "add") {
            var index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 657; }); /*class*/
            if (contextObj.fieldDetailsAdd[index].FieldValue != null && contextObj.fieldDetailsAdd[index].FieldValue != "" && contextObj.fieldDetailsAdd[index].IsEnabled == false) {
                contextObj.onclasschange("", contextObj.target);
            }
        }
    };
    ObjectDataAddEditComponent.prototype.onSubmitData = function (event, Pagetarget) {
        switch (this.action) {
            case "add":
                this.postSubmit(event["fieldobject"], "add", Pagetarget);
                break;
            case "edit":
                this.postSubmit(event["fieldobject"], "edit", Pagetarget);
                break;
        }
    };
    ObjectDataAddEditComponent.prototype.postSubmit = function (strsubmitField, target, pageTarget) {
        var contextObj = this;
        this.selectedIddetails;
        var classid;
        var assetno;
        var assetnowithprefix;
        var statusid = "0";
        switch (contextObj.ObjectCategoryId) {
            case 2:
                statusid = "14";
                break;
            default:
                statusid = "10";
                break;
        }
        if (pageTarget == "2") {
            statusid = "9";
        }
        else if (target == "edit") {
            if (this.selectedIddetails["rowData"].Status == "Assigned")
                statusid = "9";
        }
        var temparr = JSON.parse(strsubmitField);
        var barcode;
        var count = 0;
        temparr.find(function (item) {
            if (item.ReportFieldId == 4303) {
                barcode = item.Value;
                count++;
            }
            else if (item.ReportFieldId == 657) {
                classid = item.Value;
                count++;
            }
            else if (item.ReportFieldId == 651) {
                if (item.FieldId == 1985)
                    assetno = item.Value;
                count++;
            }
            if (count == 3)
                return true;
        });
        var arr = new Array();
        arr = JSON.parse(strsubmitField);
        assetnowithprefix = arr[3].Value + "-" + arr[4].Value;
        arr.push({ ReportFieldId: 658, Value: contextObj.ObjectCategoryId.toString() });
        //if (contextObj.IsAutoNumbering == true)
        //    arr.push({ ReportFieldId: 661, Value: "" }); //tagnumber and asset number are same
        arr.push({ ReportFieldId: 662, Value: "" });
        arr.push({ ReportFieldId: 663, Value: "" });
        arr.push({ ReportFieldId: 664, Value: "" });
        arr.push({ ReportFieldId: 659, Value: statusid });
        arr.push({ ReportFieldId: 665, Value: contextObj.selectedSpaceId }); //spaceId
        arr.push({ ReportFieldId: 666, Value: contextObj.xPosition }); //xpos
        arr.push({ ReportFieldId: 667, Value: contextObj.yPosition }); //ypos
        arr.push({ ReportFieldId: 668, Value: contextObj.objectAngle }); //angle
        arr.push({ ReportFieldId: 669, Value: contextObj.drawingIds }); //drawingId
        arr.push({ ReportFieldId: 2615, Value: contextObj.blockRefHandle });
        arr.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() }); //Module
        if (contextObj.IsAutoNumbering != true) {
            if (contextObj.IsClassPrefix == true) {
                //arr[4].Value = arr[4].Value - arr[3].Value;
                var sub = arr[4].Value.substring(0, arr[3].Value.length + 1);
                if (sub == arr[3].Value + '-') {
                    arr[4].Value = arr[4].Value.slice(sub.length, arr[4].Value.length);
                }
            }
        }
        contextObj.objectService.checkBarcodeExists(barcode).subscribe(function (result) {
            if (result["Data"] == 1 && contextObj.prevBarcode != barcode) {
                contextObj.notificationService.ShowToaster("Barcode already exists", 2);
            }
            else {
                contextObj.objectService.submitAddUpdateObjects(JSON.stringify(arr), contextObj.selectedId, target, contextObj.ObjectCategoryId, contextObj.dataOption, contextObj.attributeoption, classid, contextObj.drawingIds, '', 0, 0, 1, 1, false).subscribe(function (resultData) {
                    switch (resultData["Data"].StatusId) {
                        case 0:
                            contextObj.notificationService.ShowToaster(contextObj.objectname + " " + assetnowithprefix + " already exists", 2);
                            break;
                        case 1:
                            if (target == "add") {
                                var resultdata = JSON.parse(resultData["Data"].Data);
                                contextObj.notificationService.ShowToaster(resultdata[0][contextObj.objectclassname] + " " + resultdata[0][contextObj.objectname + " No."] + " added", 3);
                            }
                            else {
                                contextObj.notificationService.ShowToaster(contextObj.objectname + " data updated", 3);
                            }
                            contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                            break;
                    }
                });
            }
        });
    };
    ObjectDataAddEditComponent.prototype.onclasschange = function (event, pageTarget) {
        var contextObj = this;
        var fieldid;
        var ClassId;
        var FieldLabel;
        var classListOption = 1;
        if (pageTarget == "2")
            classListOption = 3;
        if (event == "") {
            var index = contextObj.fieldDetailsAdd.findIndex(function (el) { return el.ReportFieldId == 657; }); /*class*/
            fieldid = contextObj.fieldDetailsAdd[index].FieldId;
            ClassId = contextObj.fieldDetailsAdd[index].FieldValue;
            FieldLabel = contextObj.fieldDetailsAdd[index].FieldLabel;
            classListOption = 1;
        }
        else {
            fieldid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
            ClassId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
            FieldLabel = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldLabel"];
        }
        var Tagno;
        var siteFieldValue;
        if (fieldid == 1419) {
            this.objectService.getObjectClassSelectionLookups(this.ObjectCategoryId, '', 1, classListOption, 0).subscribe(function (resultData) {
                contextObj.tempdataforlist = JSON.parse(resultData.Data["FieldBinderData"]);
                contextObj.objectService.getObjectDataAddEditFieldsListforclass(contextObj.ObjectCategoryId, parseInt(ClassId), "add").subscribe(function (resultData) {
                    //if (SiteId == "2") {
                    //    siteFieldValue = contextObj.fieldDetailsAdd.find(function (el) { return el.ReportFieldId == 7411 }).FieldValue;
                    //}
                    contextObj.fieldDetailsAdd = resultData["Data"];
                    var count = 0;
                    var withPrefix = false;
                    var withoutPrefix = false;
                    contextObj.fieldDetailsAdd.find(function (item) {
                        switch (item.ReportFieldId) {
                            case 4303:
                                if (contextObj.IsBarcodeSubscribed == true) {
                                    item.IsVisible = true;
                                }
                                else if (contextObj.IsBarcodeSubscribed == false) {
                                    item.IsVisible = false;
                                }
                                count++;
                                break;
                            case 651:
                                if (item.FieldId == 1985) {
                                    if (contextObj.IsAutoNumbering == false) {
                                        item.IsVisible = true;
                                        withoutPrefix = true;
                                        if (withPrefix == true)
                                            item.FieldValue = "";
                                    }
                                    else {
                                        item.IsVisible = false;
                                    }
                                }
                                if (item.FieldId == 1605) {
                                    if (contextObj.IsAutoNumbering == false) {
                                        withPrefix = true;
                                        item.IsVisible = false;
                                        if (withoutPrefix == true)
                                            item.FieldValue = "";
                                    }
                                    else {
                                        if (contextObj.action == "add")
                                            item.IsVisible = false;
                                        else {
                                            item.IsVisible = true;
                                        }
                                    }
                                    Tagno = item.FieldLabel;
                                    var tagNoItem = contextObj.fieldDetailsAdd.find(function (item) { return item.ReportFieldId === 661; });
                                    if (tagNoItem != undefined) {
                                        if (contextObj.IsAutoNumbering == true)
                                            tagNoItem.IsVisible = false;
                                        else
                                            tagNoItem.IsMandatory = true;
                                        tagNoItem.FieldLabel = Tagno;
                                    }
                                }
                                count++;
                                break;
                            case 657:
                                item["LookupDetails"]["LookupValues"] = contextObj.tempdataforlist; //asset class
                                item.FieldValue = ClassId; // event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];//assetclass
                                item.FieldLabel = FieldLabel;
                                item.HasValidationError = false;
                                break;
                            case 7411:
                                if (contextObj.SiteId != undefined && contextObj.SiteId != null) {
                                    item.FieldValue = contextObj.SiteId;
                                    item.IsEnabled = false;
                                }
                                item.IsMandatory = true;
                                break;
                        }
                        if (count == 4) {
                            return true;
                        }
                        else
                            return false;
                    });
                    // contextObj.fieldDetailsAdd[1].IsVisible = false;            
                });
            });
            this.objectService.getObjectClassPrefix(0, ClassId).subscribe(function (resultData) {
                var item = contextObj.fieldDetailsAdd.find(function (el) { return el.FieldId == 1985; });
                var currentPrefix = item['Prefix'];
                item.FieldValue = JSON.parse(resultData["FieldBinderData"])[0].NoPrefix;
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ObjectDataAddEditComponent.prototype, "attributeoption", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ObjectDataAddEditComponent.prototype, "blockRefHandle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ObjectDataAddEditComponent.prototype, "selectedSpaceId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ObjectDataAddEditComponent.prototype, "xPosition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ObjectDataAddEditComponent.prototype, "yPosition", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ObjectDataAddEditComponent.prototype, "objectAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ObjectDataAddEditComponent.prototype, "action", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ObjectDataAddEditComponent.prototype, "fieldDetailsAdd", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ObjectDataAddEditComponent.prototype, "moduleId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ObjectDataAddEditComponent.prototype, "submitSuccess", void 0);
    ObjectDataAddEditComponent = __decorate([
        core_1.Component({
            selector: 'objectData-addedit',
            templateUrl: 'app/Views/Objects/Data/objectData-addedit.component.html',
            providers: [objects_service_1.ObjectsService, notify_service_1.NotificationService],
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification],
            inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'ObjectCategoryId', 'objectCategoryName', 'dataOption', 'drawingIds', 'selectedIddetails', 'target', 'IsBarcodeSubscribed', 'SiteId', 'moduleId'],
        }), 
        __metadata('design:paramtypes', [objects_service_1.ObjectsService, notify_service_1.NotificationService])
    ], ObjectDataAddEditComponent);
    return ObjectDataAddEditComponent;
}());
exports.ObjectDataAddEditComponent = ObjectDataAddEditComponent;
//# sourceMappingURL=objectData-addedit.component.js.map
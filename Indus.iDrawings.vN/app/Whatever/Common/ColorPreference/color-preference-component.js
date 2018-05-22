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
var common_service_1 = require('../../../Models/Common/common.service');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var General_1 = require('../../../Models/Common/General');
var labelcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields//labelcomponent.component');
var colorpickercomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/colorpickercomponent.component');
var hatchpattern_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/hatchpattern.component');
var space_service_1 = require('../../../Models/Space/space.service');
var ColorPreferenceComponent = (function () {
    function ColorPreferenceComponent(commonService, notificationService, generFun, spaceService, elemRef) {
        this.commonService = commonService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.spaceService = spaceService;
        this.elemRef = elemRef;
        this.target = 1;
        this.isnotfocus = true;
        this.isUpadte = true;
        this.isrepetition = true;
        this.iscolorchange = true;
        this.oldColorPickerValue = "";
        this.disableButton = true;
        this.arrColorArray = new Array();
        this.isSharedSpaceColor = false;
        this.Position = "bottom-right";
        this.width = 300;
        this.showSlide = false;
        this.objectModules = [6, 7, 8, 17, 18, 27, 24, 25, 26];
        this.el = elemRef;
    }
    ColorPreferenceComponent.prototype.ngOnInit = function () {
        debugger;
        var contextObj = this;
        this.DataKey = "Item";
        this.isMySettings = true;
        this.DatakeyValues = [];
        if (contextObj.objectCategoryId == undefined) {
            contextObj.loadFieldAndData();
        }
        else if (contextObj.objectCategoryId != undefined) {
            contextObj.loadFieldAndDataForObject();
        }
    };
    ColorPreferenceComponent.prototype.checkObjectModule = function () {
        if (this.objectModules.includes(parseInt(this.moduleId)) && this.fieldObject) {
            this.fieldObject = this.fieldObject.filter(function (item) {
                return (item.FieldId != 2601 && item.ReportFieldId != 712);
            });
        }
    };
    ColorPreferenceComponent.prototype.loadFieldAndData = function () {
        var contextObj = this;
        contextObj.commonService.getColorPreferenceFields("509").subscribe(function (resultData) {
            debugger;
            contextObj.fieldObject = resultData["Data"];
            contextObj.checkObjectModule();
            contextObj.fieldObjectRef = resultData["Data"];
            contextObj.commonService.getColorPreferenceData("509", contextObj.moduleId, contextObj.isMySettings).subscribe(function (resultData) {
                contextObj.itemSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            });
        });
    };
    ColorPreferenceComponent.prototype.loadFieldAndDataForObject = function () {
        var rptField = [];
        var contextObj = this;
        contextObj.commonService.getColorPreferenceFields("509").subscribe(function (resultData) {
            debugger;
            contextObj.fieldObject = resultData["Data"];
            contextObj.checkObjectModule();
            contextObj.fieldObjectRef = resultData["Data"];
            rptField.push({ ReportFieldId: 2620, Value: contextObj.objectCategoryId });
            contextObj.commonService.getColorPreferenceDataForObjects("509", contextObj.moduleId, JSON.stringify(rptField), contextObj.isMySettings).subscribe(function (resultData) {
                contextObj.itemSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            });
        });
    };
    ColorPreferenceComponent.prototype.ngAfterViewInit = function () {
    };
    ColorPreferenceComponent.prototype.ngOnChanges = function (changes) {
        if (this.fieldObject != undefined && this.fieldObject != null && this.fieldObject != "") {
            this.updateFieldObjects = [];
            this.disableButton = this.disableButton;
            this.fieldObject = this.fieldObject;
            this.itemSource = this.itemSource;
            if (this.itemSource != undefined)
                this.itemSource = this.itemSource.filter(function (el) {
                    if (el.Color == null) {
                        el.Color = 10;
                    }
                    return true;
                });
            this.fieldObjectRef = JSON.parse(JSON.stringify(this.fieldObject));
        }
    };
    ColorPreferenceComponent.prototype.widthOfHeader = function (value) {
        if (value.IsEnabled == true)
            return 200;
        else
            return 0;
    };
    ColorPreferenceComponent.prototype.displayOfHeader = function (value) {
        if (value.IsEnabled == true)
            return "";
        else
            return "none";
    };
    ColorPreferenceComponent.prototype.updateField = function (fldObj, Value) {
        fldObj.FieldValue = Value[fldObj.FieldLabel.trim()];
        fldObj.IsMandatory = false;
        if (this.isnotfocus) {
            var colorNodeclass = this.el.nativeElement.getElementsByClassName("colorPickerClass");
            if (colorNodeclass && colorNodeclass.length > 0) {
                colorNodeclass[0].focus();
                this.isnotfocus = false;
            }
        }
        return fldObj;
    };
    ColorPreferenceComponent.prototype.onChangeInput = function (e, value, fieldName) {
        var contextObj = this;
        var Id = value[this.DataKey];
        if (this.DatakeyValues == undefined) {
            this.DatakeyValues = [];
            this.DatakeyValues.push(value[this.DataKey]);
        }
        else {
            if (this.DatakeyValues.includes(Id) != true)
                this.DatakeyValues.push(value[this.DataKey]);
        }
        for (var i = 0; i < this.itemSource.length; i++) {
            if (this.itemSource[i][this.DataKey] == Id) {
                this.itemSource[i][fieldName] = (e.RGBValue).replace('#', '');
            }
        }
        this.itemSource = this.itemSource;
        var tempArray = this.itemSource;
        ;
        tempArray = tempArray.filter(function (el) {
            if (el.Color != null) {
                this.arrColorArray = contextObj.getColorDataArray();
                this.arrColorArray.find(function (colorevent) {
                    if (colorevent.AutocadColorId == el.Color) {
                        el.Color = colorevent.RGB;
                    }
                });
                return true;
            }
            else {
                el.Color = "FF0000";
                return true;
            }
        });
        var tempColor = (e.RGBValue).replace('#', '');
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].Color == tempColor && tempArray[i].Item != value.Item) {
                // this.notificationService.ShowToaster("Selected Color is already assigned to " + tempArray[i].Item, 5);
                this.notificationService.ShowToaster("Selected Color is already assigned", 5);
                this.isUpadte = false;
                break;
            }
            else
                this.isUpadte = true;
        }
    };
    ColorPreferenceComponent.prototype.update = function (event) {
        debugger;
        var context = this;
        this.updateFieldObjects = this.itemSource.filter(function (el) {
            if (el.Color != null) {
                this.arrColorArray = context.getColorDataArray();
                this.arrColorArray.find(function (e) {
                    if (e.AutocadColorId == el.Color) {
                        el.Color = e.RGB;
                    }
                });
                return true;
            }
            else {
                el.Color = "FF0000";
                return true;
            }
        });
        /*Check Duplicate*/
        for (var i = 0; i < this.updateFieldObjects.length; i++) {
            for (var j = i + 1; j < this.updateFieldObjects.length; j++) {
                if (this.updateFieldObjects[i].Color == this.updateFieldObjects[j].Color) {
                    this.notificationService.ShowToaster("Same color assigned for multiple items. Color Preferences cannot be updated", 5);
                    return;
                }
            }
        }
        /**/
        var newField = this.fieldObjectRef;
        var fieldObjectArray = [];
        for (var i = 0; i < this.updateFieldObjects.length; i++) {
            for (var j = 0; j < this.fieldObject.length; j++) {
                newField[j].FieldValue = this.updateFieldObjects[i][this.fieldObject[j].FieldLabel];
            }
            fieldObjectArray.push(JSON.parse(JSON.stringify(newField)));
        }
        this.output = this.getMultipleFieldValuesAsReportFieldArray(fieldObjectArray, this.DataKey);
        if (context.moduleId == "3" || context.moduleId == "5") {
            context.commonService.updateColorPreferenceData("509", this.moduleId, this.output, true).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    context.spaceService.getUserPrivilegesofPage(context.pageId, context.Previlages).subscribe(function (resultData) {
                        if (resultData["Data"] == 1) {
                            context.width = 300;
                            context.showSlide = !context.showSlide;
                        }
                        else {
                            context.notificationService.ShowToaster("Color Settings updated", 3);
                        }
                    });
                }
                else {
                    context.notificationService.ShowToaster("Update Failed", 5);
                }
            });
        }
        else if (context.objectModules.includes(parseInt(context.moduleId))) {
            var context = this;
            context.output = JSON.parse(context.output);
            context.output.push({ ReportFieldId: 2620, Value: Number(context.objectCategoryId) });
            context.output = JSON.stringify(context.output);
            context.commonService.updateColorPreferenceDataForObjects("509", context.moduleId, context.output, true).subscribe(function (resultData) {
                debugger;
                if (resultData["Data"].Message == "Success") {
                    context.spaceService.getUserPrivilegesofPage(context.pageId, context.Previlages).subscribe(function (resultData) {
                        if (resultData["Data"] == 1) {
                            context.width = 300;
                            context.showSlide = !this.showSlide;
                        }
                        else {
                            context.notificationService.ShowToaster("Color Settings updated", 3);
                        }
                    });
                }
                else {
                    context.notificationService.ShowToaster("Update Failed", 5);
                }
            });
        }
        this.DatakeyValues = [];
    };
    ColorPreferenceComponent.prototype.getMultipleFieldValuesAsReportFieldArray = function (fieldObject, DataKey) {
        var context = this;
        var arrayList = new Array();
        var tempSourceWithColorId = this.itemSource.filter(function (el) {
            if (el.Color != null) {
                this.arrColorArray = context.getColorDataArray();
                this.arrColorArray.find(function (e) {
                    if (e.RGB == el.Color) {
                        el.Color = e.AutocadColorId;
                    }
                });
                return true;
            }
            else {
                el.Color = 10;
                return true;
            }
        });
        for (var i = 0; i < tempSourceWithColorId.length; i++) {
            if (context.objectModules.includes(parseInt(context.moduleId))) {
                if (tempSourceWithColorId[i].Item.trim() == "Blink") {
                    arrayList.push({
                        ReportFieldId: 2624,
                        Value: tempSourceWithColorId[i].Color
                    });
                }
                if (tempSourceWithColorId[i].Item.trim() == "Legend Text") {
                    arrayList.push({
                        ReportFieldId: 2622,
                        Value: tempSourceWithColorId[i].Color
                    });
                }
                if (tempSourceWithColorId[i].Item.trim() == "Object Selection") {
                    arrayList.push({
                        ReportFieldId: 2623,
                        Value: tempSourceWithColorId[i].Color
                    });
                }
            }
            if (parseInt(this.moduleId) == 5) {
                if (tempSourceWithColorId[i].Item.trim() == "Unoccupied Spaces") {
                    arrayList.push({
                        ReportFieldId: 822,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 823,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 824,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 825,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                if (tempSourceWithColorId[i].Item.trim() == "Under Occupied Spaces") {
                    arrayList.push({
                        ReportFieldId: 826,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 827,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 828,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 829,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                else if (tempSourceWithColorId[i].Item.trim() == "Over Occupied Spaces") {
                    arrayList.push({
                        ReportFieldId: 830,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 831,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 832,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 833,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                else if (tempSourceWithColorId[i].Item.trim() == "Occupied Spaces") {
                    arrayList.push({
                        ReportFieldId: 834,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 835,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 836,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 837,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                else if (tempSourceWithColorId[i].Item.trim() == "Nominaly Occupied Spaces") {
                    arrayList.push({
                        ReportFieldId: 838,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 839,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 840,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 841,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                else if (tempSourceWithColorId[i].Item.trim() == "Space With No Seating Capacity") {
                    arrayList.push({
                        ReportFieldId: 842,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 843,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 844,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 845,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
            }
            if (parseInt(this.moduleId) == 3) {
                //space module
                if (tempSourceWithColorId[i].Item == "Building Common Areas") {
                    arrayList.push({
                        ReportFieldId: 723,
                        Value: tempSourceWithColorId[i].Color
                    }); //color
                    arrayList.push({
                        ReportFieldId: 724,
                        Value: tempSourceWithColorId[i].Pattern
                    }); //pattern
                    arrayList.push({
                        ReportFieldId: 725,
                        Value: tempSourceWithColorId[i].HatchAngle
                    }); //angle
                    arrayList.push({
                        ReportFieldId: 726,
                        Value: tempSourceWithColorId[i].HatchScale
                    }); //scale
                }
                else if (tempSourceWithColorId[i].Item == "Floor Common Areas" || tempSourceWithColorId[i].Item == "Floor Common Areas ") {
                    arrayList.push({
                        ReportFieldId: 727,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 728,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 729,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 730,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                else if (tempSourceWithColorId[i].Item == "Leader Line Color") {
                    arrayList.push({
                        ReportFieldId: 5043,
                        Value: tempSourceWithColorId[i].Color
                    });
                }
                else if (tempSourceWithColorId[i].Item == "Measure Distance Color") {
                    arrayList.push({
                        ReportFieldId: 5044,
                        Value: tempSourceWithColorId[i].Color
                    });
                }
                else if (tempSourceWithColorId[i].Item == "Search Result") {
                    arrayList.push({
                        ReportFieldId: 711,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 712,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 713,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 714,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                else if (tempSourceWithColorId[i].Item == "Shared Space Color") {
                    this.isSharedSpaceColor = true;
                    arrayList.push({
                        ReportFieldId: 5045,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 5046,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 5047,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 5048,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                else if (tempSourceWithColorId[i].Item == "Space Blink Color") {
                    arrayList.push({
                        ReportFieldId: 700,
                        Value: tempSourceWithColorId[i].Color
                    });
                }
                else if (tempSourceWithColorId[i].Item == "Space Selection") {
                    arrayList.push({
                        ReportFieldId: 703,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 704,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 705,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 706,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
                else if (tempSourceWithColorId[i].Item == "Space Text Color") {
                    arrayList.push({
                        ReportFieldId: 699,
                        Value: tempSourceWithColorId[i].Color
                    });
                }
                else if (tempSourceWithColorId[i].Item == "Vertical Spaces") {
                    arrayList.push({
                        ReportFieldId: 719,
                        Value: tempSourceWithColorId[i].Color
                    });
                    arrayList.push({
                        ReportFieldId: 720,
                        Value: tempSourceWithColorId[i].Pattern
                    });
                    arrayList.push({
                        ReportFieldId: 721,
                        Value: tempSourceWithColorId[i].HatchAngle
                    });
                    arrayList.push({
                        ReportFieldId: 722,
                        Value: tempSourceWithColorId[i].HatchScale
                    });
                }
            }
        }
        //if (this.isSharedSpaceColor == false && (Number(this.moduleId) == 3)) {  //for space module
        //    arrayList.push({
        //        ReportFieldId: 5045,
        //        Value: 10
        //    });
        //    arrayList.push({
        //        ReportFieldId: 5046,
        //        Value: tempSourceWithColorId[i].Pattern
        //    });
        //    arrayList.push({
        //        ReportFieldId: 5047,
        //        Value: tempSourceWithColorId[i].HatchAngle
        //    });
        //    arrayList.push({
        //        ReportFieldId: 5048,
        //        Value: tempSourceWithColorId[i].HatchScale
        //    });
        //}
        if (Number(this.moduleId) == 3) {
            // Drawing Background color not needed
            arrayList.push({
                ReportFieldId: 701,
                Value: 250
            }); //color
            arrayList.push({
                ReportFieldId: 702,
                Value: 0
            }); //colorcode
        }
        return (JSON.stringify(arrayList));
    };
    ColorPreferenceComponent.prototype.getColorDataArray = function () {
        var contextObj = this;
        contextObj.arrColorArray.push({ AccessColorId: 255, AutocadColorId: 10, ColorId: 1, RGB: "FF0000", BackGroundColor: "#FF0000" });
        contextObj.arrColorArray.push({ AccessColorId: 16383, AutocadColorId: 20, ColorId: 105, RGB: "FF3F00", BackGroundColor: "#FF3F00" });
        contextObj.arrColorArray.push({ AccessColorId: 32767, AutocadColorId: 30, ColorId: 18, RGB: "FF7F00", BackGroundColor: "#FF7F00" });
        contextObj.arrColorArray.push({ AccessColorId: 49151, AutocadColorId: 40, ColorId: 21, RGB: "FFBF00", BackGroundColor: "#FFBF00" });
        contextObj.arrColorArray.push({ AccessColorId: 65535, AutocadColorId: 50, ColorId: 24, RGB: "FFFF00", BackGroundColor: "#FFFF00" });
        contextObj.arrColorArray.push({ AccessColorId: 65471, AutocadColorId: 60, ColorId: 128, RGB: "BFFF00", BackGroundColor: "#BFFF00" });
        contextObj.arrColorArray.push({ AccessColorId: 65407, AutocadColorId: 70, ColorId: 30, RGB: "7FFF00", BackGroundColor: "#7FFF00" });
        contextObj.arrColorArray.push({ AccessColorId: 65343, AutocadColorId: 80, ColorId: 142, RGB: "3FFF00", BackGroundColor: "#3FFF00" });
        contextObj.arrColorArray.push({ AccessColorId: 65280, AutocadColorId: 90, ColorId: 151, RGB: "00FF00", BackGroundColor: "#00FF00" });
        contextObj.arrColorArray.push({ AccessColorId: 4194048, AutocadColorId: 100, ColorId: 158, RGB: "00FF3F", BackGroundColor: "#00FF3F" });
        contextObj.arrColorArray.push({ AccessColorId: 8388352, AutocadColorId: 110, ColorId: 165, RGB: "00FF7F", BackGroundColor: "#00FF7F" });
        contextObj.arrColorArray.push({ AccessColorId: 12582656, AutocadColorId: 120, ColorId: 45, RGB: "00FFBF", BackGroundColor: "#00FFBF" });
        contextObj.arrColorArray.push({ AccessColorId: 16776960, AutocadColorId: 130, ColorId: 179, RGB: "00FFFF", BackGroundColor: "#00FFFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16760576, AutocadColorId: 140, ColorId: 51, RGB: "00BFFF", BackGroundColor: "#00BFFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16744192, AutocadColorId: 150, ColorId: 55, RGB: "007FFF", BackGroundColor: "#007FFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16727808, AutocadColorId: 160, ColorId: 59, RGB: "003FFF", BackGroundColor: "#003FFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16711680, AutocadColorId: 170, ColorId: 65, RGB: "0000FF", BackGroundColor: "#0000FF" });
        contextObj.arrColorArray.push({ AccessColorId: 16711743, AutocadColorId: 180, ColorId: 206, RGB: "3F00FF", BackGroundColor: "#3F00FF" });
        contextObj.arrColorArray.push({ AccessColorId: 16711807, AutocadColorId: 190, ColorId: 76, RGB: "7F00FF", BackGroundColor: "#7F00FF" });
        contextObj.arrColorArray.push({ AccessColorId: 16711871, AutocadColorId: 200, ColorId: 80, RGB: "BF00FF", BackGroundColor: "#BF00FF" });
        contextObj.arrColorArray.push({ AccessColorId: 16711935, AutocadColorId: 210, ColorId: 86, RGB: "FF00FF", BackGroundColor: "#FF00FF" });
        contextObj.arrColorArray.push({ AccessColorId: 12517631, AutocadColorId: 220, ColorId: 91, RGB: "FF00BF", BackGroundColor: "#FF00BF" });
        contextObj.arrColorArray.push({ AccessColorId: 8323327, AutocadColorId: 230, ColorId: 94, RGB: "FF007F", BackGroundColor: "#FF007F" });
        contextObj.arrColorArray.push({ AccessColorId: 4129023, AutocadColorId: 240, ColorId: 99, RGB: "FF003F", BackGroundColor: "#FF003F" });
        contextObj.arrColorArray.push({ AccessColorId: 8355839, AutocadColorId: 11, ColorId: 4, RGB: "FF7F7F", BackGroundColor: "#FF7F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8364031, AutocadColorId: 21, ColorId: 13, RGB: "FF9F7F", BackGroundColor: "#FF9F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8372223, AutocadColorId: 31, ColorId: 16, RGB: "FFBF7F", BackGroundColor: "#FFBF7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8380415, AutocadColorId: 41, ColorId: 115, RGB: "FFDF7F", BackGroundColor: "#FFDF7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8388607, AutocadColorId: 51, ColorId: 121, RGB: "FFFF7F", BackGroundColor: "#FFFF7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8388575, AutocadColorId: 61, ColorId: 27, RGB: "DFFF7F", BackGroundColor: "#DFFF7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8388543, AutocadColorId: 71, ColorId: 135, RGB: "BFFF7F", BackGroundColor: "#BFFF7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8388511, AutocadColorId: 81, ColorId: 143, RGB: "9FFF7F", BackGroundColor: "#9FFF7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8388479, AutocadColorId: 91, ColorId: 36, RGB: "7FFF7F", BackGroundColor: "#7FFF7F" });
        contextObj.arrColorArray.push({ AccessColorId: 10485631, AutocadColorId: 101, ColorId: 38, RGB: "7FFF9F", BackGroundColor: "#7FFF9F" });
        contextObj.arrColorArray.push({ AccessColorId: 12582783, AutocadColorId: 111, ColorId: 40, RGB: "7FFFBF", BackGroundColor: "#7FFFBF" });
        contextObj.arrColorArray.push({ AccessColorId: 14679935, AutocadColorId: 121, ColorId: 173, RGB: "7FFFDF", BackGroundColor: "#7FFFDF" });
        contextObj.arrColorArray.push({ AccessColorId: 16777087, AutocadColorId: 131, ColorId: 47, RGB: "7FFFFF", BackGroundColor: "#7FFFFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16768895, AutocadColorId: 141, ColorId: 50, RGB: "7FDFFF", BackGroundColor: "#7FDFFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16760703, AutocadColorId: 151, ColorId: 191, RGB: "7FBFFF", BackGroundColor: "#7FBFFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16752511, AutocadColorId: 161, ColorId: 60, RGB: "7F9FFF", BackGroundColor: "#7F9FFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16744319, AutocadColorId: 171, ColorId: 64, RGB: "7F7FFF", BackGroundColor: "#7F7FFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16744351, AutocadColorId: 181, ColorId: 71, RGB: "9F7FFF", BackGroundColor: "#9F7FFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16744383, AutocadColorId: 191, ColorId: 75, RGB: "BF7FFF", BackGroundColor: "#BF7FFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16744415, AutocadColorId: 201, ColorId: 216, RGB: "DF7FFF", BackGroundColor: "#DF7FFF" });
        contextObj.arrColorArray.push({ AccessColorId: 16744447, AutocadColorId: 211, ColorId: 85, RGB: "FF7FFF", BackGroundColor: "#FF7FFF" });
        contextObj.arrColorArray.push({ AccessColorId: 14647295, AutocadColorId: 221, ColorId: 92, RGB: "FF7FDF", BackGroundColor: "#FF7FDF" });
        contextObj.arrColorArray.push({ AccessColorId: 12550143, AutocadColorId: 231, ColorId: 231, RGB: "FF7FBF", BackGroundColor: "#FF7FBF" });
        contextObj.arrColorArray.push({ AccessColorId: 10452991, AutocadColorId: 241, ColorId: 100, RGB: "FF7F9F", BackGroundColor: "#FF7F9F" });
        contextObj.arrColorArray.push({ AccessColorId: 165, AutocadColorId: 12, ColorId: 2, RGB: "A50000", BackGroundColor: "#A50000" });
        contextObj.arrColorArray.push({ AccessColorId: 10661, AutocadColorId: 22, ColorId: 14, RGB: "A52900", BackGroundColor: "#A52900" });
        contextObj.arrColorArray.push({ AccessColorId: 21157, AutocadColorId: 32, ColorId: 19, RGB: "A55200", BackGroundColor: "#A55200" });
        contextObj.arrColorArray.push({ AccessColorId: 31909, AutocadColorId: 42, ColorId: 22, RGB: "A57C00", BackGroundColor: "#A57C00" });
        contextObj.arrColorArray.push({ AccessColorId: 42405, AutocadColorId: 52, ColorId: 122, RGB: "A5A500", BackGroundColor: "#A5A500" });
        contextObj.arrColorArray.push({ AccessColorId: 42364, AutocadColorId: 62, ColorId: 129, RGB: "7CA500", BackGroundColor: "#7CA500" });
        contextObj.arrColorArray.push({ AccessColorId: 42322, AutocadColorId: 72, ColorId: 136, RGB: "52A500", BackGroundColor: "#52A500" });
        contextObj.arrColorArray.push({ AccessColorId: 42281, AutocadColorId: 82, ColorId: 144, RGB: "29A500", BackGroundColor: "#29A500" });
        contextObj.arrColorArray.push({ AccessColorId: 42240, AutocadColorId: 92, ColorId: 152, RGB: "00A500", BackGroundColor: "#00A500" });
        contextObj.arrColorArray.push({ AccessColorId: 2729216, AutocadColorId: 102, ColorId: 159, RGB: "00A529", BackGroundColor: "#00A529" });
        contextObj.arrColorArray.push({ AccessColorId: 5416192, AutocadColorId: 112, ColorId: 166, RGB: "00A552", BackGroundColor: "#00A552" });
        contextObj.arrColorArray.push({ AccessColorId: 8168704, AutocadColorId: 122, ColorId: 174, RGB: "00A57C", BackGroundColor: "#00A57C" });
        contextObj.arrColorArray.push({ AccessColorId: 10855680, AutocadColorId: 132, ColorId: 180, RGB: "00A5A5", BackGroundColor: "#00A5A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10845184, AutocadColorId: 142, ColorId: 52, RGB: "007CA5", BackGroundColor: "#007CA5" });
        contextObj.arrColorArray.push({ AccessColorId: 10834432, AutocadColorId: 152, ColorId: 192, RGB: "0052A5", BackGroundColor: "#0052A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10823936, AutocadColorId: 162, ColorId: 58, RGB: "0029A5", BackGroundColor: "#0029A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10813440, AutocadColorId: 172, ColorId: 66, RGB: "0000A5", BackGroundColor: "#0000A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10813481, AutocadColorId: 182, ColorId: 207, RGB: "2900A5", BackGroundColor: "#2900A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10813522, AutocadColorId: 192, ColorId: 77, RGB: "5200A5", BackGroundColor: "#5200A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10813564, AutocadColorId: 202, ColorId: 81, RGB: "7C00A5", BackGroundColor: "#7C00A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10813605, AutocadColorId: 212, ColorId: 87, RGB: "A500A5", BackGroundColor: "#A500A5" });
        contextObj.arrColorArray.push({ AccessColorId: 8126629, AutocadColorId: 222, ColorId: 90, RGB: "A5007C", BackGroundColor: "#A5007C" });
        contextObj.arrColorArray.push({ AccessColorId: 5374117, AutocadColorId: 232, ColorId: 95, RGB: "A50052", BackGroundColor: "#A50052" });
        contextObj.arrColorArray.push({ AccessColorId: 2687141, AutocadColorId: 242, ColorId: 98, RGB: "A50029", BackGroundColor: "#A50029" });
        contextObj.arrColorArray.push({ AccessColorId: 5395109, AutocadColorId: 13, ColorId: 5, RGB: "A55252", BackGroundColor: "#A55252" });
        contextObj.arrColorArray.push({ AccessColorId: 5400485, AutocadColorId: 23, ColorId: 106, RGB: "A56752", BackGroundColor: "#A56752" });
        contextObj.arrColorArray.push({ AccessColorId: 5405861, AutocadColorId: 33, ColorId: 17, RGB: "A57C52", BackGroundColor: "#A57C52" });
        contextObj.arrColorArray.push({ AccessColorId: 5411237, AutocadColorId: 43, ColorId: 116, RGB: "A59152", BackGroundColor: "#A59152" });
        contextObj.arrColorArray.push({ AccessColorId: 5416357, AutocadColorId: 53, ColorId: 25, RGB: "A5A552", BackGroundColor: "#A5A552" });
        contextObj.arrColorArray.push({ AccessColorId: 5416337, AutocadColorId: 63, ColorId: 28, RGB: "91A552", BackGroundColor: "#91A552" });
        contextObj.arrColorArray.push({ AccessColorId: 5416316, AutocadColorId: 73, ColorId: 137, RGB: "7CA552", BackGroundColor: "#7CA552" });
        contextObj.arrColorArray.push({ AccessColorId: 5416295, AutocadColorId: 83, ColorId: 145, RGB: "67A552", BackGroundColor: "#67A552" });
        contextObj.arrColorArray.push({ AccessColorId: 5416274, AutocadColorId: 93, ColorId: 153, RGB: "52A552", BackGroundColor: "#52A552" });
        contextObj.arrColorArray.push({ AccessColorId: 6792530, AutocadColorId: 103, ColorId: 160, RGB: "52A567", BackGroundColor: "#52A567" });
        contextObj.arrColorArray.push({ AccessColorId: 8168786, AutocadColorId: 113, ColorId: 41, RGB: "52A57C", BackGroundColor: "#52A57C" });
        contextObj.arrColorArray.push({ AccessColorId: 9545042, AutocadColorId: 123, ColorId: 175, RGB: "52A591", BackGroundColor: "#52A591" });
        contextObj.arrColorArray.push({ AccessColorId: 10855762, AutocadColorId: 133, ColorId: 46, RGB: "52A5A5", BackGroundColor: "#52A5A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10850642, AutocadColorId: 143, ColorId: 49, RGB: "5291A5", BackGroundColor: "#5291A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10845266, AutocadColorId: 153, ColorId: 193, RGB: "527CA5", BackGroundColor: "#527CA5" });
        contextObj.arrColorArray.push({ AccessColorId: 10839890, AutocadColorId: 163, ColorId: 61, RGB: "5267A5", BackGroundColor: "#5267A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10834514, AutocadColorId: 173, ColorId: 203, RGB: "5252A5", BackGroundColor: "#5252A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10834535, AutocadColorId: 183, ColorId: 208, RGB: "6752A5", BackGroundColor: "#6752A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10834556, AutocadColorId: 193, ColorId: 74, RGB: "7C52A5", BackGroundColor: "#7C52A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10834577, AutocadColorId: 203, ColorId: 217, RGB: "9152A5", BackGroundColor: "#9152A5" });
        contextObj.arrColorArray.push({ AccessColorId: 10834597, AutocadColorId: 213, ColorId: 84, RGB: "A552A5", BackGroundColor: "#A552A5" });
        contextObj.arrColorArray.push({ AccessColorId: 9523877, AutocadColorId: 223, ColorId: 93, RGB: "A55291", BackGroundColor: "#A55291" });
        contextObj.arrColorArray.push({ AccessColorId: 8147621, AutocadColorId: 233, ColorId: 232, RGB: "A5527C", BackGroundColor: "#A5527C" });
        contextObj.arrColorArray.push({ AccessColorId: 6771365, AutocadColorId: 243, ColorId: 237, RGB: "A55267", BackGroundColor: "#A55267" });
        contextObj.arrColorArray.push({ AccessColorId: 127, AutocadColorId: 14, ColorId: 3, RGB: "7F0000", BackGroundColor: "#7F0000" });
        contextObj.arrColorArray.push({ AccessColorId: 8063, AutocadColorId: 24, ColorId: 107, RGB: "7F1F00", BackGroundColor: "#7F1F00" });
        contextObj.arrColorArray.push({ AccessColorId: 16255, AutocadColorId: 34, ColorId: 109, RGB: "7F3F00", BackGroundColor: "#7F3F00" });
        contextObj.arrColorArray.push({ AccessColorId: 24447, AutocadColorId: 44, ColorId: 23, RGB: "7F5F00", BackGroundColor: "#7F5F00" });
        contextObj.arrColorArray.push({ AccessColorId: 32639, AutocadColorId: 54, ColorId: 26, RGB: "7F7F00", BackGroundColor: "#7F7F00" });
        contextObj.arrColorArray.push({ AccessColorId: 32607, AutocadColorId: 64, ColorId: 29, RGB: "5F7F00", BackGroundColor: "#5F7F00" });
        contextObj.arrColorArray.push({ AccessColorId: 32575, AutocadColorId: 74, ColorId: 31, RGB: "3F7F00", BackGroundColor: "#3F7F00" });
        contextObj.arrColorArray.push({ AccessColorId: 32543, AutocadColorId: 84, ColorId: 146, RGB: "1F7F00", BackGroundColor: "#1F7F00" });
        contextObj.arrColorArray.push({ AccessColorId: 32512, AutocadColorId: 94, ColorId: 154, RGB: "007F00", BackGroundColor: "#007F00" });
        contextObj.arrColorArray.push({ AccessColorId: 2064128, AutocadColorId: 104, ColorId: 161, RGB: "007F1F", BackGroundColor: "#007F1F" });
        contextObj.arrColorArray.push({ AccessColorId: 4161280, AutocadColorId: 114, ColorId: 167, RGB: "007F3F", BackGroundColor: "#007F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 6258432, AutocadColorId: 124, ColorId: 43, RGB: "007F5F", BackGroundColor: "#007F5F" });
        contextObj.arrColorArray.push({ AccessColorId: 8355584, AutocadColorId: 134, ColorId: 48, RGB: "007F7F", BackGroundColor: "#007F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8347392, AutocadColorId: 144, ColorId: 53, RGB: "005F7F", BackGroundColor: "#005F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8339200, AutocadColorId: 154, ColorId: 56, RGB: "003F7F", BackGroundColor: "#003F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8331008, AutocadColorId: 164, ColorId: 198, RGB: "001F7F", BackGroundColor: "#001F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8323072, AutocadColorId: 174, ColorId: 67, RGB: "00007F", BackGroundColor: "#00007F" });
        contextObj.arrColorArray.push({ AccessColorId: 8323103, AutocadColorId: 184, ColorId: 72, RGB: "1F007F", BackGroundColor: "#1F007F" });
        contextObj.arrColorArray.push({ AccessColorId: 8323135, AutocadColorId: 194, ColorId: 211, RGB: "3F007F", BackGroundColor: "#3F007F" });
        contextObj.arrColorArray.push({ AccessColorId: 8323167, AutocadColorId: 204, ColorId: 82, RGB: "5F007F", BackGroundColor: "#5F007F" });
        contextObj.arrColorArray.push({ AccessColorId: 8323199, AutocadColorId: 214, ColorId: 88, RGB: "7F007F", BackGroundColor: "#7F007F" });
        contextObj.arrColorArray.push({ AccessColorId: 6226047, AutocadColorId: 224, ColorId: 89, RGB: "7F005F", BackGroundColor: "#7F005F" });
        contextObj.arrColorArray.push({ AccessColorId: 4128895, AutocadColorId: 234, ColorId: 96, RGB: "7F003F", BackGroundColor: "#7F003F" });
        contextObj.arrColorArray.push({ AccessColorId: 2031743, AutocadColorId: 244, ColorId: 238, RGB: "7F001F", BackGroundColor: "#7F001F" });
        contextObj.arrColorArray.push({ AccessColorId: 4145023, AutocadColorId: 15, ColorId: 6, RGB: "7F3F3F", BackGroundColor: "#7F3F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 4149119, AutocadColorId: 25, ColorId: 12, RGB: "7F4F3F", BackGroundColor: "#7F4F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 4153215, AutocadColorId: 35, ColorId: 110, RGB: "7F5F3F", BackGroundColor: "#7F5F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 4157311, AutocadColorId: 45, ColorId: 20, RGB: "7F6F3F", BackGroundColor: "#7F6F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 4161407, AutocadColorId: 55, ColorId: 123, RGB: "7F7F3F", BackGroundColor: "#7F7F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 4161391, AutocadColorId: 65, ColorId: 130, RGB: "6F7F3F", BackGroundColor: "#6F7F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 4161375, AutocadColorId: 75, ColorId: 32, RGB: "5F7F3F", BackGroundColor: "#5F7F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 4161359, AutocadColorId: 85, ColorId: 147, RGB: "4F7F3F", BackGroundColor: "#4F7F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 4161343, AutocadColorId: 95, ColorId: 35, RGB: "3F7F3F", BackGroundColor: "#3F7F3F" });
        contextObj.arrColorArray.push({ AccessColorId: 5209919, AutocadColorId: 105, ColorId: 39, RGB: "3F7F4F", BackGroundColor: "#3F7F4F" });
        contextObj.arrColorArray.push({ AccessColorId: 6258495, AutocadColorId: 115, ColorId: 168, RGB: "3F7F5F", BackGroundColor: "#3F7F5F" });
        contextObj.arrColorArray.push({ AccessColorId: 7307071, AutocadColorId: 125, ColorId: 42, RGB: "3F7F6F", BackGroundColor: "#3F7F6F" });
        contextObj.arrColorArray.push({ AccessColorId: 8355647, AutocadColorId: 135, ColorId: 181, RGB: "3F7F7F", BackGroundColor: "#3F7F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8351551, AutocadColorId: 145, ColorId: 186, RGB: "3F6F7F", BackGroundColor: "#3F6F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8347455, AutocadColorId: 155, ColorId: 54, RGB: "3F5F7F", BackGroundColor: "#3F5F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8343359, AutocadColorId: 165, ColorId: 199, RGB: "3F4F7F", BackGroundColor: "#3F4F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8339263, AutocadColorId: 175, ColorId: 63, RGB: "3F3F7F", BackGroundColor: "#3F3F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8339279, AutocadColorId: 185, ColorId: 70, RGB: "4F3F7F", BackGroundColor: "#4F3F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8339295, AutocadColorId: 195, ColorId: 212, RGB: "5F3F7F", BackGroundColor: "#5F3F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8339311, AutocadColorId: 205, ColorId: 79, RGB: "6F3F7F", BackGroundColor: "#6F3F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 8339327, AutocadColorId: 215, ColorId: 221, RGB: "7F3F7F", BackGroundColor: "#7F3F7F" });
        contextObj.arrColorArray.push({ AccessColorId: 7290751, AutocadColorId: 225, ColorId: 226, RGB: "7F3F6F", BackGroundColor: "#7F3F6F" });
        contextObj.arrColorArray.push({ AccessColorId: 6242175, AutocadColorId: 235, ColorId: 233, RGB: "7F3F5F", BackGroundColor: "#7F3F5F" });
        contextObj.arrColorArray.push({ AccessColorId: 5193599, AutocadColorId: 245, ColorId: 239, RGB: "7F3F4F", BackGroundColor: "#7F3F4F" });
        contextObj.arrColorArray.push({ AccessColorId: 76, AutocadColorId: 16, ColorId: 9, RGB: "4C0000", BackGroundColor: "#4C0000" });
        contextObj.arrColorArray.push({ AccessColorId: 4940, AutocadColorId: 26, ColorId: 15, RGB: "4C1300", BackGroundColor: "#4C1300" });
        contextObj.arrColorArray.push({ AccessColorId: 9804, AutocadColorId: 36, ColorId: 111, RGB: "4C2600", BackGroundColor: "#4C2600" });
        contextObj.arrColorArray.push({ AccessColorId: 14668, AutocadColorId: 46, ColorId: 117, RGB: "4C3900", BackGroundColor: "#4C3900" });
        contextObj.arrColorArray.push({ AccessColorId: 19532, AutocadColorId: 56, ColorId: 124, RGB: "4C4C00", BackGroundColor: "#4C4C00" });
        contextObj.arrColorArray.push({ AccessColorId: 19513, AutocadColorId: 66, ColorId: 131, RGB: "394C00", BackGroundColor: "#394C00" });
        contextObj.arrColorArray.push({ AccessColorId: 19494, AutocadColorId: 76, ColorId: 138, RGB: "264C00", BackGroundColor: "#264C00" });
        contextObj.arrColorArray.push({ AccessColorId: 19475, AutocadColorId: 86, ColorId: 148, RGB: "134C00", BackGroundColor: "#134C00" });
        contextObj.arrColorArray.push({ AccessColorId: 19456, AutocadColorId: 96, ColorId: 155, RGB: "004C00", BackGroundColor: "#004C00" });
        contextObj.arrColorArray.push({ AccessColorId: 1264640, AutocadColorId: 106, ColorId: 162, RGB: "004C13", BackGroundColor: "#004C13" });
        contextObj.arrColorArray.push({ AccessColorId: 2509824, AutocadColorId: 116, ColorId: 169, RGB: "004C26", BackGroundColor: "#004C26" });
        contextObj.arrColorArray.push({ AccessColorId: 3755008, AutocadColorId: 126, ColorId: 44, RGB: "004C39", BackGroundColor: "#004C39" });
        contextObj.arrColorArray.push({ AccessColorId: 5000192, AutocadColorId: 136, ColorId: 182, RGB: "004C4C", BackGroundColor: "#004C4C" });
        contextObj.arrColorArray.push({ AccessColorId: 4995328, AutocadColorId: 146, ColorId: 187, RGB: "00394C", BackGroundColor: "#00394C" });
        contextObj.arrColorArray.push({ AccessColorId: 4990464, AutocadColorId: 156, ColorId: 194, RGB: "00264C", BackGroundColor: "#00264C" });
        contextObj.arrColorArray.push({ AccessColorId: 4985600, AutocadColorId: 166, ColorId: 200, RGB: "00134C", BackGroundColor: "#00134C" });
        contextObj.arrColorArray.push({ AccessColorId: 4980736, AutocadColorId: 176, ColorId: 68, RGB: "00004C", BackGroundColor: "#00004C" });
        contextObj.arrColorArray.push({ AccessColorId: 4980755, AutocadColorId: 186, ColorId: 73, RGB: "13004C", BackGroundColor: "#13004C" });
        contextObj.arrColorArray.push({ AccessColorId: 4980774, AutocadColorId: 196, ColorId: 213, RGB: "26004C", BackGroundColor: "#26004C" });
        contextObj.arrColorArray.push({ AccessColorId: 4980793, AutocadColorId: 206, ColorId: 83, RGB: "39004C", BackGroundColor: "#39004C" });
        contextObj.arrColorArray.push({ AccessColorId: 4980812, AutocadColorId: 216, ColorId: 222, RGB: "4C004C", BackGroundColor: "#4C004C" });
        contextObj.arrColorArray.push({ AccessColorId: 3735628, AutocadColorId: 226, ColorId: 227, RGB: "4C0039", BackGroundColor: "#4C0039" });
        contextObj.arrColorArray.push({ AccessColorId: 2490444, AutocadColorId: 236, ColorId: 97, RGB: "4C0026", BackGroundColor: "#4C0026" });
        contextObj.arrColorArray.push({ AccessColorId: 1245260, AutocadColorId: 246, ColorId: 240, RGB: "4C0013", BackGroundColor: "#4C0013" });
        contextObj.arrColorArray.push({ AccessColorId: 2500172, AutocadColorId: 17, ColorId: 7, RGB: "4C2626", BackGroundColor: "#4C2626" });
        contextObj.arrColorArray.push({ AccessColorId: 2502476, AutocadColorId: 27, ColorId: 11, RGB: "4C2F26", BackGroundColor: "#4C2F26" });
        contextObj.arrColorArray.push({ AccessColorId: 2505036, AutocadColorId: 37, ColorId: 112, RGB: "4C3926", BackGroundColor: "#4C3926" });
        contextObj.arrColorArray.push({ AccessColorId: 2507340, AutocadColorId: 47, ColorId: 118, RGB: "4C4226", BackGroundColor: "#4C4226" });
        contextObj.arrColorArray.push({ AccessColorId: 2509900, AutocadColorId: 57, ColorId: 125, RGB: "4C4C26", BackGroundColor: "#4C4C26" });
        contextObj.arrColorArray.push({ AccessColorId: 2509890, AutocadColorId: 67, ColorId: 132, RGB: "424C26", BackGroundColor: "#424C26" });
        contextObj.arrColorArray.push({ AccessColorId: 2509881, AutocadColorId: 77, ColorId: 139, RGB: "394C26", BackGroundColor: "#394C26" });
        contextObj.arrColorArray.push({ AccessColorId: 2509871, AutocadColorId: 87, ColorId: 149, RGB: "2F4C26", BackGroundColor: "#2F4C26" });
        contextObj.arrColorArray.push({ AccessColorId: 2509862, AutocadColorId: 97, ColorId: 34, RGB: "264C26", BackGroundColor: "#264C26" });
        contextObj.arrColorArray.push({ AccessColorId: 3099686, AutocadColorId: 107, ColorId: 37, RGB: "264C2F", BackGroundColor: "#264C2F" });
        contextObj.arrColorArray.push({ AccessColorId: 3755046, AutocadColorId: 117, ColorId: 170, RGB: "264C39", BackGroundColor: "#264C39" });
        contextObj.arrColorArray.push({ AccessColorId: 4344870, AutocadColorId: 127, ColorId: 176, RGB: "264C42", BackGroundColor: "#264C42" });
        contextObj.arrColorArray.push({ AccessColorId: 5000230, AutocadColorId: 137, ColorId: 183, RGB: "264C4C", BackGroundColor: "#264C4C" });
        contextObj.arrColorArray.push({ AccessColorId: 4997670, AutocadColorId: 147, ColorId: 188, RGB: "26424C", BackGroundColor: "#26424C" });
        contextObj.arrColorArray.push({ AccessColorId: 4995366, AutocadColorId: 157, ColorId: 195, RGB: "26394C", BackGroundColor: "#26394C" });
        contextObj.arrColorArray.push({ AccessColorId: 4992806, AutocadColorId: 167, ColorId: 201, RGB: "262F4C", BackGroundColor: "#262F4C" });
        contextObj.arrColorArray.push({ AccessColorId: 4990502, AutocadColorId: 177, ColorId: 62, RGB: "26264C", BackGroundColor: "#26264C" });
        contextObj.arrColorArray.push({ AccessColorId: 4990511, AutocadColorId: 187, ColorId: 69, RGB: "2F264C", BackGroundColor: "#2F264C" });
        contextObj.arrColorArray.push({ AccessColorId: 4990521, AutocadColorId: 197, ColorId: 214, RGB: "39264C", BackGroundColor: "#39264C" });
        contextObj.arrColorArray.push({ AccessColorId: 4990530, AutocadColorId: 207, ColorId: 218, RGB: "42264C", BackGroundColor: "#42264C" });
        contextObj.arrColorArray.push({ AccessColorId: 4990540, AutocadColorId: 217, ColorId: 223, RGB: "4C264C", BackGroundColor: "#4C264C" });
        contextObj.arrColorArray.push({ AccessColorId: 4335180, AutocadColorId: 227, ColorId: 228, RGB: "4C2642", BackGroundColor: "#4C2642" });
        contextObj.arrColorArray.push({ AccessColorId: 3745356, AutocadColorId: 237, ColorId: 234, RGB: "4C2639", BackGroundColor: "#4C2639" });
        contextObj.arrColorArray.push({ AccessColorId: 3089996, AutocadColorId: 247, ColorId: 241, RGB: "4C262F", BackGroundColor: "#4C262F" });
        contextObj.arrColorArray.push({ AccessColorId: 38, AutocadColorId: 18, ColorId: 104, RGB: "260000", BackGroundColor: "#260000" });
        contextObj.arrColorArray.push({ AccessColorId: 2342, AutocadColorId: 28, ColorId: 10, RGB: "260900", BackGroundColor: "#260900" });
        contextObj.arrColorArray.push({ AccessColorId: 4902, AutocadColorId: 38, ColorId: 113, RGB: "261300", BackGroundColor: "#261300" });
        contextObj.arrColorArray.push({ AccessColorId: 7206, AutocadColorId: 48, ColorId: 119, RGB: "261C00", BackGroundColor: "#261C00" });
        contextObj.arrColorArray.push({ AccessColorId: 9766, AutocadColorId: 58, ColorId: 126, RGB: "262600", BackGroundColor: "#262600" });
        contextObj.arrColorArray.push({ AccessColorId: 9756, AutocadColorId: 68, ColorId: 133, RGB: "1C2600", BackGroundColor: "#1C2600" });
        contextObj.arrColorArray.push({ AccessColorId: 9747, AutocadColorId: 78, ColorId: 140, RGB: "132600", BackGroundColor: "#132600" });
        contextObj.arrColorArray.push({ AccessColorId: 9737, AutocadColorId: 88, ColorId: 33, RGB: "092600", BackGroundColor: "#092600" });
        contextObj.arrColorArray.push({ AccessColorId: 9728, AutocadColorId: 98, ColorId: 156, RGB: "002600", BackGroundColor: "#002600" });
        contextObj.arrColorArray.push({ AccessColorId: 599552, AutocadColorId: 108, ColorId: 163, RGB: "002609", BackGroundColor: "#002609" });
        contextObj.arrColorArray.push({ AccessColorId: 1254912, AutocadColorId: 118, ColorId: 171, RGB: "002613", BackGroundColor: "#002613" });
        contextObj.arrColorArray.push({ AccessColorId: 1844736, AutocadColorId: 128, ColorId: 177, RGB: "00261C", BackGroundColor: "#00261C" });
        contextObj.arrColorArray.push({ AccessColorId: 2500096, AutocadColorId: 138, ColorId: 184, RGB: "002626", BackGroundColor: "#002626" });
        contextObj.arrColorArray.push({ AccessColorId: 2497536, AutocadColorId: 148, ColorId: 189, RGB: "001C26", BackGroundColor: "#001C26" });
        contextObj.arrColorArray.push({ AccessColorId: 2495232, AutocadColorId: 158, ColorId: 196, RGB: "001326", BackGroundColor: "#001326" });
        contextObj.arrColorArray.push({ AccessColorId: 2492672, AutocadColorId: 168, ColorId: 57, RGB: "000926", BackGroundColor: "#000926" });
        contextObj.arrColorArray.push({ AccessColorId: 2490368, AutocadColorId: 178, ColorId: 204, RGB: "000026", BackGroundColor: "#000026" });
        contextObj.arrColorArray.push({ AccessColorId: 2490377, AutocadColorId: 188, ColorId: 209, RGB: "090026", BackGroundColor: "#090026" });
        contextObj.arrColorArray.push({ AccessColorId: 2490387, AutocadColorId: 198, ColorId: 78, RGB: "130026", BackGroundColor: "#130026" });
        contextObj.arrColorArray.push({ AccessColorId: 2490396, AutocadColorId: 208, ColorId: 219, RGB: "1C0026", BackGroundColor: "#1C0026" });
        contextObj.arrColorArray.push({ AccessColorId: 2490406, AutocadColorId: 218, ColorId: 224, RGB: "260026", BackGroundColor: "#260026" });
        contextObj.arrColorArray.push({ AccessColorId: 1835046, AutocadColorId: 228, ColorId: 229, RGB: "26001C", BackGroundColor: "#26001C" });
        contextObj.arrColorArray.push({ AccessColorId: 1245222, AutocadColorId: 238, ColorId: 235, RGB: "260013", BackGroundColor: "#260013" });
        contextObj.arrColorArray.push({ AccessColorId: 589862, AutocadColorId: 248, ColorId: 242, RGB: "260009", BackGroundColor: "#260009" });
        contextObj.arrColorArray.push({ AccessColorId: 1250086, AutocadColorId: 19, ColorId: 8, RGB: "261313", BackGroundColor: "#261313" });
        contextObj.arrColorArray.push({ AccessColorId: 1251110, AutocadColorId: 29, ColorId: 108, RGB: "261713", BackGroundColor: "#261713" });
        contextObj.arrColorArray.push({ AccessColorId: 1252390, AutocadColorId: 39, ColorId: 114, RGB: "261C13", BackGroundColor: "#261C13" });
        contextObj.arrColorArray.push({ AccessColorId: 1253670, AutocadColorId: 49, ColorId: 120, RGB: "262113", BackGroundColor: "#262113" });
        contextObj.arrColorArray.push({ AccessColorId: 1254950, AutocadColorId: 59, ColorId: 127, RGB: "262613", BackGroundColor: "#262613" });
        contextObj.arrColorArray.push({ AccessColorId: 1254945, AutocadColorId: 69, ColorId: 134, RGB: "212613", BackGroundColor: "#212613" });
        contextObj.arrColorArray.push({ AccessColorId: 1254940, AutocadColorId: 79, ColorId: 141, RGB: "1C2613", BackGroundColor: "#1C2613" });
        contextObj.arrColorArray.push({ AccessColorId: 1254935, AutocadColorId: 89, ColorId: 150, RGB: "172613", BackGroundColor: "#172613" });
        contextObj.arrColorArray.push({ AccessColorId: 1254931, AutocadColorId: 99, ColorId: 157, RGB: "132613", BackGroundColor: "#132613" });
        contextObj.arrColorArray.push({ AccessColorId: 1517075, AutocadColorId: 109, ColorId: 164, RGB: "132617", BackGroundColor: "#132617" });
        contextObj.arrColorArray.push({ AccessColorId: 1844755, AutocadColorId: 119, ColorId: 172, RGB: "13261C", BackGroundColor: "#13261C" });
        contextObj.arrColorArray.push({ AccessColorId: 2172435, AutocadColorId: 129, ColorId: 178, RGB: "132621", BackGroundColor: "#132621" });
        contextObj.arrColorArray.push({ AccessColorId: 2500115, AutocadColorId: 139, ColorId: 185, RGB: "132626", BackGroundColor: "#132626" });
        contextObj.arrColorArray.push({ AccessColorId: 2498835, AutocadColorId: 149, ColorId: 190, RGB: "132126", BackGroundColor: "#132126" });
        contextObj.arrColorArray.push({ AccessColorId: 2497555, AutocadColorId: 159, ColorId: 197, RGB: "131C26", BackGroundColor: "#131C26" });
        contextObj.arrColorArray.push({ AccessColorId: 2496275, AutocadColorId: 169, ColorId: 202, RGB: "131726", BackGroundColor: "#131726" });
        contextObj.arrColorArray.push({ AccessColorId: 2495251, AutocadColorId: 179, ColorId: 205, RGB: "131326", BackGroundColor: "#131326" });
        contextObj.arrColorArray.push({ AccessColorId: 2495255, AutocadColorId: 189, ColorId: 210, RGB: "171326", BackGroundColor: "#171326" });
        contextObj.arrColorArray.push({ AccessColorId: 2495260, AutocadColorId: 199, ColorId: 215, RGB: "1C1326", BackGroundColor: "#1C1326" });
        contextObj.arrColorArray.push({ AccessColorId: 2495265, AutocadColorId: 209, ColorId: 220, RGB: "211326", BackGroundColor: "#211326" });
        contextObj.arrColorArray.push({ AccessColorId: 2495270, AutocadColorId: 219, ColorId: 225, RGB: "261326", BackGroundColor: "#261326" });
        contextObj.arrColorArray.push({ AccessColorId: 2167590, AutocadColorId: 229, ColorId: 230, RGB: "261321", BackGroundColor: "#261321" });
        contextObj.arrColorArray.push({ AccessColorId: 1839910, AutocadColorId: 239, ColorId: 236, RGB: "26131C", BackGroundColor: "#26131C" });
        contextObj.arrColorArray.push({ AccessColorId: 1512230, AutocadColorId: 249, ColorId: 243, RGB: "261317", BackGroundColor: "#261317" });
        contextObj.arrColorArray.push({ AccessColorId: 16777215, AutocadColorId: 7, ColorId: 101, RGB: "FFFFFF", BackGroundColor: "#FFFFFF" });
        contextObj.arrColorArray.push({ AccessColorId: 8421504, AutocadColorId: 8, ColorId: 102, RGB: "808080", BackGroundColor: "#808080" });
        contextObj.arrColorArray.push({ AccessColorId: 12632256, AutocadColorId: 9, ColorId: 103, RGB: "C0C0C0", BackGroundColor: "#C0C0C0" });
        contextObj.arrColorArray.push({ AccessColorId: 0, AutocadColorId: 250, ColorId: 244, RGB: "000000", BackGroundColor: "#000000" });
        return contextObj.arrColorArray;
    };
    ColorPreferenceComponent.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    ColorPreferenceComponent.prototype.cancelClick = function (value) {
        this.showSlide = value.value;
    };
    ColorPreferenceComponent.prototype.DefaultSetting = function (event) {
        var contextObj = this;
        var PageTarget;
        this.showSlide = !this.showSlide;
        if (this.moduleId == "3" || this.moduleId == "5") {
            this.commonService.updateColorPreferenceData("509", contextObj.moduleId, contextObj.output, false).subscribe(function (resultData) {
                debugger;
                if (resultData["Data"].Message == "Success") {
                    contextObj.notificationService.ShowToaster("Color Settings updated", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
            });
        }
        else if (contextObj.objectModules.includes(parseInt(contextObj.moduleId))) {
            contextObj.output = JSON.parse(contextObj.output);
            contextObj.output = JSON.stringify(contextObj.output);
            contextObj.commonService.updateColorPreferenceDataForObjects("509", contextObj.moduleId, contextObj.output, false).subscribe(function (resultData) {
                debugger;
                if (resultData["Data"].Message == "Success") {
                    contextObj.notificationService.ShowToaster("Color Settings updated", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
            });
        }
    };
    ColorPreferenceComponent.prototype.updateBackgroundColor = function () {
        if (this.target == 2) {
            this.target = 1;
            var temp = '#' + this.oldColorPickerValue["ColorRGB"];
            return temp;
        }
    };
    ColorPreferenceComponent.prototype.onChangePattern = function (e, value, fieldName) {
        var Id = value[this.DataKey];
        for (var i = 0; i < this.itemSource.length; i++) {
            if (this.itemSource[i][this.DataKey] == Id) {
                this.itemSource[i][fieldName] = (e.id);
                this.itemSource[i]["HatchAngle"] = (e.angle);
                this.itemSource[i]["HatchScale"] = (e.scale);
            }
        }
        this.itemSource = this.itemSource;
    };
    ColorPreferenceComponent.prototype.scaleEmit = function (e, value, fieldName) {
        var Id = value[this.DataKey];
        for (var i = 0; i < this.itemSource.length; i++) {
            if (this.itemSource[i][this.DataKey] == Id) {
                this.itemSource[i]["HatchScale"] = (e.scale);
            }
        }
        this.itemSource = this.itemSource;
    };
    ColorPreferenceComponent.prototype.angleEmit = function (e, value, fieldName) {
        var Id = value[this.DataKey];
        for (var i = 0; i < this.itemSource.length; i++) {
            if (this.itemSource[i][this.DataKey] == Id) {
                this.itemSource[i]["HatchAngle"] = (e.angle);
            }
        }
        this.itemSource = this.itemSource;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ColorPreferenceComponent.prototype, "pageId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ColorPreferenceComponent.prototype, "Previlages", void 0);
    ColorPreferenceComponent = __decorate([
        core_1.Component({
            selector: 'color-preference',
            templateUrl: './app/Views/Common/ColorPreference/color-preference-component.html',
            directives: [slide_component_1.SlideComponent, labelcomponent_component_1.LabelComponent, colorpickercomponent_component_1.ColorPickerComponent, hatchpattern_component_1.HatchPatternComponent, notify_component_1.Notification],
            providers: [common_service_1.CommonService, http_1.HTTP_PROVIDERS, notify_service_1.NotificationService, General_1.GeneralFunctions, space_service_1.SpaceService],
            inputs: ['moduleId', 'objectCategoryId']
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, notify_service_1.NotificationService, General_1.GeneralFunctions, space_service_1.SpaceService, core_1.ElementRef])
    ], ColorPreferenceComponent);
    return ColorPreferenceComponent;
}());
exports.ColorPreferenceComponent = ColorPreferenceComponent;
//# sourceMappingURL=color-preference-component.js.map
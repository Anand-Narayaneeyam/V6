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
var scheduling_service_1 = require('../../../models/scheduling/scheduling.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var stringtextbox_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var checkboxcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var SeatResources = (function () {
    function SeatResources(scheduleService, notificationService) {
        this.scheduleService = scheduleService;
        this.notificationService = notificationService;
        this.seatResourceAdd = new core_1.EventEmitter();
        this.sourceFieldObj = [];
        this.onchangecount = 0;
        this.colNames = [];
        this.assignedResIndexes = [];
    }
    SeatResources.prototype.ngOnInit = function () {
        var context = this;
        this.scheduleService.getHotelingResourceFlds().subscribe(function (resultData) {
            console.log(context.fieldObject);
            context.fieldObject = resultData["Data"];
            context.loadfields();
        });
        var seatId = context.selSeatIds.length > 1 ? 0 : context.selSeatIds[0]; /**/
        this.scheduleService.getHotelingResourceData(seatId).subscribe(function (resultData) {
            context.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
            if (context.itemSource.length > 0) {
                if (context.pageTarget == 1) {
                    context.colNames = ["ResourceId", "Resource", "Count"];
                }
                else {
                    context.colNames = ["ResourceId", "Resource", "Required", "Optional", "Count"];
                }
                context.loadSource();
            }
        });
    };
    SeatResources.prototype.loadfields = function () {
        var context = this;
        if (this.fieldObject) {
            for (var j = 0; j < this.fieldObject.length; j++) {
                this.fieldObject[j].IsHiddenLabel = true;
                if (context.pageTarget == 2) {
                    switch (this.fieldObject[j].FieldId) {
                        case 2066:
                            this.fieldObject[j].Width = "0";
                            this.fieldObject[j].IsVisible = false;
                            break;
                        case 2068:
                        case 2069:
                            if (context.resourcesCloneObj != undefined && context.resourcesCloneObj.length > 0) {
                            }
                            this.fieldObject[j].Width = "60";
                            this.fieldObject[j].IsVisible = true;
                            break;
                    }
                }
            }
        }
    };
    SeatResources.prototype.loadSource = function () {
        var context = this;
        var itemSrc = this.itemSource;
        if (this.fieldObject && this.itemSource) {
            var fieldarr = this.fieldObject;
            for (var i = 0; i < itemSrc.length; i++) {
                var colCnt = context.colNames.length;
                var isSetChkBxFirst = "false";
                fieldarr = JSON.parse(JSON.stringify(fieldarr));
                fieldarr.find(function (el) {
                    if (context.colNames.indexOf(el.FieldLabel) > -1) {
                        if (context.pageTarget == 2 && el.FieldId == 2065) {
                            el.FieldValue = null;
                        }
                        else {
                            el.FieldValue = itemSrc[i][el.FieldLabel];
                        }
                        if (context.pageTarget == 1 && el.FieldLabel == "Count" && Number(el.FieldValue) > 0) {
                            isSetChkBxFirst = "true"; /*count>0 indexes for setting chckbox as checked on load*/
                        }
                        colCnt--;
                    }
                    if (colCnt == 0) {
                        if (isSetChkBxFirst == "true") {
                            fieldarr[1].FieldValue = isSetChkBxFirst;
                            fieldarr[5].IsEnabled = true;
                            ;
                        }
                        else {
                            fieldarr[1].FieldValue = isSetChkBxFirst;
                            fieldarr[5].IsEnabled = false;
                            ;
                        }
                        context.sourceFieldObj[i] = fieldarr;
                        return true;
                    }
                    else
                        return false;
                });
            }
            if (context.pageTarget == 2 && context.sourceFieldObj != undefined) {
                context.reloadResourceData(context);
            }
            var len = this.sourceFieldObj.length;
            var cnt = 0;
            for (var i = 0; i < len; i++) {
                if (this.sourceFieldObj[i][1].FieldValue == "true") {
                    cnt++;
                }
            }
            if (cnt == len) {
                setTimeout(function () {
                    var chkbx = document.getElementById("2066");
                    chkbx.checked = true;
                }, 100);
            }
        }
    };
    SeatResources.prototype.reloadResourceData = function (context) {
        var newResource = context.resourcesCloneObj.filter(function (el) { return el["ResourceId"] == 0; });
        for (var i = 0; i < context.sourceFieldObj.length; i++) {
            context.resourcesCloneObj.find(function (el, j) {
                if (el["Resource"] == context.sourceFieldObj[i][2].FieldValue) {
                    var isRequire = context.resourcesCloneObj[j].IsRequired;
                    context.sourceFieldObj[i][3].FieldValue = isRequire;
                    context.sourceFieldObj[i][3].IsEnabled = isRequire == "true" ? true : false;
                    context.sourceFieldObj[i][4].FieldValue = isRequire == "true" ? "false" : "true";
                    context.sourceFieldObj[i][4].IsEnabled = isRequire == "true" ? false : true;
                    context.sourceFieldObj[i][5].FieldValue = context.resourcesCloneObj[j].Count;
                    context.sourceFieldObj[i][5].IsEnabled = true;
                    return true;
                }
                else
                    return false;
            });
        }
        if (newResource.length > 0) {
            for (var i = 0; i < newResource.length; i++) {
                var tempSrcfieldObj = JSON.parse(JSON.stringify(this.sourceFieldObj[0]));
                var colCnt = 5;
                tempSrcfieldObj.find(function (el) {
                    switch (el.FieldId) {
                        case 2063:
                            el.FieldValue = 0;
                            colCnt--;
                            break;
                        case 2100:
                            el.FieldValue = newResource[i].Resource;
                            el.IsEnabled = true;
                            colCnt--;
                            break;
                        case 2068:
                            el.FieldValue = newResource[i].IsRequired == "true" ? "true" : "false";
                            colCnt--;
                            break;
                        case 2069:
                            el.FieldValue = newResource[i].IsRequired == "true" ? "false" : "true";
                            colCnt--;
                            break;
                        case 2065:
                            el.FieldValue = newResource[i].Count;
                            el.IsEnabled = true;
                            colCnt--;
                            break;
                    }
                    if (colCnt == 0) {
                        context.sourceFieldObj.push(tempSrcfieldObj);
                        context.itemSource.push({});
                        return true;
                    }
                    else
                        return false;
                });
            }
        }
    };
    SeatResources.prototype.chkBoxChange = function (event, rowObj, index) {
        var context = this;
        switch (event.fieldId) {
            case 2068:
                context.setFldBasedOnCheck(rowObj, event.IsChecked, [2069, 2065]);
                break;
            case 2069:
                context.setFldBasedOnCheck(rowObj, event.IsChecked, [2068, 2065]);
                break;
            case 2066:
                context.setFldBasedOnCheck(rowObj, event.IsChecked, [2065]);
                break;
        }
        var len = this.sourceFieldObj.length;
        var chk = document.getElementsByName("check");
        var chkfilter = [];
        for (var i = 0; i < chk.length; i++) {
            if (chk[i].id == "2066") {
                chkfilter.push(chk[i]);
            }
        }
        var count = 0;
        for (var i = 1; i < chkfilter.length; i++) {
            if (chkfilter[i].checked == true) {
                count++;
            }
        }
        var chkbx = document.getElementById("2066");
        if (count == len) {
            chkbx.checked = true;
        }
        else {
            chkbx.checked = false;
        }
    };
    SeatResources.prototype.setFldBasedOnCheck = function (rowObj, isChecked, setFieldIds) {
        var count = setFieldIds.length;
        rowObj.find(function (el) {
            if (setFieldIds.indexOf(el.FieldId) > -1) {
                if (el.FieldId == 2065) {
                    el.IsEnabled = isChecked;
                    if (!isChecked)
                        el.FieldValue = null;
                    else
                        el.FieldValue = el.FieldValue == null ? 1 : el.FieldValue;
                }
                else {
                    el.IsEnabled = !isChecked;
                    el.FieldValue = !isChecked.toString();
                }
                count--;
            }
            if (count == 0)
                return true;
            else
                return false;
        });
    };
    SeatResources.prototype.hdrChkChange = function (event, colObj) {
        var len = this.sourceFieldObj.length;
        for (var i = 0; i < len; i++) {
            this.sourceFieldObj[i][1].FieldValue = event.IsChecked; /*checkboxfirst colname =1*/
            /*count col index =5*/
            this.sourceFieldObj[i][5].IsEnabled = event.IsChecked;
            if (event.IsChecked)
                this.sourceFieldObj[i][5].FieldValue = this.sourceFieldObj[i][5].FieldValue == null ? 1 : this.sourceFieldObj[i][5].FieldValue;
            else
                this.sourceFieldObj[i][5].FieldValue = null;
        }
    };
    SeatResources.prototype.btnSaveClick = function () {
        var seatDataObj = [];
        var context = this;
        var srcObj = this.sourceFieldObj;
        var seatResourceForList = [];
        var newResources = [];
        var cloneallResorceObj = [];
        var allresourceText = [];
        var issubmit = true;
        var blnZeroValue = false;
        var blnAllowSubmit = true;
        for (var i = 0; i < srcObj.length; i++) {
            if (this.pageTarget == 1 && srcObj[i][1].FieldValue.toString() == "true") {
                if (srcObj[i][5].FieldValue == "" || srcObj[i][5].FieldValue == "0" || srcObj[i][5].HasValidationError) {
                    if (srcObj[i][5].FieldValue == "0") {
                        blnZeroValue = true;
                    }
                    blnAllowSubmit = false;
                    break;
                }
                else {
                    seatDataObj.push({
                        "ResourceId": srcObj[i][0].FieldValue,
                        "Count": srcObj[i][5].FieldValue
                    });
                }
            }
            if (context.pageTarget == 2 && (srcObj[i][3].FieldValue == "true" || srcObj[i][4].FieldValue == "true")) {
                if (allresourceText.length == 0 || allresourceText.indexOf(srcObj[i][2].FieldValue) == -1) {
                    allresourceText.push(srcObj[i][2].FieldValue);
                    var isOptionalStr = srcObj[i][3].FieldValue == "true" ? "Required" : "Optional";
                    var valuestring = srcObj[i][2].FieldValue + " (Count-" + srcObj[i][5].FieldValue + ", " + isOptionalStr + ")";
                    seatResourceForList.push({
                        "Id": i,
                        "Value": valuestring
                    });
                    if (srcObj[i][0].FieldValue == 0 && srcObj[i][2].FieldValue != undefined) {
                        newResources.push({
                            "ResourceIndex": i,
                            "Resource": srcObj[i][2].FieldValue,
                            "Count": srcObj[i][5].FieldValue,
                            "IsRequired": srcObj[i][3].FieldValue
                        });
                    }
                    if (srcObj[i][0].FieldValue != 0) {
                        seatDataObj.push({
                            "ResourceIndex": i,
                            "Id": srcObj[i][0].FieldValue,
                            "Count": srcObj[i][5].FieldValue,
                            "IsRequired": srcObj[i][3].FieldValue
                        });
                    }
                    if (srcObj[i][2].FieldValue != undefined) {
                        cloneallResorceObj.push({
                            "ResourceIndex": i,
                            "ResourceId": srcObj[i][0].FieldValue,
                            "Resource": srcObj[i][2].FieldValue,
                            "Count": srcObj[i][5].FieldValue,
                            "IsRequired": srcObj[i][3].FieldValue
                        });
                    }
                }
                else {
                    issubmit = false;
                    context.notificationService.ShowToaster(" Resource item (" + srcObj[i][2].FieldValue + ") already exists", 2);
                    break;
                }
            }
        }
        if (this.pageTarget == 2) {
            if (issubmit == true)
                context.seatResourceAdd.emit({ seatResourcesforLst: seatResourceForList, existingResrc: seatDataObj, newResources: newResources, cloneallResrceObj: cloneallResorceObj });
        }
        else {
            if (blnAllowSubmit == false) {
                if (blnZeroValue == true) {
                    context.notificationService.ShowToaster("Count should be greater than zero", 2);
                }
                else {
                    context.notificationService.ShowToaster("Enter Resource Count", 2);
                }
            }
            else {
                this.scheduleService.saveSeatResources(this.selSeatIds, JSON.stringify(seatDataObj)).subscribe(function (resultData) {
                    if (resultData.StatusId == 1) {
                        context.notificationService.ShowToaster("Resource(s) updated to the selected Seat(s)", 3);
                        context.seatResourceAdd.emit({ existingResrc: seatDataObj });
                    }
                    else
                        context.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 2);
                });
            }
        }
    };
    SeatResources.prototype.onResourceAdd = function () {
        var tempSrcfieldObj = JSON.parse(JSON.stringify(this.sourceFieldObj[0]));
        var colCnt = 6;
        var context = this;
        tempSrcfieldObj.find(function (el) {
            switch (el.FieldId) {
                case 2063:
                    el.FieldValue = 0;
                    colCnt--;
                    break;
                case 2066:
                    el.FieldValue = true;
                    colCnt--;
                    break;
                case 2100:
                    el.FieldValue = undefined;
                    el.IsEnabled = true;
                    colCnt--;
                    break;
                case 2068:
                    el.FieldValue = false;
                    colCnt--;
                    break;
                case 2069:
                    el.FieldValue = false;
                    colCnt--;
                    break;
                case 2065:
                    el.FieldValue = null;
                    el.IsEnabled = true;
                    colCnt--;
                    break;
            }
            if (colCnt == 0) {
                context.sourceFieldObj.push(tempSrcfieldObj);
                context.itemSource.push({});
                return true;
            }
            else
                return false;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeatResources.prototype, "selSeatIds", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeatResources.prototype, "pageTarget", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeatResources.prototype, "resourcesCloneObj", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeatResources.prototype, "seatResourceAdd", void 0);
    SeatResources = __decorate([
        core_1.Component({
            selector: 'hotellingresource',
            templateUrl: './app/Views/Scheduling/Seat Booking/seatresourcelist.component.html',
            directives: [stringtextbox_component_1.StringTextBoxComponent, checkboxcomponent_component_1.CustomCheckBoxComponent],
            providers: [notify_service_1.NotificationService],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService])
    ], SeatResources);
    return SeatResources;
}());
exports.SeatResources = SeatResources;
//# sourceMappingURL=seatresourcelist.component.js.map
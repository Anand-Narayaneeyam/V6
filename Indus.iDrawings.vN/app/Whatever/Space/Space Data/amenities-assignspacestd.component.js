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
var space_service_1 = require('../../../Models/Space/space.service');
var stringtextbox_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var AmenityListComponent = (function () {
    function AmenityListComponent(schedulingService, spaceService, getData, notificationService) {
        this.schedulingService = schedulingService;
        this.spaceService = spaceService;
        this.getData = getData;
        this.notificationService = notificationService;
        this.isApprovalProcessSubscribed = false;
        this.IsNeedToCallCreation = true;
        this.IsChecked = false;
        this.reportFields = new Array();
        this.CheckedArray = new Array();
        this.amenityObj = new Array();
        this.strarrayList = new Array();
        this.emitAmenities = new core_1.EventEmitter();
    }
    AmenityListComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        this.reportFields.push({
            ReportFieldId: 539,
            Value: "0"
        });
        this.reportFields.push({
            ReportFieldId: 7449,
            Value: "0"
        });
        this.reportFields.push({
            ReportFieldId: 7435,
            Value: "0"
        });
        this.CheckedArray.push({
            ReportFieldId: 539,
            Value: this.SelectedFloorId[0].toString()
        });
        for (var i = 0; i < this.SelectedSpaceId.length; i++) {
            this.CheckedArray.push({
                ReportFieldId: 7449,
                Value: this.SelectedSpaceId[i].toString()
            });
        }
        this.CheckedArray.push({
            ReportFieldId: 7435,
            Value: "0"
        });
        contextObj.spaceService.getAmenitiesListForAssgnSpaceStd(JSON.stringify(this.reportFields)).subscribe(function (resultData) {
            contextObj.spaceService.getAmenitiesListForAssgnSpaceStd(JSON.stringify(contextObj.CheckedArray)).subscribe(function (resultchekeddata) {
                if (resultData["Data"]) {
                    if (resultchekeddata["Data"])
                        contextObj.checkeditemSource = JSON.parse(resultchekeddata["Data"].FieldBinderData);
                    contextObj.itemSource = JSON.parse(resultData["Data"].FieldBinderData);
                    if (contextObj.checkeditemSource && (contextObj.checkeditemSource.length == contextObj.itemSource.length))
                        contextObj.IsSelectAllChecked = true;
                    else
                        contextObj.IsSelectAllChecked = false;
                    console.log(contextObj.itemSource);
                    if (contextObj.itemSource != null) {
                        for (var i = 0; i < contextObj.itemSource.length; i++) {
                            contextObj.amenityObj.push({
                                Id: contextObj.itemSource[i].Id,
                                Amenity: contextObj.itemSource[i].Name
                            });
                            contextObj.strarrayList.push({
                                FormFieldId: 1,
                                FieldId: contextObj.itemSource[i].Id,
                                ReportFieldId: 0,
                                FieldLabel: "",
                                DataEntryControlId: 1,
                                GenericDataTypeId: 5,
                                Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[0-9,]+$" },
                                FieldValue: "",
                                LookupDetails: { LookupValues: null, PopupComponent: null },
                                IsMandatory: false,
                                IsVisible: true,
                                IsEnabled: false,
                                isContentHtml: "",
                                Precision: 0,
                                Scale: 0,
                                IsHiddenLabel: true,
                                Height: 30,
                                IsSigned: false,
                                RangeFrom: null,
                                RangeTo: null,
                                MaxLength: 3,
                                HelpText: "",
                                Width: "40",
                                IsGrouped: false,
                                HasChild: false,
                                ParentId: 0,
                                IsSubField: false,
                            });
                        }
                    }
                }
            });
        });
    };
    AmenityListComponent.prototype.ngAfterViewChecked = function () {
        var Contextobj = this;
        if (Contextobj.strarrayList.length > 0 && Contextobj.checkeditemSource.length > 0) {
            if (Contextobj.IsNeedToCallCreation)
                Contextobj.aftercreation();
        }
    };
    AmenityListComponent.prototype.aftercreation = function () {
        var Contextobj = this;
        for (var i = 0; i < Contextobj.itemSource.length; i++) {
            var elem = document.getElementById("amn" + Contextobj.itemSource[i].Id.toString());
            var IsExists = Contextobj.checkeditemSource.find(function (item) { return item.Id === Contextobj.itemSource[i].Id; });
            if (IsExists != undefined) {
                elem.checked = true;
                Contextobj.strarrayList[i].IsEnabled = true;
                if (Contextobj.strarrayList[i].FieldValue == "") {
                    Contextobj.strarrayList[i].FieldValue = "1";
                }
            }
        }
        Contextobj.IsNeedToCallCreation = false;
    };
    AmenityListComponent.prototype.selectAllOptions = function (event) {
        var contextObj = this;
        var blnAllChecked = false;
        if (event.srcElement.checked == true) {
            blnAllChecked = true;
        }
        else {
            blnAllChecked = false;
        }
        for (var i = 0; i < contextObj.itemSource.length; i++) {
            var elem = document.getElementById("amn" + contextObj.itemSource[i].Id.toString());
            if (elem) {
                if (blnAllChecked == true) {
                    elem.checked = true;
                    contextObj.strarrayList[i].IsEnabled = true;
                    if (contextObj.strarrayList[i].FieldValue == "") {
                        contextObj.strarrayList[i].FieldValue = "1";
                    }
                }
                else {
                    elem.checked = false;
                    contextObj.strarrayList[i].IsEnabled = false;
                    contextObj.strarrayList[i].FieldValue = "";
                }
            }
        }
    };
    AmenityListComponent.prototype.updateCheckedOptions = function (event) {
        var contextObj = this;
        var checkedCount = 0;
        var blnChecked = false;
        var itemSourceCount = 0;
        var checkid = event.srcElement.id.replace("amn", "");
        var strObj = contextObj.strarrayList.find(function (item) { return item.FieldId == checkid; });
        if (event.srcElement.checked == true) {
            strObj.IsEnabled = true;
            if (strObj.FieldValue == "") {
                strObj.FieldValue = "1";
            }
        }
        else {
            strObj.IsEnabled = false;
            strObj.FieldValue = "";
            contextObj.IsSelectAllChecked = false;
        }
        itemSourceCount = contextObj.itemSource.length;
        for (var i = 0; i < contextObj.itemSource.length; i++) {
            var elem = document.getElementById("amn" + contextObj.itemSource[i].Id.toString());
            if (elem) {
                if (elem.checked == true) {
                    checkedCount = checkedCount + 1;
                }
            }
        }
        var selectAllChk = document.getElementById("SelectAll");
        if (checkedCount == itemSourceCount) {
            if (selectAllChk) {
                selectAllChk.checked = true;
            }
        }
        else {
            if (selectAllChk) {
                selectAllChk.checked = false;
            }
        }
    };
    AmenityListComponent.prototype.onChangeInput = function (event) {
        var contextObj = this;
        if (event.txtBoxData.target.value.includes('.')) {
            event.txtBoxData.target.value = event.txtBoxData.target.value.replace('.', '');
        }
        //if (Number(event.txtBoxData.target.value) <= 0) {
        //    contextObj.notificationService.ShowToaster("Count should be greater than zero", 2);
        //}
    };
    AmenityListComponent.prototype.getKeyUp = function (event) {
        if (event.charCode >= 48 && event.charCode <= 57) {
        }
        else {
            if (event.charCode == 8 || event.charCode == 46) {
            }
            else {
                event.preventDefault();
            }
        }
    };
    AmenityListComponent.prototype.submitData = function (event) {
        var contextObj = this;
        var blnAllowSubmit = true;
        var blnZeroValue = false;
        contextObj.strAmenities = "";
        var count = 0;
        if (contextObj.itemSource != undefined) {
            for (var i = 0; i < contextObj.itemSource.length; i++) {
                var elem = document.getElementById("amn" + contextObj.itemSource[i].Id.toString());
                if (elem) {
                    if (elem.checked == true) {
                        var strObj = contextObj.strarrayList.find(function (item) { return item.FieldId == contextObj.itemSource[i].Id; });
                        count++;
                        if (strObj.FieldValue == "" || strObj.FieldValue == "0") {
                            if (strObj.FieldValue == "0") {
                                blnZeroValue = true;
                            }
                            blnAllowSubmit = false;
                            break;
                        }
                        else {
                            if (count == 0) {
                                contextObj.strAmenities = contextObj.itemSource[i].Id.toString() + "µ" + strObj.FieldValue + "µfalseµ§";
                            }
                            else {
                                contextObj.strAmenities = contextObj.strAmenities + contextObj.itemSource[i].Id.toString() + "µ" + strObj.FieldValue + "µfalseµ§";
                            }
                        }
                    }
                }
            }
            if (blnAllowSubmit == true) {
                if (contextObj.strAmenities != "") {
                    contextObj.notificationService.ShowToaster("Selected Amenities updated", 2);
                }
                contextObj.emitAmenities.emit(contextObj.strAmenities);
            }
            else {
                if (blnZeroValue == true) {
                    contextObj.notificationService.ShowToaster("Count should be greater than zero", 2);
                }
                else {
                    contextObj.notificationService.ShowToaster("Enter count for selected Amenities", 2);
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AmenityListComponent.prototype, "SelectedFloorId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AmenityListComponent.prototype, "SelectedSpaceId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AmenityListComponent.prototype, "RequestId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AmenityListComponent.prototype, "emitAmenities", void 0);
    AmenityListComponent = __decorate([
        core_1.Component({
            selector: 'Amenity-List',
            templateUrl: 'app/Views/Space/Space Data/amenities-assignspacestd.html',
            directives: [fieldGeneration_component_1.FieldComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, space_service_1.SpaceService, General_1.GeneralFunctions, validation_service_1.ValidateService, notify_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, space_service_1.SpaceService, General_1.GeneralFunctions, notify_service_1.NotificationService])
    ], AmenityListComponent);
    return AmenityListComponent;
}());
exports.AmenityListComponent = AmenityListComponent;
//# sourceMappingURL=amenities-assignspacestd.component.js.map
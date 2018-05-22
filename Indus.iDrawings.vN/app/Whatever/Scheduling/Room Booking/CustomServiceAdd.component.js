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
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var stringtextbox_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var dynamiclist_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dynamiclist.component');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var General_1 = require('../../../Models/Common/General');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var ServicesCustomadd = (function () {
    function ServicesCustomadd(SchedulingService, notificationService, generFun, _validateService) {
        this.SchedulingService = SchedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this._validateService = _validateService;
        this.Count = [];
        this.IsNeedToSubmit = true;
        this.IsNeedToCallCreation = true;
        this.ServiceList = new Array();
        this.Servicevalueforinsert = "";
        this.OriginalServicevalueforinsert = "";
        this.submitSuccess = new core_1.EventEmitter();
    }
    ServicesCustomadd.prototype.ngOnInit = function () {
        var Contextobj = this;
        Contextobj.IsNeedToSubmit = true;
        Contextobj.IsNeedToCallCreation = true;
        Contextobj.SchedulingService.GetAmenityOrServiceorCateringlist(2, 0, 0, 0).subscribe(function (data) {
            Contextobj.ServiceSource = JSON.parse(data.Data["FieldBinderData"]);
            var count = 0;
            var count1 = 1;
            if (Contextobj.Servicedata.length > 0)
                count = Contextobj.Servicedata.length;
            else if (Contextobj.ServiceSource.length > 0)
                count = Contextobj.ServiceSource.length;
            Contextobj.Count.push({
                Id: 0
            });
            if (Contextobj.Servicedata != undefined && Contextobj.Servicedata.length > 0) {
                for (var i = 0; i < Contextobj.Servicedata.length; i++) {
                    if (Contextobj.Servicedata[i].FieldId == 0) {
                        var fieldvalue = Contextobj.Servicedata[i].InsertValue.split("µ")[0];
                        var Totalcount = Contextobj.Servicedata[i].InsertValue.split("µ")[2];
                        var Ischecked = Contextobj.Servicedata[i].InsertValue.split("µ")[1];
                    }
                    else {
                        //var fieldvalue = Contextobj.AmnietySource.find(function (item) { return item.Id === Contextobj.Amenietydata[i].FieldId })
                        var fieldvalue = Contextobj.Servicedata[i].Value.split("(")[0];
                        var Totalcount = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[2];
                        var Ischecked = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[1];
                    }
                    var FieldID = Contextobj.Servicedata[i].FieldId;
                    Contextobj.ServiceList.push({
                        FormFieldId: 1,
                        FieldId: FieldID,
                        ReportFieldId: 1,
                        FieldLabel: "Service",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                        Format: { FormatString: null, RegularExpression: null, Id: null },
                        FieldValue: fieldvalue,
                        LookupDetails: { LookupValues: null, PopupComponent: null },
                        IsMandatory: false,
                        IsVisible: true,
                        IsEnabled: true,
                        IsValidated: false,
                        isContentHtml: "",
                        Precision: 0,
                        Scale: 0,
                        Height: 25,
                        IsSigned: false,
                        RangeFrom: null,
                        RangeTo: null,
                        HelpText: "",
                        IsGrouped: false,
                        HasChild: false,
                        ParentId: 0,
                        IsSubField: false,
                    });
                }
                if (Contextobj.ServiceSource != undefined) {
                    var _loop_1 = function(i) {
                        fieldvalue = Contextobj.Servicedata.find(function (item) { return item.FieldId === Contextobj.ServiceSource[i].Id; });
                        if (fieldvalue == undefined) {
                            Contextobj.ServiceList.push({
                                FormFieldId: i,
                                FieldId: Contextobj.ServiceSource[i].Id,
                                ReportFieldId: i,
                                FieldLabel: "Service",
                                DataEntryControlId: 1,
                                GenericDataTypeId: 6,
                                Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                                Format: { FormatString: null, RegularExpression: null, Id: null },
                                FieldValue: Contextobj.ServiceSource[i].Value,
                                LookupDetails: { LookupValues: null, PopupComponent: null },
                                IsMandatory: false,
                                IsVisible: true,
                                IsEnabled: false,
                                IsValidated: false,
                                isContentHtml: "",
                                Precision: 0,
                                Scale: 0,
                                Height: 25,
                                IsSigned: false,
                                RangeFrom: null,
                                RangeTo: null,
                                HelpText: "",
                                IsGrouped: false,
                                HasChild: false,
                                ParentId: 0,
                                IsSubField: false,
                            });
                        }
                    };
                    var fieldvalue;
                    for (var i = 0; i < Contextobj.ServiceSource.length; i++) {
                        _loop_1(i);
                    }
                }
            }
            else if (Contextobj.ServiceSource != undefined) {
                for (var i = 0; i < Contextobj.ServiceSource.length; i++) {
                    Contextobj.ServiceList.push({
                        FormFieldId: i,
                        FieldId: Contextobj.ServiceSource[i].Id,
                        ReportFieldId: i,
                        FieldLabel: "Service",
                        DataEntryControlId: 1,
                        GenericDataTypeId: 6,
                        Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                        Format: { FormatString: null, RegularExpression: null, Id: null },
                        FieldValue: Contextobj.ServiceSource[i].Value,
                        LookupDetails: { LookupValues: null, PopupComponent: null },
                        IsMandatory: false,
                        IsVisible: true,
                        IsEnabled: false,
                        IsValidated: false,
                        isContentHtml: "",
                        Precision: 0,
                        Scale: 0,
                        Height: 25,
                        IsSigned: false,
                        RangeFrom: null,
                        RangeTo: null,
                        HelpText: "",
                        IsGrouped: false,
                        HasChild: false,
                        ParentId: 0,
                        IsSubField: false,
                    });
                }
                Contextobj.length = count;
            }
            else {
                Contextobj.ServiceList.push({
                    FormFieldId: 1,
                    FieldId: 0,
                    ReportFieldId: 1,
                    FieldLabel: "Service",
                    DataEntryControlId: 1,
                    GenericDataTypeId: 6,
                    Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                    Format: { FormatString: null, RegularExpression: null, Id: null },
                    FieldValue: "",
                    LookupDetails: { LookupValues: null, PopupComponent: null },
                    IsMandatory: false,
                    IsVisible: true,
                    IsEnabled: true,
                    IsValidated: false,
                    isContentHtml: "",
                    Precision: 0,
                    Scale: 0,
                    Height: 25,
                    IsSigned: false,
                    RangeFrom: null,
                    RangeTo: null,
                    HelpText: "",
                    IsGrouped: false,
                    HasChild: false,
                    ParentId: 0,
                    IsSubField: false,
                });
                Contextobj.length = count;
            }
            Contextobj.length = count;
        });
        //Contextobj.aftercreation();                
    };
    ServicesCustomadd.prototype.ngAfterViewChecked = function () {
        var Contextobj = this;
        if (Contextobj.ServiceList.length > 0 && Contextobj.Servicedata.length > 0) {
            if (Contextobj.IsNeedToCallCreation)
                Contextobj.aftercreation();
        }
    };
    ServicesCustomadd.prototype.onServiceAdd = function (event, Amenitytable) {
        var Contextobj = this;
        var count;
        var count1 = 1;
        //if (Contextobj.Amenietydata.length > 0)
        //    count = Contextobj.Amenietydata.length;
        //else if (Contextobj.AmnietySource.length > 0)
        //    count = Contextobj.AmnietySource.length;
        //else
        //    count = 0;
        if (Contextobj.ServiceList.length > 0 && Contextobj.ServiceList[Contextobj.ServiceList.length - 1].FieldValue != "") {
            Contextobj.Count.push({
                Id: Contextobj.length++
            });
            Contextobj.ServiceList.push({
                FormFieldId: Contextobj.length,
                FieldId: 0,
                ReportFieldId: Contextobj.length,
                FieldLabel: "Service",
                DataEntryControlId: 1,
                GenericDataTypeId: 6,
                Whitelist: { Id: 3, FormatString: null, RegularExpression: "^[a-zA-Z0-9!@#$%&()/+=\\s\\:.,?_-]+$" },
                Format: { FormatString: null, RegularExpression: null, Id: null },
                FieldValue: "",
                LookupDetails: { LookupValues: null, PopupComponent: null },
                IsMandatory: false,
                IsVisible: true,
                IsEnabled: true,
                IsValidated: false,
                isContentHtml: "",
                Precision: 0,
                Scale: 0,
                Height: 25,
                IsSigned: false,
                RangeFrom: null,
                RangeTo: null,
                HelpText: "",
                IsGrouped: false,
                HasChild: false,
                ParentId: 0,
                IsSubField: false,
            });
            Contextobj.length = Contextobj.length;
        }
    };
    ServicesCustomadd.prototype.OnsubmitValue = function (event, Amenitytable) {
        var Contextobj = this;
        Contextobj.IsNeedToSubmit = true;
        Contextobj.length = Contextobj.ServiceList.length;
        var validationno = 0;
        var arrayList2 = new Array();
        var Servicetxtbox = "txtService";
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        var txtCountvalue = "1";
        var chekboxname;
        var Required;
        var tempvalues;
        var temporiginalvalues = "";
        var temparrayvalue;
        for (var i = 0; i < Contextobj.length; i++) {
            var Servicedetails = document.getElementById(Servicetxtbox + i.toString());
            if (Contextobj.ServiceList[i].FieldId != undefined && Contextobj.ServiceList[i].FieldId > 0) {
                var ServiceIdvalue = Contextobj.ServiceList[i].FieldId;
                var Servicetextvalue = Contextobj.ServiceList[i].FieldValue;
            }
            else {
                if (Contextobj.ServiceList[i].FieldValue != "")
                    var ServiceIdvalue = Contextobj.ServiceList[i].FieldId;
                var Servicetextvalue = Contextobj.ServiceList[i].FieldValue;
            }
            var chkRequireddetails = document.getElementById(chkRequired + i.toString());
            var chkRequiredvalue = chkRequireddetails.checked;
            var chkOptionaldetails = document.getElementById(chkOptional + i.toString());
            var chkOptionalvalue = chkOptionaldetails.checked;
            if (Contextobj.ServiceList[i].HasValidationError == false) {
                if (Servicetextvalue == "" || chkRequiredvalue == false && chkOptionalvalue == false) {
                    if (Servicetextvalue == "") {
                        Contextobj.IsNeedToSubmit = false;
                        validationno = 1;
                    }
                    if (Contextobj.ServiceList[i].FieldId == 0) {
                        if (chkRequiredvalue == false && chkOptionalvalue == false) {
                            Contextobj.IsNeedToSubmit = false;
                            validationno = 2;
                        }
                    }
                    if (Servicetextvalue == "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                        validationno = 0;
                        Contextobj.IsNeedToSubmit = true;
                        if (Contextobj.ServiceList[i].FieldId > 0) {
                            if (chkRequiredvalue == false && chkOptionalvalue == false) {
                                Contextobj.IsNeedToSubmit = false;
                                validationno = 2;
                            }
                        }
                    }
                    else {
                        if (Servicetextvalue != "" && chkRequiredvalue == false && chkOptionalvalue == false) {
                            validationno = 0;
                            Contextobj.IsNeedToSubmit = true;
                            if (Contextobj.ServiceList[i].FieldId > 0) {
                                if (chkRequiredvalue == false && chkOptionalvalue == false) {
                                    Contextobj.IsNeedToSubmit = false;
                                    validationno = 2;
                                }
                            }
                        }
                    }
                }
                else {
                    if (chkRequiredvalue == true && chkOptionalvalue == false) {
                        Required = "true";
                        chekboxname = "Required";
                    }
                    else {
                        Required = "false";
                        chekboxname = "Optional";
                    }
                    if (ServiceIdvalue != undefined && ServiceIdvalue > 0) {
                        temporiginalvalues = ServiceIdvalue + "µ" + Required + "µ" + txtCountvalue + "µ§";
                        tempvalues = "";
                    }
                    else {
                        tempvalues = Servicetextvalue + "µ" + Required + "µ" + txtCountvalue + "µ§";
                        temporiginalvalues = "";
                    }
                    temparrayvalue = Servicetextvalue + " (" + chekboxname + ")";
                    arrayList2.push({
                        Id: i,
                        Value: temparrayvalue,
                        InsertValue: tempvalues,
                        InsertOriginalValue: temporiginalvalues,
                        FieldId: ServiceIdvalue
                    });
                    if (ServiceIdvalue != undefined && ServiceIdvalue > 0)
                        Contextobj.OriginalServicevalueforinsert = Contextobj.OriginalServicevalueforinsert + temporiginalvalues;
                    else
                        Contextobj.Servicevalueforinsert = Contextobj.Servicevalueforinsert + tempvalues;
                }
                if (arrayList2.length > 0)
                    Contextobj.IsNeedToSubmit = true;
                else if (i == (Contextobj.length - 1) && arrayList2.length == 0) {
                    Contextobj.IsNeedToSubmit = false;
                    validationno = 2;
                }
            }
            else
                Contextobj.IsNeedToSubmit = false;
        }
        if (Contextobj.IsNeedToSubmit == true) {
            var InsertValues = [];
            var uniquesData = [];
            var tempServicedata = [];
            tempServicedata = arrayList2;
            var index;
            for (var j = 0; j < tempServicedata.length; j++) {
                index = InsertValues.indexOf(tempServicedata[j].Value);
                if (index == -1) {
                    InsertValues.push(tempServicedata[j].Value);
                    uniquesData.push(tempServicedata[j]);
                }
                else {
                    uniquesData[index].DIFF += tempServicedata[j].DIFF;
                    var temptxtvalue = tempServicedata[j].Value.split("(")[0].trim();
                }
            }
            tempServicedata = uniquesData;
            if (arrayList2.length == tempServicedata.length)
                Contextobj.submitSuccess.emit({ "Servicevalue": Contextobj.Servicevalueforinsert, "arrayList": arrayList2, "OriginalServicevalue": Contextobj.OriginalServicevalueforinsert });
            else
                Contextobj.notificationService.ShowToaster("Service Item(" + temptxtvalue + ")already exists", 2);
        }
        else if (Contextobj.IsNeedToSubmit == false) {
            if (validationno == 1) {
                Contextobj.notificationService.ShowToaster("Enter a Service Item", 2);
                validationno = 0;
            }
            else if (validationno == 2) {
                Contextobj.notificationService.ShowToaster("Select a Service", 2);
                validationno = 0;
            }
        }
    };
    ServicesCustomadd.prototype.initiateValidation = function (fieldObject) {
        var contextObj = this;
        var el = document.getElementById(fieldObject.FieldId.toString());
        if (el != null && el != undefined) {
            setTimeout(function () {
                contextObj._validateService.initiateValidation(fieldObject, contextObj, true, el);
            }, 100);
        }
    };
    ServicesCustomadd.prototype.txtBoxChange = function (event) {
        //if (event.fieldObject.FieldValue != null && event.fieldObject.FieldValue != undefined) {
        /* event.fieldObject.IsLocallyValidated = false;
         this.initiateValidation(event.fieldObject);       */
        //}
    };
    ServicesCustomadd.prototype.aftercreation = function () {
        var Contextobj = this;
        var chkRequired = "chkRequired";
        var chkOptional = "chkOptional";
        for (var i = 0; i < Contextobj.Servicedata.length; i++) {
            if (Contextobj.Servicedata[i].FieldId == 0) {
                var fieldvalue = Contextobj.Servicedata[i].InsertValue.split("µ")[0];
                var Totalcount = Contextobj.Servicedata[i].InsertValue.split("µ")[2];
                var Ischecked = Contextobj.Servicedata[i].InsertValue.split("µ")[1];
            }
            else {
                Contextobj.ServiceList[i].IsEnabled = false;
                var fieldvalue = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[0];
                var Totalcount = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[2];
                var Ischecked = Contextobj.Servicedata[i].InsertOriginalValue.split("µ")[1];
            }
            var chkRequireddetails = document.getElementById(chkRequired + i.toString());
            var chkOptionaldetails = document.getElementById(chkOptional + i.toString());
            if (Ischecked == "true") {
                chkRequireddetails.checked = true;
                chkOptionaldetails.disabled = true;
            }
            else {
                chkOptionaldetails.checked = true;
                chkRequireddetails.disabled = true;
            }
        }
        Contextobj.IsNeedToCallCreation = false;
    };
    ServicesCustomadd.prototype.chkRequiredclick = function (event) {
        var contextObj = this;
        var Ischecked = event["target"].checked;
        var tempid = event["target"].id;
        var ChkOptionalId = tempid.replace("chkRequired", "chkOptional");
        var ChkOptional = document.getElementById(ChkOptionalId);
        if (Ischecked == true)
            ChkOptional.disabled = true;
        else
            ChkOptional.disabled = false;
        var Id = event["target"].id.split("d")[1];
    };
    ServicesCustomadd.prototype.chkOptionalclick = function (event) {
        var contextObj = this;
        var Ischecked = event["target"].checked;
        var tempid = event["target"].id;
        var chkRequiredId = tempid.replace("chkOptional", "chkRequired");
        var chkRequired = document.getElementById(chkRequiredId);
        if (Ischecked == true)
            chkRequired.disabled = true;
        else
            chkRequired.disabled = false;
        var Id = event["target"].id.split("l")[1];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ServicesCustomadd.prototype, "Servicedata", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ServicesCustomadd.prototype, "submitSuccess", void 0);
    ServicesCustomadd = __decorate([
        core_1.Component({
            selector: 'CustomServiceAdd',
            templateUrl: './app/Views/Scheduling/Room Booking/CustomServiceAdd.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, notify_component_1.Notification, slide_component_1.SlideComponent, dynamiclist_component_1.DynamicListComponent, split_view_component_1.SplitViewComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [http_1.HTTP_PROVIDERS, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService],
        }), 
        __metadata('design:paramtypes', [scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, validation_service_1.ValidateService])
    ], ServicesCustomadd);
    return ServicesCustomadd;
}());
exports.ServicesCustomadd = ServicesCustomadd;
//# sourceMappingURL=CustomServiceAdd.component.js.map
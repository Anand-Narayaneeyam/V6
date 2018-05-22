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
var stringtextbox_component_1 = require('../../../Framework/Whatever/Search/stringtextbox.component');
var keywordtextbox_1 = require('../../../Framework/Whatever/Search/keywordtextbox');
var integertextbox_component_1 = require('../../../Framework/Whatever/Search/integertextbox.component');
var numerictextbox_component_1 = require('../../../Framework/Whatever/Search/numerictextbox.component');
var datetimecomponent_component_1 = require('../../../Framework/Whatever/Search/datetimecomponent.component');
var split_view_component_1 = require('../../../Framework/Whatever/Split-View/split-view.component');
var date_component_1 = require('../../../Framework/Whatever/Search/date.component');
var datecomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/datecomponent.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var displaySettings_pipe_1 = require('../../../Framework/Whatever/Common/displaySettings.pipe');
var scheduling_service_1 = require('../../../Models/Scheduling/scheduling.service');
var General_1 = require('../../../Models/Common/General');
var listboxforsearch_component_1 = require('../../../framework/whatever/search/listboxforsearch.component');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var Searchforschedule = (function () {
    function Searchforschedule(validateService, schedulingService, notificationService, generFun, myElement) {
        this.validateService = validateService;
        this.schedulingService = schedulingService;
        this.notificationService = notificationService;
        this.generFun = generFun;
        this.disableDates = ["Sunday", "Saturday"];
        this.listFilter = '';
        this.selectedValue = "";
        this.clickFilter = false;
        this.IsAvailable = false;
        this.IsClasschange = false;
        this.filter = '';
        this.linkname = '';
        this.Fromdate = [];
        this.Todate = [];
        this.FromTime = [];
        this.ToTime = [];
        this.arrayList = new Array();
        this.showKeywordSearch = "none";
        this.showKeywordSearchwidth = 0;
        this.message = "";
        this.SaveAs = new core_1.EventEmitter();
        this.loadAdvanceSearch = new core_1.EventEmitter();
        this.Delete = new core_1.EventEmitter();
        this.onloadSearch = new core_1.EventEmitter();
        this.Submit = new core_1.EventEmitter();
        this.Clear = new core_1.EventEmitter();
        this.showStyle = "none";
        this.setDisable = false;
        this.marginLeftFilter = '0';
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.query = '';
        this.filteredList = [];
        this.elementRef = myElement;
        this.datasource;
    }
    Searchforschedule.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes["showSearchFilter"] && changes["showSearchFilter"]["currentValue"]) {
            if (changes["showSearchFilter"]["currentValue"].length > 0) {
                if (changes["showSearchFilter"]["currentValue"])
                    this.showStyle = "block";
                this.showSearchFilter = [];
                return;
            }
            else
                return;
        }
        this.KeywordFields = this.KeywordFields;
        if (this.KeywordFields != undefined) {
            this.KeywordFields[0].FieldLabel = "Keyword Search";
            this.Customsearch = false;
        }
        this.keyWordLookupValues = this.keyWordLookup;
        if (this.searchtype == null || this.searchtype == undefined) {
            this.searchtype = "Grid";
        }
        if (this.datasource != undefined || null) {
            this.datasource2 = JSON.parse(JSON.stringify(this.datasource));
            this.datasource2.forEach(function (nos) {
                if (nos.IsDisabled != false) {
                    nos.IsDisabled = false;
                }
                if (nos.IsValidated = true) {
                    nos.IsValidated = false;
                    if (nos.GenericDataTypeId == 2) {
                        nos.DataEntryControlId = 2;
                    }
                    if (nos.GenericDataTypeId == 3) {
                        nos.DataEntryControlId = 8;
                    }
                    if (nos.GenericDataTypeId == 4) {
                        nos.DataEntryControlId = 1;
                    }
                }
                if (_this.configure != undefined) {
                    if (_this.configure.indexOf(nos.ReportFieldId) > -1) {
                        nos.IsVisible = false;
                        nos.FieldValue = "";
                    }
                }
            });
        }
    };
    Searchforschedule.prototype.ngOnInit = function () {
        var contextObj = this;
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE");
        if (this.isShowDefaultEndTime == undefined || this.isShowDefaultEndTime == null)
            this.isShowDefaultEndTime = false;
        if ((/Edge/.test(navigator.userAgent)) || (/msie|Trident/.test(navigator.userAgent))) {
            msie = 1;
        }
        if (msie > 0) {
            if (this.Customsearch == false)
                this.marginLeftFilter = '-700';
        }
        //else {
        //    console.log("chrome");
        //}
        this.validateService.getBlacklist().subscribe(function (resultData) {
            contextObj.validationData = resultData;
        });
        if (this.isShowConfigure == undefined || this.isShowConfigure == null) {
            this.isShowConfigure = true;
        }
        contextObj.Classname = "filtercustom-content";
        this.disable;
        this.keyWordLookupValues = this.keyWordLookup;
        this.dataKey;
        if (this.Target == 2) {
            //  this.Title = "Search Team Room";
            this.linkname = "Filter";
        }
        else if (this.Target == 1) {
            //  this.Title = "Search Workspace";
            this.linkname = "Filter";
        }
        else if (this.Target == 3) {
            // this.Title = "Search Equipment";
            this.linkname = "Filter";
        }
        if (this.Title == undefined || this.Title == null)
            this.Title = "Adavnce Search";
        if (this.searchtype == null || this.searchtype == undefined) {
            this.searchtype = false;
        }
        if (this.datasource != undefined || null) {
            this.datasource2 = JSON.parse(JSON.stringify(this.datasource));
            this.datasource2.forEach(function (nos) {
                if (nos.IsDisabled != false) {
                    nos.IsDisabled = false;
                }
            });
        }
        if (this.Key == "" || this.Key == null) {
            this.Key = 1;
        }
        debugger;
        contextObj.setinitialFromAndToValues();
        contextObj.schedulingService.getseatbookingListfields().subscribe(function (resultData) {
            resultData["Data"].find(function (item) {
                if (item.ReportFieldId == 6731 || item.ReportFieldId == 793 || item.ReportFieldId == 540)
                    item.isContentHtml = "hyperlink";
                if (item.ReportFieldId == 789 || item.ReportFieldId == 790 || item.ReportFieldId == 6723) {
                    item.IsHiddenLabel = true;
                    item.Width = 100;
                    if (item.ReportFieldId == 789)
                        item.Width = 110;
                }
            });
            contextObj.fieldObject = (resultData["Data"]);
            resultData["Data"].find(function (item) {
                var fieldid = [1687, 1688, 1695, 1696, 2041];
                contextObj.NotshwingIngrid = contextObj.fieldObject.filter(function (el) {
                    return fieldid.indexOf(el["FieldId"]) > -1;
                });
            });
            resultData["Data"].find(function (item) {
                var fieldid = [1687, 1688, 1695, 1696, 2041];
                contextObj.fieldObject = contextObj.fieldObject.filter(function (el) {
                    return fieldid.indexOf(el["FieldId"]) == -1;
                });
            });
            //contextObj.fieldObject = contextObj.fieldObject.filter(function (item) { return contextObj.NotshwingIngrid.indexOf(item.FieldId) });
            contextObj.NotshwingIngrid.find(function (item) {
                switch (item.FieldId) {
                    case 1687:
                        contextObj.Fromdate.push({});
                        contextObj.Fromdate[0] = item;
                        break;
                    case 1688:
                        contextObj.Todate.push({});
                        contextObj.Todate[0] = item;
                        break;
                    case 1695:
                        contextObj.FromTime.push({});
                        contextObj.FromTime[0] = item;
                        contextObj.FromTime[0].LookupDetails.LookupValues.splice(26, 26);
                        break;
                    case 1696:
                        contextObj.ToTime.push({});
                        contextObj.ToTime[0] = item;
                        contextObj.ToTime[0].LookupDetails.LookupValues.splice(0, 1);
                        break;
                }
            });
            //contextObj.Availablity = contextObj.fieldObject.splice(18, 19);
            //contextObj.ToTime = contextObj.fieldObject.splice(17,18);
            //contextObj.FromTime = contextObj.fieldObject.splice(16,17);
            //contextObj.Todate = contextObj.fieldObject.splice(15, 16);
            //contextObj.Fromdate = contextObj.fieldObject.splice(14, 15);
            contextObj.setFromTimeAndTotimeFieldValue(contextObj);
        });
    };
    Searchforschedule.prototype.setinitialFromAndToValues = function () {
        debugger;
        var contextObj = this;
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        if (m > 30) {
            n = n + 1;
            contextObj.timeid = (n * 2);
        }
        else
            contextObj.timeid = (n * 2) + 1;
        if (contextObj.timeid >= 38)
            contextObj.timeid = 12;
        var t = new Date();
        t.setDate(t.getDate() + 1);
        var tommorowdate = contextObj.getFormattedDate(t);
        var todaydate = contextObj.getFormattedDate(new Date());
        this.TommorrowDate = tommorowdate;
        this.Dateforcalender = todaydate;
        if (contextObj.timeid == 12) {
            this.FromDate = tommorowdate;
            this.ToDate = tommorowdate;
        }
        else {
            this.FromDate = todaydate;
            this.ToDate = todaydate;
        }
        this.SearchToDate = todaydate;
    };
    Searchforschedule.prototype.setFromTimeAndTotimeFieldValue = function (contextObj) {
        if (contextObj.timeid == 12) {
            contextObj.Fromdate[0].FieldValue = contextObj.TommorrowDate;
            contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
        }
        else if (contextObj.timeid >= 38)
            contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
        contextObj.FromTime[0].FieldValue = contextObj.FromTime[0].LookupDetails.LookupValues[contextObj.timeid - 12].Id.toString();
        var totimeid;
        if (contextObj.timeid >= 38)
            totimeid = 12;
        else
            totimeid = contextObj.timeid + 1;
        var lookupData = contextObj.ToTime[0].LookupDetails.LookupValues;
        if (contextObj.isShowDefaultEndTime)
            contextObj.ToTime[0].FieldValue = lookupData[lookupData.length - 1].Id.toString();
        else
            contextObj.ToTime[0].FieldValue = lookupData[totimeid - 13].Id.toString();
    };
    Searchforschedule.prototype.getAnchorTagEnter = function (id, e) {
        debugger;
        if (!e)
            e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            if (id == "1") {
                this.showFilter();
            }
            else if (id = "2") {
                this.onSubmit(e);
            }
            else if (id == "3") {
                this.onSubmit(e);
            }
        }
    };
    Searchforschedule.prototype.handleKeyboardEvents = function (e) {
        if (!e)
            e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '27') {
            if (this.showStyle == "block") {
                this.showStyle = "none";
            }
        }
    };
    Searchforschedule.prototype.getFormattedDate = function (dt) {
        var strDate = "";
        var date;
        if (dt != undefined) {
            date = new Date(dt);
        }
        else {
            date = new Date();
        }
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mon = monthNames[date.getMonth()];
        var yy = date.getFullYear();
        strDate = dd + " " + mon + " " + yy;
        return strDate;
    };
    Searchforschedule.prototype.divClicked = function (event, target) {
        var contextObj = this;
        var date = event["FieldObject"]["FieldValue"];
        if (target == 1) {
            this.FromDate = date;
            contextObj.Todate[0].FieldValue = event["FieldObject"]["FieldValue"];
            var ind = 2;
            if (contextObj.Target == 1 || contextObj.Target == 3) {
                ind = 3;
            }
            var elemParent = document.getElementById("toDateSearchcustomesearch");
            var elemArr = elemParent.getElementsByClassName("date-picker");
            if (elemArr && elemArr.length > 0) {
                var elem = elemArr[0];
                if (elem != null && elem != undefined) {
                    elem.value = event["FieldObject"]["FieldValue"];
                    this.ToDate = date;
                }
            }
        }
        else {
            this.ToDate = date;
        }
        this.SearchToDate = date;
        if (target == 2) {
            contextObj.IsClasschange = !contextObj.IsClasschange;
            if (contextObj.IsClasschange)
                contextObj.Classname = "filtercustom-contentchange";
            else
                contextObj.Classname = "filtercustom-content";
        }
    };
    Searchforschedule.prototype.Iconclicked = function (event) {
        var contextObj = this;
        contextObj.IsClasschange = !contextObj.IsClasschange;
        if (contextObj.IsClasschange)
            contextObj.Classname = "filtercustom-contentchange";
        else
            contextObj.Classname = "filtercustom-content";
    };
    Searchforschedule.prototype.onChangefrom = function (event) {
        var contextObj = this;
        if (event != "-1") {
            var timeid = parseInt(event);
            if (event == "39") {
                timeid = 13;
                contextObj.Todate[0].FieldValue = contextObj.TommorrowDate;
            }
            else
                contextObj.Todate[0].FieldValue = contextObj.ToDate;
            contextObj.ToTime[0].FieldValue = contextObj.ToTime[0].LookupDetails.LookupValues[timeid - 13].Id.toString();
            var ele = document.getElementsByClassName("ddl ng-invalid ng-dirty ng-touched");
            if (ele.length > 0) {
                var focusingElmt = ele[ele.length - 1];
                focusingElmt.focus();
                this.validateService.initiateValidation(this.ToTime[0], this, true, focusingElmt);
            }
        }
    };
    Searchforschedule.prototype.showFilter = function () {
        this.clickFilter;
        this.showKeywordSearch = "none";
        this.showKeywordSearchwidth = 0;
        if (this.clickFilter == false) {
            this.clickFilter = true;
            this.loadAdvanceSearch.emit({});
        }
        if (this.showStyle == "none") {
            this.showStyle = "block";
            this.setDateTimeAsInput();
            if (this.FromTime[0].FieldValue == "-1" || this.ToTime[0].FieldValue == "-1")
                this.setFromTimeAndTotimeFieldValue(this);
        }
        else if (this.showStyle == "block") {
            this.showStyle = "none";
        }
    };
    Searchforschedule.prototype.setDateTimeAsInput = function () {
        if (this.fromDateInput != undefined && this.fromDateInput != null) {
            this.Fromdate[0].FieldValue = this.fromDateInput;
        }
        if (this.toDateInput != undefined && this.toDateInput != null) {
            this.Todate[0].FieldValue = this.toDateInput;
        }
        if (this.fromTimeInput != undefined && this.fromTimeInput != null) {
            this.FromTime[0].FieldValue = this.fromTimeInput;
        }
        if (this.toTimeInput != undefined && this.toTimeInput != null) {
            this.ToTime[0].FieldValue = this.toTimeInput;
        }
    };
    Searchforschedule.prototype.onKeysearch = function () {
        var checkForErrors = function (fieldObject) {
            return fieldObject.HasValidationError;
        };
        if (this.KeywordFields.find(checkForErrors)) {
            return;
        }
        this.KeywordFields;
        if (this.KeywordFields[0].FieldValue == null) {
            this.KeywordFields[0].FieldValue = "";
        }
        this.onloadSearch.emit({
            value: this.KeywordFields[0].FieldValue,
        });
    };
    Searchforschedule.prototype.selectSearch = function (item) {
        this.query = item;
        this.filteredList = [];
    };
    Searchforschedule.prototype.handleClick = function (event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    };
    Searchforschedule.prototype.drpLoadSearch = function (value) {
        this.selectedValue = value;
        this.onloadSearch.emit({
            value: value,
        });
    };
    Searchforschedule.prototype.onSubmit = function (value) {
        debugger;
        var contextObj = this;
        var fromtime = contextObj.FromTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.FromTime[0].FieldValue)); });
        var totime = contextObj.ToTime[0].LookupDetails.LookupValues.filter(function (item) { return (item.Id === parseInt(contextObj.ToTime[0].FieldValue)); });
        var fromdateTime = contextObj.FromDate + fromtime[0].Value;
        var todateTime = contextObj.ToDate + totime[0].Value;
        var checkForErrors = function (fieldObject) {
            return fieldObject.HasValidationError;
        };
        if (this.datasource2.find(checkForErrors)) {
            return;
        }
        //date checking ----
        // (contextObj.FromDate == contextObj.ToDate) && --//bugid 78340
        if (new Date(contextObj.FromDate) > new Date(contextObj.ToDate)) {
            //contextObj.notificationService.ShowToaster("To date must be greater than From date", 2);
            contextObj.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
        }
        else if (fromtime && totime && (Number(fromtime[0].Id) >= Number(totime[0].Id))) {
            //contextObj.notificationService.ShowToaster("To time must be greater than From time", 2);
            contextObj.notificationService.ShowToaster("To date and time must be greater than the From date and time", 2);
        }
        else {
            var fieldobj = new Array();
            var obj = new General_1.GeneralFunctions();
            var item;
            var fieldValue;
            if (this.datasource2.length > 0) {
                for (var i = 0; i < this.datasource2.length; i++) {
                    item = this.datasource2[i];
                    if (item['DataEntryControlId'] == 7) {
                        var searchListboxvalues = "";
                        if (item.MultiFieldValues != undefined && item.MultiFieldValues != null && item.MultiFieldValues.length > 0) {
                            for (var j = 0; j < item.MultiFieldValues.length; j++) {
                                if (j == item.MultiFieldValues.length - 1)
                                    searchListboxvalues += item.MultiFieldValues[j];
                                else
                                    searchListboxvalues += item.MultiFieldValues[j] + ",";
                            }
                        }
                        item['FieldValue'] = "ÈµÉ" + searchListboxvalues + "Ê";
                        fieldobj.push({ ReportFieldId: item.ReportFieldId, FieldValue: item.FieldValue });
                    }
                    else if (item['DataEntryControlId'] == 20) {
                        fieldValue = item.FieldValue;
                        var index = item.LookupDetails.LookupValues.findIndex(function (el) { return el.Id == fieldValue; });
                        if (index != -1) {
                            var rbtnValue = item.LookupDetails.LookupValues[index]['Value'];
                            rbtnValue = "Ñµô¥" + rbtnValue + "¥ô";
                            fieldobj.push({ ReportFieldId: item.ReportFieldId, FieldValue: rbtnValue });
                        }
                    }
                    else if (item['DataEntryControlId'] == 2 || item['DataEntryControlId'] == 8) {
                        if (item.FieldValue != null && item.FieldValue != "") {
                            var dateSplit = item.FieldValue.split("ô");
                            if (dateSplit.length > 3) {
                                var textToBeShown = item['DataEntryControlId'] == 2 ? "To date must be greater than the From date in " : "To date and time must be greater than the From date and time in ";
                                if (new Date(dateSplit[1]) >= new Date(dateSplit[3])) {
                                    contextObj.notificationService.ShowToaster(textToBeShown + item.FieldLabel, 2);
                                    return;
                                }
                                else {
                                    fieldobj.push({ ReportFieldId: item.ReportFieldId, FieldValue: item.FieldValue });
                                }
                            }
                            else {
                                fieldobj.push({ ReportFieldId: item.ReportFieldId, FieldValue: item.FieldValue });
                            }
                        }
                        else if (item.ReportFieldId == 6714) {
                            fieldValue = "æµô" + fromdateTime + "ô ÿ ô" + todateTime + "ô";
                            fieldobj.push({ ReportFieldId: item.ReportFieldId, FieldValue: fieldValue });
                        }
                    }
                    else {
                        fieldobj.push({ ReportFieldId: item.ReportFieldId, FieldValue: item.FieldValue });
                    }
                }
            }
            var retObj;
            if (this.fileObj != null) {
                retObj = obj.getFieldValuesAsReportFieldArrayForFileUpload({ "fieldobject": fieldobj, "filedata": this.fileObj });
                this.reportFieldArray = retObj["fieldobject"];
            }
            else {
                this.reportFieldArray = obj.getFieldValuesAsReportFieldArray(fieldobj);
            }
            this.showStyle = "none";
            if (retObj != undefined) {
                this.Submit.emit({
                    fieldobject: this.reportFieldArray,
                    filedata: retObj["filedata"],
                    fromtimeValue: contextObj.FromTime[0].FieldValue,
                    todateTimeValue: contextObj.ToTime[0].FieldValue,
                    fromDate: contextObj.Fromdate[0].FieldValue,
                    toDate: contextObj.Todate[0].FieldValue
                });
            }
            else {
                this.Submit.emit({
                    fieldobject: this.reportFieldArray,
                    fromdateTime: fromdateTime,
                    todateTime: todateTime,
                    fromtimeValue: contextObj.FromTime[0].FieldValue,
                    todateTimeValue: contextObj.ToTime[0].FieldValue,
                    fromDate: contextObj.Fromdate[0].FieldValue,
                    toDate: contextObj.Todate[0].FieldValue
                });
            }
        }
    };
    Searchforschedule.prototype.onSaveAs = function (value, form) {
        value.preventDefault();
        this.SaveAs.emit({
            value: this.datasource2,
        });
    };
    Searchforschedule.prototype.onClear = function (value) {
        this.selectedValue = "";
        this.loadAdvanceSearch.emit({});
        this.Clear.emit({});
        this.setinitialFromAndToValues();
        this.Fromdate[0].FieldValue = this.FromDate;
        this.Todate[0].FieldValue = this.ToDate;
        this.setFromTimeAndTotimeFieldValue(this);
        this.exitFromValidation();
        this.configure = [];
        var displaySettings = [];
        var listBoxObj = this.datasource2.find(function (el) { return el.DataEntryControlId == 7; });
        if (listBoxObj != undefined && listBoxObj != null) {
            var index;
            for (var i = 0; i < listBoxObj.length; i++) {
                index = this.datasource2.findIndex(function (el) { return el.ReportFieldId == listBoxObj[i].ReportFieldId; });
                this.datasource2[index].MultiFieldValues = [];
            }
        }
        this.datasource2.filter(function (el) {
            if (el.IsVisible == false) {
                displaySettings.push(el.ReportFieldId);
            }
        });
        this.configure = displaySettings;
    };
    Searchforschedule.prototype.exitFromValidation = function () {
        debugger;
        var ele = document.getElementsByClassName("ddl ng-invalid ng-dirty ng-touched");
        if (ele != undefined && ele != null && ele.length > 0) {
        }
    };
    Searchforschedule.prototype.onDelete = function () {
        this.Delete.emit({
            value: this.selectedValue,
        });
    };
    Searchforschedule.prototype.ddlLoadSearch = function (value) {
    };
    Searchforschedule.prototype.onConfig = function (chk1, value) {
        //value.IsVisible = !value.IsVisible;
        var count = 0;
        var index = 0;
        for (var i = 0; i < this.datasource2.length; i++) {
            if (this.datasource2[i].IsVisible == true && value.FieldId != this.datasource2[i].FieldId) {
                count = count + 1;
                index = i;
            }
        }
        if (chk1.checked == true) {
            count = count + 1;
        }
        if (count == 1) {
            this.datasource2[index].IsDisabled = true;
            this.message = "Atleast one field needs to be selected";
        }
        else {
            for (var k = 0; k < this.datasource2.length; k++) {
                this.datasource2[k].IsDisabled = false;
            }
            value.FieldValue = "";
            this.message = "";
        }
    };
    Searchforschedule.prototype.showConfig = function (value) {
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    Searchforschedule.prototype.checkDisable = function () {
        return this.disable;
    };
    Searchforschedule.prototype.onshowKeywordSearch = function () {
        this.showStyle = "none";
        if (this.showKeywordSearch == "none") {
            this.showKeywordSearch = "block";
            this.showKeywordSearchwidth = 300;
        }
        else {
            this.showKeywordSearch = "none";
            this.showKeywordSearchwidth = 0;
        }
    };
    Searchforschedule.prototype.onClose = function () {
        this.showStyle = "none";
    };
    Searchforschedule.prototype.onCloseClickFilter = function (e) {
        if (!e)
            e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            this.onClose();
        }
    };
    Searchforschedule.prototype.showComponent = function (fieldName, isVisible) {
        if (fieldName == this.dataKey || isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    Searchforschedule.prototype.listBoxChange = function (event) {
        debugger;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "datasource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "loadSearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "KeywordFields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "keyWordLookup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "searchtype", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "disable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "Key", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "smartSearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "advancesearchForm", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "Customsearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "Target", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "showSearchFilter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "isShowConfigure", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "Title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "isShowDefaultEndTime", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "fromDateInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "toDateInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "fromTimeInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "toTimeInput", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "SaveAs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "loadAdvanceSearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "Delete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "onloadSearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "Submit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Searchforschedule.prototype, "Clear", void 0);
    Searchforschedule = __decorate([
        core_1.Component({
            selector: 'searchforschedule',
            templateUrl: './app/Views/Scheduling/Seat Booking/customsearchforscheduling.component.html',
            styleUrls: ['app/Framework/Views/Search/Filter.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
            directives: [radiocomponent_component_1.CustomRadioComponent, listboxforsearch_component_1.ListBoxComponent, dropdownlistcomponent_component_1.DropDownListComponent, integertextbox_component_1.IntegerTextBoxsearchComponent, numerictextbox_component_1.NumericTextBoxComponent, stringtextbox_component_1.StringTextBoxSearchComponent, split_view_component_1.SplitViewComponent, date_component_1.DateSearchComponent, datetimecomponent_component_1.DateTimeSearchComponent, keywordtextbox_1.KeywordTextboxComponent, datecomponent_component_1.DateComponent],
            inputs: ['advancesearch', 'datasource', 'Key', 'loadSearch', 'dataKey', 'Title'],
            providers: [General_1.GeneralFunctions, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, validation_service_1.ValidateService],
            pipes: [displaySettings_pipe_1.DisplaySettingsPipe],
            host: {
                '(document:keydown)': 'handleKeyboardEvents($event)'
            }
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, scheduling_service_1.SchedulingService, notify_service_1.NotificationService, General_1.GeneralFunctions, core_1.ElementRef])
    ], Searchforschedule);
    return Searchforschedule;
}());
exports.Searchforschedule = Searchforschedule;
//# sourceMappingURL=customsearchforscheduling.component.js.map
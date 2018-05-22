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
var stringtextbox_component_1 = require('./stringtextbox.component');
var keywordtextbox_1 = require('./keywordtextbox');
var integertextbox_component_1 = require('./integertextbox.component');
var numerictextbox_component_1 = require('./numerictextbox.component');
var datetimecomponent_component_1 = require('./datetimecomponent.component');
var split_view_component_1 = require('../../Whatever/Split-View/split-view.component');
var date_component_1 = require('./date.component');
var dropdownlistcomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component');
var radiocomponent_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component');
var documents_service_1 = require('../../../Models/Documents/documents.service');
var displaySettings_pipe_1 = require('../Common/displaySettings.pipe');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var advancesearchsaveas_1 = require('../../../whatever/documents/documents/advancesearchsaveas');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var validation_service_1 = require('../../Models/Validation/validation.service');
var searchBox = (function () {
    function searchBox(_validateService, documentService, myElement, _notificationService) {
        this._validateService = _validateService;
        this.documentService = documentService;
        this._notificationService = _notificationService;
        this.listFilter = '';
        this.selectedValue = "";
        this.clickFilter = false;
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
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.showSlide = false;
        this.position = "top-right";
        this.fieldDetailsAdd1 = [];
        this.secondaryTarget = 0;
        this.totalItems = 0;
        this.refresh = false;
        //SearchViewFocus(classname: string) {
        //    debugger;
        //    var ContextObj: any = this;
        //    var RootClass: any = document.getElementsByClassName("primary-view");
        //    if (RootClass && RootClass.length > 0) {
        //        var length = RootClass.length;
        //        if (ContextObj.pageTitle && ContextObj.pageTitle.length > 0) {
        //            RootClass[length - 1].setAttribute('aria-label', ContextObj.pageTitle);
        //            RootClass[length - 1].removeAttribute("title");
        //        }
        //        RootClass[length - 1].tabIndex = 0;
        //        RootClass[length - 1].focus();
        //        ContextObj.blnSearchfocus = length;
        //        var endClass: any = RootClass[length - 1].getElementsByClassName("PrimarySearchEndfocus");
        //        if (endClass && endClass.length > 0) {
        //            endClass[endClass.length - 1].addEventListener('focusin', function (event) {
        //                RootClass[length - 1].tabIndex = 0;
        //                RootClass[length - 1].focus();
        //            });
        //        }
        //    }
        //}
        this.query = '';
        this.filteredList = [];
        this.elementRef = myElement;
        this.datasource;
    }
    searchBox.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes["showSearchFilter"] && changes["showSearchFilter"]["currentValue"]) {
            if (changes["showSearchFilter"]["currentValue"].length > 0) {
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
                nos.IsMandatory = false;
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
                    if (_this.visiblefields) {
                        if (_this.visiblefields.indexOf(nos.ReportFieldId) > -1) {
                            nos.IsVisible = true;
                            nos.FieldValue = "";
                        }
                    }
                }
            });
        }
    };
    searchBox.prototype.ngOnInit = function () {
        var contextObj = this;
        if (window["IsMobile"] == true) {
            this.smartSearch = true;
        }
        this._validateService.getBlacklist().subscribe(function (resultData) {
            contextObj.validationData = resultData;
        });
        this.disable;
        if (this.isShowConfigure == undefined || this.isShowConfigure == null) {
            this.isShowConfigure = true;
        }
        this.keyWordLookupValues = this.keyWordLookup;
        this.dataKey;
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
    };
    searchBox.prototype.showFilter = function () {
        this.clickFilter;
        this.showKeywordSearch = "none";
        this.showKeywordSearchwidth = 0;
        if (this.clickFilter == false) {
            this.clickFilter = true;
            this.loadAdvanceSearch.emit({});
        }
        if (this.showStyle == "none") {
            this.showStyle = "block";
        }
        else if (this.showStyle == "block") {
            this.showStyle = "none";
        }
        //if (this.clickFilter) {
        //    this.SearchViewFocus("primary-view");           
        //}
        //if (this.clickFilter == false)
        //    this.blnSearchfocus = -1;
        //setTimeout(function () { ContextObj.SearchViewFocus("primary-view"); }, 100); 
    };
    searchBox.prototype.onKeysearch = function () {
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
    searchBox.prototype.selectSearch = function (item) {
        this.query = item;
        this.filteredList = [];
    };
    searchBox.prototype.handleClick = function (event) {
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
    searchBox.prototype.drpLoadSearch = function (value) {
        this.selectedValue = value;
        this.onloadSearch.emit({
            value: value,
        });
    };
    searchBox.prototype.onClose = function () {
        this.showStyle = "none";
    };
    searchBox.prototype.AdvanceSearchSaveAs = function () {
        var contextObj = this;
        var reportfieldIdArray = [];
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: 32,
        });
        reportfieldIdArray.push({
            ReportFieldId: 2146,
            Value: 1,
        });
        //contextObj.commonService.GetArchivedSearches(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
        contextObj.documentService.LoadAdvanceSearchSaveAs(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {
            // contextObj.advancelookup = result["Data"]["FieldBinderList"];
            contextObj.advancelookupSaveAs = result["Data"][0];
            contextObj.advancelookupSaveAs.FieldValue = "-1";
            contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookupSaveAs));
        });
    };
    searchBox.prototype.onSubmit = function (value) {
        var checkForErrors = function (fieldObject) {
            return fieldObject.HasValidationError;
        };
        if (this.datasource2.find(checkForErrors)) {
            return;
        }
        var fieldobj = new Array();
        var advanceValues = new Array();
        var obj = new General_1.GeneralFunctions();
        if (this.datasource2.length > 0) {
            for (var i = 0; i < this.datasource2.length; i++) {
                if (this.datasource2[i].DataEntryControlId == 20) {
                    var fieldValue = this.datasource2[i].FieldValue;
                    var index = this.datasource2[i].LookupDetails.LookupValues.findIndex(function (el) { return el.Id == fieldValue; });
                    if (index != -1) {
                        var rbtnValue = this.datasource2[i].LookupDetails.LookupValues[index]['Value'];
                        rbtnValue = "Ñµô¥" + rbtnValue + "¥ô";
                        fieldobj.push({
                            ReportFieldId: this.datasource2[i].ReportFieldId,
                            FieldValue: rbtnValue
                        });
                    }
                }
                else {
                    fieldobj.push({
                        ReportFieldId: this.datasource2[i].ReportFieldId,
                        FieldValue: this.datasource2[i].FieldValue
                    });
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
        var isValid = true;
        if (isValid == true) {
            this.showStyle = "none";
            if (retObj != undefined) {
                this.Submit.emit({
                    fieldobject: this.reportFieldArray,
                    filedata: retObj["filedata"]
                });
            }
            else {
                this.Submit.emit({
                    fieldobject: this.reportFieldArray
                });
            }
        }
        else {
        }
    };
    searchBox.prototype.onSaveAs = function (value, form) {
        value.preventDefault();
        this.SaveAs.emit({
            value: this.datasource2,
        });
    };
    searchBox.prototype.onClear = function (value) {
        if (this.advancelookupSaveAs)
            this.advancelookupSaveAs.FieldValue = "-1";
        this.selectedValue = "";
        this.loadAdvanceSearch.emit({});
        this.Clear.emit({});
        this.configure = [];
        var displaySettings = [], visiblesettings = [];
        this.datasource2.filter(function (el) {
            if (el.IsVisible == false) {
                displaySettings.push(el.ReportFieldId);
            }
            else if (el.IsVisible == true) {
                visiblesettings.push(el.ReportFieldId);
            }
        });
        this.visiblefields = visiblesettings;
        this.configure = displaySettings;
    };
    searchBox.prototype.onDelete = function () {
        this.Delete.emit({
            value: this.selectedValue,
        });
    };
    searchBox.prototype.OnSearchSaveAsClick = function (value) {
        var contextObj = this;
        var IsSearchCondition = false;
        if (contextObj.datasource2 && contextObj.datasource2.length > 0) {
            var length = contextObj.datasource2.length;
            var fieldValue;
            for (var i = 0; i < length; i++) {
                fieldValue = contextObj.datasource2[i].FieldValue;
                if (fieldValue != null && fieldValue != undefined && fieldValue != "Ñµô¥¥ô" && fieldValue != "") {
                    IsSearchCondition = true;
                    break;
                }
            }
        }
        if (IsSearchCondition) {
            this.btnName = "Save";
            this.pageTitle = "Save As";
            this.action = "add";
            this.secondaryTarget = 5;
            this.fieldDetailsAdd1 = [];
            this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
            contextObj.documentService.DocAdvanceSearchSaveAs().subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
            });
        }
        else
            contextObj._notificationService.ShowToaster("Enter a search condition", 3);
    };
    searchBox.prototype.OnSearchDeleteClick = function (event) {
        var contextObj = this;
        var id;
        //id = contextObj.dropdownid;//Bug 79377: 4:-
        //if (id == null || id == undefined) {   //Bug 79377: 4:-
        id = contextObj.advancelookupSaveAs.FieldValue;
        //}
        if (contextObj.advancelookupSaveAs.FieldValue == "-1") {
            contextObj._notificationService.ShowToaster("Select a search criteria", 3);
        }
        else {
            contextObj.documentService.AdvanceSearchDelete(id).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                if (result.ServerId >= 0) {
                    contextObj._notificationService.ShowToaster("Selected search criteria deleted", 3);
                    contextObj.advancelookupSaveAs.FieldValue = "-1";
                    contextObj.selectedValue = "";
                    contextObj.Clear.emit({});
                    contextObj.advancelookupSaveAs.LookupDetails.LookupValues = contextObj.advancelookupSaveAs.LookupDetails.LookupValues.filter(function (item1) {
                        return item1.Id != id;
                    });
                }
                else if (result.ServerId == -1) {
                    contextObj._notificationService.ShowToaster("You do not have the privilege to delete the search criteria saved by another user", 5);
                }
                else if (result.ServerId == -2) {
                    contextObj._notificationService.ShowToaster("Selected name has no search criteria", 5);
                }
                else {
                    contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                }
            });
        }
    };
    searchBox.prototype.submitReturn = function (event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = false;
        var reportfieldIdArray = [];
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: 32,
        });
        reportfieldIdArray.push({
            ReportFieldId: 2146,
            Value: 1,
        });
        contextObj.documentService.LoadAdvanceSearchSaveAs(JSON.stringify(reportfieldIdArray)).subscribe(function (result) {
            contextObj.advancelookupSaveAs = result["Data"][0];
            contextObj.advancelookupSaveAs.FieldValue = "-1";
            contextObj.advancelookupDefault = JSON.parse(JSON.stringify(contextObj.advancelookupSaveAs));
            contextObj.advancelookupSaveAs.FieldValue = event.ServerId;
        });
    };
    searchBox.prototype.ddlLoadSearch = function (value) {
    };
    searchBox.prototype.onConfig = function (chk1, value) {
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
            value.HasValidationError = false;
            this.message = "";
        }
    };
    searchBox.prototype.showConfig = function (value) {
        this.pageTitle = "Configure";
        this.secondaryTarget = 0;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    searchBox.prototype.checkDisable = function () {
        return this.disable;
    };
    searchBox.prototype.onshowKeywordSearch = function () {
        this.showStyle = "none";
        if (this.showKeywordSearch == "none") {
            this.showKeywordSearch = "block";
            this.showKeywordSearchwidth = 300;
            var keywordsearchclass = document.getElementById("slideout");
            if (keywordsearchclass) {
                setTimeout(function () {
                    var focusclass = keywordsearchclass.getElementsByTagName("input");
                    if (focusclass && focusclass.length > 0)
                        focusclass[0].focus();
                    window["GlobalFocusVariable"] = focusclass[0];
                }, 10);
            }
        }
        else {
            this.showKeywordSearch = "none";
            this.showKeywordSearchwidth = 0;
        }
    };
    searchBox.prototype.onChangeAdvanceSearchddl = function (event) {
        var contextObj = this;
        contextObj.dropdownid = event;
        var reportfieldIdArray = [];
        reportfieldIdArray.push({
            ReportFieldId: 2145,
            Value: 32,
        });
        reportfieldIdArray.push({
            ReportFieldId: 2146,
            Value: 1,
        });
        reportfieldIdArray.push({
            ReportFieldId: 2143,
            Value: contextObj.dropdownid,
        });
        contextObj.documentService.GetArchivedSearchesddl(JSON.stringify(reportfieldIdArray)).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["FieldBinderData"]);
            contextObj.totalItems = contextObj.itemsSource.length;
            var fieldobj = new Array();
            for (var j = 0; j < contextObj.datasource2.length; j++) {
                contextObj.datasource2[j].FieldValue = null;
            }
            for (var i = 0; i < contextObj.totalItems; i++) {
                var FieldValue1 = contextObj.itemsSource[i].Value;
                var tempReortFeildID = contextObj.itemsSource[i].FieldValue;
                var tempOperator = contextObj.itemsSource[i].OperatorValue;
                tempOperator = tempOperator == "BETWEEN" ? "Between" : tempOperator;
                var ReportfeildIds = Number(tempReortFeildID.split("^")[0]);
                var FeildDetails = contextObj.datasource2.find(function (item) {
                    var ControlId = item.DataEntryControlId;
                    if (item.ReportFieldId == ReportfeildIds) {
                        if (ControlId == 2 || ControlId == 8) {
                            FieldValue1 = FieldValue1 + "ǂ" + tempOperator;
                            item.FieldValue = FieldValue1;
                        }
                        else
                            item.FieldValue = FieldValue1;
                        return true;
                    }
                });
            }
            contextObj.refresh = !contextObj.refresh;
        });
    };
    searchBox.prototype.getAnchorTagEnter = function (id, e) {
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
            else if (id == "4") {
                this.showConfig(e);
            }
            else if (id == "5") {
                this.OnSearchSaveAsClick(e);
            }
            else if (id == "6") {
                this.OnSearchDeleteClick(e);
            }
        }
    };
    searchBox.prototype.handleKeyboardEvents = function (e) {
        if (!e)
            e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '27') {
            if (this.showStyle == "block") {
                this.showStyle = "none";
            }
        }
    };
    searchBox.prototype.cancelClick = function (event) {
        this.showSlide = !this.showSlide;
    };
    searchBox.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "datasource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "loadSearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "KeywordFields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "keyWordLookup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "searchtype", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "disable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "Key", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "smartSearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "advancesearchForm", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "isShowConfigure", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "isloadbit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], searchBox.prototype, "advanceValues", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "SaveAs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "loadAdvanceSearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "Delete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "onloadSearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "Submit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "Clear", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], searchBox.prototype, "showSearchFilter", void 0);
    searchBox = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/Framework/Views/Search/search.component.html',
            styleUrls: ['app/Framework/Views/Search/Filter.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
            directives: [dropdownlistcomponent_component_1.DropDownListComponent, integertextbox_component_1.IntegerTextBoxsearchComponent, numerictextbox_component_1.NumericTextBoxComponent, stringtextbox_component_1.StringTextBoxSearchComponent, split_view_component_1.SplitViewComponent, date_component_1.DateSearchComponent, datetimecomponent_component_1.DateTimeSearchComponent, keywordtextbox_1.KeywordTextboxComponent, radiocomponent_component_1.CustomRadioComponent, slide_component_1.SlideComponent, advancesearchsaveas_1.AdvanceSearchSaveAs],
            inputs: ['advancesearch', 'datasource', 'Key', 'loadSearch', 'dataKey', 'isloadbit', 'advancelookupSaveAs', 'advanceValues'],
            providers: [validation_service_1.ValidateService, General_1.GeneralFunctions, documents_service_1.DocumentService, notify_service_1.NotificationService],
            pipes: [displaySettings_pipe_1.DisplaySettingsPipe],
            host: {
                '(document:keydown)': 'handleKeyboardEvents($event)'
            }
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, documents_service_1.DocumentService, core_1.ElementRef, notify_service_1.NotificationService])
    ], searchBox);
    return searchBox;
}());
exports.searchBox = searchBox;
//# sourceMappingURL=search.component.js.map
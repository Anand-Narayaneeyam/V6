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
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var employee_services_1 = require('../../../Models/Employee/employee.services');
var checkboxcomponent_component_1 = require('../../Whatever/DynamicControls/DynamicFields/checkboxcomponent.component');
var notify_component_1 = require('../../../Framework/Whatever/Notification/notify.component');
var labelcomponent_component_1 = require('../dynamiccontrols/dynamicfields/labelcomponent.component');
var InlineSearchBox = (function () {
    function InlineSearchBox(notificationService, myElement, _notificationService, EmployeeService) {
        this.notificationService = notificationService;
        this._notificationService = _notificationService;
        this.EmployeeService = EmployeeService;
        this.listFilter = '';
        this.selectedValue = "";
        this.clickFilter = false;
        this.closeSearch = new core_1.EventEmitter();
        this.submitSearch = new core_1.EventEmitter();
        //@Input() advancelookupSaveAs: IField[];
        //advancelookupSaveAs: IField;
        this.showKeywordSearch = "none";
        this.showKeywordSearchwidth = 0;
        this.message = "";
        this.SaveAs = new core_1.EventEmitter();
        this.loadAdvanceSearch = new core_1.EventEmitter();
        this.Delete = new core_1.EventEmitter();
        this.onloadSearch = new core_1.EventEmitter();
        this.Submit = new core_1.EventEmitter();
        this.Clear = new core_1.EventEmitter();
        this.showStyle = "block";
        this.setDisable = false;
        this.splitviewInput = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
        this.showSlide = false;
        this.position = "top-right";
        this.fieldDetailsAdd1 = [];
        this.secondaryTarget = 0;
        this.totalItems = 0;
        this.refresh = false;
        this.searchFor = [];
        this.searchLabelName = [];
        this.divClose = new core_1.EventEmitter();
        this.query = '';
        this.filteredList = [];
        this.elementRef = myElement;
        this.datasource;
    }
    InlineSearchBox.prototype.ngOnChanges = function (changes) {
        var _this = this;
        debugger;
        if (changes["IsShowStyle"]) {
            this.showStyle = "block";
        }
        if (changes["showSearchFilter"] && changes["showSearchFilter"]["currentValue"]) {
            if (changes["showSearchFilter"]["currentValue"].length > 0) {
                this.showStyle = "block";
                this.showSearchFilter = [];
                return;
            }
            else
                return;
        }
        if (this.datasource != undefined || null) {
            this.datasource2 = JSON.parse(JSON.stringify(this.datasource));
            this.datasource2.forEach(function (nos) {
                if (nos.IsDisabled != false) {
                    nos.IsDisabled = false;
                }
                if (nos.IsValidated = true) {
                    //  if (nos.DataEntryControlId != 4)
                    nos.IsValidated = nos.FieldId === 2812;
                    //if (nos.FieldId === 2812)
                    //    nos.IsValidated = true;
                    //else
                    //    nos.IsValidated = false;
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
        if (this.ModuleId == 5) {
            this.isOccupancyVisible = true;
            this.searchFor = this.datasource2.filter(function (item) { return item.DataEntryControlId == 6; });
            if (this.searchFor) {
                var cnt = 0;
                for (var i = 0; i < this.searchFor.length; i++) {
                    if (this.searchFor[i].IsVisible === false)
                        cnt++;
                }
                this.isOccupancyVisible = !(cnt == 4);
            }
            this.onDropDownChange(this.datasource2.find(function (item) { return item.ReportFieldId == 950; }));
        }
    };
    InlineSearchBox.prototype.ngOnInit = function () {
        debugger;
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
                if (nos.IsValidated = true) {
                    nos.IsValidated = nos.FieldId === 2812;
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
            });
        }
        if (this.Key == "" || this.Key == null) {
            this.Key = 1;
        }
        //var Occupied = this.datasource2.find(function (item) { return item.ReportFieldId == 950 });
        //if (Occupied && Occupied.LookupDetails && Occupied.LookupDetails.LookupValues) {
        //    Occupied.LookupDetails.LookupValues.sort(function (a, b) {
        //        return a.Id - b.Id;
        //    });
        //}
        if (this.ModuleId == 5) {
            this.searchFor = this.datasource2.filter(function (item) { return item.DataEntryControlId == 6; });
            if (this.searchFor) {
                var cnt = 0;
                for (var i = 0; i < this.searchFor.length; i++) {
                    if (this.searchFor[i].IsVisible === false)
                        cnt++;
                }
                this.isOccupancyVisible = !(cnt == 4);
            }
        }
    };
    InlineSearchBox.prototype.selectSearch = function (item) {
        this.query = item;
        this.filteredList = [];
    };
    InlineSearchBox.prototype.handleClick = function (event) {
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
    //onSubmit(value: string) {
    //    debugger
    //    var contextObj = this;                       /*Ñµô¥" + rbtnValue + "¥ô"*/
    //    var DrawingId = contextObj.drawingId;
    //    var Query;
    //    contextObj.EmployeeService.GetSpaceSearchResults(DrawingId,Query,0, 0, 0, 0).subscribe(function (resultData) {
    //        debugger;
    //        contextObj.fieldObject = resultData["Data"];
    //    });
    //}
    InlineSearchBox.prototype.ISubmit = function (value) {
        debugger;
        var nullValueCondition = false;
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
                var DataEntryControl = this.datasource2[i].DataEntryControlId;
                if (DataEntryControl == 20) {
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
                else if (DataEntryControl == 2 || DataEntryControl == 8) {
                    //var DateValidation = this.datasource2[i].FieldValue.split('ô');
                    //if (DateValidation.length > 3) {
                    //    if (DataEntryControl == 8) {
                    //        if (new Date(DateValidation[1]) > new Date(DateValidation[3])) {
                    //            this.notificationService.ShowToaster("To Date and Time must be greater than the From Date and Time in " + this.datasource2[i].FieldLabel, 2);
                    //        }
                    //    } else {
                    //        this.notificationService.ShowToaster("To Date must be greater than the From Date in " + this.datasource2[i].FieldLabel, 2);
                    //    }
                    //    return;
                    //}
                    var DateValidation = this.datasource2[i].FieldValue.split('ô');
                    if (DateValidation.length > 3) {
                        if (new Date(DateValidation[1]) >= new Date(DateValidation[3])) {
                            var text = DataEntryControl == 8 ? "To Date and Time must be greater than From Date and Time" : "To Date must be greater than From Date";
                            this.notificationService.ShowToaster(text + " in " + this.datasource2[i].FieldLabel, 2);
                            return;
                        }
                        else {
                            pushingData(this.datasource2[i].ReportFieldId, this.datasource2[i].FieldValue);
                        }
                    }
                } /*else if (this.ModuleId == 5) */
                else {
                    var fieldvalue = this.datasource2[i].IsVisible ? this.datasource2[i].FieldValue : "";
                    if (fieldvalue == "Ñµô¥¥ô" || fieldvalue == "" || fieldvalue == "-1" || fieldvalue == "false" || fieldvalue == null) {
                        pushingData(this.datasource2[i].ReportFieldId, fieldvalue);
                    }
                    else {
                        pushingData(this.datasource2[i].ReportFieldId, fieldvalue);
                        nullValueCondition = true;
                    }
                    function pushingData(reportfieldId, fieldvalue) {
                        fieldobj.push({
                            ReportFieldId: reportfieldId,
                            FieldValue: fieldvalue
                        });
                    }
                }
            }
            if (nullValueCondition == false) {
                this.notificationService.ShowToaster("Select a Search Criteria", 2);
                this.showStyle = "block";
                return;
            }
        }
        var retObj;
        if (this.fileObj != null) {
            retObj = obj.getFieldValuesAsReportFieldArrayForFileUpload({ "fieldobject": fieldobj, "filedata": this.fileObj });
            this.reportFieldArray = JSON.parse(retObj["fieldobject"]);
        }
        else {
            this.reportFieldArray = JSON.parse(obj.getFieldValuesAsReportFieldArray(fieldobj));
        }
        this.Submit.emit({
            fieldobject: this.reportFieldArray
        });
    };
    InlineSearchBox.prototype.onDropDownChange = function (event) {
        debugger;
        var contextObj = this;
        if (this.ModuleId == 5)
            checkBoxChange(parseInt(event.FieldValue), parseInt(event.FieldValue) == 91);
        function checkBoxChange(f, isenabled) {
            var count = 0;
            contextObj.searchFor.find(function (item) {
                if (f == 90 || f == 91) {
                    if (item.ReportFieldId == 947) {
                        item.IsEnabled = isenabled;
                        //  item.FieldValue = (isenabled && item.IsVisible).toString();
                        item.FieldValue = "";
                        count++;
                    }
                    if ((item.ReportFieldId == 945 || item.ReportFieldId == 946 || item.ReportFieldId == 948)) {
                        item.IsEnabled = !isenabled;
                        // item.FieldValue = (!isenabled && item.IsVisible).toString();
                        item.FieldValue = "";
                        count++;
                    }
                }
                else {
                    item.IsEnabled = true;
                    //  item.FieldValue = item.IsVisible.toString();
                    item.FieldValue = "";
                    count++;
                }
                return count == 4;
            });
        }
        //if (this.ModuleId == 5) {
        //    if (parseInt(event.FieldValue) == 90) {
        //        var count1 = 0;
        //        contextObj.searchFor.find(function (item) {
        //            if (item.ReportFieldId == 947) {
        //                item.IsEnabled = false;
        //                item.FieldValue = "false";
        //                count1++;
        //            }
        //            if (item.ReportFieldId == 945) {
        //                item.IsEnabled = true;
        //                item.FieldValue = "true";
        //                count1++;
        //            }
        //            if (item.ReportFieldId == 946) {
        //                item.IsEnabled = true;
        //                item.FieldValue = "true";
        //                count1++;
        //            }
        //            if (item.ReportFieldId == 948) {
        //                item.IsEnabled = true;
        //                item.FieldValue = "true";
        //                count1++;
        //            }
        //            return count1 == 4;
        //        });
        //    } else if (parseInt(event.FieldValue) == 91) {
        //        var count2 = 0;
        //        contextObj.searchFor.find(function (item) {
        //            if (item.ReportFieldId == 947) {
        //                item.IsEnabled = true;
        //                item.FieldValue = "true";
        //                count2++;
        //            }
        //            if (item.ReportFieldId == 945) {
        //                item.IsEnabled = false;
        //                item.FieldValue = "false";
        //                count2++;
        //            }
        //            if (item.ReportFieldId == 946) {
        //                item.IsEnabled = false;
        //                item.FieldValue = "false";
        //                count2++;
        //            }
        //            if (item.ReportFieldId == 948) {
        //                item.IsEnabled = false;
        //                item.FieldValue = "false";
        //                count2++;
        //            }
        //            return count2 == 4;
        //        });
        //    }
        //    else {
        //        contextObj.searchFor.find(function (item) {
        //            var count3 = 0;
        //            if (item.ReportFieldId == 947) {
        //                item.IsEnabled = true;
        //                item.FieldValue = "true";
        //                count3++;
        //            }
        //            if (item.ReportFieldId == 945) {
        //                item.IsEnabled = true;
        //                item.FieldValue = "true";
        //                count3++;
        //            }
        //            if (item.ReportFieldId == 946) {
        //                item.IsEnabled = true;
        //                item.FieldValue = "true";
        //                count3++;
        //            }
        //            if (item.ReportFieldId == 948) {
        //                item.IsEnabled = true;
        //                item.FieldValue = "true";
        //                count3++;
        //            }
        //            return count3 == 4;
        //        });
        //    }
        //}
    };
    InlineSearchBox.prototype.showFilter = function () {
        debugger;
        //this.clickFilter;
        this.divClose.emit({});
        //this.IsShowStyle = false;
        // this.showKeywordSearch = "none";
        // this.showKeywordSearchwidth = 0;
        // if (this.showStyle == "none") {
        //     this.showStyle = "block";
        // }
        // else if (this.showStyle == "block") {
        //     this.showStyle = "none";
        //     this.IsShowStyle = false;
        // }
    };
    InlineSearchBox.prototype.onConfig = function (chk1, value) {
        //value.IsVisible = !value.IsVisible;
        var count = 0;
        var index = 0;
        for (var i = 0; i < this.datasource2.length; i++) {
            if (this.datasource2[i].IsVisible == true && value.FieldId != this.datasource2[i].FieldId) {
                count = count + 1;
                index = i;
            }
        }
        if (this.ModuleId === 5) {
            if (this.searchFor) {
                value.IsVisible = chk1.checked;
                var cnt = 0;
                for (var i_1 = 0; i_1 < this.searchFor.length; i_1++) {
                    if (this.searchFor[i_1].IsVisible === false)
                        cnt++;
                }
                this.isOccupancyVisible = !(cnt == 4);
                value.IsVisible = !chk1.checked;
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
    InlineSearchBox.prototype.showConfig = function (value) {
        this.pageTitle = "Configure";
        this.secondaryTarget = 0;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    };
    InlineSearchBox.prototype.onSaveAs = function (value, form) {
        value.preventDefault();
        this.SaveAs.emit({
            value: this.datasource2,
        });
    };
    InlineSearchBox.prototype.onClear = function () {
        debugger;
        //this.datasource2.find(function (item) {
        //    if (item.ReportFieldId == 950) {
        //        item.LookupDetails.LookupValues = "-1";
        //        return true;
        //    }
        //    return false;
        //});
        this.showStyle = "block";
        this.Clear.emit({
            "dataSource": this.datasource2.filter(function (item) { return item.IsVisible === false; })
        });
    };
    InlineSearchBox.prototype.onClose = function () {
        this.divClose.emit({});
        //this.showStyle = "none";
        //this.IsShowStyle = false;
        //this.IsShowStyle = true;
        //this.closeSearch.emit({
        //    value: false,
        //    change: false
        //})
    };
    InlineSearchBox.prototype.onDelete = function () {
        this.Delete.emit({
            value: this.selectedValue,
        });
    };
    InlineSearchBox.prototype.cancelClick = function (event) {
        this.closeSearch.emit({
            value: false,
            change: false
        });
    };
    InlineSearchBox.prototype.closeSlideDialog = function (value) {
        this.showSlide = value.value;
    };
    InlineSearchBox.prototype.handleKeyboardEvents = function (e) {
        if (!e)
            e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '27') {
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "datasource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "loadSearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "dataKey", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "KeywordFields", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "keyWordLookup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "searchtype", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "disable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "Key", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "smartSearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "advancesearchForm", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "isShowConfigure", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "drawingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], InlineSearchBox.prototype, "advanceValues", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "closeSearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "submitSearch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "IsShowStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], InlineSearchBox.prototype, "ModuleId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "SaveAs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "loadAdvanceSearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "Delete", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "onloadSearch", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "Submit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "Clear", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "showSearchFilter", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], InlineSearchBox.prototype, "divClose", void 0);
    InlineSearchBox = __decorate([
        core_1.Component({
            selector: 'Inlinesearch',
            templateUrl: 'app/Framework/Views/Search/InlineSearch.component.html',
            styleUrls: ['app/Framework/Views/Search/Filter.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
            directives: [dropdownlistcomponent_component_1.DropDownListComponent, integertextbox_component_1.IntegerTextBoxsearchComponent, numerictextbox_component_1.NumericTextBoxComponent, stringtextbox_component_1.StringTextBoxSearchComponent, split_view_component_1.SplitViewComponent, date_component_1.DateSearchComponent, datetimecomponent_component_1.DateTimeSearchComponent, keywordtextbox_1.KeywordTextboxComponent, radiocomponent_component_1.CustomRadioComponent, slide_component_1.SlideComponent, checkboxcomponent_component_1.CustomCheckBoxComponent, notify_component_1.Notification, labelcomponent_component_1.LabelComponent],
            inputs: ['datasource', 'Key', 'loadSearch', 'dataKey', 'drawingId', 'advancelookupSaveAs', 'advanceValues', 'IsShowStyle', 'ModuleId', 'divClose'],
            providers: [General_1.GeneralFunctions, documents_service_1.DocumentService, notify_service_1.NotificationService, employee_services_1.EmployeeService],
            pipes: [displaySettings_pipe_1.DisplaySettingsPipe],
            host: {
                '(document:keydown)': 'handleKeyboardEvents($event)'
            }
        }), 
        __metadata('design:paramtypes', [notify_service_1.NotificationService, core_1.ElementRef, notify_service_1.NotificationService, employee_services_1.EmployeeService])
    ], InlineSearchBox);
    return InlineSearchBox;
}());
exports.InlineSearchBox = InlineSearchBox;
//# sourceMappingURL=Inlinesearch.component.js.map
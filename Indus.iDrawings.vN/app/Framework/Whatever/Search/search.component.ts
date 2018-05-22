import { Component, Input, ElementRef, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms';
import { FormBuilder, NgFormModel, NgFormControl, NgControl, NgControlGroup, NgModel} from '@angular/common';
import { StringTextBoxSearchComponent } from './stringtextbox.component';
import { KeywordTextboxComponent} from './keywordtextbox';
import { IntegerTextBoxsearchComponent } from './integertextbox.component';
import { NumericTextBoxComponent } from './numerictextbox.component';
import { DateTimeSearchComponent } from './datetimecomponent.component';
import { SplitViewComponent } from '../../Whatever/Split-View/split-view.component';
import { DateSearchComponent } from './date.component';
import {IField} from '../../Models/Interface/IField';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import { DropDownListComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import { CustomRadioComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/radiocomponent.component';
import {DocumentService} from '../../../Models/Documents/documents.service'
import {DisplaySettingsPipe} from '../Common/displaySettings.pipe';
import { GeneralFunctions} from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {AdvanceSearchSaveAs} from '../../../whatever/documents/documents/advancesearchsaveas';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { ValidateService } from '../../Models/Validation/validation.service';


@Component({
    selector: 'search',
    templateUrl: 'app/Framework/Views/Search/search.component.html',
    styleUrls: ['app/Framework/Views/Search/Filter.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    directives: [DropDownListComponent, IntegerTextBoxsearchComponent, NumericTextBoxComponent, StringTextBoxSearchComponent, SplitViewComponent, DateSearchComponent, DateTimeSearchComponent, KeywordTextboxComponent, CustomRadioComponent, SlideComponent, AdvanceSearchSaveAs],
    inputs: ['advancesearch', 'datasource', 'Key', 'loadSearch', 'dataKey', 'isloadbit', 'advancelookupSaveAs', 'advanceValues'],
    providers: [ValidateService, GeneralFunctions, DocumentService, NotificationService],
    pipes: [DisplaySettingsPipe],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})
export class searchBox implements OnChanges {
    public validationData;
    listFilter: string = '';
    selectedValue = "";
    clickFilter = false;
    @Input() datasource;
    @Input() loadSearch;
    @Input() dataKey;
    @Input() KeywordFields;
    @Input() keyWordLookup;
    @Input() searchtype;
    @Input() disable;
    @Input() Key;
    @Input() smartSearch;
    @Input() advancesearchForm;
    @Input() isShowConfigure;
    @Input() isloadbit;
    @Input() advanceValues: any[];
    //@Input() advancelookupSaveAs: IField[];
    advancelookupSaveAs: IField;
    showKeywordSearch = "none";
    showKeywordSearchwidth = 0;
    keyWordLookupValues: any;
    public message = "";
    public datasource2;
    public reportFieldArray: any;
    public fileObj: IFileDetails;
    @Output() SaveAs = new EventEmitter();
    @Output() loadAdvanceSearch = new EventEmitter();
    @Output() Delete = new EventEmitter();
    @Output() onloadSearch = new EventEmitter();
    @Output() Submit = new EventEmitter();
    @Output() Clear = new EventEmitter();
    showStyle = "none";
    public setDisable = false;
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 40 };
    configure: any;
    @Input() showSearchFilter;

    // advancelookup: IField[];
    advancelookupDefault: IField[];
    //blnSearchfocus: number=-1;
    btnName: string;
    showSlide = false;
    position = "top-right";
    fieldDetailsAdd1: IField[] = [];
    secondaryTarget: number = 0;
    pageTitle: string;
    action: string;
    totalItems: number = 0;
    itemsSource: any[];
    dropdownid;
    refresh: boolean = false;
    visiblefields: any;

    ngOnChanges(changes: SimpleChanges) {
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
            this.datasource2.forEach((nos) => {
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
                if (this.configure != undefined) {
                    if (this.configure.indexOf(nos.ReportFieldId) > -1) {
                        nos.IsVisible = false;
                        nos.FieldValue = "";
                    }
                    if (this.visiblefields) {
                        if (this.visiblefields.indexOf(nos.ReportFieldId) > -1) {
                            nos.IsVisible = true;
                            nos.FieldValue = "";
                        }
                    }
                }
            });
        }
    }

    ngOnInit() {
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
            this.datasource2.forEach((nos) => {
                if (nos.IsDisabled != false) {
                    nos.IsDisabled = false;
                }
            });
        }
        if (this.Key == "" || this.Key == null) {
            this.Key = 1;
        }
    }

    showFilter() {
        this.clickFilter;
        this.showKeywordSearch = "none";
        this.showKeywordSearchwidth = 0;
        if (this.clickFilter == false) {
            this.clickFilter = true;
            this.loadAdvanceSearch.emit({
            })
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

    }
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

    public query = '';
    public filteredList = [];
    public elementRef;
    constructor(private _validateService: ValidateService, private documentService: DocumentService, myElement: ElementRef, private _notificationService: NotificationService) {
        this.elementRef = myElement;
        this.datasource;
    }

    onKeysearch() {
        var checkForErrors = function (fieldObject: IField) {
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
        })
    }

    selectSearch(item) {
        this.query = item;
        this.filteredList = [];
    }

    handleClick(event) {
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
    }

    drpLoadSearch(value: any) {
        this.selectedValue = value;
        this.onloadSearch.emit({
            value: value,
        })
    }
    onClose() {
        this.showStyle = "none";
    }

    AdvanceSearchSaveAs() {
        var contextObj = this;

        var reportfieldIdArray: ReportFieldIdValues[] = [];
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
    }

    onSubmit(value: string) {
        var checkForErrors = function (fieldObject: IField) {
            return fieldObject.HasValidationError;
        };
        if (this.datasource2.find(checkForErrors)) {
            return;
        }
        var fieldobj = new Array<ReportFieldArray>();
        var advanceValues = new Array<ReportFieldArray>();
        var obj: GeneralFunctions = new GeneralFunctions();
        if (this.datasource2.length > 0) {
            for (var i = 0; i < this.datasource2.length; i++) {
                if (this.datasource2[i].DataEntryControlId == 20) {
                    var fieldValue = this.datasource2[i].FieldValue;
                    var index = this.datasource2[i].LookupDetails.LookupValues.findIndex(function (el) { return el.Id == fieldValue });
                    if (index != -1) {
                        var rbtnValue = this.datasource2[i].LookupDetails.LookupValues[index]['Value'];
                        rbtnValue = "Ñµô¥" + rbtnValue + "¥ô";
                        fieldobj.push({
                            ReportFieldId: this.datasource2[i].ReportFieldId,
                            FieldValue: rbtnValue
                        });
                    }
                } else {
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
                })
            } else {
                this.Submit.emit({
                    fieldobject: this.reportFieldArray
                })
            }
        }
        else {
        }
    }

    onSaveAs(value: any, form: NgForm) {
        value.preventDefault();
        this.SaveAs.emit({
            value: this.datasource2,
        })
    }

    onClear(value: any) {
        if (this.advancelookupSaveAs)
            this.advancelookupSaveAs.FieldValue = "-1";
        this.selectedValue = "";
        this.loadAdvanceSearch.emit({
        })
        this.Clear.emit({
        })
        this.configure = [];
        var displaySettings = [],
            visiblesettings = [];

        this.datasource2.filter(function (el) {
            if (el.IsVisible == false) {
                displaySettings.push(el.ReportFieldId);
            } else if (el.IsVisible == true) {
                visiblesettings.push(el.ReportFieldId);
            }
        });
        this.visiblefields = visiblesettings;
        this.configure = displaySettings;
    }

    onDelete() {
        this.Delete.emit({
            value: this.selectedValue,
        })
    }

    OnSearchSaveAsClick(value: string) {

        var contextObj = this;
        var IsSearchCondition: boolean = false;
        if (contextObj.datasource2 && contextObj.datasource2.length > 0) {
            var length = contextObj.datasource2.length;
            var fieldValue;
            for (let i = 0; i < length; i++) {
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

    }

    OnSearchDeleteClick(event: any) {
        var contextObj = this;
        var id: any;
        //id = contextObj.dropdownid;//Bug 79377: 4:-

        //if (id == null || id == undefined) {   //Bug 79377: 4:-
        id = contextObj.advancelookupSaveAs.FieldValue;
        //}

        if (contextObj.advancelookupSaveAs.FieldValue == "-1") {
            contextObj._notificationService.ShowToaster("Select a search criteria", 3);
        } else {
            contextObj.documentService.AdvanceSearchDelete(id).subscribe(function (result) {
                contextObj.fieldDetailsAdd1 = result["Data"];
                if (result.ServerId >= 0) {
                    contextObj._notificationService.ShowToaster("Selected search criteria deleted", 3);
                    contextObj.advancelookupSaveAs.FieldValue = "-1";
                    contextObj.selectedValue = "";
                    contextObj.Clear.emit({
                    })

                    contextObj.advancelookupSaveAs.LookupDetails.LookupValues = contextObj.advancelookupSaveAs.LookupDetails.LookupValues.filter(function (item1) {
                        return item1.Id != id
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
    }

    submitReturn(event) {
        var contextObj = this;
        contextObj.splitviewInput.showSecondaryView = false;

        var reportfieldIdArray: ReportFieldIdValues[] = [];
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
    }


    ddlLoadSearch(value: any) {

    }

    onConfig(chk1, value) {
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
    }

    showConfig(value) {
        this.pageTitle = "Configure";
        this.secondaryTarget = 0;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    checkDisable() {
        return this.disable;
    }

    onshowKeywordSearch() {
        this.showStyle = "none";
        if (this.showKeywordSearch == "none") {
            this.showKeywordSearch = "block";
            this.showKeywordSearchwidth = 300;
            var keywordsearchclass: any = document.getElementById("slideout");
            if (keywordsearchclass) {
                setTimeout(function () {
                    var focusclass: any = keywordsearchclass.getElementsByTagName("input");
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
    }

    onChangeAdvanceSearchddl(event: any) {      // LoadDropdown Onchange
        var contextObj = this;
        contextObj.dropdownid = event;
        var reportfieldIdArray: ReportFieldIdValues[] = [];
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
            var fieldobj = new Array<ReportFieldArray>();

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
                            //  item.OperatorSymbols = tempOperator;
                        }
                        else
                            item.FieldValue = FieldValue1;
                        return true;
                    }
                });
            }
            contextObj.refresh = !contextObj.refresh
        });
    }

    getAnchorTagEnter(id, e) {
        if (!e) e = window.event;
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

    }

    handleKeyboardEvents(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '27') {

            if (this.showStyle == "block") {
                this.showStyle = "none";
            }
        }
    }
    cancelClick(event: Event) {
        this.showSlide = !this.showSlide;
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }
}

export interface IFileDetails {
    FileName: string,
    FileData: string
}
export interface ReportFieldArray {
    ReportFieldId: number;
    FieldValue: string;
}
interface ReportFieldIdValues {
    ReportFieldId: number,
    Value: any
}

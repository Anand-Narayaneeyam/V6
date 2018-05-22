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
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {EmployeeService} from '../../../Models/Employee/employee.services';
import {CustomCheckBoxComponent} from '../../Whatever/DynamicControls/DynamicFields/checkboxcomponent.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { LabelComponent} from '../dynamiccontrols/dynamicfields/labelcomponent.component';





@Component({
    selector: 'Inlinesearch',
    templateUrl: 'app/Framework/Views/Search/InlineSearch.component.html',
    styleUrls: ['app/Framework/Views/Search/Filter.css', 'node_modules/bootstrap/dist/css/bootstrap.css'],
    directives: [DropDownListComponent, IntegerTextBoxsearchComponent, NumericTextBoxComponent, StringTextBoxSearchComponent, SplitViewComponent, DateSearchComponent, DateTimeSearchComponent, KeywordTextboxComponent, CustomRadioComponent, SlideComponent, CustomCheckBoxComponent, Notification,LabelComponent],
    inputs: ['datasource', 'Key', 'loadSearch', 'dataKey', 'drawingId', 'advancelookupSaveAs', 'advanceValues', 'IsShowStyle', 'ModuleId', 'divClose'],
    providers: [GeneralFunctions, DocumentService, NotificationService, EmployeeService],
    pipes: [DisplaySettingsPipe],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})
export class InlineSearchBox implements OnChanges {
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
    @Input() drawingId;
    @Input() advanceValues: any[];
    @Output() closeSearch = new EventEmitter();
    @Output() submitSearch = new EventEmitter();
    @Input() IsShowStyle;
    @Input() ModuleId: number;
   
    //@Input() advancelookupSaveAs: IField[];
    //advancelookupSaveAs: IField;
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
  
    
    showStyle = "block";
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
    fieldObject: IField[];
    searchFor: IField[] = [];
    isOccupancyVisible: boolean;
    searchLabelName: IField[] = [];
    @Output() divClose = new EventEmitter();

    ngOnChanges(changes: SimpleChanges) {
        debugger

        if (changes["IsShowStyle"])  {
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
            this.datasource2.forEach((nos) => {
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
                if (this.configure != undefined) {
                    if (this.configure.indexOf(nos.ReportFieldId) > -1) {
                        nos.IsVisible = false;
                        nos.FieldValue = "";
                    }
                }
            });
        }

        if (this.ModuleId == 5) { 
            this.isOccupancyVisible = true;
            this.searchFor = this.datasource2.filter(function (item) { return item.DataEntryControlId == 6 });
            if (this.searchFor) {
                var cnt = 0;
                for (let i = 0; i < this.searchFor.length; i++) {
                    if (this.searchFor[i].IsVisible === false)
                        cnt++;
                }
                this.isOccupancyVisible = !(cnt == 4);
                //    this.onDropDownChange(this.datasource2.find(function (item) { return item.ReportFieldId == 950 }));
            }
            this.onDropDownChange(this.datasource2.find(function (item) { return item.ReportFieldId == 950 }));
        }
    }



    ngOnInit() {
        debugger
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
        if (this.ModuleId == 5) { // for employee
            this.searchFor = this.datasource2.filter(function (item) { return item.DataEntryControlId == 6 });
            if (this.searchFor) {
                var cnt = 0;
                for (let i = 0; i < this.searchFor.length; i++) {
                    if (this.searchFor[i].IsVisible === false)
                        cnt++;
                }
                this.isOccupancyVisible = !(cnt == 4);
                //    this.onDropDownChange(this.datasource2.find(function (item) { return item.ReportFieldId == 950 }));
            }

        }
    }
    public query = '';
    public filteredList = [];
    public elementRef;
    constructor(private notificationService: NotificationService,myElement: ElementRef, private _notificationService: NotificationService, private EmployeeService: EmployeeService) {
        this.elementRef = myElement;
        this.datasource;
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
   

    ISubmit(value: string) {
        debugger
        var nullValueCondition = false;
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
                var DataEntryControl = this.datasource2[i].DataEntryControlId;
                if (DataEntryControl == 20) {
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
                } else if (DataEntryControl == 2 || DataEntryControl == 8) {
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
                        } else {

                            pushingData(this.datasource2[i].ReportFieldId, this.datasource2[i].FieldValue);
                        }
                    }

                } /*else if (this.ModuleId == 5) */ else {
                    var fieldvalue = this.datasource2[i].IsVisible ? this.datasource2[i].FieldValue : "";
                    if (fieldvalue == "Ñµô¥¥ô" || fieldvalue == "" || fieldvalue == "-1" || fieldvalue == "false" || fieldvalue == null) {
                        pushingData(this.datasource2[i].ReportFieldId, fieldvalue);
                    } else {
                        pushingData(this.datasource2[i].ReportFieldId, fieldvalue)
                        nullValueCondition = true;
                    }

                    function pushingData(reportfieldId, fieldvalue) {
                        fieldobj.push({
                            ReportFieldId: reportfieldId,
                            FieldValue: fieldvalue
                        });
                    }
                }
               // } else {
                //    fieldobj.push({
                //        ReportFieldId: this.datasource2[i].ReportFieldId,
                //        FieldValue: this.datasource2[i].FieldValue
                //    });
                //}

                      
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
        })



    }

    onDropDownChange(event: any) {
        debugger
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
                } else {
                    item.IsEnabled = true;
                  //  item.FieldValue = item.IsVisible.toString();
                    item.FieldValue = "";
                    count++
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
    }

    showFilter() {
        debugger
        //this.clickFilter;

        this.divClose.emit({

        });
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
        if (this.ModuleId === 5) {
            if (this.searchFor) {
                value.IsVisible = chk1.checked;
                var cnt = 0;
                for (let i = 0; i < this.searchFor.length; i++) {
                    if (this.searchFor[i].IsVisible === false)
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
    }



    showConfig(value) {
        this.pageTitle = "Configure";
        this.secondaryTarget = 0;
        this.splitviewInput.showSecondaryView = !this.splitviewInput.showSecondaryView;
    }

    onSaveAs(value: any, form: NgForm) {
        value.preventDefault();
        this.SaveAs.emit({
            value: this.datasource2,
        })
    }
    onClear() {
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
            "dataSource": this.datasource2.filter(item => item.IsVisible === false)
        });
    }
    onClose() {
        this.divClose.emit({
           
        });
        //this.showStyle = "none";
        //this.IsShowStyle = false;
        //this.IsShowStyle = true;
        //this.closeSearch.emit({
        //    value: false,
        //    change: false
        //})
    }
    onDelete() {
        this.Delete.emit({
            value: this.selectedValue,
        })
    }

    cancelClick(event: Event) {
        this.closeSearch.emit({
            value: false,
            change: false
        })
    }

    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }  


    handleKeyboardEvents(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '27') {

            //if (this.showStyle == "block") {
            //    this.showStyle = "none";
            //}
        }
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

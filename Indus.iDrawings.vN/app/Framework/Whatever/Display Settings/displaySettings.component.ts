import {Component, ElementRef, Renderer, Output, Input, EventEmitter, OnChanges, SimpleChange, OnInit, AfterViewChecked} from '@angular/core';
import { HTTP_PROVIDERS} from '@angular/http';
import { IField } from '../../Models//Interface/IField';
import { IDisplaySettingEntity } from '../../Models/Interface/IDisplaySettingEntity';
import { DND_PROVIDERS, DND_DIRECTIVES } from '../../ExternalLibraries/dnd/ng2-dnd';
import { ColorPickerComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/colorpickercomponent.component';
import {StringTextBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions } from '../../../Models/Common/General';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';

@Component({
    selector: 'display-setting',
    templateUrl: 'app/Framework/Views/Display Settings/displaySettings.component.html',
    inputs: ['fieldObject', 'dataKey', 'dragEnable', 'displaySettingObject'],
    directives: [DND_DIRECTIVES, ColorPickerComponent, SlideComponent, StringTextBoxComponent],
    providers: [AdministrationService, NotificationService, GeneralFunctions]
})

export class DisplaySettingsComponent implements OnInit, OnChanges, AfterViewChecked {

    dragEnable: boolean = false; /*to enable drag and drop option */
    IsDrawingSelectAllChecked: boolean;
    IsToolTipSelectAllChecked: boolean;
    IsGridSelectAllChecked: boolean;
    IsBoldSelectAllChecked: boolean;
    IsItalicsSelectAllChecked: boolean;
    IsChecked: boolean = true;
    blnFontSizeError: boolean = false;
    blnShownFontSizeError: boolean = false;
    blnLinespacingError: boolean = false;
    blnShownLineSpacingError: boolean = false;
    showDispSetSlide = false;
    disableBtnSave: boolean = false;
    Position = "bottom-right";
    strAlign = "center";
    dataKey: any[];
    fieldObjectArray: any[];
    displaySettingArray: any[];
    fieldId: number[] = [];
    colorPickerObj: IField[];
    setArray = [0, 0];
    filteredFieldArray: IDisplaySettingEntity;
    displaysettingsCols: IField[];
    displaySettingObject: IDisplaySettingEntity[];
    dispSettingObject = new Array<IDisplaySettingEntity>();
    arrayList = new Array<IField>();
    strarrayList = new Array<IField>();
    reportFieldList = new Array<ReportFieldArray>();
    reportFieldIds = new Array<ReportFieldArray>();
    fontSizeArray = new Array<FontSizeArray>();
    displaysettingsArrList = new Array<IDisplaySettingEntity>();
    @Input() filteredField: IDisplaySettingEntity[];
    @Input() IsGrid: boolean = false;
    @Input() DisplaySettingCategoryId: number;
    @Input() AdditionalDataFieldCategoryId: number;
    @Input() ObjectCategoryId: number;
    @Input() ObjectClassId: number;
    @Input() PageId: number;
    @Input() isArchive: boolean = false;
    @Output() emitdisplaySetting = new EventEmitter();
    Dragged: boolean = false;
    spacedisplaysettingcategory=[1,11,13,15,16,17,18,19,21,23,25,29,33]

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private generalFunctions: GeneralFunctions) {
    }

    ngOnInit() {
        var contextObj = this;
        $("#ColorPickerDiv").css("margin-left", "-50%");
        contextObj.Dragged = false;
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        contextObj.DisplaySettingCategoryId = contextObj.DisplaySettingCategoryId;
        contextObj.AdditionalDataFieldCategoryId = contextObj.AdditionalDataFieldCategoryId;
        contextObj.ObjectCategoryId = contextObj.ObjectCategoryId;
        if (changes["ObjectClassId"] && changes["ObjectClassId"]["currentValue"] != changes["ObjectClassId"]["previousValue"]) {
            contextObj.ObjectClassId = contextObj.ObjectClassId;
        }
        contextObj.getdisplaySettingsData();
        $("#ColorPickerDiv").css("margin-left", "-50%");
    }
    ngAfterViewChecked() {
        $("input[name='StringTextBox']").css("border-color", "gray");
        if (this.dispSettingObject) {
            for (var i = 0; i < this.dispSettingObject.length; i++) {
                if (this.dispSettingObject[i].ShowinDrawing == false) {
                    var chkBold = <HTMLInputElement>document.getElementById(this.dispSettingObject[i].ReportFieldId.toString() + "chkBold" + i)
                    if (chkBold) {
                        chkBold.disabled = true;
                    }
                    var chkItalic = <HTMLInputElement>document.getElementById(this.dispSettingObject[i].ReportFieldId.toString() + "chkItalic" + i)
                    if (chkItalic) {
                        chkItalic.disabled = true;
                    }
                }
            }
        }
    }

    getdisplaySettingsData() {
        var chkDrawingCount = 0;
        var chkToolTipCount = 0;
        var chkGridCount = 0;
        var chkBoldCount = 0;
        var chkItalicCount = 0;
        var contextObj = this;
        contextObj.dispSettingObject = [];
        this.administrationService.getDisplaySettingsColumns().subscribe(function (result) {
            contextObj.displaysettingsCols = result["Data"];
        });
        if (this.DisplaySettingCategoryId != null && this.AdditionalDataFieldCategoryId != null) {
            this.reportFieldList = [];
            if (this.isArchive) {
                this.reportFieldList.push({
                    ReportFieldId: 1534,
                    Value: this.DisplaySettingCategoryId.toString()
                });
                this.reportFieldList.push({
                    ReportFieldId: 1533,
                    Value: this.AdditionalDataFieldCategoryId.toString()
                });
            } else {
                this.reportFieldList.push({
                    ReportFieldId: 182,
                    Value: this.DisplaySettingCategoryId.toString()
                });
                this.reportFieldList.push({
                    ReportFieldId: 24,
                    Value: this.AdditionalDataFieldCategoryId.toString()
                });
                if (this.ObjectCategoryId != undefined) {
                    this.reportFieldList.push({
                        ReportFieldId: 4281,
                        Value: this.ObjectCategoryId.toString()
                    });
                }
                if (this.ObjectClassId != undefined) {
                    this.reportFieldList.push({
                        ReportFieldId: 647,
                        Value: this.ObjectClassId.toString()
                    });
                }
            }
            this.administrationService.getDisplaySettingData(JSON.stringify(this.reportFieldList)).subscribe(function (result) {
                if (JSON.parse(JSON.stringify(result["Data"])).length == 0) {
                    $("input[name='SelectAllBold']").attr("disabled", "true");
                    $("input[name='SelectAllItalics']").attr("disabled", "true");
                    $("input[name='SelectAllDrawing']").attr("disabled", "true");
                    $("input[name='SelectAllToolTip']").attr("disabled", "true");
                    $("input[name='SelectAllGrid']").attr("disabled", "true");
                }
                else {
                    $("input[name='SelectAllBold']").removeAttr("disabled");
                    $("input[name='SelectAllItalics']").removeAttr("disabled");
                    $("input[name='SelectAllDrawing']").removeAttr("disabled");
                    $("input[name='SelectAllToolTip']").removeAttr("disabled");
                    $("input[name='SelectAllGrid']").removeAttr("disabled");
                }

                if (contextObj.IsGrid == true) {
                    var arrdata: IDisplaySettingEntity[] = JSON.parse(JSON.stringify(result["Data"]));
                    for (var i = 0; i < arrdata.length; i++) {
                        if (arrdata[i].ReportFieldId != 990001 && arrdata[i].ReportFieldId != 990002) {
                            contextObj.dispSettingObject.push(arrdata[i]);
                        }
                    }
                }
                else {
                    contextObj.dispSettingObject = result["Data"];
                }
                if (contextObj.dispSettingObject != null && contextObj.dispSettingObject.length > 0) {
                    for (var i = 0; i < contextObj.dispSettingObject.length; i++) {
                        if (contextObj.dispSettingObject[i].ShowinDrawing == true) {
                            chkDrawingCount++;
                        }
                        if (contextObj.dispSettingObject[i].ShowinTooltip == true) {
                            chkToolTipCount++;
                        }
                        if (contextObj.dispSettingObject[i].ShowinGrid == true) {
                            chkGridCount++;
                        }
                        if (contextObj.dispSettingObject[i].IsBold == true) {
                            chkBoldCount++;
                        }
                        if (contextObj.dispSettingObject[i].IsItalic == true) {
                            chkItalicCount++;
                        }
                    }
                    console.log('chkDrawingCount', chkDrawingCount)
                    console.log('chkToolTipCount', chkToolTipCount)
                    console.log('chkBoldCount', chkBoldCount)
                    console.log('chkItalicCount', chkItalicCount)
                    if (contextObj.spacedisplaysettingcategory.includes(contextObj.DisplaySettingCategoryId)) {
                        if (contextObj.dispSettingObject.length - 1 == chkDrawingCount) {
                            contextObj.IsDrawingSelectAllChecked = true;
                        }
                        if (contextObj.dispSettingObject.length - 1 == chkToolTipCount) {
                            contextObj.IsToolTipSelectAllChecked = true;
                        }
                        if (contextObj.dispSettingObject.length - 1 == chkGridCount) {
                            contextObj.IsGridSelectAllChecked = true;
                        }
                        if (contextObj.dispSettingObject.length - 1 == chkBoldCount) {
                            contextObj.IsBoldSelectAllChecked = true;
                        }
                        if (contextObj.dispSettingObject.length - 1 == chkItalicCount) {
                            contextObj.IsItalicsSelectAllChecked = true;
                        }
                    }
                    else {
                        if (contextObj.dispSettingObject.length == chkDrawingCount) {
                            contextObj.IsDrawingSelectAllChecked = true;
                        }
                        if (contextObj.dispSettingObject.length == chkToolTipCount) {
                            contextObj.IsToolTipSelectAllChecked = true;
                        }
                        if (contextObj.dispSettingObject.length == chkGridCount) {
                            contextObj.IsGridSelectAllChecked = true;
                        }
                        if (contextObj.dispSettingObject.length == chkBoldCount) {
                            contextObj.IsBoldSelectAllChecked = true;
                        }
                        if (contextObj.dispSettingObject.length == chkItalicCount) {
                            contextObj.IsItalicsSelectAllChecked = true;
                        }
                    }
                    if (contextObj.IsGrid == false) {
                        for (let i = 0; i < contextObj.dispSettingObject.length; i++) {

                            contextObj.arrayList.push({ /*fieldobject for colorpicker*/
                                FormFieldId: 1,
                                FieldId: i,
                                ReportFieldId: contextObj.dispSettingObject[i].ReportFieldId,
                                FieldLabel: "",
                                DataEntryControlId: 11,
                                GenericDataTypeId: 6,
                                Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[a-zA-Z0-9!@#$%&*()+=\\s\\:.,/?[\\]_-]+$" },
                                FieldValue: contextObj.dispSettingObject[i].Color.toString(),
                                IsMandatory: false,
                                IsVisible: true,
                                IsEnabled: contextObj.dispSettingObject[i].ShowinDrawing,
                                isContentHtml: "",
                                Precision: 0,
                                Scale: 0,
                                Height: 0,
                                IsSigned: false,
                                RangeFrom: "",
                                RangeTo: "",
                                HelpText: "",
                                IsGrouped: false,
                                HasChild: false,
                                ParentId: 0,
                                IsSubField: false,
                            });
                            if (contextObj.dispSettingObject[i].ReportFieldId == 990001 || contextObj.dispSettingObject[i].ReportFieldId == 990002) {
                                contextObj.strarrayList.push({ /*fieldobject for Font Size */
                                    FormFieldId: 1,
                                    FieldId: i,
                                    ReportFieldId: contextObj.dispSettingObject[i].ReportFieldId,
                                    FieldLabel: "Line Space in Drawing",
                                    DataEntryControlId: 1,
                                    GenericDataTypeId: 5,
                                    Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[0-9,]+$" },
                                    FieldValue: contextObj.dispSettingObject[i].FontSize.toString(),
                                    IsMandatory: true,
                                    IsVisible: true,
                                    IsEnabled: true,
                                    isContentHtml: "",
                                    Precision: 0,
                                    Scale: 0,
                                    IsHiddenLabel: true,
                                    Height: 30,
                                    IsSigned: false,
                                    RangeFrom: null,
                                    RangeTo: null,
                                    MaxLength: 2,
                                    HelpText: "",
                                    Width: "30",
                                    IsGrouped: false,
                                    HasChild: false,
                                    ParentId: 0,
                                    IsSubField: false,
                                });
                            }
                            else {
                                contextObj.strarrayList.push({ /*fieldobject for Font Size */
                                    FormFieldId: 1,
                                    FieldId: i,
                                    ReportFieldId: contextObj.dispSettingObject[i].ReportFieldId,
                                    FieldLabel: "",
                                    DataEntryControlId: 1,
                                    GenericDataTypeId: 5,
                                    Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[0-9,]+$" },
                                    FieldValue: (contextObj.dispSettingObject[i].ShowinDrawing == true) ? ((contextObj.dispSettingObject[i].FontSize > 2) ? contextObj.dispSettingObject[i].FontSize.toString() : "3") : "",
                                    IsMandatory: false,
                                    IsVisible: true,
                                    IsEnabled: contextObj.dispSettingObject[i].ShowinDrawing,
                                    isContentHtml: "",
                                    Precision: 0,
                                    Scale: 0,
                                    Height: 30,
                                    IsSigned: false,
                                    RangeFrom: null,
                                    RangeTo: null,
                                    HelpText: "",
                                    Width: "30",
                                    MaxLength: 2,
                                    IsGrouped: false,
                                    HasChild: false,
                                    ParentId: 0,
                                    IsSubField: false,
                                });
                            }
                        }
                    }
                    for (let j = 0; j < contextObj.dispSettingObject.length; j++) {
                        contextObj.displaysettingsArrList[j] = contextObj.dispSettingObject[j];
                        contextObj.fontSizeArray.push({
                            ReportFieldId: contextObj.dispSettingObject[j].ReportFieldId,
                            FontSize: contextObj.dispSettingObject[j].FontSize.toString()
                        });
                    }
                }
                else {
                    contextObj.IsDrawingSelectAllChecked = false;
                    contextObj.IsToolTipSelectAllChecked = false;
                    contextObj.IsGridSelectAllChecked = false;
                    contextObj.IsBoldSelectAllChecked = false;
                    contextObj.IsItalicsSelectAllChecked = false;
                }
                console.log("on load", contextObj.dispSettingObject);
            });
        }
    }

    getColorChange(event) {
        if (this.dispSettingObject != null) {
            for (let i = 0; i < this.displaysettingsArrList.length; i++) {
                if (this.displaysettingsArrList[i].ReportFieldId == event.ReportFieldId) {
                    this.displaysettingsArrList[i].RGB = event.RGBValue.replace("#", " ").trim();
                    this.displaysettingsArrList[i].AccessColorId = event.AccessColorId;
                    this.displaysettingsArrList[i].Color = event.AutoCadColorId;
                }
            }
        }
    }

    onChangeInput(event) {
        var contextObj = this;
        var fieldId;
        var rptFieldId;
        if (event.txtBoxData.target.value.includes('.')) {
            event.txtBoxData.target.value = event.txtBoxData.target.value.replace('.', '');
        }
        if (event.fieldObject.ReportFieldId == 990001 || event.fieldObject.ReportFieldId == 990002) {
            if ((Number(event.fieldObject.FieldValue) > 0) && (Number(event.fieldObject.FieldValue < 11))) {
                if (this.dispSettingObject != null) {
                    for (let i = 0; i < this.displaysettingsArrList.length; i++) {
                        if (this.displaysettingsArrList[i].ReportFieldId == event.fieldObject.ReportFieldId) {
                            this.displaysettingsArrList[i].FontSize = event.txtBoxData.target.value;
                        }
                        if (this.fontSizeArray[i].ReportFieldId == event.fieldObject.ReportFieldId) {
                            this.fontSizeArray[i].ReportFieldId = event.txtBoxData.target.value;
                        }
                    }
                }
                this.blnLinespacingError = false;
            }
            else {
                contextObj.notificationService.ShowToaster("Enter Line Space in Drawing between 1 and 10", 2);
                this.blnLinespacingError = true;
                this.blnShownLineSpacingError = true;
            }
        }
        else {
            if ((Number(event.fieldObject.FieldValue) > 0) && (Number(event.fieldObject.FieldValue < 16))) {
                if (this.dispSettingObject != null) {
                    for (let i = 0; i < this.displaysettingsArrList.length; i++) {
                        if (this.displaysettingsArrList[i].ReportFieldId == event.fieldObject.ReportFieldId) {
                            this.displaysettingsArrList[i].FontSize = event.txtBoxData.target.value;
                        }
                        if (this.fontSizeArray[i].ReportFieldId == event.fieldObject.ReportFieldId) {
                            this.fontSizeArray[i].ReportFieldId = event.txtBoxData.target.value;
                        }
                    }
                }
                this.blnFontSizeError = false;
            }
            else {
                contextObj.notificationService.ShowToaster("Enter Font Size between 1 and 15 ", 2);
                this.blnFontSizeError = true;
                this.blnShownFontSizeError = true;
            }
        }
        rptFieldId = event.fieldObject.ReportFieldId; /*code to set focus on font size textbox*/
        for (var i = 0; i < this.strarrayList.length; i++) {
            if (this.strarrayList[i].ReportFieldId == rptFieldId) {
                fieldId = this.strarrayList[i].FieldId;
            }
        }
        var element = <HTMLElement>document.getElementById(fieldId);
        if (element != undefined) {
            element.focus();
        }
    }

    selectAllOptionsBold(event: any) {
        if (this.dispSettingObject != null) {
            if (event.target.checked == true) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    if (this.dispSettingObject[i].ShowinDrawing == true) {
                        this.dispSettingObject[i].IsBold = true;
                        this.IsChecked = true;
                    }
                }
            }
            else if (event.target.checked == false) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].IsBold = false;
                    this.IsChecked = false;
                }
            }
        }
    }

    selectAllOptionsItalics(event: any) {
        if (this.dispSettingObject != null) {
            if (event.target.checked == true) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    if (this.dispSettingObject[i].ShowinDrawing == true) {
                        this.dispSettingObject[i].IsItalic = true;
                        this.IsChecked = true;
                    }
                }
            }
            else if (event.target.checked == false) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].IsItalic = false;
                    this.IsChecked = false;
                }
            }
        }
    }

    selectAllOptionsDrawing(event: any) {
        var contextObj = this;
        if (this.dispSettingObject != null) {
            if (event.target.checked == true) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].ShowinDrawing = true;
                    this.IsChecked = true;
                }
                $("input[name='chkBold']").removeAttr("disabled")
                $("input[name='chkItalic']").removeAttr("disabled")
                $("input[name='SelectAllBold").removeAttr("disabled")
                $("input[name='SelectAllItalics").removeAttr("disabled")

                for (var i = 0; i < contextObj.strarrayList.length; i++) {
                    if (contextObj.strarrayList[i].ReportFieldId != 990001 && contextObj.strarrayList[i].ReportFieldId != 990002) {
                        contextObj.strarrayList[i].IsEnabled = true;
                        contextObj.strarrayList[i].FieldValue = contextObj.fontSizeArray[i].FontSize;
                    }
                }
                for (var j = 0; j < contextObj.arrayList.length; j++) {
                    contextObj.arrayList[j].IsEnabled = true;
                    contextObj.arrayList[j].FieldValue = "FF0000";
                }
            }
            else if (event.target.checked == false) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].ShowinDrawing = false;
                    this.dispSettingObject[i].IsBold = false;
                    this.dispSettingObject[i].IsItalic = false;
                    this.IsChecked = false;
                }



                $("input[name='chkBold']").attr("disabled", "true")
                $("input[name='chkItalic']").attr("disabled", "true")
                $("input[name='SelectAllBold").attr("disabled", "true")
                $("input[name='SelectAllItalics").attr("disabled", "true")
                $("input[name='SelectAllBold").attr("checked", "false")
                $("input[name='SelectAllItalics").attr("checked", "false")

                for (var i = 0; i < contextObj.strarrayList.length; i++) {
                    if (contextObj.strarrayList[i].ReportFieldId != 990001 && contextObj.strarrayList[i].ReportFieldId != 990002) {
                        contextObj.strarrayList[i].IsEnabled = false;
                        contextObj.strarrayList[i].FieldValue = "";
                    }
                }

                for (var j = 0; j < contextObj.arrayList.length; j++) {
                    contextObj.arrayList[j].IsEnabled = false;
                }



            }
        }
    }

    selectAllOptionsToolTip(event: any) {
        if (this.dispSettingObject != null) {
            if (event.target.checked == true) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].ShowinTooltip = true;
                    this.IsChecked = true;
                }
            }
            else if (event.target.checked == false) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].ShowinTooltip = false;
                    this.IsChecked = false;
                }
            }
        }
    }

    selectAllOptionsGrid(event: any) {
        if (this.dispSettingObject != null) {
            if (event.target.checked == true) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].ShowinGrid = true;
                    this.IsChecked = true;
                }
            }
            else if (event.target.checked == false) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].ShowinGrid = false;
                    this.IsChecked = false;
                }
            }
        }
    }

    updateCheckedOptionsDrawing(option, event) {
        var contextObj = this;
        var disableItems: boolean = false;
        var rptFieldId = option.ReportFieldId;
        var chkPosition: number;

        this.Check(1);
        if (event.currentTarget.checked == false) { /*checking condition for enabling or disabling textbox or color*/
            disableItems = true;
        }
        else {
            disableItems = false;
        }
        for (var i = 0; i < contextObj.dispSettingObject.length; i++) {
            if (contextObj.dispSettingObject[i].ReportFieldId == rptFieldId) {
                chkPosition = i;
            }
        }
        var fontSizeObj = this.strarrayList.find(function (el) { return el.ReportFieldId == rptFieldId; });
        var colorObj = this.arrayList.find(function (el) { return el.ReportFieldId == rptFieldId; });
        if (disableItems == true) {
            var chkBold = <HTMLInputElement>document.getElementById(event.target.id + "chkBold" + chkPosition);
            chkBold.disabled = true;
            var chkItalic = <HTMLInputElement>document.getElementById(event.target.id + "chkItalic" + chkPosition);
            chkItalic.disabled = true;
            if (fontSizeObj.ReportFieldId == 990001 || fontSizeObj.ReportFieldId == 990002) {
                fontSizeObj.IsEnabled = true;
            }
            else {
                fontSizeObj.IsEnabled = false;
                fontSizeObj.FieldValue = "";
            }
            colorObj.IsEnabled = false;
            for (var j = 0; j < contextObj.dispSettingObject.length; j++) {
                if (contextObj.dispSettingObject[j].ReportFieldId == rptFieldId) {
                    contextObj.dispSettingObject[j].IsBold = false;
                    contextObj.dispSettingObject[j].IsItalic = false;
                }
            }
        }
        else {
            var chkBold = <HTMLInputElement>document.getElementById(event.target.id + "chkBold" + chkPosition);
            chkBold.disabled = false;
            var chkItalic = <HTMLInputElement>document.getElementById(event.target.id + "chkItalic" + chkPosition);
            chkItalic.disabled = false;
            var strFontSize = this.fontSizeArray.find(function (el) { return el.ReportFieldId == rptFieldId; });
            fontSizeObj.IsEnabled = true;
            fontSizeObj.FieldValue = strFontSize.FontSize;
            colorObj.IsEnabled = true;
            colorObj.FieldValue = "FF0000";
        }
    }

    updateCheckedOptionsToolTip(option, event) {
        this.Check(2);
    }

    updateCheckedOptionsGrid(option, event) {
        this.Check(3);
    }

    updateCheckedOptionsIsBold(option, event) {
        this.Check(4);
    }

    updateCheckedOptionsIsItalic(option, event) {
        this.Check(5);
    }

    checkedOptionDrawing(fieldObj): boolean {
        this.Check(1);
        return fieldObj["IsVisible"]
    }

    checkedOptionToolTip(fieldObj): boolean {
        this.Check(2);
        return fieldObj["IsVisible"]
    }

    checkedOptionGrid(fieldObj): boolean {
        this.Check(3);
        return fieldObj["IsVisible"]
    }

    checkedOptionIsBold(fieldObj): boolean {
        this.Check(4);
        return fieldObj["IsVisible"]
    }

    checkedOptionIsItalic(fieldObj): boolean {
        this.Check(5);
        return fieldObj["IsVisible"]
    }

    Check(target) {
        var blnLineSpacing: boolean = false;
        for (var i = 0; i < this.dispSettingObject.length; i++) {
            if (this.dispSettingObject[i].ReportFieldId == 990001 || this.dispSettingObject[i].ReportFieldId == 990002) {
                blnLineSpacing = true;
                break;
            }
        }
        if (this.dispSettingObject != null) {
            switch (target) {
                case 1:
                    var countDrawing = 0;
                    for (let i = 0; i < this.dispSettingObject.length; i++) {
                        if (this.dispSettingObject[i].ShowinDrawing == true) {
                            countDrawing++;
                        }
                    }
                    //if (blnLineSpacing == true) {
                    //    countDrawing++;
                    //}

                    if (this.spacedisplaysettingcategory.includes(this.DisplaySettingCategoryId)) {
                        if (countDrawing-1 == this.dispSettingObject.length - 1) {
                            this.IsDrawingSelectAllChecked = true;
                        }
                        else {
                            this.IsDrawingSelectAllChecked = false;
                            this.IsBoldSelectAllChecked = false;
                            this.IsItalicsSelectAllChecked = false;
                        }
                    }
                    else {
                        if (countDrawing == this.dispSettingObject.length) {
                            this.IsDrawingSelectAllChecked = true;
                        }
                        else {
                            this.IsDrawingSelectAllChecked = false;
                            this.IsBoldSelectAllChecked = false;
                            this.IsItalicsSelectAllChecked = false;
                        }
                    }
                    break;
                case 2:
                    var countToolTip = 0;
                    for (let i = 0; i < this.dispSettingObject.length; i++) {
                        if (this.dispSettingObject[i].ShowinTooltip == true) {
                            countToolTip++;
                        }
                    }
                    //if (blnLineSpacing == true) {
                    //    countToolTip++;
                    //}
                    if (this.spacedisplaysettingcategory.includes(this.DisplaySettingCategoryId)) {
                        if (countToolTip - 1 == this.dispSettingObject.length - 1) {
                            this.IsToolTipSelectAllChecked = true;
                        }
                        else {
                            this.IsToolTipSelectAllChecked = false;
                        }
                    }
                    else {
                        if (countToolTip == this.dispSettingObject.length) {
                            this.IsToolTipSelectAllChecked = true;
                        }
                        else {
                            this.IsToolTipSelectAllChecked = false;
                        }
                    }
                    break;
                case 3:
                    var countGrid = 0;
                    for (let i = 0; i < this.dispSettingObject.length; i++) {
                        if (this.dispSettingObject[i].ShowinGrid == true) {
                            countGrid++;
                        }
                    }
                    //if (blnLineSpacing == true) {
                    //    countGrid++;
                    //}
                    if (countGrid == this.dispSettingObject.length) {
                        this.IsGridSelectAllChecked = true;
                    }
                    else {
                        this.IsGridSelectAllChecked = false;
                    }
                    break;
                case 4:
                    var countIsBold = 0;
                    for (let i = 0; i < this.dispSettingObject.length; i++) {

                        if (this.dispSettingObject[i].IsBold == true) {
                            countIsBold++;
                        }
                    }
                    //if (blnLineSpacing == true) {
                    //    countIsBold++;
                    //}
                    if (this.spacedisplaysettingcategory.includes(this.DisplaySettingCategoryId)) {
                        if (countIsBold - 1 == this.dispSettingObject.length - 1) {
                            this.IsBoldSelectAllChecked = true;
                        }
                        else {
                            this.IsBoldSelectAllChecked = false;
                        }
                    }
                    else {
                        if (countIsBold == this.dispSettingObject.length) {
                            this.IsBoldSelectAllChecked = true;
                        }
                        else {
                            this.IsBoldSelectAllChecked = false;
                        }
                    }
                    break;
                case 5:
                    var countItalic = 0;
                    for (let i = 0; i < this.dispSettingObject.length; i++) {
                        if (this.dispSettingObject[i].IsItalic == true) {
                            countItalic++;
                        }
                    }
                    //if (blnLineSpacing == true) {
                    //    countItalic++;
                    //}
                    if (this.spacedisplaysettingcategory.includes(this.DisplaySettingCategoryId)) {
                        if (countItalic - 1 == this.dispSettingObject.length - 1) {
                            this.IsItalicsSelectAllChecked = true;
                        }
                        else {
                            this.IsItalicsSelectAllChecked = false;
                        }
                    }
                    else {
                        if (countItalic == this.dispSettingObject.length) {
                            this.IsItalicsSelectAllChecked = true;
                        }
                        else {
                            this.IsItalicsSelectAllChecked = false;
                        }
                    }
                    break;
            }
        }
    }

    getKeyUp(event) {
        if (event.charCode >= 48 && event.charCode <= 57) {
        }
        else {
            if (event.charCode == 8 || event.charCode == 46) {
            }
            else {
                event.preventDefault();
            }
        }

    }

    SaveClick() {
        var contextObj = this;
        contextObj.reportFieldIds = [];
        contextObj.disableBtnSave = false;
        if (this.blnFontSizeError == true) {
            if (this.blnShownFontSizeError == false) {
                contextObj.notificationService.ShowToaster("Enter Font Size between 1 and 15 ", 2);
            }
        }
        else if (this.blnLinespacingError == true) {
            if (this.blnShownLineSpacingError == false) {
                contextObj.notificationService.ShowToaster("Enter Line Space in Drawing between 1 and 10", 2);
            }
        }
        else {
            var selectedGridItemsCount = 0;
            var blnCheckPrivilege: boolean = false;
            var displaySettingCategoryId = this.DisplaySettingCategoryId;
            var moduleID = "";
            if (displaySettingCategoryId != null) {
                switch (displaySettingCategoryId) {
                    case 1: /*space*/
                        moduleID = "3";
                        break;
                    case 2:/*CAI*/
                        moduleID = "12";
                        break;
                    case 3: /*Asset*/
                        moduleID = "7";
                        break;
                    case 4: /*Furniture*/
                        moduleID = "8";
                        break;
                    case 5: /*Telecom*/
                        moduleID = "6";
                        break;
                    case 6: /*employee*/
                        moduleID = "5";
                        break;
                    case 7: /*Documents*/
                        moduleID = "4";
                        break;
                    case 9: /*Electrical*/
                        moduleID = "17";
                        break;
                    case 10: /*Fire and Safety*/
                        moduleID = "18";
                        break;
                    case 20: /*Mechanical*/
                        moduleID = "25";
                        break;
                    case 22: /*Plumbing*/
                        moduleID = "26";
                        break;
                    case 24: /*Medical Gas*/
                        moduleID = "27";
                        break;
                    case 32: /*Security Assets*/
                        moduleID = "24";
                        break;
                    case 13: /*Asset - Space*/
                    case 15: /*Furniture - Space*/
                    case 16: /*Telecom - Space*/
                    case 18: /*Electrical - Space*/
                    case 19: /*Fire and Safety - Space*/
                    case 21: /*Mechanical - Space*/
                    case 23: /*Plumbing - Space*/
                    case 25: /*Medical Gas - Space*/
                    case 33: /*Security Assets - Space*/
                        moduleID = "3";
                        break;

                    case 14: /*asbuilts*/
                        moduleID = "1";
                        break;
                    case 17: /*employee - space*/
                        moduleID = "3";
                        break;
                    case 29: /*scheduling*/
                    case 47:
                        moduleID = "14";
                        break;


                }
            }
            contextObj.reportFieldIds.push({
                ReportFieldId: 278,
                Value: moduleID
            });

            contextObj.reportFieldList.push({
                ReportFieldId: 278,
                Value: moduleID
            });
            var test = contextObj.dispSettingObject;
            debugger;
            if (contextObj.dispSettingObject != undefined) {
                for (var i = 0; i < contextObj.dispSettingObject.length; i++) {
                    if (contextObj.dispSettingObject[i].ReportFieldId == 990001 || contextObj.dispSettingObject[i].ReportFieldId == 990002) {
                        contextObj.dispSettingObject[i].IsBold = false;
                        contextObj.dispSettingObject[i].IsItalic = false;
                        contextObj.dispSettingObject[i].ShowinDrawing = false;
                        contextObj.dispSettingObject[i].ShowinGrid = false;
                        contextObj.dispSettingObject[i].ShowinTooltip = false;
                    }
                }
            }
            if (this.dispSettingObject != null && this.dispSettingObject.length > 0) {
                this.displaySettingArray = this.displaysettingsArrList;
                if (contextObj.IsGrid == true) {
                    for (var i = 0; i < this.dispSettingObject.length; i++) {
                        if (this.dispSettingObject[i].ShowinGrid == true) {
                            selectedGridItemsCount++;
                        }
                        contextObj.fieldId[i] = this.displaySettingArray[i]["ReportFieldId"]
                    }
                    if (selectedGridItemsCount > 0) {

                        contextObj.postUpdateDisplaySettingsData();
                    }
                    else {
                        if (moduleID != "7") { /*no need to display message for asset Bug 73167*/
                            contextObj.notificationService.ShowToaster("At least one column needs to be selected", 2);
                        }
                        else {
                            // contextObj.emitdisplaySetting.emit(contextObj.dispSettingObject);
                            contextObj.postUpdateDisplaySettingsData();
                        }
                    }
                }
                else {
                    // contextObj.emitdisplaySetting.emit(contextObj.dispSettingObject);
                    contextObj.postUpdateDisplaySettingsData();
                }
            }
        }
    }

    postUpdateDisplaySettingsData() {
        var contextObj = this;
        //ADDED BY SAIRA
        for (let j = 0; j < contextObj.dispSettingObject.length; j++) {
            console.log(contextObj.dispSettingObject[j].PositionNo)
            contextObj.displaysettingsArrList[j] = contextObj.dispSettingObject[j];
            if (contextObj.Dragged == true)
                contextObj.displaysettingsArrList[j].PositionNo = j + 1;
            //contextObj.fontSizeArray.push({
            //    ReportFieldId: contextObj.dispSettingObject[j].ReportFieldId,
            //    FontSize: contextObj.dispSettingObject[j].FontSize.toString()
            //});
        }

        //END OF ADDED CODE
        if (contextObj.isArchive) {
            contextObj.reportFieldList[contextObj.reportFieldList.findIndex(function (el) { return el.ReportFieldId == 278 })].Value = "12";
            this.administrationService.postUpdateArchiveDisplaySettings(JSON.stringify(contextObj.reportFieldList), JSON.stringify(this.displaysettingsArrList), contextObj.AdditionalDataFieldCategoryId, contextObj.DisplaySettingCategoryId).subscribe(function (result) { //AdditionalDataFieldCategoryId is ArchiveId and DisplaySettingCategoryId is DrawingId if isArchive True
                contextObj.notificationService.ShowToaster("User default settings updated", 3);
                if (result["Data"].StatusId == 1) {
                    contextObj.administrationService.postcheckIsModuleAdminUrl(JSON.stringify(contextObj.reportFieldIds)).subscribe(function (resultData) {
                        if (resultData["Data"] == true) { /*1 or 0*/
                        }
                    });
                }
                else {
                    contextObj.showDispSetSlide = false;
                }
                contextObj.disableBtnSave = false;
                console.log("after save", contextObj.dispSettingObject);
                contextObj.emitdisplaySetting.emit({ "dispSettingObject": contextObj.dispSettingObject, "IsDragged": contextObj.Dragged });
            });
        } else {
            this.administrationService.postUpdateDataDisplaySettings(JSON.stringify(contextObj.reportFieldList), JSON.stringify(this.displaysettingsArrList)).subscribe(function (result) {
                contextObj.notificationService.ShowToaster("User default settings updated", 3);
                if (result["Data"].StatusId == 1) {
                    contextObj.administrationService.postcheckIsModuleAdminUrl(JSON.stringify(contextObj.reportFieldIds)).subscribe(function (resultData) {
                        if (resultData["Data"] == true) { /*1 or 0*/
                            contextObj.showDispSetSlide = true;
                        }
                    });
                }
                else {
                    contextObj.showDispSetSlide = false;
                }
                contextObj.disableBtnSave = false;
                console.log("after save", contextObj.dispSettingObject);
                contextObj.emitdisplaySetting.emit({ "dispSettingObject": contextObj.dispSettingObject, "IsDragged": contextObj.Dragged });
            });
        }
    }

    DefaultSetting(event: any) {
        var contextObj = this;
        var PageTarget;
        this.administrationService.postUpdateCustomerDataDisplaySettings(JSON.stringify(this.reportFieldList), JSON.stringify(this.displaysettingsArrList)).subscribe(function (result) {
            contextObj.notificationService.ShowToaster("System default settings updated", 3);
            //contextObj.emitdisplaySetting.emit(contextObj.dispSettingObject);
        });

        this.showDispSetSlide = false;
    }

    cancelClick(value: any) {
        var contextObj = this;
        this.showDispSetSlide = false;
    }

    closeSlideDialog(value: any) {
        this.showDispSetSlide = false;
    }

    ondragEnd(event) {
        console.log(event);
        if (event == true)
            this.Dragged = true;
    }

}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface FontSizeArray {
    ReportFieldId: number;
    FontSize: string;
}

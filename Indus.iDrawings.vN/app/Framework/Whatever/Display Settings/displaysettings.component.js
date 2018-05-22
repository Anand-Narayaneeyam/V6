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
var ng2_dnd_1 = require('../../ExternalLibraries/dnd/ng2-dnd');
var colorpickercomponent_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/colorpickercomponent.component');
var stringtextbox_component_1 = require('../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component');
var administration_service_1 = require('../../../Models/Administration/administration.service');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var General_1 = require('../../../Models/Common/General');
var slide_component_1 = require('../../../Framework/Whatever/Slide/slide.component');
var DisplaySettingsComponent = (function () {
    function DisplaySettingsComponent(administrationService, notificationService, generalFunctions) {
        this.administrationService = administrationService;
        this.notificationService = notificationService;
        this.generalFunctions = generalFunctions;
        this.dragEnable = false; /*to enable drag and drop option */
        this.IsChecked = true;
        this.blnFontSizeError = false;
        this.blnShownFontSizeError = false;
        this.blnLinespacingError = false;
        this.blnShownLineSpacingError = false;
        this.showDispSetSlide = false;
        this.disableBtnSave = false;
        this.Position = "bottom-right";
        this.strAlign = "center";
        this.fieldId = [];
        this.setArray = [0, 0];
        this.dispSettingObject = new Array();
        this.arrayList = new Array();
        this.strarrayList = new Array();
        this.reportFieldList = new Array();
        this.reportFieldIds = new Array();
        this.fontSizeArray = new Array();
        this.displaysettingsArrList = new Array();
        this.IsGrid = false;
        this.isArchive = false;
        this.emitdisplaySetting = new core_1.EventEmitter();
        this.Dragged = false;
        this.spacedisplaysettingcategory = [1, 11, 13, 15, 16, 17, 18, 19, 21, 23, 25, 29, 33];
    }
    DisplaySettingsComponent.prototype.ngOnInit = function () {
        var contextObj = this;
        $("#ColorPickerDiv").css("margin-left", "-50%");
        contextObj.Dragged = false;
    };
    DisplaySettingsComponent.prototype.ngOnChanges = function (changes) {
        var contextObj = this;
        contextObj.DisplaySettingCategoryId = contextObj.DisplaySettingCategoryId;
        contextObj.AdditionalDataFieldCategoryId = contextObj.AdditionalDataFieldCategoryId;
        contextObj.ObjectCategoryId = contextObj.ObjectCategoryId;
        if (changes["ObjectClassId"] && changes["ObjectClassId"]["currentValue"] != changes["ObjectClassId"]["previousValue"]) {
            contextObj.ObjectClassId = contextObj.ObjectClassId;
        }
        contextObj.getdisplaySettingsData();
        $("#ColorPickerDiv").css("margin-left", "-50%");
    };
    DisplaySettingsComponent.prototype.ngAfterViewChecked = function () {
        $("input[name='StringTextBox']").css("border-color", "gray");
        if (this.dispSettingObject) {
            for (var i = 0; i < this.dispSettingObject.length; i++) {
                if (this.dispSettingObject[i].ShowinDrawing == false) {
                    var chkBold = document.getElementById(this.dispSettingObject[i].ReportFieldId.toString() + "chkBold" + i);
                    if (chkBold) {
                        chkBold.disabled = true;
                    }
                    var chkItalic = document.getElementById(this.dispSettingObject[i].ReportFieldId.toString() + "chkItalic" + i);
                    if (chkItalic) {
                        chkItalic.disabled = true;
                    }
                }
            }
        }
    };
    DisplaySettingsComponent.prototype.getdisplaySettingsData = function () {
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
            }
            else {
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
                    var arrdata = JSON.parse(JSON.stringify(result["Data"]));
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
                    console.log('chkDrawingCount', chkDrawingCount);
                    console.log('chkToolTipCount', chkToolTipCount);
                    console.log('chkBoldCount', chkBoldCount);
                    console.log('chkItalicCount', chkItalicCount);
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
                        for (var i_1 = 0; i_1 < contextObj.dispSettingObject.length; i_1++) {
                            contextObj.arrayList.push({
                                FormFieldId: 1,
                                FieldId: i_1,
                                ReportFieldId: contextObj.dispSettingObject[i_1].ReportFieldId,
                                FieldLabel: "",
                                DataEntryControlId: 11,
                                GenericDataTypeId: 6,
                                Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[a-zA-Z0-9!@#$%&*()+=\\s\\:.,/?[\\]_-]+$" },
                                FieldValue: contextObj.dispSettingObject[i_1].Color.toString(),
                                IsMandatory: false,
                                IsVisible: true,
                                IsEnabled: contextObj.dispSettingObject[i_1].ShowinDrawing,
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
                            if (contextObj.dispSettingObject[i_1].ReportFieldId == 990001 || contextObj.dispSettingObject[i_1].ReportFieldId == 990002) {
                                contextObj.strarrayList.push({
                                    FormFieldId: 1,
                                    FieldId: i_1,
                                    ReportFieldId: contextObj.dispSettingObject[i_1].ReportFieldId,
                                    FieldLabel: "Line Space in Drawing",
                                    DataEntryControlId: 1,
                                    GenericDataTypeId: 5,
                                    Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[0-9,]+$" },
                                    FieldValue: contextObj.dispSettingObject[i_1].FontSize.toString(),
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
                                contextObj.strarrayList.push({
                                    FormFieldId: 1,
                                    FieldId: i_1,
                                    ReportFieldId: contextObj.dispSettingObject[i_1].ReportFieldId,
                                    FieldLabel: "",
                                    DataEntryControlId: 1,
                                    GenericDataTypeId: 5,
                                    Whitelist: { Id: 3, FormatString: "", RegularExpression: "^[0-9,]+$" },
                                    FieldValue: (contextObj.dispSettingObject[i_1].ShowinDrawing == true) ? ((contextObj.dispSettingObject[i_1].FontSize > 2) ? contextObj.dispSettingObject[i_1].FontSize.toString() : "3") : "",
                                    IsMandatory: false,
                                    IsVisible: true,
                                    IsEnabled: contextObj.dispSettingObject[i_1].ShowinDrawing,
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
                    for (var j = 0; j < contextObj.dispSettingObject.length; j++) {
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
    };
    DisplaySettingsComponent.prototype.getColorChange = function (event) {
        if (this.dispSettingObject != null) {
            for (var i = 0; i < this.displaysettingsArrList.length; i++) {
                if (this.displaysettingsArrList[i].ReportFieldId == event.ReportFieldId) {
                    this.displaysettingsArrList[i].RGB = event.RGBValue.replace("#", " ").trim();
                    this.displaysettingsArrList[i].AccessColorId = event.AccessColorId;
                    this.displaysettingsArrList[i].Color = event.AutoCadColorId;
                }
            }
        }
    };
    DisplaySettingsComponent.prototype.onChangeInput = function (event) {
        var contextObj = this;
        var fieldId;
        var rptFieldId;
        if (event.txtBoxData.target.value.includes('.')) {
            event.txtBoxData.target.value = event.txtBoxData.target.value.replace('.', '');
        }
        if (event.fieldObject.ReportFieldId == 990001 || event.fieldObject.ReportFieldId == 990002) {
            if ((Number(event.fieldObject.FieldValue) > 0) && (Number(event.fieldObject.FieldValue < 11))) {
                if (this.dispSettingObject != null) {
                    for (var i_2 = 0; i_2 < this.displaysettingsArrList.length; i_2++) {
                        if (this.displaysettingsArrList[i_2].ReportFieldId == event.fieldObject.ReportFieldId) {
                            this.displaysettingsArrList[i_2].FontSize = event.txtBoxData.target.value;
                        }
                        if (this.fontSizeArray[i_2].ReportFieldId == event.fieldObject.ReportFieldId) {
                            this.fontSizeArray[i_2].ReportFieldId = event.txtBoxData.target.value;
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
                    for (var i_3 = 0; i_3 < this.displaysettingsArrList.length; i_3++) {
                        if (this.displaysettingsArrList[i_3].ReportFieldId == event.fieldObject.ReportFieldId) {
                            this.displaysettingsArrList[i_3].FontSize = event.txtBoxData.target.value;
                        }
                        if (this.fontSizeArray[i_3].ReportFieldId == event.fieldObject.ReportFieldId) {
                            this.fontSizeArray[i_3].ReportFieldId = event.txtBoxData.target.value;
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
        var element = document.getElementById(fieldId);
        if (element != undefined) {
            element.focus();
        }
    };
    DisplaySettingsComponent.prototype.selectAllOptionsBold = function (event) {
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
    };
    DisplaySettingsComponent.prototype.selectAllOptionsItalics = function (event) {
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
    };
    DisplaySettingsComponent.prototype.selectAllOptionsDrawing = function (event) {
        var contextObj = this;
        if (this.dispSettingObject != null) {
            if (event.target.checked == true) {
                for (var i = 0; i < this.dispSettingObject.length; i++) {
                    this.dispSettingObject[i].ShowinDrawing = true;
                    this.IsChecked = true;
                }
                $("input[name='chkBold']").removeAttr("disabled");
                $("input[name='chkItalic']").removeAttr("disabled");
                $("input[name='SelectAllBold").removeAttr("disabled");
                $("input[name='SelectAllItalics").removeAttr("disabled");
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
                $("input[name='chkBold']").attr("disabled", "true");
                $("input[name='chkItalic']").attr("disabled", "true");
                $("input[name='SelectAllBold").attr("disabled", "true");
                $("input[name='SelectAllItalics").attr("disabled", "true");
                $("input[name='SelectAllBold").attr("checked", "false");
                $("input[name='SelectAllItalics").attr("checked", "false");
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
    };
    DisplaySettingsComponent.prototype.selectAllOptionsToolTip = function (event) {
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
    };
    DisplaySettingsComponent.prototype.selectAllOptionsGrid = function (event) {
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
    };
    DisplaySettingsComponent.prototype.updateCheckedOptionsDrawing = function (option, event) {
        var contextObj = this;
        var disableItems = false;
        var rptFieldId = option.ReportFieldId;
        var chkPosition;
        this.Check(1);
        if (event.currentTarget.checked == false) {
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
            var chkBold = document.getElementById(event.target.id + "chkBold" + chkPosition);
            chkBold.disabled = true;
            var chkItalic = document.getElementById(event.target.id + "chkItalic" + chkPosition);
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
            var chkBold = document.getElementById(event.target.id + "chkBold" + chkPosition);
            chkBold.disabled = false;
            var chkItalic = document.getElementById(event.target.id + "chkItalic" + chkPosition);
            chkItalic.disabled = false;
            var strFontSize = this.fontSizeArray.find(function (el) { return el.ReportFieldId == rptFieldId; });
            fontSizeObj.IsEnabled = true;
            fontSizeObj.FieldValue = strFontSize.FontSize;
            colorObj.IsEnabled = true;
            colorObj.FieldValue = "FF0000";
        }
    };
    DisplaySettingsComponent.prototype.updateCheckedOptionsToolTip = function (option, event) {
        this.Check(2);
    };
    DisplaySettingsComponent.prototype.updateCheckedOptionsGrid = function (option, event) {
        this.Check(3);
    };
    DisplaySettingsComponent.prototype.updateCheckedOptionsIsBold = function (option, event) {
        this.Check(4);
    };
    DisplaySettingsComponent.prototype.updateCheckedOptionsIsItalic = function (option, event) {
        this.Check(5);
    };
    DisplaySettingsComponent.prototype.checkedOptionDrawing = function (fieldObj) {
        this.Check(1);
        return fieldObj["IsVisible"];
    };
    DisplaySettingsComponent.prototype.checkedOptionToolTip = function (fieldObj) {
        this.Check(2);
        return fieldObj["IsVisible"];
    };
    DisplaySettingsComponent.prototype.checkedOptionGrid = function (fieldObj) {
        this.Check(3);
        return fieldObj["IsVisible"];
    };
    DisplaySettingsComponent.prototype.checkedOptionIsBold = function (fieldObj) {
        this.Check(4);
        return fieldObj["IsVisible"];
    };
    DisplaySettingsComponent.prototype.checkedOptionIsItalic = function (fieldObj) {
        this.Check(5);
        return fieldObj["IsVisible"];
    };
    DisplaySettingsComponent.prototype.Check = function (target) {
        var blnLineSpacing = false;
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
                    for (var i_4 = 0; i_4 < this.dispSettingObject.length; i_4++) {
                        if (this.dispSettingObject[i_4].ShowinDrawing == true) {
                            countDrawing++;
                        }
                    }
                    //if (blnLineSpacing == true) {
                    //    countDrawing++;
                    //}
                    if (this.spacedisplaysettingcategory.includes(this.DisplaySettingCategoryId)) {
                        if (countDrawing - 1 == this.dispSettingObject.length - 1) {
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
                    for (var i_5 = 0; i_5 < this.dispSettingObject.length; i_5++) {
                        if (this.dispSettingObject[i_5].ShowinTooltip == true) {
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
                    for (var i_6 = 0; i_6 < this.dispSettingObject.length; i_6++) {
                        if (this.dispSettingObject[i_6].ShowinGrid == true) {
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
                    for (var i_7 = 0; i_7 < this.dispSettingObject.length; i_7++) {
                        if (this.dispSettingObject[i_7].IsBold == true) {
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
                    for (var i_8 = 0; i_8 < this.dispSettingObject.length; i_8++) {
                        if (this.dispSettingObject[i_8].IsItalic == true) {
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
    };
    DisplaySettingsComponent.prototype.getKeyUp = function (event) {
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
    DisplaySettingsComponent.prototype.SaveClick = function () {
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
            var blnCheckPrivilege = false;
            var displaySettingCategoryId = this.DisplaySettingCategoryId;
            var moduleID = "";
            if (displaySettingCategoryId != null) {
                switch (displaySettingCategoryId) {
                    case 1:
                        moduleID = "3";
                        break;
                    case 2:
                        moduleID = "12";
                        break;
                    case 3:
                        moduleID = "7";
                        break;
                    case 4:
                        moduleID = "8";
                        break;
                    case 5:
                        moduleID = "6";
                        break;
                    case 6:
                        moduleID = "5";
                        break;
                    case 7:
                        moduleID = "4";
                        break;
                    case 9:
                        moduleID = "17";
                        break;
                    case 10:
                        moduleID = "18";
                        break;
                    case 20:
                        moduleID = "25";
                        break;
                    case 22:
                        moduleID = "26";
                        break;
                    case 24:
                        moduleID = "27";
                        break;
                    case 32:
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
                    case 33:
                        moduleID = "3";
                        break;
                    case 14:
                        moduleID = "1";
                        break;
                    case 17:
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
                        contextObj.fieldId[i] = this.displaySettingArray[i]["ReportFieldId"];
                    }
                    if (selectedGridItemsCount > 0) {
                        contextObj.postUpdateDisplaySettingsData();
                    }
                    else {
                        if (moduleID != "7") {
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
    };
    DisplaySettingsComponent.prototype.postUpdateDisplaySettingsData = function () {
        var contextObj = this;
        //ADDED BY SAIRA
        for (var j = 0; j < contextObj.dispSettingObject.length; j++) {
            console.log(contextObj.dispSettingObject[j].PositionNo);
            contextObj.displaysettingsArrList[j] = contextObj.dispSettingObject[j];
            if (contextObj.Dragged == true)
                contextObj.displaysettingsArrList[j].PositionNo = j + 1;
        }
        //END OF ADDED CODE
        if (contextObj.isArchive) {
            contextObj.reportFieldList[contextObj.reportFieldList.findIndex(function (el) { return el.ReportFieldId == 278; })].Value = "12";
            this.administrationService.postUpdateArchiveDisplaySettings(JSON.stringify(contextObj.reportFieldList), JSON.stringify(this.displaysettingsArrList), contextObj.AdditionalDataFieldCategoryId, contextObj.DisplaySettingCategoryId).subscribe(function (result) {
                contextObj.notificationService.ShowToaster("User default settings updated", 3);
                if (result["Data"].StatusId == 1) {
                    contextObj.administrationService.postcheckIsModuleAdminUrl(JSON.stringify(contextObj.reportFieldIds)).subscribe(function (resultData) {
                        if (resultData["Data"] == true) {
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
        else {
            this.administrationService.postUpdateDataDisplaySettings(JSON.stringify(contextObj.reportFieldList), JSON.stringify(this.displaysettingsArrList)).subscribe(function (result) {
                contextObj.notificationService.ShowToaster("User default settings updated", 3);
                if (result["Data"].StatusId == 1) {
                    contextObj.administrationService.postcheckIsModuleAdminUrl(JSON.stringify(contextObj.reportFieldIds)).subscribe(function (resultData) {
                        if (resultData["Data"] == true) {
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
    };
    DisplaySettingsComponent.prototype.DefaultSetting = function (event) {
        var contextObj = this;
        var PageTarget;
        this.administrationService.postUpdateCustomerDataDisplaySettings(JSON.stringify(this.reportFieldList), JSON.stringify(this.displaysettingsArrList)).subscribe(function (result) {
            contextObj.notificationService.ShowToaster("System default settings updated", 3);
            //contextObj.emitdisplaySetting.emit(contextObj.dispSettingObject);
        });
        this.showDispSetSlide = false;
    };
    DisplaySettingsComponent.prototype.cancelClick = function (value) {
        var contextObj = this;
        this.showDispSetSlide = false;
    };
    DisplaySettingsComponent.prototype.closeSlideDialog = function (value) {
        this.showDispSetSlide = false;
    };
    DisplaySettingsComponent.prototype.ondragEnd = function (event) {
        console.log(event);
        if (event == true)
            this.Dragged = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DisplaySettingsComponent.prototype, "filteredField", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DisplaySettingsComponent.prototype, "IsGrid", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DisplaySettingsComponent.prototype, "DisplaySettingCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DisplaySettingsComponent.prototype, "AdditionalDataFieldCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DisplaySettingsComponent.prototype, "ObjectCategoryId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DisplaySettingsComponent.prototype, "ObjectClassId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DisplaySettingsComponent.prototype, "PageId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DisplaySettingsComponent.prototype, "isArchive", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DisplaySettingsComponent.prototype, "emitdisplaySetting", void 0);
    DisplaySettingsComponent = __decorate([
        core_1.Component({
            selector: 'display-setting',
            templateUrl: 'app/Framework/Views/Display Settings/displaySettings.component.html',
            inputs: ['fieldObject', 'dataKey', 'dragEnable', 'displaySettingObject'],
            directives: [ng2_dnd_1.DND_DIRECTIVES, colorpickercomponent_component_1.ColorPickerComponent, slide_component_1.SlideComponent, stringtextbox_component_1.StringTextBoxComponent],
            providers: [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions]
        }), 
        __metadata('design:paramtypes', [administration_service_1.AdministrationService, notify_service_1.NotificationService, General_1.GeneralFunctions])
    ], DisplaySettingsComponent);
    return DisplaySettingsComponent;
}());
exports.DisplaySettingsComponent = DisplaySettingsComponent;
//# sourceMappingURL=displaysettings.component.js.map
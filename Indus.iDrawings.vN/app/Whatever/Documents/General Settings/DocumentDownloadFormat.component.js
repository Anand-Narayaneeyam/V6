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
var documents_service_1 = require('../../../Models/Documents/documents.service');
var fieldGeneration_component_1 = require('../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component');
var notify_service_1 = require('../../../Framework/Models/Notification/notify.service');
var dropdownlistcomponent_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dropdownlistcomponent.component');
var stringtextbox_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/stringtextbox.component');
var dynamicdownloadformatlist_component_1 = require('../../../framework/whatever/dynamiccontrols/dynamicfields/dynamicdownloadformatlist.component');
var validation_service_1 = require('../../../Framework/Models/Validation/validation.service');
var DocumentDownloadFormat = (function () {
    function DocumentDownloadFormat(_validateService, DocumentService, _notificationService) {
        var _this = this;
        this._validateService = _validateService;
        this.DocumentService = DocumentService;
        this._notificationService = _notificationService;
        this.ListData = [];
        this.IsAdd = true;
        this.enableButton = true;
        this.imgAdd = "Content/list_adD.png";
        this.imgEdit = "Content/Icons/data_editN.png";
        this.imgDelete = "Content/Icons/data_deleteN.png";
        this.imgCancel = "Content/Layout/button_cancel.png";
        this.isrefresh = true;
        this._validateService.getBlacklist().subscribe(function (resultData) { return _this.validationData = resultData; });
    }
    DocumentDownloadFormat.prototype.ngOnInit = function () {
        var contextObj = this;
        contextObj.DocumentService.getdocumentdownloadformatfields().subscribe(function (resultData) {
            contextObj.fieldObject = resultData["Data"];
            contextObj.fieldObject[1].FieldValue = "-1";
            contextObj.fieldObject[1].IsHiddenLabel = true;
            contextObj.fieldObject[2].IsHiddenLabel = true;
            contextObj.fieldObject[3].IsHiddenLabel = true;
            contextObj.fieldObject[1].IsLocallyValidated = false;
            contextObj.fieldObject[2].IsLocallyValidated = true;
            contextObj.fieldObject[3].IsLocallyValidated = true;
        });
        contextObj.DocumentService.getNumberFormatItemDetails().subscribe(function (resultData) {
            var resultdetails = JSON.parse(resultData["FieldBinderData"]);
            var length;
            contextObj.ListData = [];
            length = resultdetails.length;
            for (var i = 0; i < length; i++) {
                contextObj.ListData.push({ ConstantValue: resultdetails[i]["ConstantValue"], IsColumn: resultdetails[i]["IsColumn"], IsSeparatorRequired: resultdetails[i]["IsSeparatorRequired"], PositionNo: resultdetails[i]["PositionNo"], ReportFieldId: resultdetails[i]["ReportFieldId"], ReportFieldName: resultdetails[i]["ReportFieldName"], Separator: resultdetails[i]["Separator"] });
            }
            contextObj.updatefieldlookup();
            if (length == 0) {
                contextObj.enableButton = false;
                contextObj.isrefresh = !contextObj.isrefresh;
            }
        });
    };
    DocumentDownloadFormat.prototype.updatefieldlookup = function () {
        var contextObj = this;
        var length;
        var value;
        length = contextObj.ListData.length;
        var lookupvalue = [];
        for (var i = 0; i < length; i++) {
            value = '';
            if (contextObj.ListData[i]["ReportFieldName"])
                value = value + contextObj.ListData[i]["ReportFieldName"];
            if (contextObj.ListData[i]["ConstantValue"])
                value = value + contextObj.ListData[i]["ConstantValue"];
            if (contextObj.ListData[i]["Separator"])
                value = value + contextObj.ListData[i]["Separator"];
            lookupvalue.push({ Id: i, IsDisabled: true, Value: value });
        }
        if (lookupvalue)
            contextObj.fieldObject[0]["LookupDetails"]["LookupValues"] = lookupvalue;
    };
    DocumentDownloadFormat.prototype.getDynamicListEdit = function (Event) {
        var contextObj = this;
        var value;
        var FieldName = document.getElementById("FieldFormat");
        var ConstantName = document.getElementById("ConstantFormat");
        var SeparatorName = document.getElementById("SeparatorFormat");
        if (Event["SelectedId"] && Event["SelectedId"].length > 0)
            contextObj.SelectedIndex = Event["SelectedId"].split("li")[0];
        else
            contextObj._notificationService.ShowToaster("Select a row from the Format Conditions list", 2);
        if (contextObj.ListData[contextObj.SelectedIndex]) {
            contextObj.cancelList(Event);
            if (contextObj.ListData[contextObj.SelectedIndex]["IsColumn"] == 1 || contextObj.ListData[contextObj.SelectedIndex]["IsColumn"] == true) {
                var dropdownid;
                contextObj.fieldObject[1].FieldValue = "-1";
                contextObj.fieldObject[1]["LookupDetails"]["LookupValues"].find(function (item) {
                    if (item.Value == contextObj.ListData[contextObj.SelectedIndex]["ReportFieldName"]) {
                        dropdownid = item.Id;
                        return true;
                    }
                });
                if (dropdownid) {
                    contextObj.fieldObject[1].FieldValue = dropdownid.toString();
                }
                contextObj.fieldObject[1].IsEnabled = true;
                contextObj.fieldObject[2].IsEnabled = false;
                contextObj.fieldObject[1].IsLocallyValidated = false;
                contextObj.fieldObject[2].IsLocallyValidated = true;
            }
            else {
                contextObj.fieldObject[2].FieldValue = contextObj.ListData[contextObj.SelectedIndex]["ConstantValue"];
                contextObj.fieldObject[1].IsEnabled = false;
                contextObj.fieldObject[2].IsEnabled = true;
                contextObj.fieldObject[1].IsLocallyValidated = true;
                contextObj.fieldObject[2].IsLocallyValidated = false;
            }
            if (FieldName)
                FieldName.checked = contextObj.fieldObject[1].IsEnabled;
            if (ConstantName)
                ConstantName.checked = contextObj.fieldObject[2].IsEnabled;
            if (SeparatorName)
                SeparatorName.checked = contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
            contextObj.fieldObject[3].FieldValue = contextObj.ListData[contextObj.SelectedIndex]["Separator"];
            contextObj.fieldObject[3].IsEnabled = contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
            contextObj.fieldObject[3].IsLocallyValidated = !contextObj.ListData[contextObj.SelectedIndex]["IsSeparatorRequired"];
            contextObj.IsAdd = false;
        }
    };
    DocumentDownloadFormat.prototype.getDynamicListRemove = function (Event) {
        var contextObj = this;
        var length;
        var index;
        if (Event["SelectedId"] && Event["SelectedId"].length > 0) {
            index = Event["SelectedId"].split("li")[0];
            if (index && index >= 0) {
                contextObj.ListData.splice(index, 1);
                length = contextObj.ListData.length;
                for (var i = index; i < length; i++) {
                    contextObj.ListData[i]["PositionNo"] = i;
                }
                contextObj.updatefieldlookup();
                if (contextObj.ListData.length == 0) {
                    contextObj.enableButton = false;
                    contextObj.isrefresh = !contextObj.isrefresh;
                }
                contextObj.cancelList(Event);
            }
        }
        else {
            contextObj._notificationService.ShowToaster("Select a row from the Format Conditions list", 2);
        }
    };
    DocumentDownloadFormat.prototype.ChangeList = function (Event, target) {
        var contextObj = this;
        var length = 0;
        var ReportFieldName = "";
        var ReportFieldId;
        length = contextObj.ListData.length;
        var iscolumnval = contextObj.fieldObject[1].IsEnabled, isseparatorval = contextObj.fieldObject[3].IsEnabled;
        var isChange = false, isSeparatorChange = false;
        if (iscolumnval) {
            if (contextObj.fieldObject[1].FieldValue != "-1" && contextObj.fieldObject[1].FieldValue) {
                contextObj.fieldObject[1]["LookupDetails"]["LookupValues"].find(function (item) {
                    if (item.Id == Number(contextObj.fieldObject[1].FieldValue)) {
                        ReportFieldId = item.Id;
                        ReportFieldName = item.Value;
                        isChange = true;
                        return true;
                    }
                });
            }
        }
        else {
            if (contextObj.fieldObject[2].FieldValue && contextObj.fieldObject[2].FieldValue.length > 0 && !contextObj.fieldObject[2].HasValidationError)
                isChange = true;
        }
        if (isseparatorval) {
            if (contextObj.fieldObject[3].FieldValue && contextObj.fieldObject[3].FieldValue.length > 0 && !contextObj.fieldObject[3].HasValidationError)
                isSeparatorChange = true;
            else
                isSeparatorChange = false;
        }
        else {
            isSeparatorChange = true;
        }
        if (isChange && isSeparatorChange) {
            if (target == 1) {
                contextObj.ListData.push({ ConstantValue: contextObj.fieldObject[2].FieldValue, IsColumn: iscolumnval, IsSeparatorRequired: isseparatorval, PositionNo: (length + 1), ReportFieldId: ReportFieldId, ReportFieldName: ReportFieldName, Separator: contextObj.fieldObject[3].FieldValue });
                contextObj.enableButton = true;
            }
            else {
                var updatedlist = { ConstantValue: contextObj.fieldObject[2].FieldValue, IsColumn: iscolumnval, IsSeparatorRequired: isseparatorval, PositionNo: (length + 1), ReportFieldId: ReportFieldId, ReportFieldName: ReportFieldName, Separator: contextObj.fieldObject[3].FieldValue };
                if (contextObj.SelectedIndex) {
                    contextObj.ListData[contextObj.SelectedIndex] = updatedlist;
                }
            }
            contextObj.updatefieldlookup();
            contextObj.isrefresh = !contextObj.isrefresh;
            contextObj.cancelList(Event);
        }
    };
    DocumentDownloadFormat.prototype.getDynamicListFieldValues = function () {
        return this.fieldObject[0];
    };
    DocumentDownloadFormat.prototype.cancelList = function (Event) {
        this.IsAdd = true;
        this.fieldObject[1].FieldValue = "-1";
        this.fieldObject[1].IsEnabled = true;
        this.fieldObject[2].FieldValue = null;
        this.fieldObject[2].IsEnabled = false;
        this.fieldObject[3].FieldValue = null;
        this.fieldObject[3].IsEnabled = false;
        var FieldName = document.getElementById("FieldFormat");
        var ConstantName = document.getElementById("ConstantFormat");
        var SeparatorName = document.getElementById("SeparatorFormat");
        if (FieldName)
            FieldName.checked = true;
        if (ConstantName)
            ConstantName.checked = false;
        if (SeparatorName)
            SeparatorName.checked = false;
        this.fieldObject[1].IsLocallyValidated = false;
        this.fieldObject[2].IsLocallyValidated = true;
        this.fieldObject[3].IsLocallyValidated = true;
        var fieldfocus = document.getElementById(this.fieldObject[1].FieldId.toString());
        if (fieldfocus) {
            fieldfocus.focus();
            setTimeout(function () {
                fieldfocus.blur();
            }, 100);
        }
    };
    DocumentDownloadFormat.prototype.updateNumberFormat = function (Event) {
        var NumberFormatDetails = [];
        var contextObj = this;
        var length;
        length = contextObj.ListData.length;
        var ReportFieldId = 0;
        for (var i = 0; i < length; i++) {
            ReportFieldId = contextObj.ListData[i]["ReportFieldId"];
            if (!ReportFieldId) {
                ReportFieldId = 0;
            }
            NumberFormatDetails.push({
                ConstantValue: contextObj.ListData[i]["ConstantValue"],
                IsColumn: contextObj.ListData[i]["IsColumn"],
                IsSeparatorRequired: contextObj.ListData[i]["IsSeparatorRequired"],
                PositionNo: contextObj.ListData[i]["PositionNo"],
                ReportFieldId: ReportFieldId,
                Separator: contextObj.ListData[i]["Separator"] });
        }
        var stringNumberFormat = JSON.stringify(NumberFormatDetails);
        contextObj.DocumentService.UpdateNumberFormatDetails(stringNumberFormat).subscribe(function (resultData) {
            if (resultData["StatusId"] == 1) {
                contextObj._notificationService.ShowToaster("Document Download Format updated", 3);
            }
            else {
                contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
            }
        });
    };
    DocumentDownloadFormat.prototype.showComponent = function (fieldName, isVisible) {
        if (isVisible == false) {
            return "none";
        }
        else {
            return "block";
        }
    };
    DocumentDownloadFormat.prototype.OnFieldClick = function (Fieldevent, Action) {
        if (Action == "FieldName") {
            this.fieldObject[1].IsEnabled = true;
            this.fieldObject[1].IsLocallyValidated = false;
            this.fieldObject[2].IsEnabled = false;
            this.fieldObject[2].FieldValue = null;
            this.fieldObject[2].IsLocallyValidated = true;
        }
        else if (Action == "ConstantValue") {
            this.fieldObject[1].IsEnabled = false;
            this.fieldObject[1].FieldValue = "-1";
            this.fieldObject[1].IsLocallyValidated = true;
            this.fieldObject[2].IsEnabled = true;
            this.fieldObject[2].IsLocallyValidated = false;
        }
        else if (Action == "Separator") {
            var separatorelement = Fieldevent.target || Fieldevent.srcElement;
            this.fieldObject[3].IsEnabled = separatorelement.checked;
            this.fieldObject[3].IsLocallyValidated = !separatorelement.checked;
            this.fieldObject[3].FieldValue = null;
        }
    };
    DocumentDownloadFormat.prototype.onChangeDataFieldCategory = function (FieldId) {
    };
    DocumentDownloadFormat = __decorate([
        core_1.Component({
            selector: 'DocumentDownloadFormat',
            templateUrl: './app/Views/Documents/General Settings/DocumentDownloadFormat.component.html',
            directives: [fieldGeneration_component_1.FieldComponent, dropdownlistcomponent_component_1.DropDownListComponent, stringtextbox_component_1.StringTextBoxComponent, dynamicdownloadformatlist_component_1.DynamicDownloadFormatListComponent],
            providers: [http_1.HTTP_PROVIDERS, documents_service_1.DocumentService, notify_service_1.NotificationService, validation_service_1.ValidateService]
        }), 
        __metadata('design:paramtypes', [validation_service_1.ValidateService, documents_service_1.DocumentService, notify_service_1.NotificationService])
    ], DocumentDownloadFormat);
    return DocumentDownloadFormat;
}());
exports.DocumentDownloadFormat = DocumentDownloadFormat;
//# sourceMappingURL=DocumentDownloadFormat.component.js.map
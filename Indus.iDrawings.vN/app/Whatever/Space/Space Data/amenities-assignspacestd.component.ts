import { Component, Output, OnInit, Input, EventEmitter, AfterViewChecked} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { IField} from '../../../Framework/Models//Interface/IField';
import { SpaceService} from '../../../Models/Space/space.service';
import { StringTextBoxComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/stringtextbox.component';
import { FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { SchedulingService } from '../../../Models/Scheduling/scheduling.service';
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'Amenity-List',
    templateUrl: 'app/Views/Space/Space Data/amenities-assignspacestd.html',
    directives: [FieldComponent, StringTextBoxComponent],
    providers: [HTTP_PROVIDERS, SchedulingService, SpaceService, GeneralFunctions, ValidateService, NotificationService],
})

export class AmenityListComponent implements AfterViewChecked,OnInit {

    itemSource: any[];
    checkeditemSource: any[];
    private fields: IField[];
    isApprovalProcessSubscribed: boolean = false;
    IsNeedToCallCreation: boolean = true;
    IsChecked: boolean = false;
    IsSelectAllChecked: boolean;
    strAmenities: string;
    reportFields = new Array<ReportFieldArray>();
    CheckedArray = new Array<CheckedArray>();
    amenityObj = new Array<AmenityObj>();
    strarrayList = new Array<IField>();
    @Input() SelectedFloorId: number;
    @Input() SelectedSpaceId: any;
    @Input() RequestId: any;
    @Output() emitAmenities = new EventEmitter();

    constructor(private schedulingService: SchedulingService, private spaceService: SpaceService, private getData: GeneralFunctions, private notificationService: NotificationService) {
    }

    ngOnInit() {
        var contextObj = this;
        this.reportFields.push({
            ReportFieldId: 539,
            Value: "0"
        })
        this.reportFields.push({
            ReportFieldId: 7449,
            Value: "0"
        })
        this.reportFields.push({
            ReportFieldId: 7435,
            Value: "0"
        })
        this.CheckedArray.push({
            ReportFieldId: 539,
            Value: this.SelectedFloorId[0].toString()
        })
        for (var i = 0; i < this.SelectedSpaceId.length; i++) {
            this.CheckedArray.push({
                ReportFieldId: 7449,
                Value: this.SelectedSpaceId[i].toString()
            })
        }  
        this.CheckedArray.push({
            ReportFieldId: 7435,
            Value: "0"
        })
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

    }
    ngAfterViewChecked() {
        var Contextobj = this;
        if (Contextobj.strarrayList.length > 0 && Contextobj.checkeditemSource.length > 0) {
            if (Contextobj.IsNeedToCallCreation)
                Contextobj.aftercreation();
        }
    }
    public aftercreation() {
        var Contextobj = this;
        for (var i = 0; i < Contextobj.itemSource.length; i++) {
            var elem = <HTMLInputElement>document.getElementById("amn" + Contextobj.itemSource[i].Id.toString())
            var IsExists = Contextobj.checkeditemSource.find(function (item) { return item.Id === Contextobj.itemSource[i].Id })
            if (IsExists != undefined) {
                elem.checked = true;
                Contextobj.strarrayList[i].IsEnabled = true;
                if (Contextobj.strarrayList[i].FieldValue == "") {
                    Contextobj.strarrayList[i].FieldValue = "1";
                }
            }
        }
        Contextobj.IsNeedToCallCreation = false;
    }
    selectAllOptions(event) {
        var contextObj = this;
        var blnAllChecked = false;
        if (event.srcElement.checked == true) {
            blnAllChecked = true;
        }
        else {
            blnAllChecked = false;
        }
        for (var i = 0; i < contextObj.itemSource.length; i++) {
            var elem = <HTMLInputElement>document.getElementById("amn" +contextObj.itemSource[i].Id.toString())
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
    }

    updateCheckedOptions(event) {
        var contextObj = this;
        var checkedCount: number = 0;
        var blnChecked = false;
        var itemSourceCount: number = 0;
        var checkid = event.srcElement.id.replace("amn", "");
        var strObj: IField = contextObj.strarrayList.find(function (item) { return item.FieldId == checkid });
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
            var elem = <HTMLInputElement>document.getElementById("amn" +contextObj.itemSource[i].Id.toString())
            if (elem) {
                if (elem.checked == true) {
                    checkedCount = checkedCount + 1;
                }
            }
        }
        var selectAllChk = <HTMLInputElement>document.getElementById("SelectAll");
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
    }



    onChangeInput(event) {
        var contextObj = this;
        if (event.txtBoxData.target.value.includes('.')) {
            event.txtBoxData.target.value = event.txtBoxData.target.value.replace('.', '');
        }
        //if (Number(event.txtBoxData.target.value) <= 0) {
        //    contextObj.notificationService.ShowToaster("Count should be greater than zero", 2);
        //}
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

    submitData(event) {
        var contextObj = this;
        var blnAllowSubmit: boolean = true;
        var blnZeroValue: boolean = false;
        contextObj.strAmenities = "";
        var count = 0;
        if (contextObj.itemSource != undefined) {
            for (var i = 0; i < contextObj.itemSource.length; i++) {
                var elem = <HTMLInputElement>document.getElementById("amn" +contextObj.itemSource[i].Id.toString());
                if (elem) {
                    if (elem.checked == true) {
                        var strObj: IField = contextObj.strarrayList.find(function (item) { return item.FieldId == contextObj.itemSource[i].Id });
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
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface AmenityObj {
    Id: number;
    Amenity: string;
}
export interface CheckedArray {
    ReportFieldId: number;
    Value: string;
}
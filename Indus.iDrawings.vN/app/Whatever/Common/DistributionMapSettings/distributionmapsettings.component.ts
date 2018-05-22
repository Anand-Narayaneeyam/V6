import {Component, Output, EventEmitter, AfterViewInit,Input} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from  '../../../Framework/Models/Interface/IField'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component';
import {SpaceService} from '../../../Models/Space/space.service'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import { DropDownListComponent } from '../../..//Framework/Whatever/DynamicControls/DynamicFields/dropdownlistcomponent.component';
import {TableComponent} from '../../../Framework/Whatever/Table/table.component';


@Component({
    selector: 'distributionmapsettings',
    templateUrl: './app/Views/Common/DistributionMapSettings/distributionmapsettings.component.html',
    directives: [GridComponent, SlideComponent, DropDownListComponent, TableComponent, PageComponent],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    inputs: ['selectedDrwgIds', 'moduleId']

})

export class DistributionMapSettingsComponent implements AfterViewInit {
    private fields: IField[];
    private DropdownField: IField[];
    private ValidatedDropDown: IField[];
    target = -1;
    itemsSource: any[];
    FieldName = "";
    Position = "bottom-right";
    width = 300;
    change = false;
    showSlide = false;
    savedData: any;
    @Input() pageId;
    @Input() Previlages;
    disableButton = false
    colorData: any;
    moduleId: any;
    valueofDropDown = "";
    validatedValue = "";
    CAIFieldObject: IField = undefined;

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {

    }

    ngOnInit() {
        var contextObj = this;
   debugger
        if (this.moduleId == 12)
        {
            this.spaceService.getDistributionMapSettingsFields().subscribe(function (resultData) {
                contextObj.fields = resultData["Data"];
                contextObj.spaceService.getCAIDistributionMapSettings("147", "12", true).subscribe(function (resultData) {

                    for (let val of contextObj.fields) {
                        if (val["ReportFieldId"] == 290 ) {
                            val.FieldLabel = "CAI Space Driver";
                        }
                        if (val["ReportFieldId"] == 304 ||val["ReportFieldId"] == 25 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298 || val["ReportFieldId"] == 22 ) {
                            val.IsEnabled = false;
                        }
                    }
                 contextObj.fields = contextObj.fields;
                 contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                 if (contextObj.itemsSource.length == 0) {
                     contextObj.disableButton = true
                     contextObj.notificationService.ShowToaster("No data exists", 2);
                 }
                 else {
                     contextObj.disableButton = false;
                 }
                })
            })
            
        }
        else {
            this.spaceService.getDistributionMapSettingsFields().subscribe(function (resultData) {
                contextObj.fields = resultData["Data"];
                if (contextObj.fields.length > 0) {
                    contextObj.DropdownField = contextObj.fields.filter(function (el) {
                        return el["ReportFieldId"] === 304;
                    });
                    if (contextObj.DropdownField[0].LookupDetails.LookupValues.length != 0)
                        contextObj.DropdownField[0].FieldValue = "1";
                    else
                        contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
                }
                if (contextObj.fields.length > 0) {
                    contextObj.ValidatedDropDown = contextObj.fields.filter(function (el) {
                        return el["ReportFieldId"] === 22;
                    });
                    contextObj.ValidatedDropDown[0].FieldValue = "-1";
                    contextObj.ValidatedDropDown[0].Whitelist['FormatString'] = "4";
                    contextObj.ValidatedDropDown[0].Whitelist['RegularExpression'] = "";
                }
                if (contextObj.fields.length > 0) {
                    contextObj.fields = contextObj.fields.filter(function (el) {
                        if (el["ReportFieldId"] != 304 && el["ReportFieldId"] != 22)
                            return true;
                        else
                            return false;
                    });
                    for (let val of contextObj.fields) {
                        if (contextObj.DropdownField.length == 0) {
                            val.IsEnabled = false;
                        }
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                            val.IsEnabled = false;
                        }
                    }
                }
                if (contextObj.DropdownField[0].LookupDetails.LookupValues.length != 0) {
                    contextObj.valueofDropDown = contextObj.DropdownField[0].LookupDetails.LookupValues[0].Value;
                    var fieldobj = new Array<ReportFieldArray>();
                    fieldobj.push({
                        ReportFieldId: 289,
                        Value: "1"
                    });
                    contextObj.spaceService.getDistributionMapSettingsData(fieldobj, 1, contextObj.target).subscribe(function (resultData) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        if (contextObj.itemsSource.length == 0) {
                            contextObj.disableButton = true
                            contextObj.notificationService.ShowToaster("No data exists", 2);
                        }
                        else {
                            contextObj.disableButton = false;
                        }

                    })
                }
            });
        }
    }

    ngAfterViewInit() {

    }

    

    onChangeValidatedValues(value: any) {

        var selectedName;
        var contextObj = this;
        contextObj.DropdownField[0].FieldValue = "-1";
        contextObj.target = +value;
        contextObj.validatedValue = value;
        if (value != -1) {
            var fieldobj = new Array<ReportFieldArray>();
            fieldobj.push({
                ReportFieldId: 20,
                Value: value
            });
            selectedName = contextObj.ValidatedDropDown[0].LookupDetails.LookupValues.filter(function (el) {
                return el["Id"] === +value;
            });
            this.valueofDropDown = selectedName[0].Value;
            this.spaceService.getDistributionMapSettingsData(fieldobj, 0, value, selectedName[0].Value).subscribe(function (resultData) {
                for (let val of contextObj.fields) {
                    if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 290 || val["ReportFieldId"] == 298 || val["ReportFieldId"] == 296) {
                        val.IsEnabled = false;
                    }
                    if (val["ReportFieldId"] == 25) {
                        val.IsEnabled = true;
                        val.IsVisible = true;
                        val.FieldLabel = selectedName[0].Value;
                    }
                }
                contextObj.fields = contextObj.fields;
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                if (contextObj.itemsSource.length == 0)
                {
                    contextObj.disableButton = true
                    contextObj.notificationService.ShowToaster("No data exists", 2);
                }
                else {
                    contextObj.disableButton = false;
                }
            })
        }
        else {
            this.itemsSource = undefined;
        }

    }

    onChangeDataFieldCategory(value: any) {
        var contextObj = this;
        contextObj.validatedValue = value;
        var selectedName;
        contextObj.ValidatedDropDown[0].FieldValue = "-1";
        contextObj.target = -1;
        if (value != -1) {
            var fieldobj = new Array<ReportFieldArray>();
            fieldobj.push({
                ReportFieldId: 289,
                Value: value
            });
            selectedName = contextObj.DropdownField[0].LookupDetails.LookupValues.filter(function (el) {
                return el["Id"] === +value;
            });
            this.valueofDropDown = selectedName[0].Value;
            this.spaceService.getDistributionMapSettingsData(fieldobj, value, contextObj.target).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                if (contextObj.itemsSource.length == 0) {
                    contextObj.notificationService.ShowToaster("No data exists", 2);
                    contextObj.disableButton = true;
                }
                else {
                    contextObj.disableButton = false;
                }
                for (let val of contextObj.fields) {
                    if (val["ReportFieldId"] == 25) {
                        val.IsEnabled = false;
                        val.IsVisible = false;
                        val.FieldLabel = "";
                    }
                }
                if (value == 1) {
                    for (let val of contextObj.fields) {
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294) {
                            val.IsEnabled = false;
                        }
                        else if (val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                            val.IsEnabled = false;
                        }
                        else if (val["ReportFieldId"] == 290) {
                            val.IsEnabled = true;
                        }
                    }
                }
                else if (value == 3) {
                    for (let val of contextObj.fields) {
                        if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 ) {
                            val.IsEnabled = true;
                        }
                        else if (val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298 )
                        {
                            val.IsEnabled = false;
                        }
                    }
                }
                else if (value == 4) {
                    for (let val of contextObj.fields) {
                        if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296) {
                            val.IsEnabled = true;
                        }
                        else if ( val["ReportFieldId"] == 298) {
                            val.IsEnabled = false;
                        }
                    }
                }
                else if (value == 5) {
                    for (let val of contextObj.fields) {
                        if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298  ) {
                            val.IsEnabled = true;
                        }
                    }
                }
                else {
                    for (let val of contextObj.fields) {
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 290) {
                            val.IsEnabled = true;
                        }
                        else if (val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298 || val["ReportFieldId"] == 294) {
                            val.IsEnabled = false;
                        }
                    }
                }
                contextObj.fields = contextObj.fields;
            })
        }
        else {
            this.itemsSource = undefined;
        }
    }

    submit(value: any) {
        this.savedData = value;
        var contextObj = this;
        var PageTarget;
        switch (this.target) {
            case -1:
                PageTarget = 1;
                break;
            case -2:
                PageTarget = 2;
                break;
            case 0:
                PageTarget = 3;
                break;
            default:
                PageTarget = 4;
        }
        if (this.moduleId == 12)
        {
            this.spaceService.updateCAIDistributionMapSettingsData(value.ReportFieldIdValues, 0, 1).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.spaceService.getUserPrivilegesofPage(contextObj.pageId, contextObj.Previlages).subscribe(function (resultData) {
                        if (resultData["Data"] == 1) {
                            contextObj.width = 300;
                            contextObj.change = !this.change;
                            contextObj.showSlide = !this.showSlide;
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
                        }
                    });
                }
                else if (resultData["Data"].Message == "Already Exists") {
                    contextObj.notificationService.ShowToaster("Distribution Map Settings already exists", 5);
                }
                else {
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
                }
            })
        }
        else {
            this.spaceService.updateDistributionMapSettingsData(value.ReportFieldIdValues, 0, 1, PageTarget, this.valueofDropDown, this.validatedValue).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.spaceService.getUserPrivilegesofPage(contextObj.pageId, contextObj.Previlages).subscribe(function (resultData) {
                        if (resultData["Data"] == 1) {
                            contextObj.width = 300;
                            contextObj.change = !this.change;
                            contextObj.showSlide = !this.showSlide;
                        }
                        else {
                            contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
                        }
                    });
                }
                else if (resultData["Data"].Message == "Already Exists") {
                    contextObj.notificationService.ShowToaster("Distribution Map Settings already exists", 5);
                }
                else {
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
                }
            })
        }
    }

    DefaultSetting(event: any) {
        var contextObj = this;
        var PageTarget;
        this.showSlide = !this.showSlide;
        switch (this.target) {
            case -1:
                PageTarget = 1;
                break;
            case -2:
                PageTarget = 2;
                break;
            case 0:
                PageTarget = 3;
                break;
            default:
                PageTarget = 4;
        }
        if (this.moduleId == 12) {
            this.spaceService.updateCAIDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
            })
        }
        else {
            this.spaceService.updateDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1, PageTarget, this.valueofDropDown, this.validatedValue).subscribe(function (resultData) {
                if (resultData["Data"].Message == "Success") {
                    contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
                }
                else
                    contextObj.notificationService.ShowToaster("Update Failed", 5);
            })
        }
    }

    cancelClick(value: any) {
        this.showSlide = value.value;
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}


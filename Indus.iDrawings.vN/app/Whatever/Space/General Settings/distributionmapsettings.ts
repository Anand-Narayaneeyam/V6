
import {Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
    templateUrl: './app/Views/Space/General Settings/distributionmapsettings.component.html',
    directives: [GridComponent, SlideComponent, DropDownListComponent, TableComponent, PageComponent],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    inputs: ['selectedDrwgIds']

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

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {

    }

    ngOnInit() {
        var contextObj = this;
        this.spaceService.getDistributionMapSettingsFields().subscribe(function (resultData) {
            contextObj.fields = resultData["Data"];
            if (contextObj.fields.length > 0) {
                contextObj.DropdownField = contextObj.fields.filter(function(el) {
                    return el["ReportFieldId"] === 304;
                });
                contextObj.DropdownField[0].FieldValue = "1"; 
            }
            if (contextObj.fields.length > 0) {
                contextObj.ValidatedDropDown = contextObj.fields.filter(function (el) {
                    return el["ReportFieldId"] === 22;
                });
                contextObj.ValidatedDropDown[0].FieldValue = "-1";
            }
            if (contextObj.fields.length > 0) {
                contextObj.fields = contextObj.fields.filter(function (el) {
                    if (el["ReportFieldId"] != 304 && el["ReportFieldId"] != 22)
                        return true;
                    else
                        return false;
                });
                for (let val of contextObj.fields) {
                    if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294) {
                        val.IsEnabled = false;
                    }
                }
            }
        });
        var fieldobj = new Array<ReportFieldArray>();
        fieldobj.push({
            ReportFieldId: 289,
            Value: "1"
        });
        this.spaceService.getDistributionMapSettingsData(fieldobj,1, this.target).subscribe(function (resultData) {
            contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
        })
    }

    ngAfterViewInit() {
      
    } 

    onChangeValidatedValues(value: any)
    {
        var selectedName;
        var contextObj = this;
        contextObj.DropdownField[0].FieldValue = "-1";
        contextObj.target = value;
        if (value != -1) {
            var fieldobj = new Array<ReportFieldArray>();
            fieldobj.push({
                ReportFieldId: 289,
                Value: value
            });
            selectedName=contextObj.ValidatedDropDown[0].LookupDetails.LookupValues.filter(function (el) {
                return el["Id"] === +value;
            });
            this.spaceService.getDistributionMapSettingsData(fieldobj, 0,value,selectedName[0].Value).subscribe(function (resultData) {              
                for (let val of contextObj.fields) {
                    if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 290) {
                        val.IsEnabled = false;
                    }
                    if (val["ReportFieldId"] == 25)
                    {
                        val.IsEnabled = true;
                        val.IsVisible = true;
                        val.FieldLabel = selectedName[0].Value;
                    }
                }             
                contextObj.fields = contextObj.fields;
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
            })
        }
        else {
            this.itemsSource = undefined;
        }

    }

    onChangeDataFieldCategory(value: any)
    {

        var contextObj = this;
        contextObj.ValidatedDropDown[0].FieldValue = "-1";
        contextObj.target = -1;
        if (value != -1) {
            var fieldobj = new Array<ReportFieldArray>();
            fieldobj.push({
                ReportFieldId: 289,
                Value: value
            });
            this.spaceService.getDistributionMapSettingsData(fieldobj, value, contextObj.target).subscribe(function (resultData) {
                contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);          
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
                        else if (val["ReportFieldId"] == 290)
                        {
                            val.IsEnabled = true;
                        }
                    }
                }
                else if (value == 3)
                {
                    for (let val of contextObj.fields) {
                        if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294) {
                            val.IsEnabled = true;
                        }
                    }
                }
                else
                {
                    for (let val of contextObj.fields) {
                        if (val["ReportFieldId"] == 292) {
                            val.IsEnabled = true;
                        }
                        if (val["ReportFieldId"] == 294) {
                            val.IsEnabled = false;
                        }
                    }
                }
                contextObj.fields = contextObj.fields;
            })          
        }
        else
        {
            this.itemsSource = undefined; 
        }
    }

    submit(value: any)
    {
        this.savedData = value;
        var contextObj = this;
        this.spaceService.updateDistributionMapSettingsData(value.ReportFieldIdValues,0, 1).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                contextObj.width = 300;
                contextObj.change = !this.change;
                contextObj.showSlide = !this.showSlide;
            }
            else
                contextObj.notificationService.ShowToaster("Update Failed", 5);
        })
    }

    DefaultSetting(event: any) {
        var contextObj = this;
        this.showSlide = !this.showSlide;
        this.spaceService.updateDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1).subscribe(function (resultData) {
            if (resultData["Data"].Message == "Success") {
                contextObj.notificationService.ShowToaster("Distribution Map Settings updated", 3);
            }
            else
                contextObj.notificationService.ShowToaster("Update Failed", 5);
        })
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


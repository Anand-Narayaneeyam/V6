import {Component, Output, EventEmitter, AfterViewInit, Input} from '@angular/core';
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
import {TableDistMaponDrawingComponent} from '../../../Framework/Whatever/Table/tableDistMaponDrawing.component';


@Component({
    selector: 'distributionmapsettingsondrawings',
    templateUrl: './app/Views/Common/DistributionMapSettings/distributionmapsettingsondrawings.component.html',
    directives: [GridComponent, SlideComponent, DropDownListComponent, TableDistMaponDrawingComponent, PageComponent],
    providers: [SpaceService, HTTP_PROVIDERS, NotificationService, GeneralFunctions],
    inputs: ['value', 'fieldname', 'drawingId', 'moduleId','archiveId']

})

export class DistributionMapSettingsonDrawingsComponent implements AfterViewInit {
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
    valueofDropDown = "";
    value: any;
    fieldname: string;
    buttonName: string = "Show Distribution Map";
    drawingId: any;
    moduleId: any;
    archiveId: any;
    @Output() submitSuccess = new EventEmitter();
    angle: any;
    pattern: any;
    scale: any;
    color: any;
    selectedValue: any;

    constructor(private spaceService: SpaceService, private notificationService: NotificationService, private generFun: GeneralFunctions) {

    }

    ngOnInit() {
        var contextObj = this;
        this.spaceService.getDistributionMapSettingsonDrawingsFields().subscribe(function (resultData) {
            debugger
            contextObj.fields = resultData["Data"];
            if (contextObj.fields.length > 0) {
                contextObj.DropdownField = contextObj.fields.filter(function (el) {
                    return el["ReportFieldId"] === 304;
                });
                //if (contextObj.DropdownField[0].LookupDetails.LookupValues.length != 0)
                //    contextObj.DropdownField[0].FieldValue = "1";
                //else
                //    contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
            }
            if (contextObj.fields.length > 0) {
                contextObj.ValidatedDropDown = contextObj.fields.filter(function (el) {
                    return el["ReportFieldId"] === 22;
                });
                //contextObj.ValidatedDropDown[0].FieldValue = "-1";
                //contextObj.ValidatedDropDown[0].Whitelist['FormatString'] = "4";
                //contextObj.ValidatedDropDown[0].Whitelist['RegularExpression'] = "";
            }
            if (contextObj.fields.length > 0) {
                contextObj.fields = contextObj.fields.filter(function (el) {
                    if (el["ReportFieldId"] != 304 && el["ReportFieldId"] != 22)
                        return true;
                    else
                        return false;
                });
                for (let val of contextObj.fields) {
                    //if (contextObj.DropdownField.length == 0) {
                    //    val.IsEnabled = false;
                    //}
                    if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                        val.IsEnabled = false;
                    }
                    if (contextObj.value == "-4" && val.ReportFieldId == 290) {
                        val.FieldLabel = "CAI Archived Space Driver";
                    }
                }
            }
            //if (contextObj.DropdownField[0].LookupDetails.LookupValues.length != 0) {
                //contextObj.valueofDropDown = contextObj.DropdownField[0].LookupDetails.LookupValues[0].Value;
            var fieldobj = new Array<ReportFieldArray>();
            contextObj.target = -1;
                switch (contextObj.value){
                    case 290: contextObj.value = 1;
                        break;
                    case 292: contextObj.value = 2;
                        break;
                    case 294: contextObj.value = 3;
                        break;
                    case 296: contextObj.value = 4;
                        break;
                    case 298: contextObj.value = 5;
                        break;
                    case -1:
                    case -2:contextObj.value = -2;
                        break;
                    case 0: contextObj.value = 0;
                        break;
                    default: contextObj.target = contextObj.value;
                        contextObj.target = 1;
                        break;
            }
                if (contextObj.value == "-4") {
                    fieldobj.push({ ReportFieldId: 1591, Value: contextObj.drawingId });
                    fieldobj.push({ ReportFieldId: 1590, Value: contextObj.archiveId });
                } else {
                    fieldobj.push({
                        ReportFieldId: 289,
                        Value: contextObj.value
                    });
                    fieldobj.push({
                        ReportFieldId: 781,
                        Value: contextObj.drawingId
                    });
                    fieldobj.push({
                        ReportFieldId: 278,
                        Value: contextObj.moduleId
                    });
                    fieldobj.push({
                        ReportFieldId: 20,
                        Value: contextObj.value
                    });
                }
                if (contextObj.value > 0 && contextObj.value < 6) {
                    contextObj.spaceService.getDistributionMapSettingsnDrawingsData(fieldobj, contextObj.value, contextObj.target).subscribe(function (resultData) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        if (contextObj.itemsSource.length == 0) {
                            contextObj.notificationService.ShowToaster("No " + contextObj.fieldname +"(s) are assigned to this floor", 2);
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
                        if (contextObj.value == 1) {
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
                        else if (contextObj.value == 3) {
                            for (let val of contextObj.fields) {
                                if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294) {
                                    val.IsEnabled = true;
                                }
                                else if (val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
                                    val.IsEnabled = false;
                                }
                            }
                        }
                        else if (contextObj.value == 4) {
                            for (let val of contextObj.fields) {
                                if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296) {
                                    val.IsEnabled = true;
                                }
                                else if (val["ReportFieldId"] == 298) {
                                    val.IsEnabled = false;
                                }
                            }
                        }
                        else if (contextObj.value == 5) {
                            for (let val of contextObj.fields) {
                                if (val["ReportFieldId"] == 290 || val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 296 || val["ReportFieldId"] == 298) {
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

                    });
                }
                else if (contextObj.value == "-4") {
                    contextObj.spaceService.getDistributionMapSettingsnDrawingsData(fieldobj, contextObj.value, contextObj.value ).subscribe(function (resultData) {
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        if (contextObj.itemsSource.length == 0) {
                            contextObj.notificationService.ShowToaster("No " + contextObj.fieldname + "(s) are assigned to this floor", 2);
                            contextObj.disableButton = true;
                        }
                    });
                }
                else {
                    var selectedName = contextObj.fieldname;
                        //contextObj.ValidatedDropDown[0].LookupDetails.LookupValues.filter(function (el) {
                    //    return el["Id"] === +contextObj.value;
                    //});
                    contextObj.spaceService.getDistributionMapSettingsnDrawingsData(fieldobj, 0, contextObj.value, selectedName).subscribe(function (resultData) {
                        for (let val of contextObj.fields) {
                            if (val["ReportFieldId"] == 292 || val["ReportFieldId"] == 294 || val["ReportFieldId"] == 290 || val["ReportFieldId"] == 298 || val["ReportFieldId"] == 296) {
                                val.IsEnabled = false;
                            }
                            if (val["ReportFieldId"] == 25) {
                                val.IsEnabled = true;
                                val.IsVisible = true;
                                val.FieldLabel = selectedName;
                            }
                        }
                        contextObj.fields = contextObj.fields;
                        contextObj.itemsSource = JSON.parse(resultData["Data"]["FieldBinderData"]);
                        if (contextObj.itemsSource.length == 0) {
                            contextObj.disableButton = true
                            contextObj.notificationService.ShowToaster("No " + contextObj.fieldname + "(s) are assigned to this floor", 2);
                        }
                        else {
                            contextObj.disableButton = false;
                        }
                    });
                }                
            //}
        });
    }

    ngAfterViewInit() {

    }

    submit(value: any) {
        var contextObj = this;

        this.savedData = value;
            var PageTarget;
            switch (this.value) {
                case 1:
                    this.value = 290;
                    break;
                case 2:
                    this.value = 292;
                    break;
                case 3:
                    this.value = 294;
                    break;
                case 4:
                    this.value = 296;
                    break;
                case 5:
                    this.value = 298;
                    break;
                case -2:
                    this.value = -1;
                    break;


            }
            var checkcount = value.checkcount;
            if (checkcount == 0) {
                contextObj.notificationService.ShowToaster("Select at least one " + this.fieldname + ", Color", 5);
            }
            else {
                var count = 0;
                var reportfieldidvalue = value.ReportFieldIdValues;
                var fields1 = JSON.parse(reportfieldidvalue);
                var fieldobj = new Array<ReportFieldArray>();
                for (let i = 0; i < fields1.length; i++) {
                    fields1[i].ReportFieldIdValues.find(function (item) {
                        if (item.ReportFieldId == 766) {
                            contextObj.angle = item.Value;
                        }
                    });

                    fields1[i].ReportFieldIdValues.find(function (item) {
                        if (item.ReportFieldId == 765) {
                            contextObj.pattern = item.Value;
                        }
                    });

                    fields1[i].ReportFieldIdValues.find(function (item) {
                        if (item.ReportFieldId == 767) {
                            contextObj.scale = item.Value;
                        }
                    });
                    fields1[i].ReportFieldIdValues.find(function (item) {
                        if (item.ReportFieldId == 768) {
                            if (item.Value != "nil")
                                contextObj.color = item.Value;
                            else
                                contextObj.color = "FFFFFF";
                        }
                    });
                    fields1[i].ReportFieldIdValues.find(function (item) {
                        if (item.ReportFieldId == 286) {
                            contextObj.selectedValue = item.Value;
                        }
                    });
                    
                    this.spaceService.insertDistributionMaponDrawing(this.value, this.drawingId, contextObj.selectedValue, contextObj.pattern, contextObj.angle, contextObj.scale, "'" + contextObj.color + "'").subscribe(function (resultData) {
                        if (resultData.ServerId == 1) {
                            count++;
                        }
                        if (count == fields1.length) {
                            if (contextObj.value == "-4") {
                                
                                contextObj.spaceService.UpdateArchivedSpaceDriverDefaultColors(value.ReportFieldIdValues, contextObj.drawingId, contextObj.archiveId).subscribe(function (resultData) {
                                    contextObj.submitSuccess.emit({ status: "success", FieldId: contextObj.value, FieldName: contextObj.fieldname });
                                });

                            }
                            else
                                contextObj.submitSuccess.emit({ status: "success", FieldId: contextObj.value, FieldName: contextObj.fieldname });
                        }
                    });
                }
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
        this.spaceService.updateDistributionMapSettingsData(this.savedData.ReportFieldIdValues, 1, 1, PageTarget, this.valueofDropDown).subscribe(function (resultData) {
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


/// <reference path="../building/building-addedit.component.ts" />
import {Component, Output, OnInit, SimpleChange, OnChanges, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {SiteAddEditComponent} from '../site/site-addedit.component'
import {BuildingAddEditComponent} from '../building/building-addedit.component'
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';

@Component({
    selector: 'floor-addEdit',
    templateUrl: 'app/Views/Administration/Floor/floor-addedit.html',
    providers: [AdministrationService, NotificationService, GeneralFunctions, ValidateService],
    directives: [FieldComponent, Notification, SlideComponent, SiteAddEditComponent, BuildingAddEditComponent],
    inputs: ['selectedId', 'addEdit', 'moduleId']

})

export class FloorAddEditComponent {
    success: any;
    public fieldDetailsSpaceEdit: IField[];
    btnName: string;
    selectedId: number;
    addEdit: string;
    addedit: string = "add";
    position = "top-right";
    showSlide = false;
    sitebuildingadd: number;
    moduleId: any;
    @Output() submitSuccess = new EventEmitter();
    title: string;
    constructor(private administrationService: AdministrationService, private validateService: ValidateService, private _notificationService: NotificationService, private generFun: GeneralFunctions) {
    }
    ngOnInit() {
        console.log("mod1" + this.moduleId.toString());
        if (this.addEdit == "add")
            this.btnName = "Save"
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes"
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save";
            var contextObj = this;
            this.administrationService.loadFloorAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                    for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {

                        switch (contextObj.fieldDetailsSpaceEdit[i]["FieldId"]) {
                            case 347:
                                contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = true;
                                contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "1";
                                break;
                            case 38:
                                contextObj.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = result == 1 ? null : { Name: "SiteAdd", showImage: true };
                                });
                                // contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = { Name: "SiteAdd", showImage: true };

                                break;
                            case 325:
                                contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = { Name: "BuildingAdd", showImage: true };
                                break;
                        }

                    }
                }
            })

        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes";
            var contextObj = this;
            this.administrationService.loadFloorAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                    for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {

                        switch (contextObj.fieldDetailsSpaceEdit[i]["FieldId"]) {
                            case 347:
                                contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = false;
                                break;
                            case 38:
                                if (changes["pagePath"] && changes["pagePath"]["currentValue"] == "As Builts / Data")
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = null;
                                contextObj.fieldDetailsSpaceEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsSpaceEdit[i]["ReadOnlyMode"] = true;
                                break;
                            case 325:
                                if (changes["pagePath"] && changes["pagePath"]["currentValue"] == "As Builts / Data")
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = null;
                                contextObj.fieldDetailsSpaceEdit[i]["IsEnabled"] = true;
                                contextObj.fieldDetailsSpaceEdit[i]["ReadOnlyMode"] = true;
                                break;
                        }

                    }
                }
            })

        }
    }
    onSubmitData(event) {


        if (this.addEdit == "add") {
            var temp = JSON.parse(event["fieldobject"])
            var contextObj = this;

            if (contextObj.moduleId != undefined)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });

            this.administrationService.submitFloorAdd(JSON.stringify(temp)).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"];
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Floor added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("Failed to update Floor", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            contextObj._notificationService.ShowToaster("Floor already exists", 5);
                        }
                    }
                }
            });
        }
        else if (this.addEdit == "edit") {
            var contextObj = this;
            var temp = JSON.parse(event["fieldobject"])

            if (contextObj.moduleId)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });

            this.administrationService.submitFloorEdit(JSON.stringify(temp), this.selectedId).subscribe(function (resultData) {
                if (contextObj.generFun.checkForUnhandledErrors(resultData)) {

                    contextObj.success = (resultData["Data"]);
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Floor updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });

                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("Failed to update Floor", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -1) {
                            contextObj._notificationService.ShowToaster("Floor already exists", 5);
                        }
                    }
                }
            });
        }


    }

    fieldChange(event: any) {
        var fieldobj = new Array<ReportFieldArray>();
        var siteid = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        if (siteid) {
            fieldobj.push({
                ReportFieldId: event["ddlRelationShipEvent"]["ChildFieldObject"]["ReportFieldId"],
                Value: event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"]
            });

        }
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var result;
        var status = this.fieldDetailsSpaceEdit.find(function (item) { return item.FieldId === 347 })

        var contextObj = this;
        if (siteid > 0) {
            if (parentFieldId == 38) {
                status.IsEnabled = true;
                status.FieldValue = "1";
                this.administrationService.loadBuilding(siteid, parentFieldId).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    if (<HTMLElement>document.getElementById("325")) {
                                        var el = <HTMLElement>document.getElementById("325");
                                        contextObj.validateService.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true, el);
                                    }
                                    break;
                                }
                            }
                        }
                        else {
                            for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    if (<HTMLElement>document.getElementById("325")) {
                                        var el = <HTMLElement>document.getElementById("325");
                                        contextObj.validateService.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true, el);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                })
            }
            else if (parentFieldId == 325) {
                this.administrationService.getStatus(siteid, 487).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"] == 56) {
                            status.IsEnabled = false;
                            status.FieldValue = "56"
                        }
                        else {
                            status.IsEnabled = true;
                            status.FieldValue = "1"
                        }


                    }
                })

            }
        }
        else {
            if (parentFieldId == 38) {
                for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                    if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                        contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                        contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                        if (<HTMLElement>document.getElementById("325")) {
                            var el = <HTMLElement>document.getElementById("325");
                            contextObj.validateService.initiateValidation(contextObj.fieldDetailsSpaceEdit[i], contextObj, true, el);
                        }
                        break;
                    }
                }
            }
            else if (parentFieldId == 325) {
                status.IsEnabled = true;
                status.FieldValue = "1";
            }
        }
    }

    addClick(event: any) {
        this.showSlide = !this.showSlide;

    }
    popupItemEmit(event) {

        this.showSlide = !this.showSlide;
        this.btnName = "";
        this.sitebuildingadd = event["reportfieldId"];
        if (this.sitebuildingadd == 38)
            this.title = "New Site";
        else if (this.sitebuildingadd == 325)
            this.title = "New Building"
    }
    closeSlideDialog(event) {
        this.showSlide = false
        if (this.addEdit == "add")
            this.btnName = "Save"
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes"
        this.sitebuildingadd = 0;
    }
    OnSuccessfulSubmi(event: any) {
        if (event["status"] == "success") {
            this.showSlide = !this.showSlide;
            if (this.addEdit == "add")
                this.btnName = "Save"
            else if (this.addEdit == "edit")
                this.btnName = "Save Changes";
            var sitedetails = this.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 489 });
            var buildingdetails = this.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 541 });
            var status = this.fieldDetailsSpaceEdit.find(function (item) { return item.FieldId === 347 })

            if (this.sitebuildingadd == 38) {

                sitedetails.FieldValue = JSON.parse(event["returnData"]["Data"])[0].Id.toString();
                sitedetails.LookupDetails.LookupValues.push({ Id: JSON.parse(event["returnData"]["Data"])[0].Id, IsDisabled: null, Value: JSON.parse(event["returnData"]["Data"])[0].Site });
                status.IsEnabled = true;
                status.FieldValue = "1"
            }
            else if (this.sitebuildingadd == 325) {
                var contextObj = this;

                sitedetails.FieldValue = JSON.parse(event["returnData"]["Data"])[0].SiteId.toString();
                this.administrationService.loadBuilding(JSON.parse(event["returnData"]["Data"])[0].SiteId, 38).subscribe(function (resultData) {
                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                        if (resultData["Data"]["LookupValues"] != "") {
                            for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = resultData["Data"]["LookupValues"];
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                        else {
                            for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                                if (contextObj.fieldDetailsSpaceEdit[i]["FieldId"] == 325) {
                                    contextObj.fieldDetailsSpaceEdit[i]["LookupDetails"]["LookupValues"] = null;
                                    contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "-1";
                                    break;
                                }
                            }
                        }
                        buildingdetails.FieldValue = JSON.parse(event["returnData"]["Data"])[0].BuildingId.toString();
                        contextObj.administrationService.getStatus(buildingdetails.FieldValue, 487).subscribe(function (resultData) {
                            if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                                if (resultData["Data"] == 56) {
                                    status.IsEnabled = false;
                                    status.FieldValue = "56"
                                }
                                else {
                                    status.IsEnabled = true;
                                    status.FieldValue = "1"
                                }


                            }
                        })
                    }

                })

            }
        }

    }
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
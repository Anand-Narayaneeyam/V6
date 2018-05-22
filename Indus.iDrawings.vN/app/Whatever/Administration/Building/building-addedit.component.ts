import {Component, Output, OnInit, SimpleChange, OnChanges, EventEmitter, Input} from '@angular/core';
import {NgControl} from '@angular/common';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'
import {PopupAddComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/popupadd.component';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {SiteAddEditComponent} from '../site/site-addedit.component'
import { GeneralFunctions} from '../../../Models/Common/General';
import { ValidateService } from '../../../Framework/Models/Validation/validation.service';
import {SplitViewComponent} from '../../../Framework/Whatever/Split-View/split-view.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import {IMap } from '../../../framework/models/interface/imap';
import {MapComponent} from '../../../Framework/Whatever/Map/map.component';
@Component({
    selector: 'building-addEdit',
    templateUrl: 'app/Views/Administration/Building/building-addedit.html',
    providers: [AdministrationService, NotificationService, GeneralFunctions, ValidateService],
    directives: [FieldComponent, Notification, PopupAddComponent, SlideComponent, SiteAddEditComponent, SplitViewComponent, MapComponent],
    inputs: ['selectedId', 'addEdit', 'moduleId']
})

export class BuildingAddEditComponent {
    success: any;
    addedit: string = "add";
    public fieldDetailsSpaceEdit: IField[];
    btnName: string;
    selectedId: number;
    addEdit: string;
    position = "top-right";
    showSlide = false;
    @Output() submitSuccess = new EventEmitter();
    @Input() pagePath: string;
    siteadd: number;
    moduleId: any;
    inputItems: IMap[] = [];
    splitview: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 30 };
    pageTitle: string = "";
    strPopupText: string;
    flag: boolean = false;
    title: string;
    constructor(private administrationService: AdministrationService, private _validateService: ValidateService, private _notificationService: NotificationService, private getData: GeneralFunctions, private generFun: GeneralFunctions) {
    }


    ngOnInit() {

        if (this.addEdit == "add")
            this.btnName = "Save"
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes"


    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {        
        var index;
        if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "add") {
            this.btnName = "Save";
            var contextObj = this;
            this.administrationService.loadBuildingAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                    for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                        switch (contextObj.fieldDetailsSpaceEdit[i]["FieldId"]) {
                            case 42: {
                                contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = true;
                                contextObj.fieldDetailsSpaceEdit[i]["FieldValue"] = "1";
                            }
                                break;
                            case 1387: {
                                contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = false;

                            }
                                break;
                            case 38:
                                if (changes["pagePath"] == undefined) {
                                    contextObj.administrationService.CheckIsSiteLevelAdmin(0).subscribe(function (result) {
                                        contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = result == 1 ? null : { Name: "SiteAdd", showImage: true };
                                    });
                                }
                                else
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = null;
                                break;

                        }
                    }
                    contextObj.fieldDetailsSpaceEdit = contextObj.checkRPMModuleIsEnabled(contextObj.fieldDetailsSpaceEdit);
                    contextObj.fieldDetailsSpaceEdit.find(function (el) {
                        if (el.FieldId == 54) {
                            contextObj.strPopupText = "Validate on Map"
                            el.LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                            return true
                        }
                    })

                }

            })


        }
        else if (changes["addEdit"] && changes["addEdit"]["currentValue"] == "edit") {
            this.btnName = "Save Changes";
            var contextObj = this;
            this.administrationService.loadBuildingAddEdit(this.selectedId, this.addEdit).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.fieldDetailsSpaceEdit = resultData["Data"];
                    for (let i = 0; i < contextObj.fieldDetailsSpaceEdit.length; i++) {
                        switch (contextObj.fieldDetailsSpaceEdit[i]["FieldId"]) {
                            case 42: {
                                contextObj.administrationService.getStatus(contextObj.selectedId, 487).subscribe(function (resultData) {
                                    if (contextObj.generFun.checkForUnhandledErrors(resultData)) {
                                        console.log(resultData)

                                        if (resultData["Data"] == 56) {
                                            contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = true;
                                            contextObj.fieldDetailsSpaceEdit[i].FieldValue = "56";
                                        }
                                        else
                                            contextObj.fieldDetailsSpaceEdit[i]["IsVisible"] = false;

                                    }
                                })

                            }
                                break;
                            case 46:
                                var relievinginfo = contextObj.fieldDetailsSpaceEdit.find(function (item) {
                                    return item.FieldId === 1387
                                });
                                // debugger
                                if (contextObj.fieldDetailsSpaceEdit[i].FieldValue == "2") {

                                    relievinginfo.IsEnabled = true;
                                    relievinginfo.IsVisible = true;
                                }
                                else
                                { relievinginfo.IsVisible = false; }
                                break;
                            case 38:
                                if (changes["pagePath"] && changes["pagePath"]["currentValue"] == "As Builts / Data")
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = null;
                                else {
                                    contextObj.fieldDetailsSpaceEdit[i].LookupDetails.PopupComponent = { Name: "SiteAdd", showImage: true };
                                }
                                break;
                        }
                    }
                    contextObj.fieldDetailsSpaceEdit = contextObj.checkRPMModuleIsEnabled(contextObj.fieldDetailsSpaceEdit);
                    contextObj.fieldDetailsSpaceEdit.find(function (el) {
                        if (el.FieldId == 54) {
                            contextObj.strPopupText = "Validate on Map"
                            el.LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                            return true
                        }
                    })
                }
            })
        }




    }
    onSubmitData(event) {
        // debugger
        if (this.addEdit == "add") {
            var temp = JSON.parse(event["fieldobject"]);
            var contextObj = this;

            if (contextObj.moduleId != undefined)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });

            this.administrationService.submitBuildingAdd(JSON.stringify(temp)).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {
                    contextObj.success = resultData["Data"];
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Building added", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });
                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -2) {
                            contextObj._notificationService.ShowToaster("Building already exists", 5);
                        }
                        else if (contextObj.success["ServerId"] == -1)
                            contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                        else if (contextObj.success["ServerId"] == -3)
                            contextObj._notificationService.ShowToaster("Building Code already exists", 5);

                    }
                }
            });

        }
        else if (this.addEdit == "edit") {
            var contextObj = this;
            var temp = JSON.parse(event["fieldobject"]);

            if (contextObj.moduleId)
                temp.push({ ReportFieldId: 271, Value: contextObj.moduleId.toString() });

            this.administrationService.submitBuildingEdit(JSON.stringify(temp), this.selectedId).subscribe(function (resultData) {
                if (contextObj.getData.checkForUnhandledErrors(resultData)) {

                    contextObj.success = (resultData["Data"]);
                    if (contextObj.success["StatusId"] == 1) {
                        contextObj._notificationService.ShowToaster("Building updated", 3);
                        contextObj.submitSuccess.emit({ status: "success", returnData: contextObj.success });

                    }
                    else if (contextObj.success["StatusId"] == 0)
                        contextObj._notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    else if (contextObj.success["StatusId"] == 3) {
                        if (contextObj.success["ServerId"] == -2) {
                            contextObj._notificationService.ShowToaster("Building already exists", 5);
                        }
                        else if (contextObj.success["ServerId"] == -1)
                            contextObj._notificationService.ShowToaster("Permitted number of buildings already created", 5);
                        else if (contextObj.success["ServerId"] == -3)
                            contextObj._notificationService.ShowToaster("Building Code already exists", 5);
                    }
                }
            });
        }
    }
    addClick(event: any) {
        this.showSlide = !this.showSlide;

    }
    fieldChange(event: any) {
        // debugger
        var parentSelectedValue = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldValue"];
        var parentFieldId = event["ddlRelationShipEvent"]["ChildFieldObject"]["FieldId"];
        var contextObj = this;

        var relievinginfo = this.fieldDetailsSpaceEdit.find(function (item) {
            return item.FieldId === 1387
        });

        if (parentFieldId == 46) {//if purchase type-purchase data will be visible
            console.log("relievinginfo", relievinginfo.FieldValue);
            //  relievinginfo.IsLocallyValidated = false;
            if (parentSelectedValue == "2") {
                // relievinginfo.IsMandatory = true;
                relievinginfo.IsEnabled = true;
                relievinginfo.IsVisible = true;
                // relievinginfo.HasValidationError = true;
                // if (relievinginfo.FieldValue && relievinginfo.FieldValue != "") {
                // relievinginfo.HasValidationError = false;
                // }
                //if (<HTMLElement>document.getElementById("1387")) {
                //    var el = <HTMLElement>document.getElementById("678");
                //    el.focus();
                //    contextObj._validateService.initiateValidation(relievinginfo, contextObj, true, el);
                //}

            }
            else {
                // relievinginfo.IsMandatory = false;
                relievinginfo.IsEnabled = false;
                relievinginfo.IsVisible = false;
                relievinginfo.FieldValue = null;
                // relievinginfo.HasValidationError = false;

            }

        }
    }
    checkRPMModuleIsEnabled(data) {
        // debugger
        var contextObj = this;
        this.administrationService.getAccessibleModuleForUser().subscribe(function (resultData) {
            var accesibleModules = resultData["Data"];
            var isRpmEnabled = [];
            isRpmEnabled = resultData["Data"].filter(function (item) { return item.ModuleId === 30 });
            if (isRpmEnabled.length > 0) {
                var count = 0;
                data.find(function (item) {
                    if (item.FieldId == 45 || item.FieldId == 46) {
                        if (isRpmEnabled) {
                            item.IsMandatory = true;
                            item.HasValidationError = true;
                            item.IsLocallyValidated = false;
                            var el = <HTMLElement>document.getElementById(item.FieldId.toString());
                            if (el != null && el != undefined) {
                                setTimeout(function () {
                                    contextObj._validateService.initiateValidation(item, contextObj, true, el);
                                }, 100);
                            }
                            count++;
                        }
                        if (count == 2) return true;
                    }
                    else return false;
                });
            }
            else {

                data.find(function (item) {
                    if (item.FieldId == 45 || item.FieldId == 46) {
                        if (isRpmEnabled) {
                            item.IsVisible = false;
                            count++;
                        }
                        if (count == 2) return true;
                    }
                    else return false;
                });
            }
        });
        return data;
    }
    popupItemEmit(event) {
        
        if (event["reportfieldId"] == 54) {
            this.pageTitle = "Map";
            this.getGisData(event);
        } else {
            this.showSlide = !this.showSlide;
            this.btnName = "";
            this.siteadd = event["reportfieldId"];
        }
        if (this.siteadd == 38)
            this.title = "New Site";
    }
    closeSlideDialog(event) {
        this.showSlide = false
        if (this.addEdit == "add")
            this.btnName = "Save"
        else if (this.addEdit == "edit")
            this.btnName = "Save Changes";
        this.siteadd = 0;
    }
    OnSuccessfulSubmi(event: any) {
        if (event["status"] == "success") {
            this.showSlide = !this.showSlide;
            if (this.addEdit == "add")
                this.btnName = "Save"
            else if (this.addEdit == "edit")
                this.btnName = "Save Changes"

            var sitedetails = this.fieldDetailsSpaceEdit.find(function (item) { return item.ReportFieldId === 489 });
            sitedetails.FieldValue = JSON.parse(event["returnData"]["Data"])[0].Id.toString();
            sitedetails.LookupDetails.LookupValues.push({ Id: JSON.parse(event["returnData"]["Data"])[0].Id, IsDisabled: null, Value: JSON.parse(event["returnData"]["Data"])[0].Site });
        }
    }

    getGisData(event: any) {
        var contextObj = this;
        contextObj.inputItems = [];
        var draggedLatitude: any = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 51 })]["FieldValue"]
        var draggedLongitude: any = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 54 })]["FieldValue"]
        if (draggedLatitude && draggedLongitude) {
            if (draggedLatitude >= -90 && draggedLatitude <= 90 && draggedLongitude >= -180 && draggedLongitude <= 180) {
                var Site: any, Building: any, OwnershipType: any, DateofConstruction: any, BuildingCondition: any;
                var Popup: any, subPopup: any, color: any
                var index: number = contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 46 });
                var draggedOwnershipId: number = Number(contextObj.fieldDetailsSpaceEdit[index]["FieldValue"]);
                if (draggedOwnershipId >= 0) {
                    var OwnershipLookup: any = contextObj.fieldDetailsSpaceEdit[index].LookupDetails.LookupValues;
                    index = OwnershipLookup.findIndex(c => c.Id == draggedOwnershipId);
                    OwnershipType = OwnershipLookup[index].Value;
                }
                index = contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 45 });
                var draggedBuildingConditionId: number = Number(contextObj.fieldDetailsSpaceEdit[index]["FieldValue"]);
                if (draggedBuildingConditionId >= 0) {
                    var BuildingConditionLookup: any = contextObj.fieldDetailsSpaceEdit[index].LookupDetails.LookupValues;
                    index = BuildingConditionLookup.findIndex(c => c.Id == draggedBuildingConditionId);
                    BuildingCondition = BuildingConditionLookup[index].Value;
                }


                index = contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 38 });
                var SiteId: number = Number(contextObj.fieldDetailsSpaceEdit[index]["FieldValue"]);
                if (SiteId >= 0) {
                    var SiteLookup: any = contextObj.fieldDetailsSpaceEdit[index].LookupDetails.LookupValues;
                    index = SiteLookup.findIndex(c => c.Id == SiteId);
                    Site = SiteLookup[index].Value;
                }
                var draggedid: any = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 38 })]
                Building = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 39 })]["FieldValue"];
                DateofConstruction = contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 47 })]["FieldValue"]
                Popup = "<b style=\"display:inline-block;width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\" title=\"" + Site + "\">SITE: " + Site + "</b><br/>"
                    + "<b style=\"display:inline-block;width:190px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\" title=\"" + Building + "\">BUILDING: " + Building + "</b>"
                    + "<hr style=\"height: 1px;width:190px;color: #333;background-color:#333;margin-left:0px;margin-top: 5px;margin-bottom: 5px;\" />"
                    + "<table style=\"position:relative;font-size:13px;\"><tr><td style=\"white-space:nowrap;\">Ownership Type</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + OwnershipType + "</td></tr>";
                subPopup = ""
                if (DateofConstruction)
                    subPopup = subPopup + "<tr><td style=\"white-space:nowrap;\">Construction Date</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + DateofConstruction + "</td></tr>"
                if (BuildingCondition)
                    subPopup = subPopup + "<tr><td style=\"white-space:nowrap;\">Building Condition</td><td style=\"display:inline-block;width:90px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;\">: " + BuildingCondition + "</td></tr>"
                Popup = Popup + subPopup + "</table>";

                if (Number(contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 46 })]["FieldValue"]) == 3) {
                    color = "Red"
                }
                else {
                    color = "Blue"
                }
                if (Popup) {
                    contextObj.inputItems.push({ Id: 0, Latitude: draggedLatitude, Longitude: draggedLongitude, Popup: Popup, Color: color, Draggable: true })
                    contextObj.splitview.showSecondaryView = !contextObj.splitview.showSecondaryView;
                    contextObj.flag = true
                    contextObj._notificationService.ShowToaster("Drag Pushpin to update Latitude and Longitude", 2);
                }

            }
        } else {
            contextObj._notificationService.ShowToaster("Enter Latitude and Longitude Values", 5);
        }
    }
    outputDraggedValue(event: any) {
        var contextObj = this
        var DraggedItem: IMap = event.DraggedItem
        contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 51 })]["FieldValue"] = DraggedItem.Latitude
        contextObj.fieldDetailsSpaceEdit[contextObj.fieldDetailsSpaceEdit.findIndex(function (el) { return el.FieldId == 54 })]["FieldValue"] = DraggedItem.Longitude
    }

}



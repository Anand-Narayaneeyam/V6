/// <reference path="../../../models/common/general.ts" />
import {Component, Input,OnInit, Output, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, EventEmitter, ViewEncapsulation } from '@angular/core';
import {NgControl} from '@angular/common';
import {GridComponent} from '../../../Framework/Whatever/Grid/grid.component';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import {IField} from '../../../Framework/Models//Interface/IField'
import {PagingComponent} from '../../../Framework/Whatever/Paging/paging.component';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IGrid} from '../../../Framework/Models/Interface/Igrid'
import {PageComponent} from '../../../Framework/Whatever/Page/page.component'
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view'
import {SubMenu} from '../../../Framework/Whatever/Submenu/submenu.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import { GeneralFunctions} from '../../../Models/Common/General';
import {SpaceService} from '../../../Models/Space/space.service';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';

@Component({
    selector: 'spacesharing-list',
    templateUrl: 'app/Views/Common/SpaceSharing/spacesharing-list.component.html',
    providers: [NotificationService, GeneralFunctions, SpaceService, AdministrationService],
    inputs: ["selectedId","GrossArea"],
    directives: [GridComponent, PagingComponent, PageComponent, SubMenu, Notification, SlideComponent, FieldComponent, SplitViewComponent],
    encapsulation: ViewEncapsulation.None

})
export class spacesharing {
    
    @Input() selectedId: any;
    @Input() GrossArea: any;
    @Output() submitSuccessSpaceShare = new EventEmitter();
    add: boolean = false;
    refreshgrid: any;
    edit: boolean = false;
    delete: boolean = true;
    Target: number;
    menuData = [];
    orgLevels = new Array<orgLevel>();
    btnName = "";
    enableMenu = [0];
    pageTitle: string = "Space Sharing by Division";
    public totalItems: number;
    public itemsPerPage: number;
    totalRowData: number;
    fieldDetailsAdd: IField[];
    isSmartSearch: boolean = false;
    itemsSource: any[];
    splitviewInput: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 70 };
    id: any;
    inputItems: IGrid = { dataKey: "RowIndex", groupBy: [], grpWithCheckBx: false, selectedIds: [], allowAdd: this.add, allowEdit: this.edit, selectioMode: 'single' };
    fieldObject: IField[];
    currentParentId: number;
    currentPercentageValue = 0;
    action = "";
    orgunitIds = [];
    selectedpercentage: number;
    rowIndex = 0;
    onintCount = 0;
    chngeInputSource = false; 
    position = "top-right";
    width = 300;
    change = false;
    showSlide = false;
    message = "";
    slidePopups = 0;
    types: any;
    spaceId: any;

    constructor(private differs: KeyValueDiffers, private _notificationService: NotificationService, private spaceService: SpaceService, private generalFunctions: GeneralFunctions, private administrationService: AdministrationService ) {

    }

    ngOnInit() {
        this.orgLevels.push({ lvl1:"", lvl2: "", lvl3: "", lvl4: "", lvl5:""})
        this.menuData = [{
                "id": 0,
                "title": "Add",
                "image": "Add",
                "path": "Add",
                "submenu": null
            },
            {
                "id": 1,
                "title": "Edit",
                "image": "Edit",
                "path": "Edit",
                "submenu": null
            },
            {
                "id": 2,
                "title": "Delete",
                "image": "Delete",
                "path": "Delete",
                "submenu": null
            }
        ];
        var context = this;
        context.spaceService.getSpaceSharingGridField().subscribe(function (result) {
            context.fieldObject = result["Data"];
        });
        if (context.selectedId[0] == undefined)
            context.spaceId = context.selectedId;
        else
            context.spaceId = context.selectedId[0];
        context.spaceService.getSpaceSharingGridData(context.spaceId).subscribe(function (result) {
            if (context.generalFunctions.checkForUnhandledErrors(result)) {
                context.totalItems = result["Data"].DataCount;
                context.onintCount = result["Data"].DataCount;
                var newdatasource = JSON.parse(result["Data"].FieldBinderData);
                var i = 0;

                newdatasource.filter(function (item) {
                    item["RowIndex"] = ++context.rowIndex;
                    context.currentPercentageValue = +parseFloat(item["Percentage"]).toFixed(1) + context.currentPercentageValue;
                    context.orgunitIds.push(+item["Id"])
                    return true
                });
                context.itemsSource = newdatasource;
                if (context.totalItems > 0) {
                    context.itemsSource = JSON.parse(result["Data"].FieldBinderData);
                    context.itemsPerPage = result["Data"].RowsPerPage;
                    context.totalRowData = context.totalItems;              
                }
                else {
                    context.currentPercentageValue = 0;
                }
            }
        });
    }

    ngDoCheck() {

    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

    }

    onSubmitSave() {
        var jsonVariable = {};
        var jsonarray = [];
        var contextObj = this;
        if (contextObj.currentPercentageValue == 100 && contextObj.chngeInputSource == true) {
            contextObj.itemsSource.filter(function (item) {
                var fieldObj = new Array<ReportFieldArray>();
                fieldObj.push({ ReportFieldId: 780, Value: contextObj.spaceId }, { ReportFieldId: 5080, Value: parseFloat(item["Percentage"]).toFixed(2) }, { ReportFieldId: 792, Value: item["Id"] });
                jsonarray.push(fieldObj);
                return true;
            });
            this.spaceService.insertSpacesharingOrganizationalUnit(JSON.stringify(jsonarray)).subscribe(function (resultData) {
                if (resultData["Data"].StatusId == 1)
                    contextObj._notificationService.ShowToaster("Space Sharing details saved", 3);
                else
                    contextObj._notificationService.ShowToaster("Failed to update Space Sharing", 5);
                contextObj.submitSuccessSpaceShare.emit({ update: true });
            });
        }
        else if (contextObj.currentPercentageValue == 0 && contextObj.chngeInputSource == true) {
            if (contextObj.onintCount > 0) {
                var fieldObj = new Array<ReportFieldArray>();
                fieldObj.push({ ReportFieldId: 780, Value: contextObj.spaceId });
                this.spaceService.deleteSpacesharingOrganizationalUnit(JSON.stringify(fieldObj)).subscribe(function (resultData) {
                    if (resultData["Data"].Message == "Success")
                        contextObj._notificationService.ShowToaster("Space Sharing details saved", 3);
                    else 
                        contextObj._notificationService.ShowToaster("Failed to update Space Sharing", 5);
                    contextObj.submitSuccessSpaceShare.emit({ update: true });
                });
            }
            else
            {
                contextObj.submitSuccessSpaceShare.emit({ update: false });
            }
        }
        else if (contextObj.currentPercentageValue > 0 && contextObj.currentPercentageValue < 100 && contextObj.chngeInputSource == true)
        {
            contextObj._notificationService.ShowToaster("Occupancy Percentages should add up to 100", 2);
        }
        else
        {
            contextObj.submitSuccessSpaceShare.emit({ update: false });
        }
    }

    onCancel()
    {

    }

    public pageChanged(event: any) {

    }

    onSubmitData(event: any)
    {
        var context = this;
        var jsonVariable = {};
        var jsonarray = [];
        var submitStatus = true;
        JSON.parse(event.fieldobject).filter(function (obj) {
            context.fieldObject.find(function (item) {
                if (obj.ReportFieldId == item.ReportFieldId) {
                    if (item.ReportFieldId == 290) {
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl1;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    }
                    else if (item.ReportFieldId == 292)
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl2;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    else if (item.ReportFieldId == 294)
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl3;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    else if (item.ReportFieldId == 296)
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl4;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    else if (item.ReportFieldId == 298)
                        if (obj.Value != "-1")
                            jsonVariable[item.FieldLabel] = context.orgLevels[0].lvl5;
                        else
                            jsonVariable[item.FieldLabel] = "";
                    else if (item.ReportFieldId == 5079)
                        jsonVariable[item.FieldLabel] = context.currentParentId;
                    else if (item.ReportFieldId == 780) {
                        if (context.action == "add")
                            jsonVariable[item.FieldLabel] = ++context.rowIndex;
                        else
                            jsonVariable[item.FieldLabel] = obj.Value;
                    }
                    else if (item.ReportFieldId == 5080)
                    {
                        jsonVariable[item.FieldLabel] = (+parseFloat(obj.Value).toFixed(1)).toString();
                    }
                    else
                        jsonVariable[item.FieldLabel] = obj.Value;
                    return true;
                }
            });
            return true;
        });
        if (context.action == "Update") {
            context.orgunitIds = [];
            context.itemsSource.filter(function (item) {
                if (+item["RowIndex"] == context.inputItems.selectedIds[0]) {
                    context.orgunitIds.push(+jsonVariable["Id"])
                }
                else {
                    context.orgunitIds.push(+item["Id"])
                }
                return true
            });
            var numOfTrue = 0;
            var status = false;
            for (var i = 0; i < context.orgunitIds.length; i++) {
                numOfTrue = 0;
                for (var j = 0; j < context.orgunitIds.length; j++) {
                    if (context.orgunitIds[i] === context.orgunitIds[j]) {
                        numOfTrue++;
                        if (numOfTrue > 1)
                        {
                            status = true;
                        }
                    }
                }
            }
            if (status == true) {
                context._notificationService.ShowToaster("Organizational Unit already assigned", 5);
                submitStatus = false;
            }
        }
        else {
            context.orgunitIds = [];
            context.itemsSource.filter(function (item) {
                context.orgunitIds.push(+item["Id"])
                return true
            });
            if (context.orgunitIds.indexOf(+jsonVariable["Id"]) >= 0) {
                context._notificationService.ShowToaster("Organizational Unit already assigned", 5);
                submitStatus = false;
            }
            else
            {
                context.orgunitIds.push(+jsonVariable["Id"]);
            }
        }
        if (submitStatus == true)
        {
            jsonVariable["Area"] = (context.GrossArea * +parseFloat(jsonVariable["Percentage"]).toFixed(1)) / 100;
            jsonarray.push(jsonVariable);
            if ((+parseFloat(jsonVariable["Percentage"]).toFixed(1) + context.currentPercentageValue) > 100 && this.action == "add") {
                context._notificationService.ShowToaster("Total Occupancy Percentage cannot exceed 100", 5);
            }
            else if (this.action == "Update" && (+parseFloat(jsonVariable["Percentage"]).toFixed(1) + context.currentPercentageValue - +context.selectedpercentage) > 100) {
                context._notificationService.ShowToaster("Total Occupancy Percentage cannot exceed 100", 5);
            }
            else {
                let retUpdatedSrc;
                if (this.action == "add") {
                    context.chngeInputSource = true;
                    var newtable = {};
                    newtable["returnData"] = JSON.stringify(jsonarray);
                    context.refreshgrid = [];
                    context.currentPercentageValue = +parseFloat(jsonVariable["Percentage"]).toFixed(1) + +context.currentPercentageValue;
                    retUpdatedSrc = context.generalFunctions.updateDataSource(context.itemsSource, "add", newtable, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                    context.totalItems = retUpdatedSrc["itemCount"];
                    context.itemsSource = retUpdatedSrc["itemSrc"];
                    context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                    context.enableMenu = [0, 1, 2];
                    context.types = true;
                }
                else {
                    context.chngeInputSource = true;
                    var newtable = {};
                    newtable["returnData"] = JSON.stringify(jsonarray);
                    context.refreshgrid = [];
                    context.currentPercentageValue = +parseFloat(jsonVariable["Percentage"]).toFixed(1) + context.currentPercentageValue - +context.selectedpercentage;
                    retUpdatedSrc = context.generalFunctions.updateDataSource(context.itemsSource, "edit", newtable, context.inputItems.selectedIds, context.inputItems.dataKey, context.totalItems);
                    context.refreshgrid = context.refreshgrid.concat([true]);
                    context.splitviewInput.showSecondaryView = !context.splitviewInput.showSecondaryView;
                }

            }
        }
    }

    onSubMenuChange(event: any) {
        var contextObj = this;
        switch (event.value) {
            case 0:
                if (contextObj.currentPercentageValue != 100) {
                    contextObj.action = "add";
                    contextObj.spaceService.getSpaceSharingeditDetailsFields(contextObj.spaceId).subscribe(function (result) {
                        contextObj.fieldDetailsAdd = result["Data"];
                        contextObj.fieldDetailsAdd.find(function (itemdetails) {
                            if (itemdetails.FieldLabel == "Percentage") {
                                itemdetails.FieldValue = (100 - (+parseFloat(contextObj.currentPercentageValue.toString()).toFixed(1))).toString();
                                itemdetails.FieldValue = parseFloat(itemdetails.FieldValue).toFixed(1);
                                return true;
                            }
                        });
                        contextObj.Target = 0;
                        contextObj.btnName = "Save";
                        contextObj.pageTitle = "Assign Shared Organizational Unit";
                        contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                    });         
                }
                else
                {
                    contextObj._notificationService.ShowToaster("Total Occupancy is already 100 percent", 5);
                }
                break;
            case 1:
                contextObj.spaceService.getSpaceSharingeditDetailsFields(contextObj.spaceId).subscribe(function (result) {
                    
                    contextObj.fieldDetailsAdd = result["Data"];
                    contextObj.itemsSource.filter(function (item) {
                        if (contextObj.inputItems.selectedIds[0] == item["RowIndex"])
                        {
                            var length = contextObj.fieldDetailsAdd.length;
                            
                            contextObj.fieldDetailsAdd[0].FieldValue = item[contextObj.fieldDetailsAdd[0].FieldLabel];
                            contextObj.fieldDetailsAdd[length - 2].FieldValue = item[contextObj.fieldDetailsAdd[length - 2].FieldLabel];
                            contextObj.fieldDetailsAdd[length - 1].FieldValue = item[contextObj.fieldDetailsAdd[length - 1].FieldLabel];
                            contextObj.selectedpercentage = +item[contextObj.fieldDetailsAdd[length - 2].FieldLabel];
                            if (length - 2 > 1) {
                                if (contextObj.fieldDetailsAdd[1].LookupDetails.LookupValues != null) {
                                    contextObj.fieldDetailsAdd[1].LookupDetails.LookupValues.find(function (lookup) {
                                        
                                        if (lookup.Value == item[contextObj.fieldDetailsAdd[1].FieldLabel]) {
                                            contextObj.fieldDetailsAdd[1].FieldValue = lookup.Id.toString();
                                            contextObj.currentParentId = lookup.Id;
                                            contextObj.fieldDetailsAdd[1].FieldValue = item[contextObj.fieldDetailsAdd[1].FieldLabel];
                                            contextObj.orgLevels[0].lvl1 = item[contextObj.fieldDetailsAdd[1].FieldLabel];
                                            return true
                                        }
                                    })
                                }
                            }
                            if (length - 2 > 2)
                            {
                                var fieldObj = new Array<ReportFieldArray>();
                                if (contextObj.fieldDetailsAdd[2].ReportFieldId == 292) {
                                    fieldObj.push({ ReportFieldId: 289, Value: "2" }, { ReportFieldId: 288, Value: contextObj.currentParentId.toString() })
                                    contextObj.spaceService.loadSpacesharingOrganizationalUnit(contextObj.currentParentId, contextObj.fieldDetailsAdd[1].FieldId, fieldObj).subscribe(function (resultData) {
                                        
                                        contextObj.fieldDetailsAdd[2].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                        contextObj.fieldDetailsAdd[2].LookupDetails.LookupValues.find(function (lookup) {
                                            if (lookup.Value == item[contextObj.fieldDetailsAdd[2].FieldLabel]) {
                                                contextObj.fieldDetailsAdd[2].FieldValue = lookup.Id.toString();
                                                contextObj.currentParentId = lookup.Id;
                                                contextObj.orgLevels[0].lvl2 = item[contextObj.fieldDetailsAdd[2].FieldLabel];
                                                return true
                                            }
                                        })
                                        if (length - 2 > 3)
                                        {
                                            var fieldObj = new Array<ReportFieldArray>();
                                            if (contextObj.fieldDetailsAdd[3].ReportFieldId == 294) {
                                                fieldObj.push({ ReportFieldId: 289, Value: "3" }, { ReportFieldId: 288, Value: contextObj.currentParentId.toString() })
                                                contextObj.spaceService.loadSpacesharingOrganizationalUnit(contextObj.currentParentId, contextObj.fieldDetailsAdd[2].FieldId, fieldObj).subscribe(function (resultData) {
                                                    
                                                    contextObj.fieldDetailsAdd[3].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                    contextObj.fieldDetailsAdd[3].LookupDetails.LookupValues.find(function (lookup) {
                                                        if (lookup.Value == item[contextObj.fieldDetailsAdd[3].FieldLabel]) {
                                                            contextObj.fieldDetailsAdd[3].FieldValue = lookup.Id.toString();
                                                            contextObj.currentParentId = lookup.Id;
                                                            contextObj.orgLevels[0].lvl3 = item[contextObj.fieldDetailsAdd[3].FieldLabel];
                                                            return true
                                                        }
                                                    })
                                                    if (length - 2 > 4) {
                                                        var fieldObj = new Array<ReportFieldArray>();
                                                        if (contextObj.fieldDetailsAdd[4].ReportFieldId == 296) {
                                                            fieldObj.push({ ReportFieldId: 289, Value: "4" }, { ReportFieldId: 288, Value: contextObj.currentParentId.toString() })
                                                            contextObj.spaceService.loadSpacesharingOrganizationalUnit(contextObj.currentParentId, contextObj.fieldDetailsAdd[3].FieldId, fieldObj).subscribe(function (resultData) {
                                                                
                                                                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                                contextObj.fieldDetailsAdd[4].LookupDetails.LookupValues.find(function (lookup) {
                                                                    if (lookup.Value == item[contextObj.fieldDetailsAdd[4].FieldLabel]) {
                                                                        contextObj.fieldDetailsAdd[4].FieldValue = lookup.Id.toString();
                                                                        contextObj.currentParentId = lookup.Id;
                                                                        contextObj.orgLevels[0].lvl4 = item[contextObj.fieldDetailsAdd[4].FieldLabel];
                                                                        return true
                                                                    }
                                                                })
                                                                if (length - 2 > 5) {
                                                                    var fieldObj = new Array<ReportFieldArray>();
                                                                    if (contextObj.fieldDetailsAdd[5].ReportFieldId == 296) {
                                                                        fieldObj.push({ ReportFieldId: 289, Value: "5" }, { ReportFieldId: 288, Value: contextObj.currentParentId.toString() })
                                                                        contextObj.spaceService.loadSpacesharingOrganizationalUnit(contextObj.currentParentId, contextObj.fieldDetailsAdd[4].FieldId, fieldObj).subscribe(function (resultData) {
                                                                            contextObj.fieldDetailsAdd[5].LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                                                                            contextObj.fieldDetailsAdd[5].LookupDetails.LookupValues.find(function (lookup) {
                                                                                if (lookup.Value == item[contextObj.fieldDetailsAdd[5].FieldLabel]) {
                                                                                    contextObj.fieldDetailsAdd[5].FieldValue = lookup.Id.toString();
                                                                                    contextObj.currentParentId = lookup.Id;
                                                                                    contextObj.orgLevels[0].lvl5 = item[contextObj.fieldDetailsAdd[5].FieldLabel];
                                                                                    return true
                                                                                }
                                                                            })
                                                                            if (length - 2 > 3) {

                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                        

                                    });
                                }
                            }
                                                     
                        }
                        return true;
                    });
                    contextObj.Target = 0;
                    contextObj.btnName = "Save Changes";
                    contextObj.action = "Update";
                    contextObj.pageTitle = "Assign Shared Organizational Unit";
                    contextObj.splitviewInput.showSecondaryView = !contextObj.splitviewInput.showSecondaryView;
                });
                break;
            case 2:
                if (contextObj.inputItems.selectedIds[0] != undefined) {
                    contextObj.Target = 2;
                    contextObj.slidePopups = 2;
                    this.message = "Are you sure you want to delete the selected Organizational Unit?";
                    contextObj.width = 300;
                    contextObj.change = !this.change;
                    contextObj.showSlide = !this.showSlide;
                }
                else
                {
                    this._notificationService.ShowToaster("This operation can be performed only one row at a time", 2);
                }
                break;
        }
    }

    private editddlChange(arg, state?: boolean) {
        var context = this;
        let rptFieldId 
        if (state == true) {
            rptFieldId = arg;
        }
        else {
            rptFieldId = arg.ddlRelationShipEvent.ChildFieldObject;
        }
        var fieldObj = new Array<ReportFieldArray>();
        context.currentParentId = +rptFieldId.FieldValue;
        switch (rptFieldId.ReportFieldId) {

            case 290: //org level1
                var rptArray = [292, 294, 296, 298] //clearing orgddl
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue)
                        {
                            context.orgLevels[0].lvl1 = item.Value;
                            return true;
                        }
                    });
                    fieldObj.push({ ReportFieldId: 289, Value: "2" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() })
                    context.spaceService.loadSpacesharingOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 292);
                    });
                } else
                {
                    context.orgLevels[0].lvl1 = "";
                    context.orgLevels[0].lvl2 = "";
                    context.orgLevels[0].lvl3 = "";
                    context.orgLevels[0].lvl4 = "";
                    context.orgLevels[0].lvl5 = "";
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 292: //orgLevel 2
                var rptArray = [294, 296, 298] //clearing orgddl            
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl2 = item.Value;
                            return true;
                        }
                    });
                    fieldObj.push({ ReportFieldId: 289, Value: "3" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });
                    context.spaceService.loadSpacesharingOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 294);
                    });

                } else {
                    context.orgLevels[0].lvl2 = "";
                    context.orgLevels[0].lvl3 = "";
                    context.orgLevels[0].lvl4 = "";
                    context.orgLevels[0].lvl5 = "";
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 294: //level3
                var rptArray = [296, 298] //clearing orgddl             
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl3 = item.Value;
                            return true;
                        }
                    });
                    fieldObj.push({ ReportFieldId: 289, Value: "4" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() })
                    context.spaceService.loadSpacesharingOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 296);
                    });

                } else {
                    context.orgLevels[0].lvl3 = "";
                    context.orgLevels[0].lvl4 = "";
                    context.orgLevels[0].lvl5 = "";
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }

                break;
            case 296://level 4
                var rptArray = [298]
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl4 = item.Value;
                            return true;
                        }
                    });
                    fieldObj.push({ ReportFieldId: 289, Value: "5" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() })
                    context.spaceService.loadSpacesharingOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData, 298);
                    });

                } else {
                    context.orgLevels[0].lvl4 = "";
                    context.orgLevels[0].lvl5 = "";
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 298: //level5       
                if (rptFieldId.FieldValue != -1) {
                    rptFieldId.LookupDetails.LookupValues.find(function (item) {
                        if (item.Id == rptFieldId.FieldValue) {
                            context.orgLevels[0].lvl5 = item.Value;
                            return true;
                        }
                    });
                } else {
                    context.orgLevels[0].lvl5 = "";
                }
                break;
        }
    }

    private setRelatedOrgUnitddlValue(context, rptArray) {  //function for reseting null value for the lower levels based on higherlevel change orgUnitId
        var count = rptArray.length;
        context.fieldDetailsAdd.find(function (item) {
            if (rptArray.indexOf(item.ReportFieldId) > -1) {
                count--;
                item.LookupDetails.LookupValues = [];
                item.FieldValue = "-1";
            }
            if (count == 0)
                return true;
            else
                return false;
        });

    }

    private resetrealetedOrgLevellookup(context, rptArray, resultData, rsetddlRptFieldId) { //lookupvalue for lower level
        var count = rptArray.length;
        context.fieldDetailsAdd.find(function (item) {
            if (rptArray.indexOf(item.ReportFieldId) > -1) {
                count--;
                if (item.ReportFieldId == rsetddlRptFieldId)
                    item.LookupDetails.LookupValues = resultData["Data"]["LookupValues"];
                else
                    item.LookupDetails.LookupValues = [];
                item.FieldValue = "-1";
            }
            if (count == 0)
                return true;
            else
                return false;
        });
    }

    cancelClick(value: any) {
        this.showSlide = value.value;
        if (this.slidePopups == 1) {
            this.submitSuccessSpaceShare.emit({ update: false });
        }
    }
    closeSlideDialog(value: any) {
        this.showSlide = value.value;
    }

    yesClick(value: any)
    {
        var context = this;
        if (context.slidePopups == 2) {
            context.currentPercentageValue = 0;
            context.itemsSource = context.itemsSource.filter(function (item) {
                if (+item["RowIndex"] != context.inputItems.selectedIds[0]) {
                    context.currentPercentageValue = +parseFloat(item["Percentage"]).toFixed(1) + context.currentPercentageValue;
                    return true
                }
                else
                    return false
            });
            context.inputItems.selectedIds[0] = undefined;
            context.totalRowData = context.totalRowData - 1;
            context.totalItems = context.totalItems - 1;
            if (context.totalItems == 0) {
                context.enableMenu = [0];
                context.types = true;
            }
            else
            {
                context.enableMenu = [0,1,2];
                context.types = true;
            }
            context.showSlide = !context.showSlide;
            context.chngeInputSource = true;
            context._notificationService.ShowToaster("Selected Organizational Unit deleted", 2);
        }
        else
        {
            this.onSubmitSave();
        }
    }

    onCancelSpaceSharing()
    {
        var contextObj = this;
        if ((contextObj.currentPercentageValue == 100 || (contextObj.currentPercentageValue == 0 && contextObj.onintCount > 0 )) && contextObj.chngeInputSource == true) {
            this.width = 300;
            this.change = !this.change;
            this.slidePopups = 1;
            this.message = " Do you want to save changes?";
            this.showSlide = !this.showSlide;
        }
        else
        {
            contextObj.submitSuccessSpaceShare.emit({ update: false });
        }
    }
}

export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}

export interface orgLevel {
    lvl1: string;
    lvl2: string;
    lvl3: string;
    lvl4: string;
    lvl5: string;
}
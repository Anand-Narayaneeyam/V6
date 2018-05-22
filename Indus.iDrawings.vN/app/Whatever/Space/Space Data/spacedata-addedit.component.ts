import {Component, Output, EventEmitter, Input,SimpleChange, OnChanges} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'  
import {SpaceService} from '../../../Models/Space/space.service'
import {spacesharing} from '../../Common/Space Sharing/spacesharing-list';
import { SlideComponent} from '../../../Framework/Whatever/Slide/slide.component';
import {ISplitView} from '../../../Framework/Models/Interface/ISplit-view';
import { SplitViewComponent } from '../../../Framework/Whatever/Split-View/split-view.component';
import { AdministrationService } from '../../../Models/Administration/administration.service';

@Component({
    selector: 'spacedata-addedit',
    templateUrl: 'app/Views/Space/Space Data/spacedata-addedit.html',
    providers: [NotificationService, SpaceService, AdministrationService],
    directives: [FieldComponent, spacesharing, SlideComponent, SplitViewComponent],
    inputs: ['selectedId', 'action', 'fieldDetailsAdd', 'btnName', 'seledrwgids', 'sessionUserRoleId', 'strPopupText','moduleId']

})

export class SpaceAddEditComponent {
    dataKey: string = "SpaceId";
    selectedId: number;
    strPopupText: string;
    sessionUserRoleId: number;
    intpoptext = ""; 
    showSlide = false;  
    spacesharingadd = "";
    addedit = "";
    btnName = "";
    action: string;
    seledrwgids: any[];
    fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();
    retItem: IField;
    isableAllComponents: boolean = false;
    position = "top-right";
    splitviewInput1: ISplitView = { showSecondaryView: false, showButton: false, secondaryArea: 79 };
    pageTitle: string = "";
    levelname = "";
    Target: number;
    selectedgrossArea = "";
    userRoleId: any;
    moduleId: any;
    constructor(private notificationService: NotificationService, private spaceService: SpaceService, private administrationService: AdministrationService) {
    }
    ngOnInit() {
        var context = this;
        this.administrationService.getOrganizationNames().subscribe(function (resultData) {
            var pageName = JSON.parse(resultData["Data"]["FieldBinderData"]);
            if (pageName.length > 0)
            {
                context.levelname = pageName[0].Value
            }
        });
        context.administrationService.getSessionData().subscribe(function (data) {
            var retData = data["Data"];
            var UserRoleId = retData["UserRoleId"];
            context.userRoleId = retData["UserRoleId"];
        });
        /*CAI space driver field visibility*/
        if (context.moduleId == 12) {
            context.fieldDetailsAdd.find(function (el) {
                if (el.FieldId == 2596) {
                    el.IsVisible = true;
                    return true;
                } else return false;
            });
        }
        //var contextObj = this;
        //this.spaceService.checkEditPrivilageExist(this.selectedId).subscribe(function (resultData) {
        //    if (resultData['Data'].ServerId == 0)
        //        contextObj.isableAllComponents = true;
        //});
    }
    private onSubmitData(event) {
        var contextObj = this;
        switch (this.action) {
            case "add":
                this.postSubmit(contextObj, event["fieldobject"], 1);
                break;
            case "edit":
                this.postSubmit(contextObj, event["fieldobject"], 2);
                break;
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.intpoptext = this.strPopupText;
    }

    private postSubmit(contextObj, strsubmitField: string, target: number) {  
        debugger  
        var bigLevelId = contextObj.getGreaterOrgLevel();
        var submitFieldObj = JSON.parse(strsubmitField);

        submitFieldObj.find(function (item) {
            if (item.ReportFieldId == 792) {
                item.Value = bigLevelId;
                return true;
            } else {
                return false;
            }
        });
        var count = 0;
        //submitFieldObj.filter(function (item) {
        //    if (item.ReportFieldId == 271) {
        //        item.Value = contextObj.moduleId


        //    } count++;
        //    if (count == submitFieldObj.length)
        //        return true;
        //});
        submitFieldObj.push({ ReportFieldId: 271, Value: contextObj.moduleId });
        submitFieldObj = JSON.stringify(submitFieldObj);
     
       
        contextObj.spaceService.AddUpdateSpaceData(submitFieldObj, this.selectedId, target, this.seledrwgids.toString()).subscribe(function (resultData) {
            switch (resultData.StatusId) {
              
                case 0:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
                case 1:
                    if (target == 1) {
                        contextObj.notificationService.ShowToaster("Space details added", 3);
                    }
                    else {
                        contextObj.notificationService.ShowToaster("Space Details updated ", 3);
                    }
                    contextObj.submitSuccess.emit({ returnData: resultData.Data });
                    break;
                case 3:
                    switch (resultData.ServerId) {
                        case -2:
                            contextObj.notificationService.ShowToaster("This Room Number is already allotted", 5);
                            break;
                        case -3:
                            contextObj.notificationService.ShowToaster("This Room Number is already allotted in this Site", 5);
                            break;
                        case -4:
                            contextObj.notificationService.ShowToaster("This Room Number is already allotted in this Floor", 5);
                            break;
                        case -5:
                            contextObj.notificationService.ShowToaster("This Room Number is already allotted in this Building", 5);
                            break;
                    }
                    break;   
            
            }


        });

    }
    private getGreaterOrgLevel() {
        var orgRptFieldId = [290, 292, 294, 296, 298];
        var ct = orgRptFieldId.length;
        var maxlevelId = 0;
        this.fieldDetailsAdd.find(function (item) {
            if (orgRptFieldId.indexOf(item.ReportFieldId) > -1) {
                ct--;
                if (item.FieldValue != "-1") {
                    maxlevelId = Number(item.FieldValue);
                }             
            }
            if (ct == 0)
                return true;
            else
                return false;                          
        })
        return maxlevelId;
    }
    private editddlChange(arg) {
     
        var context = this;
        let rptFieldId = arg.ddlRelationShipEvent.ChildFieldObject;
        var fieldObj = new Array<ReportFieldArray>();   
        switch (rptFieldId.ReportFieldId) {
            case 783: //space category
                if (rptFieldId.FieldValue != "4") {
                    this.setEnable(false);
                } else {
                    this.setEnable(true);
                }
                break;
            case 290: //org level1
                var rptArray = [292, 294, 296, 298] //clearing orgddl
                if (rptFieldId.FieldValue != -1) {
                    fieldObj.push({ ReportFieldId: 289, Value: "2" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() })                 
                    context.spaceService.loadSpaceOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData,292);
                    });
                } else {
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                }
                break;
            case 292: //orgLevel 2
                var rptArray = [294, 296, 298] //clearing orgddl            
                if (rptFieldId.FieldValue != -1) {
                    fieldObj.push({ ReportFieldId: 289, Value: "3" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() });                  
                    context.spaceService.loadSpaceOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData,294);
                    });

                } else
                    context.setRelatedOrgUnitddlValue(context, rptArray);
                break;
            case 294: //level3
                var rptArray = [296, 298] //clearing orgddl             
                if (rptFieldId.FieldValue != -1) {
                    fieldObj.push({ ReportFieldId: 289, Value: "4" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() })                 
                    context.spaceService.loadSpaceOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData,296);
                    });

                } else
                    context.setRelatedOrgUnitddlValue(context, rptArray);
               
                break;
            case 296://level 4
                var rptArray = [298]
                if (rptFieldId.FieldValue != -1) {
                    fieldObj.push({ ReportFieldId: 289, Value: "5" }, { ReportFieldId: 288, Value: rptFieldId.FieldValue.toString() })
                    context.spaceService.loadSpaceOrganizationalUnit(rptFieldId.FieldValue, rptFieldId.FieldId, fieldObj).subscribe(function (resultData) {
                        context.resetrealetedOrgLevellookup(context, rptArray, resultData,298);
                    });

                } else
                    context.setRelatedOrgUnitddlValue(context, rptArray);
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

    private resetrealetedOrgLevellookup(context, rptArray, resultData,rsetddlRptFieldId) { //lookupvalue for lower level
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


    private setEnable(isEnable: boolean) {
 
        let fieldObjLen = this.fieldDetailsAdd.length;
        for (let i = 0; i < fieldObjLen; i++) {
            let rptFieldId = this.fieldDetailsAdd[i].ReportFieldId;
            //org unit and cost category disabling,spacecategory==4--isenable variableis true.
            if (this.sessionUserRoleId == 7 && isEnable == true) {      
                if ((rptFieldId >= 290 && rptFieldId <= 298) || (rptFieldId == 779)) {
                    if ((rptFieldId == 290) || (rptFieldId == 779)) {
                        this.fieldDetailsAdd[i].IsEnabled = false;
                        this.fieldDetailsAdd[i].ReadOnlyMode = true;
                    } else {
                        this.fieldDetailsAdd[i].IsEnabled = isEnable;
                        this.fieldDetailsAdd[i].ReadOnlyMode = !isEnable;
                    }
                }         
            } else {
                if ((rptFieldId >= 290 && rptFieldId <= 298) || (rptFieldId == 779)) {
                    if (rptFieldId == 290 && isEnable == false) {
                        this.strPopupText = ""
                        this.fieldDetailsAdd[i].LookupDetails.PopupComponent = null;
                    }
                    else if (rptFieldId == 290 && isEnable == true)
                    {
                        this.strPopupText = this.intpoptext;
                        this.fieldDetailsAdd[i].LookupDetails.PopupComponent = { Name: this.intpoptext, showImage: false };
                    }
                    this.fieldDetailsAdd[i].IsEnabled = isEnable;
                    this.fieldDetailsAdd[i].ReadOnlyMode = !isEnable;
                }
            }
        }
    }

    onsubmitSuccessSpaceShare(value: any)
    {
        var contextObj = this;
        var isSharing = true;
        if (value.update == true)
        {
            var newfieldDetailsAdd;
            contextObj.spaceService.loadSpaceAddEdit(contextObj.selectedId, 2).subscribe(function (result) {
                //contextObj.fieldDetailsAdd = result["Data"];
                for (var i = 0; i < contextObj.fieldDetailsAdd.length; i++)
                {
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 5049) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 5049) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (contextObj.fieldDetailsAdd[i].FieldValue == "False") {
                                    isSharing = false;
                                }
                                else
                                {
                                    isSharing = true;
                                }
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 290)
                    {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 290) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == false) {
                                    contextObj.strPopupText = "Share Space"
                                    contextObj.intpoptext = contextObj.strPopupText;
                                }
                                else {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                    contextObj.fieldDetailsAdd[i].FieldLabel = contextObj.fieldDetailsAdd[i].FieldLabel +": Shared" ;
                                    contextObj.strPopupText = "View"
                                    contextObj.intpoptext =contextObj.strPopupText;
                                }
                                contextObj.fieldDetailsAdd[i].LookupDetails.PopupComponent = { Name: contextObj.strPopupText, showImage: false };
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 292) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 292) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == true)
                                {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                }
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 294) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 294) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == true) {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                }
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 296) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 296) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == true) {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                }
                                return true;
                            }
                        });
                    }
                    if (contextObj.fieldDetailsAdd[i].ReportFieldId == 298) {
                        result["Data"].find(function (item) {
                            if (item.ReportFieldId == 298) {
                                contextObj.fieldDetailsAdd[i] = item;
                                if (isSharing == true) {
                                    contextObj.fieldDetailsAdd[i].ReadOnlyMode = true;
                                    contextObj.fieldDetailsAdd[i].IsEnabled = false;
                                    contextObj.fieldDetailsAdd[i].FieldValue = "-1";
                                }
                                return true;
                            }
                        });
                    }

                }
                contextObj.fieldDetailsAdd = contextObj.fieldDetailsAdd;
                contextObj.submitSuccess.emit({ returnData: [], shareSubmit: true, id: contextObj.selectedId });
                //newfieldDetailsAdd = contextObj.fieldDetailsAdd.filter(function (item) {
                //    if (item.ReportFieldId >= 290 && item.ReportFieldId <= 298 || item.ReportFieldId == 5049) {
                //        result["Data"].find(function (item2) {
                //            if (item.ReportFieldId == item2.ReportFieldId) {
                //                item = item2;
                //                return true;
                //            }
                //        });
                //    }
                //    return true;
                //});
                //contextObj.fieldDetailsAdd = newfieldDetailsAdd;
            });
        }
        this.splitviewInput1.showSecondaryView = !this.splitviewInput1.showSecondaryView;
        this.Target = 0;
    }

    popupItemEmit(event) {
        this.spacesharingadd = event["reportfieldId"];
        this.pageTitle = "Space Sharing by " + this.levelname;
        this.splitviewInput1.showSecondaryView = !this.splitviewInput1.showSecondaryView;
        this.Target = 1;
        var context = this;
        context.fieldDetailsAdd.filter(function (item) {
            if (item.FieldLabel == "Gross Area") {
                context.selectedgrossArea = item.FieldValue;
                return true;
            }
        });
    }

    closeSlideDialog(event) {
        this.showSlide = false;
    }
   
}
export interface ReportFieldArray {
    ReportFieldId: number;
    Value: string;
}
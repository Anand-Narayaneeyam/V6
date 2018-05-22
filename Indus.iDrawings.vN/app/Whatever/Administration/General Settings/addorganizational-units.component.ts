import {Component, Output, OnInit, SimpleChange, OnChanges, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/common';
import {AdministrationService} from '../../../Models/Administration/administration.service'
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import {FieldComponent} from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component'
import {IField} from '../../../Framework/Models//Interface/IField'


@Component({
    selector: 'addorganizational-units',
    templateUrl: 'app/Views/Administration/General Settings/addorganizational-units.component.html',
    providers: [AdministrationService, NotificationService],
    directives: [FieldComponent, Notification],
    inputs: ['selectedIds', 'addEdit','level','levelName']

})

export class AddOrganizationalComponent implements OnInit {
    public fieldDetailsAdd: any;
    btnName: string = "Add";
    dataKey: string = "Id";
    selectedIds: any;
    addEdit: string;
    level: number;
    levelName: string;
    formId :number;
    @Output() submitSuccess = new EventEmitter();
    code1: any;
    code2: any;
    code3: any;
    code4: any;
    editDetails: any;

    constructor(private administrationService: AdministrationService, private _notificationService: NotificationService) {
        
    }

    ngOnInit() {
      
    }

    editFormFields(editDetails: any, fieldDetailsAdd: any, contextObj: any) {
        fieldDetailsAdd = fieldDetailsAdd.filter(function (el) {
            var status = false;
            if (contextObj.level == 1) {
                if (el.ReportFieldId == 290) {
                    el.FieldValue = editDetails[0]["L1Name"];
                    el.IsVisible = true;
                    el.IsMandatory = true;
                    el.IsEnabled = true;
                    status = true;
                }

                if (el.ReportFieldId == 291)
                {
                    el.FieldValue = editDetails[0]["L1ShortName"];
                    el.IsVisible = true;
                    el.FieldLabel = "Code";
                    status = true;
                    el.IsEnabled = true;
                }
            }
            else if (contextObj.level == 2) {
                if (el.ReportFieldId == 292) {
                    el.FieldValue = editDetails[0]["L2Name"];
                    el.IsVisible = true;
                    el.IsMandatory = true;
                    el.IsEnabled = true;
                    status = true;
                }
                if (el.ReportFieldId == 293) {
                    el.IsVisible = true;
                    el.FieldValue = editDetails[0]["L2ShortName"];
                    el.FieldLabel = "Code";
                    el.IsEnabled = true;
                    status = true;
                }
            }
            else if (contextObj.level == 3) {
                if (el.ReportFieldId == 294) {
                    el.FieldValue = editDetails[0]["L3Name"];
                    el.IsVisible = true;
                    el.IsMandatory = true;
                    el.IsEnabled = true;
                    status = true;
                }
                if (el.ReportFieldId == 295) {
                    el.FieldValue = editDetails[0]["L3ShortName"];
                    el.FieldLabel = "Code";
                    el.IsVisible = true;
                    status = true;
                    el.IsEnabled = true;
                }
            }
            else if (contextObj.level == 4) {
                if (el.ReportFieldId == 296) {
                    el.FieldValue = editDetails[0]["L4Name"];
                    el.IsVisible = true;
                    el.IsEnabled = true;
                    status = true;
                    el.IsMandatory = true;
                }
                if (el.ReportFieldId == 297) {
                    el.IsVisible = true;
                    el.FieldValue = editDetails[0]["L4ShortName"];
                    el.FieldLabel = "Code";
                    status = true;
                    el.IsEnabled = true;
                }
            }
            else if (contextObj.level == 5) {
                if (el.ReportFieldId == 298) {
                    el.FieldValue = editDetails[0]["L5Name"];
                    el.IsVisible = true;
                    el.IsMandatory = true;
                    status = true;
                    el.IsEnabled = true;
                }
                if (el.ReportFieldId == 299) {
                    el.IsVisible = true;
                    el.FieldValue = editDetails[0]["L5ShortName"];
                    el.FieldLabel = "Code";
                    status = true;
                    el.IsEnabled = true;
                }               
            }
            if (el.ReportFieldId == 289)
            {
                el.FieldValue = contextObj.level;
                status = true;
            }
            if (el.ReportFieldId == 286) {
                el.FieldValue = contextObj.selectedIds;
                status = true;
            }
            return status;
        });
        return fieldDetailsAdd;
    }


    onSubmitData(event) {
        this.submitSuccess.emit({
            fieldobject: event.fieldobject,
            type: this.addEdit
        });

    }

    dropDownChange(event: any)
    {
        var contextObj = this;     

        if (this.level == 2)
        {
            this.fieldDetailsAdd.filter(function (el) {
                if (el.ReportFieldId == 291)
                {
                    contextObj.code1.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 288) {
                    el.FieldValue = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
                }
            });           
        }
        if (this.level == 3)
        {
            this.fieldDetailsAdd.filter(function (el) {

                if (el.ReportFieldId == 292 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 290) {
                    contextObj.administrationService.loadOrganizationUnitsLookUpValue(2, event.ddlRelationShipEvent.ChildFieldObject.FieldValue).subscribe(function (resultData1) {
                        el.LookupDetails.LookupValues = JSON.parse(resultData1["Data"].FieldBinderData);
                        contextObj.code2 = JSON.parse(resultData1["Data"].FieldBinderData);
                        el.FieldValue = "-1";
                    });
                }
                if (el.ReportFieldId == 291 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 290) {
                    contextObj.code1.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 293 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 292) {
                    contextObj.code2.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 288 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 292) {
                    el.FieldValue = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
                }
            });                   
        }
        if (this.level == 4 ) {
            this.fieldDetailsAdd.filter(function (el) {
                if (el.ReportFieldId == 292 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 290) {
                    contextObj.administrationService.loadOrganizationUnitsLookUpValue(2, event.ddlRelationShipEvent.ChildFieldObject.FieldValue).subscribe(function (resultData1) {
                        el.LookupDetails.LookupValues = JSON.parse(resultData1["Data"].FieldBinderData);
                        contextObj.code2 = JSON.parse(resultData1["Data"].FieldBinderData);
                        el.FieldValue = "-1";
                    });
                }
                else if (el.ReportFieldId > 292 && el.ReportFieldId <= 294 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 290) {
                        el.LookupDetails.LookupValues = [];
                        el.FieldValue = "-1";
                }
                if (el.ReportFieldId == 294 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 292) {
                    contextObj.administrationService.loadOrganizationUnitsLookUpValue(3, event.ddlRelationShipEvent.ChildFieldObject.FieldValue).subscribe(function (resultData1) {
                        el.LookupDetails.LookupValues = JSON.parse(resultData1["Data"].FieldBinderData);
                        contextObj.code3 = JSON.parse(resultData1["Data"].FieldBinderData);
                        el.FieldValue = "-1";
                    });
                }
                if (el.ReportFieldId == 295 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 294) {
                    contextObj.code3.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 291 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 290) {
                    contextObj.code1.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 293 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 292) {

                    contextObj.code2.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 288 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 294) {
                    el.FieldValue = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
                }
            });
        }
        if (this.level == 5) {
            this.fieldDetailsAdd.filter(function (el) {
                if (el.ReportFieldId == 292 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 290) {
                    contextObj.administrationService.loadOrganizationUnitsLookUpValue(2, event.ddlRelationShipEvent.ChildFieldObject.FieldValue).subscribe(function (resultData1) {
                        el.LookupDetails.LookupValues = JSON.parse(resultData1["Data"].FieldBinderData);
                        contextObj.code2 = JSON.parse(resultData1["Data"].FieldBinderData);
                        el.FieldValue = "-1";
                    });
                }
                else if (el.ReportFieldId > 292 && el.ReportFieldId <= 296 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 290) {
                    el.LookupDetails.LookupValues = [];
                    el.FieldValue = "-1";
                }
                else if (el.ReportFieldId == 294 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 292) {
                    contextObj.administrationService.loadOrganizationUnitsLookUpValue(3, event.ddlRelationShipEvent.ChildFieldObject.FieldValue).subscribe(function (resultData1) {
                        el.LookupDetails.LookupValues = JSON.parse(resultData1["Data"].FieldBinderData);
                        contextObj.code3 = JSON.parse(resultData1["Data"].FieldBinderData);
                        el.FieldValue = "-1";
                    });
                }
                else if (el.ReportFieldId > 294 && el.ReportFieldId <= 296 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 292) {
                    el.LookupDetails.LookupValues = [];
                    el.FieldValue = "-1";
                }
                else if (el.ReportFieldId == 296 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 294) {
                    contextObj.administrationService.loadOrganizationUnitsLookUpValue(4, event.ddlRelationShipEvent.ChildFieldObject.FieldValue).subscribe(function (resultData1) {
                        el.LookupDetails.LookupValues = JSON.parse(resultData1["Data"].FieldBinderData);
                        contextObj.code4 = JSON.parse(resultData1["Data"].FieldBinderData);
                        el.FieldValue = "-1";
                    });
                }
                if (el.ReportFieldId == 295 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 294) {
                    contextObj.code3.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 291 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 290) {
                    contextObj.code1.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 293 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 292) {
                    contextObj.code2.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 297 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 296) {
                    contextObj.code4.filter(function (e) {
                        if (event.ddlRelationShipEvent.ChildFieldObject.FieldValue == e.Id) {
                            el.FieldValue = e.ShortName;
                        }
                    });
                }
                if (el.ReportFieldId == 288 && event.ddlRelationShipEvent.ChildFieldObject.ReportFieldId == 296) {
                    el.FieldValue = event.ddlRelationShipEvent.ChildFieldObject.FieldValue;
                }
            });
        }
        
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;
        if (this.addEdit == "add") {
            this.btnName = "Save";
            switch (this.level) {
                case 1: this.formId = 197;
                    break;
                case 2: this.formId = 199;
                    break;
                case 3: this.formId = 200;
                    break;
                case 4: this.formId = 204;
                    break;
                case 5: this.formId = 206;
                    break;
            }
            this.administrationService.loadOrganizationalUnitAddEdit(this.formId, this.addEdit).subscribe(function (resultData) {
                contextObj.fieldDetailsAdd = resultData["Data"];
                contextObj.fieldDetailsAdd.filter(function (el) {
                    if (el.ReportFieldId == 290) {
                        contextObj.administrationService.loadOrganizationUnitsLookUpValue(1, 0).subscribe(function (resultData1) {
                            el.LookupDetails.LookupValues = JSON.parse(resultData1["Data"].FieldBinderData);
                            contextObj.code1 = JSON.parse(resultData1["Data"].FieldBinderData);
                        });
                    }
                    if (el.ReportFieldId == 289) {
                        el.FieldValue = contextObj.level;
                    }
                    if (el.ReportFieldId == 288) {
                        el.FieldValue = 0;
                    }
                    if (el.ReportFieldId == 291 || el.ReportFieldId == 293 || el.ReportFieldId == 295 || el.ReportFieldId == 297 || el.ReportFieldId == 299) {
                        el.FieldLabel = "Code";
                    }
                });
            });
        }
        else if (this.addEdit == "edit") {
            this.btnName = "Save Changes";
            if (contextObj.selectedIds.length !=0)
                this.administrationService.loadOrganizationalUnitAddEdit(212, this.addEdit).subscribe(function (resultData) {
                    contextObj.fieldDetailsAdd = resultData["Data"];
                    contextObj.administrationService.getEditOrganizationalUnitsData(contextObj.selectedIds).subscribe(function (resultData1) {
                        contextObj.editDetails = JSON.parse(resultData1["Data"].FieldBinderData);
                        contextObj.fieldDetailsAdd = contextObj.editFormFields(contextObj.editDetails, contextObj.fieldDetailsAdd, contextObj);
                    });
                });

        }           
    }



}


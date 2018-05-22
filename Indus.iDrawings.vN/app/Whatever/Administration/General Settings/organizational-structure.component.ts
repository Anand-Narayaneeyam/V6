import { Component, OnInit, Input} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NgForm } from '@angular/forms';
import {IField} from  '../../../Framework/Models/Interface/IField';
import { AdministrationService } from '../../../Models/Administration/administration.service';
import { HTTP_PROVIDERS} from '@angular/http';
import { FieldComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/fieldgeneration.component';
import { Notification} from '../../../Framework/Whatever/Notification/notify.component';
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';
import { GeneralFunctions} from '../../../Models/Common/General';

@Component({
    selector: 'organizational-structure',
    templateUrl: './app/Views/Administration/General Settings/organizational-structure.component.html',
    directives: [FieldComponent, Notification],
    providers: [HTTP_PROVIDERS, AdministrationService, NotificationService, GeneralFunctions]
})

export class OrganizationalStructureComponent implements OnInit {

    public organizationalStructureFields: IField[];
    public errorMessage: string;
    btnName: string = "Save Changes";
    success = "";
    dataKey: string = "";
    private restrictedWordsArray = ["team"];

    constructor(private administrationService: AdministrationService, private notificationService: NotificationService, private getData: GeneralFunctions) { }

    ngOnInit() {
        var contextObj = this;
        this.administrationService.getOrganizationalStructureFields(34).subscribe(function (resultData) {

            var data = resultData["Data"];
            var check = data.some(function (el) { return el.FieldValue != null; })
            if (check == false)
                contextObj.notificationService.ShowToaster("No Organizational Structure defined", 2);
            contextObj.organizationalStructureFields = resultData["Data"];

            // contextObj.dataKey = contextObj.organizationalStructureFields[0].FieldLabel;

        });


    }

    onSubmitData(event: any) {

        // let oldData:any
        //this.administrationService.getOrganizationalStructureFields(34).subscribe(function (resultData) {
        //    debugger
        //     oldData = resultData["Data"];
        //    // contextObj.dataKey = contextObj.organizationalStructureFields[0].FieldLabel;

        //});

        var contextObj = this;
        var checkLevel = false;
        var isValid = true;
        let fieldValues = contextObj.getData.getFieldValuesAsReportFieldArray(contextObj.organizationalStructureFields);
        var new1 = JSON.parse(event["fieldobject"]);
        var jsonobject = contextObj.organizationalStructureFields;
        if (jsonobject) {
            let level1: string = "";
            let level2: string = "";
            let level3: string = "";
            let level4: string = "";
            let level5: string = "";

            let level1Short: string = "";
            let level2Short: string = "";
            let level3Short: string = "";
            let level4Short: string = "";
            let level5Short: string = "";


            for (let i = 0; i < jsonobject.length; i++) {
                switch (i) {
                    case 0: level1 = jsonobject[i].FieldValue; break;
                    case 1: level1Short = jsonobject[i].FieldValue; break;
                    case 2: level2 = jsonobject[i].FieldValue; break;
                    case 3: level2Short = jsonobject[i].FieldValue;break;
                    case 4: level3 = jsonobject[i].FieldValue; break;
                    case 5: level3Short = jsonobject[i].FieldValue;break;
                    case 6: level4 = jsonobject[i].FieldValue; break;
                    case 7: level4Short = jsonobject[i].FieldValue;break;
                    case 8: level5 = jsonobject[i].FieldValue; break;
                    case 9: level5Short = jsonobject[i].FieldValue; break;
                }
            }
            if (level1 == "" || level1 == null) {
                contextObj.notificationService.ShowToaster("Enter Organization Level1", 5);
                isValid = false;
                return false;
            }
            if (level1) {
                checkLevel = true;
                if (level1.substr(0, 1).match(/[A-Za-z]/) == null) {

                    contextObj.notificationService.ShowToaster("Level1 should begin with an alphabet", 5);
                    isValid = false;
                    return false;
                }
                //let count: number = 0;
                //debugger
                //if (oldData[0].FieldValue != level1) {
                //    for (var i = 1; i > jsonobject.length; i++) {
                //        if (oldData[0].FieldValue == level1)
                //            count++;
                //        if (count > 1)
                //            contextObj.notificationService.ShowToaster("Organization Level1 name already exists", 5);
                //        break;
                //    }
                //}
            }
            if (level2) {
                checkLevel = true;
                if (level1 == "" || level1 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level1", 5);
                    isValid = false;
                    return false;

                }
                else {
                    if (level2.substr(0, 1).match(/[A-Za-z]/) == null) {

                        contextObj.notificationService.ShowToaster("Level2 should begin with an alphabet", 5);
                        isValid = false;
                        return false;
                    }
                }
            }
            if (level3) {
                checkLevel = true;
                if (level1 == "" || level1 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level1", 5);
                    isValid = false;
                    return false;

                }
                else if (level2 == "" || level2 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level2", 5);
                    isValid = false;
                    return false;

                }
                else {
                    if (level3.substr(0, 1).match(/[A-Za-z]/) == null) {
                        contextObj.notificationService.ShowToaster("Level3 should begin with an alphabet", 5);
                        isValid = false;
                        return false;

                    }
                }

            }
            if (level4) {
                checkLevel = true;
                if (level1 == "" || level1 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level4", 5);
                    isValid = false;
                    return false;

                }
                else if (level2 == "" || level2 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level2", 5);
                    isValid = false;
                    return false;

                }
                else if (level3 == "" || level3 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level3", 5);
                    isValid = false;
                    return false;

                }
                else {
                    if (level4.substr(0, 1).match(/[A-Za-z]/) == null) {
                        contextObj.notificationService.ShowToaster("Level4 should begin with an alphabet", 5);
                        isValid = false;
                        return false;

                    }
                }
            }
            if (level5) {
                checkLevel = true;
                if (level1 == "" || level1 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level1", 5);
                    isValid = false;
                    return false;

                }
                else if (level2 == "" || level2 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level2", 5);
                    isValid = false;
                    return false;

                }
                else if (level3 == "" || level3 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level3", 5);
                    isValid = false;
                    return false;

                }
                else if (level4 == "" || level4 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level4", 5);
                    isValid = false;
                    return false;

                }
                else {
                    if (level5.substr(0, 1).match(/[A-Za-z]/) == null) {
                        contextObj.notificationService.ShowToaster("Level5 should begin with an alphabet", 5);
                        isValid = false;
                        return false;

                    }
                }

            }

            if (level1 != "" && level1 != null) {
                if (contextObj.restrictedWordsArray.indexOf(level1.toLowerCase()) > -1) {
                    contextObj.notificationService.ShowToaster("Level1 should not be 'Team'", 5);
                    isValid = false;
                    return false;
                }
            }
            if (level2 != "" && level2 != null) {
                if (contextObj.restrictedWordsArray.indexOf(level2.toLowerCase()) > -1) {
                    contextObj.notificationService.ShowToaster("Level2 should not be 'Team'", 5);
                    isValid = false;
                    return false;
                }
            }
            if (level3 != "" && level3 != null) {
                if (contextObj.restrictedWordsArray.indexOf(level3.toLowerCase()) > -1) {
                    contextObj.notificationService.ShowToaster("Level3 should not be 'Team'", 5);
                    isValid = false;
                    return false;
                }
            }
            if (level4 != "" && level4 != null) {
                if (contextObj.restrictedWordsArray.indexOf(level4.toLowerCase()) > -1) {
                    contextObj.notificationService.ShowToaster("Level4 should not be 'Team'", 5);
                    isValid = false;
                    return false;
                }
            }
            if (level5 != "" && level5 != null) {
                if (contextObj.restrictedWordsArray.indexOf(level5.toLowerCase()) > -1) {
                    contextObj.notificationService.ShowToaster("Level5 should not be 'Team'", 5);
                    isValid = false;
                    return false;
                }
            }




            if (level1Short != "" && level1Short != null) {
                if (level1 == "" || level1 == null) {
                    contextObj.notificationService.ShowToaster("Enter Organization Level1", 5);
                    isValid = false;
                    return false;

                }
                if (contextObj.restrictedWordsArray.indexOf(level1Short.toLowerCase()) > -1) {
                    contextObj.notificationService.ShowToaster("Level1 Short Name should not be 'Team'", 5);
                    isValid = false;
                    return false;
                }
                if (level1Short == level1) {
                    contextObj.notificationService.ShowToaster("Level1 Short Name should not be Level1", 5);
                    isValid = false;
                    return false;
                }
                if (level2 != "" && level2 != null) {
                    if (level1Short == level2) {
                        contextObj.notificationService.ShowToaster("Level1 Short Name should not be Level2", 5);
                        isValid = false;
                        return false;
                    }
                }
                if (level3 != "" && level3 != null) {
                    if (level1Short == level3) {
                        contextObj.notificationService.ShowToaster("Level1 Short Name should not be Level3", 5);
                        isValid = false;
                        return false;
                    }
                }
                if (level4 != "" && level4 != null) {
                    if (level1Short == level4) {
                        contextObj.notificationService.ShowToaster("Level1 Short Name should not be Level4", 5);
                        isValid = false;
                        return false;
                    }
                }
                if (level5 != "" && level5 != null) {
                    if (level1Short == level5) {
                        contextObj.notificationService.ShowToaster("Level1 Short Name should not be Level5", 5);
                        isValid = false;
                        return false;
                    }
                }
            }

            if (level2Short != "" && level2Short != null) {
                    if (level2 == "" || level2 == null) {
                        contextObj.notificationService.ShowToaster("Enter Organization Level2", 5);
                        isValid = false;
                        return false;
                    }
                    if (contextObj.restrictedWordsArray.indexOf(level2Short.toLowerCase()) > -1) {
                        contextObj.notificationService.ShowToaster("Level2 Short Name should not be 'Team'", 5);
                        isValid = false;
                        return false;
                    }
                    if (level1Short != "" && level1Short != null) {
                        if (level1Short == level2Short)
                        {
                            contextObj.notificationService.ShowToaster("Level2 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }

                    }

                    if (level1 != "" && level1 != null) {
                        if (level2Short == level1) {
                            contextObj.notificationService.ShowToaster("Level2 Short Name should not be Level1", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level2 != "" && level2 != null) {
                        if (level2Short == level2) {
                            contextObj.notificationService.ShowToaster("Level2 Short Name should not be Level2", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level3 != "" && level3 != null) {
                        if (level2Short == level3) {
                            contextObj.notificationService.ShowToaster("Level2 Short Name should not be Level3", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level4 != "" && level4 != null) {
                        if (level2Short == level4) {
                            contextObj.notificationService.ShowToaster("Level2 Short Name should not be Level4", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level5 != "" && level5 != null) {
                        if (level2Short == level5) {
                            contextObj.notificationService.ShowToaster("Level2 Short Name should not be Level5", 5);
                            isValid = false;
                            return false;
                        }
                    }

            }
            if (level3Short != "" && level3Short != null) {
                    if (level3 == "" || level3 == null) {
                        contextObj.notificationService.ShowToaster("Enter Organization Level3", 5);
                        isValid = false;
                        return false;
                    }
                    if (contextObj.restrictedWordsArray.indexOf(level3Short.toLowerCase()) > -1) {
                        contextObj.notificationService.ShowToaster("Level3 Short Name should not be 'Team'", 5);
                        isValid = false;
                        return false;
                    }
                    if (level1Short != "" && level1Short != null) {
                        if (level1Short == level3Short) {
                            contextObj.notificationService.ShowToaster("Level3 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level2Short != "" && level2Short != null) {
                        if (level3Short == level2Short) {
                            contextObj.notificationService.ShowToaster("Level3 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level1 != "" && level1 != null) {
                        if (level3Short == level1) {
                            contextObj.notificationService.ShowToaster("Level3 Short Name should not be Level1", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level2 != "" && level2 != null) {
                        if (level3Short == level2) {
                            contextObj.notificationService.ShowToaster("Level3 Short Name should not be Level2", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level3 != "" && level3 != null) {
                        if (level3Short == level3) {
                            contextObj.notificationService.ShowToaster("Level3 Short Name should not be Level3", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level4 != "" && level4 != null) {
                        if (level3Short == level4) {
                            contextObj.notificationService.ShowToaster("Level3 Short Name should not be Level4", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level5 != "" && level5 != null) {
                        if (level3Short == level5) {
                            contextObj.notificationService.ShowToaster("Level3 Short Name should not be Level5", 5);
                            isValid = false;
                            return false;
                        }
                    }
            }
            if (level4Short != "" && level4Short != null) {
                    if (level4 == "" || level4 == null) {
                        contextObj.notificationService.ShowToaster("Enter Organization Level4", 5);
                        isValid = false;
                        return false;
                    }
                    if (contextObj.restrictedWordsArray.indexOf(level4Short.toLowerCase()) > -1) {
                        contextObj.notificationService.ShowToaster("Level4 Short Name should not be 'Team'", 5);
                        isValid = false;
                        return false;
                    }
                    if (level1Short != "" && level1Short != null) {
                        if (level1Short == level4Short) {
                            contextObj.notificationService.ShowToaster("Level4 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level2Short != "" && level2Short != null) {
                        if (level2Short == level4Short) {
                            contextObj.notificationService.ShowToaster("Level4 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level3Short != "" && level3Short != null) {
                        if (level3Short == level4Short) {
                            contextObj.notificationService.ShowToaster("Level4 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level1 != "" && level1 != null) {
                        if (level4Short == level1) {
                            contextObj.notificationService.ShowToaster("Level4 Short Name should not be Level1", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level2 != "" && level2 != null) {
                        if (level4Short == level2) {
                            contextObj.notificationService.ShowToaster("Level4 Short Name should not be Level2", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level3 != "" && level3 != null) {
                        if (level4Short == level3) {
                            contextObj.notificationService.ShowToaster("Level4 Short Name should not be Level3", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level4 != "" && level4 != null) {
                        if (level4Short == level4) {
                            contextObj.notificationService.ShowToaster("Level4 Short Name should not be Level4", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level5 != "" && level5 != null) {
                        if (level4Short == level5) {
                            contextObj.notificationService.ShowToaster("Level4 Short Name should not be Level5", 5);
                            isValid = false;
                            return false;
                        }
                    }
            }

            if (level5Short != "" && level5Short != null) {
                    if (level5 == "" || level5 == null) {
                        contextObj.notificationService.ShowToaster("Enter Organization Level5", 5);
                        isValid = false;
                        return false;
                    }
                    if (contextObj.restrictedWordsArray.indexOf(level5Short.toLowerCase()) > -1) {
                        contextObj.notificationService.ShowToaster("Level5 Short Name should not be 'Team'", 5);
                        isValid = false;
                        return false;
                    }
                    if (level1Short != "" && level1Short != null) {
                        if (level1Short == level5Short) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level2Short != "" && level2Short != null) {
                        if (level2Short == level5Short) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level3Short != "" && level3Short != null) {
                        if (level3Short == level5Short) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level4Short != "" && level4Short != null) {
                        if (level4Short == level5Short) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name already exists", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level1 != "" && level1 != null) {
                        if (level5Short == level1) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name should not be Level1", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level2 != "" && level2 != null) {
                        if (level5Short == level2) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name should not be Level2", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level3 != "" && level3 != null) {
                        if (level5Short == level3) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name should not be Level3", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level4 != "" && level4 != null) {
                        if (level5Short == level4) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name should not be Level4", 5);
                            isValid = false;
                            return false;
                        }
                    }
                    if (level5 != "" && level5 != null) {
                        if (level5Short == level5) {
                            contextObj.notificationService.ShowToaster("Level5 Short Name should not be Level5", 5);
                            isValid = false;
                            return false;
                        }
                    }
            }


        }
        if (checkLevel == false) {
            contextObj.notificationService.ShowToaster("Enter Organization Level1", 5);
            isValid = false;
            return false;
        }
        if (isValid == true) {
            this.administrationService.UpdateOrganizationalStructureFields(34, fieldValues).subscribe(function (resultData) {

                contextObj.success = resultData["Data"].Message;
                /* Organization Level4 name already exists*/

                if (contextObj.success == "Success") {
                    contextObj.notificationService.ShowToaster("Organizational Structure updated", 3);
                }
                else {
                    if (resultData["Data"].ServerId == -2)
                        contextObj.notificationService.ShowToaster("Organizational Units exist for 'Level1'", 5);
                    else if (resultData["Data"].ServerId == -3)
                        contextObj.notificationService.ShowToaster("Organizational Units exist for 'Level2'", 5);
                    else if (resultData["Data"].ServerId == -4)
                        contextObj.notificationService.ShowToaster("Organizational Units exist for 'Level3'", 5);
                    else if (resultData["Data"].ServerId == -5)
                        contextObj.notificationService.ShowToaster("Organizational Units exist for 'Level4'", 5);
                    else if (resultData["Data"].ServerId == -6)
                        contextObj.notificationService.ShowToaster("Organizational Units exist for 'Level5'", 5);
                    else if (resultData["Data"].ServerId == -22)
                        contextObj.notificationService.ShowToaster("Organization Level2 name already exists", 5);
                    else if (resultData["Data"].ServerId == -33)
                        contextObj.notificationService.ShowToaster("Organization Level3 name already exists", 5);
                    else if (resultData["Data"].ServerId == -44)
                        contextObj.notificationService.ShowToaster("Organization Level4 name already exists", 5);
                    else if (resultData["Data"].ServerId == -55)
                        contextObj.notificationService.ShowToaster("Organization Level5 name already exists", 5);
                }
            });
        }
        else {
            return false;
        }
    }
}
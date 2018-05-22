import {Component,Input,AfterViewInit,OnChanges,SimpleChange,Output,EventEmitter} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { AdministrationService } from '../../../Models/Administration/administration.service'
import {IField} from  '../../../Framework/Models/Interface/IField'
import { ListBoxComponent } from '../../../Framework/Whatever/DynamicControls/DynamicFields/listboxcomponent.component'
import { Notification} from '../../../Framework/Whatever/Notification/notify.component'
import { NotificationService } from '../../../Framework/Models/Notification/notify.service';

@Component({
    selector: 'user-modules-access',
    templateUrl: './app/Views/Administration/Users/usermodulesaccess.component.html',
    directives: [Notification, ListBoxComponent],
    providers: [AdministrationService, HTTP_PROVIDERS, NotificationService],
    inputs: ["selectedIds"]
})

export class UserModulesAccessComponent {

    accessModulesList: IField[]; 
    errorMessage: string;
    @Input() selectedIds: any[];
    @Input() userRoleId: any;
    @Output() isModuleAccess = new EventEmitter();
    constructor(private administrationService: AdministrationService, private notificationService: NotificationService) { 
               
    }
    ngAfterViewInit() {
        this.loadMOduleAccess();
     
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        var contextObj = this;      
        if (changes["selectedIds"] && changes["selectedIds"]["currentValue"][0] && changes["selectedIds"]["currentValue"][0] != changes["selectedIds"]["previousValue"][0])
            this.loadMOduleAccess();
    }

    private loadMOduleAccess() {
        if (this.selectedIds != undefined) {
            var contextObj = this;
            this.administrationService.getUserModuleAccess(contextObj.selectedIds).subscribe(function (result) {                
                contextObj.accessModulesList = result["Data"];
                var isModuleAccess = false;
                var lookupdetLgth = result["Data"][0].LookupDetails.LookupValues.length;
                result["Data"][0].LookupDetails.LookupValues.find(function (item) {
                        lookupdetLgth--;
                        if (item.IsChecked == 1) 
                            isModuleAccess = true;
                        if (item.Id == "1")
                            item.Value = "As Builts";
                        if (lookupdetLgth<0){
                            return true
                        } else {
                            return false;
                        }
                });
                contextObj.isModuleAccess.emit({ isModuleAccess });
                
            });
        }
    }

    onChangeCheckBx(event) {    
        debugger
        var context = this;
        var currentCheckId =event.chkevent.target.value;
        var checkedStatus = event.chkevent.target.checked;
        var selectedModuleIds = event.fieldObject.MultiFieldValues
        if (checkedStatus) {
            var asBuiltmoduleIds = ["3", "5", "6", "7", "8", "10", "11", "12", "17", "18", "25", "26", "27","24"];
            var spaceModIds = ["12", "5", "11", "10"];
            //if (this.userRoleId != 4) {
            //    asBuiltmoduleIds.push("14");
            //    spaceModIds.push("14");
            //}
            //Asbuilts 
            if (asBuiltmoduleIds.indexOf(currentCheckId) > -1) {
                if (selectedModuleIds.indexOf("1") == -1) {
                    event.chkevent.target.checked = false;
                    selectedModuleIds.pop();
                    context.notificationService.ShowToaster("Selection is possible only when As Builts module is allotted to user", 5);
                } else {
                    //space
                    if (spaceModIds.indexOf(currentCheckId) > -1) {                    
                        if (selectedModuleIds.indexOf("3") == -1) {
                            event.chkevent.target.checked = false;
                            selectedModuleIds.pop();
                            context.notificationService.ShowToaster("Selection is possible only when Space module is allotted to user", 5);
                        }
                    }
                }

                //space
            //} else if (spaceModIds.indexOf(currentCheckId) > -1) {
            //    alert(selectedModuleIds.indexOf("3"));
            //    if (selectedModuleIds.indexOf("3") == -1) {
            //        event.chkevent.target.checked = false;
            //        selectedModuleIds.pop();
            //        context.notificationService.ShowToaster("Selection is possible only when Space module is allotted to user", 5);
            //    }
                //wo
            } else if (currentCheckId == "29") {
                if (selectedModuleIds.indexOf("9") == -1) {
                    event.chkevent.target.checked = false;
                    selectedModuleIds.pop();
                    context.notificationService.ShowToaster("Selection is possible only when Work Order module is allotted to user", 5);
                }

            }

        } else {
       
            var remArray = [];
            switch (currentCheckId) {
              
            case "1": //asbuilt        
                    remArray = ["3", "5", "6", "7", "8","10","11","12","17","18","25","26","27"];
                    event.fieldObject.MultiFieldValues = selectedModuleIds.filter(function (item) { return remArray.indexOf(item) == -1; })
            break;
            case "3": //space 
                    remArray = ["5", "12", "10", "11"];
                    event.fieldObject.MultiFieldValues = selectedModuleIds.filter(function (item) { return remArray.indexOf(item) == -1; })
                   
            break;
            case "9"://WO
            remArray = ["29"];
            event.fieldObject.MultiFieldValues = selectedModuleIds.filter(function (item) { return remArray.indexOf(item) == -1; })
            break;
        
            }

        }                 
      
    }

    updateModulesAccessData() {    
        var contextObj = this;
        this.administrationService.updateUserModuleAccess(contextObj.selectedIds, contextObj.accessModulesList[0].MultiFieldValues).subscribe(function (resultData) {
            if (resultData["Data"].StatusId == 1) {
                var isModuleAccess = false;
                if (contextObj.accessModulesList[0].MultiFieldValues.length > 0) {                  
                    isModuleAccess = true;
                } 
                contextObj.isModuleAccess.emit({ isModuleAccess });
                contextObj.notificationService.ShowToaster("Modules accessible to the selected User has been updated", 3);
            } else
                contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
        });

       
    }
}
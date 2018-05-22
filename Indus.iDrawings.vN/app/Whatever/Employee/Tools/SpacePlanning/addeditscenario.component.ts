import { Component,Input,Output,EventEmitter} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { FieldComponent } from '../../../../Framework/Whatever/DynamicControls/DynamicFields/fieldGeneration.component';
import { IField} from '../../../../Framework/Models//Interface/IField';
import { NotificationService } from '../../../../Framework/Models/Notification/notify.service';
import { EmployeeService} from '../../../../Models/Employee/employee.services';

@Component({
    selector: 'addedit-scenario',
    templateUrl: './app/Views/Employee/Tools/SpacePlanning/addeditscenario.component.html',
    directives: [FieldComponent],
    providers: [EmployeeService, HTTP_PROVIDERS, NotificationService],
    inputs: ['selectedId', 'fieldDetailsAdd']
})

export class AddEditScenariosComponent  {
        
    selectedId: number
    @Input() fieldDetailsAdd: IField[];
    @Output() submitSuccess = new EventEmitter();

    constructor(private employeeService: EmployeeService, private notificationService: NotificationService) {
    }

   
    onSubmitData(event) {
        var contextObj = this;
        var eventData = JSON.parse(event.fieldobject);
        eventData.find(function (item) {
            if (item.ReportFieldId == 907) {
                item.Value = contextObj.selectedId.toString();
                return true;
            } else return false;
        });
           
        this.employeeService.listUpdateScenarios(JSON.stringify(eventData)).subscribe(function (resultData) {
            switch (resultData["Data"].StatusId) {
                case 1:
                    contextObj.notificationService.ShowToaster("Scenario updated", 3);
                    contextObj.submitSuccess.emit({ returnData: resultData["Data"].Data });
                    break;
                case 3:
                    if (resultData["Data"].ServerId == -1)
                        contextObj.notificationService.ShowToaster("Scenario Name already exists", 5);
                    break;
                default:
                    contextObj.notificationService.ShowToaster("iDrawings encountered a problem while executing your command", 5);
                    break;
            }
        });
    }
  
    
}